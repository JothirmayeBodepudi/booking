const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Feedback = require('./models/Feedback'); // Import Feedback model
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB URI
const uri = process.env.MONGODB_URI || 'mongodb+srv://admin:admin@cluster0.ingh8uz.mongodb.net/studentDB?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  }
}

connectDB();

// Admin credentials
const adminCredentials = {
  username: 'admin',
  password: 'admin123'
};

// Admin login endpoint
app.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username !== adminCredentials.username || password !== adminCredentials.password) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }
    const token = jwt.sign({ username: adminCredentials.username }, process.env.JWT_SECRET || 'jwtsecret');
    res.status(200).json({ message: 'Admin login successful', token });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Middleware to verify admin token
function verifyAdminToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, process.env.JWT_SECRET || 'jwtsecret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    if (decoded.username !== adminCredentials.username) {
      return res.status(401).json({ message: 'Unauthorized admin access' });
    }
    req.admin = decoded;
    next();
  });
}

// User Model
const userCollection = client.db('studentDB').collection('users');

// Register a new user
app.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    await userCollection.insertOne({ name, email, password: hashedPassword, role });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Route for user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'jwtsecret');

    // Send token as response
    res.json({ token });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
});

// Reset password endpoint
app.post('/resetpassword', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the new password
    await userCollection.updateOne({ email }, { $set: { password: hashedPassword } });
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Handle POST request to upload room details and images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where uploaded files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename file with timestamp to avoid conflicts
  },
});
const upload = multer({ storage });

app.post('/rooms', upload.array('images', 5), (req, res) => {
  console.log(req.files); // Log the received files
  const { name, description, price } = req.body;
  const images = req.files.map(file => file.filename); // Get filenames of uploaded images

  // Save room details and image filenames to database or any other storage mechanism
  // Here, we are just sending the filenames as a response
  res.status(201).json({ 
    message: 'Room details and images uploaded successfully',
    images: images.map(filename => `${req.protocol}://${req.get('host')}/${filename}`) // Send URLs of uploaded images in the response
  });
});

// Backend feedbacks route

// Get all feedbacks
app.get('/api/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const { email, starRating, review } = req.body;
    const newFeedback = new Feedback({
      email,
      starRating,
      review
    });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to fetch user data
app.get('/users', async (req, res) => {
  try {
    const users = await client.db('studentDB').collection('users').find().toArray();
    res.json(users);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to fetch image URLs
app.get('/images', async (req, res) => {
  try {
    // Retrieve image URLs from your database
    // Assuming you have stored image URLs in a collection named 'images'
    const images = await client.db('studentDB').collection('images').find().toArray();
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user endpoint
app.put('/users/:email', async (req, res) => {
  const { email } = req.params;
  const updatedUserData = req.body;

  try {
    // Update the user in the database
    await userCollection.updateOne({ email }, { $set: updatedUserData });
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete user endpoint
app.delete('/users/:email', async (req, res) => {
  const { email } = req.params;

  try {
    // Delete the user from the database
    await userCollection.deleteOne({ email });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

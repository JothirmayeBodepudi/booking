import React, { useState } from 'react';
import './AddRoom.css';
import axios from 'axios';

const AddRoom = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]); // Stores both local file URLs for previews and server URLs after upload

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    images.forEach(image => {
      formData.append('images', image);
    });

    try {
      const response = await axios.post('http://localhost:8080/rooms', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Update the image URLs with those from the server
      const uploadedImageURLs = response.data.images;
      setImageURLs(uploadedImageURLs);

      alert('Room details and images uploaded successfully');
    } catch (error) {
      console.error('Error uploading room details and images:', error);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Create image previews
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setImageURLs(filePreviews); // Use the same array for previews
  };

  return (
    <div className="add-room-container">
      <h2>Add Room</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Images:</label>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} />
        </div>
        <button type="submit">Submit</button>
      </form>

      {imageURLs.length > 0 && (
        <div className="image-previews">
          <h3>Images:</h3>
          {imageURLs.map((url, index) => (
             <img key={index} src={url} alt={`Room Image ${index + 1}`} className="uploaded-image" />
          ))}
        </div>
      )}
    </div>
  );
};

export default AddRoom;

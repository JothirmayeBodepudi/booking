import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import Rating from '@mui/material/Rating'; // Import Rating component
import Room1Image from './Room1.jpg';
import Room6Image from './Room6.jpg';
import Room2Image from './Room2.jpg';
import './home.css';

const Home = () => {
  const [destination, setDestination] = useState('');
  const [roomRatings, setRoomRatings] = useState({});

  const handleSearchChange = (event) => {
    setDestination(event.target.value);
  };

  const rooms = [
    {
      id: 'GrandeView',
      image: Room1Image,
      description: 'GrandeView',
    },
    {
      id: 'TajHotel',
      image: Room6Image,
      description: 'Taj Hotel.',
    },
    {
      id: 'LakeView',
      image: Room2Image,
      description: 'Lake View.',
    },
    // Add more rooms here
  ];

  let filteredRooms = rooms;
  
  if (destination) {
    filteredRooms = rooms.filter(room => room.id.toLowerCase().includes(destination.toLowerCase()));
  }

  const handleViewRelated = (roomId) => {
    if (roomId === 'TajHotel') {
      window.location.href = '/OceanView';
    } else if (roomId === 'LakeView') {
      window.location.href = '/LakeView';
    } else {
      window.location.href = `/GardenView`;
    }
  };

  const handleRatingChange = (roomId, rating) => {
    setRoomRatings({ ...roomRatings, [roomId]: rating });
  };

  return (
    <div className="home-container">
      <div className="hero">
        <h1>Welcome to Our Hotels</h1>
        <p>Explore our rooms and book your stay</p>
      </div>
      <div className="search-container">
        <h2>Search for Places</h2>
        <input type="text" placeholder="Enter destination" value={destination} onChange={handleSearchChange} />
        <button>Search</button>
      </div>
      <div className="room-container">
        {filteredRooms.map(room => (
          <div className="room1" key={room.id}>
            <img src={room.image} alt={room.id} />
            <p>Description: {room.description}</p>
            <Rating
              name={`${room.id}-rating`}
              value={roomRatings[room.id] || 0}
              onChange={(event, newValue) => handleRatingChange(room.id, newValue)}
            />
            <button onClick={() => handleViewRelated(room.id)}>View rooms</button>
          </div>
        ))}
      </div>
      <div>
        <img src="/uploads/image1.jpg" alt="Image 1" />
        <img src="/uploads/image2.jpg" alt="Image 2" />
      </div>
      <div className="about-container">
        <h2>About Us</h2>
        <p>Welcome to our Hotel Management System,
           where innovation meets efficiency to redefine the hospitality landscape. 
           Committed to revolutionizing hotel operations, we provide cutting-edge technology and unwavering support to empower hoteliers of all sizes.
            With a dedicated team of hospitality and technology experts, we offer a comprehensive suite 
            of solutions tailored to streamline every aspect of hotel management, 
            from reservations and check-ins to housekeeping and billing. Our mission is clear: to simplify complexity, optimize efficiency, and enhance guest experiences.
             Choose us for innovative solutions, reliable performance, dedicated support, and unparalleled flexibility. 
             Let's embark on a journey together to unlock new possibilities and drive success in the hospitality industry.</p>
      </div>
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>Email: jothirmaye08@gmail.com</p>
        <p>Help-line: 123-456-7890</p>
        <p>Website: <a href="https://srinavyag1996.wixsite.com/my-site/projects" target="_blank" rel="noopener noreferrer">Visit Our Website</a></p>
      </div>
    </div>
  );
}

export default Home;

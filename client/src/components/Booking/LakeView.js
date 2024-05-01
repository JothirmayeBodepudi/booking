import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Bookings.css'; // Import CSS file for styling
import LRoom1Image from './assects/LRoom1.jpeg'; // Import Room1.jpg
import LRoom2Image from './assects/LRoom2.jpeg';
import LRoom3Image from './assects/LRoom3.jpeg';
import './View.css';

const LakeView = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [selectedBedType, setSelectedBedType] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const decreasePeople = () => {
    if (numberOfPeople > 1) {
      setNumberOfPeople(prev => prev - 1);
    }
  };

  const increasePeople = () => {
    setNumberOfPeople(prev => prev + 1);
  };

  const handleBedTypeChange = (bedType) => {
    setSelectedBedType(bedType);
  };

  const handleRoomSelection = (roomId) => {
    setSelectedRoom(roomId);
  };

  const bookNow = () => {
    if (!checkInDate || !checkOutDate || !selectedBedType || !selectedRoom) {
      alert('Please fill in all the fields before booking.');
    } else {
      // Redirect to checkout page using Link
      // Wrap the button inside the Link component
      return <Link to="/Checkout"><button>Book Now</button></Link>;
    }
  };

  return (
    <div className="booking-container">
      <div className="booking-form">
        <h2>Book Your Stay</h2>
        <label htmlFor="checkin">Check-in Date:</label>
        <input type="date" id="checkin" name="checkin" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} min={today} />
        <label htmlFor="checkout">Check-out Date:</label>
        <input type="date" id="checkout" name="checkout" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} min={today} />
        <label htmlFor="numberOfPeople">Number of People:</label>
        <div className="number-input">
          <button className="arrow" onClick={decreasePeople}>▼</button>
          <input type="text" value={numberOfPeople} readOnly />
          <button className="arrow" onClick={increasePeople}>▲</button>
        </div>
        <label htmlFor="bedType">Bed Type:</label>
        <label htmlFor="kingSize">
          <input
            type="radio"
            id="kingSize"
            name="bedType"
            value="kingSize"
            checked={selectedBedType === 'kingSize'}
            onChange={() => handleBedTypeChange('kingSize')}
          />
          King Size
        </label>
        <label htmlFor="queenSize">
          <input
            type="radio"
            id="queenSize"
            name="bedType"
            value="queenSize"
            checked={selectedBedType === 'queenSize'}
            onChange={() => handleBedTypeChange('queenSize')}
          />
          Queen Size
        </label>
        <label htmlFor="doubleBed">
          <input
            type="radio"
            id="doubleBed"
            name="bedType"
            value="doubleBed"
            checked={selectedBedType === 'doubleBed'}
            onChange={() => handleBedTypeChange('doubleBed')}
          />
          Double Bed
        </label>
        {selectedRoom ? (
          // <button onClick={bookNow}>Book Now</button>
          <button disabled={!selectedRoom}>{bookNow()}</button>
        ) : (
          <p>Please select a room before booking.</p>
        )}
      </div>
      <div className="booking-images">
        <div className="booking">
          <input
            type="radio"
            id="room1"
            name="select"
            value="room1"
            checked={selectedRoom === 'room1'}
            onChange={() => handleRoomSelection('room1')}
          />
          <img src={LRoom1Image} alt="LRoom 1" className={selectedRoom === 'room1' ? 'highlight' : ''} />
          <p>Location: Nagpur</p>
          <p>Price: Rs 2050 per day</p>
        </div>
        <div className="booking">
          <input
            type="radio"
            id="room2"
            name="select"
            value="room2"
            checked={selectedRoom === 'room2'}
            onChange={() => handleRoomSelection('room2')}
          />
          <img src={LRoom2Image} alt="LRoom 2" className={selectedRoom === 'room2' ? 'highlight' : ''} />
          <p>Location: Nagpur</p>
          <p>Price: Rs 2050 per day</p>
        </div>
        <div className="booking">
          <input
            type="radio"
            id="room3"
            name="select"
            value="room3"
            checked={selectedRoom === 'room3'}
            onChange={() => handleRoomSelection('room3')}
          />
          <img src={LRoom3Image} alt="LRoom 3" className={selectedRoom === 'room3' ? 'highlight' : ''} />
          <p>Location: Nagpur</p>
          <p>Price: Rs 2050 per day</p>
        </div>
      </div>
    </div>
  );
}

export default LakeView;

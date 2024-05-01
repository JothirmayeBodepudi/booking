import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FetchRegistrations.css'; // Import CSS file for styling

const FetchRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    // Fetch registration data when the component mounts
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users'); // Replace with your backend URL
        setRegistrations(response.data);
      } catch (error) {
        console.error('Error fetching registration data:', error);
      }
    };

    fetchRegistrations();
  }, []);

  return (
    <div>
      <h2>Registrations</h2>
      <table className="registration-table">
        <thead>
          <tr>
            
            <th>Email</th>
            <th>Role</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map(registration => (
            <tr key={registration._id}>
              
              <td>{registration.email}</td>
              <td>{registration.role}</td>
              <td>{registration.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FetchRegistrations;

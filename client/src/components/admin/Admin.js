import React, { useState } from 'react';
import './Admin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/admin/login', formData);
      if (response.status === 200) {
        localStorage.setItem('adminToken', response.data.token); // Store admin token in localStorage
        navigate("/AdminHome"); // Redirect to AdminHome on successful login
      } else {
        setMessage("Login Failed");
        setError("");
      }
    } catch (error) {
      setMessage("");
      setError(error.response.data.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken'); // Remove admin token from localStorage
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <div>
      <h3 align="center"><u>Admin Login</u></h3>
      {
        message ? <h4 align="center">{message}</h4> : <h4 align="center">{error}</h4>
      }
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="button">Login</button>
      </form>
      <button onClick={handleLogout} className="button">Logout</button> {/* Logout button */}
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import './AdminHome.css'; import FetchRegistrations from './FetchRegistration';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate("/");
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li><Link to="/admin/AddRoom">Add Room</Link></li> {/* Link to AddRoom */}
         
          <li><Link to="/admin/FetchRegistration">User Management</Link></li>
          <button onClick={handleLogout} className="button">Logout</button> 
        </ul>
       </div>
       <div><FetchRegistrations/></div> 
    </div> 
  );
}

export default AdminHome;

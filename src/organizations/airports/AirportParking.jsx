import React from 'react';
import { Link } from 'react-router-dom';
import './AirportParking.css';

const AirportParking = () => {
  return (
    <div className="airport-parking">
      <h1 className="title">Airport Parking System</h1>
      <div className="parking-options">
        <Link to="/airports/passenger" className="parking-card">
          <h3>Passenger Parking</h3>
        </Link>
        <Link to="/airports/staff" className="parking-card">
          <h3>Staff Parking</h3>
        </Link>
        <Link to="/airports/vip" className="parking-card">
          <h3>Airport VIP Parking</h3>
        </Link>
        <Link to="/airports/admin" className="parking-card">
          <h3>Admin Dashboard</h3>
        </Link>
      </div>
    </div>
  );
};

export default AirportParking;

// src/components/UniversityParking/UniversityParking.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './UniversityParking.css';

const UniversityParking = () => {
  return (
    <div className="university-parking">
      <h1>University Parking System</h1>
      <div className="parking-options">
        <Link to="/organization/university/student" className="parking-card">
          <h3>Student Parking</h3>
        </Link>
        <Link to="/organization/university/faculty" className="parking-card">
          <h3>Faculty Parking</h3>
        </Link>
        <Link to="/organization/university/Event" className="parking-card">
          <h3>Event Parking</h3>
        </Link>
        <Link to="/organization/university/admin" className="parking-card">
          <h3>Admin Dashboard</h3>
        </Link>
      </div>
    </div>
  );
};

export default UniversityParking;

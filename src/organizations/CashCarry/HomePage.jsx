// HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <h1>Welcome to Cash & Carry Parking</h1>
      <div className="place-card-container">
        <Link to="/cashcarry/customers" className="place-card">
          <h2>Customers</h2>
        </Link>
        <Link to="/cashcarry/admin" className="place-card">
          <h2>Admin</h2>
        </Link>
        <Link to="/cashcarry/vip" className="place-card">
          <h2>VIP</h2>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

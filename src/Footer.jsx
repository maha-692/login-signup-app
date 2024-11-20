// src/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <h4> Parking Systems</h4>
          <ul>
            <li>Impark</li>
            <li>Lanier Parking</li>
            <li>Republic Parking</li>
            <li>AmeriPark</li>
            <li>Park One</li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>About Us</h4>
          <ul>
            <li>Our Story</li>
            <li>Careers</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Services</h4>
          <ul>
            <li>Customizability</li>
            <li>VIP Slot Management</li>
            <li>Advanced Booking</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Privacy Policy | Terms of Use</p>
        <p>© 2024 ParkPro. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

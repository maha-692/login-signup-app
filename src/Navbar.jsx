import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'; // Import the CSS file for custom styles
import logo from './assets/logo.png'; // Update with the path to your logo

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch('/checkAuth')
      .then(response => response.json())
      .then(data => {
        setIsAuthenticated(data.loggedIn);
      })
      .catch(err => console.error('Error checking authentication:', err));
  }, []);

  const handleLogout = () => {
    fetch('/logout', { method: 'POST' })
      .then(() => {
        setIsAuthenticated(false);
        navigate('/login'); 
      })
      .catch(err => console.error('Logout failed:', err));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        {/* Logo positioned first */}
        <Link className="navbar-brand logo-link" to="/">
          <img src={logo} alt="ParkPro Logo" className="logo" />
        </Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/Homepage">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ParkingSystem">Parking System</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/OurServices">Our Services</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/AboutUs">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ContactUs">Contact Us</Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <li className="nav-item">
                <span className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                  Logout
                </span>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

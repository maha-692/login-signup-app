import React from 'react';
import './OurServices.css'; // Ensure this file path is correct

const OurServices = () => {
  return (
    <div className="our-services-container">
      <img src={require('./assets/ps.jpg')} alt="Parking Management" className="service-image" />
      <h1>Our Services</h1>
      <p>Welcome to our services page! Below you can find details about the innovative parking solutions we offer to future-proof your property.</p>
      
      
      <div className="services-section">
        
        <div className="services-list">
          <div className="service-item">
            <h3>Customized Parking Management</h3>
            
          </div>
          <div className="service-item">
            <h3>VIP Slot Availabilty</h3>
            
          </div>
          <div className="service-item">
            <h3>Event Management</h3>
            
          </div>
          <div className="service-item">
            <h3>Advanced Booking</h3>
            
          </div>
          <div className="service-item">
            <h3>Ticket Generation</h3>
            
          </div>
          <div className="service-item">
            <h3>Customer Service Solutions</h3>
           </div>

          {/* Add more services as needed */}
        </div>
      </div>
    </div>
  );
};

export default OurServices;

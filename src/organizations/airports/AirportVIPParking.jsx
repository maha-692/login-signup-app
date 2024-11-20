import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './AirportVIPParking.css';

function AirportVIPParking() {  // Updated to start with uppercase
  const [parkingInfo, setParkingInfo] = useState([]);
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const vipName = event.target.vipName.value;
    const vipStatus = event.target.vipStatus.value;

    const newEntry = {
      vipName,
      vipStatus,
    };

    setParkingInfo([...parkingInfo, newEntry]);
    event.target.reset();

    // Redirect to VIPPark Availability page
    navigate('/airport/vip/availability'); // Adjust the path according to your routing
  };

  return (
    <div className="container">
      <h1>VIP Parking Management</h1>

      <div className="form-section">
        <h2>Register VIP for Parking</h2>

        <form onSubmit={handleFormSubmit} className="parking-form">
          <div className="form-group">
            <label htmlFor="vipName">VIP Name</label>
            <input
              type="text"
              id="vipName"
              name="vipName"
              placeholder="Enter VIP name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="vipStatus">VIP Status</label>
            <input
              type="text"
              id="vipStatus"
              name="vipStatus"
              placeholder="Enter VIP status"
              required
            />
          </div>

          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>

      <div className="parking-info-display">
        {parkingInfo.length > 0 && <h2>Registered VIP Details</h2>}
        {parkingInfo.map((entry, index) => (
          <div className="parking-card" key={index}>
            <p><strong>Name:</strong> {entry.vipName}</p>
            <p><strong>Status:</strong> {entry.vipStatus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AirportVIPParking;  // Ensure it's exported as VIPParking

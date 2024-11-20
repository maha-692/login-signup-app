import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use navigate to redirect
import './VIPRegistration.css';

const VIPRegistration = () => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsRegistered(true);
    // Redirect to the slot availability page after registration
    navigate('/hospitalparking/slot-availability/vip'); // Adjust this if needed
  };

  return (
    <div className="vip-registration-page"> {/* Scoped to VIP registration */}
      <div className="vip-parking-container">
        <h2 className="vip-heading">VIP Parking Registration</h2>
        {!isRegistered ? (
          <form onSubmit={handleSubmit} className="vip-form">
            <div className="vip-form-group">
              <label className="vip-label">Name</label>
              <input
                className="vip-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="vip-form-group">
              <label className="vip-label">Department</label>
              <select
                className="vip-select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              >
                <option value="">Select Department</option>
                <option value="Emergency">Emergency</option>
                <option value="Radiology">Radiology</option>
                <option value="ICU">ICU</option>
                <option value="General">General</option>
              </select>
            </div>
            <div className="vip-form-group">
              <label className="vip-label">Vehicle ID</label>
              <input
                className="vip-input"
                type="text"
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
                placeholder="Enter vehicle ID"
                required
              />
            </div>
            <input className="vip-submit" type="submit" value="Register" />
          </form>
        ) : (
          <div className="vip-confirmation-container">
            <h3 className="vip-confirmation-heading">Registration Successful!</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default VIPRegistration;

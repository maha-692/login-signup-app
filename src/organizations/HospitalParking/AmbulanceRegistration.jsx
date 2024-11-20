import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AmbulanceRegistration.css';

const AmbulanceRegistration = () => {
  const [name, setName] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [emergencyType, setEmergencyType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Add a specific class to the body when on this route
    document.body.classList.add('ambulance-registration-page');

    // Clean up by removing the class when the component unmounts
    return () => {
      document.body.classList.remove('ambulance-registration-page');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to the ambulance slot availability page after registration
    navigate('/hospitalparking/slot-availability/ambulance');
  };

  return (
    <div className="ambulance-registration-container">
      <h2>Ambulance Parking Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="ambulance-form-field">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter driver's name"
            required
          />
        </div>
        <div className="ambulance-form-field">
          <label>Vehicle ID</label>
          <input
            type="text"
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            placeholder="Enter ambulance vehicle ID"
            required
          />
        </div>
        <div className="ambulance-form-field">
          <label>Emergency Type</label>
          <select
            value={emergencyType}
            onChange={(e) => setEmergencyType(e.target.value)}
            required
          >
            <option value="">Select Emergency Type</option>
            <option value="Medical">Medical</option>
            <option value="Fire">Fire</option>
            <option value="Rescue">Rescue</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default AmbulanceRegistration;

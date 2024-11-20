import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientRegistration.css'; // Ensure styles are in place

const PatientRegistration = () => {
  const [name, setName] = useState('');
  const [vehicleId, setVehicleId] = useState('');

  const navigate = useNavigate(); // Navigate hook to redirect to slot page

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to the Patient slot availability page after registration
    navigate('/hospitalparking/patient-parking');
  };

  return (
    <div className="patient-registration-container">
      <div className="placecard">
        <h2 className="placecard-heading">Patient Parking Registration</h2>
        <form onSubmit={handleSubmit}>
          {/* Name and Vehicle ID */}
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter patient's name"
              required
            />
          </div>
          <div>
            <label>Vehicle ID</label>
            <input
              type="text"
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              placeholder="Enter vehicle ID"
              required
            />
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default PatientRegistration;

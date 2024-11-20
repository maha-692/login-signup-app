import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StaffRegistration.css';

const StaffRegistration = () => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to the specific staff slot availability page after registration
    navigate('/hospitalparking/slot-availability/staff');
  };

  return (
    <div className="staff-registration-body">
      <div className="staff-parking-container">
        <h2 className="staff-registration-header">Staff Parking Registration</h2>
        <form className="staff-registration-form" onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label>Department</label>
            <select
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

export default StaffRegistration;

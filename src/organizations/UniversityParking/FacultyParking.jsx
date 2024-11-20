import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FacultyParking.css';

function FacultyParkingRegistration() {
  const navigate = useNavigate();
  const [facultyType, setFacultyType] = useState('Permanent'); // Default type is Permanent
  const [vehicleId, setVehicleId] = useState(''); // State to store the vehicle ID

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Pass the faculty type and vehicle ID to the parking availability page if necessary
    navigate('/organization/university/faculty/availability', {
      state: { facultyType, vehicleId } // Passing faculty type and vehicle ID to the next page
    });
  };

  const handleFacultyTypeChange = (e) => {
    setFacultyType(e.target.value);
  };

  const handleVehicleIdChange = (e) => {
    setVehicleId(e.target.value); // Update the vehicle ID state
  };

  return (
    <div className="page-container">
      <div className="faculty-card-container">
        <h1>Faculty Parking Registration</h1>
        <form onSubmit={handleFormSubmit} className="faculty-parking-form">
          <div className="form-group">
            <label htmlFor="facultyName">Faculty Name</label>
            <input
              type="text"
              id="facultyName"
              name="facultyName"
              placeholder="Enter faculty name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="vehicleId">Vehicle ID</label>
            <input
              type="text"
              id="vehicleId"
              name="vehicleId"
              placeholder="Enter vehicle ID"
              value={vehicleId}
              onChange={handleVehicleIdChange} // Handle vehicle ID change
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="facultyType">Faculty Type</label>
            <select
              name="facultyType"
              id="facultyType"
              value={facultyType}
              onChange={handleFacultyTypeChange}
              required
            >
              <option value="Permanent">Permanent Faculty</option>
              <option value="Visiting">Visiting Faculty</option>
            </select>
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
}

export default FacultyParkingRegistration;

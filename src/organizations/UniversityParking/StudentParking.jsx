import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import axios from 'axios';
import './StudentParking.css';

function StudentParking() {
  
  const [parkingInfo, setParkingInfo] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate
  const [availableSlots, setAvailableSlots] = useState([]);
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard');
        // Filter slots specific to Student Parking
        const studentSlots = response.data.filter(slot => slot.type === 'Student');
        setAvailableSlots(studentSlots);
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };

    fetchSlots();
  }, []); 
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const studentName = event.target.studentName.value;
    const studentId = event.target.studentId.value;
    const department = event.target.department.value;
    const vehicleId = event.target.vehicleId.value;

    const newEntry = {
      studentName,
      studentId,
      department,
      vehicleId,
    };

    setParkingInfo([...parkingInfo, newEntry]);
    event.target.reset();

    // Redirect to Parking Availability page
    navigate('/organization/university/student/availability'); // Adjust the path according to your routing
  };

  return (
    <div className="container">
      <h1>Student Parking Management</h1>

      <div className="form-section">
        <h2>Register a Student for Parking</h2>

        <form onSubmit={handleFormSubmit} className="parking-form">
          <div className="form-group">
            <label htmlFor="studentName">Student Name</label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              placeholder="Enter student name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="studentId">Student ID</label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              placeholder="Enter student ID"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select id="department" name="department" required>
              <option value="BSCS">BSCS</option>
              <option value="BSSE">BSSE</option>
              <option value="BCA">BCA</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="vehicleId">Vehicle ID</label>
            <input
              type="text"
              id="vehicleId"
              name="vehicleId"
              placeholder="Enter vehicle ID"
              required
            />
          </div>

          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>

      <div className="parking-info-display">
        {parkingInfo.length > 0 && <h2>Registered Parking Details</h2>}
        {parkingInfo.map((entry, index) => (
          <div className="parking-card" key={index}>
            <p><strong>Name:</strong> {entry.studentName}</p>
            <p><strong>ID:</strong> {entry.studentId}</p>
            <p><strong>Department:</strong> {entry.department}</p>
            <p><strong>Vehicle ID:</strong> {entry.vehicleId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentParking;

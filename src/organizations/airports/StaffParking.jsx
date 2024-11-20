import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './StaffParking.css';


function StaffParkingManagement() {
  const [parkingInfo, setParkingInfo] = useState([]);
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const staffName = event.target.staffName.value;
    const staffId = event.target.staffId.value;
    const parkingType = event.target.parkingType.value;

    const newEntry = {
      staffName,
      staffId,
      parkingType,
    };

    setParkingInfo([...parkingInfo, newEntry]);
    event.target.reset();


    // Redirect to Parking Availability page
    navigate('/airport/staff/availability'); // Adjust the path according to your routing
  };

  return (
    <div className="container">
      <h1>Staff Parking Management</h1>

      <div className="form-section">
        <h2>Register Staff for Parking</h2>

        <form onSubmit={handleFormSubmit} className="parking-form">
          <div className="form-group">
            <label htmlFor="staffName">Staff Name</label>
            <input
              type="text"
              id="staffName"
              name="staffName"
              placeholder="Enter staff name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="staffId">Staff ID</label>
            <input
              type="text"
              id="staffId"
              name="staffId"
              placeholder="Enter staff ID"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="parkingType">Parking Type</label>
            <select id="parkingType" name="parkingType" required>
              <option value="2months">2 Months</option>
              <option value="6months">6 Months</option>
              <option value="8months">8 Months</option>
            </select>
          </div>

          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>

      <div className="parking-info-display">
        {parkingInfo.length > 0 && <h2>Registered Parking Details</h2>}
        {parkingInfo.map((entry, index) => (
          <div className="parking-card" key={index}>
            <p><strong>Name:</strong> {entry.staffName}</p>
            <p><strong>ID:</strong> {entry.staffId}</p>
            <p><strong>Parking Type:</strong> {entry.parkingType}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StaffParkingManagement;

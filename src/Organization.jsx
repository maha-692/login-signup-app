import React, { useState } from 'react';
import './Organization.css'; // Ensure this file path is correct

const Organization = () => {
  const [selectedParking, setSelectedParking] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedParking([...selectedParking, value]);
    } else {
      setSelectedParking(selectedParking.filter((item) => item !== value));
    }
  };

  const handleSubmit = () => {
    if (selectedParking.length > 0) {
      setConfirmationMessage(`You have selected: ${selectedParking.join(', ')}`);
    } else {
      setConfirmationMessage('Please select at least one parking type.');
    }
  };

  return (
    <div className="organization-container">
      <h1>Select Parking Types</h1>
      <form>
        <div className="parking-type">
          <input
            type="checkbox"
            id="eventParking"
            name="parkingType"
            value="Event Parking"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="eventParking">Event Parking</label>
        </div>
        <div className="parking-type">
          <input
            type="checkbox"
            id="vipParking"
            name="parkingType"
            value="VIP Parking"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="vipParking">VIP Parking</label>
        </div>
        <div className="parking-type">
          <input
            type="checkbox"
            id="generalParking"
            name="parkingType"
            value="General Parking"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="generalParking">General Parking</label>
        </div>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <div id="confirmation" className="confirmation">
        {confirmationMessage}
      </div>
    </div>
  );
};

export default Organization;

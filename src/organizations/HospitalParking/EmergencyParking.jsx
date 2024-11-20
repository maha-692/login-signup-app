import React from 'react';
import './EmergencyParking.css';

function EmergencyParking() {
  return (
    <div className="emergency-parking-container">
      <h2 className="title">Emergency Parking</h2>
      <div className="slot reserved">
        <div className="slot-info">
          <span className="reserved-message">Reserved for Emergency Vehicles</span>
        </div>
      </div>
    </div>
  );
}

export default EmergencyParking;

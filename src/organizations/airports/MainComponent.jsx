import React, { useState, useEffect } from 'react';
import AirportAdminDashboard from './AirportAdminDashboard'; // Adjust the path as needed
import './Modal.css'; // The CSS file for styling the modal

function MainComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal on component load
  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <AirportAdminDashboard />
          </div>
        </div>
      )}
    </div>
  );
}

export default MainComponent;

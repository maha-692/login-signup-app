import React, { useState } from 'react';
import './ParkingSystem.css';

// Import your images
import hospitalsImage from './assets/hsp.jpeg';
import universitiesImage from './assets/uni.jpeg';
import cashAndCarriesImage from './assets/csh.jpeg';
import airportsImage from './assets/air.jpeg';

const ParkingSystem = () => {
  const [showDropdown, setShowDropdown] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleDropdown = (category) => {
    setShowDropdown((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleCategoryClick = (category) => {
    setShowModal(true); // Open the modal for role selection
    setSelectedCategory(category); // Save the clicked category
  };

  const handleRoleSelect = (role) => {
    setShowModal(false); // Close the modal
    // Navigate to the appropriate login route based on role and category
    const roleRoutes = {
      Admin: `/login?role=admin&category=${selectedCategory}`,
      Customer: `/login?role=customer&category=${selectedCategory}`,
    };
    window.location.href = roleRoutes[role];
  };

  return (
    <div className="parking-system">
      <h2>Parking Systems</h2>
      <div className="categories">
        <div
          className="category"
          onClick={() => handleCategoryClick('Universities')}
        >
          <div className="category-title">Universities</div>
          <img
            className="category-image"
            src={universitiesImage}
            alt="Universities"
          />
        </div>

        <div
          className="category"
          onClick={() => handleCategoryClick('CashAndCarries')}
        >
          <div className="category-title">Cash and Carries</div>
          <img
            className="category-image"
            src={cashAndCarriesImage}
            alt="Cash and Carries"
          />
        </div>

        <div
          className="category"
          onClick={() => handleCategoryClick('Airports')}
        >
          <div className="category-title">Airports</div>
          <img
            className="category-image"
            src={airportsImage}
            alt="Airports"
          />
        </div>

        <div
          className="category"
          onClick={() => handleCategoryClick('Hospitals')}
        >
          <div className="category-title">Hospitals</div>
          <img
            className="category-image"
            src={hospitalsImage}
            alt="Hospitals"
          />
        </div>
      </div>

      {/* Modal for role selection */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Select Your Role</h3>
            <button
              className="modal-button"
              onClick={() => handleRoleSelect('Admin')}
            >
              Admin
            </button>
            <button
              className="modal-button"
              onClick={() => handleRoleSelect('Customer')}
            >
              Customer
            </button>
            <button
              className="modal-close"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingSystem;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HospitalPage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleCardClick = (type) => {
    // Updated routes with the '/hospitalparking' prefix
    if (type === 'visitor') {
      navigate('/hospitalparking/visitor-parking');
    } else if (type === 'emergency') {
      navigate('/hospitalparking/emergency-parking');
    } else if (type === 'admin') {
      navigate('/hospitalparking/admin-dashboard');
    } else if (type === 'patient') {
      navigate('/hospitalparking/patient-parking/register');
    } else {
      navigate(`/hospitalparking/register/${type}`);
    }
  };

  return (
    <div className="hospital-home-container">
      <h1 className="hospital-title">Hospital Parking Management System</h1>
      <div className="hospital-cards-container">
        <div className="hospital-card" onClick={() => handleCardClick('staff')}>
          <h2>Staff Parking</h2>
        </div>
        <div className="hospital-card" onClick={() => handleCardClick('vip')}>
          <h2>VIP Parking</h2>
        </div>
        <div className="hospital-card" onClick={() => handleCardClick('ambulance')}>
          <h2>Ambulance Parking</h2>
        </div>
        <div className="hospital-card" onClick={() => handleCardClick('visitor')}>
          <h2>Visitor Parking</h2>
        </div>
        <div className="hospital-card" onClick={() => handleCardClick('emergency')}>
          <h2>Emergency Parking</h2>
        </div>
        <div className="hospital-card" onClick={() => handleCardClick('admin')}>
          <h2>Admin</h2>
        </div>
        <div className="hospital-card" onClick={() => handleCardClick('patient')}>
          <h2>Patient Parking</h2>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

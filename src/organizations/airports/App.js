import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AirportParking from './organizations/Airport/AirportParking';
import MainComponent from './organizations/Airport/MainComponent'; // Use MainComponent here

import StaffParking from './organizations/Airport/StaffParking';
import ParkingAvailability from './organizations/Airport/ParkingAvailability';

import VIPParking from './organizations/Airport/VIPParking';
import VIPParkAvailability from './organizations/Airport/VIPParkAvailability';

import PassengerParking from './organizations/Airport/PassengerParking';

import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Main route for AirportParking */}
          <Route path="/" element={<AirportParking />} />

          {/* Routes for specific parking types */}
          <Route path="/airport/passenger" element={<PassengerParking />} />
          
          <Route path="/airport/staff" element={<StaffParking />} />
          <Route path="/airport/staff/availability" element={<ParkingAvailability />} />

          <Route path="/airport/vip" element={<VIPParking />} />
          <Route path="/airport/vip/availability" element={<VIPParkAvailability />} />

          {/* Use MainComponent here to access the Admin Dashboard modal */}
          <Route path="/airport/admin" element={<MainComponent />} />
        </Routes> 
      </div>
    </Router>
  );
};

export default App;

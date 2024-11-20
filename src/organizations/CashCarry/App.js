// app.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage'  // The main page with place cards
import Customers from './Components/CustomerParking';
import AdminParking from './Components/AdminParking';
import VIPParking from './Components/VIPParking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/admin" element={<AdminParking />} />
        <Route path="/vip" element={<VIP  Parking />} />
      </Routes>
    </Router>
  );
}

export default App;

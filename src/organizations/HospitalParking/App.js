import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import StaffRegistration from './Components/StaffRegistration';
import VisitorParking from './Components/VisitorParking';
import AdminDashboard from './Components/AdminDashboard';
import StaffSlotAvailability from './Components/StaffSlotAvailability';
import VIPRegistration from './Components/VIPRegistration';
import VIPSlotAvailability from './Components/VIPSlotAvailability';
import AmbulanceRegistration from './Components/AmbulanceRegistration';
import AmbulanceSlotAvailability from './Components/AmbulanceSlotAvailability';
import EmergencyParking from './Components/EmergencyParking';
import PatientRegistration from './Components/PatientRegistration'; 
import PatientParking from './Components/PatientParking';

function App() {
  return (
    <Router>
      <Routes>
        {/* Base routes for the Hospital Parking system */}
        <Route path="/hospitalparking/home" element={<HomePage />} />
        <Route path="/hospitalparking/register/staff" element={<StaffRegistration />} />
        <Route path="/hospitalparking/register/vip" element={<VIPRegistration />} />
        <Route path="/hospitalparking/register/ambulance" element={<AmbulanceRegistration />} />
        <Route path="/hospitalparking/visitor-parking" element={<VisitorParking />} />
        <Route path="/hospitalparking/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/hospitalparking/slot-availability/staff" element={<StaffSlotAvailability />} />
        <Route path="/hospitalparking/slot-availability/vip" element={<VIPSlotAvailability />} />
        <Route path="/hospitalparking/slot-availability/ambulance" element={<AmbulanceSlotAvailability />} />
        <Route path="/hospitalparking/emergency-parking" element={<EmergencyParking />} />
        <Route path="/hospitalparking/patient-parking/register" element={<PatientRegistration />} />
        <Route path="/hospitalparking/patient-parking" element={<PatientParking />} />
      </Routes>
    </Router>
  );
}

export default App;

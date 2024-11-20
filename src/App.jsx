// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Signup from './Signup';
import Login from './Login';
import Home from './Homepage';
import ParkingSystem from './ParkingSystem';
import HomePage from './organizations/CashCarry/HomePage';
import AdminParking from './organizations/CashCarry/AdminParking';
import CustomerParking from './organizations/CashCarry/CustomerParking';
import VIPParking from './organizations/CashCarry/VIPParking';

import AirportParking from './organizations/airports/AirportParking';
import PassengerParking from './organizations/airports/PassengerParking';
import StaffParking from './organizations/airports/StaffParking';
import ParkingAvailability from './organizations/airports/ParkingAvailability';
import AirportVIPParking from './organizations/airports/AirportVIPParking';
import AirportAdminDashboard from './organizations/airports/AirportAdminDashboard';
import VIPParkAvailability from './organizations/airports/VIPParkAvailability';
import OurServices from './OurServices';
import Organization from './Organization';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import './App.css';

import HospiatalPage from './organizations/HospitalParking/HospitalPage';
import StaffRegistration from './organizations/HospitalParking/StaffRegistration';
import StaffSlotAvailability from './organizations/HospitalParking/StaffSlotAvailability';
import VIPRegistration from './organizations/HospitalParking/VIPRegistration';
import VIPSlotAvailability from './organizations/HospitalParking/VIPSlotAvailability';
import AmbulanceRegistration from './organizations/HospitalParking/AmbulanceRegistration';
import AmbulanceSlotAvailability from './organizations/HospitalParking/AmbulanceSlotAvailability';
import VisitorParking from './organizations/HospitalParking/VisitorParking';
import EmergencyParking from './organizations/HospitalParking/EmergencyParking';
import PatientRegistration from './organizations/HospitalParking/PatientRegistration';
import PatientParking from './organizations/HospitalParking/PatientParking';
import AdminDashboard from './organizations/HospitalParking/AdminDashboard';

import UniAdminDashboard from './organizations/UniversityParking/UniAdminDashboard';
import EventParking from './organizations/UniversityParking/EventParking';
import FacultyParking from './organizations/UniversityParking/FacultyParking';
import FacultyParkingAvaliability from './organizations/UniversityParking/FacultyParkingAvaliability';
import StudentParking from './organizations/UniversityParking/StudentParking';
import UniParkingAvaliability from './organizations/UniversityParking/UniParkingAvaliability';
import UniversityParking from './organizations/UniversityParking/UniversityParking';
import ParkingSelection from './organizations/UniversityParking/ParkingSelection';







const App = () => {
  return (
    <Router> 
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Homepage" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ParkingSystem" element={<ParkingSystem />} />

          <Route path="/cashcarry/home" element={<HomePage />} />
          <Route path="/cashcarry/customers" element={<CustomerParking />} />
          <Route path="/cashcarry/admin" element={<AdminParking />} />
          <Route path="/cashcarry/vip" element={<VIPParking />} />

          <Route path="/" element={<ParkingSystem />} />
          <Route path="/airports/AirportParking" element={<AirportParking />} />

          <Route path="/airports/passenger" element={<PassengerParking />} />
          <Route path="/airports/staff" element={<StaffParking />} />
          <Route path="/airport/staff/availability" element={<ParkingAvailability />} />
          <Route path="/airports/vip" element={<AirportVIPParking />} />
          <Route path="/airport/vip/availability" element={<VIPParkAvailability />} />
          <Route path="/airports/admin" element={<AirportAdminDashboard />} />

          <Route path="/hospitalparking/home" element={<HospiatalPage />} />
          <Route path="/hospitalparking/register/staff" element={<StaffRegistration />} />
          <Route path="/hospitalparking/slot-availability/staff" element={<StaffSlotAvailability />} />
          <Route path="/hospitalparking/register/vip" element={<VIPRegistration />} />
          <Route path="/hospitalparking/slot-availability/vip" element={<VIPSlotAvailability />} />
          <Route path="/hospitalparking/register/ambulance" element={<AmbulanceRegistration />} />
          <Route path="/hospitalparking/slot-availability/ambulance" element={<AmbulanceSlotAvailability />} />
          <Route path="/hospitalparking/visitor-parking" element={<VisitorParking />} />
          <Route path="/hospitalparking/emergency-parking" element={<EmergencyParking />} />
          <Route path="/hospitalparking/patient-parking/register" element={<PatientRegistration />} />
          <Route path="/hospitalparking/patient-parking" element={<PatientParking />} />
          <Route path="/hospitalparking/admin-dashboard" element={<AdminDashboard />} />

          <Route path='organization/university/admin' element={<UniAdminDashboard/>}/>
          <Route path='organization/university/faculty' element={<FacultyParking/>}/>
          <Route path='organization/university/faculty/availability' element={<FacultyParkingAvaliability/>}/>
          <Route path='/organization/university/student' element={<StudentParking/>}/>
          <Route path='/organization/university/student/availability' element={<UniParkingAvaliability/>}/>
          <Route path='/organization/university/Event' element={<EventParking/>}/>
          <Route path='/uniparking/parking' element={<UniversityParking/>}/>
          <Route path='/uniparking/parking-selection'element={<ParkingSelection/>}/>
          

          



          <Route path="/OurServices" element={<OurServices />} />
          <Route path="/Organization" element={<Organization />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUs" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

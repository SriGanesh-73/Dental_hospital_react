import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import AboutUs from './pages/About_Us';
import ContactUs from './pages/contact.jsx';
import Careers from './pages/careers.jsx';
import TermsAndConditions from './pages/terms.jsx';
import PrivacyPolicy from './pages/privacy_policy.jsx';
import AppointmentBooking from './pages/Appointment_Booking_form.jsx';
import DoctorTreatment from './pages/Doctor_Treatment_details.jsx';
import LoginPage from './pages/Login_form.jsx';
import RegisterPage from './pages/Register_form.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import UserAppointments from './pages/UserAppointments.jsx';

// Create Overlay Context
const OverlayContext = React.createContext();

const AllRouters = () => {
  const [overlayVisible, setOverlayVisible] = useState(false);

  return (
    <OverlayContext.Provider value={{ overlayVisible, setOverlayVisible }}>
      <Router>
        {/* Global Overlay - controlled by NavBar and other components */}
        <div 
          className={`overlay ${overlayVisible ? 'visible' : ''}`}
          onClick={() => setOverlayVisible(false)}
          style={{
            display: overlayVisible ? 'block' : 'none',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1000,
          }}
        />
        
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/index.html" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/book-appointment" element={<AppointmentBooking />} />
          <Route path="/doctor-treatment" element={<DoctorTreatment />} />
          <Route path="/login-form" element={<LoginPage />} />
          <Route path="/register-form" element={<RegisterPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/user2" element={<UserAppointments />} />
          {/* Add a catch-all route for 404 pages */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </OverlayContext.Provider>
  );
};

// Export the context to be used in other components
export { OverlayContext };
export default AllRouters;
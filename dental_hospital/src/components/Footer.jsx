import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import '../styles/footer.css';
import { FaTooth, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box component="footer" id="footer">
      {/* Column 1 - About */}
      <Box className="footer-column">
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: '10px', mb: 2 }}>
          <FaTooth size={24} color="#f3a712" />
          <Box component="h3" sx={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
            DentaEase
          </Box>
        </Box>
        <Box sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
          Providing exceptional dental care with cutting-edge technology and compassionate service since 2010.
        </Box>
      </Box>

      {/* Column 2 - Quick Links */}
      <Box className="footer-column">
        <h3>Quick Links</h3>
        <Box component={Link} to="/services" className="footer-link">
          <i>→</i> Our Services
        </Box>
        <Box component={Link} to="/doctors" className="footer-link">
          <i>→</i> Meet Our Dentists
        </Box>
        <Box component={Link} to="/appointment" className="footer-link">
          <i>→</i> Book Appointment
        </Box>
        <Box component={Link} to="/emergency" className="footer-link">
          <i>→</i> Emergency Care
        </Box>
      </Box>

      {/* Column 3 - Contact */}
      <Box className="footer-column">
        <h3>Contact Us</h3>
        <Box className="contact-info">
          <Box className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <span>123 Dental Street, Health City, HC 56789</span>
          </Box>
          <Box className="contact-item">
            <FaPhoneAlt className="contact-icon" />
            <span>+1 (555) 123-4567</span>
          </Box>
          <Box className="contact-item">
            <FaEnvelope className="contact-icon" />
            <span>info@dentaease.com</span>
          </Box>
        </Box>
      </Box>

      {/* Column 4 - Social & Legal */}
      <Box className="footer-column">
        <h3>Follow Us</h3>
        <Box className="social-links">
          <a href="#" className="social-link"><FaFacebookF /></a>
          <a href="#" className="social-link"><FaTwitter /></a>
          <a href="#" className="social-link"><FaInstagram /></a>
          <a href="#" className="social-link"><FaLinkedinIn /></a>
        </Box>
        
        <Box id="landing_pages" sx={{ mt: 3 }}>
          <Box component={Link} to="/terms" className="footer-link">
            Terms and Conditions
          </Box>
          <Box component="span" sx={{ mx: 1 }}>|</Box>
          <Box component={Link} to="/privacy-policy" className="footer-link">
            Privacy Policy
          </Box>
          <Box component="span" sx={{ mx: 1 }}>|</Box>
          <Box component={Link} to="/faq" className="footer-link">
            FAQ
          </Box>
        </Box>
      </Box>

      {/* Copyright */}
      <Box component="p" className="copyright">
        Copyrights © 2025 DentaEase. All rights reserved.
      </Box>
    </Box>
  );
};

export default Footer;
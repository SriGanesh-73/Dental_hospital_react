import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import '../styles/index.css';

const Footer = () => {
  return (
    <Box component="footer" id="footer">
      <Box component="p" className="copyright">
        Copyrights © 2025 DentaEase. All rights reserved.
      </Box>
      
      <Box component="div" id="landing_pages">
        <Box component={Link} to="/terms" className="footer-link">
          Terms and Conditions
        </Box>
        <Box component="span">|</Box>
        <Box component={Link} to="/privacy-policy" className="footer-link">
          Privacy & Policy
        </Box>
        <Box component="span">|</Box>
        <Box component="a" href="faq.html" className="footer-link">
          FAQ
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
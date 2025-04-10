import React from 'react';
import '../styles/index.css'
import {Link} from 'react-router-dom'
const Footer = () => {
  return (
    <div id="footer">
    <p>Copyrights © 2025 DentaEase. All rights reserved.</p>
    <div id="landing_pages">
        <Link to="/terms">Terms and Conditions</Link>
        <span>|</span>
        <Link to="/privacy-policy">Privacy & Policy</Link>
        <span>|</span>
        <a href="faq.html">FAQ</a>
    </div>
    </div>
  );
};

export default Footer;
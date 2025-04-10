import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/index.css';

const featureItems = [
  'Electronic Patient Records',
  'Appointment and Schedules',
  'SMS and Email Notifications',
  'Accounts & Cash Management',
  'Reporting System',
  'Document Management',
  'Administrator',
  'Inventory Management',
  'Lab Management'
];

const RightSideMenu = ({ isRightMenuOpen, isRightDropdownActive, toggleRightDropdown }) => {
  return (
    <div 
      id="right-menu" 
      className={isRightMenuOpen ? 'open' : ''}
    >
      <div id="section1">
        {['DISCOVER', 'MANAGE', 'EDUCATE', 'BUY'].map((item) => (
          <Link key={item} to={`#${item.toLowerCase()}`}>{item}</Link>
        ))}
      </div>
      
      <div id="section2">
        <div 
          id="dropdown1" 
          className={`features-dropdown ${isRightDropdownActive ? 'active' : ''}`}
          onClick={toggleRightDropdown}
        >
          <div id="features">
            <a id="ele1" href="#">Features</a>
            <span id="ele2"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg></span>
          </div>
          <ul id="dropdown-content1" className="features-list">
            {featureItems.map((item, index) => (
              <li key={index}>
                <Link to={`#features${index + 1}`}>{item}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/careers">Careers</Link>
        <Link to="/contact-us">Contact Us</Link>
        <Link to="#support">Support</Link>
      </div>
    </div>
  );
};

export default RightSideMenu;
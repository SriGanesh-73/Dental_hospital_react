import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
    <Box
      component="div"
      id="right-menu"
      className={isRightMenuOpen ? 'open' : ''}
    >
      <Box component="div" id="section1">
        {['DISCOVER', 'MANAGE', 'EDUCATE', 'BUY'].map((item) => (
          <Box
            key={item}
            component={RouterLink}
            to={`#${item.toLowerCase()}`}
          >
            {item}
          </Box>
        ))}
      </Box>

      <Box component="div" id="section2">
        <Box
          component="div"
          id="dropdown1"
          className={`features-dropdown ${isRightDropdownActive ? 'active' : ''}`}
          onClick={toggleRightDropdown}
        >
          <Box component="div" id="features">
            <Box component="a" id="ele1" href="#">Features</Box>
            <Box component="span" id="ele2">
              <ExpandMoreIcon
                style={{
                  transition: 'transform 0.3s',
                  transform: isRightDropdownActive ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
              />
            </Box>
          </Box>

          <Collapse in={isRightDropdownActive}>
            <Box component="ul" id="dropdown-content1" className="features-list">
              {featureItems.map((item, index) => (
                <Box component="li" key={index}>
                  <Box component={RouterLink} to={`#features${index + 1}`}>
                    {item}
                  </Box>
                </Box>
              ))}
            </Box>
          </Collapse>
        </Box>

        <Box component={RouterLink} to="/careers">Careers</Box>
        <Box component={RouterLink} to="/contact-us">Contact Us</Box>
        <Box component={RouterLink} to="#support">Support</Box>
      </Box>
    </Box>
  );
};

export default RightSideMenu;
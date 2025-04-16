import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';
import '../styles/index.css';
import RightSideMenu from '../pages/right_side_menu';

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

const NavBar = () => {
  const [menuState, setMenuState] = useState({
    isMenuActive: false,
    isDropdownActive: false,
    isRightMenuOpen: false,
    isRightDropdownActive: false
  });

  const menuContainerRef = useRef(null);
  const dropdownRef = useRef(null);
  const overlayRef = useRef(null);
  const hamburgerRef = useRef(null);

  const toggleOverlay = useCallback((show) => {
    if (overlayRef.current) {
      overlayRef.current.style.display = show ? 'block' : 'none';
    }
  }, []);

  const closeAllMenus = useCallback(() => {
    setMenuState(prev => ({
      ...prev,
      isMenuActive: false,
      isRightMenuOpen: false
    }));
    document.body.classList.remove("menu-open");
    toggleOverlay(false);
    if (hamburgerRef.current) {
      hamburgerRef.current.textContent = "☰";
    }
  }, [toggleOverlay]);

  const toggleMobileMenu = useCallback(() => {
    const newState = !menuState.isMenuActive;
    setMenuState(prev => ({
      ...prev,
      isMenuActive: newState,
      isRightMenuOpen: false
    }));
    toggleOverlay(newState);
    
    if (hamburgerRef.current) {
      hamburgerRef.current.textContent = newState ? "✖" : "☰";
    }
  }, [menuState.isMenuActive, toggleOverlay]);

  const toggleRightMenu = useCallback(() => {
    const willOpen = !menuState.isRightMenuOpen;
    setMenuState(prev => ({
      ...prev,
      isRightMenuOpen: willOpen,
      isMenuActive: false
    }));
    
    if (willOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    
    toggleOverlay(willOpen);
    
    if (hamburgerRef.current) {
      hamburgerRef.current.textContent = willOpen ? "✖" : "☰";
    }
  }, [menuState.isRightMenuOpen, toggleOverlay]);

  const handleHamburgerClick = useCallback(() => {
    if (window.innerWidth <= 768) {
      toggleMobileMenu();
    } else {
      toggleRightMenu();
    }
  }, [toggleMobileMenu, toggleRightMenu]);

  const toggleDropdown = useCallback((e) => {
    e.stopPropagation();
    setMenuState(prev => ({ ...prev, isDropdownActive: !prev.isDropdownActive }));
  }, []);

  const toggleRightDropdown = useCallback((e) => {
    e.stopPropagation();
    setMenuState(prev => ({ ...prev, isRightDropdownActive: !prev.isRightDropdownActive }));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuContainerRef.current && 
        !menuContainerRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        closeAllMenus();
      }
      
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuState(prev => ({ ...prev, isDropdownActive: false }));
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [closeAllMenus]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuState.isMenuActive) {
        closeAllMenus();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuState.isMenuActive, closeAllMenus]);

  return (
    <Box component="div" className="navbar">
      <Box component="div" id="icon">
        <Box component="img" src={logo} width="20px" height="20px" alt="DentaEase Logo" />
        <Box component="h3"><Box component={Link} to="/">DentaEase</Box></Box>
      </Box>
      
      <Box 
        component="div"
        id="container" 
        ref={menuContainerRef} 
        className={menuState.isMenuActive ? "active" : ""}
      >
        <Box component="ul" id="menu">
          <Box component="li"><Box component={Link} to="/">Home</Box></Box>
          <Box 
            component="li"
            id="dropdown" 
            ref={dropdownRef} 
            className={menuState.isDropdownActive ? "active" : ""} 
            onClick={toggleDropdown}
          >
            <Box component={Link} to="#">Features</Box>
            <Box component="ul" id="dropdown-content">
              {featureItems.map((item, index) => (
                <Box component="li" key={index}>
                  <Box component={Link} to={`#features${index + 1}`}>{item}</Box>
                </Box>
              ))}
            </Box>
          </Box>
          <Box component="li"><Box component={Link} to="/careers">Careers</Box></Box>
          <Box component="li"><Box component={Link} to="/about-us">About Us</Box></Box>
          <Box component="li"><Box component={Link} to="/contact-us">Contact Us</Box></Box>
        </Box>
        
        <Box component="div" className="auth-buttons">
          <Box component={Link} to="/login-form"><Box component="button">LOGIN</Box></Box>
          <Box component={Link} to="/register-form"><Box component="button">REGISTER</Box></Box>
        </Box>
      </Box>
      
      <Box 
        component="span"
        id="menu-btn1"
        ref={hamburgerRef}
        onClick={handleHamburgerClick}
      >
        ☰
      </Box>
      
      <RightSideMenu
        isRightMenuOpen={menuState.isRightMenuOpen}
        isRightDropdownActive={menuState.isRightDropdownActive}
        toggleRightDropdown={toggleRightDropdown}
        featureItems={featureItems}
      />
    </Box>
  );
};

export default NavBar;
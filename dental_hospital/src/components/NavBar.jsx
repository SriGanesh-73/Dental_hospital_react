import React, { useState, useRef, useEffect, useCallback } from 'react';
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
    <div className="navbar">
      <div id="icon">
        <img src={logo} width="20px" height="20px" alt="DentaEase Logo" />
        <h3><Link to="/">DentaEase</Link></h3>
      </div>
      
      <div 
        id="container" 
        ref={menuContainerRef} 
        className={menuState.isMenuActive ? "active" : ""}
      >
        <ul id="menu">
          <li><Link to="/">Home</Link></li>
          <li 
            id="dropdown" 
            ref={dropdownRef} 
            className={menuState.isDropdownActive ? "active" : ""} 
            onClick={toggleDropdown}
          >
            <Link to="#">Features</Link>
            <ul id="dropdown-content">
              {featureItems.map((item, index) => (
                <li key={index}>
                  <Link to={`#features${index + 1}`}>{item}</Link>
                </li>
              ))}
            </ul>
          </li>
          <li><Link to="/careers">Careers</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>
        </ul>
        
        <div className="auth-buttons">
          <Link to="/login-form"><button>LOGIN</button></Link>
          <Link to="/register-form"><button>REGISTER</button></Link>
        </div>
      </div>
      
      <span 
        id="menu-btn1"
        ref={hamburgerRef}
        onClick={handleHamburgerClick}
      >
        ☰
      </span>
      
      <RightSideMenu
        isRightMenuOpen={menuState.isRightMenuOpen}
        isRightDropdownActive={menuState.isRightDropdownActive}
        toggleRightDropdown={toggleRightDropdown}
        featureItems={featureItems}
      />
    </div>
  );
};

export default NavBar;
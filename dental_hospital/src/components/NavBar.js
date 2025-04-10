import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/index.css';
import NavBar from './NavBar.jsx'; // Import the NavBar component

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
    <NavBar />
  </React.StrictMode>
);
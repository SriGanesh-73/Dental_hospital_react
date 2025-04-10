import React, { useState,useEffect } from 'react';
import '../styles/forms.css';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import { Link } from 'react-router-dom';
import '../styles/index.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    // Validation patterns
    const namePattern = /^[a-zA-Z\s]{3,}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[6789]\d{9}$/;

    const validateInput = (name, value) => {
        switch (name) {
            case 'name':
                if (!namePattern.test(value.trim())) {
                    return 'Enter a valid name (at least 3 letters)';
                }
                return '';
            case 'email':
                if (!emailPattern.test(value.trim())) {
                    return 'Enter a valid email address';
                }
                return '';
            case 'phone':
                if (!phonePattern.test(value.trim())) {
                    return 'Enter a valid 10-digit phone number';
                }
                return '';
            case 'password':
                if (value.length < 6) {
                    return 'Password must be at least 6 characters';
                }
                return '';
            case 'confirmPassword':
                if (value !== formData.password) {
                    return 'Passwords do not match';
                }
                return '';
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Validate the changed field
        const error = validateInput(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate all fields
        const newErrors = {
            name: validateInput('name', formData.name),
            email: validateInput('email', formData.email),
            phone: validateInput('phone', formData.phone),
            password: validateInput('password', formData.password),
            confirmPassword: validateInput('confirmPassword', formData.confirmPassword)
        };

        setErrors(newErrors);

        // Check if form is valid
        const isValid = Object.values(newErrors).every(error => error === '');
        
        const clearAllErrors = {
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        };

        if (isValid) {
            //Clear all errors
            setFormData(clearAllErrors); 
            alert('Registration successful!');
            // Here you would typically handle the registration logic
        }
    };
    // Scroll animation effect
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const img = entry.target.querySelector(".hidden");
            const text = entry.target.querySelector(".hidden1");
            
            if (entry.isIntersecting) {
            if (img) img.classList.add("show");
            if (text) text.classList.add("show1");
            } else {
            if (img) img.classList.remove("show");
            if (text) text.classList.remove("show1");
            }
        });
        }, { threshold: 0.2 });
        
        // Observe the scroll containers
        const scrollContainers = document.querySelectorAll(".scroll-container");
        scrollContainers.forEach((container) => observer.observe(container));
        
        return () => {
        scrollContainers.forEach((container) => observer.unobserve(container));
        };
    }, []);
    return (
        <div className="main">
          <NavBar />
          <div className="overlay"></div>
          <div id="register-container" className="scroll-container">
              <h1 className="hidden">Register</h1>
              <form className="hidden1" id="registerForm" onSubmit={handleSubmit}>
                  <label htmlFor="name">Full Name</label>
                  <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      placeholder="Enter your name" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                  />
                  <span className="error-msg">{errors.name}</span>
          
                  <label htmlFor="email">Email</label>
                  <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      placeholder="Enter your email" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                  />
                  <span className="error-msg">{errors.email}</span>
          
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      placeholder="Enter your phone number" 
                      value={formData.phone}
                      onChange={handleChange}
                      required 
                  />
                  <span className="error-msg">{errors.phone}</span>
          
                  <label htmlFor="password">Password</label>
                  <input 
                      type="password" 
                      id="password" 
                      name="password" 
                      placeholder="Enter your password" 
                      value={formData.password}
                      onChange={handleChange}
                      required 
                  />
                  <span className="error-msg">{errors.password}</span>
          
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input 
                      type="password" 
                      id="confirmPassword" 
                      name="confirmPassword" 
                      placeholder="Confirm your password" 
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required 
                  />
                  <span className="error-msg">{errors.confirmPassword}</span>
          
                  <button type="submit">Register</button>
                  
                  <div style={{ marginTop: '15px', color: 'white' }}>
                      Already have an account? <Link to="/login-form" style={{ color: '#fff', textDecoration: 'underline' }}>Login here</Link>
                  </div>
              </form>
          </div>  
          <Footer />    
        </div>
    );
};

export default Register;
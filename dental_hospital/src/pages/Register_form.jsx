import React, { useState,useEffect } from 'react';
import { Box, Button } from '@mui/material';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/forms.css';
import '../styles/index.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({ name: '', email: '', phone: '', password: '',confirmPassword:'' });

  const namePattern = /^[a-zA-Z\s]{3,}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phonePattern = /^[6789]\d{9}$/;

  const validateInput = (name, value) => {
    switch (name) {
      case 'name':
        return namePattern.test(value) ? '' : 'Enter a valid name (min 3 characters)';
      case 'email':
        return emailPattern.test(value) ? '' : 'Enter a valid email';
      case 'phone':
        return phonePattern.test(value) ? '' : 'Enter a valid 10-digit number';
      case 'password':
        return value.length >= 6 ? '' : 'Password must be at least 6 characters';
      case 'confirmPassword':
        return value!==formData.password ? 'Confirm Password must be same as password':'';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateInput(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateInput('name', formData.name),
      email: validateInput('email', formData.email),
      phone: validateInput('phone', formData.phone),
      password: validateInput('password', formData.password),
      confirmPassword: validateInput('confirmPassword',formData.confirmPassword)
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every(err => err === '');

    if (isValid) {
        const role = isAdmin ? 'admin' : 'user';
        const dataToSend = { 
            name:formData.name,
            email:formData.email,
            phone:formData.phone,
            password:formData.password,
            role:role
         }; // ⬅️ add role here

        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
            });

            const data = await response.json();

            if (response.ok) {
            alert(`${isAdmin ? 'Admin' : 'User'} registration successful!`);
            navigate('/login-form');
            } else {
            alert(data.message || 'Registration failed');
            }
        } catch (err) {
            alert('Something went wrong. Try again later.');
            console.error(err);
        }
        }
    };
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

        const scrollContainers = document.querySelectorAll(".scroll-container");
        scrollContainers.forEach((container) => observer.observe(container));

        return () => {
            scrollContainers.forEach((container) => observer.unobserve(container));
        };
    }, []);

    return (
        <Box component="div" className="main">
        <NavBar />
        <Box component="div" className="overlay"></Box>
        <Box component="div" id="register-container" className="scroll-container">
            <Box component="div" className="admin-user-toggle">
            <Button variant={!isAdmin ? "contained" : "outlined"} onClick={() => setIsAdmin(false)}>
                User Register
            </Button>
            <Button variant={isAdmin ? "contained" : "outlined"} onClick={() => setIsAdmin(true)}>
                Admin Register
            </Button>
            </Box>

            <Box component="h1" className="hidden">{isAdmin ? "Admin Registration" : "User Registration"}</Box>
            <Box component="form" className="hidden1" onSubmit={handleSubmit}>
            <Box component="label" htmlFor="name">Full Name</Box>
            <Box component="input" type="text" name="name" value={formData.name} onChange={handleChange} required />
            <Box component="span" className="error-msg">{errors.name}</Box>

            <Box component="label" htmlFor="email">Email</Box>
            <Box component="input" type="email" name="email" value={formData.email} onChange={handleChange} required />
            <Box component="span" className="error-msg">{errors.email}</Box>

            <Box component="label" htmlFor="phone">Phone</Box>
            <Box component="input" type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            <Box component="span" className="error-msg">{errors.phone}</Box>

            <Box component="label" htmlFor="password">Password</Box>
            <Box component="input" type="password" name="password" value={formData.password} onChange={handleChange} required />
            <Box component="span" className="error-msg">{errors.password}</Box>

            <Box component="label" htmlFor="confirmPassword">Confirm Password</Box>
            <Box component="input" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            <Box component="span" className="error-msg">{errors.confirmPassword}</Box>

            <Box component="button" type="submit">Register</Box>

            <Box component="div" className="notReg" style={{ marginTop: '15px', color: 'white' }}>
                Already have an account? <Link to="/login-form" style={{ color: '#fff', textDecoration: 'underline' }}>Login here</Link>
            </Box>
            </Box>
        </Box>
        <Footer />
        </Box>
    );
};

export default RegisterPage;
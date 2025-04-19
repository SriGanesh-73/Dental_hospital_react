import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/forms.css';
import '../styles/index.css';

const LoginPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    // Load data from localStorage on component mount
    useEffect(() => {
        const savedData = localStorage.getItem('loginForm');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    // Save data to localStorage when formData changes
    useEffect(() => {
        localStorage.setItem('loginForm', JSON.stringify(formData));
    }, [formData]);

    // Validation patterns
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validateInput = (name, value) => {
        switch (name) {
            case 'email':
                return emailPattern.test(value.trim()) ? '' : 'Enter a valid email address';
            case 'password':
                return value.length >= 6 ? '' : 'Password must be at least 6 characters';
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

        setErrors(prev => ({
            ...prev,
            [name]: validateInput(name, value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {
            email: validateInput('email', formData.email),
            password: validateInput('password', formData.password)
        };
        setErrors(newErrors);

        const isValid = Object.values(newErrors).every(error => error === '');

        if (isValid) {
            try {
                const response = await fetch('http://localhost:5000/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Login successful!');

                    // Save token/user if needed
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));

                    localStorage.removeItem('loginForm');
                    setFormData({ email: '', password: '' });

                    // Navigate to dashboard or home
                    navigate('/');
                } else {
                    alert(data.message || 'Login failed');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('Server error. Please try again later.');
            }
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
            <Box component="div" id="login-container" className="scroll-container">
                <Box component="h1" className="hidden">Login</Box>
                <Box 
                    component="form" 
                    className="hidden1" 
                    id="loginForm" 
                    onSubmit={handleSubmit}
                >
                    <Box component="label" htmlFor="email">Email</Box>
                    <Box 
                        component="input" 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Enter your email" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                    />
                    <Box component="span" className="error-msg">{errors.email}</Box>

                    <Box component="label" htmlFor="password">Password</Box>
                    <Box 
                        component="input" 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Enter your password" 
                        value={formData.password}
                        onChange={handleChange}
                        required 
                    />
                    <Box component="span" className="error-msg">{errors.password}</Box>

                    <Box component="button" type="submit">Login</Box>

                    <Box component="div" style={{ marginTop: '15px', color: 'white' }}>
                        Don't have an account? <Link to="/register-form" style={{ color: '#fff', textDecoration: 'underline' }}>Register here</Link>
                    </Box>
                </Box>
            </Box>  
            <Footer />    
        </Box>
    );
};

export default LoginPage;

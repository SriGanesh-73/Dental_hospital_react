import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/forms.css';
import '../styles/index.css';

const Register = () => {
    const navigate = useNavigate();

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

    const [isLoading, setIsLoading] = useState(false);

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

        const error = validateInput(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {
            name: validateInput('name', formData.name),
            email: validateInput('email', formData.email),
            phone: validateInput('phone', formData.phone),
            password: validateInput('password', formData.password),
            confirmPassword: validateInput('confirmPassword', formData.confirmPassword)
        };

        setErrors(newErrors);

        const isValid = Object.values(newErrors).every(error => error === '');

        if (isValid) {
            setIsLoading(true);
            try {
                await new Promise(res => setTimeout(res, 1000));
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: ''
                });
                alert('Registration successful!');
                navigate('/login-form');
            } catch (error) {
                alert('Something went wrong!');
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Persistence effects
    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("registerFormData"));
        if (savedData) setFormData(savedData);
    }, []);

    useEffect(() => {
        localStorage.setItem("registerFormData", JSON.stringify(formData));
    }, [formData]);
    
    // Scroll animation
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

    const isFormValid = Object.values(errors).every(err => err === '') &&
                        Object.values(formData).every(val => val !== '');

    return (
        <Box component="div" className="main">
            <NavBar />
            <Box component="div" className="overlay"></Box>
            <Box component="div" id="register-container" className="scroll-container">
                <Box component="h1" className="hidden">Register</Box>
                <Box 
                    component="form" 
                    className="hidden1" 
                    id="registerForm" 
                    onSubmit={handleSubmit}
                >
                    <Box component="label" htmlFor="name">Full Name</Box>
                    <Box 
                        component="input" 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="Enter your name" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                    />
                    <Box component="span" className="error-msg">{errors.name}</Box>

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

                    <Box component="label" htmlFor="phone">Phone Number</Box>
                    <Box 
                        component="input" 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        placeholder="Enter your phone number" 
                        value={formData.phone}
                        onChange={handleChange}
                        required 
                    />
                    <Box component="span" className="error-msg">{errors.phone}</Box>

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

                    <Box component="label" htmlFor="confirmPassword">Confirm Password</Box>
                    <Box 
                        component="input" 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        placeholder="Confirm your password" 
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required 
                    />
                    <Box component="span" className="error-msg">{errors.confirmPassword}</Box>

                    <Box component="button" type="submit" disabled={!isFormValid || isLoading}>
                        {isLoading ? 'Registering...' : 'Register'}
                    </Box>

                    <Box component="div" style={{ marginTop: '15px', color: 'white' }}>
                        Already have an account? <Link to="/login-form" style={{ color: '#fff', textDecoration: 'underline' }}>Login here</Link>
                    </Box>
                </Box>
            </Box>  
            <Footer />    
        </Box>
    );
};

export default Register;
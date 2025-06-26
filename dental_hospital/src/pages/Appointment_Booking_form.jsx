import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/forms.css';
import '../styles/index.css';

const AppointmentBooking = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        treatment: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        treatment: ''
    });
    const navigate = useNavigate();
    // Load form data from localStorage
    useEffect(() => {
        const savedForm = localStorage.getItem('appointmentForm');
        const savedUser = localStorage.getItem('user');
        if (savedForm) {
            setFormData(JSON.parse(savedForm));
        }
        if(!savedUser){
            alert('You must logged in before booking appointment!');
            navigate('/login');
        }
    }, []);

    // Save form data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('appointmentForm', JSON.stringify(formData));
    }, [formData]);

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
            case 'date':
                if (!value) {
                    return 'Please select a date';
                }
                const today = new Date().toISOString().split('T')[0];
                if (value < today) {
                    return 'Please select a future date';
                }
                return '';
            case 'time':
                if (!value) {
                    return 'Please select a time';
                }
                return '';
            case 'treatment':
                if (!value) {
                    return 'Please select a treatment';
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

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newErrors = {
            name: validateInput('name', formData.name),
            email: validateInput('email', formData.email),
            phone: validateInput('phone', formData.phone),
            date: validateInput('date', formData.date),
            time: validateInput('time', formData.time),
            treatment: validateInput('treatment', formData.treatment)
        };

        setErrors(newErrors);

        const isValid = Object.values(newErrors).every(error => error === '');
        
        if (isValid) {
            alert(`Appointment booked successfully! on ${formData.time}`);
            localStorage.removeItem('appointmentForm');
            setFormData({
                name: '',
                email: '',
                phone: '',
                date: '',
                time: '',
                treatment: '',
                message: ''
            });
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
            <Box component="div" id="appointment-container" className="scroll-container">
                <Box component="h1">Book an Appointment</Box>
                <Box component="form" id="appointmentForm" onSubmit={handleSubmit}>
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
                    <Box component="span" id="name_err" className="error-msg">{errors.name}</Box>
            
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
                    <Box component="span" id="email_err" className="error-msg">{errors.email}</Box>
            
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
                    <Box component="span" id="phone_err" className="error-msg">{errors.phone}</Box>
            
                    <Box component="label" htmlFor="date">Select Date</Box>
                    <Box 
                        component="input" 
                        type="date" 
                        id="date" 
                        name="date" 
                        value={formData.date}
                        onChange={handleChange}
                        required 
                    />
                    <Box component="span" id="date_err" className="error-msg">{errors.date}</Box>
            
                    <Box component="label" htmlFor="time">Select Time</Box>
                    <Box 
                        component="input" 
                        type="time" 
                        id="time" 
                        name="time" 
                        value={formData.time}
                        onChange={handleChange}
                        required 
                    />
                    <Box component="span" id="time_err" className="error-msg">{errors.time}</Box>
            
                    <Box component="label" htmlFor="treatment">Select Treatment</Box>
                    <Box 
                        component="select" 
                        id="treatment" 
                        name="treatment" 
                        value={formData.treatment}
                        onChange={handleChange}
                        required
                    >
                        <Box component="option" value="" disabled>Select a treatment</Box>
                        <Box component="option" value="teeth_whitening">Teeth Whitening</Box>
                        <Box component="option" value="root_canal">Root Canal Therapy</Box>
                        <Box component="option" value="braces_aligners">Braces and Aligners</Box>
                        <Box component="option" value="extraction">Extraction</Box>
                        <Box component="option" value="filling">Filling</Box>
                        <Box component="option" value="denture_removal">Denture Removal</Box>
                        <Box component="option" value="dental_implant">Dental Implant</Box>
                        <Box component="option" value="caps_crowns">Caps and Crowns</Box>
                    </Box>
                    <Box component="span" id="treatment_err" className="error-msg">{errors.treatment}</Box>
            
                    <Box component="label" htmlFor="message">Additional Message</Box>
                    <Box 
                        component="textarea" 
                        id="message" 
                        name="message" 
                        placeholder="Enter any details..."
                        value={formData.message}
                        onChange={handleChange}
                    />
            
                    <Box component="button" type="submit">Book Appointment</Box>
                </Box>
            </Box>  
            <Footer />    
        </Box>
    );
};

export default AppointmentBooking;
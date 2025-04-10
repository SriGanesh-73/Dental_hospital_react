import React, { useState, useEffect } from 'react';
import '../styles/forms.css';  // Adjusted path to styles
import NavBar from '../components/NavBar.jsx';  // Correct component path
import Footer from '../components/Footer.jsx';  // Correct component path
import '../styles/index.css';  // Adjusted global CSS path

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
            date: validateInput('date', formData.date),
            time: validateInput('time', formData.time),
            treatment: validateInput('treatment', formData.treatment)
        };

        setErrors(newErrors);

        // Check if form is valid
        const isValid = Object.values(newErrors).every(error => error === '');
        
        if (isValid) {
            alert(`Appointment booked successfully! on ${formData.time}`);
            // Reset form
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
            <div id="appointment-container" className="scroll-container">
                <h1>Book an Appointment</h1>
                <form id="appointmentForm" onSubmit={handleSubmit}>
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
                    <span id="name_err" className="error-msg">{errors.name}</span>
            
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
                    <span id="email_err" className="error-msg">{errors.email}</span>
            
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
                    <span id="phone_err" className="error-msg">{errors.phone}</span>
            
                    <label htmlFor="date">Select Date</label>
                    <input 
                        type="date" 
                        id="date" 
                        name="date" 
                        value={formData.date}
                        onChange={handleChange}
                        required 
                    />
                    <span id="date_err" className="error-msg">{errors.date}</span>
            
                    <label htmlFor="time">Select Time</label>
                    <input 
                        type="time" 
                        id="time" 
                        name="time" 
                        value={formData.time}
                        onChange={handleChange}
                        required 
                    />
                    <span id="time_err" className="error-msg">{errors.time}</span>
            
                    <label htmlFor="treatment">Select Treatment</label>
                    <select 
                        id="treatment" 
                        name="treatment" 
                        value={formData.treatment}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select a treatment</option>
                        <option value="teeth_whitening">Teeth Whitening</option>
                        <option value="root_canal">Root Canal Therapy</option>
                        <option value="braces_aligners">Braces and Aligners</option>
                        <option value="extraction">Extraction</option>
                        <option value="filling">Filling</option>
                        <option value="denture_removal">Denture Removal</option>
                        <option value="dental_implant">Dental Implant</option>
                        <option value="caps_crowns">Caps and Crowns</option>
                    </select>
                    <span id="treatment_err" className="error-msg">{errors.treatment}</span>
            
                    <label htmlFor="message">Additional Message</label>
                    <textarea 
                        id="message" 
                        name="message" 
                        placeholder="Enter any details..."
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>
            
                    <button type="submit">Book Appointment</button>
                </form>
            </div>  
            <Footer />    
        </div>
    );
};

export default AppointmentBooking;
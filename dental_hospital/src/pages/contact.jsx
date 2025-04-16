import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/landing_pages.css';
import '../styles/index.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    // Load saved data from localStorage on mount
    useEffect(() => {
        const savedForm = localStorage.getItem('contactForm');
        if (savedForm) {
            setFormData(JSON.parse(savedForm));
        }
    }, []);

    // Save form data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('contactForm', JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        // Optionally clear localStorage after submission
        localStorage.removeItem('contactForm');

        // Clear the form
        setFormData({
            name: '',
            email: '',
            message: ''
        });
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
            <Box component="header" className="scroll-container">
                <Box component="div" className="hidden1">
                    <Box component="h4">Contact Us</Box>
                </Box>
            </Box>

            <Box component="main" className="scroll-container">
                <Box component="div" className="hidden1">
                    <Box component="h5">Get in Touch</Box>
                    <Box component="p">Address: 123 Dental Street, City, State, Zip</Box>
                    <Box component="p">Phone: +1 234 567 890</Box>
                    <Box component="p">Email: contact@dentalclinic.com</Box>
                    <Box component="h6">Send us a message</Box>
                </Box>

                <Box 
                    component="form" 
                    className="hidden" 
                    onSubmit={handleSubmit}
                >
                    <Box 
                        component="input"
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <Box 
                        component="input"
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <Box 
                        component="textarea"
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                    />
                    <Box 
                        component="button"
                        type="submit"
                    >
                        Send
                    </Box>
                </Box>
            </Box>

            <Footer />
        </Box>
    );
};

export default ContactUs;
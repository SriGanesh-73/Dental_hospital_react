import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/landing_pages.css';
import '../styles/index.css';

const Careers = () => {
    const [applicationData, setApplicationData] = useState({
        name: '',
        email: '',
        resume: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setApplicationData(prev => ({
            ...prev,
            [name]: name === 'resume' ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Application submitted:', applicationData);
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
                    <Box component="h1">Careers</Box>
                </Box>
            </Box>
            
            <Box component="main" className="scroll-container">
                <Box component="div" className="hidden1"> 
                    <Box component="h2">Join Our Team</Box>
                    <Box component="p">We are looking for talented professionals to join our dental team.</Box>
                    <Box component="h3">Current Openings</Box>
                    <Box component="ul">
                        <Box component="li">Dentist - Minimum 3 years experience</Box>
                        <Box component="li">Dental Assistant - Freshers welcome</Box>
                        <Box component="li">Receptionist - Excellent communication skills required</Box>
                    </Box>
                </Box>
                
                <Box component="div" className="hidden">
                    <Box component="h3">Apply Now</Box>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Box 
                            component="input" 
                            type="text" 
                            name="name"
                            placeholder="Your Name" 
                            value={applicationData.name}
                            onChange={handleChange}
                            required 
                        />
                        <Box 
                            component="input" 
                            type="email" 
                            name="email"
                            placeholder="Your Email" 
                            value={applicationData.email}
                            onChange={handleChange}
                            required 
                        />
                        <Box 
                            component="input" 
                            type="file" 
                            name="resume"
                            accept=".pdf" 
                            onChange={handleChange}
                            required 
                        />
                        <Box component="button" type="submit">
                            Submit Application
                        </Box>
                    </Box>
                </Box>
            </Box>
            
            <Footer />
        </Box>
    );
};

export default Careers;
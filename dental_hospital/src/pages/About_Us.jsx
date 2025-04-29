import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/About_Us.css';
import '../styles/index.css';
import doctorImage from '../assets/doctor_1.jpg';

const AboutUs = () => {
    const [teamMembers, setTeamMembers] = useState([
        {
            id: 1,
            name: "Dr. John Doe",
            role: "Chief Dentist with 20+ years of experience.",
            image: doctorImage
        },
        {
            id: 2,
            name: "Dr. Jane Smith",
            role: "Specialist in Orthodontics and Cosmetic Dentistry.",
            image: doctorImage
        }
    ]);

    const [memberStyles, setMemberStyles] = useState({});

    // Initialize member styles
    useEffect(() => {
        const initialStyles = {};
        teamMembers.forEach(member => {
            initialStyles[member.id] = { boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" };
        });
        setMemberStyles(initialStyles);
    }, [teamMembers]);

    const handleMouseEnter = (id) => {
        setMemberStyles(prev => ({
            ...prev,
            [id]: { ...prev[id], boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)" }
        }));
    };

    const handleMouseLeave = (id) => {
        setMemberStyles(prev => ({
            ...prev,
            [id]: { ...prev[id], boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)" }
        }));
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
            <Box component="div" id="content">
                <Box component="header" className="scroll-container">
                    <Box component="div" className="hidden1">
                        <Box component="h1">About Us</Box>
                        <Box component="p">Your Smile, Our Priority!</Box>
                    </Box>
                </Box>
                
                <Box component="section" className="content1">
                    <Box component="div" id="container" className="scroll-container">
                        <Box component="div" className="hidden">
                            <Box component="h2">Our Mission</Box>
                            <Box component="p">
                                At DentaEase, we are dedicated to providing high-quality dental care using advanced technology while ensuring patient comfort and satisfaction.
                            </Box>
                        </Box>
                    </Box>

                    <Box component="div" id="team-section" className="scroll-container">
                        <Box component="div" className="hidden1">    
                            <Box component="h2">Meet Our Team</Box>
                        </Box>
                        <Box component="div" id="team" className="hidden">
                            {teamMembers.map(member => (
                                <Box 
                                    component="div"
                                    key={member.id}
                                    className="team-member"
                                    style={memberStyles[member.id]}
                                    onMouseEnter={() => handleMouseEnter(member.id)}
                                    onMouseLeave={() => handleMouseLeave(member.id)}
                                >
                                    <Box component="img" src={member.image} alt={member.name} />
                                    <Box component="h3">{member.name}</Box>
                                    <Box component="p">{member.role}</Box>
                                </Box>
                            ))}
                        </Box>
                    </Box>

                    <Box component="div" id="services" className="scroll-container">
                        <Box component="div" className="hidden1">
                            <Box component="h2">Our Services</Box>
                        </Box>
                        <Box component="ul" className="hidden">
                            <Box component="li">Teeth Cleaning & Whitening</Box>
                            <Box component="li">Dental Implants</Box>
                            <Box component="li">Braces & Aligners</Box>
                            <Box component="li">Root Canal Treatment</Box>
                            <Box component="li">Dental Implants</Box>
                            <Box component="li">Braces & Aligners</Box>
                            <Box component="li">Root Canal Treatment</Box>
                            <Box component="li">Dental Implants</Box>
                            <Box component="li">Braces & Aligners</Box>
                        </Box>
                    </Box>

                    <Box component="div" className="contact">
                        <Box component="h2">Contact Us</Box>
                        <Box component="p">Email: contact@dentaease.com</Box>
                        <Box component="p">Phone: +91 98765 43210</Box>
                    </Box>
                </Box>
            </Box>
            
            <Footer />
        </Box>
    );
};

export default AboutUs;
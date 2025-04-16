import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/landing_pages.css';
import '../styles/index.css';

const PrivacyPolicy = () => {
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
                    <Box component="h1">Privacy Policy</Box>
                </Box>
            </Box>
            
            <Box component="main" className="scroll-container">
                <Box component="div" className="hidden">
                    <Box component="h2">Patient Data Privacy</Box>
                    <Box component="p">
                        We ensure the confidentiality of your medical records and personal data.
                    </Box>
                    
                    <Box component="h2">Cookie Policy</Box>
                    <Box component="p">
                        We use cookies to improve user experience. By using our website, you consent to our cookie policy.
                    </Box>
                    
                    <Box component="h2">Data Security</Box>
                    <Box component="p">
                        All transactions and patient records are encrypted for maximum security.
                    </Box>
                    
                    <Box component="h2">Information Collection</Box>
                    <Box component="p">
                        We collect only necessary personal information required for providing dental services.
                    </Box>
                    
                    <Box component="h2">Data Usage</Box>
                    <Box component="p">
                        Your data is used solely for appointment management, treatment records, and communication.
                    </Box>
                    
                    <Box component="h2">Third-Party Sharing</Box>
                    <Box component="p">
                        We do not share your personal data with third parties without your explicit consent.
                    </Box>
                    
                    <Box component="h2">Your Rights</Box>
                    <Box component="p">
                        You have the right to access, correct, or request deletion of your personal data.
                    </Box>
                    
                    <Box component="h2">Policy Updates</Box>
                    <Box component="p">
                        We may update this policy periodically. Continued use of our services constitutes acceptance.
                    </Box>
                </Box>
            </Box>
            
            <Footer />
        </Box>
    );
};

export default PrivacyPolicy;
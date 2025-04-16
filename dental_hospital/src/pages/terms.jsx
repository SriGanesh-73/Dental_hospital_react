import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/landing_pages.css';
import '../styles/index.css';

const TermsAndConditions = () => {
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
                    <Box component="h1">Terms and Conditions</Box>
                </Box>
            </Box>
            
            <Box component="main" className="scroll-container">
                <Box component="div" className="hidden">
                    <Box component="h2">Use of Our Website</Box>
                    <Box component="p">
                        By accessing our website, you agree to our terms regarding appointment booking and service usage.
                    </Box>
                    
                    <Box component="h2">Medical Disclaimer</Box>
                    <Box component="p">
                        Information on this site is for reference only and does not replace professional medical advice.
                    </Box>
                    
                    <Box component="h2">Cancellation Policy</Box>
                    <Box component="p">
                        Appointments must be canceled at least 24 hours in advance to avoid cancellation fees.
                    </Box>
                    
                    <Box component="h2">Privacy Policy</Box>
                    <Box component="p">
                        We respect your privacy and handle your personal information with care according to our privacy policy.
                    </Box>
                    
                    <Box component="h2">Intellectual Property</Box>
                    <Box component="p">
                        All content on this website is the property of DentaEase and protected by copyright laws.
                    </Box>
                    
                    <Box component="h2">Limitation of Liability</Box>
                    <Box component="p">
                        DentaEase shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our services.
                    </Box>
                </Box>
            </Box>
            
            <Footer />
        </Box>
    );
};

export default TermsAndConditions;
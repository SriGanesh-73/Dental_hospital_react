import React, { useEffect } from 'react';
import NavBar from '../components/NavBar.jsx';
import Footer from  '../components/Footer.jsx';
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
            <header className="scroll-container">
                <div className="hidden1">
                    <h1>Privacy Policy</h1>
                </div>
            </header>
            
            <main className="scroll-container">
                <div className="hidden">
                    <h2>Patient Data Privacy</h2>
                    <p>We ensure the confidentiality of your medical records and personal data.</p>
                    
                    <h2>Cookie Policy</h2>
                    <p>We use cookies to improve user experience. By using our website, you consent to our cookie policy.</p>
                    
                    <h2>Data Security</h2>
                    <p>All transactions and patient records are encrypted for maximum security.</p>
                    
                    <h2>Information Collection</h2>
                    <p>We collect only necessary personal information required for providing dental services.</p>
                    
                    <h2>Data Usage</h2>
                    <p>Your data is used solely for appointment management, treatment records, and communication.</p>
                    
                    <h2>Third-Party Sharing</h2>
                    <p>We do not share your personal data with third parties without your explicit consent.</p>
                    
                    <h2>Your Rights</h2>
                    <p>You have the right to access, correct, or request deletion of your personal data.</p>
                    
                    <h2>Policy Updates</h2>
                    <p>We may update this policy periodically. Continued use of our services constitutes acceptance.</p>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.jsx';  // Changed to correct components path
import Footer from '../components/Footer.jsx';  // Changed to correct components path
import '../styles/landing_pages.css';  // Changed to correct styles path
import '../styles/index.css';  // Changed to correct global styles path

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
        // Handle form submission logic here
        console.log('Application submitted:', applicationData);
        // You can add validation and submission logic
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
            <header className="scroll-container">
                <div className="hidden1">
                    <h1>Careers</h1>
                </div>
            </header>
            
            <main className="scroll-container">
                <div className="hidden1"> 
                    <h2>Join Our Team</h2>
                    <p>We are looking for talented professionals to join our dental team.</p>
                    <h3>Current Openings</h3>
                    <ul>
                        <li>Dentist - Minimum 3 years experience</li>
                        <li>Dental Assistant - Freshers welcome</li>
                        <li>Receptionist - Excellent communication skills required</li>
                    </ul>
                </div>
                
                <div className="hidden">
                    <h3>Apply Now</h3>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            name="name"
                            placeholder="Your Name" 
                            value={applicationData.name}
                            onChange={handleChange}
                            required 
                        />
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Your Email" 
                            value={applicationData.email}
                            onChange={handleChange}
                            required 
                        />
                        <input 
                            type="file" 
                            name="resume"
                            accept=".pdf" 
                            onChange={handleChange}
                            required 
                        />
                        <button type="submit">Submit Application</button>
                    </form>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default Careers;
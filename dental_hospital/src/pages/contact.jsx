import React, { useState, useEffect } from 'react';
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
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
                    <h1>Contact Us</h1>
                </div>
            </header>
            
            <main className="scroll-container">
                <div className="hidden1">
                    <h2>Get in Touch</h2>
                    <p>Address: 123 Dental Street, City, State, Zip</p>
                    <p>Phone: +1 234 567 890</p>
                    <p>Email: contact@dentalclinic.com</p>
                    <h3>Send us a message</h3>
                </div>
                
                <form className="hidden" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="name"
                        placeholder="Your Name" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                    />
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Your Email" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                    />
                    <textarea 
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>
                    <button type="submit">Send</button>
                </form>
            </main>
            
            <Footer />
        </div>
    );
};

export default ContactUs;
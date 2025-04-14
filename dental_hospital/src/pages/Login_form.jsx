import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import { Link } from 'react-router-dom';
import '../styles/forms.css';
import '../styles/index.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    // Load data from localStorage on component mount
    useEffect(() => {
        const savedData = localStorage.getItem('loginForm');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    // Save data to localStorage when formData changes
    useEffect(() => {
        localStorage.setItem('loginForm', JSON.stringify(formData));
    }, [formData]);

    // Validation patterns
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validateInput = (name, value) => {
        switch (name) {
            case 'email':
                return emailPattern.test(value.trim()) ? '' : 'Enter a valid email address';
            case 'password':
                return value.length >= 6 ? '' : 'Password must be at least 6 characters';
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

        setErrors(prev => ({
            ...prev,
            [name]: validateInput(name, value)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {
            email: validateInput('email', formData.email),
            password: validateInput('password', formData.password)
        };
        setErrors(newErrors);

        const isValid = Object.values(newErrors).every(error => error === '');

        if (isValid) {
            alert('Login successful!');

            // Clear localStorage
            localStorage.removeItem('loginForm');

            // Reset form
            setFormData({
                email: '',
                password: ''
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
        <div className="main">
            <NavBar />
            <div className="overlay"></div>
            <div id="login-container" className="scroll-container">
                <h1 className="hidden">Login</h1>
                <form className="hidden1" id="loginForm" onSubmit={handleSubmit}>
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
                    <span className="error-msg">{errors.email}</span>

                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Enter your password" 
                        value={formData.password}
                        onChange={handleChange}
                        required 
                    />
                    <span className="error-msg">{errors.password}</span>

                    <button type="submit">Login</button>

                    <div style={{ marginTop: '15px', color: 'white' }}>
                        Don't have an account? <Link to="/register-form" style={{ color: '#fff', textDecoration: 'underline' }}>Register here</Link>
                    </div>
                </form>
            </div>  
            <Footer />    
        </div>
    );
};

export default LoginPage;

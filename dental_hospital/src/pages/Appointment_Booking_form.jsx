import React, { useState, useEffect,useCallback,useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/forms.css';
import '../styles/index.css';
import { useAuth } from '../context/Authcontext.jsx';

const AppointmentBooking = () => {
  const { isLoggedIn,user } = useAuth();
  const navigate = useNavigate();
  const [timeSlots,setTimeSlots] = useState([]);
  const [bookedSlots,setBookedSlots] = useState([]);
  const treatments = [
    {label:"Teeth Whitening",value:"teeth_whitening"},
    {label:"Root Canal Therapy",value:"root_canal"},
    {label:"Braces and Aligners",value:"braces_aligners"},
    {label:"Extraction",value:"extraction"},
    {label:"Filling",value:"filling"},
    {label:"Denture Removal",value:"denture_removal"},
    {label:"Dental Implant",value:"dental_implant"},
    {label:"Caps and Crowns",value:"caps_crowns"}
  ];
  const treatmentDurations = useMemo(() => ({
    "teeth_whitening": 45,        // 45 minutes for full whitening session
    "root_canal": 90,             // 60–90 minutes depending on complexity
    "braces_aligners": 60,        // Initial consultation + fitting: 60 mins
    "extraction": 30,             // Standard tooth extraction
    "filling": 30,                // One or two cavities
    "denture_removal": 45,        // Can vary, includes check and refitting
    "dental_implant": 90,         // Surgical procedure
    "caps_crowns": 60             // Includes shaping and temporary fitting
    }),[]);

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('appointmentForm');
    return saved ? JSON.parse(saved) : {
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      treatment: '',
      message: ''
    };
  });

  const [errors, setErrors] = useState({});

  const handleSlotAvailability = useCallback( async (treatment) => {
    try{
        const response = await fetch(`http://localhost:5000/api/users/appointments/availability/slots?date=${formData.date}`);
        const data = await response.json();
        if(!response.ok){
            console.log("Server Responded with:",data.message);
        }
        let bookedSlots = data.bookedSlots.map(slot => slot.time);
        console.log("Booked Slots:",bookedSlots);
        return bookedSlots;
    }
    catch(error){
        console.error("Error getting the booked slots:",error);
    }
  },[formData.date]);
  const generateTimeSlots = (start,end,timeInterval) => {
    const slots = [];
    
    let [startHour, startMinute] = start.split(':').map(Number);
    let [endHour, endMinute] = end.split(':').map(Number);

    let current = new Date();
    current.setHours(startHour, startMinute, 0, 0);

    let endTime = new Date();
    endTime.setHours(endHour, endMinute, 0, 0);

    while(current<=endTime) {
        const hours = current.getHours().toString().padStart(2,'0');
        const minutes = current.getMinutes().toString().padStart(2,'0');
        slots.push(`${hours}:${minutes}`);
        current.setMinutes(current.getMinutes() + timeInterval);
    }
    return slots;
  };

  useEffect(() => {
    const fetchAndGenerateSlots = async () => {
        if (!formData.date || !formData.treatment) return;

        const booked = await handleSlotAvailability(formData.treatment);
        const duration = treatmentDurations[formData.treatment] || 30;
        const allSlots = generateTimeSlots("09:00", "19:00", duration);

        setTimeSlots(allSlots);
        setBookedSlots(booked || []);
    };
    fetchAndGenerateSlots();
  }, [formData.treatment, formData.date,handleSlotAvailability,treatmentDurations]);


  useEffect(() => {
    if (!isLoggedIn) {
      alert('You must be logged in to book an appointment!');
      navigate('/login-form');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    localStorage.setItem('appointmentForm', JSON.stringify(formData));
  }, [formData]);

  const patterns = {
    name: /^[a-zA-Z\s]{3,}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^[6789]\d{9}$/
  };

  const validateInput = (name, value) => {
    switch (name) {
      case 'name':
        return patterns.name.test(value.trim()) ? '' : 'Enter a valid name (at least 3 letters)';
      case 'email':
        return patterns.email.test(value.trim()) ? '' : 'Enter a valid email address';
      case 'phone':
        return patterns.phone.test(value.trim()) ? '' : 'Enter a valid 10-digit phone number';
      case 'date':
        if (!value) return 'Please select a date';
        const today = new Date().toISOString().split('T')[0];
        return value < today ? 'Please select a future date' : '';
      case 'time':
        return value ? '' : 'Please select a time';
      case 'treatment':
        return value ? '' : 'Please select a treatment';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateInput(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== 'message') {
        newErrors[key] = validateInput(key, formData[key]);
      }
    });

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((err) => err === '');

    if (isValid) {
      console.log("Sending Data... :",formData);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/users/bookappointment', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
           },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          alert(`Appointment booked successfully at ${formData.time}`);
          localStorage.removeItem('appointmentForm');
          setFormData({
            name: '',
            email: '',
            phone: '',
            date: '',
            time: '',
            treatment: '',
            message: ''
          });
        } else {
          alert('Booking failed. Please try again.');
        }
      } catch (error) {
        console.error('Booking Error:', error);
        alert('An error occurred while booking.');
      }
      finally{
        localStorage.removeItem('appointmentForm');
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
    }
  };

  useEffect(() => {
    return () => {
        // This runs when the component is unmounted
        localStorage.removeItem('appointmentForm');
        setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        treatment: '',
        message: ''
        });
    };
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const img = entry.target.querySelector(".hidden");
        const text = entry.target.querySelector(".hidden1");

        if (entry.isIntersecting) {
          img?.classList.add("show");
          text?.classList.add("show1");
        } else {
          img?.classList.remove("show");
          text?.classList.remove("show1");
        }
      });
    }, { threshold: 0.2 });

    const containers = document.querySelectorAll(".scroll-container");
    containers.forEach((container) => observer.observe(container));

    return () => containers.forEach((container) => observer.unobserve(container));
  }, []);

  return (
    <Box component="div" className="main">
    <NavBar />
    <Box component="div" className="overlay"></Box>
    <Box component="div" id="appointment-container" className="scroll-container">
        <Box component="h1">Book an Appointment</Box>
        <Box component="form" id="appointmentForm" onSubmit={handleSubmit}>
            <Box component="label" htmlFor="name">Full Name</Box>
            <Box 
                component="input" 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Enter your name" 
                value={formData.name}
                onChange={handleChange}
                required 
            />
            <Box component="span" id="name_err" className="error-msg">{errors.name}</Box>
    
            <Box component="label" htmlFor="email">Email</Box>
            <Box 
                component="input" 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Enter your email" 
                value={formData.email}
                onChange={handleChange}
                required 
            />
            <Box component="span" id="email_err" className="error-msg">{errors.email}</Box>
    
            <Box component="label" htmlFor="phone">Phone Number</Box>
            <Box 
                component="input" 
                type="tel" 
                id="phone" 
                name="phone" 
                placeholder="Enter your phone number" 
                value={formData.phone}
                onChange={handleChange}
                required 
            />
            <Box component="span" id="phone_err" className="error-msg">{errors.phone}</Box>

            <Box component="label" htmlFor="treatment">Select Treatment</Box>
            <Box 
                component="select" 
                id="treatment" 
                name="treatment" 
                value={formData.treatment}
                onChange={handleChange}
                required
            >
                <Box component="option" value="" disabled>Select a treatment</Box>
            {treatments.map((item,index) => (
                <Box component="option" key={index} value={item.value}>{item.label}</Box>
            ))}
            </Box>
            <Box component="span" id="treatment_err" className="error-msg">{errors.treatment}</Box>
    
            <Box component="label" htmlFor="date">Select Date</Box>
            <Box 
                component="input" 
                type="date" 
                id="date" 
                name="date" 
                value={formData.date}
                onChange={handleChange}
                required 
            />
            <Box component="span" id="date_err" className="error-msg">{errors.date}</Box>
    
            <Box component="label" htmlFor="time">Select Time</Box>
            <Box 
                component="select" 
                id="time" 
                name="time" 
                value={formData.time}
                onChange={handleChange}
                required
            >
                <Box component="option" value="" disabled>Select Time</Box>
            {timeSlots.map((value,index) => (
                <Box component="option" key={index} value={value} disabled={bookedSlots.includes(value)}>
                    {!bookedSlots.includes(value)? value : value + "(Not Available)"}
                </Box>
            ))}
            </Box>
            <Box component="span" id="time_err" className="error-msg">{errors.time}</Box>
    
            <Box component="label" htmlFor="message">Additional Message</Box>
            <Box 
                component="textarea" 
                id="message" 
                name="message" 
                placeholder="Enter any details..."
                value={formData.message}
                onChange={handleChange}
            />
    
            <Box component="button" type="submit" >Book Appointment</Box>
        </Box>
    </Box>  
    <Footer />    
</Box>
  );
};

export default AppointmentBooking;

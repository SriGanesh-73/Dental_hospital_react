import React, { useState, useEffect, useRef } from 'react';
import './styles/index.css';
import NavBar from './components/NavBar.jsx';
import { Link } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import { Box, Typography, Button, Grid } from '@mui/material';
import icon1 from './assets/icon1.png';
import icon2 from './assets/icon2.png';
import icon3 from './assets/icon3.png';
import icon4 from './assets/icon4.png';
import icon5 from './assets/icon5.png';
import icon6 from './assets/icon6.png';
import icon7 from './assets/icon7.png';
import icon8 from './assets/icon8.png';
import icon9 from './assets/icon9.png';
import dentalClinicInstruments from './assets/dental-clinic-instruments.jpg';
import goPaperless from './assets/go-paperless.webp';
import easyBooking from './assets/EasyBooking.jpg';
import communication from './assets/communication.png';
import hippaIcon from './assets/hippa-icon.jpg';
import FAQAccordion from './components/FAQ.jsx';

function Home() {
  const contentRef = useRef(null);
  
  // Feature items array for the cards
  const featureItems = [
    'Electronic Patient Records',
    'Appointment and Schedules',
    'SMS and Email Notifications',
    'Accounts & Cash Management',
    'Reporting System',
    'Document Management',
    'Administrator',
    'Inventory Management',
    'Lab Management'
  ];
  
  // Feature descriptions - you can customize these
  const featureDescriptions = [
    'Manage patient records digitally for easy access and updates.',
    'Schedule and manage appointments efficiently.',
    'Send automated notifications to patients about appointments and follow-ups.',
    'Handle billing and financial transactions with ease.',
    'Generate comprehensive reports for better decision making.',
    'Store and manage all dental documents securely.',
    'Control user access and system settings.',
    'Track dental supplies and equipment inventory.',
    'Coordinate with labs for tests and procedures.'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const img = entry.target.querySelector('.hidden');
        const text = entry.target.querySelector('.hidden1');

        if (entry.isIntersecting) {
          if (img) img.classList.add('show');
          if (text) text.classList.add('show1');
        } else {
          if (img) img.classList.remove('show');
          if (text) text.classList.remove('show1');
        }
      });
    }, { threshold: 0.2 });

    const scrollContainers = document.querySelectorAll('.scroll-container');
    scrollContainers.forEach((container) => observer.observe(container));

    return () => {
      scrollContainers.forEach((container) => observer.unobserve(container));
    };
  }, []);

  const [faqs, setFaqs] = useState([
    {
      question: 'How do I book an appointment?',
      answer: 'You can book online through our website or call our reception desk.',
      isOpen: false,
    },
    {
      question: 'Do you accept insurance?',
      answer: 'Yes, we accept most insurance plans. Contact us for details.',
      isOpen: false,
    },
    {
      question: 'What treatments do you offer?',
      answer: 'We provide general dentistry, cosmetic treatments, orthodontics, and more.',
      isOpen: false,
    },
  ]);

  const toggleFaq = (index) => {
    setFaqs(
      faqs.map((faq, i) => ({
        ...faq,
        isOpen: i === index ? !faq.isOpen : false,
      }))
    );
  };

  return (
    <Box className="main">
      <NavBar />
      <Box className="overlay" />

      <Box id="content" ref={contentRef}>
        <Box id="row1" className="scroll-container">
          <Box id="desc1" className="hidden1">
            <Typography variant="h3">Welcome to DentaEase</Typography>
            <Typography variant="h5">Your Smile, Our Priority!</Typography>
            <Button id="bt-1" variant="contained"><Link to="/book-appointment">Book an Appointment</Link></Button>
            <Button id="bt-2" variant="outlined"><Link to="/doctor-treatment">Our Doctors & Treatment</Link></Button>
          </Box>
          <Box className="hidden" id="img1">
            <img src={dentalClinicInstruments} width="350" height="200" alt="Dental Clinic Instruments" />
          </Box>
        </Box>

        <Box id="row2" className="scroll-container">
          <Box id="booking" className="hidden1">
            <Typography variant="h4">Easy Online Booking</Typography>
            <Typography variant="h6">Need a checkup or treatment? Schedule your appointment with our experienced dentists today!</Typography>
            <Typography variant="subtitle1">BE PART OF THE DIGITAL REVOLUTION</Typography>
            <Button variant="contained">Register Now</Button>
          </Box>
        </Box>

        <Box id="row3" className="scroll-container">
          <Typography variant="h4">Our Best of Key features</Typography>
          <Grid container id="grid" className="hidden1">
            {[icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9].map((icon, idx) => (
              <Grid item xs={12} sm={6} md={4} className="grid-item" key={idx}>
                <img src={icon} alt={`Icon ${idx + 1}`} />
                <Typography variant="h6">{featureItems[idx]}</Typography>
                <Typography variant="body2">{featureDescriptions[idx]}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box id="row4" className="scroll-container">
          <Box id="desc2" className="hidden1">
            <Typography variant="h5">Why Go paperless ?</Typography>
            <ul>
              <li>Enhances communication among doctors, staff, labs, and patients, improving clinic efficiency.</li>
              <li>Ensures clear and organized clinical notes, reducing the risk of errors.</li>
              <li>Simplifies data analysis with advanced dental billing tools.</li>
              <li>Enables easy access to information through dental office management software.</li>
            </ul>
            <Button id="plan-btn" variant="outlined">View Plan</Button>
          </Box>
          <Box className="hidden" id="img2">
            <img src={goPaperless} width="400" height="300" alt="Go Paperless" />
          </Box>
        </Box>

        <Box id="row5" className="scroll-container">
          <Box className="hidden" id="img3">
            <img src={easyBooking} width="400" height="300" alt="Easy Booking" />
          </Box>
          <Box id="desc3" className="hidden1">
            <Typography variant="h5">Book appointment in less than 5 seconds !!</Typography>
            <ul>
              <li>Efficiently manage patient appointments with user-friendly views and waiting time analysis.</li>
              <li>Color-coded appointment slots for each doctor.</li>
              <li>Automated appointment reminders.</li>
              <li>Convenient online appointment booking option.</li>
            </ul>
            <Button id="plan-btn" variant="outlined">View Plan</Button>
          </Box>
        </Box>

        <Box id="row6" className="scroll-container">
          <Box id="desc4" className="hidden1">
            <Typography variant="h5">Strong patient communication</Typography>
            <ul>
              <li>Routine checkup reminders at quarterly, half-yearly, annual, or custom intervals.</li>
              <li>Automated appointment reminders for patients at customizable intervals.</li>
              <li>Seamless communication with multiple patients via messages and emails.</li>
              <li>Personalized birthday greetings for patients.</li>
            </ul>
            <Button id="plan-btn" variant="outlined">View Plan</Button>
          </Box>
          <Box className="hidden" id="img4">
            <img src={communication} width="500" height="400" alt="Communication" />
          </Box>
        </Box>

        <Box id="row7" className="scroll-container">
          <Box className="hidden" id="img5">
            <img src={hippaIcon} width="300" height="300" alt="HIPPA Icon" />
          </Box>
          <Box id="desc5" className="hidden1">
            <Typography variant="h4">Security.Peace of mind.</Typography>
            <ul>
              <li>Download your data anytime</li>
              <li>Data Secured on microsoft azure server</li>
              <li>Secured your clinic data to be accessed from fixed location</li>
              <li>Two step authentication Security</li>
            </ul>
          </Box>
        </Box>

        <FAQAccordion faqs={faqs} />
      </Box>

      <Footer />
    </Box>
  );
}

export default Home;
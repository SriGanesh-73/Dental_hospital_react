import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import NavBar from '../components/NavBar.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/Doctor_Treatment_details.css';
import '../styles/index.css';

// Import doctor images
import doctorImage from '../assets/doctor_1.jpg';

// Import treatment images
import teethWhitening from '../assets/teeth_whitening.jpg';
import rootCanal from '../assets/Root-Canal-Treatment.jpeg';
import bracersAligners from '../assets/Bracers_aligners.jpeg';
import extraction from '../assets/extraction_dental.jpeg';
import dentures from '../assets/Removable-Dentures.jpg';
import filling from '../assets/dental_filling.png';
import implant from '../assets/dental_implants.jpg';
import capsCrowns from '../assets/caps_crowns.jpg';

function DoctorTreatment() {
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
    <Box component="div" className="main">
      <NavBar />
      <Box component="div" className="overlay"></Box>
      <Box component="div" id="header" className="scroll-container">
        <Box component="div" className="hidden1">
          <Box component="h1">Meet Our Expert Dentists</Box>
          <Box component="p">Your smile is our priority!</Box>
        </Box>
      </Box>
      
      <Box component="div" id="content">
        {/* Doctor Profiles Section */}
        <Box component="section" id="doctors" className="scroll-container">
          <Box component="div" className="hidden1">
            <Box component="h2">Our Dental Specialists</Box>
          </Box>
          <Box component="div" id="doctor-grid" className="hidden">
            <Box component="div" className="doctor-card">
              <Box component="img" src={doctorImage} alt="Dr. A" />
              <Box component="h3">Dr. Sri Ganesh Thiyagarajan</Box>
              <Box component="p">Specialist in Orthodontics</Box>
              <Box component="p">Available: Mon - Fri (10 AM - 5 PM)</Box>
            </Box>
            <Box component="div" className="doctor-card">
              <Box component="img" src={doctorImage} alt="Dr. B" />
              <Box component="h3">Dr. Bargavan</Box>
              <Box component="p">Endodontics & Root Canal Specialist</Box>
              <Box component="p">Available: Tue - Sat (9 AM - 4 PM)</Box>
            </Box>
            <Box component="div" className="doctor-card">
              <Box component="img" src={doctorImage} alt="Dr. C" />
              <Box component="h3">Dr. Ashok Kumar</Box>
              <Box component="p">Cosmetic Dentistry Expert</Box>
              <Box component="p">Available: Mon - Sat (11 AM - 6 PM)</Box>
            </Box>
            <Box component="div" className="doctor-card">
              <Box component="img" src={doctorImage} alt="Dr. D" />
              <Box component="h3">Dr. AjayKrishna JP</Box>
              <Box component="p">Prosthodontics & Dental Implants Specialist</Box>
              <Box component="p">Available: Mon - Fri (9 AM - 3 PM)</Box>
            </Box>
            <Box component="div" className="doctor-card">
              <Box component="img" src={doctorImage} alt="Dr. E" />
              <Box component="h3">Dr. Naresh Kumar</Box>
              <Box component="p">Periodontics & Gum Disease Specialist</Box>
              <Box component="p">Available: Wed - Sun (10 AM - 6 PM)</Box>
            </Box>
            <Box component="div" className="doctor-card">
              <Box component="img" src={doctorImage} alt="Dr. F" />
              <Box component="h3">Dr. O Kavin</Box>
              <Box component="p">Pediatric Dentist (Children's Dentistry)</Box>
              <Box component="p">Available: Mon - Sat (8 AM - 4 PM)</Box>
            </Box>                   
          </Box>
        </Box>

        {/* Treatment Plans Section */}
        <Box component="section" id="treatments" className="scroll-container">
          <Box component="div" className="hidden1">
            <Box component="h2">Our Treatment Plans</Box>
          </Box>
          <Box component="div" id="treatment-list" className="hidden">
            <Box component="div" className="treatment-card">
              <Box component="img" src={teethWhitening} alt="teeth_whitening" />
              <Box component="h3">Teeth Whitening</Box>
              <Box component="p">Brighten your smile with professional whitening treatments.</Box>
              <Box component="span" className="price">$100</Box>
            </Box>
            <Box component="div" className="treatment-card">
              <Box component="img" src={rootCanal} alt="root_canal" />
              <Box component="h3">Root Canal Therapy</Box>
              <Box component="p">Save your teeth with expert root canal procedures.</Box>
              <Box component="span" className="price">$250</Box>
            </Box>
            <Box component="div" className="treatment-card">
              <Box component="img" src={bracersAligners} alt="bracers_aligners" />
              <Box component="h3">Braces & Aligners</Box>
              <Box component="p">Get straight, aligned teeth with our advanced orthodontic solutions.</Box>
              <Box component="span" className="price">$1500</Box>
            </Box>
            <Box component="div" className="treatment-card">
              <Box component="img" src={extraction} alt="extraction" />
              <Box component="h3">Extraction</Box>
              <Box component="p">Safe and painless tooth removal for better oral health.</Box>
              <Box component="span" className="price">$80</Box>
            </Box>
            <Box component="div" className="treatment-card">
              <Box component="img" src={dentures} alt="dentures" />
              <Box component="h3">Denture Removal</Box>
              <Box component="p">Comfortable, natural-looking replacements for missing teeth.</Box>
              <Box component="span" className="price">$500</Box>
            </Box>
            <Box component="div" className="treatment-card">
              <Box component="img" src={filling} alt="filling" />
              <Box component="h3">Filling</Box>
              <Box component="p">Restore cavities and protect your teeth with durable fillings.</Box>
              <Box component="span" className="price">$120</Box>
            </Box>
            <Box component="div" className="treatment-card">
              <Box component="img" src={implant} alt="implant" />
              <Box component="h3">Dental Implant</Box>
              <Box component="p">Replace missing teeth with strong and natural-looking dental implants.</Box>
              <Box component="span" className="price">$2000</Box>
            </Box>
            <Box component="div" className="treatment-card">
              <Box component="img" src={capsCrowns} alt="caps & crowns" />
              <Box component="h3">Caps & Crowns</Box>
              <Box component="p">Protect and strengthen damaged teeth with custom-made crowns.</Box>
              <Box component="span" className="price">$800</Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default DoctorTreatment;
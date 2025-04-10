import React, { useEffect, useRef } from 'react';
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
    <div className="main">
      <NavBar />
      <div className="overlay"></div>
      <div id="header" className="scroll-container">
        <div className="hidden1">
          <h1>Meet Our Expert Dentists</h1>
          <p>Your smile is our priority!</p>
        </div>
      </div>
      
      <div id="content">
        {/* Doctor Profiles Section */}
        <section id="doctors" className="scroll-container">
          <div className="hidden1">
            <h2>Our Dental Specialists</h2>
          </div>
          <div id="doctor-grid" className="hidden">
            <div className="doctor-card">
              <img src={doctorImage} alt="Dr. A" />
              <h3>Dr. A</h3>
              <p>Specialist in Orthodontics</p>
              <p>Available: Mon - Fri (10 AM - 5 PM)</p>
            </div>
            <div className="doctor-card">
              <img src={doctorImage} alt="Dr. B" />
              <h3>Dr. B</h3>
              <p>Endodontics & Root Canal Specialist</p>
              <p>Available: Tue - Sat (9 AM - 4 PM)</p>
            </div>
            <div className="doctor-card">
              <img src={doctorImage} alt="Dr. C" />
              <h3>Dr. C</h3>
              <p>Cosmetic Dentistry Expert</p>
              <p>Available: Mon - Sat (11 AM - 6 PM)</p>
            </div>
            <div className="doctor-card">
              <img src={doctorImage} alt="Dr. D" />
              <h3>Dr. D</h3>
              <p>Prosthodontics & Dental Implants Specialist</p>
              <p>Available: Mon - Fri (9 AM - 3 PM)</p>
            </div>
            <div className="doctor-card">
              <img src={doctorImage} alt="Dr. E" />
              <h3>Dr. E</h3>
              <p>Periodontics & Gum Disease Specialist</p>
              <p>Available: Wed - Sun (10 AM - 6 PM)</p>
            </div>
            <div className="doctor-card">
              <img src={doctorImage} alt="Dr. F" />
              <h3>Dr. F</h3>
              <p>Pediatric Dentist (Children's Dentistry)</p>
              <p>Available: Mon - Sat (8 AM - 4 PM)</p>
            </div>                   
          </div>
        </section>

        {/* Treatment Plans Section */}
        <section id="treatments" className="scroll-container">
          <div className="hidden1">
            <h2>Our Treatment Plans</h2>
          </div>
          <div id="treatment-list" className="hidden">
            <div className="treatment-card">
              <img src={teethWhitening} alt="teeth_whitening" />
              <h3>Teeth Whitening</h3>
              <p>Brighten your smile with professional whitening treatments.</p>
              <span className="price">$100</span>
            </div>
            <div className="treatment-card">
              <img src={rootCanal} alt="root_canal" />
              <h3>Root Canal Therapy</h3>
              <p>Save your teeth with expert root canal procedures.</p>
              <span className="price">$250</span>
            </div>
            <div className="treatment-card">
              <img src={bracersAligners} alt="bracers_aligners" />
              <h3>Braces & Aligners</h3>
              <p>Get straight, aligned teeth with our advanced orthodontic solutions.</p>
              <span className="price">$1500</span>
            </div>
            <div className="treatment-card">
              <img src={extraction} alt="extraction" />
              <h3>Extraction</h3>
              <p>Safe and painless tooth removal for better oral health.</p>
              <span className="price">$80</span>
            </div>
            <div className="treatment-card">
              <img src={dentures} alt="dentures" />
              <h3>Denture Removal</h3>
              <p>Comfortable, natural-looking replacements for missing teeth.</p>
              <span className="price">$500</span>
            </div>
            <div className="treatment-card">
              <img src={filling} alt="filling" />
              <h3>Filling</h3>
              <p>Restore cavities and protect your teeth with durable fillings.</p>
              <span className="price">$120</span>
            </div>
            <div className="treatment-card">
              <img src={implant} alt="implant" />
              <h3>Dental Implant</h3>
              <p>Replace missing teeth with strong and natural-looking dental implants.</p>
              <span className="price">$2000</span>
            </div>
            <div className="treatment-card">
              <img src={capsCrowns} alt="caps & crowns" />
              <h3>Caps & Crowns</h3>
              <p>Protect and strengthen damaged teeth with custom-made crowns.</p>
              <span className="price">$800</span>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default DoctorTreatment;
import React, { useState, useEffect, useRef } from 'react';
import './styles/index.css';
import NavBar from './components/NavBar.jsx';
import { Link } from 'react-router-dom';
import Footer from './components/Footer.jsx';
// Icons and images
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
  
  // Refs
  const contentRef = useRef(null);
  
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
  
  // FAQ toggle function
  const [faqs, setFaqs] = useState([
    {
      question: "How do I book an appointment?",
      answer: "You can book online through our website or call our reception desk.",
      isOpen: false,
    },
    {
      question: "Do you accept insurance?",
      answer: "Yes, we accept most insurance plans. Contact us for details.",
      isOpen: false,
    },
    {
      question: "What treatments do you offer?",
      answer: "We provide general dentistry, cosmetic treatments, orthodontics, and more.",
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
    <div className="main">
      <NavBar />
      <div className="overlay"></div>
      {/* Main Content */}
      <div id="content" ref={contentRef}>
        {/* Row 1 - Welcome */}
        <div id="row1" className="scroll-container">
          <div id="desc1" className="hidden1">
            <h1>Welcome to DentaEase</h1>
            <h3>Your Smile, Our Priority!</h3>
            <button id="bt-1"><Link to="/book-appointment">Book an Appointment</Link></button>
            <button id="bt-2"><Link to="/doctor-treatment">Our Doctors & Treatment</Link></button>
          </div>
          <div className="hidden" id="img1">
            <img src={dentalClinicInstruments} width="350px" height="200px" alt="Dental Clinic Instruments" />
          </div>
        </div>
        
        {/* Row 2 - Booking */}
        <div id="row2" className="scroll-container">
          <div id="booking" className="hidden1">
            <h1>Easy Online Booking</h1>
            <h2>Need a checkup or treatment? Schedule your appointment with our experienced dentists today!</h2>
            <h3>BE PART OF THE DIGITAL REVOLUTION</h3>
            <button>Register Now</button>
          </div>
        </div>
        
        {/* Row 3 - Features */}
        <div id="row3" className="scroll-container">
          <h1>Our Best of Key features</h1>
          <div id="grid" className="hidden1">
            <div className="grid-item">
              <img src={icon1} alt="Electronic Patient Records" />
              <h3>Electronic Patient Records</h3>
              <p>All patient data stored digitally on secure servers.</p>
            </div>
            <div className="grid-item">
              <img src={icon2} alt="Appointments and Schedulers" />
              <h3>Appointments and Schedulers</h3>
              <p>Easy to use Appointment Management Module simplifies cabin / chair management.</p>
            </div>
            <div className="grid-item">
              <img src={icon3} alt="Sms and email notifications" />
              <h3>Sms and email notifications</h3>
              <p>Stay connected with your patients. Send SMS and Email notifications.</p>
            </div>
            <div className="grid-item">
              <img src={icon4} alt="Accounts & Cash Management" />
              <h3>Accounts & Cash Management</h3>
              <p>Automatic record keeping of income and expenditure.</p>
            </div>
            <div className="grid-item">
              <img src={icon5} alt="Reporting System" />
              <h3>Reporting System</h3>
              <p>Illegible handwritten prescriptions replaced by printed forms.</p>
            </div>
            <div className="grid-item">
              <img src={icon6} alt="Document Management" />
              <h3>Document Management</h3>
              <p>Digitally stored documents save space, effort and stationery.</p>
            </div>
            <div className="grid-item">
              <img src={icon7} alt="Administrator" />
              <h3>Administrator</h3>
              <p>Manage Doctors, Staff, administrators, etc.</p>
            </div>
            <div className="grid-item">
              <img src={icon8} alt="Inventory Management" />
              <h3>Inventory Management</h3>
              <p>Manage and monitor dental inventory.</p>
            </div>
            <div className="grid-item">
              <img src={icon9} alt="Lab Management" />
              <h3>Lab Management</h3>
              <p>Manage your Dental Lab.</p>
            </div>
          </div>
        </div>
        
        {/* Row 4 - Paperless */}
        <div id="row4" className="scroll-container">
          <div id="desc2" className="hidden1">
            <h2>Why Go paperless ?</h2>
            <ul>
              <li>Enhances communication among doctors, staff, labs, and patients, improving clinic efficiency.</li>
              <li>Ensures clear and organized clinical notes, reducing the risk of errors.</li>
              <li>Simplifies data analysis with advanced dental billing tools.</li>
              <li>Enables easy access to information through dental office management software.</li>
            </ul>
            <button id="plan-btn">View Plan</button>
          </div>
          <div className="hidden" id="img2">
            <img src={goPaperless} width="400px" height="300px" alt="Go Paperless" />
          </div>
        </div>
        
        {/* Row 5 - Easy Booking */}
        <div id="row5" className="scroll-container">
          <div className="hidden" id="img3">
            <img src={easyBooking} width="400px" height="300px" alt="Easy Booking" />
          </div>
          <div id="desc3" className="hidden1">
            <h1>Book appointment in less than 5 seconds !!</h1>
            <ul>
              <li>Efficiently manage patient appointments with user-friendly views and waiting time analysis.</li>
              <li>Color-coded appointment slots for each doctor.</li>
              <li>Automated appointment reminders.</li>
              <li>Convenient online appointment booking option.</li>
            </ul>
            <button id="plan-btn">View Plan</button>
          </div>
        </div>
        
        {/* Row 6 - Patient Communication */}
        <div id="row6" className="scroll-container">
          <div id="desc4" className="hidden1">
            <h2>Strong patient communication</h2>
            <ul>
              <li>Routine checkup reminders at quarterly, half-yearly, annual, or custom intervals.</li>
              <li>Automated appointment reminders for patients at customizable intervals.</li>
              <li>Seamless communication with multiple patients via messages and emails.</li>
              <li>Personalized birthday greetings for patients.</li>
            </ul>
            <button id="plan-btn">View Plan</button>
          </div>
          <div className="hidden" id="img4">
            <img src={communication} width="500px" height="400px" alt="Communication" />
          </div>
        </div>
        
        {/* Row 7 - Security */}
        <div id="row7" className="scroll-container">
          <div className="hidden" id="img5">
            <img src={hippaIcon} width="300px" height="300px" alt="HIPPA Icon" />
          </div>
          <div id="desc5" className="hidden1">
            <h1>Security.Peace of mind.</h1>
            <ul>
              <li>Download your data anytime</li>
              <li>Data Secured on microsoft azure server</li>
              <li>Secured your clinic data to be accessed from fixed location</li>
              <li>Two step authentication Security</li>
            </ul>
          </div>
        </div>
        
        {/* Row 8 - FAQ */}
        <FAQAccordion faqs={faqs} />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
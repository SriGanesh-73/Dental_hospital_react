import React from 'react';
import { useState } from 'react';
import { Box } from '@mui/material';
import '../styles/faq.css';

const FAQAccordion = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Box component="div" id="faq-container" className="faq-container">
      <Box component="h2">Frequently Asked Questions</Box>
      <Box component="div" className="faq-list">
        {faqs.map((faq, index) => (
          <Box
            component="div"
            key={index}
            className={`faq-item ${activeIndex === index ? 'open' : ''}`}
          >
            <Box 
              component="div" 
              className="faq-question" 
              onClick={() => toggleFaq(index)}
            >
              {faq.question}
              <Box component="span" className="faq-arrow">
                <Box
                  component="svg"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#000"
                  className={activeIndex === index ? 'rotated' : ''}
                >
                  <path d="m288-96-68-68 316-316-316-316 68-68 384 384L288-96Z" />
                </Box>
              </Box>
            </Box>
            {activeIndex === index && (
              <Box component="div" className="faq-answer">
                <Box component="p">{faq.answer}</Box>
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FAQAccordion;
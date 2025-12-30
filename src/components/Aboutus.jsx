import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Aboutus.css'; // We will create this next

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <div className="about-card">
        <button className="back-btn" onClick={() => navigate(-1)}>
            &larr; Back
        </button>

        <img src="favicon.png" alt="Meowsic Logo" className="about-logo" />
        
        <h1>About Meowsic</h1>
        <p className="tagline">Where words fail, music speaks...</p>
        
        <div className="about-content">
          <p>
            Welcome to <strong>Meowsic</strong>, your personal soundscape designed 
            to bring the best music streaming experience right to your fingertips.
          </p>
          
          <h3>Developed By</h3>
          <p className="developer-name">- Shlok</p>
          
          <h3>Tech Stack</h3>
          <div className="tech-stack">
            <span>React</span>
            <span>Node.js</span>
            <span>Express</span>
            <span>MongoDB</span>
          </div>

          <p className="version">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
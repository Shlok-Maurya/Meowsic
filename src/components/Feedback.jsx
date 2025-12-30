import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import './Feedback.css'; 

const Feedback = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001"; // Adjust port if needed

    axios.post(`${API_URL}/feedback`, formData)
      .then(result => {
        console.log(result);
        if(result.data.status === "Success") {
            alert("Feedback sent successfully!"); 
        } else {
            alert("Something went wrong. Please try again.");
        }
      })
      .catch(err => console.log(err));
  };

  // ... (Return statement remains exactly the same as before)
  return (
    <div className="feedback-container">
      <div className="feedback-card">
        {/* ... (Keep your existing JSX) ... */}
        
        <button className="back-btn" onClick={() => navigate(-1)}>&larr; Back</button>
        <h1>Send Feedback</h1>
        <p className="subtitle">Have a suggestion or facing an issue? Let us know!</p>

        <form className="feedback-form" onSubmit={handleSubmit}>
           <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" placeholder="Type your message here..." rows="4" value={formData.message} onChange={handleChange} required ></textarea>
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>

        <div className="feedback-info">
          <p>Or email us directly at: <a href="mailto:support@meowsic.com">support@meowsic.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
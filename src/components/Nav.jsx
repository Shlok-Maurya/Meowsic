import React, { useState } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    window.location.href = "/"; 
  };

  return (
    <div className="nav">
      <div className="meowsic">
        <img src="favicon.png" alt="meowsic" />
      </div>

      <div className="moto">
        <strong>Welcome to Meowsic World</strong>
        <span>Where words fail, music speaks...</span>
      </div>

      <div className="information1">
        <ul>
          <li>About Us</li>
          <li>Contact Support</li>
          <li>Feedback</li>
        </ul>
      </div>

      <div className="profile-container">
        <div 
            className="profile-icon" 
            onClick={() => setShowDropdown(!showDropdown)}
        >
          <img 
            src="profileicon.png" 
            alt="Profile" 
          />
        </div>

        {showDropdown && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={handleLogout}>
              Sign Out
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default Nav;
import React from 'react';
import './Footer.css';
const userName = localStorage.getItem("userName");

function Footer() {
  return (
    <div className="footer">
      <div className="footer-text">
        <strong>Welcome {userName} to Meowsic World </strong>
        <span>Where words fail, music speaks...</span>
      </div>
    </div>
  );
}

export default Footer;
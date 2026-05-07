import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo">❄️ Patidar Ice & RO Services</span>
          <p>4 saal se aapki seva mein. Shudh paani, taza barf.</p>
        </div>
        <div className="footer-info">
          <p>📞 <a href="tel:+919999999999">+91 99999 99999</a></p>
          <p>📍 Indore, Madhya Pradesh</p>
          <p>🕐 Subah 6 baje se Raat 10 baje tak</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Patidar Ice & RO Services. Sab haq surakshit hain.</p>
      </div>
    </footer>
  );
};

export default Footer;

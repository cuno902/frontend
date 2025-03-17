import React from "react";
import { FaFacebook, FaTiktok, FaInstagram } from "react-icons/fa";
import "./Footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left Section - Contact Info */}
        <div className="footer-left">
          <h2>Contact Us</h2>
          <p>📞 Phone: +1 234 567 890</p>
          <p>✉️ Email: support@example.com</p>
          <p>📍 Address: 123 Main St, City, Country</p>
        </div>

        {/* Right Section - Social Media Icons */}
        <div className="footer-right">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="social-icon" />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
            <FaTiktok className="social-icon" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

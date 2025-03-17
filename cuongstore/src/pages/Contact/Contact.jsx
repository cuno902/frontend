import React from "react";
import './Contact.css'

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>We’d love to hear from you! Reach out to us using the details below.</p>

      <div className="contact-info">
        <p>📞 Phone: +1 234 567 890</p>
        <p>✉️ Email: support@example.com</p>
        <p>📍 Address: 123 Main St, City, Country</p>
      </div>

      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows="4" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;

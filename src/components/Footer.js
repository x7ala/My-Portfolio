import React from "react";
import { FaPhone, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import "./Footer.css"; // optional, for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="contact-item">
          <p> Let's work together! </p>
        </div> 
        <div className="contact-item">
          <FaEnvelope className="icon" />
          <span>7halamohamed@gmail.com</span>
        </div>
      </div>

      <div className="footer-right">
        <a
          href="https://www.linkedin.com/in/7hala-mohamed/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="social-icon" size={30} />
        </a>
        <a
          href="https://github.com/x7ala"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="social-icon" size={30} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

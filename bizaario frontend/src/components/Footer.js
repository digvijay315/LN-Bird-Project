import React from "react";
import "../styles/Footer.css";
import { FaFacebookF, FaTelegramPlane, FaInstagram, FaDribbble } from "react-icons/fa";
import { MdEmail, MdLanguage, MdPhone } from "react-icons/md";
import logo from "../assets/Bizzario.png"; // Replace with your logo

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        {/* Left Section */}
        <div className="footer-left">
          <img src={logo} alt="Bizaario Logo" className="footer-logo" />
          <p>
            High level experience in web design and development knowledge,
            producing quality work.
          </p>
          <h4>Follow us</h4>
          <div className="social-icons">
            <FaFacebookF />
            <FaTelegramPlane />
            <FaInstagram />
            <FaDribbble />
          </div>
        </div>

        {/* Middle Section */}
        <div className="footer-middle">
          <p><MdPhone /> Phone Number</p>
          <span>+91 5252525252</span>
          <p><MdEmail /> Email ID</p>
          <span>rjvjs42@gmail.com</span>
          <p><MdLanguage /> Website</p>
          <span>www.papayapalette.com</span>
        </div>

        {/* Company Links */}
        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>FAQs</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Use Cases Links */}
        <div className="footer-links">
          <h4>Use Cases</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>Legal</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>©2021 BIZAARIO CONNECT All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import "../styles/ContactUs.css";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaPlus,
} from "react-icons/fa";
import mapImg from "../assets/Basemap.png";
import helpImg from "../assets/audio.svg"; // Add your image in assets and ensure path is correct
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function ContactUs() {
  return (
    <div className="cu-page">
      <Navbar/>
      {/* ✅ Banner */}
      <div className="cu-banner">
        <div className="cu-banner-overlay">
          <div className="cu-banner-text">
            <h1>Contact Us</h1>
            <p>
              Empowering hospitals, physicians, and patients with real-time
              communication and clinical collaboration—because better care
              starts with better connection.
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Let's Talk */}
      <div className="cu-talk-section">
        <h2>Let’s Talk</h2>
        <p className="cu-talk-desc">
          Empowering hospitals, physicians, and patients with real-time
          communication and clinical collaboration—because better care starts
          with better connection.
        </p>

        <div className="cu-card-wrapper">
          {/* ✅ Left Help Card */}
          <div className="cu-help-card">
            <div className="cu-help-header">
              <div className="cu-help-text-content">
                <h3 className="cu-help-title">Get Help</h3>
                <p className="cu-help-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod.
                </p>
              </div>
              <img src={helpImg} alt="Get Help" className="cu-help-img" />
            </div>

            <button className="cu-help-button">Email Now</button>

            <div className="cu-contact-info">
              <div className="cu-row-flex">
                {/* Phone */}
                <div className="cu-contact-block">
                  <p className="cu-contact-item">
                    <FaPhone className="cu-icon" /> <strong>Phone Number</strong>
                  </p>
                  <span className="cu-contact-value">+91 9528525252</span>
                </div>

                {/* Email */}
                <div className="cu-contact-block-item">
                  <p className="cu-contact-item">
                    <FaEnvelope className="cu-icon" /> <strong>Email ID</strong>
                  </p>
                  <span className="cu-contact-value">rpvjsi42@gmail.com</span>
                </div>
              </div>

              {/* Address */}
              <p className="cu-contact-item">
                <FaMapMarkerAlt className="cu-icon" /> <strong>Address</strong>
              </p>
              <span className="cu-contact-value">
                H-Block, Sector-63, Noida, Uttar Pradesh, 201301 India
              </span>
            </div>

            <div className="cu-social-icons">
              <p className="cu-follow-title">Follow Us</p>
              <div className="cu-icons">
                <FaInstagram />
                <FaFacebookF />
                <FaLinkedinIn />
                <FaTwitter />
              </div>
            </div>
          </div>

          {/* ✅ Right Contact Form */}
          <div className="cu-form-card">
            <h3 className="cu-form-title">Get in Touch</h3>
            <form className="cu-form">
              <input type="text" placeholder="Full Name" />
              <input type="email" placeholder="Email Address" />
              <input type="tel" placeholder="Phone No" />
              <textarea placeholder="Brief Bio" />
              <button type="submit" className="cu-submit-button">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ✅ Map Image */}
      <div className="cu-map-container">
        <img src={mapImg} alt="Map Location" className="cu-map-img" />
      </div>

      {/* ✅ FAQ Section */}
      <div className="faq-section">
        <div className="faq-header">
          <h3 className="faq-title">FAQs (Frequently Asked Questions)</h3>
          <p className="faq-subtext">
            Here are some sample FAQs for a Doctor Portal, suitable for a website
            or app used by doctors for managing appointments, patients, records,
            collaborations, etc.
          </p>

          <div className="faq-list">
            <button className="faq-item">
              <span>How do I register as a doctor on the portal?</span>
              <FaPlus className="faq-icon" />
            </button>
            <button className="faq-item">
              <span>Is my data and patient information secure?</span>
              <FaPlus className="faq-icon" />
            </button>
            <button className="faq-item">
              <span>Can I manage my appointments through the portal?</span>
              <FaPlus className="faq-icon" />
            </button>
            <button className="faq-item">
              <span>Can I access the portal on my mobile phone?</span>
              <FaPlus className="faq-icon" />
            </button>
            <button className="faq-item">
              <span>How can I collaborate with other doctors or specialists?</span>
              <FaPlus className="faq-icon" />
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

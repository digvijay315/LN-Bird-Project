import React from "react";
import "../styles/ContactUs.css";

export default function ContactUs() {
  return (
    <div className="contactus-page">
      {/* ✅ Banner Section */}
      <div className="contactus-banner">
        <div className="contactus-banner-overlay">
          <div className="contactus-banner-content">
            <h1>Contact Us</h1>
            <p>
              Empowering hospitals, physicians, and patients with real-time
              communication and clinical collaboration—because better care
              starts with better connection.
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Let's Talk Section */}
      <div className="contactus-talk-section">
        <h2>Let’s Talk</h2>
        <p>
          Empowering hospitals, physicians, and patients with real-time
          communication and clinical collaboration—because better care starts
          with better connection.
        </p>

        <div className="contactus-card-container">
          {/* ✅ Left Card */}
          <div className="contactus-help-card">
            <button className="contactus-email-btn">Email Now</button>

            <p>📞 Phone Number</p>
            <span>+91 9528525252</span>

            <p>📧 Email ID</p>
            <span>rpvjsi42@gmail.com</span>

            <p>📍 Address</p>
            <span>H-Block, Sector-63, Noida, Uttar Pradesh, 201301 India</span>

            <div className="contactus-social-links">
              <a href="/">🌐</a>
              <a href="/">📘</a>
              <a href="/">🐦</a>
              <a href="/">📸</a>
            </div>
          </div>

          {/* ✅ Right Card - Contact Form */}
          <div className="contactus-form-card">
            <h3>Get In Touch</h3>
            <form>
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email Address" required />
              <input type="text" placeholder="Phone No" required />
              <textarea placeholder="Brief Bio" rows="4"></textarea>
              <button type="submit" className="contactus-send-btn">Send</button>
            </form>
          </div>
        </div>
      </div>

      {/* ✅ Map Section */}
      <div className="contactus-map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.70326463694!2d77.06889916406248!3d28.5272803433999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce55273f6d9bb%3A0xd56d8f7e2b63d02b!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1691123456789"
          width="100%"
          height="350"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          title="map"
        ></iframe>
      </div>

      {/* ✅ FAQs Section */}
      <div className="contactus-faq-section">
        <h3>FAQs (Frequently Asked Questions)</h3>
        <p>
          Here are some sample FAQs for a Doctor Portal, suitable for a website
          or app used by doctors for managing appointments, patients, records,
          collaborations, etc.
        </p>

        <div className="contactus-faq-list">
          <details>
            <summary>How do I register as a doctor on the portal?</summary>
            <p>Click on the sign-up button and fill in the required details.</p>
          </details>
          <details>
            <summary>Is my data and patient information secure?</summary>
            <p>Yes, we use encryption and secure storage for all your data.</p>
          </details>
          <details>
            <summary>Can I manage my appointments through the portal?</summary>
            <p>Yes, you can book, reschedule, and manage appointments easily.</p>
          </details>
          <details>
            <summary>Can I access the portal on my mobile phone?</summary>
            <p>Our portal is fully responsive and works on all devices.</p>
          </details>
          <details>
            <summary>How can I collaborate with other doctors or specialists?</summary>
            <p>Use our in-app chat or video call feature to connect with peers.</p>
          </details>
        </div>
      </div>
    </div>
  );
}

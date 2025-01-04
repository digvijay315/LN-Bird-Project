import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <div>






<footer className="footer">
    <div className="container-fluid">
      <div className="row footer-row">
        {/* All Categories */}
        <div className="col-md-2 col-sm-6 col-12 footer-column">
          <h3>All Categories</h3>
          <ul>
            <li>Vitamin C Face Wash</li>
            <li>Anti-Acne Face Wash </li>
            <li>Gold Scrub Face Wash </li>
            <li>Anti Hair fall Shampoo </li>
            <li>Rosemary hair oil </li>
            <li>Hair Serum </li>
            <li>Gluta Soap   </li>
          </ul>

          <div className="social-media-icons">
  <a href="#" className="icon facebook">
    <i class="fa-brands fa-facebook-f"></i>
  </a>
  <a href="#" className="icon twitter">
    <i class="fa-brands fa-twitter"></i>
  </a>
  <a href="#" className="icon instagram">
    <i class="fa-brands fa-instagram"></i>
  </a>
  <a href="#" className="icon linkedin">
    <i class="fa-brands fa-linkedin-in"></i>
  </a>
</div>

        </div>
        {/* Popular Categories */}
        <div className="col-md-2 col-sm-6 col-12 footer-column">
          <h3>Popular Categories</h3>
          <ul>
            <li>Anti Hair fall Shampoo</li>
            <li>Gluta Soap </li>
            <li>Hair Serum</li>
            <li>Rosemary hair oil</li>
            <li>Anti-Acne Face Wash </li>
            <li>Beauty</li>
          </ul>
        </div>
        {/* Customer Account */}
        <div className="col-md-2 col-sm-6 col-12 footer-column">
          <h3>Customer Account</h3>
          <ul>
            <li>My Account</li>
            <li>My Orders</li>
            <li>Wishlist</li>
            <li>Delivery Addresses</li>
            <li> Wallet</li>
          </ul>
        </div>
        {/* Help & Support */}
        <div className="col-md-2 col-sm-6 col-12 footer-column">
          <h3>Help &amp; Support</h3>
          <ul>
      <li><Link to="/aboutus">About Us</Link></li>
      <li><Link to="/faq">FAQ</Link></li>
      <li><Link to="/term&condition">Terms & Conditions</Link></li>
      <li><Link to="/privacypolicy">Privacy Policy</Link></li>
      <li><Link to="/ewaste">E-waste Policy</Link></li>
      <li><Link to="/cancelpolicy">Cancellation & Return Policy</Link></li>
      <li><Link to="/deliverycancel">Shipping & Delivery Policy</Link></li>
    </ul>
        </div>
        {/* Contact Us */}
        <div className="col-md-4 col-sm-12 col-12 footer-column">
          <h3>Contact Us</h3>
          <p>
            WhatsApp us: <a href="tel:7000370003">70003 70003</a>
          </p>
          <p>
            Call us: <a href="tel:18008901222">1800 890 1222</a>
          </p>
          <p>8:00 AM to 8:00 PM, 365 days</p>
          <p>Should you encounter any issues with the website.</p>
          <ul>
          <li><a href="/Contactus">Contact Us</a></li>
        </ul>
          <h3>Download the app</h3>
          <div className="app-links">
            <img
              src="https://www.jiomart.com/assets/ds2web/jds-icons/google-play-icon.svg"
              alt="Google Play"
            />
            <img
              src="https://www.jiomart.com/assets/ds2web/jds-icons/ios_app_icon.svg"
              alt="App Store"
            />
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/* Footer Bottom */}
  <div className="footer-bottom">
    <p>
      © (2020 - 2024) Kiona India Private Limited. All rights reserved.
    </p>
  </div>





    </div>
  )
}

export default Footer
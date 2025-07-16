// Footer.jsx
import React from "react";
import '../user/css/footer.css'
import logo from '../user/MR.KIRANA LOGO.png'
import payment from '../user/images/footer-payment.png'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-section brand">
          <div className="logo">
            {/* Replace with your svg or img logo */}
            <img src={logo}></img>
            {/* <span className="logo-text">Papaya Palette</span> */}
          </div>
          <p className="desc">
            The home and elements needed to create beautiful products.
          </p>
          <div className="social">
            <a href="#"><i className="fab fa-facebook-f" aria-label="Facebook"></i></a>
            <a href="#"><i className="fab fa-twitter" aria-label="Twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin-in" aria-label="LinkedIn"></i></a>
            <a href="#"><i className="fab fa-youtube" aria-label="YouTube"></i></a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li>About us</li>
            <li>Careers</li>
            <li>Store Locations</li>
            <li>Our Blog</li>
            <li>Reviews</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Shop</h3>
          <ul>
            <li>Game & Video</li>
            <li>Phone & Tablets</li>
            <li>Computers & Laptop</li>
            <li>Sport Watches</li>
            <li>Discounts</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li>FAQs</li>
            <li>Reviews</li>
            <li>Contact Us</li>
            <li>Shipping</li>
            <li>Returns</li>
          </ul>
        </div>
        <div className="footer-section talk">
          <h3>Talk To Us</h3>
          <p>Find a location nearest you.<br /><span className="footer-link">See Our Stores</span></p>
          <div className="footer-contact">
            <div className="phone">+624 423 26 72</div>
            <div className="email">support@harry.com</div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          Copyright © 2025 by <span className="footer-link">Kirana</span> All rights reserved.
        </span>
        <div className="payments">
          <img src={payment} alt="payment" />
        </div>
        <button className="backtotop" aria-label="Back to top">↑</button>
      </div>
    </footer>
  );
};

export default Footer;

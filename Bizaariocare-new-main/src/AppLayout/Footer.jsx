import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaFacebookF,
  FaTelegramPlane,
  FaInstagram,
  FaBitcoin,
} from "react-icons/fa";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { MdOutlineMailOutline } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
// import { MdEmail, MdPhone, MdLanguage } from "react-icons/md";
import { FaFigma } from "react-icons/fa";
import "../assets/css/footer.css";
import footerLogo from '../assets/images/footer-logo.png'
import socialIcon1 from '../assets/images/icons/social-icons/social.svg'
import socialIcon2 from '../assets/images/icons/social-icons/social-1.svg'
import socialIcon3 from '../assets/images/icons/social-icons/social-2.svg'
import socialIcon4 from '../assets/images/icons/social-icons/social-3.svg'
import { NavLink } from 'react-router'


const Footer = () => {
  return (
    <footer className="footer-section" >
      <div className="container py-5">
        <div className="row gy-4">
          {/* Logo & About */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-logo">
 <img
              src={footerLogo}
              alt="Bizaario Logo"
              className="mb-3"
            />
            </div>
           
            <p className="footer-text">
              High level experience in web design and development knowledge,
              producing quality work.
            </p>
            <h6 className="fw-bold">Follow us</h6>
            <div className="d-flex gap-3 mt-2">
              {/* <FaFacebookF className="social-icon" />
              <FaTelegramPlane className="social-icon" />
              <FaInstagram className="social-icon" />
             <FaFigma className="social-icon"/> */}
             
                  <a href=""><img src={socialIcon1} alt="" /></a>
                  <a href=""><img src={socialIcon2} alt="" /></a>
                  <a href=""><img src={socialIcon3} alt="" /></a>
                  <a href=""><img src={socialIcon4} alt="" /></a>
             
            </div>
          </div>
 
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3"><MdOutlinePhoneInTalk /> Phone Number</h6>
            <p className="mb-3 light-color" tel="5252525252"> +91 5252525252</p>

            <h6 className="fw-bold mb-1"><MdOutlineMailOutline /> Email ID</h6>
            <a href=" mailto:rjvijs42@gmail.com"className="mb-3 light-color decoration-none" >rjvijs42@gmail.com</a>

            <h6 className="fw-bold mt-3"><TbWorld /> Website</h6>
            <a className="mb-0 light-color decoration-none" href="https://papayapalette.com/" target="_blank">www.papayapalette.com</a>
          </div>
 
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3">Company</h6>
            <ul className="list-unstyled ft-quick-link">
              {/* <NavLink to='/about'>About Us </NavLink> */}
              <li>
              <NavLink to='/about'>About Us</NavLink>
              </li>
              <li>FAQs</li>
              <li>Contact Us</li>
            </ul>
          </div>
 
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3">Use Cases</h6>
            <ul className="list-unstyled ft-quick-link">
              <li> <NavLink to='/privacy-policy'>Privacy Policy</NavLink></li>
              <li>Terms of Use</li>
              <li>Legal</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom text-center py-3">
        ©2021 BIZAARIO CONNECT All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;

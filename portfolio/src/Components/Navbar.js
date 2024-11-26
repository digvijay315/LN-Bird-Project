import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Navbar.css"; // Your custom CSS

const Navbar = () => {
  return (
<nav className="navbar navbar-expand-lg bg-black">
  <div className="container">
    {/* Brand Logo */}
    <a className="navbar-brand text-white d-flex align-items-center" href="#">
      <span className="logo-icon me-2">ⓒ</span>MOBILITY
    </a>
    {/* Toggler for mobile view */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    {/* Navbar links */}
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <a className="nav-link text-white" href="#">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">
            About Us
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">
            Services
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">
            Portfolio
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">
            Features
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">
            Team
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">
            Testimonials
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">
            Why Choose
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white" href="#">
            Contact Us
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>

  );
};

export default Navbar;

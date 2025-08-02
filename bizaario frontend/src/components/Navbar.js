import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../assets/Bizzario.png'
import '../styles/Navbar.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="navbar">
      {/* Left Logo */}
      <div className="nav-left">
        <Link to="/">
          <img src={logo} alt="Bizaario Care Logo" className="logo" />
        </Link>
      </div>

      {/* Hamburger Icon (Mobile) */}
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Center Navigation Links */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li className={currentPath === "/" ? "active" : ""}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li className={currentPath === "/about" ? "active" : ""}>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
        </li>
        <li className={currentPath === "/hospital-partners" ? "active" : ""}>
          <Link to="/hospital-partners" onClick={() => setMenuOpen(false)}>Hospital Partners</Link>
        </li>
        <li className={currentPath === "/medical-board" ? "active" : ""}>
          <Link to="/medical-board" onClick={() => setMenuOpen(false)}>Medical Board</Link>
        </li>
        <li className={currentPath === "/news-articles" ? "active" : ""}>
          <Link to="/news-articles" onClick={() => setMenuOpen(false)}>News & Articles</Link>
        </li>
        <li className={currentPath === "/contact" ? "active" : ""}>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
        </li>
      </ul>

      {/* Right Section */}
      <div className="nav-right">
        <select className="language-select">
          <option>English India</option>
          <option>English US</option>
        </select>
        <button className="btn-login">Login</button>
        <button className="btn-signup">Sign Up</button>
      </div>
    </nav>
  );
}

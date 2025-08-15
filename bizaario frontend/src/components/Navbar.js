import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // ✅ Import Link for navigation
import "../styles/Navbar.css";
import logo from "../assets/Bizzario.png"; // Replace with your logo path

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate=useNavigate()

  return (
    <nav className="navbar">
      {/* Left Logo */}
      <div className="nav-left">
        <Link to="/"> {/* ✅ Clicking logo goes to Home */}
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
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
        <li><Link to="/hospital-partners" onClick={() => setMenuOpen(false)}>Hospital Partners</Link></li>
        <li><Link to="/medical-board" onClick={() => setMenuOpen(false)}>Medical Board</Link></li>
        <li><Link to="/news-articles" onClick={() => setMenuOpen(false)}>News & Articles</Link></li>
        <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
      </ul>

      {/* Right Section */}
      <div className="nav-right">
        <select className="language-select">
          <option>English India</option>
          <option>English US</option>
        </select>
        <button className="btn-login" onClick={()=>navigate('/signin')}>Login</button>
        <button className="btn-signup" onClick={()=>navigate('/register')}>Sign Up</button>
      </div>
    </nav>
  );
}

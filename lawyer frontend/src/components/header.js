import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo1 from '../components/counvoImg/Counvo - LOGO (1).png';
import logo from '../components/counvoImg/image.png'
import Swal from 'sweetalert2';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem('userDetails'));

  const handleLogout = () => {
    localStorage.removeItem('userDetails');
    Swal.fire({
      icon: 'success',
      title: 'Logout Successfull',
      text: 'You are Successfully Logout..!',
      showConfirmButton: true,
    });
    navigate('/');
    setMenuOpen(false);
  };

  // Helper to check active path (for subpaths)
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <style>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
          padding: 10px 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .logo {
          height: 50px;
          cursor: pointer;
        }
          .logo1 {
          height: 50px;
          cursor: pointer;
          margin-left:-100
        }

        .nav-links {
          color: black;
          display: flex;
          gap: 30px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-links li {
          cursor: pointer;
          font-weight: 500;
          position: relative;
          transition: color 0.2s;
        }

        .nav-links li.active {
          color: #1956d2;
        }

        .nav-links li.active::after {
          content: '';
          display: block;
          margin: 0 auto;
          width: 60%;
          border-bottom: 3px solid #1956d2;
          border-radius: 2px;
          animation: underlineGrow 0.3s cubic-bezier(.4,0,.2,1);
        }

        @keyframes underlineGrow {
          from { width: 0; }
          to { width: 60%; }
        }

        .hamburger {
          display: none;
          flex-direction: column;
          cursor: pointer;
          gap: 5px;
        }

        .hamburger span {
          width: 25px;
          height: 3px;
          background: #333;
        }

        @media (max-width: 768px) {
          .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: #fff;
            flex-direction: column;
            gap: 20px;
            padding: 30px;
            transform: translateY(-120%);
            transition: transform 0.3s cubic-bezier(.4,0,.2,1);
          }

          .nav-links.open {
            transform: translateY(0);
          }

          .hamburger {
            display: flex;
          }
        }
      `}</style>

      <header className="header">
            <img
          src={logo}
          alt="Logo"
          className="logo"
          onClick={() => { navigate('/'); setMenuOpen(false); }}
        />
      
       

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li
            className={isActive('/') ? 'active' : ''}
            onClick={() => { navigate('/'); setMenuOpen(false); }}
          >
            Home
          </li>
          <li
            className={isActive('/about') ? 'active' : ''}
            onClick={() => { navigate('/aboutus'); setMenuOpen(false); }}
          >
            About
          </li>
          <li
            className={isActive('/contact') ? 'active' : ''}
            onClick={() => { navigate('/contactus'); setMenuOpen(false); }}
          >
            Contact
          </li>
{userData?.user && (
  <li 
    style={{ position: 'relative', cursor: 'pointer' }} 
    onClick={() => setSubmenuOpen(!submenuOpen)}
  >
    <span style={{ fontWeight: 'bold', color: 'blue' }}>
      {userData.user.fullName} &#9662; {/* ▼ icon */}
    </span>
   <ul style={{
  width: "200px",
  position: 'absolute',
  top: '100%',
  right: 0,                  // change this!
  background: '#fff',
  listStyle: 'none',
  padding: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  display: submenuOpen ? 'block' : 'none',
  zIndex: 1000
}}>

      <li onClick={() => { navigate('/findlawyer'); setMenuOpen(false); setSubmenuOpen(false); }}>Find Lawyer</li>
      <li onClick={() => { navigate('/clientprofile'); setMenuOpen(false); setSubmenuOpen(false); }}>Profile</li>
      <li onClick={() => { navigate('/supports'); setMenuOpen(false); setSubmenuOpen(false); }}>Supports</li>
      <li onClick={() => { navigate('/clientchathistory'); setMenuOpen(false); setSubmenuOpen(false); }}>History</li>
      <li onClick={() => { navigate('/termsandconditions'); setMenuOpen(false); setSubmenuOpen(false); }}>Terms & Conditions</li>
      <li onClick={() => { handleLogout(); setMenuOpen(false); setSubmenuOpen(false); }}>Logout</li>
    </ul>
  </li>
)}


          <li
            onClick={() => { navigate('/login'); setMenuOpen(false); }}
            style={{ display: userData?.user ? "none" : "block" }}
            className={isActive('/login') ? 'active' : ''}
          >
            Login
          </li>
        </ul>

        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </header>
    </>
  );
}

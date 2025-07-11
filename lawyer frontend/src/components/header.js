import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo1 from '../components/counvoImg/Counvo - LOGO (1).png';
import Swal from 'sweetalert2';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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
          src={logo1}
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
            onClick={() => { navigate('/about'); setMenuOpen(false); }}
          >
            About
          </li>
          <li
            className={isActive('/contact') ? 'active' : ''}
            onClick={() => { navigate('/contact'); setMenuOpen(false); }}
          >
            Contact
          </li>
          {userData?.user && (
            <>
              <li style={{ fontWeight: 'bold', color: 'blue' }}>
                {userData.user.fullName}
              </li>
              <li
                className={isActive('/findlawyer') ? 'active' : ''}
                onClick={() => { navigate('/findlawyer'); setMenuOpen(false); }}
              >
                Find Lawyer
              </li>
              <li
                className={isActive('/clientprofile') ? 'active' : ''}
                onClick={() => { navigate('/clientprofile'); setMenuOpen(false); }}
              >
                Profile
              </li>
              <li
                className={isActive('/supports') ? 'active' : ''}
                onClick={() => { navigate('/supports'); setMenuOpen(false); }}
              >
                Supports
              </li>
              <li
                className={isActive('/clientchathistory') ? 'active' : ''}
                onClick={() => { navigate('/clientchathistory'); setMenuOpen(false); }}
              >
                History
              </li>
              <li
                className={isActive('/termsandconditions') ? 'active' : ''}
                onClick={() => { navigate('/termsandconditions'); setMenuOpen(false); }}
              >
                Terms & Conditions
              </li>
              <li
                onClick={() => { handleLogout(); setMenuOpen(false); }}
              >
                Logout
              </li>
            </>
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

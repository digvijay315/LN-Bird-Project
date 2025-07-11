import React from 'react';
import logo1 from '../components/counvoImg/Counvo - LOGO (1).png';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Header() {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem('userDetails'));

    const handleLogout = () => {
     localStorage.removeItem('userDetails');
      Swal.fire({
             icon: 'success',
             title: 'Logout Successfull',
             text:  'You are Successfully Logout..!',
             showConfirmButton: true,
           });
     navigate('/');
   };

  return (
 
 <header
  className="fl-header fl-header-single fl-header-type1"
        style={{
          padding: '10px 30px',
          backgroundColor: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',    // or 'fixed'
          top: 0,                // stick to the top
          zIndex: 1000,          // ensure it's above other content
          width: '100%',         // full width if using fixed
        }}
      >
      {/* Logo */}
      <div className="nav-logo d-flex align-items-center">
        <img
          src={logo1}
          alt="Logo"
          style={{ height: '65px', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />
      </div>

      {/* Navigation Menu */}
     <nav className="fl-mega-menu nav-menu" style={{ flexGrow: 1, marginLeft: '35%' }}>
  <ul
    id="menu-main-menu-1"
    className="menu nav-menu"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '45px', // slightly reduced gap
      listStyle: 'none',
      margin: 0,
    }}
  >
    <li className="nav-item">
      <a
        onClick={() => navigate('/')}
        className="menu-link main-menu-link item-title"
        style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
      >
        Home
      </a>
    </li>
    {/* <li className="nav-item">
      <a
        className="menu-link main-menu-link item-title"
        style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
      >
        Find Lawyers
      </a>
    </li> */}
    {/* <li className="nav-item">
      <a
        className="menu-link main-menu-link item-title"
        style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
      >
        How It Works
      </a>
    </li> */}
    {/* <li className="nav-item">
      <a
        className="menu-link main-menu-link item-title"
        style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
      >
        Legal Resources
      </a>
    </li> */}
    <li className="nav-item">
      <a
        className="menu-link main-menu-link item-title"
        style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
      >
        About Us
      </a>
    </li>
    <li className="nav-item">
      <a
        className="menu-link main-menu-link item-title"
        style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
      >
        Contact
      </a>
    </li>
   <li className="nav-item dropdown" style={{ display: userData?.user ? 'block' : 'none' }}>
  <a
    className="menu-link main-menu-link item-title dropdown-toggle"
    href="#"
    id="userDropdown"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
    style={{ cursor: 'pointer', whiteSpace: 'nowrap',color:"blue",fontWeight:"bold" }}
  >
     {userData?.user?.fullName} <span style={{ fontSize: '14px' }}>▼</span>
  </a>
  <ul className="dropdown-menu" aria-labelledby="userDropdown" style={{cursor:"pointer"}}>
    <li><a className="dropdown-item" onClick={()=>navigate('/')} >Home</a></li>
    <li><a className="dropdown-item" onClick={()=>navigate('/findlawyer')}>Find Lawyer</a></li>
    <li><a className="dropdown-item" onClick={()=>navigate('/clientprofile')}> Profile</a></li>
    <li><a className="dropdown-item" onClick={()=>navigate('/supports')} >Supports</a></li>
    <li><a className="dropdown-item" onClick={()=>navigate('/clientchathistory')}>History</a></li>
    <li><a className="dropdown-item" onClick={handleLogout}>Logout</a></li>
  </ul>
</li>

  </ul>
</nav>

      {/* Login / Sign Up Button aligned to right */}
      <div className="link-reg" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => navigate('/login')}
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Login / Sign Up
        </button>
      </div>
    </header>
  
  );
}

export default Header;

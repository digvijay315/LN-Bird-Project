import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router'
import langIcon from '../assets/images/icons/language.svg';
import Logo from '../assets/images/logo1.png'; 
//  import home from '../assets/css/home..module.css'; 

const Header = () => {
  const [scrollDown, setScrollDown] = useState(false);
  // const [menuStatus, setMenuStatus] = useState(true);
  // const myDivRef = useRef(null);

  // console.log(myDivRef)

  // function menuStatusFn() {
  //   setMenuStatus(!menuStatus) 
  // }

  //  useEffect(() => {
  //   myDivRef.current.style.classList.add('class-one'); 
  // }, []);

  window.onscroll = function() {
    if (this.scrollY > 10) {
        setScrollDown(true);
    } else{
      setScrollDown(false);
    }
};
  return (
    <>
      <nav className={`navbar navbar-expand-xl navbar-light bg-white shadow-sm  main-navbar ${scrollDown==true?'headerfix': ''}`  } id='mainNavbar'>
      <div className="container">
        
          {/* Logo */}
          <div className="brand">
             <a className="navbar-brand d-flex align-items-center" href="/">
          <img src={Logo} alt="Logo"  className="me-4" />
       
        </a>
          </div>
       

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className= {`collapse navbar-collapse `} id="navbarNav">
          {/* Center links */}
          <ul className="navbar-nav mx-auto">
            <li > 
                <NavLink to="/"  className='nav-link '>Home</NavLink>
            </li>
            <li className="nav-item">
         
                <NavLink to="/about" className='nav-link '>About</NavLink>
            </li>
            <li className="nav-item">
               
                <NavLink to="/partners" className='nav-link '>Hospital Partners</NavLink>
            </li>
            <li className="nav-item">
              
                <NavLink to="/medical-board"  className='nav-link '>Medical Board</NavLink>
            </li>
            <li className="nav-item"> 
                <NavLink to="/news-articles"  className='nav-link '>News & Articles</NavLink>
            </li>
            <li className="nav-item">
                
                <NavLink to="/contact"  className='nav-link '>Contact Us</NavLink>
            </li>
          </ul>

          {/* Right buttons */}
          <div className="d-flex align-items-center gap-2 mb-lg-0 mb-3">
            {/* Language Selector */}
            <div className="dropdown ">
              <button
                className="btn btn nav-btn-style dropdown-toggle d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src={langIcon} alt="" className='me-2' /> English
              </button>
              <ul className="dropdown-menu ">
                <li><a className="dropdown-item " href="/">English</a></li>
                <li><a className="dropdown-item" href="/">Hindi</a></li>
              </ul>
            </div>

            {/* Login */}
            <a href="https://bizaariocare.com/signin" className="btn nav-btn-style">Login</a>

            {/* Sign Up */}
            <a href="/signup" className="btn nav-btn-style2">Sign Up</a>
          </div>
        </div>
      </div>
    </nav>
    
    </>

  );
}



export default Header;
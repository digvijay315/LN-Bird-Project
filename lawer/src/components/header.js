import React from 'react'
import logo from '../components/counvoImg/counvo - Findmylawyer.jpg'
import logo1 from '../components/counvoImg/counvo - Findmylawyer_Icon (1).png'
import logo2 from '../components/counvoImg/counvo - Findmylawyer.png'
import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate=useNavigate()
  return (
    <div>          <header class="fl-header fl-header-single fl-header-type1">
                <div class="nav-logo d-flex align-items-center">
                   
                     <img style={{textAlign:'center', fontSize:'25px',cursor:"pointer"}}  onClick={()=>navigate('/') } src={logo1} />
                 
                </div>
                <nav class="fl-mega-menu nav-menu">
                    <ul id="menu-main-menu-1" class="menu nav-menu">
                        <li class="nav-item ">
                            <a onClick={()=>navigate('/')} class="menu-link main-menu-link item-title" style={{cursor:"pointer"}}>Home</a>
                            {/* <div class="sub-nav">
                                <ul class="menu-depth-1 sub-menu sub-nav-group">
                                    <li><a href="index.html">Home - Classic</a></li>
                                    <li><a href="home-2.html">Home - Rental</a></li>
                                    <li><a href="home-3.html">Home - Products</a></li>
                                </ul>
                            </div> */}
                        </li>
                        <li class="nav-item ">
                            <a href="about.html" class="menu-link main-menu-link item-title" >Find Lawyers</a>
                        </li>
                        <li class="nav-item ">
                            <a href="li" class="menu-link main-menu-link item-title">How It Works</a>
                            {/* <div class="sub-nav">
                                <ul class="menu-depth-1 sub-menu sub-nav-group">
                                    <li class="sub-nav-item"><a href="02_listings-list.html" class="menu-link sub-menu-link">Listing - List</a></li>
                                    <li class="sub-nav-item"><a href="02_listings-grid.html" class="menu-link sub-menu-link">Listing - Grid</a></li>
                                    <li class="sub-nav-item"><a href="02_listings-left-filter-grid.html" class="menu-link sub-menu-link">Listing - Left Filter</a></li>
                                    <li class="sub-nav-item"><a href="02_listings-top-filter.html" class="menu-link sub-menu-link">Listing - Top Filter</a></li>
                                    <li class="sub-nav-item"><a href="02_listings-services.html" class="menu-link sub-menu-link">Listings - Services</a></li>
                                </ul>
                            </div> */}
                        </li>
                        <li class="nav-item ">
                            <a href="#" class="menu-link main-menu-link item-title">Legal Resources</a>
                            {/* <div class="sub-nav">
                                <ul class="menu-depth-1 sub-menu sub-nav-group">
                                    <li class="sub-nav-item"><a href="blog.html" class="menu-link sub-menu-link">News</a></li>
                                    <li class="sub-nav-item"><a href="single-post.html" class="menu-link sub-menu-link">Single Post</a></li>
                                </ul>
                            </div> */}
                        </li>
                        <li class="nav-item ">
                            <a href="#" class="menu-link main-menu-link item-title">About Us</a>
                            {/* <div class="sub-nav">
                                <ul class="menu-depth-1 sub-menu sub-nav-group">
                                    <li class="sub-nav-item"><a href="contact.html" class="menu-link sub-menu-link">Contact</a></li>
                                    <li class="sub-nav-item"><a href="404.html" class="menu-link sub-menu-link">404 page</a></li>
                                    <li class="sub-nav-item"><a href="login.html" class="menu-link sub-menu-link">Login</a></li>
                                    <li class="sub-nav-item"><a href="register.html" class="menu-link sub-menu-link">Registration</a></li>
                                </ul>
                            </div> */}
                        </li>
                         <li class="nav-item">
                             <a href="#" class="menu-link main-menu-link item-title">Contact</a>
                         </li>
                    </ul>
                </nav>
                <div class="link-reg d-flex flex-lg-no-wrap flex-wrap flex-lg-row flex-column align-items-center justify-content-sm-between justify-content-md-center justify-content-end">
                    <ul class="d-flex mb-xl-0 mb-4">
                        <li>
                            <a onClick={()=>navigate('/login')} style={{cursor:"pointer",fontSize:"18px",fontWeight:"bold"}}><i class="icon-user icons"></i>Login/Sign Up</a>
                        </li>
                       
                     
                    </ul>
                   
                </div>
            </header>
      
    </div>
  )
}

export default Header

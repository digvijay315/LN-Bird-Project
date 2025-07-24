import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../user/context/cartcontext";
import { useWishlist } from "../user/context/wishlistcontext";
import '../user/css/header.css'
import logo from  "../user/MR.KIRANA LOGO.png";

import CartSidebar from "../user/cartsidebar";
import WishlistSidebar from "../user/wishlistsidebar";
import Menus from "../user/menus";
import useSticky from "../user/sticky";
import HeroBanner from "./hero";
import Swal from "sweetalert2";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  const { sticky } = useSticky();

  const navigate=useNavigate()
     const user= localStorage.getItem("userEmail");

  const handlelogout=()=>
  {
    Swal.fire({
      icon:"success",
      title:"Logout Successfull",
      text:"you are log out successfully",
      showConfirmButton:"true"
    })
    localStorage.removeItem('userEmail')
    navigate('/')
  }

  return (
    <>
    <header className="main-header">
  <div className="container header-flex">
    <div className="logo">
      <Link to="/">
        <img src={logo} alt="Kirana" />
      </Link>
    </div>
  
    <nav className="main-nav">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/pages">Pages</Link></li>
        <li><Link to="/contact">Contact us</Link></li>
          {user && (
        <li className="dropdown">
          <span>{user} ▾</span>
          <ul className="dropdown-menu">
            <li><Link to="/updateuserprofile">Profile</Link></li>
            <li><Link to="/myorders">My Orders</Link></li>
            <li><Link onClick={handlelogout}>Logout</Link></li>
          </ul>
        </li>
      )}

      </ul>
    </nav>
 
    <div className="header-search">
      <input type="text" placeholder="Search for products..." />
      <i className="fa fa-search"></i>
    </div>
    <div className="header-icons">
      <Link to="/registration" className="icon-btn"><i className="fa-regular fa-user"></i></Link>
      {/* <button className="icon-btn">
        <i className="fa-regular fa-heart"></i>
        <span className="badge"></span>
      </button> */}
      <button className="icon-btn" onClick={()=>setIsCartOpen(true)}>
        <i className="fa-solid fa-cart-shopping"></i>
        <span className="badge">{cartItems.length}</span>
      </button>
    </div>
  </div>
</header>

{/* <HeroBanner/> */}

      {/* Sidebars */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      {/* <WishlistSidebar isWishlistOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} /> */}
    </>
  );
};

export default Header;

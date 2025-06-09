// src/components/Header.jsx
import React from 'react';
import '../css/userheader.css';

const Userheader = () => {
    const username="user"
  return (
    <header className="header">
      <div className="left-section">
        {/* You can add logo or title here if needed */}
      </div>

      <div className="right-section">
        {/* <span className="notification" title="Notifications">🔔</span> */}
       
        <img
          src="https://cdn-icons-png.flaticon.com/512/9131/9131478.png"
          alt="Profile"
          className="profile-pic"
        />
         <span className="username">{username}</span>
      </div>
      
    </header>
  );
};

export default Userheader;

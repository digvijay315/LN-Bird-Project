import React, { useState } from 'react';
import '../css/usersidebarmenu.css'; // For basic styling

const UserSidebarMenu = () => {
 const [isOpen, setIsOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(false);
  const username = 'John Doe';

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <div className="layout">
      {isOpen && (
        <div className="sidebar">
          <button className="toggle-btn inside" onClick={toggleSidebar}>
            ✖
          </button>
          <ul className="menu">
            <li><span>🏠</span> Dashboard</li>
            <li><span>👤</span> Profile</li>
            <li onClick={toggleDropdown} className="dropdown-toggle">
              <span>⚙️</span> Settings
              <span className="arrow">{openDropdown ? '▲' : '▼'}</span>
            </li>
            {openDropdown && (
             <ul className={`dropdown ${openDropdown ? 'slide-down' : 'slide-up'}`} style={{color:"white"}}>
                <li>👤 Account</li>
                <li>🔒 Privacy</li>
                <li>🛡️ Security</li>
                </ul>

            )}
            <li><span>💬</span> Chat</li>
            <li><span>🔔</span> Notifications</li>
            <li><span>📊</span> Analytics</li>
            <li><span>🗂️</span> Documents</li>
            <li><span>📢</span> Announcements</li>
            <li><span>📅</span> Calendar</li>
            <li><span>📥</span> Inbox</li>
            <li><span>⭐</span> Favorites</li>
            <li><span>⚡</span> Activity Log</li>
            <li>  <span>❓</span> Help & Support</li>
            <li><span>🚪</span> Logout</li>
          </ul>
        </div>
      )}

      {!isOpen && (
        <button className="toggle-btn outside" onClick={toggleSidebar}>
          ☰
        </button>
      )}

     
    </div>
  );
};

export default UserSidebarMenu;

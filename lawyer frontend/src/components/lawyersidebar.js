import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import socket from './socket';

function Lawyersidebar() {
   const [showProfileModal, setShowProfileModal] = useState(false);
   const [userDetails, setUserDetails] = useState(null);
   const [loading, setLoading] = useState(false);
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
   const [hasNewMessages, setHasNewMessages] = useState(false);
   
   const navigate = useNavigate();
   const location = useLocation(); // Add this to track current route
   const [screenWidth, setScreenWidth] = useState(window.innerWidth);

   useEffect(() => {
     const handleReceive = ({ from, message }) => {
       console.log('📨 New message from client:', message);
       setHasNewMessages(true);
     };

     socket.on('receiveMessage', handleReceive);

     return () => {
       socket.off('receiveMessage', handleReceive);
     };
   }, []);

   // Function to determine if a menu item is active
   const isActiveMenuItem = (path) => {
     if (!path) return false;
     return location.pathname === path || location.pathname.includes(path);
   };

 const menuItems = [
  { label: 'Dashboard', icon: '■', path: '/Lawyerdashboard' },
  { label: 'Profile', icon: '◉', path: '/LawyerDashboard/completelawyerprofile' },
  { label: 'Clients', icon: '◎', path: '/clients' },
  { label: 'Messages', icon: '✉', path: '/messages' },
  { label: 'My Cases', icon: '▣', path: '/cases' },
  { label: 'Schedule', icon: '◈', path: '/schedule' },
  { label: 'Billing', icon: '▦', path: '/billing' },
  { label: 'Documents', icon: '▤', path: '/documents' },
  { label: 'Settings', icon: '⚙', path: '/settings' },
  { label: 'Support', icon: '◐', path: '/support' },
];


   const headerMenu = [
     { label: 'Notifications', path: '/notifications' },
   ];

   const handleLogout = () => navigate('/login');

   return (
     <div>
     <style>{`
         * {
           margin: 0;
           padding: 0;
           box-sizing: border-box;
         }

         body {
           font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
           min-height: 100vh;
           margin: 0;
           padding: 0;
         }

         .dashboard-container {
           display: grid;
           grid-template-areas: 
             "header header"
             "sidebar main";
           grid-template-columns: 280px 1fr;
           grid-template-rows: 70px 1fr;
           min-height: 100vh;
           background: #f8fafc;
           margin: 0;
           padding: 0;
         }

         /* Header Styles - Dark theme to match sidebar */
         header {
           grid-area: header;
             background: linear-gradient(180deg,rgb(0, 0, 0) 0%,rgb(0, 0, 0) 100%);
           color: white;
           display: flex;
           justify-content: space-between;
           align-items: center;
           padding: 0 2rem;
           box-shadow: 0 4px 6px -1px rgba(111, 111, 111, 0.3);
           position: fixed;
           top: 0;
           left: 0;
           right: 0;
           width: 100%;
           height: 70px;
           z-index: 1000;
           margin: 0;
           border-bottom: 1px solid #333;
         }

         .logo-text {
           font-size: 1.5rem;
           font-weight: 700;
           letter-spacing: -0.025em;
           color: #ffffff;
           text-shadow: 0 2px 4px rgba(108, 108, 108, 0.3);
         }

         .header-menu {
           display: flex;
           gap: 2rem;
           align-items: center;
         }

         .header-menu-item {
           position: relative;
           padding: 0.75rem 1rem;
           border-radius: 0.5rem;
           transition: all 0.2s ease;
           color: rgba(255, 255, 255, 0.9);
           cursor: pointer;
           font-weight: 500;
           border: 1px solid transparent;
         }

         .header-menu-item:hover {
           background: rgba(255, 255, 255, 0.1);
           color: white;
           transform: translateY(-1px);
           border-color: rgba(255, 255, 255, 0.2);
         }

         .notification-badge {
           background: #ef4444;
           color: white;
           border-radius: 9999px;
           padding: 0.125rem 0.375rem;
           font-size: 0.75rem;
           font-weight: 600;
           margin-left: 0.5rem;
           animation: pulse 2s infinite;
         }

         @keyframes pulse {
           0%, 100% { opacity: 1; }
           50% { opacity: 0.7; }
         }

         .hamburger {
           display: none;
           font-size: 24px;
           cursor: pointer;
           color: white;
         }

         /* Sidebar Styles - Black background with white text */
         aside {
           grid-area: sidebar;
           background: linear-gradient(180deg,rgb(0, 0, 0) 0%,rgb(0, 0, 0) 100%);
           border-right: 1px solid #333;
           overflow-y: auto;
           box-shadow: 4px 0 6px -1px rgba(108, 104, 104, 0.5);
           position: fixed;
           top: 70px;
           left: 0;
           width: 250px;
           height: calc(100vh - 70px);
         }

         .sidebar-menu {
           list-style: none;
           padding: 1rem 0;
         }

         .sidebar-item {
           padding: 0.75rem 1.5rem;
           cursor: pointer;
           color: #ffffff;
           font-weight: 500;
           transition: all 0.3s ease;
           border-left: 3px solid transparent;
           display: flex;
           align-items: center;
           gap: 0.75rem;
           margin: 0.25rem 0;
         }

         .sidebar-item:hover {
           background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
           color: #ffffff;
           border-left-color: #ffffff;
           transform: translateX(4px);
           box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.1);
         }

         .sidebar-item.active {
           background: linear-gradient(90deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
           color: #ffffff;
           border-left-color: #ffffff;
           font-weight: 600;
           box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.1);
         }

         .sidebar-item span:first-child {
           font-size: 1.2rem;
           filter: brightness(1) contrast(1);
           color: #ffffff;
         }

         .new-message-indicator {
           width: 8px;
           height: 8px;
           background: #ef4444;
           border-radius: 50%;
           margin-left: auto;
           animation: pulse 2s infinite;
           box-shadow: 0 0 6px #ef4444;
         }

         .logout-item {
           margin-top: auto;
           border-top: 1px solid #333;
           padding-top: 1rem;
           margin-top: 2rem;
         }

         .logout-item:hover {
           background: linear-gradient(90deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.1) 100%);
           color: #ff6b6b;
           border-left-color: #ef4444;
         }

         /* Scrollbar styling for sidebar */
         aside::-webkit-scrollbar {
           width: 6px;
         }

         aside::-webkit-scrollbar-track {
           background:rgb(112, 112, 112);
         }

         aside::-webkit-scrollbar-thumb {
           background: #333;
           border-radius: 3px;
         }

         aside::-webkit-scrollbar-thumb:hover {
           background: #555;
         }

         /* Mobile responsive */
         @media (max-width: 768px) {
           .hamburger {
             display: block;
           }
           
           aside {
             display: none;
           }

           aside.mobile-open {
             display: block;
             position: fixed;
             top: 70px;
             left: 0;
             width: 280px;
             height: calc(100vh - 70px);
             z-index: 200;
             background: linear-gradient(180deg,rgb(108, 101, 101) 0%,rgb(90, 80, 80) 100%);
             box-shadow: 4px 0 6px -1px rgba(64, 64, 64, 0.5);
           }

           .header-menu {
             display: ${headerMenuOpen ? 'flex' : 'none'};
             position: absolute;
             top: 100%;
             left: 0;
             right: 0;
             background:rgb(94, 89, 89);
             flex-direction: column;
             padding: 1rem;
             gap: 0.5rem;
             box-shadow: 0 4px 6px -1px rgba(94, 88, 88, 0.3);
             border-top: 1px solid #333;
           }

           .header-menu-item {
             color: #ffffff !important;
             padding: 0.75rem;
             border-radius: 6px;
             border: 1px solid #333;
           }

           .header-menu-item:hover {
             background: rgba(255, 255, 255, 0.1);
             color: #ffffff !important;
             border-color: rgba(255, 255, 255, 0.2);
           }
         }
       `}</style>

       <header>
         <div className="logo-text">⚖️ Lawyer Portal</div>
         
         {screenWidth < 769 && (
           <div 
             className="hamburger" 
             onClick={() => setHeaderMenuOpen(!headerMenuOpen)}
           >
             ☰
           </div>
         )}

         <nav className="header-menu">
           {headerMenu.map((item) => (
             <div
               key={item.label}
               className="header-menu-item"
               onClick={() => {
                 if (item.label === 'Profile') {
                   setShowProfileModal(true);
                 } else {
                   navigate(item.path);
                 }
                 setHeaderMenuOpen(false);
               }}
             >
               {item.label}
               {item.label === 'Notifications' && (
                 <span className="notification-badge">3</span>
               )}
             </div>
           ))}
           <div className="header-menu-item" onClick={handleLogout}>
             👨‍⚖️ Logout
           </div>
         </nav>
       </header>

       <aside className={sidebarOpen ? 'mobile-open' : ''}>
         <ul className="sidebar-menu">
           {menuItems.map((item) => (
             <li
               key={item.label}
               className={`sidebar-item ${isActiveMenuItem(item.path) ? 'active' : ''}`}
               onClick={() => {
                 if (item.label === 'Messages') {
                   setHasNewMessages(false);
                 } else if (item.path) {
                   navigate(item.path);
                 }
                 setSidebarOpen(false);
               }}
             >
               <span>{item.icon}</span>
               {item.label}
               {item.label === 'Messages' && hasNewMessages && (
                 <span className="new-message-indicator"></span>
               )}
             </li>
           ))}
           <li className="sidebar-item logout-item" onClick={handleLogout}>
             <span>🔒</span> Logout
           </li>
         </ul>
       </aside>
     </div>
   );
}

export default Lawyersidebar;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Lawyersidebar() {

   const [showProfileModal, setShowProfileModal] = useState(false);
   const [userDetails, setUserDetails] = useState(null);
   const [loading, setLoading] = useState(false);
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [headerMenuOpen, setHeaderMenuOpen] = useState(false); // New state for mobile header menu
   const navigate = useNavigate();
   const [screenWidth, setScreenWidth] = useState(window.innerWidth);


   
 
   
   
 
  
 
   const menuItems = [
     { label: 'Dashboard', icon: '🏠', path: '/Lawyerdashboard' },
     { label: 'Profile', icon: '🧑', path: './completelawyerprofile' },
     { label: 'Clients', icon: '👥', path: '/clients' },
     { label: 'Messages', icon: '💬', path: '/messages' },
     { label: 'My Cases', icon: '📂', path: '/cases' },
     { label: 'Schedule', icon: '📅', path: '/schedule' },
     { label: 'Billing', icon: '💳', path: '/billing' },
     { label: 'Documents', icon: '📁', path: '/documents' },
     { label: 'Settings', icon: '⚙️', path: '/settings' },
     { label: 'Support', icon: '🆘', path: '/support' },
     { label: 'Logout', icon: '🔒', path: '/logout' },
   ];
 
   const headerMenu = [
     // { label: 'Dashboard', path: '/dashboard' },
     // { label: 'Profile', path: './dashboard' },
     // { label: 'Clients', path: '/clients' },
     // { label: 'Messages', path: '/messages' },
     // { label: 'Reports', path: '/reports' },
     { label: 'Notifications', path: '/notifications' },
   ];
 
  
 
   
 
   const handleLogout = () => navigate('/logout');

  return (
    <div>
        <style>{`
        @media (max-width: 768px) {
          header, aside {
            width: 100%;
            padding: 10px;
          }
             @media (max-width: 768px) {
      .main1 {
        width: 100%;
        margin-left: 0;
      }

          header {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            background-color: #fff;
            color: #000 !important;
            position: relative;
          }
          .header-menu {
            display: ${headerMenuOpen ? 'flex' : 'none'};
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 20px;
            gap: 15px;
            z-index: 100;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          .header-menu-item {
            color: #000 !important;
            font-weight: 500;
            cursor: pointer;
            padding: 10px;
          }
          .hamburger {
            display: block;
            font-size: 24px;
            cursor: pointer;
          }
        }
        @media (min-width: 769px) {
          .hamburger {
            display: none;
          }
          .header-menu {
            display: flex !important;
          }
          aside {
            display: block !important;
          }
        }


        .quick-access {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.stats-card,
.quick-card {
  flex: 1 1 calc(25% - 20px); /* 4 cards per row with gap */
  min-width: 200px;
  max-width: 250px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 1px 5px rgba(0,0,0,0.1);
}

.stats-label {
  font-weight: 500;
  margin-bottom: 10px;
}

.stats-value {
  font-size: 24px;
  font-weight: bold;
}

.quick-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.quick-card:hover {
  transform: scale(1.02);
}


.case-card {
  background: #f5f5f5;
  border-radius: 10px;
  padding: 16px 24px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.case-card:hover {
  transform: scale(1.02) translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.case-title {
  font-weight: 600;
  font-size: 16px;
  transition: color 0.3s ease;
}

.case-status {
  color: #fff;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  min-width: 80px;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.case-card:hover .case-title {
  color: #007bff; /* Optional highlight on hover */
}

.case-card:hover .case-status {
  transform: scale(1.05);
}



      `}</style>

 {/* HEADER */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '0 50px'
      }}>
        <div className="logo-text" style={{ 
          marginRight: screenWidth >= 769 ? '100px' : '0'
        }}>
          Lawyer Portal
        </div>
        
        {screenWidth < 769 && (
          <div 
            className="hamburger" 
            onClick={() => setHeaderMenuOpen(!headerMenuOpen)}
          >
            ☰
          </div>
        )}

       <nav
  className="header-menu"
  style={{
    display: screenWidth >= 769 ? 'flex' : headerMenuOpen ? 'flex' : 'none',
    flexDirection: screenWidth < 769 ? 'column' : 'row',
    gap: screenWidth >= 769 ? '100px' : '10px',
  }}
>

          {headerMenu.map((item) => (
            <div
              key={item.label}
              className="header-menu-item"
              onClick={() => {
                if (item.label === 'Profile') {
                  // fetchLawyerDetails();
                  setShowProfileModal(true);
                } else {
                  navigate(item.path);
                }
                setHeaderMenuOpen(false);
              }}
              role="button"
              tabIndex={0}
            >
              {item.label}
              {item.label === 'Notifications' && (
                <span className="notification-badge">3</span>
              )}
            </div>
          ))}
        </nav>

        <div className="header-right">
          <span role="img" aria-label="lawyer icon">👨‍⚖️</span>
        </div>
      </header>
         <aside
        style={{
          display: sidebarOpen || screenWidth >= 769 ? 'block' : 'none',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          backgroundColor: '#ffffff',
          padding: '10px',
          color: '#000000',
        }}
      >
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {menuItems.slice(0, menuItems.length - 1).map((item) => (
            <li
              key={item.label}
              onClick={() => {
                setSidebarOpen(false);
                navigate(item.path);
              }}
              tabIndex={0}
              role="button"
              style={{
                padding: '10px 0',
                cursor: 'pointer',
                color: '#000',
              }}
            >
              <span>{item.icon}</span> {item.label}
            </li>
          ))}
          <li
            className="logout"
            onClick={() => {
              setSidebarOpen(false);
              handleLogout();
            }}
            tabIndex={0}
            role="button"
            style={{
              padding: '10px 0',
              cursor: 'pointer',
              color: '#000',
            }}
          >
            <span>🔒</span> Logout
          </li>
        </ul>
      </aside>
      
    </div>
  )
}

export default Lawyersidebar

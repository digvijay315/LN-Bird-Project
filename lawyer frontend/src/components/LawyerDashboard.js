import React, { useEffect, useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LawyerProfileModal from './LawyerProfileModel';
import api from '../api'; // adjust the path as needed
import { io } from 'socket.io-client';
// ✅ CORRECT
import socket from './socket';


const LawyerDashboard = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false); // New state for mobile header menu
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // const socket = io('http://localhost:5000'); 

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const lawyerdetails = JSON.parse(localStorage.getItem('lawyerDetails'));


//=============================================== chat code start================================================================


   const [chatClients, setChatClients] = useState([]);
const [messages, setMessages] = useState([]);
const [selectedClient, setSelectedClient] = useState(null);
const [hasNewMessages, setHasNewMessages] = useState(false);
const fetchedClientsRef = useRef(new Set()); // ✅ Store fetched client IDs

const [messageMap, setMessageMap] = useState({}); // { [clientId]: [ {text, isMe} ] }

useEffect(() => {
  if (!lawyerdetails?.lawyer?._id) return;

  if (!socket.connected) socket.connect();
  

  socket.on('connect', () => {
    const lawyerId = lawyerdetails.lawyer._id;
    socket.emit('lawyerOnline', lawyerId);
  });

  const handleReceiveMessage = async ({ from, message }) => {
    setHasNewMessages(true);

    // ✅ Save to messageMap regardless of chat being open
  setMessageMap((prev) => ({
    ...prev,
    [from]: [...(prev[from] || []), { text: message, isMe: false }],
  }));
    // ✅ Update message list if open
    if (selectedClient?._id === from) {
      setMessages((prev) => [...prev, { text: message, isMe: false }]);
    }

    // ✅ Prevent refetch if already fetched
    if (!fetchedClientsRef.current.has(from)) {
      try {
        const res = await api.get(`api/user/${from}`);
        const data = res.data;

        const newClient = {
          _id: data._id,
          firstName: data.fullName || 'Client',
          profilepic: data.profilepic || '',
          lastMessage: message,
        };

        // ✅ Deduplication inside setChatClients
        setChatClients((prev) => {
          const exists = prev.find((c) => c._id === from);
          if (exists) return prev.map((c) =>
            c._id === from ? { ...c, lastMessage: message } : c
          );
          return [...prev, newClient];
        });

        fetchedClientsRef.current.add(from);
      } catch (err) {
        console.error('❌ Failed to fetch client:', err);
      }
    } else {
      // ✅ Client already exists, just update message
      setChatClients((prev) =>
        prev.map((c) =>
          c._id === from ? { ...c, lastMessage: message } : c
        )
      );
    }
  };

  socket.on('receiveMessage', handleReceiveMessage);

  return () => {
    socket.off('connect');
    socket.off('receiveMessage', handleReceiveMessage);
    socket.disconnect();
  };
}, [lawyerdetails?.lawyer?._id, selectedClient]);


const handleOpenChat = (client) => {
  setSelectedClient(client);
  const msgs = messageMap[client._id] || [];
  setMessages(msgs); // ✅ Show past messages
};

  

  const handleSend = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const msg = e.target.value.trim();
      e.target.value = '';

      socket.emit('privateMessage', {
        toUserId: selectedClient._id,
        message: msg,
        fromUserType: 'lawyer'
      });

      setMessages(prev => [...prev, { text: msg, isMe: true }]);
    }
  };

// =========================================chat code end========================================================================

const [showChat, setShowChat] = useState(false);


    const handleLogout = () => {
        socket.disconnect();
        localStorage.removeItem('userDetails'); // or however you're storing it
        navigate('/login');
        };
  

  const menuItems = [
    { label: 'Dashboard', icon: '🏠', path: '/Lawyerdashboard' },
    { label: 'Profile', icon: '🧑', path: './completelawyerprofile' },
    { label: 'Clients', icon: '👥', path: '/clients' },
    { label: 'Messages', icon: '💬' },
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

  const cases = [
    { id: 1, title: 'Contract Dispute', status: 'Active' },
    { id: 2, title: 'Intellectual Property', status: 'Pending' },
    { id: 3, title: 'Personal Injury', status: 'Closed' },
    { id: 4, title: 'Real Estate', status: 'Active' },
  ];

  const clients = [
    { id: 1, name: 'Ram Kumar', email: 'ram.kumar@example.com' },
    { id: 2, name: 'Anita Singh', email: 'anita.singh@example.com' },
    { id: 3, name: 'John Doe', email: 'john.doe@example.com' },
  ];

  const statusColor = (status) => {
    switch (status) {
      case 'Active': return '#28a745';
      case 'Pending': return '#ffc107';
      case 'Closed': return '#dc3545';
      default: return '#6c757d';
    }
  };




  return (
    <>
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

      {/* SIDEBAR */}
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

      {/* MAIN CONTENT */}
      <main className='main1'>
        <h6>Welcome Back, {lawyerdetails?.lawyer?.firstName || 'Lawyer'}!</h6>

        <div className="quick-access">
          {[{ label: 'Total Clients', value: clients.length },
            { label: 'Active Cases', value: cases.filter(c => c.status === 'Active').length },
            { label: 'Pending Cases', value: cases.filter(c => c.status === 'Pending').length },
            { label: 'Closed Cases', value: cases.filter(c => c.status === 'Closed').length }
          ].map((stat, idx) => (
            <div className="stats-card" key={idx}>
              <div className="stats-label">{stat.label}</div>
              <div className="stats-value">{stat.value}</div>
            </div>
          ))}
        </div>

        <section style={{ marginTop: '40px' }}>
          <h2>🗂 My Cases</h2>
          {cases.map((c) => (
            <div className="case-card" key={c.id}>
              <div className="case-title">{c.title}</div>
              <div className="case-status" style={{ backgroundColor: statusColor(c.status) }}>
                {c.status}
              </div>
            </div>
          ))}
        </section>

        <section style={{ marginTop: '40px' }}>
          <h2>👥 Clients</h2>
          <table>
            <thead>
              <tr><th>Name</th><th>Email</th></tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}><td>{client.name}</td><td>{client.email}</td></tr>
              ))}
            </tbody>
          </table>
        </section>

        <section style={{ marginTop: '40px' }}>
          <h2>⚡ Quick Access</h2>
          <div className="quick-access">
            {menuItems.slice(0, 6).map((item) => (
              <div
                key={item.label}
                className="quick-card"
                 onClick={() => {
              if (item.label === 'Messages') {
                setHasNewMessages(false);
                 setShowChat(true);
              }
              navigate(item.path);
            }}
                role="button"
                tabIndex={0}
              >
                
                <div className="quick-icon">{item.icon}</div>
                <div>{item.label}</div>
                 {item.label === 'Messages' && hasNewMessages && (
              <span style={{
                width: '10px',
                height: '10px',
                backgroundColor: 'red',
                borderRadius: '50%',
                display: 'inline-block',
              }}></span>
            )}
              </div>
              
            ))}
          </div>

          {/* Floating Chat Popup */}
{showChat && (
  <div style={{
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '350px',
    height: '450px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    zIndex: 1000,
  }}>
    {/* Header */}
    <div style={{
      padding: '10px',
      backgroundColor: '#3b82f6',
      color: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px',
    }}>
      <span>Messages</span>
      <button onClick={() => setShowChat(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px' }}>✖</button>
    </div>

    {/* Tabs (Clients) */}
    <div style={{
      display: 'flex',
      overflowX: 'auto',
      borderBottom: '1px solid #ccc',
      padding: '5px',
      gap: '8px',
    }}>
      {chatClients?.map((client) => (
        <div
          key={client._id}
          onClick={() => {
           handleOpenChat(client);
            setHasNewMessages(false);
          }}
          style={{
            padding: '6px 10px',
            backgroundColor: selectedClient?._id === client._id ? '#3b82f6' : '#e5e5e5',
            color: selectedClient?._id === client._id ? '#fff' : '#000',
            borderRadius: '15px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {client.firstName}
        </div>
      ))}
    </div>

    {/* Messages List */}
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '10px',
      background: '#f9f9f9',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
    }}>
      {messages.map((msg, index) => (
        <div key={index} style={{
          alignSelf: msg.isMe ? 'flex-end' : 'flex-start',
          backgroundColor: msg.isMe ? '#dcf8c6' : '#fff',
          padding: '8px 12px',
          borderRadius: '15px',
          maxWidth: '80%',
        }}>
          {msg.text}
        </div>
      ))}
    </div>

    {/* Input */}
    <div style={{ padding: '8px', borderTop: '1px solid #ccc' }}>
      <input
        type="text"
        placeholder="Type a message..."
        style={{
          width: '100%',
          padding: '8px',
          borderRadius: '20px',
          border: '1px solid #ccc',
          fontSize: '14px',
        }}
        onKeyDown={handleSend}
        disabled={!selectedClient}
      />
    </div>
  </div>
)}


        </section>

         {/* Chat Window */}
      {/* {selectedClient && (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}>
          <div style={{
            padding: '10px',
            backgroundColor: '#3b82f6',
            color: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <span>{selectedClient.firstName}</span>
            <button onClick={() => setSelectedClient(null)} style={{
              background: 'none', border: 'none', color: 'white', fontSize: '18px'
            }}>✖</button>
          </div>

          <div style={{
            flex: 1,
            padding: '10px',
            overflowY: 'auto',
            background: '#f1f1f1',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.isMe ? 'flex-end' : 'flex-start',
                backgroundColor: msg.isMe ? '#dcf8c6' : '#fff',
                padding: '8px 12px',
                borderRadius: '15px',
              }}>
                {msg.text}
              </div>
            ))}
          </div>

          <div style={{ padding: '10px', borderTop: '1px solid #ccc' }}>
            <input
              type="text"
              placeholder="Type a message"
              style={{ width: '100%', padding: '8px', borderRadius: '20px' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  const msg = e.target.value.trim();
                  setMessages(prev => [...prev, { text: msg, isMe: true }]);
                  socket.emit('privateMessage', {
                    toLawyerId: selectedClient._id, // for client chat, send to client
                    message: msg,
                  });
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
      )} */}
      </main>

      {showProfileModal && (
        <LawyerProfileModal
          onClose={() => setShowProfileModal(false)}
          userDetails={userDetails}
        />
      )}
    </>
  );
};

export default LawyerDashboard;
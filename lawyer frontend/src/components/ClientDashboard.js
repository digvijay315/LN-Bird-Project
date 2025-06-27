import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientProfileModal from './ClientProfileModal';
import api from '../api';
import { io } from 'socket.io-client';
// ✅ CORRECT
import socket from './socket';


const ClientDashboard = () => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const userData =  JSON.parse(localStorage.getItem('userDetails'));



  const menuItems = [
    { label: 'Dashboard / Home', icon: '🏠', path: '/dashboard' },
    { label: 'Find a Lawyer', icon: '👨‍⚖', path: '/find-lawyer' },
    { label: 'My Consultations', icon: '📅', path: '/consultations' },
    { label: 'Messages / Chat', icon: '💬', path: '/messages' },
    { label: 'Documents', icon: '📁', path: '/documents' },
    { label: 'Payments & Invoices', icon: '💳', path: '/payments' },
    { label: 'Profile / Settings', icon: '⚙', path: '/settings' },
    { label: 'Support / Help', icon: '🆘', path: '/support' },
    { label: 'Logout', icon: '🔒', path: '/logout' },
  ];

  const headerMenu = [
 
    { label: 'Notifications', path: '/notifications' },
    // { label: 'Logout', path: '/logout' },
  ];

  const caseStatuses = [
    { id: 1, title: 'Divorce Case', status: 'Active' },
    { id: 2, title: 'Property Dispute', status: 'Pending' },
    { id: 3, title: 'Trademark Filing', status: 'Closed' },
  ];

  const statusColor = (status) => {
    switch (status) {
      case 'Active': return '#28a745';
      case 'Pending': return '#ffc107';
      case 'Closed': return '#dc3545';
      default: return '#6c757d';
    }
  };

 const iconOnlyButtonStyle = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '6px',
  borderRadius: '50%',
  transition: 'transform 0.2s ease',
};

const iconStyle = {
  width: '22px',
  height: '22px',
  filter: 'grayscale(0%)',
};



    const [lawyers, setLawyers] = useState([]);
  
        const fetchlawyers=async()=>
          {
              try {
              const resp=await api.get('api/lawyer/getalllawyerprofile')
              setLawyers(resp.data.filter((item)=>(item.status==="verified")))
              } catch (error) {
              console.log(error);
              
              }
          }
          useEffect(() => {
              fetchlawyers();
          }, []);


// ======================================chat code start================================================================


  //  const socket = io('http://localhost:5000'); 

 const [chatLawyer, setChatLawyer] = useState(null);
const [onlineLawyers, setOnlineLawyers] = useState([]);
const [messages, setMessages] = useState([]);

useEffect(() => {
  if (!userData.user._id) return;

  if (!socket.connected) socket.connect();

  socket.on('connect', () => {
    console.log('✅ Connected (client):', socket.id);
    socket.emit('clientOnline', userData.user._id);
    socket.emit('getOnlineLawyers');
  });

  socket.on('onlineLawyersList', (ids) => {
    console.log('✅ Received online lawyers:', ids);
    setOnlineLawyers(ids);
  });

  socket.on('updateOnlineUsers', (ids) => {
    setOnlineLawyers(ids);
  });

  socket.on('receiveMessage', ({ from, message }) => {
    if (chatLawyer?._id === from) {
      setMessages((prev) => [...prev, { text: message, isMe: false }]);
    }
  });

  return () => {
    socket.off('connect');
    socket.off('receiveMessage');
    socket.off('onlineLawyersList');
    socket.off('updateOnlineUsers');
  };
}, [userData.user._id, chatLawyer]);

const handleSendMessage = (text) => {
  if (!text.trim() || !chatLawyer?._id) return;

  socket.emit('privateMessage', {
    toUserId: chatLawyer._id,
    message: text,
    fromUserType: 'client',
  });

  setMessages((prev) => [...prev, { text, isMe: true }]);
};

   const handleOpenChat = (lawyer) => {
    const isOnline = onlineLawyers.includes(lawyer._id);
    setChatLawyer({ ...lawyer, isOnline });
    setMessages([]); // optionally load old messages
  };

  //============================================== chat code end==============================================================
 


  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .header-nav {
            display: ${headerMenuOpen ? 'flex' : 'none'};
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #0052cc;
            flex-direction: column;
            padding: 20px;
            gap: 15px;
            z-index: 100;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          .header-menu-item {
            color: white !important;
            font-weight: 500;
            cursor: pointer;
            padding: 10px;
          }
          .hamburger {
            display: block !important;
            cursor: pointer;
          }
          .profile-icon {
            margin-left: auto !important;
          }
        }
        @media (min-width: 769px) {
          .hamburger {
            display: none !important;
          }
          .header-nav {
            display: flex !important;
          }
        }
      `}</style>

      <div style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f4f7fa',
        color: '#333',
      }}>
        {/* Header */}
        <header style={{
          backgroundColor: '#0052cc',
          color: 'white',
          padding: '15px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)',
          position: 'relative',
        }}>
          <div style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '1.2px' }}>
            Client Dashboard Portal
          </div>

          {/* Hamburger Menu (visible on mobile) */}
          <div 
            className="hamburger" 
            style={{ 
              display: 'none', 
              cursor: 'pointer',
              padding: '8px',
            }} 
            onClick={() => setHeaderMenuOpen(!headerMenuOpen)}
          >
            <div style={{ width: '25px', height: '3px', backgroundColor: 'white', margin: '4px 0' }}></div>
            <div style={{ width: '25px', height: '3px', backgroundColor: 'white', margin: '4px 0' }}></div>
            <div style={{ width: '25px', height: '3px', backgroundColor: 'white', margin: '4px 0' }}></div>
          </div>

          {/* <nav className="header-nav">
            <ul style={{
              display: 'flex',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              gap: screenWidth >= 769 ? '40px' : '10px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: '600',
              flexDirection: screenWidth >= 769 ? 'row' : 'column',
            }}>
              {headerMenu.map((item, index) => (
                <li
                  key={index}
                  className="header-menu-item"
                  onClick={() => {
                    if (item.label === 'User profile') {
                      setShowProfileModal(true);
                    } else {
                      navigate(item.path);
                    }
                    setHeaderMenuOpen(false);
                  }}
                  style={{
                    position: 'relative',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    transition: 'background-color 0.3s, color 0.3s',
                    color: 'white',
                  }}
                  onMouseEnter={e => {
                    if (screenWidth >= 769) {
                      e.currentTarget.style.backgroundColor = '#0041a8';
                      e.currentTarget.style.color = '#ffdb4d';
                    }
                  }}
                  onMouseLeave={e => {
                    if (screenWidth >= 769) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </nav> */}

          <div className="profile-icon" style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: '#ffcc00',
            color: '#0052cc',
            fontWeight: '700',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            cursor: 'default',
          }}>
            {clientName ? clientName.split(' ').map(n => n[0]).join('') : 'U'}
          </div>
        </header>

        {/* Main Area */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Sidebar */}
          <aside style={{
            width: sidebarOpen || screenWidth >= 769 ? '260px' : '0px',
            background: 'white',
            padding: sidebarOpen || screenWidth >= 769 ? '30px 20px' : '0px',
            borderRight: sidebarOpen || screenWidth >= 769 ? '1px solid #ddd' : 'none',
            overflowY: 'auto',
            boxShadow: sidebarOpen || screenWidth >= 769 ? '2px 0 6px rgba(0,0,0,0.05)' : 'none',
            transition: 'width 0.3s ease',
          }}>
            {(sidebarOpen || screenWidth >= 769) && (
              <>
                <h2 style={{
                  marginBottom: '35px',
                  color: '#004080',
                  fontWeight: '700',
                  fontSize: '22px',
                  letterSpacing: '0.5px',
                }}>Client Portal</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {menuItems.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        navigate(item.path);
                        if (screenWidth < 769) setSidebarOpen(false);
                      }}
                      style={{
                        marginBottom: '20px',
                        cursor: 'pointer',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: '600',
                        fontSize: '16px',
                        color: '#333',
                        transition: 'background-color 0.3s, color 0.3s',
                        userSelect: 'none',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = '#e6f0ff';
                        e.currentTarget.style.color = '#0052cc';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#333';
                      }}
                    >
                      <span style={{ marginRight: '14px', fontSize: '20px' }}>{item.icon}</span>
                      {item.label}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </aside>

          {/* Main Content */}
          <main style={{
            flex: 1,
            marginLeft:"20%",
            padding: '50px 50px 60px 50px',
            overflowY: 'auto',
            backgroundColor: '#fefefe',
          }}>
            <h1 style={{
              marginBottom: '20px',
              marginTop: '20px',
              fontWeight: '700',
              fontSize: '28px',
              color: '#004080',
            }}>
             Welcome Back, {userData?.user?.fullName}
            </h1>

            {/* Case Status Section */}
            <section style={{ marginBottom: '50px' }}>
              <h2 style={{
                fontSize: '22px',
                fontWeight: '700',
                marginBottom: '25px',
                color: '#0066cc',
              }}>📁 Case Status</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {caseStatuses.map((caseItem) => (
                  <div
                    key={caseItem.id}
                    onClick={() => navigate('/case-details')}
                    style={{
                      padding: '20px 25px',
                      borderRadius: '12px',
                      boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: 'white',
                      fontWeight: '600',
                      fontSize: '17px',
                      color: '#333',
                      userSelect: 'none',
                      cursor: 'pointer',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.boxShadow = '0 8px 18px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 3px 8px rgba(0,0,0,0.1)';
                    }}
                  >
                    <span>{caseItem.title}</span>
                    <span style={{
                      padding: '7px 16px',
                      borderRadius: '25px',
                      backgroundColor: statusColor(caseItem.status),
                      color: 'white',
                      fontWeight: '700',
                      fontSize: '14px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    }}>
                      {caseItem.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Access Section */}
            <section>
              <h2 style={{
                fontSize: '22px',
                fontWeight: '700',
                marginBottom: '25px',
                color: '#0066cc',
              }}>⚡ Quick Access</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '25px',
              }}>
                {menuItems.slice(0, 4).map((item, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(item.path)}
                    style={{
                      padding: '25px',
                      borderRadius: '14px',
                      boxShadow: '0 3px 10px rgba(0,0,0,0.12)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      backgroundColor: '#ffffff',
                      fontWeight: '700',
                      color: '#0052cc',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                      userSelect: 'none',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.boxShadow = '0 8px 18px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 3px 10px rgba(0,0,0,0.12)';
                    }}
                  >
                    <div style={{ fontSize: '36px', marginBottom: '15px' }}>{item.icon}</div>
                    <div style={{ fontSize: '17px' }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </section>
            
{/* =======================================popular lawyers==================================================================== */}


<section style={{ marginTop: '20px' }}>
  <h2 style={{
    fontSize: '24px',
    fontWeight: '800',
    marginBottom: '30px',
    color: '#1e3a8a',
    borderBottom: '3px solid #3b82f6',
    display: 'inline-block',
    paddingBottom: '5px',
  }}>
    🌟 Popular Lawyers
  </h2>

  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 240px)',
    gap: '30px',
  }}>
    {lawyers.map((item, index) => {
       const isOnline = onlineLawyers.includes(item._id);
      return(
      <div
        key={index}
        style={{
          padding: '20px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          cursor: 'pointer',
          textAlign: 'center',
          background: '#fff',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
        }}
      >
        <div style={{ marginBottom: '15px' }}>
          <img
            src={item.profilepic}
            alt='no image available'
            style={{
              height: '90px',
              width: '90px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid #3b82f6',
            }}
          />
        </div>

        <div style={{ fontSize: '17px', fontWeight: '600', color: '#0f172a' }}>
          {item.firstName} {item.lastName}
        </div>

             <div style={{ fontSize: '14px', marginTop: '4px' }}>
                <span style={{ color: isOnline ? 'green' : 'red' }}>
                  {isOnline ? '🟢 Online' : '🔴 Offline'}
                </span>
              </div>
       
         <div style={{ fontSize: '14px', marginTop: '4px' }}>
                <span style={{fontWeight:"bold"}}>Specializations:</span>:{item.specializations}
          </div>
           <div style={{ fontSize: '14px', marginTop: '4px' }}>
              <span style={{fontWeight:"bold"}}>Experience:</span>{item.yearsOfExperience}
          </div>

        <div style={{
          marginTop: '12px',
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
        }}>
          {/* Chat */}
          <button
            style={iconOnlyButtonStyle}
            title="Chat"
            onClick={() => handleOpenChat(item)}
          >
            💬
          </button>

          {/* WhatsApp */}
          <button
            title="WhatsApp"
            onClick={() => window.open(`https://wa.me/${item.mobile || ''}`, '_blank')}
            style={iconOnlyButtonStyle}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              style={iconStyle}
            />
          </button>

          {/* Message */}
          <button
            style={iconOnlyButtonStyle}
            title="Message"
            onClick={() => alert("Message clicked")}
          >
            ✉️
          </button>
        </div>
      </div>
      )
      })}
  </div>

  {/* Chat Window Inline */}
      {chatLawyer && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '300px',
          height: '400px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0 0 15px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 1000,
          fontFamily: 'Arial',
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: '#3b82f6',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            color: '#fff',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={chatLawyer.profilepic}
                alt="profile"
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid white',
                }}
              />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                  {chatLawyer.firstName} {chatLawyer.lastName}
                </div>
                <div style={{ fontSize: '12px', color: chatLawyer.isOnline ? 'lightgreen' : 'lightgray' }}>
                  {chatLawyer.isOnline ? '🟢 Online' : '🔴 Offline'}
                </div>
              </div>
            </div>
            <button
              onClick={() => setChatLawyer(null)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer',
              }}
            >✖</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: '10px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            backgroundColor: '#fafafa',
          }}>
            {messages.map((msg, index) => (
              <div key={index} style={{
                alignSelf: msg.isMe ? 'flex-end' : 'flex-start',
                backgroundColor: msg.isMe ? '#dcf8c6' : '#f1f1f1',
                padding: '8px 12px',
                borderRadius: '16px',
                maxWidth: '80%',
                fontSize: '14px',
              }}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '10px', borderTop: '1px solid #ddd' }}>
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
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  handleSendMessage(e.target.value.trim());
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>
      )}


</section>



          </main>
        </div>

        {/* Profile Modal */}
        {/* {showProfileModal && (
          <ClientProfileModal
            userDetails={userDetails}
            onClose={() => setShowProfileModal(false)}
          />
        )} */}
      </div>
    </>
  );
};

export default ClientDashboard;
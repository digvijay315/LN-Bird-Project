import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientProfileModal from './ClientProfileModal';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [clientName, setClientName] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem('clientName') || '';
    setClientName(storedName);

    const userData = localStorage.getItem('userDetails');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('Loaded userDetails:', parsedUser);
        setUserDetails(parsedUser);
      } catch (error) {
        console.error('Failed to parse userDetails:', error);
      }
    } else {
      console.warn('No userDetails found in localStorage');
    }
  }, []);

  const menuItems = [
    { label: 'Dashboard / Home', icon: '🏠', path: '/dashboard' },
    { label: 'Find a Lawyer', icon: '👨‍⚖️', path: '/find-lawyer' },
    { label: 'My Consultations', icon: '📅', path: '/consultations' },
    { label: 'Messages / Chat', icon: '💬', path: '/messages' },
    { label: 'Documents', icon: '📁', path: '/documents' },
    { label: 'Payments & Invoices', icon: '💳', path: '/payments' },
    { label: 'Profile / Settings', icon: '⚙️', path: '/settings' },
    { label: 'Support / Help', icon: '🆘', path: '/support' },
    { label: 'Logout', icon: '🔒', path: '/logout' },
  ];

  const headerMenu = [
    { label: 'Home', path: '/dashboard' },
    { label: 'User profile', path: '/settings' },
    { label: 'Case History', path: '/casehistory' },
    { label: 'Legal News', path: '/Legalnews' },
    { label: 'Notifications', path: '/notifications' },
    { label: 'Logout', path: '/logout' },
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

  return (
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
        padding: '15px 10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)',
      }}>
        <div style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '1.2px', marginLeft: '10px' }}>
          Client Dashboard Portal
        </div>

        <nav>
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            gap: '40px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: '600',
          }}>
            {headerMenu.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  if (item.label === 'User profile') {
                    setShowProfileModal(true);
                  } else {
                    navigate(item.path);
                  }
                }}
                style={{
                  position: 'relative',
                  padding: '6px 8px',
                  borderRadius: '6px',
                  transition: 'background-color 0.3s, color 0.3s',
                  color: 'white',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#0041a8';
                  e.currentTarget.style.color = '#ffdb4d';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>

        <div style={{
          marginLeft: '200px',
          
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
          width: '260px',
          background: 'white',
          padding: '30px 20px',
          borderRight: '1px solid #ddd',
          overflowY: 'auto',
          boxShadow: '2px 0 6px rgba(0,0,0,0.05)',
        }}>
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
                onClick={() => navigate(item.path)}
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
        </aside>

        {/* Main Content */}
        <main style={{
          flex: 1,
          padding: '50px 50px 60px 50px',
          overflowY: 'auto',
          backgroundColor: '#fefefe',
        }}>
          <h1 style={{
            marginBottom: '20px',
            marginTop:'20px',
            fontWeight: '700',
            fontSize: '28px',
            color: '#004080',
          }}>
            {clientName ? `Welcome Back, ${clientName}!` : 'Welcome Back!'}
          </h1>

          {/* 👤 User Info */}
         

          {/* 📁 Case Status */}
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

          {/* ⚡ Quick Access */}
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
        </main>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <ClientProfileModal
          userDetails={userDetails}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </div>
  );
};

export default ClientDashboard;

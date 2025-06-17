import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import LawyerProfileModal from './LawyerProfileModal';
import axios from 'axios';
import { Dashboard } from '@mui/icons-material';
//import LawyerProfileModal from './LawyerProfileModal';
import LawyerProfileModal from './LawyerProfileModel';







const LawyerDashboard = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();


 const storedUser = JSON.parse(localStorage.getItem('userDetails'));
const fetchLawyerDetails = async () => {
  try {
    setLoading(true);
    const token = storedUser?.token;

    if (!token) {
      console.error('No token found');
      return;
    }

    const response = await axios.get('http://localhost:5000/api/lawyers/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // No need for fallbacks since backend ensures all fields exist
    setUserDetails(response.data);
  } catch (err) {
    console.error('Error fetching profile:', err);
  } finally {
    setLoading(false);
  }
};
  

useEffect(() => {
  const data = JSON.parse(localStorage.getItem('userDetails'));
  if (data) {
    setUserDetails(data);
  }
  fetchLawyerDetails(); // Add this to fetch fresh data on mount
}, []);

  const menuItems = [
    { label: 'Dashboard', icon: '🏠', path: '/dashboard' },
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
    { label: 'Dashboard', path: '/dashboard' },
   { label: 'Profile', path: './dashboard' },

    { label: 'Clients', path: '/clients' },
    { label: 'Messages', path: '/messages' },
    { label: 'Reports', path: '/reports' },
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

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <>
      

      {/* HEADER */}
      <header>
        <div className="logo-text">Lawyer Portal</div>
        <nav className="header-menu">
          {headerMenu.map((item) => (
            <div
              key={item.label}
              className="header-menu-item"
              onClick={() => {
if (item.label === 'Profile') {
  fetchLawyerDetails();
  setShowProfileModal(true);
} else {
  navigate(item.path);
}

}}

              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && (item.action ? item.action() : navigate(item.path))}
            >
              {item.label}
              {item.label === 'Notifications' && (
                <span className="notification-badge" aria-label="3 new notifications">3</span>
              )}
            </div>
          ))}
        </nav>
        <div className="header-right">
          <span role="img" aria-label="lawyer icon">👨‍⚖️</span>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside>
        <ul>
          {menuItems.slice(0, menuItems.length - 1).map((item) => (
            <li
              key={item.label}
              onClick={() => navigate(item.path)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => e.key === 'Enter' && navigate(item.path)}
            >
              <span>{item.icon}</span>
              {item.label}
            </li>
          ))}
          <li
            className="logout"
            onClick={handleLogout}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => e.key === 'Enter' && handleLogout()}
          >
            <span>🔒</span>
            Logout
          </li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className='main1'>
        <h1>Welcome Back, {userDetails?.name || 'Lawyer'}!</h1>

        {/* Quick Stats */}
        <div className="quick-access">
          <div className="stats-card">
            <div className="stats-label">Total Clients</div>
            <div className="stats-value">{clients.length}</div>
          </div>
          <div className="stats-card">
            <div className="stats-label">Active Cases</div>
            <div className="stats-value">{cases.filter(c => c.status === 'Active').length}</div>
          </div>
          <div className="stats-card">
            <div className="stats-label">Pending Cases</div>
            <div className="stats-value">{cases.filter(c => c.status === 'Pending').length}</div>
          </div>
          <div className="stats-card">
            <div className="stats-label">Closed Cases</div>
            <div className="stats-value">{cases.filter(c => c.status === 'Closed').length}</div>
          </div>
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
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                </tr>
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
      onClick={() => navigate('./Dashboard')}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate('./Dashboard')}
    >
      <div className="quick-icon">{item.icon}</div>
      <div>{item.label}</div>
    </div>
            ))}
          </div>
        </section>
      </main>

      {/* Profile Modal */}
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
import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [pendingLawyers, setPendingLawyers] = useState([]);
  const [lawyers, setLawyers] = useState([
    { id: 1, name: 'Adv. Raj Malhotra', email: 'raj@example.com', active: true },
    { id: 2, name: 'Adv. Meena Joshi', email: 'meena@example.com', active: false },
  ]);

  const clients = [
    { id: 1, name: 'Karan Verma', email: 'karan@example.com' },
    { id: 2, name: 'Sara Khan', email: 'sara@example.com' },
  ];

  const cases = [
    { id: 1, title: 'Property Dispute', lawyer: 'Raj Malhotra', status: 'Active' },
    { id: 2, title: 'Fraud Allegation', lawyer: 'Meena Joshi', status: 'Closed' },
  ];

  // Simulate fetching pending lawyers (replace with actual API call)
  useEffect(() => {
    const fetchPendingLawyers = async () => {
      const mockPendingLawyers = [
        { id: 3, name: 'Adv. Arjun Patel', email: 'arjun@example.com', documents: 'view-documents.pdf' },
        { id: 4, name: 'Adv. Priya Sharma', email: 'priya@example.com', documents: 'view-documents.pdf' },
      ];
      setPendingLawyers(mockPendingLawyers);
    };
    fetchPendingLawyers();
  }, []);

  const handleApprove = (lawyerId) => {
    const lawyerToApprove = pendingLawyers.find(l => l.id === lawyerId);
    setLawyers([...lawyers, { ...lawyerToApprove, active: true }]);
    setPendingLawyers(pendingLawyers.filter(l => l.id !== lawyerId));
    alert(`Lawyer ${lawyerToApprove.name} approved!`);
  };

  const handleReject = (lawyerId) => {
    const lawyerToReject = pendingLawyers.find(l => l.id === lawyerId);
    setPendingLawyers(pendingLawyers.filter(l => l.id !== lawyerId));
    alert(`Lawyer ${lawyerToReject.name} rejected!`);
  };

  const handleLogout = () => {
    alert('Logged out!');
    // Add actual logout logic here (e.g., clear auth, redirect)
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-cards">
            <div className="card">👨‍⚖️ Lawyers: {lawyers.length}</div>
            <div className="card">🧑‍💼 Clients: {clients.length}</div>
            <div className="card">📂 Cases: {cases.length}</div>
            <div className="card">⏳ Pending Lawyers: {pendingLawyers.length}</div>
          </div>
        );
      case 'lawyers':
        return (
          <div className="table-container">
            <h2>Lawyers</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {lawyers.map((l) => (
                  <tr key={l.id}>
                    <td>{l.name}</td>
                    <td>{l.email}</td>
                    <td style={{ color: l.active ? 'green' : 'red' }}>
                      {l.active ? 'Active' : 'Inactive'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'clients':
        return (
          <div className="table-container">
            <h2>Clients</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'cases':
        return (
          <div className="table-container">
            <h2>Cases</h2>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Lawyer</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((cs) => (
                  <tr key={cs.id}>
                    <td>{cs.title}</td>
                    <td>{cs.lawyer}</td>
                    <td>{cs.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'pending-lawyers':
        return (
          <div className="table-container">
            <h2>Pending Lawyer Requests</h2>
            {pendingLawyers.length === 0 ? (
              <p>No pending requests</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Documents</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingLawyers.map((l) => (
                    <tr key={l.id}>
                      <td>{l.name}</td>
                      <td>{l.email}</td>
                      <td>
                        <a href={l.documents} target="_blank" rel="noopener noreferrer">
                          View Documents
                        </a>
                      </td>
                      <td className="actions">
                        <button className="approve-btn" onClick={() => handleApprove(l.id)}>Approve</button>
                        <button className="reject-btn" onClick={() => handleReject(l.id)}>Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      default:
        return <p>Select a tab to view content</p>;
    }
  };

  return (
    <div className="admin-panel">
      <header className="header">
        <h1 style={{ color: 'white' }}>⚖️ LawFirm Admin Panel</h1>
        <div className="user-menu">
          <span>Welcome, Admin</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
          <div className="avatar">A</div>
        </div>
      </header>

      <div className="layout">
        <nav className="sidebar">
          <ul>
            <li onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'active' : ''}>Dashboard</li>
            <li onClick={() => setActiveTab('lawyers')} className={activeTab === 'lawyers' ? 'active' : ''}>Lawyers</li>
            <li onClick={() => setActiveTab('clients')} className={activeTab === 'clients' ? 'active' : ''}>Clients</li>
            <li onClick={() => setActiveTab('cases')} className={activeTab === 'cases' ? 'active' : ''}>Cases</li>
            <li onClick={() => setActiveTab('pending-lawyers')} className={activeTab === 'pending-lawyers' ? 'active' : ''}>
              Pending Lawyers
              {pendingLawyers.length > 0 && (
                <span className="pending-count">{pendingLawyers.length}</span>
              )}
            </li>
          </ul>
        </nav>

        <main className="content">
          {renderContent()}
        </main>
      </div>

      <style jsx>{`
        .admin-panel {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: #2c3e50;
          color: white;
        }
        .user-menu {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .logout-btn {
          background: #e67e22;
          color: white;
          border: none;
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.3s ease;
        }
        .logout-btn:hover {
          background: #d35400;
        }
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #3498db;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        .layout {
          display: flex;
          min-height: calc(100vh - 72px);
        }
        .sidebar {
          width: 250px;
          background: #34495e;
          color: white;
          padding: 1rem 0;
        }
        .sidebar ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .sidebar li {
          padding: 1rem 2rem;
          cursor: pointer;
          position: relative;
          transition: background 0.2s;
        }
        .sidebar li:hover {
          background: #2c3e50;
        }
        .sidebar li.active {
          background: #3498db;
        }
        .pending-count {
          position: absolute;
          right: 1rem;
          background: #e74c3c;
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
        }
        .content {
          flex: 1;
          padding: 2rem;
          background: #ecf0f1;
        }
        .dashboard-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
        }
        .card {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          font-size: 1.2rem;
          text-align: center;
        }
        .table-container {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }
        th, td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background: #f8f9fa;
          font-weight: 600;
        }
        .actions {
          display: flex;
          gap: 0.5rem;
        }
        .approve-btn {
          background: #2ecc71;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
        }
        .reject-btn {
          background: #e74c3c;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;

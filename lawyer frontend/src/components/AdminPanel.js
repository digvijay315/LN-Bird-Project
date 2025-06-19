import React, { useState, useEffect } from 'react';
import api from '../api';
import { Offcanvas, Button, Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import '../css/adminpanel.css'


const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [pendingLawyers, setPendingLawyers] = useState([]);
  const [lawyers, setLawyers] = useState([]);

  const clients = [
    { id: 1, name: 'Karan Verma', email: 'karan@example.com' },
    { id: 2, name: 'Sara Khan', email: 'sara@example.com' },
  ];

  const cases = [
    { id: 1, title: 'Property Dispute', lawyer: 'Raj Malhotra', status: 'Active' },
    { id: 2, title: 'Fraud Allegation', lawyer: 'Meena Joshi', status: 'Closed' },
  ];


  const fetchlawyers=async()=>
  {
    try {
      const resp=await api.get('api/lawyer/getalllawyerprofile')
      setLawyers(resp.data.filter((item)=>(item.status==="verified")))
      setPendingLawyers(resp.data)
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    fetchlawyers();
  }, []);



  const handleApprove = async(lawyer) => {
    try {
      const resp=await api.put(`api/lawyer/approvedlawyer/${lawyer._id}`,{status:"verified"})
      if(resp.status===200)
      {
        setLawyers(...lawyers,lawyer)
        Swal.fire({
        icon: 'success',
        title: 'Approved...',
        text: "Lawyer Approved Successfully...",
        showConfirmButton: true,
        }).then(()=>
        (
          window.location.reload()
        ))
      }
      
    } catch (error) {
      console.log(error);
      
    }
  };


   const [show, setShow] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const[lawyerprofile,setlawyerprofile]=useState([])
    const [activeTab1, setActiveTab1] = useState('dashboard');
  
  const handleview = async(lawyerid) => {
    try {
      const resp=await api.get(`api/lawyer/getlawyer/${lawyerid}`)
      if(resp.status===200)
      {
        handleShow(resp.data)
       setlawyerprofile(resp.data)
      }
      
    } catch (error) {
      console.log(error);
      
    }
  };
  
 


  const handleShow = (lawyer) => {
    setSelectedLawyer(lawyer);
    setActiveTab1('basic');
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedLawyer(null);
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
            <div className="card">⏳ Pending Lawyers: {pendingLawyers.filter((item)=>(item.status!=="verified")).length}</div>
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
                  <tr key={l._id}>
                    <td>{l.firstName}</td>
                    <td>{l.email}</td>
                    <td>
                    {l.status}
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
                  {pendingLawyers.filter((item)=>(item.status!=="verified")).map((l) => (
                    <tr key={l.id}>
                      <td>{l.firstName}</td>
                      <td>{l.email}</td>
                      <td>
                        <a href={l.documents} target="_blank" rel="noopener noreferrer">
                          View Documents
                        </a>
                      </td>
                      <td className="actions">
                        <button className="approve-btn" onClick={() => handleApprove(l)}>Approve</button>
                        <button className="reject-btn" onClick={() => handleReject(l._id)}>Reject</button>
                        <button className="approve-btn" onClick={() => handleview(l._id)}>View</button>
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
                <span className="pending-count">{pendingLawyers.filter((item)=>(item.status!=="verified")).length}</span>
              )}
            </li>
          </ul>
        </nav>

        <main className="content">
          {renderContent()}
        </main>
      </div>

        {/* Offcanvas Panel */}
       <Offcanvas show={show} onHide={handleClose} placement="end" className="lawyer-offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-primary">Lawyer Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {selectedLawyer && (
            <Tabs
              activeKey={activeTab1}
              onSelect={(k) => setActiveTab1(k)}
              className="mb-3 nav-pills"
              justify
            >
              {/* BASIC TAB */}
              <Tab eventKey="basic" title="🧾 Basic">
                <div className="tab-content-section">
                  <p><strong>Name:</strong> {selectedLawyer.firstName} {selectedLawyer.lastName}</p>
                  <p><strong>Username:</strong> {selectedLawyer.username}</p>
                  <p><strong>Status:</strong> <span className="badge bg-success">{selectedLawyer.status}</span></p>
                </div>
              </Tab>

              {/* PERSONAL TAB */}
              <Tab eventKey="personal" title="👤 Personal">
                <div className="tab-content-section">
                  <p><strong>Email:</strong> {selectedLawyer.email}</p>
                  <p><strong>Phone:</strong> {selectedLawyer.phone}</p>
                </div>
              </Tab>

              {/* WORK TAB */}
              <Tab eventKey="work" title="💼 Work">
                <div className="tab-content-section">
                  <p><strong>Bar Reg No:</strong> {selectedLawyer.barRegistrationNumber}</p>
                  <p><strong>Practice Areas:</strong> {
                    Array.isArray(selectedLawyer.practiceAreas)
                      ? selectedLawyer.practiceAreas.join(', ')
                      : selectedLawyer.practiceAreas
                  }</p>
                  <p><strong>Experience:</strong> {selectedLawyer.yearsOfExperience} years</p>
                </div>
              </Tab>

              {/* OTHER TAB */}
              <Tab eventKey="other" title="📁 Other">
                <div className="tab-content-section">
                  <p><strong>ID:</strong> {selectedLawyer._id}</p>
                  {/* Add any other additional info here */}
                </div>
              </Tab>
            </Tabs>
          )}
        </Offcanvas.Body>
      </Offcanvas>

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
          padding: 1rem;
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
          width:150px;
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

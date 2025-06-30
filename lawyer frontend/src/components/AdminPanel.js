import React, { useState, useEffect } from 'react';
import api from '../api';
import { Offcanvas, Button, Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import '../css/adminpanel.css'
import Adminsidebar from './adminsidebar';
import Adminpanelheader from './adminpanelheader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaCheck, FaTimes, FaEye } from 'react-icons/fa';
import LawyerProfileTabs from './viewlawyerinfo';



const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [pendingLawyers, setPendingLawyers] = useState([]);
  const [lawyers, setLawyers] = useState([]);

  const [recentLawyers, setRecentLawyers] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [totalLawyers, setTotalLawyers] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setPendingLawyers([
      { id: 1, name: 'Adv. Raj Sharma', email: 'raj@gmail.com' },
      { id: 2, name: 'Adv. Pooja Mehta', email: 'pooja@gmail.com' }
    ]);

    setRecentLawyers([
      { name: 'Adv. Anil Kapoor', date: '2025-06-24' },
      { name: 'Adv. Meena Joshi', date: '2025-06-23' }
    ]);

    setRecentUsers([
      { name: 'Ravi Kumar', date: '2025-06-24' },
      { name: 'Neha Singh', date: '2025-06-23' }
    ]);

    setActivities([
      'Raj Sharma submitted registration',
      'Admin approved Adv. Anil Kapoor',
      'New user Ravi Kumar registered'
    ]);

    setTotalLawyers(42);
    setTotalUsers(153);

   
  }, []);



  const handleView = (id) => {
    alert(`View Lawyer ID: ${id}`);
  };

  const fetchlawyers=async()=>
  {
    try {
      const resp=await api.get('api/lawyer/getalllawyerprofile')
      setLawyers(resp.data.filter((item)=>(item.status==="verified")))
      setPendingLawyers(resp.data.filter((item)=>(item.status!=="verified")))
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    fetchlawyers();
  }, []);

  
  const[users,setusers]=useState([])
  const fetchusers=async()=>
  {
    try {
      const resp=await api.get('api/user/getalluser')
      console.log(resp);
      
      setusers(resp.data)
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    fetchusers();
  }, []);


  const groupByMonth = (data) => {
  const counts = {};

  data.forEach((item) => {
    const date = new Date(item.createdAt);
    const month = date.toLocaleString('default', { month: 'short' }); // Jan, Feb, ...
    
    counts[month] = (counts[month] || 0) + 1;
  });

  return counts; // { Jan: 5, Feb: 2, ... }
};

const generateChartData = (lawyers, users) => {
  const lawyerCounts = groupByMonth(lawyers);
  const userCounts = groupByMonth(users);

  const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const chartData = allMonths.map(month => ({
    month,
    lawyers: lawyerCounts[month] || 0,
    users: userCounts[month] || 0,
  }));

  return chartData;
};



useEffect(() => {
  if (lawyers.length && users.length) {
    const data = generateChartData(lawyers, users);
    setChartData(data);
  }
}, [lawyers, users]);
  



   const handleApprove = async (lawyer) => {
  const confirmResult = await Swal.fire({
    title: 'Are you sure?',
    text: `Do you want to approve ${lawyer.firstName} ${lawyer.lastName}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, approve',
    cancelButtonText: 'Cancel',
  });

  if (confirmResult.isConfirmed) {
    try {
      const resp = await api.put(`api/lawyer/approvedlawyer/${lawyer._id}`, { status: "verified" });

      if (resp.status === 200) {
        setLawyers(prev => [...prev]); // optional UI update logic
        Swal.fire({
          icon: 'success',
          title: 'Approved!',
          text: 'Lawyer approved successfully.',
          showConfirmButton: true,
        }).then(() => {
          window.location.reload();
        });
      }

    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong while approving the lawyer.',
      });
    }
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

  // const renderContent = () => {
  //   switch (activeTab) {
  //     case 'dashboard':
  //       return (
  //         <div className="dashboard-cards">
  //           <div className="card">👨‍⚖️ Lawyers: {lawyers.length}</div>
  //           <div className="card">🧑‍💼 Clients: {clients.length}</div>
  //           <div className="card">📂 Cases: {cases.length}</div>
  //           <div className="card">⏳ Pending Lawyers: {pendingLawyers.filter((item)=>(item.status!=="verified")).length}</div>
  //         </div>
  //       );
  //     case 'lawyers':
  //       return (
  //         <div className="table-container">
  //           <h2>Lawyers</h2>
  //           <table>
  //             <thead>
  //               <tr>
  //                 <th>Name</th>
  //                 <th>Email</th>
  //                 <th>Status</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {lawyers.map((l) => (
  //                 <tr key={l._id}>
  //                   <td>{l.firstName}</td>
  //                   <td>{l.email}</td>
  //                   <td>
  //                   {l.status}
  //                   </td>
  //                 </tr>
  //               ))}
  //             </tbody>
  //           </table>
  //         </div>
  //       );
  //     case 'clients':
  //       return (
  //         <div className="table-container">
  //           <h2>Clients</h2>
  //           <table>
  //             <thead>
  //               <tr>
  //                 <th>Name</th>
  //                 <th>Email</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {clients.map((c) => (
  //                 <tr key={c.id}>
  //                   <td>{c.name}</td>
  //                   <td>{c.email}</td>
  //                 </tr>
  //               ))}
  //             </tbody>
  //           </table>
  //         </div>
  //       );
  //     case 'cases':
  //       return (
  //         <div className="table-container">
  //           <h2>Cases</h2>
  //           <table>
  //             <thead>
  //               <tr>
  //                 <th>Title</th>
  //                 <th>Lawyer</th>
  //                 <th>Status</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {cases.map((cs) => (
  //                 <tr key={cs.id}>
  //                   <td>{cs.title}</td>
  //                   <td>{cs.lawyer}</td>
  //                   <td>{cs.status}</td>
  //                 </tr>
  //               ))}
  //             </tbody>
  //           </table>
  //         </div>
  //       );
  //     case 'pending-lawyers':
  //       return (
  //         <div className="table-container">
  //           <h2>Pending Lawyer Requests</h2>
  //           {pendingLawyers.length === 0 ? (
  //             <p>No pending requests</p>
  //           ) : (
  //             <table>
  //               <thead>
  //                 <tr>
  //                   <th>Name</th>
  //                   <th>Email</th>
  //                   <th>Documents</th>
  //                   <th>Actions</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {pendingLawyers.filter((item)=>(item.status!=="verified")).map((l) => (
  //                   <tr key={l.id}>
  //                     <td>{l.firstName}</td>
  //                     <td>{l.email}</td>
  //                     <td>
  //                       <a href={l.documents} target="_blank" rel="noopener noreferrer">
  //                         View Documents
  //                       </a>
  //                     </td>
  //                     <td className="actions">
  //                       <button className="approve-btn" onClick={() => handleApprove(l)}>Approve</button>
  //                       <button className="reject-btn" onClick={() => handleReject(l._id)}>Reject</button>
  //                       <button className="approve-btn" onClick={() => handleview(l._id)}>View</button>
  //                     </td>
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </table>
  //           )}
  //         </div>
  //       );
  //     default:
  //       return <p>Select a tab to view content</p>;
  //   }
  // };

  return (
    <div>
      <Adminpanelheader/>
      <div>
        <nav>
          <Adminsidebar/>
        
        </nav>
      </div>

        <main className="content" style={{marginLeft:"15%",marginTop:"1%"}}>
     <div className="dashboard-container">
      <h1>📊 Admin Dashboard</h1>

      <div className="stats-cards">
        <div className="card blue">Total Lawyers: {lawyers.length}</div>
        <div className="card purple">Total Users: {users.length}</div>
        <div className="card green">Pending Lawyers: {pendingLawyers.length}</div>
        <div className="card orange">Activities: {activities.length}</div>
      </div>

      <div className="section">
        <h2>📈 Monthly Registrations</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#8884d8" name="Users" />
            <Bar dataKey="lawyers" fill="#82ca9d" name="Lawyers" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="section">
        <h2>📝 Pending Lawyer Approvals</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Reg. Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingLawyers.map(lawyer => (
              <tr key={lawyer._id}>
                <td>{lawyer.firstName} {lawyer.lastName}</td>
                <td>{lawyer.email}</td>
                <td>{lawyer.phone}</td>
                <td>{new Date(lawyer.createdAt).toLocaleString()}</td>
                <td>
                   <button className="icon-btn green" onClick={() => handleApprove(lawyer)}><FaCheck /></button>
                  <button className="icon-btn red" onClick={() => handleReject(lawyer.id)}><FaTimes /></button>
                  <button className="icon-btn black" onClick={() => handleview(lawyer._id)}><FaEye /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section grid-2">
             <div className="section">
        <h2>🕵️‍♂️ Recent Lawyer Registrations</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
            </tr>
          </thead>
         <tbody>
            {[...lawyers]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // sort by createdAt
              .slice(0, 2) // take only latest 2
              .map((lawyer, index) => (
                <tr key={index}>
                  <td>{lawyer.firstName}</td>
                  <td>
                    {new Date(lawyer.createdAt).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </td>
                </tr>
              ))}
          </tbody>

        </table>
      </div>


            <div className="section">
        <h2>🙋‍♀️ Recent User Registrations</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
            </tr>
          </thead>
        <tbody>
            {[...users]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // sort by createdAt
              .slice(0, 2) // take only latest 2
              .map((user, index) => (
                <tr key={index}>
                  <td>{user.fullName}</td>
                  <td>
                    {new Date(user.createdAt).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      </div>

      <div className="section">
        <h2>📢 Recent Activities</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Activity</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index}>
                <td>✅ {activity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        </main>

        {/* Offcanvas Panel */}
       <Offcanvas show={show} onHide={handleClose} placement="end" className="lawyer-offcanvas">
        <Offcanvas.Header closeButton>
          {/* <Offcanvas.Title className="text-primary">Lawyer Details</Offcanvas.Title> */}
        </Offcanvas.Header>
        <Offcanvas.Body>
       {selectedLawyer && <LawyerProfileTabs selectedLawyer={selectedLawyer} />}
        </Offcanvas.Body>
      </Offcanvas>


    
    </div>
  );
};

export default AdminPanel;

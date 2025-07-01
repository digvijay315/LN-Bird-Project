import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LawyerProfileModal from './LawyerProfileModel';
import api from '../api';
import { io } from 'socket.io-client';
import socket from './socket';
import Swal from 'sweetalert2';
import { LineChart, Line, Tooltip, ResponsiveContainer, BarChart, Bar,PieChart, Pie, Cell, Legend } from 'recharts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts'
import Lawyersidebar from './lawyersidebar';

const LawyerDashboard = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [lastLogin, setLastLogin] = useState(null);
  const [dailyTimeSpent, setDailyTimeSpent] = useState([]);
  const [sessionStartTime, setSessionStartTime] = useState(Date.now());
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Chat states
  const [chatClients, setChatClients] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const fetchedClientsRef = useRef(new Set());
  const [messageMap, setMessageMap] = useState({});
  const [showChat, setShowChat] = useState(false);

  const lawyerdetails = JSON.parse(localStorage.getItem('lawyerDetails'));

  const COLORS = ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe', '#f3f4f6', '#e5e7eb'];

  // Analytics data
  //  const weeklyData = [
  //   { day: 'Mon', hours: 0 },
  //   { day: 'Tue', hours: 0.1 },
  //   { day: 'Wed', hours: 0 },
  //   { day: 'Thu', hours: 0 },
  //   { day: 'Fri', hours: 0 },
  //   { day: 'Sat', hours: 0 },
  //   { day: 'Sun', hours: 0 },
  //  ];

   const getWeeklyData = () => {
    const today = new Date();
    const weeklyData = [];
    
    // Get last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dateString = date.toLocaleDateString();
      
      // Find tracked time for this day
      const dayData = dailyTimeSpent.find(d => d.date === dateString);
      const hours = dayData ? dayData.hours : 0;
      
      weeklyData.push({
        day: dayName,
        hours: parseFloat(hours.toFixed(1)),
        date: dateString
      });
    }
    
    return weeklyData;
  };

 
  // Get current week's data
  const weeklyData = getWeeklyData();

   console.log(weeklyData);

 useEffect(() => {
  const handleResize = () => setScreenWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  
  // Get login times from localStorage
  const currentLogin = localStorage.getItem('currentLoginTime');
  const previousLogin = localStorage.getItem('previousLogin');
  
  if (previousLogin) {
    setLastLogin(new Date(previousLogin));
  } else {
    setLastLogin(null); // First time login
  }
  
  // Get session start time from localStorage or use current time
  const storedSessionStart = localStorage.getItem('sessionStartTime');
  const actualSessionStart = storedSessionStart ? parseInt(storedSessionStart) : Date.now();
  setSessionStartTime(actualSessionStart);

  // Load existing daily time data
  const storedDailyTime = JSON.parse(localStorage.getItem('dailyTimeSpent') || '[]');
  setDailyTimeSpent(storedDailyTime);

  // Track session time
  const interval = setInterval(() => {
    const timeSpent = (Date.now() - actualSessionStart) / (1000 * 60 * 60); // hours
    const today = new Date().toLocaleDateString();
    
    setDailyTimeSpent(prev => {
      const updated = prev.map(d => 
        d.date === today 
          ? { ...d, hours: timeSpent }
          : d
      );
      
      // If today doesn't exist, add it
      const todayExists = updated.find(d => d.date === today);
      if (!todayExists) {
        updated.push({ 
          date: today, 
          hours: timeSpent, 
          loginTime: new Date().toISOString() 
        });
      }
      
      // Update localStorage
      localStorage.setItem('dailyTimeSpent', JSON.stringify(updated));
      return updated;
    });
  }, 60000); // Update every minute

  return () => {
    window.removeEventListener('resize', handleResize);
    clearInterval(interval);
  };
}, []); 


  // Chat functionality (keeping your existing chat code)
  useEffect(() => {
    if (!lawyerdetails?.lawyer?._id) return;

    if (!socket.connected) socket.connect();

    socket.on('connect', () => {
      const lawyerId = lawyerdetails.lawyer._id;
      socket.emit('lawyerOnline', lawyerId);
    });

    const handleReceiveMessage = async ({ from, message }) => {
      setHasNewMessages(true);
      setMessageMap((prev) => ({
        ...prev,
        [from]: [...(prev[from] || []), { text: message, isMe: false }],
      }));

      if (selectedClient?._id === from) {
        setMessages((prev) => [...prev, { text: message, isMe: false }]);
      }

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

  const handleOpenChat = async(client) => {
    setSelectedClient(client);
    const lawyerId = lawyerdetails.lawyer._id;
    const clientId = client._id;
    await fetchChatHistory(lawyerId, clientId); 
  };

  const handleSend = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const msg = e.target.value.trim();
      e.target.value = '';

      if (containsSensitiveInfo(msg)) {
        Swal.fire({
          icon: 'warning',
          title: 'Not Allowed 🚫',
          text: 'Sharing mobile numbers or emails is not permitted!',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        return;
      }
      
      socket.emit('privateMessage', {
        toUserId: selectedClient._id,
        message: msg,
        fromUserType: 'lawyer'
      });

      setMessages(prev => [...prev, { text: msg, isMe: true }]);
    }
  };

  const fetchChatHistory = async (user1Id, user2Id) => {
    try {
      const res = await api.get(`api/admin/chathistory/${user1Id}/${user2Id}`);
      const data = await res.data;

      if (res.status === 200) {
        const formatted = data.map(msg => ({
          text: msg.message,
          isMe: msg.from === user1Id,
        }));
        setMessages(formatted);
      } else {
        console.error('❌ Failed to fetch history:', data.error);
      }
    } catch (err) {
      console.error('❌ Network error:', err);
    }
  };

  function containsSensitiveInfo(text) {
    const phoneRegex = /(?:\+91[\s-]?)?[6-9]\d{9}/g;
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}\b/i;
    return phoneRegex.test(text) || emailRegex.test(text);
  }

  const handleLogout = () => {
    socket.disconnect();
    localStorage.removeItem('userDetails');
    navigate('/login');
  };

  const menuItems = [
    { label: 'Dashboard', icon: '🏠', path: '/Lawyerdashboard' },
    { label: 'Profile', icon: '👤', path: './completelawyerprofile' },
    { label: 'Clients', icon: '👥', path: '/clients' },
    { label: 'Messages', icon: '💬' },
    { label: 'My Cases', icon: '📂', path: '/cases' },
    { label: 'Schedule', icon: '📅', path: '/schedule' },
    { label: 'Billing', icon: '💳', path: '/billing' },
    { label: 'Documents', icon: '📁', path: '/documents' },
    { label: 'Settings', icon: '⚙️', path: '/settings' },
    { label: 'Support', icon: '🆘', path: '/support' },
  ];

  const headerMenu = [
    { label: 'Notifications', path: '/notifications' },
  ];

  const cases = [
    { id: 1, title: 'Contract Dispute Resolution', client: 'TechCorp Ltd.', status: 'Active', priority: 'High', dueDate: '2025-07-15' },
    { id: 2, title: 'Intellectual Property Defense', client: 'Innovation Inc.', status: 'Pending', priority: 'Medium', dueDate: '2025-07-20' },
    { id: 3, title: 'Personal Injury Settlement', client: 'John Smith', status: 'Closed', priority: 'Low', dueDate: '2025-06-30' },
    { id: 4, title: 'Real Estate Transaction', client: 'Property Ventures', status: 'Active', priority: 'High', dueDate: '2025-07-10' },
  ];

  const clients = [
    { id: 1, name: 'Ram Kumar', email: 'ram.kumar@example.com', phone: '+91 98765 43210', status: 'Active' },
    { id: 2, name: 'Anita Singh', email: 'anita.singh@example.com', phone: '+91 87654 32109', status: 'Active' },
    { id: 3, name: 'John Doe', email: 'john.doe@example.com', phone: '+91 76543 21098', status: 'Inactive' },
  ];

  const statusColor = (status) => {
    switch (status) {
      case 'Active': return '#10b981';
      case 'Pending': return '#f59e0b';
      case 'Closed': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const formatLastLogin = (date) => {
    if (!date) return 'First time login';
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  };

  return (
    <>
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
          margin: 0; /* Remove default body margin */
          padding: 0; /* Remove default body padding */
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
          margin: 0; /* Remove any margin */
          padding: 0; /* Remove any padding */
        }

       

        /* Main Content Styles */
        .main-content {
          grid-area: main;
          padding: 2rem;
          overflow-y: auto;
          background: #f8fafc;
        }

        .welcome-section {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }

        .welcome-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .welcome-subtitle {
          color: #6b7280;
          font-size: 1rem;
          margin-bottom: 1rem;
        }

        .login-info {
          display: flex;
          gap: 2rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }

        .login-info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6b7280;
          font-size: 0.875rem;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stats-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .stats-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #1e40af, #10b981);
        }

        .stats-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .stats-value {
          font-size: 2rem;
          font-weight: 800;
          color: #1e40af;
          margin-bottom: 0.5rem;
        }

        .stats-label {
          color: #6b7280;
          font-size: 0.875rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .stats-change {
          font-size: 0.75rem;
          font-weight: 600;
          margin-top: 0.5rem;
        }

        .stats-change.positive {
          color: #10b981;
        }

        .stats-change.negative {
          color: #ef4444;
        }

        /* Content Grid */
        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .content-section {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1f2937;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .view-all-btn {
          color: #1e40af;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .view-all-btn:hover {
          background: #eff6ff;
          transform: translateX(2px);
        }

        /* Case Cards */
        .case-card {
          background: #f9fafb;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .case-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border-color: #3b82f6;
        }

        .case-header {
          display: flex;
          justify-content: between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }

        .case-title {
          font-weight: 600;
          font-size: 1rem;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }

        .case-client {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .case-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.75rem;
        }

        .case-status, .case-priority {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .case-due {
          font-size: 0.75rem;
          color: #6b7280;
        }

        /* Client Table */
        .client-table {
          width: 100%;
          border-collapse: collapse;
        }

        .client-table th,
        .client-table td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }

        .client-table th {
          background: #f9fafb;
          font-weight: 600;
          color: #374151;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .client-table tr:hover {
          background: #f9fafb;
        }

        .client-status {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .client-status.active {
          background: #d1fae5;
          color: #065f46;
        }

        .client-status.inactive {
          background: #fee2e2;
          color: #991b1b;
        }

        /* Analytics Section */
        .analytics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .chart-container {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }

        .chart-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Chat Popup */
        .chat-popup {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 380px;
          height: 500px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          overflow: hidden;
          z-index: 1000;
          display: flex;
          flex-direction: column;
        }

        .chat-header {
          background: linear-gradient(135deg, #1e40af, #3b82f6);
          color: white;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .chat-tabs {
          display: flex;
          overflow-x: auto;
          border-bottom: 1px solid #e5e7eb;
          padding: 0.5rem;
          gap: 0.5rem;
          background: #f9fafb;
        }

        .chat-tab {
          padding: 0.5rem 1rem;
          border-radius: 20px;
          cursor: pointer;
          white-space: nowrap;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .chat-tab.active {
          background: #1e40af;
          color: white;
        }

        .chat-tab:not(.active) {
          background: #e5e7eb;
          color: #374151;
        }

        .chat-tab:not(.active):hover {
          background: #d1d5db;
        }

        .chat-messages {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          background: #f9fafb;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .message {
          max-width: 80%;
          padding: 0.75rem 1rem;
          border-radius: 18px;
          font-size: 0.875rem;
          line-height: 1.4;
          word-wrap: break-word;
        }

        .message.sent {
          align-self: flex-end;
          background: #1e40af;
          color: white;
        }

        .message.received {
          align-self: flex-start;
          background: white;
          color: #1f2937;
          border: 1px solid #e5e7eb;
        }

        .chat-input {
          padding: 1rem;
          border-top: 1px solid #e5e7eb;
          background: white;
        }

        .chat-input input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 20px;
          border: 1px solid #e5e7eb;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .chat-input input:focus {
          border-color: #3b82f6;
        }

        .chat-input input:disabled {
          background: #f9fafb;
          color: #9ca3af;
        }

        /* Quick Actions */
        .quick-actions {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .quick-action-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid #e5e7eb;
          position: relative;
          overflow: hidden;
        }

        .quick-action-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #1e40af, #10b981);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .quick-action-card:hover::before {
          transform: scaleX(1);
        }

        .quick-action-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px -8px rgba(0, 0, 0, 0.2);
        }

        .quick-action-icon {
          font-size: 2rem;
          margin-bottom: 0.75rem;
        }

        .quick-action-label {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }

        .quick-action-desc {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .new-message-indicator {
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
          display: inline-block;
          margin-left: 0.5rem;
          animation: pulse 2s infinite;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
          
          .analytics-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .dashboard-container {
            grid-template-areas: 
              "header"
              "main";
            grid-template-columns: 1fr;
            grid-template-rows: 70px 1fr;
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
            background: white;
            box-shadow: 4px 0 6px -1px rgba(0, 0, 0, 0.1);
          }

          .hamburger {
            display: block;
          }

          .header-menu {
            display: ${headerMenuOpen ? 'flex' : 'none'};
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 1rem;
            gap: 0.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }

          .header-menu-item {
            color: #374151 !important;
            padding: 0.75rem;
            border-radius: 6px;
          }

          .header-menu-item:hover {
            background: #f3f4f6;
            color: #1e40af !important;
          }

          .main-content {
            padding: 1rem;
          }

          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
          }

          .quick-actions {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }

          .chat-popup {
            width: calc(100vw - 20px);
            height: calc(100vh - 100px);
            bottom: 10px;
            right: 10px;
            left: 10px;
          }

          .welcome-title {
            font-size: 1.5rem;
          }

          .login-info {
            flex-direction: column;
            gap: 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .quick-actions {
            grid-template-columns: 1fr;
          }

          .case-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .case-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>

      <div className="dashboard-container">
       <Lawyersidebar/>

        {/* MAIN CONTENT */}
        <main className="main-content">
          {/* Welcome Section */}
          <div className="welcome-section">
            <h1 className="welcome-title">
              Welcome back, {lawyerdetails?.lawyer?.firstName || 'Lawyer'}! 👋
            </h1>
            <p className="welcome-subtitle">
              Here's what's happening with your practice today.
            </p>
            <div className="login-info">
              <div className="login-info-item">
                <span>🕒</span>
                <span>Last login: {formatLastLogin(lastLogin)}</span>
              </div>
              <div className="login-info-item">
                <span>⏱️</span>
                <span>Today's session: {((Date.now() - sessionStartTime) / (1000 * 60 * 60)).toFixed(1)} hours</span>
              </div>
              <div className="login-info-item">
                <span>📊</span>
                <span>Status: Online</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stats-card">
              <div className="stats-value">{clients.length}</div>
              <div className="stats-label">Total Clients</div>
              <div className="stats-change positive">↗ +12% from last month</div>
            </div>
            <div className="stats-card">
              <div className="stats-value">{cases.filter(c => c.status === 'Active').length}</div>
              <div className="stats-label">Active Cases</div>
              <div className="stats-change positive">↗ +8% from last week</div>
            </div>
            <div className="stats-card">
              <div className="stats-value">{cases.filter(c => c.status === 'Pending').length}</div>
              <div className="stats-label">Pending Cases</div>
              <div className="stats-change negative">↘ -3% from last week</div>
            </div>
            <div className="stats-card">
              <div className="stats-value">{cases.filter(c => c.status === 'Closed').length}</div>
              <div className="stats-label">Closed Cases</div>
              <div className="stats-change positive">↗ +15% this month</div>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="analytics-grid">
         <div className="chart-container">
  <h3 className="chart-title">📊 Weekly Time Distribution</h3>
  <ResponsiveContainer width="100%" height={250}>
  <PieChart>
    {/* Check if there's any data with hours > 0 */}
    {weeklyData.some(day => day.hours > 0) ? (
      <>
        <Pie
          data={weeklyData.filter(day => day.hours > 0)} // Only show days with time > 0
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ day, hours, percent }) => `${day}: ${hours}h (${(percent * 100).toFixed(0)}%)`}
          outerRadius={80}
          innerRadius={20} // Add inner radius to create donut chart (better spacing)
          fill="#8884d8"
          dataKey="hours"
        >
          {weeklyData.filter(day => day.hours > 0).map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          formatter={(value) => [`${value.toFixed(1)} hours`, 'Time Spent']}
        />
        <Legend />
      </>
    ) : (
      // Show placeholder when no data
      <g>
        <circle cx="50%" cy="50%" r="80" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="2" />
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#6b7280" fontSize="14">
          No time data available
        </text>
      </g>
    )}
  </PieChart>
</ResponsiveContainer>

</div>


         <div className="chart-container">
  <h3 className="chart-title">📊 Case Status Trend</h3>
  <ResponsiveContainer width="100%" height={250}>
    <AreaChart
      data={[
        { month: 'Jan', Active: 12, Pending: 8, Closed: 15 },
        { month: 'Feb', Active: 15, Pending: 6, Closed: 18 },
        { month: 'Mar', Active: 18, Pending: 4, Closed: 22 },
        { month: 'Apr', Active: cases.filter(c => c.status === 'Active').length, 
          Pending: cases.filter(c => c.status === 'Pending').length, 
          Closed: cases.filter(c => c.status === 'Closed').length }
      ]}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
        </linearGradient>
        <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
        </linearGradient>
        <linearGradient id="colorClosed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
        </linearGradient>
      </defs>
      <XAxis dataKey="month" stroke="#6b7280" />
      <YAxis stroke="#6b7280" />
      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
      <Tooltip 
        contentStyle={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}
      />
      <Area type="monotone" dataKey="Active" stackId="1" stroke="#10b981" fill="url(#colorActive)" />
      <Area type="monotone" dataKey="Pending" stackId="1" stroke="#f59e0b" fill="url(#colorPending)" />
      <Area type="monotone" dataKey="Closed" stackId="1" stroke="#ef4444" fill="url(#colorClosed)" />
    </AreaChart>
  </ResponsiveContainer>
</div>

          </div>

          {/* Content Grid */}
          <div className="content-grid">
            {/* Cases Section */}
            <div className="content-section">
              <div className="section-header">
                <h2 className="section-title">
                  📂 Recent Cases
                </h2>
                <a href="/cases" className="view-all-btn">View All →</a>
              </div>
              {cases.slice(0, 3).map((case_) => (
                <div className="case-card" key={case_.id}>
                  <div className="case-header">
                    <div>
                      <div className="case-title">{case_.title}</div>
                      <div className="case-client">{case_.client}</div>
                    </div>
                  </div>
                  <div className="case-meta">
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <span 
                        className="case-status" 
                        style={{ 
                          backgroundColor: statusColor(case_.status),
                          color: 'white'
                        }}
                      >
                        {case_.status}
                      </span>
                      <span 
                        className="case-priority" 
                        style={{ 
                          backgroundColor: priorityColor(case_.priority),
                          color: 'white'
                        }}
                      >
                        {case_.priority}
                      </span>
                    </div>
                    <div className="case-due">Due: {case_.dueDate}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Clients Section */}
            <div className="content-section">
              <div className="section-header">
                <h2 className="section-title">
                  👥 Recent Clients
                </h2>
                <a href="/clients" className="view-all-btn">View All →</a>
              </div>
              <table className="client-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.slice(0, 3).map((client) => (
                    <tr key={client.id}>
                      <td>
                        <div>
                          <div style={{ fontWeight: '600' }}>{client.name}</div>
                          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{client.email}</div>
                        </div>
                      </td>
                      <td>
                        <span className={`client-status ${client.status.toLowerCase()}`}>
                          {client.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="content-section">
            <div className="section-header">
              <h2 className="section-title">⚡ Quick Actions</h2>
            </div>
            <div className="quick-actions">
              {menuItems.slice(1, 7).map((item) => (
                <div
                  key={item.label}
                  className="quick-action-card"
                  onClick={() => {
                    if (item.label === 'Messages') {
                      setHasNewMessages(false);
                      setShowChat(true);
                    } else {
                      navigate(item.path);
                    }
                  }}
                >
                  <div className="quick-action-icon">{item.icon}</div>
                  <div className="quick-action-label">
                    {item.label}
                    {item.label === 'Messages' && hasNewMessages && (
                      <span className="new-message-indicator"></span>
                    )}
                  </div>
                  <div className="quick-action-desc">
                    {item.label === 'Profile' && 'Manage your profile'}
                    {item.label === 'Clients' && 'View all clients'}
                    {item.label === 'Messages' && 'Chat with clients'}
                    {item.label === 'My Cases' && 'Manage your cases'}
                    {item.label === 'Schedule' && 'View appointments'}
                    {item.label === 'Billing' && 'Manage invoices'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Chat Popup */}
      {showChat && (
        <div className="chat-popup">
          <div className="chat-header">
            <span>💬 Messages</span>
            <button 
              onClick={() => setShowChat(false)} 
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'white', 
                fontSize: '18px',
                cursor: 'pointer'
              }}
            >
              ✖
            </button>
          </div>

          <div className="chat-tabs">
            {chatClients?.map((client) => (
              <div
                key={client._id}
                onClick={() => {
                  handleOpenChat(client);
                  setHasNewMessages(false);
                }}
                className={`chat-tab ${selectedClient?._id === client._id ? 'active' : ''}`}
              >
                {client.firstName}
              </div>
            ))}
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.isMe ? 'sent' : 'received'}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder={selectedClient ? "Type a message..." : "Select a client to start chatting"}
              onKeyDown={handleSend}
              disabled={!selectedClient}
            />
          </div>
        </div>
      )}

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

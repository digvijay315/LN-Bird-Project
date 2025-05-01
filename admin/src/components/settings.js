import {React,useState} from 'react';
import '../css/crmsettings.css';
import { FiUser, FiShield, FiSettings, FiDatabase, FiBell, FiMail, FiMap } from 'react-icons/fi';
import Header1 from './header1';
import Sidebar1 from './sidebar1';
import { useNavigate } from 'react-router-dom';


function Crmsettings() {

    const navigate=useNavigate()

    const settingsOptions = [
    {
      title: 'User Management',
      icon: <FiUser />,
      description: 'Manage users, roles, and access.',
      onClick: () => alert('/settings/permissions'),
    },
    {
      title: 'Permissions',
      icon: <FiShield />,
      description: 'Control what users can see and do.',
      onClick: () => alert('/settings/permissions'),
    },
    {
      title: 'System Settings',
      icon: <FiSettings />,
      description: 'Configure system-wide options.',
      onClick: () => alert('Open system settings modal'),
    },
    {
      title: 'Database Backup',
      icon: <FiDatabase />,
      description: 'Manage and schedule backups.',
      onClick: () => alert('Backup clicked'),
    },
    {
      title: 'Notifications',
      icon: <FiBell />,
      description: 'Setup alerts and notifications.',
      onClick: () => alert('/settings/notifications'),
    },
    {
      title: 'Email Templates',
      icon: <FiMail />,
      description: 'Customize automated emails.',
      onClick: () => alert('Open email template editor'),
    },
    {
        title: 'Lead Score',
        icon: <FiMap />,
        description: 'Create Lead Score Criteria...',
        onClick: () => navigate('/leadscoreseetings'),
      },
  ];


 



  return (
  <div>
    <Header1/>
    <Sidebar1/>
    {/* <h4 style={{marginLeft:"70px",marginTop:"60px"}}>Settings</h4> */}
    <div className="dashboard-container" style={{margin:"50px"}}>
      <div className="card-grid">
        {settingsOptions.map((option, index) => (
          <div className="setting-card" key={index} onClick={option.onClick}>
            <div className="card-icon">{option.icon}</div>
            <h3 className="card-title">{option.title}</h3>
            <p className="card-description">{option.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Crmsettings;

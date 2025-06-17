import React, { useState } from 'react';
import Header from './header';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [role, setRole] = useState('user'); // For registration
  const [loginRole, setLoginRole] = useState('user'); // For login
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    barRegistrationNumber: '',
    practiceAreas: '',
    yearsOfExperience: '',
    documents: [],
  });

  const [loginData, setLoginData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'documents') {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, documents: files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      if (role === 'user') {
        const response = await fetch('http://localhost:5000/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            username: formData.username,
            password: formData.password,
            role: 'user',
          }),
        });

        const data = await response.json();
        alert(data.message);
        if (response.ok) setActiveTab('login');
      } else {
        const fd = new FormData();
        fd.append('firstName', formData.firstName);
        fd.append('lastName', formData.lastName);
        fd.append('email', formData.email);
        fd.append('username', formData.username);
        fd.append('password', formData.password);
        fd.append('phone', formData.phone);
        fd.append('barRegistrationNumber', formData.barRegistrationNumber);
        fd.append('practiceAreas', JSON.stringify(formData.practiceAreas.split(',').map(p => p.trim())));
        fd.append('yearsOfExperience', formData.yearsOfExperience);
        for (let i = 0; i < formData.documents.length; i++) {
          fd.append('documents', formData.documents[i]);
        }

        const response = await fetch('http://localhost:5000/api/lawyer/register/lawyer', {
          method: 'POST',
          body: fd,
        });

        const data = await response.json();
        alert(data.message);
        if (response.ok) setActiveTab('login');
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert(err.message || 'Something went wrong');
    }
  };

  const containerStyle = {
    width: '100%',
    maxWidth: '500px',
    margin: '50px auto',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    overflow: 'hidden',
  };

  const tabsStyle = {
    display: 'flex',
    justifyContent: 'center',
    background: '#f0f0f0',
  };

  const tabButtonStyle = (isActive) => ({
    flex: 1,
    padding: '15px 20px',
    fontSize: '16px',
    fontWeight: '600',
    background: isActive ? '#007bff' : 'none',
    color: isActive ? '#fff' : '#000',
    border: 'none',
    borderBottom: isActive ? '3px solid #0056b3' : 'none',
    cursor: 'pointer',
    transition: '0.3s ease',
  });

  const formContainerStyle = {
    padding: '55px 60px',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  const inputStyle = {
    padding: '10px 14px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '15px',
  };

  const selectStyle = {
    ...inputStyle,
    backgroundColor: '#fff',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const endpoint = loginRole === 'user' 
        ? 'http://localhost:5000/api/user/login' 
        : 'http://localhost:5000/api/lawyer/login';

      const credentials = loginRole === 'user'
        ? { username: loginData.username, password: loginData.password }
        : { email: loginData.email, password: loginData.password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
  alert(data.message || 'Login failed');
} else {
  alert(data.message);
  localStorage.setItem('userRole', loginRole);
  localStorage.setItem('token', data.token);

  // Save user details locally
  if (loginRole === 'user') {
    localStorage.setItem('userDetails', JSON.stringify({
      fullName: data.user.fullName,
      username: data.user.username,
      email: data.user.email,
    }));
    localStorage.setItem('clientName', data.user.fullName); // For client avatar initials
    navigate('/ClientDashboard');
  } else {
    localStorage.setItem('userDetails', JSON.stringify({
      fullName: data.lawyer.name,
      username: data.lawyer.username,
      email: data.lawyer.email,
    }));
    localStorage.setItem('clientName', `${data.lawyer.firstName} ${data.lawyer.lastName}`);
    navigate('/LawyerDashboard');
  }
}

    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong during login');
    }
  };

  return (
    <div>
      <Header />
      <div style={containerStyle}>
        <div style={tabsStyle}>
          <button onClick={() => setActiveTab('login')} style={tabButtonStyle(activeTab === 'login')}>
            Login
          </button>
          <button onClick={() => setActiveTab('registration')} style={tabButtonStyle(activeTab === 'registration')}>
            Registration
          </button>
        </div>

        <div style={formContainerStyle}>
          {activeTab === 'login' ? (
            <form style={formStyle} onSubmit={handleLogin}>
              <h3>Welcome Back!</h3>
              <select 
                value={loginRole} 
                onChange={(e) => setLoginRole(e.target.value)} 
                style={selectStyle}
              >
                <option value="user">Login as User</option>
                <option value="lawyer">Login as Lawyer</option>
              </select>

              {loginRole === 'user' ? (
                <input 
                  type="text" 
                  name="username" 
                  placeholder="Username" 
                  value={loginData.username} 
                  onChange={handleLoginInputChange} 
                  required 
                  style={inputStyle} 
                />
              ) : (
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  value={loginData.email} 
                  onChange={handleLoginInputChange} 
                  required 
                  style={inputStyle} 
                />
              )}

              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                value={loginData.password} 
                onChange={handleLoginInputChange} 
                required 
                style={inputStyle} 
              />
              <button type="submit" style={buttonStyle}>
                {loginRole === 'user' ? 'Login as User' : 'Login as Lawyer'}
              </button>
            </form>
          ) : (
            <form style={formStyle} onSubmit={handleRegister} encType="multipart/form-data">
              <h2>Create Account</h2>
              <select value={role} onChange={(e) => setRole(e.target.value)} style={selectStyle}>
                <option value="user">Register as User</option>
                <option value="lawyer">Register as Lawyer</option>
              </select>

              {role === 'user' ? (
                <>
                  <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} style={inputStyle} required />
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} style={inputStyle} required />
                  <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} style={inputStyle} required />
                  <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} style={inputStyle} required />
                  <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} style={inputStyle} required />
                </>
              ) : (
                <>
                  <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} style={inputStyle} required />
                  <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} style={inputStyle} required />
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} style={inputStyle} required />
                  <input type="username" name="username" placeholder="username" value={formData.username} onChange={handleInputChange} style={inputStyle} required />
                  <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} style={inputStyle} required />
                  <input type="text" name="barRegistrationNumber" placeholder="Bar Registration Number" value={formData.barRegistrationNumber} onChange={handleInputChange} style={inputStyle} required />
                  <input type="text" name="practiceAreas" placeholder="Practice Areas (comma-separated)" value={formData.practiceAreas} onChange={handleInputChange} style={inputStyle} required />
                  <input type="number" name="yearsOfExperience" placeholder="Years of Experience" value={formData.yearsOfExperience} onChange={handleInputChange} style={inputStyle} required />
                  <input type="file" name="documents" multiple onChange={handleInputChange} style={inputStyle} />
                  <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} style={inputStyle} required />
                  <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} style={inputStyle} required />
                </>
              )}
              <button type="submit" style={buttonStyle}>Register</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

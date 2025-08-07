
import React, { useState } from "react";
import "../styles/signin.css";
import image from "../assets/img 1.png";
import { useNavigate } from "react-router-dom";
import api from '../api'
import Swal from 'sweetalert2';
import ChangePasswordModal from "./changepassworddoctor";

function SignIn() {

   const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const navigate=useNavigate()
  // Step 1: Track selected role in state
  const [role, setRole] = useState("admin"); // default is 'admin'

  const [email,setemail]=useState("")
  const[password,setpassword]=useState("")
  // Optionally, you can show different forms or adapt text for each role
  const getFormTitle = () => {
    if (role === "admin")  return "Admin Sign in";
    if (role === "doctor") return "Doctor Sign in";
    if (role === "patient") return "Patient Sign in";
    return "Sign in";
  };

const login = async (e) => {
  e.preventDefault();

  if (role === 'admin' && email === 'admin' && password === '123') {
    navigate('/admindashboard');
    return;
  }

  if (role === 'doctor') {
    try {
      const resp = await api.post('doctor/login', { email, password });

      // Success
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: resp.data.message || 'Welcome!',
        showConfirmButton: true,
      });

      localStorage.setItem('token', resp.data.token);
      localStorage.setItem('user', JSON.stringify(resp.data.user));

      navigate('/doctordashboard');

    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message || 'Something went wrong!';

      if (status === 403) {
        Swal.fire({
          icon: 'warning',
          title: 'Change Password Required',
          text: message,
          showConfirmButton: true
        }).then(()=>
        {
         setShowChangePasswordModal(true);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: message,
          showConfirmButton: true
        });
      }
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Role',
      text: 'Please select a valid role',
      showConfirmButton: true
    });
  }
};



  return (
    <div className="signin-container">
      <div className="visual-side">
        <img
          src={image}
          style={{ width: "100%" }}
          alt=""
        />
      </div>

      <div className="form-side">
        <form className="signin-form">
          <h2>Welcome to Company</h2>
          <div className="nav-links">
            <span>Need an account?</span>
            <a href="/signup">Sign Up</a>
          </div>
          
          {/* Step 2: Add active class based on selected role */}
          <div className="role-tabs">
            <button
              type="button"
              className={role === "admin" ? "active" : ""}
              onClick={() => setRole("admin")}
            >
              Admin
            </button>
            <button
              type="button"
              className={role === "doctor" ? "active" : ""}
              onClick={() => setRole("doctor")}
            >
              Doctor
            </button>
            <button
              type="button"
              className={role === "patient" ? "active" : ""}
              onClick={() => setRole("patient")}
            >
              Patient
            </button>
          </div>

          {/* Step 3: The form updates (even just the heading here) */}
          <div className="input-group">
            <h2>{getFormTitle()}</h2>
            <input type="text" placeholder="Username" required  onChange={(e)=>setemail(e.target.value)}/>
            <input type="password" placeholder="Password" required onChange={(e)=>setpassword(e.target.value)}/>
          </div>
          <div className="options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="/forgot">Forgot Password?</a>
          </div>
          <button className="login-btn" onClick={login}>
            Login
          </button>
{
  showChangePasswordModal ? <ChangePasswordModal/> :""
}
        

          <div className="or-divider">OR</div>
          <div className="social-row">
            <button type="button" className="g">
              G
            </button>
            <button type="button" className="f">
              F
            </button>
            <button type="button" className="x">
              X
            </button>
            <button type="button" className="in">
              in
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default SignIn;

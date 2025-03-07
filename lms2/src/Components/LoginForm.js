import React from 'react'
import '../StyleCode/StudentRegister.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useState ,useEffect} from 'react';
import { base_url } from "./Utils/base_url";

function LoginForm() {
    const navigate=useNavigate()
    const[login,setlogin]=useState({email_id:"",password:""})   

    // const student_login = async () => {
    //   try {
    //     if (!login.email_id || !login.password) {
    //       toast.error("Please enter email and password");
    //       return;
    //     }

    //     const resp = await axios.post(`${base_url}/employee_login`, login);
    //     const { token } = resp.data;

    //     console.log("Token received:", token); // Check if token exists

    //      // Store in localStorage for persistent login
    //     localStorage.setItem('token', token);
    //     // OR in sessionStorage for session-only login
    //     sessionStorage.setItem('token', token);

    //     console.log("Token in localStorage:", localStorage.getItem('token')); // Verify storage
        
    //     if (resp.status === 200) {
    //       localStorage.setItem('employeeData', JSON.stringify(resp.data.employee));
    //       toast.success(`Welcome ${resp.data.employee.employee_name}`, {autoClose: 2000});
    //       setTimeout(() => {
    //         navigate(`/employeeDashboard/${resp.data.employee._id}`);
    //       }, 2000);
    //     }
    //   } catch (error) {
    //     if (error.response && error.response.status === 403) {
    //       toast.error(error.response.data.message);
    //       const { status } = error.response;
              
    //         // Handle different status codes
    //         if (status === 404) {
    //           toast.error("Email ID not registered", {autoClose: 2000});
    //         } else if (status === 400) {
    //           toast.error("Password does not match", {autoClose: 2000});
    //         } else if (status === 500) {
    //           toast.error("Server error. Please try again later.", {autoClose: 2000});
    //         } else {
    //           toast.error("An unexpected error occurred.", {autoClose: 2000});
    //         }
            
    //       } else {
    //         console.log(error);
    //         toast.error("An error occurred. Please try again later.", {autoClose: 2000});
    //       }
    //   }
    // };


    const student_login = async () => {
      try {
        if (!login.email_id || !login.password) {
          toast.error("Please enter email and password");
          return;
        }

        const resp = await axios.post(`${base_url}/employee_login`, login);
        
        // Log the entire response to see its structure
        console.log("Full response:", resp.data);

        // Get token from the correct path in response
        // Assuming your backend sends token directly in the response
        const token = resp.data.token || resp.data.accessToken; // try both common token names

        console.log("Token received:", token);

        if (!token) {
          console.error("No token received from server");
          toast.error("Login failed - no token received");
          return;
        }

        // Store token in localStorage
        localStorage.setItem('token', token);
        console.log("Token in localStorage:", localStorage.getItem('token'));
        
        if (resp.status === 200) {
          localStorage.setItem('employeeData', JSON.stringify(resp.data.employee));
          toast.success(`Welcome ${resp.data.employee.employee_name}`, {autoClose: 2000});
          setTimeout(() => {
            navigate(`/employeeDashboard/${resp.data.employee._id}`);
          }, 2000);
        }
      } catch (error) {
        console.error("Login error:", error.response?.data);
        
        if (error.response) {
          if (error.response.status === 403) {
            toast.error(error.response.data.message);
          } else if (error.response.status === 404) {
            toast.error("Email ID not registered", {autoClose: 2000});
          } else if (error.response.status === 400) {
            toast.error("Password does not match", {autoClose: 2000});
          } else if (error.response.status === 500) {
            toast.error("Server error. Please try again later.", {autoClose: 2000});
          } else {
            toast.error("An unexpected error occurred.", {autoClose: 2000});
          }
        } else {
          console.log(error);
          toast.error("An error occurred. Please try again later.", {autoClose: 2000});
        }
      }
    };


  return (
    <div>

        <section className="login-section">
            <div className="main-container main-container-second" id="main-container-div">
                <div className="image-div image-div-second" id="main-img-div">
                    <div className="text-div">
                        <h2>Welcome to Edutech</h2>
                        <p>Kickstart your tech learning journey</p>
                    </div>   
                </div>

                <div className="main-login-form">
                    <div className="login-form" >
                        <h2>Login to your account</h2>
                       
                            <div className="input-group">
                                <label for="username">Username</label>
                                <input type="text" id="username" name="username" placeholder="Enter your username"  onChange={(e)=>setlogin({...login,email_id:e.target.value})} />
                            </div>
                            <div className="input-group">
                                <label for="password">Password</label>
                                <input type="password" id="password" name="password" placeholder="Enter your password"  onChange={(e)=>setlogin({...login,password:e.target.value})} />
                            </div>
                            <div className="forget-btn">
                                <a href="#">Forget?</a>
                            </div>
                            <div className="btn">
                                <button id="submit-btn" onClick={student_login}>Login</button>
                                <p id="errorMessage" class="error-message">Don't have any account?  <NavLink to={'/register'}>Register</NavLink></p>
                                <button id="google-btn">Continue with google</button>
                            </div>
                                      
                    </div>
                </div>
                
            </div>
        </section>
      <ToastContainer/>
    </div>
  )
}

export default LoginForm;

import React from "react";
import "../styles/register.css";
// import Illustration from "./Illustration";

function RegisterPage() {
  return (
    <div className="signup-container">
      <div className="design-left">
        {/* <Illustration /> */}/
        <img src="https://img.freepik.com/premium-vector/vector-form-login-landing-page-medical-hospital-template-design_272430-248.jpg" style={{width:'100'}}></img>
      </div>
      <div className="design-right">
        <form className="signup-form">
          <h2>Sign Up</h2>
          <p>Enter details to create your account</p>
          <input type="text" placeholder="Username*" required />
          <input type="email" placeholder="Email ID*" required />
          <input type="password" placeholder="Password*" required />
          <input type="password" placeholder="Confirm Password*" required />
          <button type="submit">Register</button>
          <div className="login-link">
            <span>Already Registered?</span>
            <a href="./signin.js">Login in</a>
          </div>
          <div className="or">OR</div>
          <div className="social-buttons">
            <button type="button" className="g-btn">G</button>
            <button type="button" className="f-btn">F</button>
            <button type="button" className="x-btn">X</button>
            <button type="button" className="in-btn">in</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;

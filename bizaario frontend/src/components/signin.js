
import React, { useState } from "react";
import "../styles/signin.css";
import image from "../assets/img 1.png";

function SignIn() {
  // Step 1: Track selected role in state
  const [role, setRole] = useState("admin"); // default is 'admin'

  // Optionally, you can show different forms or adapt text for each role
  const getFormTitle = () => {
    if (role === "admin") return "Admin Sign in";
    if (role === "user") return "User Sign in";
    if (role === "patient") return "Patient Sign in";
    return "Sign in";
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
              className={role === "user" ? "active" : ""}
              onClick={() => setRole("user")}
            >
              User
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
            <input type="text" placeholder="Username" required />
            <input type="password" placeholder="Password" required />
          </div>
          <div className="options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="/forgot">Forgot Password?</a>
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
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

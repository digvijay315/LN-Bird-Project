import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "ranvijay6.indiamart@gmail.com",
    password: "",
    rememberMe: false,
  });

  const [successMessage, setSuccessMessage] = useState(""); // ✅ Success message state

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/user/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", formData.email);

        setSuccessMessage("✅ Login successful! ");

        setTimeout(() => {
          setSuccessMessage("");
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please try again."
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        fontFamily: "Poppins, sans-serif",
        padding: "40px",
      }}
    >
      {successMessage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              padding: "20px 40px",
              backgroundColor: "#e6ffe6",
              color: "green",
              border: "2px solid green",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "bold",
              boxShadow: "0 0 15px rgba(0,0,0,0.3)",
              textAlign: "center",
            }}
          >
            {successMessage}
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          backgroundColor: "#fff",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          overflow: "hidden",
          width: "800px",
        }}
      >
        <div
          style={{
            width: "400px",
            backgroundColor: "#d3d3d3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2 style={{ color: "#555" }}>Welcome Back</h2>
        </div>

        <div
          style={{
            padding: "40px",
            width: "400px",
            boxSizing: "border-box",
          }}
        >
          <h2 style={{ marginBottom: "10px", textAlign: "center" }}>Login Now.</h2>
          <p style={{ textAlign: "center", marginBottom: "30px", fontSize: "14px" }}>
            Don't have an account?{" "}
            <a
              onClick={() => navigate("/RegisterForm")}
              style={{
                color: "#0d6efd",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Sign Up
            </a>
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <label style={{ fontWeight: "600" }}>
              Email<span style={{ color: "red" }}>*</span>
              <>
                <style>
                  {`
                    .input-highlight:focus {
                      border: 1px solid blue !important;
                      outline: none;
                    }
                  `}
                </style>
                <input
                  className="input-highlight"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "16px",
                  }}
                />
              </>
            </label>

            <label style={{ fontWeight: "600" }}>
              Password<span style={{ color: "red" }}>*</span>
              <>
                <style>
                  {`
                    .input-highlight:focus {
                      border: 1px solid blue !important;
                      outline: none;
                    }
                  `}
                </style>
                <input
                  className="input-highlight"
                  type="password"
                  name="password"
                  placeholder="••••••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "16px",
                  }}
                />
              </>
            </label>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "14px",
              }}
            >
              <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                Remember Me
              </label>
              <a
                onClick={() => navigate("/ResetPassword")}
                style={{
                  color: "#0d6efd",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                Forgot Password ?
              </a>
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#0d6efd",
                color: "white",
                padding: "12px",
                border: "none",
                borderRadius: "4px",
                fontWeight: "600",
                fontSize: "16px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

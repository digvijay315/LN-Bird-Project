import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    acceptedTerms: false,
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

    if (!formData.acceptedTerms) {
      alert("Please accept the terms of service and privacy policy.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/user", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        localStorage.setItem("isRegistered", "true");
        localStorage.setItem("userEmail", formData.email);

        setSuccessMessage("✅ Registered successfully! ");

        setTimeout(() => {
          setSuccessMessage("");
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Registration failed. Try again."
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
        padding: "50px 200px",
        backgroundColor: "#f0f0f0",
        overflowY: "auto",
        marginBottom: "50px",
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

      {/* Left side gray section */}
      <div
        style={{
          flex: 1,
          backgroundColor: "gray",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "100px",
          marginBottom: "100px",
        }}
      >
        <h1 style={{ color: "#555", textAlign: "center" }}>521 x 520</h1>
      </div>

      {/* Right side form section */}
      <div
        style={{
          flex: 1,
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          marginBottom: "100px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Register Now.</h2>
        <p style={{ textAlign: "center", marginBottom: "30px" }}>
          Already have an account?{" "}
          <a
            onClick={() => navigate("/LoginForm")}
            style={{
              color: "#0d6efd",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Sign In
          </a>
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}
        >
          {/* Name */}
          <label style={{ fontWeight: "600" }}>
            Your Name <span style={{ color: "red" }}>*</span>
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
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={formData.name}
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

          {/* Email */}
          <label style={{ fontWeight: "600" }}>
            Your Email <span style={{ color: "red" }}>*</span>
            <input
              className="input-highlight"
              type="email"
              name="email"
              placeholder="example@example.com"
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
          </label>

          {/* Password */}
          <label style={{ fontWeight: "600" }}>
            Password <span style={{ color: "red" }}>*</span>
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
          </label>

          {/* Terms */}
          <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}>
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={formData.acceptedTerms}
              onChange={handleChange}
              required
            />
            I accept the{" "}
            <a
              href="/terms"
              style={{ color: "#0d6efd", marginLeft: "4px", textDecoration: "none" }}
            >
              terms of the Service & Privacy Policy
            </a>
            .
          </label>

          {/* Submit */}
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;

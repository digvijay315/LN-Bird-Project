import React, { useState } from "react";
import "../styles/Collaborations.css";
import { FaChevronDown } from "react-icons/fa";

// ✅ Dummy logos (Replace with actual image paths)
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import logo4 from "../assets/logo4.png";
import logo5 from "../assets/logo5.png";
import indiaFlag from "../assets/india-flag.png"; // ✅ Add a circular India flag image

const Collaborations = () => {
  const [activeTab, setActiveTab] = useState("medical");
  const [country, setCountry] = useState("India");

  const data = {
    medical: [
      [logo1, logo2, logo3, logo4, logo5],
      [logo1, logo2, logo3, logo4, logo5],
    ],
    hospitals: [
      [logo2, logo4, logo3, logo1, logo5],
      [logo5, logo2, logo1, logo3, logo4],
    ],
  };

  return (
    <div className="collab-container">
      {/* ✅ Heading Section */}
      <div className="collab-header">
        <h2 className="collab-title">International Collaborations</h2>
        <p className="collab-subtitle">
          Learn from leading doctors and specialists through focused, digestible video content.
        </p>
      </div>

      {/* ✅ Tabs + Country Selector */}
      <div className="collab-top-row">
        <div className="collab-tabs">
          <button
            className={`collab-tab-btn ${activeTab === "medical" ? "active" : ""}`}
            onClick={() => setActiveTab("medical")}
          >
            Medical Associate
          </button>
          <button
            className={`collab-tab-btn ${activeTab === "hospitals" ? "active" : ""}`}
            onClick={() => setActiveTab("hospitals")}
          >
            Hospitals
          </button>
        </div>

        {/* ✅ Dropdown with flag icon */}
        <div className="collab-country-select">
          <img src={indiaFlag} alt="India flag" className="flag-icon" />
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>
          <FaChevronDown className="collab-dropdown-icon" />
        </div>
      </div>

      {/* ✅ Logos Grid Full Width */}
      <div className="collab-logo-wrapper">
        {data[activeTab].map((row, i) => (
          <div className="collab-logo-row full-width" key={i}>
            {row.map((logo, index) => (
              <div className="collab-logo-box" key={index}>
                <img src={logo} alt="collaboration logo" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collaborations;

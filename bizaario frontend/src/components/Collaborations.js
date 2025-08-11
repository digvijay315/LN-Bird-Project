import React, { useState } from "react";
import "../styles/Collaborations.css";

// Import icons from assets
import doctorIcon from "../assets/doctor-icon.webp";
import medicalIcon from "../assets/medical-box.png";
import hospitalIcon from "../assets/hospital-icon.jpg";

const Collaborations = () => {
  const [activeTab, setActiveTab] = useState("india");

  return (
    <div className="collab-header">
    <div className="collab-section">
      {/* Heading & Subheading */}
      <h2 className="collab-title">International Collaborations</h2>
      <p className="collab-subtitle">
        Learn from leading doctors and specialists through focused, digestible
        video content.
      </p>

      {/* Country Buttons */}
      <div className="collab-tabs">
        <button
          className={`collab-tab-btn ${
            activeTab === "india" ? "active" : ""
          }`}
          onClick={() => setActiveTab("india")}
        >
          India
        </button>
        <button
          className={`collab-tab-btn ${
            activeTab === "ethiopia" ? "active" : ""
          }`}
          onClick={() => setActiveTab("ethiopia")}
        >
          Ethiopia
        </button>
      </div>
 </div>
      {/* Cards */}
      <div className="collab-cards">
        <div className="collab-card collab-card-doctors">
          <h3 className="collab-card-title">Doctors</h3>
          <p className="collab-card-number">20k</p>
          <img src={doctorIcon} alt="Doctors" className="collab-card-icon" />
        </div>

        <div className="collab-card collab-card-medical">
          <h3 className="collab-card-title">Medical Associations</h3>
          <p className="collab-card-number">20k</p>
          <img src={medicalIcon} alt="Medical Associations" className="collab-card-icon" />
        </div>

        <div className="collab-card collab-card-hospitals">
          <h3 className="collab-card-title">Partner Hospitals</h3>
          <p className="collab-card-number">20k</p>
          <img src={hospitalIcon} alt="Partner Hospitals" className="collab-card-icon" />
        </div>
      </div>
    </div>
   
  );
};

export default Collaborations;

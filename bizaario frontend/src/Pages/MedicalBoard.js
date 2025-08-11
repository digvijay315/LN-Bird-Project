import React, { useState } from "react";
import "../styles/MedicalBoard.css";
import doctorImg from "../assets/dr.dominic.jpg";
import specializeIcon from "../assets/specializesicon.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const doctors = Array(12).fill({
  name: "Dr. Dominic Stonehart",
  specialty: "Cardiologist | 15+ Years Experience",
  hospital: "Fortis Hospital, Mumbai",
  expertise:
    "Interventional Cardiology, Heart Failure Management, Preventive Cardiology",
  img: doctorImg,
});

const categories = [
  "Cardiology",
  "Orthopedics",
  "Pediatrics",
  "Neurology",
  "Obstetrics & Gynecology",
  "Otorhinolaryngology",
  "Plastic & Reconstructive Surgery",
];

const MedicalBoard = () => {
  const [activeCategory, setActiveCategory] = useState("Cardiology");

  return (
    <div className="mb-page">
      <Navbar/>
      {/* Banner Section */}
      <div className="mb-banner">
        <div className="mb-banner-overlay">
          <div className="mb-banner-content">
            <h1>Medical Board</h1>
            <p>
              Empowering hospitals, physicians, and patients with real-time
              communication and clinical collaboration—because better care
              starts with better connection.
            </p>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="mb-header">
        <div className="mb-header-text">
          <h2>Meet Our Doctor Team</h2>
          <p>
            Empowering hospitals, physicians, and patients with real-time
            communication and clinical collaboration—because better care starts
            with better connection.
          </p>
        </div>

        <div className="mb-all-news-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`mb-news-buttons ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="mb-doctors-grid">
        {doctors.map((doc, index) => (
          <div className="mb-doctor-card" key={index}>
            <img src={doc.img} alt={doc.name} className="mb-doctor-img" />
            <div className="mb-doctor-info">
              <div className="mb-doctor-header">
                <h3 className="mb-doctor-name">{doc.name}</h3>
                <span
                  className="mb-view-profile"
                  onClick={() => alert(`Viewing ${doc.name}'s profile`)}
                >
                  View Profile
                </span>
              </div>

              <p className="mb-doctor-specialty">{doc.specialty}</p>
              <p className="mb-doctor-address">
                <i className="fas fa-map-marker-alt icon"></i> {doc.hospital}
              </p>
              <p className="mb-doctor-website">
                <img
                  src={specializeIcon}
                  alt="Specialization Icon"
                  className="mb-specialize-icon"
                />
                <span className="mb-doctor-website-text">
                  <strong>Specializes in:</strong> {doc.expertise}
                </span>
              </p>
            </div>
            <div className="mb-card-buttons">
              <button className="mb-btn-appointment">Book an Appointment</button>
              <button className="mb-btn-profile">Send Medical Query</button>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default MedicalBoard;

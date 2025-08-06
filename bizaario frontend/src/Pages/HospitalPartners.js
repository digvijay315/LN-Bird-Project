import React from "react";
import "../styles/HospitalPartners.css";
import { FaFilter } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HospitalPartners() {
  const hospitals = Array(12).fill({
    name: "NovaCare Hospital",
    specialty: "Multi-specialty • Tertiary Care",
    address: "123 Health Blvd, Los Angeles, CA",
    hours: "Open 24/7",
    website: "www.novacarehealth.com",
    img: require("../assets/hospital.png"), // hospital image for cards only
  });

  return (
    <div className="hospital-page">
      <Navbar/>
      {/* ✅ Banner Section */}
      <div className="hospital-banner">
        <div className="banner-overlay">
          <div className="banner-content">
            <h1>Hospitals Partners</h1>
            <p>
              Empowering hospitals, physicians, and patients with real-time
              communication and clinical collaboration—because better care
              starts with better connection.
            </p>
          </div>
        </div>
      </div>

      {/* Title and Filter */}
      <div className="partners-header">
        <div>
          <h2>Meet Our Hospitals Partners</h2>
          <p>
            Empowering hospitals, physicians, and patients with real-time
            communication and clinical collaboration—because better care starts
            with better connection.
          </p>
        </div>
        <button className="filter-btn">
          Use Filters <FaFilter style={{ marginLeft: "8px", }} />
        </button>
      </div>

      {/* Hospitals Grid */}
      <div className="hospitals-grid">
        {hospitals.map((hospital, index) => (
          <div className="hospital-card" key={index}>
            <img src={hospital.img} alt={hospital.name} />
            <div className="hospital-info">
              <h3>{hospital.name}</h3>
              <p>{hospital.specialty}</p>
              <p>📍 {hospital.address}</p>
              <p>🕒 {hospital.hours}</p>
              <p>
                🌐{" "}
                <a
                  href="https://www.novacarehealth.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {hospital.website}
                </a>
              </p>

              <div className="card-buttons">
                <button className="btn-appointment">Book Appointment</button>
                <button className="btn-profile">View Profile</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}

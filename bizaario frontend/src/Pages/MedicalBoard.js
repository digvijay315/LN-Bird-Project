import React from "react";
import "../styles/MedicalBoard.css";
import { FaFilter } from "react-icons/fa";

export default function MedicalBoard() {
  const doctors = Array(12).fill({
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist • 10+ Years Experience",
    address: "123 Health Blvd, Los Angeles, CA",
    hours: "Mon - Fri • 9 AM - 6 PM",
    website: "www.healthclinic.com",
    img: require("../assets/dr.dominic.jpg"), // Replace with your doctor image
  });

  return (
    <div className="mb-page">
      {/* ✅ Banner Section */}
      <div className="mb-banner">
        <div className="mb-banner-overlay">
          <div className="mb-banner-content">
            <h1>Medical Board</h1>
            <p>
              Our expert medical professionals are dedicated to providing
              top-notch healthcare services to patients worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Header Section */}
      <div className="mb-header">
        <div className="mb-header-text">
          <h2>Meet Our Doctors Team</h2>
          <p>
            Highly qualified doctors with years of expertise committed to
            offering the best patient care and advanced medical solutions.
          </p>
        </div>
        <button className="mb-filter-btn">
          Use Filters <FaFilter style={{ marginLeft: "8px" }} />
        </button>
      </div>

      {/* ✅ Doctors Grid */}
      <div className="mb-doctors-grid">
        {doctors.map((doctor, index) => (
          <div className="mb-doctor-card" key={index}>
            <img src={doctor.img} alt={doctor.name} className="mb-doctor-img" />
            <div className="mb-doctor-info">
              <h3 className="mb-doctor-name">{doctor.name}</h3>
              <p className="mb-doctor-specialty">{doctor.specialty}</p>
              <p className="mb-doctor-address">📍 {doctor.address}</p>
              <p className="mb-doctor-hours">🕒 {doctor.hours}</p>
              <p className="mb-doctor-website">
                🌐{" "}
                <a
                  href="https://www.healthclinic.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {doctor.website}
                </a>
              </p>

              <div className="mb-card-buttons">
                <button className="mb-btn-appointment">Book Appointment</button>
                <button className="mb-btn-profile">View Profile</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

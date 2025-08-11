import React, { useState } from "react";
import "../styles/HospitalPartners.css";
import { FaMapMarkerAlt, FaGlobe, FaClock } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function HospitalPartners() {
  const [activeIndex, setActiveIndex] = useState(null);

  const hospitals = Array(12).fill({
    name: "NovaCare Hospital",
    specialty: "Multi-specialty • Tertiary Care",
    address: "123 Health Blvd, Los Angeles, CA",
    hours: "Open 24/7",
    website: "www.novacarehealth.com",
    img: require("../assets/hospital.png"),
  });

  const cityButtons = [
    "Delhi NCR",
    "Mumbai",
    "Bengaluru",
    "Noida",
    "Delhi NCR",
    "Mumbai",
    "Bengaluru",
  ];

  return (
    <div className="hospital-page">
      <Navbar/>
      {/* ✅ Banner Section */}
      <div className="hospital-banner">
        <div className="banner-overlay">
          <div className="hos-banner-content">
            <h1>Hospitals Partners</h1>
            <p>
              Empowering hospitals, physicians, and patients with real-time
              communication and clinical collaboration—because better care
              starts with better connection.
            </p>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="partners-header">
        <div>
          <h2>Meet Our Hospitals Partners</h2>
          <p>
            Empowering hospitals, physicians, and patients with real-time
            communication and clinical collaboration—because better care starts
            with better connection.
          </p>
        </div>
      </div>

      {/* ✅ Buttons + Country Select */}
      <div className="hos-buttons-wrapper">
        <div className="hos-all-news-buttons">
          {cityButtons.map((city, index) => (
            <div key={index}>
              <button
                className={`hos-news-buttons ${activeIndex === index ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                {city}
              </button>
            </div>
          ))}
        </div>

        {/* ✅ Country dropdown box */}
        <div className="country-box">
          <FaMapMarkerAlt className="country-icon" />
          <select>
            <option>Select Country</option>
            <option>India</option>
            <option>USA</option>
            <option>UK</option>
            <option>Canada</option>
          </select>
        </div>
      </div>

      {/* Hospitals Grid */}
      <div className="hospitals-grid">
        {hospitals.map((hospital, index) => (
          <div className="hospital-card" key={index}>
            <img src={hospital.img} alt={hospital.name} />
            <div className="hospital-info">
              {/* ✅ Hospital name + View Profile link */}
              <div className="hos-title-row">
                <h3>{hospital.name}</h3>
                <a
                  href="https://www.novacarehealth.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hos-profile-link"
                >
                  View Profile
                </a>
              </div>

              <p className="hos-special">{hospital.specialty}</p>

              {/* ✅ Location icon */}
              <p className="hos-address">
                <FaMapMarkerAlt style={{ color: "#555", marginRight: "6px" }} />
                {hospital.address}
              </p>

              {/* ✅ Hours icon */}
              <p className="hos-hours">
                <FaClock style={{ color: "#555", marginRight: "6px" }} />
                Hours: {hospital.hours}
              </p>

              {/* ✅ Website icon + link */}
              <p className="neww">
                <FaGlobe style={{ color: "#555", marginRight: "8px" }} />
                <a
                  className="hos-link"
                  href="https://www.novacarehealth.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {hospital.website}
                </a>
              </p>

              <div className="card-buttons">
                <button className="btn-appointment">Book Appointment</button>
                <button className="btn-profile">Send Treatment Query</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}

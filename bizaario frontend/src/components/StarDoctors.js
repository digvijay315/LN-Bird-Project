import React, { useState } from "react";
import "../styles/StarDoctors.css";
import doctorImg from "../assets/dr.dominic.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaMapMarkerAlt, FaStethoscope } from "react-icons/fa";

const StarDoctors = () => {
  const [activeTab, setActiveTab] = useState("medical");
  const [activeCategory, setActiveCategory] = useState("Cardiology");

  const tabs = ["medical", "partners"];
  const categories = [
    "Cardiology",
    "Orthopedics",
    "Pediatrics",
    "Neurology",
    "Obstetrics & Gynecology",
    "Otorhinolaryngology",
    "Plastic & Reconstructive"
  ];

  const doctors = Array(6).fill({
    name: "Dr. Dominic Stonehart",
    experience: "Cardiologist | 15+ Years Experience",
    hospital: "Fortis Hospital, Mumbai",
    specialties:
      "Interventional Cardiology, Heart Failure Management, Preventive Cardiology"
  });

  // ✅ Slider settings - only 3 doctors visible per screen
  const sliderSettings = {
    dots: true,
    infinite: false, // stops at last slide
    speed: 500,
    slidesToShow: 3.5, // only 3 at a time
    slidesToScroll: 1,
    arrows: false, // no arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="stardoctors-page">
      {/* Tabs */}
      <div className="stardoctors-tab-buttons">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`stardoctors-tab-btn ${
              activeTab === tab ? "active" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "medical" ? "Medical Board" : "Partners Hospitals"}
          </button>
        ))}
      </div>

      {/* Categories */}
      <div className="stardoctors-categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`stardoctors-category-btn ${
              activeCategory === cat ? "active" : ""
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Doctor Cards Slider */}
      <Slider {...sliderSettings}>
        {doctors.map((doc, index) => (
          <div className="stardoctors-doctor-card" key={index}>
            <img
              src={doctorImg}
              alt="Doctor"
              className="stardoctors-doctor-img"
            />
            <div className="stardoctors-doctor-info">
              <h3 className="stardoctors-doctor-name">{doc.name}</h3>
              <span className="stardoctors-doctor-exp">{doc.experience}</span>
              <p className="stardoctors-doctor-hospital">
                <FaMapMarkerAlt className="stardoctors-icon" /> {doc.hospital}
              </p>
              <div className="stardoctors-specializes">
                <FaStethoscope className="stardoctors-icon" />
                <div className="stardoctors-special-text">
                  <strong>Specializes in:</strong> {doc.specialties}
                </div>
              </div>

              <div className="stardoctors-buttons">
                <button className="stardoctors-btn orange">
                  Book an Appointments
                </button>
                <button className="stardoctors-btn outline">
                  Send Medical Query
                </button>
              </div>
              <a href="/" className="stardoctors-view-profile">
                View Profile
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default StarDoctors;

// StarDoctors.jsx
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./StarDoctors.css";
import doctorImg from "../assets/dr.dominic.jpg";
import { FaMapMarkerAlt } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const StarDoctors = () => {
  const [activeTab, setActiveTab] = useState("medical");
  const [slidesToShow, setSlidesToShow] = useState(3);

  const doctorsData = {
    medical: [
      {
        name: "Dr. Dominic Stonehart",
        specialty: "Cardiologist | 15+ Years Experience",
        hospital: "Fortis Hospital, Mumbai",
        expertise:
          "Interventional Cardiology, Heart Failure Management, Preventive Cardiology",
      },
      {
        name: "Dr. Alex Morgan",
        specialty: "Neurologist | 10+ Years Experience",
        hospital: "Apollo Hospital, Delhi",
        expertise: "Brain Disorders, Stroke Care, Neurosurgery Assistance",
      },
      {
        name: "Dr. Sophia Anderson",
        specialty: "Dermatologist | 9+ Years Experience",
        hospital: "AIIMS Hospital, Lucknow",
        expertise: "Skin Treatment, Laser Therapy, Hair Problems",
      },
      {
        name: "Dr. John Matthew",
        specialty: "ENT Specialist | 12+ Years Experience",
        hospital: "Medanta Hospital, Gurgaon",
        expertise: "Ear Surgery, Sinus Treatment, Hearing Problems",
      },
      {
        name: "Dr. Kavita Patel",
        specialty: "Gynecologist | 10+ Years Experience",
        hospital: "Apollo Hospital, Pune",
        expertise: "Pregnancy Care, Women Health, Fertility Treatment",
      },
    ],
    partners: [
      {
        name: "Dr. Sarah Johnson",
        specialty: "Orthopedic Surgeon | 12+ Years Experience",
        hospital: "Max Hospital, Bangalore",
        expertise: "Joint Replacement, Sports Injuries, Trauma Care",
      },
      {
        name: "Dr. Emily Parker",
        specialty: "Pediatrician | 8+ Years Experience",
        hospital: "Medanta Hospital, Gurgaon",
        expertise: "Child Healthcare, Immunization, Growth Disorders",
      },
      {
        name: "Dr. Rahul Sharma",
        specialty: "General Physician | 15+ Years Experience",
        hospital: "Fortis Hospital, Noida",
        expertise: "Family Medicine, Chronic Diseases, Preventive Care",
      },
      {
        name: "Dr. Dominic Stonehart",
        specialty: "Cardiologist | 15+ Years Experience",
        hospital: "Fortis Hospital, Mumbai",
        expertise:
          "Interventional Cardiology, Heart Failure Management, Preventive Cardiology",
      },
    ],
  };

  // Responsive slides count
  useEffect(() => {
    function updateSlides() {
      if (window.innerWidth <= 600) setSlidesToShow(1);
      else if (window.innerWidth <= 900) setSlidesToShow(2);
      else setSlidesToShow(3);
    }
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    swipeToSlide: true,
  };

  return (
    <div className="star-container">
      {/* Tabs */}
      <div className="header-row">
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "medical" ? "active" : ""}`}
            onClick={() => setActiveTab("medical")}
          >
            Medical Board
          </button>
          <button
            className={`tab-btn ${activeTab === "partners" ? "active" : ""}`}
            onClick={() => setActiveTab("partners")}
          >
            Partners Hospitals
          </button>
        </div>
      </div>

      {/* React Slick Slider */}
      <Slider {...settings}>
        {doctorsData[activeTab].map((doc, idx) => (
          <div key={idx} className="doctor-card equal-height">
            <img src={doctorImg} alt={doc.name} className="doctor-img" />
            <div className="doctor-info">
              <h3>{doc.name}</h3>
              <p className="specialty">{doc.specialty}</p>
              <p className="hospital">
                <FaMapMarkerAlt className="location-icon" /> {doc.hospital}
              </p>
              <p className="expertise">
                <strong>Specializes in:</strong> {doc.expertise}
              </p>
              <div className="buttons">
                <button className="book-btn">Book Appointment</button>
                <button className="profile-btn">View Profile</button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default StarDoctors;

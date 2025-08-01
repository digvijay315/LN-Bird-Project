import React, { useState } from "react";
import "./StarDoctors.css";
import doctorImg from "../assets/dr.dominic.jpg"; 
import { FaMapMarkerAlt } from "react-icons/fa";

const StarDoctors = () => {
  const [activeTab, setActiveTab] = useState("medical");

  const doctorsData = {
    medical: [
      {
        name: "Dr. Dominic Stonehart",
        specialty: "Cardiologist | 15+ Years Experience",
        hospital: "Fortis Hospital, Mumbai",
        expertise: "Interventional Cardiology, Heart Failure Management, Preventive Cardiology",
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
        name: "Dr. Dominic Stonehart",
        specialty: "Cardiologist | 15+ Years Experience",
        hospital: "Fortis Hospital, Mumbai",
        expertise: "Interventional Cardiology, Heart Failure Management, Preventive Cardiology",
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
        name: "Dr. Kavita Patel",
        specialty: "Gynecologist | 10+ Years Experience",
        hospital: "Apollo Hospital, Pune",
        expertise: "Pregnancy Care, Women Health, Fertility Treatment",
      },
       {
        name: "Dr. Dominic Stonehart",
        specialty: "Cardiologist | 15+ Years Experience",
        hospital: "Fortis Hospital, Mumbai",
        expertise: "Interventional Cardiology, Heart Failure Management, Preventive Cardiology",
      },
    ],
  };

  return (
    <div className="star-container">
      {/* ✅ Tabs Box */}
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

      {/* ✅ Doctors Cards + View All Button */}
      <div className="cards-wrapper">
        <div className="cards-container">
          {doctorsData[activeTab].map((doc, index) => (
            <div className="doctor-card" key={index}>
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

          {/* ✅ View All Button (Inline next to last photo) */}
          <button className="view-all-btn">
            View All <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StarDoctors;

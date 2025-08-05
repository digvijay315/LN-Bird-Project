import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
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
        expertise: "Interventional Cardiology, Heart Failure Management, Preventive Cardiology",
      },
    ],
  };


  function getChunkSize() {
    if (window.innerWidth <= 768) return 1;
    return 3;
  }
  
  // Split videos array into chunks of 1 (mobile) or 3 (desktop/tablet)
  const [chunkSize, setChunkSize] = React.useState(getChunkSize());
  
  // Update chunkSize on resize
  React.useEffect(() => {
    function handleResize() {
      setChunkSize(getChunkSize());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const chunkedDoctors = chunkArray(doctorsData[activeTab], chunkSize);

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

      {/* Carousel */}
           <Carousel indicators={true} controls={false} touch={true} keyboard={true}>
        {chunkedDoctors.map((chunk, slideIdx) => (
          <Carousel.Item key={slideIdx}>
            <div className="cards-container">
              {chunk.map((doc, idx) => (
                <div className="doctor-card equal-height" key={idx}>
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
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default StarDoctors;

import React, { useState } from "react";
import "../styles/EmpoweringDoctors.css";

const EmpoweringDoctors = () => {
  const [activeTab, setActiveTab] = useState("doctor");

  const videos = {
    doctor: [
      { id: 1, title: "Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023", author: "Doctor Malik", thumbnail: "https://i.ibb.co/tHwTTB3/video1.jpg" },
      { id: 2, title: "Case Study Example for Doctors", author: "Doctor Malik", thumbnail: "https://i.ibb.co/1rdwM1k/video2.jpg" },
      { id: 3, title: "Another Medical Class Tribute", author: "Doctor Malik", thumbnail: "https://i.ibb.co/tHwTTB3/video1.jpg" },
      { id: 4, title: "Medical Knowledge Sharing Session", author: "Doctor Malik", thumbnail: "https://i.ibb.co/1rdwM1k/video2.jpg" },
      { id: 5, title: "Advanced Surgery Techniques Explained", author: "Dr. Williams", thumbnail: "https://i.ibb.co/tHwTTB3/video1.jpg" }
    ],
    patients: [
      { id: 1, title: "Patient Education on Heart Health", author: "Dr. Sarah", thumbnail: "https://i.ibb.co/1rdwM1k/video2.jpg" },
      { id: 2, title: "Healthy Lifestyle Tips for Patients", author: "Dr. James", thumbnail: "https://i.ibb.co/tHwTTB3/video1.jpg" },
      { id: 3, title: "Diabetes Care Awareness", author: "Dr. John", thumbnail: "https://i.ibb.co/tHwTTB3/video1.jpg" },
      { id: 4, title: "Managing High Blood Pressure", author: "Dr. Lee", thumbnail: "https://i.ibb.co/1rdwM1k/video2.jpg" },
      { id: 5, title: "Nutrition Guide for Better Health", author: "Dr. Kate", thumbnail: "https://i.ibb.co/1rdwM1k/video2.jpg" }
    ],
  };

  return (
    <div className="video-slider-container">
      {/* Header */}
      <div className="video-header">
        <div className="text-section">
          <h2>Empowering Doctors with Evidence-Based Knowledge</h2>
          <p>Learn from leading doctors and specialists through focused, digestible video content.</p>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          <div className="tabs">
            <button
              className={activeTab === "doctor" ? "active" : ""}
              onClick={() => setActiveTab("doctor")}
            >
              For Doctor
            </button>
            <button
              className={activeTab === "patients" ? "active" : ""}
              onClick={() => setActiveTab("patients")}
            >
              For Patients
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Video Section with View All Button on Right */}
      <div className="video-section">
        <div className="video-grid">
          {videos[activeTab].map((video) => (
            <div key={video.id} className="video-card">
              <div className="video-thumbnail">
                <img src={video.thumbnail} alt={video.title} />
                <div className="play-btn">▶</div>
              </div>
              <h4>{video.title}</h4>
              <p>By {video.author}</p>
            </div>
          ))}
        </div>

        {/* ✅ Unique Button Class */}
        <div className="view-all-container-video">
          <button className="view-all-btn-video">
            View All <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmpoweringDoctors;

import React, { useState } from "react";
import "../styles/EmpoweringDoctors.css";

// ✅ Image imports
import image1 from "../assets/newvideo.png";
import image2 from "../assets/newimage.png";

const EmpoweringDoctors = () => {
  const [activeTab, setActiveTab] = useState("doctor");

  const images = {
    doctor: [
      { id: 1, title: "Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023", author: "Doctor Malik", image: image1 },
      { id: 2, title: "Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023", author: "Doctor Malik", image: image2 },
      { id: 3, title: "Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023", author: "Doctor Malik", image: image1 },
      { id: 4, title: "Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023", author: "Doctor Malik", image: image1 },
      { id: 5, title: "Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023", author: "Doctor Malik", image: image2 },
      { id: 6, title: "Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023", author: "Doctor Malik", image: image1 },
      { id: 7, title: "Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023", author: "Doctor Malik", image: image1 },
    ],
    patients: [
      { id: 1, title: "Patient Education on Heart Health", author: "Dr. Sarah", image: image2 },
      { id: 2, title: "Healthy Lifestyle Tips for Patients", author: "Dr. James", image: image1 },
      { id: 3, title: "Diabetes Care Awareness", author: "Dr. John", image: image2 },
      { id: 4, title: "Managing High Blood Pressure", author: "Dr. Lee", image: image1 },
      { id: 5, title: "Diabetes Care Awareness", author: "Dr. John", image: image2 },
      { id: 6, title: "Managing High Blood Pressure", author: "Dr. Lee", image: image1 },
      { id: 7, title: "Diabetes Care Awareness", author: "Dr. John", image: image2 },
     
    ],
  };

  return (
    <div className="empowering-container">
      {/* Header */}
      <div className="empowering-header">
        <div className="empowering-header-left">
          <h2 className="empowering-title">
            Empowering Doctors with Evidence-Based Knowledge
          </h2>
          <p className="empowering-subtitle">
            Learn from leading doctors and specialists through focused, digestible image content.
          </p>
        </div>
        <div className="empowering-header-right">
         <button
  className={`empowering-tab-button ${activeTab === "doctor" ? "active" : ""}`}
  onClick={() => setActiveTab("doctor")}
>
  For Doctor
</button>

<button
  className={`empowering-tab-button1 ${activeTab === "patients" ? "active" : ""}`}
  onClick={() => setActiveTab("patients")}
>
  For Patients
</button>

        </div>
      </div>

      {/* Image Grid (Slider) */}
      <div className="empowering-image-slider">
        {images[activeTab].map((img) => (
          <div key={img.id} className="empowering-image-card">
            <div className="empowering-image-wrapper">
              <img src={img.image} alt={img.title} />
            </div>
            <h4 className="empowering-image-title">{img.title}</h4>
            <p className="empowering-image-author">By {img.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmpoweringDoctors;

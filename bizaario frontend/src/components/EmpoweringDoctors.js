import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "../styles/EmpoweringDoctors.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EmpoweringDoctors = () => {
  const [activeTab, setActiveTab] = useState("doctor");
  const [slidesToShow, setSlidesToShow] = useState(3);

  const videos = {
    doctor: [
      { id: 1, title: "Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023", author: "Doctor Malik", thumbnail: "https://i.ibb.co/tHwTTB3/video1.jpg" },
      { id: 2, title: "Exploring Modern Medical Technologies", author: "Doctor Malik", thumbnail: "https://i.ibb.co/1rdwM1k/video2.jpg" },
      { id: 3, title: "Navigating Patient Communication", author: "Doctor Malik", thumbnail: "https://i.ibb.co/tHwTTB3/video1.jpg" },
      { id: 4, title: "Effective Hospital Management Tips", author: "Doctor Malik", thumbnail: "https://i.ibb.co/1rdwM1k/video2.jpg" },
      { id: 5, title: "Doctor Wellness and Burnout Prevention", author: "Dr. Williams", thumbnail: "https://i.ibb.co/tHwTTB3/video1.jpg" }
    ],
    patients: [
      { id: 1, title: "Patient Education on Heart Health", author: "Dr. Sarah", thumbnail: "https://i.ibb.co/1rdwM1k/video2.jpg" },
      { id: 2, title: "Understanding Diabetes Care", author: "Dr. James", thumbnail: "https://i.ibb.co/tHwTTB3/video1.jpg" },
      { id: 3, title: "Mental Health Awareness", author: "Dr. John", thumbnail: "https://i.ibb.co/tHwTTB3/video1.jpg" },
      { id: 4, title: "Basics of Nutrition", author: "Dr. Lee", thumbnail: "https://i.ibb.co/1rdwM1k/video2.jpg" },
      { id: 5, title: "Immunization Explained", author: "Dr. Kate", thumbnail: "https://i.ibb.co/1rdwM1k/video2.jpg" }
    ],
  };

  // Handle responsiveness
  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth <= 600) setSlidesToShow(1);
      else if (window.innerWidth <= 900) setSlidesToShow(2);
      else setSlidesToShow(3);
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

 const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 0.5,
    arrows: false,
    adaptiveHeight: true,
    swipeToSlide: true,
  };

  return (
    <div className="video-slider-container">
      <div className="video-header">
        <div className="text-section">
          <h2>Empowering Doctors with Evidence-Based Knowledge</h2>
          <p>
            Learn from leading doctors and specialists through focused, digestible video content.
          </p>
        </div>

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

      <Slider {...settings}>
        {videos[activeTab].map((video) => (
          <div key={video.id} className="video-card-wrapper">
            <div className="video-card">
              <div className="video-thumbnail">
                <img src={video.thumbnail} alt={video.title} />
                <div className="play-btn">▶</div>
              </div>
              <h4>{video.title}</h4>
              <p>By {video.author}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default EmpoweringDoctors;

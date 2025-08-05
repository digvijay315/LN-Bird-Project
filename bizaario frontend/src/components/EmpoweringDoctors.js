import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../styles/EmpoweringDoctors.css";

const EmpoweringDoctors = () => {
  const [activeTab, setActiveTab] = useState("doctor");

  const videos = {
    doctor: [
      { id: 1, title: "Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023", author: "Doctor Malik", thumbnail: "https://i.ibb.co/tHwTTB3/video1.jpg" },
      { id: 2, title: "Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023", author: "Doctor Malik", thumbnail: "https://i.ibb.co/1rdwM1k/video2.jpg" },
      { id: 3, title: "Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023", author: "Doctor Malik", thumbnail: "https://i.ibb.co/tHwTTB3/video1.jpg" },
      { id: 4, title: "Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023", author: "Doctor Malik", thumbnail: "https://i.ibb.co/1rdwM1k/video2.jpg" },
      { id: 5, title: "Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023", author: "Dr. Williams", thumbnail: "https://i.ibb.co/tHwTTB3/video1.jpg" }
    ],
    patients: [
      { id: 1, title: "Patient Education on Heart Health", author: "Dr. Sarah", thumbnail: "https://i.ibb.co/1rdwM1k/video2.jpg" },
      { id: 2, title: "Patient Education on Heart Health", author: "Dr. James", thumbnail: "https://i.ibb.co/tHwTTB3/video1.jpg" },
      { id: 3, title: "Patient Education on Heart Health", author: "Dr. John", thumbnail: "https://i.ibb.co/tHwTTB3/video1.jpg" },
      { id: 4, title: "Patient Education on Heart Health", author: "Dr. Lee", thumbnail: "https://i.ibb.co/1rdwM1k/video2.jpg" },
      { id: 5, title: "Patient Education on Heart Health", author: "Dr. Kate", thumbnail: "https://i.ibb.co/1rdwM1k/video2.jpg" }
    ],
  };


  // Utility for breakpoints
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

const videoChunks = chunkArray(videos[activeTab], chunkSize);


  return (
    <div className="video-slider-container">
      <div className="video-header">
        <div className="text-section">
          <h2>Empowering Doctors with Evidence-Based Knowledge</h2>
          <p>Learn from leading doctors and specialists through focused, digestible video content.</p>
        </div>

        <div className="tabs-container">
          <div className="tabs">
            <button className={activeTab === "doctor" ? "active" : ""} onClick={() => setActiveTab("doctor")}>
              For Doctor
            </button>
            <button className={activeTab === "patients" ? "active" : ""} onClick={() => setActiveTab("patients")}>
              For Patients
            </button>
          </div>
        </div>
      </div>

      <Carousel indicators={true} controls={false} touch={true} keyboard={true}>
        {videoChunks.map((chunk, idx) => (
          <Carousel.Item key={idx}>
            <div className="d-flex justify-content-center gap-3">
              {chunk.map((video) => (
                <div
                  key={video.id}
                  className="video-card"
                  style={{ flex: "0 0 calc((100% / 3) - 16px)", maxWidth: "unset" }}
                >
                  <div className="video-thumbnail">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      style={{ width: "100%", height: "222px", objectFit: "cover", borderRadius: "8px" }}
                    />
                    <div className="play-btn">▶</div>
                  </div>
                  <h4>{video.title}</h4>
                  <p>By {video.author}</p>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default EmpoweringDoctors;

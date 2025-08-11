import React from "react";
import "../styles/LiveSessions.css";

const LiveSessions = () => {
  return (
    <div className="live-sessions-container">
      {/* Header Section */}
      <div className="header-section">
        <div className="text-content">
          <h2>Live Sessions and Online Clinics</h2>
          <p>
            Learn from leading doctors and specialists through focused, digestible video content.
          </p>
        </div>
        <div className="button-group-box">
          <button className="btn active">Live Sessions</button>
          <button className="btn">Online Clinic</button>
        </div>
      </div>

      {/* ✅ Video Section (YouTube Embed) */}
      <div className="video-card">
        <div className="video-wrapper">
          <iframe
            width="100%"
            height="450"
            src="https://www.youtube.com/embed/VRGFnhOpQU0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        {/* ✅ Video Info with Button */}
        <div className="video-info-with-button">
          <div className="video-info">
            <h4>
              Doctor Mike hosts the AMA Tribute to the Medical School Class of 2023
            </h4>
            <p>By Doctor Malik</p>
          </div>
          <button className="join-now-button">Join Now</button>
        </div>
      </div>
    </div>
  );
};

export default LiveSessions;

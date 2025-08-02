import React from "react";
import "../styles/HeroSection.css";
import doctorsImage from "../assets/doctors.png";
import bgImage from "../assets/Component 13.png"; // Replace with your background image

const HeroSection = () => {
  return (
    <section
      className="hero-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
     <img className="hero-image" src={bgImage}></img>
      <div className="hero-overlay">
        {/* Left Content */}
        {/* <div className="hero-content">
          <h1 className="hero-title">
            Where Doctors Collaborate,<br /> Patients Thrive
          </h1>
          <p className="hero-subtitle">
            Empowering hospitals, physicians, and patients with real-time
            communication and clinical collaboration—because better care
            starts with better connection.
          </p>

          <div className="hero-buttons">
            <button className="join-btn">Join Our Network</button>
            <button className="see-btn">See How It Works</button>
          </div>

          <div className="hero-stats">
            <div>
              <h3>10,000+</h3>
              <p>Hospitals connected</p>
            </div>
            <div>
              <h3>10K+</h3>
              <p>Doctors connected</p>
            </div>
          </div>
        </div> */}

        {/* Right Image */}
        {/* <div className="hero-image">
          <img src={doctorsImage} alt="Doctors" />
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;

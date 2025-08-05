import React from "react";
import "../styles/HeroSection.css";
import doctorsImage from "../assets/doctors.png";
import Carousel from "react-bootstrap/Carousel";
import bgImage1 from "../assets/Component 13.png";
import bgImage2 from "../assets/Property 1=Frame 356.png";
import bgImage3 from "../assets/Property 1=Frame 357.png";

const HeroSection = () => {
  return (
    <section
      className="hero-container"
  
    >
     <Carousel fade controls={false} indicators={true} interval={4000}>
        {[bgImage1, bgImage2, bgImage3].map((img, idx) => (
          <Carousel.Item key={idx}>
            <img className="d-block w-100 hero-image" src={img} alt={`Slide ${idx + 1}`} />
            {/* <Carousel.Caption className="hero-caption">
              <h1 className="hero-title">Where Doctors Collaborate, Patients Thrive</h1>
              <p className="hero-subtitle">
                Empowering hospitals, physicians, and patients with real-time communication and
                collaboration—because better care starts with better connection.
              </p>
              <div className="hero-buttons">
                <button className="join-btn">Join Our Network</button>
                <button className="see-btn">See How It Works</button>
              </div>
            </Carousel.Caption> */}
          </Carousel.Item>
        ))}
      </Carousel>
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

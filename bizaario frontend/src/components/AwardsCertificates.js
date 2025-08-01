import React, { useState } from "react";
import "../styles/AwardsCertificates.css";
import award1 from "../assets/award1.png";
import award2 from "../assets/award2.png";
import award3 from "../assets/award3.png";

const awards = [
  {
    id: 1,
    image: award1,
    title: "🏅 Best Cardiologist 2022",
    organization: "Indian Medical Association",
    description:
      "I have received multiple awards for excellence in cardiology and patient care, including recognition for clinical innovation and compassionate service. My work continues to be honored by leading medical associations.",
    date: "15/05/2022",
    certificate: "#",
  },
  {
    id: 2,
    image: award2,
    title: "🏆 Excellence in Heart Surgery 2021",
    organization: "Global Health Summit",
    description:
      "Awarded for outstanding contribution to cardiovascular surgery and innovations that improved patient outcomes worldwide.",
    date: "10/12/2021",
    certificate: "#",
  },
  {
    id: 3,
    image: award3,
    title: "🥇 National Healthcare Leadership 2020",
    organization: "Ministry of Health",
    description:
      "Recognized for leadership in healthcare services and initiatives to improve cardiac treatments across the country.",
    date: "20/08/2020",
    certificate: "#",
  },
];

const AwardsCertificates = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === awards.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? awards.length - 1 : prev - 1));
  };

  return (
    <div className="awards-container">
      <div className="awards-header">
        <h2>Awards & Certification</h2>
        <p>
          Learn from leading doctors and specialists through focused, digestible
          video content.
        </p>
      </div>

      <div className="awards-card">
        <button className="arrow-btn left" onClick={prevSlide}>❮</button>
        <div className="award-content">
          <img
            src={awards[current].image}
            alt={awards[current].title}
            className="award-image"
          />
          <div className="award-info">
            <h3>{awards[current].title}</h3>
            <h4>{awards[current].organization}</h4>
            <p>{awards[current].description}</p>
            <p className="date">📅 {awards[current].date}</p>
            <a
              href={awards[current].certificate}
              target="_blank"
              rel="noopener noreferrer"
              className="view-link"
            >
              View Certificate
            </a>
          </div>
        </div>
        <button className="arrow-btn right" onClick={nextSlide}>❯</button>
      </div>
    </div>
  );
};

export default AwardsCertificates;

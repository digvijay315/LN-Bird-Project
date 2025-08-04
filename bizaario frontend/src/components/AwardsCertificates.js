import React from "react";
import "../styles/AwardsCertificates.css";
import award1 from "../assets/award1.png";
import award2 from "../assets/award2.png";
import award3 from "../assets/award3.png";
import Carousel from "react-bootstrap/Carousel";

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
  return (
    <div className="awards-container">
      <div className="awards-header">
        <h2>Awards & Certification</h2>
        <p>
          Learn from leading doctors and specialists through focused, digestible
          video content.
        </p>
      </div>

      <Carousel
        indicators={true}
        controls={false}
        interval={null}
        className="awards-carousel"
      >
        {awards.map((award) => (
          <Carousel.Item key={award.id}>
            <div className="awards-card">
              <div className="award-content">
                <img
                  src={award.image}
                  alt={award.title}
                  className="award-image"
                />
                <div className="award-info">
                  <h3>{award.title}</h3>
                  <h4>{award.organization}</h4>
                  <p>{award.description}</p>
                  <p className="date">📅 {award.date}</p>
                  <a
                    href={award.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-link"
                  >
                    View Certificate
                  </a>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default AwardsCertificates;

import React, { useState, useEffect } from "react";
import "../styles/PatientTestimonials.css";
import patient1 from "../assets/patient1.png";
import patient2 from "../assets/patient2.png";
import patient3 from "../assets/patient3.png";
import quoteIcon from "../assets/quote-icon.png"; // ✅ adjust path if needed


const testimonials = [
  {
    name: "Sarah Thomas",
    location: "Mumbai",
    message:
      "Dr. Stonehart is not only a great cardiologist but also a kind human being. He explained my condition clearly, eased my fears, and guided me through successful treatment.",
    image: patient1,
  },
  {
    name: "Ravi Mehta",
    location: "Delhi",
    message:
      "I had the best experience with Dr. Stonehart. His calm approach and deep knowledge made a huge difference in my recovery. Highly recommended!",
    image: patient2,
  },
  {
    name: "Anita Desai",
    location: "Bangalore",
    message:
      "Dr. Stonehart truly listens to his patients. He took the time to understand my issues and gave excellent care. Very grateful to him and the team.",
    image: patient3,
  },
];

export default function PatientTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-testimonials-section">
      <div className="pt-testimonials-header">
        <h2 className="pt-testimonials-title">Patients Testimonials</h2>
        <p className="pt-testimonials-subtitle">
          Learn from leading doctors and specialists through focused, digestible video content.
        </p>
      </div>

      <div className="pt-testimonials-slider">
        <div className="pt-testimonial-card">
          <div className="pt-testimonial-text">
            <p className="pt-testimonial-message">
              {testimonials[currentIndex].message}
            </p>
           <div className="pt-testimonial-bottom">
  <div>
    <h3 className="pt-testimonial-name">{testimonials[currentIndex].name}</h3>
    <p className="pt-testimonial-location">{testimonials[currentIndex].location}</p>
  </div>
  <img src={quoteIcon} alt="Quote Icon" className="pt-quote-icon" />
</div>

          </div>
          <div className="pt-testimonial-image-wrapper">
            <img
              src={testimonials[currentIndex].image}
              alt={testimonials[currentIndex].name}
              className="pt-testimonial-image"
            />
          </div>
        </div>

        <div className="pt-indicators">
          {testimonials.map((_, idx) => (
            <span
              key={idx}
              className={`pt-indicator-dot ${currentIndex === idx ? "active" : ""}`}
              onClick={() => setCurrentIndex(idx)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

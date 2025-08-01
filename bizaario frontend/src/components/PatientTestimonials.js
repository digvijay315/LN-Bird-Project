import React, { useState, useEffect } from "react";
import "../styles/PatientTestimonials.css";
import patient1 from "../assets/patient1.png";
import patient2 from "../assets/patient2.png";
import patient3 from "../assets/patient3.png";

const testimonials = [
  {
    id: 1,
    text: "Dr. Stonehart is not only a great cardiologist but also a kind human being. He explained my condition clearly, eased my fears, and guided me through successful treatment.",
    name: "Sarah Thomas",
    location: "Mumbai",
    image: patient1,
  },
  {
    id: 2,
    text: "The level of care and compassion shown was beyond my expectations. I felt truly supported throughout my treatment journey.",
    name: "Rahul Verma",
    location: "Delhi",
    image: patient2,
  },
  {
    id: 3,
    text: "Exceptional experience! Dr. Stonehart and his team are highly skilled and incredibly understanding.",
    name: "Priya Kapoor",
    location: "Bangalore",
    image: patient3,
  },
];

const PatientTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Function to move to the next slide
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  // ✅ Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Manually navigate using dots
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="patient-testimonials-container">
      <div className="testimonial-header">
        <h2>Patients Testimonials</h2>
        <p>
          Learn from leading doctors and specialists through focused, digestible
          video content.
        </p>
      </div>

      <div className="testimonial-card">
        <div className="testimonial-text">
          <p className="quote-text">"{testimonials[currentIndex].text}"</p>
          <h4>{testimonials[currentIndex].name}</h4>
          <span>{testimonials[currentIndex].location}</span>
        </div>
        <div className="testimonial-image">
          <img src={testimonials[currentIndex].image} alt="Patient" />
        </div>
      </div>

      <div className="dots-container">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default PatientTestimonials;

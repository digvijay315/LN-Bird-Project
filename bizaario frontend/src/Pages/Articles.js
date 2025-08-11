import React, { useState } from "react";
import "../styles/Articles.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Articles() {
  const [activeButton, setActiveButton] = useState("Cardiology");

  // ✅ 3 different images
  const images = [
    require("../assets/article1.png"),
    require("../assets/article2.png"),
    require("../assets/article3.png"),
  ];

  // ✅ 12 articles, images repeated in order
  const articles = Array.from({ length: 12 }, (_, index) => ({
    title: "The trend was noticed during a survey by Bumble",
    description:
      "If you scroll around on your social feed elsewhere, it’s a good opportunity to stop thinking others have it all put together.",
    img: images[index % 3], // Cycles through 3 images
  }));

  // ✅ Department buttons
  const departments = [
    "Cardiology",
    "Orthopedics",
    "Pediatrics",
    "Neurology",
    "Obstetrics & Gynecology",
    "Otorhinolaryngology",
    "Plastic & Reconstructive Surgery",
  ];

  return (
    <div className="articles-page">
      <Navbar/>
      {/* ✅ Banner Section */}
      <div className="articles-banner">
        <div className="articles-banner-overlay">
          <div className="articles-banner-content">
            <h1>News & Articles</h1>
            <p>
              Empowering hospitals, physicians, and patients with real-time
              communication and clinical collaboration—because better care
              starts with better connection.
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Header Section */}
      <div className="articles-header">
        <div>
          <h2>Read News & Articles</h2>
          <p>
            Empowering hospitals, physicians, and patients with real-time
            communication and clinical collaboration—because better care starts
            with better connection.
          </p>
        </div>
      </div>

      {/* ✅ Active Button Selection */}
      <div className="all-article-news-buttons">
        {departments.map((dept) => (
          <button
            key={dept}
            className={`article-news-buttons ${activeButton === dept ? "active" : ""}`}
            onClick={() => setActiveButton(dept)}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* ✅ Articles Grid */}
      <div className="articles-grid">
        {articles.map((article, index) => (
          <div className="articles-card" key={index}>
            <img
              src={article.img}
              alt={article.title}
              className="articles-image"
            />
            <div className="articles-info">
              {/* ✅ Title Container */}
              <div className="article-title-container">
                <h3>{article.title}</h3>
              </div>

              {/* ✅ Description Container with Read More link */}
              <div className="article-description-container">
                <p className="article-text">
                  {article.description}
                  <span className="readmore-link">... Read More</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}

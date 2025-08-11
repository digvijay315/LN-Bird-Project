import React, { useState } from "react";
import "../styles/NewsArticles.css";

export default function NewsArticles() {
  const [activeDept, setActiveDept] = useState("Cardiology");

  const images = [
    require("../assets/article1.png"),
    require("../assets/article2.png"),
    require("../assets/article3.png"),
  ];

  const articles = Array.from({ length: 3 }, (_, index) => ({
    title: "The trend was noticed during a survey by Bumble",
    description:
      "If you scroll around on your social feed elsewhere, it’s a good opportunity to stop thinking others have it all put together.",
    img: images[index],
  }));

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
    <div className="newsarticles-page">
      {/* ✅ Header + View All */}
      <div className="newsarticles-header-row">
        <div className="newsarticles-header">
          <h2>Read News & Articles</h2>
          <p>
            Learn from leading doctors and specialists through focused, digestible video content.
          </p>
        </div>
        <button className="newsarticles-viewall">View All</button>
      </div>

      {/* ✅ Department Buttons */}
      <div className="newsarticles-buttons">
        {departments.map((dept) => (
          <button
            key={dept}
            className={`newsarticles-button ${activeDept === dept ? "active" : ""}`}
            onClick={() => setActiveDept(dept)}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* ✅ 3 Articles in One Line */}
      <div className="newsarticles-row">
        {articles.map((article, index) => (
          <div className="newsarticles-card" key={index}>
            <img
              src={article.img}
              alt={article.title}
              className="newsarticles-img"
            />
            <div className="newsarticles-info">
              <h3 className="newsarticles-title">{article.title}</h3>
              <p className="newsarticles-description">
                {article.description}
                <span className="newsarticles-readmore">... Read More</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

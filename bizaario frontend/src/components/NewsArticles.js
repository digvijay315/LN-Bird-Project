import React from "react";
import "../styles/NewsArticles.css";
import article1 from "../assets/article1.png";
import article2 from "../assets/article2.png";
import article3 from "../assets/article3.png";

const articles = [
  {
    id: 1,
    img: article1,
    title: "The trend was noticed during a survey by Bumble",
    description:
      "If you ask yourself what are some of your deal-breakers, AKA non-negotiables, when it comes to dating, there can be a lot of things ranging...",
  },
  {
    id: 2,
    img: article2,
    title: "The trend was noticed during a survey by Bumble",
    description:
      "If you ask yourself what are some of your deal-breakers, AKA non-negotiables, when it comes to dating, there can be a lot of things ranging...",
  },
  {
    id: 3,
    img: article3,
    title: "The trend was noticed during a survey by Bumble",
    description:
      "If you ask yourself what are some of your deal-breakers, AKA non-negotiables, when it comes to dating, there can be a lot of things ranging...",
  },
];

const NewsArticles = () => {
  return (
    <div className="news-container">
      {/* Header */}
      <div className="news-header">
        <div className="news-text">
          <h2>News And Articles</h2>
          <p>
            Learn from leading doctors and specialists through focused,
            digestible video content.
          </p>
        </div>
        <button className="view-all-btn-article">View All</button>
      </div>

      {/* Articles */}
      <div className="articles-grid">
        {articles.map((article) => (
          <div key={article.id} className="article-card">
            <img src={article.img} alt={article.title} />
            <div className="article-content">
              <h4>{article.title}</h4>
              <p>
                {article.description}{" "}
                <span className="read-more">Read More</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsArticles;

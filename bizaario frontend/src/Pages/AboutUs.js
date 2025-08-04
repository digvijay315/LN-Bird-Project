import React, { useState } from "react";
import "../styles/AboutUs.css";
import team1 from "../assets/team1.png";
import team2 from "../assets/team2.png";
import team3 from "../assets/team3.png";
import team4 from "../assets/team4.png";
import news1 from "../assets/article1.png";
import news2 from "../assets/article2.png";
import news3 from "../assets/article3.png";

function AboutUs() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const newsData = [
    {
      img: news1,
      text: "If you ask yourself what are some of your deal-breakers, AKA non-negotiables, when it comes to dating, there can be a lot of things ranging from personality traits, values, and lifestyle choices to specific boundaries you won't compromise on.",
    },
    {
      img: news2,
      text: "If you ask yourself what are some of your deal-breakers, AKA non-negotiables, when it comes to dating, these may include honesty, communication, shared values, and respect for your personal boundaries.",
    },
    {
      img: news3,
      text: "If you ask yourself what are some of your deal-breakers, AKA non-negotiables, when it comes to dating, you might think about things that truly matter to you such as trust, kindness, mutual support, and similar life goals.",
    },
  ];

  return (
    <div className="about-page">
      {/* ✅ Banner Section */}
      <div className="about-banner">
        <div className="banner-content">
          <h1>About US</h1>
          <p>
            Empowering hospitals, physicians, and patients with real-time
            communication and clinical collaboration—because better care starts
            with better connection.
          </p>
        </div>
      </div>

      {/* Who We Are */}
      <div className="about-section">
        <h2>Who We are?</h2>
        <p>
          We are dedicated to providing reliable testing services across various
          industries, ensuring safety, quality, and compliance. With a team of
          experts and trusted lab partners, we deliver precise and timely
          results, helping our customers meet the highest standards. Our
          commitment to excellence drives everything we do, making us a trusted
          partner in quality assurance. We work closely with clients to
          understand their unique needs, offering customized solutions that
          ensure product integrity and regulatory compliance. Our focus on
          innovation, accuracy, and customer satisfaction sets us apart as a
          leader in the testing services industry.
        </p>
      </div>

      {/* Our Mission */}
      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to deliver accurate, reliable, and timely testing
          services that ensure the safety, quality, and compliance of products
          across industries. We strive to provide exceptional value to our
          customers through innovative solutions, expert knowledge, and a
          commitment to excellence. Our goal is to be a trusted partner in
          quality assurance, helping businesses meet industry standards and
          protect consumer well-being.
        </p>
      </div>

      {/* Meet Our Team */}
      <div className="team-section">
        <h2>Meet Our Team</h2>
        <p>
          Meet Our Leadership Team. Our leadership team brings together
          expertise and vision, driving innovation and ensuring the highest
          standards of service.
        </p>
        <div className="team-grid">
          {[team1, team2, team3, team4, team1, team2, team3, team4].map(
            (img, index) => (
              <div className="team-card" key={index}>
                <img src={img} alt="team member" />
                <h4>Jenny Wilson</h4>
                <p>Viverra ut potenti</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* ✅ News and Articles with only 'Read More' clickable */}
      <div className="news-section">
        <h2>News And Articles</h2>
        <p>
          Learn from leading doctors and specialists through focused, digestible
          video content.
        </p>
        <div className="news-grid">
          {newsData.map((item, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <div className="news-card" key={index}>
                <img src={item.img} alt="news" />
                <div className="news-content">
                  <h4>The trend was noticed during a survey by Bumble</h4>
                  <p>
                    {isExpanded
                      ? item.text
                      : item.text.slice(0, 100)}
                    {!isExpanded && (
                      <>
                        {" ... "}
                        <span
                          className="read-more"
                          onClick={() =>
                            setExpandedIndex(isExpanded ? null : index)
                          }
                        >
                          Read More
                        </span>
                      </>
                    )}
                  </p>
                  {isExpanded && (
                    <span
                      className="read-more"
                      onClick={() => setExpandedIndex(null)}
                    >
                      Read Less
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
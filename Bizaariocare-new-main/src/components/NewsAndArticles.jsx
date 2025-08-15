
import "../assets/css/NewsAndArticles.css"; 

import React, { useState } from "react";
import { cardsData } from "../Data/LocalData";



const NewsAndArticles = () => {
  const [activeCategory, setActiveCategory] = useState("cardiology");

  const categories = [
    { key: "cardiology", label: "Cardiology" },
    { key: "orthopedics", label: "Orthopedics" },
    { key: "pediatrics", label: "Pediatrics" },
    { key: "neurology", label: "Neurology" },
    { key: "obgyn", label: "Obstetrics & Gynecology" },
    { key: "ent", label: "Otorhinolaryngology" },
    { key: "plastic", label: "Plastic & Reconstructive" }
  ];


  const filteredCards =
    activeCategory === "all"
      ? cardsData
      : cardsData.filter((card) => card.category === activeCategory);

  return (
    <section className="spacing-top">
      <div className="news-section container">
        {/* Header */}
        <div className=" news-inner">
          <div>
            <h2 className="fw-semibold ">News And Articles</h2>
            <p className="light-color">
              Learn from leading doctors and specialists through focused,
              digestible video content.
            </p>
          </div>
          <div>
            <button className="btn common-btn-dark mb-3 mb-lg-0" onClick={()=> setActiveCategory("all")}
              >
              View All
            </button>
          </div>

        </div>

        {/* Tabs */}
        <div className="d-flex flex-wrap gap-md-4 gap-3 mb-4">
          {categories.map((cat) => (
          <button key={cat.key} className={`  cutom-tab-style  ${ activeCategory===cat.key
            ? "activeTab " : "tab-btn-style gray-btn-style" }`} onClick={()=> setActiveCategory(cat.key)}
            >
            {cat.label}
          </button>
          ))}
        </div>

        <div className="content-style">

          <div className="row g-3">
            {filteredCards.map((card, index) => (
            <div className="col-lg-4 col-md-6 col-12 mb-md-0 mb-3" key={index}>
              <div className="card border-0 shadow-sm h-100 rounded-4 p-3">
                <img src={card.img} className="card-img-top " alt={card.title} />
                <div className="pt-3">
                  <h4 className="fw-bold">{card.title}</h4>
                  <p className=" small mb-1 light-color">
                    If you ask yourself what are some of your deal-breakers, AKA
                    non-negotiables, when it comes to dating, there can be a lot
                    of things ranging...
                    <a href="#" className="ms-4 fw-semi-bold read-more-btn  text-decoration-none">
                      Read More
                    </a>
                  </p>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsAndArticles;

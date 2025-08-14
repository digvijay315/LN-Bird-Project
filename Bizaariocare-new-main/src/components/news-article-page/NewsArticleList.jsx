import React from 'react'
import { cardsData } from '../../Data/LocalData'

const NewsArticleList = () => {
  return (
    <>
        {cardsData.map((card) => (
            <div className="col-lg-4 col-md-6 col-12 mb-4" key={card.id}>
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
    </>
  )
}

export default NewsArticleList

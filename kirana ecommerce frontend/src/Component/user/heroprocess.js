import React from "react";
import { FaTruck, FaDollarSign, FaHeadset, FaRegCreditCard, FaArrowRight } from "react-icons/fa";
import "../user/css/heroprocess.css"; 
import logo from '../user/images/close-up-food-against-white-background.jpg'

const processFeatures = [
  {
    icon: <FaTruck />,
    title: "Free Shipping",
    subtitle: "Free Shipping for orders over $120"
  },
  {
    icon: <FaDollarSign />,
    title: "Refund",
    subtitle: "Within 30 days for an exchange."
  },
  {
    icon: <FaHeadset />,
    title: "Support",
    subtitle: "24 hours a day, 7 days a week"
  },
  {
    icon: <FaRegCreditCard />,
    title: "Payment",
    subtitle: "Pay with Multiple Credit Cards"
  }
];



function HeroProcessSection() {
  return (
    <section className="hero-process-root">
    
       
        <div className="hero-img">
             <div className="hero-content">
          <div className="hero-subtitle">Stock Up on Essentials</div>
          <h1 className="hero-title">
            The wait is over: 
 <br />
            Premium grocery collection

          </h1>
          <div className="hero-desc">
            Last call for up to <strong>25%</strong> off on bulk orders!
          </div>
          <button className="hero-btn">
            Buy Now <FaArrowRight style={{ marginLeft: 8 }} />
          </button>
        </div>
          <img src={logo} alt="iPhone 12 max pro" />
        </div>
      
      <div className="process-bar">
        {processFeatures.map((feat, idx) => (
          <div className="process-feature" key={idx}>
            <span className="process-icon">{feat.icon}</span>
            <div>
              <div className="process-title">{feat.title}</div>
              <div className="process-subtitle">{feat.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HeroProcessSection;

import React,{useState } from 'react'
import Header from './Header'
import Footer from './footer'
import "./VitamincFacewash.css";
import { useCart } from './cartcontext';

function VitamincFacewash() {


    const product = [
      { id: 1, name: "Vitamin C Face Wash (Brightens & Evens Skin Tone),100gm", price: "599/-", image: "https://www.richfeelnaturals.com/cdn/shop/files/vitamin-c-face-wash1_a2da8366-3d65-4193-b1f9-94a5b965206a.jpg?v=1718106105",  quantity: 1 }

    ];

    const {cart,setcart}=useCart()

    // Add to Cart function
    const handleprouctadd = (product) => {
      // Check if the product already exists in the cart
      const isProductInCart = cart.some((item) => item.name === product.name);
    
      if (!isProductInCart) {
        // Add the product to the cart if it's not already present
        setcart([...cart, product]);
      } else {
        alert(`${product.name} is already in the cart.`);
      }
    };

    
return (
<div>

    <div>
        <Header/>
    </div>
    <div className="container mt-5">
  <div className="row " style={{marginTop:"12rem"}}>
    {/* Product Image Section */}
    {product.map((product) => (
      <div key={product.id} className="col-lg-6 text-center">
        <img
          src={product.image}
          alt={product.name}
          className="img-fluid"
          style={{
            maxWidth: "100%",
            height:"380px",
            marginBottom:"10rem"
   
          }}
        />
      </div>
    ))}

    {/* Product Details Section */}
    {product.map((product) => (
      <div key={product.id} className="col-lg-6">
        <h3 className="fw-bold">{product.name.split(" (")[0]}</h3> {/* Extracted Name */}
        <p className="text-muted">
  {product.name.includes("(")
    ? product.name.split("(")[1].replace(")", "")
    : ""}
</p> {/* Extracted Details */}
        <div className="mb-3">
          <span className="text-danger fw-bold fs-4">{product.price}</span>
          <span className="text-muted text-decoration-line-through ms-2">
            ₹1599
          </span>
          <span className="badge bg-success ms-2">63% off</span>
        </div>

        {/* Offers Section */}
        <div className="mb-4">
          <h6>Available Offers:</h6>
          <ul className="list-unstyled">
            <li>5% Unlimited Cashback on Flipkart Axis Bank Card</li>
            <li>10% off on HDFC Bank Credit Card EMI</li>
            <li>10 days return policy</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-2">
          <button className="btn btn-warning" onClick={() => handleprouctadd(product)}>
            Add to Cart
          </button>
          <button className="btn btn-danger">Buy Now</button>
        </div>

        <div className="accordion mt-5" id="accordionExample">
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="false"
          aria-controls="collapseOne"
        >
          Product Specification
        </button>
      </h2>
      <div
        id="collapseOne"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          <h4 className="fw-bold mb-3">Vitamin C Face Wash</h4>
          <p>
          Refresh and revitalize your skin with our Vitamin C Face Wash, a powerful yet gentle cleanser 
    designed to give your skin a healthy, glowing complexion. Enriched with the goodness of Vitamin C, 
    this daily face wash helps brighten and even out skin tone while protecting your skin from harmful 
    environmental stressors.
          </p>
          <h5 className="mt-4">Key Benefits:</h5>
          <ul className="list-group list-group-flush mt-3">
          <li className="list-group-item">
      <strong>Brightens & Evens Skin Tone:</strong> The antioxidant properties of Vitamin C help 
      reduce dullness, promoting a radiant and youthful glow. Regular use can also help lighten 
      dark spots and pigmentation for a more even complexion.
    </li>
    <li className="list-group-item">
      <strong>Fights Free Radical Damage:</strong> Vitamin C’s powerful antioxidant properties neutralize 
      harmful free radicals, preventing premature signs of aging and skin damage caused by pollution and UV exposure.
    </li>
    <li className="list-group-item">
      <strong>Deep Cleansing:</strong> Effectively removes dirt, excess oil, and impurities without 
      stripping your skin's natural moisture. Perfect for everyday use to cleanse, refresh, and rejuvenate your skin.
    </li>
    <li className="list-group-item">
      <strong>Hydrates & Nourishes:</strong> Packed with Vitamin C, this face wash hydrates and nurtures 
      your skin, leaving it feeling smooth, soft, and deeply refreshed after every wash.
    </li>
    <li className="list-group-item">
      <strong>Suitable for All Skin Types:</strong> Whether you have dry, oily, combination, or sensitive skin, 
      this Vitamin C face wash is gentle enough for daily use and helps balance your skin’s natural pH.
    </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="accordion-item">
    <h2 className="accordion-header">
      <button
        className="accordion-button collapsed text-bold"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseThree"
        aria-expanded="false"
        aria-controls="collapseThree"
      >
        Product Feacture
      </button>
    </h2>
    <div
      id="collapseThree"
      className="accordion-collapse collapse"
      data-bs-parent="#accordionExample"
    >
<div
  id="collapseThree"
  className="accordion-collapse collapse"
  data-bs-parent="#accordionExample"
>
  <div className="accordion-body">
    <div className="features-container">
        <div style={{display:"flex", gap:"9rem"}}>
      <div className="feature-item">
        <i className="fa-solid fa-globe feature-icon"></i>
        <span>On Time Delivery</span>
      </div>
      <div className="feature-item">
        <i className="fa-brands fa-product-hunt feature-icon"></i>
        <span>Easily Return</span>
      </div>
      </div>
      <br/>
      <div style={{display:"flex", gap:"6rem"}}>
      <div className="feature-item">
        <i className="fa-solid fa-clock feature-icon"></i>
        <span>24/7 Customer Service</span>
      </div>
      <div className="feature-item">
        <i className="fa-solid fa-lock feature-icon"></i>
        <span>Secure Payments</span>
      </div>
      </div>
    </div>
  </div>
</div>




    </div>
  </div>
  </div>
      </div>
    ))}
  </div>

  {/* Accordion Section */}
 
</div>






<Footer />
</div>
)
}

export default VitamincFacewash
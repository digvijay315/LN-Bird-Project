import React, { useState } from "react";

const ProductCategories = () => {
  const dummyProducts = [
    {
      productname: "Basmati Rice",
      price: 250,
      image: "https://via.placeholder.com/220x140?text=Basmati+Rice",
      category: "Rice & Grains",
    },
    {
      productname: "Sona Masoori",
      price: 180,
      image: "https://via.placeholder.com/220x140?text=Sona+Masoori",
      category: "Rice & Grains",
    },
    {
      productname: "Red Rajma",
      price: 120,
      image: "https://via.placeholder.com/220x140?text=Red+Rajma",
      category: "Pulses & Lentils",
    },
    {
      productname: "Organic Turmeric Powder",
      price: 150,
      image: "https://via.placeholder.com/220x140?text=Turmeric+Powder",
      category: "Spices & Masalas",
    },
    {
      productname: "Pure Desi Ghee",
      price: 450,
      image: "https://via.placeholder.com/220x140?text=Desi+Ghee",
      category: "Oil & Ghee",
    },
    {
      productname: "Premium Green Tea",
      price: 350,
      image: "https://via.placeholder.com/220x140?text=Green+Tea",
      category: "Tea & Coffee",
    },
    {
      productname: "Dry Fruit Mix",
      price: 500,
      image: "https://via.placeholder.com/220x140?text=Dry+Fruit+Mix",
      category: "Snacks & Namkeen",
    },
  ];

  // Group products by category
  const categoriesMap = dummyProducts.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});
  const categories = Object.keys(categoriesMap);

  const [selectedCategory, setSelectedCategory] = useState(categories[0] || "");

  const handleAddToCart = (product) => {
    alert(`Added "${product.productname}" to cart!`);
  };

  return (
    <>
      <style>{`
        .tabs {
          display: flex;
          gap: 1rem;
          border-bottom: 2px solid #ccc;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        .tab {
          padding: 0.5rem 1rem;
          cursor: pointer;
          border-radius: 4px 4px 0 0;
          background-color: #eee;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }
        .tab.active {
          background-color: #007600;
          color: white;
          border-bottom: 2px solid white;
        }
        .products-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: flex-start;
        }
        .product-card {
          position: relative;
          flex: 1 1 220px;
          max-width: 220px;
          background: #f8f8f8;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.08);
          padding: 1rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .product-card:hover {
          transform: translateY(-5px);
        }
        .product-image {
          width: 100%;
          height: 140px;
          object-fit: contain;
          margin-bottom: 1rem;
          border-radius: 4px;
          background-color: white;
        }
        .product-name {
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
          color: #333;
        }
        .product-price {
          color: #007600;
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 0.5rem;
        }
        .add-to-cart-btn {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          padding: 0.5rem 1rem;
          background-color: #007600;
          color: white;
          border: none;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.95rem;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .product-card:hover .add-to-cart-btn {
          opacity: 1;
          pointer-events: auto;
        }
        @media (max-width: 768px) {
          .products-grid {
            justify-content: center;
          }
          .product-card {
            max-width: 100%;
            flex: 1 1 100%;
          }
          .tabs {
            justify-content: center;
          }
        }
      `}</style>

      <div className="tabs" role="tablist">
        {categories.map((category) => (
          <div
            key={category}
            role="tab"
            tabIndex={0}
            aria-selected={selectedCategory === category}
            className={`tab ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSelectedCategory(category);
              }
            }}
          >
            {category}
          </div>
        ))}
      </div>

      {selectedCategory ? (
        <div className="products-grid">
          {categoriesMap[selectedCategory].map(({ productname, price, image }, index) => (
            <div className="product-card" key={index}>
              <img
                className="product-image"
                src={image}
                alt={productname}
                loading="lazy"
              />
              <div className="product-name">{productname}</div>
              <div className="product-price">₹{price.toFixed(2)}</div>
              <button
                className="add-to-cart-btn"
                onClick={() =>
                  handleAddToCart({ productname, price, image, category: selectedCategory })
                }
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No category selected.</p>
      )}
    </>
  );
};

export default ProductCategories;

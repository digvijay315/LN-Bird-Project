import React, { useState } from "react";
import { useCart } from "./context/cartcontext";
import Swal from 'sweetalert2';
import '../user/css/categoryproduct.css'

const ProductCategories = () => {


  const { setCartItems, cartItems } = useCart();
  
  const addtocart = (product) => {
    const existingItem = cartItems.find((item) => item._id === product._id);
    if (existingItem) {
      // If already in cart, increment quantity
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      );
    } else {
      // If not in cart, add with quantity 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    Swal.fire({
      title: 'Added to Cart!',
      text: `${product.name} has been added to your cart.`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };


  const dummyProducts = [
    {
      _id: 7,
      name: "Basmati Rice",
      price: 250,
      image: "https://www.jiomart.com/images/product/original/rvbzowg7fl/ahaar-2kg-basmati-rice-1kg-x-2-pack-product-images-orvbzowg7fl-p596097266-1-202308042139.jpg?im=Resize=(420,420)",
      category: "Rice & Grains",
    },
    {
      name: "Sona Masoori",
      price: 180,
      image: "https://images-cdn.ubuy.co.in/65451a48cd701572c400b259-royal-sona-masoori-medium-grain-white.jpg",
      category: "Rice & Grains",
    },
    {
      name: "Red Rajma",
      price: 120,
      image: "https://m.media-amazon.com/images/I/81IYVJJJJtL.jpg",
      category: "Pulses & Lentils",
    },
    {
      name: "Organic Turmeric Powder",
      price: 150,
      image: "https://organicindia.com/cdn/shop/products/492579990_Image1.jpg?v=1667894141",
      category: "Spices & Masalas",
    },
    {
      name: "Pure Desi Ghee",
      price: 450,
      image: "https://www.chandigarhorganics.com/wp-content/uploads/2022/01/IMG-20250208-WA0003.jpg",
      category: "Oil & Ghee",
    },
    {
      name: "Premium Green Tea",
      price: 350,
      image: "https://marveltea.com/cdn/shop/files/Lemon_Green_Tea_Bagt_940x-min_1e8ad299-685c-4133-ab92-44f68033296d_grande.webp?v=1724847740",
      category: "Tea & Coffee",
    },
    {
      name: "Dry Fruit Mix",
      price: 500,
      image: "https://rukminim2.flixcart.com/image/704/844/xif0q/nut-dry-fruit/k/o/j/425-dry-fruit-mix-panchmeva-superfood-1-mason-jar-farmley-original-imah3pwtubhwggza.jpeg?q=90&crop=false",
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
     
       <section className="popular-products-section">
      <h2>
        <span className="section-accent"></span>
        Popular Products
      </h2>
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
          {categoriesMap[selectedCategory].map((prod, index) => (
            <div className="product-card" key={index}>
              <img
                className="product-image"
                src={prod.image}
                alt={prod.productname}
                loading="lazy"
              />
              <div className="product-name">{prod.name}</div>
              <div className="product-price">₹{prod.price.toFixed(2)}</div>
              <button
                className="add-to-cart-btn"
                onClick={()=>addtocart(prod)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No category selected.</p>
      )}
      </section>
    </>
  );
};

export default ProductCategories;

import React, { useState } from "react";
import { useCart } from './cartcontext'
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
import "./Home.css";
import Footer from "./footer";
import { useEffect } from "react";
import axios from "axios";
import api from '../Components/api'
import Carousel from 'react-bootstrap/Carousel';
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';



function Home1() {

const {cart,setcart}=useCart()

  useEffect(()=>
  {
    getproduct()
  })

 
const[product1,setproduct1]=useState([])
  const getproduct=async()=>
  {
    try {
      const resp=await api.get("getproduct")
      setproduct1(resp.data.product)
      // setcart(resp.data.product)
      
    } catch (error) {
      console.log(error);
      
    }
  }
  
  const[fetchbanner,setfetchbanner]=useState([])
  const [sliderImages, setSliderImages] = useState([]);
  const [banners,setbanners] =useState([]);

  useEffect(() => {
    fetchSliderImages();
  }, []);

  const fetchSliderImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getAllBanners"); // Replace with your API endpoint
      setfetchbanner(response.data)
      // Filter only sliderBannerImage data
      const sliderData = response.data.filter((banner) => banner.sliderBannerImage);
      setSliderImages(sliderData);

      const productData = response.data.filter((banner) => banner.productBannerImage);
      setbanners(productData.flatMap((item) => item.productBannerImage)); // Derive banners directly
      
      

    } catch (error) {
      console.error("Error fetching slider images:", error);
    }
  };

  useEffect(() => {
    console.log("Banners updated:", banners);
  }, [banners]);
  









  
  




    const products = [
        { id: 1, name: "Vitamin C Face Wash (Brightens & Evens Skin Tone),100gm", price: "599/-", image: "https://www.richfeelnaturals.com/cdn/shop/files/vitamin-c-face-wash1_a2da8366-3d65-4193-b1f9-94a5b965206a.jpg?v=1718106105",  quantity: 1, },
        { id: 2, name: "Anti-Acne Face Wash – Clear, Blemish-Free Skin 100ml ", price: "299/-", image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/toner/1/j/0/100-vitamin-c-face-toner-brightening-even-toned-glowing-skin-20-original-imagykjh7vhazh5y.jpeg?q=90&crop=false",  quantity: 1, },
        { id: 3, name: "Gold Scrub Face Wash – Radiance and Renewal in Every Wash 100ml ", price: "349/-", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ42UXP9vdgdvl5INwaQzAnjlX6MNQZQBSj-w&s",  quantity: 1, },
        { id: 4, name: "Anti Hair fall Shampoo (Strengthens and Fortifies) 200ml ", price: "499/-", image: "https://www.ayouthveda.com/cdn/shop/files/Antihairfallshampooecommerce-03_1800x1800.jpg?v=1686936228" ,  quantity: 1,},
        
      ];

      const products1 = [
        { id: 1, name: "Rosemary hair oil(Stimulates Hair Growth,Prevents Hair Fall) 100ml ", price: "599/-", image: "https://m.media-amazon.com/images/I/31UXwtknKHL.jpg",  quantity: 1, },
        { id: 2, name: "Hair Serum For(Nourishes & Conditions,Frizz Control) 100ml  ", price: "299/-", image: "https://www.mcaffeine.com/cdn/shop/files/card_1_9dabaa46-daa8-4ff4-b2ba-9aae5c561d52.jpg?v=1717154284",  quantity: 1, },
        { id: 3, name: "Gluta Soap (	Anti-inflammatory & Healing)  85gm  ", price: "349/-", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ42UXP9vdgdvl5INwaQzAnjlX6MNQZQBSj-w&s",  quantity: 1, },
        { id: 4, name: "Anti Hair fall Shampoo (Strengthens and Fortifies) 200ml ", price: "499/-", image: "https://www.ayouthveda.com/cdn/shop/files/Antihairfallshampooecommerce-03_1800x1800.jpg?v=1686936228",  quantity: 1, },
        
      ];
    
      const products2 = [
        { id: 1, name: "Combo(Soap + Anti Acne Face wash + Vitamin C face wash)  ", price: "2000/-", image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/face-wash/n/e/f/600-charcoal-vitamin-c-and-anti-acne-face-wash-combo-pack-original-imagvsrsyznf2cxf.jpeg?q=90&crop=false",  quantity: 1, },
        { id: 2, name: "Commbo For(Soap + Anti Acne face wash + Gold Scrub face wash) ", price: "2100/-", image: "https://www.ayouthveda.com/cdn/shop/files/Artboard2-100-min_3a4b56ed-9203-4dac-bc77-2297c96e01dd_1800x1800.jpg?v=1714455460",  quantity: 1, },
        { id: 3, name: "Combo (	Gold Scrub face wash + Vitamin C Face wash + Anti Acne face wash)  ", price: "1700/-", image: "https://m.media-amazon.com/images/I/815ayrekxUL._AC_UF1000,1000_QL80_.jpg",  quantity: 1, },
        { id: 4, name: "Combo(Hair Serum + Hair oil + Anti hair fall Shampoo) ", price: "2200/-", image: "https://products.drbatras.com/cdn/shop/products/pro-hair-fall-control-regime-shampoo-conditioner-hair-oil-hair-fall-serum-619381.jpg?v=1701180812",  quantity: 1, },
        
      ];
    
      const products3 = [
        { id: 1, name: "Combo(Shampoo + hair oil + Soap)  ", price: "2000/-", image: "https://m.media-amazon.com/images/I/51K0Vy3VbjL.jpg",  quantity: 1, },
        { id: 2, name: "Commbo For(Shampoo + Hair oil + Vitamin C Face wash) ", price: "2100/-", image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/combo-kit/w/z/l/lati-hair-care-and-face-care-kit-hair-oil-shampoo-hair-original-imagretefgfhuzyf.jpeg?q=90&crop=false",  quantity: 1, },
        { id: 3, name: "Combo (	Shampoo + Hair oil + Gold Scrub)  ", price: "1700/-", image: "https://mridulmadhok.in/cdn/shop/products/WhatsAppImage2021-12-31at4.07.04AM.jpg?v=1640996010",  quantity: 1, },
        { id: 4, name: "Combo(Hair Serum + Hair oil + Anti hair fall Shampoo) ", price: "2200/-", image: "https://products.drbatras.com/cdn/shop/products/pro-hair-fall-control-regime-shampoo-conditioner-hair-oil-hair-fall-serum-619381.jpg?v=1701180812",  quantity: 1, },
        
      ];

      

      const handleprouctadd = (product) => {
        // Check if the product already exists in the cart
        const isProductInCart = cart.some((item) => item._id === product._id);
      
        if (!isProductInCart) {
          // Add the product to the cart if it's not already present
          setcart([...cart, product]);
        } else {
          Swal.fire({
                        title: 'Error!',
                        text: 'Product alredy in your cart',
                        icon: 'Error',
                        confirmButtonText: 'OK',
                      });
        }
      };
    



    //   const handleprouctadd = (product) => {
    //     console.log('Adding product to cart:', product);
    //     setcart([...cart, product]);
    //   };
    // console.log(cart);
    // console.log(cart.length);


    const reviews = [
      {
        name: "John Doe",
        review: "This product has changed my life! Highly recommended.",
        image: "https://via.placeholder.com/100",
        rating: 5,
      },
      {
        name: "Jane Smith",
        review: "Amazing quality and great results. Will buy again!",
        image: "https://via.placeholder.com/100",
        rating: 4,
      },
      {
        name: "Mike Johnson",
        review: "Excellent customer service and fast delivery.",
        image: "https://via.placeholder.com/100",
        rating: 4,
      },
      {
        name: "Sarah Lee",
        review: "The best investment I’ve made for my skin care routine.",
        image: "https://via.placeholder.com/100",
        rating: 5,
      },
    ];
  
    // Function to render stars based on rating
    const renderStars = (rating) => {
      const totalStars = 5;
      const stars = [];
      for (let i = 1; i <= totalStars; i++) {
        stars.push(
          <i
            key={i}
            className={`bi bi-star${i <= rating ? "-fill" : ""}`}
            style={{
              color: i <= rating ? "#ffc107" : "#ddd",
              marginRight: "3px",
            }}
          ></i>
        );
      }
      return stars;
    };


   
    


  return (
    <div>
        <Header/>
        {/* <div className="container d-flex" style={{ marginTop: "10rem" }}>
     
        <div
  style={{
    width: "250px",
    backgroundColor: "#f4f4f4",
    padding: "20px",
    borderRight: "1px solid #ddd",
    height: "60vh", 
    display: "flex",
    flexDirection: "column", 
  }}
>
  <h5 style={{ fontWeight: "bold", color: "#006400",textAlign:"center" }}>PRODUCTS</h5>
  <ul style={{listStyleType:"none",lineHeight:"40px",cursor:"pointer",textDecoration:"none"}}>
    <li ><Link to={'/vitamincfacewash'} style={{textDecoration:"none",color:"black"}}>Vitamin C Face Wash</Link></li>
    <li> <Link to={'/antiacnefacewash'} style={{textDecoration:"none",color:"black"}}>Anti-Acne Face Wash </Link></li>
    <li> <Link to={'/goldscrubfacewash'}style={{textDecoration:"none",color:"black"}}>Gold Scrub Face Wash </Link></li>
    <li> <Link to={'/antihairfallshampoo'} style={{textDecoration:"none",color:"black"}} >Anti Hair fall Shampoo</Link></li>
    <li><Link to={'/Rosemaryhairoil'} style={{textDecoration:"none",color:"black"}}>Rosemary hair oil </Link></li>
    <li><Link to={'/hairserum'} style={{textDecoration:"none",color:"black"}}>Hair Serum  </Link></li>
    <li><Link to={'/glutasoap'} style={{textDecoration:"none",color:"black"}}>Gluta Soap </Link></li>
    
  </ul>
     
      
      
   
</div>



        
        <div style={{ flex: 1, padding: "20px" }}>
          
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
            </div>
            <div className="carousel-inner">
             
              <div className="carousel-item active">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    padding: "20px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "10px",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <img
                    src="https://img.freepik.com/free-psd/aloe-vera-natural-cosmetics-banner-template-design_23-2148951958.jpg?t=st=1732791814~exp=1732795414~hmac=8ae9d831e9a2e4f306b59f7d22839838137cf57efb5d27c6567d64bdd798a707&w=826"
                    alt="Product 1"
                    style={{
                      Height: "100px",
                      maxWidth: "100%",
                     
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                
                </div>
              </div>
              
              <div className="carousel-item">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    padding: "20px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "10px",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <img
                    src="https://img.freepik.com/free-psd/aloe-vera-natural-cosmetics-banner-template-design_23-2148951958.jpg?t=st=1732791814~exp=1732795414~hmac=8ae9d831e9a2e4f306b59f7d22839838137cf57efb5d27c6567d64bdd798a707&w=826"
                    alt="Product 2"
                    style={{
                      Height: "100px",
                      maxWidth: "100%",
                      
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
            
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
              
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden"style={{color:"black"}} >Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div> */}

{/* banner start----------------------------------------------------------------------------------------------- */}

<Carousel data-bs-theme="dark" style={{ marginTop: "9rem" }}>
      {sliderImages.map((banner, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={banner.sliderBannerImage} // Assuming `sliderBannerImage` is the URL
            alt={`Slide ${index + 1}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>





{/* <Carousel data-bs-theme="dark" style={{marginTop:"9rem"}}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.simpleskincare.in/cdn/shop/files/Desktop_Homepage_1360x512_e57f7152-84d4-456c-9c12-cb89ff4ffb91.jpg?v=1711025111"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.simpleskincare.in/cdn/shop/files/Desktop_Homepage_1360x512_3.jpg?v=1712916114"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.simpleskincare.in/cdn/shop/files/Desktop_Homepage_1360x512_d685c4ec-0490-4f3c-aab0-85708fc74936.jpg?v=1713161048"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel> */}


{/* banner main end--------------------------------------------------------------------------------------------- */}


{/* content start------------------------------------------------------------------- */}
<div style={{ padding: "40px", backgroundColor: "#f9f9f9",marginBottom:"3rem",marginTop:"3rem" }}>
      <h1
        style={{
          fontSize: "36px",
          fontFamily: "'Times New Roman', serif",
          fontWeight: "bold",
          color: "#222",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Kiona Skin Care: Embrace Your Natural Glow
      </h1>
      <p
        style={{
          fontSize: "17px",
          fontFamily: "Georgia, serif",
          color: "#444",
          lineHeight: "1.8",
          textAlign: "center",
          margin: "0 auto",
          maxWidth: "800px",
        }}
      >
      Founded in 2020 by a team of skincare professionals and holistic health
        experts, <strong>Kiona Skin Care</strong> was born out of a passion to bring
        back the purity of nature to your skincare routine. In a world where
        harsh chemicals dominate, we believe in the power of organic and
        plant-based ingredients that nurture and protect your skin.<strong>Our products,
        including face washes, shampoos, and serums, are crafted with love and
        care, using only the finest natural ingredients.</strong> 
      </p>
    </div>



{/* content end--------------------------------------------------------------------------- */}

{/* product cart section------------------------------------------------------------------------------------- */}


<div className="grocery-container">
<h2 className="grocery-heading">Our Products</h2>
<div className="grocery-row">
{product1.map((product, index) => {
// console.log(`Rendering product at index: ${index}`); // Debug log

return (
<React.Fragment key={product.id}>
{/* Render product card */}
<div
className="col-md-2"
style={{
width: "250px", // Fixed width
height: "400px", // Fixed height
backgroundColor: "#fff",
padding: "20px",
border: "1px solid #ddd",
borderRadius: "10px",
boxShadow: "0 6px 10px rgba(0, 0, 0, 0.1)",
display: "flex",
flexDirection: "column",
justifyContent: "space-between",
flex: "0 0 auto",
}}
>
<img
src={product.product_image}
alt={product.product_name}
className="grocery-card-image"
/>
<span className="grocery-card-name">{product.product_name}</span>
<p className="grocery-card-price">MRP: ₹{product.product_price}</p>
<button
onClick={() => handleprouctadd(product)}
className="grocery-card-button"
style={{ cursor: "pointer" }}
>
Add to Cart
</button>
</div>


{/* Add banner after every 4th product */}
{(index + 1) % 4 === 0 && banners.length > 0 && (
  <div className="banner" style={{ width: "100%", marginTop: "20px" }}>
    <img
      className="img-fluid"
      src={banners[(Math.floor((index + 1) / 4) - 1) % banners.length]} // Ensure valid index even for single image
      alt={`banner-${(Math.floor((index + 1) / 4) - 1) % banners.length}`}
      style={{ marginTop: "3rem", marginBottom: "3rem" }}
    />
  </div>
)}

</React.Fragment>
);
})}
</div>
</div>





{/* our stander start------------------------------------------------------------------------------- */}

<div className="row" style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginTop: "6rem", marginLeft: "3rem", marginRight: "3rem" }}>
  <h2 style={{textAlign:"center"}}>Everything your skin needs,<br/>
  Nothing it doesn’t</h2>
        <div className="col-md-3" style={{ flex: 1, textAlign: 'center', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '10px', border: '1px solid #ddd', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height: '15rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className="icon-circle">
            <i className="fa-solid fa-seedling" style={{ fontSize: '40px', color: '#fff' }}></i>
          </div>
          <h4 style={{ marginTop: '10px', color: '#333' }}>Spiritually Infused</h4>
        </div>
        <div className="col-md-3" style={{ flex: 1, textAlign: 'center', padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '10px', border: '1px solid #ddd', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height: '15rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className="icon-circle">
            <i className="fa-solid fa-flask" style={{ fontSize: '40px', color: '#fff' }}></i>
          </div>
          <h4 style={{ marginTop: '10px', color: '#333' }}>Skin Safe Tested</h4>
        </div>
        <div className="col-md-3" style={{ flex: 1, textAlign: 'center', padding: '20px', backgroundColor: '#fff3e0', borderRadius: '10px', border: '1px solid #ddd', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height: '15rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className="icon-circle">
            <i className="fa-solid fa-cat" style={{ fontSize: '40px', color: '#fff' }}></i>
          </div>
          <h4 style={{ marginTop: '10px', color: '#333' }}>Ethically Tested</h4>
        </div>
        <div className="col-md-3" style={{ flex: 1, textAlign: 'center', padding: '20px', backgroundColor: '#c8e6c9', borderRadius: '10px', border: '1px solid #ddd', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height: '15rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className="icon-circle">
            <i className="fa-brands fa-pagelines" style={{ fontSize: '40px', color: '#fff' }}></i>
          </div>
          <h4 style={{ marginTop: '10px', color: '#333' }}>Free from Parabens</h4>
        </div>
      </div>

      {/* second row */}
      <div className="row" style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginTop: "3rem", marginLeft: "3rem", marginRight: "3rem" }}>
        <div className="col-md-3" style={{ flex: 1, textAlign: 'center', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '10px', border: '1px solid #ddd', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height: '15rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className="icon-circle">
            <i className="fa-brands fa-canadian-maple-leaf" style={{ fontSize: '40px', color: '#fff' }}></i>
          </div>
          <h4 style={{ marginTop: '10px', color: '#333' }}>100% Plant Based</h4>
        </div>
        <div className="col-md-3" style={{ flex: 1, textAlign: 'center', padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '10px', border: '1px solid #ddd', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height: '15rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className="icon-circle">
            <i className="fa-solid fa-flask-vial" style={{ fontSize: '40px', color: '#fff' }}></i>
          </div>
          <h4 style={{ marginTop: '10px', color: '#333' }}>No Harsh Surfactants</h4>
        </div>
        <div className="col-md-3" style={{ flex: 1, textAlign: 'center', padding: '20px', backgroundColor: '#fff3e0', borderRadius: '10px', border: '1px solid #ddd', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height: '15rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className="icon-circle">
            <i className="fa-solid fa-leaf" style={{ fontSize: '40px', color: '#fff' }}></i>
          </div>
          <h4 style={{ marginTop: '10px', color: '#333' }}>All Natural Ingredients</h4>
        </div>
        <div className="col-md-3" style={{ flex: 1, textAlign: 'center', padding: '20px', backgroundColor: '#c8e6c9', borderRadius: '10px', border: '1px solid #ddd', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', height: '15rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className="icon-circle">
            <i className="fa-solid fa-droplet" style={{ fontSize: '40px', color: '#fff' }}></i>
          </div>
          <h4 style={{ marginTop: '10px', color: '#333' }}>PH Neutral</h4>
        </div>
      </div>











{/*our stander end-----------------------------------------------------------------------------------  */}

{/* revie */}

<Container fluid style={{ padding: "40px", backgroundColor: "#f9f9f9" }}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "32px",
          color: "#333",
          fontWeight: "bold",
        }}
      >
        Customer Reviews
      </h2>

      <Carousel interval={3000} indicators={true} controls={true}>
        {/* Render 2 reviews per slide */}
        {reviews.reduce((result, _, index) => {
          if (index % 2 === 0) {
            result.push(reviews.slice(index, index + 2));
          }
          return result;
        }, []).map((slide, idx) => (
          <Carousel.Item key={idx}>
            <Row
              className="d-flex justify-content-center"
              style={{ padding: "20px" }}
            >
              {slide.map((review, i) => (
                <Col
                  key={i}
                  md={5}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    padding: "20px",
                    margin: "10px",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={review.image}
                    alt={review.name}
                    style={{
                      borderRadius: "50%",
                      width: "80px",
                      height: "80px",
                      marginBottom: "10px",
                    }}
                  />
                  <h4 style={{ color: "#222", fontWeight: "bold" }}>
                    {review.name}
                  </h4>
                  <div style={{ marginBottom: "10px"}}>
                    {renderStars(review.rating)}
                  </div>
                  <p style={{ fontStyle: "italic", color: "#555" }}>
                    "{review.review}"
                  </p>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>


{/* content */}

<div
  style={{
    background: "linear-gradient(180deg, #FFD54F 0%, #FFF176 50%, #FFFFFF 100%)",
    minHeight: "20rem",
  }}
>
  <div className="container-lg py-5">
    <div className="row g-4 justify-content-center">
      {/* Card 1 */}
      <div className="col-12 col-sm-6 col-md-6 col-lg-4">
        <div className="border rounded p-4 text-center shadow bg-light h-100 d-flex flex-column justify-content-between">
          <i className="fa-solid fa-credit-card" style={{ fontSize: "4rem", color: "#007bff" }}></i>
          <div>
            <h4 className="fw-bold">Secure Transactions</h4>
            <p>Your payment information is processed securely.</p>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="col-12 col-sm-6 col-md-6 col-lg-4">
        <div className="border rounded p-4 text-center shadow bg-light h-100 d-flex flex-column justify-content-between">
          <i className="fa-solid fa-truck-fast" style={{ fontSize: "4rem", color: "#28a745" }}></i>
          <div>
            <h4 className="fw-bold">Zero-Hassle Shipping</h4>
            <p>Brisk shipping and no-worries returns. Fast and reliable shipping!</p>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="col-12 col-sm-6 col-md-6 col-lg-4">
        <div className="border rounded p-4 text-center shadow bg-light h-100 d-flex flex-column justify-content-between">
          <i className="fa-solid fa-phone" style={{ fontSize: "4rem", color: "#ffc107" }}></i>
          <div>
            <h4 className="fw-bold">We Love To Talk</h4>
            <p>Call, email, drop a note. You'll find us there on the other side.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>








{/* content end */}



{/* <div className="grocery-container">
      <h2 className="grocery-heading">Our Products</h2>
      <div className="grocery-row">
        {products.map((product) => (
          <div key={product.id} className="grocery-card">
            <img
              src={product.image}
              alt={product.name}
              className="grocery-card-image"
            />
            <span className="grocery-card-name">{product.name}</span>
            <p className="grocery-card-price" >MRP:₹{product.price}</p>
            <button onClick={()=>handleprouctadd(product)} className="grocery-card-button" style={{cursor:"pointer"}}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div> */}





{/* product cart section end---------------------------------------------------------------------------------- */}

{/* banner image------------------------------------------------------------------------------------------------ */}

{/* <div className="container">
  <div className="row">
    <div className="col">
      <img src="https://www.reneecosmetics.in/cdn/shop/files/1000693230.jpg?v=1732552425&width=1500" alt="banner-image" className="img-fluid" style={{marginTop:"3rem",marginBottom:"3rem"}}></img>

    </div>
  </div>
</div> */}
{/* banner image end---------------------------------------------------------------------------------------------- */}

{/* 2product cart------------------------------------------------------------------------------------------------ */}

{/* <div className="grocery-container">
  <div className="grocery-row">
    {products1.map((product, index) => (
      <React.Fragment key={product.id}>
        
        <div className="grocery-card">
          <img
            src={product.image}
            alt={product.name}
            className="grocery-card-image"
          />
          <span className="grocery-card-name">{product.name}</span>
          <p className="grocery-card-price">MRP: ₹{product.price}</p>
          <button
            onClick={() => handleprouctadd(product)}
            className="grocery-card-button"
            style={{ cursor: 'pointer' }}
          >
            Add to Cart
          </button>
        </div>

       
        {index % 4 === 3 && (
          <div className="banner" style={{ width: "100%" }}>
        
            <img
              src="https://i.ytimg.com/vi/eHikFbUGGLo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA29x2AFD34qcuNP3dNw2wqfqV_YQ"
              alt="banner"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        )}
      </React.Fragment>
    ))}
  </div>
</div> */}



{/* 2 product cart end-------------------------------------------------------------------------------------------- */}

{/* product banner2 start----------------------------------------------------------------------------------------- */}

{/* <div className="container">
  <div className="row">
    <div className="col">
      <img src="https://images-static.nykaa.com/uploads/fb6935ac-7488-42d2-9d82-ce95f5332dec.jpg?tr=cm-pad_resize,w-1200" alt="banner-image" className="img-fluid" style={{marginTop:"3rem",marginBottom:"3rem"}}></img>

    </div>
  </div>
</div> */}

{/* product banner2 end------------------------------------------------------------------------------------------ */}

{/* product 3 cart----------------------------------------------------------------------------------------------- */}

{/* <div className="grocery-container">
      <h2 className="grocery-heading">Combo Products</h2>
      <div className="grocery-row">
        {products2.map((product) => (
          <div key={product.id} className="grocery-card">
            <img
              src={product.image}
              alt={product.name}
              className="grocery-card-image"
            />
            <span className="grocery-card-name">{product.name}</span>
            <p className="grocery-card-price" >MRP:₹{product.price}</p>
            <button onClick={()=>handleprouctadd(product)} className="grocery-card-button" style={{cursor:"pointer"}}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div> */}
{/* product 3 cart end--------------------------------------------------------------------------------------------- */}

{/* product banner 3-------------------------------------------------------------------------------------------- */}
{/* <div className="container">
  <div className="row">
    <div className="col">
      <img src="https://images-static.nykaa.com/uploads/1d08680f-7dc3-4c4b-a3a6-c129cd89a952.jpg?tr=cm-pad_resize,w-1200" alt="banner-image" className="img-fluid" style={{marginTop:"3rem",marginBottom:"3rem"}}></img>

    </div>
  </div>
</div> */}

{/* product banner 3 end---------------------------------------------------------------------------------------- */}

{/* product cart 4 start---------------------------------------------------------------------------------------- */}

{/* <div className="grocery-container">
      <div className="grocery-row">
        {products3.map((product) => (
          <div key={product.id} className="grocery-card">
            <img
              src={product.image}
              alt={product.name}
              className="grocery-card-image"
            />
            <span className="grocery-card-name">{product.name}</span>
            <p className="grocery-card-price" >MRP:₹{product.price}</p>
            <button onClick={()=>handleprouctadd(product)} className="grocery-card-button" style={{cursor:"pointer"}}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div> */}

{/* product cart 4 end------------------------------------------------------------------------------------------- */}


<Footer/>


    </div>
  )
}

export default Home1
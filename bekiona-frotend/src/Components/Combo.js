import React, { useEffect, useState } from 'react';
import api from '../Components/api'
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { useCart } from './cartcontext'
import Swal from 'sweetalert2';
import Footer from './footer';
import Carousel from 'react-bootstrap/Carousel';

function Combo() {

     const {cart,setcart}=useCart()

    const[comboproduct,setcomboproduct]=useState([])
    const[fetchbanner,setfetchbanner]=useState([])
    const [sliderImages, setSliderImages] = useState([]);
    const [banners,setbanners] =useState([]);

    const allproduct=async()=>
    {
        const resp= await api.get('getproduct')
        setcomboproduct(resp.data.product.filter((item)=>item.product_type==="combo"))
    }

    useEffect(()=>
    {   
        allproduct()
    },[])
    console.log(comboproduct);

     const navigate=useNavigate()
        
            const handleProductClick = (id) => {
              navigate(`/product/${id}`); // Navigate to specific product details page
            };
    
    
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

                  const truncateText = (text, maxLength) => {
                    if (text.length > maxLength) {
                      return text.substring(0, maxLength) + " ...";
                    }
                    return text;
                  };




                  
                
                  useEffect(() => {
                    fetchSliderImages();
                  }, []);
                
                  const fetchSliderImages = async () => {
                    try {
                      const response = await api.get("getAllBanners"); // Replace with your API endpoint
                      console.log(response);
                      
                      setfetchbanner(response.data.banner)
                      // Filter only sliderBannerImage data
                      const sliderData = response.data.banner.filter((banner) => banner.sliderBannerImage);
                      setSliderImages(sliderData);
                
                      const productData = response.data.banner.filter((banner) => banner.productBannerImage);
                      setbanners(productData.flatMap((item) => item.productBannerImage)); // Derive banners directly
                      
                      
                
                    } catch (error) {
                      console.error("Error fetching slider images:", error);
                    }
                  };
                
                  useEffect(() => {
                    console.log("Banners updated:", banners);
                  }, [banners]);
                        


    
  return (
    <div>
      <Header/>



      {/* banner start----------------------------------------------------------------------------------------------- */}

<div className="container-fluid p-0">
  <Carousel data-bs-theme="dark" style={{marginTop:"100px",position:"relative"}}>
    {sliderImages.map((banner, index) => (
      <Carousel.Item key={index}>
        <img
          className="d-block w-100 img-fluid"
          src={banner.sliderBannerImage}
          alt={`Slide ${index + 1}`}
          style={{
            objectFit: "cover",
            height: "100%", 
            maxHeight: "500px", // Maximum height for larger screens
          }}
          onClick={() => window.location.href = banner.bannerLink}
        />
      </Carousel.Item>
    ))}
  </Carousel>
</div>





      <div
  className="grocery1"
  style={{
    marginTop: "5rem",
    backgroundColor: "#fcf7ee", 
    overflow: "hidden", // Prevents scrolling
  }}
>
  <div className='container'>
  <div
    className="row"
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      overflow: "hidden", // Prevents unwanted scrolling
      padding: "20px",
      boxSizing: "border-box", // Ensures padding/border doesn't cause overflow
    }}
  >
  {comboproduct.map((product, index) => (
       <React.Fragment key={product.id}>
         <div
         key={product.id}
         className="col-12 col-sm-6 col-md-4 col-lg-3"
         style={{
           height: "550px",
           background: "transparent",
           display: "flex",
           justifyContent: "center",
           alignItems: "center",
         }}
       >
         <div
           className="grocery-card"
           style={{
             width: "100%",
             maxWidth: "300px",
             backgroundColor: "#fff",
             padding: "15px",
             border: "1px solid #ddd",
             borderRadius: "10px",
             display: "flex",
             flexDirection: "column",
             justifyContent: "center",
             alignItems: "center",
             textAlign: "center",
             position: "relative",
             overflow: "hidden",
             transition: "transform 0.3s ease, box-shadow 0.3s ease",
           }}
           onMouseEnter={(e) => {
             e.currentTarget.style.transform = "scale(1.05)";
             e.currentTarget.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.2)";
           }}
           onMouseLeave={(e) => {
             e.currentTarget.style.transform = "scale(1)";
             e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
           }}
         >
           <div style={{ position: "relative", width: "100%" }}>
             <img
               src={product.product_image}
               alt={product.product_name}
               className="grocery-card-image img-fluid"
               style={{
                 width: "100%",
                 height: "270px",
                 objectFit: "cover",
                 cursor: "pointer",
                 transition: "transform 0.3s ease",
                 borderRadius: "10px",
               }}
               onClick={() =>
                 navigate("/vitamincfaceash", { state: product._id })
                 }
             />
           </div>
           <span
   className="grocery-card-name"
   style={{
     fontSize: "1rem",
     height: "3rem",
     fontWeight: "bold",
     color: "#333",
     marginTop: "10px",
     display: "-webkit-box",
     WebkitBoxOrient: "vertical",
     WebkitLineClamp: 2,
     overflow: "hidden",
     maxWidth: "90%",
     fontFamily: "'ITC Modern No 216', serif",
   }}
 >
   {truncateText(product.product_name, 30)} {/* Adjust maxLength as needed */}
 </span>
           <div
             className="grocery-card-rating"
             style={{
               fontSize: "1rem",
               color: "#ffc107",
               margin: "5px 0",
               display: "flex",
               justifyContent: "center",
             }}
           >
             {"★".repeat(product.rating)}
             <span style={{ color: "#ccc", marginLeft: "5px" }}>
               {"★".repeat(5 - product.rating)}
             </span>
           </div>
           <p
             className="grocery-card-price"
             style={{
               fontSize: "1rem",
               color: "#666",
               marginTop: "5px",
             }}
           >
             ₹{product.product_price}
           </p>
           <button
             onClick={() => handleprouctadd(product)}
             className="add-to-cart-btn"
             style={{
               backgroundColor: "#c8b89a",
               color: "white",
               border: "none",
               padding: "12px 30px",
               borderRadius: "5px",
               fontSize: "0.9rem",
               cursor: "pointer",
               transition: "all 0.3s ease",
               marginTop: "10px",
               width: "80%",
               fontWeight: "bold",
             }}
           >
             Add to Cart
           </button>
         </div>
       </div>
       </React.Fragment>
     ))}
  </div>
  </div>
</div>


              <Footer/>

    </div>
  )
}

export default Combo
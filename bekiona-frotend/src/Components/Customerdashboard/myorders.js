import React, { useEffect, useState } from 'react'
import api from '../api'
import Sidebarcu from './Sidebarcu'
import Cuheader from './Cuheader'

function Myorders() {

         const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
          const toggleSidebar = () => {
            setIsSidebarCollapsed(!isSidebarCollapsed);
          };
        







    const email=localStorage.getItem('email')
    const[allorders,setallorders]=useState([])

    const getallorders=async()=>
    {
        const resp=await api.get(`viewordersbyemail/${email}`)
        setallorders(resp.data.order)
        
    }


    useEffect(()=>
    {
        getallorders()
    },[])
  return (
    <div>
    <div>
      <Sidebarcu />
    </div>
  
    <div
      style={{
        marginLeft: "260px",
        marginTop: "-100px",
        position: "relative",
      }}
    >
      <Cuheader />
    </div>
  
    <div
      style={{
        marginLeft: isSidebarCollapsed ? "80px" : "250px",
        transition: "margin-left 0.3s ease",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        fontFamily: "'Roboto', sans-serif",
        color: "#333",
        marginTop: "100px",
      }}
    >
      <div
        style={{
          maxWidth: "800px", // Increased width
          margin: "auto",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
          marginTop: "100px",
        }}
      >
        {allorders.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              backgroundColor: "#fff",
              margin: "20px auto",
              padding: "20px",
              maxWidth: "800px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            {/* Order Header */}
            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#555",
              }}
            >
              {item.email} shared this order with you.
            </div>
  
            {/* Order Details */}
            <div>
              {Array.isArray(item.cartItems) && item.cartItems.length > 0 ? (
                item.cartItems.map((cartItem, cartIndex) => (
                  <div
                    key={cartIndex}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      borderBottom: "1px solid #e0e0e0",
                      paddingBottom: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    {/* Product Image */}
                    <img
                      src={cartItem.product_image}
                      alt={cartItem.product_name || "Product Image"}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                      }}
                    />
  
                    {/* Product Info */}
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          marginBottom: "5px",
                          color: "#333",
                        }}
                      >
                        {cartItem.product_name}
                      </h3>
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#28a745",
                        }}
                      >
                        ₹ {cartItem.product_price}
                      </p>
                    </div>
  
                    {/* Delivery Status */}
                    <div style={{ textAlign: "right" }}>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#555",
                          marginBottom: "5px",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            width: "8px",
                            height: "8px",
                            backgroundColor: "#28a745",
                            borderRadius: "50%",
                            marginRight: "5px",
                          }}
                        ></span>
                        Delivered on {cartItem.delivery_date}
                      </p>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#888",
                        }}
                      >
                        {cartItem.delivery_message}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: "14px", color: "#555" }}>
                  No cart items available
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  
  )
}

export default Myorders
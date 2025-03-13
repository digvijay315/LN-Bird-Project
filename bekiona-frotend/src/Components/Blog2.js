import React, { useState, useEffect } from "react";
import Header from './Header'
import { useLocation } from 'react-router-dom';
import api from '../Components/api'
import Footer from "./footer";



function Blog2() {


     const location = useLocation()
      const id = location.state || {}
      console.log(id);
      

      const[blog,setBlogs]=useState([])
      const getblog=async()=>
      {
        try {
          const resp=await api.get(`getblogbyid/${id}`)
          console.log(resp);
          
          setBlogs(resp.data.blog)
    
        } catch (error) {
          console.log(error);
          
        }
      }
      useEffect(()=>
      {
        getblog()
      },[id])
      
      
 


  return (
    <div>
        <Header/>
        <div
  style={{
    backgroundColor:"rgba(223, 255, 191, 0.18)",
    fontFamily: "Arial, sans-serif",
    padding: "40px",
    marginTop: "8rem",
  }}
>
  {/* <div style={{ textAlign: "center", marginBottom: "40px" }}></div> */}
  <div className="row">
    {blog.map((post, index) => (
      <div className="col-md-12" key={index}>
        <div
          // style={{
          //   display: "flex",
          //   flexDirection: "column",
          //   height: "100%",
          //   padding: "10px", // Adds spacing around the content
          //   backgroundColor: "#fff", // Background color for better contrast
          //   borderRadius: "10px", // Optional rounded corners
          //   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Shadow for a clean look
          //   overflow: "hidden",
          // }}
        >
          <img
            src={post.image}
            alt={`Blog ${index + 1} Image`}
            style={{
              width: "100%", // Ensures image spans full container width
              height: "auto", // Fixed height for uniformity
              objectFit: "cover", // Ensures image is cropped nicely
              borderRadius: "10px 10px 0 0", // Rounded corners only at the top
              display: "block", // Removes inline gaps
            }}
          />
          <div style={{ padding: "10px",textAlign:"center" }}>
            <h5
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
                margin: "10px 0",
              }}
            >
              {post.title}
            </h5>
            <p
              style={{
                color: "#6c757d", // Muted text color
                fontSize: "0.9rem",
                marginBottom: "10px",
              }}
            >
              {post.date}
            </p>
            <p
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden",
                fontSize: "0.95rem",
                lineHeight: "1.5",
                color: "#333",
              }}
            >
              {post.description}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

<Footer />


    </div>
  )
}

export default Blog2
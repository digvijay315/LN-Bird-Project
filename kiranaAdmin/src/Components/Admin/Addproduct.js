import React, { useState } from "react";
import Sidebar from './Sidebar'
import "bootstrap/dist/css/bootstrap.min.css";
import "react-quill/dist/quill.snow.css"; // ReactQuill styles
import ReactQuill from "react-quill";
import axios from "axios";
import Swal from 'sweetalert2';
import api from '../api'

function Addproduct() {

 


    const [product, setproduct] = useState({
        product_code: "",
        product_name: "",
        product_description: "",
        product_brand: "",
        product_category: "",
        product_subcategory: "",
        product_mrp: "",
        product_sellingprice: "",
        product_discount: "",
        product_stockquantity: "",
        product_nutritionalinformation: [],
        product_image: [],
        product_quantity1: 1,

      });
      
      
      const [benefitInput, setBenefitInput] = useState("");

      const handleAddBenefit = () => {
        if (benefitInput.trim() !== "") {
            setproduct((prevData) => ({
            ...prevData,
            product_nutritionalinformation: [...prevData.product_nutritionalinformation, benefitInput],
          }));
          setBenefitInput(""); // Clear input field
        }
      };

       // Delete a benefit by index
  const handleDeleteBenefit = (indexToDelete) => {
    setproduct((prevData) => ({
      ...prevData,
      product_nutritionalinformation: prevData.product_nutritionalinformation.filter(
        (_, index) => index !== indexToDelete
      ),
    }));
  };


 
   
    
    const handleImageChange = (event) =>
    {
     
      const files = Array.from(event.target.files)
      setproduct({...product,product_image:files})

    }
      const handleDescriptionChange = (value) => {
        setproduct({ ...product, product_description: value });
      };
    
    
   
    
      const handleSubmit = async () => {
        try {
          // Retrieve token from localStorage (or sessionStorage)
          const token = localStorage.getItem('token');
          console.log(token);
          
      
          // Check if the token exists
          if (!token) {
            Swal.fire({
              title: 'Error!',
              text: 'You must be logged in to add a product.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
            return;
          }
      
          // Send the POST request with token in Authorization header
          const resp = await api.post("addproduct", product, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
            },
          });
      
          if (resp.status === 200) {
            Swal.fire({
              title: 'Success!',
              text: 'Product saved successfully!',
              icon: 'success',
              confirmButtonText: 'OK',
            });
          }
        } catch (error) {
          console.error("Error while saving product:", error.response || error.message);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to save product. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      };
      
      
console.log(product.product_image);




    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
      };
    
  return (
    <div>
      <Sidebar/>

      <div
        style={{
          marginLeft: isSidebarCollapsed ? "80px" : "250px",
          transition: "margin-left 0.3s ease",
          padding: "20px",
          flexGrow: 1,
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
        }}
      >
   <div className="container mt-4">
      <h2 className="mb-4" style={{textAlign:"center"}}>Add New Product</h2>
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div
            style={{
              background: "white",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              padding: "20px",
            }}
          >
           

            <div className="mb-3">
                <label className="form-label">Product Code</label>
                <input
                  type="number"
                  name="Productcode"
                  className="form-control"
                  
                  onChange={(e)=>setproduct({...product,product_code:e.target.value})}
                  placeholder="Enter Productcode"
                  required
                />
              </div>
              {/* Product Name */}
              <div className="mb-3">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  className="form-control"
                 
                  onChange={(e)=>setproduct({...product,product_name:e.target.value})}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Product Descriptions</label>
                <input
                  type="text"
                  name="productName"
                  className="form-control"
                 
                  onChange={(e)=>setproduct({...product,product_description:e.target.value})}
                  placeholder="Enter product descriptions"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Product Brand</label>
                <input
                  type="text"
                  name="productName"
                  className="form-control"
                 
                  onChange={(e)=>setproduct({...product,product_brand:e.target.value})}
                  placeholder="Enter product brand"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Product Category</label>
                <input
                  type="text"
                  name="productName"
                  className="form-control"
                 
                  onChange={(e)=>setproduct({...product,product_category:e.target.value})}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Product Sub-Category</label>
                <input
                  type="text"
                  name="productName"
                  className="form-control"
                 
                  onChange={(e)=>setproduct({...product,product_subcategory:e.target.value})}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Product M.R.P</label>
                <input
                  type="text"
                  name="productName"
                  className="form-control"
                 
                  onChange={(e)=>setproduct({...product,product_mrp:e.target.value})}
                  placeholder="Enter product name"
                  required
                />
              </div>

              {/* Price */}
              <div className="mb-3">
                <label className="form-label">Selling Price</label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  
                  onChange={(e)=>setproduct({...product,product_sellingprice:e.target.value})}
                  placeholder="Enter price"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Discount</label>
                <input
                  type="text"
                  name="productName"
                  className="form-control"
                 
                  onChange={(e)=>setproduct({...product,product_discount:e.target.value})}
                  placeholder="Enter product name"
                  required
                />
              </div>

              {/* Quantity */}
              <div className="mb-3">
                <label className="form-label">Stock Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  
                  onChange={(e)=>setproduct({...product,product_stockquantity:e.target.value})}
                  placeholder="Enter quantity"
                  required
                />
              </div>

                       {/* Product Benefits */}
        <div className="mb-3">
          <label className="form-label">Product Nutritional Information
          </label>
          <div className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Enter benefit"
             
              onChange={(e) => setBenefitInput(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddBenefit}
            >
              Add
            </button>
          </div>
          {/* Show Product Benefits */}
          <ul className="mt-3 list-group">
            {product.product_nutritionalinformation.map((benefit, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {index+1}.{benefit}
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteBenefit(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

              {/* Product Image */}
              <div className="mb-3">
                <label className="form-label">Product Image</label>
                <input
                multiple
                  type="file"
                  name="image"
                  className="form-control"
                  
                  onChange={(event)=>handleImageChange(event)}
                  required
                />
              </div>

            

      

              {/* Submit Button */}
              <div className="text-end">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Add Product
                </button>
              </div>
           
          </div>
        </div>
      </div>
    </div>




        
        </div>



    </div>
  )
}

export default Addproduct
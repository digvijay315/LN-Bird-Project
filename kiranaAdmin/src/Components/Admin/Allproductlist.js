import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Sidebar from "../Admin/Sidebar";
import api from '../api'
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import "react-quill/dist/quill.snow.css"; // ReactQuill styles
import ReactQuill from "react-quill";




function Allproductlist() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const[productdata,setproductdata]=useState([])
  // Fetch product data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("getproduct" );
       const Allproduct=response.data.product
        
        setproductdata(Allproduct)
        console.log(productdata);
        
  
        // Map to DataGrid format
        const formattedData = response.data.product.map((item, index) => ({
          _id:item._id,
          id: index + 1,
          product_code: item.product_code,
          product_name: item.product_name,
          product_description: item.product_description,
          product_brand: item.product_brand,
          product_category: item.product_category,
          product_subcategory: item.product_subcategory,
          product_mrp: item.product_mrp,
          product_sellingprice: item.product_sellingprice,
          product_discount: item.product_discount,
          product_stockquantity: item.product_stockquantity,
          product_nutritionalinformation: item.product_nutritionalinformation.join(','),
          ProductImage: item.product_image,
        }));
  
        console.log("Formatted Data:", formattedData);
        setRows(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  // Columns definition
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "product_code", headerName: "Product Code", width: 100 },
    { field: "product_name", headerName: "Product Name", width: 150 },
    { field: "product_description", headerName: "Product Descriptions", width: 150 },
    { field: "product_brand", headerName: "Product Brand", width: 150 },
    { field: "product_category", headerName: "Product Category", width: 150 },
    { field: "product_subcategory", headerName: "Product Sub-Category", width: 150 },
    { field: "product_mrp", headerName: "Product Price", width: 120 },
    { field: "product_sellingprice", headerName: "Product Selling Price", width: 120 },
    {field: "product_discount",headerName: "Product Discount",type: "number",width: 130},
    {field: "product_stockquantity",headerName: "Product Stock Quantity",width: 200},
    {field: "product_nutritionalinformation",headerName: "Product Benefits",width: 200},
    {field: "ProductImage",headerName: "Product Image",width: 160,renderCell: (params) => (
        <img
          src={params.row.ProductImage}
          alt="Product"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginRight: "10px" }}
            // onClick={() => handleEdit(params.row)}
            onClick={() => handleEditModalShow(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];
 

  const handleDelete = async(row) => {
    try {
      const resp=await api.delete(`deleteproduct/${row._id}`)
      if(resp.status === 200)
      {
        Swal.fire({
          title: 'Success!',
          text: 'Product deleted successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
          
                    setTimeout(() => {
                     window.location.reload()
                    }, 2000);
      }
    
      
    } catch (error) {
      console.log(error);
      
    }
  };
 

  const paginationModel = { page: 0, pageSize: 5 };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [product, setproduct] = useState({
    product_code: "",
    product_name: "",
    product_price: "",
    product_quantity: "",
    product_image: [],
    product_description: "",
    product_benefits: [],
    product_quantity1: 1,

  });
  
  
  const [benefitInput, setBenefitInput] = useState("");

  const handleAddBenefit = () => {
    if (benefitInput.trim() !== "") {
        setproduct((prevData) => ({
        ...prevData,
        product_benefits: [...prevData.product_benefits, benefitInput],
      }));
      setBenefitInput(""); // Clear input field
    }
  };

   // Delete a benefit by index
const handleDeleteBenefit = (indexToDelete) => {
setproduct((prevData) => ({
  ...prevData,
  product_benefits: prevData.product_benefits.filter(
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









  const handleUpdate = async () => {
    const formData = new FormData();
  
    // Debugging: Check product fields
    console.log("Product data:", product);
  
    // Append product fields
    formData.append("productcode", product.product_code || "");
    formData.append("productname", product.product_name || "");
    formData.append("productprice", product.product_price || "");
    formData.append("productquantity", product.product_quantity || "");
  
    // Append benefits
    if (product.product_benefits && product.product_benefits.length > 0) {
      product.product_benefits.forEach((benefit, index) => {
        console.log(`Appending benefit [${index}]:`, benefit);
        formData.append("productbenefits", benefit);
      });
    }
  
    // Append images
    if (product.product_image && product.product_image.length > 0) {
      product.product_image.forEach((file, index) => {
        console.log(`Appending file [${index}]:`, file);
        formData.append("productimage", file);
      });
    }
  
    try {
      const response = await api.put(
        `edit_product/${product._id}`,product, {
          headers: { "Content-Type": "multipart/form-data" },
        } );
  
      console.log("Response:", response);
  
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Product updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          setShow(false);
          window.location.reload();
        });
      }
    } catch (error) {
      console.error("Error during update:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update product. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  

const handleEditModalShow = async (row) => {

                    
  setShow(true); // Open the modal
  const resp=await api.get(`getproductbyid/${row._id}`)
  setproduct(resp.data.product)
  
}





  return (
    <div>
      {/* Sidebar */}
      <Sidebar
        isSidebarCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
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
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <span style={{ fontSize: "25px", fontFamily: "Arial, sans-serif" }}>
            List of All Products
          </span>
        </div>

        {/* DataGrid Table */}
        <Paper sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Paper>

       {/* modal code------------------------------------------------------------------------------- */}

       <Modal show={show} onHide={handleClose}  size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Product Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>   <div className="container mt-4">
              <h2 className="mb-4" style={{textAlign:"center"}}>Edit Product</h2>
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
                          name="productcode"
                          className="form-control"
                          placeholder={product.product_code}
                          
                          onChange={(e)=>setproduct({...product,product_code:e.target.value})}
                         
                         
                        />
                      </div>
                      {/* Product Name */}
                      <div className="mb-3">
                        <label className="form-label">Product Name</label>
                        <input
                          type="text"
                          name="productname"
                          className="form-control"
                          value={product.product_name}
                          onChange={(e)=>setproduct({...product,product_name:e.target.value})}
                          placeholder="Enter product name"
                          required
                        />
                      </div>
        
                      {/* Price */}
                      <div className="mb-3">
                        <label className="form-label">Price</label>
                        <input
                          type="number"
                          name="productprice"
                          className="form-control"
                          value={product.product_price}
                          onChange={(e)=>setproduct({...product,product_price:e.target.value})}
                          placeholder="Enter price"
                          required
                        />
                      </div>
        
                      {/* Quantity */}
                      <div className="mb-3">
                        <label className="form-label">Quantity</label>
                        <input
                          type="number"
                          name="productquantity"
                          className="form-control"
                          value={product.product_quantity}
                          onChange={(e)=>setproduct({...product,product_quantity:e.target.value})}
                          placeholder="Enter quantity"
                          required
                        />
                      </div>
        
                      {/* Product Image */}
                      <div className="mb-3">
                        <label className="form-label">Product Image</label>
                        <input
                          multiple
                          type="file"
                          name="productimage"
                          className="form-control"
                          
                          onChange={(event)=>handleImageChange(event)}
                          required
                        />
                        <img src={`${product.product_image}`}></img>
                      </div>
        
                      {/* Product Description */}
                      <div className="mb-3">
                        <label className="form-label">Product Description</label>
                        <ReactQuill
                         
                         onChange={handleDescriptionChange}
                          placeholder="Enter product description"
                          theme="snow"
                        />
                      </div>
        
                       {/* Product Benefits */}
                <div className="mb-3">
                  <label className="form-label">Product Benefits</label>
                  <div className="d-flex">
                    <input
                      type="text"
                      name="productbenifits"
                      className="form-control me-2"
                      placeholder="Enter benefit"
                     value={product.product_benefits}
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
                    {product.product_benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        {benefit}
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
        
                      {/* Submit Button */}
                     
                   
                  </div>
                </div>
              </div>
            </div> </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>





      </div>
    </div>
  );
}

export default Allproductlist;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Uploadimage from "../Uploadimage.png";

function Category() {
  const navigate = useNavigate();
  const [isHovered1, setIsHovered1] = useState(false);

  const [imageFile, setImageFile] = useState([]);
  const [parent, setParent] = useState("");
  const [children, setChildren] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/category/getcategory");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmitCategory = async () => {
    if (!parent) {
      alert("Parent category name is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", parent);
    formData.append("parent", parent);
    formData.append("children", children);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile[0]);

    try {
      if (isEditMode) {
        await axios.put(
          `http://localhost:5000/api/category/categories/${editCategoryId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setSuccessMessage("✅ Category updated successfully!");
      } else {
        await axios.post(
          "http://localhost:5000/api/category/addcategory",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setSuccessMessage("✅ Category added successfully!");
      }

      setShowSuccessMessage(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        setShowSuccessMessage(false);
        setSuccessMessage("");
      }, 3000);

      setParent("");
      setChildren("");
      setDescription("");
      setImageFile([]);
      setIsEditMode(false);
      setEditCategoryId(null);

      fetchCategories();
    } catch (error) {
      console.error("Error submitting category:", error);
      alert("Failed to submit category");
    }
  };

  const handleEditClick = (category) => {
    setIsEditMode(true);
    setEditCategoryId(category._id);
    setParent(category.name);
    setChildren(category.children || "");
    setDescription(category.description || "");
    setImageFile(category.image[0]);
  };

  const promptDelete = (category) => {
    setCategoryToDelete(category);
    setShowConfirmModal(true);
  };

 const confirmDelete = async () => {
  try {
    await axios.delete(
      `http://localhost:5000/api/category/categories/${categoryToDelete._id}`
    );
    setShowConfirmModal(false);
    setCategoryToDelete(null);
    fetchCategories();

    // Show success message
    setSuccessMessage("Deleted successfully");
    setShowSuccessMessage(true);

    // Hide message after 2 seconds
    setTimeout(() => setShowSuccessMessage(false), 3000);
  } catch (error) {
    console.error(error);
    alert("Failed to delete category");
  }
};

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="content flex-grow-1 p-4" style={{ marginTop: "-50px" }}>
        <div className="body-content px-4 py-4" style={{ backgroundColor: "#f1f5f9" }}>
          <div className="d-flex justify-content-between align-items-end flex-wrap">
            <div className="page-title mb-4">
              <Header />
              <h4 className="mb-0 text-start">Category</h4>

              <a
                onClick={() => navigate("/Dashboard")}
                style={{ cursor: "pointer", textDecoration: "none" }}
                onMouseEnter={() => setIsHovered1(true)}
                onMouseLeave={() => setIsHovered1(false)}
              >
                <h6
                  style={{
                    display: "inline",
                    color: isHovered1 ? "blue" : "black",
                    margin: 0,
                    opacity: 0.6,
                    fontSize: "13px",
                  }}
                >
                  Home
                </h6>
              </a>

              <h6
                style={{
                  display: "inline",
                  marginLeft: "10px",
                  opacity: 0.6,
                  fontSize: "13px",
                }}
              >
                &#8226; Category List
              </h6>
            </div>
          </div>

          <div className="container" style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            {/* Left Form */}
            <div
              style={{
                width: "35%",
                backgroundColor: "white",
                padding: "15px",
                borderRadius: "5px",
              }}
            >
              <h6 style={{ marginTop: "20px" }}>Upload Image</h6>
              <div style={{ marginBottom: "10px" }}>
                <img
                  src={imageFile?.length==0?Uploadimage:imageFile}
                  alt="upload-img"
                  style={{ width: "30%", display: "block", margin: "0 auto" }}
                />
                <small style={{ display: "block", textAlign: "center" }}>
                  (Only png, jpg, jpeg, webp will be accepted)
                </small>
              </div>

              <input
                name="image"
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={(e) => setImageFile(Array.from(e.target.files))}
                style={{ marginBottom: "15px", width: "100%" }}
              />

              <div style={{ marginBottom: "10px" }}>
                <label>Parent</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input-light-border"
                  value={parent}
                  onChange={(e) => setParent(e.target.value)}
                />
              </div>

              <div style={{ marginBottom: "5px" }}>
                <label>Children</label>
                <input
                  type="text"
                  placeholder="Enter children"
                  className="input-light-border"
                  value={children}
                  onChange={(e) => setChildren(e.target.value)}
                />
              </div>

              <div style={{ margin: "15px 0" }}>
                <label>Description</label>
                <textarea
                  placeholder="Description Here"
                  rows={4}
                  className="input-light-border"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <button
                className="custom-button"
                onClick={handleSubmitCategory}
                style={{ width: "100%", cursor: "pointer" }}
              >
                {isEditMode ? "Update Category" : "Add Category"}
              </button>

              {isEditMode && (
                <button
                  className="btn btn-secondary mt-2"
                  onClick={() => {
                    setIsEditMode(false);
                    setEditCategoryId(null);
                    setParent("");
                    setChildren("");
                    setDescription("");
                    setImageFile(null);
                  }}
                  style={{ width: "100%" }}
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {/* Right Table */}
            <div style={{ width: "65%", backgroundColor: "#fff" }}>
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "10px",
                  overflow: "auto",
                  maxHeight: "400px",
                  width: "90%",
                  marginLeft: "20px",
                }}
              >
                <table style={{ minWidth: "1000px", width: "100%" }}>
                  <thead style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.2)" }}>
                    <tr style={{ opacity: 0.2 }}>
                      <th style={{ textAlign: "left", padding: "10px" }}>Id</th>
                      <th style={{ paddingLeft: "500px" }}>Name</th>
                      <th style={{ paddingLeft: "300px" }}>Children</th>
                      <th style={{ paddingLeft: "100px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.length === 0 && (
                      <tr>
                        <td colSpan={4} style={{ textAlign: "center", padding: "20px" }}>
                          No categories found
                        </td>
                      </tr>
                    )}

                    {categories.map((cat, index) => (
                      <tr key={cat._id}>
                        <td style={{ padding: "10px" }}>{index + 1}</td>
                        <td style={{ paddingLeft: "500px" }}>{cat.name}</td>
                        <td style={{ paddingLeft: "300px" }}>{cat.children}</td>
                       <td style={{ paddingLeft: "100px", display: "flex", gap: "10px", alignItems: "center" }}>
  <button
    style={{
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "5px 10px",
      borderRadius: "3px",
      cursor: "pointer",
    }}
    onClick={() => handleEditClick(cat)}
  >
    Edit
  </button>
  <button
    style={{
      backgroundColor: "red",
      color: "white",
      border: "none",
      padding: "5px 10px",
      borderRadius: "3px",
      cursor: "pointer",
    }}
    onClick={() => promptDelete(cat)}
  >
    Delete
  </button>
</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: "10px", fontSize: "14px", marginLeft: "20px" }}>
                Showing 1–{categories.length} of {categories.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
              width: "300px",
              textAlign: "center",
            }}
          >
            <h5>Are you sure?</h5>
            <p>This will delete the category.</p>
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message Modal */}
      {showSuccessMessage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,128,0,0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9998,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px 40px",
              borderRadius: "10px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "green",
            }}
          >
            {successMessage}
          </div>
        </div>
      )}
    </div>
  );
}

export default Category;

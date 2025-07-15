import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo1 from "../logo3.png";
import Header from "./Header";
import Icon1 from "../Icon1 (1).png";
import Graphimage from "../Graphimage.png";
import User from "../User.png";
import Cube from "../Cube.png";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Uploadimage from "../Uploadimage.png";

function Order() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="content flex-grow-1 p-4" style={{ marginTop: "-50px" }}>
        <div
          className="body-content px-4 py-4 "
          style={{ backgroundColor: "#f1f5f9" }}
        >
          <div className="d-flex justify-content-between align-items-end flex-wrap">
            <div className="page-title mb-4">
              <Header />
              <h4 className="mb-0 text-start"> Orders</h4>

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
          opacity:0.6,
          fontSize:"13px"
        }}
      >
        Home
      </h6>
              </a>

              <h6 style={{ display: "inline", marginLeft: "10px", opacity:0.6,
          fontSize:"13px" }}>
                &#8226; Order List
              </h6>
            </div>
          </div>
          <div
            className="container"
            style={{
              width: "100%",

              backgroundColor: "#f1f5f9",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "0px",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            {/* Right Div */}
            <div
              style={{
                width: "100%",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            >
              <div
                className="container"
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                {/* Search Input with Icon INSIDE to the LEFT */}

                <div
                  className="search-box"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid rgba(210, 206, 206, 0.3)",

                    borderRadius: "4px",
                    padding: "6px 10px",
                    width: "250px",
                    backgroundColor: "#fff",
                    marginTop: "20px",
                    border: isFocused
                      ? "1px solid blue"
                      : "1px solid  rgba(210, 206, 206, 0.3)",
                  }}
                >
                  <i
                    className="fas fa-search"
                    style={{ marginRight: "8px", color: "#666" }}
                  ></i>

                  <input
                    type="text"
                    placeholder="Search by Invoice no"
                    style={{
                      border: "none",
                      outline: "none",
                      width: "100%",
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </div>

                {/* Right Side Controls */}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginLeft: "auto",
                  }}
                >
                  <p style={{ fontSize: "15px", marginTop: "10px" }}>Status:</p>

                  <select
                    style={{
                      padding: "6px 10px",
                      borderRadius: "4px",
                      border: "0px solid #ccc",
                    }}
                  >
                    <option>Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
              {/* Scrollable Table Container */}
              {/* Scrollable Table Container */}
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "10px",
                  border: "0px solid #ddd",
                  maxHeight: "400px",
                  overflowY: "auto",
                  overflowX: "auto",
                  boxSizing: "border-box",
                  marginBottom: "20px", // Adds spacing between scrollbar and next element
                  paddingBottom: "10px", // Adds space inside for scrollbar
                }}
              >
                <table
                  style={{
                    minWidth: "1000px",
                    borderCollapse: "collapse",
                    width: "100%",
                    borderBottom: "0px solid rgba(0, 0, 0, 0.2)",
                    marginTop: "10px",
                    marginLeft: "10px",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        opacity: 0.6,
                        fontSize: "12px",
                        borderBottom: "1px solid rgba(0, 0, 0, 0.1)", // 👈 Light bottom border
                      }}
                    >
                      <th
                        style={{
                          textAlign: "left",
                          // padding: "10px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        INVOICE NO
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "10px",
                          paddingLeft: "150px",
                        }}
                      >
                        CUSTOMER
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "10px",
                          paddingLeft: "300px",
                        }}
                      >
                        QTY
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "10px",
                          paddingLeft: "100px",
                        }}
                      >
                        TOTAL
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "10px",
                          paddingLeft: "100px",
                        }}
                      >
                        STATUS
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "10px",
                          paddingLeft: "100px",
                        }}
                      >
                        ACTION
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "10px",
                          paddingLeft: "100px",
                        }}
                      >
                        INVOICE
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: "11px" }}>
                    {/* No data row for now */}
                    <tr style={{ marginleft: "0px", whiteSpace: "nowrap" }}>
                      Showing 1–0 of 0
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Text below scrollable table */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;

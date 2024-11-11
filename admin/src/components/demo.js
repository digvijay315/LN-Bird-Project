import React, { useState } from 'react';
import '../css/demo.css'

import Tooltip from '@mui/material/Tooltip';

const FlipViewComponent = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const pagereload = () => {
    setIsFlipped(true);
    setTimeout(() => {
      document.getElementById("contactlistview").style.display = "none";
      document.getElementById("companylistview").style.display = "block";
    }, 1000);  // Wait for flip animation to complete before hiding/showing the divs
  };

  const pagereload2 = () => {
    setIsFlipped(false);
    setTimeout(() => {
      document.getElementById("contactlistview").style.display = "block";
      document.getElementById("companylistview").style.display = "none";
    }, 1000);  // Wait for flip animation to complete before hiding/showing the divs
  };

  const exportToExcel = () => {
    // Logic for exporting data to Excel
  };

  const handleAddColumnClick = () => {
    // Logic for handling the add column button click
  };

  return (
    <div>
      
      <div
        className={`flip-container ${isFlipped ? 'flipped' : ''}`}
        style={{ marginTop: "80px", paddingLeft: "80px", backgroundColor: "white" }}
      >
        {/* Contact List View */}
        <div
          id="contactlistview"
          className="flip-card-front"
          style={{ display: 'flex', paddingTop: '10px', paddingBottom: '10px' }}
          onClick={pagereload}
        >
          <h3 style={{ marginLeft: "10px", cursor: "pointer" }}>Contact</h3>
          <Tooltip title="Export Data.." arrow>
            <button
              className="btn btn-secondary"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                color: "black",
                backgroundColor: "transparent",
                border: "none"
              }}
            >
              <img
                src="https://static.thenounproject.com/png/61783-200.png"
                style={{ height: "25px" }}
                alt=""
              />
            </button>
          </Tooltip>
          <ul className="dropdown-menu" id="exporttoexcel">
            <li onClick={exportToExcel}>Export Data</li>
          </ul>
          <button
            className="form-control form-control-sm"
            style={{ width: "150px", marginLeft: "65%" }}
          >
            Filter
          </button>
          <button
            onClick={handleAddColumnClick}
            className="form-control form-control-sm"
            style={{ width: "150px", marginLeft: "1%" }}
          >
            Add Fields
          </button>
        </div>

        {/* Company List View */}
        <div
          id="companylistview"
          className="flip-card-back"
          style={{ display: 'none', paddingTop: '10px', paddingBottom: '10px' }}
          onClick={pagereload2}
        >
          <h3 style={{ marginLeft: "10px", cursor: "pointer" }}>Company</h3>
          <Tooltip title="Export Data.." arrow>
            <button
              className="btn btn-secondary"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                color: "black",
                backgroundColor: "transparent",
                border: "none"
              }}
            >
              <img
                src="https://static.thenounproject.com/png/61783-200.png"
                style={{ height: "25px" }}
                alt=""
              />
            </button>
          </Tooltip>
          <ul className="dropdown-menu" id="exporttoexcel">
            <li onClick={exportToExcel}>Export Data</li>
          </ul>
          <button
            className="form-control form-control-sm"
            style={{ width: "150px", marginLeft: "65%" }}
          >
            Filter
          </button>
          <button
            onClick={handleAddColumnClick}
            className="form-control form-control-sm"
            style={{ width: "150px", marginLeft: "1%" }}
          >
            Add Fields
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlipViewComponent;

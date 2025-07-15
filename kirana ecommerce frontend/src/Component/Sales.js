import React, { useState } from "react";

function SalesStatistics() {
  const [activeTab, setActiveTab] = useState("sales");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        maxWidth: "100%",
        backgroundColor: "white",
        marginTop: "30px",
      }}
    >
      <h5 style={{ textAlign: "left" }}>Sales Statistics</h5>

      {/* Clickable Text */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "10px" }}>
        <span
          onClick={() => handleTabClick("sales")}
          style={{
            textDecoration: "none",
            color: activeTab === "sales" ? "green" : "#007bff",
            cursor: "pointer",
          }}
        >
          Sales
        </span>
        <span
          onClick={() => handleTabClick("order")}
          style={{
            textDecoration: "none",
            color: activeTab === "order" ? "orange" : "#007bff",
            cursor: "pointer",
          }}
        >
          Order
        </span>
      </div>

      <hr />

      {/* Button and Label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          gap: "10px",
        }}
      >
        <button
          style={{
            backgroundColor: activeTab === "sales" ? "green" : "orange",
            border: "none",
            color: "white",
            width: "50px",
            height: "15px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        />
        <span
          style={{
            color: activeTab === "sales" ? "green" : "orange",
            fontWeight: "bold",
          }}
        >
          {activeTab === "sales" ? "Sales" : "Order"}
        </span>
      </div>

      {/* Scale with aligned Horizontal Lines */}
      <div style={{ display: "flex", marginLeft: "10px" }}>
        {/* Scale Numbers */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginRight: "10px",
            minWidth: "40px",
            gap: "15px", // spacing between numbers
          }}
        >
          {[...Array(11)].map((_, i) => {
            const value = (1 - i * 0.1).toFixed(1);
            return <div key={value}>{value}</div>;
          })}
        </div>

        {/* Vertical Line placed after scale numbers */}
        <div
          style={{
            width: "1px",
            backgroundColor: "gray",
            marginRight: "10px",
          }}
        />

        {/* Horizontal Lines */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {[...Array(11)].map((_, i) => (
            <div
              key={i}
              style={{
                height: "1px",
                backgroundColor: "#ccc",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SalesStatistics;

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
import SalesStatistics from "./Sales";


function Dashboard() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const navigate = useNavigate();


  return (
    <div className="d-flex">
    <Sidebar/>

      {/* Content Area */}
      <div className="content flex-grow-1 p-4" style={{ marginTop: "-50px" }}>
        <div className="body-content px-4 py-4 "  style={{ backgroundColor: '#f1f5f9' }}>
          <div className="d-flex justify-content-between align-items-end flex-wrap">
            <div className="page-title mb-4">
              <Header />
              <h3 className="mb-0 text-start">Dashboard</h3>
              <p className="text-muted m-0 text-start">
                Welcome to your dashboard
              </p>
            </div>
          </div>

          {/* Dashboard Cards */}
          <div className="d-flex gap-3">
            {/* Card 1 */}
            <div className="card" style={{ width: "18rem", height: "100px" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0">0</h5>
                  <img src={Icon1} alt="Icon1" style={{ maxWidth: "40px" }} />
                </div>
                <h6 className="card-subtitle mb-0 text-body-secondary text-start">
                  Today's order
                </h6>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card" style={{ width: "18rem", height: "100px" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0">0</h5>
                  <img
                    src={Graphimage}
                    alt="Graph"
                    style={{ maxWidth: "40px" }}
                  />
                </div>
                <h6 className="card-subtitle mb-0 text-body-secondary text-start">
                  Yesterday orders
                </h6>
              </div>
            </div>

            {/* Card 3 */}
            <div className="card" style={{ width: "18rem", height: "100px" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0">0</h5>
                  <img src={User} alt="User" style={{ maxWidth: "40px" }} />
                </div>
                <h6 className="card-subtitle mb-0 text-body-secondary text-start">
                  Monthly orders
                </h6>
              </div>
            </div>

            {/* Card 4 */}
            <div className="card" style={{ width: "18rem", height: "100px" }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title mb-0">0</h5>
                  <img src={Cube} alt="Cube" style={{ maxWidth: "40px" }} />
                </div>
                <h6 className="card-subtitle mb-0 text-body-secondary text-start">
                  Total orders
                </h6>
              </div>
            </div>
          </div>

          {/* Sales Statistics Section */}
         <div
  style={{
    fontFamily: "Arial, sans-serif",
    paddingBottom: "30px",
    maxWidth: "100%",
    height: "20%",
    backgroundColor: "white",
    marginTop: "10px",
    borderRadius: "6px",
    overflow: "hidden",      // <--- clip children inside rounded corners
    boxShadow: "0 0 5px rgba(0,0,0,0.1)"  // optional, to better see the edges
  }}
>
  <SalesStatistics />
</div>


          <div style={{width:"50%",height:"300px",backgroundColor:"white",marginTop:"20px",
            padding:"20px", borderRadius:"10px"}}> <h6>  Most Selling Category     </h6></div>
        </div>


        <div className="recent-orders"style={{
    backgroundColor: "white", borderRadius:"10px",marginLeft:"20px"
  
  }} overflow="auto">
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h5 className="mb-0" style={{ marginLeft: "10px",padding:"5px" }}>Recent Orders</h5>

    <a href="#" className="text-primary">View All</a>
  </div>

  {/* Scrollable container */}
  <div style={{ maxHeight: "100px", overflow: "auto" ,fontSize:'12px',marginLeft:"20PX",opacity:"0.3"}}>
   <table 
  className="table table-hover" 
  style={{ 
    borderTop: "none", 
    borderLeft: "none", 
    borderRight: "none", 
    borderBottom: "1px solid black", 
    minWidth: "900px" 
  }}
>
      <thead className="table-light" style={{  top: 0, backgroundColor: "white", zIndex: 1 }}>
        <tr style={{backgroundColor:"white"}}>
          <th>INVOICE NO</th>
          <th>ORDER TIME</th>
          <th>CUSTOMER NAME</th>
          <th>PRICE</th>
          <th>STATUS</th>
          <th>ACTION</th>
          <th>INVOICE</th>
        </tr>
      </thead>
      <tbody>
       
      </tbody>
    </table>
  </div>

  <div className="text-start text-muted mt-2" style={{ marginLeft: "20px" }}>
  Showing 1–0 of 0
</div>

</div>


        
       
      </div>
    </div>
  );
}

export default Dashboard;

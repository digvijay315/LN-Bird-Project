import React, { useState , useEffect} from "react";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import api from '../api'


function Dashboard() {

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('token');
    if (!authToken) {
      navigate('/login', { replace: true }); // Redirect to login
    }
  }, [navigate]);

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [chartTimeRange, setChartTimeRange] = useState("Day");

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await api.get('getAllOrders'); // Adjust the URL
          const formattedOrders = response.data.map((order, index) => ({
            id: index + 1, // Add an ID for the DataGrid
            firstName: order.firstName,
            lastName: order.lastName,
            mobileNumber: order.mobileNumber,
            apartmentNumber: order.apartmentNumber,
            apartmentName: order.apartmentName,
            area: order.area,
            landmark: order.landmark,
            addressType: order.addressType,
            pincode: order.pincode,
            productName: order.cartItems.map((item) => item.product_name).join(', '),
            productPrice: order.cartItems.reduce((sum, item) => sum + item.product_price, 0),
            productQuantity: order.cartItems.reduce((sum, item) => sum + item.product_quantity, 0),
            totalPrice: order.totalPrice,
            paymentMode: order.setDefault ? 'Default' : 'Custom', // Example logic
          }));
          setOrders(formattedOrders);
        } catch (error) {
          console.error('Failed to fetch orders:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchOrders();
    }, []);
  
    const columns = [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'firstName', headerName: 'First Name', width: 130 },
      { field: 'lastName', headerName: 'Last Name', width: 130 },
      { field: 'mobileNumber', headerName: 'Mobile No.', width: 120 },
      { field: 'apartmentNumber', headerName: 'Apartment Number', width: 160 },
      { field: 'apartmentName', headerName: 'Apartment Name', width: 120 },
      { field: 'area', headerName: 'Area', width: 120 },
      { field: 'landmark', headerName: 'Landmark', width: 120 },
      { field: 'addressType', headerName: 'Address Type', width: 120 },
      { field: 'pincode', headerName: 'Pincode', width: 90 },
      { field: 'productName', headerName: 'Product Name', width: 150 },
      { field: 'productPrice', headerName: 'Product Price', width: 120 },
      { field: 'productQuantity', headerName: 'Product Quantity', width: 150 },
      { field: 'totalPrice', headerName: 'Total Price', width: 120 },
      { field: 'paymentMode', headerName: 'Payment Mode', width: 120 },
    ];


    
  
    const toggleSidebar = () => {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    };
  
    // Data for each time range
    const chartData = {
      Day: {
        labels: ["1st", "2nd", "3rd", "4th", "5th", "6th"],
        datasets: [
          {
            label: "Product Sales (Day)",
            data: [0, 4500, 3000, 6000, 4000, 6500],
            fill: true,
            backgroundColor: "rgba(54, 162, 235, 0.1)",
            borderColor: "#0d6efd",
            tension: 0.4,
          },
        ],
      },
      Week: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
          {
            label: "Product Sales (Week)",
            data: [12000, 14500, 17000, 20000],
            fill: true,
            backgroundColor: "rgba(54, 162, 235, 0.1)",
            borderColor: "#0d6efd",
            tension: 0.4,
          },
        ],
      },
      Month: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Product Sales (Month)",
            data: [25000, 22000, 27000, 30000, 35000, 33000],
            fill: true,
            backgroundColor: "rgba(54, 162, 235, 0.1)",
            borderColor: "#0d6efd",
            tension: 0.4,
          },
        ],
      },
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: { grid: { display: false } },
        y: { beginAtZero: true },
      },
    };
  
    // Handle time range button clicks
    const handleTimeRangeClick = (range) => {
      setChartTimeRange(range);
    };

    
    const rows = [
      { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];
    
    const paginationModel = { page: 0, pageSize: 5 };



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
        {/* Sales Chart */}
        <div className="container my-5">
          <div className="row g-4">
            {/* Card 1: Products Sold */}
            <div className="col-md-3">
              <div
                style={{
                  border: "none",
                  borderRadius: 15,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  padding: 20,
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h2 style={{ color: "#0d6efd", margin: 0 }}>850</h2>
                    <p style={{ margin: 0, color: "#6c757d" }}>Products Sold</p>
                  </div>
                  <i className="fa fa-shopping-cart" style={{ fontSize: 40, color: "#0d6efd" }} />
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 8,
                    backgroundColor: "#e9ecef",
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                >
                  <div
                    style={{
                      width: "70%",
                      height: "100%",
                      backgroundColor: "#0d6efd",
                      borderRadius: 10,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Net Profit */}
            <div className="col-md-3">
              <div
                style={{
                  border: "none",
                  borderRadius: 15,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  padding: 20,
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h2 style={{ color: "#fd7e14", margin: 0 }}>$748</h2>
                    <p style={{ margin: 0, color: "#6c757d" }}>Net Profit</p>
                  </div>
                  <i className="fa fa-chart-pie" style={{ fontSize: 40, color: "#fd7e14" }} />
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 8,
                    backgroundColor: "#e9ecef",
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      height: "100%",
                      backgroundColor: "#fd7e14",
                      borderRadius: 10,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Card 3: New Customers */}
            <div className="col-md-3">
              <div
                style={{
                  border: "none",
                  borderRadius: 15,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  padding: 20,
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h2 style={{ color: "#198754", margin: 0 }}>146</h2>
                    <p style={{ margin: 0, color: "#6c757d" }}>New Customers</p>
                  </div>
                  <i className="fa fa-user-plus" style={{ fontSize: 40, color: "#198754" }} />
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 8,
                    backgroundColor: "#e9ecef",
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                >
                  <div
                    style={{
                      width: "80%",
                      height: "100%",
                      backgroundColor: "#198754",
                      borderRadius: 10,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Card 4: Customer Satisfaction */}
            <div className="col-md-3">
              <div
                style={{
                  border: "none",
                  borderRadius: 15,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  padding: 20,
                  transition: "transform 0.3s ease-in-out",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h2 style={{ color: "#dc3545", margin: 0 }}>99.89%</h2>
                    <p style={{ margin: 0, color: "#6c757d" }}>Customer Satisfaction</p>
                  </div>
                  <i className="fa fa-heart" style={{ fontSize: 40, color: "#dc3545" }} />
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 8,
                    backgroundColor: "#e9ecef",
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                >
                  <div
                    style={{
                      width: "95%",
                      height: "100%",
                      backgroundColor: "#dc3545",
                      borderRadius: 10,
                    }}
                  />
                </div>
              </div>
            </div>

          {/* Time Range Buttons (Placed Above the Chart) */}
        <div className="d-flex justify-content-start mb-4">
          <button
            className={`btn btn-outline-primary ${chartTimeRange === "Day" ? "active" : ""}`}
            onClick={() => handleTimeRangeClick("Day")}
          >
            Day
          </button>
          <button
            className={`btn btn-outline-primary mx-3 ${chartTimeRange === "Week" ? "active" : ""}`}
            onClick={() => handleTimeRangeClick("Week")}
          >
            Week
          </button>
          <button
            className={`btn btn-outline-primary ${chartTimeRange === "Month" ? "active" : ""}`}
            onClick={() => handleTimeRangeClick("Month")}
          >
            Month
          </button>
        </div>

        {/* Product Sales Chart */}
        <div className="row">
          <div className="col-12">
            <div
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                padding: "10px",
                width:"580px",
                height:"350px"
              }}
            >
              {/* Chart Component */}
              <Line
                data={chartData[chartTimeRange]}
                options={options}
                height={350} // Adjusted to make the chart taller
                width={600}
              />
            </div>
          </div>
        </div>
          </div>
        </div>


       {/* table------------------------------------------------------------------------------------------- */}

       <h3>All Orders</h3>
       <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={orders}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>





       {/* table end ----------------------------------------------------------------------------------------- */}



      </div>
    </div>
  );
}

export default Dashboard;

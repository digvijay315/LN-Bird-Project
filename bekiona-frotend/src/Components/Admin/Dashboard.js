import React, { useState , useEffect} from "react";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper, Button, Menu, MenuItem ,Select} from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import api from '../api'
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import 'bootstrap/dist/css/bootstrap.min.css';    // CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // JS (includes Popper.js)
import Swal from "sweetalert2";

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
          setOrders(response.data);
        } catch (error) {
          console.error('Failed to fetch orders:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchOrders();
    }, []);

    const allColumns = [
      { id: 'sno', name: '#' },
      { id: 'id', name: 'Order_Id' },
      { id: 'personaldetails', name: 'Personal_Details' },
      { id: 'address', name: 'Address' },
      { id: 'productName', name: 'Product_Details' },
      { id: 'totalPrice', name: 'Total_Price' },
      { id: 'paymentMode', name: 'Payment_Mode' },
      { id: 'orderdate', name: 'Order_Date' },
      { id: 'action', name: 'Action' },
    ]

    const [selectedItems, setSelectedItems] = useState([]); // To track selected rows
    const [selectAll, setSelectAll] = useState(false); // To track the state of the "Select All" checkbox
    const [visibleColumns, setVisibleColumns] = useState(allColumns.slice(1,9));
    const [showColumnList, setShowColumnList] = useState(false);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        lineHeight:"0px"
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: "10px",
      },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    }));


    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8); // User-defined items per page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(orders.length / itemsPerPage);
    
      // Handle items per page change
      const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page whenever items per page changes
      };
    
    // Function to handle page changes
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    // Function to handle "Next" and "Previous" page changes
    const goToNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
    
    const goToPreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
    
    const renderPageNumbers = () => {
      // Define the range of page numbers to display
      const maxPageNumbersToShow = 5;
      const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
      const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);
      
      return (
        <div
          style={{
            display: 'flex',
           
            whiteSpace: 'nowrap',
            padding: '10px-15px',
            width: '100%', 
            position: 'relative'
          }}
        >
          {/* Previous Button */}
          {currentPage > 1 && (
            <button onClick={goToPreviousPage} style={{ width: '50px', borderRadius: '5px', marginRight: '5px' }}>
              Prev
            </button>
          )}
    
          {/* Page Numbers */}
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              style={{
                width: '30px',
                borderRadius: '5px',
                marginRight: '5px',
                flexShrink: 0, // Prevent buttons from shrinking
                backgroundColor: number === currentPage ? 'lightblue' : 'white',
              }}
            >
              {number}
            </button>
          ))}
    
          {/* Next Button */}
          {currentPage < totalPages && (
            <button onClick={goToNextPage} style={{ width: '50px', borderRadius: '5px', marginRight: '5px' }}>
              Next
            </button>
          )}
        </div>
      );
    };


    const formatDate = (isoString) => {
      if (!isoString) return "-"; // Fallback for missing date
      const date = new Date(isoString);
      const localDate = date.toLocaleDateString();
      const localTime = date.toLocaleTimeString();
      return (
        <>
          <div>{localDate}</div>
          <div>{localTime}</div>
        </>
      );
    };

   // ✅ Function for Accepting an Order
   const acceptOrder = (orderId) => {
    alert(`✅ Order Accepted: ${orderId}`);

  };

  // ✅ Function for Rejecting an Order
  const rejectOrder = (orderId) => {
    console.log(`❌ Order Rejected: ${orderId}`);

  };

  const handleActionChange = (orderId, action) => {
    if (action === 'accept') {
      acceptOrder(orderId);
    } else if (action === 'reject') {
      rejectOrder(orderId);
    }
  };

    
  
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



    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
      // Fetch total user count
      const fetchUserCount = async () => {
        try {
          const response = await api.get("totaluser");
          setTotalUsers(response.data.totalUsers);
        } catch (error) {
          console.error("Error fetching user count:", error);
        }
      };
  
      fetchUserCount();
    }, []);


    const [satisfaction, setSatisfaction] = useState(0);

  useEffect(() => {
    const fetchSatisfaction = async () => {
      try {
        const response = await axios.get("getcustomersetification");
        setSatisfaction(response.data.satisfaction);
      } catch (error) {
        console.error("Error fetching customer satisfaction:", error);
      }
    };

    fetchSatisfaction();
  }, []);


  const [totalOrders, setTotalOrders] = useState(0);
  const goal = 1000; // You can adjust this as needed
  const progress = Math.min((totalOrders / goal) * 100, 100); // capped at 100%

  useEffect(() => {
    const fetchTotalOrders = async () => {
      try {
        const response = await api.get('/totalorders'); // adjust your API
        setTotalOrders(response.data.totalOrders); // or response.data.length if array
      } catch (error) {
        console.error('Failed to fetch total orders:', error);
      }
    };

    fetchTotalOrders();
  }, []);
  
  console.log(orders);
  

  const deleteorder=async(id)=>
  {
    try {

      const resp=await api.delete(`deleteorder/${id}`)
      if(resp.status===200)
      {
        Swal.fire({
          icon:"success",
          title:"order removed",
          text:"order deleted successfully",
          confirmButtonText: 'OK',
        })
      }
      setTimeout(() => {
          window.location.reload()
      }, 2000);
      
    } catch (error) {
      console.log(error);
      
    }
  
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ color: "#0d6efd", margin: 0 }}>{totalOrders}</h2>
            <p style={{ margin: 0, color: "#6c757d" }}>Order Product</p>
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
              width: `${progress}%`,
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ color: "#198754", margin: 0 }}>{totalUsers}</h2>
            <p style={{ margin: 0, color: "#6c757d" }}>Total Users</p>
          </div>
          <i className="fa fa-users" style={{ fontSize: 40, color: "#198754" }} />
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
              width: `${(totalUsers / 500) * 100}%`, // Adjust width dynamically
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ color: "#dc3545", margin: 0 }}>{satisfaction}%</h2>
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
              width: `${satisfaction}%`,
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
       <div style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"70%",marginBottom:"20px"}}>
      
      <label htmlFor="itemsPerPage" style={{fontSize:"16px",fontFamily:"times new roman"}}>Items: </label>
      <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange} style={{fontSize:"16px",fontFamily:"times new roman",height:"30px"}}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    
    {renderPageNumbers()}
    </div>

       <div style={{marginLeft:"0px",marginTop:"10px",backgroundColor:"white",top:"100px",position:"sticky",zIndex:10}}>
      <TableContainer component={Paper} style={{ maxHeight: '700px',overflow: 'auto' }}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead style={{ position: "sticky", top: 0, zIndex: 10 }}>
        <TableRow >
          <StyledTableCell style={{backgroundColor:"gray",fontSize:"12px"}}>
          
          </StyledTableCell>
          {visibleColumns.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{ cursor: 'pointer',backgroundColor:"gray" }}
              // onClick={() => handleSort(col.id)}
            >
              {col.name}
              {/* {sortConfig.key === col.id ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ''} */}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <tbody>
        {
         
        currentItems.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell style={{fontSize:"12px"}}>
              {index + 1}
            </StyledTableCell>
            <StyledTableCell style={{fontSize:"12px"}}>
          {item.orderid}
         </StyledTableCell>
            <StyledTableCell  style={{ padding: "10px", cursor: "pointer",fontSize:"12px"}}  >
              <span style={{color:"#0086b3",fontWeight:"bold",fontSize:"12px"}}> {item.firstName} {item.lastName}</span>
              <br />
           
              <span>{item.mobileNumber}</span>
              <br />
             
              <span>{item.email}</span>
            </StyledTableCell>
         
                <StyledTableCell style={{fontSize:"12px"}}>
                      <>
                       {item.apartmentNumber} {item.area}<br></br>
                       landmark:{item.landmark}<br></br>
                       {item.selectcity} {item.selectstate}<br></br>
                       {item.pincode}
                       </>
                </StyledTableCell>

                <StyledTableCell style={{fontSize:"12px"}}>
                      <>
                      {
                        item.cartItems.map((product)=>
                        (
                          <>
                          {product.product_name}<br></br>
                          Rs.{product.product_price}<br></br>
                          </>
                        ))
                      }
                       </>
                </StyledTableCell>

                <StyledTableCell style={{fontSize:"12px"}}>
                      <>
                   {item.totalPrice}
                       </>
                </StyledTableCell>
                <StyledTableCell style={{fontSize:"12px"}}>
                      <>
               
                       </>
                </StyledTableCell>
                <StyledTableCell style={{fontSize:"12px"}}>
                 <>
                 {formatDate(item.createdAt)}
                 </>
                 </StyledTableCell>
                <StyledTableCell style={{fontSize:"12px"}}>
                  <>
                  
                                  <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Action
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" style={{cursor:"pointer"}}>Accept</a></li>
                    <li><a class="dropdown-item" style={{cursor:"pointer"}}>Reject</a></li>
                    <li><a class="dropdown-item" style={{cursor:"pointer"}} onClick={()=>deleteorder(item._id)}>Delete</a></li>
                  </ul>
                </div>                
                 </>
                 
                </StyledTableCell>
          
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>

  </div>

 
  



       {/* table end ----------------------------------------------------------------------------------------- */}



      </div>
    </div>
  );
}

export default Dashboard;

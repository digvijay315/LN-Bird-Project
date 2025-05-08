import {React,useState,useEffect} from 'react'
import Header1 from './header1'
import Sidebar1 from './sidebar1'
import Tooltip from '@mui/material/Tooltip';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import api from "../api";
import Swal from 'sweetalert2';
import { ToastContainer,toast } from "react-toastify";

function Users() {


    
        useEffect(()=>{fetchdata()},[])
        const[data,setdata]=useState([]);
        const fetchdata=async(event)=>
          {
            
            try {
              const resp=await api.get('viewleadscore')
              setdata(resp.data.score)
            } catch (error) {
              console.log(error);
            }
          
          }

    const allColumns = [
        { id: 'sno', name: '#' },
        { id: 'available_for', name: 'Type' },
        { id: 'reason', name: 'Call Reason/Email Subject' },
        { id: 'direction', name: 'Direction' },
        { id: 'status', name: 'Status' },
        { id: 'result', name: 'Result/Email_Subject' },
        { id: 'score', name: 'Score' },
        { id: 'stagerequirment', name: 'Stage_changed_Requirment' },
    
      ];
    
    
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(7); // User-defined items per page
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
      const totalPages = Math.ceil(data.length / itemsPerPage);
      
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
    
          const StyledTableCell = styled(TableCell)(({ theme }) => ({
            [`&.${tableCellClasses.head}`]: {
              backgroundColor: theme.palette.common.black,
              color: theme.palette.common.white,
                lineHeight:"0px"
            },
            [`&.${tableCellClasses.body}`]: {
              fontSize: 14,
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

                  const [selectedItems, setSelectedItems] = useState([]); // To track selected rows
                      const [selectAll, setSelectAll] = useState(false); // To track the state of the "Select All" checkbox
                      const [visibleColumns, setVisibleColumns] = useState(allColumns.slice(1, 10));
          
                const handleSelectAll = () => {
           
                  setSelectAll(!selectAll);
                  if (!selectAll) {
                    // Add all current page item IDs to selectedItems
                    setSelectedItems(currentItems.map((item) => item._id));
                  } else {
                    // Deselect all
                     setSelectedItems([]);
             
                  }
                };
              
                const handleRowSelect = (id) => {
              
                  if (selectedItems.includes(id)) {
                    setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
                  } else {
                    setSelectedItems([...selectedItems, id]);
                
                  }
                };

          
                            const deleteSelectedItems = async () => {
                                    try {
                                      if(selectedItems.length===0)
                                      {
                                        toast.error("please select first",{autoClose:"2000"})
                                        return
                                      }
                          
                                      // Show confirmation message
                                      const result = await Swal.fire({
                                        title: "Are you sure?",
                                        text: "You won't be able to revert this!",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#d33",
                                        cancelButtonColor: "#3085d6",
                                        confirmButtonText: "Yes, delete it!",
                                      });
                                  
                                      if (!result.isConfirmed) {
                                        return; // Stop execution if user cancels
                                      }
                          
                                      const resp = selectedItems.map(async (itemId) => {
                                        await api.delete(`deleteleadscore/${itemId}`);
                                      });
                                      
                                        Swal.fire({
                                                    icon: 'success',
                                                    title: 'Lead Score Criteria Deleted',
                                                    text: 'Selected items deleted successfully!',
                                                  });
                                      setTimeout(() => {
                                        window.location.reload();
                                      }, 2000);
                                    } catch (error) {
                                      console.log(error);
                                    }
                                  };
          
                                  useEffect(()=>
                                    {
                                      if(selectedItems.length===0)
                                        {
                                          document.getElementById("delete").style.display="none"
                                       
                                        }
                                      if(selectedItems.length===1)
                                        {
                                          document.getElementById("delete").style.display="inline-block"
                                         
                                        }
                                      
                                          if(selectedItems.length>1)
                                            {
                                              document.getElementById("delete").style.display="inline-block"
                                            
                                            }
                                    },[selectedItems])

         const [isHoveringDelete, setIsHoveringDelete] = useState(false);

  return (
    <div>
        <Header1/>
        <Sidebar1/>

          <div style={{marginTop:"60px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
                   
                   <h3 style={{marginLeft:"10px",cursor:"pointer"}}>User Creation </h3>
                  
                       <button  class="btn btn-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent",border:"none"}}>
                       <img src="https://static.thenounproject.com/png/61783-200.png" style={{height:"25px"}} alt=""/>
                   </button>
                       <ul class="dropdown-menu" id="exporttoexcel" style={{textAlign:"left",padding:"0px",boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",fontFamily:"arial",fontSize:"14px",lineHeight:"30px"}}> 
                       
                       <li   ><img src="https://static.thenounproject.com/png/1960252-200.png" style={{height:"20px",marginTop:"5px"}}></img>
                       Export Data
                       </li>
                       <li  ><img src="https://www.svgrepo.com/show/447311/database-import.svg" style={{height:"20px",marginTop:"5px"}}></img>
                       Import Data</li>
                       <li ><img src="https://static.thenounproject.com/png/2406231-200.png"  style={{height:"20px",marginTop:"5px"}}></img>
                       Download Data(sample)</li>
                       </ul>
        
                         <Tooltip title="Add New User..." arrow>
                                   <button   style={{ position:"relative",marginLeft: '40%',width:"50px",padding: '8px',color: 'white',border: 'none', borderRadius: '4px',cursor: 'pointer',fontWeight: 'bold',textAlign: 'center'}} className="form-control form-control-sm form-control form-control-sm-sm"  >
                                          <img src="https://png.pngtree.com/png-clipart/20191122/original/pngtree-vector-plus-icon-png-image_5169416.jpg" style={{height:"25px"}}></img>
                                   </button>
                        </Tooltip>
        
                                   <div style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"70%",position:"absolute"}}>
              
              <label htmlFor="itemsPerPage" style={{fontSize:"16px",fontFamily:"times new roman"}}>Items: </label>
              <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange} style={{fontSize:"16px",fontFamily:"times new roman",height:"30px"}}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            
            {renderPageNumbers()}
            </div>
        
            
             </div>
        
             <div id="action" style={{position:"relative",marginLeft:"6%",gap:"20px"}}>
                  
                  <Tooltip title="Delete Data.." arrow>
                        <img
                          id="delete"
                          src={
                            isHoveringDelete
                              ? "https://cdn-icons-png.freepik.com/512/6861/6861362.png" // hover image
                              : "https://cdn-icons-png.freepik.com/512/7078/7078067.png" // default image
                          }
                          onClick={deleteSelectedItems}
                          onMouseEnter={() => setIsHoveringDelete(true)}
                          onMouseLeave={() => setIsHoveringDelete(false)}
                          alt=""
                          style={{
                           //  display:"none",
                            height: "25px",
                            width: "25px",
                            cursor: "pointer",
                            marginTop: "6px"
                          }}
                        />
                      </Tooltip>
                   </div>
        
      
    </div>
  )
}

export default Users

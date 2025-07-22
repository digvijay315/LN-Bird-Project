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

                                             const [show1, setshow1] = useState(false);
                                                   
                                                    const handleClose1 = () => setshow1(false);
                                             
                                                    const handleShow1=async()=>setshow1(true);



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
                                   <button onClick={handleShow1}   style={{ position:"relative",marginLeft: '40%',width:"50px",padding: '8px',color: 'white',border: 'none', borderRadius: '4px',cursor: 'pointer',fontWeight: 'bold',textAlign: 'center'}} className="form-control form-control-sm form-control form-control-sm-sm"  >
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

                      <Modal  show={show1} onHide={handleClose1} size='lg' style={{transition:"0.5s ease-in"}}>
                                          <Modal.Header>
                                            <Modal.Title>Add New User<br></br>
                                            </Modal.Title>
                                          </Modal.Header>
                                          <Modal.Body>
                                     
                             <div>
                              <div>
                                     <div className="mb-3">
                                      <h6>Full Name</h6>
                              {/* <label htmlFor="name" className="form-label">Full Name</label> */}
                              <input type="text" className="form-control" id="name" required />
                            </div>
                      
                             <div className="mb-3">
                              <h6>Email</h6>
                              <label htmlFor="email" className="form-label">Activation Instructions will be emailed to this address.</label>
                              <input type="email" className="form-control" id="email" required />
                            </div>
                      
                             <div className="mb-3">
                               <h6>Mobile</h6>
                              {/* <label htmlFor="email" className="form-label">Mobile</label> */}
                              <input type="email" className="form-control" id="email" required placeholder='Verified by OTP' />
                            </div>
                      
                             <div className="mb-3">
                              <h6>Manager</h6>
                              {/* <label htmlFor="email" className="form-label">Manager</label> */}
                              <input type="email" className="form-control" id="email" required />
                            </div>
                      
                             <div className="mb-3">
                              <h6>Team</h6>
                              <label htmlFor="email" className="form-label">Team help you filter your reports.</label>
                              <input type="email" className="form-control" id="email" required />
                            </div>
                      
                          
                            <h6 > <input type='checkbox'style={{ transform: "scale(1.4)", marginRight: "8px" }}></input>Permissions(ADMIN)</h6>
                          <p>Permissions specify how Users can work with leads, contact , and deals.</p>
                          <h6>Assign Permissions</h6>
                          <p>Permission settings specify how users can work with leads, contacts, and deals.
                            Assign an access level to give users to specific Permissions in Sell Learn more
                          </p>
                          <h6><input type='radio' name='access'></input>Full access (Formerly Manager) </h6>
                          <p>A user with full access can view, update, delete, and convert any lead, contact,
                            and deals in the account.They can also manage goals, task, and appointments
                            and share document.
                          </p>
                          <h6><input type='radio' name='access'></input> Limited access (Formerly Users)</h6>
                          <p>A user with Limited access can view, update, delete and convert their own leads,
                            contacts and deals.You can add assitional by customizing </p>
                            </div>
                      
                      
                      
                      <div>
                        <p style={{borderTop: "1px solid ", borderBottom: "1px solid #000"}} >Create a new role</p>
                                   <div className="mb-3">
                            <label htmlFor="name" className="form-label">Role name</label>
                              <input type="text" className="form-control" id="name" required placeholder='Manager (Sales)' />
                      
                      
                                    <label htmlFor="name" className="form-label">Description</label>
                                    <textarea type="text" style={{height:'100px'}} className="form-control" id="name" placeholder='Lets people know how this role should be used. '/>
                                    <h6>Configure Setting Permission</h6>
                                  <h8>Manage</h8><br></br>
                              <div style={{ display: "flex", gap: "80px", alignItems: "center" }}>
                        <label>
                          <input type="checkbox" /> Profile
                        </label>
                        <label>
                          <input type="checkbox" /> Users
                        </label>
                        <label>
                          <input type="checkbox" /> Notification
                        </label>
                        <label>
                          <input type="checkbox" /> Sales Goal
                        </label>
                      </div>
                          
                      
                           <h8 style={{ textDecoration: "underline" }}>Data</h8><br></br>
                              <div style={{ display: "flex", gap: "40px", alignItems: "center", marginTop:'10px' }}>
                        <label>
                          <input type="checkbox" /> Import
                        </label>
                        <label>
                          <input type="checkbox" /> Export
                        </label>
                        <label>
                          <input type="checkbox" />Bulk Update
                        </label>
                        <label>
                          <input type="checkbox" /> Duplicate Managment
                        </label>
                         <label>
                          <input type="checkbox" />Prospecting and Enrich
                        </label>
                        <label>
                          <input type="checkbox" />Lead Capture
                            </label>
                      </div>
                                  <h8 style={{ textDecoration: "underline" }}>Communication Channels</h8><br></br>
                              <div style={{ display: "flex", gap: "80px", alignItems: "center" , marginTop:'10px' }}>
                        <label>
                          <input type="checkbox" /> Email
                        </label>
                        <label>
                          <input type="checkbox" /> Voice(vertual Call)
                        </label>
                        <label>
                          <input type="checkbox" />Text(SMS)
                        </label>
                        <label>
                          <input type="checkbox" /> Sales Goal
                        </label>
                      </div>
                      
                      <h8 style={{ textDecoration: "underline" }}>Customize</h8><br></br>
                              <div style={{ display: "flex", gap: "40px", alignItems: "center", marginTop:'10px' }}>
                        <label>
                          <input type="checkbox" />Lead
                        </label>
                        <label>
                          <input type="checkbox" />Contact
                        </label>
                        <label>
                          <input type="checkbox" />Task
                        </label>
                        <label>
                          <input type="checkbox" /> Properties
                        </label>
                         <label>
                          <input type="checkbox" />Notes
                        </label>
                        <label>
                          <input type="checkbox" />Templplates
                            </label>
                       <label>
                          <input type="checkbox" />Layout
                            </label>
                             <label>
                          <input type="checkbox" />Post Sales
                            </label>
                            </div>
                      
                      <h8 style={{ textDecoration: "underline" }}>Intergration</h8><br></br>
                              <div style={{ display: "flex", gap: "40px", alignItems: "center" , marginTop:'10px'}}>
                        <label>
                          <input type="checkbox" />Intergration
                        </label>
                        <label>
                          <input type="checkbox" />API
                        </label>
                        </div>
                      
                        <h8 style={{ textDecoration: "underline" }}>Business Rule</h8><br></br>
                              <div style={{ display: "flex", gap: "40px", alignItems: "center", marginTop:'10px' }}>
                        <label>
                          <input type="checkbox" />Field Rules
                        </label>
                        <label>
                          <input type="checkbox" />Distributions
                        </label>
                        <label>
                          <input type="checkbox" />Post Sales
                        </label>
                         <label>
                          <input type="checkbox" />Automated Actions
                        </label>
                         <label>
                          <input type="checkbox" />Triggers
                        </label>
                         <label>
                          <input type="checkbox" />Scoring
                        </label>
                        </div>
                      </div>
                      
                       <div style={{ display: "flex", gap: "70px", marginTop:'25px',  borderTop: "1px solid #000",borderBottom: "1px solid #000"}}>
                         <label>Leads</label>
                          <label>Contacts</label>
                           <label>Properties</label>
                            <label>Task</label>
                             <label>Booking</label>
                              <label>Reports</label>
                       </div>
                       <div  style={{marginTop:'15px'}}>
                       <h8>Can view Properties</h8> <br></br>
                       <input style={{marginTop:'10px', gap:'20px'}} type='radio' name='view'></input> Their and subordinates' deals <br></br>
                        <input style={{marginTop:'10px', gap:'20px'}} type='radio' name='view'></input>Their subordinates' and peers' deals<br></br>
                        <input style={{marginTop:'10px', gap:'20px'}} type='radio' name='view'></input>Their subordinates'  peers and manager deals<br></br>
                        <input style={{marginTop:'10px', gap:'20px'}} type='radio' name='view' ></input> Same deals as thier manager<br></br>
                      </div>
                             <input style={{marginTop:'30px', gap:'10px', transform: "scale(1.4)", marginRight: "8px" }} type="checkbox" />Can add Properties<br></br>
                      
                              <input style={{marginTop:'30px', gap:'10px', transform: "scale(1.4)", marginRight: "8px"}} type="checkbox" />Can update Properties<br></br>
                               <input style={{marginTop:'10px', gap:'10px'}} type='radio' name='update' ></input> Only thier and subordinates deals<br></br>
                                <input style={{marginTop:'10px', gap:'10px'}} type='radio' name='update' ></input> All deals they can view<br></br>
                      
                                <input style={{marginTop:'30px', gap:'10px', transform: "scale(1.4)", marginRight: "8px"}} type="checkbox" />Can reassign ownership of Properties<br></br>
                               <input style={{marginTop:'10px', gap:'10px'}} type='radio' name='reassing' ></input>Only thier and subordinates deals<br></br>
                                <input style={{marginTop:'10px', gap:'10px'}} type='radio' name='reassing' ></input>  All deals they can view<br></br>
                      
                                  <input style={{marginTop:'30px', transform: "scale(1.4)", marginRight: "8px"}} type="checkbox" />Can delete Properties<br></br>
                               <input style={{marginTop:'10px'}} type='radio' name=' delete' ></input>Only thier and subordinates deals<br></br>
                                <input style={{marginTop:'10px'}} type='radio' name=' delete' ></input>  All deals they can view<br></br>
                      
                               <div  style={{marginTop:'15px'}}>
                                <h8 >Can view Properties Owner</h8> <br></br>
                       <input style={{marginTop:'10px'}} type='radio' name='Owner'></input> Their and subordinates' deals <br></br>
                        <input style={{marginTop:'10px'}} type='radio' name='Owner'></input>Their subordinates' and peers' deals<br></br>
                        <input style={{marginTop:'10px'}} type='radio' name='Owner'></input>Their subordinates'  peers and manager deals<br></br>
                        <input style={{marginTop:'10px'}} type='radio' name='Owner' ></input> Same deals as thier manager<br></br>
                           </div>
                      </div>
                      
                      
                            
                          </div>
                                      
                              
                                
                              
                                          </Modal.Body>
                                          <Modal.Footer>
                                       
                                            <Button variant="secondary" onClick={handleClose1}>
                                              Cancel
                                            </Button>
                                            <Button variant="secondary" style={{display:selectedItems.length===0?"block":"none"}}>
                                              Add user
                                            </Button>
                                         
                                          </Modal.Footer>
                                        </Modal>


                   </div>
        
      
    </div>
  )
}

export default Users

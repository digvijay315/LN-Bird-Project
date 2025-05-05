import {React,useState,useEffect} from 'react'
import Header1 from './header1'
import Sidebar1 from './sidebar1'
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
import Tooltip from '@mui/material/Tooltip';
import Swal from 'sweetalert2';
import { ToastContainer,toast } from "react-toastify";

function Leadscoresettings() {


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
    { id: 'reason', name: 'Reason' },
    { id: 'direction', name: 'Call_Direction' },
    { id: 'status', name: 'Call_Status' },
    { id: 'result', name: 'Result' },
    { id: 'score', name: 'Score' },

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


       const [show1, setshow1] = useState(false);
      
       const handleClose1 = () => setshow1(false);

       const handleShow1=async()=>setshow1(true);

       const [leadscore, setleadscore] = useState({reason:"",direction:"",status:"",result:"",score:""});

       const [reasons, setReasons] = useState(["Site Visit", "Builder Discount/Scheme","Construction Update","Documentation","Inventory Availability","Inventory Rights for Listing","Legal",
                                                " Loan Discussion","Meeting","Negotiation Discussion","Other","Registry Preparation & Timeline",
                                                "Requirement"," Review/Feedback","Tax Discussion"
       ]);
       const [showInput, setShowInput] = useState(false);
       const [newReason, setNewReason] = useState(""); 

       const handleSelectChange = (e) => {
        const value = e.target.value;
        setleadscore({...leadscore,reason:e.target.value});
        if (value === "add_new") {
          setShowInput(true);
        } else {
          setShowInput(false);
        }
      };
    
      const handleAddReason = () => {
        if (newReason.trim() !== "") {
          setReasons([...reasons, newReason]);
          setleadscore({...leadscore,reason:newReason});
          setNewReason("");
          setShowInput(false);
        }
      };

      const [directions, setdirections] = useState(["Outgoing Call", " Inccoming Call",]);
          const [showdirectionInput, setShowdirectionInput] = useState(false);
          const [newdirection, setNewdirection] = useState(""); 

          const handleSelectdirectionChange = (e) => {
          const value = e.target.value;
          setleadscore({...leadscore,direction:e.target.value});
          if (value === "add_new") {
          setShowdirectionInput(true);
          } else {
            setShowdirectionInput(false);
          }
          };

          const handleAdddirection = () => {
          if (newdirection.trim() !== "") {
            setdirections([...directions, newdirection]);
          setleadscore({...leadscore,direction:newdirection});
          setNewdirection("");
          setShowdirectionInput(false);
          }
          };

          const [callstatus, setcallstatus] = useState(["Answered", "Cut Call","Not Picked","Busy","Missed","Not Reachable"," Switch Off",
                                                        " Number Invalid","Waiting"]);
          const [showcallstatusInput, setShowcallstatusInput] = useState(false);
          const [newcallstatus, setNewcallstatus] = useState(""); 

          const handleSelectstatusChange = (e) => {
          const value = e.target.value;
          setleadscore({...leadscore,status:e.target.value});
          if (value === "add_new") {
          setShowcallstatusInput(true);
          } else {
            setShowcallstatusInput(false);
          }
          };

          const handleAddstatus = () => {
          if (newcallstatus.trim() !== "") {
            setcallstatus([...callstatus, newcallstatus]);
          setleadscore({...leadscore,status:newcallstatus});
          setNewcallstatus("");
          setShowcallstatusInput(false);
          }
          };

          const [callresult, setcallresult] = useState([" Token Terms Accepted – Booking Discussion", "Budget Shared – Awaiting Options",
            " Interested – Wants More Options"," Budget Approved – Awaiting Shortlist","Final Deal Discussion Pending","Possession Status Confirmed",
          "Wants Legal/Document Review","Need More Inventory Options"]);
            const [showcallresultInput, setShowcallresultInput] = useState(false);
            const [newcallresult, setNewcallresult] = useState(""); 

            const handleSelectresultChange = (e) => {
            const value = e.target.value;
            setleadscore({...leadscore,result:e.target.value});
            if (value === "add_new") {
              setShowcallresultInput(true);
            } else {
              setShowcallresultInput(false);
            }
            };

            const handleAddresult = () => {
            if (newcallresult.trim() !== "") {
              setcallresult([...callresult, newcallresult]);
            setleadscore({...leadscore,result:newcallresult});
            setNewcallresult("");
            setShowcallresultInput(false);
            }
            };

            const [callscore, setcallscore] = useState(["1", "2","3","4","5","6","7","8","9","-1","-2","-3","-4","-5","-6","-7","-8","-9"]);
              const [showcallscoreInput, setShowcallscoreInput] = useState(false);
              const [newcallscore, setNewcallscore] = useState(""); 
  
              const handleSelectscoreChange = (e) => {
              const value = e.target.value;
              setleadscore({...leadscore,score:e.target.value});
              if (value === "add_new") {
                setShowcallscoreInput(true);
              } else {
                setShowcallscoreInput(false);
              }
              };
  
              const handleAddscore = () => {
              if (newcallscore.trim() !== "") {
                setcallscore([...callscore, newcallscore]);
              setleadscore({...leadscore,score:newcallscore});
              setNewcallscore("");
              setShowcallscoreInput(false);
              }
              };
  
              const addleadscore=async(event)=>
                {
                  
                  try {
                    const resp=await api.post('addleadscore',leadscore)
                    if(resp.status===200)
                    {
                      Swal.fire({
                              title: "Lead Score",
                              text: "lead score criteria saved successfully",
                              icon: "success",
                              confirmButtonColor: '#d33',
                              confirmButtonText: 'OK',
                      })
                    }
                    handleClose1()
                    setTimeout(() => {
                      window.location.reload()
                    }, 2000);
                  } catch (error) {
                    console.log(error);
                  }
                
                }
          

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
           
           <h3 style={{marginLeft:"10px",cursor:"pointer"}}>Lead Score Creating </h3>
          
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

                 <Tooltip title="Add Lead Score Criteria..." arrow>
                           <button onClick={handleShow1}  style={{ position:"relative",marginLeft: '40%',width:"50px",padding: '8px',color: 'white',border: 'none', borderRadius: '4px',cursor: 'pointer',fontWeight: 'bold',textAlign: 'center'}} className="form-control form-control-sm form-control form-control-sm-sm"  >
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

         
           
             
  
            <div style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white"}}>
                <TableContainer component={Paper} style={{ maxHeight: '700px', overflow: 'auto' }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead style={{ position: "sticky", top: 0, zIndex: 1 }}>
              <TableRow >
                <StyledTableCell style={{backgroundColor:"gray"}}>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </StyledTableCell>
                {visibleColumns.map((col) => (
                  <StyledTableCell
                    key={col.id}
                    style={{   cursor: 'pointer',backgroundColor:"gray" }}
                  >
                    {col.name}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <tbody>
              {
               
              currentItems.map ((item, index) => (
                <StyledTableRow key={index} >
                  <StyledTableCell >
                    <input 
                      type="checkbox"
                      checked={selectedItems.includes(item._id)}
                      onChange={() => handleRowSelect(item._id)}
                    />
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell 
                    style={{ padding: "10px", cursor: "pointer",fontSize:"12px" }} 
                  >
                  {item.reason}
        
               
                  </StyledTableCell>
      
                  <StyledTableCell 
                    style={{ padding: "10px",fontSize:"12px" }} 
                   
                  >
                    {item.direction}
                  </StyledTableCell>
      
                  <StyledTableCell 
                    style={{ padding: "10px",fontSize:"12px" }} 
                   
                  >
                   {item.status}
                  </StyledTableCell>
                
                  <StyledTableCell 
                    style={{ padding: "10px",fontSize:"12px" }} 
                   
                  >
                   {item.result}
                  </StyledTableCell>

                  <StyledTableCell 
                    style={{ padding: "10px",fontSize:"12px" }} 
                   
                  >
                   {item.score}
                  </StyledTableCell>
                   
         
                    
              
                </StyledTableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
        
            </div>

        <Modal  show={show1} onHide={handleClose1} size='lg' style={{transition:"0.5s ease-in"}}>
                    <Modal.Header>
                      <Modal.Title>Add Lead Score Criteria<br></br>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
               
               <div className="row">
        
                             <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Reason</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.reason}
                              onChange={handleSelectChange}
                            >
                              <option value="">---Select---</option>
                              {reasons.map((reason, idx) => (
                                <option key={idx} value={reason}>{reason}</option>
                              ))}
                              <option value="add_new" style={{color:"blue"}}>+ Add New Reason</option>
                            </select>

                            {showInput && (
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new reason"
                                  value={newReason}
                                  onChange={(e) => setNewReason(e.target.value)}
                                  style={{ fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary mt-2"
                                  onClick={handleAddReason}
                                >
                                  Add Reason
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Call Direction</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.direction}
                              onChange={handleSelectdirectionChange}
                            >
                              <option value="">---Select---</option>
                              {directions.map((reason, idx) => (
                                <option key={idx} value={reason}>{reason}</option>
                              ))}
                              <option value="add_new" style={{color:"blue"}}>+ Add New Reason</option>
                            </select>

                            {showdirectionInput && (
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new reason"
                                  value={newdirection}
                                  onChange={(e) => setNewdirection(e.target.value)}
                                  style={{ fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary mt-2"
                                  onClick={handleAdddirection}
                                >
                                  Add Direction
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Call Status</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.status}
                              onChange={handleSelectstatusChange}
                            >
                              <option value="">---Select---</option>
                              {callstatus.map((reason, idx) => (
                                <option key={idx} value={reason}>{reason}</option>
                              ))}
                              <option value="add_new" style={{color:"blue"}}>+ Add New Reason</option>
                            </select>

                            {showcallstatusInput && (
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new reason"
                                  value={newcallstatus}
                                  onChange={(e) => setNewcallstatus(e.target.value)}
                                  style={{ fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary mt-2"
                                  onClick={handleAddstatus}
                                >
                                  Add Status
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Result</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.result}
                              onChange={handleSelectresultChange}
                            >
                              <option value="">---Select---</option>
                              {callresult.map((reason, idx) => (
                                <option key={idx} value={reason}>{reason}</option>
                              ))}
                              <option value="add_new" style={{color:"blue"}}>+ Add New Reason</option>
                            </select>

                            {showcallresultInput && (
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new reason"
                                  value={newcallresult}
                                  onChange={(e) => setNewcallresult(e.target.value)}
                                  style={{ fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary mt-2"
                                  onClick={handleAddresult}
                                >
                                  Add Result
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
                            <label className="labels" style={{ fontSize: "12px" }}>Score</label>
                            <select
                              required
                              className="form-control form-control-sm"
                              style={{ fontSize: "12px" }}
                              value={leadscore.score}
                              onChange={handleSelectscoreChange}
                            >
                              <option value="">---Select---</option>
                              {callscore.map((reason, idx) => (
                                <option key={idx} value={reason}>{reason}</option>
                              ))}
                              <option value="add_new" style={{color:"blue"}}>+ Add New Reason</option>
                            </select>

                            {showcallscoreInput && (
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="Enter new reason"
                                  value={newcallscore}
                                  onChange={(e) => setNewcallscore(e.target.value)}
                                  style={{ fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary mt-2"
                                  onClick={handleAddscore}
                                >
                                  Add Score
                                </button>
                              </div>
                            )}
                          </div>
                       
        
               </div>
                
        
          
        
                    </Modal.Body>
                    <Modal.Footer>
                 
                      <Button variant="secondary" onClick={handleClose1}>
                        Close
                      </Button>
                      <Button variant="secondary" onClick={addleadscore}>
                        Save
                      </Button>
                    </Modal.Footer>
                  </Modal>

    </div>
  )
}

export default Leadscoresettings

import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ToastContainer,toast } from "react-toastify";
import React from "react";
import { event } from "jquery";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { utils, writeFile } from "xlsx";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { SvgIcon } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';

import api from "../api";

function Dealdetails() {
  const navigate=useNavigate()
    React.useEffect(()=>{fetchdata()},[])


    const[data,setdata]=useState([])
    const fetchdata=async(event)=>
        {
          
          try {
            const resp=await api.get('viewdeal')
            const all=(resp.data.deal)
            setdata(all)
          } catch (error) {
            console.log(error);
          }
        
        }


        const deleteinventory=async(item)=>
            {
              try {
                const id=item._id
                const resp=await api.delete(`removeinventory/${id}`)
                toast.success("inventory deleted successfully")
                setTimeout(() => {
                  window.location.reload()
                }, 2000);
              } catch (error) {
                console.log(error);
              }
            }
      

       
         
/*-------------------------------------------------------------------update inventory start---------------------------------------------------------------------------- */

        
     
        
        
      
      
       
       

 /*-------------------------------------------------------------------update updatecontactdata end---------------------------------------------------------------------------- */                                                     
 const exportToExcel = () => {
  const filteredData = data.map(({ developer,block_tower, project,unit_number,location,linkded_contact,ownership,facing}) => ({ developer,block_tower, project,unit_number,location,linkded_contact,ownership,facing }));
  // Create a new workbook
  const workbook = utils.book_new();

  // Convert data to a worksheet
  const worksheet = utils.json_to_sheet(filteredData);

  // Append the worksheet to the workbook
  utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Export the workbook to an Excel file
  writeFile(workbook, "inventory_data.xlsx");
};
 
 
 
 
 
 
 
 
     
        
          
    

    const[ischecked,setischecked]=useState(false)
    const handleischeckedchange=(e)=>
    {
      setischecked(e.target.checked)
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
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


      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(5); // User-defined items per page
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
      
    //   ({:"",stage:"",project:"",block:"",unit_number:"",floors:"",
    //     expected_price:"",quote_price:"",security_deposite:"",
    //  maintainence_charge:"",rent_escltion:"",rent_period:"",fitout_perioud:"",
    //  deal_type:"",transaction_type:"",source:"",white_portion:"",team:"",user:"",visible_to:"",
    //  owner_details:[],document_details:[],s_no:[],preview:[],descriptions:[],category:[],action:[],s_no1:[],url:[],action1:[],
    //  website:"",social_media:"",send_matchedlead:""})
      const allColumns = [
        { id: 'sno', name: '#' },
        { id: 'details', name: 'Details' },
        { id: 'unit_number', name: 'Unit Number' },
        { id: 'owner_details', name: 'Owner Details' },
        { id: 'associated_contact', name: 'Associated Contact' },
        { id: 'expected_price', name: 'Expectation' },
        { id: 'matchinglead', name: 'Matched Lead' },
        { id: 'stage', name: 'Status' },
        { id: 'assigned_to', name: 'Assigned To' },
        { id: 'remarks', name: 'Remarks' },
        { id: 'follow_up', name: 'Follow Up' },
        { id: 'last_contacted', name: 'Last Contacted Date & Time' },
        { id: 'action', name: 'Action' },
        { id: 'available_for', name: 'Available For' },
        { id: 'mobile_type', name: 'Mobile Type' },
        { id: 'email_type', name: 'Email Type' },
        { id: 'designation', name: 'Designation' },
        { id: 'company_name', name: 'Company Name' },
        { id: 'tags', name: 'Tags' },
        { id: 'father_husband_name', name: 'Father/Husband Name' },
        { id: 'h_no', name: 'House No' },
        { id: 'area1', name: 'Street Address' },
        { id: 'location1', name: 'Location' },
        { id: 'city1', name: 'City' },
        { id: 'pincode1', name: 'Pincode' },
        { id: 'state1', name: 'State' },
        { id: 'country1', name: 'Country' },
        { id: 'source', name: 'Source' },
        { id: 'category', name: 'Category' },
        { id: 'profession_category', name: 'Profession Category' },
        { id: 'profession_subcategory', name: 'Profession Dub-Category' },
        { id: 'company_name', name: 'Company Name' },
        { id: 'country_code1', name: 'Country Code' },
        { id: 'company_phone', name: 'Company Phone' },
        { id: 'company_email', name: 'Company Email' },
        { id: 'owner', name: 'Owner' },
        { id: 'team', name: 'Team' },
        { id: 'gender', name: 'Gender' },
        { id: 'visible_to', name: 'Visible To' },
        { id: 'maritial_status', name: 'Marital Status' },
        { id: 'birth_date', name: 'Birth Date' },
        { id: 'anniversary_date', name: 'Anniversary Date' },
        { id: 'education', name: 'Education' },
        { id: 'degree', name: 'Degree' },
        { id: 'school_college', name: 'School/College' },
        { id: 'loan', name: 'Loan' },
        { id: 'bank', name: 'Bank' },
        { id: 'amount', name: 'Amount' },
        { id: 'social_media', name: 'Social Media' },
        { id: 'url', name: 'URL' },
        { id: 'income', name: 'Income' },
        { id: 'amount1', name: 'Amount 1' },
        { id: 'document_no', name: 'Document No' },
        { id: 'document_name', name: 'Document Name' },
        { id: 'industry', name: 'Industry' },
        { id: 'area', name: 'Company Address' },
        { id: 'location', name: 'Company Location' },
        { id: 'city', name: 'Company City' },
        { id: 'pincode', name: 'Company Pincode' },
        { id: 'state', name: 'Company State' },
        { id: 'country', name: 'Company Country' },
        { id: 'company_social_media', name: 'Company Social Media' },
        { id: 'company_url', name: 'Company Url' },
        { id: 'descriptions', name: 'Descriptions' },
        { id: 'relation', name: 'Relation' }
      ];
      const [selectedItems, setSelectedItems] = useState([]); // To track selected rows
      const [selectAll, setSelectAll] = useState(false); // To track the state of the "Select All" checkbox
      const [visibleColumns, setVisibleColumns] = useState(allColumns.slice(1, 13));
      const [showColumnList, setShowColumnList] = useState(false);

      const handleAddColumnClick = () => {
        setShowColumnList(!showColumnList);
      };
    
      const handleCheckboxChange = (column) => {
        if (visibleColumns.some((col) => col.id === column.id)) {
          // Remove column from visibleColumns if it's already present
          setVisibleColumns(visibleColumns.filter((col) => col.id !== column.id));
        } else {
          // Add column to visibleColumns
          setVisibleColumns([...visibleColumns, column]);
        }
      };
      const handleSelectAll = () => {
        // document.getElementById("delete").style.display="inline-block"
        // document.getElementById("search").style.display="none"
        // document.getElementById("edit").style.display="none"
        // document.getElementById("mail").style.display="inline-block"
        //  document.getElementById("whatsapp").style.display="inline-block"
        //  document.getElementById("message").style.display="inline-block"
        setSelectAll(!selectAll);
        if (!selectAll) {
          // Add all current page item IDs to selectedItems
          setSelectedItems(currentItems.map((item) => item._id));
        } else {
          // Deselect all
          setSelectedItems([]);
        //   document.getElementById("delete").style.display="none"
        //   document.getElementById("search").style.display="flex"
        //   document.getElementById("edit").style.display="none"
        //   document.getElementById("mail").style.display="none"
        //    document.getElementById("whatsapp").style.display="none"
        //    document.getElementById("message").style.display="none"
        }
      };
    
      const handleRowSelect = (id) => {
        // document.getElementById("delete").style.display="none"
        // document.getElementById("edit").style.display="none"
        // document.getElementById("mail").style.display="none"
        //  document.getElementById("whatsapp").style.display="none"
        //     document.getElementById("message").style.display="none"
        // document.getElementById("search").style.display="flex"
        if (selectedItems.includes(id)) {
          setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
        } else {
          setSelectedItems([...selectedItems, id]);
        //   document.getElementById("delete").style.display="inline-block"
        //    document.getElementById("edit").style.display="inline-block"
        //  document.getElementById("mail").style.display="inline-block"
        //   document.getElementById("whatsapp").style.display="inline-block"
        //      document.getElementById("message").style.display="inline-block"
        //  document.getElementById("search").style.display="none"
        }
      };


      const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
      const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
          direction = 'desc';
        }
        
        const sortedData = [...data].sort((a, b) => {
          if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
          if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
          return 0;
        });
      
        setSortConfig({ key, direction });
        setdata(sortedData)
      };


    return ( 
        <div>
            <Header1/>
            <Sidebar1/>
      <div style={{marginTop:"80px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
        
        <h3 style={{marginLeft:"10px",cursor:"pointer"}}>Inventory</h3>
        <button  class="btn btn-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent",border:"none"}}>
            <img src="https://static.thenounproject.com/png/61783-200.png" style={{height:"25px"}}/>
        </button>
            <ul class="dropdown-menu" id="exporttoexcel"> 
              
            <li  onClick={exportToExcel} >Export Data</li>
              
            </ul>
        {/* <button className="form-control" style={{width:"200px",marginLeft:"10px"}}>Select Team</button>
        <button className="form-control" style={{width:"300px",marginLeft:"10px"}}>Select Sales Manager</button>
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent",marginLeft:"40%"}}>
            Add Inventory
        </button>
            <ul class="dropdown-menu">
              <li><Link to={'/addinventory'} class="dropdown-item">Add Inventory</Link></li>
            </ul> */}
            <div style={{borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px",marginLeft:"70%"}}>
            <button  class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{marginLeft:"5px",color:"black",backgroundColor:"transparent",width:"120px"}}>
            Filter
        </button>
            {/* <ul class="dropdown-menu">
              <li>
                <label className="labels">By developer</label><input type="text" className="form-control form-control-sm" placeholder="filter from developer" /></li>
              <li><label className="labels">By location</label><input type="text" className="form-control form-control-sm" placeholder="filter from location" onChange={(e)=>setlocation(e.target.value)} onKeyDown={handlepress2}/></li>
            </ul> */}
        </div>  
      </div>
      <div style={{marginTop:"10px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px"}}>
        <div className="lead" style={{width:"200px",padding:"10px",borderRadius:"10px",}}>
          <h6>OPEN</h6>
          <p>{}</p>
        </div>
        <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
          <h6>QUOTE</h6>
          <p>{}</p>
        </div>
        <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
          <h6>NEGOTIATION</h6>
          <p></p>
        </div>
        <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
          <h6>BOOKED</h6>
          <p>{}</p>
        </div>
        <div style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
     
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent",border:"none",fontWeight:"bold",marginTop:"-10px"}}>
            CLOSED
        </button>
            <ul class="dropdown-menu">
              <li className="form-control">Won <span style={{fontSize:"30px",color:"green",fontWeight:"bolder"}}><sup></sup></span></li>
              <li className="form-control">Reject <span style={{fontSize:"30px",color:"red",fontWeight:"bolder"}}><sup></sup></span></li>
              <li className="form-control">Lost <span style={{fontSize:"30px",color:"red",fontWeight:"bolder"}}><sup></sup></span></li>
            </ul>
        </div>  
        
        
      </div>

      <div style={{marginTop:"10px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"10px",paddingTop:"10px"}}>
      <input type="checkbox" onChange={handleischeckedchange}/>
      <input id="search" type="text" disabled={!ischecked} className="form-control form-control-sm form-control form-control-sm-sm" placeholder="search for tasks calls etc." style={{width:"25%"}} />
      <div style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"70%",position:"absolute"}}>
           {/* <Button className="form-control form-control-sm" style={{width:"120px",backgroundColor:"transparent"}}>Play Task</Button> */}
         
           </div>

    
    
      {/* <div style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"80%",position:"absolute"}}>
   
      
      <label htmlFor="itemsPerPage" style={{fontSize:"16px",fontFamily:"times new roman"}}>Items: </label>
      <select id="itemsPerPage" value={itemsPerPage}  style={{fontSize:"16px",fontFamily:"times new roman",height:"30px"}}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    
    {renderPageNumbers()}
    </div>  */}

    <div style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"80%",position:"absolute"}}>
      
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
      {/* <div style={{marginTop:"10px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px",paddingTop:"10px"}}>
          <button className="form-control" style={{width:"150px",marginLeft:"86.5%"}} onClick={exportToExcel} >Export Data</button>
          </div> */}
        <div style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white"}}>
          <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
          </StyledTableCell>
          {visibleColumns.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{ fontFamily: "times new roman",  cursor: 'pointer' }}
              onClick={() => handleSort(col.id)}
            >
              {col.name}
              {sortConfig.key === col.id ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓') : ''}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <tbody>
        {
         
        currentItems.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
              <input 
                type="checkbox"
                checked={selectedItems.includes(item._id)}
                onChange={() => handleRowSelect(item._id)}
              />
              {index + 1}
            </StyledTableCell>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
             {item.project_category}<br></br>
             {item.project_subcategory}<br></br>
             {item.location}
            </StyledTableCell>
            
            {visibleColumns
              .filter((col) => col.id !== 'sno' && col.id !== 'details')
              .map((col) => (
                <StyledTableCell 
                key={col.id} 
                style={{ padding: "10px", fontFamily: "times new roman" }}
              >
                {col.id === 'owner_details' && Array.isArray(item.owner_details) ? (
                  item.owner_details.map(detail => (
                    <div key={detail._id}>
                      {detail.first_name} {detail.last_name} <br />
                      {Array.isArray(detail.mobile_no) ? (
                        detail.mobile_no.map((mobile, index) => (
                          <div key={index}>
                            <SvgIcon component={PhoneIphoneIcon} />
                            <span style={{color:"#9400D3"}}>{mobile}</span>
                            <br />
                          </div>
                        ))
                      ) : (
                        detail.mobile_no
                      )}
                    </div>
                  ))
                ) : col.id === 'associated_contact' && Array.isArray(item.associated_contact) ? (
                  item.associated_contact.map(contact => (
                    <div key={contact._id}>
                        {item.relation} <br></br>
                      {contact.first_name} {contact.last_name} <br />
                      {Array.isArray(contact.mobile_no) ? (
                        contact.mobile_no.map((mobile, index) => (
                          <div key={index}>
                            <SvgIcon component={PhoneIphoneIcon} />
                            <span style={{color:"#9400D3"}}>{mobile}</span>
                            <br />
                          </div>
                        ))
                      ) : (
                        contact.mobile_no
                      )}
                    </div>
                  ))
                ) : col.id === 'action' ? (
                    <div className="dropdown">
                      <button 
                        className="btn btn-secondary dropdown-toggle" 
                        type="button" 
                        id={`dropdownMenuButton${index}`} 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                      >
                        
                      </button>
                      <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${index}`}>
                        <li><a className="dropdown-item" href="#">Edit</a></li>
                        <li><a className="dropdown-item" href="#">Delete</a></li>
                      </ul>
                    </div>
                  ) :  (
                  typeof item[col.id] === 'object' ? JSON.stringify(item[col.id]) : item[col.id]
                )}
              </StyledTableCell>
              ))}
              
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"40px",bottom:"0",backgroundColor:"#f8f9fa"}}>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman",color:"GrayText"}}>Summary</h5>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Total Contact <span style={{color:"green",fontSize:"25px"}}></span></h5>
        </footer>
      </div>
    <div style={{height:"100px"}}>
      <div style={{display:"flex",fontSize:"20px",gap:"10px",justifyContent:"right",paddingRight:"60px", marginTop:"10px"}}>{renderPageNumbers()}</div></div>
      

     
            
         

          
        <ToastContainer/>
        </div>
     );
}

export default Dealdetails;
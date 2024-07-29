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

function InventoryDetails() {
    React.useEffect(()=>{fetchdata()},[])


    const[data,setdata]=useState([])
    const fetchdata=async(event)=>
        {
          
          try {
            const resp=await axios.get('http://localhost:5000/viewinventory')
            const all=(resp.data.inventory)
            setdata(all)
          } catch (error) {
            console.log(error);
          }
        
        }
        const[developer,setdeveloper]=useState('')
        const fetchdata_bydeveloper=async()=>
            {
              try {
                const resp= await axios.get(`http://localhost:5000/viewinventorybydeveloper/${developer}`)
                const incoming=(Array.isArray(resp.data.inventory) ? resp.data.inventory : [resp.data.inventory]);
                setdata(incoming)
              } catch (error) {
                console.log(error);
              }
            }
            const handlepress1=(event)=>
            {
                if(event.key=="Enter")
                {
                    fetchdata_bydeveloper()
                }
            }

            const[location,setlocation]=useState('')
            const fetchdata_bylocation=async()=>
                {
                  try {
                    const resp= await axios.get(`http://localhost:5000/viewinventorybylocation/${location}`)
                    const incoming=(Array.isArray(resp.data.inventory) ? resp.data.inventory : [resp.data.inventory]);
                    setdata(incoming)
                  } catch (error) {
                    console.log(error);
                  }
                }
                const handlepress2=(event)=>
                {
                    if(event.key=="Enter")
                    {
                        fetchdata_bylocation()
                    }
                }
        const deleteinventory=(item)=>
            {
              try {
                const id=item._id
                const resp=axios.delete(`http://localhost:5000/removeinventory/${id}`)
                toast.success("inventory deleted successfully")
                setTimeout(() => {
                  window.location.reload()
                }, 2000);
              } catch (error) {
                console.log(error);
              }
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
    const [itemsPerPage] = useState('5');
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    const renderPageNumbers = () => {
      return Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
        <button key={number} onClick={() => paginate(number)} style={{width:"30px",borderRadius:"5px"}}>
          {number}
        </button>
      ));
    };

    return ( 
        <div>
            <Header1/>
            <Sidebar1/>
      <div style={{marginTop:"80px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
        
        <h3 style={{marginLeft:"10px"}}>Inventory</h3>
        <button className="form-control" style={{width:"200px",marginLeft:"10px"}}>Select Team</button>
        <button className="form-control" style={{width:"300px",marginLeft:"10px"}}>Select Sales Manager</button>
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent",marginLeft:"40%"}}>
            Add Inventory
        </button>
            <ul class="dropdown-menu">
              <li><Link to={'/addinventory'} class="dropdown-item">Add Inventory</Link></li>
            </ul>
      </div>
      <div style={{marginTop:"10px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px"}}>
        {/* <div className="lead" style={{width:"200px",padding:"10px",borderRadius:"10px",}}>
          <h6>INCOMING</h6>
          <p>{}</p>
        </div>
        <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
          <h6>PROSPECT</h6>
          <p>{}</p>
        </div>
        <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
          <h6>OPPORTUNITY</h6>
          <p></p>
        </div>
        <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
          <h6>NEGOTIATION</h6>
          <p>{}</p>
        </div> */}
        <div className="lead" style={{width:"200px",borderRadius:"10px",padding:"10px",marginLeft:"70%",textAlign:"center"}} onClick={fetchdata}>
          <h6>All</h6>
        </div>
        <div style={{borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
            <button  class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{marginLeft:"5px",color:"black",backgroundColor:"transparent",width:"150px"}}>
            Filter
        </button>
            <ul class="dropdown-menu">
              <li>
                <label className="labels">By developer</label><input type="text" className="form-control form-control-sm" placeholder="filter from developer" onChange={(e)=>setdeveloper(e.target.value)} onKeyDown={handlepress1}/></li>
              <li><label className="labels">By location</label><input type="text" className="form-control form-control-sm" placeholder="filter from location" onChange={(e)=>setlocation(e.target.value)} onKeyDown={handlepress2}/></li>
            </ul>
        </div>  
        
      </div>
      <div style={{marginTop:"10px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px",paddingTop:"10px"}}>
          <button className="form-control" style={{width:"150px",marginLeft:"86.5%"}} >Export Data</button>
          </div>
          <div style={{paddingLeft:"60px",marginTop:"10px",backgroundColor:"white"}}>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">#</StyledTableCell>
            <StyledTableCell align="left">Developer</StyledTableCell>
            <StyledTableCell align="left">Block/Tower</StyledTableCell>
            <StyledTableCell align="left">Project</StyledTableCell>
            <StyledTableCell align="left">Unit No.</StyledTableCell>
            <StyledTableCell align="left">Location</StyledTableCell>
            <StyledTableCell align="left">Linked Contact</StyledTableCell>
            <StyledTableCell align="left">Ownership</StyledTableCell>
            <StyledTableCell align="left">Facing</StyledTableCell>
            <StyledTableCell align="left">Operations</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentItems.map((item,index) => (
            <StyledTableRow key={item.title}>
               <StyledTableCell align="left">{index+1}</StyledTableCell>
              <StyledTableCell className="personaldetails" align="left" component="th" scope="row" >
                {item.developer}
              </StyledTableCell>
              <StyledTableCell align="left">
                {item.block_tower} 
              </StyledTableCell>
              <StyledTableCell align="left">{item.project}</StyledTableCell>
              <StyledTableCell align="left">{item.unit_number}</StyledTableCell>
              <StyledTableCell align="left">{item.location}</StyledTableCell>
              <StyledTableCell align="left">{item.linkded_contact}</StyledTableCell>
              <StyledTableCell align="left">{item.ownership}</StyledTableCell>
              <StyledTableCell align="left">{item.facing}</StyledTableCell>
              <StyledTableCell align="left">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:"transparent",color:"black"}}>
            Actions
               </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item"  style={{cursor:"pointer"}} >Edit</a></li>
              <li><a class="dropdown-item" style={{cursor:"pointer"}} onClick={()=>deleteinventory(item)}>Delete</a></li>
            </ul>

              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    <div style={{height:"100px"}}>
      <div style={{display:"flex",fontSize:"20px",gap:"10px",justifyContent:"right",paddingRight:"60px", marginTop:"10px"}}>{renderPageNumbers()}</div></div>
      <ToastContainer/>
        </div>
     );
}

export default InventoryDetails;
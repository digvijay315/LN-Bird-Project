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

function InventoryDetails() {
  const navigate=useNavigate()
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

/*-------------------------------------------------------------------update inventory start---------------------------------------------------------------------------- */

        const [show1, setshow1] = useState(false);
        const[image,setimage]=useState([])
        const handleClose1 = () => setshow1(false);
        const[data1,setdata1]=useState([])
        const handleShow1=(item)=>
        {
          setshow1(true);
          setdata1(item)
          setimage(item.preview)
        }
        console.log(image);
      
       
        const[updatecontactdata,setupdatecontactdata]=useState({developer:data1.developer,block_tower:data1.block_tower,project:data1.project,
                                                      unit_number:data1.unit_number,sub_category:data1.sub_category,size:data1.size,project1:data1.project1,
                                                      facing:data1.facing,road:data1.road,ownership:data1.ownership,type:data1.type,cluter_details:data1.cluter_details,
                                                      length:data1.length,breadth:data1.breadth,total_area:data1.total_area,in_metrics:data1.in_metrics,
                                                      occupation_date:data1.occupation_date,age_of_construction:data1.age_of_construction,furnish_details:data1.furnish_details,
                                                      furnished_item:data1.furnished_item,aminities:data1.aminities,location:data1.location,lattitude:data1.lattitude,langitude:data1.langitude,
                                                      s_no:[],preview:[],descriptions:[],category:[],action:[],s_no1:[],url:[],action1:[],search_contact:data1.search_contact,
                                                      relation:data1.relation,document_name:data1.document_name,number:data1.number,date:data1.date,linkded_contact:data1.linkded_contact})

                                                      function handler()
                                                      {
                                                          document.getElementById("projectform").style.display="none";
                                                          document.getElementById("basicform").style.display="flex";
                                              
                                                          document.getElementById("projectbtn").style.display="none";
                                                          document.getElementById("basicbtn").style.display="block";
                                                          document.getElementById("prevbtn").style.display="block";
                                              
                                                          document.getElementById("projectlabel").style.color="black";
                                                          document.getElementById("basiclabel").style.color="green";
                                                      }
                                                      function handler2()
                                                      {
                                                          document.getElementById("projectform").style.display="block";
                                                          document.getElementById("basicform").style.display="none";
                                              
                                                          document.getElementById("projectbtn").style.display="block";
                                                          document.getElementById("basicbtn").style.display="none";
                                                          document.getElementById("prevbtn").style.display="none";
                                              
                                                          document.getElementById("projectlabel").style.color="green";
                                                          document.getElementById("basiclabel").style.color="black";
                                                      }
                                                      function handler3()
                                                      {
                                                        document.getElementById("photolabel").style.color="green";
                                                        document.getElementById("basiclabel").style.color="black";
                                              
                                                        document.getElementById("photosform").style.display="block";
                                                        document.getElementById("basicform").style.display="none";
                                              
                                                        document.getElementById("basicbtn").style.display="none";
                                                        document.getElementById("prevbtn").style.display="none";
                                                        document.getElementById("photosbtn").style.display="block";
                                                        document.getElementById("prevbtn1").style.display="block";
                                                      }
                                                      function handler4()
                                                      {
                                                        document.getElementById("photolabel").style.color="black";
                                                        document.getElementById("basiclabel").style.color="green";
                                              
                                                        document.getElementById("photosform").style.display="none";
                                                        document.getElementById("basicform").style.display="block";
                                              
                                                        document.getElementById("basicbtn").style.display="block";
                                                        document.getElementById("prevbtn").style.display="block";
                                                        document.getElementById("photosbtn").style.display="none";
                                                        document.getElementById("prevbtn1").style.display="none";
                                                      }
                                                      function handler5()
                                                      {
                                                        document.getElementById("photolabel").style.color="black";
                                                        document.getElementById("ownerlabel").style.color="green";
                                              
                                                        document.getElementById("photosform").style.display="none";
                                                        document.getElementById("ownerform").style.display="block";
                                              
                                                        document.getElementById("photosbtn").style.display="none";
                                                        document.getElementById("prevbtn1").style.display="none";
                                                        document.getElementById("ownerbtn").style.display="block";
                                                        document.getElementById("prevbtn2").style.display="block";
                                                      
                                                      }
                                                      function handler6()
                                                      {


                                                        
                                                        document.getElementById("photolabel").style.color="green";
                                                        document.getElementById("ownerlabel").style.color="black";
                                              
                                                        document.getElementById("photosform").style.display="block";
                                                        document.getElementById("ownerform").style.display="none";
                                              
                                                        document.getElementById("photosbtn").style.display="block";
                                                        document.getElementById("prevbtn1").style.display="block";
                                                        document.getElementById("ownerbtn").style.display="none";
                                                        document.getElementById("prevbtn2").style.display="none";
                                                      }
                                                      function addFn() {
        
                                                        setupdatecontactdata({
                                                          ...updatecontactdata,
                                                          s_no1: [...updatecontactdata.s_no1, ''],
                                                          url: [...updatecontactdata.url, ''],
                                                          action1: [...updatecontactdata.action1, '']
                                                        });
                                                      };
                                                      const handleeducationChange = (index, event) => {
                                                        const neweducation = [...updatecontactdata.s_no1];
                                                        neweducation[index] = event.target.value;
                                                        setupdatecontactdata({
                                                          ...updatecontactdata,
                                                          s_no1: neweducation
                                                        });
                                                      };
                                                      const handleurlChange = (index, event) => {
                                                        const neweducation = [...updatecontactdata.url];
                                                        neweducation[index] = event.target.value;
                                                        setupdatecontactdata({
                                                          ...updatecontactdata,
                                                          url: neweducation
                                                        });
                                                      };
                                                  
                                                      const handlesnochange = (index, event) => {
                                                        const neweducation = [...updatecontactdata.s_no];
                                                        neweducation[index] = event.target.value;
                                                        setupdatecontactdata({
                                                          ...updatecontactdata,
                                                          s_no: neweducation
                                                        });
                                                      };
                                                      const handlepreviewchange = (index, event) => {
                                                        const neweducation = [...updatecontactdata.preview];
                                                        const files = Array.from(event.target.files);
                                                        const previewUrls = files.map(file => URL.createObjectURL(file));
                                                        neweducation[index] = {
                                                          files: files,
                                                          previewUrls: previewUrls
                                                        };
                                                        setupdatecontactdata(prevState => ({
                                                          ...prevState,
                                                          preview: neweducation
                                                        }));
                                                      };
                                                      
                                                  
                                                      const handledescriptionchange = (index, event) => {
                                                        const neweducation = [...updatecontactdata.descriptions];
                                                        neweducation[index] = event.target.value;
                                                        setupdatecontactdata({
                                                          ...updatecontactdata,
                                                          descriptions: neweducation
                                                        });
                                                      };
                                                      const handlecategorychange = (index, event) => {
                                                        const neweducation = [...updatecontactdata.category];
                                                        neweducation[index] = event.target.value;
                                                        setupdatecontactdata({
                                                          ...updatecontactdata,
                                                          category: neweducation
                                                        });
                                                      };
                                                  
                                                  
                                                      function addFn1() {
                                                          
                                                        setupdatecontactdata({
                                                          ...updatecontactdata,
                                                          s_no: [...updatecontactdata.s_no, ''],
                                                          preview: [...updatecontactdata.preview, ''],
                                                          descriptions: [...updatecontactdata.descriptions, ''],
                                                          category: [...updatecontactdata.category, ''],
                                                          action: [...updatecontactdata.action, '']
                                                        });
                                                      };
                                                  
                                                      const deleteall=(index)=>
                                                      {
                                                        // handleDeletesno(index)
                                                        // handleDeletepreview(index)
                                                        const newsno = updatecontactdata.s_no.filter((_, i) => i !== index);
                                                        const newpreview = updatecontactdata.preview.filter((_, i) => i !== index);
                                                        const newdescription = updatecontactdata.descriptions.filter((_, i) => i !== index);
                                                        const newcategory = updatecontactdata.category.filter((_, i) => i !== index);
                                                        const newaction = updatecontactdata.action.filter((_, i) => i !== index);
                                                        setupdatecontactdata({
                                                          ...updatecontactdata,
                                                          s_no: newsno,
                                                          preview: newpreview,
                                                          descriptions: newdescription,
                                                          category: newcategory,
                                                          action: newaction
                                                        });
                                                      }
                                                      const deleteall1=(index)=>
                                                        {
                                                          // handleDeletesno(index)
                                                          // handleDeletepreview(index)
                                                          const newsno1 = updatecontactdata.s_no1.filter((_, i) => i !== index);
                                                          const newurl = updatecontactdata.url.filter((_, i) => i !== index);
                                                          const newaction1 = updatecontactdata.action1.filter((_, i) => i !== index);
                                                          setupdatecontactdata({
                                                            ...updatecontactdata,
                                                            s_no1: newsno1,
                                                            url: newurl,
                                                            action1: newaction1
                                                          });
                                                        }
                                            
                                                        const [coordinates, setCoordinates] = useState('');
                                                        const handleSubmit = async (e) => {
                                                        try {
                                                          const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                                                            params: {
                                                              address: updatecontactdata.location,
                                                              key: 'AIzaSyACfBzaJSVH8eur7U9JxdjI1bAeTLXsUJc'  // Replace with your API key
                                                            }
                                                          });
                                                
                                                          if (response.data.results.length > 0) {
                                                            const { lat, lng } = response.data.results[0].geometry.location;
                                                            setCoordinates({ lat, lng });
                                                            setupdatecontactdata({...updatecontactdata,lattitude:lat,langitude:lng})
                                                          } else {
                                                            setCoordinates(null);
                                                            console.log('No results found');
                                                          }
                                                          
                                                        } catch (error) {
                                                          console.error('Error fetching coordinates:', error);
                                                        }
                                                      }
                                                      const mapStyles = {
                                                        height: "300px",
                                                        width: "100%"
                                                      }
                                                      const defaultCenter = {
                                                        lat: coordinates.lat || 37.7749, lng: coordinates.lng || -122.4194
                                                      };

                                                      const[user,setuser]=useState([])
                                                      const fetchdeveloper=async()=>
                                                      {
                                                        try {
                                                          const resp=await axios.get('http://localhost:5000/addproperty/viewdeveloper')
                                                          setuser(resp.data.developer)
                                                        } catch (error) {
                                                          toast.error(error.response.data.message)
                                                        }
                                                      }
                                                      const[tower,settower]=useState([])
                                                      const fetchtower=async()=>
                                                      {
                                                        try {
                                                          const resp=await axios.get('http://localhost:5000/addproperty/viewtower')
                                                          settower(resp.data.tower)
                                                        } catch (error) {
                                                          toast.error(error.response.data.message)
                                                        }
                                                      }
                                                      const[project,setproject]=useState([])
                                                      const fetchproject=async()=>
                                                      {
                                                        try {
                                                          const resp=await axios.get('http://localhost:5000/addproperty/viewproject')
                                                          setproject(resp.data.project)
                                                        } catch (error) {
                                                          toast.error(error.response.data.message)
                                                        }
                                                      }
                                                      React.useEffect(()=>
                                                        {fetchdeveloper()},[])
                                                        React.useEffect(()=>
                                                          {fetchtower()},[])
                                                        React.useEffect(()=>
                                                          {fetchproject()},[])

                                                        const config = {
                                                          headers: {
                                                            'Content-Type': 'multipart/form-data' // Set the Content-Type here
                                                          }}
                                                        const updateinventory=async()=>
                                                          {
                                                            try {
                                                              const id=data1._id
                                                              const resp=await axios.put(`http://localhost:5000/updateinventory/${id}`,updatecontactdata,config)
                                                              toast.success("inventory updated")
                                                              setTimeout(() => {
                                                                navigate('/inventorydetails')
                                                              }, 2000);
                                                              // setTimeout(() => {
                                                              //   handleClose1()
                                                              // }, 2000);
                                                              setTimeout(() => {
                                                                window.location.reload()
                                                              }, 2000);
                                                            } catch (error) {
                                                              console.log(error);
                                                            }
                                                          }

 /*-------------------------------------------------------------------update updatecontactdata end---------------------------------------------------------------------------- */                                                     

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
              <li><a class="dropdown-item"  style={{cursor:"pointer"}} onClick={()=>handleShow1(item)}>Edit</a></li>
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

      <Modal show={show1} onHide={handleClose1} size='xl'>
            <Modal.Header>
              <Modal.Title>Update Inventory</Modal.Title>
            </Modal.Header>
            <Modal.Body>
      <div>
                <div >
                <div >
            <div className="col-12">
                <div className="p-3">

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="text-right">Add Property/Inventory</h4>
                    </div><hr></hr><br></br>
                    <div className="row mt-2" style={{border:"1px solid gray",padding:"5px"}}>
                    <div className="col-md-3" id="projectlabel"><label className="labels"style={{fontWeight:"bolder"}}>Project/Location Details</label></div>
                    <div className="col-md-3" id="basiclabel"><label className="labels" style={{fontWeight:"bolder"}}>Basic Details</label></div>
                    <div className="col-md-3" id="photolabel"><label className="labels" style={{fontWeight:"bolder"}}>Photos</label></div>
                    <div className="col-md-3" id="ownerlabel"><label className="labels" style={{fontWeight:"bolder"}}>Owner Details</label></div>
                    </div><br></br>
    {/*-------------------------------------------------------------------project form----------------------------------------------------- */}
                    <div id="projectform" style={{border:"1px solid gray",padding:"5px"}}>
                    <div className="row mt-2">
                    <div className="col-md-5"><label className="labels">Developer</label><select className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,developer:e.target.value})} >
                        <option>{data1.developer}</option>
                            {
                              user.map(item=>
                              (
                                <option>{item.developer_name}</option>
                              )
                              )
                            }
                            </select>
                            
                        </div>
                            <div className="col-md-1"  style={{marginTop:"30px"}}><button className="form-control" >+</button></div>
                            <div className="col-md-5"><label className="labels">Block/Tower</label><select className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,block_tower:e.target.value})}>
                        <option>{data1.block_tower}</option>
                          {
                            tower.map(item=>
                              (
                                  <option>{item.tower_name}</option>
                              )
                            )
                          }
                            </select>
                            </div>
                            <div className="col-md-1"  style={{marginTop:"30px"}}><button className="form-control" >+</button></div>
                            <div className="col-md-5"><label className="labels">Project</label><select className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,project:e.target.value})}>
                        <option>{data1.project}</option>
                        {
                            project.map(item=>
                            (
                              <option>{item.project_name}</option>
                            )
                            )
                          }
                            </select>
                            </div>
                            <div className="col-md-1" style={{marginTop:"30px"}}><button className="form-control">+</button></div>
                    </div>
                        </div>
                        <div className="row mt-4">
                        <div className="col-md-2" id="projectbtn" onClick={handler} style={{marginLeft:"82%",marginBottom:"-50px"}}><button className="form-control">Next</button></div>
                        </div>
                        </div>
    {/*-----------------------------------------------------------------basic/unit form----------------------------------------------------- */}

                    <div id="basicform" style={{border:"1px solid gray",padding:"5px",marginTop:"-50px"}}>
                    <div className="row mt-2">
                            <div className="col-md-3"><label className="labels">Unit number</label><input type="text" className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,unit_number:e.target.value})} placeholder={data1.unit_number}/></div>
                            <div className="col-md-3"><label className="labels">Sub Category</label><input type="text" className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,sub_category:e.target.value})} placeholder={data1.sub_category}/></div>
                            <div className="col-md-6"></div>
                          
                            <div className="col-md-3"><label className="labels">Size</label><input type="text"className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,size:e.target.value})} placeholder={data1.size}/></div>
                            <div className="col-md-3"><label className="labels">Project</label><select className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,project1:e.target.value})} >
                            <option>{data1.project1}</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                        </div>
                        <div className="col-md-6"></div>

                        <div className="col-md-3"><label className="labels">Facing</label><select className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,facing:e.target.value})}>
                            <option>{data1.facing}</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                        </div>
                        <div className="col-md-3"><label className="labels">Road</label><select className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,road:e.target.value})}>
                            <option>{data1.road}</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                        </div>
                      

                        <div className="col-md-6"></div>
                        <div className="col-md-3"><label className="labels">Ownership</label><select className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,ownership:e.target.value})}>
                            <option>{data1.ownership}</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                        </div>
                        <div className="col-md-6"></div>
                        <div className="col-md-5" style={{position:"absolute",border:"1px solid black",height:"500px",marginLeft:"55%"}}>
                          <div style={{border:"1px solid black",height:"300px",marginTop:"10px"}}>
                          <LoadScript
                            googleMapsApiKey="AIzaSyACfBzaJSVH8eur7U9JxdjI1bAeTLXsUJc"
                                                                >
                                    <GoogleMap
                              mapContainerStyle={mapStyles}
                                zoom={13}
                                center={defaultCenter}
                                >
                            <Marker
                              position={{ lat: defaultCenter.lat, lng: defaultCenter.lng }}
                            />
                            </GoogleMap>
                            </LoadScript>
                          </div>
                          <div style={{height:"200px"}}>
                            <div className="row" style={{marginTop:"15%"}}>
                          
                          <div className="col-md-6"><label className="labels">Lattitude</label><input type="number"className="form-control" required="true" value={coordinates.lat} readOnly placeholder={data1.lattitude}/></div>
                          <div className="col-md-6"><label className="labels">Langitude</label><input type="number"className="form-control" required="true" value={coordinates.lng} readOnly placeholder={data1.langitude}/></div>
                          
                          </div>
                          </div>
                        </div>

                        <div className="col-md-12"><label className="labels" style={{fontWeight:"bold"}}>Builtup Details</label></div>

                        <div className="col-md-3"><label className="labels">Type</label><select className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,type:e.target.value})}>
                            <option>{data1.type}</option>
                            <option>Duplex</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                        </div>
                        <div className="col-md-3"><label className="labels">Cluter Details/Floor Plans</label><select className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,cluter_details:e.target.value})}>
                            <option>{data1.cluter_details}</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                        </div>
                        <div className="col-md-6"></div>

                            <div className="col-md-1"><label className="labels">Length</label><input type="number"className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,length:e.target.value})} placeholder={data1.length}/></div>
                            <div className="col-md-1"><label className="labels">Breadth</label><input type="number"className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,breadth:e.target.value})} placeholder={data1.breadth}/></div>
                            <div className="col-md-2"><label className="labels">Total Area</label><input type="number"className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,total_area:e.target.value})} placeholder={data1.total_area}/></div>
                            <div className="col-md-2"><label className="labels">In Metrics</label><input type="text"className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,in_metrics:e.target.value})} placeholder={data1.in_metrics}/></div>
                            <div className="col-md-4" style={{marginLeft:"6%",marginTop:"-9%"}}><label className="labels">Location</label><input  type="text" className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,location:e.target.value})} placeholder={data1.location}/></div>
                            <div className="col-md-1" style={{marginTop:"-4.8%"}}><button className="form-control" required="true" onClick={handleSubmit}>Get</button></div>
                            

                            <div className="col-md-3"><label className="labels">Occupation Date</label><input type="text"className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,occupation_date:e.target.value})} placeholder={data1.occupation_date}/></div>
                            <div className="col-md-3"><label className="labels">Age of Construction</label><input type="text"className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,age_of_construction:e.target.value})} placeholder={data1.age_of_construction}/></div>
                            <div className="col-md-6"></div>
                            <div className="col-md-3"><label className="labels">Furnish Details</label><select className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,furnish_details:e.target.value})}>
                            <option>{data1.furnish_details}</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                        </div>
                        <div className="col-md-3"><label className="labels">Furnished Items</label><select className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,furnished_item:e.target.value})}>
                            <option>{data1.furnished_item}</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                        </div>
                        <div className="col-md-6"></div>

                        <div className="col-md-6"><label className="labels">Aminities</label><select className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,aminities:e.target.value})}>
                            <option>{data1.aminities}</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Smt.</option>
                            <option>Dr.</option>
                            <option>Er.</option>
                            <option>Sh.</option>
                            <option>col</option>
                            </select>
                        </div>
                        <div className="col-md-6"></div>
                            
                        </div>
                      </div>
                    <div className="row mt-4">
                        <div className="col-md-2" onClick={handler3} style={{marginLeft:"82%",marginBottom:"40px"}}><button className="form-control" id="basicbtn">Next</button></div>
                        <div className="col-md-2" onClick={handler2} style={{marginLeft:"-90%"}}><button className="form-control" id="prevbtn">Prev</button></div>
                    </div>
                    </div>
                  </div>

    {/*-----------------------------------------------------------------photos/videos form----------------------------------------------------------------- */}             
              
                  <div id="photosform" style={{border:"1px solid gray",padding:"5px",marginTop:"-50px",display:"none"}}>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="text-right">Upload Images</h6>
                    </div><hr></hr>
                    <div className="row mt-2">
                    <table style={{marginLeft:"25px"}}>
                    <thead >
                      <tr>
                        <th style={{width:"100px"}}>#</th>
                        <th style={{width:"400px",textAlign:"center"}}>Preview</th>
                        <th style={{width:"300px",textAlign:"center"}}>Description</th>
                        <th style={{width:"300px",textAlign:"center"}}>Category</th>
                        <th style={{width:"150px",textAlign:"center"}}>Action</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                          <td>
                          {updatecontactdata.s_no.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                      <input 
                                        type="text"
                                        className="form-control"
                                        placeholder={data1.s_no[index]}
                                        onChange={(event) => handlesnochange(index, event)}
                                      />
                                      
                                    </div>
                                  ))}
                          </td>
                          <td>
                          {updatecontactdata.preview.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                      <img src={name}></img>
                                      <input 
                                        type="file"
                                        className="form-control"
                                        multiple
                                        value={name[index]}
                                        onChange={(event) => handlepreviewchange(index, event)}
                                      
                                      />
                                      <img src={name.previewUrls} alt={name.previewUrls}></img>
                                        {name.previewUrls && name.previewUrls.map((url, idx) => (
          <img key={idx} src={url} alt={`preview ${index}-${idx}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
        ))}
                    
                                    </div>
                                  ))}
                          </td>
                          <div className="image-gallery">
      {image.map((image, index) => (
          
        <img
          key={index}
          src={image} 
          alt={image.previewUrls}
          style={{ width: '200px', margin: '10px' }}
        />
      ))}
    </div>

                          <td>
                          {updatecontactdata.descriptions.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                      <input 
                                        type="text"
                                        className="form-control"
                                        placeholder={data1.descriptions[index]}
                                        onChange={(event) => handledescriptionchange(index, event)}
                                      />
                                      
                                    </div>
                                  ))}
                          </td>
                          <td>
                          {updatecontactdata.category.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                      <select className="form-control" required="true" onChange={(event) => handlecategorychange(index, event)}>
                                          <option>{data1.category[index]}</option>
                                          <option>Mr.</option>
                                          <option>Mrs.</option>
                                          <option>Smt.</option>
                                          <option>Dr.</option>
                                          <option>Er.</option>
                                          <option>Sh.</option>
                                          <option>col</option>
                                          </select>
                                    </div>
                                  ))}
                          </td>
                          <td>
                          {updatecontactdata.action.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                    
                                      <div><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                    </div>
                                  ))}
                          </td>

                          </tr>
                        </tbody>
                  </table>
                      </div>
                      <div className="row mt-4">
                      <div className="col-md-2" style={{marginLeft:"80%"}} onClick={addFn1}><button className="form-control">Add Link Url</button></div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="text-right">Upload Videos</h6>
                    </div><hr></hr>
                    <div className="row mt-2">
                    <table style={{marginLeft:"25px"}}>
                    <thead >
                      <tr>
                        <th style={{width:"100px",textAlign:"center"}}>SR.NO.</th>
                        <th style={{width:"950px",textAlign:"center"}}>URL</th>
                        <th style={{width:"150px",textAlign:"center"}}>Action</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr>
                          <td>
                          {updatecontactdata.s_no1.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                      <input 
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        placeholder={data1.s_no1[index]}
                                        onChange={(event) => handleeducationChange(index, event)}
                                      />
                                  
                                    </div>
                                  ))}
                          </td>
                          <td>
                          {updatecontactdata.url.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                      <input 
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        placeholder={data1.url[index]}
                                        onChange={(event) => handleurlChange(index, event)}
                                      />
                                      
                                    </div>
                                  ))}
                                  
                          </td>
                          <td>
                          {updatecontactdata.action1.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                    
                                      <div><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall1(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                    </div>
                                  ))}
                          </td>
                          </tr>
                        </tbody>
                  </table>
                  </div>
                    <div className="row mt-4">
                    <div className="col-md-2" style={{marginLeft:"80%"}} onClick={addFn}><button className="form-control">Add Video Link</button></div>
                    </div>
                  </div>
                  <div className="row mt-4">
                        <div className="col-md-2" onClick={handler5} style={{marginLeft:"82%",marginBottom:"40px",display:"none"}} id="photosbtn"><button className="form-control" >Next</button></div>
                        <div className="col-md-2" onClick={handler4} style={{marginLeft:"-90%",display:"none"}} id="prevbtn1"><button className="form-control" >Prev</button></div>
                    </div>  

    {/*-----------------------------------------------------------------owner details form----------------------------------------------------------------- */}             
                    <div id="ownerform" style={{padding:"5px",marginTop:"-130px",display:"none"}}>
                    <div className="row mt-2" style={{borderBottom:"1px solid gray",padding:"5px"}}>
                    <div className="col-5" style={{marginLeft:"20px",padding:"10px"}}>
                    <div className="row">
                            <div className="col-md-5"><label className="labels">Search Contact</label><i class="dw dw-search2 search-icon" style={{position:"absolute",marginTop:"45px",marginLeft:"70px"}}></i><input type="text" class="form-control search-input" placeholder={data1.search_contact} onChange={(e)=>setupdatecontactdata({...updatecontactdata,search_contact:e.target.value})}/></div>
                            <div className="col-md-3"><label className="labels">Relation</label><input type="text" className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,relation:e.target.value})} placeholder={data1.relation}/></div>
                            <div className="col-md-4" style={{marginTop:"30px"}}><button className="form-control" >Add Contact </button></div>
                    </div>
                    </div>
                    <div className="col-6">
                    <div className="row" style={{border:"1px solid black",padding:"10px",height:"400px"}}>
                            <div className="col-md-4"><label className="labels">Document Name</label><input type="text" className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,document_name:e.target.value})} placeholder={data1.document_name}/></div>
                            <div className="col-md-4"><label className="labels">Number</label><input type="text" className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,number:e.target.value})} placeholder={data1.number}/></div>
                            <div className="col-md-4"><label className="labels">Date</label><input type="date" className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,date:e.target.value})} placeholder={data1.date}/></div>
                            <div className="col-md-6"style={{marginTop:"-150px"}}><label className="labels">Linked Contact</label><input type="text" className="form-control" required="true" onChange={(e)=>setupdatecontactdata({...updatecontactdata,linkded_contact:e.target.value})} placeholder={data1.linkded_contact}/></div>
                            <div className="col-md-4" style={{marginTop:"-120px"}}><button className="form-control" >Add Contact </button></div>
                    </div>
                    
                    </div>
                    </div>
                    <div className="row mt-4">
                        
                        <div className="col-md-2" onClick={handler6} style={{display:"none"}} id="prevbtn2"><button className="form-control" >Prev</button></div>
                    </div>  
          </div>
            </div>
        </div>
        </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" id="ownerbtn" onClick={updateinventory}>
                Update
              </Button>
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
            </Modal.Footer>
            
          </Modal>
          <ToastContainer/>
        </div>
     );
}

export default InventoryDetails;
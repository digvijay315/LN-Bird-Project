import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { ToastContainer,toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { event } from "jquery";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { SvgIcon } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import { utils, writeFile } from "xlsx";
import api from "../api";

function Fetchcontact() {
    const countrycode=["Afghanistan +93","Aland Islands +358","Albania +355","Algeria +213","American Samoa +1684","Andorra +376",
        "Angola +244","Anguilla +1264","Antarctica +672","Antigua and Barbuda +1268","Argentina +54","Armenia +374",
        "Aruba +297","Australia +61","Austria +43","Azerbaijan +994","Bahamas +1242","Bahrain +973","Bangladesh +880",
        "Barbados +1246","Belarus +375","Belgium +32","Belize +501","Benin +229","Bermuda +1441","Bhutan +975",
        "Bolivia +591","Bonaire, Sint Eustatius and Saba +599","Bosnia and Herzegovina +387","Botswana +267",
        "Bouvet Island +55","Brazil +55","British Indian Ocean Territory +246","Brunei Darussalam +673","Bulgaria +359",
        "Burkina Faso +226","Burundi +257","Cambodia +855","Cameroon +237","Canada +1","Cape Verde +238","Cayman Islands +1345",
        "Central African Republic +236","Chad +235","Chile +56","China +86","Christmas Island +61","Cocos (Keeling) Islands +672",
        "Colombia +57","Comoros +269","Congo +242","Congo, Democratic Republic of the Congo +242","Cook Islands +682",
        "Costa Rica +506","Cote D'Ivoire +225","Croatia +385","Cuba +53","Curacao +599","Cyprus +357","Czech Republic +420",
        "Denmark +45","Djibouti +253","Dominica +1767","Dominican Republic +1809","Ecuador +593","Egypt +20",
        "El Salvador +503","Equatorial Guinea +240","Eritrea +291","Estonia +372","Ethiopia +251","Falkland Islands (Malvinas) +500",
        "Faroe Islands +298","Fiji +679","Finland +358","France +33","French Guiana +594","French Polynesia +689",
        "French Southern Territories +262","Gabon +241","Gambia +220","Georgia +995","Germany +49","Ghana +233","Gibraltar +350",
        "Greece +30","Greenland +299","Grenada +1473","Guadeloupe +590","Guam +1671","Guatemala +502","Guernsey +44",
        "Guinea +224","Guinea-Bissau +245","Guyana +592","Haiti +509","Holy See (Vatican City State) +39","Honduras +504",
        "Hong Kong +852","Hungary +36","Iceland +354","India +91","Indonesia +62","Iran, Islamic Republic of +98","Iraq +964",
        "Ireland +353","Isle of Man +44","Israel +972","Italy +39","Jamaica +1876","Japan +81","Jersey +44","Jordan +962",
        "Kazakhstan +7","Kenya +254","Kiribati +686","Korea Democratic People's Republic of +850","Korea Republic of +82","Kosovo +383",
        "Kuwait +965","Kyrgyzstan +996","Lao People's Democratic Republic +856","Latvia +371","Lebanon +961","Lesotho +266",
        "Liberia +231","Libyan Arab Jamahiriya +218","Liechtenstein +423","Lithuania +370","Luxembourg +352","Macao +853",
        "Macedonia, the Former Yugoslav Republic of +389","Madagascar +261","Malawi +265","Malaysia +60","Maldives +960",
        "Mali +223","Malta +356","Marshall Islands +692","Martinique +596","Mauritania +222","Mauritius +230","Mayotte +262",
        "Mexico +52","Micronesia, Federated States of +691","Moldova, Republic of +373","Monaco +377","Mongolia +976",
        "Montenegro +382","Montserrat +1664","Morocco +212","Mozambique +258","Myanmar +95","Namibia +264","Nauru +674",
        "Nepal +977","Netherlands +31","Netherlands Antilles +599","New Caledonia +687","New Zealand +64","Nicaragua +505",
        "Niger +227","Nigeria +234","Niue +683","Norfolk Island +672","Northern Mariana Islands +1670","Norway +47",
        "Oman +968","Pakistan +92","Palau +680","Palestinian Territory, Occupied +970","Panama +507","Papua New Guinea +675",
        "Paraguay +595","Peru +51","Philippines +63","Pitcairn +64","Poland +48","Portugal +351","Puerto Rico +1787",
        "Qatar +974","Reunion +262","Romania +40","Russian Federation +7","Rwanda +250","Saint Barthelemy +590",
        "Saint Helena +290","Saint Kitts and Nevis +1869","Saint Lucia +1758","Saint Martin +590","Saint Pierre and Miquelon +508",
        "Saint Vincent and the Grenadines +1784","Samoa +684","San Marino +378","Sao Tome and Principe +239","Saudi Arabia +966",
        "Senegal +221","Serbia +381","Serbia and Montenegro +381","Seychelles +248","Sierra Leone +232","Singapore +65",
        "Sint Maarten +721","Slovakia +421","Slovenia +386","Solomon Islands +677","Somalia +252","South Africa +27",
        "South Georgia and the South Sandwich Islands +500","South Sudan +211","Spain +34","Sri Lanka +94","Sudan +249",
        "Suriname +597","Svalbard and Jan Mayen +47","Swaziland +268","Sweden +46","Switzerland +41","Syrian Arab Republic +963",
        "Taiwan, Province of China +886","Tajikistan +992","Tanzania, United Republic of +255","Thailand +66","Timor-Leste +670",
        "Togo +228","Tokelau +690","Tonga +676","Trinidad and Tobago +1868","Tunisia +216","Turkey +90","Turkmenistan +7370",
        "Turks and Caicos Islands +1649","Tuvalu +688","Uganda +256","Ukraine +380","United Arab Emirates +971",
        "United Kingdom +44","United States +1","United States Minor Outlying Islands +1","Uruguay +598","Uzbekistan +998",
        "Vanuatu +678","Venezuela +58","Viet Nam +84","Virgin Islands, British +1284","Virgin Islands, U.s. +1340",
        "Wallis and Futuna +681","Western Sahara +212","Yemen +967","Zambia +260","Zimbabwe +263"]

    const navigate=useNavigate()
    React.useEffect(()=>{fetchdata()},[])


    const[data,setdata]=useState([]);
    const fetchdata=async(event)=>
    {
      
      try {
        const resp=await api.get('viewcontact')
        setdata(resp.data.contact)
      } catch (error) {
        console.log(error);
      }
    
    }
  

    const deletecontact=async(item)=>
        {
          try {
            const id=item._id
            const resp=await api.delete(`deletecontact/${id}`)
            toast.success("contact deleted successfully")
            setTimeout(() => {
              window.location.reload()
            }, 2000);
          } catch (error) {
            console.log(error);
          }
        }
     
      
        
      // const arr=Array.isArray(data1.education)? data1.education :[data1.education]
        const[updatecontactdata,setupdatecontactdata]=useState({title:"",first_name:"",last_name:"",country_code:"",mobile_no:"",
                                        mobile_type:"",email:"",email_type:"",title_company:"",designation:"",company_name:"",
                                        tags:"",father_husband_name:"",h_no:"",street_address:"",location:"",city:"",pincode:"",
                                        state:"",country:"",source:"",category:"",owner:"",team:"",gender:"",visible_to:"",maritial_status:"",
                                        birth_date:"",anniversary_date:"",education:[],degree:[],school_college:[],loan:"",bank:"",
                                        amount:"",social_media:"",url:"",income:"",amount1:"",website:"",industry:"",descriptions:""})


                                        const [show1, setshow1] = useState(false);

                                        const handleClose1 = () => setshow1(false);
                                        const[data1,setdata1]=useState([])
                                        const handleShow1=(item)=>
                                        {
                                          setshow1(true);
                                          setdata1(item)
                                          setupdatecontactdata(item)
                                        }
                                        
            function addFn() {
                 setupdatecontactdata({
                         ...updatecontactdata,
                         education: [...updatecontactdata.education, ''],
                         degree: [...updatecontactdata.degree, ''],
                         school_college: [...updatecontactdata.school_college, '']
                         });
                     };

                     const handleeducationChange = (index, event) => {
                        const neweducation = [...updatecontactdata.education];
                        neweducation[index] = event.target.value;
                        setupdatecontactdata((prevProfile) => ({
                          ...prevProfile,
                          education: neweducation,
                        }));
                      };
                      const handledegreeChange = (index, event) => {
                        const newdegree = [...updatecontactdata.degree];
                        newdegree[index] = event.target.value;
                        setupdatecontactdata((prevProfile) => ({
                          ...prevProfile,
                          degree: newdegree,
                        }));
                      };
                
                      const handleschool_collegeChange = (index, event) => {
                        const newschool = [...updatecontactdata.school_college];
                        newschool[index] = event.target.value;
                        setupdatecontactdata((prevProfile) => ({
                          ...prevProfile,
                          school_college: newschool,
                        }));
                      };
                
                
                      const handleDeleteeducation = (index) => {
                        const neweducation = updatecontactdata.education.filter((_, i) => i !== index);
                        setupdatecontactdata({
                          ...updatecontactdata,
                          education: neweducation
                        });
                      };
                      const handleDeletedegree = (index) => {
                        const newdegree = updatecontactdata.degree.filter((_, i) => i !== index);
                        setupdatecontactdata({
                          ...updatecontactdata,
                          degree: newdegree
                        });
                      };
                      const handleDeleteschool = (index) => {
                        const newschool = updatecontactdata.school_college.filter((_, i) => i !== index);
                        setupdatecontactdata({
                          ...updatecontactdata,
                          school_college: newschool
                        });
                      };
                      const[email,setemail]=useState()
                      const fetchdatabyemail=async(e)=>
                        {
                          // e.preventDefault()
                          try {
                            const resp=await api.get(`viewcontactbyemail/${email}`);
                            const incoming=(Array.isArray(resp.data.contact) ? resp.data.contact : [resp.data.contact]);
                            setdata(incoming)
                          } catch (error) {
                            console.log(error);
                          }
                        }
                        const handlekeypress1=(event)=>
                        {
                            if(event.key==="Enter")
                                {
                                    fetchdatabyemail()
                                }
                            
                        }
                        const[mobile,setmobile]=useState('')
                        const fetchdatabymobile=async()=>
                          {
                            
                            try {
                              const resp=await api.get(`viewcontactbymobile/${mobile}`);
                              const incoming=(Array.isArray(resp.data.contact) ? resp.data.contact : [resp.data.contact]);
                              setdata(incoming)
                              setmobile('')
                            } catch (error) {
                              console.log(error);
                            }
                          }
                          const handlekeypress2=(event)=>
                          {
                              if(event.key==="Enter")
                                  {
                                    fetchdatabymobile()
                                  }
                              
                          }

        const updatecontact=async()=>
        {
          try {
            const id=data1._id
            const resp=await api.put(`updatecontact/${id}`,updatecontactdata)
            toast.success("contact updated")
            setTimeout(() => {
              navigate('/contactdetails')
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
    const exportToExcel = () => {
      const filteredData = data.map(({ title,first_name, last_name,mobile_no,email,h_no,street_address,city,source,team,owner,tags,designation,company_name }) => ({ title,first_name, last_name,mobile_no,email,h_no,street_address,city,source,team,owner,tags,designation,company_name }));
      // Create a new workbook
      const workbook = utils.book_new();
  
      // Convert data to a worksheet
      const worksheet = utils.json_to_sheet(filteredData);
  
      // Append the worksheet to the workbook
      utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
      // Export the workbook to an Excel file
      writeFile(workbook, "table_data.xlsx");
    };
    const [show2, setshow2] = useState(false);
    const[data2,setdata2]=useState([])
    const handleClose2 = () => setshow2(false);
    const[educationdata,seteducationdata]=useState([])
    const[degreedata,setdegreedata]=useState([])
    const[schooldata,setschooldata]=useState([])
    const handleShow2=(item)=>
    {
      setshow2(true);
      setdata2(item)
      seteducationdata(item.education)
      setdegreedata(item.degree)
      setschooldata(item.school_college)
    }
   

    return ( 
        <div>
            <Header1/>
            <Sidebar1/>
      <div style={{marginTop:"80px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
        
        <h3 style={{marginLeft:"10px"}}>Contact</h3>
        <button className="form-control" style={{width:"200px",marginLeft:"10px"}}>Select Team</button>
        <button className="form-control" style={{width:"300px",marginLeft:"10px"}}>Select Sales Manager</button>
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent",marginLeft:"40%"}}>
            Add Contact
        </button>
            <ul class="dropdown-menu">
              <li><Link to={'/addcontact'} class="dropdown-item">Add Contact</Link></li>
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
        <div className="lead" style={{width:"200px",borderRadius:"10px",padding:"10px",marginLeft:"70%",textAlign:"center"}} onClick={()=>fetchdata()}>
          <h6>All</h6>
        </div>
        <div style={{borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
            <button  class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{marginLeft:"5px",color:"black",backgroundColor:"transparent",width:"150px"}}>
            Filter
        </button>
            <ul class="dropdown-menu">
              <li>
                <label className="labels">By Email id</label><input type="text" className="form-control form-control-sm" placeholder="filter from email id" onChange={(e)=>setemail(e.target.value)} onKeyDown={handlekeypress1}/></li>
              <li><label className="labels">By Mobile no</label><input type="text" className="form-control form-control-sm" placeholder="filter from mobile no" onChange={(e)=>setmobile(e.target.value)} onKeyDown={handlekeypress2}/></li>
            </ul>
        </div>  
        
      </div>
      <div style={{marginTop:"10px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px",paddingTop:"10px"}}>
          <button className="form-control" style={{width:"150px",marginLeft:"86.5%"}} onClick={exportToExcel}>Export Data</button>
          </div>
          <div style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white"}}>
    {/* <table style={{textAlign:"center"}}>
      <thead style={{textAlign:"center",fontWeight:"bold",fontFamily:"sans-serif"}}>
        <tr >
          <td style={{border:"1px solid black",width:"30px"}}>#</td>
          <td style={{border:"1px solid black",width:"200px"}}>Personal Details</td>
          <td style={{border:"1px solid black",width:"100px"}}>Address</td>
          <td style={{border:"1px solid black",width:"150px"}}>Source</td>
          <td style={{border:"1px solid black",width:"150px"}}>Team</td>
          <td style={{border:"1px solid black",width:"150px"}}>Owner</td>
          <td style={{border:"1px solid black",width:"150px"}}>Tags</td>
          <td style={{border:"1px solid black",width:"150px"}}>Designation</td>
          <td style={{border:"1px solid black",width:"150px"}}>Company Name</td>
          <td style={{border:"1px solid black",width:"150px"}}>Operations</td>
        </tr>
      </thead>
      <tbody>
        
          {
            currentItems.map((item,index)=>
            (
              <tr>
              <td  style={{border:"1px solid black",width:"30px"}}>{index+1}</td>
              <td className="personaldetails" style={{border:"1px solid black",width:"200px"}}><span style={{color:"blue"}}>{item.title}{item.first_name}<span>{" "}</span>{item.last_name}</span><br></br>
              <span style={{color:"green"}}>Mobile:{item.mobile_no}<br></br></span>
              <span style={{color:"orange"}}>Email:{item.email}</span>
              </td>
              <td style={{border:"1px solid black",width:"100px"}}>
              <span>{item.h_no }</span> <span>{item.street_address}</span><br></br>
              <span>{item.city}</span>
              </td>
          <td style={{border:"1px solid black",width:"150px"}}>{item.source}</td>
          <td style={{border:"1px solid black",width:"150px"}}>{item.team}</td>
          <td style={{border:"1px solid black",width:"150px"}}>{item.owner}</td>
          <td style={{border:"1px solid black",width:"150px"}}>{item.tags}</td>
          <td style={{border:"1px solid black",width:"150px"}}>{item.designation}</td>
          <td style={{border:"1px solid black",width:"150px"}}>{item.company_name}</td>
          <td style={{border:"1px solid black",width:"150px"}}>
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:"transparent",color:"black"}}>
            Actions
        </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item"  style={{cursor:"pointer"}} onClick={()=>handleShow1(item)}>Edit</a></li>
              <li><a class="dropdown-item" onClick={()=>deletecontact(item)} style={{cursor:"pointer"}}>Delete</a></li>
            </ul>
            </td>
              </tr>
            )
            )
          }
        
      </tbody>
      </table> */}
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="left">Personal Details</StyledTableCell>
            <StyledTableCell align="left">Address</StyledTableCell>
            <StyledTableCell align="left">Source</StyledTableCell>
            <StyledTableCell align="left">Team</StyledTableCell>
            <StyledTableCell align="left">Owner</StyledTableCell>
            <StyledTableCell align="left">Tags</StyledTableCell>
            <StyledTableCell align="left">Designation</StyledTableCell>
            <StyledTableCell align="left">Company Name</StyledTableCell>
            <StyledTableCell align="left">Operations</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentItems.map((item,index) => (
            <StyledTableRow>
               <StyledTableCell align="left">{index+1}</StyledTableCell>
              <StyledTableCell className="personaldetails" align="left" component="th" scope="row" onClick={()=>handleShow2(item)}>
                {item.title} <span></span> {item.first_name} <span> </span> {item.last_name}<br></br>
               <SvgIcon component={PhoneIphoneIcon}></SvgIcon><span>{item.mobile_no}</span><br></br>
               <SvgIcon component={EmailIcon}></SvgIcon><span>{item.email}</span>
              </StyledTableCell>
              <StyledTableCell align="left">
                {item.h_no} <span><br></br>{item.street_address}</span><br></br>{item.city}
              </StyledTableCell>
              <StyledTableCell align="left">{item.source}</StyledTableCell>
              <StyledTableCell align="left">{item.team}</StyledTableCell>
              <StyledTableCell align="left">{item.owner}</StyledTableCell>
              <StyledTableCell align="left">{item.tags}</StyledTableCell>
              <StyledTableCell align="left">{item.designation}</StyledTableCell>
              <StyledTableCell align="left">{item.company_name}</StyledTableCell>
              <StyledTableCell align="left">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:"transparent",color:"black"}}>
            Actions
               </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item"  style={{cursor:"pointer"}} onClick={()=>handleShow1(item)}>Edit</a></li>
              <li><a class="dropdown-item" onClick={()=>deletecontact(item)} style={{cursor:"pointer"}}>Delete</a></li>
            </ul>

              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
      <div style={{display:"flex",fontSize:"20px",gap:"10px",justifyContent:"right",paddingRight:"60px", marginTop:"10px"}}>
      {renderPageNumbers()}
      </div>
      
      <ToastContainer/>

      <Modal show={show1} onHide={handleClose1} size='lg'>
            <Modal.Header>
              <Modal.Title>Update Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{width:"100%"}}>
   
                <div className="d-flex justify-content-between align-items-center experience"><span>Basic Details</span></div><hr></hr>
                <div className="row mt-2">
                    
                    <div className="col-md-4"><label className="labels">Title</label><select className="form-control" required="true" onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, title: e.target.value }))} >
                        <option>{data1.title}</option>
                        <option>Mr.</option>
                        <option>Mrs.</option>
                        <option>Smt.</option>
                        <option>Dr.</option>
                        <option>Er.</option>
                        <option>Sh.</option>
                        <option>col</option>
                        </select>
                        </div>
                    <div className="col-md-4"><label className="labels">Name</label><input type="text" required="true" className="form-control" placeholder={data1.first_name} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, first_name: e.target.value }))}/></div>
                    <div className="col-md-4"><label className="labels">Surname</label><input type="text" className="form-control"  placeholder={data1.last_name} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, last_name: e.target.value }))}/></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-4"><label className="labels">Country</label><select required="true" className="form-control" onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, country_code: e.target.value }))} >
                    <option value="">{data1.country_code}</option>
                    {
                      countrycode.map((item)=>
                      (
                        <option>{item}</option>
                      ))
                    }
                    </select></div>
                    <div className="col-md-5"><label className="labels">Mobile Number</label><input type="text" required="true" className="form-control" placeholder={data1.mobile_no} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, mobile_no: e.target.value }))}/></div>
                    <div className="col-md-3"><label className="labels">Type</label><select className="form-control" onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, mobile_type: e.target.value }))}>
                    <option>{data1.mobile_type}</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                    <div className="col-md-9"><label className="labels">Email-Address</label><input type="text" className="form-control" placeholder={data1.email} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, email: e.target.value }))}/></div>
                    <div className="col-md-3"><label className="labels">Type</label><select className="form-control" onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, email_type: e.target.value }))}>
                    <option>{data1.email_type}</option>
                        <option>Personal</option>
                        <option>Office</option>
                        <option>Business</option>
                        </select></div>
                    
                    <div className="col-md-4"><label className="labels">Title & Company</label><input type="text" className="form-control" placeholder={data1.title_company} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, title_company: e.target.value }))}/></div>
                    <div className="col-md-4"><label className="labels">Designation</label><input type="text" className="form-control" placeholder={data1.designation} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, designation: e.target.value }))}/></div>
                    <div className="col-md-4"><label className="labels">Company Name</label><input type="text" className="form-control" placeholder={data1.company_name} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, company_name: e.target.value }))}/></div>
                    
                    <div className="col-md-12"><label className="labels">Tags</label><input type="text" className="form-control" placeholder={data1.tags} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, tags: e.target.value }))}/></div>
                    
                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Address Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                    <div className="col-md-12"><label className="labels">Father/Husband name</label><input type="text" className="form-control" placeholder={data1.father_husband_name} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, father_husband_name: e.target.value }))}/></div>

                    <div className="col-md-3"><label className="labels">H.No</label><input type="text" className="form-control" placeholder={data1.h_no} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, h_no: e.target.value }))}/></div>
                    <div className="col-md-9"><label className="labels">Area</label><input type="text" className="form-control"placeholder={data1.street_address} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, street_address: e.target.value }))}/></div>

                    <div className="col-md-4"><label className="labels">Location</label><input type="text" className="form-control" placeholder={data1.location} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, location: e.target.value }))}/></div>
                    <div className="col-md-4"><label className="labels">City</label><input type="text" className="form-control" placeholder={data1.city} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, city: e.target.value }))}/></div>
                    <div className="col-md-4"><label className="labels">Pin Code</label><input type="text" className="form-control" placeholder={data1.pincode} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, pincode: e.target.value }))}/></div>

                    <div className="col-md-6"><label className="labels">State</label><input type="text" className="form-control" placeholder={data1.state} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, state: e.target.value }))}/></div>
                    <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control"  placeholder={data1.country} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, country: e.target.value }))}/></div>

                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                    <div className="col-md-6"><label className="labels">Source</label><select className="form-control" onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, source: e.target.value }))}>
                    <option>{data1.source}</option>
                        <option>Walkin</option>
                        <option>99acre</option>
                        <option>Refrence</option>
                        <option>Old Client</option>
                        </select></div>
                    <div className="col-md-6"><label className="labels">Category</label><select className="form-control" onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, category: e.target.value }))} >
                    <option>{data1.category}</option>
                        <option>Investor</option>
                        <option>Banker</option>
                        <option>Broker</option>
                        <option>Builder</option>
                        <option>Company Employee</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Owner</label><select className="form-control" onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, owner: e.target.value }))}>
                    <option>{data1.owner}</option>
                        <option>Suresh Kumar</option>
                        <option>Rajesh kumar</option>
                        <option>Rakesh kumar</option>
                        </select></div>
                    <div className="col-md-6"><label className="labels">Team</label><select className="form-control" onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, team: e.target.value }))}>
                    <option>{data1.team}</option>
                        <option>Suresh Kumar</option>
                        <option>Rajesh Kumar</option>
                        <option>Rakesh Kumar</option>
                        <option>Yogesh Kumar</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Visible to</label><select className="form-control" onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, visible_to: e.target.value }))}>
                    <option>{data1.visible_to}</option>
                        <option>All User</option>
                        <option>My Team</option>
                        <option>Admin</option>
                        </select>
                    </div>
                    </div>
                    </div>
       
       
            
                <div className="d-flex justify-content-between align-items-center experience"><span>Other Details</span></div><hr></hr>
                <div className="row mt-2">
                    <div className="col-md-5"><label className="labels">Gender</label><select className="form-control" onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, gender: e.target.value }))} >
                    <option>{data1.gender}</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Others</option>
                        </select>
                    </div>
                    <div className="col-md-7"><label className="labels">Maritial Status</label>< select className="form-control" onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, maritial_status: e.target.value }))}>
                    <option>{data1.maritial_status}</option>
                        <option>Married</option>
                        <option>Unmarried</option>
                    </select>
                    </div>

                    <div className="col-md-5"><label className="labels">Birth Date</label><input type="text" className="form-control" placeholder={data1.birth_date} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, birth_date: e.target.value }))}/></div>
                    <div className="col-md-7"><label className="labels">Anniversary Date</label><input type="text" className="form-control" placeholder={data1.anniversary_date} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, anniversary_date: e.target.value }))}/></div>

                    <div className="col-md-3"> <label className="labels">Education</label>
                        
                             {updatecontactdata.education.map((name, index) => (
                                <div key={index}>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    placeholder={data1.education[index]}
                                    onChange={(event) => handleeducationChange(index, event)}
                                  />
                                  <div><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>handleDeleteeducation(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                </div>
                              ))}
                        </div>
                    <div className="col-md-3"><label className="labels">Degree</label>
                    {updatecontactdata.degree.map((name, index) => (
                                <div key={index}>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    placeholder={data1.degree[index]}
                                    onChange={(event) => handledegreeChange(index, event)}
                                  />
                                  <div><img className='deletebtn' src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>handleDeletedegree(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                </div>
                              ))}
                    </div>
                    <div className="col-md-5"><label className="labels">School/College/University</label>
                    {updatecontactdata.school_college.map((name, index) => (
                                <div key={index}>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    placeholder={data1.school_college[index]}
                                    onChange={(event) => handleschool_collegeChange(index, event)}
                                  />
                                  <div><img className='deletebtn' src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>handleDeleteschool(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                </div>
                              ))}                    
                    </div>
                     <div className="col-md-1" ><label className="labels">add</label><button className="form-control" onClick={addFn}>+</button></div>
                
                    <div className="col-md-4"><label className="labels">Loan</label><input type="text" className="form-control" placeholder={data1.loan} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, loan: e.target.value }))}/></div>
                    <div className="col-md-4"><label className="labels">Bank</label><input type="text" className="form-control" placeholder={data1.bank} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, bank: e.target.value }))}/></div>
                    <div className="col-md-4"><label className="labels">Amount</label><input type="text" className="form-control" placeholder={data1.amount} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, amount: e.target.value }))}/></div>

                    <div className="col-md-4"><label className="labels">Social Media</label><input type="text" className="form-control" placeholder={data1.social_media} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, social_media: e.target.value }))}/></div>
                    <div className="col-md-8"><label className="labels">Url</label><input type="text" className="form-control" placeholder={data1.url} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, url: e.target.value }))}/></div>

                    <div className="col-md-4"><label className="labels">Income</label><input type="text" className="form-control" placeholder={data1.income} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, income: e.target.value }))}/></div>
                    <div className="col-md-8"><label className="labels">Amount</label><input type="text" className="form-control" placeholder={data1.amount1} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, amount1: e.target.value }))}/></div>
                    <div className="col-md-6"><label className="labels">Website</label><input type="text" className="form-control" placeholder={data1.website} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, website: e.target.value }))}/></div>
                    <div className="col-md-6"><label className="labels">Industry</label><input type="text" className="form-control" placeholder={data1.industry} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, industry: e.target.value }))}/></div>

                    <div className="col-md-10"><label className="labels">Descriptions</label><textarea className='form-control' placeholder={data1.descriptions} onChange={e => setupdatecontactdata(prevProfile => ({ ...prevProfile, descriptions: e.target.value }))}/></div>
                
            
        </div>
     </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={updatecontact}>
                Update
              </Button>
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={show2} onHide={handleClose2} size='lg'>
            <Modal.Header>
              <Modal.Title>Contact Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{border:"1px solid black",padding:"20px"}}>
              <h4 style={{textAlign:"center",fontSize:"20px",fontFamily:"times-new roman"}}>Personal Deatils:</h4><hr></hr>
              <b>Full Name:</b> <span >{data2.title}</span> <span>{data2.first_name} </span><span>{data2.last_name}</span><br></br>
              <b>Mobile no:</b> <span>{data2.country_code}</span> <span>{data2.mobile_no}</span>,<span>{data2.mobile_type}</span><br></br>
              <b>Email id:</b> <span>{data2.email}</span>,<span>{data2.email_type}</span><br></br>
              <b>Title & Company:</b> <span>{data2.title_company}</span><br></br>
              <b>Designation:</b> <span>{data2.designation}</span><br></br>
              <b>Company Name:</b> <span>{data2.company_name}</span><br></br>
              <b>Tags:</b> <span>{data2.tags}</span><br></br>
              </div>

              <div style={{border:"1px solid black",padding:"20px"}}>
              <h4 style={{textAlign:"center",fontSize:"20px"}}>Address Deatils:</h4><hr></hr>
              <b>Father/Husband Name:</b> <span>{data2.father_husband_name}</span><br></br>
              <b>H No.:</b> <span>{data2.h_no}</span><br></br>
              <b>Area:</b> <span>{data2.street_address}</span><br></br>
              <b>Tags:</b> <span>{data2.tags}</span><br></br>
              <b>Location:</b> <span>{data2.location}</span><br></br>
              <b>City:</b> <span>{data2.city}</span><br></br>
              <b>Pin Code:</b> <span>{data2.pincode}</span><br></br>
              <b>State:</b> <span>{data2.state}</span><br></br>
              <b>Country:</b> <span>{data2.country}</span><br></br>
              </div>

              <div style={{border:"1px solid black",padding:"20px"}}>
              <h4 style={{textAlign:"center",fontSize:"20px"}}>System Deatils:</h4><hr></hr>
              <b>Source:</b> <span>{data2.source}</span><br></br>
              <b>Category.:</b> <span>{data2.category}</span><br></br>
              <b>Owner:</b> <span>{data2.owner}</span><br></br>
              <b>Team:</b> <span>{data2.team}</span><br></br>
              <b>Visible to:</b> <span>{data2.visible_to}</span><br></br>
              </div>

              <div style={{border:"1px solid black",padding:"20px"}}>
              <h4 style={{textAlign:"center",fontSize:"20px"}}>Other Deatils:</h4><hr></hr>
              <b>Gender:</b> <span>{data2.gender}</span><br></br>
              <b>Maritial Status.:</b> <span>{data2.maritial_status}</span><br></br>
              <b>Birth Date:</b> <span>{data2.birth_date}</span><br></br>
              <b>Anniversary Date:</b> <span>{data2.anniversary_date}</span><br></br>
              <b>Education:</b> <span>
                {educationdata.join(',')}
                </span><br></br>
              <b>Degree:</b> <span>
                {degreedata.join(",")}
                </span><br></br>
              <b>School/College/University:</b> <span>
                {schooldata.join(",")}
                </span><br></br>
              <b>Loan:</b> <span>{data2.loan}</span><br></br>
              <b>Amount:</b> <span>{data2.amount}</span><br></br>
              <b>Social Media:</b> <span>{data2.social_media}</span><br></br>
              <b>Url:</b> <span>{data2.url}</span><br></br>
              <b>Income:</b> <span>{data2.income}</span><br></br>
              <b>Amount:</b> <span>{data2.amount1}</span><br></br>
              <b>Website:</b> <span>{data2.website}</span><br></br>
              <b>Industry:</b> <span>{data2.industry}</span><br></br>
              <b>Descriptions:</b> <span>{data2.descriptions}</span><br></br>
              </div>
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose2}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <ToastContainer/>
        </div>
     );
}

export default Fetchcontact;
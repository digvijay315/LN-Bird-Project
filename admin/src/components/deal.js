import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import '../css/addinventory.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { toast,ToastContainer } from "react-toastify";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { render } from "@testing-library/react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import { toWords } from 'number-to-words';

function Deal() {
  const navigate=useNavigate()
  
  /*-------------------------------------------------------------------form next and prev buttons display code start----------------------------------------------------- */

 
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


/*-------------------------------------------------------------------form next and prev buttons display code end----------------------------------------------------- */


            const[deal,setdeal]=useState({available_for:"",stage:"",project:"",block:"",unit_number:"",floors:"",
                                expected_price:"",quote_price:"",calculated_type:"",price1:"",totalarea:"",measurment1:"",
                                total_price:"",  price2:"",price3:"",security_deposite:"",
                                maintainence_charge:"",rent_escltion:"",rent_period:"",fitout_perioud:"",
                                deal_type:"",transaction_type:"",source:"",white_portion:"",team:"",user:"",visible_to:"",
                                document_details:[],s_no:[],preview:[],descriptions:[],category:[],action:[],s_no1:[],url:[],action1:[],
                                website:"",social_media:"",send_matchedlead:""})
              const config = {
                headers: {
                  'Content-Type': 'multipart/form-data' // Set the Content-Type here
                }
            }
          const add_deal=async(e)=>
          {
              e.preventDefault();
         
                try {
                 
                        const resp= await api.post('adddeal',deal,config)
                          if(resp.status===200)
                              {
                                toast.success(resp.data.message,{ autoClose: 2000 })
                                setTimeout(() => {
                                  navigate('/deal')
                                }, 2000);
                                
                               }
                      } catch (error) {
                              toast.error(error.response.data.message,{ autoClose: 2000 })
                      }
                     }
                     
                                  const[document1,setdocument1]=useState([])
                                  const[documents,setdocuments]=useState({document_name:"",document_no:"",document_Date:"",
                                                                  linkded_contact:"",pic:[]})
  
                                                                  const handlepicchange = (e) => {
                                                                    const files = Array.from(e.target.files); // Get selected files
                                                                    setdocuments((prevDocs) => ({
                                                                      ...prevDocs,
                                                                      pics: files, // Update pics in state
                                                                    }));
                                                                  };

                                    const adddocument = () => {
                                     
                                        if (documents.document_name) 
                                          {
                                            const updatedocument= [...document1, documents];
                                            setdocument1(updatedocument);
                                            setdeal(prevState => ({
                                              ...prevState,
                                              document_details: updatedocument
                                            }));
                                          

                                            
                                            } 
                                            else
                                              {
                                                  toast.error("Please fill out all fields.");
                                              }
                                            };
                                const deletedocument = (index) => {


                                  // Filter out the destination at the given index
                                  const newdocument = deal.document_details.filter((_, i) => i !== index);

                                  // Set the updated destination details
                                  setdeal(prevState => ({
                                    ...prevState,
                                    document_details: newdocument
                                  }));
                                };

function addFn() {
    
  setdeal({
    ...deal,
    s_no1: [...deal.s_no1, ''],
    url: [...deal.url, ''],
    action1: [...deal.action1, '']
  });
};
const handlesno1change = (index, event) => {
  const newsno1 = [...deal.s_no1];
  newsno1[index] = event.target.value;
  setdeal({
    ...deal,
    s_no1: newsno1
  });
};
const handleurlChange = (index, event) => {
  const newurl = [...deal.url];
  newurl[index] = event.target.value;
  setdeal({
    ...deal,
    url: newurl
  });
};

const handlesnochange = (index, event) => {
  const newsno = [...deal.s_no];
  newsno[index] = event.target.value;
  setdeal({
    ...deal,
    s_no: newsno
  });
};
const handlepreviewchange = (index, event) => {
  
  const newpreview = [...deal.preview];
  const files = Array.from(event.target.files);
  const previewUrls = files.map(file => URL.createObjectURL(file));
  newpreview[index] = {
    files: files,
    previewUrls: previewUrls
  };
  setdeal({
    ...deal,
    preview: newpreview
  });
};


const handledescriptionchange = (index, event) => {
  const newdescription = [...deal.descriptions];
  newdescription[index] = event.target.value;
  setdeal({
    ...deal,
    descriptions: newdescription
  });
};
const handlecategorychange = (index, event) => {
  const newcategory = [...deal.category];
  newcategory[index] = event.target.value;
  setdeal({
    ...deal,
    category: newcategory
  });
};


function addFn1() {
    
  setdeal({
    ...deal,
    s_no: [...deal.s_no, ''],
    preview: [...deal.preview, ''],
    descriptions: [...deal.descriptions, ''],
    category: [...deal.category, ''],
    action: [...deal.action, '']
  });
};

const deleteall=(index)=>
{
  // handleDeletesno(index)
  // handleDeletepreview(index)
  const newsno = deal.s_no.filter((_, i) => i !== index);
  const newpreview = deal.preview.filter((_, i) => i !== index);
  const newdescription = deal.descriptions.filter((_, i) => i !== index);
  const newcategory = deal.category.filter((_, i) => i !== index);
  const newaction = deal.action.filter((_, i) => i !== index);
  setdeal({
    ...deal,
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
    const newsno1 = deal.s_no1.filter((_, i) => i !== index);
    const newurl = deal.url.filter((_, i) => i !== index);
    const newaction1 = deal.action1.filter((_, i) => i !== index);
    setdeal({
      ...deal,
      s_no1: newsno1,
      url: newurl,
      action1: newaction1
    });
  }




function available_for()
{
    const available=document.getElementById("availablefor").value;
    if(available==="Sale")
        {
            document.getElementById("sale").style.display="flex"
            document.getElementById("rent").style.display="none"
            setdeal({...deal,available_for:"Sale"})
        }
        if(available==="Rent")
            {
                document.getElementById("rent").style.display="flex"
                document.getElementById("sale").style.display="none"
                setdeal({...deal,available_for:"Rent"})
            }   
       if(available==="Select") 
        {
             document.getElementById("rent").style.display="none"
                document.getElementById("sale").style.display="none"
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

const formatCurrency = (num) => {
  if (num === 0) return "₹0"; // Handle zero case

  // Convert number to string
  const numStr = num.toString();

  // Split the number into whole and decimal parts
  const [whole, decimal] = numStr.split('.');

  // Format the whole part for Indian currency style
  const lastThreeDigits = whole.slice(-3);
  const otherDigits = whole.slice(0, -3);
  const formattedWhole = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + (otherDigits.length > 0 ? "," : "") + lastThreeDigits;

  // Combine whole and decimal parts, if any
  return `${formattedWhole}${decimal ? '.' + decimal : ''}`;
};
const [result, setResult] = useState(0);
const [resultText, setResultText] = useState('');

const totalAreaValue = () => {
  const areaValue = parseFloat(deal.totalarea) || 0; // Ensure valid number
  const priceValue = parseFloat(deal.price1) || 0; // Ensure valid number
  const calculatedResult = areaValue * priceValue;
  setResult(calculatedResult);
  setdeal({ ...deal, total_price: calculatedResult }); // Set total price in deal
};

React.useEffect(() => {
  totalAreaValue();
}, [deal.totalarea,deal.price1]);

React.useEffect(() => {
  // Convert result to text format
  if (result) {
    const words = toWords(result, { format: 'en-IN' });
    setResultText(`(${words} only)`);
  } else {
    setResultText('');
  }
}, [result]);




  

  

    return ( 
        <div>
            <Header1/>
            <Sidebar1/>
            <div style={{padding:"50px"}}>
            <div className="container rounded bg-white mt-5 mb-12" style={{width:"80%",marginLeft:"170px"}}>
            <div className="row" style={{marginTop:"50px"}}>
        <div className="col-12 border-right border-left">
            <div className="p-3">

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right" onClick={()=>window.location.reload()} style={{cursor:"pointer"}}>Add Deal</h4>
                </div><hr></hr><br></br>
                <div className="row mt-2" style={{padding:"5px"}}>
                <div className="col-md-3" id="projectlabel"><label className="labels"style={{fontWeight:"bolder"}}>Price Info</label><img src="https://icon-library.com/images/green-arrow-icon-png/green-arrow-icon-png-12.jpg" style={{height:"20px",width:"145px"}}/></div>
                <div className="col-md-3" id="basiclabel"><label className="labels" style={{fontWeight:"bolder"}}>Add Owner</label><img src="https://icon-library.com/images/green-arrow-icon-png/green-arrow-icon-png-12.jpg" style={{height:"20px",width:"145px"}}/></div>
                <div className="col-md-3" id="photolabel"><label className="labels" style={{fontWeight:"bolder"}}>Add Document</label><img src="https://icon-library.com/images/green-arrow-icon-png/green-arrow-icon-png-12.jpg" style={{height:"20px",width:"115px"}}/></div>
                <div className="col-md-3" id="ownerlabel"><label className="labels" style={{fontWeight:"bolder"}}>Upload</label></div>
                <div className="col-md-12"><hr></hr></div>
                </div><br></br>
{/*-------------------------------------------------------------------price form----------------------------------------------------- */}
               
                <div className="row"  id="projectform" >
        <div className="col-12">
            <div >
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Sale or Rent</h4>
                </div><hr></hr>
                <div className="row mt-2">
                    
                    <div className="col-md-4"><label className="labels">Available For</label><select id="availablefor" className="form-control form-control-sm" required="true" onChange={available_for} >
                    <option>Select</option>
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Lease</option>
                        </select>
                        </div>
                        
                        <div className="col-md-4"><label className="labels">Stage</label><select  className="form-control form-control-sm" required="true" onChange={(e)=>setdeal({...deal,stage:e.target.value})}>
                    <option>Select</option>
                        <option>Open</option>
                        <option>Quote</option>
                        <option>Negotiation </option>
                        <option>Booked </option>
                        <optgroup label="Closed">
                          <option>Won</option><option>Lost</option><option>Reject</option>
                        </optgroup>
                        </select>
                        </div>
                        <div className="col-md-4"></div>

                        <div className="col-md-4"><label className="labels">Project</label><select  className="form-control form-control-sm" required="true" onChange={(e)=>setdeal({...deal,project:e.target.value})} >
                    <option>Select</option>
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Lease</option>
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Block</label><select  className="form-control form-control-sm" required="true" onChange={(e)=>setdeal({...deal,block:e.target.value})} >
                    <option>Select</option>
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Lease</option>
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Unit No.</label><select  className="form-control form-control-sm" required="true" onChange={(e)=>setdeal({...deal,unit_number:e.target.value})} >
                    <option>Select</option>
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Lease</option>
                        </select>
                        </div>
                  
                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Terms Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                </div>

    {/* ===============================================sale start======================================================================== */}


                <div className="row" id="sale" style={{display:"none"}}>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>blank</label><input  type="radio" name="priceoptions" style={{marginRight:"10px"}}/>Expected Price<select required="true" className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,calculated_type:e.target.value})} >
                    <option value="">calculated</option><option value="">absolute</option>
                    </select></div>
                    <div className="col-md-2"><label className="labels" style={{visibility:"hidden"}}>blank</label><input  type="radio" name="priceoptions" style={{marginRight:"10px"}}/>Quote Price<input type="number" className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,price1:e.target.value})}/></div>
                    <div className="col-md-1"><label className="labels" style={{visibility:"hidden"}}>Blank</label><select className="form-control form-control-sm">
                    <option value="">X</option>
                    </select>
                    </div>
                    <div className="col-md-2"><label className="labels" > Total Area</label><input type="number"  className="form-control form-control-sm"  onChange={(e)=>setdeal({...deal,totalarea:e.target.value})}/></div>
                    <div className="col-md-2"><label className="labels" style={{visibility:"hidden"}}> measurment</label><select required="true" className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,measurment1:e.target.value})} >
                    <option value="">sq feet</option>
                    <option value="">sq yard</option>
                    </select></div>
                   <div className="col-md-2"><label className="labels">Total Price<br></br>₹{formatCurrency(result)}<br></br>{resultText}</label></div>

                    <div className="col-md-4"><label className="labels">Deal Type</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,deal_type:e.target.value})}>
                    <option>Select</option>
                        <option>Hot</option>
                        <option>Warm</option>
                        <option>Cold</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Transaction Type</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,transaction_type:e.target.value})}>
                    <option>Select</option>
                        <option>Cash</option>
                        <option>Online</option>
                        <option>Net Banking</option>
                        <option>NEFT</option>
                        <option>Upi</option>
                        <option>RTGS</option>
                        </select></div>
                        <div className="col-md-4"></div>

                        <div className="col-md-5"><label className="labels">Source</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,source:e.target.value})}>
                    <option>Select</option>
                        <option>99 Acre</option>
                        <option>News Paper</option>
                        <option>Walkin</option>
                        <option>Olx</option>
                        </select></div>
                        <div className="col-md-5"><label className="labels">White Portion</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,white_portion:e.target.value})}>
                    <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                       

                        <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                        <div className="col-md-4"><label className="labels">Team</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,team:e.target.value})}>
                    <option>Select</option>
                        <option>99 Acre</option>
                        <option>News Paper</option>
                        <option>Walkin</option>
                        <option>Olx</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">User</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,user:e.target.value})}>
                    <option>Select</option>
                        <option>99 Acre</option>
                        <option>News Paper</option>
                        <option>Walkin</option>
                        <option>Olx</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Visible To</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,visible_to:e.target.value})}>
                    <option>Select</option>
                        <option>Only Me</option>
                        <option>Team</option>
                        <option>All User</option>
                        </select></div>
                      </div>
{/* -----------------------=========================sale end====================================-------------------------------------- */}

{/* ------------------------------------------------============rent start========================-------------------------------------- */}
                        <div className="row" id="rent" style={{display:"none"}}>
                        <div className="col-md-4"><label className="labels">Floors</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,floors:e.target.value})}>
                    <option>Select</option>
                        <option>99 Acre</option>
                        <option>News Paper</option>
                        <option>Walkin</option>
                        <option>Olx</option>
                        </select></div>
                        <div className="col-md-8"></div>

                        <div className="col-md-3"><label className="labels">Expected Price</label><select required="true" className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,expected_price:e.target.value})}>
                    <option value="">phone</option>
                    </select></div>
                    <div className="col-md-3"><label className="labels">Quote Price</label><input className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,quote_price:e.target.value})}/></div>
                    <div className="col-md-1"><label className="labels" style={{visibility:"hidden"}}>Blank</label><input className="form-control form-control-sm"/></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}> Total Area</label><select required="true" className="form-control form-control-sm" >
                    <option value="">phone</option>
                    </select></div>
                   <div className="col-md-2"></div>
                
                    <div className="col-md-3"><label className="labels">Security Deposite</label><input type="text" required="true" className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,security_deposite:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Maintanance Charge</label><input type="text" required="true" className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,maintainence_charge:e.target.value})}/></div>
                    <div className="col-md-2"><label className="labels">Rent Esclation</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,rent_escltion:e.target.value})}>
                    <option>Select</option>
                        <option>99 Acre</option>
                        <option>News Paper</option>
                        <option>Walkin</option>
                        <option>Olx</option>
                        </select></div>
                        <div className="col-md-2"><label className="labels">Rent Period</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,rent_period:e.target.value})}>
                    <option>Select</option>
                        <option>99 Acre</option>
                        <option>News Paper</option>
                        <option>Walkin</option>
                        <option>Olx</option>
                        </select></div>
                        <div className="col-md-2"><label className="labels">Fitout Period</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,fitout_perioud:e.target.value})}>
                    <option>Select</option>
                        <option>99 Acre</option>
                        <option>News Paper</option>
                        <option>Walkin</option>
                        <option>Olx</option>
                        </select></div>

                        <div className="col-md-4"><label className="labels">Deal Type</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,deal_type:e.target.value})}>
                    <option>Select</option>
                        <option>Hot</option>
                        <option>Warm</option>
                        <option>Cold</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Transaction Type</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,transaction_type:e.target.value})}>
                    <option>Select</option>
                        <option>99 Acre</option>
                        <option>News Paper</option>
                        <option>Walkin</option>
                        <option>Olx</option>
                        </select></div>
                        <div className="col-md-4"></div>

                        <div className="col-md-5"><label className="labels">Source</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,source:e.target.value})}>
                    <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                        <div className="col-md-5"><label className="labels">White Portion</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,white_portion:e.target.value})}>
                    <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>

                        <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                        <div className="col-md-4"><label className="labels">Team</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,team:e.target.value})}>
                    <option>Select</option>
                        <option>99 Acre</option>
                        <option>News Paper</option>
                        <option>Walkin</option>
                        <option>Olx</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">User</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,user:e.target.value})}>
                    <option>Select</option>
                        <option>99 Acre</option>
                        <option>News Paper</option>
                        <option>Walkin</option>
                        <option>Olx</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Visible To</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,visible_to:e.target.value})}>
                    <option>Select</option>
                        <option>99 Acre</option>
                        <option>News Paper</option>
                        <option>Walkin</option>
                        <option>Olx</option>
                        </select></div>
                      </div>
                  </div>
  
  {/*============================================ rent end=========================================================================== */}
                  
                    <div className="col-md-12"><hr></hr></div>
                    <div className="row mt-4">
                        <div className="col-md-2" id="projectbtn" onClick={handler} style={{marginLeft:"82%",marginBottom:"-50px"}}><button className="form-control">Next</button></div>
      
                        </div>
                    </div>
                    
        </div>
        </div>
{/*-----------------------------------------------------------------add owner form----------------------------------------------------- */}

                <div id="basicform" style={{padding:"5px"}}>
                <div className="row" style={{width:"100%"}}>
               
                        <div className="col-md-9"><label className="labels" style={{visibility:"hidden"}}>Search</label><input type="search"className="form-control form-control-sm" placeholder="Type here For Search in Contact" required="true"/></div>
                        <div className="col-md-3"><label className="labels">Add Contact</label><button className="form-control form-control-sm" style={{width:"50px"}}>+</button></div>
                    
                     <div className="col-md-12" style={{marginTop:"20px",height:"200px",overflowY:"scroll"}}><label className="labels" >Owner Contact</label><div className="col-md-12"><hr></hr></div></div>
                

                <div className="col-md-12" style={{marginTop:"20px",height:"200px",overflowY:"scroll"}}><label className="labels" >Associate Contact</label><div className="col-md-12"><hr></hr></div></div>
                
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
                </div><hr></hr>
                <div className="row mt-2">
                        <div className="col-md-2"><label className="labels">Document Name</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setdocuments({...documents,document_name:e.target.value})}/> </div>
                        <div className="col-md-2"><label className="labels">Document No</label><input type="text" className="form-control form-control-sm"onChange={(e)=>setdocuments({...documents,document_no:e.target.value})} /></div>
                        <div className="col-md-2"><label className="labels">Date</label><input type="date" className="form-control form-control-sm" onChange={(e)=>setdocuments({...documents,document_Date:e.target.value})}/></div>
                        <div className="col-md-2"><label className="labels">Linked Contact</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setdocuments({...documents,linkded_contact:e.target.value})}/></div>
                        <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Pic</label><input type="file" name="pic" multiple className="form-control form-control-sm" onChange={handlepicchange}/></div>
                        <div className="col-md-1"><label className="labels" style={{visibility:"hidden"}}>Add</label><button className="form-control form-control-sm" onClick={adddocument}>+</button></div>
                        <TableContainer component={Paper} style={{height:"400px",width:"1000px",overflowY:"scroll",marginTop:"40px",marginLeft:"50px"}}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
     
    <TableHead>
        <TableRow>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Serial</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>Document Name</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Linked Contact</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Number</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Date</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Action</StyledTableCell>
        </TableRow>
      </TableHead>
      <tbody>
        {
         
        deal.document_details.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell >
             {index+1}
            </StyledTableCell>
            <StyledTableCell  >
            {item.document_name}
            </StyledTableCell>
            <StyledTableCell  >
            {item.linkded_contact}
            </StyledTableCell>
            <StyledTableCell  >
            {item.document_no}
            </StyledTableCell>
            <StyledTableCell >
            {item.document_Date}
            </StyledTableCell>
            <StyledTableCell style={{ padding: "10px", cursor: "pointer", fontFamily: "times new roman", fontSize: "10px" }}  >
            <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deletedocument(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
    </TableContainer>
                  
                  </div>
              </div>
              <div className="row mt-4">
                    <div className="col-md-2" onClick={handler5} style={{marginLeft:"82%",marginBottom:"40px",display:"none"}} id="photosbtn"><button className="form-control" >Next</button></div>
                    <div className="col-md-2" onClick={handler4} style={{marginLeft:"-90%",display:"none"}} id="prevbtn1"><button className="form-control" >Prev</button></div>
                </div>  

{/*-----------------------------------------------------------------owner details form----------------------------------------------------------------- */}             
                <div id="ownerform" style={{padding:"5px",marginTop:"-130px",display:"none"}}>
               
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
                          {deal.s_no.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                      <input 
                                        type="text"
                                        className="form-control form-control-sm"
                                        
                                        onChange={(event) => handlesnochange(index, event)}
                                      />
                                      
                                    </div>
                                  ))}
                          </td>
                          <td>
                          {deal.preview.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                      <input 
                                      name="preview"
                                        type="file"
                                        className="form-control form-control-sm"
                                        multiple
                                        onChange={(event) => handlepreviewchange(index, event)}
                                      />
                                        {name.previewUrls && name.previewUrls.map((url, idx) => (
          <img key={idx} src={url} alt={`preview ${index}-${idx}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
        ))}
                                    </div>
                                  ))}
                          </td>
                          <td>
                          {deal.descriptions.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                      <input 
                                        type="text"
                                        className="form-control form-control-sm"
                                      
                                        onChange={(event) => handledescriptionchange(index, event)}
                                      />
                                      
                                    </div>
                                  ))}
                          </td>
                          <td>
                          {deal.category.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                      <select className="form-control form-control-sm" required="true" onChange={(event) => handlecategorychange(index, event)}>
                                          <option>select</option>
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
                          {deal.action.map((name, index) => (
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
                          {deal.s_no1.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                      <input 
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={name}
                                        onChange={(event) => handlesno1change(index, event)}
                                      />
                                  
                                    </div>
                                  ))}
                          </td>
                          <td>
                          {deal.url.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                      <input 
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={name}
                                        onChange={(event) => handleurlChange(index, event)}
                                      />
                                      
                                    </div>
                                  ))}
                                  
                          </td>
                          <td>
                          {deal.action1.map((name, index) => (
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
                   
                    <div className="col-md-12"><label className="labels">Publish On</label></div>
                    <div className="col-md-12"><hr></hr></div>
                    <div className="col-md-4" style={{marginTop:"10px"}}><label className="labels">Website</label>
                                      <select className="form-control form-control-sm" required="true" onChange={(e)=>setdeal({...deal,website:e.target.value})}>
                                          <option>select</option>
                                          <option>Mr.</option>
                                          <option>Mrs.</option>
                                          <option>Smt.</option>
                                          <option>Dr.</option>
                                          <option>Er.</option>
                                          <option>Sh.</option>
                                          <option>col</option>
                                          </select>
                                    </div>
                                    <div className="col-md-4" style={{marginTop:"10px"}}><label className="labels">Social Media</label>
                                      <select className="form-control form-control-sm" required="true" onChange={(e)=>setdeal({...deal,social_media:e.target.value})}>
                                          <option>select</option>
                                          <option>Mr.</option>
                                          <option>Mrs.</option>
                                          <option>Smt.</option>
                                          <option>Dr.</option>
                                          <option>Er.</option>
                                          <option>Sh.</option>
                                          <option>col</option>
                                          </select>
                                    </div>
                                    <div className="col-md-4" style={{marginTop:"10px"}}><label className="labels">Send(Matched Lead)</label>
                                      <select className="form-control form-control-sm" required="true" onChange={(e)=>setdeal({...deal,send_matchedlead:e.target.value})}>
                                          <option>select</option>
                                          <option>Mr.</option>
                                          <option>Mrs.</option>
                                          <option>Smt.</option>
                                          <option>Dr.</option>
                                          <option>Er.</option>
                                          <option>Sh.</option>
                                          <option>col</option>
                                          </select>
                                    </div>
                                    </div>
                  </div>
                <div className="row mt-4">
                    <div className="col-md-2"  style={{marginLeft:"82%",marginBottom:"40px",display:"none"}} id="ownerbtn"><button className="form-control" onClick={add_deal}>Save</button></div>
                    <div className="col-md-2" onClick={handler6} style={{marginLeft:"-90%",display:"none"}} id="prevbtn2"><button className="form-control" >Prev</button></div>
                </div>  
      
        </div>
    </div>
               <ToastContainer/>
        </div>
    );
    }
export default Deal;
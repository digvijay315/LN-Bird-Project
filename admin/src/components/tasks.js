import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";

import { ToastContainer,toast } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { event } from "jquery";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
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
// import {  AlternateEmail, Remove as RemoveIcon } from '@mui/icons-material';
// import { IconButton } from '@mui/material';
import'../css/addcontact.css';
import Tooltip from '@mui/material/Tooltip';



function Tasks() {
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
    React.useEffect(()=>{fetchdata1()},[])
    React.useEffect(()=>{fetchdata2()},[])

/*-------------------------------------------------------------------fetching all contact data start---------------------------------------------------------------------------- */                                                     
    const[data,setdata]=useState([]);
    const fetchdata=async(event)=>
    {
      
      try {
        const resp=await api.get('viewcalltask')
        const callincoming=resp.data.call_task

        const resp1=await api.get('viewmailtask')
        const mailincoming=resp1.data.mail_task

        setdata([...callincoming,...mailincoming])
      } catch (error) {
        console.log(error);
      }
    
    }

    const[meetingdata,setmeetingdata]=useState([]);
    const fetchdata1=async()=>
    {
      
      try {
        const resp=await api.get('viewmeetingtask')
        const incoming=resp.data.meetingtask
        setmeetingdata([...incoming])
      } catch (error) {
        console.log(error);
      }
    
    }

    const[sitedata,setsitedata]=useState([]);
    const fetchdata2=async()=>
    {
      
      try {
        const resp=await api.get('viesitevisit')
        const incoming=resp.data.sitevisit
        setsitedata([...incoming])
      } catch (error) {
        console.log(error);
      }
    
    }
    
    
    
  /*-------------------------------------------------------------------fetching all contact data end---------------------------------------------------------------------------- */                                                     

  /*-------------------------------------------------------------------delete  contact data start---------------------------------------------------------------------------- */                                                     
    // const deletecontact=async(item)=>
    //     {
    //       try {
    //         const id=item._id
    //         const resp=await api.delete(`deletecontact/${id}`)
    //         toast.success("contact deleted successfully",{ autoClose: 2000 })
    //         setTimeout(() => {
    //           window.location.reload()
    //         }, 2000);
    //       } catch (error) {
    //         console.log(error);
    //       }
    //     }

        const deleteSelectedItems = async () => {
          try {
            if(selectedItems.length===0)
            {
              toast.error("please select first",{autoClose:"2000"})
              return
            }
            const resp = selectedItems.map(async (itemId) => {
              await axios.delete(`http://localhost:5000/deletecontact/${itemId}`);
            });
            
            toast.success('Selected items deleted successfully',{autoClose:"2000"})
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } catch (error) {
            console.log(error);
          }
        };
     
/*-------------------------------------------------------------------delete  contact data end---------------------------------------------------------------------------- */                                                     

                    
/*-------------------------------------------------------------------searching all contact data by mobile email tags and company start---------------------------------------------------------------------------- */                                                     
                      const[searchdata,setsearchdata]=useState()
                      const fetchdatabyemail_mobile_tags_company=async(e)=>
                        {
                          // e.preventDefault()
                          try {
                            const resp=await api.get(`viewcontactbyemail/${searchdata}`);
                              const incoming=(Array.isArray(resp.data.contact) ? resp.data.contact : [resp.data.contact]);
                              // setdata(incoming)

                            const resp1=await api.get(`viewcontactbymobile/${searchdata}`);
                            const incoming1=(Array.isArray(resp1.data.contact) ? resp1.data.contact : [resp1.data.contact]);
                            setdata([...incoming,...incoming1])

                            const resp2=await api.get(`viewcontactbytags/${searchdata}`);
                            const incoming2=(Array.isArray(resp2.data.contact) ? resp2.data.contact : [resp2.data.contact]);
                            setdata([...incoming,...incoming1,...incoming2])
                            
                            const resp3=await api.get(`viewcontactbycompany/${searchdata}`);
                            const incoming3=(Array.isArray(resp3.data.contact) ? resp3.data.contact : [resp3.data.contact]);
                            setdata([...incoming,...incoming1,...incoming2,...incoming3])

                          } catch (error) {
                            console.log(error);
                          }
                        }
                        const handlekeypress1=(event)=>
                        {
                            if(event.key==="Enter")
                                {
                                  fetchdatabyemail_mobile_tags_company()
                                    setsearchdata('')
                                }
                            
                        }
/*-------------------------------------------------------------------searching all contact data by mobile email tags and company end---------------------------------------------------------------------------- */                                                     
      
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(5); // User-defined items per page
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(data.length / itemsPerPage);

const [currentPage1, setCurrentPage1] = useState(1);
const [itemsPerPage1, setItemsPerPage1] = useState(5); // User-defined items per page
const indexOfLastItem1 = currentPage1 * itemsPerPage1;
const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
const currentItems1 = meetingdata.slice(indexOfFirstItem1, indexOfLastItem1);
const totalPages1 = Math.ceil(meetingdata.length / itemsPerPage1);

const [currentPage2, setCurrentPage2] = useState(1);
const [itemsPerPage2, setItemsPerPage2] = useState(5); // User-defined items per page
const indexOfLastItem2 = currentPage2 * itemsPerPage2;
const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
const currentItems2 = sitedata.slice(indexOfFirstItem2, indexOfLastItem2);
const totalPages2 = Math.ceil(sitedata.length / itemsPerPage2);


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

/*-------------------------------------------------------------------pagination,mui table and export to excel end---------------------------------------------------------------------------- */                                                     
    


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
   
  


    
    const[emails,setemails]=useState([])
    const [show3, setshow3] = useState(false);
  
    const handleClose3 = () => setshow3(false);
    const handleShow3=async()=>
    {
      setshow3(true);
      selectedItems.map(async(item)=>
            {
              const resp1=await api.get(`viewcontactbyname/${item}`)// here search contact by id not name
              const emaildata=(resp1.data.contact.email)
              setemails((prevProfile)=>([...prevProfile,emaildata]))
            })
    }
    const[message,setmessage]=useState("")
    
    const sendmail=async(e)=>
      {
        e.preventDefault();
        try {
          
          const resp=await api.post(`contact/sendmail`,{emails,message})
          if(resp.status===200)
          {
            toast.success("Mail Sent Successfully",{ autoClose: 2000 })
            setTimeout(() => {
              navigate('/contactdetails')
            }, 2000);
            setTimeout(() => {
              setshow3(false)
            }, 2000);
          }
         
        } catch (error) {
          toast.error(error.response.data,{ autoClose: 2000 });
        }
      }


/*-------------------------------------------------------------------custome table settings start---------------------------------------------------------------------------- */                                                     
      
 
const sitevisitcolumns = [
        { id: 'sno', name: '#' },
        { id: 'lead', name: 'Lead' },
        { id: 'project', name: 'Project' },
        { id: 'date', name: 'Date' },
        { id: 'scheduled_for', name: 'Scheduled For' },
        { id: 'scheduled_by', name: 'Scheduled By' },
        { id: 'agenda', name: 'Agenda' },
        { id: 'source', name: 'Source' },
        { id: 'feedback', name: 'Feedback' },
        { id: 'stage', name: 'Stage' },
        { id: 'status', name: 'Status' },
        { id: 'action', name: 'Action' },
      ];
      
      const [selectedItems, setSelectedItems] = useState([]); // To track selected rows
      const [selectAll, setSelectAll] = useState(false); // To track the state of the "Select All" checkbox
      const [visibleColumns, setVisibleColumns] = useState(sitevisitcolumns.slice(1));
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
       
        setSelectAll(!selectAll);
        if (!selectAll) {
          // Add all current page item IDs to selectedItems
          setSelectedItems(currentItems2.map((item) => item._id));
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

      const followupcolumns = [
        { id: 'sno', name: '#' },
        { id: 'details', name: 'Details' },
        { id: 'scheduled_date', name: 'Scheduled Date' },
        { id: 'agenda', name: 'Agenda' },
        { id: 'activity_type', name: 'Activity Type' },
        { id: 'scheduled_by', name: 'Scheduled By' },
        { id: 'scheduled_for', name: 'Scheduled For' },
        { id: 'stage', name: 'Stage' },
        { id: 'status', name: 'Status' },
        { id: 'action', name: 'Action' },
      ];
      const [selectedItems1, setSelectedItems1] = useState([]); // To track selected rows
      const [selectAll1, setSelectAll1] = useState(false); // To track the state of the "Select All" checkbox
      const [visibleColumns1, setVisibleColumns1] = useState(followupcolumns.slice(1));
      const [showColumnList1, setShowColumnList1] = useState(false);

      const handleSelectAll1 = () => {
       
        setSelectAll1(!selectAll1);
        if (!selectAll1) {
          // Add all current page item IDs to selectedItems
          setSelectedItems1(currentItems.map((item) => item._id));
        } else {
          // Deselect all
          setSelectedItems1([]);
       
        }
      };
    
      const handleRowSelect1 = (id) => {
     
        if (selectedItems1.includes(id)) {
          setSelectedItems1(selectedItems1.filter((itemId) => itemId !== id));
        } else {
          setSelectedItems1([...selectedItems1, id]);
        
        }
      };

      
      const meetingcolumns = [
        { id: 'sno', name: '#' },
        { id: 'details', name: 'Details' },
        { id: 'scheduled_date', name: 'Scheduled Date' },
        { id: 'agenda', name: 'Agenda' },
        { id: 'activity_type', name: 'Activity Type' },
        { id: 'scheduled_by', name: 'Scheduled By' },
        { id: 'scheduled_for', name: 'Scheduled For' },
        { id: 'stage', name: 'Stage' },
        { id: 'status', name: 'Status' },
        { id: 'action', name: 'Action' },
      ];
      const [selectedItems2, setSelectedItems2] = useState([]); // To track selected rows
      const [selectAll2, setSelectAll2] = useState(false); // To track the state of the "Select All" checkbox
      const [visibleColumns2, setVisibleColumns2] = useState(meetingcolumns.slice(1));
      const [showColumnList2, setShowColumnList2] = useState(false);

      const handleSelectAll2 = () => {
       
        setSelectAll2(!selectAll2);
        if (!selectAll2) {
          // Add all current page item IDs to selectedItems
          setSelectedItems2(currentItems1.map((item) => item._id));
        } else {
          // Deselect all
          setSelectedItems2([]);
       
        }
      };
    
      const handleRowSelect2 = (id) => {
     
        if (selectedItems2.includes(id)) {
          setSelectedItems2(selectedItems2.filter((itemId) => itemId !== id));
        } else {
          setSelectedItems2([...selectedItems2, id]);
        
        }
      };

    /*-------------------------------------------------------------------custome table end---------------------------------------------------------------------------- */                                                     
    
    
      const pagereload=()=>
      {
        window.location.reload()
      }

 /*-------------------------------------------------------------------updation start---------------------------------------------------------------------------- */                                                     


       
       
      

           
         
                        
                     
     

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

const[ischecked,setischecked]=useState(false)
const handleischeckedchange=(e)=>
{
  setischecked(e.target.checked)
}

const sitevisit=()=>
{
  document.getElementById("followup").style.display="none"
  document.getElementById("followup1").style.backgroundColor="white"
  document.getElementById("followup1").style.borderRadius="0px"

  document.getElementById("sitevisit").style.display="block"
  document.getElementById("sitevisit1").style.backgroundColor="gray"
  document.getElementById("sitevisit1").style.borderRadius="10px"

  document.getElementById("meeting").style.display="none"
  document.getElementById("meeting1").style.backgroundColor="white"
  document.getElementById("meeting1").style.borderRadius="0px"
}
const followup=()=>
  {
    document.getElementById("followup").style.display="block"
    document.getElementById("followup1").style.backgroundColor="gray"
    document.getElementById("followup1").style.borderRadius="10px"

    document.getElementById("sitevisit").style.display="none"
    document.getElementById("sitevisit1").style.backgroundColor="white"
    document.getElementById("sitevisit1").style.borderRadius="0px"

    document.getElementById("meeting").style.display="none"
      document.getElementById("meeting1").style.backgroundColor="white"
      document.getElementById("meeting1").style.borderRadius="0px"
  }
  const meeting=()=>
    {

      document.getElementById("meeting").style.display="block"
      document.getElementById("meeting1").style.backgroundColor="gray"
      document.getElementById("meeting1").style.borderRadius="10px"

      document.getElementById("followup").style.display="none"
      document.getElementById("followup1").style.backgroundColor="white"
      document.getElementById("followup1").style.borderRadius="0px"
  
      document.getElementById("sitevisit").style.display="none"
      document.getElementById("sitevisit1").style.backgroundColor="white"
      document.getElementById("sitevisit1").style.borderRadius="0px"
    }
        

    return ( 
        <div>
            <Header1/>
            <Sidebar1/>
      <div style={{marginTop:"80px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
        
        <h3 style={{marginLeft:"10px",cursor:"pointer"}} onClick={pagereload}>Tasks </h3>
        
        <Tooltip title="Export Data.." arrow>
            <button  class="btn btn-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent",border:"none"}}>
            <img src="https://static.thenounproject.com/png/61783-200.png" style={{height:"25px"}} alt=""/>
        </button></Tooltip>
            <ul class="dropdown-menu" id="exporttoexcel"> 
            
            <li  onClick={exportToExcel} >Export Data</li>
              
            </ul>
            <label className="labels" id="followup1" style={{marginLeft:"30px",cursor:"pointer",width:"120px",textAlign:"center"}} onClick={followup}>Follow Up </label>
            <label className="labels" id="sitevisit1" style={{marginLeft:"30px",cursor:"pointer",width:"100px",textAlign:"center"}} onClick={sitevisit}>Site Visit </label>
            <label className="labels" id="meeting1" style={{marginLeft:"30px",cursor:"pointer",width:"100px",textAlign:"center"}} onClick={meeting}>Meeting </label>

            <button  className="form-control form-control-sm form-control form-control-sm-sm" style={{width:"150px",marginLeft:"40%"}}>Play Task</button>
            <button onClick={handleAddColumnClick} className="form-control form-control-sm form-control form-control-sm-sm" style={{width:"120px",marginLeft:"1%"}}><img src="https://cdn-icons-png.flaticon.com/512/566/566737.png" style={{height:"20px"}}/>Filter</button>
        
       
       
          
      </div>
      <div style={{marginTop:"10px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px",gap:"50px",fontFamily:"times-new-roman",fontWeight:"bold"}}>
        
        <div style={{cursor:"pointer"}}>Today</div>
        <div style={{cursor:"pointer"}}>Upcoming</div>
        <div style={{cursor:"pointer"}}>Overdue</div>
        <div style={{cursor:"pointer"}}>No Due Date</div>
        <div style={{cursor:"pointer"}}>Completed</div>
        <div style={{cursor:"pointer"}}>All</div>
      </div>
      <div style={{marginTop:"10px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"10px",paddingTop:"10px"}}>
      <input type="checkbox" onChange={handleischeckedchange}/>
      <input id="search" type="text" disabled={!ischecked} className="form-control form-control-sm form-control form-control-sm-sm" placeholder="search for tasks calls etc." style={{width:"25%"}} onChange={(e)=>setsearchdata(e.target.value)} onKeyDown={handlekeypress1}/>
      <div style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"70%",position:"absolute"}}>
           {/* <Button className="form-control form-control-sm" style={{width:"120px",backgroundColor:"transparent"}}>Play Task</Button> */}
           <label className="labels" style={{width:"350px"}}>Sorted By Due Date</label>
           </div>

    
    
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
     
          <div id="followup" style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white",display:"none"}}>
          <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>
            <input
              type="checkbox"
              checked={selectAll1}
              onChange={handleSelectAll1}
            />
          </StyledTableCell>
          {visibleColumns1.map((col) => (
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
                checked={selectedItems1.includes(item._id)}
                onChange={() => handleRowSelect1(item._id)}
              />
              {index + 1}
            </StyledTableCell>
            <StyledTableCell 
              style={{ padding: "10px", cursor: "pointer", fontFamily: "times new roman" }} 
              onClick={() => handleShow2(item)}
            >
               {item.title2} {item.first_name} {item.last_name}
              <br />
              <SvgIcon component={PhoneIphoneIcon} />
              <span>{item.mobile_no}</span>
              <br />
              <SvgIcon component={EmailIcon} />
              <span>{item.email}</span>
            </StyledTableCell>

            <StyledTableCell>
              {item.due_date}
            </StyledTableCell>
            <StyledTableCell>
              <b>{item.title}</b> <br></br>
              {item.remarks}
            </StyledTableCell>
            <StyledTableCell>
              {item.activity_type}
            </StyledTableCell>
            <StyledTableCell>
            {item.executive}
            </StyledTableCell>
            <StyledTableCell>
              
            </StyledTableCell>
            <StyledTableCell>
             {item.stage}
            </StyledTableCell>
            <StyledTableCell>
             
            </StyledTableCell>
            <StyledTableCell>
              <img src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" style={{height:"50px",width:"50px",cursor:"pointer"}}></img>
            </StyledTableCell>
            
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"40px",bottom:"0",backgroundColor:"#f8f9fa"}}>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman",color:"GrayText"}}>Summary</h5>
          {/* <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Total Contact <span style={{color:"green",fontSize:"25px"}}>{totalcontact}</span></h5> */}
        </footer>
      </div>

      <div id="sitevisit" style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white",display:"none"}}>
          <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>
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
         
        currentItems2.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
              <input 
                type="checkbox"
                checked={selectedItems.includes(item._id)}
                onChange={() => handleRowSelect(item._id)}
              />
              {index + 1}
            </StyledTableCell>
            <StyledTableCell 
              style={{ padding: "10px", cursor: "pointer", fontFamily: "times new roman" }} 
              onClick={() => handleShow2(item)}
            >
              {item.title2} {item.first_name} {item.last_name}
              <br />
              <SvgIcon component={PhoneIphoneIcon} />
              <span>{item.mobile_no}</span>
              <br />

              <SvgIcon component={EmailIcon} />
              <span>{item.email}</span>
            </StyledTableCell>
           
                <StyledTableCell style={{ padding: "10px", fontFamily: "times new roman" }}  >
                 {item.project}
                </StyledTableCell>
                <StyledTableCell style={{ padding: "10px", fontFamily: "times new roman" }}  >
                 
                </StyledTableCell>
                <StyledTableCell style={{ padding: "10px", fontFamily: "times new roman" }}  >
                 
                </StyledTableCell>
                <StyledTableCell style={{ padding: "10px", fontFamily: "times new roman" }}  >
                {item.executive}
                </StyledTableCell>
                <StyledTableCell style={{ padding: "10px", fontFamily: "times new roman" }}  >
                 {item.title}
                </StyledTableCell>
                <StyledTableCell style={{ padding: "10px", fontFamily: "times new roman" }}  >
                 
                </StyledTableCell>
                <StyledTableCell style={{ padding: "10px", fontFamily: "times new roman" }}  >
                 {item.remark}
                </StyledTableCell>
                <StyledTableCell style={{ padding: "10px", fontFamily: "times new roman" }}  >
                {item.stage}
                </StyledTableCell>
                <StyledTableCell style={{ padding: "10px", fontFamily: "times new roman" }}  >
                
                </StyledTableCell>
                <StyledTableCell>
              <img src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" style={{height:"50px",width:"50px",cursor:"pointer"}}></img>
            </StyledTableCell>
            
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"40px",bottom:"0",backgroundColor:"#f8f9fa"}}>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman",color:"GrayText"}}>Summary</h5>
          {/* <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Total Contact <span style={{color:"green",fontSize:"25px"}}>{totalcontact}</span></h5> */}
        </footer>
      </div>

      <div id="meeting" style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white",display:"none"}}>
          <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>
            <input
              type="checkbox"
              checked={selectAll2}
              onChange={handleSelectAll2}
            />
          </StyledTableCell>
          {visibleColumns2.map((col) => (
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
         
        currentItems1.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
              <input 
                type="checkbox"
                checked={selectedItems2.includes(item._id)}
                onChange={() => handleRowSelect2(item._id)}
              />
              {index + 1}
            </StyledTableCell>
            <StyledTableCell 
              style={{ padding: "10px", cursor: "pointer", fontFamily: "times new roman" }} 
              onClick={() => handleShow2(item)}
            >
              {item.title2} {item.first_name} {item.last_name}
              <br />
              <SvgIcon component={PhoneIphoneIcon} />
              <span>{item.mobile_no}</span>
              <br />
              <SvgIcon component={EmailIcon} />
              <span>{item.email}</span>
            </StyledTableCell>
           
                <StyledTableCell 
                 
                  style={{ padding: "10px", fontFamily: "times new roman" }}
                >
                  {item.due_date}
                </StyledTableCell>

                <StyledTableCell 
                 
                  style={{ padding: "10px", fontFamily: "times new roman" }}
                >
                  {item.title}
                </StyledTableCell>
                <StyledTableCell 
                 
                 style={{ padding: "10px", fontFamily: "times new roman" }}
               >
                 {item.activity_type}
               </StyledTableCell>
               <StyledTableCell 
                 
                 style={{ padding: "10px", fontFamily: "times new roman" }}
               >
                  {item.executive}
               </StyledTableCell>
               <StyledTableCell 
                 
                 style={{ padding: "10px", fontFamily: "times new roman" }}
               >
                 
               </StyledTableCell>
               <StyledTableCell 
                 
                 style={{ padding: "10px", fontFamily: "times new roman" }}
               >
                {item.stage}
               </StyledTableCell>
               <StyledTableCell 
                 
                 style={{ padding: "10px", fontFamily: "times new roman" }}
               >
               
               </StyledTableCell>
               <StyledTableCell 
                 
                 style={{ padding: "10px", fontFamily: "times new roman" }}
               >
                 <img src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" style={{height:"50px",width:"50px",cursor:"pointer"}}></img>
               </StyledTableCell>
              
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"40px",bottom:"0",backgroundColor:"#f8f9fa"}}>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman",color:"GrayText"}}>Summary</h5>
          {/* <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Total Contact <span style={{color:"green",fontSize:"25px"}}>{totalcontact}</span></h5> */}
        </footer>
      </div>
       
   

        

   
          <ToastContainer/>
        </div>
     );
}

export default Tasks;
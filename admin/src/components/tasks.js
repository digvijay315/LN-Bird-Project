import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
import { Select, MenuItem, Checkbox, ListItemText } from '@mui/material';


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
        const resp=await api.get('viewsitevisit')
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
              await api.delete(`removesitevisittask/${itemId}`);
            });
            
            toast.success('Selected items deleted successfully',{autoClose:"2000"})
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } catch (error) {
            console.log(error);
          }
        };

        const deleteSelectedItems1 = async () => {
          try {
            if(selectedItems1.length===0)
            {
              toast.error("please select first",{autoClose:"2000"})
              return
            }
            const resp = selectedItems1.map(async (itemId) => {
              await api.delete(`removecallask/${itemId}`);
            });

            const resp1 = selectedItems1.map(async (itemId) => {
              await api.delete(`removemailask/${itemId}`);
            });
            
            toast.success('Selected items deleted successfully',{autoClose:"2000"})
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } catch (error) {
            console.log(error);
          }
        };


        const deleteSelectedItems2 = async () => {
          try {
            if(selectedItems2.length===0)
            {
              toast.error("please select first",{autoClose:"2000"})
              return
            }
            const resp = selectedItems2.map(async (itemId) => {
              await api.delete(`removemeetingtask/${itemId}`);
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
      

// ============================site visit task pagination==============================================================

const [currentPage2, setCurrentPage2] = useState(1);
const [itemsPerPage2, setItemsPerPage2] = useState(5); // User-defined items per page
const indexOfLastItem2 = currentPage2 * itemsPerPage2;
const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
const currentItems2 = sitedata.slice(indexOfFirstItem2, indexOfLastItem2);
const totalPages2 = Math.ceil(sitedata.length / itemsPerPage2);


  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage2(Number(e.target.value));
    setCurrentPage2(1); // Reset to first page whenever items per page changes
  };

// Function to handle page changes
const paginate2 = (pageNumber) => setCurrentPage2(pageNumber);

// Function to handle "Next" and "Previous" page changes
const goToNextPage2 = () => {
  if (currentPage2 < totalPages2) {
    setCurrentPage2(currentPage2 + 1);
  }
};

const goToPreviousPage2 = () => {
  if (currentPage2 > 1) {
    setCurrentPage2(currentPage2 - 1);
  }
};

const renderPageNumbers2 = () => {
  // Define the range of page numbers to display
  const maxPageNumbersToShow2 = 5;
  const startPage2 = Math.max(1, currentPage2 - Math.floor(maxPageNumbersToShow2 / 2));
  const endPage2 = Math.min(totalPages2, startPage2 + maxPageNumbersToShow2 - 1);

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
      {currentPage2 > 1 && (
        <button onClick={goToPreviousPage2} style={{ width: '50px', borderRadius: '5px', marginRight: '5px' }}>
          Prev
        </button>
      )}

      {/* Page Numbers */}
      {Array.from({ length: endPage2 - startPage2 + 1 }, (_, i) => startPage2 + i).map((number) => (
        <button
          key={number}
          onClick={() => paginate2(number)}
          style={{
            width: '30px',
            borderRadius: '5px',
            marginRight: '5px',
            flexShrink: 0, // Prevent buttons from shrinking
            backgroundColor: number === currentPage2 ? 'lightblue' : 'white',
          }}
        >
          {number}
        </button>
      ))}

      {/* Next Button */}
      {currentPage2 < totalPages2 && (
        <button onClick={goToNextPage2} style={{ width: '50px', borderRadius: '5px', marginRight: '5px' }}>
          Next
        </button>
      )}
    </div>
  );
};


  // ================================followup task pagination=====================================================

  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(5); // User-defined items per page
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(data.length / itemsPerPage);


  // Handle items per page change
  const handleItemsPerPageChangefollowup = (e) => {
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



// ===========================================meeting task pagination===========================================================


const [currentPage1, setCurrentPage1] = useState(1);
const [itemsPerPage1, setItemsPerPage1] = useState(5); // User-defined items per page
const indexOfLastItem1 = currentPage1 * itemsPerPage1;
const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
const currentItems1 = meetingdata.slice(indexOfFirstItem1, indexOfLastItem1);
const totalPages1 = Math.ceil(meetingdata.length / itemsPerPage1);


  // Handle items per page change
  const handleItemsPerPageChangemeeting = (e) => {
    setItemsPerPage1(Number(e.target.value));
    setCurrentPage1(1); // Reset to first page whenever items per page changes
  };

// Function to handle page changes
const paginate1 = (pageNumber) => setCurrentPage1(pageNumber);

// Function to handle "Next" and "Previous" page changes
const goToNextPage1 = () => {
  if (currentPage1 < totalPages1) {
    setCurrentPage1(currentPage1 + 1);
  }
};

const goToPreviousPage1 = () => {
  if (currentPage1 > 1) {
    setCurrentPage1(currentPage1 - 1);
  }
};

const renderPageNumbers1 = () => {
  // Define the range of page numbers to display
  const maxPageNumbersToShow1 = 5;
  const startPage1 = Math.max(1, currentPage1 - Math.floor(maxPageNumbersToShow1 / 2));
  const endPage1 = Math.min(totalPages1, startPage1 + maxPageNumbersToShow1 - 1);

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
      {currentPage1 > 1 && (
        <button onClick={goToPreviousPage1} style={{ width: '50px', borderRadius: '5px', marginRight: '5px' }}>
          Prev
        </button>
      )}

      {/* Page Numbers */}
      {Array.from({ length: endPage1 - startPage1 + 1 }, (_, i) => startPage1 + i).map((number) => (
        <button
          key={number}
          onClick={() => paginate1(number)}
          style={{
            width: '30px',
            borderRadius: '5px',
            marginRight: '5px',
            flexShrink: 0, // Prevent buttons from shrinking
            backgroundColor: number === currentPage1 ? 'lightblue' : 'white',
          }}
        >
          {number}
        </button>
      ))}

      {/* Next Button */}
      {currentPage1 < totalPages1 && (
        <button onClick={goToNextPage1} style={{ width: '50px', borderRadius: '5px', marginRight: '5px' }}>
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
      

// =================================site visit table start===========================================================================
 
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

      useEffect(()=>
        {
          if(selectedItems.length===0)
          {
            document.getElementById("siteaction").style.display="none"
             document.getElementById("meetingaction").style.display="none"
           
          }
          if(selectedItems.length===1)
          {
            document.getElementById("siteaction").style.display="inline-block"
             document.getElementById("meetingaction").style.display="none"
          }

          if(selectedItems.length>1)
          {
            document.getElementById("siteaction").style.display="inline-block"
             document.getElementById("meetingaction").style.display="none"
          
          }
        },[selectedItems])

  //=============================== site visit task table end==================================================================

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

      useEffect(()=>
        {
          if(selectedItems1.length===0)
          {
            document.getElementById("siteaction").style.display="none"
            document.getElementById("meetingaction").style.display="none"
            document.getElementById("followupaction").style.display="none"
           
          }
          if(selectedItems1.length===1)
          {
            document.getElementById("siteaction").style.display="none"
            document.getElementById("meetingaction").style.display="none"
            document.getElementById("followupaction").style.display="inline-block"
          }

          if(selectedItems1.length>1)
          {
            document.getElementById("siteaction").style.display="none"
            document.getElementById("meetingaction").style.display="none"
            document.getElementById("followupaction").style.display="inline-block"
          
          }
        },[selectedItems1])



  //=================================== this is for meeting task==================================================================
      
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

      useEffect(()=>
        {
          if(selectedItems2.length===0)
          {
            document.getElementById("meetingaction").style.display="none"
                document.getElementById("siteaction").style.display="none"
           
          }
          if(selectedItems2.length===1)
          {
            document.getElementById("meetingaction").style.display="inline-block"
             document.getElementById("siteaction").style.display="none"
          }

          if(selectedItems2.length>1)
          {
            document.getElementById("meetingaction").style.display="inline-block"
             document.getElementById("siteaction").style.display="none"
          
          }
        },[selectedItems2])


    /*-------------------------------------------------------------------meeting task end---------------------------------------------------------------------------- */                                                     
    
    
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

const Sitevisit=()=>
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

  document.getElementById("sitevisitpagination").style.display="flex"
  document.getElementById("followuppagination").style.display="none"
      document.getElementById("meetingpagination").style.display="none"
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

  document.getElementById("sitevisitpagination").style.display="none"
  document.getElementById("followuppagination").style.display="flex"
    document.getElementById("meetingpagination").style.display="none"
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

      document.getElementById("sitevisitpagination").style.display="none"
      document.getElementById("followuppagination").style.display="none"
        document.getElementById("meetingpagination").style.display="flex"
    }
        


       

                              

// ==================================site visit update with deal update start=============================================================


      const [show1, setshow1] = useState(false);
    
                  const handleClose1 = () => setshow1(false);
                  const handleShow1=async()=>
                  {
                    setshow1(true);
                    fetchsitevisitdata()
                    fetchleaddata()
                   
                  }

                  const [sitevisit,setsitevisit]=useState({activity_type:"SiteVisit",title:"",executive:"",project:[],block:[],sitevisit_type:"",
                    inventory:[],lead:"",confirmation:"",remark:"",participants:"",remind_me:"",start_date:"",end_date:"",complete:"",stage:"",title2:"",first_name:"",
                    last_name:"",mobile_no:[],email:[],stage:"",lead_id:"",status:"",intrested_project:[],intrested_block:[],intrested_inventory:[],date:"",feedback:""})


                   

    const fetchsitevisitdata=async(event)=>
    {
    
      
      try {
        const resp=await api.get(`viewsitevisitbyid/${selectedItems}`)
        console.log(resp);
        
        setsitevisit(resp.data.sitevisit)
      } catch (error) {
        console.log(error);
      }
    }

    const[leaddata,setleaddata]=useState([]);
    const fetchleaddata=async()=>
    {
      
      try {
        const resp=await api.get('leadinfo')
        setleaddata(resp.data.lead)
      } catch (error) {
        console.log(error);
      }
    
    }

    

                    const activity=["Call","Email","Meeting","Site Visit"]
                    const reason=["Meeting","Site Visit","Discuss","For Requirment","etc"]
                    const direction=["Incoming","Outgoing"]
                    const visittype=["Site Visit","Home Visit","Online"]
                    const status=["Answered","Missed","Not Pic","Busy","Cut Call","Number Not Reachable","Switch Off","Incoming","Not Available","Number Invalid"]
                    const result=["Interested","Not Interested","Postponed","Low Budget","Location Mismatch"]
                    const location=["Home","Office","Company","Site"]
                    


                    const[dealdata,setdealdata]=useState([])
                    const fetchdealdata=async(event)=>
                        {
                          
                          try {
                            const resp=await api.get('viewdeal')
                            const all=(resp.data.deal)
                            setdealdata(all)
                          } catch (error) {
                            console.log(error);
                          }
                        
                        }

                        useEffect(()=>
                          {
                              fetchdealdata()
                          },[])
                          
                          


                    const [projects, setprojects] = useState([]);
                    const [units, setunits] = useState([]);
                    const [allBlocks, setallBlocks] = useState([]);
                    const [allUnits, setallUnits] = useState([]);

                    const handleprojectchange = (event) => {
                        const {
                          target: { value },
                        } = event;
                      
                        const selectproject = typeof value === 'string' ? value.split(',') : value;
                      
                        setprojects(selectproject);
                        setsitevisit((prev) => {
                          const updatedSiteVisit = { ...prev, project: selectproject };
                          fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
                          return updatedSiteVisit; // Return the updated state
                        });
                      };

                      const fetchdatabyprojectname = async (projectNames) => {

                        try {
                          const fetchPromises = projectNames.map(async (projectName) => {
                            const resp = await api.get(`viewdealbyproject/${projectName}`);
                            return resp.data.deal; // Assuming resp.data.project is an array of units for that project
                          });
                      
                          const results = await Promise.all(fetchPromises);
                          const allFetchedUnits = results.flat();
                          setunits(allFetchedUnits); // Set the units to the flattened result
                        } catch (error) {
                          console.log(error);
                        }
                      };

                      const allproject =[]
    dealdata.map((item) => {
    if (!allproject.includes(item.project)) {
      allproject.push(item.project);
    }
  });

  useEffect(() => {
    if (units.length > 0) {
      // Collect only the unit_number and block from the units array
      const collectedUnits = units.map(item => item.unit_number);
      const collecteblocks = units.map(item => item.block);
  
      // Create a Map to filter out duplicates based on unit_number and get unique unit_numbers
      const uniqueUnits = [
        ...new Map(collectedUnits.map(unit_number => [unit_number, unit_number])).values()
      ];
  
      // Create a Map to filter out duplicates based on block and get unique blocks
      const uniqueblocks = [
        ...new Map(collecteblocks.map(block => [block, block])).values()
      ];
  
      // Set the state with the unique unit_numbers and blocks
      setallUnits(uniqueUnits);
      setallBlocks(uniqueblocks); // Set allBlocks with the unique blocks
    }
  }, [units]);


  const[allblocks,setallblocks]=useState([])
const handleblockchange = (event) => {
    const {
      target: { value },
    } = event;
  
    const selectblock = typeof value === 'string' ? value.split(',') : value;
  
    setallblocks(selectblock);
    setsitevisit((prev) => {
      const updatedSiteVisit = { ...prev, block: selectblock };
    //   fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
      return updatedSiteVisit; // Return the updated state
    });
  };

  const[allunit,setallunit]=useState([])
const handleallunitschange = (event) => {
    const {
      target: { value },
    } = event;
  
    const selectunits = typeof value === 'string' ? value.split(',') : value;
  
     setallunit(selectunits);
    setsitevisit((prev) => {
      const updatedSiteVisit = { ...prev, inventory: selectunits };
    //   fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
      return updatedSiteVisit; // Return the updated state
    });
  };

  const[leadid,setleadid]=useState("")
  const handleLeadChange = (e) => {
      const selectedLead = leaddata.find(item => item._id === e.target.value);
      setleadid(selectedLead._id)
      if (selectedLead) {
          const fullName = `${selectedLead.title} ${selectedLead.first_name} ${selectedLead.last_name}`;
          setsitevisit(prevState => ({
              ...prevState,
              lead: fullName,
              title2: selectedLead.title,
              first_name: selectedLead.first_name,
              last_name: selectedLead.last_name,
              mobile_no: selectedLead.mobile_no,
              email: selectedLead.email,
              stage: selectedLead.stage,
              lead_id:selectedLead._id
          }));
      }

  }

  const[updatestage,setupdatestage]=useState("")
    const[updatestage1,setupdatestage1]=useState("")


  const handleleadstatuschange =  (e) => {
    const newStatus = e.target.value;

    // Update the status first
    setsitevisit((prevState) => {
        return {
            ...prevState,
            status: newStatus
        };
    });

    // Now check if status is "Conducted" and update the stage
    if (newStatus === "Conducted") {
        setupdatestage("Opportunity");
        setupdatestage1("Quote");
    }
    else if (newStatus === "Did Not Visit" || "Not Intersted>") {
        setupdatestage("Prospect");
        setupdatestage1("Open");
    }
};

const [siteprojects, setsiteprojects] = useState([]);
const [siteunits, setsiteunits] = useState([]);

const handlesiteprojectchange = (event) => {
    const {
      target: { value },
    } = event;
  
    const selectproject = typeof value === 'string' ? value.split(',') : value;
  
    setsiteprojects(selectproject);
    setsitevisit((prev) => {
      const updatedSiteVisit = { ...prev, intrested_project: selectproject };
      fetchdatabysiteprojectname(selectproject); // Fetch data with the updated project names
      return updatedSiteVisit; // Return the updated state
    });
  };

  const fetchdatabysiteprojectname = async (projectNames) => {

    try {
      const fetchPromises = projectNames.map(async (projectName) => {
        const resp = await api.get(`viewdealbyproject/${projectName}`);
        return resp.data.deal; // Assuming resp.data.project is an array of units for that project
      });
  
      const results = await Promise.all(fetchPromises);
      const allFetchedUnits = results.flat();
      setsiteunits(allFetchedUnits); // Set the units to the flattened result
    } catch (error) {
      console.log(error);
    }
  };

  const[allblock,setallblock]=useState([])
const handleallblockchange = (event) => {
  const {
    target: { value },
  } = event;

  // Convert value to an array if it's a string (for multiple selection)
  const selectblock = typeof value === 'string' ? value.split(',') : value;

  // Update the allblock state with full block.block-project combinations (for selected blocks)
  setallblock(selectblock);

  // Update the sitevisit state with only block.block values (not both block.block and block.project)
  setsitevisit((prev) => {
    const updatedSiteVisit = { 
      ...prev, 
      intrested_block: selectblock.map(item => item.split('-')[0]) // Store only block.block in sitevisit
    };
    return updatedSiteVisit;
  });
};

const[alldealblocks,setalldealblocks]=useState([])
  useEffect(() => {
    const dealblocks = dealdata.filter((item) =>
      sitevisit.intrested_project.some((project) => project === item.project)
    );
    setalldealblocks(dealblocks)
  }, [sitevisit.intrested_project]);

  const[allunit1,setallunit1]=useState([])
  const handleallunitschange1 = (event) => {
    const { target: { value } } = event;
  
    // Convert value to an array if it's a string (for multiple selection)
    const selectunits = typeof value === 'string' ? value.split(',') : value;
  
    // Extract only the unit_number from the selected values (split by '-')
    const unitNumbers = selectunits.map(item => item.split('-')[0]); // Get only the unit_number part
  
    // Update allunit1 state with the selected unit numbers
    setallunit1(selectunits);
  
    // Update the sitevisit state with selected units in intrested_inventory
    setsitevisit((prev) => {
      const updatedSiteVisit = { ...prev, intrested_inventory: selectunits }; // Store only unit numbers
      return updatedSiteVisit;
    });
  };
  

  const [alldealunits, setalldealunits] = useState([]);

useEffect(() => {
  const dealblocks = dealdata.filter((item) =>
    sitevisit.intrested_project.some((project) => project === item.project) &&
    sitevisit.intrested_block.some((block) => block === item.block) // Add the condition for interested blocks
  );
  setalldealunits(dealblocks);
}, [sitevisit.intrested_project, sitevisit.intrested_block]); // Depend on both interested_project and interested_block


const[contactdata,setcontactdata]=useState([]);
const fetchcontactdata=async(event)=>
{
  
  try {
    const resp=await api.get('viewcontact')
    setcontactdata(resp.data.contact)
  } catch (error) {
    console.log(error);
  }

}

useEffect(()=>
  {
      fetchcontactdata()
  },[])

  const handleToggle3 = (e) => {
    const isChecked = e.target.checked; // Get the checked state
    setsitevisit({ ...sitevisit, complete: isChecked }); // Update the calltask state

    // Open the modal only if the checkbox is checked
    if (isChecked) {
       document.getElementById("sitevisitdetails").style.display="block"
    }
    else{
        document.getElementById("sitevisitdetails").style.display="none"
    }
};


// const updatesite_visit=async()=>
// {
//   try {
//     const resp=await api.put(`updatesitevisittask/${selectedItems}`,sitevisit)
//     if(resp.status===200)
//     {
//       toast.success("Task Completed Successfully",{autoClose:2000})
//     }
//   } catch (error) {
//     console.log(error);
    
//   }
// }




const sitevisitdetails = async () => {
  const title1 = document.getElementById("sitevisittitle").innerText;
const id=selectedItems[0]
console.log(id);

  
  // Update site visit task
  const updatedsiteTask = { ...sitevisit, title: title1 };

  try {
    const data1 = { newstage: updatestage1 };
    const stage = { stage:updatestage };

    if(id)
      {
       const resp1 = await api.put(`updatelead/${sitevisit.lead_id}`,stage );
      }
      
      

    // Loop through each selected project-block-unit combination
    let isValidCombination = true;
    for (let i = 0; i < allunit1.length; i++) {
      const selectedCombination = allunit1[i];
      const [unit_number, block, project] = selectedCombination.split('-');

      // Check if the unit_number, block, and project exist
      if (unit_number && block && project) {
        console.log(`Calling API: updatedealstage/${project}/${block}/${unit_number}`);

        try {
          // Call API for each valid combination
          const resp2 = await api.put(`updatedealstage/${project}/${block}/${unit_number}`, data1);
        } catch (error) {
          // Handle API errors for the individual combination
          toast.error(`API request failed for ${project} - ${block} - ${unit_number}`);
          isValidCombination = false; // Set to false if the combination fails
        }
      } else {
        // If any part is missing, skip the combination
        toast.warn(`Skipping API call for invalid combination: ${selectedCombination}`);
        isValidCombination = false;
      }
    }

    // Post site visit data if the combination is valid
    if (isValidCombination) {
      const resp = await api.put(`updatesitevisittask/${selectedItems}`, updatedsiteTask);

      // If successful, show a success toast and reload
      if (resp.status === 200) {
        toast.success("Task Completed", { autoClose: 2000 });

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } else {
      toast.error("Some project/block/unit combinations were invalid. Please check your data.");
    }

  } catch (error) {
    // Handle any errors during the process
    toast.error("An error occurred. Please check your data and try again.");
  }
};


// ===============================site visit task update with deal update end===========================================================


//============================================ meeting task complete form start=======================================================

const [show4, setshow4] = useState(false);
    
                  const handleClose4 = () => setshow4(false);
                  const handleShow4=async()=>
                  {
                    setshow4(true);
                    fetchmeetingdata()
                    // fetchleaddata()
                  }
                  const [meetingtask,setmeetingtask]=useState({activity_type:"Meeting",title:"",executive:"",lead:"",location_type:"",location_address:"",
                    reason:"",project:[],block:[],inventory:[],remark:"",due_date:"",title2:"",first_name:"",last_name:"",mobile_no:"",email:"",stage:"",
                    complete:"",status:"",meeting_result:"",date:"",feedback:""
                  })

                    const fetchmeetingdata=async(event)=>
                      {
                      
                        
                        try {
                          const resp=await api.get(`viewmeetingtaskbyid/${selectedItems2}`)
                          console.log(resp);
                          
                          setmeetingtask(resp.data.meetingtask)
                        } catch (error) {
                          console.log(error);
                        }
                      }

                    


                    const[leadidmeeting,setleadidmeeting]=useState("")
const [projects2, setprojects2] = useState([]);

const handleprojectchange2 = (event) => {
    const {
      target: { value },
    } = event;
  
    const selectproject = typeof value === 'string' ? value.split(',') : value;
  
    setprojects2(selectproject);
    setmeetingtask((prev) => {
      const updatedSiteVisit = { ...prev, project: selectproject };
      // fetchdatabyprojectname2(selectproject); // Fetch data with the updated project names
      return updatedSiteVisit; // Return the updated state
    });
  };


  const[alldealblocksmeeting,setalldealblocksmeeting]=useState([])
  useEffect(() => {
    const dealblocks = dealdata.filter((item) =>
      meetingtask.project.some((project) => project === item.project)
    );
    setalldealblocksmeeting(dealblocks)
  }, [meetingtask.project]);

  const[allblockmeeting,setallblockmeeting]=useState([])
  const handleallblockchangemeeting = (event) => {
    const {
      target: { value },
    } = event;
  
    // Convert value to an array if it's a string (for multiple selection)
    const selectblock = typeof value === 'string' ? value.split(',') : value;
  
    // Update the allblock state with full block.block-project combinations (for selected blocks)
    setallblockmeeting(selectblock);
  
    // Update the sitevisit state with only block.block values (not both block.block and block.project)
    setmeetingtask((prev) => {
      const updatemeetingtask = { 
        ...prev, 
        block: selectblock // Store only block.block in sitevisit
      };
      return updatemeetingtask;
    });
  };

  const [alldealunitsmeeting, setalldealunitsmeeting] = useState([]);

  useEffect(() => {
    const dealblocks = dealdata.filter((item) =>
      meetingtask.project.some((project) => project === item.project) &&
      meetingtask.block.some((block) => block.split('-')[0] === item.block)// Add the condition for interested blocks
    );
    setalldealunitsmeeting(dealblocks);
  }, [meetingtask.project, meetingtask.block]); // Depend on both interested_project and interested_block
  
  // console.log(alldealunits);
  
  
    const[allunit1meeting,setallunit1meeting]=useState([])
    const handleallunitschange1meeting = (event) => {
      const { target: { value } } = event;
    
      // Convert value to an array if it's a string (for multiple selection)
      const selectunits = typeof value === 'string' ? value.split(',') : value;
    
      // Extract only the unit_number from the selected values (split by '-')
      const unitNumbers = selectunits.map(item => item.split('-')[0]); // Get only the unit_number part
    
      // Update allunit1 state with the selected unit numbers
      setallunit1meeting(selectunits);
    
      // Update the sitevisit state with selected units in intrested_inventory
      setmeetingtask((prev) => {
        const updatemeetingtask = { ...prev, inventory: selectunits }; // Store only unit numbers
        return updatemeetingtask;
      });
    };


    const[updatestagemeeting,setupdatestagemeeting]=useState("")
    const[updatestagemeeting1,setupdatestagemeeting1]=useState("")
    const handlereasonchangemeeting =  (e) => {
        const newreason = e.target.value;
    
        // Update the status first
        setmeetingtask((prevState) => {
            return {
                ...prevState,
                reason: newreason
            };
        });
    
        // Now check if status is "Conducted" and update the stage
        if (newreason === "Negotiation") {
          setupdatestagemeeting("Negotiation");
          setupdatestagemeeting1("Negotiation");
        }
        else if (newreason === "Agreement" || newreason === "Token") {
          setupdatestagemeeting("Booked");
          setupdatestagemeeting1("Booked");
      }
        else if (newreason === "Discuss") {
          setupdatestagemeeting("Prospect & Opurtunity");
          setupdatestagemeeting1("Qoute");
        }
    };

    const handleallunitschange2 = (event) => {
      const {
        target: { value },
      } = event;
    
      const selectunits = typeof value === 'string' ? value.split(',') : value;
    
    
      setmeetingtask((prev) => {
        const updatedSiteVisit = { ...prev, inventory: selectunits };
      //   fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
        return updatedSiteVisit; // Return the updated state
      });
    };

    const[sitevisitdata,setsitevisitdata]=useState([]);
    const fetchsitevisitdataformeeting=async(event)=>
    {
      
      try {
        const resp=await api.get('viewsitevisit')
        const result = resp.data?.sitevisit?.flatMap((item) => item.intrested_inventory) || [];
        setsitevisitdata(result)
      } catch (error) {
        console.log(error);
      }
    
    }

    useEffect(()=>
      {
        fetchsitevisitdataformeeting()
      },[])

    const handleToggle2 = (e) => {
      const isChecked = e.target.checked; // Get the checked state
      setmeetingtask({ ...meetingtask, complete: isChecked }); // Update the calltask state
  
      // Open the modal only if the checkbox is checked
      if (isChecked) {
         document.getElementById("meetingdetails").style.display="block"
      }
      else{
          document.getElementById("meetingdetails").style.display="none"
      }
  };


  const[leaddatameeting,setleaddatameeting]=useState([]);
  const fetchleaddatameeting=async()=>
  {
    
    try {
      const resp=await api.get('leadinfo')
      setleaddatameeting(resp.data.lead)
    } catch (error) {
      console.log(error);
    }
  
  }
  useEffect(()=>
    {
      fetchleaddatameeting()
    },[])

    const[leadupdatestage,setleadupdatestage]=useState("")
    const[dealupdatestage,setdealupdatestage]=useState("")
useEffect(()=>
{
  if(meetingtask.meeting_result==="Deal Done")
  {
    setleadupdatestage("Booked")
    setdealupdatestage("Booking")
  }

},[meetingtask.meeting_result])


    const meetingdetails = async () => {
      const title1 = document.getElementById("meetingtitle").innerText;
    const id=selectedItems2[0]
    console.log(id);
    
      
      // Update site visit task
      const updatemeetingtask = { ...meetingtask, title: title1 };
    
      try {
        const data1 = { newstage: dealupdatestage };
        const stage = { stage:leadupdatestage };
    
        if(id)
          {
           const resp1 = await api.put(`updateleadbystagebyemail/${meetingtask.email}`,stage );
          }
          
          
    
        // Loop through each selected project-block-unit combination
        let isValidCombination = true;
        for (let i = 0; i < meetingtask.inventory.length; i++) {
          const selectedCombination = meetingtask.inventory[i];
          const [unit_number, block, project] = selectedCombination.split('-');
    
          // Check if the unit_number, block, and project exist
          if (unit_number && block && project) {
            console.log(`Calling API: updatedealstage/${project}/${block}/${unit_number}`);
    
            try {
              // Call API for each valid combination
              const resp2 = await api.put(`updatedealstage/${project}/${block}/${unit_number}`, data1);
            } catch (error) {
              // Handle API errors for the individual combination
              toast.error(`API request failed for ${project} - ${block} - ${unit_number}`);
              isValidCombination = false; // Set to false if the combination fails
            }
          } else {
            // If any part is missing, skip the combination
            toast.warn(`Skipping API call for invalid combination: ${selectedCombination}`);
            isValidCombination = false;
          }
        }
    
        // Post site visit data if the combination is valid
        if (isValidCombination) {
          const resp = await api.put(`updatemeetingtask/${selectedItems2}`, updatemeetingtask);
    
          // If successful, show a success toast and reload
          if (resp.status === 200) {
            toast.success("Task Completed", { autoClose: 2000 });
    
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        } else {
          toast.error("Some project/block/unit combinations were invalid. Please check your data.");
        }
    
      } catch (error) {
        // Handle any errors during the process
        toast.error("An error occurred. Please check your data and try again.");
      }
    };




    
// =====================================meeting task complete form end===============================================================


// ================================call task complete form start==================================================================

const [show5, setshow5] = useState(false);
    
                  const handleClose5 = () => setshow5(false);
                  const handleShow5=async()=>
                  {
                    setshow5(true);
                    fetchcalldata()
                    // fetchleaddata()
                  }

                  const [calltask,setcalltask]=useState({activity_type:"",title:"",reason:"",lead:"",executive:"",remarks:"",complete:"",due_date:"",title2:"",
                    first_name:"",last_name:"",mobile_no:[],email:[],stage:"",lead_id:"",direction:"",status:"",date:"",duration:"",
                    result:"",intrested_inventory:"",feedback:""})


                  const fetchcalldata=async(event)=>
                    {
                      try {
                        const resp=await api.get(`viewcalltaskbyid/${selectedItems1}`)
                        setcalltask(resp.data.calltask)
                      } catch (error) {
                        console.log(error);
                      }
                    }

                    const[leaddatacall,setleaddatacall]=useState([]);
                    const fetchleaddatacall=async()=>
                    {
                      
                      try {
                        const resp=await api.get('leadinfo')
                        setleaddatacall(resp.data.lead)
                      } catch (error) {
                        console.log(error);
                      }
                    
                    }
                    useEffect(()=>
                      {
                        fetchleaddatacall()
                      },[])


                    const handleToggle = (e) => {
                      const isChecked = e.target.checked; // Get the checked state
                      setcalltask({ ...calltask, complete: isChecked }); // Update the calltask state
                  
                      // Open the modal only if the checkbox is checked
                      if (isChecked) {
                         document.getElementById("calldetails").style.display="flex"
                      }
                      else{
                          document.getElementById("calldetails").style.display="none"
                      }
                  };

                  const handler1=()=>
                    {
                        document.getElementById("date1").style.color="black"
                    }

                    const calltaskdetails=async()=>
                      {
                      const title1 = document.getElementById("calltitle").innerText;
                      // Update state
                      const updatedCallTask = { ...calltask, title: title1 };
                      
                      try {
                      const resp=await api.put(`updatecalltask/${selectedItems1}`,updatedCallTask)
                      if(resp.status===200)
                      {
                      toast.success(resp.data.message)
                      setTimeout(() => {
                      window.location.reload();
                      }, 2000); // 2000 milliseconds = 2 seconds
          
                      }
                  } catch (error) {
          
                      toast.error(error.message)
                  }
              }
          

// ======================================mail task complete form start=============================================================


const [show6, setshow6] = useState(false);
    
                  const handleClose6 = () => setshow6(false);
                  const handleShow6=async()=>
                  {
                    setshow6(true);
                    fetchmaildata()
                    // fetchleaddata()
                  }

const [mailtask,setmailtask]=useState({activity_type:"Mail",title:"",executive:"",lead:"",project:[],block:[],inventory:[],subject:"",remarks:"",
  complete:"",due_date:"",direction:"",status:"",date:"",feedback:"",title2:"",first_name:"",last_name:"",mobile_no:"",email:"",stage:"",})


  const fetchmaildata=async(event)=>
    {
      try {
        const resp=await api.get(`viewmailtaskbyid/${selectedItems1}`)
        setmailtask(resp.data.mailtask)
      } catch (error) {
        console.log(error);
      }
    }
console.log(mailtask.block);


    const [mailprojects, setmailprojects] = useState([]);
const handlesiteprojectchangemail = (event) => {
  const {
    target: { value },
  } = event;

  const selectproject = typeof value === 'string' ? value.split(',') : value;

  setmailprojects(selectproject);
  setmailtask((prev) => {
    const updatedmail = { ...prev, project: selectproject };
    // fetchdatabysiteprojectname(selectproject); // Fetch data with the updated project names
    return updatedmail; // Return the updated state
  });
};

const[alldealblocksmail,setalldealblocksmail]=useState([])
useEffect(() => {
  const dealblocks = dealdata.filter((item) =>
    mailtask.project.some((project) => project === item.project)
  );
  setalldealblocksmail(dealblocks)
}, [mailtask.project]);

const[allblockmail,setallblockmail]=useState([])
const handleallblockchangemail = (event) => {
  const {
    target: { value },
  } = event;

  // Convert value to an array if it's a string (for multiple selection)
  const selectblock = typeof value === 'string' ? value.split(',') : value;

  // Update the allblock state with full block.block-project combinations (for selected blocks)
  setallblockmail(selectblock);

  // Update the sitevisit state with only block.block values (not both block.block and block.project)
  setmailtask((prev) => {
    const updatemailtask = { 
      ...prev, 
      block: selectblock // Store only block.block in sitevisit
    };
    return updatemailtask;
  });
};



const [alldealunitsmail, setalldealunitsmail] = useState([]);

useEffect(() => {
  const dealblocks = dealdata.filter((item) =>
    mailtask.project.some((project) => project === item.project) &&
    mailtask.block.some((block) => block === item.block) // Add the condition for interested blocks
  );
  setalldealunitsmail(dealblocks);
}, [mailtask.project, mailtask.block]); // Depend on both interested_project and interested_block

// console.log(alldealunits);


  const[allunitmail,setallunitmail]=useState([])
  const handleallunitschangemail = (event) => {
    const { target: { value } } = event;
  
    // Convert value to an array if it's a string (for multiple selection)
    const selectunits = typeof value === 'string' ? value.split(',') : value;
  
    // Extract only the unit_number from the selected values (split by '-')
    const unitNumbers = selectunits.map(item => item.split('-')[0]); // Get only the unit_number part
  
    // Update allunit1 state with the selected unit numbers
    setallunitmail(selectunits);
  
    // Update the sitevisit state with selected units in intrested_inventory
    setmailtask((prev) => {
      const updatemailtask = { ...prev, inventory: selectunits }; // Store only unit numbers
      return updatemailtask;
    });
  };


  const handleToggle1 = (e) => {
    const isChecked = e.target.checked; // Get the checked state
    setmailtask({ ...mailtask, complete: isChecked }); // Update the calltask state

    // Open the modal only if the checkbox is checked
    if (isChecked) {
       document.getElementById("maildetails").style.display="block"
    }
    else{
        document.getElementById("maildetails").style.display="none"
    }
};

const mailtaskdetails=async()=>
  {
   
      const title1 = document.getElementById("mailtitle").innerText;

      // Update state
      const updatedMailTask = { ...mailtask, title: title1 };
      try {
          const resp=await api.post('mailtask',updatedMailTask)
          if(resp.status===200)
          {
              toast.success(resp.data.message)
              setTimeout(() => {
                  window.location.reload();
                }, 2000); // 2000 milliseconds = 2 seconds
              
          }
      } catch (error) {
          
          toast.error(error.message)
      }
    }






  //======================================== mail task complete form end==============================================================



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
            <label className="labels" id="sitevisit1" style={{marginLeft:"30px",cursor:"pointer",width:"100px",textAlign:"center"}} onClick={Sitevisit}>Site Visit </label>
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
      {/* <input type="checkbox" onChange={handleischeckedchange}/>
      <input id="search" type="text" disabled={!ischecked} className="form-control form-control-sm form-control form-control-sm-sm" placeholder="search for tasks calls etc." style={{width:"25%"}} onChange={(e)=>setsearchdata(e.target.value)} onKeyDown={handlekeypress1}/> */}
           <div id="siteaction" style={{position:"absolute",marginLeft:"1%",gap:"20px",display:"none"}}>
     
     <Tooltip title="Delete Task.." arrow>
     <img id="dealdelete" src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" onClick={deleteSelectedItems}   style={{height:"50px",width:"50px",cursor:"pointer",marginTop:"-2px"}} alt=""/>
     </Tooltip>
     
     <Tooltip title="Edit Task.." arrow>
     <img id="dealedit" src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-icon-orange-pencil-0.png"  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",marginLeft:"20px"}} alt=""/>
     </Tooltip>
     
     <Tooltip title="Complete Task.." arrow>
     <img id="completetask"  src="https://static.vecteezy.com/system/resources/previews/019/513/217/non_2x/tasks-the-woman-marks-the-completed-tasks-on-the-tablet-vector.jpg" onClick={handleShow1}   style={{height:"45px",width:"45px",cursor:"pointer",marginTop:"0px",marginLeft:"20px"}} alt=""/>
     </Tooltip>
   
     
     </div>

     <div id="meetingaction" style={{position:"absolute",marginLeft:"1%",gap:"20px",display:"none"}}>
     
     <Tooltip title="Delete Task.." arrow>
     <img id="dealdelete" src="https://png.pngtree.com/png-vector/20220926/ourmid/pngtree-delete-button-3d-icon-png-image_6217492.png" onClick={deleteSelectedItems2}   style={{height:"50px",width:"50px",cursor:"pointer",marginTop:"-2px"}} alt=""/>
     </Tooltip>
     
     <Tooltip title="Edit Task.." arrow>
     <img id="dealedit" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/UniversalEditButton3.svg/1200px-UniversalEditButton3.svg.png"  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",marginLeft:"20px"}} alt=""/>
     </Tooltip>
     
     <Tooltip title="Complete Task.." arrow>
     <img id="completetask"  src="https://cdn-icons-png.flaticon.com/512/1632/1632670.png" onClick={handleShow4}   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",marginLeft:"20px"}} alt=""/>
     </Tooltip>
   
     
     </div>

     <div id="followupaction" style={{position:"absolute",marginLeft:"1%",gap:"20px",display:"none"}}>
     
     <Tooltip title="Delete Task.." arrow>
     <img id="dealdelete" src="https://cdn3d.iconscout.com/3d/premium/thumb/delete-button-3d-icon-download-in-png-blend-fbx-gltf-file-formats--remove-cancel-pack-user-interface-icons-6307914.png?f=webp" onClick={deleteSelectedItems1}   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px"}} alt=""/>
     </Tooltip>
     
     <Tooltip title="Edit Task.." arrow>
     <img id="dealedit" src="https://cdn-icons-png.flaticon.com/512/2098/2098402.png"  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",marginLeft:"20px"}} alt=""/>
     </Tooltip>
     
     <Tooltip title="Complete Call Task.." arrow>
     <img id="completetask"  src="https://www.shareicon.net/data/2015/06/12/53127_task_256x256.png" onClick={handleShow5}   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",marginLeft:"20px"}} alt=""/>
     </Tooltip>
     <Tooltip title="Complete Mail Task.." arrow>
     <img id="completetask"  src="https://www.shareicon.net/data/2015/06/12/53127_task_256x256.png" onClick={handleShow6}   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",marginLeft:"20px"}} alt=""/>
     </Tooltip>
   
     
     </div>
     
      {/* <div style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"70%",position:"absolute"}}> */}
           {/* <Button className="form-control form-control-sm" style={{width:"120px",backgroundColor:"transparent"}}>Play Task</Button> */}
           {/* <label className="labels" style={{width:"350px"}}>Sorted By Due Date</label>
           </div> */}

    
    
      <div id="sitevisitpagination" style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"80%",position:"absolute",display:"none"}}>
   
      
      <label htmlFor="itemsPerPage" style={{fontSize:"16px",fontFamily:"times new roman"}}>Items: </label>
      <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange} style={{fontSize:"16px",fontFamily:"times new roman",height:"30px"}}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    
    {renderPageNumbers2()}
    </div>

    <div id="followuppagination" style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"75%",position:"absolute",display:"none"}}>
   
      
      <label htmlFor="itemsPerPage" style={{fontSize:"16px",fontFamily:"times new roman"}}>Items: </label>
      <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChangefollowup} style={{fontSize:"16px",fontFamily:"times new roman",height:"30px"}}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    
    {renderPageNumbers()}
    </div>

    <div id="meetingpagination" style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"75%",position:"absolute",display:"none"}}>
   
      
   <label htmlFor="itemsPerPage" style={{fontSize:"16px",fontFamily:"times new roman"}}>Items: </label>
   <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChangemeeting} style={{fontSize:"16px",fontFamily:"times new roman",height:"30px"}}>
     <option value="5">5</option>
     <option value="10">10</option>
     <option value="20">20</option>
     <option value="50">50</option>
   </select>
 
 {renderPageNumbers1()}
 </div>
        


       
        
      </div>
     
     {/*================================= this list view is for followup =========================================================*/}


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
            {item.status}
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


{/*====================================followup list view end===================================================================== */}


{/* =========================================list view of site visit============================================================== */}


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
                {
                  Array.isArray(item.project) ? 
                    item.project.map((project, index) => (
                      <div key={index}>{project}</div>  // Replace <div> with the appropriate tag you want
                    )) : 
                    <div>{item.project}</div>  // Render directly if it's not an array
                }

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
                {/* <StyledTableCell>
              <img src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" style={{height:"50px",width:"50px",cursor:"pointer"}}></img>
            </StyledTableCell> */}
            
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


{/*================================== list view of site visit end===================================================================== */}


{/*======================================= meeting list view start================================================================= */}


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
       
    {/*============================================= meeting task list view end====================================================== */}


   
  {/* =================================sitevisit complete task model=========================================================== */}

         <Modal show={show1} onHide={handleClose1} size='lg' style={{transition:"0.5s ease-in"}}>
                  <Modal.Header>
                    <Modal.Title>Complete Site-Visit Task</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>



                  <div className="row" id="sitevisit" >

<div className="col-md-12"><label className="labels">Title</label><p id="sitevisittitle">Site Visit with {sitevisit.lead} For {sitevisit.project.join(',')}, {sitevisit.inventory.join(',')} on {sitevisit.start_date}</p></div>

    <div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,executive:e.target.value})} >
<option>{sitevisit.executive} </option>
<option>---select---</option>
<option>Rajesh</option>
    <option>Suresh</option>
    <option>Vivek</option>
    </select>
    </div>

    <div className="col-md-4"><label className="labels">Select Site Visit Type</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,sitevisit_type:e.target.value})}>
<option>{sitevisit.sitevisit_type} </option>
<option>---select---</option>
   {
    visittype.map(item=>
        (
            <option>{item}</option>
        )
    )
   }
    </select>
    </div>
    <div className="col-md-4"></div>

    <div className="col-md-4"><label className="labels">Select Project</label> 
    <Select className="form-control form-control-sm" style={{border:"none"}}
multiple
value={sitevisit.project}
onChange={handleprojectchange}
renderValue={(selected) => selected.join(', ')}
>
{allproject.map((name) => (
    <MenuItem key={name} value={name}>
        <Checkbox checked={sitevisit.project.indexOf(name) > -1} />
        <ListItemText primary={name} />
    </MenuItem>
))}
</Select>
    </div>
   


    <div className="col-md-4"><label className="labels">Select Block</label>
    <Select className="form-control form-control-sm" style={{border:"none"}}
multiple
value={sitevisit.block}
onChange={handleblockchange}
renderValue={(selected) => selected.join(', ')}
>
{allBlocks.map((block) => (
<MenuItem key={block} value={block}> {/* Ensure unit_no is the value you want */}
    <Checkbox checked={sitevisit.block.indexOf(block) > -1} />
    <ListItemText primary={block} /> {/* Render unit_no or other relevant property */}
</MenuItem>
))}
</Select>
    </div>
    <div className="col-md-4"><label className="labels">Select Inventory</label>
    <Select className="form-control form-control-sm" style={{border:"none"}}
multiple
value={sitevisit.inventory}
onChange={handleallunitschange}
renderValue={(selected) => selected.join(', ')}
>
{allUnits.map((unit) => (
<MenuItem key={unit} value={unit}> {/* Ensure unit_no is the value you want */}
    <Checkbox checked={sitevisit.inventory.indexOf(unit) > -1} />
    <ListItemText primary={unit} /> {/* Render unit_no or other relevant property */}
</MenuItem>
))}
</Select>
    </div>


  
  

     
    <div className="col-md-4"><label className="labels">Select Lead</label>
    <select
    className="form-control form-control-sm"
    required
    onChange={handleLeadChange}>
      <option>{sitevisit.lead}</option>
<option>---Select---</option>
    {
        leaddata.map((item)=>
        (
            <option value={item._id}> {item.title} {item.first_name} {item.last_name}</option>
            
        ))
        
    }
    </select>
    </div>
    <div className="col-md-4"><label className="labels">Confirmation</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,confirmation:e.target.value})}>
    <option>{sitevisit.confirmation}</option>
<option>---Select---</option>
   <option>Confirmed</option>
   <option>Tentative</option>
    </select>
    </div>
    <div className="col-md-4"></div>

    <div className="col-md-10"><label className="labels">Remark</label><textarea className='form-control form-control-sm' value={sitevisit.remark} style={{height:"100px"}} onChange={(e)=>setsitevisit({...sitevisit,remark:e.target.value})} /></div>


    <div className="col-md-4"><label className="labels">Select Participants</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,participants:e.target.value})}>
    <option>{sitevisit.participants}</option>
<option>---Select---</option>
   {
    contactdata.map((item)=>
    (
        <option>{item.title} {item.first_name} {item.last_name} ({item.company_name})</option>
    )) 
   }
    </select>
    </div>
    <div className="col-md-6"></div>

    <div className="col-md-6"><label className="labels">Remind Me?</label> 
<label class="switch">
<input type="checkbox" checked={sitevisit.remind_me} onChange={(e)=>setsitevisit({...sitevisit,remind_me:e.target.checked})}/>
    <span class="slider round"></span>
    </label>
</div>

{
    sitevisit.remind_me && (
        <>
        <div className="col-md-4"></div>
        <div className="col-md-4"><label className="labels">Select Start Date</label><input type="datetime-local" value={sitevisit.start_date} className="form-control form-control-sm" onChange={(e)=>setsitevisit({...sitevisit,start_date:e.target.value})}/></div>
        <div className="col-md-4"><label className="labels">Select End Date</label><input type="datetime-local" value={sitevisit.end_date} className="form-control form-control-sm" onChange={(e)=>setsitevisit({...sitevisit,end_date:e.target.value})}/></div>
        </>
    )
}

<div className="col-md-6"><label className="labels">Mark As Completed?</label> 
<label class="switch">
<input type="checkbox" onChange={handleToggle3}/>
    <span class="slider round"></span>
    </label>
</div>



<div className="p-3 py-5" id="sitevisitdetails" style={{width:"100%",display:"none"}}>
<div className="d-flex justify-content-between align-items-center mb-3">
<h4 className="text-right">Complete Site Visit</h4>
</div><hr></hr>

<div className="row mt-2">

<div className="col-md-4"><label className="labels">Select Status</label><select className="form-control form-control-sm" required="true" onChange={handleleadstatuschange} >
<option>Select</option>
   <option>Conducted</option>
   <option>Did Not Visit</option>
   <option>Not Intersted</option>
    </select>
    </div>
    <div className="col-md-8"></div>
    {
        sitevisit.status==="Conducted" &&(
            <>

            <div className="col-md-4"><label className="labels">Select Intrested Project</label> 
            <Select className="form-control form-control-sm" style={{border:"none"}}
        multiple
        value={siteprojects}
        onChange={handlesiteprojectchange}
        renderValue={(selected) => selected.join(', ')}
    >
        {sitevisit.project.map((name) => (
            <MenuItem key={name} value={name}>
                <Checkbox checked={siteprojects.indexOf(name) > -1} />
                <ListItemText primary={name} />
            </MenuItem>
        ))}
    </Select>
            </div>

            <div className="col-md-4">
<label className="labels">Select Interested Block</label>
<Select
className="form-control form-control-sm"
style={{ border: "none" }}
multiple
value={allblock}  // Value contains the full block.block-project combinations
onChange={handleallblockchange}  // Handle the change when blocks are selected/deselected
renderValue={(selected) => selected.map(item => item.split('-')[0]).join(', ')}  // Display only block.block in the selected value
>
{alldealblocks
.filter((value, index, self) =>
// Ensure unique combinations of block.block and block.project
index === self.findIndex((t) => (
  t.block === value.block && t.project === value.project
))
)
.map((block) => {
// Create a unique identifier by combining block.block and block.project
const uniqueBlockKey = `${block.block}-${block.project}`;

return (
  <MenuItem key={uniqueBlockKey} value={uniqueBlockKey}> {/* Use block.block-project for value */}
    <Checkbox 
      checked={allblock.includes(uniqueBlockKey)}  // Check if the full block.block-project combination is selected
    />
    <ListItemText primary={`${block.block} - ${block.project}`} /> {/* Display block and project */}
  </MenuItem>
);
})
}
</Select>
</div>



            <div className="col-md-4"><label className="labels">Select Intersted Inventory</label>
         
            <Select
className="form-control form-control-sm"
style={{ border: "none" }}
multiple
value={allunit1} // Holds selected units
onChange={handleallunitschange1} // Handle changes for unit selection
renderValue={(selected) => selected.map(item => item.split('-')[0]).join(', ')} // Display only the unit_number part
>
{alldealunits
.filter((value, index, self) =>
// Ensure unique combinations of project, block, and unit
index === self.findIndex((t) => (
t.project === value.project &&
t.block === value.block &&
t.unit_number === value.unit_number // Ensure uniqueness by comparing unit_number
))
)
.map((unit) => {
// Create a unique key for project-block-unit combination
const uniqueKey = `${unit.unit_number}-${unit.block}-${unit.project}`;

return (
<MenuItem key={uniqueKey} value={uniqueKey}> {/* Use project-block-unit combination for value */}
<Checkbox checked={allunit1.includes(uniqueKey)} /> {/* Check if the full combination is selected */}
<ListItemText primary={`${unit.unit_number} - ${unit.block} - ${unit.project}`} /> {/* Display project, block, and unit */}
</MenuItem>
);
})}
</Select>


                </div>
                </>
        )
    }
 



<div className="col-md-4"><label className="labels">Select Date</label><input type="date" className="form-control form-control-sm" onChange={(e)=>setsitevisit({...sitevisit,date:e.target.value})}/></div>
<div className="col-md-8"></div>

<div className="col-md-8"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm'  style={{height:"100px"}}/></div>


</div>
</div>


<div className="col-md-2"></div>


</div>




                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                      Close
                    </Button>
                    <Button variant="secondary" onClick={sitevisitdetails}>
                      Complete Task
                    </Button>
                  </Modal.Footer>
                </Modal>


{/* =============================meeting task complete modal=============================================================== */}


<Modal show={show4} onHide={handleClose4} size='lg' style={{transition:"0.5s ease-in"}}>
                  <Modal.Header>
                    <Modal.Title>Complete Meeting Task</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>



                  <div className="row" id="meeting">

<div className="col-md-12"><label className="labels">Title</label><p id="meetingtitle">MEETING with {meetingtask.lead} For {meetingtask.reason} of {meetingtask.project}, {meetingtask.inventory} on {meetingtask.location_type} @ {meetingtask.due_date}</p></div>
    
    <div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmeetingtask({...meetingtask,executive:e.target.value})}>
<option>{meetingtask.executive}</option>
<option>---Select---</option>
<option>Rajesh</option>
    <option>Suresh</option>
    <option>Vivek</option>
    </select>
    </div>
    
        <div className="col-md-4"><label className="labels">Select Lead</label> <select
        className="form-control form-control-sm"
        required
        onChange={(e) => {
        const selectedLead = leaddatameeting.find(item => item._id === e.target.value);
        if (selectedLead) {
        setleadidmeeting(selectedLead._id)

          const fullName = `${selectedLead.title} ${selectedLead.first_name} ${selectedLead.last_name}`;
          setmeetingtask(prevState => ({
          ...prevState,
          lead: fullName,
          title2: selectedLead.title,
          first_name: selectedLead.first_name,
          last_name: selectedLead.last_name,
          mobile_no:selectedLead.mobile_no,
          email:selectedLead.email,
          stage:selectedLead.stage
          }));
          }
          }}
          >
            <option>{meetingtask.lead}</option>
<option>---Select---</option>
    {
        leaddatameeting.map((item)=>
        (
            <option value={item._id}> {item.title} {item.first_name} {item.last_name}</option>
            
        ))
        
    }
    </select>
    </div>
    <div className="col-md-4"></div>
    
    <div className="col-md-4"><label className="labels">Select Location Type</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmeetingtask({...meetingtask,location_type:e.target.value})}>
<option>{meetingtask.location_type}</option>
<option>---Select---</option>
    {
        location.map(item=>
            (
                <option>{item}</option>
            )
        )
    }
    </select>
    </div>
<div className="col-md-8"></div>

<div className="col-md-8"><label className="labels">Location Address</label><input type="text" required="true" value={meetingtask.location_address} className="form-control form-control-sm" onChange={(e)=>setmeetingtask({...meetingtask,location_address:e.target.value})}/></div>
<div className="col-md-4"></div>


<div className="col-md-4"><label className="labels">Reason</label><select className="form-control form-control-sm" required="true" onChange={handlereasonchangemeeting}>
<option>{meetingtask.reason}</option>
<option>---Select---</option>
    <option>Negotiation</option>
    <option>Discuss</option>
    <option>Agreement</option>
    <option>Token</option>
    </select>
    </div>
<div className="col-md-8"></div>

{
  meetingtask.reason==="Discuss" && (
    <>

  

        <div className="col-md-4">
      <label className="labels">Select Project</label> 
      <Select
      className="form-control form-control-sm"
      style={{ border: "none" }}
      multiple
      value={meetingtask.project}
      onChange={handleprojectchange2}
      renderValue={(selected) => selected.join(', ')}
      >
      {allproject.map((name) => (
      <MenuItem key={name} value={name}>
      <Checkbox checked={meetingtask.project.indexOf(name) > -1} />
      <ListItemText primary={name} />
      </MenuItem>
      ))}
      </Select>
      </div>


<div className="col-md-4">
<label className="labels">Select Block</label>
<Select
className="form-control form-control-sm"
style={{ border: "none" }}
multiple
value={meetingtask.block}  // Value contains the full block.block-project combinations
onChange={handleallblockchangemeeting}  // Handle the change when blocks are selected/deselected
renderValue={(selected) => selected.map(item => item.split('-')[0]).join(', ')}  // Display only block.block in the selected value
>
{alldealblocksmeeting
.filter((value, index, self) =>
// Ensure unique combinations of block.block and block.project
index === self.findIndex((t) => (
  t.block === value.block && t.project === value.project
))
)
.map((block) => {
// Create a unique identifier by combining block.block and block.project
const uniqueBlockKey = `${block.block}-${block.project}`;

return (
  <MenuItem key={uniqueBlockKey} value={uniqueBlockKey}> {/* Use block.block-project for value */}
    <Checkbox 
      checked={meetingtask.block.includes(uniqueBlockKey)}  // Check if the full block.block-project combination is selected
    />
    <ListItemText primary={`${block.block} - ${block.project}`} /> {/* Display block and project */}
  </MenuItem>
);
})
}
</Select>
</div>

<div className="col-md-4"><label className="labels">Select Inventory</label>
         
         <Select
    className="form-control form-control-sm"
    style={{ border: "none" }}
    multiple
    value={meetingtask.inventory} // Holds selected units
    onChange={handleallunitschange1meeting} // Handle changes for unit selection
    renderValue={(selected) => selected.map(item => item.split('-')[0]).join(', ')} // Display only the unit_number part
    >
    {alldealunitsmeeting
    .filter((value, index, self) =>
      // Ensure unique combinations of project, block, and unit
      index === self.findIndex((t) => (
        t.project === value.project &&
        t.block === value.block &&
        t.unit_number === value.unit_number // Ensure uniqueness by comparing unit_number
      ))
    )
    .map((unit) => {
      // Create a unique key for project-block-unit combination
      const uniqueKey = `${unit.unit_number}-${unit.block}-${unit.project}`;

      return (
        <MenuItem key={uniqueKey} value={uniqueKey}> {/* Use project-block-unit combination for value */}
          <Checkbox checked={meetingtask.inventory.includes(uniqueKey)} /> {/* Check if the full combination is selected */}
          <ListItemText primary={`${unit.unit_number} - ${unit.block} - ${unit.project}`} /> {/* Display project, block, and unit */}
        </MenuItem>
      );
    })}
    </Select>


             </div>
        </>

  )
}

{
  meetingtask.reason !=="Discuss" && (

    <div className="col-md-4"><label className="labels">Inventory</label>
    <select className="form-control form-control-sm"
onChange={handleallunitschange2}
>
  <option>{meetingtask.inventory}</option>
<option>---select---</option>
{
sitevisitdata.map((item)=>
(
  <option>{item}</option>
))
}

</select>
    </div>

  )
}



<div className="col-md-10"><label className="labels">Remark</label><textarea className='form-control form-control-sm' value={meetingtask.remark} style={{height:"100px"}} onChange={(e)=>setmeetingtask({...meetingtask,remark:e.target.value})}/></div>
<div className="col-md-2"></div>

<div className="col-md-4"><label className="labels">Select Due Date</label><input type="datetime-local" value={meetingtask.due_date} className="form-control form-control-sm" onChange={(e)=>setmeetingtask({...meetingtask,due_date:e.target.value})}/></div>
<div className="col-md-8"></div>


<div className="col-md-6"><label className="labels">Completed?</label> 
<label class="switch">
<input type="checkbox" onChange={handleToggle2} />
    <span class="slider round"></span>
    </label>
</div>


   




<div className="p-3 py-5" id="meetingdetails" style={{display:"none",width:"100%"}}>
<div className="d-flex justify-content-between align-items-center mb-3">
<h4 className="text-right">Complete Meeting Task</h4>
</div><hr></hr>

<div className="row mt-2">

<div className="col-md-4"><label className="labels">Select Status</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmeetingtask((prevState)=>({...prevState,status:e.target.value}))} >
<option>{meetingtask.status}</option>
<option>---Select---</option>
  <option>Conducted</option>
  <option>Cancelled</option>
  <option> Postponed</option>
    </select>
    </div>

    {
      meetingtask.status==="Conducted" && 
      (
        <div className="col-md-4"><label className="labels">Meeting Result</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmeetingtask((prevState)=>({...prevState,meeting_result:e.target.value}))}>
        <option>{meetingtask.meeting_result}</option>
        <option>---Select---</option>
          <option>Deal Done</option>
          <option>Negotiation Uncomplete</option>
          <option>Deal Not Done</option>
          <option>Site Visit</option>
            </select>
            </div>
      )
     
    }
    {
      meetingtask.meeting_result==="Deal Done" && (
      <div className="col-md-3"><label className="labels" style={{visibility:"none"}}>.</label><button style={{backgroundColor:"greenyellow"}} className="form-control form-control-sm"  onClick={() => window.open('/bookingdetails', '_blank')}> Create Booking</button></div>
      )
    }

<div className="col-md-1"></div>
</div>
<div className="row mt-3">
<div className="col-md-4"><label className="labels">Select Date</label><input type="date" className="form-control form-control-sm" value={meetingtask.date} onChange={(e)=>setmeetingtask((prevState)=>({...prevState,date:e.target.value}))} /></div>

<div className="col-md-8"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm' value={meetingtask.feedback} style={{height:"100px"}} onChange={(e)=>setmeetingtask((prevState)=>({...prevState,feedback:e.target.value}))}/></div>
 </div>

    </div>
    


    </div> 


                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose4}>
                      Close
                    </Button>
                    <Button variant="secondary" onClick={meetingdetails}>
                      Complete Task
                    </Button>
                  </Modal.Footer>
                </Modal>

{/* ====================================call task complete modal================================================================ */}

<Modal show={show5} onHide={handleClose5} size='lg' style={{transition:"0.5s ease-in"}}>
                  <Modal.Header>
                    <Modal.Title>Complete Call Task</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  

                  <div className="row" id="call" style={{padding:"10px"}}>
                        
                        <div className="col-md-12"><label className="labels">Title</label><p id="calltitle">Call {calltask.lead} For Meeting at {calltask.due_date}</p></div>
                        <div className="col-md-4"><label className="labels">Reason</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask({...calltask,reason:e.target.value})}>
                    <option>{calltask.reason}</option>
                    <option>---Select---</option>
                        {
                            reason.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                    <div className="col-md-4"></div>
              
               
                <div className="col-md-4"><label className="labels">Select Lead</label>
                <select
                className="form-control form-control-sm"
                required
                onChange={(e) => {
                const selectedLead = leaddatacall.find(item => item._id === e.target.value);
                if (selectedLead) {
                    const fullName = `${selectedLead.title} ${selectedLead.first_name} ${selectedLead.last_name}`;
                    setcalltask(prevState => ({
                    ...prevState,
                    lead: fullName,
                    title2: selectedLead.title,
                    first_name: selectedLead.first_name,
                    last_name: selectedLead.last_name,
                    mobile_no:selectedLead.mobile_no,
                    email:selectedLead.email,
                    stage:selectedLead.stage
                    }));
                }
                }}
  >
                    <option>{calltask.lead}</option>
                    <option>---Select---</option>
                        {
                            leaddatacall.map((item)=>
                            (
                                <option value={item._id}> {item.title} {item.first_name} {item.last_name}</option>
                                
                            ))
                            
                        }
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask({...calltask,executive:e.target.value})}>
                        <option>{calltask.executive}</option>
                        <option>---Select---</option>
                        <option>Rajesh</option>
                        <option>Suresh</option>
                        <option>Vivek</option>
                        </select>
                        </div>
                    <div className="col-md-4"></div>

                    <div className="col-md-10"><label className="labels">Remark</label><textarea value={calltask.remarks} className='form-control form-control-sm' onChange={(e)=>setcalltask({...calltask,remarks:e.target.value})}/></div>

                  
                    <div className="col-md-2"></div>

                    <div className="col-md-4"><label className="labels">Select Due Date</label><input type="datetime-local" value={calltask.due_date} className="form-control form-control-sm"  onChange={(e)=>setcalltask({...calltask,due_date:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">Completed?</label> 
                    <label class="switch">
                    <input type="checkbox" onChange={handleToggle}/>
                        <span class="slider round"></span>
                        </label>
                    </div>
                  <div className="col-md-2"></div>

                  <div style={{width:"100%"}}>
            <div className="row" id='calldetails' style={{display:"none"}}>
           
        <div className="col-12">
            
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Complete Call Task</h4>
                </div><hr></hr>
                
                <div className="row mt-2">
                    
                    <div className="col-md-4"><label className="labels">Direction</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask((prevState)=>({...calltask,direction:e.target.value}))} >
                    <option>{calltask.direction}</option>
                    <option>---Select---</option>
                        {
                            direction.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Status</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask((prevState)=>({...calltask,status:e.target.value}))}>
                    <option>{calltask.status}</option>
                    <option>---Select---</option>
                        {
                            status.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                    <div className="col-md-4"></div>
                
               
                <div className="col-md-4"><label className="labels">Date</label><input type="datetime-local" id="date1" value={calltask.date} className="form-control form-control-sm" style={{color:"transparent"}} onClick={handler1} onChange={(e)=>setcalltask((prevState)=>({...calltask,date:e.target.value}))}/></div>
                <div className="col-md-4"><label className="labels">Duration</label><input type="time" value={calltask.duration} className="form-control form-control-sm" onChange={(e)=>setcalltask((prevState)=>({...calltask,duration:e.target.value}))}/></div>
                <div className="col-md-4"> </div>

                    <div className="col-md-4"><label className="labels">Result</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask((prevState)=>({...calltask,result:e.target.value}))}>
                    <option>{calltask.result}</option>
                    <option>---Select---</option>
                       {
                        result.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                       }
                       </select>
                        </div>
                        <div className="col-md-4"><label className="labels" style={{width:"120%"}}>Select Intersted Inventory(If any)</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask((prevState)=>({...calltask,intrested_inventory:e.target.value}))}>
                    <option>{calltask.intrested_inventory}</option>
                    <option>---Select---</option>
                        {
                          sitevisitdata.map((item)=>
                          (
                            <option>{item}</option>
                          ))
                        }
                        </select>
                        </div>
                    <div className="col-md-4"></div>

                    <div className="col-md-8"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm' value={calltask.feedback}  style={{height:"100px"}} onChange={(e)=>setcalltask((prevState)=>({...calltask,feedback:e.target.value}))}/></div>
                    <div className="col-md-12"><br></br></div>
                    <div className="col-md-12"><input type="checkbox" style={{height:"15px",width:"15px"}}/><label className="labels" style={{marginLeft:"10px"}}>Sheduled Follow Up</label></div> 
                     
                    {/* <div className="row mt-4"  style={{marginLeft:"70%"}}>
                    <div className="col-md-6"><button className="form-control form-control-sm" >Submit</button></div>
                    <div className="col-md-6"><button className="form-control form-control-sm">Cancel</button></div>
                    </div> */}
                    </div>
                    
        </div>
        </div>
                    
                    {/* <div className="row">
                    <div className="col-md-2" style={{marginLeft:"60%",marginTop:"20px"}}><button className="form-control form-control-sm" onClick={calltaskdetails}>Submit</button></div>
                    <div className="col-md-2" style={{marginTop:"20px"}}><button className="form-control form-control-sm">Cancel</button></div>
                    </div> */}
                    </div>
                    </div>

                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose5}>
                      Close
                    </Button>
                    <Button variant="secondary" onClick={calltaskdetails}>
                      Complete Task
                    </Button>
                  </Modal.Footer>
                </Modal>


{/*========================================== mail task modal========================================================== */}

                <Modal show={show6} onHide={handleClose6} size='lg' style={{transition:"0.5s ease-in"}}>
                  <Modal.Header>
                    <Modal.Title>Complete Mail Task</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>

                  <div className="row" id="email" >

<div className="col-md-12"><label className="labels">Title</label><p id="mailtitle">Mail {mailtask.lead} For Meeting at {mailtask.due_date} for {mailtask.subject} of {mailtask.inventory}</p></div> 

<div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,executive:e.target.value})}>
<option>{mailtask.executive}</option>
<option>---Select---</option>
<option>Rajesh</option>
    <option>Suresh</option>
    <option>Vivek</option>
    </select>
    </div>
<div className="col-md-8"></div>


<div className="col-md-4"><label className="labels">Select Lead</label>     <select
      className="form-control form-control-sm"
      required
      onChange={(e) => {
      const selectedLead = leaddatacall.find(item => item._id === e.target.value);
      if (selectedLead) {
      const fullName = `${selectedLead.title} ${selectedLead.first_name} ${selectedLead.last_name}`;
      setmailtask(prevState => ({
      ...prevState,
      lead: fullName,
      title2: selectedLead.title,
      first_name: selectedLead.first_name,
      last_name: selectedLead.last_name,
      mobile_no:selectedLead.mobile_no,
      email:selectedLead.email,
      stage:selectedLead.stage
      }));
      }
      }}
      >
  <option>{mailtask.lead}</option>
<option>---Select---</option>
    {
        leaddatacall.map((item)=>
        (
            <option value={item._id}> {item.title} {item.first_name} {item.last_name}</option>
            
        ))
        
    }
    </select>
    </div>
    <div className="col-md-8"></div>

    <div className="col-md-4"><label className="labels">Select Project</label> 
            <Select className="form-control form-control-sm" style={{border:"none"}}
        multiple
        value={mailtask.project?mailtask.project:mailprojects}
        onChange={handlesiteprojectchangemail}
        renderValue={(selected) => selected.join(', ')}
    >
        {allproject.map((name) => (
            <MenuItem key={name} value={name}>
                <Checkbox checked={mailtask.project?mailtask.project.indexOf(name) > -1:mailprojects.indexOf(name) > -1} />
                <ListItemText primary={name} />
            </MenuItem>
        ))}
    </Select>
            </div>

            <div className="col-md-4">
          <label className="labels">Select Block</label>
          <Select
          className="form-control form-control-sm"
          style={{ border: "none" }}
          multiple
          value={mailtask.block?mailtask.block:allblockmail}  // Value contains the full block.block-project combinations
          onChange={handleallblockchangemail}  // Handle the change when blocks are selected/deselected
          renderValue={(selected) => selected.map(item => item.split('-')[0]).join(', ')}  // Display only block.block in the selected value
          >
          {alldealblocksmail
          .filter((value, index, self) =>
          // Ensure unique combinations of block.block and block.project
          index === self.findIndex((t) => (
            t.block === value.block && t.project === value.project
          ))
          )
          .map((block) => {
          // Create a unique identifier by combining block.block and block.project
          const uniqueBlockKey = `${block.block}-${block.project}`;

          return (
            <MenuItem key={uniqueBlockKey} value={uniqueBlockKey}> {/* Use block.block-project for value */}
              <Checkbox 
                checked={mailtask.block?mailtask.block.includes(uniqueBlockKey):allblockmail.includes(uniqueBlockKey)}  // Check if the full block.block-project combination is selected
              />
              <ListItemText primary={`${block.block} - ${block.project}`} /> {/* Display block and project */}
            </MenuItem>
          );
          })
          }
          </Select>
          </div>



            <div className="col-md-4"><label className="labels">Select Inventory</label>
         
            <Select
        className="form-control form-control-sm"
        style={{ border: "none" }}
        multiple
        value={mailtask.inventory?mailtask.inventory:allunitmail} // Holds selected units
        onChange={handleallunitschangemail} // Handle changes for unit selection
        renderValue={(selected) => selected.map(item => item.split('-')[0]).join(', ')} // Display only the unit_number part
        >
        {alldealunitsmail
        .filter((value, index, self) =>
        // Ensure unique combinations of project, block, and unit
        index === self.findIndex((t) => (
        t.project === value.project &&
        t.block === value.block &&
        t.unit_number === value.unit_number // Ensure uniqueness by comparing unit_number
        ))
        )
        .map((unit) => {
        // Create a unique key for project-block-unit combination
        const uniqueKey = `${unit.unit_number}-${unit.block}-${unit.project}`;

        return (
        <MenuItem key={uniqueKey} value={uniqueKey}> {/* Use project-block-unit combination for value */}
        <Checkbox checked={mailtask.inventory?mailtask.inventory.includes(uniqueKey):allunitmail.includes(uniqueKey)} /> {/* Check if the full combination is selected */}
        <ListItemText primary={`${unit.unit_number} - ${unit.block} - ${unit.project}`} /> {/* Display project, block, and unit */}
        </MenuItem>
        );
        })}
        </Select>


                </div>

  


<div className="col-md-4"><label className="labels">Subject</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,subject:e.target.value})}>
    <option>{mailtask.subject}</option>
    <option>---Select---</option>
    <option>Payment Reminder</option>
    <option>Agreement Reminder</option>
    <option>Feedback</option>
    <option>Matched inventory update</option>
    <option>Document Required for Submision</option>
    </select>
    </div>

<div className="col-md-10"><label className="labels">Remark</label><textarea className='form-control form-control-sm' value={mailtask.remarks} onChange={(e)=>setmailtask({...mailtask,remarks:e.target.value})}/></div>
    <div className="col-md-2"></div>

<div className="col-md-4"><label className="labels">Select Due Date</label><input type="datetime-local" value={mailtask.due_date} className="form-control form-control-sm" onChange={(e)=>setmailtask({...mailtask,due_date:e.target.value})}/></div>


<div className="col-md-6"><label className="labels">Completed?</label> 
<label class="switch" onChange={handleToggle1}>
<input type="checkbox" />
    <span class="slider round"></span>
    </label>
</div>

<div className="p-3 py-5" id="maildetails" style={{display:"none"}}>
<div className="d-flex justify-content-between align-items-center mb-3">
<h4 className="text-right">Complete Mail Task</h4>
</div><hr></hr>

<div className="row mt-2">

<div className="col-md-4"><label className="labels">Direction</label><select className="form-control form-control-sm" required="true" >
  <option>{mailtask.direction}</option>
  <option>---Select---</option>
    {
        direction.map(item=>
            (
                <option>{item}</option>
            )
        )
    }
    </select>
    </div>
    <div className="col-md-4"><label className="labels">Status</label><select className="form-control form-control-sm" required="true" >
    <option>{mailtask.status}</option>
    <option>---Select---</option>
   <option>Read</option>
   <option>Delivered</option>
   <option>Bounced</option>
   <option>Undelivered</option>
    </select>
    </div>
<div className="col-md-4"></div>
</div>
<div className="row mt-3">
<div className="col-md-4"><label className="labels">Date</label><input type="date" value={mailtask.date} className="form-control form-control-sm" /></div>
<div className="col-md-8"> </div>

<div className="col-md-4"></div>

<div className="col-md-10"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm' value={mailtask.feedback}  style={{height:"100px"}}/></div>
<div className="col-md-12"><br></br></div>
<div className="col-md-12"><input type="checkbox" style={{height:"15px",width:"15px"}}/><label className="labels" style={{marginLeft:"10px"}}>Sheduled Follow Up</label></div> 
 </div>

</div>

<div className="col-md-2" style={{marginLeft:"60%",marginTop:"20px"}}><button className="form-control form-control-sm" onClick={mailtaskdetails}>Submit</button></div>
<div className="col-md-2" style={{marginTop:"20px"}}><button className="form-control form-control-sm">Cancel</button></div>
</div>

                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose6}>
                      Close
                    </Button>
                    <Button variant="secondary" onClick={calltaskdetails}>
                      Complete Task
                    </Button>
                  </Modal.Footer>
                </Modal>





   
          <ToastContainer/>
        </div>
     );
}

export default Tasks;
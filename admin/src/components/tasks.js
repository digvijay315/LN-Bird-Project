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

      const followupcolumns = [
        { id: 'sno', name: '#' },
        { id: 'details', name: 'Details' },
        { id: 'scheduled_date', name: 'Scheduled Date' },
        { id: 'agenda', name: 'Agenda' },
        { id: 'activity_type', name: 'Activity Type' },
        { id: 'scheduled_by', name: 'Scheduled By' },
        { id: 'scheduled_for', name: 'Scheduled For' },
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

 const [contact,setcontact]=useState({title:"",first_name:"",last_name:"",country_code:[],mobile_no:[],mobile_type:[],action1:[],
  email:[],email_type:[],action2:[],tags:"",descriptions:"",source:"",team:"",owner:"",visible_to:"",

  profession_category:"",profession_subcategory:"",designation:"",company_name:"",country_code1:"",company_phone:"",
  company_email:"",area:"",location:"",city:"",pincode:"",state:"",country:"",industry:"",company_social_media:[],company_url:[],action3:[],

  father_husband_name:"",h_no:"",area1:"",location1:"",city1:"",pincode1:"",state1:"",country1:"",gender:"",maritial_status:"",
  birth_date:"",anniversary_date:"",education:[],degree:[],school_college:[],action4:[],loan:[],bank:[],amount:[],action5:[],
  social_media:[],url:[],action6:[],income:[],amount1:[],action7:[],document_no:[],document_name:[],document_pic:[],action8:[]});

       const time=new Date()
    
        const [show1, setshow1] = useState(false);

        const handleClose1 = () => setshow1(false);
        const[data1,setdata1]=useState([])
        const handleShow1=async()=>
        {
          if(selectedItems.length===1)
          {
            try {
              const resp=await api.get(`viewcontactbyname/${selectedItems}`)//here search contact by id
              setshow1(true);
              console.log(resp);
              
              setcontact(resp.data.contact)
              setdata1(resp.data.contact)
            } catch (error) {
              console.log(error);
            }
          }
          else
          {
            toast.error("please select only one")
          }
         
        }
       console.log(data1);
      //  console.log(contact);
       
       
        const basicdetails=()=>
          {
            document.getElementById("basicdetails1").style.display="flex"
            document.getElementById("basicdetails2").style.display="flex"
            document.getElementById("basic").style.color="green"
            document.getElementById("other").style.color="black"
             document.getElementById("professional").style.color="black"
            document.getElementById("otherdetails").style.display="none"
            document.getElementById("profession").style.display="none"
          }
          const professionaldetails=()=>
            {
              document.getElementById("basicdetails1").style.display="none"
              document.getElementById("basicdetails2").style.display="none"
              document.getElementById("otherdetails").style.display="none"
              document.getElementById("profession").style.display="flex"
               document.getElementById("basic").style.color="black"
               document.getElementById("other").style.color="black"
                 document.getElementById("professional").style.color="green"
               
            }
          const otherdetails=()=>
            {
              document.getElementById("basicdetails1").style.display="none"
              document.getElementById("basicdetails2").style.display="none"
               document.getElementById("profession").style.display="none"
                 document.getElementById("otherdetails").style.display="flex"
               document.getElementById("basic").style.color="black"
                document.getElementById("professional").style.color="black"
               document.getElementById("other").style.color="green"
            }

           
            function addFn1() {
              setcontact(prevContact => ({
                ...prevContact,
                country_code: [...prevContact.country_code, ''],
                mobile_no: [...prevContact.mobile_no, ''],
                mobile_type: [...prevContact.mobile_type, ''],
                action1: Array.isArray(prevContact.action1) ? [...prevContact.action1, ''] : ['']
               
              }));
            }
  
            const deleteall1=(index)=>
              {
               
                const newcountry_code = contact.country_code.filter((_, i) => i !== index);
                const newmobile_no = contact.mobile_no.filter((_, i) => i !== index);
                const newmobile_type = contact.mobile_type.filter((_, i) => i !== index);
                const newaction1 = contact.action1.filter((_, i) => i !== index);
                
                setcontact({
                  ...contact,
                  country_code: newcountry_code,
                  mobile_no: newmobile_no,
                  mobile_type: newmobile_type,
                  action1: newaction1
                });
              }
              const handlecountry_codechange = (index, event) => {
                const newcountry_code = [...contact.country_code];
                newcountry_code[index] = event.target.value;
                setcontact((prevProfile)=>({
                  ...prevProfile,
                  country_code: newcountry_code
                }));
              };
              const handlemobile_nochange = (index, event) => {
                const newmobile_no = [...contact.mobile_no];
                newmobile_no[index] = event.target.value;
                setcontact((prevProfile)=>({
                  ...prevProfile,
                  mobile_no:newmobile_no
                }));
              };
              const handlemobile_typechange = (index, event) => {
                const newmobile_type = [...contact.mobile_type];
                newmobile_type[index] = event.target.value;
                setcontact((prevProfile)=>({
                  ...prevProfile,
                  mobile_type: newmobile_type
                }));
              };
  
              function addFn2() {
                setcontact(prevContact => ({
                  ...prevContact,
                  email: [...prevContact.email, ''],
                  email_type: [...prevContact.email_type, ''],
                  action2: Array.isArray(prevContact.action2) ? [...prevContact.action2, ''] : ['']
                 
                }));
              }
    
              const deleteall2=(index)=>
                {
                 
                  const newemail = contact.email.filter((_, i) => i !== index);
                  const newemail_type = contact.email_type.filter((_, i) => i !== index);
                  const newaction2 = contact.action2.filter((_, i) => i !== index);
                  
                  setcontact({
                    ...contact,
                    email: newemail,
                    email_type: newemail_type,
                    action2: newaction2
                  });
                }
                const handleemailchange = (index, event) => {
                  const newemail = [...contact.email];
                  newemail[index] = event.target.value;
                  setcontact((prevProfile)=>({
                    ...prevProfile,
                    email:newemail
                  }));
                };
                const handleemail_typechange = (index, event) => {
                  const newemail_type = [...contact.email_type];
                  newemail_type[index] = event.target.value;
                  setcontact((prevProfile)=>({
                    ...prevProfile,
                    email_type:newemail_type
                  }));
                };
  
                function addFn3() {
       
                  setcontact(prevContact=>({
                    ...prevContact,
                    company_social_media: [...prevContact.company_social_media, ''],
                    company_url: [...prevContact.company_url, ''],
                    action3:Array.isArray(prevContact.action3)? [...prevContact.action3, '']:['']
                  }));
                };
                const deleteall3=(index)=>
                  {
                   
                    const newcomapnysocialmedia = contact.company_social_media.filter((_, i) => i !== index);
                    const newcompanyurl = contact.company_url.filter((_, i) => i !== index);
                    const newaction3=contact.action3.filter((_,i) => i !== index);
                    
                    setcontact({
                      ...contact,
                      company_social_media: newcomapnysocialmedia,
                      company_url: newcompanyurl,
                      action3:newaction3
                    });
                  }
                  const handlecompanysocialmediachange = (index, event) => {
                    const newcomapnysocialmedia = [...contact.company_social_media];
                    newcomapnysocialmedia[index] = event.target.value;
                    setcontact(prevContact=>({
                      ...prevContact,
                      company_social_media: newcomapnysocialmedia
                    }));
                  };
                  const handlecompanyurlchange = (index, event) => {
                    const newcompanyurl = [...contact.company_url];
                    newcompanyurl[index] = event.target.value;
                    setcontact(prevContact=>({
                      ...prevContact,
                      company_url: newcompanyurl
                    }));
                  };
            
                
                  function addFn4() {
       
                    setcontact(prevContact=>({
                      ...prevContact,
                      education: [...prevContact.education, ''],
                      degree: [...prevContact.degree, ''],
                      school_college: [...prevContact.school_college, ''],
                      action4: Array.isArray(prevContact.action4) ? [...prevContact.action4, ''] : ['']
                    }));
                  };
                  const deleteall4=(index)=>
                    {
                     
                      const neweducation = contact.education.filter((_, i) => i !== index);
                      const newdegree = contact.degree.filter((_, i) => i !== index);
                      const newschool_college = contact.school_college.filter((_, i) => i !== index);
                      const newaction4=contact.action4.filter((_,i) => i !== index);
                      
                      setcontact({
                        ...contact,
                        education: neweducation,
                        degree: newdegree,
                        school_college: newschool_college,
                        action4:newaction4
                      });
                    }
                    const handleeducationChange = (index, event) => {
                      const neweducation = [...contact.education];
                      neweducation[index] = event.target.value;
                      setcontact(prevContact=>({
                        ...prevContact,
                        education: neweducation
                      }));
                    };
                    const handledegreeChange = (index, event) => {
                      const newdegree = [...contact.degree];
                      newdegree[index] = event.target.value;
                      setcontact(prevContact=>({
                        ...prevContact,
                        degree: newdegree
                      }));
                    };
              
                    const handleschool_collegeChange = (index, event) => {
                      const newschool = [...contact.school_college];
                      newschool[index] = event.target.value;
                      setcontact(prevContact=>({
                        ...prevContact,
                        school_college: newschool
                      }));
                    };
  
                  function addFn5() {
          
                    setcontact(prevContact=>({
                      ...prevContact,
                      loan: [...prevContact.loan, ''],
                      bank: [...prevContact.bank, ''],
                      amount: [...prevContact.amount, ''],
                      action5: Array.isArray(prevContact.action5) ? [...prevContact.action5, ''] : ['']
                    }));
                  };
                  const deleteall5=(index)=>
                    {
                     
                      const newloan = contact.loan.filter((_, i) => i !== index);
                      const newbank = contact.bank.filter((_, i) => i !== index);
                      const newamount = contact.amount.filter((_, i) => i !== index);
                      const newaction5=contact.action5.filter((_,i) => i !== index);
                      
                      setcontact({
                        ...contact,
                        loan: newloan,
                        bank: newbank,
                        amount: newamount,
                        action5:newaction5
                      });
                    }
                    const handleloanchange = (index, event) => {
                      const newloan = [...contact.loan];
                      newloan[index] = event.target.value;
                      setcontact(prevContact=>({
                        ...prevContact,
                        loan: newloan
                      }));
                    };
                    const handlebankchange = (index, event) => {
                      const newbank = [...contact.bank];
                      newbank[index] = event.target.value;
                      setcontact(prevContact=>({
                        ...prevContact,
                        bank: newbank
                      }));
                    };
                    const handleamountchange = (index, event) => {
                      const newamount = [...contact.amount];
                      newamount[index] = event.target.value;
                      setcontact(prevContact=>({
                        ...prevContact,
                        amount: newamount
                      }));
                    };
  
                    function addFn6() {
          
                      setcontact(prevContact=>({
                        ...prevContact,
                        social_media: [...prevContact.social_media, ''],
                        url: [...prevContact.url, ''],
                        action6: Array.isArray(prevContact.action6) ? [...prevContact.action6, ''] : ['']
                      }));
                    };
                    const deleteall6=(index)=>
                      {
                       
                        const newsocial_media = contact.social_media.filter((_, i) => i !== index);
                        const newurl = contact.url.filter((_, i) => i !== index);
                        const newaction6=contact.action6.filter((_,i) => i !== index);
                        
                        setcontact({
                          ...contact,
                          social_media: newsocial_media,
                          url: newurl,
                          action6:newaction6
                        });
                      }
                      const handlesocial_mediachange = (index, event) => {
                        const newsocial_media = [...contact.social_media];
                        newsocial_media[index] = event.target.value;
                        setcontact(prevContact=>({
                          ...prevContact,
                          social_media: newsocial_media
                        }));
                      };
                      const handleurlChange = (index, event) => {
                        const newurl = [...contact.url];
                        newurl[index] = event.target.value;
                        setcontact(prevContact=>({
                          ...prevContact,
                          url: newurl
                        }));
                      };
  
                      function addFn7() {
          
                        setcontact(prevContact=>({
                          ...prevContact,
                          income: [...prevContact.income, ''],
                          amount1: [...prevContact.amount1, ''],
                          action7: Array.isArray(prevContact.action7) ? [...prevContact.action7, ''] : ['']
                        }));
                      };
                      const deleteall7=(index)=>
                        {
                         
                          const newincome = contact.income.filter((_, i) => i !== index);
                          const newamount1 = contact.amount1.filter((_, i) => i !== index);
                          const newaction7=contact.action7.filter((_,i) => i !== index);
                          
                          setcontact({
                            ...contact,
                            income: newincome,
                            amount1: newamount1,
                            action7:newaction7
                          });
                        }
                        const handleincomechange = (index, event) => {
                          const newincome = [...contact.income];
                          newincome[index] = event.target.value;
                          setcontact(prevContact=>({
                            ...prevContact,
                            income: newincome
                          }));
                        };
                        const handleamount1change = (index, event) => {
                          const newamount1 = [...contact.amount1];
                          newamount1[index] = event.target.value;
                          setcontact(prevContact=>({
                            ...prevContact,
                            amount1: newamount1
                          }));
                        };
  
                        function addFn8() {
          
                          setcontact(prevContact=>({
                            ...prevContact,
                            document_no: [...prevContact.document_no, ''],
                            document_name: [...prevContact.document_name, ''],
                            document_pic: [...prevContact.document_pic, ''],
                            action8: Array.isArray(prevContact.action8) ? [...prevContact.action8, ''] : ['']
                          }));
                        };
                        const deleteall8=(index)=>
                          {
                           
                            const newdocumentno = contact.document_no.filter((_, i) => i !== index);
                            const newdocumentname = contact.document_name.filter((_, i) => i !== index);
                            const newdocumentpic = contact.document_pic.filter((_, i) => i !== index);
                            const newaction8=contact.action8.filter((_,i) => i !== index);
                            
                            setcontact({
                              ...contact,
                              document_no: newdocumentno,
                              document_name: newdocumentname,
                              document_pic: newdocumentpic,
                              action8:newaction8
                            });
                          }
                          const handledocumentnochange = (index, event) => {
                            const newdocumentno = [...contact.document_no];
                            newdocumentno[index] = event.target.value;
                            setcontact(prevContact=>({
                              ...prevContact,
                              document_no: newdocumentno
                            }));
                          };
                          const handledocumentnamechange = (index, event) => {
                            const newdocumentname = [...contact.document_name];
                            newdocumentname[index] = event.target.value;
                            setcontact(prevContact=>({
                              ...prevContact,
                              document_name: newdocumentname
                            }));
                          };
                          const handledocumentpicchange = (index, event) => {
                            const newdocumentpic = [...contact.document_pic];
                            const files = Array.from(event.target.files);
                            newdocumentpic[index] = {files:files}
                            setcontact(prevContact=>({
                              ...prevContact,
                              document_pic: newdocumentpic
                            }));
                          };
                        
                          const config = {
                            headers: {
                              'Content-Type': 'multipart/form-data' // Set the Content-Type here
                            }
                        }
      const updatecontact=async()=>
        {
          try {
            
            const id=data1._id
            const resp=await api.put(`updatecontact/${id}`,contact,config)
            toast.success("contact updated",{ autoClose: 2000 })
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

            <button  className="form-control form-control-sm form-control form-control-sm-sm" style={{width:"150px",marginLeft:"40%"}}>Add Task</button>
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
      <div style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"60%",position:"absolute"}}>
           <Button className="form-control form-control-sm" style={{width:"120px",backgroundColor:"transparent"}}>Play Task</Button>
           <label className="labels" style={{width:"350px"}}>Sorted By Due Date</label>
           </div>
{/*       
      <div id="action" style={{position:"absolute",marginLeft:"1%",gap:"20px"}}>
   
      <Tooltip title="Delete Data.." arrow>
      <img id="delete" src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" onClick={deleteSelectedItems} style={{height:"50px",width:"50px",cursor:"pointer",display:"none",marginTop:"-2px"}} alt=""/>
      </Tooltip>
    
      <Tooltip title="Edit Data.." arrow>
      <img id="edit" src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-icon-orange-pencil-0.png" onClick={handleShow1}  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
      </Tooltip>
     
      <Tooltip title="Send Mail.." arrow>
      <img id="mail" onClick={handleShow3} src="  https://w7.pngwing.com/pngs/7/83/png-transparent-email-computer-icons-internet-graphy-email-miscellaneous-blue-button-icon-thumbnail.png"  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
      </Tooltip>
      <Tooltip title="Send WhatsApp.." arrow>
      <img id="whatsapp"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/479px-WhatsApp_icon.png"  style={{height:"50px",width:"50px",cursor:"pointer",marginTop:"-2px",display:"none",marginLeft:"20px",objectFit:"contain"}}m alt=""/>
      </Tooltip>
      <Tooltip title="Send Message.." arrow>
      <img id="message"  src="https://w7.pngwing.com/pngs/198/585/png-transparent-chatbox-icon-computer-icons-message-sms-icon-message-miscellaneous-grass-online-chat-thumbnail.png"  style={{height:"40px",width:"40px",cursor:"pointer",marginTop:"3px",display:"none",marginLeft:"20px",objectFit:"contain"}} alt=""/>
      </Tooltip>
      </div> */}
    
    
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
        

      {/* <div style={{ position: 'relative', display: 'inline-block',marginLeft:"65%"}}>
              
                {showColumnList && (
                  <div
                    style={{
                      width:"200px",
                      height:"500px",
                      overflow:"scroll",
                     backgroundColor:"gray",
                      position: 'absolute',
                      top: '-40%',
                      left: '-80px',
                      border: '1px solid #ccc',
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                      zIndex: 1000,
                    }}
                  >
                    <ul style={{ listStyleType: 'none', margin: 0, padding: '10px' }}>
                      {allColumns.map((col) => (
                        <li key={col.id} style={{ padding: '5px 0' }}>
                          <input
                            type="checkbox"
                            checked={visibleColumns.some((visibleCol) => visibleCol.id === col.id)}
                            onChange={() => handleCheckboxChange(col)}
                          />{' '}
                          {col.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div> */}
      
       
        
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
              
            </StyledTableCell>
            <StyledTableCell>
              
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
                 
               </StyledTableCell>
               <StyledTableCell 
                 
                 style={{ padding: "10px", fontFamily: "times new roman" }}
               >
                 
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
       
      <Modal show={show1} onHide={handleClose1} size='xl'>
            <Modal.Header>
              <Modal.Title>Update Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
           
            
           
           
           
           <div >
            <div  >
    <div className="row" id='r' >
        <div className="col-md-12 border">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right" style={{cursor:"pointer"}} onClick={()=>window.location.reload()}>Add Contact</h4><input type='checkbox'  style={{marginLeft:"60%",height:"20px",width:"20px"}} /><label style={{paddingTop:"5px"}}>only show required field</label>
                </div><hr></hr>
               
         
             <div style={{display:"flex"}}>
               <div style={{display:"flex",gap:"50px"}}>
               <div  id='basic'><span onClick={basicdetails} style={{cursor:'pointer',fontWeight:"bold"}}>Basic Details   |</span></div>
                <div  id='professional'><span onClick={professionaldetails} style={{cursor:'pointer',fontWeight:"bold"}}>Professional Details |</span></div>
                <div  id='other'><span onClick={otherdetails} style={{cursor:'pointer',fontWeight:"bold"}}>Personal Details |</span></div> 
               </div>
						    <div style={{marginLeft:"200px",width:"31%"}}><input type="text" class="form-control form-control-sm" placeholder={time} value={time} style={{border:"none"}}/></div>
					</div>
                
                
            
 {/*------------------------------------------ basic details start------------------------------------------------------------------------ */}
               
                <div className="row" id='basicdetails1' style={{marginTop:"40px"}}>
                <div className=" col-md-12 d-flex justify-content-between align-items-center experience"><span>Basic Details</span></div>
                <div className='col-md-12'><hr></hr></div>
                    <div className="col-md-2"><label className="labels">Title</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,title:e.target.value}))}>
                              <option>{data1.title}</option>
                              <option>Select</option>
                              <option>Mr.</option>
                              <option>Mrs.</option>
                              <option>Sh.</option>
                              <option>Smt.</option>
                              <option>Dr.</option>
                              <option>Er.</option>
                              <option>Col.</option>
                              <option>Maj.</option>
                        </select>
                        </div>
                    <div className="col-md-5"><label className="labels">Name</label><input type="text" required="true" className="form-control form-control-sm" defaultValue={data1.first_name} onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,first_name:e.target.value}))}/></div>
                    <div className="col-md-5"><label className="labels">Surname</label><input type="text" className="form-control form-control-sm"  defaultValue={data1.last_name} onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,last_name:e.target.value}))}/></div>
                </div>
                <div className="row mt-3" id='basicdetails2'>
                <div className="col-md-4" > <label className="labels">Country</label>
                    {
                      contact.country_code.map((item,index)=>
                      (
                        <select style={{marginTop:"10px"}} required="true" className="form-control form-control-sm" onChange={(event)=>handlecountry_codechange(index,event)} >
                        <option value={item} >{data1.country_code[index]}</option>
                        {
                          countrycode.map((item)=>
                          (
                            <option>{item}</option>
                          ))
                        }
                        </select> 
                      ))
                    }
                    </div>
                    <div className="col-md-4"><label className="labels">Mobile Number</label>
                    {
                       contact.mobile_no.map((item,index)=>
                        (
                          <input type="text" required="true" style={{marginTop:"10px"}} 
                           defaultValue={data1.mobile_no[index]}
                          className="form-control form-control-sm" 
                          onChange={(event)=>handlemobile_nochange(index,event)}/>
                          
                        ))
                    }
                    </div>
                    <div className="col-md-2"><label className="labels">Type</label>
                    {
                       contact.mobile_type.map((item,index)=>
                        (
                         <select className="form-control form-control-sm" style={{marginTop:"10px"}}
                         onChange={(event)=>handlemobile_typechange(index,event)}>
                                  <option>{data1.mobile_type[index]}</option>
                                  <option>Personal</option>
                                  <option>Official</option>
                                  <option>Home</option>
                                  <option>Phone</option>
                        </select>
                          
                        ))
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      Array.isArray(contact.action1)?
                       contact.action1.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall1(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                  
                          
                        )):[]
                    }
                    </div>
                  <div className="col-md-1"><label className="labels" >add</label><button className='form-control form-control-sm' onClick={addFn1}>+</button></div>
                    
                  <div className="col-md-8"><label className="labels">Email-Address</label>
                    {
                        contact.email.map((item,index)=>
                        (
                          <input type="text" style={{marginTop:"10px"}}
                          defaultValue={data1.email[index]}
                          className="form-control form-control-sm" 
                          placeholder="enter email-id"
                          onChange={(event)=>handleemailchange(index,event)}/>
                        ))
                    }
                    </div>
                    
                    <div className="col-md-2"><label className="labels">Type</label>
                    {
                       contact.email_type.map((item,index)=>
                        (
                          <select className="form-control form-control-sm" style={{marginTop:"10px"}} 
                          
                          onChange={(event)=>handleemail_typechange(index,event)}>
                             <option>{data1.email_type[index]}</option>
                                <option>Select Type</option>
                                <option>Personal</option>
                                <option>Official</option>
                                <option>Business</option>
                        </select>
                        ))
                    }
                   </div>
                  
                   <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      Array.isArray(contact.action2)?
                       contact.action2.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall2(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                  
                          
                        )):[]
                    }
                    </div>
                    <div className="col-md-1"><label className="labels" >add</label><button className='form-control form-control-sm' onClick={addFn2}>+</button></div>
                    
                    <div className="col-md-12"><label className="labels">Tags</label><input type="text" className="form-control form-control-sm" defaultValue={data1.tags} onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,tags:e.target.value}))}/></div>
                    
                    <div className="col-md-10"><label className="labels">Descriptions</label><textarea className='form-control form-control-sm'defaultValue={data1.descriptions} onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,descriptions:e.target.value}))}/></div>
                    <div className="col-md-2"></div>

                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                    
                    <div className="col-md-6"><label className="labels">Source</label><select className="form-control form-control-sm"onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,source:e.target.value}))} >
                                    <option>{data1.source}</option><option>Select</option> <option>Friends</option> <option>Relative</option> <option>Website</option>
                                    <option>Walkin</option><option>Magicbricks</option><option>Common Floor </option><option>Housing</option>
                                    <option>99acre</option><option>Olx</option><option>Square Yard </option><option>Real Estate India </option>
                                    <option>Refrence</option><option>Facebook</option><option>Instagram</option><option>Linkdin</option>
                                    <option>Old Client</option><option>Google</option><option>Whatsapp</option>
                             </select>
                        </div>
                        <div className="col-md-6"><label className="labels">Team</label><select className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,team:e.target.value}))} >
                              <option>{data1.team}</option> 
                              <option>Select</option> 
                              <option>Sales</option>
                              <option>Marketing</option>
                              <option> Post Sales</option>
                              <option> Pre Sales</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Owner</label><select className="form-control form-control-sm"onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,owner:e.target.value}))} >
                              <option>{data1.owner}</option>     
                              <option>Select</option>
                              <option>Suraj</option> 
                              <option>Suresh Kumar</option>
                              <option>Ramesh Singh</option>
                              <option>Maanav Sharma</option>
                              <option>Sukram</option>
                        </select></div>
                        <div className="col-md-6"><label className="labels">Visible to</label><select className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,visible_to:e.target.value}))} >
                               <option>{data1.visible_to}</option> 
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                       </div>
                  </div>
             </div> 

   {/*------------------------------------------------------------ basic details end---------------------------------------------------- */}
                  
  {/* -----------------------------------------professional Details start------------------------------------------------------------------- */}

        <div className="col-md-12" id='profession' style={{display:"none",marginTop:"-80px",lineHeight:"30px"}}>
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center experience"><span>Profession Details</span></div><hr></hr>
                <div className="row " >
                    <div className="col-md-5"><label className="labels">Profession Category</label><select className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,profession_category:e.target.value}))}>
                                  <option>{data1.profession_category}</option> 
                                  <option>Select</option>    
                                  <option>Self Employed </option>
                                  <option>Govt. Employee  </option>
                                  <option>House Wife</option>
                                  <option>Business Man</option>
                                  <option>Retired</option>
                                  <option>Student</option>
                        </select>
                    </div>
                    <div className="col-md-7"><label className="labels">Profession Sub-Category</label><select className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,profession_subcategory:e.target.value}))}>
                                <option>{data1.profession_subcategory}</option> 
                                <option>Select</option>
                                <option>Banker</option><option>Broker</option><option>Builder</option><option>Clerk</option>
                                <option>Doctor</option><option>Contractor</option><option>Exporter</option><option>Accountant</option>
                                <option>Advocate</option> <option>Archietect</option> <option>Artist</option> <option>Farmer</option>
                                <option>Chef</option> <option>Teacher</option> <option>Scientist</option> <option>Software Developer</option>
                                <option>Designer</option> <option>Author</option> <option>Nurse</option> <option>Baker</option>
                                <option>Engineer</option> <option>Carpenter</option> <option>Construction</option> <option>Worker</option>
                                <option>Sales Person</option> <option>Pilot</option> <option>Professor</option> <option>Author</option>
                                <option>Clerk</option> <option>Peon</option> <option>Commision</option> <option>Agent(AAdati)</option>
                                <option>Shop Keepar</option>
                        </select>
                    </div>
                    <div className="col-md-5"><label className="labels">Designation</label><select className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,designation:e.target.value}))}>
                        <option>{data1.designation}</option> 
                        <option>Select</option>
                        <option>Developer</option>
                        <option>It Professional</option>
                        <option>Others</option>
                        </select>
                    </div>
                    <div className="col-md-7"><label className="labels">Company/Organisation/Department Name</label><select className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,company_name:e.target.value}))}>
                        <option>{data1.company_name}</option> 
                        <option>Select</option>
                        <option>L.N Bird Technology Pvt. Ltd.</option>
                        <option>T.C.S</option>
                        <option>Others</option>
                        </select>
                    </div>
                    <div className="col-md-4" > <label className="labels">Country Code</label>
                    
                        <select  required="true" className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,country_code1:e.target.value}))}>
                        <option>{data1.country_code1}</option>
                        {
                          countrycode.map((item)=>
                          (
                            <option>{item}</option>
                          ))
                        }
                        </select> 
                    </div>
                    <div className="col-md-6" > <label className="labels">Company Phone</label><input type='text' defaultValue={data1.company_phone} className='form-control form-control-sm' onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,company_phone:e.target.value}))}/></div>
                    <div className="col-md-8" > <label className="labels">Company Email</label><input type='text' defaultValue={data1.company_email} className='form-control form-control-sm' onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,company_email:e.target.value}))}/></div>
                    <div className="col-md-4" ></div>

                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Company Address</label></div>
                    <div className="row" style={{border:"1px solid black",margin:"5px",padding:"10px"}}>
                    <div className="col-md-8"><label className="labels">Area</label><input type="text" defaultValue={data1.area} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,area:e.target.value}))}/></div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4"><label className="labels">Location</label><input type="text" defaultValue={data1.location} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,location:e.target.value}))}/></div>
                    <div className="col-md-4"><label className="labels">City</label><input type="text" defaultValue={data1.city} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,city:e.target.value}))}/></div>
                    <div className="col-md-4"><label className="labels">Pin Code</label><input type="text" defaultValue={data1.pincode} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,pincode:e.target.value}))}/></div>
                    <div className="col-md-6"><label className="labels">State</label><input type="text" defaultValue={data1.state} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,state:e.target.value}))}/></div>
                    <div className="col-md-6"><label className="labels">Country</label><input type="text" defaultValue={data1.country} className="form-control form-control-sm"  onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,country:e.target.value}))}/></div>
                    </div>
                    <div className="col-md-7"><label className="labels">Industry</label><select className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,industry:e.target.value}))}>
                    <option>{data1.industry}</option>
                    <option>choose</option>
                          <optgroup label='Agriculture'>
                                <option>Farming</option><option>horticulture</option><option>forestry</option>
                                <option>fishing</option><option>Others</option>
                          </optgroup>
                          <optgroup label='Mining'>
                                <option>Extraction of minerals</option><option>oil</option><option>gas</option>
                                <option>other natural resources.</option>
                          </optgroup>
                          <optgroup label='Fishing and Hunting'>
                                <option>Commercial fishing</option><option>aquaculture</option><option>others</option>
                          </optgroup>
                          <optgroup label='Forestry'>
                                <option>Logging</option><option>timber production</option><option>others</option>
                          </optgroup>
                          <optgroup label='Manufacturing'>
                                <option>Production of goods from raw materials (e.g., automotive, 
                                  electronics, textiles, food processing)</option>
                          </optgroup>
                          <optgroup label='Construction'>
                                <option>Building infrastructure</option><option>residential and commercial properties</option><option>roads</option>
                                <option>bridges</option><option>others</option>
                          </optgroup>
                          <optgroup label='Utilities'>
                                <option>Production and distribution of electricity</option><option>water</option><option>gas</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Refining'>
                                <option>Processing raw materials like oil</option><option>metals</option><option>into usable products</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Retail'>
                                <option>Selling goods directly to consumers</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Hospitality'>
                                <option>Hotels</option><option>restaurants</option><option>tourism</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Healthcare'>
                                <option>Hospitals</option><option>clinics</option><option>medical services</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Education'>
                                <option>Schools</option><option>colleges</option><option>universities</option>
                                <option>training centers</option><option>others</option>
                          </optgroup>
                          <optgroup label='Finance and Insurance'>
                                <option>Banks</option><option>investment firms</option><option>insurance companies</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Transportation'>
                                <option>Airlines</option><option>railways</option><option>shipping</option>
                                <option>logistics</option><option>others</option>
                          </optgroup>
                          <optgroup label='Telecommunications'>
                                <option>Internet services</option><option>phone companies</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Entertainment'>
                                <option>Film</option><option>television</option><option>music</option>
                                <option>gaming</option><option>sports</option><option>others</option>
                          </optgroup>
                          <optgroup label='Real Estate'>
                                <option>Property sales</option><option>rentals</option><option>management</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Information Technology'>
                                <option>Software development</option><option>data processing</option><option>IT services</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Research and Development'>
                                <option>Innovation</option><option>scientific research</option><option>product development</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Consultancy'>
                                <option>Professional advice in management</option><option>law</option><option>finance</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Media and Communication'>
                                <option>Publishing</option><option>broadcasting</option><option>online media</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Government'>
                                <option>Public administration</option><option>defense</option><option>public services</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Non-Profit Organizations'>
                                <option>NGOs</option><option>charities</option><option>foundations</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Education (Executive)'>
                                <option>High-level educational services</option><option>executive education</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='High-Level Decision-Making'>
                                <option>Top management roles in large organizations</option><option>think tanks</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Green Industry'>
                                <option>Renewable energy</option><option>environmental services</option><option>sustainability</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Biotechnology'>
                                <option>Genetic engineering</option><option>pharmaceuticals</option><option>life sciences</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Creative Industries'>
                                <option>Advertising</option><option>design</option><option>fashion</option><option>arts</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='E-commerce'>
                                <option>Online</option><option>retail</option><option>digital marketplaces</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Aerospace'>
                                <option>Aircraft manufacturing</option><option>space exploration</option><option>satellite services</option>
                                <option>others</option>
                          </optgroup>
                        </select>
                    </div>
                    <div className='col-md-5'></div>
                    <div className="col-md-4"><label className="labels">Company Social-Media Page</label>
                    {
                      contact.company_social_media.map((item,index)=>
                      (
                        <select
                         className='form-control form-control-sm'
                          style={{marginTop:"10px"}}
                          onChange={(event)=>handlecompanysocialmediachange(index,event)}>
                         <option>{data1.company_social_media[index]}</option>
                        <option>select</option>
                        <option>Facebook</option><option>Twitter</option><option>Instagram</option><option>Linkdin</option>
                        </select>

                      ))
                    }
                    </div>
                    <div className="col-md-6"><label className="labels">Url</label>
                    {
                      contact.company_url.map((item,index)=>
                      (
                        <input type="text" className="form-control form-control-sm" style={{marginTop:"10px"}} defaultValue={data1.company_url[index]}
                        onChange={(event)=>handlecompanyurlchange(index,event)}/>
                      ))
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      Array.isArray(contact.action3)?
                      contact.action3.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall3(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      )):[]
                    }
                    </div>
                    <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn3}>+</button></div>
                    <div className='col-md-12'><hr></hr></div> 
              </div>
             </div>
           </div>
 {/* ------------------------------------------------------professional Details end--------------------------------------------------------------  */}

 {/*-------------------------------------------------- personal details start--------------------------------------------------------- */
 
 }
        <div className="col-md-12" id='otherdetails' style={{display:"none",marginTop:"-80px"}}>
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center experience"><span>Personal Details</span></div><hr></hr>
                <div className="row " >

                <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Address Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                    <div className="col-md-12"><label className="labels">Father/Husband name</label><input type="text" className="form-control form-control-sm" defaultValue={data1.father_husband_name} onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,father_husband_name:e.target.value}))}/></div>

                    <div className="col-md-3"><label className="labels">H.No</label><input type="text" defaultValue={data1.h_no} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,h_no:e.target.value}))}/></div>
                    <div className="col-md-9"><label className="labels">Area</label><input type="text" defaultValue={data1.area1} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,area1:e.target.value}))}/></div>

                    <div className="col-md-4"><label className="labels">Location</label><input type="text" defaultValue={data1.location1} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,location1:e.target.value}))}/></div>
                    <div className="col-md-4"><label className="labels">City</label><input type="text" defaultValue={data1.city1} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,city1:e.target.value}))}/></div>
                    <div className="col-md-4"><label className="labels">Pin Code</label><input type="text" defaultValue={data1.pincode1} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,pincode1:e.target.value}))}/></div>

                    <div className="col-md-6"><label className="labels">State</label><input type="text" defaultValue={data1.state1} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,state1:e.target.value}))}/></div>
                    <div className="col-md-6"><label className="labels">Country</label><input type="text" defaultValue={data1.country1} className="form-control form-control-sm"  onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,country1:e.target.value}))}/></div>

                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Other Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                    <div className="col-md-5"><label className="labels">Gender</label><select className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,gender:e.target.value}))}>
                                <option>{data1.gender}</option>
                                <option>Select</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Others</option>
                        </select>
                    </div>
                    <div className="col-md-7"><label className="labels">Maritial Status</label>< select className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,maritial_status:e.target.value}))}>
                            <option>{data1.maritial_status}</option>
                            <option>Select</option>
                            <option>Married</option>
                            <option>Unmarried</option>
                            <option>Single</option>
                        </select>
                    </div>

                    <div className="col-md-5"><label className="labels">Birth Date</label><input type="text" defaultValue={data1.birth_date} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,birth_date:e.target.value}))}/></div>
                    <div className="col-md-7"><label className="labels">Anniversary Date</label><input type="text" defaultValue={data1.anniversary_date} className="form-control form-control-sm" onChange={(e)=>setcontact((prevProfile)=>({...prevProfile,anniversary_date:e.target.value}))}/></div>

                    <div className="col-md-3"> <label className="labels">Education</label>
                        
                             {contact.education.map((name, index) => (
                                <div key={index} style={{marginTop:"10px"}}>
                                  <select className="form-control form-control-sm"
                                    onChange={(event) => handleeducationChange(index, event)}
                                  >
                                    <option>{data1.education[index]}</option>
                                    <option>choose</option>
                                    <option>Kindergaren</option><option>School</option><option>Primery Education</option><option> Secondary Education</option><option>Master</option><option>Commerce</option>
                                    <option>Vocational Education</option>
                                  </select>
                                  
                                </div>
                              ))}
                        </div>
                    <div className="col-md-3"><label className="labels">Degree</label>
                    {contact.degree.map((name, index) => (
                                <div key={index} style={{marginTop:"10px"}}>
                                  <select
                                    className="form-control form-control-sm"
                                    onChange={(event) => handledegreeChange(index, event)}
                                  >
                                    <option>{data1.degree[index]}</option>
                                    <option>choose</option>
                                    <optgroup label='Bachelor’s '>
                                        <option>Bachelor of Arts (BA) </option><option>Bachelor of Science (BS or BSc) </option><option>Bachelor of Fine Arts (BFA)</option><option> Bachelor of Education (BEd) </option>
                                        <option> Bachelor of Business Administration (BBA) </option><option>Bachelor of Engineering (BE or BEng) </option><option>Bachelor of Science in Nursing (BSN)</option>
                                        <option>B.Bachelor of Laws (LLB) </option><option>B.Bachelor of Architecture (BArch)</option><option>Bachelor of Social Work (BSW) </option><option> Bachelor of Music (BM) </option>
                                        <option>Bachelor of Pharmacy (BPharm)</option><option>Bachelor of Technology (BTech) </option>
                                    </optgroup>
                                    <optgroup label='Master’s '>
                                        <option>Master of Arts (MA)</option><option>Master of Science (MS or MSc)</option><option>Master of Business Administration (MBA)</option><option>Master of Fine Arts (MFA)</option>
                                        <option>Master of Engineering (ME or MEng)</option><option>Master of Education (MEd or EdM)</option><option>Master of Public Health (MPH) </option>
                                        <option>Master of Social Work (MSW)</option><option> Master of Laws (LLM)</option><option>Master of Public Administration (MPA)</option><option>Master of Architecture (MArch)</option>
                                        <option>Master of Library Science (MLS or MLIS)</option><option> Master of Music (MM or MMus)</option><option>Master of Philosophy (MPhil)</option>
                                        <option>Master of Arts in Teaching (MAT)</option><option>Master of Theology (MTh or ThM)</option>
                                    </optgroup>
                                    <optgroup label='Doctoral '>
                                        <option>Doctor of Philosophy (PhD)</option><option>Doctor of Medicine (MD)</option><option>Doctor of Education (EdD)</option><option>Doctor of Business Administration (DBA) </option>
                                        <option>Juris Doctor (JD) </option><option>Doctor of Nursing Practice (DNP) </option><option>Doctor of Public Health (DrPH)</option><option>Doctor of Psychology (PsyD)</option>
                                        <option>Doctor of Engineering (EngD or DEng) </option><option> Doctor of Pharmacy (PharmD)</option><option> Doctor of Social Work (DSW) </option><option>Doctor of Theology (ThD) </option>
                                        <option>Doctor of Veterinary Medicine (DVM) </option><option>Doctor of Musical Arts (DMA)</option><option>Doctor of Dental Surgery (DDS) or Doctor of Dental Medicine (DMD) </option>
                                        <option>Doctor of Public Administration (DPA)</option><option>Doctor of Health Administration (DHA) </option>
                                    </optgroup>
                        
                                  </select>
                                  
                                </div>
                              ))}
                    </div>
                    <div className="col-md-4"><label className="labels">School/College/University</label>
                    {contact.school_college.map((name, index) => (
                                <div key={index} style={{marginTop:"10px"}}>
                                  <input
                                    type="text"
                                    className="form-control form-control-sm"
                                    defaultValue={data1.school_college[index]}
                                    onChange={(event) => handleschool_collegeChange(index, event)}
                                  />
                                  
                                </div>
                              ))}                    
                    </div>
                     <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      Array.isArray(contact.action4)?
                      contact.action4.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall4(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      )):[]
                    }
                    </div>
                     <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn4}>+</button></div>
                
                    <div className="col-md-4"><label className="labels">Loan</label>
                    {
                      contact.loan.map((item,index)=>
                      (
                        <select type="text"
                        style={{marginTop:"10px"}}
                        className="form-control form-control-sm" 
                        onChange={(event)=>handleloanchange(index,event)}
                        >
                          <option>{data1.loan[index]}</option> <option>Select</option><option>Home Loan </option><option>Auto Loan</option><option>Personal Loan </option>
                          <option>Education Loan</option> <option>Agriculture Loan </option> <option>Credit Card Loan</option>
                        </select>
                      ))
                    }
                    </div>
                    <div className="col-md-3"><label className="labels">Bank</label>
                    {
                      contact.bank.map((item,index)=>
                      (
                        <select type="text" 
                        style={{marginTop:"10px"}}
                        className="form-control form-control-sm"
                        onChange={(event)=>handlebankchange(index,event)}
                        >
                                <option>{data1.bank[index]}</option><option>Select</option>
                              <option>State Bank of India (SBI) </option><option>Punjab National Bank (PNB)</option><option>Bank of Baroda</option><option>Canara Bank</option>
                              <option>Union Bank of India</option><option>Bank of India (BOI)</option><option>Indian Bank </option><option>Central Bank of India</option>
                              <option>Indian Overseas Bank (IOB)</option><option>UCO Bank</option><option>Bank of Maharashtra</option><option></option>
                              <option>HDFC Bank </option><option>ICICI Bank</option><option>Axis Bank</option><option>Kotak Mahindra Bank </option>
                              <option>IndusInd Bank </option><option>Yes Bank </option><option>IDFC FIRST Bank</option><option>Federal Bank </option>
                              <option>RBL Bank </option><option>South Indian Bank</option><option>Karur Vysya Bank </option><option>Tamilnad Mercantile Bank </option>
                              <option>Bandhan Bank</option><option>Jammu & Kashmir Bank </option><option>DCB Bank </option><option>Citibank </option><option></option>
                              <option>HSBC</option><option>Standard Chartered Bank </option><option>Deutsche Bank </option><option>Barclays Bank</option>
                              <option>Royal Bank of Scotland (RBS) </option><option>Bank of America</option><option>American Express Bank </option><option>UBS</option>
                              <option>Nabard Financial Services Ltd. (NABARD)</option><option></option>
                              <option>The Saraswat Cooperative Bank</option><option>The Mumbai District Central Cooperative Bank</option><option>The Delhi State Cooperative Bank</option>
                              <option>The Karnataka Vikas Grameen Bank</option><option>The Maharashtra State Cooperative Bank </option><option>The Uttar Bihar Gramin Bank</option>
                              <option>The Punjab State Cooperative Bank</option><option>Gramin Bank of Aryavart </option><option></option>
                              <option>Haryana Gramin Bank</option><option>Bangiya Gramin Vikash Bank </option><option>Kaveri Grameena Bank</option>
                              <option>Prathama Bank </option><option>Small Industries Development Bank of India (SIDBI) </option><option></option>
                              <option>Export-Import Bank of India (EXIM Bank) </option><option>National Bank for Agriculture and Rural Development (NABARD) </option><option></option>
                        </select>
                      ))
                   
                    }
                    </div>
                    <div className="col-md-3"><label className="labels">Amount</label>
                    {
                      contact.amount.map((item,index)=>
                      (
                        <input type="text" 
                        defaultValue={data1.amount[index]}
                        style={{marginTop:"10px"}}
                        className="form-control form-control-sm"
                        onCanPlay={(event)=>handleamountchange(index,event)} />
                      ))
                    }
                  </div>
                  <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      Array.isArray(contact.action5)?
                      contact.action5.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall5(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      )):[]
                    }
                    </div>
                    <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn5}>+</button></div>

                    
                    <div className="col-md-4"><label className="labels">Social Media</label>
                    {
                      contact.social_media.map((item,index)=>
                      (
                        <select
                         className='form-control form-control-sm'
                          style={{marginTop:"10px"}}
                          onChange={(event)=>handlesocial_mediachange(index,event)}>
                        
                        <option>{data1.social_media[index]}</option><option>select</option>
                        <option>Facebook</option><option>Twitter</option><option>Instagram</option><option>Linkdin</option><option>Google</option>
                        </select>

                      ))
                    }
                    </div>
                    <div className="col-md-6"><label className="labels">Url</label>
                    {
                      contact.url.map((item,index)=>
                      (
                        <input type="text" className="form-control form-control-sm" style={{marginTop:"10px"}} defaultValue={data1.url[index]}
                        onChange={(event)=>handleurlChange(index,event)}/>
                      ))
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      Array.isArray(contact.action6)?
                      contact.action6.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall6(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      )):[]
                    }
                    </div>
                    <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn6}>+</button></div>

                    <div className="col-md-4"><label className="labels">Income</label>
                    {
                      contact.income.map((item,index)=>
                      (
                        <select
                        className='form-control form-control-sm'
                         style={{marginTop:"10px"}}
                         onChange={(event)=>handleincomechange(index,event)}>
                       
                       <option>{data1.income[index]}</option><option>select</option>
                       <option>Personal Income</option><option>Business Income</option>
                       </select>
                      ))
                    }
                    </div>
                    <div className="col-md-6"><label className="labels">Amount</label>
                    {
                      contact.amount1.map((item,index)=>
                      (
                        <input type="text" defaultValue={data1.amount1[index]}
                        style={{marginTop:"10px"}}
                        className="form-control form-control-sm" 
                        onChange={(event)=>handleamount1change(index,event)}
                        />
                      ))
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      Array.isArray(contact.action7)?
                      contact.action7.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall7(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      )):[]
                    }
                    </div>
                    <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn7}>+</button></div>
                   
                    <div className="col-md-3"><label className="labels">Document No.</label>
                    {
                      contact.document_no.map((item,index)=>
                      (
                        <input type="text" 
                        defaultValue={data1.document_no[index]}
                        style={{marginTop:"10px"}}
                        className="form-control form-control-sm" 
                        onChange={(event)=>handledocumentnochange(index,event)}
                        />
                      ))
                    }
                    </div>
                    <div className="col-md-3"><label className="labels">Document Name</label>
                    {
                      contact.document_name.map((item,index)=>
                      (
                        <select
                        className='form-control form-control-sm'
                         style={{marginTop:"10px"}}
                         onChange={(event)=>handledocumentnamechange(index,event)}>
                       
                       <option>{data1.document_name}</option><option>select</option>
                       <option>Adhar Card </option><option>Pan Card </option><option>Driviing Licence</option><option>Voter Card</option>
                       <option>Ration Card</option><option>Family Id </option><option>Passoport</option><option>Employee Id Card</option>
                       </select>
                      ))
                    }
                    </div>
                    <div className="col-md-4"><label className="labels">Document Picture</label>
                    {
                      contact.document_pic.map((item,index)=>
                      (
                        
                        <input type="file"
                        style={{marginTop:"10px"}}
                        className="form-control form-control-sm" 
                        onChange={(event)=>handledocumentpicchange(index,event)}
                        />
                      ))
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      Array.isArray(contact.action8)?
                      contact.action8.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall8(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      )):[]
                    }
                    </div>
                    <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn8}>+</button></div>
                 <div className='col-md-12'><hr></hr></div> 
                </div>
               
            </div>
        </div>
    </div>
</div>
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

          <Modal show={show3} onHide={handleClose3} size='lg'>
            <Modal.Header>
              <Modal.Title>Send Mail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{width:"100%"}}>
   
  
   <div className="row mt-2">
       <div className="col-md-12"><label className="labels">Email</label><input type="text" required="true" className="form-control form-control-sm" defaultValue={emails} /></div>
       <div className="col-md-12"><label className="labels">Message</label><textarea className="form-control form-control-sm"  placeholder="Enter Your Message" onChange={e => setmessage(prevProfile => ({ ...prevProfile, message: e.target.value }))}/></div>
   </div>
</div>
          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={sendmail}>
                Send
              </Button>
              <Button variant="secondary" onClick={handleClose3}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <ToastContainer/>
        </div>
     );
}

export default Tasks;
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import { toast, ToastContainer } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { utils, writeFile } from "xlsx";
import '../css/hover.css';
import { useRef } from "react";
import api from "../api";
import EmailIcon from '@mui/icons-material/Email';
import { SvgIcon } from "@mui/material";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import { Select, MenuItem, Checkbox, ListItemText } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import ReactQuill from 'react-quill';  // Import ReactQuill

function Leadfetch() {

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

      const navigate=useNavigate();

/*-------------------lead crud operations start---------------------------lead crud operations start------------------------------------lead crud operations start*/
React.useEffect(()=>{fetchdata()},[])
React.useEffect(()=>{fetchdatabystage_incomingcount()},[])  
React.useEffect(()=>{fetchdatabystage_prospectcount()},[]) 
React.useEffect(()=>{fetchdatabystage_Negotiationcount()},[]) 
React.useEffect(()=>{fetchdatabystage_woncount()},[]) 
React.useEffect(()=>{fetchdatabystage_lostcount()},[])
React.useEffect(()=>{fetchdatabystage_opportunitycount()},[])







const[countall,setcountall]=useState('')
  const[data,setdata]=useState([]);
  const fetchdata=async(event)=>
  {
    
    try {
      const resp=await api.get('leadinfo')
      const all=(resp.data.lead)
      setdata(all)
      setcountall(all.length)
    } catch (error) {
      console.log(error);
    }
  
  }
  React.useEffect(()=>{fetchdata()},[])
  React.useEffect(()=>{fetchdatabystage_incomingcount()},[])
 



  //------------------------===================================== search code start==============================---------------------------

  const[searchdata,setsearchdata]=useState()
  const fetchdatabyemail_mobile_tags_company=async(e)=>
    {
      // e.preventDefault()
      try {
        const resp=await api.get(`viewleadbyemail/${searchdata}`);
          const incoming=(Array.isArray(resp.data.lead) ? resp.data.lead : [resp.data.lead]);
          // setdata(incoming)

        const resp1=await api.get(`viewleadbymobile/${searchdata}`);
        const incoming1=(Array.isArray(resp1.data.lead) ? resp1.data.lead : [resp1.data.lead]);
        setdata([...incoming,...incoming1])

        const resp2=await api.get(`viewbyleadtype/${searchdata}`);
        const incoming2=(Array.isArray(resp2.data.lead) ? resp2.data.lead : [resp2.data.lead]);
        setdata([...incoming,...incoming1,...incoming2])
        
        const resp3=await api.get(`viewleadbycompany/${searchdata}`);
        const incoming3=(Array.isArray(resp3.data.lead) ? resp3.data.lead : [resp3.data.lead]);
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
                document.getElementById("search").value=''
            }
        
    }

  //----------------------============================ search code end======================================-----------------------------


  //---------------------============================= all stage incoming,prospect,negotiation and closed(won and lost) code start===============-------------


    const fetchdatabystage_incoming=async()=>
      {
        
        try {
          const resp=await api.get(`viewleadbystage/Incoming`);
          setdata(Array.isArray(resp.data.lead) ? resp.data.lead : [resp.data.lead]);
        } catch (error) {
          console.log(error);
        }
      }
      const[countincoming,setcountincoming]=useState('')
      const fetchdatabystage_incomingcount=async()=>
        {
          
          try {
            const resp=await api.get(`viewleadbystage/Incoming`);
            const incoming=(Array.isArray(resp.data.lead) ? resp.data.lead : [resp.data.lead]);
            setcountincoming(incoming.length);
          } catch (error) {
            console.log(error);
          }
        }
       
      const fetchdatabystage_prospect=async(e)=>
        {
          e.preventDefault()
          try {
            const resp=await api.get(`viewleadbystage/Prospect`);
             setdata(Array.isArray(resp.data.lead) ? resp.data.lead : [resp.data.lead]);
          } catch (error) {
            console.log(error);
          }
        }
        const[countprospect,setcountprospect]=useState('')
        const fetchdatabystage_prospectcount=async()=>
          {
            
            try {
              const resp=await api.get(`viewleadbystage/Prospect`);
              const prospect=(Array.isArray(resp.data.lead) ? resp.data.lead : [resp.data.lead]);
              setcountprospect(prospect.length);
              
            } catch (error) {
              console.log(error);
            }
          }
        
        const fetchdatabystage_Negotiation=async()=>
          {
            
            try {
              const resp=await api.get(`viewleadbystage/Negotiation`);
              setdata(Array.isArray(resp.data.lead) ? resp.data.lead : [resp.data.lead])
            } catch (error) {
              console.log(error);
            }
          }
          const[countnegotiation,setcountnegotiation]=useState('')
          const fetchdatabystage_Negotiationcount=async()=>
            {
              
              try {
                const resp=await api.get(`viewleadbystage/Negotiation`);
                const negotiation=Array.isArray(resp.data.lead) ? resp.data.lead : [resp.data.lead]
                setcountnegotiation(negotiation.length)
              } catch (error) {
                console.log(error);
              }
            }
            const[countwon,setcountwon]=useState('')
            const fetchdatabystage_woncount=async()=>
              {
                
                try {
                  const resp=await api.get(`viewleadbystage/Won`);
                  const Won=Array.isArray(resp.data.lead) ? resp.data.lead : [resp.data.lead]
                  setcountwon(Won.length)
                } catch (error) {
                  console.log(error);
                }
              }
              const[countlost,setcountlost]=useState('')
              const fetchdatabystage_lostcount=async()=>
                {
                  
                  try {
                    const resp=await api.get(`viewleadbystage/Lost`);
                    const Lost=Array.isArray(resp.data.lead) ? resp.data.lead : [resp.data.lead]
                    setcountlost(Lost.length)
                  } catch (error) {
                    console.log(error);
                  }
                }

                const fetchdatabystage_opportunity=async()=>
                  {
                    
                    try {
                      const resp=await api.get(`viewleadbystage/Opportunity`);
                      setdata(Array.isArray(resp.data.lead) ? resp.data.lead : [resp.data.lead]);
                    } catch (error) {
                      console.log(error);
                    }
                  }
                  const[countopportunity,setcountopportunity]=useState('')
                  const fetchdatabystage_opportunitycount=async()=>
                    {
                      
                      try {
                        const resp=await api.get(`viewleadbystage/Opportunity`);
                        const incoming=(Array.isArray(resp.data.lead) ? resp.data.lead : [resp.data.lead]);
                        setcountopportunity(incoming.length);
                      } catch (error) {
                        console.log(error);
                      }
                    }

//=====================----------------------------- all stage code end-----------------------===========================================
      



//===========================------------------------------ delete code start-----------------------========================================
    const deleteSelectedItems = async () => {
      try {
        if(selectedItems.length===0)
        {
          toast.error("please select first",{autoClose:"2000"})
          return
        }
        const resp = selectedItems.map(async (itemId) => {
          await api.delete(`removelead/${itemId}`);
        });
        
        toast.success('Selected items deleted successfully',{autoClose:"2000"})
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    };
 
// ======================----------------------delete code end-------------------------------=================================================
    
  /*-------------------pagination code---------------------------pagination code------------------------------------pagination code*/
 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // User-defined items per page
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
    /*-------------------pagination code end---------------------------pagination code end------------------------------------pagination code end*/
    
    

    const [show2, setshow2] = useState(false);

    const handleClose2 = () => setshow2(false);
    const[data2,setdata2]=useState([])
    const handleShow2=(item)=>
    {
      setshow2(true);
      setdata2(item)
    }
    /*-------------------model and update lead code end---------------------------model and update lead code end------------------------------------model and update lead code end*/



  /*-------------------export to excel---------------------------export to excel------------------------------------export to excel*/
    const exportToExcel = () => {
      const filteredData = data.map(({ first_name, last_name,mobile_no,email,source,refrencer_no,team,owner,stage,lead_type,campaign }) => ({ first_name, last_name,mobile_no,email,source,refrencer_no,team,owner,stage,lead_type,campaign}));
      // Create a new workbook
      const workbook = utils.book_new();
  
      // Convert data to a worksheet
      const worksheet = utils.json_to_sheet(filteredData);
  
      // Append the worksheet to the workbook
      utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
      // Export the workbook to an Excel file
      writeFile(workbook, "table_data.xlsx");
    };

    //-----------------------------=============================== export to excel end=====================--------------------------------------

    //--------------------------====================== row style coloumn style and all columns code start===========================-------------------

    const allColumns = [
      { id: 'sno', name: '#' },
      { id: 'score', name: 'Score' },
      { id: 'personaldetails', name: 'Personal Details' },
      { id: 'requirment', name: 'Requirment' },
      { id: 'budget', name: 'Budget' },
      { id: 'location', name: 'Location' },
      { id: 'matcheddeal', name: 'Matched Deal' },
      { id: 'stage', name: 'Status' },
      { id: 'source', name: 'Source' },
      { id: 'owner', name: 'OwnerShip' },
      { id: 'activity', name: 'Activity' },
      { id: 'lastcommunication', name: 'Last Activity' },
      { id: 'descriptions', name: 'Remarks' },
      { id: 'createdAt', name: 'Add On' },

      { id: 'mobile_type', name: 'Mobile Type' },
      { id: 'email_type', name: 'Email Type' },
      { id: 'tags', name: 'Tags' },
      { id: 'descriptions', name: 'Descriptions' },
      { id: 'stage', name: 'Stage' },
      { id: 'lead_type', name: 'Lead Type' },
      { id: 'owner', name: 'Owner' },
      { id: 'team', name: 'Team' },
      { id: 'visible_to', name: 'Visible To' },
      { id: 'campegin', name: 'Campegin' },
     
      { id: 'sub_source', name: 'Sub_Source' },
      { id: 'refrencer_no', name: 'Refrencer_No' },
      { id: 'intrested_project', name: 'Intrested Project' },
   
      { id: 'property_type', name: 'Property Type ' },
      { id: 'purpose', name: 'Purpose' },
      { id: 'nri', name: 'Nri ' },
      { id: 'sub_type', name: 'Sub Type ' },
      { id: 'unit_type', name: 'Unit Type ' },
      { id: 'budget_min', name: 'Budget Min ' },
      { id: 'budget_max', name: 'Budget Max ' },
      { id: 'minimum_area', name: 'Minimum Area ' },
      { id: 'maximum_area', name: 'Maximum Area ' },
      { id: 'area_metric', name: 'Area Metric ' },
      { id: 'search_location', name: 'Search Location ' },
      { id: 'street_address', name: 'Street Address ' },
      { id: 'city2', name: 'City' },
      { id: 'area2', name: 'Area' },
      { id: 'block', name: 'Block' },
      { id: 'pincode2', name: 'Pincode ' },
      { id: 'country2', name: 'Country ' },
      { id: 'state2', name:   'State ' },
      { id: 'lattitude', name: 'Lattitude ' },
      { id: 'longitude', name: 'Longitude ' },
      { id: 'specific_unit', name: 'Specific Unit ' },
      { id: 'specific_unitdetails', name: 'Specific Unit Details ' },
      { id: 'funding', name: 'Funding ' },
      { id: 'timeline', name: 'Timeline ' },
      { id: 'facing', name: 'Facing ' },
      { id: 'road', name: 'Road ' },
      { id: 'transaction_type', name: 'Transaction Type ' },
      { id: 'furnishing', name: 'Furnishing ' },
      { id: 'profession_category', name: 'Profession Category ' },
      { id: 'profession_subcategory', name: 'Profession Subcategory ' },
      { id: 'designation', name: 'Designation ' },
      { id: 'company_name', name: 'Company Name ' },
      { id: 'country_code1', name: 'Country Code ' },
      { id: 'company_phone', name: 'Company Phone ' },
      { id: 'company_email', name: 'Company Email ' },
      { id: 'area', name: 'Area ' },
      { id: 'location', name: 'Location ' },
      { id: 'city', name: 'City ' },
      { id: 'pincode', name: 'Pincode ' },
      { id: 'state', name: 'State ' },
      { id: 'country', name: 'Country ' },
      { id: 'industry', name: 'Industry ' },
      { id: 'company_social_media', name: 'Company Social Media ' },
      { id: 'company_url', name: 'Company Url ' },
      { id: 'father_husband_name', name: 'Father/Hhusband Nname ' },
      { id: 'h_no', name: 'H No ' },
      { id: 'area1', name: 'Area ' },
      { id: 'location1', name: 'Location ' },
      { id: 'city1', name: 'City ' },
      { id: 'pincode1', name: 'Pincode' },
      { id: 'state1', name: 'State ' },
      { id: 'country1', name: 'Country ' },
      { id: 'gender', name: 'Gender ' },
      { id: 'maritial_status', name: 'Maritial Status ' },
      { id: 'birth_date', name: 'Birth Date ' },
      { id: 'anniversary_date', name: 'Anniversary Date ' },
      { id: 'education', name: 'Education ' },
      { id: 'degree', name: 'Degree ' },
      { id: 'school_college', name: 'Cchool/College ' },
      { id: 'loan', name: 'Loan ' },
      { id: 'bank', name: 'Bank ' },
      { id: 'amount', name: 'Amount ' },
      { id: 'social_media', name: 'Social Media ' },
      { id: 'url', name: 'Url ' },
      { id: 'income', name: 'Income ' },
      { id: 'amount1', name: 'Amount ' },
      { id: 'document_no', name: 'Document No ' },
      { id: 'document_name', name: 'Document Name ' },
      { id: 'document_pic', name: 'Document Pic ' },
    ];
    const [selectedItems, setSelectedItems] = useState([]); // To track selected rows
    const [selectAll, setSelectAll] = useState(false); // To track the state of the "Select All" checkbox
    const [visibleColumns, setVisibleColumns] = useState(allColumns.slice(1, 14));
    const [showColumnList, setShowColumnList] = useState(false);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        lineHeight:"15px"
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

    //---------------======================================== style row columns and all columns end===============================----------------


    // =================================------------------sorting data  start------------------------------======================================

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

    // -----------------==========================================sorting data end-------------------------====================================


  // ---------------------------==================select and select all code start=====================------------------------------------

    const handleSelectAll = () => {
      document.getElementById("delete").style.display="inline-block"
      document.getElementById("search").style.display="none"
      document.getElementById("edit").style.display="none"
      // document.getElementById("mail").style.display="inline-block"
      //  document.getElementById("whatsapp").style.display="inline-block"
      //  document.getElementById("message").style.display="inline-block"
       document.getElementById("sendall").style.display="inline-block"
      setSelectAll(!selectAll);
      if (!selectAll) {
        // Add all current page item IDs to selectedItems
        setSelectedItems(currentItems.map((item) => item._id));
      } else {
        // Deselect all
        setSelectedItems([]);
        document.getElementById("delete").style.display="none"
        document.getElementById("search").style.display="flex"
        document.getElementById("edit").style.display="none"
        // document.getElementById("mail").style.display="none"
        //  document.getElementById("whatsapp").style.display="none"
        //  document.getElementById("message").style.display="none"
         document.getElementById("sendall").style.display="none"
      }
    };
  
    const handleRowSelect = (id) => {
      document.getElementById("delete").style.display="none"
      document.getElementById("edit").style.display="none"
      // document.getElementById("mail").style.display="none"
      // document.getElementById("whatsapp").style.display="none"
      // document.getElementById("message").style.display="none"
      document.getElementById("sendall").style.display="none"
      document.getElementById("addtask").style.display="none"
      document.getElementById("transferlead").style.display="none"
      document.getElementById("adduser").style.display="none"
      document.getElementById("removeuser").style.display="none"
      document.getElementById("call").style.display="none"
      document.getElementById("addtag").style.display="none"
      document.getElementById("addremarks").style.display="none"
      document.getElementById("adddocument").style.display="none"
      document.getElementById("updatestage").style.display="none"
      document.getElementById("search").style.display="flex"
      if (selectedItems.includes(id)) {
        setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
      } else {
        setSelectedItems([...selectedItems, id]);
        document.getElementById("delete").style.display="inline-block"
        document.getElementById("edit").style.display="inline-block"
        // document.getElementById("mail").style.display="inline-block"
        // document.getElementById("whatsapp").style.display="inline-block"
        // document.getElementById("message").style.display="inline-block" 
        document.getElementById("sendall").style.display="inline-block"
        document.getElementById("addtask").style.display="inline-block"
        document.getElementById("transferlead").style.display="inline-block"
        document.getElementById("adduser").style.display="inline-block"
        document.getElementById("removeuser").style.display="inline-block"
        document.getElementById("call").style.display="inline-block"
        document.getElementById("addtag").style.display="inline-block"
        document.getElementById("addremarks").style.display="inline-block"
        document.getElementById("adddocument").style.display="inline-block"
        document.getElementById("updatestage").style.display="inline-block"
        document.getElementById("search").style.display="none"
      }
    };

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

  //===========================------------------------------ update lead start=====================================---------------------------------
   
    const [leadinfo,setleadinfo]=useState({title:"",first_name:"",last_name:"",country_code:"",mobile_no:"",mobile_type:"",
      email:"",email_type:"",tags:"",descriptions:"",stage:"",lead_type:"",owner:"",team:"",visible_to:"",campegin:"",source:"",
      sub_source:"",refrencer_no:"",intrested_project:"",
      requirment:"",property_type:"",purpose:"",nri:"",sub_type:"",unit_type:"",budget_min:"",budget_max:"",minimum_area:"",
      maximum_area:"",area_metric:"",search_location:"",street_address:"",city2:"",area2:"",block:"",pincode2:"",country2:"",state2:"",
      lattitude:"",longitude:"",specific_unit:"",specific_unitdetails:"",funding:"",timeline:"",facing:"",road:"",transaction_type:"",
      furnishing:"",
      profession_category:"",profession_subcategory:"",designation:"",company_name:"",country_code1:"",company_phone:"",
      company_email:"",area:"",location:"",city:"",pincode:"",state:"",country:"",industry:"",company_social_media:[],company_url:[],action3:[],

      father_husband_name:"",h_no:"",area1:"",location1:"",city1:"",pincode1:"",state1:"",country1:"",gender:"",maritial_status:"",
      birth_date:"",anniversary_date:"",education:[],degree:[],school_college:[],action4:[],loan:[],bank:[],amount:[],action5:[],
      social_media:[],url:[],action6:[],income:[],amount1:[],action7:[],document_no:[],document_name:[],document_pic:[],action8:[]
     })
     const requirment=["Buy","Rent","Lease"];
                        const property_type=["Residential","Commercial","Agricultural","Industrial","Institutional"];
                     
                        const transaction_type=["Full White","Collecter Rate","50% White","75% White"];
                        const furnishing=["Furnished","Unfurnished","Semi Furnished"];
                        const funding=["Home Loan","Self Funding","Loan Against Property","Personal Loan","Business Loan"]
                        const timeline=["Urgent","More then 1 month","Not Confirmed","Within 15 days"]


                        const [show1, setshow1] = useState(false);

                        const handleClose1 = () => setshow1(false);
                        const[data1,setdata1]=useState([])
                        const handleShow1=async()=>
                        {
                          if(selectedItems.length===1)
                          {
                            try {
                              const resp=await api.get(`viewbyid/${selectedItems}`)//here search contact by id
                              //  console.log(resp);
                              
                              setshow1(true);
                             
                              
                                setdata1(resp.data.lead[0])
                              
                              setleadinfo(resp.data.lead[0])
                              
                            } catch (error) {
                              console.log(error);
                            }
                          }
                          else
                          {
                            toast.error("please select only one")
                          }
                         
                        }
                        
                    
                        
                        
     function addFn3() {
     
      setleadinfo((prevlead)=>({
        ...prevlead,
        company_social_media: [...prevlead.company_social_media, ''],
        company_url: [...prevlead.company_url, ''],
        action3: Array.isArray(prevlead.action3) ? [...prevlead.action3, ''] : ['']
      }));
    };
    const deleteall3=(index)=>
      {
       
        const newcomapnysocialmedia = leadinfo.company_social_media.filter((_, i) => i !== index);
        const newcompanyurl = leadinfo.company_url.filter((_, i) => i !== index);
        const newaction3=leadinfo.action3.filter((_,i) => i !== index);
        
        setleadinfo({
          ...leadinfo,
          company_social_media: newcomapnysocialmedia,
          company_url: newcompanyurl,
          action3:newaction3
        });
      }
      const handlecompanysocialmediachange = (index, event) => {
        const newcomapnysocialmedia = [...leadinfo.company_social_media];
        newcomapnysocialmedia[index] = event.target.value;
        setleadinfo((prevProfile)=>({
          ...prevProfile,
          company_social_media: newcomapnysocialmedia
        }));
      };
      const handlecompanyurlchange = (index, event) => {
        const newcompanyurl = [...leadinfo.company_url];
        newcompanyurl[index] = event.target.value;
        setleadinfo((prevProfile)=>({
          ...prevProfile,
          company_url: newcompanyurl
        }));
      };
      function addFn4() {

          setleadinfo((prevlead)=>({
            ...prevlead,
            education: [...leadinfo.education, ''],
            degree: [...leadinfo.degree, ''],
            school_college: [...leadinfo.school_college, ''],
            action4: Array.isArray(prevlead.action4) ? [...prevlead.action4, ''] : ['']
          }));
        };
        const deleteall4=(index)=>
          {
           
            const neweducation = leadinfo.education.filter((_, i) => i !== index);
            const newdegree = leadinfo.degree.filter((_, i) => i !== index);
            const newschool_college = leadinfo.school_college.filter((_, i) => i !== index);
            const newaction4=leadinfo.action4.filter((_,i) => i !== index);
            
            setleadinfo({
              ...leadinfo,
              education: neweducation,
              degree: newdegree,
              school_college: newschool_college,
              action4:newaction4
            });
          }
          const handleeducationChange = (index, event) => {
            const neweducation = [...leadinfo.education];
            neweducation[index] = event.target.value;
            setleadinfo((prevProfile)=>({
              ...prevProfile,
              education: neweducation
            }));
          };
          const handledegreeChange = (index, event) => {
            const newdegree = [...leadinfo.degree];
            newdegree[index] = event.target.value;
            setleadinfo((prevProfile)=>({
              ...prevProfile,
              degree: newdegree
            }));
          };
    
          const handleschool_collegeChange = (index, event) => {
            const newschool = [...leadinfo.school_college];
            newschool[index] = event.target.value;
            setleadinfo((prevProfile)=>({
              ...prevProfile,
              school_college: newschool
            }));
          };

        function addFn5() {

          setleadinfo((prevlead)=>({
            ...prevlead,
            loan: [...prevlead.loan, ''],
            bank: [...prevlead.bank, ''],
            amount: [...prevlead.amount, ''],
            action5: Array.isArray(prevlead.action5) ? [...prevlead.action5, ''] : ['']
          }));
        };
        const deleteall5=(index)=>
          {
           
            const newloan = leadinfo.loan.filter((_, i) => i !== index);
            const newbank = leadinfo.bank.filter((_, i) => i !== index);
            const newamount = leadinfo.amount.filter((_, i) => i !== index);
            const newaction5=leadinfo.action5.filter((_,i) => i !== index);
            
            setleadinfo({
              ...leadinfo,
              loan: newloan,
              bank: newbank,
              amount: newamount,
              action5:newaction5
            });
          }
          const handleloanchange = (index, event) => {
            const newloan = [...leadinfo.loan];
            newloan[index] = event.target.value;
            setleadinfo((prevProfile)=>({
              ...prevProfile,
              loan: newloan
            }));
          };
          const handlebankchange = (index, event) => {
            const newbank = [...leadinfo.bank];
            newbank[index] = event.target.value;
            setleadinfo((prevProfile)=>({
              ...prevProfile,
              bank: newbank
            }));
          };
          const handleamountchange = (index, event) => {
            const newamount = [...leadinfo.amount];
            newamount[index] = event.target.value;
            setleadinfo((prevProfile)=>({
              ...prevProfile,
              amount: newamount
            }));
          };

          function addFn6() {

            setleadinfo((prevlead)=>({
              ...prevlead,
              social_media: [...prevlead.social_media, ''],
              url: [...prevlead.url, ''],
              action6: Array.isArray(prevlead.action6) ? [...prevlead.action6, ''] : ['']
            }));
          };
          const deleteall6=(index)=>
            {
             
              const newsocial_media = leadinfo.social_media.filter((_, i) => i !== index);
              const newurl = leadinfo.url.filter((_, i) => i !== index);
              const newaction6=leadinfo.action6.filter((_,i) => i !== index);
              
              setleadinfo({
                ...leadinfo,
                social_media: newsocial_media,
                url: newurl,
                action6:newaction6
              });
            }
            const handlesocial_mediachange = (index, event) => {
              const newsocial_media = [...leadinfo.social_media];
              newsocial_media[index] = event.target.value;
              setleadinfo((prevProfile)=>({
                ...prevProfile,
                social_media: newsocial_media
              }));
            };
            const handleurlChange = (index, event) => {
              const newurl = [...leadinfo.url];
              newurl[index] = event.target.value;
              setleadinfo((prevProfile)=>({
                ...prevProfile,
                url: newurl
              }));
            };

            function addFn7() {

              setleadinfo((prevlead)=>({
                ...prevlead,
                income: [...prevlead.income, ''],
                amount1: [...prevlead.amount1, ''],
                action7: Array.isArray(prevlead.action7) ? [...prevlead.action7, ''] : ['']
              }));
            };
            const deleteall7=(index)=>
              {
               
                const newincome = leadinfo.income.filter((_, i) => i !== index);
                const newamount1 = leadinfo.amount1.filter((_, i) => i !== index);
                const newaction7=leadinfo.action7.filter((_,i) => i !== index);
                
                setleadinfo({
                  ...leadinfo,
                  income: newincome,
                  amount1: newamount1,
                  action7:newaction7
                });
              }
              const handleincomechange = (index, event) => {
                const newincome = [...leadinfo.income];
                newincome[index] = event.target.value;
                setleadinfo((prevProfile)=>({
                  ...prevProfile,
                  income: newincome
                }));
              };
              const handleamount1change = (index, event) => {
                const newamount1 = [...leadinfo.amount1];
                newamount1[index] = event.target.value;
                setleadinfo((prevProfile)=>({
                  ...prevProfile,
                  amount1: newamount1
                }));
              };

              function addFn8() {

                setleadinfo((prevlead)=>({
                  ...prevlead,
                  document_no: [...prevlead.document_no, ''],
                  document_name: [...prevlead.document_name, ''],
                  document_pic: [...prevlead.document_pic, ''],
                  action8: Array.isArray(prevlead.action8) ? [...prevlead.action8, ''] : ['']
                }));
              };
              const deleteall8=(index)=>
                {
                 
                  const newdocumentno = leadinfo.document_no.filter((_, i) => i !== index);
                  const newdocumentname = leadinfo.document_name.filter((_, i) => i !== index);
                  const newdocumentpic = leadinfo.document_pic.filter((_, i) => i !== index);
                  const newaction8=leadinfo.action8.filter((_,i) => i !== index);
                  
                  setleadinfo({
                    ...leadinfo,
                    document_no: newdocumentno,
                    document_name: newdocumentname,
                    document_pic: newdocumentpic,
                    action8:newaction8
                  });
                }
                const handledocumentnochange = (index, event) => {
                  const newdocumentno = [...leadinfo.document_no];
                  newdocumentno[index] = event.target.value;
                  setleadinfo((prevProfile)=>({
                    ...prevProfile,
                    document_no: newdocumentno
                  }));
                };
                const handledocumentnamechange = (index, event) => {
                  const newdocumentname = [...leadinfo.document_name];
                  newdocumentname[index] = event.target.value;
                  setleadinfo((prevProfile)=>({
                    ...prevProfile,
                    document_name: newdocumentname
                  }));
                };
                const handledocumentpicchange = (index, event) => {
                  const newdocumentpic = [...leadinfo.document_pic];
                  const files = Array.from(event.target.files);
                  newdocumentpic[index] = {files:files}
                  setleadinfo((prevProfile)=>({
                    ...prevProfile,
                    document_pic: newdocumentpic
                  }));
                };

                const leadinfobasic=()=>
                  {
                      document.getElementById("leadinfobasic1").style.display="flex";
                      document.getElementById("leadinfobasic2").style.display="flex";
                      document.getElementById("span1").style.color="green";
          
                      document.getElementById("leadinforequirment").style.display="none";
                      document.getElementById("span2").style.color="black";
          
                      document.getElementById("leadinfoprofessional").style.display="none";
                      document.getElementById("span3").style.color="black";
          
                      document.getElementById("leadinfopersonal").style.display="none";
                      document.getElementById("span3").style.color="black";
                   
                  }
                  const leadinforequirment=()=>
                      {
                          document.getElementById("leadinfobasic1").style.display="none";
                          document.getElementById("leadinfobasic2").style.display="none";
                          document.getElementById("span1").style.color="black";
              
                          document.getElementById("leadinforequirment").style.display="flex";
                          document.getElementById("span2").style.color="green";
              
                          document.getElementById("leadinfoprofessional").style.display="none";
                          document.getElementById("span3").style.color="black";
              
                          document.getElementById("leadinfopersonal").style.display="none";
                          document.getElementById("span3").style.color="black";
                       
                      }
                      const leadinfoprofessionaldetails=()=>
                          {
                              document.getElementById("leadinfobasic1").style.display="none";
                              document.getElementById("leadinfobasic2").style.display="none";
                              document.getElementById("span1").style.color="black";
                  
                              document.getElementById("leadinforequirment").style.display="none";
                              document.getElementById("span2").style.color="black";
          
                              document.getElementById("leadinfoprofessional").style.display="flex";
                              document.getElementById("span3").style.color="green";
          
                              document.getElementById("leadinfopersonal").style.display="none";
                              document.getElementById("span4").style.color="black";
                           
                          }  
                        const leadinfopersonaldetails=()=>
                              {
                                  document.getElementById("leadinfobasic1").style.display="none";
                                  document.getElementById("leadinfobasic2").style.display="none";
                                  document.getElementById("span1").style.color="black";
                      
                                  document.getElementById("leadinforequirment").style.display="none";
                                  document.getElementById("span2").style.color="black";
                      
                                  document.getElementById("leadinfoprofessional").style.display="none";
                                  document.getElementById("span3").style.color="black";
                      
                                  document.getElementById("leadinfopersonal").style.display="flex";
                                  document.getElementById("span4").style.color="green";
                               
                              }
                              const config = {
                                headers: {
                                  'Content-Type': 'multipart/form-data' // Set the Content-Type here
                                }
                            }
          const updatelead=async()=>
            {
              try {
                
                const id=data1._id
                const resp=await api.put(`updatelead/${id}`,leadinfo,config)
                toast.success("lead updated",{ autoClose: 2000 })
                setTimeout(() => {
                  navigate('/leaddetails')
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

// =====================---------------------------------lead update end------------------------------------=======================================
          
  //---------------------------============================== send mail start============================--------------------------------------- 

          const[emails,setemails]=useState([])
            const [show3, setshow3] = useState(false);
          
            const handleClose3 = () => setshow3(false);
            // const handleShow3=async()=>
            // {
            //   setshow3(true);
            //   selectedItems.map(async(item)=>
            //         {
            //           const resp1=await api.get(`viewbyid/${item}`)// here search contact by id not name
            //           const emaildata=(resp1.data.lead[0].email)
            //           setemails((prevProfile)=>([...prevProfile,emaildata]))
            //         })
            // }

            const sendmailfunction=()=>
            {
              document.getElementById("sendmail").style.display="flex"
              document.getElementById("sendmessage").style.display="none"
              document.getElementById("sendwhatsapp").style.display="none"

              document.getElementById("sendmessage1").style.color="black"
              document.getElementById("sendmessage1").style.backgroundColor="white"
              document.getElementById("sendwhatsapp1").style.color="black"
              document.getElementById("sendwhatsapp1").style.backgroundColor="white"

              document.getElementById("sendmail1").style.backgroundColor="black"
              document.getElementById("sendmail1").style.color="white"
              document.getElementById("sendmail1").style.borderRadius="50px"
              document.getElementById("sendmail1").style.width="100px"
              document.getElementById("sendmail1").style.textAlign="center"
            }
            const sendmessagefunction=()=>
              {
                document.getElementById("sendmail").style.display="none"
                document.getElementById("sendmessage").style.display="flex"
                document.getElementById("sendwhatsapp").style.display="none"
  
                document.getElementById("sendmail1").style.color="black"
                document.getElementById("sendmail1").style.backgroundColor="white"
                document.getElementById("sendwhatsapp1").style.color="black"
                document.getElementById("sendwhatsapp1").style.backgroundColor="white"
  
                document.getElementById("sendmessage1").style.backgroundColor="black"
                document.getElementById("sendmessage1").style.color="white"
                document.getElementById("sendmessage1").style.borderRadius="50px"
                document.getElementById("sendmessage1").style.width="150px"
                document.getElementById("sendmessage1").style.textAlign="center"
              }

              const sendwhatsappfunction=()=>
                {
                  document.getElementById("sendmail").style.display="none"
                  document.getElementById("sendmessage").style.display="none"
                  document.getElementById("sendwhatsapp").style.display="flex"
    
                  document.getElementById("sendmail1").style.color="black"
                  document.getElementById("sendmail1").style.backgroundColor="white"
                  document.getElementById("sendmessage1").style.color="black"
                  document.getElementById("sendmessage1").style.backgroundColor="white"
    
                  document.getElementById("sendwhatsapp1").style.backgroundColor="black"
                  document.getElementById("sendwhatsapp1").style.color="white"
                  document.getElementById("sendwhatsapp1").style.borderRadius="50px"
                  document.getElementById("sendwhatsapp1").style.width="150px"
                  document.getElementById("sendwhatsapp1").style.textAlign="center"
                }



            const handleShow3 = async () => {
              setshow3(true);
          
              const currentDateTime = new Date().toISOString(); // Get the current date and time
          
              const updatedData = await Promise.all(
                selectedItems.map(async (item) => {
                  const resp1 = await api.get(`viewbyid/${item}`); // Use ID to search contact
                  const emailData = resp1.data.lead[0].email;
        
                  await api.put(`updatelead/${item}`, {
                    lastcommunication: currentDateTime,
                  });
          
                  // Add the email to the emails array
                  setemails((prevEmails) => [...prevEmails, emailData]);
          
                  // Update the lastcommunication field for each item in the data
                  return {
                    ...data.find((lead) => lead._id === item),
                    lastcommunication: currentDateTime,
                  };
                })
              );
          
              // Update the data state with the new lastcommunication values
              setdata((prevData) =>
                prevData.map((lead) =>
                  updatedData.find((updatedlead) => updatedlead._id === lead._id) ||
                  lead
                )
              );
            };

            const templates = {
              template1: "Hello, \n\nI hope this email finds you well. I wanted to follow up on our previous conversation regarding property. Please let me know if you have any questions.\n\nBest regards,\nDigvijay Kumar",
              template2: "Hi there, \n\nI just wanted to remind you about the upcoming event on [date]. It will be held at Noida. Please feel free to reach out if you need any additional information.\n\nSincerely,\nDigvijay Kumar",
              template3: `Dear sir, \n\nWe are excited to inform you that your application has been approved. Please find attached the documents with further details about the next steps.\n\nBest regards,\nDigvijay Kumar`
            };
            const[message,setmessage]=useState("")
            const[subject,setsubject]=useState("")
            const [selectedTemplate, setSelectedTemplate] = useState('');
            const [attachments, setAttachments] = useState([]);

            const modules1 = {
              toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['bold', 'italic', 'underline'],
                ['link'],
                // [{ 'align': [] }],
                [{ 'color': [] }, { 'background': [] }],
                // ['clean']  // Allows the user to clear formatting
              ],
            };
            const handlemailmessage=(value)=>
              {
                setmessage(value)
              }

            const { getRootProps, getInputProps } = useDropzone({
              onDrop: (acceptedFiles) => {
                setAttachments(acceptedFiles); // Store selected files
              },
            });

            const handleTemplateSelect = (e) => {
              const templateKey = e.target.value; // Get selected template key
              setSelectedTemplate(templateKey); // Set the selected template
              const selectedTemplateContent = templates[templateKey] || ''; // Get the template content
          
              // Convert '\n' to '<br>' for HTML email formatting
              const htmlFormattedMessage = selectedTemplateContent.replace(/\n/g, '<br>');
              
              // Set the message state with the formatted message (HTML-friendly)
              setmessage(htmlFormattedMessage); 
            };
            
            const sendmail=async(e)=>
              {
                e.preventDefault();
                const formData = new FormData();
    
    // Add the subject, message, and recipient email to form data
                    formData.append('subject', subject);
                    formData.append('message', message);
                    formData.append('emails', emails);
                    
                    // Append the files to form data
                    attachments.forEach((file) => {
                      formData.append('attachments', file);
                    });
                try {
                  
                  const resp=await api.post(`contact/sendmail`,formData)
                  if(resp.status===200)
                  {
                    toast.success("Mail Sent Successfully",{ autoClose: 2000 })
                    setTimeout(() => {
                      navigate('/leaddetails')
                    }, 2000);
                    setTimeout(() => {
                      setshow3(false)
                    }, 2000);
                  }
                 
                } catch (error) {
                  toast.error(error.response.data,{ autoClose: 2000 });
                }
              }


              const formatRelativeDate = (date) => {
                const now = new Date();
                const communicationDate = new Date(date);
                const differenceInTime = now - communicationDate;
                const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));
              
                if (differenceInDays === 0) return 'Today';
                if (differenceInDays === 1) return '1 day ago';
                return `${differenceInDays} days ago`;
              };

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
  // -------------------------------------===========================send email end========================================-----------------------
  
  const[leaddata,setleaddata]=useState([]);

  const [show4, setshow4] = useState(false);

  const handleClose4 = () => setshow4(false);
  const handleShow4=async()=>
    {
      { 
        setshow4(true);
        try {
          const resp=await api.get(`viewbyid/${selectedItems}`)
          setleaddata(resp.data.lead[0])
          setOwners1(resp.data.lead[0].owner);
        } catch (error) {
          console.log(error);
        }
      }
    }


    const[updatestage,setupdatestage]=useState(leaddata.stage)

const updatestageoflead = async () => {
  try {
    const id = selectedItems;  // Assuming selectedItems is the ID of the lead to update
    const data = { stage: updatestage,owner:leadowner,descriptions:note };  // Send only the stage field in the request body

    const resp = await api.put(`updatelead/${id}`, data);  // Send the request with only stage in the body

    toast.success("Lead Updated Successfully...", { autoClose: 2000 });

    // After success, navigate to the lead details page or reload
    setTimeout(() => {
      navigate('/leaddetails');
    }, 2000);
    setTimeout(() => {
      window.location.reload();  // If necessary, reload the page
    }, 2000);
  } catch (error) {
    console.log(error);
  }
};


const [owners1, setOwners1] = useState([]);
const [show5, setshow5] = useState(false);

const handleClose5 = () => setshow5(false);
const handleShow5=async()=>
  { 
    setshow5(true);
    try {
      const resp=await api.get(`viewbyid/${selectedItems}`)
      setleaddata(resp.data.lead[0])
      setOwners1(resp.data.lead[0].owner);
    } catch (error) {
      console.log(error);
    }
  }

const ownersList = [
  'Suraj',
  'Suresh Kumar',
  'Ramesh Singh',
  'Maanav Sharma',
  'Sukram'
];

const [owners, setOwners] = useState([]);
const[leadowner,setleadowner]=useState(leaddata.owner)

const handleOwnerChange = (event) => {
  const {
      target: { value },
  } = event;

  const selectedOwners = typeof value === 'string' ? value.split(',') : value;

  setOwners(selectedOwners);
  setleadowner(selectedOwners);
};

const handleOwnerChange1 = (event) => {
  const {
      target: { value },
  } = event;

  const selectedOwners = typeof value === 'string' ? value.split(',') : value;

  setOwners(selectedOwners);
  setleadinfo({ ...leadinfo, owner: selectedOwners });
};

const[note,setnote]=useState(leaddata.descriptions)


const [show6, setshow6] = useState(false);

const handleClose6 = () => setshow6(false);

   const handleShow6=async()=>
    { 
      setshow6(true);
      try {
        const resp=await api.get(`viewbyid/${selectedItems}`)
        setleaddata(resp.data.lead[0])
        setOwners1(resp.data.lead[0].owner);
      } catch (error) {
        console.log(error);
      }
    }
  

   

    const [show7, setshow7] = useState(false);

    const[leaddocument,setleaddocument]=useState({document_no:[''],document_name:[''],document_pic:[''],action81:[]})

    function addFn81() {
                  
      setleaddocument({
        ...leaddocument,
        document_no: [...leaddocument.document_no, ''],
        document_name: [...leaddocument.document_name, ''],
        document_pic: [...leaddocument.document_pic, ''],
        action81: [...leaddocument.action81, '']
      });
    };
    const deleteall81=(index)=>
      {
       
        const newdocumentno = leaddocument.document_no.filter((_, i) => i !== index);
        const newdocumentname = leaddocument.document_name.filter((_, i) => i !== index);
        const newdocumentpic = leaddocument.document_pic.filter((_, i) => i !== index);
        const newaction8=leaddocument.action81.filter((_,i) => i !== index);
        
        setleaddocument({
          ...leaddocument,
          document_no: newdocumentno,
          document_name: newdocumentname,
          document_pic: newdocumentpic,
          action81:newaction8
        });
      }
      const handledocumentnochange1 = (index, event) => {
        const newdocumentno = [...leaddocument.document_no];
        newdocumentno[index] = event.target.value;
        setleaddocument({
          ...leaddocument,
          document_no: newdocumentno
        });
      };
      const handledocumentnamechange1 = (index, event) => {
        const newdocumentname = [...leaddocument.document_name];
        newdocumentname[index] = event.target.value;
        setleaddocument({
          ...leaddocument,
          document_name: newdocumentname
        });
      };
      const handledocumentpicchange1 = (index, event) => {
        const newdocumentpic = [...leaddocument.document_pic];
        const files = Array.from(event.target.files);
        newdocumentpic[index] = {files:files}
        setleaddocument({
          ...leaddocument,
          document_pic: newdocumentpic
        });
      };


const handleClose7 = () => setshow7(false);
const handleShow7=async()=>
  { 
    setshow7(true);
    try {
      const resp=await api.get(`viewbyid/${selectedItems}`)
      setleaddata(resp.data.lead[0])
      setOwners1(resp.data.lead[0].owner);
    } catch (error) {
      console.log(error);
    }
  }

  const updatedocumentoflead = async () => {
    try {
      const id = selectedItems;  // Assuming selectedItems is the ID of the lead to update

      // const formData = new FormData();
  
      // // Manually append all contact data (excluding files)
      // for (let key in leaddocument) {
      //   if (key !== 'document_pic') { // Skip document_pic here
      //     if (Array.isArray(leaddocument[key])) {
      //       leaddocument[key].forEach((value) => {
      //         formData.append(key, value);
      //       });
      //     } else if (leaddocument[key]) {
      //       formData.append(key, leaddocument[key]);
      //     }
      //   }
      // }
  
      // // Append document_pic (files) to FormData if it exists
      // if (leaddocument.document_pic && leaddocument.document_pic.length > 0) {
      //   leaddocument.document_pic.forEach((file) => {
      //     formData.append('document_pic', file); // Add file(s) to FormData
      //   });
      // }
      
      const resp = await api.put(`adddocumentinlead/${id}`, leaddocument, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure proper content-type for form-data
        },
      });
  
      toast.success("Lead Updated Successfully...", { autoClose: 2000 });
  
      // After success, navigate to the lead details page or reload
      setTimeout(() => {
        navigate('/leaddetails');
      }, 2000);
      setTimeout(() => {
        window.location.reload();  // If necessary, reload the page
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  
   
  const matchdeal=["What'sApp","Message","Mail"];

const [matchdeals, setmatcheddeals] = useState([]);

const handlematcheddealChange = (event) => {
  const {
    target: { value },
  } = event;

  // If "Select All" is clicked
  if (value.includes('select-all')) {
    // If all options are already selected, deselect them (uncheck all)
    if (matchdeals.length === matchdeal.length) {
      setmatcheddeals([]); // Deselect all options
      setleadinfo({ ...leadinfo, matched_deal: [] }); // Update matched_deal in leadinfo
    } else {
      // Otherwise, select all options
      setmatcheddeals(matchdeal); // Select all options
      setleadinfo({ ...leadinfo, matched_deal: matchdeal }); // Update matched_deal in leadinfo
    }
  } else {
    // If individual items are selected/deselected
    const selectedmatcheddeal = typeof value === 'string' ? value.split(',') : value;
    setmatcheddeals(selectedmatcheddeal); // Update selected deals
    setleadinfo({ ...leadinfo, matched_deal: selectedmatcheddeal }); // Update matched_deal with selected options
  }
};


const [progress, setProgress] = useState(leadinfo.white_portion || 0); // Initialize with deal.whiteportion

const handleMouseMove = (e) => {
  const progressBar = e.target.getBoundingClientRect();
  const newProgress = ((e.clientX - progressBar.left) / progressBar.width) * 100;
  const clampedProgress = Math.max(0, Math.min(newProgress, 100)); // Clamp between 0 and 100
  setProgress(clampedProgress);
  setleadinfo((prevLead) => ({ ...prevLead, white_portion: clampedProgress })); // Update deal.whiteportion
};

const handleMouseDown = (e) => {
  handleMouseMove(e); // Set initial progress
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);
};

const handleMouseUp = () => {
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mouseup', handleMouseUp);
};

const facing=["East","West","South","North","North East","South East","North West","South West"];
const [facings, setfacings] = useState([]);

const handlefacingChange = (event) => {
  const {
    target: { value },
  } = event;

  // If "Select All" is clicked
  if (value.includes('select-all')) {
    // If all options are already selected, deselect them (uncheck all)
    if (facings.length === facing.length) {
      setfacings([]); // Deselect all options
      setleadinfo({ ...leadinfo, facing: [] }); // Update facing in leadinfo
    } else {
      // Otherwise, select all options
      setfacings(facing); // Select all options
      setleadinfo({ ...leadinfo, facing: facing }); // Update facing in leadinfo
    }
  } else {
    // Handle individual selections/deselections
    const selectedfacing = typeof value === 'string' ? value.split(',') : value;
    setfacings(selectedfacing); // Update selected facings
    setleadinfo({ ...leadinfo, facing: selectedfacing }); // Update facing in leadinfo
  }
};

const road=["9 mtr road","12 mtr road","60 mtr road","100 mtr road"];

const [roads, setroads] = useState([]);

const handleroadChange = (event) => {
  const {
    target: { value },
  } = event;

  // If "Select All" is clicked
  if (value.includes('select-all')) {
    // If all options are already selected, deselect them (uncheck all)
    if (roads.length === road.length) {
      setroads([]); // Deselect all options
      setleadinfo({ ...leadinfo, road: [] }); // Update road in leadinfo
    } else {
      // Otherwise, select all options
      setroads(road); // Select all options
      setleadinfo({ ...leadinfo, road: road }); // Update road in leadinfo
    }
  } else {
    // Handle individual selections/deselections
    const selectedroad = typeof value === 'string' ? value.split(',') : value;
    setroads(selectedroad); // Update selected roads
    setleadinfo({ ...leadinfo, road: selectedroad }); // Update road in leadinfo
  }
};


const[data11,setdata11]=useState([]);
const fetchdatabyprojectcityname=async()=>
{
  
  try {
    const city=leadinfo.city2
    console.log(city);
    
    const resp=await api.get(`viewprojectbycityname/${city}`)
    console.log(resp);
    
    setdata11(resp.data.project)
  } catch (error) {
    console.log(error);
  }
}
useEffect(() => {
  fetchdatabyprojectcityname()
   
  
}, [leadinfo.city2]);

const allproject =[]
data11.map((item)=>
(
    allproject.push(item.name)
))

const [units, setunits] = useState([]);

const [allblocks, setallblocks] = useState([]);


const fetchdatabyprojectname = async (projectNames) => {

  try {
    
      const resp = await api.get(`viewprojectbyname/${projectNames}`);
      const allFetchedUnits= resp.data.project; 
      setunits(allFetchedUnits);// Assuming resp.data.project is an array of units for that project
    

  
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  if (units.length >= 0) {
   
    const collectedblocks=units.flatMap(item=>item.add_block)

    setallblocks(collectedblocks) 
   
  }
}, [units]);








const handleprojectchange = (event) => {
  const selectproject = event.target.value;

  // If the "Select All" option is selected
  if (selectproject.includes('select-all')) {
    // If all projects are already selected, deselect all
    if (leadinfo.area2.length === allproject.length) {
      setleadinfo((prev) => {
        const updateproject = { ...prev, area2: [] }; // Deselect all
        return updateproject;
      });
    } else {
      // Select all projects
      setleadinfo((prev) => {
        const updateproject = { ...prev, area2: allproject }; // Select all
        fetchdatabyprojectname(allproject); // Fetch data with the selected projects
        return updateproject;
      });
    }
  } else {
    // Handle individual project selection/deselection
    setleadinfo((prev) => {
      const updateproject = { ...prev, area2: selectproject };
      fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
      return updateproject;
    });
  }
};


// const handleallunitschange = (event) => {
 
//   const selectunit = event.target.value

  
//     setdeal((prev) => {
//       const updateunit = { ...prev, unit_number: selectunit };
//       return updateunit; // Return the updated state
//     });
//   };


     
const handleallblockchange = (event) => {
  const selectblocks = event.target.value;

  // If the "Select All" option is selected
  if (selectblocks.includes("select-all")) {
    // If all blocks are selected, deselect all
    if (leadinfo.block.length === allblocks.length) {
      setleadinfo((prev) => {
        const updateblock = { ...prev, block: [] }; // Deselect all
        return updateblock;
      });
    } else {
      // Select all blocks
      const allBlockNames = allblocks.map(project => project.block_name);
      setleadinfo((prev) => {
        const updateblock = { ...prev, block: allBlockNames }; // Select all
        return updateblock;
      });
    }
  } else {
    // Handle individual block selection or deselection
    setleadinfo((prev) => {
      const updateblock = { ...prev, block: selectblocks };
      return updateblock;
    });
  }
}

  const asianCountries = [
    "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", 
    "Brunei", "Burma (Myanmar)", "Cambodia", "China", "Cyprus", "Georgia", 
    "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan", 
    "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", 
    "Maldives", "Mongolia", "Nepal", "North Korea", "Oman", "Pakistan", 
    "Palestine", "Philippines", "Qatar", "Saudi Arabia", "Singapore", 
    "South Korea", "Sri Lanka", "Syria", "Tajikistan", "Thailand", 
    "Timor-Leste", "Turkmenistan", "United Arab Emirates", "Uzbekistan", 
    "Vietnam", "Yemen"
  ];
  const statesAndCities = {
    AndhraPradesh: ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
    ArunachalPradesh: ["Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi", "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", "Upper Siang", "Lower Siang", "Lower Dibang Valley", "Dibang Valley", "Anjaw", "Lohit", "Namsai", "Changlang", "Tirap", "Longding"],
    Assam: ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Dima Hasao", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
    Bihar: ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
    Delhi: ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
    Goa: ["North Goa", "South Goa"],
    Gujarat: ["Ahmedabad", "Amreli", "Anand", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udepur", "Dahod", "Dang", "Gir Somnath", "Jamnagar", "Junagadh", "Kachchh", "Kheda", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
    Haryana: ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Narnaul", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
    HimachalPradesh: ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kullu", "Kullu", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
    Jharkhand: ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
    Karnataka: ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],
    Kerala: ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kottayam", "Kollam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
    MadhyaPradesh: ["Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhindwara", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Rewa", "Rajgarh", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
    Maharashtra: ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
    Manipur: ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
    Meghalaya: ["East Garo Hills", "East Khasi Hills", "Jaintia Hills", "Ri Bhoi", "West Garo Hills", "West Khasi Hills"],
    Mizoram: ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"],
    Nagaland: ["Dimapur", "Kohima", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],
    Odisha: ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Ganjam", "Gajapati", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
    Punjab: ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Firozpur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Nawan Shehar", "Patiala", "Rupnagar", "Sangrur", "SAS Nagar", "Sri Muktsar Sahib"],
    Rajasthan: ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bhilwara", "Bikaner", "Bundi", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Tonk", "Udaipur"],
    Sikkim: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
    TamilNadu: ["Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kancheepuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivagangai", "Tenkasi", "Thanjavur", "The Nilgiris", "Thoothukudi", "Tiruvallur", "Tirunelveli", "Tirupur", "Vellore", "Viluppuram", "Virudhunagar"],
    Telangana: ["Adilabad", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar", "Jogulamba", "Kamareddy", "Karimnagar", "Khammam", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal", "Nalgonda", "Nagarkurnool", "Nirmal", "Nizamabad", "Peddapalli", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Warangal", "Khammam", "Kothagudem"],
    Tripura: ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
    UttarPradesh: ["Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddh Nagar", "Ghaziabad", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lucknow", "Mathura", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar","Noida", "Pratapgarh", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shrawasti", "Siddharth Nagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"],
    WestBengal: ["Alipurduar", "Bankura", "Birbhum", "Burdwan", "Cooch Behar", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "North Dinajpur", "Paschim Medinipur", "Purba Medinipur", "Purulia", "South 24 Parganas", "South Dinajpur", "Uttar Dinajpur"]
  };

  const states = Object.keys(statesAndCities);
  const cities = statesAndCities[leadinfo.state2] || [];


  const selectlocation=()=>
    {
      document.getElementById("select_location").style.display="flex"
      document.getElementById("search_location1").style.display="none"

  
        
      document.getElementById("searchlocation").style.color="black"
      document.getElementById("searchlocation").style.backgroundColor="white"


      document.getElementById("selectlocation").style.backgroundColor="black"
      document.getElementById("selectlocation").style.color="white"
      document.getElementById("selectlocation").style.borderRadius="50px"
      document.getElementById("selectlocation").style.width="150px"
      document.getElementById("selectlocation").style.textAlign="center"
    
    

      
    }
    const searchlocation=()=>
      {
        document.getElementById("select_location").style.display="none"
        document.getElementById("search_location1").style.display="flex"
    
    
      
        document.getElementById("selectlocation").style.color="black"
        document.getElementById("selectlocation").style.backgroundColor="white"
 

        document.getElementById("searchlocation").style.backgroundColor="black"
        document.getElementById("searchlocation").style.color="white"
        document.getElementById("searchlocation").style.borderRadius="50px"
        document.getElementById("searchlocation").style.width="150px"
        document.getElementById("searchlocation").style.textAlign="center"
        
      }


    
                                            const areaoptions = [
                                              { value: 10, label: "10" },                 
                                              { value: 25, label: "25" },
                                              { value: 50, label: "50" },
                                              { value: 75, label: "75" },
                                              { value: 100, label: "100" },
                                              { value: 125, label: "125" },
                                              { value: 150, label: "150" },
                                              { value: 175, label: "175" },
                                              { value: 200, label: "200" },
                                              { value: 225, label: "225" },
                                              { value: 250, label: "250" },
                                              { value: 300, label: "300" },
                                              { value: 350, label: "350" },
                                              { value: 400, label: "400" },
                                              { value: 450, label: "450" },
                                              { value: 550, label: "550" },
                                              { value: 750, label: "750" },
                                              { value: 1000, label: "1000" },
                                              { value: 2000, label: "2000" },
                                              { value: 5000, label: "5000" },
                                              { value: 7500, label: "7500" },
                                              { value: 10000, label: "10000" }
                                            ];

                                            const filteredarea = leadinfo.minimum_area
                                            ? areaoptions.filter((option) => option.value >= leadinfo.minimum_area)
                                            : areaoptions;

                                            const budgetOptions = [
                                              { value: 5000, label: "5,000/- (five thousand)" },
                                              { value: 10000, label: "10,000/- (ten thousand)" },
                                              { value: 20000, label: "20,000/- (twenty thousand)" },
                                              { value: 30000, label: "30,000/- (thirty thousand)" },
                                              { value: 50000, label: "50,000/- (fifty thousand)" },
                                              { value: 80000, label: "80,000/- (eighty thousand)" },
                                              { value: 100000, label: "1,00,000/- (one lakh)" },
                                              { value: 150000, label: "1,50,000/- (one and a half lakh)" },
                                              { value: 200000, label: "2,00,000/- (two lakh)" },
                                              { value: 250000, label: "2,50,000/- (two and a half lakh)" },
                                              { value: 350000, label: "3,50,000/- (three and a half lakh)" },
                                              { value: 500000, label: "5,00,000/- (five lakh)" },
                                              { value: 750000, label: "7,50,000/- (seven and a half lakh)" },
                                              { value: 1000000, label: "10,00,000/- (ten lakh)" },
                                            ];
                                          
                                            // Filter max budget options based on selected min budget
                                            const filteredMaxBudgetOptions = leadinfo.budget_min
                                              ? budgetOptions.filter((option) => option.value >= leadinfo.budget_min)
                                              : budgetOptions;
    
                                              const buyBudgetOptions = [
                                                { value: 1000000, label: "10,00,000/- (ten lakh)" },
                                                { value: 2500000, label: "25,00,000/- (twenty five lakh)" },
                                                { value: 5000000, label: "50,00,000/- (fifty lakh)" },
                                                { value: 7500000, label: "75,00,000/- (seventy five lakh)" },
                                                { value: 10000000, label: "1,00,00,000/- (one crore)" },
                                                { value: 12500000, label: "1,25,00,000/- (one crore twenty five lakh)" },
                                                { value: 15000000, label: "1,50,00,000/- (one crore fifty lakh)" },
                                                { value: 20000000, label: "2,00,00,000/- (two crore)" },
                                                { value: 30000000, label: "3,00,00,000/- (three crore)" },
                                                { value: 40000000, label: "4,00,00,000/- (four crore)" },
                                                { value: 50000000, label: "5,00,00,000/- (five crore)" },
                                                { value: 75000000, label: "7,50,00,000/- (seven crore fifty lakh)" },
                                                { value: 100000000, label: "10,00,00,000/- (ten crore)" },
                                                { value: 150000000, label: "15,00,00,000/- (fifteen crore)" },
                                                { value: 200000000, label: "20,00,00,000/- (twenty crore)" },
                                                { value: 300000000, label: "30,00,00,000/- (thirty crore)" },
                                                { value: 500000000, label: "50,00,00,000/- (fifty crore)" },
                                                { value: 750000000, label: "75,00,00,000/- (seventy five crore)" },
                                                { value: 1000000000, label: "100,00,00,000/- (one hundred crore)" },
                                              ];
                                              const filteredMaxBudgetOptionsbuy = leadinfo.budget_min
                                              ? buyBudgetOptions.filter((option) => option.value >= leadinfo.budget_min)
                                              : buyBudgetOptions;


                                              const getAvailableunittype = () => {
                                                // Step 1: Ensure leadinfo.sub_type is an array before calling flatMap
                                                if (Array.isArray(leadinfo.sub_type)) {
                                                  return leadinfo.sub_type.flatMap((cat) => Array.isArray(options.unit_type[cat]) ? options.unit_type[cat] : []);
                                                }
                                                return [];  // Return an empty array if leadinfo.sub_type is not an array
                                              };
                                              
                                              const handleUnitTypeChange = (event) => {
                                                const selectedUnitTypes = event.target.value;
                                                setleadinfo((prevLead) => ({
                                                  ...prevLead,
                                                  unit_type: selectedUnitTypes,
                                                }));
                                              };

                                              const handleSubcategoryChange = (event) => {
                                                const selectedSubcategories = event.target.value;
                                              
                                                // Update subcategories and dependent unit types
                                               
                                                setleadinfo((prevLead) => ({
                                                  ...prevLead,
                                                  sub_type: selectedSubcategories,
                                                  unit_type: [], // Ensure uniqueness
                                                }));
                                              };
                                              const getAvailableSubcategories = () => {
                                                if (Array.isArray(leadinfo.property_type)) {
                                                  return leadinfo.property_type.flatMap((cat) => Array.isArray(options.sub_type[cat]) ? options.sub_type[cat] : []);
                                                }
                                                return [];  // Return an empty array if leadinfo.property_type is not an array
                                              };
                                              


                                              const options = {
                                                property_type: ["RESIDENTIAL", "COMMERCIAL","AGRICULTURE","INDUSTRIAL","INSTITUTIONAL"],
                                                sub_type: {
                                                  RESIDENTIAL: ["PLOT", "INDEPENDENT HOUSE","FLAT/APARTMENT","BUILDER FLOOR"],
                                                  COMMERCIAL: ["SHOP", "SHOWROOM","OFFICE SPACE","RETAIL STORE","SOHO","EXCUTIVE ROOM","MULTIPLEX","VIRTUAL SPACE","PLOT"],
                                                  AGRICULTURE: ["LAND", "FARM HOUSE"],
                                                  INDUSTRIAL: ["PLOTS", "WAREHOUSE","COLD STORAGE","RICE SELLER","BUILDING","FACTORY"],
                                                  INSTITUTIONAL: ["SCHOOL", "HOTEL","UNIVERSITIES","HOSPITAL","COLLEGE"]
                                                },
                                                unit_type: {
                                                  PLOT: ["1 Kanal", "2 Kanal","16 Marla","14 Marla","10 Marla","8 Marla","6 Marla","4 Marla","3 Marla","2 Marla"],
                                                  "INDEPENDENT HOUSE": ["1 Kanal", "2 Kanal","16 Marla","14 Marla","10 Marla","8 Marla","6 Marla","4 Marla","3 Marla","2 Marla"],
                                                  "FLAT/APARTMENT": ["1 BHK", "2 BHK","3 BHK","4 BHK","5 BHK","STUDIO"],
                                                  "BUILDER FLOOR": ["1 BHK", "2 BHK","3 BHK","4 BHK","5 BHK","STUDIO"],
                                                  SHOP:["BOOTH","KIOSAK",],
                                                  SHOWROOM:["SCO","SCF","DSS"],
                                                  "OFFICE SPACE":["LOCABLE OFFICE","VIRTUAL OFFICE"],
                                                  "RETAIL STORE":["HYPER MARKET","DEPARTMETAL STORE"],
                                                  SOHO:["SOHO"],
                                                  "EXCUTIVE ROOM":["ROOM"],
                                                  LAND:["CROPLAND","WOODLAND","PASTURE","COMMERCIAL"],
                                                  "FARM HOUSE":["FARM"],
                                                  PLOTS:["1 KANAL","10 MARLA","2 KANAL","1 ACRE","2 KANAL"],
                                                  WAREHOUSE:["WRHSE"],
                                                  "COLD STORAGE":["CLDSTRG"],
                                                  "RICE SELLER":["RCSLR"],
                                                  "BUILDING":["BLDG"],
                                                  FACTORY:["FCTRY"],
                                                  SCHOOL:["NURSERY SCHOOL","CRECH","HIGH SCHOOL","PRIMERY SCHOOL"],
                                                  HOTEL:["HOTEL","GUEST HOUSE","HOMESTAYS"],
                                                  UNIVERSITIES:["DEEMED","PRIVATE"],
                                                  HOSPITAL:["NURSING HOME","CLINIC"],
                                                  COLLEGE:["ART COLLEGE","TECHNICAL COLLEGE","MEDICAL COLLEGE"]
                                                },
                                              };
                                              
                                              const handleCategoryChange = (event) => {
                                                const selectedCategories = event.target.value;
                                              
                                                // Update categories and reset dependent fields
                                              
                                                
                                              
                                                setleadinfo((prevLead)=>({
                                                  ...prevLead,
                                                  property_type: selectedCategories,
                                                  sub_type: [], // Ensure uniqueness
                                                  unit_type: [], // Ensure uniqueness
                                                }));
                                              };
                                              
                                              useEffect(()=>{fetchcdata()},[])

                                              const[cdata,setcdata]=useState([]);
                                              const[totalcompany,settotalcompany]=useState()
                                              const fetchcdata=async(event)=>
                                              {
                                                
                                                try {
                                                  const resp=await api.get('viewcompany')
                                                  setcdata(resp.data.developer)
                                                  const countcompany=Array.isArray(resp.data.developer) ? resp.data.developer : [resp.data.developer]
                                                  settotalcompany(countcompany.length)
                                                  // setFilteredData(countcontact);
                                                } catch (error) {
                                                  console.log(error);
                                                }
                                              
                                              }



                                              const professtiondetails = {
                                                profession_category: ["Govt. Employed", "Private Employee","Self Employed","Retired","Business Man","Student","House Wife"],
                                              
                                                profession_subcategory: {
                                                  "Govt. Employed": ["Teacher", "Scientist","Doctor","Nurse","Clerk","Engineer","Accountant","Architect","Auditor","Police",
                                                                      "Mechanic","Security","Driver","Officer","Peon","Chef","Pilot","IT Person","Analyst","Sales Person",
                                                                      "Banker","Legal"],
                                                  "Private Employee": ["Officer", "Accountant", "Human Resources (HR)", "Sales Person", "Manager", "IT Person", 
                                                                          "Analyst", "Scientist", "Technicians", "Designer", "Author", "Videographer", "Director", 
                                                                          "Telle Caller", "Legel", "Executive Officer", "Operators", "Security", "Journalists", 
                                                                          "Doctor", "Nurse", "Teacher", "Facility", "Driver", "Contractor", "Consultant", "Chef", 
                                                                          "Artist", "Engineer", "Banker", "Legal", "Clerk", "Architect", "Auditor", "Mechanic", 
                                                                          "Peon", "Pilot"],
                                                
                                                  "Self Employed": ["Designer", "Photographer","Videographer","Independent Artist","Illustrator","Writer","Digital Content Creator",
                                                                    "Social Media Influencer","Podcaster","Music Producer","Management Consultant","Financial Advisor","IT Consultant",
                                                                    "Business Strategist","Marketing Consultant","Life Coach","Career Counselor","Freelance Software Developer","Web Developer",
                                                                    "Data Analyst","App Developer","UX/UI Designer","Cybersecurity Consultant","Private Practitioner (Doctor)","Physiotherapist",
                                                                    "Dietitian or Nutritionist","Yoga Instructor","Personal Trainer","Alternative Medicine Practitioner (e.g., Homeopath, Naturopath)",
                                                                    "Private Tutor","Test Preparation Coach","Online Educator","Language Trainer","Corporate Trainer","Independent Lawyer",
                                                                    "Chartered Accountant (CA)","Tax Consultant","Auditor","Financial Planner","Tailor","Carpenter","Blacksmith",
                                                                    "Jewelry Maker","Ceramic Artist","Real Estate Agent","Broker","Sales Representative","Freelance Chef","Event Planner",
                                                                    "Makeup Artist","Hairstylist","Wedding Photographer","Independent Farmer","Organic Produce Supplier","Horticulturist"],
                                                  
                                                  Retired: ["Teacher", "Scientist", "Doctor", "Nurse", "Clerk", "Engineer", "Accountant", "Architect", "Auditor", "Police",
                                                            "Mechanic", "Security", "Driver", "Officer", "Peon", "Chef", "Pilot", "IT Person", "Analyst", "Sales Person", "Banker",
                                                            "Legal", "Manager", "Operators", "Human Resources (HR)", "Freelance Graphic Designer", "Photographer", "Videographer",
                                                            "Independent Artist", "Illustrator", "Writer (Author, Blogger, or Copywriter)", "Digital Content Creator", "Social Media Influencer",
                                                            "Podcaster", "Music Producer", "Management Consultant", "Financial Advisor", "IT Consultant", "Business Strategist", "Marketing Consultant",
                                                            "Life Coach", "Career Counselor", "Freelance Software Developer", "Web Developer", "Data Analyst", "App Developer", "UX/UI Designer",
                                                            "Cybersecurity Consultant", "Private Practitioner (Doctor)", "Physiotherapist", "Dietitian or Nutritionist", "Yoga Instructor",
                                                            "Personal Trainer", "Alternative Medicine Practitioner (e.g., Homeopath, Naturopath)", "Private Tutor", "Test Preparation Coach",
                                                            "Online Educator", "Language Trainer", "Corporate Trainer", "Independent Lawyer", "Chartered Accountant (CA)", "Tax Consultant",
                                                            "Auditor", "Financial Planner", "Tailor", "Carpenter", "Blacksmith", "Jewelry Maker", "Ceramic Artist", "Real Estate Agent",
                                                            "Property Consultant", "Broker", "Sales Representative", "Freelance Chef", "Event Planner", "Makeup Artist", "Hairstylist",
                                                            "Wedding Photographer", "Independent Farmer", "Organic Produce Supplier", "Horticulturist"
                                                  ],
                                              
                                                  Student:["Investor"],
                                              
                                                  "House Wife":["Investor"],
                                                  
                                                  "Business Man": ["Entrepreneurs", "Start-up Founders", "Retailer", "Wholesaler", "Importer/Exporter", "Distributor", "Trader",
                                                                    "Real Estate Developer", "Real Estate Investor", "Real Estate Agent", "Manufacturer", "Industrialist", "Financer",
                                                                    "Stock Trader", "Hotel Owner", "Resort Owner", "Travel Agency", "Restaurant Owner", "Agriculturist", "Dairy Business Owner",
                                                                    "IT Person", "Coaching Centre Owner", "Training Institute Owner", "Online Tutor", "Private Tutor", "Hospital Owner",
                                                                    "Wellness Centre Owner", "Fitness Centre Owner", "Advertising Agency Owner", "Film Producer", "Media House Owner",
                                                                    "Designer", "Transporter", "Courier Servicer", "Renewable Energy and Environment", "Boutique", "Salon Owner",
                                                                    "Security Service Provider", "Legal Firm Owner", "Digital Business", "Infrastructure Developer", "Poultry Farm Owner",
                                                                    "Handicrafts Business Owner", "Investment Banker", "Loan Consultant", "IT Company Owner", "Cloud Service Provider",
                                                                    "Emigration", "Catering", "Baker", "Car Dealership Owner", "Bike Dealership Owner", "Bike Rental Business Owner",
                                                                    "Workshop Owner", "Environmental Consultant", "Cold Storage Business Owner", "Film Studio Owner", "Sports Organizer",
                                                                    "Event Organizer", "Cloth Merchant"
                                                  ]
                                                  
                                                },
                                                designation: {
                                                  Teacher: ["Primary Teacher (PRT)","Trained Graduate Teacher (TGT)","Post Graduate Teacher (PGT)","Assistant Professor",
                                                            "Professor","Principal","Education Officer","Laboratory Technicians","Corporate Trainers","E-learning Specialists",
                                                            "Academic Counselors","Kindergarten Teacher","Subject Teacher","Senior Educator","Head of Department"],
                                                  Scientist: ["Junior Scientist","Scientist B/C/D","Senior Scientist","Chief Scientist","Director","Data Scientists",
                                                              "Research Scientists","Product Developers","Research Associate","Senior Research Scientist","Lead Scientist"],
                                                  Doctor: ["Doctors","Medical Officer (MO)","Senior Medical Officer (SMO)","Specialist Doctor","Chief Medical Officer (CMO)","Director of Health Services",
                                                          "Physical Therapists","Dietitians","Resident Doctor","Consultant","Senior Specialist","Medical Director"],
                                                  Nurse:["Nurses","Auxiliary Nurse Midwife (ANM)","Staff Nurse","Nursing Superintendent","Chief Nursing Officer","Staff Nurse",
                                                          "Charge Nurse","Nursing Director"],
                                                  Clerk:["Lower Division Clerk (LDC)","Upper Division Clerk (UDC)","Assistant Section Officer (ASO)","Section Officer (SO)",
                                                          "Data Entry Clerk","Office Assistant","Administrative Clerk"],
                                                  Engineer:["Junior Engineer (JE)","Assistant Engineer (AE)","Executive Engineer (EE)","Chief Engineer",],
                                                  Accountant:["Junior Accountant","Senior Accountant","Accounts Officer","Senior Accounts Officer","Controller of Accounts",
                                                              "Accountants","Payroll Specialists","Tax Consultants","Junior Accountant","Senior Accountant","Finance Controller",
                                                              "Chief Financial Officer (CFO)","Accountants", "Financial Analysts","Auditors","Payroll Specialists","Tax Consultants"],
                                                  Architect:["Assistant Architect","Architect","Senior Architect","Chief Architect","Architectural Intern","Project Architect",
                                                              "Design Director"],
                                                  Auditor:["Junior Auditor","Senior Auditor","Audit Officer","Senior Audit Officer","Principal Auditor","Auditors","Internal Auditor",
                                                            "Risk Auditor","Audit Manager"],
                                                  Police:["Constable","Head Constable","Assistant Sub-Inspector (ASI)","Sub-Inspector (SI)","Inspector","Deputy Superintendent of Police (DSP)",
                                                          "Superintendent of Police (SP)","Inspector General of Police (IGP)","Director General of Police (DGP)"],
                                                  Mechanic:["Junior Mechanic","Senior Mechanic","Workshop Superintendent","Service Technician","Workshop Supervisor"],
                                                  Security:["Security Guard","Security Supervisor","Security Officer","Chief Security Officer","Safety Officers"],
                                                  Driver:["Driver (Light/Heavy Vehicle)","Senior Driver","Motor Vehicle Inspector","Drivers","Delivery Agents","Company Driver",
                                                          "Heavy Vehicle Driver","Personal Driver"],
                                                  Officer:["Probationary Officer (PO)","Administrative Officer","Gazetted Officer (Class A, B, C)","Deputy Secretary",
                                                          "Under Secretary","Joint Secretary","Secretary","Administrative Assistants","Chief Executive Officer (CEO)",
                                                          "Chief Financial Officer (CFO)","Chief Operating Officer (COO)","Vice Presidents (VPs)","Directors","Entrepreneurs",
                                                        "Administrative Assistants","Office Managers","Executive Assistants","Receptionists","PData Entry Operators"],
                                                  Peon:["Office Attendant","Multi-Tasking Staff (MTS)","Office Helper","Support Staff"],
                                                  Chef:["Cook","Head Cook","Catering Supervisor","Chefs","Commis Chef","Sous Chef","Executive Chef"],
                                                  Pilot:["Commercial Pilot","Helicopter Pilot","Fighter Pilot","Co-Pilot","Chief Pilot"],
                                                  "IT Person":["Junior Programmer","Software Developer","Software Engineer","Senior Software Engineer","IT Officer",
                                                              "Software Developers","System Administrators","IT Support Specialists","Junior Developer","Full Stack Developer"
                                                              ],
                                                  "Sales Person":["Sales Assistant","Sales Supervisor","Marketing Executive","Sales Executives","Sales Associate","Sales Manager"],
                                                  Analyst:["Data Analyst","Research Analyst","Financial Analyst","System Analyst","Intelligence Analyst","Financial Analysts",
                                                            "Cybersecurity Analysts","Supply Chain Analysts","Business Analyst","Senior Analyst","Supply Chain Analysts","Quality Inspector"],
                                                  Banker:["Bank Clerk","Senior Clerk","Probationary Officer (PO)","Assistant Manager","Branch Manager","Regional Manager",
                                                          "Chief Manager","Assistant General Manager (AGM)","General Manager (GM)","Managing Director (MD)","Relationship Manager",
                                                          "Loan Officer","Branch Manager","Investment Analyst"],
                                                  Legal:["Civil Judge (Junior Division)","Civil Judge (Senior Division)","District Judge","High Court Judge","Supreme Court Judge",
                                                          "Chief Justice","Legal Officer","Public Prosecutor","Solicitor General","Legal Advisors","Compliance Officers",
                                                          "Contract Specialists","Risk Managers","Legal Associate","Corporate Lawyer","Compliance Manager","Legal Consultant",
                                                        ],
                                              
                                                  Designer:["Proprietor","Graphic Designers","UX/UI Designers","Instructional Designers","Freelance Designers/Writers",
                                                            "Senior Designer","Creative Director"], Photographer:["Proprietor"],Videographer:["Proprietor","Video Editors"],"Independent Artist":["Proprietor"],
                                                  Illustrator:["Proprietor"],Writer:["Proprietor"],"Digital Content Creator":["Proprietor"],"Social Media Influencer":["Proprietor"],
                                                  Podcaster:["Proprietor"],"Music Producer":["Proprietor"],"Management Consultant":["Proprietor"],"Financial Advisor":["Proprietor"],
                                                  "IT Consultant":["Proprietor"],"Business Strategist":["Proprietor"],"Marketing Consultant":["Proprietor"],"Life Coach":["Proprietor"],
                                                  "Career Counselor":["Proprietor"],"Freelance Software Developer":["Proprietor"],"Web Developer":["Proprietor"],"Data Analyst":["Proprietor"],
                                                  "App Developer":["Proprietor"],"UX/UI Designer":["Proprietor"],"Cybersecurity Consultant":["Proprietor"],"Private Practitioner (Doctor)":["Proprietor"],
                                                  Physiotherapist:["Proprietor"],"Dietitian or Nutritionist":["Proprietor"],"Yoga Instructor":["Proprietor"],"Personal Trainer":["Proprietor"],
                                                  "Alternative Medicine Practitioner (e.g., Homeopath, Naturopath)":["Proprietor"],"Private Tutor":["Proprietor"],"Test Preparation Coach":["Proprietor"],
                                                  "Online Educator":["Proprietor"],"Language Trainer":["Proprietor"],"Corporate Trainer":["Proprietor"],"Independent Lawyer":["Proprietor"],
                                                  "Chartered Accountant (CA)":["Proprietor"],"Tax Consultant":["Proprietor"],"Auditor":["Proprietor"],"Financial Planner":["Proprietor"],
                                                  "Tailor":["Proprietor"],"Carpenter":["Proprietor"],"Blacksmith":["Proprietor"],"Jewelry Maker":["Proprietor"],"Ceramic Artist":["Proprietor"],
                                                  "Real Estate Agent":["Proprietor"],"Broker":["Proprietor"],"Sales Representative":["Proprietor"],"Freelance Chef":["Proprietor"],
                                                  "Event Planner":["Proprietor"],"Makeup Artist":["Proprietor"],"Hairstylist":["Proprietor"],"Wedding Photographer":["Proprietor"],
                                                  "Independent Farmer":["Proprietor"],"Organic Produce Supplier":["Proprietor"],"Horticulturist":["Proprietor"],
                                              
                                                  "Software Developer":["Software Developer"],
                                                  Manager:[],
                                                  Operators:["Data Entry Operators","Operations Managers","Machine Operators"],
                                                  "Human Resources (HR)":["HR Executives","Talent Acquisition Specialists","Employee Relations Managers","Training and Development Specialists",
                                                                          "HR Business Partners","HR Executives","Talent Acquisition Specialists","Employee Relations Managers","Training and Development Specialists","HR Business Partners"],
                                                  Manager:["Marketing Managers","Brand Managers","Business Development Managers","Digital Marketing Specialists",
                                                            "Logistics Coordinators","Procurement Specialists","Inventory Managers","Client Relationship Managers","Social Media Managers",
                                                            "Event Planners","Facility Managers","Hotel Managers","Front Desk Executives","Event Coordinators","Start-up Employees",
                                                            "Team Manager","Operations Manager","General Manager","Operations Managers","Logistics Coordinators","Procurement Specialists",
                                                            "Inventory Managers","Innovation Managers","Customer Support Executives","Sales Manager","Public Relations Specialists",
                                                          "Office Managers","Executive Assistants","Receptionists","Innovation Managers","Customer Support Executives",
                                                            "Plant Managers","Quality Inspectors","Fleet Managers","Marketing Managers","Brand Managers","Business Development Managers","Digital Marketing Specialists"],
                                                  Author:["Content Writers","Editors"],
                                                  Director:["Art Directors"],
                                                  "Tele Caller":["Call Center Agents"],
                                                  Technicians:["Technical Support Specialists","Maintenance Technicians","Lab Technicians","Technical Lead","Laboratory Technicians"],
                                                  Jounalists:["Journalists","Public Relations Specialists"],
                                                  Hospitality:["Housekeeping Staff"],
                                                  Contractor:["Independent Contractors"],
                                                  Consultant:["Management Consultants"],
                                                  Artist:["Creative Artists","Musicians"],
                                                  Engineer:["Junior Engineer","Project Engineer","Senior Engineer","Engineering Manager"],
                                                  "Freelance Graphic Designer":["Proprietor"],Photographer:["Proprietor"],Videographer:["Proprietor"],"Independent Artist":["Proprietor"],
                                                  Illustrator:["Proprietor"],"Writer (Author, Blogger, or Copywriter)":["Proprietor"],"Digital Content Creator":["Proprietor"],
                                                  "Social Media Influencer":["Proprietor"],Podcaster:["Proprietor"],"Music Producer":["Proprietor"],"Management Consultant":["Proprietor"],
                                                  "Financial Advisor":["Proprietor"],"IT Consultant":["Proprietor"],"Business Strategist":["Proprietor"],"Marketing Consultant":["Proprietor"],
                                                  "Life Coach":["Proprietor"],"Career Counselor":["Proprietor"],"Freelance Software Developer":["Proprietor"],"Web Developer":["Proprietor"],
                                                  "Data Analyst":["Proprietor"],"App Developer":["Proprietor"],"UX/UI Designer":["Proprietor"],"Cybersecurity Consultant":["Proprietor"],
                                                  "Private Practitioner (Doctor)":["Proprietor"],Physiotherapist:["Proprietor"],"Dietitian or Nutritionist":["Proprietor"],
                                                  "Yoga Instructor":["Proprietor"],"Personal Trainer":["Proprietor"],"Alternative Medicine Practitioner (e.g., Homeopath, Naturopath)":["Proprietor"],
                                                  "Private Tutor":["Proprietor"],"Test Preparation Coach":["Proprietor"],"Online Educator":["Proprietor"],"Language Trainer":["Proprietor"],
                                                  "Corporate Trainer":["Proprietor"],"Independent Lawyer":["Proprietor"],"Chartered Accountant (CA)":["Proprietor"],"Tax Consultant":["Proprietor"],
                                                  Auditor:["Proprietor","Internal Auditor","Risk Auditor","Audit Manager"],"Financial Planner":["Proprietor"],Tailor:["Proprietor"],Carpenter:["Proprietor"],Blacksmith:["Proprietor"],
                                                  "Jewelry Maker":["Proprietor"],"Ceramic Artist":["Proprietor"],"Real Estate Agent":["Proprietor"],"Property Consultant":["Proprietor"],
                                                  Broker:["Proprietor"],"Sales Representative":["Proprietor"],"Freelance Chef":["Proprietor"],"Event Planner":["Proprietor"],
                                                  "Makeup Artist":["Proprietor"],Hairstylist:["Proprietor"],"Wedding Photographer":["Proprietor"],"Independent Farmer":["Proprietor"],
                                                  "Organic Produce Supplier":["Proprietor"],Horticulturist:["Proprietor"],
                                                  Investor:["Angel Investor", "Venture Capitalist", "Portfolio Manager"],
                                                  Entrepreneurs:["Founder", "Co-Founder", "CEO", "Managing Director"],
                                                  "Start-up Founders":["Founder", "Co-Founder, CEO", "Visionary Leader"],
                                                  Retailer:["Shop Owner", "Retail Manager", "Proprietor", "Franchise Owner"],
                                                  Wholesaler:["Wholesale Business Owner", "Distribution Head", "Supply Chain Owner"],
                                                  "Importer/Exporter":["Import/Export Manager", "Trade Consultant", "Supply Chain Owner"],
                                                  Distributor:["Chief Trading Officer", "Trading Business Owner", "Independent Trader"],
                                                  Trader:["Wholesale Business Owner", "Distribution Head", "Supply Chain Owner"],
                                                  "Real Estate Developer":["Real Estate Developer", "Managing Partner", "Property Consultant"],
                                                  "Real Eastate Investor":["Property Investor", "Real Estate Strategist", "Investment Manager"],
                                                  "Real Estate Agent":["Real Estate Consultant", "Real Estate Advisor", "Realtor"],
                                                  Manufacturer:["Factory Owner", "Production Head", "Chief Manufacturing Officer"],
                                                  Industrialist:["Business Tycoon", "Industry Leader", "Managing Director"],
                                                  Financer:["Chief Financial Officer (CFO)", "Financial Advisor", "Investment Consultant"],
                                                  "Stock Trader":["Equity Investor", "Day Trader", "Portfolio Manager"],
                                                  "Hotel Owner":["Hospitality Owner", "General Manager (GM)", "Managing Director"],
                                                  "Resort Owner":["Resort Manager", "Owner and Operator", "Hospitality Director"],
                                                  "Travel Agency":["Travel Consultant", "Tourism Business Owner", "Founder"],
                                                  "Restaurant Owner":["Restaurant Manager", "Food Entrepreneur", "Culinary Director"],
                                                  Agriculturist:["Farm Owner", "Agriculture Consultant", "Rural Entrepreneur"],
                                                  "Dairy Business Owner":["Dairy Farmer", "Milk Processing Entrepreneur", "Managing Partner"],
                                                  "IT Person":["IT Consultant", "Software Solutions Owner","IT Entrepreneur","Software Developers","System Administrators",
                                                              "IT Support Specialists","Data Scientists","Cybersecurity Analysts","Junior Developer","Full Stack Developer",
                                                              "Senior Software Engineer","Technical Lead"],
                                                  "Coaching Centre Owner":["Education Entrepreneur", "Coaching Director", "Academic Manager"],
                                                  "Training Institute Owner":["Training Consultant", "Institute Director", "Founder"],
                                                  "Online Tutor":["Founder and Educator", "Academic Content Creator"],
                                                  "Private Tutor":["Independent Tutor", "Education Consultant"],
                                                  "Hospital Owner":["Healthcare Entrepreneur", "Medical Director", "Hospital Administrator"],
                                                  "Wellness Centre Owner":["Wellness Consultant", "Health and Fitness Director", "Gym Owner"],
                                                  "Fitness Centre Owner":["Gym Owner", "Fitness Director", "Health Entrepreneur"],
                                                  "Advertising Agency Owner":["Creative Director", "Marketing Strategist", "Founder"],
                                                  "Film Producer":["Producer", "Film Studio Owner", "Creative Producer"],
                                                  "Media House Owner":["Media Entrepreneur","Chief Editor", "Publisher"],
                                                  Designer:	["Creative Director", "Fashion Entrepreneur"],
                                                  Transporter:	["Logistics Manager", "Transport Business Owner"],
                                                  "Courier Servicer":["Courier Business Owner", "Operations Manager"],
                                                  "Renewable Energy and Environment":["Renewable Energy Consultant", "Sustainable Entrepreneur"],
                                                  Boutique:["Fashion Boutique Owner", "Creative Head"],
                                                  "Salon Owner":["Salon Manager", "Beauty Entrepreneur"],
                                                  "Security Service Provider":["Security Agency Owner", "Operations Head"],
                                                  "Legal Firm Owner":["Advocate and Owner", "Managing Partner"],
                                                  "Digital Business":["Founder", "Digital Marketing Consultant"],
                                                  "Infrastructure Developer":["Real Estate Developer", "Project Consultant"],
                                                  Agriculturist:["Agribusiness Entrepreneur", "Food Processing Director"],
                                                  "Poultry Farm Owner":	["Poultry Business Owner", "Farm Manager"],
                                                  "Handicrafts Business Owner":["Artisan Entrepreneur", "Creative Entrepreneur"],
                                                  "Investment Banker":["Investment Advisor", "Wealth Manager"],
                                                  "Loan Cosultant":	["Financial Consultant", "Loan Advisor"],
                                                  "IT Company Owner":["IT Entrepreneur", "Chief Technology Officer (CTO)"],
                                                  "Cloud Service Provider":["Cloud Solutions Architect", "IT Entrepreneur"],
                                                  Emigration:	["Immigration Consultant", "Visa Solutions Provider"],
                                                  Catering:	["Catering Business Owner", "Culinary Director"],
                                                  Baker:["Bakery Owner", "Culinary Entrepreneur"],
                                                  "Car Dealership Owner":["Dealership Manager", "Auto Entrepreneur"],
                                                  "Bike Dealership Owner":	["Franchise Owner"],
                                                  "Bike Rental Business Owner":["Rental Business Owner", "Operations Head"],
                                                  "Workshop Owner":["Mechanic Entrepreneur", "Service Manager"],
                                                  "Environmental Consultant":["Sustainability Consultant", "Environmental Advisor"],
                                                  "Cold Storage Business Owner":["Logistics Entrepreneur", "Warehouse Manager"],
                                                  "Film Studio Owner":	["Film Producer", "Studio Head"],
                                                  "Sports Organizer":	["Event Manager", "Sports Entrepreneur"],
                                                  "Event Organizer":	["Founder, Director", "Creative Planner"],
                                                  "Cloth Merchant":	["Textile Business Owner", "Retail Manager"],
                                                  ExecutiveOfficer:["Chief Executive Officer (CEO)","Entrepreneurs","Chief Financial Officer (CFO)","Chief Operating Officer (COO)","Vice Presidents (VPs)","Directors",],
                                                  Facility:["Housekeeping Staff"]
                                              
                                              
                                                },
                                              };
                                              
                                              const [availableSubcategories, setAvailableSubcategories] = useState([]);
                                              const [availableDesignations, setAvailableDesignations] = useState([]);
                                              
                                              // Handle profession category change
                                              const handleProfessionCategoryChange = (event) => {
                                                const selectedCategory = event.target.value;
                                              
                                                setleadinfo((prevLead) => ({
                                                  ...prevLead,
                                                  profession_category: selectedCategory,
                                                  profession_subcategory: "", // Reset subcategory when category changes
                                                  designation: "", // Reset designation when category changes
                                                }));
                                              
                                                // Update available subcategories based on selected profession category
                                                setAvailableSubcategories(professtiondetails.profession_subcategory[selectedCategory] || []);
                                              };
                                              
                                              // Handle profession subcategory change
                                              const handleProfessionSubcategoryChange = (event) => {
                                                const selectedSubcategory = event.target.value;
                                              
                                                setleadinfo((prevLead) => ({
                                                  ...prevLead,
                                                  profession_subcategory: selectedSubcategory,
                                                  designation: "", // Reset designation when subcategory changes
                                                }));
                                              
                                                // Update available designations based on selected profession subcategory
                                                setAvailableDesignations(professtiondetails.designation[selectedSubcategory] || []);
                                              };
                                              
                                              // Handle designation change
                                              const handleDesignationChange = (event) => {
                                                const selectedDesignation = event.target.value;
                                              
                                                setleadinfo((prevLead) => ({
                                                  ...prevLead,
                                                  designation: selectedDesignation,
                                                }));
                                              };


                                              const onlineCampaignSources = [
                                                "Facebook", "Instagram", "Google", "X", "Linkedin", 
                                                "99 Acre", "Magicbricks", "Common Floor", "Sulekha", 
                                                "Housing", "Square Yard", "OLX", "Real Estate India"
                                              ];
                                              
                                              const offlineCampaignSources = [
                                                "SMS", "Email", "Whatsapp", "Website", "News Paper", "Cold Calling"
                                              ];
                                              
                                              const organicCampaignSources = [
                                                "Walk-In", "Old Client", "Friends", "Relative", "Hoarding", "Reference", "Channel Partner"
                                              ];

                                              const getSourceOptions = () => {
                                                if (leadinfo.campaign === "Online Campaign") {
                                                  return onlineCampaignSources;
                                                } else if (leadinfo.campaign === "Offline Campaign") {
                                                  return offlineCampaignSources;
                                                } else if (leadinfo.campaign === "Organic Campaign") {
                                                  return organicCampaignSources;
                                                } else {
                                                  return [];
                                                }
                                              };
    
    
                                              const[contactdata,setcontactdata]=useState([]);
                                              const fetchdata1=async()=>
                                              {
                                                
                                                try {
                                                  const resp=await api.get('viewcontact')
                                                  setcontactdata(resp.data.contact)
                                         
                                                } catch (error) {
                                                  console.log(error);
                                                }
                                              
                                              }
                                              useEffect(() => {
                                                if (leadinfo.source) { // You can add more checks here if needed
                                                  fetchdata1();
                                                }
                                              }, [leadinfo.source]);



                                              const leadsingleview=(item)=>
                                                {
                                                  navigate('/leadsingleview',{state:item})
                                                }






  return ( 
    <div>
      <Header1/>
      <Sidebar1/>
      <div style={{marginTop:"60px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
        <h3 style={{marginLeft:"10px",cursor:"pointer"}} onClick={()=>window.location.reload()}>Leads</h3>
        <Tooltip title="Export Data.." arrow>
            <button  class="btn btn-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent",border:"none"}}>
            <img src="https://static.thenounproject.com/png/61783-200.png" style={{height:"25px"}} alt=""/>
        </button></Tooltip>
            <ul class="dropdown-menu" id="exporttoexcel"> 
            
            <li  onClick={exportToExcel} >Export Data</li>
              
            </ul>
     
            <Tooltip title="Filter here.." arrow>
             <div   style={{marginLeft:"80%",border:"none",cursor:"pointer"}}><img src="https://static.thenounproject.com/png/4800805-200.png" style={{height:"35px"}}></img></div>
             </Tooltip>
             <button onClick={handleAddColumnClick} className="form-control form-control-sm form-control form-control-sm-sm" style={{width:"150px",marginLeft:"1%",border:"none"}}>Add Fields</button>
      </div>
      <div style={{marginTop:"10px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px"}}>
        <div className="lead" style={{width:"200px",padding:"10px",borderRadius:"10px",}} onClick={fetchdatabystage_incoming}>
          <h6>INCOMING</h6>
          <p>{countincoming}</p>
        </div>
        <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}onClick={fetchdatabystage_prospect}>
          <h6>PROSPECT</h6>
          <p>{countprospect}</p>
        </div>
        <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}} onClick={fetchdatabystage_opportunity}>
          <h6>OPPORTUNITY</h6>
          <p>{countopportunity}</p>
        </div>
        <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}onClick={fetchdatabystage_Negotiation}>
          <h6>NEGOTIATION</h6>
          <p>{countnegotiation}</p>
        </div>
     
        <div className="lead" style={{borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent",border:"none",fontWeight:"bold",marginTop:"-10px"}}>
            CLOSED
        </button>
            <ul class="dropdown-menu">
              <li className="form-control">Won <span style={{fontSize:"30px",color:"green",fontWeight:"bolder"}}><sup>{countwon}</sup></span></li>
              <li className="form-control">Lost <span style={{fontSize:"30px",color:"red",fontWeight:"bolder"}}><sup>{countlost}</sup></span></li>
              <li className="form-control">Unqualified  <span style={{fontSize:"30px",color:"red",fontWeight:"bolder"}}><sup>{countlost}</sup></span></li>
            </ul>
         
        </div>  
        
      </div>
   
 <div style={{marginTop:"10px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px",paddingTop:"10px"}}>

<input id="search" type="text" className="form-control form-control-sm form-control form-control-sm-sm" placeholder="search by email,mobile,company and lead type"  style={{width:"25%"}} onChange={(e)=>setsearchdata(e.target.value)} onKeyDown={handlekeypress1}/>

<div id="action" style={{position:"absolute",marginLeft:"1%",gap:"20px"}}>

<Tooltip title="Delete Data.." arrow>
<img id="delete" src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" onClick={deleteSelectedItems}  style={{height:"50px",width:"50px",cursor:"pointer",display:"none",marginTop:"-2px"}} alt=""/>
</Tooltip>

<Tooltip title="Edit Data.." arrow>
<img id="edit" src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-icon-orange-pencil-0.png" onClick={handleShow1}  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Add to task.." arrow>
<img id="addtask"  src="https://cdn-icons-png.flaticon.com/512/12692/12692378.png" onClick={()=>navigate('/tasksform')}  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Transfer Lead.." arrow>
<img id="transferlead"  src="https://cdn-icons-png.flaticon.com/512/2879/2879440.png" onClick={handleShow5}  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Add User.." arrow>
<img id="adduser"  src="https://cdn-icons-png.flaticon.com/512/9187/9187607.png" onClick={handleShow3}  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Remove User.." arrow>
<img id="removeuser"  src="https://cdn.icon-icons.com/icons2/217/PNG/512/male-user-remove_25351.png" onClick={handleShow3}  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Call.." arrow>
<img id="call"  src="https://static.vecteezy.com/system/resources/previews/016/314/381/non_2x/call-icon-free-png.png" onClick={handleShow3}  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Add Tag.." arrow>
<img id="addtag"  src="https://png.pngtree.com/png-clipart/20230805/original/pngtree-hospital-tag-icon-add-tag-offer-vector-picture-image_9758849.png" onClick={handleShow3}  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Add Remarks/Note.." arrow>
<img id="addremarks"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbdAgrzt5tx31PHUYAp2LXUqr-D2QOwT_sQ&s" onClick={handleShow6}  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Add Document.." arrow>
<img id="adddocument"  src="https://cdn-icons-png.flaticon.com/512/9425/9425017.png" onClick={handleShow7}  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Update Stage.." arrow>
<img id="updatestage"  src="https://thumbs.dreamstime.com/b/two-arrows-d-icon-update-symbol-two-arrows-d-icon-update-symbol-d-recycle-icon-refresh-icon-isolated-white-background-342646057.jpg" onClick={handleShow4}  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

{/* <Tooltip title="Send Mail.." arrow>
<img id="mail"  src="  https://w7.pngwing.com/pngs/7/83/png-transparent-email-computer-icons-internet-graphy-email-miscellaneous-blue-button-icon-thumbnail.png" onClick={handleShow3}  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>
<Tooltip title="Send WhatsApp.." arrow>
<img id="whatsapp"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/479px-WhatsApp_icon.png"  style={{height:"50px",width:"50px",cursor:"pointer",marginTop:"-2px",display:"none",marginLeft:"20px",objectFit:"contain"}}m alt=""/>
</Tooltip>
<Tooltip title="Send Message.." arrow>
<img id="message"  src="https://w7.pngwing.com/pngs/198/585/png-transparent-chatbox-icon-computer-icons-message-sms-icon-message-miscellaneous-grass-online-chat-thumbnail.png"  style={{height:"40px",width:"40px",cursor:"pointer",marginTop:"3px",display:"none",marginLeft:"20px",objectFit:"contain"}} alt=""/>
</Tooltip> */}
<Tooltip title="Send Mail,WhatsApp and Message..." arrow>
<img id="sendall"  src="https://cdn-icons-png.freepik.com/512/7878/7878341.png" onClick={handleShow3}  style={{height:"40px",width:"40px",cursor:"pointer",marginTop:"3px",display:"none",marginLeft:"20px",objectFit:"contain"}} alt=""/>
</Tooltip>
</div>

<div style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"75%",position:"absolute"}}>
      
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

<div style={{ position: 'relative', display: 'inline-block',marginLeft:"65%"}}>
              
              {showColumnList && (
                <div
                  style={{
                    width:"200px",
                    height:"500px",
                    overflow:"scroll",
                   backgroundColor:"gray",
                    position: 'absolute',
                    top: '-165px',
                    left: '300px',
                    border: '1px solid #ccc',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000,
                  }}
                >
                  <ul style={{ listStyleType: 'none', margin: 0, padding: '10px' }}>
                    {allColumns.slice(2).map((col) => (
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
            </div>

      <div style={{marginLeft:"80px",marginTop:"-20px",backgroundColor:"white",top:"100px",position:"sticky",zIndex:10}}>
      <TableContainer component={Paper} style={{ maxHeight: '700px', overflow: 'auto' }}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead style={{ position: "sticky", top: 0, zIndex: 10 }}>
        <TableRow >
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
              style={{ fontFamily: "times new roman", cursor: 'pointer' }}
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
              
            </StyledTableCell>
            <StyledTableCell 
              style={{ padding: "10px", cursor: "pointer", fontFamily: "times new roman" }} 
              onClick={() => leadsingleview(item)}
            >
              {item.title} {item.first_name} {item.last_name}
              <br />
              <SvgIcon component={PhoneIphoneIcon} />
              <span>{item.mobile_no}</span>
              <br />
              <SvgIcon component={EmailIcon} />
              <span>{item.email}</span>
            </StyledTableCell>
            {visibleColumns
              .filter((col) => col.id !== 'personaldetails' && col.id !== 'sno' && col.id !== 'score')
              .map((col) => (
                <StyledTableCell 
                  key={col.id} 
                  style={{ padding: "10px", fontFamily: "times new roman" }}
                >
                   {col.id === 'budget' 
                    ?(
                      <>
                       ₹{item.budget_min} <br></br>  ₹{item.budget_max} 
                       </>
                    )
                    :col.id === 'requirment' 
                    ?(
                      <>
                     
                       {item.requirment}  {item.property_type}  <br></br>  
                       {item.sub_type}  <br></br>  {item.unit_type}
                       </>
                    ): col.id === 'location' 
                    ?(
                      <>
                      {item.area2}  <br></br> 
                      {item.block} <br></br> 
                       {item.city2}  {item.location2}  <br></br> 
                       {item.state2} {item.country2}  {item.pincode2} 
                        
                       </>
                    ): col.id === 'stage' 
                    ?(
                      <>
                      {item.stage} <br />
                      <span 
                        style={{
                          color: item.lead_type === 'Hot' ? 'red' :
                                 item.lead_type === 'Warm' ? 'blue' : 
                                 item.lead_type === 'Cold' ? 'green' : 'black'
                        }}
                      >
                        {item.lead_type}
                      </span>
                    </>
                    ):  col.id === "owner" ? (
                      <>
                        {item.owner.map((owner, index) => (
                          <span key={index}>
                            {owner} ({item.team || ""})
                            <br />
                          </span>
                        ))}
                      </>
                    ) : col.id === "lastcommunication" ? (
                      item[col.id] ? formatRelativeDate(item[col.id]) : "No communication yet" // Format last communication
                    ) :col.id === "createdAt" ? (
                      formatDate(item[col.id]) // Format createdAt date
                    ):  item[col.id]}
                </StyledTableCell>
              ))}
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
  <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"40px",bottom:"0",backgroundColor:"#f8f9fa"}}>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman",color:"GrayText"}}>Summary</h5>
          <h6 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Total Lead <span style={{color:"green",fontSize:"25px"}}>{countall}</span></h6>
          <h6 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Untouched Lead <span style={{color:"red",fontSize:"25px"}}>{countall}</span></h6>
          <h6 style={{lineHeight:"50px",fontFamily:"times new roman"}}>No Followups Lead <span style={{color:"gray",fontSize:"25px"}}>{countall}</span></h6>
          <h6 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Returning Lead <span style={{color:"black",fontSize:"25px"}}>{countall}</span></h6>
          <h6 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Returning No Followup Lead <span style={{color:"#D11414",fontSize:"25px"}}>{countall}</span></h6>
          <h6 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Over Due Task Lead <span style={{color:"#04A9A9",fontSize:"25px"}}>{countall}</span></h6>
          <h6 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Unassigned Lead<span style={{color:"#A90490",fontSize:"25px"}}>{countall}</span></h6>
          
        </footer>
  </div>
         
      
  {/*-------------------edit model start---------------------------edit model start------------------------------------edit model start*/}
          <Modal show={show1} onHide={handleClose1} size='lg'>
            <Modal.Header>
              <Modal.Title>Update Lead</Modal.Title>
            </Modal.Header>
            <Modal.Body>
          
                <div className="d-flex justify-content-between align-items-center experience" style={{fontFamily:"times new roman",fontWeight:"bold"}}>
                <span onClick={leadinfobasic} id="span1" style={{cursor:"pointer"}}>Basic Details</span>
                <span onClick={leadinforequirment} id="span2" style={{cursor:"pointer"}}>Requirment</span>
                <span onClick={leadinfoprofessionaldetails} id="span3" style={{cursor:"pointer"}}> Professional Details</span>
                <span onClick={leadinfopersonaldetails} id="span4" style={{cursor:"pointer"}}> Personal Details</span>
                </div>
                <hr></hr>
              <div className="row mt-2" id="leadinfobasic1">
                    
                    <div className="col-md-3"><label className="labels">Title</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setleadinfo({...leadinfo,title:e.target.value})}>
                        <option>{leadinfo?.title|| ''}</option>
                        <option>Mr.</option>
                        <option>Mrs.</option>
                        <option>Smt.</option>
                        <option>Dr.</option>
                        <option>Er.</option>
                        <option>Sh.</option>
                        <option>col</option>
                        </select>
                        </div>
                    <div className="col-md-4"><label className="labels">Name</label><input type="text" defaultValue={leadinfo?.first_name || ''} required="true" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,first_name:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Surname</label><input type="text" defaultValue={leadinfo?.last_name || ''} className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,last_name:e.target.value})}/></div>
                </div>
                <div className="row mt-3" id="leadinfobasic2">
                    <div className="col-md-4"><label className="labels">Country</label><select required="true" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,country_code:e.target.value})}>
                    <option value="">{leadinfo?.country_code[0] || '+91 India'}</option>
                   {
                   
                    countrycode.map(item=>
                    (
                        <option>{item}</option>
                    )
                    )
                   }
                    </select></div>
                    <div className="col-md-5"><label className="labels">Mobile Number</label><input type="text"  required="true"defaultValue={leadinfo?.mobile_no || ''} className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,mobile_no:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Type</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,mobile_type:e.target.value})}>
                    <option>{leadinfo?.mobile_type || '---Personal---'}</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                    <div className="col-md-9"><label className="labels">Email-Address</label><input type="text" defaultValue={leadinfo?.email[0] || ''} className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,email:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Type</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,email_type:e.target.value})}>
                    <option>{leadinfo?.email_type || '---Personal---'}</option>
                        <option>Personal</option>
                        <option>Office</option>
                        <option>Business</option>
                        </select></div>
                     <div className="col-md-8"><label className="labels">Tags</label><input type="text" defaultValue={leadinfo?.tags || ''} className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,tags:e.target.value})}/></div>
                    <div className="col-md-10"><label className="labels">Descriptions</label><textarea defaultValue={leadinfo?.descriptions || ''} className='form-control form-control-sm' onChange={(e)=>setleadinfo({...leadinfo,descriptions:e.target.value})}/></div>
                    
                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                    <div className="col-md-6"><label className="labels">Stage</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,stage:e.target.value})}>
                    <option>{leadinfo?.stage || '---Select---'}</option>
                    <option>Incoming</option>
                        <option>Prospect</option>
                        <option>Negotiation</option>
                        <option>Oppurtunity</option>
                        <option>Booked</option>
                        <optgroup label="Closed" style={{fontWeight:"bolder",color:"blue"}}>
                        <option style={{color:"green"}}>Won</option>
                        <option style={{color:"red"}}>Lost</option>
                        <option style={{color:"gray"}}>Unqualified </option>
                        </optgroup>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Lead Type</label>
                    <select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,lead_type:e.target.value})}>
                    <option>{leadinfo?.lead_type || '---Select---'}</option>
                        <option>Hot</option>
                        <option>Warm</option>
                        <option>Cold</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Owner</label>
                    {/* <select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,owner:e.target.value})}>
                              <option>{leadData?.owner[0] || '---select---'}</option>
                              <option>Suraj</option> 
                              <option>Suresh Kumar</option>
                              <option>Ramesh Singh</option>
                              <option>Maanav Sharma</option>
                              <option>Sukram</option>
                        </select> */}
                        <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={leadinfo.owner}
                    onChange={handleOwnerChange1}
                    renderValue={(selected) => selected.join(', ')}
                >
                   <MenuItem disabled value="---select---">
                    {leadinfo?.owner || '---select---'}
                </MenuItem>
                    {ownersList.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={leadinfo.owner.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
                        </div>
                    <div className="col-md-6"><label className="labels">Team</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,team:e.target.value})}>
                              <option>{leadinfo?.team || '---select---'}</option> 
                              <option>Sales</option>
                              <option>Marketing</option>
                              <option> Post Sales</option>
                              <option> Pre Sales</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Visible to</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,visible_to:e.target.value})}>
                                <option>{leadinfo?.visible_to || '---Select---'}</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-6"></div>
                   
                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Campegin Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                   
                        <div className="col-md-6"><label className="labels">Campaign</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,campaign:e.target.value})}>
                    <option>{leadinfo?.campaign || '---Select---'}</option>
                        <option>Online Campaign</option>
                        <option>Offline Campaign</option>
                        <option>Organic Campaign</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Source</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,source:e.target.value})}>
                    <option>{leadinfo?.source || '---Select---'}</option>
                    {getSourceOptions().map((source, index) => (
                      <option key={index} value={source}>
                        {source}
                      </option>
                    ))}
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Sub-Source</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,sub_source:e.target.value})}>
                    <option>{leadinfo?.sub_source || '---Select---'}</option>
                        <option>Call</option>
                        <option>Sms</option>
                        <option>Email</option>
                        <option>Whatsapp</option>
                        </select>
                    </div>
                    {(leadinfo.source === "Reference" || leadinfo.source === "Channel Partner" && leadinfo.campaign === "Organic Campaign") && (
                     <>
                     <div className="col-md-5">
                        <label className="labels">Referrer Name</label>
                        <select className="form-control form-control-sm" onChange={(e) => setleadinfo({ ...leadinfo, channel_partner: e.target.value })}>
                          <option>{leadinfo?.refrencer_name || '---Select---'}</option>
                         
                      {
                        contactdata.map((item)=>
                        (
                          <option>{item.title} {item.first_name} {item.last_name}</option>
                        ))
                      }
                        </select>
                      </div>
                  <div className="col-md-1" onClick={handleShow1}><label className="labels">Add</label><button className="form-control form-control-sm">+</button></div>
                  </>
                    )}
                    
                    <div className="col-md-12"><hr></hr></div>
                    {/* <div className="col-md-6"><label className="labels">Intersted Project</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,intrested_project:e.target.value})}>
                    <option>{leadData?.intrested_project || '---Select---'}</option>
                        <option>Suresh Kumar</option>
                        <option>Rakesh Kumar</option>
                        <option>Admin</option>
                        </select>
                    </div> */}
                    </div>
{/* ---------------------------------------leadinfo basic details end ------------------------------------------------------------------------*/}
            

{/*---------------------------------------- leadinfo requirment details start--------------------------------------------------------------- */}
              
              
<div className="row mt-2" id="leadinforequirment" style={{display:"none"}}>
                <div className="col-md-3"><label className="labels">Requirment</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setleadinfo({...leadinfo,requirment:e.target.value})}>
                    <option>Select</option>
                       {
                        requirment.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                       }
                        </select>
                        </div>
                        <div className="col-md-3"><label className="labels">Property Type</label>
                        {/* <select className="form-control form-control-sm" required="true"onChange={(e)=>setleadinfo({...leadinfo,property_type:e.target.value})}>
                    <option>Select</option>
                        {
                            property_type.map(item=>
                                (
                                    <option>{item}</option>
                                )   
                            )
                        }
                        </select> */}
                         <Select
                         className="form-control form-control-sm" style={{border:"none"}}
                          multiple
                          value={leadinfo.property_type}
                          onChange={handleCategoryChange}
                          renderValue={(selected) => selected.join(", ")}
                        >
                          {options.property_type.map((cat) => (
                            <MenuItem key={cat} value={cat}>
                              <Checkbox checked={leadinfo.property_type.includes(cat)} />
                              <ListItemText primary={cat} />
                            </MenuItem>
                          ))}
                        </Select>
                        </div>
                        
                        <div className="col-md-4"><label className="labels" style={{display:"inline-block"}}>Purpose</label><br></br>
                        <input type="radio" name="purpose" value={"End use"} style={{marginRight:"10px"}} onChange={(e)=>setleadinfo({...leadinfo,purpose:e.target.value})}/>End use<input type="radio" name="purpose" value={"Investor"} style={{marginLeft:"20px",marginRight:"10px"}} onChange={(e)=>setleadinfo({...leadinfo,purpose:e.target.value})}/>Investor
                        </div>
                        <div className="col-md-2"><label className="labels" >NRI</label><br></br>
                        <input type="checkbox" value={"Yes"} style={{marginRight:"10px"}} onChange={(e)=>setleadinfo({...leadinfo,nri:e.target.value})}/>Yes
                        </div>
                        <div className="col-md-6"><label className="labels">Sub Type</label>
                        
                        <Select
                        className="form-control form-control-sm" style={{border:"none"}}
                      multiple
                      value={leadinfo.sub_type}
                      onChange={handleSubcategoryChange}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {getAvailableSubcategories().map((sub) => (
                      <MenuItem key={sub} value={sub}>
                        <Checkbox checked={leadinfo.sub_type.includes(sub)} />
                        <ListItemText primary={sub} />
                      </MenuItem>
                    ))}
                    </Select>
                    </div>
                    
                    <div className="col-md-6"><label className="labels">Unit Type</label>
                    <Select
                        className="form-control form-control-sm" style={{border:"none"}}
                      multiple
                      value={leadinfo.unit_type}
                      onChange={handleUnitTypeChange}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {getAvailableunittype().map((sub) => (
                      <MenuItem key={sub} value={sub}>
                        <Checkbox checked={leadinfo.unit_type.includes(sub)} />
                        <ListItemText primary={sub} />
                      </MenuItem>
                    ))}
                    </Select>
                        </div>
                        {leadinfo.requirment === "Rent" && (
                          <>
                            <div id="rentbudgetmin" className="col-md-6">
                              <label className="labels">Budget Min</label>
                              <select
                                className="form-control form-control-sm"
                                onChange={(e) =>
                                  setleadinfo({ ...leadinfo, budget_min: e.target.value })
                                }
                                value={leadinfo.budget_min}
                              >
                                <option>---Select---</option>
                                {budgetOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div id="rentbudgetmax" className="col-md-6">
                              <label className="labels">Budget Max</label>
                              <select
                                className="form-control form-control-sm"
                                onChange={(e) =>
                                  setleadinfo({ ...leadinfo, budget_max: e.target.value })
                                }
                                value={leadinfo.budget_max}
                              >
                                <option>---Select---</option>
                                {filteredMaxBudgetOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </>
                        )}

                        {leadinfo.requirment === "Buy" && (
                       <>
                        <div id="buybudgetmin" className="col-md-6"><label className="labels">Budget Min</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,budget_min:e.target.value})}>
                        <option>---Select---</option>
                        {buyBudgetOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                        </select></div>
                      
                      
                        <div id="buybudgetmax" className="col-md-6"><label className="labels">Budget Max</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,budget_max:e.target.value})}>
                        <option>---Select---</option>
                        {filteredMaxBudgetOptionsbuy.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                        </select></div>
                        </>
                      )}
                        <div className="col-md-4"><label className="labels">Minimum Area</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,minimum_area:e.target.value})}>
                        <option>Select</option>
                        {areaoptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Maximum Area</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,maximum_area:e.target.value})}>
                        <option>Select</option>
                        {filteredarea.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                
                        </select></div>
                   
                        <div className="col-md-4"><label className="labels">Area Metric</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,area_metric:e.target.value})} >
                      
                        <option>Sq Yard</option>
                        <option>Marla</option>
                        <option>Acre</option>
                        <option>Sq Feet</option>
                        <option>Kanal</option>
                        </select></div> 
                        <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Location Details</label></div>
                       
                        <div className="row" id="search_location" style={{border:"1px solid black",margin:"5px",padding:"10px"}}>
                        <div style={{display:"flex",gap:"50px",border:"1px solid gray",padding:"5px",borderRadius:"50px",marginLeft:"20%"}}>
                             <div  id='selectlocation' onClick={selectlocation} style={{cursor:'pointer',fontWeight:"bold",backgroundColor:"black",color:"white",borderRadius:"50px",width:"150px",textAlign:"center",transition:"0.5s ease-out"}}>Select Location </div>
                             <div  id='searchlocation' onClick={searchlocation} style={{cursor:'pointer',fontWeight:"bold",transition:"0.5s ease-out"}}>Search Loacation</div>
                             
                         </div>

                           <div className="row" id="select_location" style={{margin:"5px",padding:"10px"}}>
                        <div className="col-md-5"><label className="labels">Country</label>
                        <select  className="form-control form-control-sm"  onChange={(e)=>setleadinfo({...leadinfo,country2:e.target.value})}>
                        <option>{leadinfo.country2}</option>
                    {asianCountries.map((country, index) => (
                      <option key={index} value={country.toLowerCase().replace(/\s+/g, '-')}>
                        {country}
                      </option>
                    ))}
                          </select>
                        </div>
                       
                        <div className="col-md-5"><label className="labels">State</label><select type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,state2:e.target.value})}>
                        <option value="">{leadinfo.state2}</option>
                      {states.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                          </select>
                        </div>
                        <div className="col-md-2"></div>

                        <div className="col-md-5"><label className="labels">City</label>
                        {/* <select  className="form-control form-control-sm"  onChange={(e)=>setleadinfo({...leadinfo,city2:e.target.value})}>
                          <option>---select country---</option>
                          <option>India</option>
                          </select> */}
                             <select
                    className="form-control form-control-sm"
                    value={leadinfo.city2}
                    onChange={(e)=>setleadinfo({...leadinfo,city2:e.target.value})}
                    disabled={!leadinfo.state2 || cities.length === 0} // Disable if no state or invalid state
                  >
                    <option value="">--Select City--</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                        </div>
                        <div className="col-md-5">
                      <label className="labels">Area/Project</label>
                      <Select
                        className="form-control form-control-sm"
                        multiple
                        value={leadinfo.area2}
                        onChange={handleprojectchange}
                        style={{ border: 'none' }}
                        renderValue={(selected) => selected.join(', ')}
                        label="Area/Project"
                      >
                        {/* "Select All" MenuItem */}
                        <MenuItem value="select-all">
                          <Checkbox checked={leadinfo.area2.length === allproject.length} />
                          <ListItemText primary="--- Select All ---" />
                        </MenuItem>

                        {/* Individual Project MenuItems */}
                        {allproject.map((project) => (
                          <MenuItem key={project} value={project}>
                            <Checkbox checked={leadinfo.area2.indexOf(project) > -1} />
                            <ListItemText primary={project} />
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="col-md-5">
                        <label className="labels">Block</label>
                        <Select
                          className="form-control form-control-sm"
                          multiple
                          value={leadinfo.block}
                          onChange={handleallblockchange}
                          style={{ border: "none" }}
                          renderValue={(selected) => selected.join(', ')}
                          label="Block"
                        >
                          {/* "Select All" MenuItem */}
                          <MenuItem value="select-all">
                            <Checkbox checked={leadinfo.block.length === allblocks.length} />
                            <ListItemText primary="--- Select All ---" />
                          </MenuItem>

                          {/* Individual Block MenuItems */}
                          {allblocks.map((project) => (
                            <MenuItem key={project.block_name} value={project.block_name}>
                              <Checkbox checked={leadinfo.block.indexOf(project.block_name) > -1} />
                              <ListItemText primary={project.block_name} />
                            </MenuItem>
                          ))}
                        </Select>
                      </div>
                        <div className="col-md-5"><label className="labels">Specific Unit</label><input type="text" value={leadinfo.specific_unit} className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,specific_unit:e.target.value})}/></div>
                    </div>

                       <div className="row" id="search_location1" style={{margin:"5px",padding:"10px",display:"none"}}>
                        <div className="col-md-8"><label className="labels">Search Location</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,search_location:e.target.value})}/></div>
                        <div className="col-md-4"></div>
                        <div className="col-md-8"><label className="labels">Street Address</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,street_address:e.target.value})}/></div>
                        <div className="col-md-4"></div>
                    <div className="col-md-3"><label className="labels">City</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,city2:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Area</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,area2:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Block</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,block:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Pin Code</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,pincode2:e.target.value})}/></div>
                    
                    <div className="col-md-3"><label className="labels">Country</label><input type="text" className="form-control form-control-sm"  onChange={(e)=>setleadinfo({...leadinfo,country2:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">State</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,state2:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Lattitude</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,lattitude:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Longitude</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,longitude:e.target.value})}/></div>
                    {/* <div className="col-md-4"><label className="labels">Location</label><input type="text" className="form-control form-control-sm" /></div> */}
                    </div>
                    </div>
                    
                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Other Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                    
                   
                    <div className="col-md-4"><label className="labels">Facing</label>
                    <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={facings}
                    onChange={handlefacingChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                   {/* <MenuItem disabled value="---select---">
                    {leadData?.facing || '---select---'}
                </MenuItem> */}
                 <MenuItem value="select-all">
                    <Checkbox checked={facings.length === facing.length} />
                    <ListItemText
                      primary={leadinfo?.facing || '---select all---'} // Display leadData.matched_deal or fallback to '---select---'
                    />
                  </MenuItem>
                    {facing.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={facings.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
                    </div>
                    <div className="col-md-4"><label className="labels">Road</label>
                    <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={roads}
                    onChange={handleroadChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                   {/* <MenuItem disabled value="---select---">
                    {leadData?.road || '---select---'}
                </MenuItem> */}
                <MenuItem value="select-all">
                    <Checkbox checked={roads.length === road.length} />
                    <ListItemText
                      primary={leadinfo?.road || '---select all---'} // Display leadData.matched_deal or fallback to '---select---'
                    />
                  </MenuItem>
                    {road.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={roads.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
                    </div>
                    <div className="col-md-4"><label className="labels">Funding</label>
                    <select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,funding:e.target.value})}>
                    <option>Select</option>
                   {
                    funding.map(item=>
                        (
                            <option>{item}</option>
                        )
                    )
                   }
                        </select>
                    </div>
                   
                    <div className="col-md-4"><label className="labels">Timeline</label>
                    <select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,timeline:e.target.value})}>
                    <option>Select</option>
                      {
                        timeline.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                      }
                        </select>
                    </div>
                  
                
                   
                
                    <div className="col-md-4"><label className="labels">Furnishing</label>
                    <select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,furnishing:e.target.value})}>
                    <option>Select</option>
                       {
                        furnishing.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                       }
                        </select>
                    </div>     
                    <div className="col-md-4"></div>

                    <div className="col-md-4"><label className="labels">Transaction Type</label>
                    <select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,transaction_type:e.target.value})}>
                    <option>Select</option>
                     {
                        transaction_type.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                     }
                        </select>
                    </div>

                    
                     
                      {/* Conditionally render the progress bar */}
                      {leadinfo.transaction_type === "Flexiable" && (
                        <div className="col-md-8">
                           <label className="labels">White Portion</label>
                        <div className="progress-container" style={{height:"20px"}} onMouseDown={handleMouseDown}>
                          <div className="progress-bar"  style={{width: `${progress}%`,height:"20px",backgroundColor: progress >= 75 ? "green" : progress >= 50 ? "yellow" : "red",  }}/>
                          <div className="progress-percentage">{Math.round(progress)}%</div>
                        </div>
                        </div>
                      )}
                  


                    <div className="col-md-4"><label className="labels">Send Matched Deal</label>
                    <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={matchdeals}
                    onChange={handlematcheddealChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                   <MenuItem value="select-all">
                    <Checkbox checked={matchdeals.length === matchdeal.length} />
                    <ListItemText
                      primary={leadinfo?.matched_deal || '---select all---'} // Display leadData.matched_deal or fallback to '---select---'
                    />
                  </MenuItem>
                    {matchdeal.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={matchdeals.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
                    </div> 
                    
                </div>
 {/*==========--------------------------============-----------================= leadinfo professional details start=============-------------==============-------------=======------ */}
         
         
 <div className="row mt-2" id="leadinfoprofessional" style={{display:"none"}}>
                     <div className="col-md-5"><label className="labels">Profession Category</label>
                     <select className="form-control form-control-sm"  onChange={handleProfessionCategoryChange} >
                                <option>{leadinfo?.profession_subcategory || '---Select---'}</option>
                                {professtiondetails.profession_category.map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                        </select>
                    </div>
                    <div className="col-md-7"><label className="labels">Profession Sub-Category</label>
                    <select className="form-control form-control-sm"  onChange={handleProfessionSubcategoryChange} >
                                <option>{leadinfo?.profession_subcategory || '---Select---'}</option>
                                {availableSubcategories.map((subcategory) => (
                                <option key={subcategory} value={subcategory}>
                                  {subcategory}
                                </option>
                              ))}
                        </select>
                    </div>
                    <div className="col-md-5"><label className="labels">Designation</label>
                    <select className="form-control form-control-sm" onChange={handleDesignationChange}>
                    <option>{leadinfo?.designation || '---Select---'}</option>
                    {availableDesignations.map((designation) => (
                      <option key={designation} value={designation}>
                              {designation}
                            </option>
                        ))}
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Company/Organisation/Department Name</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,company_name:e.target.value})}>
                    <option>{leadinfo?.company_name || '---Select---'}</option>
                    <option>---Select company---</option>
                      {
                        cdata.map((item)=>
                        (
                          <option>{item.name}</option>
                        ))
                      }
                        </select>
                    </div>
                    <div className="col-md-1"><label className="labels">Add</label><button className="form-control form-control-sm" onClick={()=>{navigate('/addcompany')}}>+</button></div>
                  
                    <div className='col-md-12'><hr></hr></div>  

                     </div>

 {/*-------------+++++++++++++++++++++++++--------------========= leadinfo professional end================---------------------===============-------- */}


{/*=====================--------------------- leadinfo personal start-------------------------------------------============================= */}
     <div className="row mt-2" id="leadinfopersonal" style={{display:"none"}}>
                     <div className="col-md-12"><label className="labels">Father/Husband name</label><input type="text" className="form-control form-control-sm" defaultValue={data1.father_husband_name} onChange={(e)=>setleadinfo({...leadinfo,father_husband_name:e.target.value})}/></div>

                            <div className="col-md-3"><label className="labels">H.No</label><input type="text" className="form-control form-control-sm" defaultValue={data1.h_no} onChange={(e)=>setleadinfo({...leadinfo,h_no:e.target.value})}/></div>
                            <div className="col-md-9"><label className="labels">Area</label><input type="text" className="form-control form-control-sm" defaultValue={data1.area1} onChange={(e)=>setleadinfo({...leadinfo,area1:e.target.value})}/></div>

                            <div className="col-md-4"><label className="labels">Location</label><input type="text" className="form-control form-control-sm" defaultValue={data1.location1} onChange={(e)=>setleadinfo({...leadinfo,location1:e.target.value})}/></div>
                            <div className="col-md-4"><label className="labels">City</label><input type="text" className="form-control form-control-sm" defaultValue={data1.city1} onChange={(e)=>setleadinfo({...leadinfo,city1:e.target.value})} /></div>
                            <div className="col-md-4"><label className="labels">Pin Code</label><input type="text" className="form-control form-control-sm" defaultValue={data1.pincode1} onChange={(e)=>setleadinfo({...leadinfo,pincode1:e.target.value})}/></div>

                            <div className="col-md-6"><label className="labels">State</label><input type="text" className="form-control form-control-sm" defaultValue={data1.country1} onChange={(e)=>setleadinfo({...leadinfo,country1:e.target.value})}/></div>
                            <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control form-control-sm" defaultValue={data1.state1} onChange={(e)=>setleadinfo({...leadinfo,state1:e.target.value})} /></div>

                            <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Other Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                            <div className="col-md-5"><label className="labels">Gender</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,gender:e.target.value})}>
                                        <option>{data1.gender}</option>
                                        <option>Select</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Others</option>
                                </select>
                            </div>
                            <div className="col-md-7"><label className="labels">Maritial Status</label>< select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,maritial_status:e.target.value})}>
                                    <option>{data1.maritial_status}</option>
                                    <option>Select</option>
                                    <option>Married</option>
                                    <option>Unmarried</option>
                                    <option>Single</option>
                                </select>
                            </div>

                            <div className="col-md-5"><label className="labels">Birth Date</label><input type="text" className="form-control form-control-sm" defaultValue={data1.birth_date} onChange={(e)=>setleadinfo({...leadinfo,birth_date:e.target.value})}/></div>
                            <div className="col-md-7"><label className="labels">Anniversary Date</label><input type="text" className="form-control form-control-sm" defaultValue={data1.anniversary_date} onChange={(e)=>setleadinfo({...leadinfo,anniversary_date:e.target.value})}/></div>

                            <div className="col-md-3"> <label className="labels">Education</label>
                                
                                    {
                                        Array.isArray(leadinfo.education) ?
                                    leadinfo.education.map((name, index) => (
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
                                    )):[]
                                  }
                                </div>
                            <div className="col-md-3"><label className="labels">Degree</label>
                            {
                                Array.isArray(leadinfo.degree) ?
                            leadinfo.degree.map((name, index) => (
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
                                    )):[]
                                  }
                            </div>
                            <div className="col-md-4"><label className="labels">School/College/University</label>
                            {
                                Array.isArray(leadinfo.school_college) ?
                            leadinfo.school_college.map((name, index) => (
                                        <div key={index} style={{marginTop:"10px"}}>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            defaultValuevalue={data1.school_college[index]}
                                            onChange={(event) => handleschool_collegeChange(index, event)}
                                        />
                                        
                                        </div>
                                    )):[]
                                  }                    
                            </div>
                            <div className="col-md-1" style={{marginTop:"90px"}}>
                            {
                                Array.isArray(leadinfo.action4) ?
                            leadinfo.action4.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall4(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                            )):[]
                            }
                            </div>
                            <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn4}>+</button></div>

                            <div className="col-md-4"><label className="labels">Loan</label>
                            {
                                  Array.isArray(leadinfo.loan) ?
                            leadinfo.loan.map((item,index)=>
                            (
                                <select type="text"
                                style={{marginTop:"10px"}}
                                className="form-control form-control-sm" 
                                onChange={(event)=>handleloanchange(index,event)}
                                >
                                <option>{data1.loan[index]}</option><option>Select</option><option>Home Loan </option><option>Auto Loan</option><option>Personal Loan </option>
                                <option>Education Loan</option> <option>Agriculture Loan </option> <option>Credit Card Loan</option>
                                </select>
                            )):[]
                            }
                            </div>
                            <div className="col-md-3"><label className="labels">Bank</label>
                            {
                                  Array.isArray(leadinfo.bank) ?
                            leadinfo.bank.map((item,index)=>
                            (
                                <select type="text" 
                                style={{marginTop:"10px"}}
                                className="form-control form-control-sm"
                                onChange={(event)=>handlebankchange(index,event)}
                                >
                                  <option>{data1.bank[index]}</option>
                                <option>Select</option>
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
                            )):[]

                            }
                            </div>
                            <div className="col-md-3"><label className="labels">Amount</label>
                            {
                                  Array.isArray(leadinfo.amount) ?
                            leadinfo.amount.map((item,index)=>
                            (
                                <input type="text" 
                                style={{marginTop:"10px"}}
                                defaultValue={data1.amount[index]}
                                className="form-control form-control-sm"
                                onCanPlay={(event)=>handleamountchange(index,event)} />
                            )):[]
                            }
                            </div>
                            <div className="col-md-1" style={{marginTop:"90px"}}>
                            {
                                Array.isArray(leadinfo.action5) ?
                            leadinfo.action5.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall5(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                            )):[]
                            }
                            </div>
                            <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn5}>+</button></div>


                            <div className="col-md-4"><label className="labels">Social Media</label>
                            {
                                  Array.isArray(leadinfo.social_media) ?
                            leadinfo.social_media.map((item,index)=>
                            (
                                <select
                                className='form-control form-control-sm'
                                style={{marginTop:"10px"}}
                                onChange={(event)=>handlesocial_mediachange(index,event)}>
                                <option>{data1.social_media[index]}</option>
                                <option>select</option>
                                <option>Facebook</option><option>Twitter</option><option>Instagram</option><option>Linkdin</option><option>Google</option>
                                </select>

                            )):[]
                            }
                            </div>
                            <div className="col-md-6"><label className="labels">Url</label>
                            {
                                  Array.isArray(leadinfo.url) ?
                            leadinfo.url.map((item,index)=>
                            (
                                <input type="text" className="form-control form-control-sm" style={{marginTop:"10px"}} 
                                defaultValue={data1.url[index]}
                                onChange={(event)=>handleurlChange(index,event)}/>
                            )):[]
                            }
                            </div>
                            <div className="col-md-1" style={{marginTop:"90px"}}>
                            {
                                Array.isArray(leadinfo.action6) ?
                            leadinfo.action6.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall6(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                            )):[]
                            }
                            </div>
                            <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn6}>+</button></div>

                            <div className="col-md-4"><label className="labels">Income</label>
                            {
                                  Array.isArray(leadinfo.income) ?
                            leadinfo.income.map((item,index)=>
                            (
                                <select
                                className='form-control form-control-sm'
                                style={{marginTop:"10px"}}
                                onChange={(event)=>handleincomechange(index,event)}>
                            <option>{data1.income[index]}</option>
                            <option>select</option>
                            <option>Personal Income</option><option>Business Income</option>
                            </select>
                            )):[]
                            }
                            </div>
                            <div className="col-md-6"><label className="labels">Amount</label>
                            {
                                  Array.isArray(leadinfo.amount1) ?
                            leadinfo.amount1.map((item,index)=>
                            (
                                <input type="text" 
                                style={{marginTop:"10px"}}
                                defaultValue={data1.amount1[index]}
                                className="form-control form-control-sm" 
                                onChange={(event)=>handleamount1change(index,event)}
                                />
                            )):[]
                            }
                            </div>
                            <div className="col-md-1" style={{marginTop:"90px"}}>
                            {
                                Array.isArray(leadinfo.action7) ?
                            leadinfo.action7.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall7(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                            )):[]
                            }
                            </div>
                            <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn7}>+</button></div>

                            <div className="col-md-3"><label className="labels">Document No.</label>
                            {
                                  Array.isArray(leadinfo.document_no) ?
                            leadinfo.document_no.map((item,index)=>
                            (
                                <input type="text" 
                                style={{marginTop:"10px"}}
                                className="form-control form-control-sm" 
                                defaultValue={data1.document_no[index]}
                                onChange={(event)=>handledocumentnochange(index,event)}
                                />
                            )):[]
                            }
                            </div>
                            <div className="col-md-3"><label className="labels">Document Name</label>
                            {
                                  Array.isArray(leadinfo.document_name) ?
                            leadinfo.document_name.map((item,index)=>
                            (
                                <select
                                className='form-control form-control-sm'
                                style={{marginTop:"10px"}}
                                onChange={(event)=>handledocumentnamechange(index,event)}>
                            <option>{data1.document_name[index]}</option>
                            <option>select</option>
                            <option>Adhar Card </option><option>Pan Card </option><option>Driviing Licence</option><option>Voter Card</option>
                            <option>Ration Card</option><option>Family Id </option><option>Passoport</option><option>Employee Id Card</option>
                            </select>
                            )):[]
                            }
                            </div>
                            {/* <div className="col-md-4"><label className="labels">Document Picture</label>
                            {
                                  Array.isArray(leadinfo.document_pic) ?
                            leadinfo.document_pic.map((item,index)=>
                            (
                              
                                <input type="file" 
                                style={{marginTop:"10px"}}
                                className="form-control form-control-sm" 
                                onChange={(event)=>handledocumentpicchange(index,event)}
                                />
                                
                            )):[]
                            
                            }
                            
                            </div> */}
                            <div className="col-md-4">
                              <label className="labels">Document Picture</label>
                              {
                                Array.isArray(leadinfo.document_pic) ? 
                                leadinfo.document_pic.map((item, index) => (
                                  <div key={index} style={{marginTop:"10px"}}>
                                    {/* Show the image if it's available */}
                                    {item && (
                                      <img 
                                        // src={typeof item === 'string' ? item : URL.createObjectURL(item)} 
                                        src={`${item}`}
                                        alt="document preview" 
                                        style={{width: "50px", height: "50px", objectFit: "cover", marginBottom: "10px"}}
                                      />
                                    )}
                                    {/* Input for uploading a new image */}
                                    <input 
                                      type="file" 
                                      className="form-control form-control-sm" 
                                      onChange={(event) => handledocumentpicchange(index, event)} 
                                    />
                                  </div>
                                )) : []
                              }
                            </div>
                              
                            <div className="col-md-1" style={{marginTop:"90px"}}>
                            {
                              Array.isArray(leadinfo.action8) ?
                            leadinfo.action8.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall8(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                            )):[]
                            }
                            </div>
                            <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn8}>+</button></div>

                     </div>
 {/*==================================================== leadinfo personal end======================================================= */}
                 
                           
        
   
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={updatelead}>
                Update
              </Button>
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

{/*-------------------edit model end---------------------------edit model end------------------------------------edit model end */}

          {/* <Modal show={show2} onHide={handleClose2} size='xl'>
            <Modal.Header>
              <Modal.Title>Lead Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>




              
            
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose2}>
                Close
              </Button>
            </Modal.Footer>
          </Modal> */}

          <Modal show={show3} onHide={handleClose3} size='lg'>
            <Modal.Header>
              <Modal.Title>Send</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{width:"100%"}}>
        <div style={{display:"flex", gap:"100px"}}>
          <div style={{cursor:"pointer"}} id="sendmail1" onClick={sendmailfunction}>Send Mail</div> 
          <div style={{cursor:"pointer"}} id="sendmessage1" onClick={sendmessagefunction}>Send Message</div>
          <div style={{cursor:"pointer"}} id="sendwhatsapp1" onClick={sendwhatsappfunction}>Send WhatsApp</div>
   
        </div>
        <div className="col-md-12"><hr></hr></div>
  
   {/* <div className="row mt-2" id="sendmail" style={{display:"none"}}>
    <div className="col-md-12" style={{color:"green",textAlign:"center",fontWeight:"bolder"}}> Send Mail</div>
    <div className="col-md-12"><hr></hr></div>
       <div className="col-md-12"><label className="labels">Recipients</label><input type="text" required="true" className="form-control form-control-sm" defaultValue={emails} /></div>
       <div className="col-md-12"><label className="labels">Subject</label><input type="text" required="true" className="form-control form-control-sm" onChange={(e)=>setsubject(e.target.value)}/></div>
       <div className="col-md-12"><label className="labels">Compose</label><textarea className="form-control form-control-sm" value={message}  placeholder="Enter Your Message" style={{height:"100px"}} onChange={e => setmessage(prevProfile => ({ ...prevProfile, message: e.target.value }))}/></div>
       <div className="col-md-4"><label className="labels">Templates</label>
       <select type="text" required="true" className="form-control form-control-sm" value={selectedTemplate} onChange={handleTemplateSelect}>
          <option value="">---Select Template---</option>
          <option value="template1">Template 1</option>
          <option value="template2">Template 2</option>
          <option value="template3">Template 3</option>
        </select>
       </div>

       <div className="col-md-4" {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '10px', cursor: 'pointer',margin:"10px" }}>
        <input {...getInputProps()} />
        <p>Drag & drop files here, or click to select files</p>
        <ul>
          {attachments.length > 0 && attachments.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
   </div> */}

<div className="row mt-2" id="sendmail" style={{fontSize:"12px",display:"none"}}>
      <div className="col-md-12" style={{color:"green",textAlign:"center",fontWeight:"bolder",fontSize:"1vw"}}> Send Mail</div>
          {/* <div className="col-md-12"><label className="labels">Recipients</label><input type="text" required="true" className="form-control form-control-sm" defaultValue={lead.email} /></div> */}
          <div className="col-md-12" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
           <input type="text" style={{border:"none",fontSize:"12px",borderBottom:"1px solid gray"}} required="true" className="form-control form-control-sm" placeholder='subject' value={subject} onChange={(e)=>setsubject(e.target.value)}/>
      
          </div>
         
   
          <div className="col-md-12" style={{marginTop:"5px"}}>
             <ReactQuill
           modules={modules1}  // Add the toolbar options for formatting
           style={{ height: '80px', width: '100%',fontSize:"12px",marginTop:"5px"}}
           className="my-quill-editor"
           value={message}   placeholder="Enter Your Message"  onChange={handlemailmessage}/>
           </div>
          <div className="col-md-4" style={{fontSize:"12px",marginTop:"40px"}}><label className="labels" style={{fontSize:"12px"}}>Templates</label>
          <select type="text" required="true" className="form-control form-control-sm" value={selectedTemplate} onChange={handleTemplateSelect} style={{fontSize:"12px"}}>
             <option value="">---Select Template---</option>
             <option value="template1">Template 1</option>
             <option value="template2">Template 2</option>
             <option value="template3">Template 3</option>
           </select>
          </div>
   
          <div className="col-md-4" {...getRootProps()} style={{ border: '1px dashed #ccc',marginTop:"60px", cursor: 'pointer' }}>
           <input {...getInputProps()} />
           <p style={{fontSize:"12px"}}>Drag & drop files here, or click to select files</p>
           <ul>
             {attachments.length > 0 && attachments.map((file, index) => (
               <li key={index}>{file.name}</li>
             ))}
           </ul>
         </div>
         {/* <div className='col-md-2' style={{marginTop:"70px",marginLeft:"50px"}}><button className='form-control form-control-sm' onClick={sendmail}>send</button></div> */}
      </div>

   <div className="row mt-2" id="sendmessage" style={{display:"none"}}>
   <div className="col-md-12" style={{color:"green",textAlign:"center",fontWeight:"bolder"}}> Send Message</div>
    </div>

    <div className="row mt-2" id="sendwhatsapp" style={{display:"none"}}>
    <div className="col-md-12" style={{color:"green",textAlign:"center",fontWeight:"bolder"}}> Send WhatsApp</div>
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

          <Modal show={show4} onHide={handleClose4} size='lg'>
            <Modal.Header>
              <Modal.Title>Update Stage</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{width:"100%"}}>
   
  
   <div className="row mt-2">
   <div className="col-md-6"><label className="labels">From</label><select className="form-control form-control-sm" onChange={(e)=>setupdatestage(e.target.value)}>
                      
                        <option>{leaddata.stage}</option>
                        </select>
                    </div>
<div className="col-md-6"></div>
   <div className="col-md-6"><label className="labels">To</label><select className="form-control form-control-sm" onChange={(e)=>setupdatestage(e.target.value)}>
                        
                        <option>---Select---</option>
                        <option>Incoming</option>
                        <option>Prospect</option>
                        <option>Negotiation</option>
                        <option>Booked</option>
                        <option>Won</option>
                        <option>Lost</option>
                        <option>Closed</option>
                        </select>
                    </div>
   </div>
</div>
          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={updatestageoflead}>
                Update Stage
              </Button>
              <Button variant="secondary" onClick={handleClose4}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>


          <Modal show={show5} onHide={handleClose5} size='lg'>
            <Modal.Header>
              <Modal.Title>Transfer Lead</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="col-md-6"><label className="labels">From</label>
                  
                    <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={owners1}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {leaddata.owner?.map((owner, index) => (
                    <MenuItem key={index} value={owner}>
                      <Checkbox checked={owners1.indexOf(owner) > -1} /> {/* Check if this owner is selected */}
                      <ListItemText primary={owner} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="col-md-6"></div>

              <div className="col-md-6"><label className="labels">To</label>
                  
                  <Select className="form-control form-control-sm" style={{border:"none"}}
                  multiple
                  value={owners}
                  onChange={handleOwnerChange}
                  renderValue={(selected) => selected.join(', ')}
              >
                
                  {ownersList.map((name) => (
                      <MenuItem key={name} value={name}>

                          <Checkbox checked={owners.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                      </MenuItem>
                  ))}
              </Select>
            </div>
          <div className="col-md-6"><label className="labels">Lead Stage</label><select className="form-control form-control-sm" onChange={(e)=>setupdatestage(e.target.value)}>       
                        <option>{leaddata.stage}</option>
                        <option>Incoming</option>
                        <option>Prospect</option>
                        <option>Negotiation</option>
                        <option>Booked</option>
                        <option>Won</option>
                        <option>Lost</option>
                        <option>Closed</option>
                        </select>
            </div>
            <div className="col-md-6"><label className="labels">Note</label>
            <input type="textarea" className="form-control form-control-sm" style={{height:"100px"}} placeholder={leaddata.descriptions} onChange={(e)=>setnote(e.target.value)}/>       
            </div>


  

          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={updatestageoflead}>
                Transfer
              </Button>
              <Button variant="secondary" onClick={handleClose5}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>


          <Modal show={show6} onHide={handleClose6} size='lg'>
            <Modal.Header>
              <Modal.Title>Add Note/Remarks</Modal.Title>
            </Modal.Header>
            <Modal.Body>
         

     
            <div className="col-md-6"><label className="labels">Note</label>
            <input type="textarea" className="form-control form-control-sm" style={{height:"100px"}} placeholder={leaddata.descriptions} onChange={(e)=>setnote(e.target.value)}/>       
            </div>


  

          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={updatestageoflead}>
                Add Note
              </Button>
              <Button variant="secondary" onClick={handleClose6}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>


          <Modal show={show7} onHide={handleClose7} size='lg'>
            <Modal.Header>
              <Modal.Title>Add Documents</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
            <div className="col-md-3"><label className="labels">Document No.</label>
                            {
                               Array.isArray(leaddocument.document_no)?
                               leaddocument.document_no.map((item,index)=>
                            (
                                <input type="text" 
                                style={{marginTop:"10px"}}
                                className="form-control form-control-sm" 
                                onChange={(event)=>handledocumentnochange1(index,event)}
                                />
                            )):[]
                            }
                            </div>
                            <div className="col-md-3"><label className="labels">Document Name</label>
                            {
                               Array.isArray(leaddocument.document_name)?
                            leaddocument.document_name.map((item,index)=>
                            (
                                <select
                                className='form-control form-control-sm'
                                style={{marginTop:"10px"}}
                                onChange={(event)=>handledocumentnamechange1(index,event)}>
                            
                            {/* <option>{leaddata?.document_name[index] || '---Select---'}</option> */}
                             <option>---Select---</option>
                            <option>Adhar Card </option><option>Pan Card </option><option>Driviing Licence</option><option>Voter Card</option>
                            <option>Ration Card</option><option>Family Id </option><option>Passoport</option><option>Employee Id Card</option>
                            </select>
                            )):[]
                            }
                            </div>
                            {/* <div className="col-md-4"><label className="labels">Document Picture</label>
                            {
                            leadinfo.document_pic.map((item,index)=>
                            (
                                <input type="file" 
                                
                                style={{marginTop:"10px"}}
                                className="form-control form-control-sm" 
                                onChange={(event)=>handledocumentpicchange(index,event)}
                                />
                            ))
                            }
                            </div> */}
                            <div className="col-md-4">
                              <label className="labels">Document Picture</label>
                              {Array.isArray(leaddocument.document_pic)
                                ? leaddocument.document_pic.map((pic, index) => 
                                 
                                  <input type="file" 
                                
                                  style={{marginTop:"10px"}}
                                  className="form-control form-control-sm" 
                                  onChange={(event)=>handledocumentpicchange1(index,event)}
                                  />
                                ) 
                                : []}
                            
                             {/* {
                               Array.isArray(leadinfo.document_pic)?
                            leadinfo.document_pic.map((item,index)=>
                            (
                                <input type="file" 
                                
                                style={{marginTop:"10px"}}
                                className="form-control form-control-sm" 
                                onChange={(event)=>handledocumentpicchange(index,event)}
                                />
                            )):[]
                            } */}
                        </div>

                            <div className="col-md-1" style={{marginTop:"90px"}}>
                            {
                               Array.isArray(leaddocument.action81)?
                               leaddocument.action81.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall81(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                            )):[]
                            }
                            </div>
                            <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn81}>+</button></div>
                      </div>
            
              
       


  

          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={updatedocumentoflead}>
                Add Document
              </Button>
              <Button variant="secondary" onClick={handleClose7}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>





          <ToastContainer/>
   </div>
   
    
   );
}

export default Leadfetch;
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import { toast, ToastContainer } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from "react-router-dom";
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
      document.getElementById("mail").style.display="inline-block"
       document.getElementById("whatsapp").style.display="inline-block"
       document.getElementById("message").style.display="inline-block"
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
        document.getElementById("mail").style.display="none"
         document.getElementById("whatsapp").style.display="none"
         document.getElementById("message").style.display="none"
      }
    };
  
    const handleRowSelect = (id) => {
      document.getElementById("delete").style.display="none"
      document.getElementById("edit").style.display="none"
      document.getElementById("mail").style.display="none"
       document.getElementById("whatsapp").style.display="none"
          document.getElementById("message").style.display="none"
      document.getElementById("search").style.display="flex"
      if (selectedItems.includes(id)) {
        setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
      } else {
        setSelectedItems([...selectedItems, id]);
        document.getElementById("delete").style.display="inline-block"
         document.getElementById("edit").style.display="inline-block"
       document.getElementById("mail").style.display="inline-block"
        document.getElementById("whatsapp").style.display="inline-block"
           document.getElementById("message").style.display="inline-block"
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
                        const facing=["East","West","South","North","North East","South East","North West","South West"];
                        const road=["9 mtr road","18 mtr road","24 mtr road"];
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
          
  return ( 
    <div>
      <Header1/>
      <Sidebar1/>
      <div style={{marginTop:"80px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
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
        <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
          <h6>OPPORTUNITY</h6>
          <p></p>
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

<Tooltip title="Send Mail.." arrow>
<img id="mail"  src="  https://w7.pngwing.com/pngs/7/83/png-transparent-email-computer-icons-internet-graphy-email-miscellaneous-blue-button-icon-thumbnail.png" onClick={handleShow3}  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>
<Tooltip title="Send WhatsApp.." arrow>
<img id="whatsapp"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/479px-WhatsApp_icon.png"  style={{height:"50px",width:"50px",cursor:"pointer",marginTop:"-2px",display:"none",marginLeft:"20px",objectFit:"contain"}}m alt=""/>
</Tooltip>
<Tooltip title="Send Message.." arrow>
<img id="message"  src="https://w7.pngwing.com/pngs/198/585/png-transparent-chatbox-icon-computer-icons-message-sms-icon-message-miscellaneous-grass-online-chat-thumbnail.png"  style={{height:"40px",width:"40px",cursor:"pointer",marginTop:"3px",display:"none",marginLeft:"20px",objectFit:"contain"}} alt=""/>
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

      <div style={{marginLeft:"80px",marginTop:"0px",backgroundColor:"white"}}>
      <TableContainer component={Paper} style={{ maxHeight: '400px', overflow: 'auto' }}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead style={{ position: "sticky", top: 0, zIndex: 1 }}>
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
              onClick={() => handleShow2(item)}
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
                       </>
                    ): col.id === 'location' 
                    ?(
                      <>
                       {item.location}   <br></br>  
                       {item.city}  {item.area} <br></br> 
                       {item.block}  {item.pincode} 
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
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Total Lead <span style={{color:"green",fontSize:"25px"}}>{countall}</span></h5>
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
                         <option>{data1.title}</option>
                        <option>Select title</option>
                        <option>Mr.</option>
                        <option>Mrs.</option>
                        <option>Smt.</option>
                        <option>Dr.</option>
                        <option>Er.</option>
                        <option>Sh.</option>
                        <option>col</option>
                        </select>
                        </div>
                    <div className="col-md-4"><label className="labels">Name</label><input type="text" required="true" className="form-control form-control-sm" defaultValue={data1.first_name} onChange={(e)=>setleadinfo({...leadinfo,first_name:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Surname</label><input type="text" className="form-control form-control-sm" defaultValue={data1.last_name} onChange={(e)=>setleadinfo({...leadinfo,last_name:e.target.value})}/></div>
                </div>
                <div className="row mt-3" id="leadinfobasic2">
                    <div className="col-md-4"><label className="labels">Country</label><select required="true" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,country_code:e.target.value})}>
                    <option value="">{data1.country_code}</option>
                    <option value="">select</option>
                   {
                    
                    countrycode.map(item=>
                    (
                      
                        <option>{item}</option>
                    )
                    )
                   }
                    </select></div>
                    <div className="col-md-5"><label className="labels">Mobile Number</label><input type="text" required="true" defaultValue={data1.mobile_no} className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,mobile_no:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Type</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,mobile_type:e.target.value})}>
                      <option>{data1.mobile_type}</option>
                      <option>Select Type</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                    <div className="col-md-9"><label className="labels">Email-Address</label><input type="text" defaultValue={data1.email} className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,email:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Type</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,email_type:e.target.value})}>
                    <option>{data1.email_type}</option>
                    <option>Select Type</option>
                        <option>Personal</option>
                        <option>Office</option>
                        <option>Business</option>
                        </select></div>
                     <div className="col-md-8"><label className="labels">Tags</label><input type="text" defaultValue={data1.tags} className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,tags:e.target.value})}/></div>
                    <div className="col-md-10"><label className="labels">Descriptions</label><textarea className='form-control form-control-sm' defaultValue={data1.descriptions} onChange={(e)=>setleadinfo({...leadinfo,descriptions:e.target.value})}/></div>
                    
                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                    <div className="col-md-6"><label className="labels">Stage</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,stage:e.target.value})}>
                        <option>{data1.stage}</option>
                        <option>Select</option>
                        <option>Incoming</option>
                        <option>Prospect</option>
                        <option>Negotiation</option>
                        <option>Booked</option>
                        <option>Won</option>
                        <option>Lost</option>
                        <option>Closed</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Lead Type</label>
                    <select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,lead_type:e.target.value})}>
                      <option>{data1.lead_type}</option>
                      <option>Select</option>
                        <option>Hot</option>
                        <option>Warm</option>
                        <option>Cold</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Owner</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,owner:e.target.value})}>
                        <option>{data1.owner}</option>
                        <option>Select</option>
                        <option>Suresh Kumar</option>
                        <option>Rajesh kumar</option>
                        <option>Rakesh kumar</option>
                        </select></div>
                    <div className="col-md-6"><label className="labels">Team</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,team:e.target.value})}>
                        <option>{data1.team}</option>
                        <option>Select</option>
                        <option>Suresh Kumar</option>
                        <option>Rajesh Kumar</option>
                        <option>Rakesh Kumar</option>
                        <option>Yogesh Kumar</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Visible to</label><select className="form-control form-control-sm" >
                                <option>{data1.visible_to}</option>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-6"></div>
                   
                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Campegin Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                   
                        <div className="col-md-6"><label className="labels">Campaign</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,campaign:e.target.value})}>
                        <option>{data1.campaign}</option>
                         <option>Select</option>
                        <option>Online Campaign</option>
                        <option>Organic</option>
                        <option>Walk-in</option>
                        <option>Channel Partners</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Source</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,source:e.target.value})}>
                        <option>{data1.source}</option>
                        <option>Select</option>
                        <option>Facebook</option>
                        <option>Instagram</option>
                        <option>99acres</option>
                        <option>Magicbricks</option>
                        <option>Hordings</option>
                        <option>Whatsapp</option>
                        <option>Walk-in</option>
                        <option>Cold Call</option>
                        <option>Refrencer</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Sub-Source</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,sub_source:e.target.value})}>
                        <option>{data1.sub_source}</option>
                         <option>Select</option>
                        <option>Call</option>
                        <option>Sms</option>
                        <option>Email</option>
                        <option>Whatsapp</option>
                        <option>Channel Partner</option>
                        <option>Refrencer</option>
                        </select>
                    </div>
                    
                    <div className="col-md-6"><label className="labels">Refrencer Name</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,refrencer_no:e.target.value})}>
                        <option>{data1.refrencer_no}</option>
                         <option>Select</option>
                        <option>Suresh Kumar</option>
                        <option>Rakesh Kumar</option>
                        <option>Admin</option>
                        </select>
                    </div>
                    <div className="col-md-12"><hr></hr></div>
                    <div className="col-md-6"><label className="labels">Intersted Project</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,intrested_project:e.target.value})}>
                      <option>{data1.intrested_project}</option>
                       <option>Select</option>
                        <option>Suresh Kumar</option>
                        <option>Rakesh Kumar</option>
                        <option>Admin</option>
                        </select>
                    </div>
                    </div>
{/* ---------------------------------------leadinfo basic details end ------------------------------------------------------------------------*/}
            

{/*---------------------------------------- leadinfo requirment details start--------------------------------------------------------------- */}
              
              
                <div className="row mt-2" id="leadinforequirment" style={{display:"none"}}>
                <div className="col-md-3"><label className="labels">Requirment</label><select className="form-control" required="true" onChange={(e)=>setleadinfo({...leadinfo,requirment:e.target.value})}>
                    <option>{data1.requirment}</option>
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
                        <div className="col-md-3"><label className="labels">Property Type</label><select className="form-control" required="true"onChange={(e)=>setleadinfo({...leadinfo,property_type:e.target.value})}>
                        <option>{data1.property_type}</option>
                        <option>Select</option>
                        {
                            property_type.map(item=>
                                (
                                    <option>{item}</option>
                                )   
                            )
                        }
                        </select>
                        </div>
                        
                        <div className="col-md-4"><label className="labels" style={{display:"inline-block"}}>Purpose</label><br></br>
                        <input type="radio" name="purpose" value={"End use"} style={{marginRight:"10px"}} defaultValue={data1.purpose} onChange={(e)=>setleadinfo({...leadinfo,purpose:e.target.value})}/>End use<input type="radio" defaultValue={data1.purpose} name="purpose" value={"Investor"} style={{marginLeft:"20px",marginRight:"10px"}} onChange={(e)=>setleadinfo({...leadinfo,purpose:e.target.value})}/>Investor
                        </div>
                        <div className="col-md-2"><label className="labels" >NRI</label><br></br>
                        <input type="checkbox" value={"Yes"} style={{marginRight:"10px"}} defaultValue={data1.nri} onChange={(e)=>setleadinfo({...leadinfo,nri:e.target.value})}/>Yes
                        </div>
                        <div className="col-md-6"><label className="labels">Sub Type</label><select required="true" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,sub_type:e.target.value})}>
                        <option value="">{data1.sub_type}</option>
                    <option value="">select</option>
                    <option value="93">Afghanistan +93</option>
                    <option value="358">Aland Islands +358</option>
                    <option value="355">Albania +355</option>
                    </select>
                    </div>
                    
                    <div className="col-md-6"><label className="labels">Unit Type</label><select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,unit_type:e.target.value})}>
                        <option>{data1.unit_type}</option>
                        <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                        <div className="col-md-6"><label className="labels">Budget Min</label><select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,budget_min:e.target.value})}>
                        <option>{data1.budget_min}</option>
                        <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>

                        <div className="col-md-6"><label className="labels">Budget Max</label><select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,budget_max:e.target.value})}>
                        <option>{data1.budget_max}</option>
                        <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Minimum Area</label><select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,minimum_area:e.target.value})}>
                        <option>{data1.minimum_area}</option>
                        <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Maximum Area</label><select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,maximum_area:e.target.value})}>
                       <option>{data1.maximum_area}</option>
                        <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Area Metric</label><select className="form-control"onChange={(e)=>setleadinfo({...leadinfo,area_metric:e.target.value})} >
                       <option>{data1.area_metric}</option>
                        <option>Select Type</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div> 
                        <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Location Details</label></div>
                        <div className="row" style={{border:"1px solid black",margin:"5px",padding:"10px"}}>
                        <div className="col-md-8"><label className="labels">Search Location</label><input type="text" className="form-control form-control-sm" defaultValue={data1.search_location} onChange={(e)=>setleadinfo({...leadinfo,search_location:e.target.value})}/></div>
                        <div className="col-md-4"></div>
                        <div className="col-md-8"><label className="labels">Street Address</label><input type="text" className="form-control form-control-sm" defaultValue={data1.street_address} onChange={(e)=>setleadinfo({...leadinfo,street_address:e.target.value})}/></div>
                        <div className="col-md-4"></div>
                    <div className="col-md-3"><label className="labels">City</label><input type="text" className="form-control form-control-sm" defaultValue={data1.city2} onChange={(e)=>setleadinfo({...leadinfo,city2:e.target.value})} /></div>
                    <div className="col-md-3"><label className="labels">Area</label><input type="text" className="form-control form-control-sm" defaultValue={data1.area2} onChange={(e)=>setleadinfo({...leadinfo,area2:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Block</label><input type="text" className="form-control form-control-sm" defaultValue={data1.block} onChange={(e)=>setleadinfo({...leadinfo,block:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Pin Code</label><input type="text" className="form-control form-control-sm" defaultValue={data1.pincode2} onChange={(e)=>setleadinfo({...leadinfo,pincode2:e.target.value})}/></div>
                    
                    <div className="col-md-3"><label className="labels">Country</label><input type="text" className="form-control form-control-sm" defaultValue={data1.country2} onChange={(e)=>setleadinfo({...leadinfo,country2:e.target.value})} /></div>
                    <div className="col-md-3"><label className="labels">State</label><input type="text" className="form-control form-control-sm" defaultValue={data1.state2} onChange={(e)=>setleadinfo({...leadinfo,state2:e.target.value})} /></div>
                    <div className="col-md-3"><label className="labels">Lattitude</label><input type="text" className="form-control" defaultValue={data1.lattitude} onChange={(e)=>setleadinfo({...leadinfo,lattitude:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Longitude</label><input type="text" className="form-control" defaultValue={data1.longitude} onChange={(e)=>setleadinfo({...leadinfo,longitude:e.target.value})}/></div>
                    {/* <div className="col-md-4"><label className="labels">Location</label><input type="text" className="form-control form-control-sm" /></div> */}
                    </div>
                    
                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Other Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                    
                    <div className="col-md-3"><label className="labels">Specific Unit</label><input type="text" className="form-control" defaultValue={data1.specific_unit} onChange={(e)=>setleadinfo({...leadinfo,specific_unit:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Specific Unit Details</label><input type="text" defaultValue={data1.specific_unitdetails} className="form-control" /></div>
                    <div className="col-md-3"><label className="labels">Funding</label>
                    <select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,funding:e.target.value})}>
                   <option>{data1.funding}</option>
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
                    <div className="col-md-3"><label className="labels">Timeline</label>
                    <select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,timeline:e.target.value})}>
                    <option>{data1.timeline}</option>
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
                     <div className="col-md-3"><label className="labels">Facing</label>
                    <select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,facing:e.target.value})}>
                    <option>{data1.facing}</option>
                    <option>Select</option>
                        {
                            facing.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )}
                        </select>
                    </div>
                    <div className="col-md-3"><label className="labels">Road</label>
                    <select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,road:e.target.value})}>
                   <option>{data1.road}</option>
                    <option>Select</option>
                     {
                        road.map(item=>
                            (
                                <option>{item}</option>
                            )
                     )}
                        </select>
                    </div>
                     <div className="col-md-3"><label className="labels">Transaction Type</label>
                    <select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,transaction_type:e.target.value})}>
                   <option>{data1.transaction_type}</option>
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
                    <div className="col-md-3"><label className="labels">Furnishing</label>
                    <select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,furnishing:e.target.value})}>
                   <option>{data1.furnishing}</option>
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
                </div>
 {/*==========--------------------------============-----------================= leadinfo professional details start=============-------------==============-------------=======------ */}
         
         
         <div className="row mt-2" id="leadinfoprofessional" style={{display:"none"}}>
                     <div className="col-md-5"><label className="labels">Profession Category</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,profession_category:e.target.value})}>
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
                    <div className="col-md-7"><label className="labels">Profession Sub-Category</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,profession_subcategory:e.target.value})}>
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
                    <div className="col-md-5"><label className="labels">Designation</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,designation:e.target.value})}>
                    <option>{data1.designation}</option>
                    <option>Select</option>
                    <option>Cashier</option>
                        <option>Partner</option>
                        <option>Proprietor</option>
                        <option>Developer</option>
                        <option>HR</option>
                        <option>Others</option>
                        </select>
                    </div>
                    <div className="col-md-7"><label className="labels">Company/Organisation/Department Name</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,company_name:e.target.value})} >
                    <option>{data1.company_name}</option>
                    <option>Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Others</option>
                        </select>
                    </div>
                    <div className="col-md-4" > <label className="labels">Country Code</label>
                    
                        <select  required="true" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,country_code1:e.target.value})}>
                        <option>{data.country_code1}</option>
                        <option>phone</option>
                        {
                          countrycode.map((item)=>
                          (
                            <option>{item}</option>
                          ))
                        }
                        </select> 
                    </div>
                    <div className="col-md-6" > <label className="labels">Company Phone</label><input type='text' defaultValue={data1.company_phone} onChange={(e)=>setleadinfo({...leadinfo,company_phone:e.target.value})} className='form-control form-control-sm' /></div>
                    <div className="col-md-8" > <label className="labels">Company Email</label><input type='text' defaultValue={data1.company_email} onChange={(e)=>setleadinfo({...leadinfo,company_email:e.target.value})} className='form-control form-control-sm'/></div>
                    <div className="col-md-4" ></div>

                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Company Address</label></div>
                    <div className="row" style={{border:"1px solid black",margin:"5px",padding:"10px"}}>
                    <div className="col-md-8"><label className="labels">Area</label><input type="text" defaultValue={data1.area} onChange={(e)=>setleadinfo({...leadinfo,area:e.target.value})}  className="form-control form-control-sm" /></div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4"><label className="labels">Location</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,location:e.target.value})} defaultValue={data1.location}  /></div>
                    <div className="col-md-4"><label className="labels">City</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,city:e.target.value})} defaultValue={data1.city} /></div>
                    <div className="col-md-4"><label className="labels">Pin Code</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,pincode:e.target.value})} defaultValue={data1.pincode} /></div>
                    <div className="col-md-6"><label className="labels">State</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,state:e.target.value})} defaultValue={data1.state} /></div>
                    <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,country:e.target.value})} defaultValue={data1.country}  /></div>
                    </div>
                    <div className="col-md-7"><label className="labels">Industry</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,industry:e.target.value})} >
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
                      Array.isArray(leadinfo.company_social_media) ?
                      leadinfo.company_social_media.map((item,index)=>
                      (
                        <select
                         className='form-control form-control-sm'
                          style={{marginTop:"10px"}}
                         
                          onChange={(event)=>handlecompanysocialmediachange(index,event)}>
                        
                        <option>{data1.company_social_media[index]}</option><option>select</option>
                        <option>Facebook</option><option>Twitter</option><option>Instagram</option><option>Linkdin</option>
                        </select>

                      )):[]
                    }
                    </div>
                    <div className="col-md-6"><label className="labels">Url</label>
                    {
                          Array.isArray(leadinfo.company_url) ?
                      leadinfo.company_url.map((item,index)=>
                      (
                        <input type="text" className="form-control form-control-sm" style={{marginTop:"10px"}} defaultValue={data1.company_url[index]}
                        onChange={(event)=>handlecompanyurlchange(index,event)}/>
                      )):[]
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      Array.isArray(leadinfo.action3) ?
                      leadinfo.action3.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall3(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      )):[]
                    }
                    </div>
                    <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn3}>+</button></div>
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
                                        src={`${api.defaults.baseURL}${leadinfo.document_pic[index]}`}
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

          <Modal show={show2} onHide={handleClose2} size='lg'>
            <Modal.Header>
              <Modal.Title>Lead Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{border:"1px solid black",padding:"20px"}}>
              <h4 style={{textAlign:"center",fontSize:"20px",fontFamily:"times-new roman"}}>Personal Deatils:</h4><hr></hr>
              <b>Full Name:</b> <span >{data2.title}</span> <span>{data2.first_name} </span><span>{data2.last_name}</span><br></br>
              <b>Mobile no:</b> <span>{data2.country_code}</span> <span>{data2.mobile_no} </span><br></br>
              <b>Email id:</b> <span>{data2.email}</span><br></br>
              <b>Title & Company:</b> <span>{data2.title_company}</span><br></br>
              <b>Designation:</b> <span>{data2.designation}</span><br></br>
              <b>Company Name:</b> <span>{data2.company_name}</span><br></br>
              <b>Tags:</b> <span>{data2.tags}</span><br></br>
              <b>Lead Type:</b> <span>{data2.lead_type}</span><br></br>
              <b>Descriptions:</b> <span>{data2.descriptions}</span><br></br>
              </div>
              <div style={{border:"1px solid black",padding:"20px"}}>
              <h4 style={{textAlign:"center",fontSize:"20px"}}>System Deatils:</h4><hr></hr>
              <b>Team:</b> <span>{data2.team}</span><br></br>
              <b>Owner:</b> <span>{data2.owner}</span><br></br>
              <b>Campaign:</b> <span>{data2.campaign}</span><br></br>
              <b>Source:</b> <span>{data2.source}</span><br></br>
              <b>Sub Source:</b> <span>{data2.sub_source}</span><br></br>
              <b>Stage:</b> <span>{data2.stage}</span><br></br>
              <b>Channel Partner:</b> <span>{data2.refrencer_no}</span><br></br>
              <b>Intersted Project:</b> <span>{data2.intrested_project}</span><br></br>
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

export default Leadfetch;
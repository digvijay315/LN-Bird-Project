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
import Tooltip from '@mui/material/Tooltip';
import api from "../api";
import '../css/deal.css';


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

        const deletedealSelectedItems = async () => {
          try {
            if(selectedItems.length===0)
            {
              toast.error("please select first",{autoClose:"2000"})
              return
            }
            const resp = selectedItems.map(async (itemId) => {
              await api.delete(`removedeal/${itemId}`);
            });
            
            toast.success('Selected items deleted successfully',{autoClose:"2000"})
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } catch (error) {
            console.log(error);
          }
        };


        const deleteprojectSelectedItems = async () => {
          try {
            if(selectedItems2.length===0)
            {
              toast.error("please select first",{autoClose:"2000"})
              return
            }
            const resp = selectedItems2.map(async (itemId) => {
              await api.delete(`deleteproject/${itemId}`);
            });
            
            toast.success('Selected items deleted successfully',{autoClose:"2000"})
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } catch (error) {
            console.log(error);
          }
        };

      

       
         
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
        { id: 'user', name: 'Assigned To' },
        { id: 'remarks', name: 'Remarks' },
        { id: 'follow_up', name: 'Follow Up' },
        { id: 'last_contacted', name: 'Last Contacted Date & Time' },
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
      const [visibleColumns, setVisibleColumns] = useState(allColumns.slice(1, 12));
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

      const fetchdatabystage_open=async()=>
        {
          
          try {
            const resp=await api.get(`viewdealbystage/Open`);
            setdata(Array.isArray(resp.data.deal) ? resp.data.deal : [resp.data.deal]);
          } catch (error) {
            console.log(error);
          }
        }
        const[countopen,setcountopen]=useState('')
        const fetchdatabystage_opencount=async()=>
          {
            
            try {
              const resp=await api.get(`viewdealbystage/Open`);
              const incoming=(Array.isArray(resp.data.deal) ? resp.data.deal : [resp.data.deal]);
              setcountopen(incoming.length);
            } catch (error) {
              console.log(error);
            }
          }
         
        const fetchdatabystage_quote=async(e)=>
          {
            e.preventDefault()
            try {
              const resp=await api.get(`viewdealbystage/Quote`);
               setdata(Array.isArray(resp.data.deal) ? resp.data.deal : [resp.data.deal]);
            } catch (error) {
              console.log(error);
            }
          }
          const[countquote,setcountquote]=useState('')
          const fetchdatabystage_quotecount=async()=>
            {
              
              try {
                const resp=await api.get(`viewdealbystage/Quote`);
                const quote=(Array.isArray(resp.data.deal) ? resp.data.deal : [resp.data.deal]);
                setcountquote(quote.length);
                
              } catch (error) {
                console.log(error);
              }
            }
          
          const fetchdatabystage_Negotiation=async()=>
            {
              
              try {
                const resp=await api.get(`viewdealbystage/Negotiation`);
                setdata(Array.isArray(resp.data.deal) ? resp.data.deal : [resp.data.deal])
              } catch (error) {
                console.log(error);
              }
            }
            const[countnegotiation,setcountnegotiation]=useState('')
            const fetchdatabystage_Negotiationcount=async()=>
              {
                
                try {
                  const resp=await api.get(`viewdealbystage/Negotiation`);
                  const negotiation=Array.isArray(resp.data.deal) ? resp.data.deal : [resp.data.deal]
                  setcountnegotiation(negotiation.length)
                } catch (error) {
                  console.log(error);
                }
              }

              const fetchdatabystage_booked=async()=>
                {
                  
                  try {
                    const resp=await api.get(`viewdealbystage/Booked`);
                    setdata(Array.isArray(resp.data.deal) ? resp.data.deal : [resp.data.deal])
                  } catch (error) {
                    console.log(error);
                  }
                }
                const[countbooked,setcountbooked]=useState('')
                const fetchdatabystage_bookedcount=async()=>
                  {
                    
                    try {
                      const resp=await api.get(`viewdealbystage/Booked`);
                      const booked=Array.isArray(resp.data.deal) ? resp.data.deal : [resp.data.deal]
                      setcountbooked(booked.length)
                    } catch (error) {
                      console.log(error);
                    }
                  }
              const[countwon,setcountwon]=useState('')
              const fetchdatabystage_woncount=async()=>
                {
                  
                  try {
                    const resp=await api.get(`viewdealbystage/Won`);
                    const Won=Array.isArray(resp.data.deal) ? resp.data.deal : [resp.data.deal]
                    setcountwon(Won.length)
                  } catch (error) {
                    console.log(error);
                  }
                }
                const[countlost,setcountlost]=useState('')
                const fetchdatabystage_lostcount=async()=>
                  {
                    
                    try {
                      const resp=await api.get(`viewdealbystage/Lost`);
                      const Lost=Array.isArray(resp.data.deal) ? resp.data.deal : [resp.data.deal]
                      setcountlost(Lost.length)
                    } catch (error) {
                      console.log(error);
                    }
                  }

                  const[countreject,setcountreject]=useState('')
                  const fetchdatabystage_rejectcount=async()=>
                    {
                      
                      try {
                        const resp=await api.get(`viewdealbystage/Lost`);
                        const reject=Array.isArray(resp.data.deal) ? resp.data.deal : [resp.data.deal]
                        setcountreject(reject.length)
                      } catch (error) {
                        console.log(error);
                      }
                    }
  
                   React.useEffect(()=>{fetchdatabystage_opencount()},[])  
                  React.useEffect(()=>{fetchdatabystage_quotecount()},[]) 
                  React.useEffect(()=>{fetchdatabystage_Negotiationcount()},[]) 
                  React.useEffect(()=>{fetchdatabystage_bookedcount()},[])
                  React.useEffect(()=>{fetchdatabystage_woncount()},[]) 
                  React.useEffect(()=>{fetchdatabystage_lostcount()},[])
                  React.useEffect(()=>{fetchdatabystage_rejectcount()},[])


                  const dealallColumns = [
                    { id: 'unit_number', name: 'Unit Number' },
                    { id: 'location', name: 'Project Name' },
                    { id: 'block', name: 'Block' },
                    { id: 'available_for', name: 'For' },
                    { id: 'size', name: 'Size' },
                    { id: 'project_category', name: 'Category' },
                    { id: 'project_subcategory', name: 'Sub Category' },
                    { id: 'expected_price', name: 'Price' }
                  ]

                  const leadallColumns = [
                    { id: 'lead_details', name: 'Lead Details' },
                    { id: 'score', name: 'Score' },
                    { id: 'requirment', name: 'Requirment' },
                    { id: 'budget', name: 'Budget' },
                    { id: 'stage', name: 'Stage' },
                    { id: 'source', name: 'Source' },
                    { id: 'recived_on', name: 'Recived On' },
                    { id: 'site_visit', name: 'Site Visit' },
                    { id: 'owner', name: 'User' }
                  ]
                    
                    
                  const [show1, setshow1] = useState(false);
    
                  const handleClose1 = () => setshow1(false);
                  const handleShow1=async()=>
                  {
                    setshow1(true);
                   
                  }
                  const[deal1,setdeal1]=useState([])
                  const[lead1,setlead1]=useState([])
                  const[deallocation,setdeallocation]=useState("")
                  const handleMatchLeadClick=(item)=>
                  {
                    handleShow1()
                    setdeal1([item])
                    setdeallocation(item.location);
                    setlead1(item.matchedleads)
                  }
               
                  const [selectedItems1, setSelectedItems1] = useState([]); // To track selected rows
                  const [selectAll1, setSelectAll1] = useState(false);
                  const handleSelectAll1 = () => {
                    
                    setSelectAll1(!selectAll1);
                    if (!selectAll1) {
                      // Add all current page item IDs to selectedItems
                      setSelectedItems1(lead1.map((item) => item._id));
                    } else {
                      // Deselect all
                      setSelectedItems1([]);
                   
                    }
                  };
                
                  const handleRowSelect1 = (id) => {
                   
                    if (selectedItems1.includes(id)) {
                      setSelectedItems1(selectedItems1.filter((itemId) => itemId !== id));
                    } else {
                      setSelectedItems1([...selectedItems, id]);
                    
                    }
                  };

                  const [removedColumns, setRemovedColumns] = useState([]);

                  // Track visibility of '-' buttons for column removal
                  const [showRemoveButtons, setShowRemoveButtons] = useState(false);
                
                  // Handle filter icon click to toggle visibility of '-' buttons
                  const handleFilterClick = () => {
                    setShowRemoveButtons((prev) => !prev); // Toggle visibility of '-' buttons
                  };
                
                  // Handle column removal (when `-` icon is clicked)
                  const handleColumnRemove = (colId) => {
                    setRemovedColumns((prev) => [...prev, colId]); // Add the column ID to removedColumns
                  };

                  const[leaddata,setleaddata]=useState([]);
                  const fetchleaddata=async(event)=>
                  {
                    
                    try {
                      const resp=await api.get('leadinfo')
                      const all=(resp.data.lead)
                      setleaddata(all)
                
                    } catch (error) {
                      console.log(error);
                    }
                  
                  }
                  
                  
                  React.useEffect(()=>{fetchleaddata()},[])

           
                  
                  
                  

                 
                  useEffect(() => {
                    const filterLeadsByRemovedColumns = () => {
                       let newFilteredLeads = [...leaddata];
                       const price = deal1[0]?.expected_price;
                       const availableFor = deal1[0]?.available_for === "Sale" ? "Buy" : deal1[0]?.available_for;
                      if(lead1.length!==0){
                      // If the 'price' column is removed, don't filter based on price
                      newFilteredLeads = !removedColumns.includes('price')
                        ? leaddata.filter((item) => item.requirment === availableFor)
                        : leaddata.filter(
                            (item) =>
                              item.requirment === availableFor &&
                              price >= parseFloat(item.budget_min) &&
                              price <= parseFloat(item.budget_max)
                          );
                      
                
                      setlead1(newFilteredLeads); // Update filtered leads
                    };
                  }

                  if(lead1.length==0){
                    let newFilteredLeads = [...leaddata];
                    const availableForFallback =deal1[0]?.available_for === "Sale" ? "Buy" : deal1[0]?.available_for;
                    newFilteredLeads = leaddata.filter((item) =>
                      item.requirment === availableForFallback // Use availableFor as fallback
                    );
                    setlead1(newFilteredLeads);
                  }
              
                    filterLeadsByRemovedColumns(); // Trigger filtering when removedColumns change
                
                  }, [removedColumns]);
                



                  React.useEffect(()=>{fetchcdata()},[])

                  const[cdata,setcdata]=useState([]);
                  const [flattenedUnits, setFlattenedUnits] = useState([]);
                  // const [filteredData, setFilteredData] = useState([]);
                  const[totalproject,settotalproject]=useState()
                  const[totalupcoming,settotalupcoming]=useState()
                  const[totalprelaunch,settotalprelaunch]=useState()
                  const[totalreadytomove,settotalreadytomove]=useState()
                  const[totalunderconstruction,settotalunderconstrction]=useState()
                  const fetchcdata=async(event)=>
                  {
                    
                    try {
                      const resp=await api.get('viewproject')
                      setcdata(resp.data.project)
                      const countproject=Array.isArray(resp.data.project) ? resp.data.project : [resp.data.project]
                      settotalproject(countproject.length)
                    
                      const totalaupcomingproject=resp.data.project.filter(item=>item.status==='Upcoming').length
                      settotalupcoming(totalaupcomingproject)

                      const totalprelaunchproject=resp.data.project.filter(item=>item.status==='Pre Launch').length
                      settotalprelaunch(totalprelaunchproject)

                      const totalreadytomoveproject=resp.data.project.filter(item=>item.status==='Ready to Move').length
                      settotalreadytomove(totalreadytomoveproject)

                      const totalunderconstrctionproject=resp.data.project.filter(item=>item.status==='Under Construction').length
                      settotalunderconstrction(totalunderconstrctionproject)
                      
                      const flattened = [];
                        resp.data.project.forEach((project) => {
                          if (Array.isArray(project.add_unit)) {
                            // Flatten the add_unit array for each project
                            const units = project.add_unit.flatMap((unitArray) => unitArray);
                            flattened.push(...units);  // Add flattened units to the array
                          } else {
                            console.error('add_unit is not an array or is undefined');
                          }
                        });

                        // Now update the flattenedUnits state with the flattened array
                        setFlattenedUnits(flattened);
                
                      // Log the flattened units
                    
                    } catch (error) {
                      console.log(error);
                    }
                  
                  }
                  
                  const[totalinventories,settotalinventories]=useState(0)
                  const [totalResidential, setTotalResidential] = useState(0);
                  const [totalcommercial, settotalcommercial] = useState(0);
                  const [totalagriculture, settotalagriculture] = useState(0);
                  const [totalindustrial, settotalindustrial] = useState(0);
                  const [totalinstitutional, settotalinstitutional] = useState(0);
                  useEffect(()=>
                  {
                    const tinventories=flattenedUnits.length
                    settotalinventories(tinventories)

                    const residentialCount = flattenedUnits.filter(unit => unit.category === 'Residential').length;
                    setTotalResidential(residentialCount);

                    const commercialcount = flattenedUnits.filter(unit => unit.category === 'Commercial').length;
                    settotalcommercial(commercialcount);

                    const agriculturecount = flattenedUnits.filter(unit => unit.category === 'Agriculture').length;
                    settotalagriculture(agriculturecount);

                    const insdustrialcount = flattenedUnits.filter(unit => unit.category === 'Industrial').length;
                    settotalindustrial(insdustrialcount);

                    const institutionalcount = flattenedUnits.filter(unit => unit.category === 'Institutional').length;
                    settotalinstitutional(institutionalcount);
                  },[flattenedUnits])

                  const [isFlipped, setIsFlipped] = useState(false);

                  const pagereload = () => {
                    // Flip effect for contactlistview to companylistview
                    setIsFlipped(true);
                    setTimeout(() => {
                      document.getElementById("contactlistview").style.display = "none";
                      document.getElementById("projectlistview").style.display = "block";
                    }, 500);  // Wait for flip animation to complete before hiding/showing the divs
                  };
                
                  const pagereload2 = () => {
                    // Flip effect for companylistview to contactlistview
                    setIsFlipped(false);
                    setTimeout(() => {
                      document.getElementById("unitlistview").style.display = "block";
                      document.getElementById("projectlistview").style.display = "none";
                    }, 500);  // Wait for flip animation to complete before hiding/showing the divs
                  };

                  const pagereload3 = () => {
                    // Flip effect for companylistview to contactlistview
                    setIsFlipped(false);
                    setTimeout(() => {
                      document.getElementById("unitlistview").style.display = "none";
                      document.getElementById("contactlistview").style.display = "block";
                    }, 500);  // Wait for flip animation to complete before hiding/showing the divs
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

                        const resp4=await api.get(`viewcontactbyname/${searchdata}`);
                        const incoming4=(Array.isArray(resp4.data.contact) ? resp4.data.contact : [resp4.data.contact]);
                        setdata([...incoming,...incoming1,...incoming2,...incoming3,...incoming4])

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


                  const [currentPage1, setCurrentPage1] = useState(1);
                  const [itemsPerPage1, setItemsPerPage1] = useState(8); // User-defined items per page
                  const indexOfLastItem1 = currentPage1 * itemsPerPage1;
                  const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
                  const currentItems2 = cdata.slice(indexOfFirstItem1, indexOfLastItem1);
                  const totalPages1 = Math.ceil(cdata.length / itemsPerPage1);
                  
                    // Handle items per page change
                    const handleItemsPerPageChange1 = (e) => {
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

                 


                  
                  

                  const allprojectColumns = [
                  
                    { id: 'sno', name: '#' },
                    { id: 'projectname', name: 'Project Name' },
                    { id: 'location', name: 'Location' },
                    { id: 'block', name: 'Block' },
                    { id: 'category', name: ' Category' },
                    { id: 'unit_type', name: 'Unit Type ' },
                    { id: 'user', name: 'User ' },
                    { id: 'date', name: 'Date' },
                  ];
                  const [selectedItems2, setSelectedItems2] = useState([]); // To track selected rows
                  const [selectAll2, setSelectAll2] = useState(false); // To track the state of the "Select All" checkbox
                  const [visibleColumns2, setVisibleColumns2] = useState(allprojectColumns.slice(1, 8));
                  const [showColumnList1, setShowColumnList1] = useState(false);
                
                  const handleAddColumnClick1 = () => {
                    setShowColumnList1(!showColumnList1);
                  };
                
                  const handleCheckboxChange1 = (column) => {
                    if (visibleColumns2.some((col) => col.id === column.id)) {
                      // Remove column from visibleColumns if it's already present
                      setVisibleColumns2(visibleColumns2.filter((col) => col.id !== column.id));
                    } else {
                      // Add column to visibleColumns
                      setVisibleColumns2([...visibleColumns2, column]);
                    }
                  };
                  const handleSelectAll2 = () => {
                
                    setSelectAll2(!selectAll2);
                    if (!selectAll2) {
                      // Add all current page item IDs to selectedItems
                      setSelectedItems2(currentItems2.map((item) => item._id));
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

                 

                  const allunitColumns = [
                  
                    { id: 'sno', name: '#' },
                    { id: 'details', name: 'Details' },
                    { id: 'status', name: 'Status' },
                    { id: 'ownerdetails', name: 'Owner Details' },
                    { id: 'owneraddress', name: ' Owner Address' },
                    { id: 'associatedcontact', name: 'Associated Contact ' },
                    { id: 'remarks', name: 'Remarks ' },
                    { id: 'locationbrief', name: 'Location Brief' },
                    { id: 'ownership', name: 'OwnerShip' },
                    { id: 'followup', name: 'Follow Up' },
                    { id: 'lastconduct', name: 'Last Conduct Date & Time' },
                  ];
                  const [selectedItems3, setSelectedItems3] = useState([]); // To track selected rows
                  const [selectAll3, setSelectAll3] = useState(false); // To track the state of the "Select All" checkbox
                  const [visibleColumns3, setVisibleColumns3] = useState(allunitColumns.slice(1, 11));
                  const [showColumnList2, setShowColumnList2] = useState(false);

                  const handleAddColumnClick2 = () => {
                    setShowColumnList2(!showColumnList2);
                  };
                
                  const handleCheckboxChange2 = (column) => {
                    if (visibleColumns3.some((col) => col.id === column.id)) {
                      // Remove column from visibleColumns if it's already present
                      setVisibleColumns3(visibleColumns3.filter((col) => col.id !== column.id));
                    } else {
                      // Add column to visibleColumns
                      setVisibleColumns3([...visibleColumns3, column]);
                    }
                  };
                  const handleSelectAll3 = () => {
                
                    setSelectAll3(!selectAll3);
                    if (!selectAll3) {
                      // Add all current page item IDs to selectedItems
                      setSelectedItems3(currentItems3.map((item) => item._id));
                    } else {
                      // Deselect all
                       setSelectedItems3([]);
                
                    }
                  };
                
                  const handleRowSelect3 = (id) => {
                 
                    if (selectedItems3.includes(id)) {
                      setSelectedItems3(selectedItems3.filter((itemId) => itemId !== id));
                    } else {
                      setSelectedItems3([...selectedItems3, id]);
                  
                    }
                  };





                  const [currentPage2, setCurrentPage2] = useState(1);
                  const [itemsPerPage2, setItemsPerPage2] = useState(8); // User-defined items per page
                  const indexOfLastItem2 = currentPage2 * itemsPerPage2;
                  const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage2;
                  const currentItems3 = flattenedUnits.slice(indexOfFirstItem2, indexOfLastItem2);
                  const totalPages2 = Math.ceil(flattenedUnits.length / itemsPerPage2);
                  
              
                  
                    // Handle items per page change
                    const handleItemsPerPageChange2 = (e) => {
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

                  const[dealdata,setdealdata]=useState([])
                  const[note,setnote]=useState(dealdata.descriptions)


                  const [show6, setshow6] = useState(false);
                  
                  const handleClose6 = () => setshow6(false);
                  
                     const handleShow6=async()=>
                      { 
                        setshow6(true);
                        try {
                          const resp=await api.get(`viewdealbyid/${selectedItems}`)
                          setdealdata(resp.data.deal)
                        } catch (error) {
                          console.log(error);
                        }
                      }

                      const updatedealdata = async () => {
                        try {
                          const id = selectedItems;  // Assuming selectedItems is the ID of the lead to update
                          const data = {remarks:note,stage:updatestage };  // Send only the stage field in the request body
                      
                          const resp = await api.put(`updatedealbysingle/${id}`, data);  // Send the request with only stage in the body
                      
                          toast.success("Deal Updated Successfully...", { autoClose: 2000 });
                      
                          // After success, navigate to the lead details page or reload
                          setTimeout(() => {
                            navigate('/dealdetails');
                          }, 2000);
                          setTimeout(() => {
                            window.location.reload();  // If necessary, reload the page
                          }, 2000);
                        } catch (error) {
                          console.log(error);
                        }
                      };


                      const [show5, setshow5] = useState(false);
                      const[updatestage,setupdatestage]=useState(dealdata.stage)

                      const handleClose5 = () => setshow5(false);
                      const handleShow5=async()=>
                        { 
                          setshow5(true);
                          try {
                            const resp=await api.get(`viewdealbyid/${selectedItems}`)
                            setdealdata(resp.data.deal)
                           
                          } catch (error) {
                            console.log(error);
                          }
                        }



                        useEffect(()=>
                          {
                            if(selectedItems.length===0)
                            {
                              document.getElementById("dealdelete").style.display="none"
                              document.getElementById("dealedit").style.display="none"
                              document.getElementById("dealmail").style.display="none"
                               document.getElementById("dealwhatsapp").style.display="none"
                                  document.getElementById("dealmessage").style.display="none"
                                  document.getElementById("dealaddtask").style.display="none"
                                  document.getElementById("dealcreatebooking").style.display="none"
                                  document.getElementById("dealaddremoveowner").style.display="none"
                                  document.getElementById("dealmatchedlead").style.display="none"
                                  document.getElementById("dealcall").style.display="none"
                                  document.getElementById("dealaddtag").style.display="none"
                                  document.getElementById("dealaddremarks").style.display="none"
                                  document.getElementById("dealpublishon").style.display="none"
                                  document.getElementById("dealupdatestage").style.display="none"
                                  document.getElementById("dealpreview").style.display="none"
                                  document.getElementById("dealadddocument").style.display="none"
                                  document.getElementById("dealuploadpicture").style.display="none"
                                document.getElementById("dealsearch").style.display="flex"
                                document.getElementById("dealtoggelsearch").style.display="flex"
                            }
                            if(selectedItems.length===1)
                            {
                              document.getElementById("dealdelete").style.display="inline-block"
                              document.getElementById("dealedit").style.display="inline-block"
                            document.getElementById("dealmail").style.display="inline-block"
                             document.getElementById("dealwhatsapp").style.display="inline-block"
                                document.getElementById("dealmessage").style.display="inline-block"
                                document.getElementById("dealaddtask").style.display="inline-block"
                                document.getElementById("dealcreatebooking").style.display="inline-block"
                                document.getElementById("dealaddremoveowner").style.display="inline-block"
                                document.getElementById("dealmatchedlead").style.display="inline-block"
                                document.getElementById("dealcall").style.display="inline-block"
                                document.getElementById("dealaddtag").style.display="inline-block"
                                document.getElementById("dealaddremarks").style.display="inline-block"
                                document.getElementById("dealpublishon").style.display="inline-block"
                                document.getElementById("dealupdatestage").style.display="inline-block"
                                document.getElementById("dealpreview").style.display="inline-block"
                                document.getElementById("dealadddocument").style.display="inline-block"
                                document.getElementById("dealuploadpicture").style.display="inline-block"
                            document.getElementById("dealsearch").style.display="none"
                              document.getElementById("dealtoggelsearch").style.display="none"
                            }
      
                            if(selectedItems.length>1)
                            {
                              document.getElementById("dealdelete").style.display="inline-block"
                              document.getElementById("dealedit").style.display="none"
                            document.getElementById("dealmail").style.display="inline-block"
                             document.getElementById("dealwhatsapp").style.display="inline-block"
                                document.getElementById("dealmessage").style.display="inline-block"
                                document.getElementById("dealaddtask").style.display="none"
                                document.getElementById("dealcreatebooking").style.display="none"
                                document.getElementById("dealaddremoveowner").style.display="none"
                                document.getElementById("dealmatchedlead").style.display="none"
                                document.getElementById("dealcall").style.display="none"
                                document.getElementById("dealaddtag").style.display="none"
                                document.getElementById("dealaddremarks").style.display="none"
                                document.getElementById("dealpublishon").style.display="none"
                                document.getElementById("dealupdatestage").style.display="none"
                                document.getElementById("dealpreview").style.display="none"
                                document.getElementById("dealadddocument").style.display="none"
                                document.getElementById("dealuploadpicture").style.display="none"
                                document.getElementById("dealsearch").style.display="none"
                              document.getElementById("dealtoggelsearch").style.display="none"
                            }
      
                            if(selectedItems2.length===0)
                              {
                                document.getElementById("projectdelete").style.display="none"
                                document.getElementById("projectedit").style.display="none"
                                document.getElementById("projectmail").style.display="none"
                                 document.getElementById("projectwhatsapp").style.display="none"
                                    document.getElementById("projectmessage").style.display="none"
                
                                    document.getElementById("projectaddremoveuser").style.display="none"
                                    document.getElementById("projectmatchedlead").style.display="none"
                              
                                    document.getElementById("projectaddtag").style.display="none"
                                 
                                    document.getElementById("projectpublishon").style.display="none"
                                    
                                    document.getElementById("projectpreview").style.display="none"
                                    document.getElementById("projectadddocument").style.display="none"
                                    document.getElementById("projectuploadpicture").style.display="none"
                                  document.getElementById("projectsearch").style.display="flex"
                                  
                              }
                            if(selectedItems2.length===1)
                              {
                                document.getElementById("projectdelete").style.display="inline-block"
                                document.getElementById("projectedit").style.display="inline-block"
                                document.getElementById("projectmail").style.display="inline-block"
                                 document.getElementById("projectwhatsapp").style.display="inline-block"
                                    document.getElementById("projectmessage").style.display="inline-block"
                
                                    document.getElementById("projectaddremoveuser").style.display="inline-block"
                                    document.getElementById("projectmatchedlead").style.display="inline-block"
                              
                                    document.getElementById("projectaddtag").style.display="inline-block"
                                 
                                    document.getElementById("projectpublishon").style.display="inline-block"
                                    
                                    document.getElementById("projectpreview").style.display="inline-block"
                                    document.getElementById("projectadddocument").style.display="inline-block"
                                    document.getElementById("projectuploadpicture").style.display="inline-block"
                                  document.getElementById("projectsearch").style.display="none"
                           
                              }
                           
                    
                                if(selectedItems2.length>1)
                                  {
                                    document.getElementById("projectdelete").style.display="inline-block"
                                    document.getElementById("projectedit").style.display="none"
                                    document.getElementById("projectmail").style.display="inline-block"
                                     document.getElementById("projectwhatsapp").style.display="inline-block"
                                        document.getElementById("projectmessage").style.display="inline-block"
                    
                                        document.getElementById("projectaddremoveuser").style.display="none"
                                        document.getElementById("projectmatchedlead").style.display="none"
                                  
                                        document.getElementById("projectaddtag").style.display="none"
                                     
                                        document.getElementById("projectpublishon").style.display="none"
                                        
                                        document.getElementById("projectpreview").style.display="none"
                                        document.getElementById("projectadddocument").style.display="none"
                                        document.getElementById("projectuploadpicture").style.display="none"
                                      document.getElementById("projectsearch").style.display="none"
                                  }
                                  if(selectedItems3.length===0)
                                    {
                                      document.getElementById("unitdelete").style.display="none"
                                      document.getElementById("unitedit").style.display="none"
                                      document.getElementById("unitmail").style.display="none"
                                       document.getElementById("unitwhatsapp").style.display="none"
                                          document.getElementById("unitmessage").style.display="none"
                                           document.getElementById("unitcreatedeal").style.display="none"
                                            document.getElementById("unitaddunit").style.display="none"
                                         
                                          document.getElementById("unitaddremoveowner").style.display="none"
                                          document.getElementById("unitmatchedlead").style.display="none"
                                          document.getElementById("unitcall").style.display="none"
                                          document.getElementById("unitaddtag").style.display="none"
                                          document.getElementById("unitaddremarks").style.display="none"
                                         
                                          document.getElementById("unitupdatestage").style.display="none"
                                          document.getElementById("unitpreview").style.display="none"
                                          document.getElementById("unitadddocument").style.display="none"
                                          document.getElementById("unituploadpicture").style.display="none"
                                        document.getElementById("unitsearch").style.display="flex"
                                       
                                    }
                                    if(selectedItems3.length===1)
                                      {
                                        document.getElementById("unitdelete").style.display="inline-block"
                                        document.getElementById("unitedit").style.display="inline-block"
                                        document.getElementById("unitmail").style.display="inline-block"
                                         document.getElementById("unitwhatsapp").style.display="inline-block"
                                            document.getElementById("unitmessage").style.display="inline-block"
                                             document.getElementById("unitcreatedeal").style.display="inline-block"
                                              document.getElementById("unitaddunit").style.display="inline-block"
                                           
                                            document.getElementById("unitaddremoveowner").style.display="inline-block"
                                            document.getElementById("unitmatchedlead").style.display="inline-block"
                                            document.getElementById("unitcall").style.display="inline-block"
                                            document.getElementById("unitaddtag").style.display="inline-block"
                                            document.getElementById("unitaddremarks").style.display="inline-block"
                                           
                                            document.getElementById("unitupdatestage").style.display="inline-block"
                                            document.getElementById("unitpreview").style.display="inline-block"
                                            document.getElementById("unitadddocument").style.display="inline-block"
                                            document.getElementById("unituploadpicture").style.display="inline-block"
                                          document.getElementById("unitsearch").style.display="none"
                                         
                                      }
                                      if(selectedItems3.length>1)
                                        {
                                          document.getElementById("unitdelete").style.display="inline-block"
                                          document.getElementById("unitedit").style.display="none"
                                          document.getElementById("unitmail").style.display="inline-block"
                                           document.getElementById("unitwhatsapp").style.display="inline-block"
                                              document.getElementById("unitmessage").style.display="inline-block"
                                               document.getElementById("unitcreatedeal").style.display="none"
                                                document.getElementById("unitaddunit").style.display="none"
                                             
                                              document.getElementById("unitaddremoveowner").style.display="none"
                                              document.getElementById("unitmatchedlead").style.display="none"
                                              document.getElementById("unitcall").style.display="none"
                                              document.getElementById("unitaddtag").style.display="none"
                                              document.getElementById("unitaddremarks").style.display="none"
                                             
                                              document.getElementById("unitupdatestage").style.display="none"
                                              document.getElementById("unitpreview").style.display="none"
                                              document.getElementById("unitadddocument").style.display="none"
                                              document.getElementById("unituploadpicture").style.display="none"
                                            document.getElementById("unitsearch").style.display="none"
                                           
                                        }
                        
                          },[selectedItems,selectedItems2,selectedItems3])




                          const[deal,setdeal]=useState({owner_details:[],associated_contact:[],relation:"",})


                          const [show7, setshow7] = useState(false);
                          const handleClose7 = () => setshow7(false);
                          const handleShow7=async()=>
                          {
                            setshow7(true);
                          
                          }

                          const [input, setInput] = useState('');
        const [filteredSuggestions, setFilteredSuggestions] = useState([]);
        const [showSuggestions, setShowSuggestions] = useState(false);
        const [allSuggestions, setAllSuggestions] = useState([]);
        const [selectedContacts, setSelectedContacts] = useState([]);
  
        React.useEffect(() => {
          const fetchSuggestions = async () => {
            try {
              const response = await api.get('viewcontact');
              const data = response.data.contact;
              
              // Extract the first_name field from the fetched data
              // const names = data.map(item => item.first_name);
              setAllSuggestions(data);
            } catch (error) {
              console.error('Error fetching suggestions:', error);
            }
          };
      
          fetchSuggestions();
        }, []);

        React.useEffect(() => {
          if (input) {
            const results = allSuggestions.filter(contact =>
              contact.first_name?.toLowerCase().includes(input.toLowerCase())
            );
            setFilteredSuggestions(results);
            setShowSuggestions(true);
          } else {
            setShowSuggestions(false)
          }
        }, [input,allSuggestions]);

       
      
        const handleInputChange = (event) => {
          setInput(event.target.value);
          handleClose2()
        };
        
        
        const [show2, setshow2] = useState(false);
        const handleClose2 = () => setshow2(false);
        const handleShow2=async()=>
        {
          setshow2(true);
        
        }

        const [selectedcontact1,setselectedcontact1]=useState([])
        const [selectedcontact2,setselectedcontact2]=useState([])
        const[newcontact,setnewcontact]=useState([])
        
        const[relation,setrelation]=useState("")

        const handlerelationchange = (e) => {
          setrelation(e.target.value);
        };

        const [relation1,setrelation1]=useState("")
        React.useEffect(() => {
          
          
          if (relation === "Self") {
            setrelation("")
            setselectedcontact1(prevContacts => [
              ...prevContacts,
              newcontact // Add the new contact (assumed to be an object)
            ]);
            setdeal(prevDeal => ({
              ...prevDeal,
              owner_details: [...(prevDeal.owner_details || []), newcontact] // Append new contact to the existing owner_details array
            }));
           
          }
           else if(relation==="Son" || relation==="Father" || relation==="Mother" || relation==="Other" || relation==="Uncle") {
            
            setselectedcontact2(prevContacts => [
              ...prevContacts,
              newcontact // Add the new contact for other relations
            ]);
            setdeal(prevDeal => ({ ...prevDeal, relation: relation }));
            setdeal(prevDeal => ({
              ...prevDeal,
              associated_contact: [...(prevDeal.associated_contact || []), newcontact] // Append new contact to the existing owner_details array
            }));
            setrelation1(relation)
            setrelation("")
          }
        }, [relation,newcontact]);


       
        const handleSuggestionClick = (contact) => {
          handleShow2();
          
          setnewcontact(contact)
          // Update the selectedContacts array
          const updatedContacts = [...selectedContacts, contact];
          setSelectedContacts(updatedContacts);
        
          setInput(''); // Clear the input after selection
          setShowSuggestions(false); // Hide suggestions after selection
          //setdeal(prevDeal => ({ ...prevDeal, owner_details: updatedContacts }));
        };

       
         
        const removeContact = (id) => {
    
          const updatedContacts = selectedContacts.filter(contact => contact._id !== id);
          const updatedContacts1 = selectedcontact1.filter(contact => contact._id !== id);
          const updatedContacts2 = selectedcontact2.filter(contact => contact._id !== id);
          setSelectedContacts(updatedContacts);
          setselectedcontact1(updatedContacts1)
          setselectedcontact2(updatedContacts2)
          
          // Update deal.owner_details with the current selected contacts
          setdeal(prevDeal => ({ ...prevDeal, owner_details: updatedContacts }));

        };

        const updatedealownerdata = async () => {
          try {
            const id = selectedItems;  // Assuming selectedItems is the ID of the lead to update
            //const data = {remarks:note,stage:updatestage };  // Send only the stage field in the request body
        
            const resp = await api.put(`updatedealbyowner/${id}`, deal);  // Send the request with only stage in the body
        
            toast.success("Deal Updated Successfully...", { autoClose: 2000 });
        
            // After success, navigate to the lead details page or reload
            setTimeout(() => {
              navigate('/dealdetails');
            }, 2000);
            setTimeout(() => {
              window.location.reload();  // If necessary, reload the page
            }, 2000);
          } catch (error) {
            console.log(error);
          }
        };










                  
    return (
        <div>
            <Header1/>
            <Sidebar1/>
            <div className={`flip-container ${isFlipped ? 'flipped' : ''}`}>
            <div id="contactlistview" className="flip-card-front">
      <div style={{marginTop:"80px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
        
        <h3 style={{marginLeft:"10px",marginTop:"10px",cursor:"pointer"}} onClick={pagereload}>Deals</h3>
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
        <div className="lead" style={{width:"200px",padding:"10px",borderRadius:"10px"}} onClick={fetchdatabystage_open}>
          <h6>OPEN</h6>
          <p>{countopen}</p>
        </div>
        <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}} onClick={fetchdatabystage_quote}>
          <h6>QUOTE</h6>
          <p>{countquote}</p>
        </div>
        <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}} onClick={fetchdatabystage_Negotiation}>
          <h6>NEGOTIATION</h6>
          <p>{countnegotiation}</p>
        </div>
        <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}} onClick={fetchdatabystage_booked}>
          <h6>BOOKED</h6>
          <p>{countbooked}</p>
        </div>
        <div style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
     
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent",border:"none",fontWeight:"bold",marginTop:"-10px"}}>
            CLOSED
        </button>
            <ul class="dropdown-menu">
              <li className="form-control">Won <span style={{fontSize:"30px",color:"green",fontWeight:"bolder"}}><sup>{countwon}</sup></span></li>
              <li className="form-control">Reject <span style={{fontSize:"30px",color:"red",fontWeight:"bolder"}}><sup>{countlost}</sup></span></li>
              <li className="form-control">Lost <span style={{fontSize:"30px",color:"red",fontWeight:"bolder"}}><sup>{countreject}</sup></span></li>
            </ul>
        </div>  
        
        
      </div>

      <div style={{marginTop:"10px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"10px",paddingTop:"10px"}}>
      <input id="dealtoggelsearch" type="checkbox" onChange={handleischeckedchange}/>
      <input id="dealsearch" type="text" disabled={!ischecked} className="form-control form-control-sm form-control form-control-sm-sm" placeholder="search for tasks calls etc." style={{width:"25%"}} />
     
      <div id="action" style={{position:"absolute",marginLeft:"1%",gap:"20px"}}>

<Tooltip title="Delete Data.." arrow>
<img id="dealdelete" src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" onClick={deletedealSelectedItems}    style={{height:"50px",width:"50px",cursor:"pointer",display:"none",marginTop:"-2px"}} alt=""/>
</Tooltip>

<Tooltip title="Edit Data.." arrow>
<img id="dealedit" src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-icon-orange-pencil-0.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Send Mail.." arrow>
<img id="dealmail"  src="  https://w7.pngwing.com/pngs/7/83/png-transparent-email-computer-icons-internet-graphy-email-miscellaneous-blue-button-icon-thumbnail.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>
<Tooltip title="Send WhatsApp.." arrow>
<img id="dealwhatsapp"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/479px-WhatsApp_icon.png"  style={{height:"50px",width:"50px",cursor:"pointer",marginTop:"-2px",display:"none",marginLeft:"20px",objectFit:"contain"}}m alt=""/>
</Tooltip>
<Tooltip title="Send Message.." arrow>
<img id="dealmessage"  src="https://w7.pngwing.com/pngs/198/585/png-transparent-chatbox-icon-computer-icons-message-sms-icon-message-miscellaneous-grass-online-chat-thumbnail.png"  style={{height:"40px",width:"40px",cursor:"pointer",marginTop:"3px",display:"none",marginLeft:"20px",objectFit:"contain"}} alt=""/>
</Tooltip>

<Tooltip title="Add to task.." arrow>
<img id="dealaddtask"  src="https://cdn-icons-png.flaticon.com/512/12692/12692378.png" onClick={()=>navigate('/tasksform')}  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Create Booking.." arrow>
<img id="dealcreatebooking"  src="https://www.housecallpro.com/wp-content/uploads/2024/01/schedule-mono-300x300-1.png" onClick={()=>{navigate('/bookingdetails')}}  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Add Owner/Property Owner/Associate Contact/Remove Owner.." arrow>
<img id="dealaddremoveowner"  src="https://thumbs.dreamstime.com/b/add-remove-user-icon-vector-flat-outline-web-design-isolated-white-background-color-272194204.jpg" onClick={handleShow7}   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Matched Lead.." arrow>
<img id="dealmatchedlead"  src="https://www.clipartmax.com/png/middle/474-4745675_martial-arts-lead-management-lead-management-icon.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Call.." arrow>
<img id="dealcall"  src="https://static.vecteezy.com/system/resources/previews/016/314/381/non_2x/call-icon-free-png.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Add Tag.." arrow>
<img id="dealaddtag"  src="https://png.pngtree.com/png-clipart/20230805/original/pngtree-hospital-tag-icon-add-tag-offer-vector-picture-image_9758849.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Add Remarks/Note.." arrow>
<img id="dealaddremarks"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbdAgrzt5tx31PHUYAp2LXUqr-D2QOwT_sQ&s" onClick={handleShow6}   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Publish On.." arrow>
<img id="dealpublishon"  src="https://cdn-icons-png.flaticon.com/512/4661/4661368.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Update Stage.." arrow>
<img id="dealupdatestage"  src="https://thumbs.dreamstime.com/b/two-arrows-d-icon-update-symbol-two-arrows-d-icon-update-symbol-d-recycle-icon-refresh-icon-isolated-white-background-342646057.jpg" onClick={handleShow5}   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Preview.." arrow>
<img id="dealpreview"  src="https://cdn-icons-png.flaticon.com/512/143/143594.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Add Document.." arrow>
<img id="dealadddocument"  src="https://icons.iconarchive.com/icons/graphicloads/long-shadow-documents/256/document-add-icon.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Upload Picture.." arrow>
<img id="dealuploadpicture"  src="https://png.pngtree.com/png-clipart/20200225/original/pngtree-image-upload-icon-photo-upload-icon-png-image_5279796.jpg"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

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
                style={{ padding: "10px", fontFamily: "times new roman",cursor: col.id === 'matchinglead' ? 'pointer' : 'default' }}
                onClick={col.id === 'matchinglead' ? () => handleMatchLeadClick(item) : undefined} // Handle click if it's 'matchlead'
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
    {/* <div style={{height:"100px"}}>
      <div style={{display:"flex",fontSize:"20px",gap:"10px",justifyContent:"right",paddingRight:"60px", marginTop:"10px"}}>{renderPageNumbers()}</div></div> */}
      

      <Modal show={show1} onHide={handleClose1} size='xl' style={{transition:"0.5s ease-in"}}>
            <Modal.Header>
              <Modal.Title>Matched Lead for {deallocation}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
    <TableHead>
      

        {/* Render the column headers */}
        <TableRow>
          {dealallColumns.map((col) => (
            // Only render columns that are NOT in the removedColumns list
            !removedColumns.includes(col.id) && (
              <StyledTableCell key={col.id} style={{ fontFamily: 'times new roman' }}>
                <span>{col.name}</span>

                {/* Conditionally render '-' button based on showRemoveButtons */}
                {showRemoveButtons && (
                  <Tooltip title="Click to remove column">
                    <button
                      onClick={() => handleColumnRemove(col.id)} // Remove the column
                      style={{
                        marginLeft: '10px',
                        cursor: 'pointer',
                        backgroundColor: 'red',
                        color: 'white',
                        border: 'none',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        textAlign: 'center',
                        fontSize: '14px',
                      }}
                    >
                      -
                    </button>
                  </Tooltip>
                )}
              </StyledTableCell>
            )
          ))}
           <TableRow>
          {/* Single Filter Image Icon */}
          <StyledTableCell >
            <Tooltip title="Click to toggle filter" arrow>
              <img
                src="https://static-00.iconduck.com/assets.00/filter-icon-1024x1024-g4w8llud.png"
                alt="filter"
                style={{ height: '35px', border: 'none', cursor: 'pointer' }}
                onClick={handleFilterClick} // Toggle the visibility of '-' buttons
              />
            </Tooltip>
          </StyledTableCell>
        </TableRow>
        </TableRow>
      </TableHead>
    
      <tbody>
        {
         
        deal1.map ((item, index) => (
          <StyledTableRow key={index}>
            
         
            
            {dealallColumns
              .filter((col) => col.id !== 'sno')
              .map((col) => (
                !removedColumns.includes(col.id) &&
                <StyledTableCell 
                key={col.id} 
                style={{ padding: "10px", fontFamily: "times new roman" }}
                
              >
                {item[col.id]}
              </StyledTableCell>
              ))}
              
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
  <div style={{marginTop:"10px",backgroundColor:"gray",padding:"12px",height:"60px",display:"flex",gap:"10px"}}>
     
      <input id="search" type="text"  className="form-control form-control-sm form-control form-control-sm-sm" placeholder="Type here for search" style={{width:"25%"}} />
      <div style={{marginLeft:"45%"}}><button className="form-control form-control-sm">Send Details</button></div>
      <div><button className="form-control form-control-sm">Mark As Intrested</button></div>
      </div>

      <TableContainer component={Paper} style={{marginTop:"20px"}}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>
            <input
              type="checkbox"
              checked={selectAll1}
              onChange={handleSelectAll1}
            />
          </StyledTableCell>
          {leadallColumns.map((col) => (
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
         
         lead1.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
              <input 
                type="checkbox"
                checked={selectedItems1.includes(item._id)}
                onChange={() => handleRowSelect1(item._id)}
              />
              {index + 1}
            </StyledTableCell>

            <StyledTableCell style={{ fontFamily: "times new roman" }}>
             {item.title} {item.first_name} {item.last_name} <br></br>
             {
              Array.isArray(item.mobile_no) 
                ? item.mobile_no.map((mobile, index) => (
                    <div key={index}>
                      <SvgIcon component={PhoneIphoneIcon} />
                      <span style={{ color: "#9400D3" }}>{mobile}</span>
                    </div>
                  ))
                :  <div>
                    <SvgIcon component={PhoneIphoneIcon} />  
                    <span style={{ color: "#9400D3" }}>{item.mobile_no}</span> 
                </div> 
            }


            </StyledTableCell>
            
            {leadallColumns
              .filter((col) => col.id !== 'sno' && col.id !=='lead_details' )
              .map((col) => (
                <StyledTableCell 
                key={col.id} 
                style={{ padding: "10px", fontFamily: "times new roman" }}
                
              >
                
                {col.id === 'stage' ? (
              <>
                {item.stage} <br />
                <span style={{ color: item.lead_type === 'Hot' ? 'red' : item.lead_type === 'Warm' ? 'green' : item.lead_type === 'Cold' ? 'blue' : 'black' }}>
                  {item.lead_type}
                </span>
              </>
            ) :   col.id === 'budget' ? (
              <>
                Min:  {item.budget_min} <br />
                Max:  {item.budget_max}
              
              </>
            ) : (
              item[col.id]
            )}
                  

             
              </StyledTableCell>
              ))}
              
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
      
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>



</div>
          <div id="projectlistview" className="flip-card-back" style={{display:"none"}}>
          <div style={{marginTop:"80px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
        
        <h3 style={{marginLeft:"10px",cursor:"pointer"}} onClick={pagereload2}>Project </h3>
        <Tooltip title="Export Data.." arrow>
            <button  class="btn btn-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent",border:"none"}}>
            <img src="https://static.thenounproject.com/png/61783-200.png" style={{height:"25px"}} alt=""/>
        </button></Tooltip>
            <ul class="dropdown-menu" id="exporttoexcel"> 
            
            <li  onClick={exportToExcel} >Export Data</li>
              
            </ul>
            

            <button  className="form-control form-control-sm form-control form-control-sm-sm" style={{width:"150px",marginLeft:"65%"}}>Filter</button>
            <button onClick={handleAddColumnClick1} className="form-control form-control-sm form-control form-control-sm-sm" style={{width:"150px",marginLeft:"1%"}}>Add Fields</button>
        
       
       
          
      </div> 

      <div style={{marginTop:"10px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px",paddingTop:"10px"}}>

<input id="projectsearch" type="text" className="form-control form-control-sm form-control form-control-sm-sm" placeholder="search by name,email,mobile,company and tags" style={{width:"25%"}} onChange={(e)=>setsearchdata(e.target.value)} onKeyDown={handlekeypress1}/>

<div id="action" style={{position:"absolute",marginLeft:"1%",gap:"20px"}}>

<Tooltip title="Delete Data.." arrow>
<img id="projectdelete" src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" onClick={deleteprojectSelectedItems} style={{height:"50px",width:"50px",cursor:"pointer",display:"none",marginTop:"-2px"}} alt=""/>
</Tooltip>

<Tooltip title="Edit Data.." arrow>
<img id="projectedit" src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-icon-orange-pencil-0.png" onClick={handleShow1}  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Send Mail.." arrow>
<img id="projectmail"  src="  https://w7.pngwing.com/pngs/7/83/png-transparent-email-computer-icons-internet-graphy-email-miscellaneous-blue-button-icon-thumbnail.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>
<Tooltip title="Send WhatsApp.." arrow>
<img id="projectwhatsapp"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/479px-WhatsApp_icon.png"  style={{height:"50px",width:"50px",cursor:"pointer",marginTop:"-2px",display:"none",marginLeft:"20px",objectFit:"contain"}}m alt=""/>
</Tooltip>
<Tooltip title="Send Message.." arrow>
<img id="projectmessage"  src="https://w7.pngwing.com/pngs/198/585/png-transparent-chatbox-icon-computer-icons-message-sms-icon-message-miscellaneous-grass-online-chat-thumbnail.png"  style={{height:"40px",width:"40px",cursor:"pointer",marginTop:"3px",display:"none",marginLeft:"20px",objectFit:"contain"}} alt=""/>
</Tooltip>
<Tooltip title="Preview.." arrow>
<img id="projectpreview"  src="https://cdn-icons-png.flaticon.com/512/143/143594.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>
<Tooltip title="Add/Remove User.." arrow>
<img id="projectaddremoveuser"  src="https://thumbs.dreamstime.com/b/add-remove-user-icon-vector-flat-outline-web-design-isolated-white-background-color-272194204.jpg"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>
<Tooltip title="Matched Lead.." arrow>
<img id="projectmatchedlead"  src="https://www.clipartmax.com/png/middle/474-4745675_martial-arts-lead-management-lead-management-icon.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>
<Tooltip title="Add Tag.." arrow>
<img id="projectaddtag"  src="https://png.pngtree.com/png-clipart/20230805/original/pngtree-hospital-tag-icon-add-tag-offer-vector-picture-image_9758849.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>
<Tooltip title="Publish On.." arrow>
<img id="projectpublishon"  src="https://cdn-icons-png.flaticon.com/512/4661/4661368.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>
<Tooltip title="Add Document.." arrow>
<img id="projectadddocument"  src="https://icons.iconarchive.com/icons/graphicloads/long-shadow-documents/256/document-add-icon.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Upload Picture.." arrow>
<img id="projectuploadpicture"  src="https://png.pngtree.com/png-clipart/20200225/original/pngtree-image-upload-icon-photo-upload-icon-png-image_5279796.jpg"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

</div>


<div style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"75%",position:"absolute"}}>

<label htmlFor="itemsPerPage" style={{fontSize:"16px",fontFamily:"times new roman"}}>Items: </label>
<select id="itemsPerPage" value={itemsPerPage1} onChange={handleItemsPerPageChange1} style={{fontSize:"16px",fontFamily:"times new roman",height:"30px"}}>
  <option value="5">10</option>
  <option value="10">15</option>
  <option value="20">20</option>
  <option value="50">50</option>
</select>

{renderPageNumbers1()}
</div>
  

<div style={{ position: 'relative', display: 'inline-block',marginLeft:"65%"}}>
        
          {showColumnList1 && (
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
                {allprojectColumns.slice(2).map((col) => (
                  <li key={col.id} style={{ padding: '5px 0' }}>
                    <input
                      type="checkbox"
                      checked={visibleColumns2.some((visibleCol) => visibleCol.id === col.id)}
                      onChange={() => handleCheckboxChange1(col)}
                    />{' '}
                    {col.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

 
  
</div>


<div style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white"}}>
          <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>
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
         
        currentItems2.map ((item, index) => (
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
              style={{ padding: "10px", fontFamily: "times new roman" }}  >
              {item.name}
          
            </StyledTableCell>
            {visibleColumns2
              .filter((col) => col.id !== 'projectname' && col.id !== 'sno')
              .map((col) => (
                <StyledTableCell 
                  key={col.id} 
                  style={{ padding: "10px", fontFamily: "times new roman" }}
                >
                  {
                    col.id==='location' ?
                    (
                      <>
                      {item.area} {item.location} {item.city} <br></br>
                      {item.state} {item.pincode}
                      </>
                    ) :   col.id==='unit_type' ?
                    (
                      <>
                      "{item.add_size.map((unit, index) => (
                        <div key={index} style={{display:"inline-block"}}>{unit.unit_type},</div>// You need to return a valid JSX element
                      ))}"
                    </>
                    ) :  col.id==='block' ?
                    (
                      <>
                      {item.add_block.map((block, index) => (
                        <div key={index} style={{backgroundColor:"blue",color:"white",display:"inline-block",marginRight: "10px", }}>{block.block_name} </div>// You need to return a valid JSX element
                      ))}
                    </>
                    ) :  col.id==='category' ?
                    (
                      <>
                      {item.category}<br></br>
                       {item.sub_category.map((cat, index) => (
                        <div key={index} style={{border:"1px solid orange",color:"orange",padding:"2px",display:"inline-block",marginRight: "10px", }}>{cat} </div>// You need to return a valid JSX element
                      ))}
                    </>
                    ) : item[col.id]
                  }
               
                </StyledTableCell>
              ))}
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"50px",bottom:"0",backgroundColor:"#f8f9fa"}}>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman",color:"GrayText"}}>Summary</h5>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Total Project <span style={{color:"green",fontSize:"25px"}}>{totalproject}</span></h5>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Ready To Move <span style={{color:"blue",fontSize:"25px"}}>{totalreadytomove}</span></h5>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Under Construction <span style={{color:"red",fontSize:"25px"}}>{totalunderconstruction}</span></h5>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Pre Launch <span style={{color:"gray",fontSize:"25px"}}>{totalprelaunch}</span></h5>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Upcoming <span style={{color:"pink",fontSize:"25px"}}>{totalupcoming}</span></h5>
        </footer>
      </div>



          </div>




          <div id="unitlistview" className="flip-card-back1" style={{display:"none"}}>
          <div style={{marginTop:"80px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
        
        <h3 style={{marginLeft:"10px",cursor:"pointer"}} onClick={pagereload3}>Inventories</h3>
        <Tooltip title="Export Data.." arrow>
            <button  class="btn btn-secondary " type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent",border:"none"}}>
            <img src="https://static.thenounproject.com/png/61783-200.png" style={{height:"25px"}} alt=""/>
        </button></Tooltip>
            <ul class="dropdown-menu" id="exporttoexcel"> 
            
            <li  onClick={exportToExcel} >Export Data</li>
              
            </ul>
            

            <button  className="form-control form-control-sm form-control form-control-sm-sm" style={{width:"150px",marginLeft:"65%"}}>Filter</button>
            <button onClick={handleAddColumnClick1} className="form-control form-control-sm form-control form-control-sm-sm" style={{width:"150px",marginLeft:"1%"}}>Add Fields</button>
        
       
       
          
      </div> 

      <div style={{marginTop:"10px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px"}}>
        <div className="lead" style={{width:"200px",padding:"10px",borderRadius:"10px"}} onClick={fetchdatabystage_open}>
          <h6>Active</h6>
          <p>{countopen}</p>
        </div>
        <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}} onClick={fetchdatabystage_quote}>
          <h6>Inactive</h6>
          <p>{countquote}</p>
        </div>
       
      </div>

      <div style={{marginTop:"10px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px",paddingTop:"10px"}}>

<input id="unitsearch" type="text" className="form-control form-control-sm form-control form-control-sm-sm" placeholder="search by name,email,mobile,company and tags" style={{width:"25%"}} onChange={(e)=>setsearchdata(e.target.value)} onKeyDown={handlekeypress1}/>

<div id="action" style={{position:"absolute",marginLeft:"1%",gap:"20px"}}>

<Tooltip title="Delete Data.." arrow>
<img id="unitdelete" src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg"  style={{height:"50px",width:"50px",cursor:"pointer",display:"none",marginTop:"-2px"}} alt=""/>
</Tooltip>

<Tooltip title="Edit Data.." arrow>
<img id="unitedit" src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-icon-orange-pencil-0.png" onClick={handleShow1}  style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>
<Tooltip title="add task..." arrow>
<img id="unitaddtask" src="https://cdn-icons-png.flaticon.com/512/12692/12692378.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip> 
<Tooltip title="add unit..." arrow>
<img id="unitaddunit" src="https://png.pngtree.com/png-vector/20190505/ourmid/pngtree-vector-add-icon-png-image_1023418.jpg"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip> 
<Tooltip title="create deal..." arrow>
<img id="unitcreatedeal" src="https://static.vecteezy.com/system/resources/previews/049/672/081/non_2x/two-people-shaking-hands-in-a-circle-free-png.png" onClick={()=>navigate('/deal')}   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip> 
<Tooltip title="Add Property Owner/ Owner/Associate Contact/Remove Owner.." arrow>
<img id="unitaddremoveowner"  src="https://thumbs.dreamstime.com/b/add-remove-user-icon-vector-flat-outline-web-design-isolated-white-background-color-272194204.jpg"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>
<Tooltip title="Matched Lead.." arrow>
<img id="unitmatchedlead"  src="https://www.clipartmax.com/png/middle/474-4745675_martial-arts-lead-management-lead-management-icon.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>
<Tooltip title="Call.." arrow>
<img id="unitcall"  src="https://static.vecteezy.com/system/resources/previews/016/314/381/non_2x/call-icon-free-png.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>
<Tooltip title="Send Mail.." arrow>
<img id="unitmail"  src="  https://w7.pngwing.com/pngs/7/83/png-transparent-email-computer-icons-internet-graphy-email-miscellaneous-blue-button-icon-thumbnail.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>
<Tooltip title="Send WhatsApp.." arrow>
<img id="unitwhatsapp"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/479px-WhatsApp_icon.png"  style={{height:"50px",width:"50px",cursor:"pointer",marginTop:"-2px",display:"none",marginLeft:"20px",objectFit:"contain"}}m alt=""/>
</Tooltip>
<Tooltip title="Send Message.." arrow>
<img id="unitmessage"  src="https://w7.pngwing.com/pngs/198/585/png-transparent-chatbox-icon-computer-icons-message-sms-icon-message-miscellaneous-grass-online-chat-thumbnail.png"  style={{height:"40px",width:"40px",cursor:"pointer",marginTop:"3px",display:"none",marginLeft:"20px",objectFit:"contain"}} alt=""/>
</Tooltip>
<Tooltip title="Add Remarks/Note.." arrow>
<img id="unitaddremarks"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgbdAgrzt5tx31PHUYAp2LXUqr-D2QOwT_sQ&s" onClick={handleShow6}   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>
<Tooltip title="Add Tag.." arrow>
<img id="unitaddtag"  src="https://png.pngtree.com/png-clipart/20230805/original/pngtree-hospital-tag-icon-add-tag-offer-vector-picture-image_9758849.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>
<Tooltip title="Update Stage/status.." arrow>
<img id="unitupdatestage"  src="https://thumbs.dreamstime.com/b/two-arrows-d-icon-update-symbol-two-arrows-d-icon-update-symbol-d-recycle-icon-refresh-icon-isolated-white-background-342646057.jpg" onClick={handleShow5}   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>
<Tooltip title="Preview.." arrow>
<img id="unitpreview"  src="https://cdn-icons-png.flaticon.com/512/143/143594.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Add Document.." arrow>
<img id="unitadddocument"  src="https://icons.iconarchive.com/icons/graphicloads/long-shadow-documents/256/document-add-icon.png"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

<Tooltip title="Upload Picture.." arrow>
<img id="unituploadpicture"  src="https://png.pngtree.com/png-clipart/20200225/original/pngtree-image-upload-icon-photo-upload-icon-png-image_5279796.jpg"   style={{height:"35px",width:"35px",cursor:"pointer",marginTop:"6px",display:"none",marginLeft:"20px"}} alt=""/>
</Tooltip>

</div>


<div style={{display:"flex",fontSize:"14px",gap:"5px", marginTop:"10px",marginLeft:"75%",position:"absolute"}}>

<label htmlFor="itemsPerPage" style={{fontSize:"16px",fontFamily:"times new roman"}}>Items: </label>
<select id="itemsPerPage" value={itemsPerPage1} onChange={handleItemsPerPageChange2} style={{fontSize:"16px",fontFamily:"times new roman",height:"30px"}}>
  <option value="5">10</option>
  <option value="10">15</option>
  <option value="20">20</option>
  <option value="50">50</option>
</select>

{renderPageNumbers2()}
</div>
  

<div style={{ position: 'relative', display: 'inline-block',marginLeft:"65%"}}>
        
          {showColumnList1 && (
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
                {allprojectColumns.slice(2).map((col) => (
                  <li key={col.id} style={{ padding: '5px 0' }}>
                    <input
                      type="checkbox"
                      checked={visibleColumns2.some((visibleCol) => visibleCol.id === col.id)}
                      onChange={() => handleCheckboxChange1(col)}
                    />{' '}
                    {col.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

 
  
</div>


<div style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white"}}>
          <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>
            <input
              type="checkbox"
              checked={selectAll3}
              onChange={handleSelectAll3}
            />
          </StyledTableCell>
          {visibleColumns3.map((col) => (
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
         
         currentItems3.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
              <input 
                type="checkbox"
                checked={selectedItems3.includes(item._id)}
                onChange={() => handleRowSelect3(item._id)}
              />
              {index + 1}
            </StyledTableCell>
            <StyledTableCell 
              style={{ padding: "10px", fontFamily: "times new roman" }}  >
              <span style={{fontWeight:"bolder",fontSize:"18px"}}>{item.unit_no}</span> ({item.unit_type})<br></br>
              {item.category} {item.size} 
          
            </StyledTableCell>
            {visibleColumns3
              .filter((col) => col.id !== 'details' && col.id !== 'sno')
              .map((col) => (
                <StyledTableCell 
                  key={col.id} 
                  style={{ padding: "10px", fontFamily: "times new roman" }}
                >
                  {
                    col.id==='ownerdetails' ?
                    (
                      <>
                    {item.owner_details.map((item)=>
                    (
                      <>
                     {item.title} {item.first_name} {item.last_name}<br></br>
                     {Array.isArray(item.mobile_no) ? (
                        item.mobile_no.map((mobile, idx) => (
                          <div key={idx}><SvgIcon component={PhoneIphoneIcon} />{mobile}</div>  // Each mobile number gets its own div
                        ))
                      ) : (
                        <div><SvgIcon component={PhoneIphoneIcon} />{item.mobile_no}</div>  // If not an array, just display the mobile_no
                      )}
                      </>
                    ))}
                      </>
                    ) :   col.id==='owneraddress' ?
                    (
                      <>
                      {item.owner_details.map((item, index) => (
                        <div key={index} >
                          s/h/o:-{item.father_husband_name}<br></br>
                          {item.h_no} {item.area1} {item.location1} <br></br>
                          {item.city1} {item.state1} {item.pincode1}
                        </div>
                      ))}
                    </>
                    ) :  col.id==='associatedcontact' ?
                    (
                      <>
                      {item.associated_contact.map((item)=>
                      (
                        <>
                       {item.title} {item.first_name} {item.last_name}<br></br>
                       {Array.isArray(item.mobile_no) ? (
                          item.mobile_no.map((mobile, idx) => (
                            <div key={idx}><SvgIcon component={PhoneIphoneIcon} />{mobile}</div>  // Each mobile number gets its own div
                          ))
                        ) : (
                          <div><SvgIcon component={PhoneIphoneIcon} />{item.mobile_no}</div>  // If not an array, just display the mobile_no
                        )}
                        </>
                      ))}
                        </>
                    ) :  col.id==='locationbrief' ?
                    (
                      <>
                      {item.direction}(Direction)<br></br>
                      {item.facing}(Facing)<br></br>
                      {item.road}(Road)
                    </>
                    ) : item[col.id]
                  }
               
                </StyledTableCell>
              ))}
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
    <footer style={{height:"50px",width:"100%",position:"sticky",display:"flex",gap:"50px",bottom:"0",backgroundColor:"#f8f9fa"}}>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman",color:"GrayText"}}>Summary</h5>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}>Total Inventories <span style={{color:"black",fontSize:"25px"}}>{totalinventories}</span></h5>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}> Residential <span style={{color:"green",fontSize:"25px"}}>{totalResidential}</span></h5>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}> Commercial <span style={{color:"blue",fontSize:"25px"}}>{totalcommercial}</span></h5>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}> Agriculture <span style={{color:"orange",fontSize:"25px"}}>{totalagriculture}</span></h5>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}> Industrial <span style={{color:"red",fontSize:"25px"}}>{totalindustrial}</span></h5>
          <h5 style={{lineHeight:"50px",fontFamily:"times new roman"}}> Institutional <span style={{color:"gray",fontSize:"25px"}}>{totalinstitutional}</span></h5>
        </footer>
      </div>



          </div>
     
            
         

          </div>

          <Modal show={show6} onHide={handleClose6} size='lg'>
            <Modal.Header>
              <Modal.Title>Add Note/Remarks</Modal.Title>
            </Modal.Header>
            <Modal.Body>
         

     
            <div className="col-md-6"><label className="labels">Note</label>
            <input type="textarea" className="form-control form-control-sm" style={{height:"100px"}} placeholder={dealdata.remarks} onChange={(e)=>setnote(e.target.value)}/>       
            </div>


  

          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={updatedealdata}>
                Add Note
              </Button>
              <Button variant="secondary" onClick={handleClose6}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>


          <Modal show={show5} onHide={handleClose5} size='lg'>
            <Modal.Header>
              <Modal.Title>Update Stage</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="col-md-6"><label className="labels">From</label>
                  
            <select  className="form-control form-control-sm" required="true">
                    <option>{dealdata.stage}</option>
                        </select>
              </div>
              <div className="col-md-6"></div>

        
          <div className="col-md-6"><label className="labels">To</label><select className="form-control form-control-sm" onChange={(e)=>setupdatestage(e.target.value)}>       
                       
                      <option>---Select---</option>
                        <option>Open</option>
                        <option>Quote</option>
                        <option>Negotiation </option>
                        <option>Booked </option>
                        <optgroup label="Closed">
                          <option>Won</option><option>Lost</option><option>Reject</option>
                        </optgroup>
                        </select>
            </div>
           
            


  

          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={updatedealdata}>
                Update
              </Button>
              <Button variant="secondary" onClick={handleClose5}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>


          <Modal show={show7} onHide={handleClose7} size='xl'>
            <Modal.Header>
              <Modal.Title>Update Property Owner</Modal.Title>
            </Modal.Header>
            <Modal.Body>
        

            <div  style={{padding:"5px"}}>
                <div className="row" style={{width:"100%"}}>
               
                        <div className="col-md-9" id="suggestion-box" style={{ position: 'relative' }}><label className="labels" style={{visibility:"hidden"}}>Search</label><input type="search"className="form-control form-control-sm" value={input} placeholder="Type here For Search in Contact" required="true" onChange={handleInputChange}/></div>
                        {showSuggestions && input && filteredSuggestions.length > 0 && (
                            <ul className="suggestion-list">
                              {filteredSuggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                  {suggestion.first_name}
                                </li>
                              ))}
                            </ul>
                          )}
                        <div className="col-md-3"><label className="labels">Add Contact</label><button className="form-control form-control-sm" style={{width:"50px"}} onClick={handleShow1}>+</button></div>
                    
                     <div className="col-md-12" style={{marginTop:"20px"}}><label className="labels" >Owner Contact</label><div className="col-md-12"><hr></hr></div>
                     {selectedcontact1.length >= 0 && (
                      <div className="contact-details">
                        <table  style={{width:"100%"}}>
                          
                          <tbody>
                          {selectedcontact1.map(contact => (
                              <StyledTableRow>
                                <img style={{height:"70px",width:"80px"}} src="https://cdn-icons-png.flaticon.com/512/7084/7084424.png" alt=""></img>
                                <StyledTableCell  style={{ fontFamily: "times new roman",  cursor: 'pointer' }}>
                                    {contact.title} {contact.first_name} {contact.last_name}<br></br>
                                    <SvgIcon component={EmailIcon} />
                                    <span>{contact.email}</span>
                                </StyledTableCell>

                                <StyledTableCell  style={{ fontFamily: "times new roman",  cursor: 'pointer' }}>
                                  {contact.mobile_no.map((number, index) => (
                                    <span key={index}>
                                      <SvgIcon component={PhoneIphoneIcon} />
                                      {number}<br></br>
                                    </span>
                                  ))}
                                </StyledTableCell>

                                <StyledTableCell  style={{ fontFamily: "times new roman",  cursor: 'pointer' }}>
                                  S/W/O <br></br>{contact.father_husband_name}
                                  </StyledTableCell>

                                  <StyledTableCell  style={{ fontFamily: "times new roman",  cursor: 'pointer' }}>
                                  permanent address: <br></br>{contact.h_no}<br></br>{contact.area1}
                                  {contact.location1} {contact.city1} {contact.state1} {contact.country1} {contact.pincode1} 
                                  </StyledTableCell>

                                  <StyledTableCell style={{ fontFamily: "times new roman", cursor: 'pointer' }}>
                                        <span style={{color:"orange",fontWeight:"bolder"}}>Owner</span>
                                    </StyledTableCell>

                                <StyledTableCell>
                                  <img style={{height:"40px",cursor:"pointer"}} src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" alt="" onClick={() => removeContact(contact._id)}></img>
                                   </StyledTableCell>
                                
                              </StyledTableRow>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                </div>
                
                <div className="col-md-12" style={{marginTop:"20px"}}><label className="labels" >Associate Contact</label><div className="col-md-12"><hr></hr></div>
                {selectedcontact2.length >= 0 && (
                <div className="contact-details">
                    <table style={{width:"100%"}}>
                        <tbody>
                             {
                              
                              selectedcontact2.map(contact => (
                                <StyledTableRow>
                                    <img style={{ height: "70px", width: "80px" }} src="https://cdn-icons-png.flaticon.com/512/7084/7084424.png" alt="Contact" />
                                    <StyledTableCell style={{ fontFamily: "times new roman", cursor: 'pointer' }}>
                                        {contact.title} {contact.first_name} {contact.last_name}<br />
                                        <SvgIcon component={EmailIcon} />
                                        <span>{contact.email}</span>
                                    </StyledTableCell>

                                    <StyledTableCell style={{ fontFamily: "times new roman", cursor: 'pointer' }}>
                                        {
                                        Array.isArray(contact.mobile_no) ?
                                        contact.mobile_no.map((number, index) => (
                                            <span key={index}>
                                                <SvgIcon component={PhoneIphoneIcon} />
                                                {number}<br />
                                            </span>
                                        )):[]}
                                    </StyledTableCell>

                                    <StyledTableCell style={{ fontFamily: "times new roman", cursor: 'pointer' }}>
                                        S/W/O <br />{contact.father_husband_name}
                                    </StyledTableCell>

                                    <StyledTableCell style={{ fontFamily: "times new roman", cursor: 'pointer' }}>
                                        permanent address: <br />{contact.h_no}<br />{contact.area1} {contact.location1} {contact.city1} {contact.state1} {contact.country1} {contact.pincode1}
                                    </StyledTableCell>

                                    <StyledTableCell style={{ fontFamily: "times new roman", cursor: 'pointer' }}>
                                    <span style={{color:"orange",fontWeight:"bolder"}}>{relation1}</span>
                                    </StyledTableCell>
                                        
                                    <StyledTableCell>
                                        <img style={{ height: "40px", cursor: "pointer" }} src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" onClick={() => removeContact(contact._id)} alt="Remove" />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))} 
                        </tbody>
                    </table>
                </div>
            )}
            </div>
                     </div>
                  </div>
            


  

          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={updatedealownerdata}>
                Update
              </Button>
              <Button variant="secondary" onClick={handleClose7}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={show2} onHide={handleClose2} size='lg' style={{transition:"0.5s ease-in",backgroundColor:"gray"}}>
            <Modal.Header>
              <Modal.Title>Choose Relation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{width:"100%"}}>
            <div className="row">
                    <div className="col-md-4"><label className="labels">Relation</label><select className="form-control form-control-sm" required="true" onChange={handlerelationchange}>
                              <option>Select</option>
                              <option value="Self">Self</option>
                              <option value="Son">Son</option>
                              <option value="Father">Father</option>
                              <option value="Mother">Mother</option>
                              <option value="Uncle">Uncle</option>
                              <option value="Other">Other</option>
                        </select>
                  </div>
               </div>
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

export default Dealdetails;
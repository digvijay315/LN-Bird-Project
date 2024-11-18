import { useState } from 'react';
import'../css/addcontact.css';
import Header1 from './header1';
import Sidebar1 from './sidebar1';
import { ToastContainer, toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from "../api";
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {React, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Select, MenuItem, Checkbox, ListItemText } from '@mui/material';




function Projectform() {
  
  
    
       
     useEffect(()=>{fetchdeveloper()},[])

    const navigate=useNavigate(); 

    const add_developer=()=>
    {
      navigate('/adddeveloper')
    }

    const[data1,setdata1]=useState([]);
    const fetchdeveloper=async(event)=>
    {
      
      try {
        const resp=await api.get('viewcompany')
        
        setdata1(resp.data.developer)
      } catch (error) {
        console.log(error);
      }
    
    }

   
    

    const [project,setproject]=useState({name:"",developer_name:"",joint_venture:"",secondary_developer:"",rera_number:"",descriptions:"",
                                          category:[],sub_category:"",land_area:"",measurment1:"",total_block:"",total_floor:"",
                                          total_units:"",zone:[],status:"",launched_on:"",expected_competion:"",possession:"",parking_type:"",
                                          approved_bank:"",approvals:[''],registration_no:[''],date:[''],pic:[''],action1:[],owner:[],
                                          team:[],visible_to:"",
                         
                                          location:"",lattitude:"",langitude:"",address:"",street:"",locality:"",city:"",zip:"",state:"",country:"",

                                          add_block:[],add_size:[],add_unit:[],basic_aminities:[],features_aminities:[],nearby_aminities:[],
                                          price_list:[],Payment_plan:[]});
    
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data' // Set the Content-Type here
            }
        }
      
    const addproject=async(e)=>
    {
      
        e.preventDefault();
        try {
            const resp= await api.post('project',project,config)
        if(resp.status===201)
            {
                toast.success("Project Saved",{ autoClose: 2000 })
                setTimeout(() => {
                  navigate('/project')
                }, 2000);
            }
            
      
        } catch (error) {
            toast.error(error.response.data.message,{ autoClose: 2000 })
        }
    }

    const time=new Date()
    
    
     

        const mousehover=()=>
            {
               document.getElementById("r").style.marginLeft="15%"
               
            }
            const mouseout=()=>
                {
                    document.getElementById("r").style.marginLeft="0%"
                }

// ----------------------=========================all form tab view toggle code ======================------------------------------------------      
        const basicdetails=()=>
          {
                document.getElementById("basicdetails1").style.display="flex"
                document.getElementById("location").style.display="none"
                document.getElementById("block").style.display="none"
                document.getElementById("sizedetails").style.display="none"
                document.getElementById("unitdetails").style.display="none"
                document.getElementById("aminities").style.display="none"
                document.getElementById("price").style.display="none"
              
                document.getElementById("basic").style.color="green"
                document.getElementById("other").style.color="black"
                document.getElementById("professional").style.color="black"
                document.getElementById("size1").style.color="black"
                document.getElementById("unit").style.color="black"
                document.getElementById("aminities1").style.color="black"
                document.getElementById("prices").style.color="black"
          }
          const professionaldetails=()=>
            {
                document.getElementById("basicdetails1").style.display="none"
                document.getElementById("location").style.display="flex"
                document.getElementById("block").style.display="none"
                document.getElementById("sizedetails").style.display="none"
                document.getElementById("unitdetails").style.display="none"
                document.getElementById("aminities").style.display="none"
                document.getElementById("price").style.display="none"
              

                document.getElementById("basic").style.color="black"
                document.getElementById("other").style.color="black"
                document.getElementById("professional").style.color="green"
                document.getElementById("size1").style.color="black"
                document.getElementById("unit").style.color="black"
                document.getElementById("aminities1").style.color="black"
                document.getElementById("prices").style.color="black"
               
            }
          const otherdetails=()=>
            {
                  document.getElementById("basicdetails1").style.display="none"
                  document.getElementById("location").style.display="none"
                  document.getElementById("block").style.display="flex"
                  document.getElementById("sizedetails").style.display="none"
                  document.getElementById("unitdetails").style.display="none"
                  document.getElementById("aminities").style.display="none"
                  document.getElementById("price").style.display="none"

                  document.getElementById("basic").style.color="black"
                  document.getElementById("professional").style.color="black"
                  document.getElementById("other").style.color="green"
                  document.getElementById("size1").style.color="black"
                  document.getElementById("unit").style.color="black"
                  document.getElementById("aminities1").style.color="black"
                  document.getElementById("prices").style.color="black"
            }
            const sizedetails=()=>
                {
                      document.getElementById("basicdetails1").style.display="none"
                      document.getElementById("location").style.display="none"
                      document.getElementById("block").style.display="none"
                      document.getElementById("sizedetails").style.display="flex"
                      document.getElementById("unitdetails").style.display="none"
                      document.getElementById("aminities").style.display="none"
                      document.getElementById("price").style.display="none"

                      document.getElementById("basic").style.color="black"
                      document.getElementById("professional").style.color="black"
                      document.getElementById("other").style.color="black"
                      document.getElementById("size1").style.color="green"
                      document.getElementById("unit").style.color="black"
                      document.getElementById("aminities1").style.color="black"
                      document.getElementById("prices").style.color="black"
                }
                const unitdetails=()=>
                  {
                        document.getElementById("basicdetails1").style.display="none"
                        document.getElementById("location").style.display="none"
                        document.getElementById("block").style.display="none"
                        document.getElementById("sizedetails").style.display="none"
                        document.getElementById("unitdetails").style.display="flex"
                        document.getElementById("aminities").style.display="none"
                        document.getElementById("price").style.display="none"
      
                        document.getElementById("basic").style.color="black"
                        document.getElementById("professional").style.color="black"
                        document.getElementById("other").style.color="black"
                        document.getElementById("size1").style.color="black"
                        document.getElementById("unit").style.color="green"
                        document.getElementById("aminities1").style.color="black"
                        document.getElementById("prices").style.color="black"
                  }
                                  const unitdetail1=()=>
                                    {
                                      document.getElementById("unitdetails1").style.display="flex"
                                      document.getElementById("unitlocation").style.display="none"
                                  
                                    
                                      document.getElementById("unitdetail").style.color="green"
                                      document.getElementById("unitlocationdetails").style.color="black"
                                      
                                    }
                                    const unitdetail2=()=>
                                      {
                                        document.getElementById("unitdetails1").style.display="none"
                                        document.getElementById("unitlocation").style.display="flex"
                                    
                                      
                                        document.getElementById("unitdetail").style.color="black"
                                        document.getElementById("unitlocationdetails").style.color="green"
                                        
                                      }
                  const aminitiesdetails=()=>
                    {
                          document.getElementById("basicdetails1").style.display="none"
                          document.getElementById("location").style.display="none"
                          document.getElementById("block").style.display="none"
                          document.getElementById("sizedetails").style.display="none"
                          document.getElementById("unitdetails").style.display="none"
                          document.getElementById("aminities").style.display="flex"
                          document.getElementById("price").style.display="none"
          
                          document.getElementById("basic").style.color="black"
                          document.getElementById("professional").style.color="black"
                          document.getElementById("other").style.color="black"
                          document.getElementById("size1").style.color="black"
                          document.getElementById("unit").style.color="black"
                          document.getElementById("aminities1").style.color="green"
                          document.getElementById("prices").style.color="black"
                    }

                                    const basicaminities=()=>
                                      {
                                        document.getElementById("basicaminities").style.display="flex"
                                        document.getElementById("featuredaminities").style.display="none"
                                        document.getElementById("nearbyaminities").style.display="none"
                                    
                                          
                                        document.getElementById("featuredaminities1").style.color="black"
                                        document.getElementById("featuredaminities1").style.backgroundColor="white"
                                        document.getElementById("nearbyaminities1").style.color="black"
                                        document.getElementById("nearbyaminities1").style.backgroundColor="white"
                      
                                        document.getElementById("basicaminities1").style.backgroundColor="black"
                                        document.getElementById("basicaminities1").style.color="white"
                                        document.getElementById("basicaminities1").style.borderRadius="50px"
                                        document.getElementById("basicaminities1").style.width="80px"
                                        document.getElementById("basicaminities1").style.textAlign="center"
                                      
                                      
                                  
                                        
                                      }
                                      const featuredaminities=()=>
                                        {
                                          document.getElementById("basicaminities").style.display="none"
                                          document.getElementById("featuredaminities").style.display="flex"
                                          document.getElementById("nearbyaminities").style.display="none"
                                      
                                        
                                          document.getElementById("basicaminities1").style.color="black"
                                          document.getElementById("basicaminities1").style.backgroundColor="white"
                                          document.getElementById("nearbyaminities1").style.color="black"
                                          document.getElementById("nearbyaminities1").style.backgroundColor="white"
                      
                                          document.getElementById("featuredaminities1").style.backgroundColor="black"
                                          document.getElementById("featuredaminities1").style.color="white"
                                          document.getElementById("featuredaminities1").style.borderRadius="50px"
                                          document.getElementById("featuredaminities1").style.width="80px"
                                          document.getElementById("featuredaminities1").style.textAlign="center"
                                          
                                        }
                                        const nearbyaminities=()=>
                                          {
                                            
                                            document.getElementById("basicaminities").style.display="none"
                                            document.getElementById("featuredaminities").style.display="none"
                                            document.getElementById("nearbyaminities").style.display="flex"
                                        
                                          
                                            document.getElementById("basicaminities1").style.color="black"
                                            document.getElementById("basicaminities1").style.backgroundColor="white"
                                            document.getElementById("featuredaminities1").style.color="black"
                                            document.getElementById("featuredaminities1").style.backgroundColor="white"
                      
                                            document.getElementById("nearbyaminities1").style.backgroundColor="black"
                                            document.getElementById("nearbyaminities1").style.color="white"
                                            document.getElementById("nearbyaminities1").style.borderRadius="50px"
                                            document.getElementById("nearbyaminities1").style.width="80px"
                                            document.getElementById("nearbyaminities1").style.textAlign="center"
                                            
                                          }
                    const pricedetails=()=>
                      {
                            document.getElementById("basicdetails1").style.display="none"
                            document.getElementById("location").style.display="none"
                            document.getElementById("block").style.display="none"
                            document.getElementById("sizedetails").style.display="none"
                            document.getElementById("unitdetails").style.display="none"
                            document.getElementById("aminities").style.display="none"
                            document.getElementById("price").style.display="flex"
            
                            document.getElementById("basic").style.color="black"
                            document.getElementById("professional").style.color="black"
                            document.getElementById("other").style.color="black"
                            document.getElementById("size1").style.color="black"
                            document.getElementById("unit").style.color="black"
                            document.getElementById("aminities1").style.color="black"
                            document.getElementById("prices").style.color="green"
                      }
// ===================================-----------all form tab toggle code end------------------------------=================================
                   
  //--------------------------==========================  add delete and onchange event of array start -------------==================================     

          function addFn1() {
        
                    setproject({
                      ...project,
                      approvals: [...project.approvals, ''],
                      registration_no: [...project.registration_no, ''],
                      date: [...project.date, ''],
                      pic: [...project.pic, ''],
                      action1: [...project.action1, '']
                    });
                  };

          const deleteall1=(index)=>
            {
             
              const newapprovals = project.approvals.filter((_, i) => i !== index);
              const newregistrationno = project.registration_no.filter((_, i) => i !== index);
              const newdate = project.date.filter((_, i) => i !== index);
              const newpic = project.pic.filter((_, i) => i !== index);
              const newaction1 = project.action1.filter((_, i) => i !== index);
              
              setproject({
                ...project,
                approvals: newapprovals,
                registration_no: newregistrationno,
                date: newdate,
                pic:newpic,
                action1: newaction1
              });
            }
            const handleapprovalschange = (index, event) => {
              const newapprovals = [...project.approvals];
              newapprovals[index] = event.target.value;
              setproject({
                ...project,
                approvals: newapprovals
              });
            };
            const handleregistrationchange = (index, event) => {
              const newregistration = [...project.registration_no];
              newregistration[index] = event.target.value;
              setproject({
                ...project,
                registration_no: newregistration
              });
            };
            const handledatechange = (index, event) => {
              const newdate = [...project.date];
              newdate[index] = event.target.value;
              setproject({
                ...project,
                date: newdate
              });
            };
            const handlepicchange = (index, event) => {
              const newpic = [...project.pic];
              const files = Array.from(event.target.files);
              newpic[index] = {files:files}
              setproject({
                ...project,
                pic: newpic
              });
            };
         
              function addFn3() {
     
                setunits({
                  ...units,
                  floor:[...units.floor,''],
                  cluter_details: [...units.cluter_details, ''],
                  length: [...units.length, ''],
                  bredth: [...units.bredth, ''],
                  total_area: [...units.total_area, ''],
                  measurment2: [...units.measurment2, ''],
                  action3: [...units.action3, '']
                });
              };
              const deleteall3=(index)=>
                {
                  const newfloor = units.floor.filter((_, i) => i !== index);
                  const newcluter = units.cluter_details.filter((_, i) => i !== index);
                  const newlength = units.length.filter((_, i) => i !== index);
                  const newbreadth = units.bredth.filter((_, i) => i !== index);
                  const newtotalarea = units.total_area.filter((_, i) => i !== index);
                  const newmeasurement = units.measurment2.filter((_, i) => i !== index);
                  const newaction3=units.action3.filter((_,i) => i !== index);
                  
                  setunits({
                    ...units,
                    floor:newfloor,
                    cluter_details: newcluter,
                    length: newlength,
                    bredth: newbreadth,
                    total_area: newtotalarea,
                    measurment2: newmeasurement,
                    action3:newaction3
                  });
                }
                const handlefloorchange = (index, event) => {
                  const newfloor = [...units.floor];
                  newfloor[index] = event.target.value;
                  setunits({
                    ...units,
                    floor: newfloor
                  });
                };
                const handlecluterdetails = (index, event) => {
                  const newcluterdetails = [...units.cluter_details];
                  newcluterdetails[index] = event.target.value;
                  setunits({
                    ...units,
                    cluter_details: newcluterdetails
                  });
                };
                const handlelengthchange = (index, event) => {
                  const newlength = [...units.length];
                  newlength[index] = event.target.value;
                  setunits({
                    ...units,
                    length: newlength
                  });
                };
                const handlebredthchange = (index, event) => {
                  const newbreadth = [...units.bredth];
                  newbreadth[index] = event.target.value;
                  setunits({
                    ...units,
                    bredth: newbreadth
                  });
                };
                const handletotalarea = (index, event) => {
                  const newtotalarea = [...units.total_area];
                  newtotalarea[index] = event.target.value;
                  setunits({
                    ...units,
                    total_area: newtotalarea
                  });
                };
              
                function addFn4() {
     
                  setpayments({
                    ...payments,
                    step_name: [...payments.step_name, ''],
                    calculation_type: [...payments.calculation_type, ''],
                    blank1: [...payments.blank1, ''],
                    blank2: [...payments.blank2, ''],
                    blank3: [...payments.blank3, ''],
                    action4:[...payments.action4,'']
                  });
                };
                const deleteall4=(index)=>
                  {
                   
                    const newstepname = payments.step_name.filter((_, i) => i !== index);
                    const newcalculationtype = payments.calculation_type.filter((_, i) => i !== index);
                    const newblank1 = payments.blank1.filter((_, i) => i !== index);
                    const newblank2 = payments.blank2.filter((_, i) => i !== index);
                    const newblank3 = payments.blank3.filter((_, i) => i !== index);
                    const newaction4=payments.action4.filter((_,i) => i !== index);
                    
                    setpayments({
                      ...payments,
                      step_name: newstepname,
                      calculation_type: newcalculationtype,
                      blank1: newblank1,
                      blank2: newblank2,
                      blank3: newblank3,
                      action4:newaction4
                    });
                  }
                  const handlestepnamechange = (index, event) => {
                    const newstep = [...payments.step_name];
                    newstep[index] = event.target.value;
                    setpayments({
                      ...payments,
                      step_name: newstep
                    });
                  };
                  const handlecalculationtypechange = (index, event) => {
                    const newcalculationtype = [...payments.calculation_type];
                    newcalculationtype[index] = event.target.value;
                    setpayments({
                      ...payments,
                      calculation_type: newcalculationtype
                    });
                  };
                  const handleblank1change = (index, event) => {
                    const newblank1 = [...payments.blank1];
                    newblank1[index] = event.target.value;
                    setpayments({
                      ...payments,
                      blank1: newblank1
                    });
                  };
                  const handleblank2change = (index, event) => {
                    const newblank2 = [...payments.blank2];
                    newblank2[index] = event.target.value;
                    setpayments({
                      ...payments,
                      blank2: newblank2
                    });
                  };
                  const handleblank3change = (index, event) => {
                    const newblank3 = [...payments.blank3];
                    newblank3[index] = event.target.value;
                    setpayments({
                      ...payments,
                      blank3: newblank3
                    });
                  };
            
                

    //==================----------------- add delete and onchange event of array end---------------------------===============================

// ==============---------------------------google location code start-----------------====================================================

                        const [coordinates, setCoordinates] = useState('');
                        const handleSubmit = async (e) => {
                        try {
                          const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                            params: {
                              address: project.location,
                              key: 'AIzaSyACfBzaJSVH8eur7U9JxdjI1bAeTLXsUJc'  // Replace with your API key
                            }
                          });
                
                          if (response.data.results.length > 0) {
                            const { lat, lng } = response.data.results[0].geometry.location;
                            setCoordinates({ lat, lng });
                            setproject({...project,lattitude:lat,langitude:lng})
                          } else {
                            setCoordinates(null);
                            console.log('No results found');
                          }
                          
                        } catch (error) {
                          console.error('Error fetching coordinates:', error);
                        }
                      }
                      const mapStyles = {
                        height: "500px",
                        width: "100%"
                      }
                    
                      const defaultCenter = {
                        lat: coordinates.lat || 37.7749, lng: coordinates.lng || -122.4194
                      };

// ================================----------------------google location code end-----------------------------================================
                    

//================----------------------------- styled table view code start-----------------------==========================================

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

// ===================--------------------styled table view code end--------------------------------=============================================


//=================================================== all model open and close code start----==================================================
                      const [show1, setshow1] = useState(false);
    
                      const handleClose1 = () => setshow1(false);
                      const handleShow1=async()=>
                      {
                        setshow1(true);
                       
                      }
                      const [show2, setshow2] = useState(false);
    
                      const handleClose2 = () => setshow2(false);
                      const handleShow2=async()=>
                      {
                        setshow2(true);
                       
                      }
                      const [show3, setshow3] = useState(false);
    
                      const handleClose3 = () => setshow3(false);
                      const handleShow3=async()=>
                      {
                        setshow3(true);
                       
                      }
                      const [show4, setshow4] = useState(false);
    
                      const handleClose4 = () => setshow4(false);
                      const handleShow4=async()=>
                      {
                        setshow4(true);
                       
                      }
                      const [show5, setshow5] = useState(false);
    
                      const handleClose5 = () => setshow5(false);
                      const handleShow5=async()=>
                      {
                        setshow5(true);
                       
                      }
// ====================================----- all model open and close code end-------------===================================================
                     


// ---------------===============  size toggle start --------------===========================================================================
                    function selectsize()
                      {
                          const size=document.getElementById("subcategory").value;
                          if(size==="Apartment")
                              {
                                  setsizes({...sizes,sub_category:"Apartment"})
                                  document.getElementById("apartmentsize").style.display="flex"
                                  document.getElementById("plotsize").style.display="none"
                              }
                              if(size==="Plot")
                                  {
                                      setsizes({...sizes,sub_category:"Plot"})
                                      document.getElementById("apartmentsize").style.display="none"
                                      document.getElementById("plotsize").style.display="flex"
                                  }   
                             if(size==="Select") 
                              {
                                   document.getElementById("apartmentsize").style.display="none"
                                      document.getElementById("plotsize").style.display="none"
                              }
                              
                      }

  //==========================------------------------------- size toggle end--------------------------=================================
                      // const[category,setcategory]=useState([])
                      // const selectcategory=()=>
                      // {
                      //   if(document.getElementById("resd").style.backgroundColor!="green")
                      //   {
                      //     document.getElementById("resd").style.backgroundColor="green"
                      //     setcategory([...category,"Residential"])
                      //   }
                      //   else
                      //   {
                      //     document.getElementById("resd").style.backgroundColor="none"
                      //     const newcategory=category.filter((i)=>category[i]!=="Residential")
                      //     setcategory(newcategory)
                      //   }
                      
                      // }
                      // console.log(category);


// ======================------------------- both check boxes code start ---------------===============================================
                      const checkboxItems = [
                        "Car Parking",
                        "Intercom",
                        "Multi-Purpose Hall",
                        "24x7 Water Supply",
                        "Municipal Water Supply",
                        "Garbage Management System",
                        "Fire Fighting System",
                        "Visitor Car Parking",
                        "Earthquake Resistance",
                        "Lift",
                        "Maintenance Staff",
                        "Power Supply",
                        "Air Condition",
                        "Security",
                        "Bike Parking",
                        "Others"
                      ];
                      const [checkedItems, setCheckedItems] = useState(Array(checkboxItems.length).fill(false));
                      const [selectAll, setSelectAll] = useState(false);
                    
                      // Toggle individual checkboxes
                      const handleCheckboxChange = (index) => {
                        const updatedCheckedItems = [...checkedItems];
                        updatedCheckedItems[index] = !updatedCheckedItems[index];
                        setCheckedItems(updatedCheckedItems);

                        const selectedAminity = checkboxItems[index];

                        // Add or remove item from basic_aminities in the project state
                                setproject((prevState) => {
                                  const updatedBasicAminities = updatedCheckedItems[index]
                                    ? [...prevState.basic_aminities, selectedAminity]
                                    : prevState.basic_aminities.filter((item) => item !== selectedAminity);

                                  return {
                                    ...prevState,
                                    basic_aminities: updatedBasicAminities
                                  };
                                });
                    
                        // If any checkbox is unchecked, deselect "Select All"
                        if (updatedCheckedItems.some((item) => !item)) {
                          setSelectAll(false);
                        }
                      };
                    
                      // Handle "Select All" checkbox
                      const handleSelectAllChange = () => {
                        const newSelectAll = !selectAll;
                        setSelectAll(newSelectAll);
                        setCheckedItems(Array(checkboxItems.length).fill(newSelectAll));

                        setproject((prevState) => ({
                          ...prevState,
                          basic_aminities: newSelectAll ? checkboxItems : []
                        }));
                      };


                     

                      const checkboxItems1 = [
                          "Seniour Citizen Corner","Worship Place","HAVC System","Cricket Pitch",
                          "Two Tier Security","Cafeteria","Car Washing Area","No Common Wall",
                          "Driver Dormitory","EPABX System","CCTV","Gymaasium",
                          "Garden","Power Back Up","Party Lawn","Gazebo",
                          "Cold Storage","Solar Water Heater","Jogging Track","DTH Connection",
                          "Three Tier Security","Smoking Area","Spa & Saloon","Solar Power",
                          "Video Door Phone","Utility Shop","Steam Room","Amphi Theatre",
                          "Private Car Parking","Guest Room","Internet","Kids Play area",
                          "Barbeque Facility","Basket Ball Court","Skating Rink","Socity Office",
                          "Squash Court","Waiting Longue","Yoga And Meditation Center","Water Softener",
                          "Swipe Card Entry","Health Facilities","Library","Day Care Center",
                          "Reception","Shiping Stores","Laundry Room","Indoor Games",
                          "Piped Lpg Connection","Confrence Or Meeting Room","Badminton Court","Sauna Bath",
                          "Rain Water Harvesting","Jacuzzi","Massage Parlor","Tution Room",
                          "Restaurant","Tennis Court","Club House","Swimming Pool",
                          "Wi-Fi","Mini Theater","Modular Kitchen","Cycliing Track",
                          "Outdoor Games"


                      ];
                      const [checkedItems1, setCheckedItems1] = useState(Array(checkboxItems1.length).fill(false));
                      const [selectAll1, setSelectAll1] = useState(false);
                    
                      // Toggle individual checkboxes
                      const handleCheckboxChange1 = (index) => {
                        const updatedCheckedItems1 = [...checkedItems1];
                        updatedCheckedItems1[index] = !updatedCheckedItems1[index];
                        setCheckedItems1(updatedCheckedItems1);

                        const selectedAminity1 = checkboxItems1[index];

                        // Add or remove item from basic_aminities in the project state
                                setproject((prevState) => {
                                  const updatedBasicAminities = updatedCheckedItems1[index]
                                    ? [...prevState.features_aminities, selectedAminity1]
                                    : prevState.features_aminities.filter((item) => item !== selectedAminity1);

                                  return {
                                    ...prevState,
                                    features_aminities: updatedBasicAminities
                                  };
                                });
                    
                        // If any checkbox is unchecked, deselect "Select All"
                        if (updatedCheckedItems1.some((item) => !item)) {
                          setSelectAll1(false);
                        }
                      };
                    
                      // Handle "Select All" checkbox
                      const handleSelectAllChange1 = () => {
                        const newSelectAll1 = !selectAll1;
                        setSelectAll1(newSelectAll1);
                        setCheckedItems1(Array(checkboxItems1.length).fill(newSelectAll1));

                        setproject((prevState) => ({
                          ...prevState,
                          features_aminities: newSelectAll1 ? checkboxItems1 : []
                        }));
                      };
                    
                    

// ---------------------=============== both check box code end--------------------------------========================================

// ===========================------------------block add and remove code---------------------=================================================
                                    const[blocks,setblocks]=useState([])
                                    const[block,setblock]=useState({block_name:"",category:[],sub_category:"",land_area:"",
                                                                    measurment:"",total_blocks:"",total_floors:"",total_units:"",
                                                                    status:"",launched_on:"",expected_competion:"",possession:"",
                                                                    parking_type:"",rera_no:""})

                                        const addblock = () => {
                       
                                            if (block.block_name ) 
                                              {
                                                setblock({...block,category:project.category})
                                                const updateblocks= [...blocks, block];
                                                setblocks(updateblocks);
                                                setproject(prevState => ({
                                                  ...prevState,
                                                  add_block: updateblocks
                                                }));
                                                setblock('')
                                                handleClose1()
                                                 } 
                                                 else
                                                   {
                                                       toast.error("Please fill out all fields.");
                                                   }
                                                 };
                                                
                                                 
                                    const deleteblock = (index) => {
                                    

                                      // Filter out the destination at the given index
                                      const newblocks = project.add_block.filter((_, i) => i !== index);
                                      setblocks(newblocks)

                                      // Set the updated destination details
                                      setproject(prevState => ({
                                        ...prevState,
                                        add_block: newblocks
                                      }));
                                    };

//===================================--------------------------- size add and delete start---------------------------=======================


                                            const[size,setsize]=useState([])
                                            
                                            const[sizes,setsizes]=useState({size_name:"",block1:"",category:[],sub_category:"",
                                                                            total_sealable_area:"",sq_feet1:"sqfeet",covered_area:"",sq_feet2:"sqfeet",
                                                                            carpet_area:"",sq_feet3:"sqfeet",loading:"",percentage:"%",
                                                                            length:"",yard1:"yard",bredth:"",yard2:"yard",total_area:"",yard3:"yard"})

                                                const addsize = () => {

                                                    if (sizes.size_name ) 
                                                      {
                                                       
                                                        const updatesizes= [...size, sizes];
                                                        setsize(updatesizes);
                                                        setproject(prevState => ({
                                                          ...prevState,
                                                          add_size: updatesizes
                                                        }));
                                                        setsizes('')
                                                        handleClose2()

                                                           document.getElementById("choosedestination").value="Select"
                                                        } 
                                                        else
                                                          {
                                                              toast.error("Please fill out all fields.");
                                                          }
                                                        };
                                            const deletesize = (index) => {


                                              // Filter out the destination at the given index
                                              const newsizes = project.add_size.filter((_, i) => i !== index);

                                              // Set the updated destination details
                                              setproject(prevState => ({
                                                ...prevState,
                                                add_size: newsizes
                                              }));
                                              setsize(newsizes)
                                            };





// ================================-----------------size add and delete end------------------------=========================================


// ==============================----------------------add unit start===========================================---------------------------
                                          const[unit,setunit]=useState([])
                                          const[units,setunits]=useState({unit_no:"",unit_type:"",category:[],block:"",
                                                                          size:"",direction:"",facing:"",road:"",ownership:"",floor:[''],
                                                                          cluter_details:[''],length:[''],bredth:[''],total_area:[''],measurment2:['sqfeet'],
                                                                          action3:[],ocupation_date:"",age_of_construction:"",furnishing_details:"",
                                                                          furnished_item:"",location:"",lattitude:"",langitude:""})

                                              const addunit = () => {

                                                  if (units.unit_no ) 
                                                    {
                                                      const updateunit= [...unit, units];
                                                      setunit(updateunit);
                                                      setproject(prevState => ({
                                                        ...prevState,
                                                        add_unit: updateunit
                                                      }));
                                                      setunits('')
                                                      handleClose3()

                                                        document.getElementById("choosedestination").value="Select"
                                                      } 
                                                      else
                                                        {
                                                            toast.error("Please fill out all fields.");
                                                        }
                                                      };
                                          const deleteunit = (index) => {


                                            // Filter out the destination at the given index
                                            const newunit = project.add_unit.filter((_, i) => i !== index);
                                          
                                            // Set the updated destination details
                                            setproject(prevState => ({
                                              ...prevState,
                                              add_unit: newunit
                                            }));
                                            setunit(newunit)
                                          };



// ================================------------------------add unit end========================================----------------------------


                                 
                              
                                    
// -------------------------==========================destinations add and delete code start---------------------------------====================

                    const[destinationdetails,setdestinationdetails]=useState([])
                      const[destinations,setdestinations]=useState({destination:"",name_of_destination:"",distance:"",measurment:""})
                   
                      const adddestination = () => {
                       
                        if (destinations.destination && destinations.name_of_destination && destinations.distance && destinations.measurment) {
                          const updatedestination= [...destinationdetails, destinations];
                          setdestinationdetails(updatedestination);
                          setproject(prevState => ({
                            ...prevState,
                            nearby_aminities: updatedestination
                          }));
                          

                          // Clear the input fields after adding
                        
                          document.getElementById("nameofdestination").value=""
                          document.getElementById("destination").value=""
                          document.getElementById("measurment").value=""
                          document.getElementById("choosedestination").value="Select"
                        } else {
                          toast.error("Please fill out all fields.");
                        }
                      };
                      const deletedestination = (index) => {
                       
                      
                        // Filter out the destination at the given index
                        const newDestinationDetails = project.nearby_aminities.filter((_, i) => i !== index);
                      
                        // Set the updated destination details
                        setproject(prevState => ({
                          ...prevState,
                          nearby_aminities: newDestinationDetails
                        }));
                      };
// ========================-----------------------------destination add and delete end--------------------------------------------============

// ====================-----------------------------price add and delete--------------------------------------------===========================
                          const[price,setprice]=useState([])
                          const[prices,setprices]=useState({block:"",category:[],sub_category:"",size:"",
                                                          covered_area:"",base_rate:"",
                                                          name:"",type:"",calculation_type:"",blank1:"",blank2:"",blank3:"",
                                                          name1:"",type1:"",calculation_type1:"",blank4:""})

                              const addprice = () => {

                                  if (prices.block ) 
                                    {
                                      const updateprice= [...price, prices];
                                      setprice(updateprice);
                                      setproject(prevState => ({
                                        ...prevState,
                                        price_list: updateprice
                                      }));
                                      handleClose4()

                                      
                                      } 
                                      else
                                        {
                                            toast.error("Please fill out all fields.");
                                        }
                                      };
                          const deleteprice = (index) => {


                            // Filter out the destination at the given index
                            const newprice = project.price_list.filter((_, i) => i !== index);

                            // Set the updated destination details
                            setproject(prevState => ({
                              ...prevState,
                              price_list: newprice
                            }));
                          };



// =======================------------------------price add and delete end====================-----------------------------------------
  

// ===================================-----payment plan add and delete start-----------------------==================================


                                const[payment,setpayment]=useState([])
                                const[payments,setpayments]=useState({payment_planname:"",step_name:[''],calculation_type:[''],
                                                                blank1:[''],blank2:[''],blank3:[''],action4:[],condition:""})

                                    const addpayment = () => {

                                        if (payments.payment_planname) 
                                          {
                                            const updatepayment= [...payment, payments];
                                            setpayment(updatepayment);
                                            setproject(prevState => ({
                                              ...prevState,
                                              Payment_plan: updatepayment
                                            }));
                                            handleClose5()

                                            
                                            } 
                                            else
                                              {
                                                  toast.error("Please fill out all fields.");
                                              }
                                            };
                                const deletepayment = (index) => {


                                  // Filter out the destination at the given index
                                  const newpayment = project.Payment_plan.filter((_, i) => i !== index);

                                  // Set the updated destination details
                                  setproject(prevState => ({
                                    ...prevState,
                                    Payment_plan: newpayment
                                  }));
                                };

// -------------------------========================payment plan add and delete end--------------------------===========================

                    const modules = {
                      toolbar: [
                        [{ 'font': [] }, { 'size': [] }], // font and size
                        [{ 'header': '1'}, { 'header': '2'}, { 'header': [3, 4, 5, 6, false] }], // headers
                        [{ 'color': [] }, { 'background': [] }], // color and background
                        ['bold', 'italic', 'underline', 'strike'], // formatting buttons
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }], // lists
                        [{ 'align': [] }], // text alignment
                        ['link', 'image'], // link and image options
                        ['clean'] // remove formatting button
                      ]
                    };

                    // Formats that should be available
                    const formats = [
                      'font', 'size', 'header',
                      'bold', 'italic', 'underline', 'strike',
                      'color', 'background',
                      'list', 'bullet',
                      'align',
                      'link', 'image'
                    ];
                const[ischecked,setischecked]=useState(false)
                const handleischeckedchange = (e) => {
                  setischecked(e.target.checked); // Update the state based on checkbox status
                };

                const handleTypeClick = (type) => {
                  setproject(prevProject => {
                      const { category } = prevProject;
                      if (category.includes(type)) {
                          // Remove the type from basic_aminities if already selected
                          return { ...prevProject, category: category.filter(item => item !== type) };
                      } else {
                          // Add the type to basic_aminities if not already selected
                          return { ...prevProject, category: [...category, type] };
                      }
                  });
                };
                const handleTypeClick1 = (type) => {
                   document.getElementById("bcat").style.backgroundColor="green"
                  setblock(prevProject => {
                    const category = Array.isArray(prevProject.category) ? prevProject.category : [];
                      // if (category.includes(type)) {
                      //     // Remove the type from basic_aminities if already selected
                      //     return { ...prevProject, category: category.filter(item => item !== type) };
                      // } else {
                          // Add the type to basic_aminities if not already selected
                          return { ...prevProject, category: [ ...category,type] };
                      //}
                  });
               
                };
                // const handleTypeClick2 = (type) => {
                //   setsizes(prevProject => {
                //     const category = Array.isArray(prevProject.category) ? prevProject.category : [];
                    
                //     // Prevent state update if there's no change (to avoid unnecessary re-renders)
                //     if (!category.includes(type)) {
                //       return { ...prevProject, category: [...category, type] };
                //     }
                    
                //     // If 'type' is already in the category, don't change the state
                //     return prevProject;
                //   });
                // };
                
                // const handleTypeClick3 = (type) => {
                //   // document.getElementById("ucat").style.backgroundColor="green"
                //   setunits(prevProject => {
                //       const { category } = prevProject;
                //       // if (category.includes(type)) {
                //       //     // Remove the type from basic_aminities if already selected
                //       //     return { ...prevProject, category: category.filter(item => item !== type) };
                //       // } else {
                //           // Add the type to basic_aminities if not already selected
                //           return { ...prevProject, category: [ type] };
                //       //}
                //   });
                // };


                const isSelected = (type) => project.category.includes(type);
                const getSubcategories = () => {
                  const subcategories = [];
                  if (isSelected('Residential')) {
                      subcategories.push('Plot', 'Indenpendent House','Flat','Apartment','Builder Floor');
                  }
                  if (isSelected('Commercial')) {
                    subcategories.push('Shop','Showroom','Office Space','Retail Store','Soho','Excutive Room','Multiplex','Virtual Space','Plot');
                  }
                  if (isSelected('Agricultural')) {
                      subcategories.push('Land','Farm House');
                      document.getElementById("withoutagriculture").style.display="none";
                      document.getElementById("totalfloors").style.display="none";
                      document.getElementById("zonelist").style.display="block";
                  }
                  if (isSelected('Industrial')) {
                    subcategories.push('Plot','Ware House','Cold Storage','Rice Seller','Building','Factory');
                  }
                if (isSelected('Institutional')) {
                  subcategories.push('School','Hotel','Universities','Hospital','Collage');
                }
                  return subcategories;
              };

              
                
                const baseprice=()=>
                {
                  document.getElementById("baseprice").style.display="flex"
                  document.getElementById("baseprice1").style.color="green"
                  document.getElementById("charges").style.display="none"
                  document.getElementById("charges1").style.color="black"
                  document.getElementById("taxes").style.display="none"
                  document.getElementById("taxes1").style.color="black"
                }
                const charges=()=>
                  {
                    document.getElementById("baseprice").style.display="none"
                    document.getElementById("baseprice1").style.color="black"
                    document.getElementById("charges").style.display="flex"
                    document.getElementById("charges1").style.color="green"
                    document.getElementById("taxes").style.display="none"
                    document.getElementById("taxes1").style.color="black"
                  }
                  const taxes=()=>
                    {
                      document.getElementById("baseprice").style.display="none"
                      document.getElementById("baseprice1").style.color="black"
                      document.getElementById("charges").style.display="none"
                      document.getElementById("charges1").style.color="black"
                      document.getElementById("taxes").style.display="flex"
                      document.getElementById("taxes1").style.color="green"
                    }

                    const ownersList = [
                      'Suraj',
                      'Suresh Kumar',
                      'Ramesh Singh',
                      'Maanav Sharma',
                      'Sukram'
                  ];
                    const [owners, setOwners] = useState([]);

                    const handleOwnerChange = (event) => {
                      const {
                          target: { value },
                      } = event;
              
                      const selectedOwners = typeof value === 'string' ? value.split(',') : value;
              
                      setOwners(selectedOwners);
                      setproject({ ...project, owner: selectedOwners });
                  };

                  const teamlist = [
                    'Sales',
                    'Marketing',
                    'Post Sales',
                    'Pre Sales'
                ];
                  const [teams, setteams] = useState([]);

                  const handleteamchange = (event) => {
                    const {
                        target: { value },
                    } = event;
            
                    const selectedteam = typeof value === 'string' ? value.split(',') : value;
            
                    setteams(selectedteam);
                    setproject({ ...project, team: selectedteam });
                };
                const bankOptions = [
                  { value: 'sbi', label: 'State Bank of India', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/2048px-SBI-logo.svg.png' },
                  { value: 'hdfc', label: 'HDFC Bank', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPiQARLn9IY-nzbl9wU0-IHn6_lcfZvCa76w&s' },
                  { value: 'icici', label: 'ICICI Bank', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd2SufMo9hay75vGgsFcIX0kbzn1fCuOPQqg&s' },
                  { value: 'axis', label: 'Axis Bank', logo: 'https://download.logo.wine/logo/Axis_Bank/Axis_Bank-Logo.wine.png' },
                  { value: 'punjab_national', label: 'Punjab National Bank', logo: 'https://iconape.com/wp-content/files/ek/208557/svg/208557.svg' },
                  { value: 'bank_of_baroda', label: 'Bank of Baroda', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPjV3MWR0PoGMFoqLEgZe5RUF49lU-Z3Ofyw&s' },
                  { value: 'union_bank', label: 'Union Bank of India', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIv2bcBKrbGxkjWvLX08z-80PgmL9v-SRvzA&s' },
                  { value: 'kotak', label: 'Kotak Mahindra Bank', logo: 'https://seekvectors.com/files/download/Kotak%20Mahindra%20Bank.png' },
              ];
              const [selectedBanks, setSelectedBanks] = useState([]);

              const handleChange = (event) => {
                  const value = event.target.value;
                  setSelectedBanks(value);
          
                  // Map selected values to include both name and logo
                  const approvedBanks = value.map((bankValue) => {
                      const option = bankOptions.find(opt => opt.value === bankValue);
                      return {
                          name: option.label,
                          logo: option.logo,
                      };
                  });
          
                  // Update project state with approved banks
                  setproject(prevState => ({
                      ...prevState,
                      approved_bank: approvedBanks
                  }));
              };
        
              
              const zoneslist = [
                'Residential Zone',
                'Industrial Zone',
                'Institutional Zone',
                'MC Limit',
                'Agriculture Zone (Outside Controlled Area)',
                'Agriculture Zone (With in Controlled Area)',
                'No Construction Zone',
                'Transport & Communication Zone',
                'Mix Land Use Zone'
            ];
             
              const [zone, setzone] = useState([]);

              const handlezonechange = (event) => {
                const {
                    target: { value },
                } = event;
        
                const selectedzone = typeof value === 'string' ? value.split(',') : value;
        
                setzone(selectedzone);
                setproject({ ...project, zone: selectedzone });
            };
            
            
              
    return ( 
        <div>
            <div id='h'><Header1/></div>
            <div onMouseOver={mousehover} onMouseOut={mouseout}><Sidebar1/></div>
           
           <div style={{padding:"50px"}}>
            <div className="container rounded bg-white mt-5 mb-5" style={{width:"80%",marginLeft:"150px"}}>
    <div className="row" id='r' style={{transition:"0.5s"}}>
        <div className="col-md-12 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right" style={{cursor:"pointer"}} onClick={()=>window.location.reload()}>Add Project</h4><input type='checkbox'  style={{marginLeft:"60%",height:"20px",width:"20px"}} /><label style={{paddingTop:"5px"}}>only show required field</label>
                </div><hr></hr>
               
         
                <div style={{display:"flex"}}>
               <div style={{display:"flex",gap:"30px"}}>
               <div  id='basic' onClick={basicdetails} style={{cursor:'pointer',fontWeight:"bold"}}>Basic |</div>
                <div  id='professional' onClick={professionaldetails} style={{cursor:'pointer',fontWeight:"bold"}}>Location |</div>
                <div  id='other' onClick={otherdetails} style={{cursor:'pointer',fontWeight:"bold"}}>Block |</div> 
                <div  id='size1' onClick={sizedetails} style={{cursor:'pointer',fontWeight:"bold"}}>Size |</div>
                <div  id='unit' onClick={unitdetails} style={{cursor:'pointer',fontWeight:"bold"}}>Unit |</div>
                <div  id='aminities1' onClick={aminitiesdetails} style={{cursor:'pointer',fontWeight:"bold"}}>Aminities |</div> 
                <div  id='prices' onClick={pricedetails} style={{cursor:'pointer',fontWeight:"bold"}}>Price |</div> 
               </div>
						    <div style={{marginLeft:"20%"}}><input type="text" class="form-control form-control-sm" placeholder={time} value={time} style={{border:"none"}}/></div>
					</div>
                    <hr></hr>
                
                
                
            
 {/*------------------------------------------ basic details start------------------------------------------------------------------------ */}
               
                <div className="row" id='basicdetails1' style={{marginTop:"40px"}}>
                <div className="col-md-6"><label className="labels">Name</label><input type="text" required="true" className="form-control form-control-sm"  onChange={(e)=>setproject({...project,name:e.target.value})}/></div>
                <div className='col-md-6'></div>
                    <div className="col-md-6"><label className="labels">Developer Name</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setproject({...project,developer_name:e.target.value})}>
                              <option>Select</option>
                              {
                                data1.map((item)=>
                                (
                                  <option>{item.name}</option>
                                ))
                              }
                        </select>
                        </div>
                        <div className='col-md-1'><label style={{visibility:"hidden"}}>add</label><button className='form-control form-control-sm' onClick={add_developer}>+</button></div>
                        <div className='col-md-5'></div>
                        <div className="col-md-6"><input  type='checkbox' onChange={handleischeckedchange} checked={ischecked} /><label style={{margin:"10px"}}>Is this a Joint Venture?</label></div>
                        <div className="col-md-6"><label className="labels">Secondary Developer</label><select id='secondarydeveloper'  className="form-control form-control-sm" required="true" disabled={!ischecked} onChange={(e)=>setproject({...project,secondary_developer:e.target.value})}>
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

                    <div className="col-md-5"><label className="labels">Rera Number</label><input type="text" required="true" className="form-control form-control-sm"  onChange={(e)=>setproject({...project,rera_number:e.target.value})}/></div>
                    <div className='col-md-7'></div>

                    <div className="col-md-10"><label className="labels">Descriptions</label><ReactQuill value={project.descriptions} formats={formats} modules={modules}   style={{height:"200px"}} onChange={(value) => setproject({ ...project, descriptions: value })}/></div>
                    <div className="col-md-2"></div>
                    
                   
                    <div className="col-md-12" style={{ display: "flex",marginTop:"70px" }}><label className="labels">Category</label>
            {['Residential', 'Commercial', 'Agricultural', 'Institutional', 'Industrial'].map((type) => (
                <div className="col-md-2" key={type} style={{marginTop:"20px"}}>
                    <button 
                        className='form-control form-control-sm' 
                        onClick={() => handleTypeClick(type)} 
                        style={{ backgroundColor: isSelected(type) ? 'green' : '' }}
                    >
                        {type}
                    </button>
                </div>
            ))}
        </div>
                    <div className="col-md-6"><label className="labels">Sub Category</label><select id='subcategory' className="form-control form-control-sm" required="true" onChange={(e)=>setproject({...project,sub_category:e.target.value})}>
                              <option>Select</option>
                              {getSubcategories().map((subCategory) => (
                        <option key={subCategory} value={subCategory}>
                            {subCategory}
                        </option>
                    ))}
                        </select>
                    </div>
                    <div className="col-md-6"></div>

                        <div className="col-md-2"><label className="labels">Land Area</label><input type="text" className="form-control form-control-sm" required="true" onChange={(e)=>setproject({...project,land_area:e.target.value})}/></div>
                        <div className="col-md-2"><label className="labels" style={{visibility:"hidden"}}>.</label>
                        <select className="form-control form-control-sm" required="true" onChange={(e)=>setproject({...project,measurment1:e.target.value})}>
                              <option>Acres.</option>
                              <option>Mrs.</option>
                              <option>Sh.</option>
                              <option>Smt.</option>
                              <option>Dr.</option>
                              <option>Er.</option>
                              <option>Col.</option>
                              <option>Maj.</option>
                        </select>
                       </div>
                        <div className="col-md-2"><label className="labels">Total Blocks</label><input type="number" defaultValue={'0'} className="form-control form-control-sm" required="true" onChange={(e)=>setproject({...project,total_block:e.target.value})}/></div>
                        <div className="col-md-2" id='totalfloors'><label className="labels">TOTAL Floor</label><input type="number" defaultValue={'0'} className="form-control form-control-sm" required="true"  onChange={(e)=>setproject({...project,total_floor:e.target.value})}/></div>
                        <div className="col-md-2"><label className="labels">TOTAL Units</label><input type="number" defaultValue={'0'} className="form-control form-control-sm" required="true" onChange={(e)=>setproject({...project,total_units:e.target.value})}/></div>
                        <div className="col-md-2"></div>

                        <div className="col-md-10" id='zonelist' style={{display:"none"}}><label className="labels">Zone</label>
                        <Select className="form-control form-control-sm" style={{border:"none"}}
                            multiple
                            value={zone}
                            onChange={handlezonechange}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {zoneslist.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={zone.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                       </div>
                     <div className='row' id='withoutagriculture' style={{padding:"20px,0"}}>
                        <div className="col-md-8"><label className="labels">Status</label>
                        <select className="form-control form-control-sm" required="true" onChange={(e)=>setproject({...project,status:e.target.value})}>
                              <option>Upcoming</option>
                              <option>Mrs.</option>
                              <option>Sh.</option>
                              <option>Smt.</option>
                              <option>Dr.</option>
                              <option>Er.</option>
                              <option>Col.</option>
                              <option>Maj.</option>
                        </select>
                       </div>
                       <div className="col-md-4"></div>

                       <div className="col-md-4" ><label className="labels">Launched On</label><input type="date" className="form-control form-control-sm" required="true" onChange={(e)=>setproject({...project,launched_on:e.target.value})}/></div>
                       <div className="col-md-4" ><label className="labels">Expected Competion</label><input type="date" className="form-control form-control-sm" required="true" onChange={(e)=>setproject({...project,expected_competion:e.target.value})}/></div>
                       <div className="col-md-4" ><label className="labels">Possession</label><input type="date"   className="form-control form-control-sm" required="true" onChange={(e)=>setproject({...project,possession:e.target.value})}/></div>

                       <div className="col-md-6"><label className="labels">Parking Type</label>
                        <select className="form-control form-control-sm" required="true" onChange={(e)=>setproject({...project,parking_type:e.target.value})}>
                              <option>Upcoming</option>
                              <option>Mrs.</option>
                              <option>Sh.</option>
                              <option>Smt.</option>
                              <option>Dr.</option>
                              <option>Er.</option>
                              <option>Col.</option>
                              <option>Maj.</option>
                        </select>
                       </div>
                       <div className="col-md-6"><label className="labels">Approved Bank</label>
                       <Select className="form-control form-control-sm" style={{border:"none"}}
                labelId="bank-select-label"
                multiple
                value={selectedBanks}
                onChange={handleChange}
                renderValue={(selected) => selected.map((value) => {
                    const option = bankOptions.find(opt => opt.value === value);
                    return option.label;
                }).join(', ')}
            >
                {bankOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        <Checkbox checked={selectedBanks.indexOf(option.value) > -1} />
                        <ListItemText primary={option.label} />
                        <img src={option.logo} alt={option.label} style={{ width: 50, height: 40 }} />
                    </MenuItem>
                ))}
            </Select>
                       </div>
                <div className="col-md-2" > <label className="labels">Approvals</label>
                    {
                      project.approvals.map((item,index)=>
                      (
                        <select style={{marginTop:"10px"}} required="true" className="form-control form-control-sm" onChange={(event)=>handleapprovalschange(index,event)}>
                        <option>choose</option>
                        <option>Upcoming</option>
                              <option>Mrs.</option>
                              <option>Sh.</option>
                              <option>Smt.</option>
                              <option>Dr.</option>
                              <option>Er.</option>
                              <option>Col.</option>
                              <option>Maj.</option>
                        </select> 
                      ))
                    }
                    </div>
                    <div className="col-md-3"><label className="labels">Registration No.</label>
                    {
                       project.registration_no.map((item,index)=>
                        (
                          <input type="text" required="true" style={{marginTop:"10px"}} 
                          className="form-control form-control-sm" 
                          
                          onChange={(event)=>handleregistrationchange(index,event)}/>
                          
                        ))
                    }
                    </div>
                    <div className="col-md-2"><label className="labels">Date</label>
                    {
                       project.date.map((item,index)=>
                        (
                          <input type="date" required="true" style={{marginTop:"10px"}} 
                          className="form-control form-control-sm" 
                          placeholder="enter phone number" 
                          onChange={(event)=>handledatechange(index,event)}/>
                          
                        ))
                    }
                    </div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Pic</label>
                    {
                      project.pic.map((item,index)=>
                      (
                        <input type="file" 
                        style={{marginTop:"10px"}}
                        className="form-control form-control-sm" 
                        onChange={(event)=>handlepicchange(index,event)}
                        />
                      ))
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                       project.action1.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall1(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                  
                          
                        ))
                    }
                    </div>
                  <div className="col-md-1"><label className="labels" >add</label><button className='form-control form-control-sm' onClick={addFn1}>+</button></div>
                    
                  </div>
                  
                 
                  

                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                    
                    <div className="col-md-6"><label className="labels">Owner</label>
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
                  
                        <div className="col-md-6"><label className="labels">Team</label>
                        <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={teams}
                    onChange={handleteamchange}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {teamlist.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={teams.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>

                    </div>
                  
                        <div className="col-md-6"><label className="labels">Visible to</label><select className="form-control form-control-sm" onChange={(e)=>setproject({...project,visible_to:e.target.value})}>
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
                  
  {/* -----------------------------------------location Details start------------------------------------------------------------------- */}

        <div className="col-md-12" id='location' style={{display:"none",marginTop:"-80px",lineHeight:"30px"}}>
            <div className="p-3 py-5">
                <div className="row " >
                <div className="col-md-12" style={{border:"1px solid black",height:"700px"}}>
                <div style={{border:"1px solid black",marginTop:"10px"}}>
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
                          <div className="row">
                          <div className="col-md-6" ><label className="labels">Location</label><input  type="text" className="form-control form-control-sm" required="true" placeholder="Enter location" onChange={(e)=>setproject({...project,location:e.target.value})}/></div>
                          {/* <div className='col-md-5'></div> */}
                          <div className="col-md-1"><label className="labels" style={{visibility:"hidden"}}>.</label><button className="form-control form-control-sm" required="true" onClick={handleSubmit}>Get</button></div>
                          <div className='col-md-5'></div>
                          <div className="col-md-5"><label className="labels">Lattitude</label><input type="number"className="form-control form-control-sm" required="true" value={coordinates.lat} readOnly/></div>
                          <div className="col-md-5"><label className="labels">Langitude</label><input type="number"className="form-control form-control-sm" required="true" value={coordinates.lng} readOnly/></div>
                          </div>
                          </div>
                          
                          <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Address</label></div>
                    <div className="row" style={{border:"1px solid black",margin:"5px",padding:"10px"}}>
                    <div className="col-md-8"><label className="labels">ADDRESS</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setproject({...project,address:e.target.value})}/></div>
                    <div className="col-md-4"></div>
                    <div className="col-md-8"><label className="labels">STREET</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setproject({...project,street:e.target.value})}/></div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4"><label className="labels">LOCALITY</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setproject({...project,locality:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">CITY</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setproject({...project,city:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">ZIP</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setproject({...project,zip:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">State</label><select  className="form-control form-control-sm" onChange={(e)=>setproject({...project,state:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Country</label><select  className="form-control form-control-sm"  onChange={(e)=>setproject({...project,country:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    </div>
              </div>
             </div>
           </div>
 {/* ------------------------------------------------------location Details end--------------------------------------------------------------  */}

 {/*-------------------------------------------------- block details start--------------------------------------------------------- */
 
 }
        <div className="col-md-12" id='block' style={{display:"none",marginTop:"-80px"}}>
            <div className="p-3 py-5">
     
                <div className="row " >

                
                    <div className="col-md-9"></div>
                    <div className="col-md-2"><button  className="form-control form-control-sm" onClick={handleShow1}>Add Block</button></div>
                 
                    <TableContainer component={Paper} style={{height:"400px",width:"1000px",overflowY:"scroll",marginTop:"40px",marginLeft:"50px"}}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
     
    <TableHead>
        <TableRow>
          <StyledTableCell style={{ fontFamily: "times new roman" }} >Block Name</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Category</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Sub-Category</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Status</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Action</StyledTableCell>
        </TableRow>
      </TableHead>
      <tbody>
        {
         
        project.add_block.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell >
            {item.block_name}
             </StyledTableCell>
             <StyledTableCell >
            {item.category.join(',')}
             </StyledTableCell>
             <StyledTableCell >
            {item.sub_category}
             </StyledTableCell>
             <StyledTableCell >
            {item.status}
             </StyledTableCell>
             <StyledTableCell >
             <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteblock(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
             </StyledTableCell>
              
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
    </TableContainer>

    <Modal show={show1} onHide={handleClose1} size='lg'>
            <Modal.Header>
              <Modal.Title>Add Block/Tower</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{width:"100%"}}>
            <div className="row" id='basicdetails1'>
             
                    <div className="col-md-6"><label className="labels">Block/Tower Name</label><input type="text" required="true" className="form-control form-control-sm" placeholder="first name" onChange={(e)=>setblock({...block,block_name:e.target.value})}/></div>
                    <div className='col-md-6'></div>

                    <div className="col-md-12"><label className="labels">Category</label></div>
                    <div className="col-md-12" style={{display:"flex",flexWrap:"wrap"}} >
                       {
                        project.category.map((type)=>
                        (
                          <div className="col-md-3" key={type}>
                          <button id='bcat'
                              className='form-control form-control-sm' 
                              onClick={() => handleTypeClick1(type)} 
                          >
                              {type}
                          </button>
                      </div>
                        ))
                       }
                    </div>

                    <div className="col-md-12"><label className="labels">Sub Category</label><select  className="form-control form-control-sm"  onChange={(e)=>setblock({...block,sub_category:e.target.value})}>
                                <option>choose</option>
                                <option>{project.sub_category}</option>
                                </select>
                    </div>
                    <div className="col-md-2"><label className="labels">Land Area</label><input type="text" className="form-control form-control-sm" required="true" onChange={(e)=>setblock({...block,land_area:e.target.value})}/></div>
                        <div className="col-md-2"><label className="labels" style={{visibility:"hidden"}}>measurment</label>
                        <select className="form-control form-control-sm" required="true" onChange={(e)=>setblock({...block,measurment:e.target.value})}>
                              <option>Acres.</option>
                              <option>Mrs.</option>
                              <option>Sh.</option>
                              <option>Smt.</option>
                              <option>Dr.</option>
                              <option>Er.</option>
                              <option>Col.</option>
                              <option>Maj.</option>
                        </select>
                       </div>
                        <div className="col-md-2"><label className="labels">Total Blocks</label><input type="number" defaultValue={'0'} className="form-control form-control-sm" required="true" onChange={(e)=>setblock({...block,total_blocks:e.target.value})}/></div>
                        <div className="col-md-2"><label className="labels">TOTAL Floor</label><input type="number" defaultValue={'0'} className="form-control form-control-sm" required="true" onChange={(e)=>setblock({...block,total_floors:e.target.value})} /></div>
                        <div className="col-md-2"><label className="labels">TOTAL Units</label><input type="number" defaultValue={'0'} className="form-control form-control-sm" required="true" onChange={(e)=>setblock({...block,total_units:e.target.value})}/></div>
                        <div className="col-md-2"></div>
                        <div className="col-md-12"><label className="labels">Status</label><select  className="form-control form-control-sm"  onChange={(e)=>setblock({...block,status:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-4" ><label className="labels">Launched On</label><input type="date" className="form-control form-control-sm" required="true" onChange={(e)=>setblock({...block,launched_on:e.target.value})}/></div>
                       <div className="col-md-4" ><label className="labels">Expected Competion</label><input type="date" className="form-control form-control-sm" required="true" onChange={(e)=>setblock({...block,expected_competion:e.target.value})}/></div>
                       <div className="col-md-4" ><label className="labels">Possession</label><input type="date"   className="form-control form-control-sm" required="true" onChange={(e)=>setblock({...block,possession:e.target.value})}/></div>

                       <div className="col-md-6"><label className="labels">Parking Type</label>
                        <select className="form-control form-control-sm" required="true" onChange={(e)=>setblock({...block,parking_type:e.target.value})}>
                              <option>Upcoming</option>
                              <option>Mrs.</option>
                              <option>Sh.</option>
                              <option>Smt.</option>
                              <option>Dr.</option>
                              <option>Er.</option>
                              <option>Col.</option>
                              <option>Maj.</option>
                        </select>
                       </div>
                       <div className='col-md-6'></div>
                       <div className="col-md-7" ><label className="labels">Rera Number</label><input type="text"   className="form-control form-control-sm" required="true" onChange={(e)=>setblock({...block,rera_no:e.target.value})}/></div>
                </div>
                </div>
                
          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={addblock}>
                Add Block
              </Button>
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
           </div>
             </div>
           </div>
{/*--------------------================================= block details end------------------------------============================== */}

{/*------------------------------======================== size details start================----------------------------------- */}
<div className="col-md-12" id='sizedetails' style={{display:"none",marginTop:"-80px",lineHeight:"30px"}}>
            <div className="p-3 py-5">
                <div className="row " >
                <div className="col-md-9"></div>
                    <div className="col-md-2"><button  className="form-control form-control-sm" onClick={handleShow2}>Add Size</button></div>
                 
                    <TableContainer component={Paper} style={{height:"400px",width:"1000px",overflowY:"scroll",marginTop:"40px",marginLeft:"50px"}}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
     
    <TableHead>
        <TableRow>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Block Name</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>Category</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>Sub-Category</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>Size</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>Action</StyledTableCell>
        </TableRow>
      </TableHead>
      <tbody>
        {
         
        project.add_size.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
             {item.block1}
            </StyledTableCell>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
             {item.category.join(',')}
            </StyledTableCell>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
             {item.sub_category}
            </StyledTableCell>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
             {item.size_name}
            </StyledTableCell>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
            <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deletesize(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
            </StyledTableCell>
              
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
    </TableContainer>

    <Modal show={show2} onHide={handleClose2} size='lg'>
            <Modal.Header>
              <Modal.Title>Add Size</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{width:"100%"}}>
            <div className="row" id='basicdetails1'>
             
                    <div className="col-md-8"><label className="labels">Size Name</label><input type="text" required="true" className="form-control form-control-sm" placeholder="first name" onChange={(e)=>setsizes({...sizes,size_name:e.target.value})}/></div>
                    <div className='col-md-4'></div>

                    <div className="col-md-8"><label className="labels">Block</label><select  className="form-control form-control-sm"  onChange={(e)=>setsizes({...sizes,block1:e.target.value})}>
                                <option>choose</option>
                               {
                                project.add_block.map((item)=>
                                (
                                  <option>{item.block_name}</option>
                                ))
                               }
                                </select>
                    </div>
                    <div className='col-md-4'></div>

                    <div className="col-md-12"><label className="labels">Category</label></div>
                    <div className="col-md-12" style={{display:"flex"}} >
                    <div className="col-md-12" style={{ display: "flex", flexWrap: "wrap" }}>
                      {
                        project.category.map((type) => (
                          <div className="col-md-3" key={type}>
                            <button 
                              className="form-control form-control-sm"
                              onClick={() => setsizes(prevSizes => {
                                const category = Array.isArray(prevSizes.category) ? prevSizes.category : [];  // Ensure category is always an array

                                // Only add 'type' if it's not already in the 'category' array
                                if (!category.includes(type)) {
                                  return {
                                    ...prevSizes, 
                                    category: [...category, type]  // Add the type to the category array
                                  };
                                }

                                // Return the previous state if there's no change
                                return prevSizes; 
                              })}
                            >
                              {type}
                            </button>
                          </div>
                        ))
                      }
                    </div>

                    </div>

                    <div className="col-md-12"><label className="labels">Sub Category</label><select id='subcategory'  className="form-control form-control-sm"  onClick={selectsize} onChange={(e)=>setsizes({...sizes,sub_category:e.target.value})}>
                                <option>choose</option>
                                <option value={project.sub_category}>{project.sub_category}</option>
                                </select>
                    </div>   
                    <div className='row' id='apartmentsize' style={{margin:"20px",padding:"20px",border:"1px dashed black",display:"none"}}>
                    <div className="col-md-3"><label className="labels">Total Seleble Area</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setsizes({...sizes,total_sealable_area:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm">
                                <option>Sq Feet</option>
                                <option>Sq Yard</option>
                                <option>Plot</option>
                                <option>All Users</option>
                                </select>
                             </div>
                             <div className='col-md-6'></div>
                             <div className="col-md-3"><label className="labels"> Covered Area</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setsizes({...sizes,covered_area:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm">
                                <option>Sq Feet</option>
                                <option>Sq Yard</option>
                                <option>Plot</option>
                                <option>All Users</option>
                                </select>
                             </div>
                             <div className='col-md-6'></div>
                             <div className="col-md-3"><label className="labels"> Carpet Area</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setsizes({...sizes,carpet_area:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm">
                                <option>Sq Feet</option>
                                <option>Sq Yard</option>
                                <option>Plot</option>
                                <option>All Users</option>
                                </select>
                             </div>
                             <div className="col-md-3"><label className="labels"> Loading</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setsizes({...sizes,loading:e.target.value})}/></div>
                    <div className="col-md-2"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm">
                                <option>%</option>
                                <option>Sq Yard</option>
                                <option>Plot</option>
                                <option>All Users</option>
                                </select>
                             </div>
                             <div className='col-md-1'></div>
                            </div>

                            <div className='row' id='plotsize' style={{margin:"20px",padding:"20px",border:"1px dashed black",display:"none"}}>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Total Seleble Area</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setsizes({...sizes,length:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm">
                                <option>Yard</option>
                                <option>Sq Feet</option>
                                <option>Plot</option>
                                <option>All Users</option>
                                </select>
                             </div>
                             <div className='col-md-6'></div>
                
                             <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}> Carpet Area</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setsizes({...sizes,bredth:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm">
                                <option>Yard</option>
                                <option>Sq Feet</option>
                                <option>Plot</option>
                                <option>All Users</option>
                                </select>
                             </div>
                             <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}> Loading</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setsizes({...sizes,total_area:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm">
                                <option>Sq Yard</option>
                                <option>Plot</option>
                                <option>All Users</option>
                                </select>
                             </div>
                             
                            </div>
                </div>
                </div>
               
                
          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={addsize}>
                Add Size
              </Button>
              <Button variant="secondary" onClick={handleClose2}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
                         
                          
                   
                         
                    </div>
                    </div>
                    </div>
             
  {/*-------------------========================== size details end ==================================--------------------------------------*/}

{/*---------------------------------=========================== unit details start-------------------===================================== */}

<div className="col-md-12" id='unitdetails' style={{display:"none",marginTop:"-80px",lineHeight:"30px"}}>
            <div className="p-3 py-5">
                <div className="row " >
                <div className="col-md-9"></div>
                    <div className="col-md-2"><button  className="form-control form-control-sm" onClick={handleShow3}>Add Unit</button></div>
                 
                    <TableContainer component={Paper} style={{height:"400px",width:"1100px",overflowY:"scroll",marginTop:"40px",marginLeft:"10px"}}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
     
    <TableHead>
        <TableRow>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Unit No.</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Block</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Category</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Unit Type</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Size</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Direction</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Road</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Facing</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Ownership</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Lattitude</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Longitude</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Builtup Details</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Action</StyledTableCell>
        </TableRow>
      </TableHead>
      <tbody>
        {
         
        project.add_unit.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
             {item.unit_no}
            </StyledTableCell>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
             {item.block}
             </StyledTableCell>
             <StyledTableCell style={{ fontFamily: "times new roman" }}>
             {item.category.join(',')}
            </StyledTableCell>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
             {item.unit_type}
            </StyledTableCell>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
             {item.size}
            </StyledTableCell>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
             {item.direction}
            </StyledTableCell>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
             {item.road}
            </StyledTableCell>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
             {item.facing}
            </StyledTableCell>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
             {item.ownership}
            </StyledTableCell>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
             {item.lattitude}
            </StyledTableCell>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
             {item.langitude}
            </StyledTableCell>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
             {item.type}
            </StyledTableCell>
            
            <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>
              <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteunit(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
            </StyledTableCell>
              
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
    </TableContainer>

    <Modal show={show3} onHide={handleClose3} size='lg'>
            <Modal.Header>
              <Modal.Title>Add Unit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
               <div style={{display:"flex",gap:"30px"}}>
               <div  id='unitdetail'  style={{cursor:'pointer',fontWeight:"bold"}} onClick={unitdetail1}>Unit </div>
                <div  id='unitlocationdetails' style={{cursor:'pointer',fontWeight:"bold"}}  onClick={unitdetail2}>Location</div>
               </div>
              
              <hr></hr>
            <div style={{width:"100%"}}>
            <div className="row" id='unitdetails1'>
             
                    <div className="col-md-8"><label className="labels">Unit Number</label><input type="text" required="true" className="form-control form-control-sm" placeholder="first name" onChange={(e)=>setunits({...units,unit_no:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Unit Type</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,unit_type:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-12" style={{display:"flex"}} ><label className="labels">Category</label></div>
                    <div className="col-md-12" style={{display:"flex"}} >
                    <div className="col-md-12" style={{ display: "flex", flexWrap: "wrap" }}>
                      {
                        project.category.map((type) => (
                          <div className="col-md-3" key={type}>
                            <button 
                              className="form-control form-control-sm"
                              onClick={() => setunits(prevunits => {
                                const category = Array.isArray(prevunits.category) ? prevunits.category : [];  // Ensure category is always an array

                                // Only add 'type' if it's not already in the 'category' array
                                if (!category.includes(type)) {
                                  return {
                                    ...prevunits, 
                                    category: [...category, type]  // Add the type to the category array
                                  };
                                }

                                // Return the previous state if there's no change
                                return prevunits; 
                              })}
                            >
                              {type}
                            </button>
                          </div>
                        ))
                      }
                    </div>
                    </div>

                    <div className="col-md-6"><label className="labels">Block</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,block:e.target.value})}>
                    <option>choose</option>
                    {
                                project.add_block.map((item)=>
                                (
                                  <option>{item.block_name}</option>
                                ))
                               }
                                </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Size</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,size:e.target.value})}>
                    <option>choose</option>
                    {
                                project.add_size.map((item)=>
                                (
                                  <option>{item.size_name}</option>
                                ))
                               }
                                </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Direction</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,direction:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Facing</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,facing:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Road</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,road:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Ownership</label><select  className="form-control form-control-sm"  onChange={(e)=>setunits({...units,ownership:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className='col-md-6'></div>
                    <div className='col-md-12'><label className='labels'>Builtup Details</label><hr></hr></div>

                    <div className='col-md-6' ><label className='labels'>Type</label> <select className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(e)=>setunits({...units,unit_type:e.target.value})}>
                          <option>select</option><option>Duplex</option><option>Single</option>
                        </select>
                    </div>
                    <div className='col-md-6'></div>
                  
                    <div className='row mt-2' style={{border:"1px dashed black",margin:"10px",marginTop:"0",padding:"10px",width:"100%"}}>
                    <div className='col-md-2' ><label className='labels'>Floor</label>
                    {
                      Array.isArray(units.floor) ?
                      units.floor.map((item,index)=>
                      (
                        <select className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(event)=>handlefloorchange(index,event)} >
                          <option>select</option><option>1</option><option>2</option><option>3</option><option>4</option>
                        </select>
                      )):[]
                    }
                    </div>
                    <div className='col-md-2' ><label className='labels' style={{width:"500px"}}>Cluter Details</label>
                    {
                       Array.isArray(units.cluter_details) ?
                      units.cluter_details.map((item,index)=>
                      (
                        <select className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(event)=>handlecluterdetails(index,event)}>
                          <option>select</option><option>Duplex</option><option>Single</option>
                        </select>
                      )):[]
                    }
                    </div>
                    <div className='col-md-2' ><label className='labels'>Length</label>
                    {
                          Array.isArray(units.length) ?
                      units.length.map((item,index)=>
                      (
                        <select className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(event)=>handlelengthchange(index,event)}>
                          <option>select</option><option>1</option><option>2</option><option>3</option><option>4</option>
                        </select>
                      )):[]
                    }
                    </div>
                    <div className='col-md-2' ><label className='labels'>Breadth</label>
                    {
                      Array.isArray(units.bredth) ?
                      units.bredth.map((item,index)=>
                      (
                        <select className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(event)=>handlebredthchange(index,event)}>
                          <option>select</option><option>1</option><option>2</option><option>3</option><option>4</option>
                        </select>
                      )):[]
                    }
                    </div>
                      <div className='col-md-2' ><label className='labels'>Total Area</label>
                    {
                      Array.isArray(units.total_area) ?
                      units.total_area.map((item,index)=>
                      (
                        <select className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(event)=>handletotalarea(index,event)}>
                          <option>select</option><option>1</option><option>2</option><option>3</option><option>4</option>
                        </select>
                      )):[]
                    }
                    </div>
                   
                    <div className='col-md-1' style={{marginTop:"90px"}}>
                    {
                      Array.isArray(units.action3) ?
                      units.action3.map((item,index)=>
                      (
                        
                            <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall3(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                        
                      )):[]
                    }
                    </div>
                    <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn3}>+</button></div>
                    </div>

                    <div className='col-md-6'><label>Occupation Date</label><input type='date' className='form-control form-control-sm' onChange={(e)=>setunits({...units,ocupation_date:e.target.value})}/></div>
                    <div className='col-md-6'><label>Age of Construction</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setunits({...units,age_of_construction:e.target.value})}/></div>
                    

                    <div className="col-md-6"><label className="labels">Furnishing Details</label><select id='subcategory'  className="form-control form-control-sm" onChange={(e)=>setunits({...units,furnishing_details:e.target.value})}>
                                <option>Select</option>
                                <option>Apartment</option>
                                <option>Plot</option>
                                <option>All Users</option>
                                </select>
                    </div>   
                    <div className='col-md-6'></div>

                    <div className='col-md-8'><label>Furnished Items</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setunits({...units,furnished_item:e.target.value})}/></div>
                 
                </div>
                </div>
                <div className="row">
                <div className="col-md-12" id='unitlocation' style={{display:"none",marginTop:"-80px",lineHeight:"30px"}}>
                 <div className="p-3 py-5">
                <div className="col-md-12" style={{border:"1px solid black",height:"700px",marginTop:"30px"}}>
                <div style={{border:"1px solid black",marginTop:"10px"}}>
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
                          <div className="row">
                          <div className="col-md-6" ><label className="labels">Location</label><input  type="text" className="form-control form-control-sm" required="true" value={project.location}/></div>
                          {/* <div className='col-md-5'></div> */}
                          <div className="col-md-2"><label className="labels" style={{visibility:"hidden"}}>.</label><button className="form-control form-control-sm" required="true" onClick={handleSubmit}>Get</button></div>
                          <div className='col-md-4'></div>
                          <div className="col-md-5"><label className="labels">Lattitude</label><input type="number"className="form-control form-control-sm" required="true" value={project.lattitude} readOnly/></div>
                          <div className="col-md-5"><label className="labels">Langitude</label><input type="number"className="form-control form-control-sm" required="true" value={project.langitude} readOnly/></div>
                          </div>
                          </div>
           
                </div>
                </div>
                </div>
               
                
          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={addunit}>
                Add Unit
              </Button>
              <Button variant="secondary" onClick={handleClose3}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
                         
                          
                   
                         
                    </div>
                    </div>
                    </div>
{/*=======================----------------------------------------- unit details end====================------------------------------ */}


{/* -----------------------=========================aminities details===================----------------------------------------------- */}


          <div className="col-md-12" id='aminities' style={{display:"none",marginTop:"-80px",lineHeight:"30px"}}>
                      <div className="p-3 py-5">
                          <div className="row " >
                            <div style={{display:"flex"}}>
                          <div style={{display:"flex",gap:"50px",border:"1px solid gray",padding:"5px",borderRadius:"50px",marginLeft:"20%"}}>
                             <div  id='basicaminities1' onClick={basicaminities} style={{cursor:'pointer',fontWeight:"bold",backgroundColor:"black",color:"white",borderRadius:"50px",width:"80px",textAlign:"center",transition:"0.5s ease-out"}}>Basic </div>
                             <div  id='featuredaminities1' onClick={featuredaminities} style={{cursor:'pointer',fontWeight:"bold",transition:"0.5s ease-out"}}>Featured</div>
                             <div  id='nearbyaminities1' onClick={nearbyaminities} style={{cursor:'pointer',fontWeight:"bold",transition:"0.5s ease-out"}}>Nearby</div>
                         </div>
                        
                         </div>
                           <div className="row" id='basicaminities' style={{ marginTop: "20px" }}>
                           <div className='col-md-12' style={{width:"250px",marginLeft:"200px"}}><input type="checkbox" style={{transform:"scale(1.5)",marginRight:"10px"}} checked={selectAll} onChange={handleSelectAllChange}></input>Select All</div>
                              {checkboxItems.map((item, index) => (
                                <div className="col-md-6" style={{ marginTop: "20px" }} key={index}>
                                  <input
                                    type="checkbox"
                                    style={{ transform: "scale(1.5)", marginRight: "10px" }}
                                    checked={checkedItems[index]}
                                    onChange={() => handleCheckboxChange(index)}
                                  />
                                  {item}
                                </div>
                              ))}
                        </div>
                        <div className="row" id='featuredaminities' style={{ marginTop: "20px",display:"none" }}>
                        <div className='col-md-12' style={{width:"250px",marginLeft:"200px"}}><input type="checkbox" style={{transform:"scale(1.5)",marginRight:"10px"}} checked={selectAll1} onChange={handleSelectAllChange1}></input>Select All</div>
                              {checkboxItems1.map((item, index) => (
                                <div className="col-md-3" style={{ marginTop: "20px" }} key={index}>
                                  <input
                                    type="checkbox"
                                    style={{ transform: "scale(1.5)", marginRight: "10px" }}
                                    checked={checkedItems1[index]}
                                    onChange={() => handleCheckboxChange1(index)}
                                  />
                                  {item}
                                </div>
                              ))}
                        </div>
                        <div className="row" id='nearbyaminities' style={{ marginTop: "20px",display:"none"}}>
                        <div className='col-md-12'></div><br></br>
                       
                        <div className="col-md-3"><label className='labels'>Destination</label><select id='choosedestination' className='form-control form-control-sm' onChange={(e)=>setdestinations({...destinations,destination:e.target.value})} >
                              <option>Select</option>
                              <option>Bus Stop</option>
                              <option>Railway Station</option>
                              <option>Airport</option>
                              <option>Taxi Stand</option>
                              <option>Shoping Mall</option>
                        </select>
                        </div>
                        <div className="col-md-3"><label className='labels'>Name Of Destination</label><input id='nameofdestination' type='text' className='form-control form-control-sm' onChange={(e)=>setdestinations((prevprofile)=>({...prevprofile,name_of_destination:e.target.value}))}/> </div>
                        <div className="col-md-2"><label className='labels'>Distance</label><input id='destination' type='text' className='form-control form-control-sm' onChange={(e)=>setdestinations((prevprofile)=>({...prevprofile,distance:e.target.value}))}/> </div>
                        <div className="col-md-2"><label className='labels' style={{visibility:"hidden"}}>Measurement</label><select id='measurment' className='form-control form-control-sm' onChange={(e)=>setdestinations((prevprofile)=>({...prevprofile,measurment:e.target.value}))}>
                         <option>Select</option><option>K.M</option><option>Miles</option><option>Meter</option>
                          </select>
                           </div>
                         <div className="col-md-1"><label className='labels' style={{visibility:"hidden"}} >Add</label><button className='form-control form-control-sm' onClick={adddestination}>+</button></div>
                    <div className='col-md-4'></div><br></br>
                    <div className='col-md-12'><label className='labels'>List Of Destinations</label></div>
                    <TableContainer component={Paper} style={{height:"400px",width:"1100px",overflowY:"scroll",marginTop:"40px",marginLeft:"10px"}}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
     
    <TableHead>
        <TableRow>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>Sr.</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>Name Of Destination</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>Type Of Destination</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>Distance</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>Action</StyledTableCell>
          
        </TableRow>
      </TableHead>
      <tbody>
        {
          project.nearby_aminities.map((item, index) => (
          <StyledTableRow key={index} style={{backgroundColor:"white"}}>
            <StyledTableCell style={{ padding: "10px", cursor: "pointer", fontFamily: "times new roman", fontSize: "10px" }}  >
              {index+1}
            </StyledTableCell>
            <StyledTableCell >{item.name_of_destination} </StyledTableCell>
            <StyledTableCell >{item.destination} </StyledTableCell>
            <StyledTableCell >{item.distance}{item.measurment} </StyledTableCell> 
            <StyledTableCell >
              <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deletedestination(index)}   style={{height:"40px",cursor:"pointer"}}/>
            </StyledTableCell>
              
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
    </TableContainer>
    </div>
                </div>
              </div>
          </div>
{/* ==========================-----------------------------aminities details end---------------------------------============================= */}

{/* -------------------=====================================price start==================================---------------------------------- */}

<div className="col-md-12" id='price' style={{display:"none",marginTop:"-80px",lineHeight:"30px"}}>
                      <div className="p-3 py-5">
                        
                        <div className="row" id='nearbyaminities' style={{ marginTop: "20px"}}>
                        <div className='col-md-12'></div><br></br>
                       
                      
                        <div className='col-md-10'><label className='labels'>Price List</label></div>
                         <div className="col-md-1"><button className='form-control form-control-sm' onClick={handleShow4}>Add</button></div>
                    <div className='col-md-12'><hr></hr></div>
                    <TableContainer component={Paper} style={{height:"400px",width:"1100px",overflowY:"scroll",marginLeft:"10px"}}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
     
    <TableHead>
        <TableRow>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Block Name</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Sub Category</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman"}}>Size</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Charge</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Taxes</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Total Price</StyledTableCell>
          
        </TableRow>
      </TableHead>
      <tbody>
        {
          project.price_list.map((item, index) => (
          <StyledTableRow key={index} style={{backgroundColor:"white"}}>
            <StyledTableCell style={{ padding: "10px", cursor: "pointer", fontFamily: "times new roman", fontSize: "10px" }}  >
             {item.block}
            </StyledTableCell>
            <StyledTableCell >{item.sub_category} </StyledTableCell>
            <StyledTableCell >{item.size} </StyledTableCell>
            <StyledTableCell >{item.blank1}</StyledTableCell> 
            <StyledTableCell >{item.blank4}</StyledTableCell> 
            <StyledTableCell >
              <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteprice(index)}   style={{height:"40px",cursor:"pointer"}}/>
            </StyledTableCell>
              
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
    </TableContainer>

    <Modal show={show4} onHide={handleClose4} size='lg'>
            <Modal.Header>
              <Modal.Title>Price Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='row'>
              <div className='col-md-12'  style={{marginTop:"20px",display:"flex",gap:"30px"}}> <u id='baseprice1' onClick={baseprice} style={{cursor:"pointer",fontWeight:"bold"}}>Base Price</u><u id='charges1' onClick={charges} style={{cursor:"pointer",fontWeight:"bold"}}>Charges</u><u id='taxes1' onClick={taxes} style={{cursor:"pointer",fontWeight:"bold"}}>Taxes</u></div>
              <div className='row' id='baseprice' style={{marginTop:"20px",padding:"30px"}}><hr></hr>
            <div className="col-md-4"><label className="labels">Block</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,block:e.target.value})}>
                                <option>{block.block_name}</option>
                                </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Category</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,category:e.target.value})}>
                            
                       {
                        project.category.map((type)=>
                        (
                        <option>{type}</option>
                        ))
                       }
                        </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Sub Category</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,sub_category:e.target.value})}>
                                <option>{project.sub_category}</option>
                                </select>
                    </div>
                    <div className="col-md-8"><label className="labels">Size</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,size:e.target.value})}>
                                <option>{size.size_name}</option>
                                </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Covered Area</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,covered_area:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className='col-md-6'><label className='labels'>Base Rate</label><input type='text' className='form-control form-control-sm'></input></div><br></br>
                    <div className='col-md-6'></div>
                    </div>

                    <div className='row' id='charges' style={{marginTop:"20px",padding:"30px",display:"none"}}>
                  <div className='col-md-12'><hr></hr></div>
                  <div className="col-md-4"><label className="labels">Name</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,name:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Type</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,type:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className='col-md-4'></div>

                    <div className="col-md-4"><label className="labels">Calculation ype</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,calculation_type:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className='col-md-2'><label className='labels' style={{visibility:"hidden"}}>blank1</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setprices({...prices,blank1:e.target.value})}></input></div><br></br>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>blank2</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,blank2:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>blank3</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,blank3:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    </div>
                    <div className='row' id='taxes' style={{marginTop:"20px",padding:"30px",display:"none"}}>
                  <div className='col-md-12'><hr></hr></div>
                  <div className="col-md-5"><label className="labels">Name</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,name1:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-5"><label className="labels">Type</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,type1:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className='col-md-2'></div>

                    <div className="col-md-4"><label className="labels">Calculation ype</label><select className="form-control form-control-sm" onChange={(e)=>setprices({...prices,calculation_type1:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className='col-md-4'><label className='labels' style={{visibility:"hidden"}}>blank4</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setprices({...prices,blank4:e.target.value})}></input></div><br></br>
                   </div>
                  </div>
    </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={addprice}>
                Add Price
              </Button>
              <Button variant="secondary" onClick={handleClose4}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

    <div className='col-md-10' style={{marginTop:"10px"}}><label className='labels'>Payment Plan</label></div>
    <div className='col-md-1' style={{marginTop:"10px"}}><button className='form-control form-control-sm' onClick={handleShow5}>Add</button></div>
                    <div className='col-md-12'><hr></hr></div>
                    <TableContainer component={Paper} style={{height:"400px",width:"1100px",overflowY:"scroll",marginLeft:"10px"}}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
     
    <TableHead>
        <TableRow>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Serial</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Plan Name</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman" }}>Action</StyledTableCell>
          
        </TableRow>
      </TableHead>
      <tbody>
        {
          project.Payment_plan.map((item, index) => (
          <StyledTableRow key={index} style={{backgroundColor:"white"}}>
            <StyledTableCell style={{ padding: "10px", cursor: "pointer", fontFamily: "times new roman", fontSize: "10px" }}  >
              {index+1}
            </StyledTableCell>
            <StyledTableCell >{item.payment_planname} </StyledTableCell>
            <StyledTableCell >
              <img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deletepayment(index)}   style={{height:"40px",cursor:"pointer"}}/>
            </StyledTableCell>
              
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
    </TableContainer>
    <Modal show={show5} onHide={handleClose5} size='lg'>
            <Modal.Header>
              <Modal.Title>Add Payment Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='row'>
              <div className='col-md-6'><label className='labels'>Payment Plan Name</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setpayments({...payments,payment_planname:e.target.value})}></input></div>
              <div className='col-md-6'></div>

              <div className='col-md-2'><label className='labels'>Step Name</label>
            {
              payments.step_name.map((item,index)=>
              (
                <input type='text' className='form-control form-control-sm' style={{marginTop:"10px"}} onChange={(event)=>handlestepnamechange(index,event)}></input>
              ))
            }
            </div>

            <div className='col-md-2'><label className='labels' style={{width:"200px"}}>Calculation Type</label>
            {
              payments.calculation_type.map((item,index)=>
              (
              <select className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(event)=>handlecalculationtypechange(index,event)}>
                <option>Select</option>
                <option>My Team</option>
                <option>My Self</option>
                <option>All Users</option>
                </select>
              ))
            }
            </div>

            <div className='col-md-2'><label className='labels' style={{visibility:"hidden"}}>Blank1</label>
             {
              payments.blank1.map((item,index)=>
              (
                <input type='text'style={{marginTop:"10px"}} className='form-control form-control-sm'onChange={(event)=>handleblank1change(index,event)}></input>
                
              ))
            }
            </div>

            <div className='col-md-2'><label className='labels' style={{visibility:"hidden"}}>Blank2</label>
            {
              payments.blank2.map((item,index)=>
              (
               <input type='text' style={{marginTop:"10px"}} className='form-control form-control-sm' onChange={(event)=>handleblank2change(index,event)}></input>
               
              ))
            }
             </div>

             <div className='col-md-2'><label className='labels' style={{visibility:"hidden"}}>Blank3</label>
              {
              payments.blank3.map((item,index)=>
              (
                <select className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(event)=>handleblank3change(index,event)}>
                <option>Select</option>
                <option>My Team</option>
                <option>My Self</option>
                <option>All Users</option>
                </select>
               
              ))
            }
             </div>

             <div className='col-md-1' style={{marginTop:"90px"}}>
              {
              payments.action4.map((item,index)=>
              (
               <img   src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall4(index)} style={{height:"40px",cursor:"pointer"}}/>
              ))
            }
            </div>
            <div className='col-md-1'><label className='labels' style={{visibility:"hidden"}}>add</label><button className='form-control form-control-sm' onClick={addFn4}>+</button></div>
           
           <div className='col-md-8'><label className='labels'>Terms & Condition</label>
              <textarea className='form-control form-control-sm' style={{height:"100px"}}/>
           </div>
           <div className='col-md-4'></div>
                 
                   
                  
                    
              </div>
    </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={addpayment}>
                Add Payment
              </Button>
              <Button variant="secondary" onClick={handleClose5}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
    
                </div>
              </div>
          </div>


{/* ===========================-----------------------------price end--------------------------=============================================== */}


                 <div className='col-md-12'><hr></hr></div> 
                    <ToastContainer/>
                </div>
                <div className='row' style={{marginLeft:"50%",marginBottom:"20px"}}>
                    <div className="col-md-4" style={{marginTop:"20px"}}><button className="form-control form-control-sm">Cancel</button></div>
                    <div className="col-md-5" style={{marginTop:"20px"}}><button className="form-control form-control-sm">Save & View Project</button></div>
                    <div className="col-md-3" style={{marginTop:"20px"}}><button className="form-control form-control-sm" onClick={addproject}>Save</button></div>
                    </div>
            </div>
        </div>
    </div>


);
}
export default Projectform;

import { useState } from 'react';
import'../css/addcontact.css';
import Header1 from './header1';
import Sidebar1 from './sidebar1';
import { ToastContainer, toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from "../api";
import { event } from 'jquery'; 
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



function Projectform() {
  
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
        const resp=await api.get('addproject/viewdeveloper')
        
        setdata1(resp.data.developer)
      } catch (error) {
        console.log(error);
      }
    
    }

    const [contact,setcontact]=useState({name:"",developer_name:"",joint_venture:"",secondary_developer:"",rera_number:"",descriptions:"",
                                          category:"",sub_category:"",land_area:"",measurment1:"",total_block:"",total_floor:"",
                                          total_units:"",status:"",launched_on:"",expected_competion:"",possession:"",parking_type:"",
                                          approved_bank:"",approvals:[''],registration_no:[''],date:[''],pic:[''],action1:[],owner:"",
                                          team:"",visible_to:"",
                         
                                          location:"",lattitude:"",langitude:"",address:"",street:"",locality:"",city:"",zip:"",state:"",country:"",

                                          add_block:[],add_size:[],add_unit:[],basic_aminities:[],features_aminities:[],nearby_aminities:[],
                                          price_list:[],Payment_plan:[],

        type:[''],floor:[''],action2:[],tagcs:"",descriptions:"",source:"",team:"",owner:"",visible_to:"",cluter:[''],length:[''],
        breadth:[''],meseaurment:[''],total_area:[''],action3:[],step_name:[''],calculation_type:[''],blank1:[''],blank2:[''],
        blank3:[''],action4:[]});
    
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data' // Set the Content-Type here
            }
        }
      
    const addcontact=async(e)=>
    {
      
        e.preventDefault();
        try {
            const resp= await api.post('project',contact,config)
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
        
                    setcontact({
                      ...contact,
                      approvals: [...contact.approvals, ''],
                      registration_no: [...contact.registration_no, ''],
                      date: [...contact.date, ''],
                      pic: [...contact.pic, ''],
                      action1: [...contact.action1, '']
                    });
                  };

          const deleteall1=(index)=>
            {
             
              const newapprovals = contact.approvals.filter((_, i) => i !== index);
              const newregistrationno = contact.registration_no.filter((_, i) => i !== index);
              const newdate = contact.date.filter((_, i) => i !== index);
              const newpic = contact.pic.filter((_, i) => i !== index);
              const newaction1 = contact.action1.filter((_, i) => i !== index);
              
              setcontact({
                ...contact,
                approvals: newapprovals,
                registration_no: newregistrationno,
                date: newdate,
                pic:newpic,
                action1: newaction1
              });
            }
            const handleapprovalschange = (index, event) => {
              const newapprovals = [...contact.approvals];
              newapprovals[index] = event.target.value;
              setcontact({
                ...contact,
                approvals: newapprovals
              });
            };
            const handleregistrationchange = (index, event) => {
              const newregistration = [...contact.registration_no];
              newregistration[index] = event.target.value;
              setcontact({
                ...contact,
                registration_no: newregistration
              });
            };
            const handledatechange = (index, event) => {
              const newdate = [...contact.date];
              newdate[index] = event.target.value;
              setcontact({
                ...contact,
                date: newdate
              });
            };
            const handlepicchange = (index, event) => {
              const newpic = [...contact.pic];
              const files = Array.from(event.target.files);
              newpic[index] = {files:files}
              setcontact({
                ...contact,
                pic: newpic
              });
            };
         

            function addFn2() {
        
              setcontact({
                ...contact,
                type: [...contact.type, ''],
                floor: [...contact.floor, ''],
                action2: [...contact.action2, '']
              });
            };
  
            const deleteall2=(index)=>
              {
               
                const newtype = contact.type.filter((_, i) => i !== index);
                const newfloor = contact.floor.filter((_, i) => i !== index);
                const newaction2 = contact.action2.filter((_, i) => i !== index);
                
                setcontact({
                  ...contact,
                  type: newtype,
                  floor: newfloor,
                  action2: newaction2
                });
              }
              const handleemailchange = (index, event) => {
                const newemail = [...contact.email];
                newemail[index] = event.target.value;
                setcontact({
                  ...contact,
                  email: newemail
                });
              };
              const handleemail_typechange = (index, event) => {
                const newemail_type = [...contact.email_type];
                newemail_type[index] = event.target.value;
                setcontact({
                  ...contact,
                  email_type: newemail_type
                });
              };

              function addFn3() {
     
                setcontact({
                  ...contact,
                  cluter: [...contact.cluter, ''],
                  length: [...contact.length, ''],
                  breadth: [...contact.breadth, ''],
                  total_area: [...contact.total_area, ''],
                  meseaurment: [...contact.meseaurment, ''],
                  action3: [...contact.action3, '']
                });
              };
              const deleteall3=(index)=>
                {
                 
                  const newcluter = contact.cluter.filter((_, i) => i !== index);
                  const newlength = contact.length.filter((_, i) => i !== index);
                  const newbreadth = contact.breadth.filter((_, i) => i !== index);
                  const newtotalarea = contact.total_area.filter((_, i) => i !== index);
                  const newmeasurement = contact.meseaurment.filter((_, i) => i !== index);
                  const newaction3=contact.action3.filter((_,i) => i !== index);
                  
                  setcontact({
                    ...contact,
                    cluter: newcluter,
                    length: newlength,
                    breadth: newbreadth,
                    total_area: newtotalarea,
                    meseaurment: newmeasurement,
                    action3:newaction3
                  });
                }
                const handlecompanysocialmediachange = (index, event) => {
                  const newcomapnysocialmedia = [...contact.company_social_media];
                  newcomapnysocialmedia[index] = event.target.value;
                  setcontact({
                    ...contact,
                    company_social_media: newcomapnysocialmedia
                  });
                };
                const handlecompanyurlchange = (index, event) => {
                  const newcompanyurl = [...contact.company_url];
                  newcompanyurl[index] = event.target.value;
                  setcontact({
                    ...contact,
                    company_url: newcompanyurl
                  });
                };
          
              
                function addFn4() {
     
                  setcontact({
                    ...contact,
                    step_name: [...contact.step_name, ''],
                    calculation_type: [...contact.calculation_type, ''],
                    blank1: [...contact.blank1, ''],
                    blank2: [...contact.blank2, ''],
                    blank3: [...contact.blank3, ''],
                    action4:[...contact.action4,'']
                  });
                };
                const deleteall4=(index)=>
                  {
                   
                    const newstepname = contact.step_name.filter((_, i) => i !== index);
                    const newcalculationtype = contact.calculation_type.filter((_, i) => i !== index);
                    const newblank1 = contact.blank1.filter((_, i) => i !== index);
                    const newblank2 = contact.blank2.filter((_, i) => i !== index);
                    const newblank3 = contact.blank3.filter((_, i) => i !== index);
                    const newaction4=contact.action4.filter((_,i) => i !== index);
                    
                    setcontact({
                      ...contact,
                      step_name: newstepname,
                      calculation_type: newcalculationtype,
                      blank1: newblank1,
                      blank2: newblank2,
                      blank3: newblank3,
                      action4:newaction4
                    });
                  }
                  const handleeducationChange = (index, event) => {
                    const neweducation = [...contact.education];
                    neweducation[index] = event.target.value;
                    setcontact({
                      ...contact,
                      education: neweducation
                    });
                  };
                  const handledegreeChange = (index, event) => {
                    const newdegree = [...contact.degree];
                    newdegree[index] = event.target.value;
                    setcontact({
                      ...contact,
                      degree: newdegree
                    });
                  };
            
                  const handleschool_collegeChange = (index, event) => {
                    const newschool = [...contact.school_college];
                    newschool[index] = event.target.value;
                    setcontact({
                      ...contact,
                      school_college: newschool
                    });
                  };

    //==================----------------- add delete and onchange event of array end---------------------------===============================

// ==============---------------------------google location code start-----------------====================================================

                        const [coordinates, setCoordinates] = useState('');
                        const handleSubmit = async (e) => {
                        try {
                          const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                            params: {
                              address: contact.location,
                              key: 'AIzaSyACfBzaJSVH8eur7U9JxdjI1bAeTLXsUJc'  // Replace with your API key
                            }
                          });
                
                          if (response.data.results.length > 0) {
                            const { lat, lng } = response.data.results[0].geometry.location;
                            setCoordinates({ lat, lng });
                            setcontact({...contact,lattitude:lat,langitude:lng})
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
                                  document.getElementById("apartmentsize").style.display="flex"
                                  document.getElementById("plotsize").style.display="none"
                              }
                              if(size==="Plot")
                                  {
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
                      };

// ---------------------=============== both check box code end--------------------------------========================================

// ===========================------------------block add and remove code---------------------=================================================
                                    const[blocks,setblocks]=useState([])
                                    const[block,setblock]=useState({block_name:"",category:[''],sub_category:"",land_area:"",
                                                                    measurment:"",total_blocks:"",total_floors:"",total_units:"",
                                                                    status:"",launched_on:"",expected_competion:"",possession:"",
                                                                    parking_type:"",rera_no:""})

                                        const addblock = () => {
                       
                                            if (block.block_name ) 
                                              {
                                                const updateblocks= [...blocks, block];
                                                setblocks(updateblocks);
                                                setcontact(prevState => ({
                                                  ...prevState,
                                                  add_block: updateblocks
                                                }));
                                                handleClose1()
                                                 } 
                                                 else
                                                   {
                                                       toast.error("Please fill out all fields.");
                                                   }
                                                 };
                                    const deleteblock = (index) => {
                                    

                                      // Filter out the destination at the given index
                                      const newblocks = contact.add_block.filter((_, i) => i !== index);

                                      // Set the updated destination details
                                      setcontact(prevState => ({
                                        ...prevState,
                                        add_block: newblocks
                                      }));
                                    };

//===================================--------------------------- size add and delete start---------------------------=======================


                                            const[size,setsize]=useState([])
                                            const[sizes,setsizes]=useState({block_name:"",category:[''],sub_category:"",land_area:"",
                                                                            measurment:"",total_blocks:"",total_floors:"",total_units:"",
                                                                            status:"",launched_on:"",expected_competion:"",possession:"",
                                                                            parking_type:"",rera_no:""})

                                                const addsize = () => {

                                                    if (block.block_name ) 
                                                      {
                                                        const updateblocks= [...blocks, block];
                                                        setblocks(updateblocks);
                                                        setcontact(prevState => ({
                                                          ...prevState,
                                                          add_block: updateblocks
                                                        }));
                                                        handleClose1()

                                                          // Clear the input fields after adding
                                                                              
                                                          //  document.getElementById("nameofdestination").value=""
                                                          //  document.getElementById("destination").value=""
                                                          //  document.getElementById("measurment").value=""
                                                          //    document.getElementById("choosedestination").value="Select"
                                                        } 
                                                        else
                                                          {
                                                              toast.error("Please fill out all fields.");
                                                          }
                                                        };
                                            const deletesize = (index) => {


                                              // Filter out the destination at the given index
                                              const newblocks = contact.add_block.filter((_, i) => i !== index);

                                              // Set the updated destination details
                                              setcontact(prevState => ({
                                                ...prevState,
                                                add_block: newblocks
                                              }));
                                            };




// ================================-----------------size add and delete end------------------------=========================================

                                    const residentialcategory=(e)=>
                                    {
                                      
                                        e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green';
                                        setblock((prevProfile) => ({
                                            ...prevProfile,
                                            category: "Residential"
                                        }))
                                    
                                        
                                    }
                                    const commercialcategory=(e)=>
                                      {
                                        
                                          e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green';
                                          setblock((prevProfile) => ({
                                              ...prevProfile,
                                              category: "Commercial"
                                          }))
                                      
                                          
                                      }
                                      const agriculturalcategory=(e)=>
                                        {
                                          
                                            e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green';
                                            setblock((prevProfile) => ({
                                                ...prevProfile,
                                                category: "Agricultural"
                                            }))
                                        
                                            
                                        }
                                      const institutionalcategory=(e)=>
                                        {
                                          {
                                            e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green';
                                            setblock((prevProfile) => ({
                                                ...prevProfile,
                                                category: "Institutional"
                                            }))
                                        
                                            }
                                        }
// -------------------------==========================destinations add and delete code start---------------------------------====================

                    const[destinationdetails,setdestinationdetails]=useState([])
                      const[destinations,setdestinations]=useState({destination:"",name_of_destination:"",distance:"",measurment:""})
                   
                      const adddestination = () => {
                       
                        if (destinations.destination && destinations.name_of_destination && destinations.distance && destinations.measurment) {
                          setdestinationdetails([...destinationdetails, destinations]);
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
                        const newDestinationDetails = destinationdetails.filter((_, i) => i !== index);
                      
                        // Set the updated destination details
                        setdestinationdetails(newDestinationDetails);
                      };
// ========================-----------------------------destination add and delete end--------------------------------------------============
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
                <div className="col-md-6"><label className="labels">Name</label><input type="text" required="true" className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,name:e.target.value})}/></div>
                <div className='col-md-6'></div>
                    <div className="col-md-6"><label className="labels">Developer Name</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,developer_name:e.target.value})}>
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
                        <div className="col-md-6"><input type='checkbox' onChange={(e)=>setcontact({...contact,joint_venture:e.target.value})} /><label style={{margin:"10px"}}>Is this a Joint Venture?</label></div>
                        <div className="col-md-6"><label className="labels">Secondary Developer</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,secondary_developer:e.target.value})}>
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

                    <div className="col-md-5"><label className="labels">Rera Number</label><input type="text" required="true" className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,rera_number:e.target.value})}/></div>
                    <div className='col-md-7'></div>

                    <div className="col-md-10"><label className="labels">Descriptions</label><ReactQuill value={contact.descriptions} formats={formats} modules={modules}   style={{height:"200px"}} onChange={(value) => setcontact({ ...contact, descriptions: value })}/></div>
                    <div className="col-md-2"></div>
                    
                    <div className="col-md-12" style={{marginTop:"50px"}}><label className="labels">Category</label></div>
                    <div className="col-md-12" style={{display:"flex"}} >
                        <div className="col-md-2"><button className='form-control form-control-sm' id='resd' onClick={(e)=>e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green'}>Residential</button></div>
                        <div className="col-md-2"><button className='form-control form-control-sm' onClick={(e)=>e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green'}>Commercial</button></div>
                        <div className="col-md-2"><button className='form-control form-control-sm' onClick={(e)=>e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green'}>Agricultural</button></div>
                        <div className="col-md-2"><button className='form-control form-control-sm' onClick={(e)=>e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green'}>Institutional</button></div>
                        <div className="col-md-2"><button className='form-control form-control-sm' onClick={(e)=>e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green'}>Industrial</button></div>
                    </div>
                    <div className="col-md-6"><label className="labels">Sub Category</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,sub_category:e.target.value})}>
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
                    <div className="col-md-6"></div>

                        <div className="col-md-2"><label className="labels">Land Area</label><input type="text" className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,land_area:e.target.value})}/></div>
                        <div className="col-md-2"><label className="labels" style={{visibility:"hidden"}}>.</label>
                        <select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,measurment1:e.target.value})}>
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
                        <div className="col-md-2"><label className="labels">Total Blocks</label><input type="number" defaultValue={'0'} className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,total_block:e.target.value})}/></div>
                        <div className="col-md-2"><label className="labels">TOTAL Floor</label><input type="number" defaultValue={'0'} className="form-control form-control-sm" required="true"  onChange={(e)=>setcontact({...contact,total_floor:e.target.value})}/></div>
                        <div className="col-md-2"><label className="labels">TOTAL Units</label><input type="number" defaultValue={'0'} className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,total_units:e.target.value})}/></div>
                        <div className="col-md-2"></div>

                        <div className="col-md-8"><label className="labels">Status</label>
                        <select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,status:e.target.value})}>
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

                       <div className="col-md-4" ><label className="labels">Launched On</label><input type="date" className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,launched_on:e.target.value})}/></div>
                       <div className="col-md-4" ><label className="labels">Expected Competion</label><input type="date" className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,expected_competion:e.target.value})}/></div>
                       <div className="col-md-4" ><label className="labels">Possession</label><input type="date"   className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,possession:e.target.value})}/></div>

                       <div className="col-md-6"><label className="labels">Parking Type</label>
                        <select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,parking_type:e.target.value})}>
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
                        <select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,approved_bank:e.target.value})}>
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
                <div className="col-md-2" > <label className="labels">Approvals</label>
                    {
                      contact.approvals.map((item,index)=>
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
                       contact.registration_no.map((item,index)=>
                        (
                          <input type="text" required="true" style={{marginTop:"10px"}} 
                          className="form-control form-control-sm" 
                          
                          onChange={(event)=>handleregistrationchange(index,event)}/>
                          
                        ))
                    }
                    </div>
                    <div className="col-md-2"><label className="labels">Date</label>
                    {
                       contact.date.map((item,index)=>
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
                      contact.pic.map((item,index)=>
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
                       contact.action1.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall1(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                  
                          
                        ))
                    }
                    </div>
                  <div className="col-md-1"><label className="labels" >add</label><button className='form-control form-control-sm' onClick={addFn1}>+</button></div>
                    
            
                  
                 
                  

                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                    
                    <div className="col-md-6"><label className="labels">Owner</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,owner:e.target.value})}>
                    <option>Select</option>
                              <option>Suraj</option> 
                              <option>Suresh Kumar</option>
                              <option>Ramesh Singh</option>
                              <option>Maanav Sharma</option>
                              <option>Sukram</option>
                        </select></div>
                  
                        <div className="col-md-6"><label className="labels">Team</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,team:e.target.value})}>
                              <option>Select</option> 
                              <option>Sales</option>
                              <option>Marketing</option>
                              <option> Post Sales</option>
                              <option> Pre Sales</option>
                        </select>
                    </div>
                  
                        <div className="col-md-6"><label className="labels">Visible to</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,visible_to:e.target.value})}>
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
                          <div className="col-md-6" ><label className="labels">Location</label><input  type="text" className="form-control form-control-sm" required="true" placeholder="Enter location" onChange={(e)=>setcontact({...contact,location:e.target.value})}/></div>
                          {/* <div className='col-md-5'></div> */}
                          <div className="col-md-1"><label className="labels" style={{visibility:"hidden"}}>.</label><button className="form-control form-control-sm" required="true" onClick={handleSubmit}>Get</button></div>
                          <div className='col-md-5'></div>
                          <div className="col-md-5"><label className="labels">Lattitude</label><input type="number"className="form-control form-control-sm" required="true" value={coordinates.lat} readOnly/></div>
                          <div className="col-md-5"><label className="labels">Langitude</label><input type="number"className="form-control form-control-sm" required="true" value={coordinates.lng} readOnly/></div>
                          </div>
                          </div>
                          
                          <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Address</label></div>
                    <div className="row" style={{border:"1px solid black",margin:"5px",padding:"10px"}}>
                    <div className="col-md-8"><label className="labels">ADDRESS</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,address:e.target.value})}/></div>
                    <div className="col-md-4"></div>
                    <div className="col-md-8"><label className="labels">STREET</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,street:e.target.value})}/></div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4"><label className="labels">LOCALITY</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,locality:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">CITY</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,city:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">ZIP</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,zip:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">State</label><select  className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,state:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Country</label><select  className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,country:e.target.value})}>
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
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Block Name</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Category</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Sub-Category</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Status</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Action</StyledTableCell>
        </TableRow>
      </TableHead>
      <tbody>
        {
         
        contact.add_block.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>
            {item.block_name}
             </StyledTableCell>
             <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>
            {item.category}
             </StyledTableCell>
             <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>
            {item.sub_category}
             </StyledTableCell>
             <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>
            {item.status}
             </StyledTableCell>
             <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>
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
                    <div className="col-md-12" style={{display:"flex"}} >
                        <div className="col-md-3"><button className='form-control form-control-sm' onClick={(e)=>residentialcategory(e)}>Residential</button></div>
                        <div className="col-md-3"><button className='form-control form-control-sm' onClick={(e)=>commercialcategory(e)}>Commercial</button></div>
                        <div className="col-md-3"><button className='form-control form-control-sm' onClick={(e)=>agriculturalcategory(e)}>Agricultural</button></div>
                        <div className="col-md-3"><button className='form-control form-control-sm' onClick={(e)=>institutionalcategory(e)}>Institutional</button></div>
                    </div>

                    <div className="col-md-12"><label className="labels">Sub Category</label><select  className="form-control form-control-sm"  onChange={(e)=>setblock({...block,sub_category:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
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
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Block Name</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Category</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Sub-Category</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Size</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Action</StyledTableCell>
        </TableRow>
      </TableHead>
      {/* <tbody>
        {
         
        blocks.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>
             {blocks.block_name}
            </StyledTableCell>
            <StyledTableCell style={{ padding: "10px", cursor: "pointer", fontFamily: "times new roman", fontSize: "10px" }}  >
              {item.title} {item.first_name} {item.last_name}<br></br>
              {item.designation}
            </StyledTableCell>
           
                <StyledTableCell >
                {item.mobile_no.join(',')}<br></br>
                {item.email.join(',')}
                </StyledTableCell>
              
          </StyledTableRow>
        ))}
      </tbody> */}
    </Table>
    </TableContainer>

    <Modal show={show2} onHide={handleClose2} size='lg'>
            <Modal.Header>
              <Modal.Title>Add Size</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{width:"100%"}}>
            <div className="row" id='basicdetails1'>
             
                    <div className="col-md-8"><label className="labels">Size Name</label><input type="text" required="true" className="form-control form-control-sm" placeholder="first name" onChange={(e)=>setcontact({...contact,first_name:e.target.value})}/></div>
                    <div className='col-md-4'></div>

                    <div className="col-md-8"><label className="labels">Block</label><select  className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,country:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className='col-md-4'></div>

                    <div className="col-md-12"><label className="labels">Category</label></div>
                    <div className="col-md-12" style={{display:"flex"}} >
                        <div className="col-md-3"><button className='form-control form-control-sm' onClick={(e)=>e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green' }>Residential</button></div>
                        <div className="col-md-3"><button className='form-control form-control-sm' onClick={(e)=>e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green'}>Commercial</button></div>
                        <div className="col-md-3"><button className='form-control form-control-sm' onClick={(e)=>e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green'}>Agricultural</button></div>
                        <div className="col-md-3"><button className='form-control form-control-sm' onClick={(e)=>e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green'}>Institutional</button></div>
                    </div>

                    <div className="col-md-12"><label className="labels">Sub Category</label><select id='subcategory'  className="form-control form-control-sm"  onChange={selectsize}>
                                <option>Select</option>
                                <option>Apartment</option>
                                <option>Plot</option>
                                <option>All Users</option>
                                </select>
                    </div>   
                    <div className='row' id='apartmentsize' style={{margin:"20px",padding:"20px",border:"1px dashed black",display:"none"}}>
                    <div className="col-md-3"><label className="labels">Total Seleble Area</label><input type='text' className='form-control form-control-sm'/></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,country:e.target.value})}>
                                <option>Sq Feet</option>
                                <option>Sq Yard</option>
                                <option>Plot</option>
                                <option>All Users</option>
                                </select>
                             </div>
                             <div className='col-md-6'></div>
                             <div className="col-md-3"><label className="labels"> Covered Area</label><input type='text' className='form-control form-control-sm'/></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,country:e.target.value})}>
                                <option>Sq Feet</option>
                                <option>Sq Yard</option>
                                <option>Plot</option>
                                <option>All Users</option>
                                </select>
                             </div>
                             <div className='col-md-6'></div>
                             <div className="col-md-3"><label className="labels"> Carpet Area</label><input type='text' className='form-control form-control-sm'/></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,country:e.target.value})}>
                                <option>Sq Feet</option>
                                <option>Sq Yard</option>
                                <option>Plot</option>
                                <option>All Users</option>
                                </select>
                             </div>
                             <div className="col-md-3"><label className="labels"> Loading</label><input type='text' className='form-control form-control-sm'/></div>
                    <div className="col-md-2"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,country:e.target.value})}>
                                <option>%</option>
                                <option>Sq Yard</option>
                                <option>Plot</option>
                                <option>All Users</option>
                                </select>
                             </div>
                             <div className='col-md-1'></div>
                            </div>

                            <div className='row' id='plotsize' style={{margin:"20px",padding:"20px",border:"1px dashed black",display:"none"}}>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Total Seleble Area</label><input type='text' className='form-control form-control-sm'/></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,country:e.target.value})}>
                                <option>Yard</option>
                                <option>Sq Feet</option>
                                <option>Plot</option>
                                <option>All Users</option>
                                </select>
                             </div>
                             <div className='col-md-6'></div>
                
                             <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}> Carpet Area</label><input type='text' className='form-control form-control-sm'/></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,country:e.target.value})}>
                                <option>Yard</option>
                                <option>Sq Feet</option>
                                <option>Plot</option>
                                <option>All Users</option>
                                </select>
                             </div>
                             <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}> Loading</label><input type='text' className='form-control form-control-sm'/></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Measurement</label><select  className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,country:e.target.value})}>
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
            <Button variant="secondary" onClick={addcontact}>
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
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Unit No.</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Block</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Category</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Unit Type</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Size</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Direction</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Road</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Facing</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Ownership</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Lattitude</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Longitude</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Builtup Details</StyledTableCell>
        </TableRow>
      </TableHead>
      {/* <tbody>
        {
         
        data.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>
             <img src='https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png' style={{height:"30px"}}/>
             
            </StyledTableCell>
            <StyledTableCell style={{ padding: "10px", cursor: "pointer", fontFamily: "times new roman", fontSize: "10px" }}  >
              {item.title} {item.first_name} {item.last_name}<br></br>
              {item.designation}
            </StyledTableCell>
           
                <StyledTableCell >
                {item.mobile_no.join(',')}<br></br>
                {item.email.join(',')}
                </StyledTableCell>
              
          </StyledTableRow>
        ))}
      </tbody> */}
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
             
                    <div className="col-md-8"><label className="labels">Unit Number</label><input type="text" required="true" className="form-control form-control-sm" placeholder="first name" onChange={(e)=>setcontact({...contact,first_name:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Unit Type</label><select  className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,country:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-12" style={{display:"flex"}} ><label className="labels">Category</label></div>
                    <div className="col-md-12" style={{display:"flex"}} >
                        <div className="col-md-3"><button className='form-control form-control-sm' onClick={(e)=>e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green'}>Residential</button></div>
                        <div className="col-md-3"><button className='form-control form-control-sm' onClick={(e)=>e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green'}>Commercial</button></div>
                        <div className="col-md-3"><button className='form-control form-control-sm' onClick={(e)=>e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green'}>Agricultural</button></div>
                        <div className="col-md-3"><button className='form-control form-control-sm' onClick={(e)=>e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green'}>Institutional</button></div>
                    </div>

                    <div className="col-md-6"><label className="labels">Block</label><select  className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,country:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Size</label><select  className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,country:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Direction</label><select  className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,country:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Facing</label><select  className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,country:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Road</label><select  className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,country:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Ownership</label><select  className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,country:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className='col-md-6'></div>
                    <div className='col-md-12'><label className='labels'>Builtup Details</label><hr></hr></div>

                    <div className='col-md-6' ><label className='labels'>Type</label>
                    {
                      contact.type.map((item,index)=>
                      (
                        <select className="form-control form-control-sm" style={{marginTop:"10px"}}>
                          <option>select</option><option>Duplex</option><option>Single</option>
                        </select>
                      ))
                    }
                    </div>
                    <div className='col-md-4' style={{border:"1px solid black",borderBottom:"none"}}><label className='labels'>Floor</label>
                    {
                      contact.floor.map((item,index)=>
                      (
                        <select className="form-control form-control-sm" style={{marginTop:"10px"}}>
                          <option>select</option><option>1</option><option>2</option><option>3</option><option>4</option>
                        </select>
                      ))
                    }
                    </div>
                    <div className='col-md-1' style={{marginTop:"90px"}}>
                    {
                      contact.action2.map((item,index)=>
                      (
                        
                            <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall2(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                        
                      ))
                    }
                    </div>
                    <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn2}>+</button></div>
                   
                    <div className='row' style={{border:"1px dashed black",margin:"10px",marginTop:"0",padding:"10px",width:"100%"}}>
                    <div className='col-md-2' ><label className='labels' style={{width:"500px"}}>Cluter Details</label>
                    {
                      contact.cluter.map((item,index)=>
                      (
                        <select className="form-control form-control-sm" style={{marginTop:"10px"}}>
                          <option>select</option><option>Duplex</option><option>Single</option>
                        </select>
                      ))
                    }
                    </div>
                    <div className='col-md-2' ><label className='labels'>Length</label>
                    {
                      contact.length.map((item,index)=>
                      (
                        <select className="form-control form-control-sm" style={{marginTop:"10px"}}>
                          <option>select</option><option>1</option><option>2</option><option>3</option><option>4</option>
                        </select>
                      ))
                    }
                    </div>
                    <div className='col-md-2' ><label className='labels'>Breadth</label>
                    {
                      contact.breadth.map((item,index)=>
                      (
                        <select className="form-control form-control-sm" style={{marginTop:"10px"}}>
                          <option>select</option><option>1</option><option>2</option><option>3</option><option>4</option>
                        </select>
                      ))
                    }
                    </div>
                      <div className='col-md-2' ><label className='labels'>Total Area</label>
                    {
                      contact.total_area.map((item,index)=>
                      (
                        <select className="form-control form-control-sm" style={{marginTop:"10px"}}>
                          <option>select</option><option>1</option><option>2</option><option>3</option><option>4</option>
                        </select>
                      ))
                    }
                    </div>
                    <div className='col-md-2' ><label className='labels'>Measurement</label>
                    {
                      contact.meseaurment.map((item,index)=>
                      (
                        <select className="form-control form-control-sm" style={{marginTop:"10px"}}>
                          <option>select</option><option>1</option><option>2</option><option>3</option><option>4</option>
                        </select>
                      ))
                    }
                    </div>
                    <div className='col-md-1' style={{marginTop:"90px"}}>
                    {
                      contact.action3.map((item,index)=>
                      (
                        
                            <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall3(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                        
                      ))
                    }
                    </div>
                    <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn3}>+</button></div>
                    </div>

                    <div className='col-md-6'><label>Occupation Date</label><input type='date' className='form-control form-control-sm'/></div>
                    <div className='col-md-6'><label>Age of Construction</label><input type='text' className='form-control form-control-sm'/></div>
                    

                    <div className="col-md-6"><label className="labels">Furnishing Details</label><select id='subcategory'  className="form-control form-control-sm"  onChange={selectsize}>
                                <option>Select</option>
                                <option>Apartment</option>
                                <option>Plot</option>
                                <option>All Users</option>
                                </select>
                    </div>   
                    <div className='col-md-6'></div>

                    <div className='col-md-8'><label>Furnished Items</label><input type='text' className='form-control form-control-sm'/></div>
                 
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
                          <div className="col-md-6" ><label className="labels">Location</label><input  type="text" className="form-control form-control-sm" required="true" placeholder="Enter location" onChange={(e)=>setcontact({...contact,location:e.target.value})}/></div>
                          {/* <div className='col-md-5'></div> */}
                          <div className="col-md-2"><label className="labels" style={{visibility:"hidden"}}>.</label><button className="form-control form-control-sm" required="true" onClick={handleSubmit}>Get</button></div>
                          <div className='col-md-4'></div>
                          <div className="col-md-5"><label className="labels">Lattitude</label><input type="number"className="form-control form-control-sm" required="true" value={coordinates.lat} readOnly/></div>
                          <div className="col-md-5"><label className="labels">Langitude</label><input type="number"className="form-control form-control-sm" required="true" value={coordinates.lng} readOnly/></div>
                          </div>
                          </div>
           
                </div>
                </div>
                </div>
               
                
          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={addcontact}>
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
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Sr.</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Name Of Destination</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Type Of Destination</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Distance</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Action</StyledTableCell>
          
        </TableRow>
      </TableHead>
      <tbody>
        {
          destinationdetails.map((item, index) => (
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
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Block Name.</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Sub Category</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Size</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Charge</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Taxes</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Total Price</StyledTableCell>
          
        </TableRow>
      </TableHead>
      {/* <tbody>
        {
          destinationdetails.map((item, index) => (
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
      </tbody> */}
    </Table>
    </TableContainer>

    <Modal show={show4} onHide={handleClose4} size='lg'>
            <Modal.Header>
              <Modal.Title>Price Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='row'>
              <div className='col-md-12' style={{marginTop:"20px"}}> <label className='labels' style={{fontWeight:"bold"}}><u>Base Price</u></label></div>
              <div className='col-md-12'><hr></hr></div>
            <div className="col-md-4"><label className="labels">Block</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,visible_to:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Category</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,visible_to:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Sub Category</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,visible_to:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-8"><label className="labels">Size</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,visible_to:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Covered Area</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,visible_to:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className='col-md-6'><label className='labels'>Base Rate</label><input type='text' className='form-control form-control-sm'></input></div><br></br>
                    <div className='col-md-6'></div>

                    <div className='col-md-12' style={{marginTop:"20px"}}> <label className='labels' style={{fontWeight:"bold"}}><u>Charges</u></label></div>
                  <div className='col-md-12'><hr></hr></div>
                  <div className="col-md-4"><label className="labels">Name</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,visible_to:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Type</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,visible_to:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className='col-md-4'></div>

                    <div className="col-md-4"><label className="labels">Calculation ype</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,visible_to:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className='col-md-2'><label className='labels' style={{visibility:"hidden"}}>calculation_type</label><input type='text' className='form-control form-control-sm'></input></div><br></br>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Percentage</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,visible_to:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Base Type</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,visible_to:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>

                    <div className='col-md-12' style={{marginTop:"20px"}}> <label className='labels' style={{fontWeight:"bold"}}><u>Taxes</u></label></div>
                  <div className='col-md-12'><hr></hr></div>
                  <div className="col-md-5"><label className="labels">Name</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,visible_to:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-5"><label className="labels">Type</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,visible_to:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className='col-md-2'></div>

                    <div className="col-md-4"><label className="labels">Calculation ype</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,visible_to:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className='col-md-4'><label className='labels' style={{visibility:"hidden"}}>Amount</label><input type='text' className='form-control form-control-sm'></input></div><br></br>
                   
                    
                  </div>
    </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={addcontact}>
                Save
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
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Block Name.</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Sub Category</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Size</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Charge</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Taxes</StyledTableCell>
          <StyledTableCell style={{ fontFamily: "times new roman", fontSize: "10px" }}>Total Price</StyledTableCell>
          
        </TableRow>
      </TableHead>
      {/* <tbody>
        {
          destinationdetails.map((item, index) => (
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
      </tbody> */}
    </Table>
    </TableContainer>
    <Modal show={show5} onHide={handleClose5} size='lg'>
            <Modal.Header>
              <Modal.Title>Add Payment Plan</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='row'>
              <div className='col-md-6'><label className='labels'>Payment Plan Name</label><input type='text' className='form-control form-control-sm'></input></div>
              <div className='col-md-6'></div>

              <div className='col-md-2'><label className='labels'>Step Name</label>
            {
              contact.step_name.map((item,index)=>
              (
                <input type='text' className='form-control form-control-sm' style={{marginTop:"10px"}}></input>
              ))
            }
            </div>

            <div className='col-md-2'><label className='labels' style={{width:"200px"}}>Calculation Type</label>
            {
              contact.calculation_type.map((item,index)=>
              (
              <select className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(e)=>setcontact({...contact,visible_to:e.target.value})}>
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
              contact.blank1.map((item,index)=>
              (
                <input type='text'style={{marginTop:"10px"}} className='form-control form-control-sm'></input>
                
              ))
            }
            </div>

            <div className='col-md-2'><label className='labels' style={{visibility:"hidden"}}>Blank2</label>
            {
              contact.blank2.map((item,index)=>
              (
               <input type='text' style={{marginTop:"10px"}} className='form-control form-control-sm'></input>
               
              ))
            }
             </div>

             <div className='col-md-2'><label className='labels' style={{visibility:"hidden"}}>Blank3</label>
              {
              contact.blank3.map((item,index)=>
              (
                <select className="form-control form-control-sm" style={{marginTop:"10px"}} onChange={(e)=>setcontact({...contact,visible_to:e.target.value})}>
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
              contact.action4.map((item,index)=>
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
            <Button variant="secondary" onClick={addcontact}>
                Save
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
                    <div className="col-md-3" style={{marginTop:"20px"}}><button className="form-control form-control-sm" onClick={addcontact}>Save</button></div>
                    </div>
            </div>
        </div>
    </div>


);
}
export default Projectform;
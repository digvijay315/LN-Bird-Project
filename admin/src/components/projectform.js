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
    

    const navigate=useNavigate(); 
    const [contact,setcontact]=useState({title:"",first_name:"",last_name:"",approvals:[''],registration_no:[''],date:[''],pic:[''],action1:[],
        type:[''],floor:[''],action2:[],tagcs:"",descriptions:"",source:"",team:"",owner:"",visible_to:"",

        profession_category:"",profession_subcategory:"",designation:"",company_name:"",country_code1:"",company_phone:"",
        company_email:"",area:"",location:"",city:"",pincode:"",state:"",country:"",industry:"",cluter:[''],length:[''],
        breadth:[''],total_area:[''],meseaurment:[''],action3:[],

        father_husband_name:"",h_no:"",area1:"",location1:"",city1:"",pincode1:"",state1:"",country1:"",gender:"",maritial_status:"",
        birth_date:"",anniversary_date:"",education:[''],degree:[''],school_college:[''],action4:[],loan:[''],bank:[''],amount:[''],action5:[],
        social_media:[''],url:[''],action6:[],income:[''],amount1:[''],action7:[],document_no:[''],document_name:[''],document_pic:[''],action8:[] });
    
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data' // Set the Content-Type here
            }
        }
      
    const addcontact=async(e)=>
    {
        e.preventDefault();
        try {
            const resp= await api.post('addcontact',contact,config)
        if(resp.status===200)
            {
                toast.success(resp.data.message,{ autoClose: 2000 })
                setTimeout(() => {
                  navigate('/contactdetails')
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

       
        const basicdetails=()=>
          {
            document.getElementById("basicdetails1").style.display="flex"
            document.getElementById("location").style.display="none"
            document.getElementById("block").style.display="none"
             document.getElementById("sizedetails").style.display="none"
             document.getElementById("unitdetails").style.display="none"
          
            document.getElementById("basic").style.color="green"
            document.getElementById("other").style.color="black"
             document.getElementById("professional").style.color="black"
             document.getElementById("size1").style.color="black"
             document.getElementById("unit").style.color="black"
          }
          const professionaldetails=()=>
            {
              document.getElementById("basicdetails1").style.display="none"
              document.getElementById("location").style.display="flex"
              document.getElementById("block").style.display="none"
              document.getElementById("sizedetails").style.display="none"
              document.getElementById("unitdetails").style.display="none"
              

               document.getElementById("basic").style.color="black"
               document.getElementById("other").style.color="black"
            document.getElementById("professional").style.color="green"
            document.getElementById("size1").style.color="black"
            document.getElementById("unit").style.color="black"
               
            }
          const otherdetails=()=>
            {
              document.getElementById("basicdetails1").style.display="none"
               document.getElementById("location").style.display="none"
                 document.getElementById("block").style.display="flex"
                 document.getElementById("sizedetails").style.display="none"
                 document.getElementById("unitdetails").style.display="none"

               document.getElementById("basic").style.color="black"
                document.getElementById("professional").style.color="black"
               document.getElementById("other").style.color="green"
               document.getElementById("size1").style.color="black"
               document.getElementById("unit").style.color="black"
            }
            const sizedetails=()=>
                {
                  document.getElementById("basicdetails1").style.display="none"
                   document.getElementById("location").style.display="none"
                     document.getElementById("block").style.display="none"
                     document.getElementById("sizedetails").style.display="flex"
                     document.getElementById("unitdetails").style.display="none"

                   document.getElementById("basic").style.color="black"
                    document.getElementById("professional").style.color="black"
                   document.getElementById("other").style.color="black"
                   document.getElementById("size1").style.color="green"
                   document.getElementById("unit").style.color="black"
                }
                const unitdetails=()=>
                  {
                    document.getElementById("basicdetails1").style.display="none"
                     document.getElementById("location").style.display="none"
                       document.getElementById("block").style.display="none"
                       document.getElementById("sizedetails").style.display="none"
                       document.getElementById("unitdetails").style.display="flex"
  
                     document.getElementById("basic").style.color="black"
                      document.getElementById("professional").style.color="black"
                     document.getElementById("other").style.color="black"
                     document.getElementById("size1").style.color="black"
                     document.getElementById("unit").style.color="green"
                  }

                   
        const unitdetails1=()=>
          {
            document.getElementById("unitdetails1").style.display="flex"
            document.getElementById("unitlocation").style.display="none"
        
          
            document.getElementById("unitdetail").style.color="green"
            document.getElementById("unitlocationdetails").style.color="black"
            
          }
          const unitdetails2=()=>
            {
              document.getElementById("unitdetails1").style.display="none"
              document.getElementById("unitlocation").style.display="flex"
          
            
              document.getElementById("unitdetail").style.color="black"
              document.getElementById("unitlocationdetails").style.color="green"
              
            }
          
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
            const handlecountry_codechange = (index, event) => {
              const newcountry_code = [...contact.country_code];
              newcountry_code[index] = event.target.value;
              setcontact({
                ...contact,
                country_code: newcountry_code
              });
            };
            const handlemobile_nochange = (index, event) => {
              const newmobile_no = [...contact.mobile_no];
              newmobile_no[index] = event.target.value;
              setcontact({
                ...contact,
                mobile_no: newmobile_no
              });
            };
            const handlemobile_typechange = (index, event) => {
              const newmobile_type = [...contact.mobile_type];
              newmobile_type[index] = event.target.value;
              setcontact({
                ...contact,
                mobile_type: newmobile_type
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
                    education: [...contact.education, ''],
                    degree: [...contact.degree, ''],
                    school_college: [...contact.school_college, ''],
                    action4: [...contact.action4, '']
                  });
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

                function addFn5() {
        
                  setcontact({
                    ...contact,
                    loan: [...contact.loan, ''],
                    bank: [...contact.bank, ''],
                    amount: [...contact.amount, ''],
                    action5: [...contact.action5, '']
                  });
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
                    setcontact({
                      ...contact,
                      loan: newloan
                    });
                  };
                  const handlebankchange = (index, event) => {
                    const newbank = [...contact.bank];
                    newbank[index] = event.target.value;
                    setcontact({
                      ...contact,
                      bank: newbank
                    });
                  };
                  const handleamountchange = (index, event) => {
                    const newamount = [...contact.amount];
                    newamount[index] = event.target.value;
                    setcontact({
                      ...contact,
                      amount: newamount
                    });
                  };

                  function addFn6() {
        
                    setcontact({
                      ...contact,
                      social_media: [...contact.social_media, ''],
                      url: [...contact.url, ''],
                      action6: [...contact.action6, '']
                    });
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
                      setcontact({
                        ...contact,
                        social_media: newsocial_media
                      });
                    };
                    const handleurlChange = (index, event) => {
                      const newurl = [...contact.url];
                      newurl[index] = event.target.value;
                      setcontact({
                        ...contact,
                        url: newurl
                      });
                    };

                    function addFn7() {
        
                      setcontact({
                        ...contact,
                        income: [...contact.income, ''],
                        amount1: [...contact.amount1, ''],
                        action7: [...contact.action7, '']
                      });
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
                        setcontact({
                          ...contact,
                          income: newincome
                        });
                      };
                      const handleamount1change = (index, event) => {
                        const newamount1 = [...contact.amount1];
                        newamount1[index] = event.target.value;
                        setcontact({
                          ...contact,
                          amount1: newamount1
                        });
                      };

                      function addFn8() {
        
                        setcontact({
                          ...contact,
                          document_no: [...contact.document_no, ''],
                          document_name: [...contact.document_name, ''],
                          document_pic: [...contact.document_pic, ''],
                          action8: [...contact.action8, '']
                        });
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
                          setcontact({
                            ...contact,
                            document_no: newdocumentno
                          });
                        };
                        const handledocumentnamechange = (index, event) => {
                          const newdocumentname = [...contact.document_name];
                          newdocumentname[index] = event.target.value;
                          setcontact({
                            ...contact,
                            document_name: newdocumentname
                          });
                        };
                        const handledocumentpicchange = (index, event) => {
                          const newdocumentpic = [...contact.document_pic];
                          const files = Array.from(event.target.files);
                          newdocumentpic[index] = {files:files}
                          setcontact({
                            ...contact,
                            document_pic: newdocumentpic
                          });
                        };
                  
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
                <div  id='other' onClick={otherdetails} style={{cursor:'pointer',fontWeight:"bold"}}>Aminities |</div> 
                <div  id='other' onClick={otherdetails} style={{cursor:'pointer',fontWeight:"bold"}}>Price |</div> 
               </div>
						    <div style={{marginLeft:"20%"}}><input type="text" class="form-control form-control-sm" placeholder={time} value={time} style={{border:"none"}}/></div>
					</div>
                    <hr></hr>
                
                
                
            
 {/*------------------------------------------ basic details start------------------------------------------------------------------------ */}
               
                <div className="row" id='basicdetails1' style={{marginTop:"40px"}}>
                <div className="col-md-6"><label className="labels">Name</label><input type="text" required="true" className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,first_name:e.target.value})}/></div>
                <div className='col-md-6'></div>
                    <div className="col-md-6"><label className="labels">Developer Name</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,title:e.target.value})}>
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
                        <div className='col-md-6'></div>
                        <div className="col-md-6"><input type='checkbox' /><label style={{margin:"10px"}}>Is this a Joint Venture?</label></div>
                        <div className="col-md-6"><label className="labels">Secondary Developer</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,title:e.target.value})}>
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

                    <div className="col-md-5"><label className="labels">Rera Number</label><input type="text" required="true" className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,first_name:e.target.value})}/></div>
                    <div className='col-md-7'></div>

                    <div className="col-md-8"><label className="labels">Descriptions</label><textarea className='form-control form-control-sm' style={{height:"100px"}} onChange={(e)=>setcontact({...contact,descriptions:e.target.value})}/></div>
                    <div className="col-md-4"></div>
                    <div className="col-md-12"><label className="labels">Category</label></div>
                    <div className="col-md-12" style={{display:"flex"}} >
                        <div className="col-md-2"><button className='form-control form-control-sm' id='resd' onClick={(e)=>e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green'}>Residential</button></div>
                        <div className="col-md-2"><button className='form-control form-control-sm' onClick={(e)=>e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green'}>Commercial</button></div>
                        <div className="col-md-2"><button className='form-control form-control-sm' onClick={(e)=>e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green'}>Agricultural</button></div>
                        <div className="col-md-2"><button className='form-control form-control-sm' onClick={(e)=>e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green'}>Institutional</button></div>
                        <div className="col-md-2"><button className='form-control form-control-sm' onClick={(e)=>e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green'}>Industrial</button></div>
                    </div>
                    <div className="col-md-6"><label className="labels">Sub Category</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,title:e.target.value})}>
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

                        <div className="col-md-2"><label className="labels">Land Area</label><input type="text" className="form-control form-control-sm" required="true" /></div>
                        <div className="col-md-2"><label className="labels" style={{visibility:"hidden"}}>.</label>
                        <select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,title:e.target.value})}>
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
                        <div className="col-md-2"><label className="labels">Total Blocks</label><input type="number" defaultValue={'0'} className="form-control form-control-sm" required="true" /></div>
                        <div className="col-md-2"><label className="labels">TOTAL Floor</label><input type="number" defaultValue={'0'} className="form-control form-control-sm" required="true"  /></div>
                        <div className="col-md-2"><label className="labels">TOTAL Units</label><input type="number" defaultValue={'0'} className="form-control form-control-sm" required="true" /></div>
                        <div className="col-md-2"></div>

                        <div className="col-md-8"><label className="labels">Status</label>
                        <select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,title:e.target.value})}>
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

                       <div className="col-md-4" ><label className="labels">Launched On</label><input type="date" className="form-control form-control-sm" required="true" /></div>
                       <div className="col-md-4" ><label className="labels">Expected Competion</label><input type="date" className="form-control form-control-sm" required="true"/></div>
                       <div className="col-md-4" ><label className="labels">Possession</label><input type="date"   className="form-control form-control-sm" required="true"/></div>

                       <div className="col-md-6"><label className="labels">Parking Type</label>
                        <select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,title:e.target.value})}>
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
                        <select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,title:e.target.value})}>
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
                        <select style={{marginTop:"10px"}} required="true" className="form-control form-control-sm" onChange={(event)=>handlecountry_codechange(index,event)}>
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
                          
                          onChange={(event)=>handlemobile_nochange(index,event)}/>
                          
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
                          onChange={(event)=>handlemobile_nochange(index,event)}/>
                          
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
                        onChange={(event)=>handledocumentpicchange(index,event)}
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
                    <div className="col-md-8"><label className="labels">ADDRESS</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,area:e.target.value})}/></div>
                    <div className="col-md-4"></div>
                    <div className="col-md-8"><label className="labels">STREET</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,location:e.target.value})}/></div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4"><label className="labels">LOCALITY</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,city:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">CITY</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,pincode:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">ZIP</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,pincode:e.target.value})}/></div>
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

    <Modal show={show1} onHide={handleClose1} size='lg'>
            <Modal.Header>
              <Modal.Title>Add Block/Tower</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{width:"100%"}}>
            <div className="row" id='basicdetails1'>
             
                    <div className="col-md-6"><label className="labels">Block/Tower Name</label><input type="text" required="true" className="form-control form-control-sm" placeholder="first name" onChange={(e)=>setcontact({...contact,first_name:e.target.value})}/></div>
                    <div className='col-md-6'></div>

                    <div className="col-md-12"><label className="labels">Category</label></div>
                    <div className="col-md-12" style={{display:"flex"}} >
                        <div className="col-md-3"><button className='form-control form-control-sm' onClick={(e)=>e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green'}>Residential</button></div>
                        <div className="col-md-3"><button className='form-control form-control-sm' onClick={(e)=>e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green'}>Commercial</button></div>
                        <div className="col-md-3"><button className='form-control form-control-sm' onClick={(e)=>e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green'}>Agricultural</button></div>
                        <div className="col-md-3"><button className='form-control form-control-sm' onClick={(e)=>e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green'}>Institutional</button></div>
                    </div>

                    <div className="col-md-12"><label className="labels">Sub Category</label><select  className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,country:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-2"><label className="labels">Land Area</label><input type="text" className="form-control form-control-sm" required="true" /></div>
                        <div className="col-md-2"><label className="labels" style={{visibility:"hidden"}}>.</label>
                        <select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,title:e.target.value})}>
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
                        <div className="col-md-2"><label className="labels">Total Blocks</label><input type="number" defaultValue={'0'} className="form-control form-control-sm" required="true" /></div>
                        <div className="col-md-2"><label className="labels">TOTAL Floor</label><input type="number" defaultValue={'0'} className="form-control form-control-sm" required="true"  /></div>
                        <div className="col-md-2"><label className="labels">TOTAL Units</label><input type="number" defaultValue={'0'} className="form-control form-control-sm" required="true" /></div>
                        <div className="col-md-2"></div>
                        <div className="col-md-12"><label className="labels">Status</label><select  className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,country:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-4" ><label className="labels">Launched On</label><input type="date" className="form-control form-control-sm" required="true" /></div>
                       <div className="col-md-4" ><label className="labels">Expected Competion</label><input type="date" className="form-control form-control-sm" required="true"/></div>
                       <div className="col-md-4" ><label className="labels">Possession</label><input type="date"   className="form-control form-control-sm" required="true"/></div>

                       <div className="col-md-6"><label className="labels">Parking Type</label>
                        <select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,title:e.target.value})}>
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
                       <div className="col-md-7" ><label className="labels">Rera Number</label><input type="text"   className="form-control form-control-sm" required="true"/></div>
                </div>
                </div>
                
          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={addcontact}>
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
                        <div className="col-md-3"><button className='form-control form-control-sm' onClick={(e)=>e.target.style.backgroundColor = e.target.style.backgroundColor === 'green' ? '' : 'green'}>Residential</button></div>
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
            <div style={{display:"flex"}}>
               <div style={{display:"flex",gap:"30px"}}>
               <div  id='unitdetail' onClick={unitdetails1} style={{cursor:'pointer',fontWeight:"bold"}}>Unit</div>
                <div  id='unitlocationdetails' onClick={unitdetails2} style={{cursor:'pointer',fontWeight:"bold"}}>Location</div>
                 
               </div>
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

                 <div className='col-md-12'><hr></hr></div> 
                    <ToastContainer/>
                </div>
                {/* <div className='row' style={{marginLeft:"50%"}}>
                    <div className="col-md-4" style={{marginTop:"20px"}}><button className="form-control form-control-sm">Cancel</button></div>
                    <div className="col-md-5" style={{marginTop:"20px"}}><button className="form-control form-control-sm">Save & View Contact</button></div>
                    <div className="col-md-3" style={{marginTop:"20px"}}><button className="form-control form-control-sm" onClick={addcontact}>Save</button></div>
                    </div> */}
            </div>
        </div>
    </div>


);
}
export default Projectform;

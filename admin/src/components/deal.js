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
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { SvgIcon } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';

function Deal() {
  const navigate=useNavigate()


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
                                expected_price:"",quote_price:"",calculated_type:"",price1:"",totalarea:"",measurment1:"",total_price:"",
                                total_price:"",  price2:"",price3:"",security_deposite:"",
                                maintainence_charge:"",rent_escltion:"",rent_period:"",fitout_perioud:"",
                                deal_type:"",transaction_type:"",source:"",white_portion:"",team:"",user:"",visible_to:"",
                                owner_details:[],document_details:[],s_no:[],preview:[],descriptions:[],category:[],action:[],s_no1:[],url:[],action1:[],
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


const [show1, setshow1] = useState(false);
    
const handleClose1 = () => setshow1(false);
const handleShow1=async()=>
{
  setshow1(true);
 
}

const [contact,setcontact]=useState({title:"",first_name:"",last_name:"",country_code:[''],mobile_no:[''],mobile_type:[''],action1:[],
  email:[''],email_type:[''],action2:[],tags:"",descriptions:"",source:"",team:"",owner:"",visible_to:"",

  profession_category:"",profession_subcategory:"",designation:"",company_name:"",country_code1:"",company_phone:"",
  company_email:"",area:"",location:"",city:"",pincode:"",state:"",country:"",industry:"",company_social_media:[''],company_url:[''],action3:[],

  father_husband_name:"",h_no:"",area1:"",location1:"",city1:"",pincode1:"",state1:"",country1:"",gender:"",maritial_status:"",
  birth_date:"",anniversary_date:"",education:[''],degree:[''],school_college:[''],action4:[],loan:[''],bank:[''],amount:[''],action5:[],
  social_media:[''],url:[''],action6:[],income:[''],amount1:[''],action7:[],document_no:[''],document_name:[''],document_pic:[''],action8:[],relation:"" });

  // const config = {
  //     headers: {
  //       'Content-Type': 'multipart/form-data' // Set the Content-Type here
  //     }
  // }

  const addcontact=async(e)=>
    {
        e.preventDefault();
        try {

            const resp= await api.post('addcontact',contact,config)
        if(resp.status===200)
            {
                toast.success(resp.data.message,{ autoClose: 2000 })
                setTimeout(() => {
                  window.location.reload()
                }, 2000);
            }
            
      
        } catch (error) {
            toast.error(error.response.data.message,{ autoClose: 2000 })
        }
    }

    function addFn3() {
        
      setcontact({
        ...contact,
        country_code: [...contact.country_code, ''],
        mobile_no: [...contact.mobile_no, ''],
        mobile_type: [...contact.mobile_type, ''],
        action1: [...contact.action1, '']
      });
    };

    const deleteall3=(index)=>
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

      function addFn4() {
  
        setcontact({
          ...contact,
          email: [...contact.email, ''],
          email_type: [...contact.email_type, ''],
          action2: [...contact.action2, '']
        });
      };

      const deleteall4=(index)=>
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

        const [input, setInput] = useState('');
        const [filteredSuggestions, setFilteredSuggestions] = useState([]);
        const [showSuggestions, setShowSuggestions] = useState(false);
        const [allSuggestions, setAllSuggestions] = useState([]);
        const [selectedContacts, setSelectedContacts] = useState([]);
  
        React.useEffect(() => {
          const fetchSuggestions = async () => {
            try {
              const response = await axios.get('http://localhost:5000/viewcontact');
              const data = response.data.contact;
              
              // Extract the first_name field from the fetched data
              const names = data.map(item => item.first_name);
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
            setShowSuggestions(false);
          }
        }, [input, allSuggestions]);
      
        const handleInputChange = (event) => {
          setInput(event.target.value);
        };
        
        
        
      
        const handleSuggestionClick = (contact) => {
            // Add the new contact to the selectedContacts array
            const updatedContacts = [...selectedContacts, contact];
            setSelectedContacts(updatedContacts);
          
          setInput(''); // Clear the input after selection
          setShowSuggestions(false); // Hide suggestions after selection
          setdeal(prevDeal => ({ ...prevDeal, owner_details: updatedContacts }));
        };
      
        const removeContact = (id) => {
          const updatedContacts = selectedContacts.filter(contact => contact._id !== id);
          setSelectedContacts(updatedContacts);
          
          // Update deal.owner_details with the current selected contacts
          setdeal(prevDeal => ({ ...prevDeal, owner_details: updatedContacts }));
        };
console.log(deal.owner_details);

        
        
       
        
  

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
                     {selectedContacts.length > 0 && (
                      <div className="contact-details">
                        <table  style={{width:"100%"}}>
                          
                          <tbody>
                          {selectedContacts.filter(contact => contact.relation === 'Self').map(contact => (
                              <StyledTableRow key={contact.id}>
                                <img style={{height:"70px",width:"80px"}} src="https://cdn-icons-png.flaticon.com/512/7084/7084424.png"></img>
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
                                  <img style={{height:"40px",cursor:"pointer"}} src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" onClick={() => removeContact(contact._id)}></img>
                                   </StyledTableCell>
                                
                              </StyledTableRow>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                </div>
                <div className="col-md-12" style={{marginTop:"20px"}}><label className="labels" >Associate Contact</label><div className="col-md-12"><hr></hr></div>
                {selectedContacts.length > 0 && (
                <div className="contact-details">
                    <table style={{width:"100%"}}>
                        <tbody>
                            {selectedContacts.filter(contact => contact.relation !== 'Self').map(contact => (
                                <StyledTableRow key={contact.id}>
                                    <img style={{ height: "70px", width: "80px" }} src="https://cdn-icons-png.flaticon.com/512/7084/7084424.png" alt="Contact" />
                                    <StyledTableCell style={{ fontFamily: "times new roman", cursor: 'pointer' }}>
                                        {contact.title} {contact.first_name} {contact.last_name}<br />
                                        <SvgIcon component={EmailIcon} />
                                        <span>{contact.email}</span>
                                    </StyledTableCell>

                                    <StyledTableCell style={{ fontFamily: "times new roman", cursor: 'pointer' }}>
                                        {contact.mobile_no.map((number, index) => (
                                            <span key={index}>
                                                <SvgIcon component={PhoneIphoneIcon} />
                                                {number}<br />
                                            </span>
                                        ))}
                                    </StyledTableCell>

                                    <StyledTableCell style={{ fontFamily: "times new roman", cursor: 'pointer' }}>
                                        S/W/O <br />{contact.father_husband_name}
                                    </StyledTableCell>

                                    <StyledTableCell style={{ fontFamily: "times new roman", cursor: 'pointer' }}>
                                        permanent address: <br />{contact.h_no}<br />{contact.area1} {contact.location1} {contact.city1} {contact.state1} {contact.country1} {contact.pincode1}
                                    </StyledTableCell>

                                    <StyledTableCell style={{ fontFamily: "times new roman", cursor: 'pointer' }}>
                                        {contact.relation}
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
                <div className="row mt-4">
                    <div className="col-md-2" onClick={handler3} style={{marginLeft:"82%",marginBottom:"40px"}}><button className="form-control" id="basicbtn">Next</button></div>
                    <div className="col-md-2" onClick={handler2} style={{marginLeft:"-90%"}}><button className="form-control" id="prevbtn">Prev</button></div>
                </div>
                </div>
              </div>


              <Modal show={show1} onHide={handleClose1} size='lg' style={{transition:"0.5s ease-in"}}>
            <Modal.Header>
              <Modal.Title>Quick Add Contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{width:"100%"}}>
            <div className="row" id='basicdetails1'>
                    <div className="col-md-2"><label className="labels">Title</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,title:e.target.value})}>
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
                    <div className="col-md-5"><label className="labels">Name</label><input type="text" required="true" className="form-control form-control-sm" placeholder="first name" onChange={(e)=>setcontact({...contact,first_name:e.target.value})}/></div>
                    <div className="col-md-5"><label className="labels">Surname</label><input type="text" className="form-control form-control-sm"  placeholder="surname" onChange={(e)=>setcontact({...contact,last_name:e.target.value})}/></div>
                </div>
                </div>
                <div className="row mt-3" id='basicdetails2'>
                <div className="col-md-4" > <label className="labels">Country</label>
                    {
                      contact.country_code.map((item,index)=>
                      (
                        <select style={{marginTop:"10px"}} required="true" className="form-control form-control-sm" onChange={(event)=>handlecountry_codechange(index,event)}>
                        <option value={item} >phone</option>
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
                          className="form-control form-control-sm" 
                          placeholder="enter phone number" 
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
                                  <option>Select</option>
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
                       contact.action1.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall3(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                  
                          
                        ))
                    }
                    </div>
                  <div className="col-md-1"><label className="labels" >add</label><button className='form-control form-control-sm' onClick={addFn3}>+</button></div>
                    
                  <div className="col-md-8"><label className="labels">Email-Address</label>
                    {
                        contact.email.map((item,index)=>
                        (
                          <input type="text" style={{marginTop:"10px"}}
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
                                <option>Select</option>
                                <option>Personal</option>
                                <option>Official</option>
                                <option>Business</option>
                        </select>
                        ))
                    }
                   </div>
                  
                   <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                       contact.action2.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall4(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                  
                          
                        ))
                    }
                    </div>
                  <div className="col-md-1"><label className="labels" >add</label><button className='form-control form-control-sm' onClick={addFn4}>+</button></div>
                  <div className="col-md-6"><label className="labels">Father/Husband name</label><input type="text" className="form-control form-control-sm"onChange={(e)=>setcontact({...contact,father_husband_name:e.target.value})}/></div>
                  <div className="col-md-6"><label className="labels">Relation</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,relation:e.target.value})}>
                        <option>Select</option>
                        <option>Self</option>
                        <option>Relative</option>
                        <option>Others</option>
                        </select>
                    </div>
                  
                    <div className="col-md-3"><label className="labels">H.No</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,h_no:e.target.value})}/></div>
                    <div className="col-md-9"><label className="labels">Area</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,area1:e.target.value})}/></div>

                    <div className="col-md-4"><label className="labels">Location</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,location1:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">City</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,city1:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Pin Code</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,pincode1:e.target.value})}/></div>

                    <div className="col-md-6"><label className="labels">State</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,state1:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,country1:e.target.value})}/></div>
    
            </div>
          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={addcontact}>
                Add Contact
              </Button>
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

{/*-----------------------------------------------------------------document form----------------------------------------------------------------- */}             
          
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

{/*-----------------------------------------------------------------photos and videos form----------------------------------------------------------------- */}             
              
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
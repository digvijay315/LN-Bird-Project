import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import '../css/addinventory.css';
import { useState,useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';
import { toast,ToastContainer } from "react-toastify";
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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function Deal() {
  const navigate=useNavigate()
// ================================select project,units and block from project data start==============================================================
const[deal,setdeal]=useState({project_category:[],project_subcategory:"",location:"",available_for:"",stage:"",project:"",block:"",unit_number:"",floors:"",
  expected_price:"",quote_price:"",security_deposite:"",
maintainence_charge:"",rent_escltion:"",rent_period:"",fitout_perioud:"",
deal_type:"",transaction_type:"",source:"",white_portion:"",team:"",user:"",visible_to:"",
owner_details:[],associated_contact:[],relation:"",document_details:[],s_no:[],preview:[],descriptions:[],category:[],action:[],s_no1:[],url:[],action1:[],
website:"",social_media:"",send_matchedlead:"",matchedleads:[],matchinglead:"",remarks:""})

const config = {
headers: {
'Content-Type': 'multipart/form-data' // Set the Content-Type here
}
}



const[data1,setdata1]=useState([]);
        const fetchdata1=async()=>
        {
          
          try {
            const resp=await api.get('viewproject')
            setdata1(resp.data.project)
          } catch (error) {
            console.log(error);
          }
        }

        const[data2,setdata2]=useState([]);
        const fetchdata2=async()=>
        {
          
          try {
            const resp=await api.get('leadinfo')
            setdata2(resp.data.lead)
          } catch (error) {
            console.log(error);
          }
        }

       

  React.useEffect(()=>
  {fetchdata1()},[])

  React.useEffect(()=>
    {fetchdata2()},[])


  const allproject =[]
  data1.map((item)=>
  (
      allproject.push(item.name)
  ))
   

  const [units, setunits] = useState([]);
  const [allUnits, setallUnits] = useState([]);
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
  
  React.useEffect(() => {
    if (units.length >= 0) {
      const collectedUnits = units.flatMap(item => item.add_unit);
      const collectedblocks=units.flatMap(item=>item.add_block)
      const collectcategory=units.flatMap(item=>item.category) 
      const collectsubcategory=units.flatMap(item=>item.sub_category) // Collect all add_unit arrays
      const fulllocation = units.flatMap(item => `${item.location}, ${item.address} ${item.street} ${item.locality} ${item.city}`).join(' ');
      setallUnits(collectedUnits);
      setallblocks(collectedblocks) 
      setdeal({...deal,project_category:collectcategory,project_subcategory:collectsubcategory,location:fulllocation})// Set allUnits with the collected units
    }
  }, [units]);

 
 
  

  
  
  
  const handleprojectchange = (event) => {
 
  
    const selectproject = event.target.value
  

    setdeal((prev) => {
      const updateproject = { ...prev, project: selectproject };
       fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
      return updateproject; // Return the updated state
    });
  };


const handleallunitschange = (event) => {
   
  const selectunit = event.target.value
  
    
    setdeal((prev) => {
      const updateunit = { ...prev, unit_number: selectunit };
      return updateunit; // Return the updated state
    });
  };


  const handleallblockchange = (event) => {
     
    
      const selectblocks = event.target.value
    
       
      setdeal((prev) => {
        const updateblock = { ...prev, block: selectblocks };
        return updateblock; // Return the updated state
      });
    };

    //================================== select project,units and blocks end============================================================



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



// ===============================add deal state,and function start=====================================================================
const [deals, setDeals] = useState([]);

const previousDealsRef = useRef([]);
// Function to fetch multiple deals (assuming you fetch all deals from the backend)
const fetchDeals = async () => {
  try {
    const response = await api.get('viewdeal'); // Get all deals from API
    setDeals(response.data.deal);
  } catch (error) {
    console.error('Error fetching deals:', error);
  }
};




// Function to update a deal on the server (based on deal ID)
const updateDealApi = async (updatedDeal) => {
  try {
    await api.put(`updatedeal/${updatedDeal._id}`, updatedDeal); // PUT request to update the deal
    console.log('Deal updated successfully:', updatedDeal);
  } catch (error) {
    console.error('Error updating deal:', error);
  }
};

// Fetch all deals and data2 when the component mounts
React.useEffect(() => {
  fetchDeals();
  
}, []); // Empty dependency array ensures this runs only once when the component mounts

// Recalculate matched leads for each deal whenever data2 changes
React.useEffect(() => {
  if (data2.length > 0 && deals.length > 0) {
    const updatedDeals = deals.map((deal) => {
      const price = deal.expected_price;
      const availableFor = deal.available_for === 'Sale' ? 'Buy' : deal.available_for;

      // Filter leads based on the current deal's criteria
      const filteredLeads = data2.filter(
        (item) =>
          item.requirment === availableFor &&
          price >= parseFloat(item.budget_min) &&
          price <= parseFloat(item.budget_max)
      );

      // Create a new deal object with updated matched leads and matched lead count
      return {
        ...deal,
        matchedleads: filteredLeads,
        matchinglead: filteredLeads.length, // Update the matched lead count
      };
    });

    // Only update deals if there is a meaningful change
    if (JSON.stringify(previousDealsRef.current) !== JSON.stringify(updatedDeals)) {
      setdeal(updatedDeals); // Update the state with the updated deals
      previousDealsRef.current = updatedDeals; // Update the previousDealsRef

      // Send updates to the server in a separate async function
      (async () => {
        for (const updatedDeal of updatedDeals) {
          await updateDealApi(updatedDeal); // Update each deal on the server
        }
      })();
    }
  }
}, [data2, deals]); // Trigger this effect whenever `data2` or `deals` changes

// Debugging: log the updated deals and data2
// React.useEffect(() => {
//   console.log('Updated deals:', deals);  // Log the current deals array
//   console.log('Updated data2:', data2);  // Log the current data2 (leads)
// }, [deals, data2]);

           
            React.useEffect(() => {
              const price=deal.expected_price
              const availableFor = deal.available_for === "Sale" ? "Buy" : deal.available_for;
              const filteredLeads = data2.filter(item => 
                item.requirment === availableFor && 
                price >= parseFloat(item.budget_min) && 
                price <= parseFloat(item.budget_max)
              );
              setdeal(prevDeal => ({
                ...prevDeal,
                matchedleads: filteredLeads,
                matchinglead: filteredLeads.length
            })); // Update the state with the filtered leads
          }, [ data2,deal.available_for,deal.expected_price]);
       


     
          
          
          const add_deal=async(e)=>
          {
              e.preventDefault();
         
                try {
                        const resp= await api.post('adddeal',deal,{
                          headers: {
                            'Content-Type': 'multipart/form-data',
                          },
                        })
                          if(resp.status===200)
                              {
                                toast.success(resp.data.message,{ autoClose: 2000 })
                                setTimeout(() => {
                                  navigate('/dealdetails')
                                }, 2000);
                                
                               }
                      } catch (error) {
                              toast.error(error.response.data.message,{ autoClose: 2000 })
                      }
                     }
// =======================================add deal end=================================================================================

//================== add document and remove document inside deal start==================================================================


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
                                  setdocument1(newdocument);
                                };


//=============================== add document and remove document inside deal start=====================================================


//============================ add and delete code for adding more phots and videos start=================================================



function addFn() {
  setdeal({
    ...deal,
    s_no1: [...(deal.s_no1 || []), ''],  // Ensure s_no1 is an array
    url: [...(deal.url || []), ''],        // Ensure url is an array
    action1: [...(deal.action1 || []), ''] // Ensure action1 is an array
  });
}
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
    s_no: [...(deal.s_no || []), ''],           // Ensure s_no is an array
    preview: [...(deal.preview || []), ''],       // Ensure preview is an array
    descriptions: [...(deal.descriptions || []), ''], // Ensure descriptions is an array
    category: [...(deal.category || []), ''],     // Ensure category is an array
    action: [...(deal.action || []), '']          // Ensure action is an array
  });
}

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


//================================  add and delete code for adding more phots and videos end=============================================


//============================== code for show rent or sale form start================================================================


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

// ==============================code end for sale or rent form==========================================================================


//================================== mui table row and cell code and currency convert code start===========================================


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

const [result, setResult] = useState("");
const [resultText, setResultText] = useState('');

const calculateResult = () => {
  const areaValue = parseFloat(document.getElementById("earea").value) || 0; // Ensure valid number
  const priceValue = parseFloat(document.getElementById("eprice").value) || 0; // Ensure valid number
  const calculatedResult = areaValue * priceValue;

  setResult(calculatedResult);
  setdeal(prevDeal => ({ ...prevDeal, expected_price: calculatedResult }));
};

React.useEffect(() => {
  // Convert result to text format
  if (result) {
    const words = toWords(result, { format: 'en-IN' });
    setResultText(`(${words} only)`);
  } else {
    setResultText('');
  }
}, [result]);

const [result1, setResult1] = useState(0);
const [resultText1, setResultText1] = useState('');

const calculateResult1 = () => {
  const areaValue = parseFloat(document.getElementById("qarea").value) || 0; // Ensure valid number
  const priceValue = parseFloat(document.getElementById("qprice").value) || 0; // Ensure valid number
  const calculatedResult = areaValue * priceValue;

  setResult1(calculatedResult);
  setdeal(prevDeal => ({ ...prevDeal, quote_price: calculatedResult }));
};


React.useEffect(() => {
  // Convert result to text format
  if (result1) {
    const words = toWords(result1, { format: 'en-IN' });
    setResultText1(`(${words} only)`);
  } else {
    setResultText1('');
  }
}, [result1]);


const [result2, setResult2] = useState(0);
const [resultText2, setResultText2] = useState('');

const calculateResult2 = () => {
  const areaValue = parseFloat(document.getElementById("rearea").value) || 0; // Ensure valid number
  const priceValue = parseFloat(document.getElementById("reprice").value) || 0; // Ensure valid number
  const calculatedResult = areaValue * priceValue;

  setResult2(calculatedResult);
  setdeal(prevDeal => ({ ...prevDeal, expected_price: calculatedResult }));
};


React.useEffect(() => {
  // Convert result to text format
  if (result2) {
    const words = toWords(result2, { format: 'en-IN' });
    setResultText2(`(${words} only)`);
  } else {
    setResultText2('');
  }
}, [result2]);

const [result3, setResult3] = useState(0);
const [resultText3, setResultText3] = useState('');

const calculateResult3 = () => {
  const areaValue = parseFloat(document.getElementById("rqarea1").value) || 0; // Ensure valid number
  const priceValue = parseFloat(document.getElementById("rqprice1").value) || 0; // Ensure valid number
  const calculatedResult = areaValue * priceValue;

  setResult3(calculatedResult);
  setdeal(prevDeal => ({ ...prevDeal, quote_price: calculatedResult }));
};

React.useEffect(() => {
  // Convert result to text format
  if (result3) {
    const words = toWords(result3, { format: 'en-IN' });
    setResultText3(`(${words} only)`);
  } else {
    setResultText3('');
  }
}, [result3]);


//============================mui table row and cell code and currency convert code start===============================================


//===============================Sort add contact form start===============================================================================


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
  social_media:[''],url:[''],action6:[],income:[''],amount1:[''],action7:[],document_no:[''],document_name:[''],document_pic:[''],action8:[]});

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
//============================================Sort add contact form end==================================================================


//===============================suggestion box code start for owner form and documents==================================================


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
            setShowSuggestions(false);
          }
        }, [input,allSuggestions]);

        React.useEffect(() => {
          if (documents.linkded_contact) {
            const results = allSuggestions.filter(contact =>
              contact.first_name?.toLowerCase().includes(documents.linkded_contact.toLowerCase())
            );
            setFilteredSuggestions(results);
            setShowSuggestions(true);
          } else {
            setShowSuggestions(false);
          }
        }, [documents.linkded_contact, allSuggestions]);
      
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

        // const [relation1,setrelation1]=useState("")
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
            setdeal(prevDeal => ({
              ...prevDeal,
              associated_contact: [...(prevDeal.associated_contact || []), newcontact] // Append new contact to the existing owner_details array
            }));
            // setdeal(prevDeal => ({ ...prevDeal.associated_contact,  newcontact }));
            // setrelation1(relation)
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

        const handleSuggestionClick1 = (contact) => {
         
          setShowSuggestions(false);
          const fullcontact=`${contact.title} ${contact.first_name} ${contact.last_name}`
          setdocuments({ ...documents, linkded_contact: fullcontact })
          
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

 
        
//================================suggestion box code end for owner form and documents======================================================



// ============================price change by calculated or absoulute code start======================================================


        const handleselectpricetypechang=(e)=>
        {

          const selectedValue = e.target.value;

          if (selectedValue === "absolute") {
              document.getElementById("price1").style.display="none"
            document.getElementById("multiply").style.display="none"
            document.getElementById("totalarea").style.display="none"
            document.getElementById("measurment").style.display="none"
             document.getElementById("priceintext").style.display="none"

            document.getElementById("totalprice").style.display="block"
            document.getElementById("divforprice1").style.display="block"
          } else if (selectedValue === "calculated") {
             document.getElementById("price1").style.display="block"
            document.getElementById("multiply").style.display="block"
            document.getElementById("totalarea").style.display="block"
            document.getElementById("measurment").style.display="block"
             document.getElementById("priceintext").style.display="block"
             
            document.getElementById("totalprice").style.display="none"
            document.getElementById("divforprice1").style.display="none"
          }
          setdeal((prev)=>({
            ...prev,
            calculated_type:e.target.value

          }))
         
        }

        const ehandleselectpricetypechang=(e)=>
          {
  
            const selectedValue = e.target.value;
  
            if (selectedValue === "absolute") {
                document.getElementById("price11").style.display="none"
              document.getElementById("multiply1").style.display="none"
              document.getElementById("totalarea1").style.display="none"
              document.getElementById("measurment1").style.display="none"
               document.getElementById("priceintext1").style.display="none"
  
              document.getElementById("totalprice1").style.display="block"
              document.getElementById("divforprice11").style.display="block"
            } else if (selectedValue === "calculated") {
               document.getElementById("price11").style.display="block"
              document.getElementById("multiply1").style.display="block"
              document.getElementById("totalarea1").style.display="block"
              document.getElementById("measurment1").style.display="block"
               document.getElementById("priceintext1").style.display="block"
               
              document.getElementById("totalprice1").style.display="none"
              document.getElementById("divforprice11").style.display="none"
            }
            setdeal((prev)=>({
              ...prev,
              calculated_type:e.target.value
  
            }))
           
          }

        const rhandleselectpricetypechang=(e)=>
          {
  
            const selectedValue1 = e.target.value;
  
            if (selectedValue1 === "absolute") {
                document.getElementById("rprice1").style.display="none"
              document.getElementById("rmultiply").style.display="none"
              document.getElementById("rtotalarea").style.display="none"
              document.getElementById("rmeasurment").style.display="none"
               document.getElementById("rpriceintext").style.display="none"
  
              document.getElementById("rtotalprice").style.display="block"
              document.getElementById("rdivforprice1").style.display="block"
            } else if (selectedValue1 === "calculated") {
               document.getElementById("rprice1").style.display="block"
              document.getElementById("rmultiply").style.display="block"
              document.getElementById("rtotalarea").style.display="block"
              document.getElementById("rmeasurment").style.display="block"
               document.getElementById("rpriceintext").style.display="block"
               
              document.getElementById("rtotalprice").style.display="none"
              document.getElementById("rdivforprice1").style.display="none"
            }
            setdeal((prev)=>({
              ...prev,
              calculated_type:e.target.value
  
            }))
           
          }

          const rhandleselectpricetypechang1=(e)=>
            {
    
              const selectedValue1 = e.target.value;
    
              if (selectedValue1 === "absolute") {
                  document.getElementById("rprice11").style.display="none"
                document.getElementById("rmultiply1").style.display="none"
                document.getElementById("rtotalarea1").style.display="none"
                document.getElementById("rmeasurment1").style.display="none"
                 document.getElementById("rpriceintext1").style.display="none"
    
                document.getElementById("rtotalprice1").style.display="block"
                document.getElementById("rdivforprice11").style.display="block"
              } else if (selectedValue1 === "calculated") {
                 document.getElementById("rprice11").style.display="block"
                document.getElementById("rmultiply1").style.display="block"
                document.getElementById("rtotalarea1").style.display="block"
                document.getElementById("rmeasurment1").style.display="block"
                 document.getElementById("rpriceintext1").style.display="block"
                 
                document.getElementById("rtotalprice1").style.display="none"
                document.getElementById("rdivforprice11").style.display="none"
              }
              setdeal((prev)=>({
                ...prev,
                calculated_type:e.target.value
    
              }))
             
            }

//================================== price change by calculated or absoulute code start====================================================
        
const [progress, setProgress] = useState(deal.white_portion || 10); // Initialize with deal.whiteportion

const handleMouseMove = (e) => {
  const progressBar = e.target.getBoundingClientRect();
  const newProgress = ((e.clientX - progressBar.left) / progressBar.width) * 100;
  const clampedProgress = Math.max(0, Math.min(newProgress, 100)); // Clamp between 0 and 100
  setProgress(clampedProgress);
  setdeal((prevDeal) => ({ ...prevDeal, white_portion: clampedProgress })); // Update deal.whiteportion
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
]

console.log(deal.owner_details);
console.log(deal.associated_contact);



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
                <div className="col-md-3" id="projectlabel"><label className="labels"style={{fontWeight:"bolder"}}>Price Info</label><img src="https://icon-library.com/images/green-arrow-icon-png/green-arrow-icon-png-12.jpg" alt="" style={{height:"20px",width:"145px"}}/></div>
                <div className="col-md-3" id="basiclabel"><label className="labels" style={{fontWeight:"bolder"}}>Add Owner</label><img src="https://icon-library.com/images/green-arrow-icon-png/green-arrow-icon-png-12.jpg" alt="" style={{height:"20px",width:"145px"}}/></div>
                <div className="col-md-3" id="photolabel"><label className="labels" style={{fontWeight:"bolder"}}>Add Document</label><img src="https://icon-library.com/images/green-arrow-icon-png/green-arrow-icon-png-12.jpg" alt="" style={{height:"20px",width:"115px"}}/></div>
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
                    
                    <div className="col-md-4"><label className="labels">Available For</label><select name="availablefor" id="availablefor" className="form-control form-control-sm" required="true" onChange={available_for} >
                    <option>Select</option>
                        <option>Sale</option>
                        <option>Rent</option>
                        <option>Lease</option>
                        </select>
                        </div>
                        
                        <div className="col-md-4"><label className="labels">Stage</label><select name="stage"  className="form-control form-control-sm" required="true" onChange={(e)=>setdeal({...deal,stage:e.target.value})}>
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

                        <div className="col-md-4"><label className="labels">Project</label>
                        <select className="form-control form-control-sm" name="project" onChange={handleprojectchange}>
                        <option>choose</option>
                        {
                          allproject.map((project)=>
                          (
                            <option>{project}</option>
                          ))
                        }
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Block</label>
                        <select className="form-control form-control-sm" name="block" onChange={handleallblockchange} >
                        <option>choose</option>
                    {
                      allblocks.map((block)=>
                      (
                        <option>{block.block_name}</option>
                      ))
                    }
                      
  
                </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Unit No.</label>
                        <select className="form-control form-control-sm" name="unit_no" onChange={handleallunitschange}  >
                      <option>choose</option>
                      {
                        allUnits.map((units)=>
                        (
                          <option>{units.unit_no}</option>
                        ))
                      }
                </select>
                        </div>
                  
                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Terms Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                </div>

    {/* ===============================================sale start======================================================================== */}


                <div className="row" id="sale" style={{display:"none"}}>
                  <div className="col-md-12"><u><b>Expected Price</b></u></div>
                 
                    <div className="col-md-2"><label className="labels" >Type</label><select id="calculatedorabsoulute" required="true" className="form-control form-control-sm" onChange={handleselectpricetypechang} >
                    <option value="calculated">calculated</option><option value="absolute">absolute</option>
                    </select></div>
                    <div id="price1" className="col-md-2"><label className="labels">Price</label>
                    <input id="eprice" onChange={calculateResult} type="number" className="form-control form-control-sm" /></div>
                    
                    <div className="col-md-0" id="multiply"><label className="labels" style={{visibility:"hidden"}}>Blank</label>
                    <p>X</p>
                    </div>
                    <div className="col-md-2" id="totalarea"><label className="labels" > Total Area</label><input type="number" id="earea" onChange={calculateResult} className="form-control form-control-sm"  /></div>
                    <div className="col-md-2" id="measurment"><label className="labels" > Sq Feet/Yard</label><select required="true" className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,measurment1:e.target.value})} >
                    <option value="">sq feet</option>
                    <option value="">sq yard</option>
                    </select></div>
                    
                   <div className="col-md-3"><label className="labels">Total Price<span id="priceintext"><br></br>{formatCurrency(result)}<br></br>{resultText}</span></label><input type="text" id="totalprice" style={{display:"none"}} className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,expected_price:e.target.value})}/></div>
                   <div id="divforprice1" className="col-md-5" style={{display:"none"}}></div>


                 
                  <div className="col-md-12"><u><b>Quote Price</b></u></div>
              

                    <div className="col-md-2"><label className="labels" >Type</label><select id="calculatedorabsoulute1" required="true" className="form-control form-control-sm" onChange={ehandleselectpricetypechang} >
                    <option value="calculated">calculated</option><option value="absolute">absolute</option>
                    </select></div>
                    <div id="price11" className="col-md-2"><label className="labels">Price</label>
                    <input id="qprice" onChange={calculateResult1} type="number" className="form-control form-control-sm" /></div>
                    
                    <div className="col-md-0" id="multiply1"><label className="labels" style={{visibility:"hidden"}}>Blank</label>
                    <p>X</p>
                    </div>
                    <div className="col-md-2" id="totalarea1"><label className="labels" > Total Area</label><input type="number" id="qarea" onChange={calculateResult1}  className="form-control form-control-sm"/></div>
                    <div className="col-md-2" id="measurment1"><label className="labels" > Sq Feet/Yard</label><select required="true" className="form-control form-control-sm"  >
                    <option value="">sq feet</option>
                    <option value="">sq yard</option>
                    </select></div>
                    
                   <div className="col-md-3"><label className="labels">Total Price<span id="priceintext1"><br></br>{formatCurrency(result1)}<br></br>{resultText1}</span></label><input type="text" id="totalprice1" style={{display:"none"}} className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,quote_price:e.target.value})}/></div>
                   <div id="divforprice11" className="col-md-5" style={{display:"none"}}></div>

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
                        <div className="col-md-5" ><label className="labels">White Portion</label>
                        <div className="progress-container" onMouseDown={handleMouseDown}>
                        <div className="progress-bar" style={{ width: `${progress}%` }} />
                        <div className="progress-percentage">{Math.round(progress)}%</div>
                        </div>
                        </div>
                       

                        <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                        <div className="col-md-4"><label className="labels">Team</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,team:e.target.value})}>
                    <option>Select</option>
                              <option>Sales</option>
                              <option>Marketing</option>
                              <option> Post Sales</option>
                              <option> Pre Sales</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">User</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,user:e.target.value})}>
                    <option>Select</option>
                              <option>Suraj</option> 
                              <option>Suresh Kumar</option>
                              <option>Ramesh Singh</option>
                              <option>Maanav Sharma</option>
                              <option>Sukram</option>
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
                        <option>Ground</option>
                        <option>1st</option>
                        <option>2nd</option>
                        <option>3rd</option>
                        <option>4th</option>
                        <option>Top</option>
                        </select></div>
                        <div className="col-md-8"></div>

                        <div className="col-md-12"><u><b>Expected Price</b></u></div>
                 
                 <div className="col-md-2"><label className="labels" >Type</label><select id="rcalculatedorabsoulute" required="true" className="form-control form-control-sm" onChange={rhandleselectpricetypechang} >
                 <option value="calculated">calculated</option><option value="absolute">absolute</option>
                 </select></div>
                 <div id="rprice1" className="col-md-2"><label className="labels">Price</label>
                 <input id="reprice" onChange={calculateResult2} type="number" className="form-control form-control-sm" /></div>
                 
                 <div className="col-md-0" id="rmultiply"><label className="labels" style={{visibility:"hidden"}}>Blank</label>
                 <p>X</p>
                 </div>
                 <div className="col-md-2" id="rtotalarea"><label className="labels" > Total Area</label><input type="number" onChange={calculateResult2} id="rearea"  className="form-control form-control-sm"  /></div>
                 <div className="col-md-2" id="rmeasurment"><label className="labels" > Sq Feet/Yard</label><select required="true" className="form-control form-control-sm"  >
                 <option value="">sq feet</option>
                 <option value="">sq yard</option>
                 </select></div>
                 
                <div className="col-md-3"><label className="labels">Total Price<span id="rpriceintext"><br></br>{formatCurrency(result2)}<br></br>{resultText2}</span></label><input type="text" id="rtotalprice" style={{display:"none"}} className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,expected_price:e.target.value})}/></div>
                <div id="rdivforprice1" className="col-md-5" style={{display:"none"}}></div>


              
               <div className="col-md-12"><u><b>Quote Price</b></u></div>
           

                 <div className="col-md-2"><label className="labels" >Type</label><select id="rcalculatedorabsoulute11" required="true" className="form-control form-control-sm" onChange={rhandleselectpricetypechang1} >
                 <option value="calculated">calculated</option><option value="absolute">absolute</option>
                 </select></div>
                 <div id="rprice11" className="col-md-2"><label className="labels">Price</label>
                 <input id="rqprice1" onChange={calculateResult3} type="number" className="form-control form-control-sm" /></div>
                 
                 <div className="col-md-0" id="rmultiply1"><label className="labels" style={{visibility:"hidden"}}>Blank</label>
                 <p>X</p>
                 </div>
                 <div className="col-md-2" id="rtotalarea1"><label className="labels" > Total Area</label><input type="number" onChange={calculateResult3} id="rqarea1"  className="form-control form-control-sm"/></div>
                 <div className="col-md-2" id="rmeasurment1"><label className="labels" > Sq Feet/Yard</label><select required="true" className="form-control form-control-sm" >
                 <option value="">sq feet</option>
                 <option value="">sq yard</option>
                 </select></div>
                 
                <div className="col-md-3"><label className="labels">Total Price<span id="rpriceintext1"><br></br>{formatCurrency(result3)}<br></br>{resultText3}</span></label><input type="text" id="rtotalprice1" style={{display:"none"}} className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,quote_price:e.target.value})}/></div>
                <div id="rdivforprice11" className="col-md-5" style={{display:"none"}}></div>

                
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
                        <option>06 months</option>
                        <option>11 months</option>
                        <option>24 months</option>
                        <option>36 months</option>
                        </select></div>
                        <div className="col-md-2"><label className="labels">Fitout Period</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,fitout_perioud:e.target.value})}>
                    <option>Select</option>
                        <option>06 months</option>
                        <option>11 months</option>
                        <option>24 months</option>
                        <option>36 months</option>
                        </select></div>

                        <div className="col-md-4"><label className="labels">Deal Type</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,deal_type:e.target.value})}>
                    <option>Select</option>
                        <option>Hot</option>
                        <option>Warm</option>
                        <option>Cold</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Transaction Type</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,transaction_type:e.target.value})}>
                    <option>Select</option>
                    <option>Cash</option>
                        <option>Collecter Rate</option>
                        <option>Flexiable</option>
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
                
                        <div className="col-md-5" ><label className="labels">White Portion</label>
                        <div className="progress-container" onMouseDown={handleMouseDown}>
                        <div className="progress-bar" style={{ width: `${progress}%` }} />
                        <div className="progress-percentage">{Math.round(progress)}%</div>
                        </div>
                        </div>
                        

                        <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                        <div className="col-md-4"><label className="labels">Team</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,team:e.target.value})}>
                    <option>Select</option>
                               <option>Sales</option>
                              <option>Marketing</option>
                              <option> Post Sales</option>
                              <option> Pre Sales</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">User</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,user:e.target.value})}>
                    <option>Select</option>
                    <option>Suraj</option> 
                              <option>Suresh Kumar</option>
                              <option>Ramesh Singh</option>
                              <option>Maanav Sharma</option>
                              <option>Sukram</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Visible To</label><select className="form-control form-control-sm" onChange={(e)=>setdeal({...deal,visible_to:e.target.value})}>
                    <option>Select</option>
                              <option>Sales</option>
                              <option>Marketing</option>
                              <option> Post Sales</option>
                              <option> Pre Sales</option>
                        </select></div>
                      </div>
                  </div>
  
  {/*============================================ rent end=========================================================================== */}
                  
                    <div className="col-md-12"><hr></hr></div>
                    <div className="row mt-4">
                        <div className="col-md-2" id="projectbtn" onClick={handler} style={{marginLeft:"82%",marginBottom:"-50px"}}><button className="form-control form-control-sm">Next</button></div>
      
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
                                    <span style={{color:"orange",fontWeight:"bolder"}}>{deal.relation}</span>
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
                    <div className="col-md-2" onClick={handler3} style={{marginLeft:"82%",marginBottom:"40px"}}><button className="form-control form-control-sm" id="basicbtn">Next</button></div>
                    <div className="col-md-2" onClick={handler2} style={{marginLeft:"-90%"}}><button className="form-control form-control-sm" id="prevbtn">Prev</button></div>
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
                  <div className="col-md-6"></div>
                  
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

          <Modal show={show2} onHide={handleClose2} size='lg' style={{transition:"0.5s ease-in"}}>
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

{/*-----------------------------------------------------------------document form----------------------------------------------------------------- */}             
          
              <div id="photosform" style={{border:"1px solid gray",padding:"5px",marginTop:"-50px",display:"none"}}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                </div><hr></hr>
                <div className="row mt-2">
                        <div className="col-md-2"><label className="labels">Document Name</label><select className="form-control form-control-sm" onChange={(e)=>setdocuments({...documents,document_name:e.target.value})}>
                          <option>Choose</option>
                          <option>Aadhar Card</option>
                          <option>Pan Card</option>
                          <option>Voter Id</option>
                          <option>Passport</option>
                          <option>Driving Licence</option>
                          <option>Other</option>
                          </select>
                         </div>
                        <div className="col-md-2"><label className="labels">Document No</label><input type="text" className="form-control form-control-sm"onChange={(e)=>setdocuments({...documents,document_no:e.target.value})} /></div>
                        <div className="col-md-2"><label className="labels">Date</label><input type="date" className="form-control form-control-sm" onChange={(e)=>setdocuments({...documents,document_Date:e.target.value})}/></div>
                        <div className="col-md-2" id="suggestion-box" style={{ position: 'relative' }}><label className="labels">Linked Contact</label><input type="text" className="form-control form-control-sm" value={documents.linkded_contact} onChange={(e)=>setdocuments({...documents,linkded_contact:e.target.value})}/></div>



                        {/* <div className="col-md-9" id="suggestion-box" style={{ position: 'relative' }}><label className="labels" style={{visibility:"hidden"}}>Search</label><input type="search"className="form-control form-control-sm" value={documents.linkded_contact}  placeholder="Type here For Search in Contact" required="true" onChange={(e)=>setdocuments({...documents,linkded_contact:e.target.value})}/></div> */}
                        {showSuggestions  && filteredSuggestions.length > 0 && (
                            <ul className="suggestion-list">
                              {filteredSuggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => handleSuggestionClick1(suggestion)}>
                                  {suggestion.title} {suggestion.first_name} {suggestion.last_name}
                                </li>
                              ))}
                            </ul>
                          )}



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
         Array.isArray(deal.document_details)?
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
        )):[]}
      </tbody>
    </Table>
    </TableContainer>
                  
                  </div>
              </div>
              <div className="row mt-4">
                    <div className="col-md-2" onClick={handler5} style={{marginLeft:"82%",marginBottom:"40px",display:"none"}} id="photosbtn"><button className="form-control form-control-sm" >Next</button></div>
                    <div className="col-md-2" onClick={handler4} style={{marginLeft:"-90%",display:"none"}} id="prevbtn1"><button className="form-control form-control-sm" >Prev</button></div>
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
                          {
                          Array.isArray(deal.s_no)?
                          deal.s_no.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                      <input 
                                        type="text"
                                        className="form-control form-control-sm"
                                        
                                        onChange={(event) => handlesnochange(index, event)}
                                      />
                                      
                                    </div>
                                  )):[]}
                          </td>
                          <td>
                          {
                          Array.isArray(deal.preview)?
                          deal.preview.map((name, index) => (
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
                                  )):[]}
                          </td>
                          <td>
                          {Array.isArray(deal.descriptions)?
                          deal.descriptions.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                      <input 
                                        type="text"
                                        className="form-control form-control-sm"
                                      
                                        onChange={(event) => handledescriptionchange(index, event)}
                                      />
                                      
                                    </div>
                                  )):[]}
                          </td>
                          <td>
                          {Array.isArray(deal.category)?
                          deal.category.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                      <select className="form-control form-control-sm" required="true" onChange={(event) => handlecategorychange(index, event)}>
                                          <option>select</option>
                                          <option>Bedroom</option>
                                          <option>Hall</option>
                                          <option>Kitchen</option>
                                          <option>Balcony</option>
                                          <option>Washroom</option>
                                          <option>Pooja Room</option>
                                          <option>Dining Room</option>
                                          <option>Drawing Room</option>
                                          </select>
                                    </div>
                                  )):[]}
                          </td>
                          <td>
                          {Array.isArray(deal.action)?
                          deal.action.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                    
                                      <div><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                    </div>
                                  )):[]}
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
                          {Array.isArray(deal.s_no1)?
                          deal.s_no1.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                      <input 
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={name}
                                        onChange={(event) => handlesno1change(index, event)}
                                      />
                                  
                                    </div>
                                  )):[]}
                          </td>
                          <td>
                          {Array.isArray(deal.url)?
                          deal.url.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                      <input 
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={name}
                                        onChange={(event) => handleurlChange(index, event)}
                                      />
                                      
                                    </div>
                                  )):[]}
                                  
                          </td>
                          <td>
                          {Array.isArray(deal.action1)?
                          deal.action1.map((name, index) => (
                                    <div key={index}className="col-md-12" style={{marginTop:"10px"}}>
                                    
                                      <div><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall1(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                    </div>
                                  )):[]}
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
                                          <option>Own Website</option>
                                          <option>99 Acre</option>
                                          <option>Olx</option>
                                          <option>Magicbricks</option>
                                          <option>Etc.</option>
                                          </select>
                                    </div>
                                    <div className="col-md-4" style={{marginTop:"10px"}}><label className="labels">Social Media</label>
                                      <select className="form-control form-control-sm" required="true" onChange={(e)=>setdeal({...deal,social_media:e.target.value})}>
                                          <option>select</option>
                                          <option>Facebook</option>
                                          <option>Instagram</option>
                                          <option>Googe Page</option>
                                          <option>Linkdin</option>
                                          <option>Twitter</option>
                                          </select>
                                    </div>
                                    <div className="col-md-4" style={{marginTop:"10px"}}><label className="labels">Send(Matched Lead)</label>
                                      <select className="form-control form-control-sm" required="true" onChange={(e)=>setdeal({...deal,send_matchedlead:e.target.value})}>
                                          <option>select</option>
                                          <option>Message</option>
                                          <option>What's App</option>
                                          <option>Email</option>
                                          </select>
                                    </div>
                                    <div className="col-md-10"><label className="labels">Descriptions</label><ReactQuill value={deal.remarks} formats={formats} modules={modules}   style={{height:"200px"}} onChange={(value) => setdeal({ ...deal, remarks: value })}/></div>
                                    <div className="col-md-2"></div>
                    
                                    </div>
                  </div>
                <div className="row mt-5">
                    <div className="col-md-2"  style={{marginLeft:"82%",marginBottom:"40px",display:"none"}} id="ownerbtn"><button className="form-control form-control-sm" onClick={add_deal}>Save</button></div>
                    <div className="col-md-2" onClick={handler6} style={{marginLeft:"-90%",display:"none"}} id="prevbtn2"><button className="form-control form-control-sm" >Prev</button></div>
                </div>  
      
        </div>
    </div>
               <ToastContainer/>
        </div>
    );
    }
export default Deal;
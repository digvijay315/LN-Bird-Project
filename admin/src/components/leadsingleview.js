import React, { act, useEffect } from 'react'
import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import { useLocation } from 'react-router-dom';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import api from "../api";
import { Tooltip } from 'react-bootstrap';
import { Select, MenuItem, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ReactQuill from 'react-quill';  // Import ReactQuill
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2'; 
import '../css/leadview.css'
import { useDropzone } from 'react-dropzone';
import { toast, ToastContainer } from "react-toastify";

function Leadsingleview() {


  

    const location=useLocation()
    const lead=location.state || {}

    const[documents,setdouments]=useState([])

    useEffect(() => {
      if (lead && lead.document_name && lead.document_no && lead.document_pic) {
        // Merging the arrays together
        const mergedDocuments = lead.document_name.map((name, index) => ({
          name,
          number: lead.document_no[index],
          pic: lead.document_pic[index]
        }));
        setdouments(mergedDocuments);
      }
    }, [lead]);
  
    const[deal,setdeal]=useState([])
    const viewdeal=async()=>
    {
      const resp=await api.get('viewdeal')
      setdeal(resp.data.deal)
      try {
        
      } catch (error) {
        console.log(error);
        
      }
    }
    useEffect(()=>
    {
      viewdeal()
    },[])

    const[filterdeal,setfilterdeal]=useState([])
    

  React.useEffect(() => {
    if (deal.length > 0) {
     
        const price1 = lead.budget_min;
        const price2 = lead.budget_max;
        const requirment = lead.requirment === 'Buy' ? 'Sale' : lead.requirment;
  
        // Filter leads based on the current deal's criteria
        const filterdeals = deal.filter(
          (item) =>
            item.available_for === requirment &&
            item.expected_price >= parseFloat(price1) &&
            item.expected_price <= parseFloat(price2)
        );
      
        
       setfilterdeal(filterdeals)
   
      
    }
  }, [deal]);

 
  

    const formattedDate = new Date(lead.lastcommunication).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      

      const allColumns = [
        { id: 'sno', name: '#' },
        { id: 'house_details', name: 'House Details' },
        { id: 'contact', name: 'Contact' },
        { id: 'available_from', name: 'Available From' },
      ];
      const allColumnsdocuments = [
        { id: 'sno', name: '#' },
        { id: 'document_name', name: 'Document Name' },
        { id: 'document_no', name: 'Document No.' },
        { id: 'document_pic', name: 'View' },
      ];
      const allColumnstask = [
        { id: 'sno', name: '#' },
        { id: 'activity_type', name: 'Type' },
        { id: 'start_date', name: 'Date' },
        { id: 'sechudle_by', name: 'By' },
      ];
      const allColumnsunit = [
        { id: 'sno', name: '#' },
        { id: 'unit_no', name: 'Unit No' },
        { id: 'project', name: 'Project' },
        { id: 'relation', name: 'Relation' },
      ];
  
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
      
     
      const [isTableVisible, setIsTableVisible] = useState(false);

      // Function to toggle the visibility of the table
      const toggleTableVisibility = () => {
        setIsTableVisible(prevState => !prevState);
      };

      const [isTableVisible1, setIsTableVisible1] = useState(false);

      // Function to toggle the visibility of the table
      const toggleTableVisibility1 = () => {
        setIsTableVisible1(prevState => !prevState);
      };

      
      const [isTableVisible2, setIsTableVisible2] = useState(false);

      // Function to toggle the visibility of the table
      const toggleTableVisibility2 = () => {
        setIsTableVisible2(prevState => !prevState);
      };

      
      const [isTableVisible3, setIsTableVisible3] = useState(false);

      // Function to toggle the visibility of the table
      const toggleTableVisibility3 = () => {
        setIsTableVisible3(prevState => !prevState);
      };

      const [alltask,setalltask]=useState([])

      const[sitevisitdata,setsitevisitdata]=useState([])
      const sitevisit=async()=>
      {
        try {
            const resp=await api.get('viewsitevisit')
            setsitevisitdata(resp.data.sitevisit)
            
            
        } catch (error) {
            console.log(error);
            
        }
      }

      const[meetingdata,setmeetingdata]=useState([])
      const meeting=async()=>
      {
        try {
            const resp=await api.get('viewmeetingtask')
            setmeetingdata(resp.data.meetingtask)
           
            
        } catch (error) {
            console.log(error);
            
        }
      }

      const[maildata,setmaildata]=useState([])
      const mail=async()=>
      {
        try {
            const resp=await api.get('viewmailtask')
            setmaildata(resp.data.mail_task)
          
            
        } catch (error) {
            console.log(error);
            
        }
      }

      const[calldata,setcalldata]=useState([])
      const call=async()=>
      {
        try {
            const resp=await api.get('viewcalltask')
            setcalldata(resp.data.call_task)
          
            
        } catch (error) {
            console.log(error);
            
        }
      }
      useEffect(()=>
    {
        sitevisit()
        meeting()
        mail()
        call()
    },[])

  
    

    const[matchsitevisitdata,setmatchsitevisitdata]=useState([])
    const matchLeadData = (site) => {
        const [title, firstName, lastName] = site.lead.split(" "); // Split full name into title, first name, last name
      
        if (
          lead.title === title &&
          lead.first_name === firstName &&
          lead.last_name === lastName
        ) {
            setmatchsitevisitdata((prevData) => [...prevData, site]);
            setalltask((prevData) => [...prevData, site]);
        }
      };

     




    useEffect(() => {
        if (sitevisitdata.length > 0) {
          sitevisitdata.forEach((site) => {
            if (site.lead) {
              // Now only need to match directly with site.lead
              matchLeadData(site); 
               // Assuming site contains lead.title, lead.first_name, lead.last_name
            }
          });
        }
      }, [sitevisitdata]);

      const[matchmeetingdata,setmatchmeetingdata]=useState([])
      const matchleaddatawithmeeting = (meeting) => {
          const [title, firstName, lastName] = meeting.lead.split(" "); // Split full name into title, first name, last name
        
          if (
            lead.title === title &&
            lead.first_name === firstName &&
            lead.last_name === lastName
          ) {
            setmatchmeetingdata((prevData) => [...prevData, meeting]);
            setalltask((prevData) => [...prevData, meeting]);
          }
        };
  
  
  
  
      useEffect(() => {
          if (meetingdata.length > 0) {
            meetingdata.forEach((meeting) => {
              if (meeting.lead) {
                // Now only need to match directly with site.lead
                matchleaddatawithmeeting(meeting);  // Assuming site contains lead.title, lead.first_name, lead.last_name
              }
            });
          }
        }, [meetingdata]);

        const[matchmaildata,setmatchmaildata]=useState([])
        const matchmaildatawithlead = (mail) => {
            // const [title, firstName, lastName] = meeting.lead.split(" "); // Split full name into title, first name, last name
          
            if (
              lead.title === mail.title2 &&
              lead.first_name === mail.first_name &&
              lead.last_name === mail.last_name
            ) {
                setmatchmaildata((prevData) => [...prevData, mail]);
                setalltask((prevData) => [...prevData, mail]);
            }
          };
    
    
    
    
        useEffect(() => {
            if (maildata.length > 0) {
              maildata.forEach((mail) => {
               
                  // Now only need to match directly with site.lead
                  matchmaildatawithlead(mail);  // Assuming site contains lead.title, lead.first_name, lead.last_name
                
              });
            }
          }, [maildata]);
    

          const[matchcalldata,setmatchcalldata]=useState([])
          const matchcalldatawithlead = (call) => {
               const [title, firstName, lastName] = call.lead.split(" "); // Split full name into title, first name, last name
            
              if (
                lead.title === title &&
                lead.first_name === firstName &&
                lead.last_name === lastName
              ) {
                setmatchcalldata((prevData) => [...prevData, call]);
                setalltask((prevData) => [...prevData, call]);
              }
            };
      
      
      
      
          useEffect(() => {
              if (calldata.length > 0) {
                calldata.forEach((call) => {
                 
                    // Now only need to match directly with site.lead
                    matchcalldatawithlead(call);  // Assuming site contains lead.title, lead.first_name, lead.last_name
                  
                });
              }
            }, [maildata]);

          console.log(alltask);
          


            const [imagePreview, setImagePreview] = useState(null);
            const [openPreview, setOpenPreview] = useState(false);
          
            const handlePreviewClick = (imageUrl) => {
              setImagePreview(imageUrl);
              setOpenPreview(true); // Open the preview modal
            };
          
            const handleClosePreview = () => {
              setOpenPreview(false);
              setImagePreview(null); // Close the modal
            };


            // Add some basic styles for modal
const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    position: 'relative',
  },
  imagePreview: {
    maxWidth: '100%',
    maxHeight: '80vh',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'red',
    color: '#fff',
    border: 'none',
    padding: '5px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
};


function formatDate(date) {
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  // Get day suffix (st, nd, rd, th)
  let suffix = 'th';
  if (day === 1 || day % 10 === 1) suffix = 'st';
  if (day === 2 || day % 10 === 2) suffix = 'nd';
  if (day === 3 || day % 10 === 3) suffix = 'rd';

  // Get hours and minutes
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12; // Convert to 12-hour format
  hours = hours ? hours : 12; // Handle the case for 12 AM/PM
  minutes = minutes < 10 ? '0' + minutes : minutes; // Ensure minutes are always 2 digits

  // Format the date and time as "1st Jan 2025, 11:22 AM"
  return `${day}${suffix} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
}


React.useEffect(()=>{fetchcdata()},[])


const [flattenedUnits, setFlattenedUnits] = useState([]);
const fetchcdata=async(event)=>
{
  
  try {
    const resp=await api.get('viewproject')
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

console.log(flattenedUnits);

const [matchunit, setmatchunit] = useState([]); // To store matched data





useEffect(() => {
  const matchLeadWithUnit = async () => {
    let matchedUnits = []; // Temp array to store matched units

    // Iterate over each unit in flattenedUnits
    for (let item of flattenedUnits) {
      let matched = false; // Flag to check if a match is found

      // Check owner_details array for matches
      for (let owner of item.owner_details) {
         console.log(owner.title);
         console.log(owner.first_name);
         console.log(owner.last_name);
         console.log(lead.title);
         console.log(lead.first_name);
         console.log(lead.last_name);
        
        // const owner = await fetchOwnerDetails(ownerId); // Fetch owner details by ID
        if (owner && owner.title === lead.title && owner.first_name === lead.first_name && owner.last_name === lead.last_name) {
          matchedUnits.push({ ...item, matchedData: owner });
          matched = true; // Mark as matched
          break; // Break the loop once a match is found
        }
      }

      // If no match found in owner_details, check associated_contact
      if (!matched) {
        for (let contact of item.associated_contact) {
          // const contact = await fetchContactDetails(contactId); // Fetch contact details by ID
          if (contact && contact.title === lead.title && contact.first_name === lead.first_name && contact.last_name === lead.last_name) {
            matchedUnits.push({ ...item, matchedData: contact });
            break; // Break the loop once a match is found
          }
        }
      }
    }

    // Update state with the matched units
    setmatchunit(matchedUnits);
  };

  // Trigger the matching function
  matchLeadWithUnit();
}, [flattenedUnits]);


// ==============================================log a call model start===================================================================

const status=["Answered","Missed","Not Pic","Busy","Cut Call","Number Not Reachable","Switch Off","Incoming","Not Available","Number Invalid"]
const [outcome, setoutcome] = useState(["Intrested", "Not Intrested", "Left Voicemail", "No Answer"]);
const[allactivity,setallactivity]=useState([])
const[filterdata,setfilterdata]=useState([])
const viewallactivity=async()=>
{
  try {
    const resp=await api.get('viewactivity')
    const fullname = `${lead.title} ${lead.first_name} ${lead.last_name}`;
    const filteredActivities = resp.data.activity.filter((activity) => {
      return activity.lead === fullname; // Filter based on the full name
    });
    setallactivity(filteredActivities)
    setfilterdata(filteredActivities)
    
  } catch (error) {
    console.log(error);
    
  }
}
useEffect(()=>
{
  viewallactivity()
},[])




const[activity,setactivity]=useState({activity_name:"", call_outcome:"", activity_note:"",lead:"",
  direction:"",status:"",date:"",duration:"",intrested_inventory:"",message:"",subject:"",viewcount:0,
  activity_note1:""})

const [show1, setshow1] = useState(false);

const handleClose1 = () => setshow1(false);
const handleShow1=async()=>
{
      setshow1(true);
      const fullname = `${lead.title} ${lead.first_name} ${lead.last_name}`;
      setactivity({...activity,activity_name:"call",lead:fullname})
}

const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    ['link'],
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }],
    ['clean']  // Allows the user to clear formatting
  ],
};

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

const handleNoteChange = (value) => {
  setactivity({ ...activity, activity_note: value });
};

      const addactivity=async()=>
      {
        try {
          const resp=await api.post('addactivity',activity)
          if(resp.status===200)
          {
            Swal.fire({
              icon: 'success',
              title: 'Activity Saved',
              text: 'Your activity has been saved successfully!',
            });
            handleClose1()
          }
          setTimeout(() => {
            window.location.reload()
          }, 1000);
          
        } catch (error) {
          console.log(error);
          
        }
      }

      const deleteactivity=async(id)=>
      {
        try {
          const resp=await api.delete(`removeactivity/${id}`)
          if(resp.status===200)
            {
              Swal.fire({
                icon: 'success',
                title: 'Activity Deleted',
                text: 'Your activity has been deleted successfully!',
              });
              setTimeout(() => {
                window.location.reload()
              }, 1000);
            }
          
        } catch (error) {
          console.log(error);
          
        }
      }
 

      const [show2, setshow2] = useState(false);

const handleClose2 = () => setshow2(false);
const handleShow2=async(e)=>
{
      setshow2(true);
}

const[newoutcome,setnewoutcome]=useState("")
const addoutcome = () => {
  // Make sure the new outcome is not empty
  if (newoutcome.trim() !== "") {
    setoutcome(prevOutcome => [...prevOutcome, newoutcome]);  // Add new outcome to the array
    handleClose2();  // Close the modal or perform any other action
    setnewoutcome(""); // Clear the newoutcome input field
  }
};


const handleCopy = () => {
  // Use the Clipboard API to copy the text to the clipboard
  navigator.clipboard.writeText(lead.mobile_no)
    .then(() => {
      // Optional: alert or feedback to user that the text was copied
      Swal.fire({
        icon: 'success',
        text: 'Text copied to clipboard',
      });
    })
    .catch((err) => {
      // Optional: handle error if clipboard write fails
      console.error("Failed to copy text: ", err);
    });
};


const[sitevisitdata1,setsitevisitdata1]=useState([]);
const fetchsitevisitdataformeeting=async(event)=>
{
  
  try {
    const resp=await api.get('viewsitevisit')
    const result = resp.data?.sitevisit?.flatMap((item) => item.intrested_inventory) || [];
    setsitevisitdata1(result)
  } catch (error) {
    console.log(error);
  }

}

useEffect(()=>
  {
    fetchsitevisitdataformeeting()
  },[])

// ==============================================log a call model end=================================================================





// /=================================================internal notes start===========================================================

const [selectedOption, setSelectedOption] = useState("Internal Notes"); // Set the default value to "Internal Notes"

const handleChange = (event) => {
  const fullname = `${lead.title} ${lead.first_name} ${lead.last_name}`;
  setSelectedOption(event.target.value);
  setactivity({...activity,activity_name:"email",lead:fullname})

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
  setactivity({...activity,message:htmlFormattedMessage})
};

const sendmail=async(e)=>
  {
    e.preventDefault();
    const formData = new FormData();

// Add the subject, message, and recipient email to form data
        formData.append('subject', subject);
        formData.append('message', message);
        formData.append('emails', lead.email);
        
        // Append the files to form data
        attachments.forEach((file) => {
          formData.append('attachments', file);
        });
    try {
      
      const resp=await api.post(`contact/sendmail`,formData)
      
      if(resp.status===200)
      {
        Swal.fire({
          icon: 'success',
          title: 'Mail',
          text: 'Mail Sent Successfully!',
        });
        const resp1=await api.post('addactivity',activity)
     setTimeout(() => {
      window.location.reload()
     }, 2000);
    
      }
     
    } catch (error) {
      toast.error(error.response.data,{ autoClose: 2000 });
    }
  }

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (event) => {
    const selectedValues = event.target.value;
    setSelectedOptions(selectedValues);

    // Update the subject with selected field values from the lead object
    const updatedSubject = selectedValues
      .map((field) => {
        switch (field) {
          case "name":
            return lead.title + " " + lead.first_name + " " + lead.last_name;
          case "mobile":
            return lead.mobile_no;
          case "city":
            return lead.city;
            case "email":
              return lead.email;
              case "company":
                return lead.company_name;
                case "designation":
                  return lead.designation;
          default:
            return "";
        }
      })
      .join(", "); // Join selected fields with a comma and space
    setsubject(updatedSubject); // Set the subject with the dynamically updated value
  };

const handlemailmessage=(e)=>
{
  setmessage(e.target.value)
  setactivity({...activity,message:e.target.value})
}
const [viewCount1, setViewCount1] = useState(0);
const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = async(id) => {
    setIsExpanded(!isExpanded);  // Toggle the expanded state
    if (!isExpanded) {
      try {
        const resp = await api.get(`viewactivitybyid/${id}`);
        console.log(resp);
        
        const currentViewCount = Number(resp.data.activity[0].viewcount); 
        const newViewCount = currentViewCount + 1;
        console.log(currentViewCount);
        
        const resp1=await api.put(`updateactivity/${id}`,{ viewCount1: newViewCount })
        
      } catch (error) {
        console.log(error);
        
      }
    }

  };

  useEffect(() => {
    // Access the editor container and editor area after the component is mounted
    const quillEditor = document.querySelector('.my-quill-editor .ql-container');
    const quillContent = document.querySelector('.my-quill-editor .ql-editor');

    if (quillEditor) {
      quillEditor.style.border = 'none';
    }
    if (quillContent) {
      quillContent.style.border = 'none';
    }
  }, []);
  
const handleactivitynoteschange=(value)=>
{
  const fullname = `${lead.title} ${lead.first_name} ${lead.last_name}`;
  setactivity({...activity,activity_note1:value,activity_name:"notes",lead:fullname})
}



//=================================================== internal notes end=============================================================
      
//======================================== filter activity start===============================================================


 const [showDropdown, setShowDropdown] = useState(false);
 const activityname = [
  'call', 
  'email', 
  'notes' 
];

 const [selectactivity, setselectactivity] = useState([]);

 const handlefilterCheckboxChange = (activity) => {
   // Update selectactivity based on the checkbox change
   const updatedSelections = selectactivity.includes(activity)
     ? selectactivity.filter((p) => p !== activity)  // Remove the activity if already selected
     : [...selectactivity, activity];  // Add the activity if it's not selected
 
   setselectactivity(updatedSelections);
 
   // Filter the data based on selected activities (activity_name)
   const newFilteredData = filterdata.filter((item) =>
     updatedSelections.length === 0 || updatedSelections.includes(item.activity_name)
   );
 
   // Set allactivity with the newly filtered data (no need to merge previous data)
   setallactivity(newFilteredData);
 };
 console.log(allactivity);
 




// =================================================filter activity end============================================================
    
  return (
    <div>

      <Header1/>
      <Sidebar1/>

      {/* <div style={{marginTop:"60px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px"}}>
        <div className="lead" style={{width:"200px",padding:"10px",borderRadius:"10px",}} >
          <h6>INCOMING</h6>
          <p></p>
        </div>
        <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
          <h6>PROSPECT</h6>
          <p></p>
        </div>
        <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}} >
          <h6>OPPORTUNITY</h6>
          <p></p>
        </div>
        <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
          <h6>NEGOTIATION</h6>
          <p></p>
        </div>
     
        <div className="lead" style={{borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent",border:"none",fontWeight:"bold",marginTop:"-10px"}}>
            CLOSED
        </button>
            <ul class="dropdown-menu">
              <li className="form-control">Won <span style={{fontSize:"30px",color:"green",fontWeight:"bolder"}}><sup></sup></span></li>
              <li className="form-control">Lost <span style={{fontSize:"30px",color:"red",fontWeight:"bolder"}}><sup></sup></span></li>
              <li className="form-control">Unqualified  <span style={{fontSize:"30px",color:"red",fontWeight:"bolder"}}><sup></sup></span></li>
            </ul>
         
        </div>  
        
      </div> */}

       <div style={{marginTop:"60px",backgroundColor:"white",height:"80px",paddingLeft:"80px"}}>
        <div  style={{padding:"10px",borderRadius:"10px"}} >
          <h6>Lead</h6>
          <h3 style={{fontWeight:"normal",color:"blue",fontFamily:"times-new-roman"}}>{lead.title} {lead.first_name} {lead.last_name}<span style={{fontSize:"14px",marginLeft:"10px",color:"black"}}>{lead.company_name}
          <button style={{width:"50px",height:"30px",borderColor:"blue",borderRadius:"5px",fontSize:"14px",marginLeft:"20px",backgroundColor:"white"}}>Edit</button>
          </span>
          </h3>
        </div>
      </div>
      

      <div className='row' style={{display:"flex",height:"100%",marginLeft:"60px",width:"100%",gap:"10px",marginTop:"5px",paddingBottom:"50px",backgroundColor:"white"}}>
        <div className='col-md-3' style={{padding:"20px",fontSize:"14px",fontFamily:"arial"}}>
            {/* <div style={{display:"flex",}}>
                <h6 style={{fontFamily:"times-new-roman"}}>{lead.title} {lead.first_name} {lead.last_name}
                    <p style={{fontSize:"12px",fontWeight:"normal"}}>{lead.email}</p>
                </h6>
                <h6 style={{marginLeft:"35%"}}>Site Visit</h6>
                <h6 style={{marginLeft:"20px"}}>Task</h6>
            </div> */}
            {/* <hr style={{ border: "none", borderTop: "2px solid gray",marginTop:"-10px" }} /> */}
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-5'><label style={{color:"#B85042"}}>Status</label>
                <select className="form-control form-control-sm" style={{color:"red"}}>
                    <option >{lead?.lead_type || '---Select---'}</option>
                        {/* <option>Hot</option>
                        <option>Warm</option>
                        <option>Cold</option> */}
                </select>
                </div>
                <div className='col-md-4'></div>

                <div className="col-md-6" >
                            <label  style={{color:"#B85042"}}>Mobile</label>
                <FormControl fullWidth size="small">
                  <InputLabel id="mobile-label" style={{paddingTop:"23px",fontSize:"18px"}}>
                  <img
                        src="https://png.pngtree.com/png-clipart/20190619/original/pngtree-call-icon-3d-png-image_3990094.jpg"
                        alt="call-icon"
                        style={{ height: '30px', marginRight: '4px' }}
                      />
                  {lead.mobile_no}</InputLabel>
                  <Select
                    labelId="mobile-label"
                    id="mobile-select"
                    value={lead.mobile_no}  // Always keep the mobile number as the value
                    style={{ fontSize: '14px', boxShadow: 'none' }}  // Remove outline and any box shadow
                    MenuProps={{
                      PaperProps: {
                        // style: {
                        //   maxHeight: 200, // Limit dropdown height
                        // },
                      },
                    }}
                  >
                
                    {/* Action options */}
                    <MenuItem style={{fontSize:"14px"}}>
                      <img
                        src="https://png.pngtree.com/png-clipart/20190619/original/pngtree-call-icon-3d-png-image_3990094.jpg"
                        alt="call-icon"
                        style={{ height: '16px', marginRight: '8px' }}
                      />
                      Call Directly
                    </MenuItem>
                    <MenuItem style={{fontSize:"14px"}}>
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/005/911/524/non_2x/desktop-computer-icon-desktop-computer-symbol-free-vector.jpg"
                        alt="message-icon"
                        style={{ height: '16px', marginRight: '8px' }}
                      />
                      Call Via Desktop App
                    </MenuItem>
                    <MenuItem style={{fontSize:"14px"}}>
                      <img
                        src="https://static.thenounproject.com/png/888710-200.png"
                        alt="whatsapp-icon"
                        style={{ height: '16px', marginRight: '8px' }}
                      />
                      Add To Call List
                    </MenuItem>
                    <MenuItem style={{fontSize:"14px"}} onClick={handleShow1}>
                      <img
                        src="https://www.iconpacks.net/icons/2/free-plus-icon-3107-thumb.png"
                        alt="whatsapp-icon"
                        style={{ height: '16px', marginRight: '8px' }}
                      />
                      Log a Call
                    </MenuItem>
                    <MenuItem style={{fontSize:"14px"}}>
                      <img
                        src="https://static-00.iconduck.com/assets.00/view-list-text-icon-512x512-5d2by98p.png"
                        alt="whatsapp-icon"
                        style={{ height: '16px', marginRight: '8px' }}
                      />
                      View Script
                    </MenuItem>
                    <MenuItem style={{fontSize:"14px"}} onClick={handleCopy }>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb0e6jgH9MKFXVyOdjqtb-8Y2AGgtNybnD4g&s"
                        alt="whatsapp-icon"
                        style={{ height: '16px', marginRight: '8px' }}
                      />
                    Copy {lead.mobile_no}
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
                <div className='col-md-3' style={{marginTop:"25px"}}><label style={{color:"#B85042"}}>Tags</label><p style={{lineHeight:"0px",fontWeight:"normal"}}>{lead.tags}</p></div>
                <div className='col-md-3'></div>

            

                <div className='col-md-5' style={{marginTop:"50px"}}><label style={{color:"#B85042"}}>Owner Sales/Manager</label>
                    <p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.owner}</p>
                </div>
                <div className='col-md-3' style={{marginTop:"50px"}}><label style={{color:"#B85042"}}>Team</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.team} Team</p></div>
                <div className='col-md-4' style={{marginTop:"50px"}}><label style={{color:"#B85042"}}>Time Zone</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>Asia/Kolkata</p></div>


                <div className='col-md-4' style={{marginTop:"0px"}}><label style={{color:"#B85042"}}>Recived On</label>
                    <p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.owner}</p>
                </div>
                <div className='col-md-4' style={{marginTop:"0px"}}><label style={{color:"#B85042"}}>Source</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.campegin} {lead.source}</p></div>
                <div className='col-md-4' style={{marginTop:"0px"}}><label style={{color:"#B85042"}}>Last Conduct At</label><p style={{ wordWrap: "break-word", whiteSpace: "normal",marginTop:"-10px",fontWeight:"normal"}}>{formattedDate}</p></div>
                <div className='col-md-12'><hr></hr></div>

                <div className='row' style={{border:"1px solid gray",margin:"10px",width:"100%",borderRadius:"5px",padding:"10px"}}> 
                    <div className='col-md-10' style={{color:"blue",fontWeight:"normal"}}>{lead.requirment}</div>
                    <div className='col-md-2'  style={{cursor: "pointer",fontSize: "30px",marginTop: "-7px",fontWeight:"lighter"}}>+</div>
                    <div className='col-md-12'><hr></hr></div>
                    <div className='col-md-12'><p style={{fontWeight:"normal"}}>Location-{lead.location} {lead.city}</p></div>

                    <div className='col-md-4' ><label style={{color:"#B85042"}}>Property Type</label>
                    <p style={{marginTop:"-10px",wordWrap: "break-word", whiteSpace: "normal",fontWeight:"normal"}}>{lead.property_type}</p>
                </div>
                <div className='col-md-4'><label style={{color:"#B85042"}}>Sub Type</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.sub_type}</p></div>
                <div className='col-md-4' ><label style={{color:"#B85042"}}>Unit Type</label><p style={{marginTop:"-10px",fontWeight:"normal",wordWrap: "break-word", whiteSpace: "normal"}}>{lead.unit_type}</p></div>

                <div className='col-md-4' ><label style={{color:"#B85042"}}>Budget</label>
                    <p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.budget_min} to {lead.budget_max}</p>
                </div>
                <div className='col-md-4'><label style={{color:"#B85042"}}>Area/Size</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.minimum_area}{lead.area_metric} to {lead.maximum_area}{lead.area_metric}</p></div>
                <div className='col-md-4' ><label style={{color:"#B85042"}}>Furnishing</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.furnishing}</p></div>

                <div className='col-md-4' ><label style={{color:"#B85042"}}>Facing</label>
                    <p style={{marginTop:"-10px",fontWeight:"normal",wordWrap: "break-word", whiteSpace: "normal"}}>{lead.facing}</p>
                </div>
                <div className='col-md-4'><label style={{color:"#B85042"}}>Transaction Type</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.transaction_type}</p></div>
                <div className='col-md-4' ><label>Timeline</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.timeline}</p></div>

                <div className='col-md-8' ><label style={{color:"#B85042"}}>Specific Requirment</label>
                    <p style={{marginTop:"-10px",fontWeight:"normal"}}></p>
                </div>
                
                
                <div className='col-md-4' ><label style={{color:"#B85042"}}>Road</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.road}</p></div>

                </div>

                <div className='row' style={{border:"1px solid gray",borderRadius:"5px",padding:"10px",margin:"10px",width:"100%"}}> 
                    <div className='col-md-12' style={{color:"blue",fontWeight:"normal"}}>Personal Details</div>
                    <div className='col-md-12'><hr></hr></div>
                    <div className='col-md-12'><p style={{fontWeight:"normal"}}>Father/Husband Name-{lead.father_husband_name} {lead.city}</p></div>

                    <div className='col-md-3' ><label style={{color:"#B85042"}}>Address</label>
                    <p style={{marginTop:"-10px",wordWrap: "break-word", whiteSpace: "normal",fontWeight:"normal"}}>{lead.h_no}</p>
                </div>
                <div className='col-md-3'><label style={{color:"#B85042"}}>Area/Location</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.area1}</p></div>
                <div className='col-md-2' ><label style={{color:"#B85042"}}>City</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.city1}</p></div>
                <div className='col-md-2'><label style={{color:"#B85042"}}>State</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.state1}</p></div>
                <div className='col-md-2' ><label style={{color:"#B85042"}}>Zip</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.pincode1}</p></div>

                <div className='col-md-4' ><label style={{color:"#B85042"}}>Job Title</label>
                    <p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.designation}</p>
                </div>
                <div className='col-md-4'><label style={{color:"#B85042"}}>Company/Organisation</label><p style={{marginTop:"-10px",fontWeight:"normal"}}>{lead.company_name}</p></div>
             


                </div>



            </div>
        </div>
        <div className='col-md-5' style={{padding:"10px"}}>
            <div className='row'>

            {/* <div className="col-md-12"><select className='form-control form-control-sm' style={{border:"none",backgroundColor:" #ffe6e6",backgroundImage: "url('https://p7.hiclipart.com/preview/218/63/773/writing-computer-icons-website-content-writer-reading-download-png-writing-icon.jpg')", backgroundSize: "30px 30px",backgroundRepeat: "no-repeat",backgroundPosition: "left center",paddingLeft: "40px", appearance: 'none',paddingRight: "30px"}}>
                <option>Internal Notes</option>
                <option>Email</option>
                <option>SMS</option>
                </select>
                <div style={{
    position: 'absolute',
    right: '65%',
    top: '15%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none'
  }}>
    <span style={{
      fontSize: '16px', 
      color: '#333', 
      fontWeight: 'bold'
    }}>▼</span> {/* You can replace this with an image or icon 
  </div>

                <textarea  className='form-control form-control-sm' style={{ position: "relative",height:"100px",backgroundColor:" #ffe6e6",border:"none"}}/></div> */}
            
            {/* <div className='col-md-7'></div>
            <div className='col-md-3' style={{position: 'absolute', top: '100px',marginLeft:"60%",transition: 'background-color 0.3s ease'}} onMouseOver={(e) => e.target.style.backgroundColor = '#2196F3'} // On hover, change color to blue
                 onMouseOut={(e) => e.target.style.backgroundColor = ' #ffe6e6'}><button className='form-control form-control-sm' style={{backgroundColor:" #ffe6e6",border:"none"}}>Cancel</button></div>
            <div className='col-md-2' style={{position: 'absolute', top: '100px',marginLeft:"80%",transition: 'background-color 0.3s ease'}}    onMouseOver={(e) => e.target.style.backgroundColor = '#2196F3'} // On hover, change color to blue
                 onMouseOut={(e) => e.target.style.backgroundColor = ' #ffe6e6'}><button className='form-control form-control-sm' style={{backgroundColor:" #ffe6e6",border:"none"}}>Add</button></div> */}


<div className="col-md-11">
      <FormControl fullWidth size="small">
        <Select
          labelId="mobile-label"
          id="mobile-select"
          value={selectedOption} // Bind the value to state
          onChange={handleChange} // Update the state when the value changes
          style={{ fontSize: "14px", boxShadow: "none",height: selectedOption === "Email" ? "250px" : selectedOption === "Internal Notes" ? "180px" : "50px",
            display: "flex", // Flexbox to align items
            flexDirection: "column", // Stack items vertically
            justifyContent: "flex-start", // Align items to the top
            paddingLeft: "15px",paddingTop:"5px" }}
            IconComponent={null}
        >
          {/* Action options */}
          <MenuItem value="Email" style={{ fontSize: "14px" }}>
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/free-email-icon-download-in-svg-png-gif-file-formats--envenlope-letter-mail-user-interface-pack-icons-83578.png"
              alt="call-icon"
              style={{ height: "16px", marginRight: "8px" }}
            />
            Email             {selectedOption === "Email" && lead && (
              <span style={{marginLeft:"20%"}}>
                {" |"}
                {lead.title} {lead.first_name} {lead.last_name}
              </span>
              
            )}
          </MenuItem>
          <MenuItem value="SMS" style={{ fontSize: "14px" }}>
            <img
              src="https://thumbs.dreamstime.com/b/sms-sign-icon-black-editable-vector-illustration-isolated-white-background-sms-icon-black-124325394.jpg"
              alt="message-icon"
              style={{ height: "16px", marginRight: "8px" }}
            />
            SMS
          </MenuItem>
          <MenuItem value="Internal Notes" style={{ fontSize: "14px",backgroundColor:"#ffe6e6" }}>
            <img
              src="https://static.vecteezy.com/system/resources/previews/001/505/060/non_2x/notes-icon-free-vector.jpg"
              alt="whatsapp-icon"
              style={{ height: "16px", marginRight: "8px" }}
            />
            Internal Notes
          </MenuItem>
         
        </Select>
        {selectedOption === "Email" && (
          <div style={{marginTop:"-200px",  padding: "10px", border: "1px solid #ccc",height:"200px" }}>
         
         <div className="row mt-2" id="sendmail" style={{fontSize:"12px"}}>
       {/* <div className="col-md-12"><label className="labels">Recipients</label><input type="text" required="true" className="form-control form-control-sm" defaultValue={lead.email} /></div> */}
       <div className="col-md-12" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        <input type="text" style={{border:"none",fontSize:"12px",borderBottom:"1px solid gray"}} required="true" className="form-control form-control-sm" placeholder='subject' value={subject} onChange={(e)=>setsubject(e.target.value)}/>
       <Select
                multiple
                value={selectedOptions}
                onChange={handleSelectChange}
                style={{ fontSize: "12px", width: "20%",border:"none" }}
                displayEmpty
              >
                {/* Dropdown for selecting fields to include in the subject */}
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="mobile">Mobile</MenuItem>
                <MenuItem value="city">City</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="company">Company</MenuItem>
                <MenuItem value="designation">Designation</MenuItem>
              </Select>
       </div>
      

       <div className="col-md-12" style={{marginTop:"5px"}}><textarea  className="form-control form-control-sm" value={message?message:''}  placeholder="Enter Your Message" style={{height:"50px",border:"none",fontSize:"12px"}} onChange={handlemailmessage}/></div>
       <div className="col-md-4" style={{fontSize:"12px"}}><label className="labels" style={{fontSize:"12px"}}>Templates</label>
       <select type="text" required="true" className="form-control form-control-sm" value={selectedTemplate} onChange={handleTemplateSelect} style={{fontSize:"12px"}}>
          <option value="">---Select Template---</option>
          <option value="template1">Template 1</option>
          <option value="template2">Template 2</option>
          <option value="template3">Template 3</option>
        </select>
       </div>

       <div className="col-md-4" {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '10px', cursor: 'pointer',margin:"10px" }}>
        <input {...getInputProps()} />
        <p>Drag & drop files here, or click to select files</p>
        <ul>
          {attachments.length > 0 && attachments.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
      <div className='col-md-2' style={{marginTop:"40px",marginLeft:"50px"}}><button className='form-control form-control-sm' onClick={sendmail}>send</button></div>
   </div>

          </div>
        )}


{selectedOption === "Internal Notes" && (
          <div style={{marginTop:"-130px",  padding: "10px", border: "1px solid #ccc",height:"130px",backgroundColor:"#ffe6e6" }}>
         
         <div className="col-md-12">
          {/* <textarea  className="form-control form-control-sm" value={message?message:''}  placeholder="Enter Your Message" style={{height:"80px",border:"none",fontSize:"12px",}} onChange={handlemailmessage}/> */}
          <ReactQuill
        modules={modules1}  // Add the toolbar options for formatting
        style={{ height: '80px', width: '100%',fontSize:"12px"}}
        className="my-quill-editor"
        value={activity.activity_note1}  // Bind the editor with state
        onChange={handleactivitynoteschange}
      />
          </div>
          <div className='col-md-2' style={{marginTop:"10px",marginLeft:"85%"}}><button style={{backgroundColor:"#ffe6e6",border:"none"}} className='form-control form-control-sm' onClick={addactivity}>Add</button></div>

          </div>
        )}
   
      </FormControl>
    </div>

    

    




            <div className='col-md-12' style={{marginTop:"20px"}}><input type='checkbox'></input><span>show on primary contact</span></div>

         

<div className='col-md-4' style={{display:"flex",marginTop:"20px"}}>
    <p style={{marginLeft: "10px",fontSize:"14px" }}>Displaying</p>
        <div style={{paddingLeft:"10px"}}>
        <span style={{fontWeight:"bold",fontSize:"12px",cursor:"pointer"}}   onClick={() => setShowDropdown(!showDropdown)} >all activity</span>
        {showDropdown && (
  <div
    className="dropdown-container"
    style={{
      position: 'absolute',
      marginTop: '0px',
      left: '10%',
      width: '150px',
      backgroundColor: '#f9f9f9',
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '10px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 10,
      
    }}
  >
    {activityname.map((activity) => (
      <div key={activity} className="dropdown-item" style={{height:"40px",fontSize:"14px"}} >
        <label>
                <input
                  type="checkbox"
                  checked={selectactivity.includes(activity)}
                  onChange={() => handlefilterCheckboxChange(activity)}
                  style={{ marginRight: '8px' }}
                />
                {activity}
              </label>
            </div>
              ))}
            </div>
          )}

        </div>
    {/* <select
      className="form-control form-control-sm"
      style={{
        border: "none",
        backgroundColor: "transparent",
        fontSize: "12px",
      fontWeight:"bold",
      marginTop:"-8px"
      }}
    >
      <option>all activity</option>
      <option>contact activity</option>
      <option>lead activity</option>
    </select> */}
</div>

<div className='col-md-4' style={{display:"flex",marginTop:"20px"}}>
    <p style={{marginBottom: "0" }}>By</p>
    <select
      className="form-control form-control-sm"
      style={{
        border: "none",
        backgroundColor: "transparent",
        fontSize: "12px",
        fontWeight:"bold",
         marginTop:"-8px"
      
      }}
    >
      <option>everyone</option>
      <option>contact activity</option>
      <option>lead activity</option>
    </select>
    </div>


    {/* <p style={{marginBottom: "0", whiteSpace: "nowrap" }}>Related to</p>
    <select
      className="form-control form-control-sm"
      style={{
        border: "none",
        backgroundColor: "transparent",
        fontSize: "12px",
    fontWeight:"bold",
     marginTop:"-8px",
      width:"80px"
      }}
    >
      <option>all</option>
      <option>contact activity</option>
      <option>lead activity</option>
    </select> */}


<div className='col-md-4' style={{display:"flex",marginTop:"20px"}}>
    <p style={{marginBottom: "0" }}>Tagged</p>
    <select
      className="form-control form-control-sm"
      style={{
        border: "none",
        backgroundColor: "transparent",
        fontSize: "12px",
       fontWeight:"bold",
        marginTop:"-8px",
        marginRight:"20px",
       
      }}
    >
      <option>any</option>
      <option>contact activity</option>
      <option>lead activity</option>
    </select>
    </div>

<div className='col-md-12'><hr></hr></div>



                {
                allactivity && allactivity.length>0 ? (
                    <div className='col-md-11' style={{maxHeight:"830px",overflowY:"scroll",borderRadius:"5px",width:"100%",marginLeft:"20px",padding:"10px",marginTop:"10px",fontSize:"12px"}}>
                
                        {allactivity.slice().reverse().map((item, index) => (
                          item.activity_name==="call"?(
                            <div id='callaction' >
                            <div><img src='https://png.pngtree.com/png-clipart/20190619/original/pngtree-call-icon-3d-png-image_3990094.jpg' style={{height:"20px"}}></img>
                            
                            <span style={{marginLeft:"61%"}}>{new Date(item.createdAt).toLocaleString()}</span>
                            <span  style={{marginLeft:"5%"}}><img id='deletebutton' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDgCtB72sd2csn3h4Xoktuuub7vFQQ-dGBOw&s' style={{height:"20px",cursor:"pointer"}} onClick={()=>deleteactivity(item._id)}></img></span>

                            </div>
                            <span>{lead.owner} called <u> {lead.title} {lead.first_name} {lead.last_name}</u></span><br></br>
                            <span style={{fontWeight:"bold"}}>{item.call_outcome}</span> Outcome<br></br>
                            <div dangerouslySetInnerHTML={{ __html: item.activity_note }} />
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) :  item.activity_name==="email"?(
                            <div id='mailaction' onClick={()=>toggleExpand(item._id)}
                                style={{
                                  cursor: "pointer",
                                  overflow: "hidden",
                                  height: isExpanded ? "auto" : "80px", // Height based on expanded state
                                  transition: "height 0.3s ease", // Smooth transition for height change
                                }}>
                            <div><img src='https://illustoon.com/photo/2751.png' style={{height:"20px"}}></img>
                            <span style={{fontSize:"10px"}}>you sent an email to {lead.title} {lead.first_name} {lead.last_name}</span>
                            <img
          src="https://cdn-icons-png.flaticon.com/512/301/301687.png"
          style={{
            height: "15px",
            marginLeft:"10%",
            cursor: "pointer",
            marginRight: "5px",
          }}
          onClick={toggleExpand} // Eye icon also toggles the expand/collapse
        />
        <span> {item.viewcount}</span>
                            <span style={{marginLeft:"15%"}}>{new Date(item.createdAt).toLocaleString()}</span>
                            <span  style={{marginLeft:"5%"}}><img id='deletebutton' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDgCtB72sd2csn3h4Xoktuuub7vFQQ-dGBOw&s' style={{height:"20px",cursor:"pointer"}} onClick={()=>deleteactivity(item._id)}></img></span>

                            </div>
                            <span><u> {lead.email}  </u></span><br></br>
                            <div dangerouslySetInnerHTML={{ __html: item.message }} /><br></br>
                            <span style={{fontWeight:"bold"}}>{lead.owner}</span>
                           <hr></hr>
                            <br></br>
                            {!isExpanded && (
                              <hr style={{ marginTop: "10px", borderTop: "1px solid black" }} />
                            )}
                            </div>
                           
                       
                          ) : item.activity_name==="notes"?(
                            <div id='noteaction' >
                            <div><img src="https://static.vecteezy.com/system/resources/previews/001/505/060/non_2x/notes-icon-free-vector.jpg" style={{height:"20px"}}></img>
                            
                            <span style={{marginLeft:"60%"}}>{new Date(item.createdAt).toLocaleString()}</span>
                            <span  style={{marginLeft:"5%"}}><img id='deletebutton' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDgCtB72sd2csn3h4Xoktuuub7vFQQ-dGBOw&s' style={{height:"20px",cursor:"pointer"}} onClick={()=>deleteactivity(item._id)}></img></span>

                            </div>
                            <span><u>{lead.owner}</u> left a note</span><br></br>
                            <div dangerouslySetInnerHTML={{ __html: item.activity_note1 }} />
                           <hr></hr>
                            <br></br>
                          
                            </div>
                       
                          ) :<p>no activity</p>
                        ))}
                  

                    </div>
                    ):(
                      <p className="no-activity-flash" style={{fontSize:"14px",color:"red",paddingLeft:"20px"}}>no activity till now</p>
                    )
                }
                <div className='col-md-2'></div>

              

             

                <div className='col-md-12' style={{marginTop:"10px"}}>
                    <p style={{fontSize:"14px"}}><u>{lead.title} {lead.first_name} {lead.last_name}</u> added by {lead.owner.join(',')}</p>
                </div>

            </div>

        </div>
        <div className='col-md-3' style={{padding:"10px"}}>

        <div className='row'>

          <div style={{fontWeight:"normal",border:"1px solid gray",borderRadius:"5px",padding:"10px"}}>
        <div className='col-md-12' > Deal Match
        <span 
          onClick={toggleTableVisibility} 
          style={{ 
            position:"absolute",
            cursor: "pointer", 
            right: "50px", 
            fontSize: "20px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            transform: isTableVisible ? 'rotate(180deg)' : 'rotate(0deg)', // Rotate the arrow based on state
            marginTop: "0px", // Align the arrow properly
           
          }}
        >
          ▼
        </span>
        <span 
         
          style={{ 
            position:"absolute",
            cursor: "pointer", 
            right: "20px", 
            fontSize: "30px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            marginTop: "-7px", // Align the arrow properly
            fontWeight:"lighter"
    
          }}
        >
          +
        </span>
        </div>

        <div style={{backgroundColor:"white",marginTop:"10px",position:"sticky",zIndex:10,marginLeft:"20px",height: isTableVisible ? "400px" : "0",overflow: "hidden",transition: "height 0.3s ease",overflowY:"scroll",overflowX:"scroll"}}>
      <TableContainer component={Paper} style={{ maxHeight: '700px', overflow: 'auto' }}>
    <Table sx={{}} aria-label="customized table">
      <TableHead style={{ position: "sticky", top: 0, zIndex: 10,backgroundColor:"white" }}>
        <TableRow >
          {allColumns.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{ fontFamily: "times new roman", cursor: 'pointer' }}
            >
              {col.name}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
       <tbody>
        {
         
        filterdeal.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
              {index + 1}
            </StyledTableCell>
            <StyledTableCell>
              {item.unit_number}<br></br>
              {item.project_category.map((cat)=>
              (
                <>
                {cat}<br></br>
                </>
              ))}
                {item.location}
            </StyledTableCell>
            <StyledTableCell>
  {item.owner_details ? (
    item.owner_details.map((owner, index) => (
      <div key={index}>
        {owner.mobile_no.map((mobile, mobileIndex) => (
          <div key={mobileIndex}>{mobile}</div> 
        ))}
        <div>{owner.title} {owner.first_name} {owner.last_name}</div> 
      </div>
    ))
  ) : (
    'No Details Available' // Fallback if no owner details exist
  )}
</StyledTableCell>

          </StyledTableRow>
        ))}
      </tbody> 
    </Table>
  </TableContainer>

  </div>
  </div>

  <div style={{fontWeight:"normal",border:"1px solid gray",borderRadius:"5px",padding:"10px",marginTop:"20px",width:"100%"}}>
  <div className='col-md-12'> Inventories
        <span 
          onClick={toggleTableVisibility1} 
          style={{ 
            position:"absolute",
            cursor: "pointer", 
            right: "50px", 
            fontSize: "20px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            transform: isTableVisible1 ? 'rotate(180deg)' : 'rotate(0deg)', // Rotate the arrow based on state
            marginTop: "0px", // Align the arrow properly
          }}
        >
          ▼
        </span>
        <span 
         
          style={{ 
            position:"absolute",
            cursor: "pointer", 
            right: "20px", 
            fontSize: "30px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            marginTop: "-7px", // Align the arrow properly
      fontWeight:"lighter"
          }}
        >
          +
        </span>
        </div>

        <div style={{backgroundColor:"white",width:"100%",overflowX:"scroll",overflowY:"scroll",marginTop:"10px",position:"sticky",zIndex:10,marginLeft:"20px",height: isTableVisible1 ? "300px" : "0",transition: "height 0.3s ease"}}>
         
        <TableContainer component={Paper} style={{ maxHeight: '700px', overflow: 'auto' }}>
    <Table sx={{}} aria-label="customized table">
      <TableHead style={{ position: "sticky", top: 0, zIndex: 10,backgroundColor:"white" }}>
        <TableRow >
          {allColumnsunit.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{ fontFamily: "times new roman", cursor: 'pointer' }}
            >
              {col.name}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <tbody>
        {
         
        matchunit.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
           
              {index + 1}
            </StyledTableCell>
            <StyledTableCell>
              {item.unit_no}
            </StyledTableCell>
            <StyledTableCell>
              {item.project_name}
            </StyledTableCell>
            <StyledTableCell>
             
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </tbody>
    </Table>
  </TableContainer>
        </div>
        </div>


        <div style={{fontWeight:"normal",border:"1px solid gray",borderRadius:"5px",padding:"10px",marginTop:"20px",width:"100%"}}>
        <div className='col-md-12'> Tasks
        <span 
          onClick={toggleTableVisibility2} 
          style={{ 
            position:"absolute",
            cursor: "pointer", 
            right: "50px", 
            fontSize: "20px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            transform: isTableVisible2 ? 'rotate(180deg)' : 'rotate(0deg)', // Rotate the arrow based on state
            marginTop: "0px", // Align the arrow properly
          }}
        >
          ▼
        </span>
        <span 
         
          style={{ 
            position:"absolute",
            cursor: "pointer", 
            right: "20px", 
            fontSize: "30px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            marginTop: "-7px", // Align the arrow properly
      fontWeight:"lighter"
          }}
        >
          +
        </span>
        </div>

        <div style={{backgroundColor:"white",width:"100%",marginTop:"10px",position:"sticky",zIndex:10,marginLeft:"20px",height: isTableVisible2 ? "300px" : "0",overflow: "hidden",transition: "height 0.3s ease",overflowY:"scroll",overflowX:"scroll"}}>
         
        <TableContainer component={Paper} style={{ maxHeight: '700px', overflow: 'auto' }}>
    <Table sx={{}} aria-label="customized table">
      <TableHead style={{ position: "sticky", top: 0, zIndex: 10,backgroundColor:"white" }}>
        <TableRow >
          {allColumnstask.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{ fontFamily: "times new roman", cursor: 'pointer' }}
            >
              {col.name}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <tbody>
        {
         
        alltask.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
              {index + 1}
            </StyledTableCell>
            <StyledTableCell>
              {item.activity_type}
            </StyledTableCell>
            <StyledTableCell>
            {item.start_date
              ? formatDate(new Date(item.start_date)) 
              : formatDate(new Date(item.due_date))} 
          </StyledTableCell>

            <StyledTableCell>
              {item.lead}
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </tbody> 
    </Table>
  </TableContainer>
        </div>
        </div>

        <div style={{fontWeight:"normal",border:"1px solid gray",borderRadius:"5px",padding:"10px",marginTop:"20px",width:"100%"}}>

        <div className='col-md-12'> Documents
        <span 
          onClick={toggleTableVisibility3} 
          style={{ 
            position:"absolute",
            cursor: "pointer", 
            right:  "50px", 
            fontSize: "20px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            transform: isTableVisible3 ? 'rotate(180deg)' : 'rotate(0deg)', // Rotate the arrow based on state
            marginTop: "0px", // Align the arrow properly
          }}
        >
          ▼
        </span>
        <span 
         
          style={{ 
            cursor: "pointer", 
            position:"absolute",
            right: "20px", 
            fontSize: "30px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            marginTop: "-7px", // Align the arrow properly
      fontWeight:"lighter"
          }}
        >
          +
        </span>
        </div>

        <div style={{backgroundColor:"white",marginTop:"10px",position:"sticky",zIndex:10,marginLeft:"20px",height: isTableVisible3 ? "200px" : "0",overflow: "hidden",transition: "height 0.3s ease"}}>
         
        <TableContainer component={Paper} style={{ maxHeight: '700px', overflow: 'auto' }}>
    <Table sx={{}} aria-label="customized table">
      <TableHead style={{ position: "sticky", top: 0, zIndex: 10,backgroundColor:"white" }}>
        <TableRow >
          {allColumnsdocuments.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{ fontFamily: "times new roman", cursor: 'pointer' }}
            >
              {col.name}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <tbody>
        {
        
        documents.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
              {index + 1}
            </StyledTableCell>
        <StyledTableCell>
          {item.name}
        </StyledTableCell>
        <StyledTableCell>
          {item.number}
        </StyledTableCell>
        <StyledTableCell>
              {/* Eye button to trigger image preview */}
              <button onClick={() => handlePreviewClick(item.pic)}>
                👁️ {/* You can replace this with an icon */}
              </button>
        </StyledTableCell>
          
          </StyledTableRow>
        ))}
      </tbody>

       {/* Modal or Image Preview */}
       {openPreview && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <img src={imagePreview} alt="Preview" style={styles.imagePreview} />
            <button onClick={handleClosePreview} style={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}


    </Table>
  </TableContainer>
        </div>
        </div>



        </div>

        </div>

      </div>

      <Modal show={show1} onHide={handleClose1} size='lg'>
            <Modal.Header>
              <Modal.Title>
                <h6 style={{fontWeight:"normal", fontSize:"12px"}}>CALL SUMMARY</h6>
              <h3>{lead.title} {lead.first_name} {lead.last_name}</h3>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
          
            <div className="row">

            <div className="col-md-4"><label className="labels">Direction</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setactivity({...activity,direction:e.target.value})}>
                    <option>---Select---</option>
                    <option>Incoming</option>
                    <option>Outgoing</option>
                        </select>
                        </div>

                        <div className="col-md-4"><label className="labels">Status</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setactivity({...activity,status:e.target.value})} >
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

                        <div className="col-md-4"><label className="labels">Date</label><input type="date" id="date1" className="form-control form-control-sm" onChange={(e)=>setactivity({...activity,date:e.target.value})}/></div>
                <div className="col-md-4"><label className="labels">Duration</label><input type="time" className="form-control form-control-sm" onChange={(e)=>setactivity({...activity,duration:e.target.value})}/></div>
                <div className="col-md-4"> </div>

                <div className="col-md-4"><label className="labels" style={{width:"120%"}}>Select Intersted Inventory(If any)</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setactivity({...activity,intrested_inventory:e.target.value})}>
                    <option>---Select---</option>
                    {
                          sitevisitdata1.map((item)=>
                          (
                            <option>{item}</option>
                          ))
                        }
                        </select>
                        </div>

            <div className="col-md-10"><label className="labels">Call Outcome</label>
                        <select className="form-control form-control-sm" required="true" 
                         onChange={(e) => {
                          const selectedValue = e.target.value;
                          setactivity({ ...activity, call_outcome: selectedValue });
                    
                          // Check if the selected option is "Add New Outcome" and call handleShow2
                          if (selectedValue === 'Add New Outcome') {
                            handleShow2();  // Call the function to show the modal or open the new outcome form
                          }
                        }}
                        >
                              <option>---Select---</option>
                            {
                              outcome.map((item)=>
                              (
                                <option>{item}</option>
                              ))
                            }
                            <option onClick={handleShow2}>Add New Outcome</option>
                             
                        </select>
            </div>
            <div className='col-md-2'></div>

         
            <div className="col-md-10">
      <label className="labels" style={{ visibility: "hidden" }}>Note</label>
      <ReactQuill
        modules={modules}  // Add the toolbar options for formatting
        placeholder="Add a note about this call."
        style={{ height: '100px', width: '100%' }}
        value={activity.activity_note}  // Bind the editor with state
        onChange={handleNoteChange}
      />
    </div>
            <div className='col-md-2'></div>
                
            </div>

            </Modal.Body>
            <Modal.Footer style={{marginTop:"20px"}}>
            <Button variant="secondary" onClick={handleClose1} >
               Do Not Log
              </Button>
              <Button variant="secondary" onClick={addactivity}>
                Save
              </Button>
            </Modal.Footer>
      </Modal>
      

      <Modal show={show2} onHide={handleClose2} size='lg'>
            <Modal.Header>
              <Modal.Title>
                <h6 style={{fontWeight:"normal", fontSize:"12px"}}>Call Outcome</h6>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
          
            <div className="row">

            <div className="col-md-10"><label className="labels">Call Outcome</label>
                        <input type='text' className="form-control form-control-sm" required="true" onChange={(e)=>setnewoutcome(e.target.value)}/>
                         
            </div>
        
            </div>

            </Modal.Body>
            <Modal.Footer style={{marginTop:"20px"}}>
            <Button variant="secondary" onClick={addoutcome} >
               Add
              </Button>
            </Modal.Footer>
      </Modal>
      
<ToastContainer/>
    </div>
  )
}

export default Leadsingleview

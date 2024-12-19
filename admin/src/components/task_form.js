import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import '../css/toggle.css';
import { ToastContainer,toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import api from "../api";
import { Inventory } from "@mui/icons-material";
import { Select, MenuItem, Checkbox, ListItemText } from '@mui/material';


function Task_form() {

    useEffect(()=>
    {
        fetchdata()
    },[])

    useEffect(()=>
        {
            fetchdata1()
        },[])
        useEffect(()=>
            {
                fetchcontactdata()
            },[])
            useEffect(()=>
                {
                    fetchdealdata()
                },[])
   
    
        const[contactdata,setcontactdata]=useState([]);
        const fetchcontactdata=async(event)=>
        {
          
          try {
            const resp=await api.get('viewcontact')
            setcontactdata(resp.data.contact)
          } catch (error) {
            console.log(error);
          }
        
        }

        const[dealdata,setdealdata]=useState([])
        const fetchdealdata=async(event)=>
            {
              
              try {
                const resp=await api.get('viewdeal')
                const all=(resp.data.deal)
                setdealdata(all)
              } catch (error) {
                console.log(error);
              }
            
            }

    const activity=["Call","Email","Meeting","Site Visit"]
    const reason=["Meeting","Site Visit","Discuss","For Requirment","etc"]
    const direction=["Incoming","Outgoing"]
    const visittype=["Site Visit","Home Visit","Online"]
    const status=["Answered","Missed","Not Pic","Busy","Cut Call","Number Not Reachable","Switch Off","Incoming","Not Available","Number Invalid"]
    const result=["Interested","Not Interested","Postponed","Low Budget","Location Mismatch"]
    const location=["Home","Office","Company","Site"]
    
    
    const [calltask,setcalltask]=useState({activity_type:"Call",title:"",reason:"",lead:"",executive:"",remarks:"",complete:"",due_date:"",title2:"",first_name:"",last_name:"",mobile_no:"",email:"",stage:""})

    
    const [mailtask,setmailtask]=useState({activity_type:"Mail",title:"",executive:"",lead:"",project:[],inventory:[],subject:"",remarks:"",
        complete:"",due_date:"",title2:"",first_name:"",last_name:"",mobile_no:"",email:"",stage:""})
   

    const [meetingtask,setmeetingtask]=useState({activity_type:"Meeting",title:"",executive:"",lead:"",location_type:"",location_address:"",
            reason:"",project:[],inventory:[],remark:"",complete:"",stage:"",due_date:"",title2:"",first_name:"",last_name:"",mobile_no:"",email:"",stage:""})
   
    const [sitevisit,setsitevisit]=useState({activity_type:"SiteVisit",title:"",executive:"",project:[],block:[],sitevisit_type:"",
                inventory:[],lead:"",confirmation:"",remark:"",participants:"",remind_me:"",start_date:"",end_date:"",complete:"",stage:"",title2:"",first_name:"",
                last_name:"",mobile_no:"",email:"",stage:"",status:"",intrested_project:[],intrested_block:[],intrested_inventory:[],date:"",feedback:""})
    
       

// ================================all post methods start=============================================================================

       
            const calltaskdetails=async()=>
            {
            const title1 = document.getElementById("title").innerText;
            // Update state
            const updatedCallTask = { ...calltask, title: title1 };
            
            try {
            const resp=await api.post('calltask',updatedCallTask)
            if(resp.status===200)
            {
            toast.success(resp.data.message)
            setTimeout(() => {
            window.location.reload();
            }, 2000); // 2000 milliseconds = 2 seconds

            }
        } catch (error) {

            toast.error(error.message)
        }
    }

   


        const mailtaskdetails=async()=>
            {
             
                const title1 = document.getElementById("mailtitle").innerText;
        
                // Update state
                const updatedMailTask = { ...mailtask, title: title1 };
                try {
                    const resp=await api.post('mailtask',updatedMailTask)
                    if(resp.status===200)
                    {
                        toast.success(resp.data.message)
                        setTimeout(() => {
                            window.location.reload();
                          }, 2000); // 2000 milliseconds = 2 seconds
                        
                    }
                } catch (error) {
                    
                    toast.error(error.message)
                }
            }

            const meetingtaskdetails=async()=>
                {
                 
                    const title1 = document.getElementById("meetingtitle").innerText;
            
                    // Update state
                    const updatedMailTask = { ...meetingtask, title: title1 };
                    try {
                        const resp=await api.post('meetingtask',updatedMailTask)
                        if(resp.status===200)
                        {
                            toast.success(resp.data.message)
                            setTimeout(() => {
                                window.location.reload();
                              }, 2000); // 2000 milliseconds = 2 seconds
                            
                        }
                    } catch (error) {
                        
                        toast.error(error.message)
                    }
                }
        
              
        
        
            const sitevisitdetails=async()=>
                {
                 
                    const title1 = document.getElementById("sitevisittitle").innerText;
            
                    // Update state
                    const updatedsiteTask = { ...sitevisit, title: title1 };
                    try {
                        const resp=await api.post('sitevisit',updatedsiteTask)
        
                        const data = { stage: updatestage};
                        const data1 = { newstage: updatestage1};
                        
                        const resp1 = await api.put(`updatelead/${leadid}`, data);
        
                        for (let i = 0; i < sitevisit.intrested_project.length; i++) {
                            const project = sitevisit.intrested_project[i];
                            
                            const block = sitevisit.intrested_block && sitevisit.intrested_block[i] ? 
                            sitevisit.intrested_block[i] : 
                            [];

                            const unit_number = sitevisit.intrested_inventory && sitevisit.intrested_inventory[i] ? 
                            sitevisit.intrested_inventory[i] : 
                            [];
                      
                            console.log(`Calling API: updatedealstage/${project}/${block}/${unit_number}`);
                            // Send the API request for each project and inventory
                            const resp2 = await api.put(`updatedealstage/${project}/${block}/${unit_number}`, data1);
                        }
                        if(resp.status===200)
                        {
                            toast.success(resp.data.message)
                            setTimeout(() => {
                                window.location.reload();
                              }, 2000); // 2000 milliseconds = 2 seconds
                            
                        }
                    } catch (error) {
                        
                        toast.error(error.message)
                    }
                }

//========================================all post methods end =======================================================================       


    // ========================---------------------fetching lead data----------------------------------------------===================
    const[data,setdata]=useState([]);
  const fetchdata=async()=>
  {
    
    try {
      const resp=await api.get('leadinfo')
      setdata(resp.data.lead)
    } catch (error) {
      console.log(error);
    }
  
  }

//  ==================================== fetching lead data end=======================================================================


  const [units1,setunits1]=useState([])
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
  useEffect(() => {
    if (data1.length >= 0) {
      const collectedUnits = data1.flatMap(item => item.add_unit); // Collect all add_unit arrays
      setunits1(collectedUnits); // Set allUnits with the collected units
    }
  }, [data1]);




//   const [units2,setunits2]=useState([])
// const [allUnits2,setallUnits2]=useState([])
// const fetchdatabyprojectname2 = async (e) => {
//     const projectName = e.target.value; // Get the project name directly from the event
  
//     try {
//       setmailtask(prev => ({ ...prev, project: projectName })); // Update the state
//       const resp = await api.get(`viewprojectbyname/${projectName}`);
//      setunits2(resp.data.project)
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     if (units2.length >= 0) {
//       const collectedUnits = units2.flatMap(item => item.add_unit); // Collect all add_unit arrays
//       setallUnits2(collectedUnits); // Set allUnits with the collected units
//     }
//   }, [units2]);


//   const [units3,setunits3]=useState([])
//   const [allUnits3,setallUnits3]=useState([])
//   const fetchdatabyprojectname3 = async (e) => {
//       const projectName = e.target.value; // Get the project name directly from the event
    
//       try {
//         setmeetingtask(prev => ({ ...prev, project: projectName })); // Update the state
//         const resp = await api.get(`viewprojectbyname/${projectName}`);
//        setunits3(resp.data.project)
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     useEffect(() => {
//       if (units3.length >= 0) {
//         const collectedUnits = units3.flatMap(item => item.add_unit); // Collect all add_unit arrays
//         setallUnits3(collectedUnits); // Set allUnits with the collected units
//       }
//     }, [units3]);


//   const [allUnits,setallUnits]=useState([])
//   useEffect(()=>
// {
//     if (data1.length > 0) {
//         setallUnits (data1.flatMap(item => item.add_unit)); // Collect all add_unit arrays
//        // This will log all add_units combined into a single array
//      }
// },[data1])
//    console.log(allUnits);




    
    
    

//     const [projects, setprojects] = useState([]);


//   const handleprojectchange = (event) => {
//     const {
//         target: { value },
//     } = event;

//     const selectproject = typeof value === 'string' ? value.split(',') : value;

//     setprojects(selectproject);
//     setsitevisit({ ...sitevisit, project: selectproject });
//     fetchdatabyprojectname()
// };

// const [units,setunits]=useState([])
// const [allUnits,setallUnits]=useState([])
// const fetchdatabyprojectname = async (e) => {
//      const projectName = sitevisit.project; // Get the project name directly from the event
//      console.log(sitevisit.project);
    
  
//     try {
        
//       setsitevisit(prev => ({ ...prev, project: projectName })); // Update the state
//       const resp = await api.get(`viewprojectbyname/${projectName}`);
//      setunits(resp.data.project)
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     if (units.length >= 0) {
//       const collectedUnits = units.flatMap(item => item.add_unit); // Collect all add_unit arrays
//       setallUnits(collectedUnits); // Set allUnits with the collected units
//     }
//   }, [units]);


// ===============================this project data is for sitevisit task============================================================
  




const allproject =[]
dealdata.map((item) => {
    if (!allproject.includes(item.project)) {
      allproject.push(item.project);
    }
  });

  const alldealblock =[]
dealdata.map((item) => {
    if (!alldealblock.includes(item.block)) {
        alldealblock.push(item.block);
    }
  });

  const alldealunit =[]
dealdata.map((item) => {
    if (!alldealunit.includes(item.unit_number)) {
        alldealunit.push(item.unit_number);
    }
  });


const [units, setunits] = useState([]);
const [allUnits, setallUnits] = useState([]);
const [allBlocks, setallBlocks] = useState([]);
const [projects, setprojects] = useState([]);

const handleprojectchange = (event) => {
    const {
      target: { value },
    } = event;
  
    const selectproject = typeof value === 'string' ? value.split(',') : value;
  
    setprojects(selectproject);
    setsitevisit((prev) => {
      const updatedSiteVisit = { ...prev, project: selectproject };
      fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
      return updatedSiteVisit; // Return the updated state
    });
  };


const fetchdatabyprojectname = async (projectNames) => {

  try {
    const fetchPromises = projectNames.map(async (projectName) => {
      const resp = await api.get(`viewdealbyproject/${projectName}`);
      return resp.data.deal; // Assuming resp.data.project is an array of units for that project
    });

    const results = await Promise.all(fetchPromises);
    const allFetchedUnits = results.flat();
    setunits(allFetchedUnits); // Set the units to the flattened result
  } catch (error) {
    console.log(error);
  }
};
console.log(units);

useEffect(() => {
    if (units.length > 0) {
      // Collect only the unit_number and block from the units array
      const collectedUnits = units.map(item => item.unit_number);
      const collecteblocks = units.map(item => item.block);
  
      // Create a Map to filter out duplicates based on unit_number and get unique unit_numbers
      const uniqueUnits = [
        ...new Map(collectedUnits.map(unit_number => [unit_number, unit_number])).values()
      ];
  
      // Create a Map to filter out duplicates based on block and get unique blocks
      const uniqueblocks = [
        ...new Map(collecteblocks.map(block => [block, block])).values()
      ];
  
      // Set the state with the unique unit_numbers and blocks
      setallUnits(uniqueUnits);
      setallBlocks(uniqueblocks); // Set allBlocks with the unique blocks
    }
  }, [units]);
  
  
  
  



  const[allblocks,setallblocks]=useState([])
const handleblockchange = (event) => {
    const {
      target: { value },
    } = event;
  
    const selectblock = typeof value === 'string' ? value.split(',') : value;
  
    setallblocks(selectblock);
    setsitevisit((prev) => {
      const updatedSiteVisit = { ...prev, block: selectblock };
    //   fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
      return updatedSiteVisit; // Return the updated state
    });
  };


const[allunit,setallunit]=useState([])
const handleallunitschange = (event) => {
    const {
      target: { value },
    } = event;
  
    const selectunits = typeof value === 'string' ? value.split(',') : value;
  
     setallunit(selectunits);
    setsitevisit((prev) => {
      const updatedSiteVisit = { ...prev, inventory: selectunits };
    //   fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
      return updatedSiteVisit; // Return the updated state
    });
  };





  const [siteunits, setsiteunits] = useState([]);
const [siteallUnits, setsiteallUnits] = useState([]);
const [siteallblock, setsiteallblock] = useState([]);
const [siteprojects, setsiteprojects] = useState([]);

const handlesiteprojectchange = (event) => {
    const {
      target: { value },
    } = event;
  
    const selectproject = typeof value === 'string' ? value.split(',') : value;
  
    setsiteprojects(selectproject);
    setsitevisit((prev) => {
      const updatedSiteVisit = { ...prev, intrested_project: selectproject };
      fetchdatabysiteprojectname(selectproject); // Fetch data with the updated project names
      return updatedSiteVisit; // Return the updated state
    });
  };


const fetchdatabysiteprojectname = async (projectNames) => {

  try {
    const fetchPromises = projectNames.map(async (projectName) => {
      const resp = await api.get(`viewdealbyproject/${projectName}`);
      return resp.data.deal; // Assuming resp.data.project is an array of units for that project
    });

    const results = await Promise.all(fetchPromises);
    const allFetchedUnits = results.flat();
    setsiteunits(allFetchedUnits); // Set the units to the flattened result
  } catch (error) {
    console.log(error);
  }
};

console.log(siteunits);

useEffect(() => {
    if (siteunits.length > 0) {
      // Collect all add_unit arrays and ensure uniqueness by using unit_no or unit_id
      const collectedblocks = siteunits.flatMap(item => item.block);
      const collectedUnits = siteunits.flatMap(item => item.unit_number);
  
      // Create a Map to filter out duplicates based on unit_no (or any other unique property like unit_id)
      const uniqueUnits = [
        ...new Map(collectedUnits.map(unit => [unit, unit])).values()
      ];
      const uniqueblock = [
        ...new Map(collectedblocks.map(block => [block, block])).values()
      ];
      setsiteallUnits(uniqueUnits);// Set allUnits with the unique units
      setsiteallblock(uniqueblock)
    }
  }, [siteunits]);

console.log(siteallUnits);
console.log(sitevisit.block);


const[allblock,setallblock]=useState([])
const handleallblockchange = (event) => {
    const {
      target: { value },
    } = event;
  
    const selectblock = typeof value === 'string' ? value.split(',') : value;
  
    setallblock(selectblock);
    setsitevisit((prev) => {
      const updatedSiteVisit = { ...prev, intrested_block: selectblock };
    //   fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
      return updatedSiteVisit; // Return the updated state
    });
  };

  const[allunit1,setallunit1]=useState([])
const handleallunitschange1 = (event) => {
    const {
      target: { value },
    } = event;
  
    const selectunits = typeof value === 'string' ? value.split(',') : value;
  
    setallunit1(selectunits);
    setsitevisit((prev) => {
      const updatedSiteVisit = { ...prev, intrested_inventory: selectunits };
    //   fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
      return updatedSiteVisit; // Return the updated state
    });
  };



//== ================================this project data is for meeting task=============================================================

  const [units2, setunits2] = useState([]);
const [allUnits2, setallUnits2] = useState([]);
const [projects2, setprojects2] = useState([]);

const handleprojectchange2 = (event) => {
    const {
      target: { value },
    } = event;
  
    const selectproject = typeof value === 'string' ? value.split(',') : value;
  
    setprojects2(selectproject);
    setmeetingtask((prev) => {
      const updatedSiteVisit = { ...prev, project: selectproject };
      fetchdatabyprojectname2(selectproject); // Fetch data with the updated project names
      return updatedSiteVisit; // Return the updated state
    });
  };

const fetchdatabyprojectname2 = async (projectNames) => {

  try {
    const fetchPromises = projectNames.map(async (projectName) => {
      const resp = await api.get(`viewprojectbyname/${projectName}`);
      return resp.data.project; // Assuming resp.data.project is an array of units for that project
    });

    const results = await Promise.all(fetchPromises);
    const allFetchedUnits = results.flat();
    setunits2(allFetchedUnits); // Set the units to the flattened result
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  if (units2.length > 0) {
    const collectedUnits = units2.flatMap(item => item.add_unit); // Collect all add_unit arrays
    setallUnits2(collectedUnits); // Set allUnits with the collected units
  }
}, [units2]);



const[allunit2,setallunit2]=useState([])
const handleallunitschange2 = (event) => {
    const {
      target: { value },
    } = event;
  
    const selectunits = typeof value === 'string' ? value.split(',') : value;
  
     setallunit2(selectunits);
    setmeetingtask((prev) => {
      const updatedSiteVisit = { ...prev, inventory: selectunits };
    //   fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
      return updatedSiteVisit; // Return the updated state
    });
  };

  const [units3, setunits3] = useState([]);
  const [allUnits3, setallUnits3] = useState([]);
  const [projects3, setprojects3] = useState([]);
  
  const fetchdatabyprojectname3 = async (projectNames) => {
  
    try {
      const fetchPromises = projectNames.map(async (projectName) => {
        const resp = await api.get(`viewprojectbyname/${projectName}`);
        return resp.data.project; // Assuming resp.data.project is an array of units for that project
      });
  
      const results = await Promise.all(fetchPromises);
      const allFetchedUnits = results.flat();
      setunits3(allFetchedUnits); // Set the units to the flattened result
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (units3.length > 0) {
      const collectedUnits = units3.flatMap(item => item.add_unit); // Collect all add_unit arrays
      setallUnits3(collectedUnits); // Set allUnits with the collected units
    }
  }, [units3]);
  
  const handleprojectchange3 = (event) => {
    const {
      target: { value },
    } = event;
  
    const selectproject = typeof value === 'string' ? value.split(',') : value;
  
    setprojects3(selectproject);
    setmailtask((prev) => {
      const updatedSiteVisit = { ...prev, project: selectproject };
      fetchdatabyprojectname3(selectproject); // Fetch data with the updated project names
      return updatedSiteVisit; // Return the updated state
    });
  };
  
  const[allunit3,setallunit3]=useState([])
  const handleallunitschange3 = (event) => {
      const {
        target: { value },
      } = event;
    
      const selectunits = typeof value === 'string' ? value.split(',') : value;
    
       setallunit3(selectunits);
      setmailtask((prev) => {
        const updatedSiteVisit = { ...prev, inventory: selectunits };
      //   fetchdatabyprojectname(selectproject); // Fetch data with the updated project names
        return updatedSiteVisit; // Return the updated state
      });
    };






  
  


   
    const [show1, setshow1] = useState(false);
    
    const handleClose1 = () => setshow1(false);
    const handleShow1=()=>
    {
      setshow1(true);
     
    }
    const handleToggle = (e) => {
        const isChecked = e.target.checked; // Get the checked state
        setcalltask({ ...calltask, complete: isChecked }); // Update the calltask state
    
        // Open the modal only if the checkbox is checked
        if (isChecked) {
           document.getElementById("calldetails").style.display="flex"
        }
        else{
            document.getElementById("calldetails").style.display="none"
        }
    };
    const handleToggle1 = (e) => {
        const isChecked = e.target.checked; // Get the checked state
        setmailtask({ ...mailtask, complete: isChecked }); // Update the calltask state
    
        // Open the modal only if the checkbox is checked
        if (isChecked) {
           document.getElementById("maildetails").style.display="block"
        }
        else{
            document.getElementById("maildetails").style.display="none"
        }
    };
    const handleToggle2 = (e) => {
        const isChecked = e.target.checked; // Get the checked state
        setmeetingtask({ ...meetingtask, complete: isChecked }); // Update the calltask state
    
        // Open the modal only if the checkbox is checked
        if (isChecked) {
           document.getElementById("meetingdetails").style.display="block"
        }
        else{
            document.getElementById("meetingdetails").style.display="none"
        }
    };

    const handleToggle3 = (e) => {
        const isChecked = e.target.checked; // Get the checked state
        setsitevisit({ ...sitevisit, complete: isChecked }); // Update the calltask state
    
        // Open the modal only if the checkbox is checked
        if (isChecked) {
           document.getElementById("sitevisitdetails").style.display="block"
        }
        else{
            document.getElementById("sitevisitdetails").style.display="none"
        }
    };
    const handler1=()=>
        {
            document.getElementById("date1").style.color="black"
        }

    const handleformchange=()=>
    {
        const tasks=document.getElementById("forms").value;
        if(tasks==="Call")
        {
            document.getElementById("call").style.display="flex"
            document.getElementById("email").style.display="none"
            document.getElementById("sitevisit").style.display="none"
            document.getElementById("meeting").style.display="none"
        }
        if(tasks==="Email")
            {
                document.getElementById("call").style.display="none"
                document.getElementById("email").style.display="flex"
                document.getElementById("sitevisit").style.display="none"
                 document.getElementById("meeting").style.display="none"
            }
            if(tasks==="Site Visit")
                {
                    document.getElementById("call").style.display="none"
                    document.getElementById("email").style.display="none"
                    document.getElementById("sitevisit").style.display="flex"
                     document.getElementById("meeting").style.display="none"
                }
                if(tasks==="Meeting")
                    {
                        document.getElementById("call").style.display="none"
                        document.getElementById("email").style.display="none"
                        document.getElementById("sitevisit").style.display="none"
                         document.getElementById("meeting").style.display="flex"
                    }
    }
   
const[leadid,setleadid]=useState("")
    const handleLeadChange = (e) => {
        const selectedLead = data.find(item => item._id === e.target.value);
        setleadid(selectedLead._id)
        if (selectedLead) {
            const fullName = `${selectedLead.title} ${selectedLead.first_name} ${selectedLead.last_name}`;
            setsitevisit(prevState => ({
                ...prevState,
                lead: fullName,
                title2: selectedLead.title,
                first_name: selectedLead.first_name,
                last_name: selectedLead.last_name,
                mobile_no: selectedLead.mobile_no,
                email: selectedLead.email,
                stage: selectedLead.stage
            }));
        }

    }

    const[updatestage,setupdatestage]=useState("")
    const[updatestage1,setupdatestage1]=useState("")
    const handleleadstatuschange =  (e) => {
        const newStatus = e.target.value;
    
        // Update the status first
        setsitevisit((prevState) => {
            return {
                ...prevState,
                status: newStatus
            };
        });
    
        // Now check if status is "Conducted" and update the stage
        if (newStatus === "Conducted") {
            setupdatestage("Opportunity");
            setupdatestage1("Quote");
        }
        else if (newStatus === "Did Not Visit" || "Not Intersted>") {
            setupdatestage("Prospect");
            setupdatestage1("Open");
        }
    };
  
   
    


 


    

    return ( 
        <div>
            <Header1/>
            <Sidebar1/>
            <div style={{padding:"50px"}}>
                <div className="container rounded bg-white mt-5 mb-12" style={{width:"70%",marginLeft:"200px"}}>
            
        <div className="col-12">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Create Task</h4>
                </div>

               
                
                <hr></hr>
                <div className="row mt-2">
                    
                    <div className="col-md-4"><label className="labels">Select Activity Type</label><select className="form-control form-control-sm" id="forms" required="true" onChange={handleformchange}>
                    <option>Select</option>
                        {
                            activity.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                        <div className="col-md-8"></div>
                        </div>
{/*============================================ call task form=============================================================================== */}

                        <div className="row" id="call" style={{display:"none"}}>
                        
                        <div className="col-md-12"><label className="labels">Title</label><p id="title">Call {calltask.lead} For Meeting at {calltask.due_date}</p></div>
                        <div className="col-md-4"><label className="labels">Reason</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask({...calltask,reason:e.target.value})}>
                    <option>Select</option>
                        {
                            reason.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                    <div className="col-md-4"></div>
              
               
                <div className="col-md-4"><label className="labels">Select Lead</label>
                <select
                className="form-control form-control-sm"
                required
                onChange={(e) => {
                const selectedLead = data.find(item => item._id === e.target.value);
                if (selectedLead) {
                    const fullName = `${selectedLead.title} ${selectedLead.first_name} ${selectedLead.last_name}`;
                    setcalltask(prevState => ({
                    ...prevState,
                    lead: fullName,
                    title2: selectedLead.title,
                    first_name: selectedLead.first_name,
                    last_name: selectedLead.last_name,
                    mobile_no:selectedLead.mobile_no,
                    email:selectedLead.email,
                    stage:selectedLead.stage
                    }));
                }
                }}
  >
                    <option>Select</option>
                        {
                            data.map((item)=>
                            (
                                <option value={item._id}> {item.title} {item.first_name} {item.last_name}</option>
                                
                            ))
                            
                        }
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask({...calltask,executive:e.target.value})}>
                    <option>Select</option>
                        <option>Rajesh</option>
                        <option>Suresh</option>
                        <option>Vivek</option>
                        </select>
                        </div>
                    <div className="col-md-4"></div>

                    <div className="col-md-10"><label className="labels">Remark</label><textarea className='form-control form-control-sm' onChange={(e)=>setcalltask({...calltask,remarks:e.target.value})}/></div>

                  
                    <div className="col-md-2"></div>

                    <div className="col-md-4"><label className="labels">Select Due Date</label><input type="datetime-local" className="form-control form-control-sm"  onChange={(e)=>setcalltask({...calltask,due_date:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">Completed?</label> 
                    <label class="switch">
                    <input type="checkbox" onChange={handleToggle}/>
                        <span class="slider round"></span>
                        </label>
                    </div>
                  <div className="col-md-2"></div>

                  <div style={{width:"100%"}}>
            <div className="row" id='calldetails' style={{display:"none"}}>
           
        <div className="col-12">
            
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Complete Call Task</h4>
                </div><hr></hr>
                
                <div className="row mt-2">
                    
                    <div className="col-md-4"><label className="labels">Direction</label><select className="form-control form-control-sm" required="true" >
                    <option>Select</option>
                        {
                            direction.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Status</label><select className="form-control form-control-sm" required="true" >
                    <option>Select</option>
                        {
                            status.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                    <div className="col-md-4"></div>
                
               
                <div className="col-md-4"><label className="labels">Date</label><input type="datetime-local" id="date1" className="form-control form-control-sm" style={{color:"transparent"}} onClick={handler1}/></div>
                <div className="col-md-4"><label className="labels">Duration</label><input type="time" className="form-control form-control-sm" /></div>
                <div className="col-md-4"> </div>

                    <div className="col-md-4"><label className="labels">Result</label><select className="form-control form-control-sm" required="true" >
                    <option>Select</option>
                       {
                        result.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                       }
                       </select>
                        </div>
                        <div className="col-md-4"><label className="labels" style={{width:"120%"}}>Select Intersted Inventory(If any)</label><select className="form-control form-control-sm" required="true" >
                    <option>Select</option>
                        <option>Mr.</option>
                        </select>
                        </div>
                    <div className="col-md-4"></div>

                    <div className="col-md-8"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm'  style={{height:"100px"}}/></div>
                    <div className="col-md-12"><br></br></div>
                    <div className="col-md-12"><input type="checkbox" style={{height:"15px",width:"15px"}}/><label className="labels" style={{marginLeft:"10px"}}>Sheduled Follow Up</label></div> 
                     
                    {/* <div className="row mt-4"  style={{marginLeft:"70%"}}>
                    <div className="col-md-6"><button className="form-control form-control-sm" >Submit</button></div>
                    <div className="col-md-6"><button className="form-control form-control-sm">Cancel</button></div>
                    </div> */}
                    </div>
                    
        </div>
        </div>
                    
                    <div className="row">
                    <div className="col-md-2" style={{marginLeft:"60%",marginTop:"20px"}}><button className="form-control form-control-sm" onClick={calltaskdetails}>Submit</button></div>
                    <div className="col-md-2" style={{marginTop:"20px"}}><button className="form-control form-control-sm">Cancel</button></div>
                    </div>
                    </div>
                    </div>
{/* ==========================================call task form end========================================================================= */}


{/*=========================================== mail task form=========================================================================== */}

                    <div className="row" id="email" style={{display:"none"}}>

                    <div className="col-md-12"><label className="labels">Title</label><p id="mailtitle">Mail {mailtask.lead} For Meeting at {mailtask.due_date} for {mailtask.subject} of {mailtask.inventory}</p></div> 

                    <div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,executive:e.target.value})}>
                    <option>Select </option>
                    <option>Rajesh</option>
                        <option>Suresh</option>
                        <option>Vivek</option>
                        </select>
                        </div>
                    <div className="col-md-8"></div>
                
                
                <div className="col-md-4"><label className="labels">Select Lead</label>     <select
    className="form-control form-control-sm"
    required
    onChange={(e) => {
      const selectedLead = data.find(item => item._id === e.target.value);
      if (selectedLead) {
        const fullName = `${selectedLead.title} ${selectedLead.first_name} ${selectedLead.last_name}`;
        setmailtask(prevState => ({
          ...prevState,
          lead: fullName,
          title2: selectedLead.title,
          first_name: selectedLead.first_name,
          last_name: selectedLead.last_name,
          mobile_no:selectedLead.mobile_no,
          email:selectedLead.email,
          stage:selectedLead.stage
        }));
      }
    }}
  >
                    <option>Select</option>
                        {
                            data.map((item)=>
                            (
                                <option value={item._id}> {item.title} {item.first_name} {item.last_name}</option>
                                
                            ))
                            
                        }
                        </select>
                        </div>
                        <div className="col-md-8"></div>

                        <div className="col-md-4"><label className="labels">Select Project</label>
                        <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={projects3}
                    onChange={handleprojectchange3}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {allproject.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={projects3.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
                        </div>

                        <div className="col-md-4"><label className="labels">Select Inventory</label>
                        <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={allunit3}
                    onChange={handleallunitschange3}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {allUnits3.map((unit) => (
                        <MenuItem key={unit._id} value={unit.unit_no}> {/* Ensure unit_no is the value you want */}
                            <Checkbox checked={allunit3.indexOf(unit.unit_no) > -1} />
                            <ListItemText primary={unit.unit_no} /> {/* Render unit_no or other relevant property */}
                        </MenuItem>
                    ))}
                </Select>
                        </div>
                    <div className="col-md-4"></div>

                    <div className="col-md-4"><label className="labels">Subject</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,subject:e.target.value})}>
                    <option>Select</option>
                        <option>Payment Reminder</option>
                        <option>Agreement Reminder</option>
                        <option>Feedback</option>
                        <option>Matched inventory update</option>
                        <option>Document Required for Submision</option>
                        </select>
                        </div>

                    <div className="col-md-10"><label className="labels">Remark</label><textarea className='form-control form-control-sm' onChange={(e)=>setmailtask({...mailtask,remarks:e.target.value})}/></div>
                        <div className="col-md-2"></div>
                 
                    <div className="col-md-4"><label className="labels">Select Due Date</label><input type="datetime-local" className="form-control form-control-sm" onChange={(e)=>setmailtask({...mailtask,due_date:e.target.value})}/></div>
                    
                  
                    <div className="col-md-6"><label className="labels">Completed?</label> 
                    <label class="switch" onChange={handleToggle1}>
                    <input type="checkbox" />
                        <span class="slider round"></span>
                        </label>
                    </div>
                 
                    <div className="p-3 py-5" id="maildetails" style={{display:"none"}}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Complete Mail Task</h4>
                </div><hr></hr>
                
                <div className="row mt-2">
                    
                    <div className="col-md-4"><label className="labels">Direction</label><select className="form-control form-control-sm" required="true" >
                    <option>Select</option>
                        {
                            direction.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Status</label><select className="form-control form-control-sm" required="true" >
                    <option>Select</option>
                       <option>Read</option>
                       <option>Delivered</option>
                       <option>Bounced</option>
                       <option>Undelivered</option>
                        </select>
                        </div>
                    <div className="col-md-4"></div>
                </div>
                <div className="row mt-3">
                <div className="col-md-4"><label className="labels">Date</label><input type="date" className="form-control form-control-sm" /></div>
                <div className="col-md-8"> </div>

                    <div className="col-md-4"></div>

                    <div className="col-md-10"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm'  style={{height:"100px"}}/></div>
                    <div className="col-md-12"><br></br></div>
                    <div className="col-md-12"><input type="checkbox" style={{height:"15px",width:"15px"}}/><label className="labels" style={{marginLeft:"10px"}}>Sheduled Follow Up</label></div> 
                     </div>
                   
                    </div>
                  
                   <div className="col-md-2" style={{marginLeft:"60%",marginTop:"20px"}}><button className="form-control form-control-sm" onClick={mailtaskdetails}>Submit</button></div>
                   <div className="col-md-2" style={{marginTop:"20px"}}><button className="form-control form-control-sm">Cancel</button></div>
                    </div>

{/* ==========================================================mail task end================================================================= */}



{/* ==============================================site visit task=============================================================================== */}
                  
                  
                    <div className="row" id="sitevisit" style={{display:"none"}}>

                    <div className="col-md-12"><label className="labels">Title</label><p id="sitevisittitle">Site Visit with {sitevisit.lead} For {sitevisit.project.join(',')}, {sitevisit.inventory.join(',')} on {sitevisit.start_date}</p></div>

                        <div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,executive:e.target.value})} >
                    <option>Select </option>
                    <option>Rajesh</option>
                        <option>Suresh</option>
                        <option>Vivek</option>
                        </select>
                        </div>

                        <div className="col-md-4"><label className="labels">Select Site Visit Type</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,sitevisit_type:e.target.value})}>
                    <option>Select </option>
                       {
                        visittype.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                       }
                        </select>
                        </div>
                        <div className="col-md-4"></div>

                        <div className="col-md-4"><label className="labels">Select Project</label> 
                        <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={projects}
                    onChange={handleprojectchange}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {allproject.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={projects.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
                        </div>
                       


                        <div className="col-md-4"><label className="labels">Select Block</label>
                        <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={allblocks}
                    onChange={handleblockchange}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {allBlocks.map((block) => (
                    <MenuItem key={block} value={block}> {/* Ensure unit_no is the value you want */}
                        <Checkbox checked={allblocks.indexOf(block) > -1} />
                        <ListItemText primary={block} /> {/* Render unit_no or other relevant property */}
                    </MenuItem>
                 ))}
                </Select>
                        </div>
                        <div className="col-md-4"><label className="labels">Select Inventory</label>
                        <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={allunit}
                    onChange={handleallunitschange}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {allUnits.map((unit) => (
                    <MenuItem key={unit} value={unit}> {/* Ensure unit_no is the value you want */}
                        <Checkbox checked={allunit.indexOf(unit) > -1} />
                        <ListItemText primary={unit} /> {/* Render unit_no or other relevant property */}
                    </MenuItem>
                 ))}
                </Select>
                        </div>
                    
                    
                      
                      

                         
                        <div className="col-md-4"><label className="labels">Select Lead</label>
                        <select
                        className="form-control form-control-sm"
                        required
                        onChange={handleLeadChange}>
                    <option>Select</option>
                        {
                            data.map((item)=>
                            (
                                <option value={item._id}> {item.title} {item.first_name} {item.last_name}</option>
                                
                            ))
                            
                        }
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Confirmation</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,confirmation:e.target.value})}>
                    <option>Select </option>
                       <option>Confirmed</option>
                       <option>Tentative</option>
                        </select>
                        </div>
                        <div className="col-md-4"></div>

                        <div className="col-md-10"><label className="labels">Remark</label><textarea className='form-control form-control-sm' style={{height:"100px"}} onChange={(e)=>setsitevisit({...sitevisit,remark:e.target.value})} /></div>
                
               
                        <div className="col-md-4"><label className="labels">Select Participants</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,participants:e.target.value})}>
                    <option>Select</option>
                       {
                        contactdata.map((item)=>
                        (
                            <option>{item.title} {item.first_name} {item.last_name} ({item.company_name})</option>
                        )) 
                       }
                        </select>
                        </div>
                        <div className="col-md-6"></div>

                        <div className="col-md-6"><label className="labels">Remind Me?</label> 
                    <label class="switch">
                    <input type="checkbox" onChange={(e)=>setsitevisit({...sitevisit,remind_me:e.target.checked})}/>
                        <span class="slider round"></span>
                        </label>
                    </div>

                    {
                        sitevisit.remind_me && (
                            <>
                            <div className="col-md-4"></div>
                            <div className="col-md-4"><label className="labels">Select Start Date</label><input type="datetime-local" className="form-control form-control-sm" onChange={(e)=>setsitevisit({...sitevisit,start_date:e.target.value})}/></div>
                            <div className="col-md-4"><label className="labels">Select End Date</label><input type="datetime-local" className="form-control form-control-sm" onChange={(e)=>setsitevisit({...sitevisit,end_date:e.target.value})}/></div>
                            </>
                        )
                    }
                  
                    <div className="col-md-6"><label className="labels">Mark As Completed?</label> 
                    <label class="switch">
                    <input type="checkbox" onChange={handleToggle3}/>
                        <span class="slider round"></span>
                        </label>
                    </div>

                   
        
            <div className="p-3 py-5" id="sitevisitdetails" style={{width:"100%",display:"none"}}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Complete Site Visit</h4>
                </div><hr></hr>
                
                <div className="row mt-2">
                    
                    <div className="col-md-4"><label className="labels">Select Status</label><select className="form-control form-control-sm" required="true" onChange={handleleadstatuschange} >
                    <option>Select</option>
                       <option>Conducted</option>
                       <option>Did Not Visit</option>
                       <option>Not Intersted</option>
                        </select>
                        </div>
                        <div className="col-md-8"></div>
                        {
                            sitevisit.status==="Conducted" &&(
                                <>

                                <div className="col-md-4"><label className="labels">Select Intrested Project</label> 
                                <Select className="form-control form-control-sm" style={{border:"none"}}
                            multiple
                            value={siteprojects}
                            onChange={handlesiteprojectchange}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {sitevisit.project.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={siteprojects.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                                </div>

                                <div className="col-md-4"><label className="labels">Select Intersted Block</label>
                             
                             <Select className="form-control form-control-sm" style={{border:"none"}}
                             multiple
                             value={allblock}
                             onChange={handleallblockchange}
                             renderValue={(selected) => selected.join(', ')}
                         >
                             {siteallblock.map((block) => (
                                     <MenuItem key={block} value={block}> {/* Ensure unit_no is the value you want */}
                                         <Checkbox checked={allblock.indexOf(block) > -1} />
                                         <ListItemText primary={block} /> {/* Render unit_no or other relevant property */}
                                     </MenuItem>
                                 ))}
                                 </Select>
                                 </div>

                                <div className="col-md-4"><label className="labels">Select Intersted Inventory</label>
                             
                                <Select className="form-control form-control-sm" style={{border:"none"}}
                                multiple
                                value={allunit1}
                                onChange={handleallunitschange1}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {siteallUnits.map((unit) => (
                                        <MenuItem key={unit} value={unit}> {/* Ensure unit_no is the value you want */}
                                            <Checkbox checked={allunit1.indexOf(unit) > -1} />
                                            <ListItemText primary={unit} /> {/* Render unit_no or other relevant property */}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                    </div>
                                    </>
                            )
                        }
                     
                    
              
                
                <div className="col-md-4"><label className="labels">Select Date</label><input type="date" className="form-control form-control-sm" onChange={(e)=>setsitevisit({...sitevisit,date:e.target.value})}/></div>
                <div className="col-md-8"></div>

                    <div className="col-md-8"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm'  style={{height:"100px"}}/></div>
                 
                   
                    </div>
                    </div>
       

                    <div className="col-md-2"></div>
                    <div className="col-md-2" style={{marginLeft:"50%",marginTop:"20px"}}><button className="form-control form-control-sm" onClick={sitevisitdetails}>Submit</button></div>
                    <div className="col-md-2" style={{marginTop:"20px"}}><button className="form-control form-control-sm">Cancel</button></div>
                   
                    
                    {/* <div className="col-md-6"><button className="form-control form-control-sm" >Submit</button></div>
                    <div className="col-md-6"><button className="form-control form-control-sm">Cancel</button></div> */}
                   
                    </div>
                

        {/*=========================================== meeting task=================================================================================== */}
                
                
                    <div className="row" id="meeting" style={{display:"none"}}>

                    <div className="col-md-12"><label className="labels">Title</label><p id="meetingtitle">MEETING with {meetingtask.lead} For Negotiation of {meetingtask.location_address}   on {meetingtask.location_type} @ {meetingtask.due_date}</p></div>
                        
                        <div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmeetingtask({...meetingtask,executive:e.target.value})}>
                    <option>Select </option>
                    <option>Rajesh</option>
                        <option>Suresh</option>
                        <option>Vivek</option>
                        </select>
                        </div>
                        
                <div className="col-md-4"><label className="labels">Select Lead</label> <select
    className="form-control form-control-sm"
    required
    onChange={(e) => {
      const selectedLead = data.find(item => item._id === e.target.value);
      if (selectedLead) {
        const fullName = `${selectedLead.title} ${selectedLead.first_name} ${selectedLead.last_name}`;
        setmeetingtask(prevState => ({
          ...prevState,
          lead: fullName,
          title2: selectedLead.title,
          first_name: selectedLead.first_name,
          last_name: selectedLead.last_name,
          mobile_no:selectedLead.mobile_no,
          email:selectedLead.email,
          stage:selectedLead.stage
        }));
      }
    }}
  >
                    <option>Select</option>
                        {
                            data.map((item)=>
                            (
                                <option value={item._id}> {item.title} {item.first_name} {item.last_name}</option>
                                
                            ))
                            
                        }
                        </select>
                        </div>
                        <div className="col-md-4"></div>
                        
                        <div className="col-md-4"><label className="labels">Select Location Type</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmeetingtask({...meetingtask,location_type:e.target.value})}>
                    <option>Select</option>
                        {
                            location.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                    <div className="col-md-8"></div>

                    <div className="col-md-8"><label className="labels">Location Address</label><input type="text" required="true" className="form-control form-control-sm" onChange={(e)=>setmeetingtask({...meetingtask,location_address:e.target.value})}/></div>
                    <div className="col-md-4"></div>
                  

                    <div className="col-md-4"><label className="labels">Reason</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmeetingtask({...meetingtask,reason:e.target.value})}>
                    <option>Select</option>
                        <option>Negotiation</option>
                        <option>Discuss</option>
                        <option>Agreement</option>
                        <option>Token</option>
                        </select>
                        </div>
                    <div className="col-md-8"></div>

                    <div className="col-md-4"><label className="labels">Select Project</label>
                    <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={projects2}
                    onChange={handleprojectchange2}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {allproject.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={projects2.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
                        </div>
                        <div className="col-md-4"><label className="labels">Inventory</label>
                        <Select className="form-control form-control-sm" style={{border:"none"}}
                    multiple
                    value={allunit2}
                    onChange={handleallunitschange2}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {allUnits2.map((unit) => (
        <MenuItem key={unit._id} value={unit.unit_no}> {/* Ensure unit_no is the value you want */}
            <Checkbox checked={allunit2.indexOf(unit.unit_no) > -1} />
            <ListItemText primary={unit.unit_no} /> {/* Render unit_no or other relevant property */}
        </MenuItem>
    ))}
                </Select>
                        </div>

                    <div className="col-md-10"><label className="labels">Remark</label><textarea className='form-control form-control-sm' style={{height:"100px"}} onChange={(e)=>setmeetingtask({...meetingtask,remark:e.target.value})}/></div>
                    <div className="col-md-2"></div>
                    
                  
                    <div className="col-md-6"><label className="labels">Completed?</label> 
                    <label class="switch">
                    <input type="checkbox" onChange={handleToggle2} />
                        <span class="slider round"></span>
                        </label>
                    </div>
                    <div className="col-md-4"><label className="labels">Select Due Date</label><input type="datetime-local" className="form-control form-control-sm" onChange={(e)=>setmeetingtask({...meetingtask,due_date:e.target.value})}/></div>
                   
                    <div className="p-3 py-5" id="meetingdetails" style={{display:"none",width:"100%"}}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Complete Meeting Task</h4>
                </div><hr></hr>
                
                <div className="row mt-2">
                    
                    <div className="col-md-4"><label className="labels">Select Status</label><select className="form-control form-control-sm" required="true" >
                    <option>Select</option>
                      <option>Conducted</option>
                      <option>Cancelled</option>
                      <option> Postponed</option>
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Meeting Result</label><select className="form-control form-control-sm" required="true" >
                    <option>Select</option>
                      <option>Deal Done</option>
                      <option>Negotiation Uncomplete</option>
                      <option>Deal Not Done</option>
                      <option>Site Visit</option>
                        </select>
                        </div>
                    <div className="col-md-4"></div>
                </div>
                <div className="row mt-3">
                <div className="col-md-4"><label className="labels">Select Date</label><input type="date" className="form-control form-control-sm" /></div>

                    <div className="col-md-8"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm'  style={{height:"100px"}}/></div>
                     </div>
                   
                        </div>
                        
                    <div className="col-md-2"  style={{marginLeft:"60%",marginTop:"20px"}}><button className="form-control form-control-sm" onClick={meetingtaskdetails}>Submit</button></div>
                    <div className="col-md-2"  style={{marginTop:"20px"}}><button className="form-control form-control-sm">Cancel</button></div>
                   
                        </div> 
                       

                    <Modal show={show1} onHide={handleClose1} size='lg'>
            <Modal.Header>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div style={{width:"100%"}}>
            <div className="row" id='basicdetails1'>
           
        <div className="col-12">
            
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Complete Call Task</h4>
                </div><hr></hr>
                
                <div className="row mt-2">
                    
                    <div className="col-md-4"><label className="labels">Direction</label><select className="form-control form-control-sm" required="true" >
                    <option>Select</option>
                        {
                            direction.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Status</label><select className="form-control form-control-sm" required="true" >
                    <option>Select</option>
                        {
                            status.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                    <div className="col-md-4"></div>
                </div>
                <div className="row mt-3">
                <div className="col-md-4"><label className="labels">Date</label><input type="date" id="date1" className="form-control form-control-sm" style={{color:"transparent"}} onClick={handler1}/></div>
                <div className="col-md-4"><label className="labels">Duration</label><input type="time" className="form-control form-control-sm" /></div>
                <div className="col-md-4"> </div>

                    <div className="col-md-4"><label className="labels">Result</label><select className="form-control form-control-sm" required="true" >
                    <option>Select</option>
                       {
                        result.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                       }
                       </select>
                        </div>
                        <div className="col-md-4"><label className="labels" style={{width:"120%"}}>Select Intersted Inventory(If any)</label><select className="form-control form-control-sm" required="true" >
                    <option>Select</option>
                        <option>Mr.</option>
                        </select>
                        </div>
                    <div className="col-md-4"></div>

                    <div className="col-md-8"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm'  style={{height:"100px"}}/></div>
                    <div className="col-md-12"><br></br></div>
                    <div className="col-md-12"><input type="checkbox" style={{height:"15px",width:"15px"}}/><label className="labels" style={{marginLeft:"10px"}}>Sheduled Follow Up</label></div> 
                     </div>
                    {/* <div className="row mt-4"  style={{marginLeft:"70%"}}>
                    <div className="col-md-6"><button className="form-control form-control-sm" >Submit</button></div>
                    <div className="col-md-6"><button className="form-control form-control-sm">Cancel</button></div>
                    </div> */}
                    </div>
                    
        </div>
        </div>
        
                    

                      
              
                
          </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" >
                Submit
              </Button>
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
                  
                    </div>
                    </div>
        
        </div>
        </div>
        <ToastContainer/>
        </div>
     );
}

export default Task_form;
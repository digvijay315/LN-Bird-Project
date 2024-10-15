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


function Task_form() {

    useEffect(()=>
    {
        fetchdata()
    },[])

    useEffect(()=>
        {
            fetchdata1()
        },[])
   
    


    const activity=["Call","Email","Meeting","Site Visit"]
    const reason=["Meeting","Site Visit","Discuss","For Requirment","etc"]
    const direction=["Incoming","Outgoing"]
    const visittype=["Site Visit","Home Visit","Online"]
    const status=["Answered","Missed","Not Pic","Busy","Cut Call","Number Not Reachable","Switch Off","Incoming","Not Available","Number Invalid"]
    const result=["Interested","Not Interested","Postponed","Low Budget","Location Mismatch"]
    const location=["Home","Office","Company","Site"]
    
    
    const [calltask,setcalltask]=useState({activity_type:"Call",title:"",reason:"",lead:"",executive:"",remarks:"",complete:"",due_date:"",title2:"",first_name:"",last_name:"",mobile_no:"",email:"",stage:""})

    

   

   
   
    
    
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

    const [mailtask,setmailtask]=useState({activity_type:"Mail",title:"",executive:"",lead:"",inventory:"",subject:"",remarks:"",
        complete:"",due_date:"",title2:"",first_name:"",last_name:"",mobile_no:"",email:"",stage:""})


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


const [units,setunits]=useState([])
const [allUnits,setallUnits]=useState([])
const fetchdatabyprojectname = async (e) => {
    const projectName = e.target.value; // Get the project name directly from the event
  
    try {
      setsitevisit(prev => ({ ...prev, project: projectName })); // Update the state
      const resp = await api.get(`viewprojectbyname/${projectName}`);
     setunits(resp.data.project)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (units.length >= 0) {
      const collectedUnits = units.flatMap(item => item.add_unit); // Collect all add_unit arrays
      setallUnits(collectedUnits); // Set allUnits with the collected units
    }
  }, [units]);



//   const [allUnits,setallUnits]=useState([])
//   useEffect(()=>
// {
//     if (data1.length > 0) {
//         setallUnits (data1.flatMap(item => item.add_unit)); // Collect all add_unit arrays
//        // This will log all add_units combined into a single array
//      }
// },[data1])
//    console.log(allUnits);
   
  

  
  

 







  
  const [meetingtask,setmeetingtask]=useState({activity_type:"Meeting",title:"",executive:"",lead:"",location_type:"",location_address:"",
            reason:"",inventory:"",remark:"",complete:"",stage:"",due_date:"",title2:"",first_name:"",last_name:"",mobile_no:"",email:"",stage:""})


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

        const [sitevisit,setsitevisit]=useState({activity_type:"SiteVisit",title:"",executive:"",project:"",sitevisit_type:"",
                            inventory:"",lead:"",confirmation:"",remark:"",participants:"",complete:"",stage:"",title2:"",first_name:"",last_name:"",mobile_no:"",email:"",stage:""})


    const sitevisitdetails=async()=>
        {
         
            const title1 = document.getElementById("sitevisittitle").innerText;
    
            // Update state
            const updatedMailTask = { ...sitevisit, title: title1 };
            try {
                const resp=await api.post('sitevisit',updatedMailTask)
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
    const handletogger=(e)=>
        {
            const ischecked=e.target.checked;
            setcalltask({...calltask,complete:ischecked})
            if(ischecked)
            {
                handleShow1()
            }
        }

    

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

                    <div className="col-md-12"><label className="labels">Title</label><p id="mailtitle">Call {mailtask.lead} For Meeting at {mailtask.due_date}</p></div> 

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
                        <div className="col-md-4"><label className="labels">Select Inventory</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,inventory:e.target.value})} >
                    <option>Select</option>
                    {
                        units1.map((item)=>
                    (
                       <option>{item.unit_no}</option>
                    ))
                      }
                        </select>
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

                    <div className="col-md-12"><label className="labels">Title</label><p id="sitevisittitle">Site Visit with {sitevisit.lead} For 722_Aero
                        City on September 4,2023 at 5:32 AM</p></div>

                        <div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,executive:e.target.value})} >
                    <option>Select </option>
                    <option>Rajesh</option>
                        <option>Suresh</option>
                        <option>Vivek</option>
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Select Project</label><select className="form-control form-control-sm" required="true" onChange={(e)=>fetchdatabyprojectname(e)} >
                    <option>Select </option>
                       {
                        data1.map((item)=>
                        (
                            <option>{item.name}</option>
                        ))
                       }
                        </select>
                        </div>
                        <div className="col-md-4"></div>
                    
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
                        <div className="col-md-4"><label className="labels">Select Inventory</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,inventory:e.target.value})}>
                    <option>Select </option>
                      {
                        allUnits.map((item)=>
                    (
                       <option>{item.unit_no}</option>
                    ))
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
        setsitevisit(prevState => ({
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
                       <option>1 to 100</option>
                        </select>
                        </div>
                  
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
                    
                    <div className="col-md-4"><label className="labels">Select Status</label><select className="form-control form-control-sm" required="true" >
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
                        <div className="col-md-4"><label className="labels">Select Intersted Inventory</label><select className="form-control form-control-sm" required="true" >
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
                    <div className="col-md-4"></div>
              
                
                <div className="col-md-4"><label className="labels">Select Date</label><input type="date" className="form-control form-control-sm" /></div>
                <div className="col-md-8"></div>

                    <div className="col-md-8"><label className="labels">FeedBack</label><textarea className='form-control form-control-sm'  style={{height:"100px"}}/></div>
                 
                   
                    </div>
                    </div>
       

                    <div className="col-md-2"></div>
                    <div className="col-md-2" style={{marginLeft:"60%",marginTop:"20px"}}><button className="form-control form-control-sm" onClick={sitevisitdetails}>Submit</button></div>
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
                        <option>Mr.</option>
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Inventory</label><select className="form-control form-control-sm" required="true"onChange={(e)=>setmeetingtask({...meetingtask,inventory:e.target.value})} >
                    <option>Select</option>
                    {
                        units1.map((item)=>
                    (
                       <option>{item.unit_no}</option>
                    ))
                      }
                        </select>
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
                        {
                            status.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Meeting Result</label><select className="form-control form-control-sm" required="true" >
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
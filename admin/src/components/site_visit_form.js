import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import '../css/toggle.css';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";

function Site_visit() {
    const activity=["Call","Mail","Meeting","Site Visit"]
    const project=["Aerocity  Mohali","Sector 4 Panchkula"]
    const visittype=["Site Visit","Home Visit","Online"]

    const [sitevisit,setsitevisit]=useState({activity_type:"",executive:"",project:"",sitevisit_type:"",inventory:"",lead:"",
                                            confirmation:"",remarks:"",participants:"",remind_me:"",complete:"",start_date:"",end_date:""})

        const sitevisitdetails=async(e)=>
        {
                    e.preventDefault();
                    try {
                        const resp=await axios.post('http://localhost:5000/sitevisit',sitevisit)
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

    return ( 
        <div>
            <Header1/>
            <Sidebar1/>
            <div style={{padding:"50px"}}>
            <div className="container rounded bg-white mt-5 mb-12" style={{width:"70%",marginLeft:"200px"}}>
            <div className="row" style={{marginTop:"50px"}}>
        <div className="col-12">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Create Task </h4>
                    <div className="col-md-4"><p><u>Site visit Form</u></p></div>
                </div><hr></hr>

                <div className="col-md-12"><label className="labels">Title</label><p>Site Visit with Anil Gupta For 722_Aero
                    City on September 4,2023 ati5:32 AM</p></div>
                
                <hr></hr>
                <div className="row mt-2">
                    
                    <div className="col-md-4"><label className="labels">Select Activity Type</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,activity_type:e.target.value})}>
                    <option>Select </option>
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

                        <div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,executive:e.target.value})}>
                    <option>Select </option>
                       
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Select Project</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,project:e.target.value})}>
                    <option>Select </option>
                       {
                        project.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
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
                       
                        </select>
                        </div>
                        <div className="col-md-4"></div>

                         
                        <div className="col-md-4"><label className="labels">Select Lead</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,lead:e.target.value})}>
                    <option>Select </option>
                       
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Confirmation</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,confirmation:e.target.value})}>
                    <option>Select </option>
                       <option>Confirmed</option>
                       <option>Tentative</option>
                        </select>
                        </div>
                        <div className="col-md-4"></div>

                        <div className="col-md-10"><label className="labels">Remark</label><textarea className='form-control form-control-sm' style={{height:"100px"}} onChange={(e)=>setsitevisit({...sitevisit,remarks:e.target.value})}/></div>
                </div>
                <div className="row mt-3">
                        <div className="col-md-4"><label className="labels">Select Participants</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setsitevisit({...sitevisit,participants:e.target.value})}>
                    <option>Select</option>
                       
                        </select>
                        </div>
                    <div className="col-md-8"></div>

                    <div className="col-md-6"><label className="labels">Remind me?</label> 
                    <label class="switch">
                    <input type="checkbox" onChange={(e)=>setsitevisit({...sitevisit,remind_me:e.target.value})}/>
                        <span class="slider round"></span>
                        </label>
                    </div>
                    <div className="col-md-6"><label className="labels">Mark As Completed?</label> 
                    <label class="switch">
                    <input type="checkbox" onChange={(e)=>setsitevisit({...sitevisit,complete:e.target.value})}/>
                        <span class="slider round"></span>
                        </label>
                    </div>
                    <div className="col-md-4"><label className="labels">Select Start Date</label><input type="date" className="form-control form-control-sm" onChange={(e)=>setsitevisit({...sitevisit,start_date:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Select End Date</label><input type="date" className="form-control form-control-sm" onChange={(e)=>setsitevisit({...sitevisit,end_date:e.target.value})}/></div>
                    </div>
                    <div className="row mt-4"  style={{marginLeft:"70%"}}>
                    <div className="col-md-6"><button className="form-control form-control-sm" onClick={sitevisitdetails}>Submit</button></div>
                    <div className="col-md-6"><button className="form-control form-control-sm">Cancel</button></div>
                    </div>
                    <ToastContainer/>
                    </div>
                    </div>
        </div>
        </div>
        </div>
        </div>
     );
}

export default Site_visit;
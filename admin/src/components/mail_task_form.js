import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import '../css/toggle.css';
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useState } from "react";

function Mail_task_form() {
    const activity=["Call","Mail","Meeting","Site Visit"]

    const [mailtask,setmailtask]=useState({activity_type:"",executive:"",lead:"",inventory:"",subject:"",remarks:"",remind_me:"",
                                            complete:"",due_date:""})

        const mailtaskdetails=async(e)=>
            {
                e.preventDefault();
                try {
                    const resp=await axios.post('http://localhost:5000/mailtask',mailtask)
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
                    <h4 className="text-right">Create Task</h4>
                    <div className="col-md-4"><p><u>Mail Task Form</u></p></div>
                </div><hr></hr>

                <div className="col-md-12"><label className="labels">Title</label><p>Call Mr. Mohit gupta For Meeting at September 4,2023 at 6:02 AM</p></div>
                
                <hr></hr>
                <div className="row mt-2">
                    
                    <div className="col-md-4"><label className="labels">Select Activity Type</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,activity_type:e.target.value})}>
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
                        <div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,executive:e.target.value})}>
                    <option>Select </option>
                       
                        </select>
                        </div>
                    <div className="col-md-4"></div>
                </div>
                <div className="row mt-3">
                <div className="col-md-4"><label className="labels">Select Lead</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,lead:e.target.value})}>
                    <option>Select</option>
                        <option>Mr.</option>
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Select Inventory</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,inventory:e.target.value})}>
                    <option>Select</option>
                        <option>Mr.</option>
                        </select>
                        </div>
                    <div className="col-md-4"></div>

                    <div className="col-md-4"><label className="labels">Subject</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setmailtask({...mailtask,subject:e.target.value})}>
                    <option>Select</option>
                        <option>Mr.</option>
                        </select>
                        </div>

                    <div className="col-md-10"><label className="labels">Remark</label><textarea className='form-control form-control-sm' onChange={(e)=>setmailtask({...mailtask,remarks:e.target.value})}/></div>

                    <div className="col-md-6"><label className="labels">Remind me?</label> 
                    <label class="switch" onChange={(e)=>setmailtask({...mailtask,remind_me:e.target.value})}>
                    <input type="checkbox" />
                        <span class="slider round"></span>
                        </label>
                    </div>
                    <div className="col-md-6"><label className="labels">Completed?</label> 
                    <label class="switch" onChange={(e)=>setmailtask({...mailtask,complete:e.target.value})}>
                    <input type="checkbox" />
                        <span class="slider round"></span>
                        </label>
                    </div>
                    <div className="col-md-4"><label className="labels">Select Due Date</label><input type="date" className="form-control form-control-sm" onChange={(e)=>setmailtask({...mailtask,due_date:e.target.value})}/></div>
                    </div>
                    <div className="row mt-4"  style={{marginLeft:"70%"}}>
                    <div className="col-md-6"><button className="form-control form-control-sm" onClick={mailtaskdetails}>Submit</button></div>
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

export default Mail_task_form;
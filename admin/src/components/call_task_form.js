import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import '../css/toggle.css';
import { ToastContainer,toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";


function Call_task_form() {
    const activity=["Call","Email","Meeting","Site Visit"]
    const reason=["Meeting","Site Visit","Discuss","For Requirment","etc"]

    const [calltask,setcalltask]=useState({activity_type:"",reason:"",lead:"",executive:"",remarks:"",remind_me:"",complete:"",due_date:""})

        const calltaskdetails=async(e)=>
        {
            e.preventDefault();
            try {
            const resp=await axios.post('http://localhost:5000/calltask',calltask)
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
                    <div className="col-md-4"><p><u>Call Task Form</u></p></div>
                </div><hr></hr>

                <div className="col-md-12"><label className="labels">Title</label><p>Call Mr. Mohit gupta For Meeting at September 4,2023 at 6:02 AM</p></div>
                
                <hr></hr>
                <div className="row mt-2">
                    
                    <div className="col-md-4"><label className="labels">Select Activity Type</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask({...calltask,activity_type:e.target.value})}>
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
                </div>
                <div className="row mt-3">
                <div className="col-md-4"><label className="labels">Select Lead</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask({...calltask,lead:e.target.value})}>
                    <option>Select</option>
                        <option>Mr.</option>
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcalltask({...calltask,executive:e.target.value})}>
                    <option>Select</option>
                        <option>Mr.</option>
                        </select>
                        </div>
                    <div className="col-md-4"></div>

                    <div className="col-md-10"><label className="labels">Remark</label><textarea className='form-control form-control-sm' onChange={(e)=>setcalltask({...calltask,remarks:e.target.value})}/></div>

                    <div className="col-md-6"><label className="labels">Remind me?</label> 
                    <label class="switch">
                    <input type="checkbox" onChange={(e)=>setcalltask({...calltask,remind_me:e.target.value})}/>
                        <span class="slider round"></span>
                        </label>
                    </div>
                    <div className="col-md-6"><label className="labels">Completed?</label> 
                    <label class="switch">
                    <input type="checkbox" onChange={(e)=>setcalltask({...calltask,complete:e.target.value})}/>
                        <span class="slider round"></span>
                        </label>
                    </div>
                    <div className="col-md-4"><label className="labels">Select Due Date</label><input type="date" className="form-control form-control-sm" onChange={(e)=>setcalltask({...calltask,due_date:e.target.value})}/></div>
                    </div>
                    <div className="row mt-4"  style={{marginLeft:"70%"}}>
                    <div className="col-md-6"><button className="form-control form-control-sm" onClick={calltaskdetails}>Submit</button></div>
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

export default Call_task_form;
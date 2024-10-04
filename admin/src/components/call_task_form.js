import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import '../css/toggle.css';
import { ToastContainer,toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function Call_task_form() {
    const activity=["Call","Email","Meeting","Site Visit"]
    const reason=["Meeting","Site Visit","Discuss","For Requirment","etc"]
    const direction=["Incoming","Outgoing"]
    const status=["Answered","Missed","Not Pic","Busy","Cut Call","Number Not Reachable","Switch Off","Incoming","Not Available","Number Invalid"]
    const result=["Interested","Not Interested","Postponed","Low Budget","Location Mismatch"]

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
            handleShow1(); // Open the modal
        }
    };

    const handler1=()=>
        {
            document.getElementById("date1").style.color="black"
        }

        const[isreminder,setisreminder]=useState(false)
        const reminder=(e)=>
        {
            const ischecked=e.target.checked
            setcalltask({...calltask,remind_me:ischecked})
           
                setisreminder(ischecked)
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
                    <input type="checkbox" onChange={reminder}/>
                        <span class="slider round"></span>
                        </label>
                    </div>
                    <div className="col-md-6"><label className="labels">Completed?</label> 
                    <label class="switch">
                    <input type="checkbox" onChange={handleToggle}/>
                        <span class="slider round"></span>
                        </label>
                    </div>
                    <div className="col-md-4"><label className="labels">Select Due Date</label><input type="date" className="form-control form-control-sm" disabled={!isreminder} onChange={(e)=>setcalltask({...calltask,due_date:e.target.value})}/></div>
                    </div>
                    <div className="row mt-4"  style={{marginLeft:"70%"}}>
                    <div className="col-md-6"><button className="form-control form-control-sm" onClick={calltaskdetails}>Submit</button></div>
                    <div className="col-md-6"><button className="form-control form-control-sm">Cancel</button></div>
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
        </div>
        <ToastContainer/>
        </div>
     );
}

export default Call_task_form;
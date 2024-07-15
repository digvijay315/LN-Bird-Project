import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import '../css/toggle.css';


function Site_visit() {
    const activity=["Call","Mail","Meeting","Site Visit"]
    const project=["Aerocity  Mohali","Sector 4 Panchkula"]
    const visittype=["Site Visit","Home Visit","Online"]
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
                    
                    <div className="col-md-4"><label className="labels">Select Activity Type</label><select className="form-control" required="true" >
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

                        <div className="col-md-4"><label className="labels">Select Executive</label><select className="form-control" required="true" >
                    <option>Select </option>
                       
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Select Project</label><select className="form-control" required="true" >
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
                    
                        <div className="col-md-4"><label className="labels">Select Site Visit Type</label><select className="form-control" required="true" >
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
                        <div className="col-md-4"><label className="labels">Select Inventory</label><select className="form-control" required="true" >
                    <option>Select </option>
                       
                        </select>
                        </div>
                        <div className="col-md-4"></div>

                         
                        <div className="col-md-4"><label className="labels">Select Lead</label><select className="form-control" required="true" >
                    <option>Select </option>
                       
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Confirmation</label><select className="form-control" required="true" >
                    <option>Select </option>
                       <option>Confirmed</option>
                       <option>Tentative</option>
                        </select>
                        </div>
                        <div className="col-md-4"></div>

                        <div className="col-md-10"><label className="labels">Remark</label><textarea className='form-control' style={{height:"100px"}} /></div>
                </div>
                <div className="row mt-3">
                        <div className="col-md-4"><label className="labels">Select Participants</label><select className="form-control" required="true" >
                    <option>Select</option>
                       
                        </select>
                        </div>
                    <div className="col-md-8"></div>

                    <div className="col-md-6"><label className="labels">Remind me?</label> 
                    <label class="switch">
                    <input type="checkbox" />
                        <span class="slider round"></span>
                        </label>
                    </div>
                    <div className="col-md-6"><label className="labels">Mark As Completed?</label> 
                    <label class="switch">
                    <input type="checkbox" />
                        <span class="slider round"></span>
                        </label>
                    </div>
                    <div className="col-md-4"><label className="labels">Select Start Date</label><input type="date" className="form-control" /></div>
                    <div className="col-md-4"><label className="labels">Select End Date</label><input type="date" className="form-control" /></div>
                    </div>
                    <div className="row mt-4"  style={{marginLeft:"70%"}}>
                    <div className="col-md-6"><button className="form-control" >Submit</button></div>
                    <div className="col-md-6"><button className="form-control">Cancel</button></div>
                    </div>
                    </div>
                    </div>
        </div>
        </div>
        </div>
        </div>
     );
}

export default Site_visit;
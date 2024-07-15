import Header1 from "./header1";
import Sidebar1 from "./sidebar1";

function Leadinfo_requirment() {
    const requirment=["Buy","Rent","Lease"];
    const property_type=["Residential","Commercial","Agricultural","Industrial","Institutional"];
    const facing=["East","West","South","North","North East","South East","North West","South West"];
    const road=["9 mtr road","18 mtr road","24 mtr road"];
    const transaction_type=["Full White","Collecter Rate","50% White","75% White"];
    const furnishing=["Furnished","Unfurnished","Semi Furnished"];
    const funding=["Home Loan","Self Funding","Loan Against Property","Personal Loan","Business Loan"]
    const timeline=["Urgent","More then 1 month","Not Confirmed","Within 15 days"]
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
                    <h4 className="text-right">Add Lead</h4>
                </div><hr></hr>
                <div className="d-flex justify-content-between align-items-center experience"><span>Requirment</span></div><hr></hr>
                <div className="row mt-2">
                    
                    <div className="col-md-3"><label className="labels">Requirment</label><select className="form-control" required="true" >
                    <option>Select</option>
                       {
                        requirment.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                       }
                        </select>
                        </div>
                        <div className="col-md-3"><label className="labels">Property Type</label><select className="form-control" required="true" >
                    <option>Select</option>
                        {
                            property_type.map(item=>
                                (
                                    <option>{item}</option>
                                )
                            )
                        }
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels" style={{display:"inline-block"}}>Purpose</label><br></br>
                        <input type="radio" name="purpose" style={{marginRight:"10px"}}/>End use<input type="radio" name="purpose" style={{marginLeft:"20px",marginRight:"10px"}}/>Investor
                        </div>
                        <div className="col-md-2"><label className="labels" >NRI</label><br></br>
                        <input type="checkbox" style={{marginRight:"10px"}}/>Yes
                        </div>
                        
                        
                </div>
                <div className="row mt-3">
                    <div className="col-md-6"><label className="labels">Sub Type</label><select required="true" className="form-control" >
                    <option value="">select</option>
                    <option value="93">Afghanistan +93</option>
                    <option value="358">Aland Islands +358</option>
                    <option value="355">Albania +355</option>
                    </select>
                    </div>
                    
                    <div className="col-md-6"><label className="labels">Unit Type</label><select className="form-control" >
                    <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                    
                        <div className="col-md-6"><label className="labels">Budget Min</label><select className="form-control" >
                        <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>

                        <div className="col-md-6"><label className="labels">Budget Max</label><select className="form-control" >
                        <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>

                        <div className="col-md-4"><label className="labels">Minimum Area</label><select className="form-control" >
                        <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Maximum Area</label><select className="form-control" >
                        <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Area Metric</label><select className="form-control" >
                        <option>Select Type</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                    <div className="col-md-6"><label className="labels">Search Location</label><input type="text" className="form-control"/></div>
                    <div className="col-md-6"><label className="labels">Street  Address</label><input type="text" className="form-control"/></div>

                    <div className="col-md-3"><label className="labels">City</label><select className="form-control" >
                    <option>Select</option>
                        <option>Personal</option>
                        <option>Office</option>
                        <option>Business</option>
                        </select></div>
                        <div className="col-md-3"><label className="labels">Area</label><select className="form-control" >
                    <option>Select</option>
                        <option>Personal</option>
                        <option>Office</option>
                        <option>Business</option>
                        </select></div>
                        <div className="col-md-3"><label className="labels">Country</label><input type="text" className="form-control" /></div>
                        <div className="col-md-3"><label className="labels">Pincode</label><input type="text" className="form-control" /></div>

                        <div className="col-md-3"><label className="labels">Block</label><select className="form-control" >
                    <option>Select</option>
                        <option>Personal</option>
                        <option>Office</option>
                        <option>Business</option>
                        </select></div>
                        <div className="col-md-3"><label className="labels">State</label><select className="form-control" >
                    <option>Select</option>
                        <option>Personal</option>
                        <option>Office</option>
                        <option>Business</option>
                        </select></div>
                        <div className="col-md-3"><label className="labels">Lattitude</label><input type="text" className="form-control" /></div>
                        <div className="col-md-3"><label className="labels">Longitude</label><input type="text" className="form-control" /></div>
                       
                         <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}></label><hr style={{marginTop:"10px"}}></hr></div>
                          <div className="col-md-12"><label className="labels" style={{fontSize:"16px"}}>Other Requirment</label></div>

                    
                    <div className="col-md-2"><label className="labels">Specific Unit</label><input type="text" className="form-control" /></div>
                    <div className="col-md-2"><label className="labels" style={{visibility:"hidden"}}>system</label><input type="text" className="form-control" /></div>
                    <div className="col-md-3" style={{marginLeft:"16%"}}><label className="labels">Funding</label>
                    <select className="form-control">
                    <option>Select</option>
                   {
                    funding.map(item=>
                        (
                            <option>{item}</option>
                        )
                    )
                   }
                        </select>
                    </div>
                    <div className="col-md-3"><label className="labels">Timeline</label>
                    <select className="form-control">
                    <option>Select</option>
                      {
                        timeline.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                      }
                        </select>
                    </div>

                    <div className="col-md-2"><label className="labels">Facing</label>
                    <select className="form-control">
                    <option>Select</option>
                        {
                            facing.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )}
                        </select>
                    </div>
                    <div className="col-md-2"><label className="labels">Road</label>
                    <select className="form-control">
                    <option>Select</option>
                     {
                        road.map(item=>
                            (
                                <option>{item}</option>
                            )
                     )}
                        </select>
                    </div>
                     <div className="col-md-3" style={{marginLeft:"16%"}}><label className="labels">Transaction Type</label>
                    <select className="form-control">
                    <option>Select</option>
                     {
                        transaction_type.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                     }
                        </select>
                    </div>
                    <div className="col-md-3"><label className="labels">Furnishing</label>
                    <select className="form-control">
                    <option>Select</option>
                       {
                        furnishing.map(item=>
                            (
                                <option>{item}</option>
                            )
                        )
                       }
                        </select>
                    </div>
                    </div>
                    <div className="row mt-4" style={{marginLeft:"20%"}}>
                    <div className="col-md-2"><button className="form-control" >Save</button></div>
                    <div className="col-md-2"><button className="form-control">Close</button></div>
                    <div className="col-md-4"><button className="form-control">Save & View Lead</button></div>
                    </div>
                    </div>
                    </div>
        </div>
        </div>
        </div>
        </div>
     );
}

export default Leadinfo_requirment;
import Header1 from "./header1";
import Sidebar1 from "./sidebar1";

function Payment_details() {
    const handler1=()=>
    {
        document.getElementById("date1").style.color="black";
       
    }
    const handler2=()=>
        {
            
            document.getElementById("date2").style.color="black";
        }
    
    return ( 
        <div>
            <Header1/>
            <Sidebar1/>
            <div style={{padding:"50px"}}>
            <div className="container rounded bg-white mt-5 mb-12" style={{width:"70%",marginLeft:"200px"}}>
            <div className="row" style={{marginTop:"50px"}}>
        <div className="col-12 border-right border-left">
            <div className="p-3 py-5">

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Payment Details</h4>
                </div><hr></hr>
                <div className="row mt-2">
                <div className="col-md-4"><label className="labels">Date</label><input type="date" id="date1" className="form-control" style={{color:"white"}} onClick={handler1}/></div>
                        <div className="col-md-4"><label className="labels">Account Name(To)</label><select className="form-control" required="true" >
                    <option>Select</option>
                        <option>Mr.</option>
                        <option>Mrs.</option>
                        <option>Smt.</option>
                        <option>Dr.</option>
                        <option>Er.</option>
                        <option>Sh.</option>
                        <option>col</option>
                        </select>
                        </div>
                        <div className="col-md-4"><label className="labels">Recieved From</label><select className="form-control" required="true" >
                    <option>Select</option>
                        <option>Mr.</option>
                        <option>Mrs.</option>
                        <option>Smt.</option>
                        <option>Dr.</option>
                        <option>Er.</option>
                        <option>Sh.</option>
                        <option>col</option>
                        </select>
                        </div>

                        <div className="col-md-4"><label className="labels">Payment Mode</label><select className="form-control" required="true" >
                    <option>Select</option>
                        <option>Mr.</option>
                        <option>Mrs.</option>
                        <option>Smt.</option>
                        <option>Dr.</option>
                        <option>Er.</option>
                        <option>Sh.</option>
                        <option>col</option>
                        </select>
                        </div>
                        <div className="col-md-8"></div>
                </div>

                <div className="row mt-2" style={{border:"1px solid gray",padding:"5px"}}>
                        <div className="col-md-4"><label className="labels">Cheque Number</label><input type="text" className="form-control" /></div>
                        <div className="col-md-4"><label className="labels">Cheque Bank Name</label><input type="text" className="form-control"/></div>
                        <div className="col-md-4"><label className="labels">Cheque Date</label><input type="date" id="date2"className="form-control" style={{color:"white"}} onClick={handler2}/></div>
                        <div className="col-md-10"><label className="labels">In Favour Of</label><textarea className='form-control' style={{height:"50px"}}/></div>
                </div>

                
                <div className="row mt-3">
                    <div className="col-md-4"><label className="labels">Amount</label><input type="text" className="form-control"   /></div>
                    <div className="col-md-4"><label className="labels">TDS(%)</label><input type="text" className="form-control"   /></div>
                    <div className="col-md-4"><label className="labels">TDS Amount</label><input type="text" className="form-control" /></div>
                    
                    <div className="col-md-4"><label className="labels">Tax Type</label><select className="form-control" required="true" >
                    <option>Select</option>
                        <option>Mr.</option>
                        <option>Mrs.</option>
                        <option>Smt.</option>
                        <option>Dr.</option>
                        <option>Er.</option>
                        <option>Sh.</option>
                        <option>col</option>
                        </select>
                        </div>
                        <div className="col-md-4"  style={{marginLeft:"33%"}}><label className="labels">Discount Type</label><select className="form-control" required="true" >
                    <option>Select</option>
                        <option>Mr.</option>
                        <option>Mrs.</option>
                        <option>Smt.</option>
                        <option>Dr.</option>
                        <option>Er.</option>
                        <option>Sh.</option>
                        <option>col</option>
                        </select>
                        </div>
                    <div className="row mt-2" style={{border:"1px solid gray",padding:"5px",margin:"2px"}}>
                        <div className="col-md-2"><label className="labels">SGST(%)</label><input type="text" className="form-control" /></div>
                        <div className="col-md-2"><label className="labels">SGST Value</label><input type="text" className="form-control"/></div>
                        <div className="col-md-2"><label className="labels">CGST(%)</label><input type="text" className="form-control" /></div>
                        <div className="col-md-2"><label className="labels">CGST Value</label><input className='form-control'/></div>
                        <div className="col-md-4" style={{border:"1px solid gray",padding:"5px"}}><label className="labels">Discount %</label><input className='form-control'/></div>
                </div>

                <div className="col-md-4"><label className="labels">Payment For</label><select className="form-control" required="true" >
                    <option>Select</option>
                        <option>Mr.</option>
                        <option>Mrs.</option>
                        <option>Smt.</option>
                        <option>Dr.</option>
                        <option>Er.</option>
                        <option>Sh.</option>
                        <option>col</option>
                        </select>
                        </div>
                        <div className="col-md-8"></div>
                        <div className="col-md-10"><label className="labels">Narration</label><textarea className='form-control' style={{height:"70px"}}placeholder="Narration"/></div>
                        <div className="col-md-3"><label className="labels">Attach Images</label><input type="file" id="file-upload" className="form-control" style={{display:"none"}}/>
                    <label for="file-upload" className="form-control" style={{backgroundColor:"lightblue",cursor:"pointer",textAlign:"center"}}> 
                     Upload
                    </label>
                    </div>
                    </div>
                    <div className="row mt-4">
                    <div className="col-md-3" style={{marginLeft:"55%"}}><button className="form-control" >Make Payment</button></div>
                    <div className="col-md-2"><button className="form-control">Cancel</button></div>
                    </div>
                    </div>
                    </div>
        </div>
        </div>
        </div>
        </div>
     );
}

export default Payment_details;
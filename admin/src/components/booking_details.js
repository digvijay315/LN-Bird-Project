import Header1 from "./header1";
import Sidebar1 from "./sidebar1";

function Booking_details() {

    const handler1=()=>
        {
            document.getElementById("date1").style.color="black";
        }
        const handler2=()=>
            {
                document.getElementById("date2").style.color="black";
            }
            const handler3=()=>
                {
                    document.getElementById("date3").style.color="black";
                }
                const handler4=()=>
                    {
                        document.getElementById("date4").style.color="black";
                    }
                    const handler5=()=>
                        {
                            document.getElementById("date5").style.color="black";
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
                    <h4 className="text-right">Booking Details</h4>
                </div><hr></hr>
                <div className="row mt-2">
                    <div className="col-md-3"><label className="labels">Type</label><select className="form-control" required="true" >
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
                        <div className="col-md-4"><label className="labels">Property</label><select className="form-control" required="true" >
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
                        <div className="col-md-4"><label className="labels">Booked Lead</label><select className="form-control" required="true" >
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

                    <div className="col-md-4"><label className="labels">Booking Date</label><input type="date" id="date1" className="form-control" style={{color:"transparent"}} onClick={handler1} /></div>
                    <div className="col-md-4"><label className="labels">Form Application No</label><input type="text" className="form-control"/></div>
                    <div className="col-md-4"></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-4"><label className="labels">Total Deal Amount</label><input type="text" className="form-control"/></div>
                    <div className="col-md-4"><label className="labels">Booking Date</label><input type="date" id="date2" style={{color:"transparent"}} onClick={handler2} className="form-control" /></div>
                    <div className="col-md-4"></div>

                    <div className="col-md-3"><label className="labels">Agreement Amount</label><input type="text" className="form-control"/></div>
                    <div className="col-md-3"><label className="labels">Agreement Date</label><input type="date" id="date3" style={{color:"transparent"}} onClick={handler3} className="form-control" /></div>
                    <div className="col-md-3"><label className="labels">Part Pyment Amount</label><input type="text" className="form-control"/></div>
                    <div className="col-md-3"><label className="labels">Part Pyment Date</label><input type="date" id="date4" style={{color:"transparent"}} onClick={handler4} className="form-control" /></div>

                    <div className="col-md-4"><label className="labels">Full & Final Payment Date</label><input type="date" id="date5" style={{color:"transparent"}} onClick={handler5} className="form-control" /></div>
                    <div className="col-md-8"></div>

                    <div className="col-md-3"><label className="labels">Sales Agent</label><select className="form-control" >
                    <option>Select</option>
                        <option>Personal</option>
                        <option>Office</option>
                        <option>Business</option>
                        </select></div>
                        <div className="col-md-3"><label className="labels" style={{marginLeft:"200px"}} >Channel</label><select className="form-control" style={{marginLeft:"200px"}}>
                    <option>Select</option>
                        <option>Personal</option>
                        <option>Office</option>
                        <option>Business</option>
                        </select></div>
                    <div className="col-md-3"><label className="labels" style={{marginLeft:"200px"}}>Side</label><select className="form-control" style={{marginLeft:"200px"}}>
                    <option>Select</option>
                        <option>Personal</option>
                        <option>Office</option>
                        <option>Business</option>
                        </select></div>
                        <div className="col-md-3"></div>
                    
                    <div className="col-md-3"><label className="labels">Seller Brokerage(%)</label><input type="text" className="form-control" /></div>
                    <div className="col-md-3"><label className="labels">Brokerage</label><input type="text" className="form-control" /></div>
                    <div className="col-md-3"><label className="labels">Buyer Brokerage(%)</label><input type="text" className="form-control" /></div>
                    <div className="col-md-3"><label className="labels">Brokerage</label><input type="text" className="form-control" /></div>
                    
                    <div className="col-md-4"><label className="labels">Executive Incentive(%)</label><input type="text" className="form-control" /></div>
                    <div className="col-md-4"><label className="labels">Executive Incentive</label><input type="text" className="form-control" /></div>
                    <div className="col-md-4"></div>

                    <div className="col-md-10"><label className="labels">Remarks</label><textarea className='form-control' style={{height:"100px"}}/></div>

                    </div>
                    <div className="row mt-4">
                    <div className="col-md-2" style={{marginLeft:"65%"}}><button className="form-control" >Submit</button></div>
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

export default Booking_details;
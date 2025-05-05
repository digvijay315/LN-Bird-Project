import React from 'react'
import Header1 from './header1'
import Sidebar1 from './sidebar1'

function Whatsapplogin() {
  return (
    <div>
        <Header1/>
        <Sidebar1/>
       <h3 style={{marginTop:"100px",marginLeft:"25%"}}>Login Your Whats App Account</h3>
        <div className="row" style={{marginTop:"10px",marginLeft:"25%",border:"1px solid gray",borderRadius:"5px",padding:"20px",width:"50%"}}>
        
        <div className="col-md-6" style={{ fontSize: "12px", marginTop: "10px" }}>
       <label className="labels" style={{ fontSize: "12px" }}>Select Your Mobile No.</label>
       <select
         required
         className="form-control form-control-sm"
         style={{ fontSize: "12px" }}
       >
         <option value="">---Select---</option>
         <option value="">+91 99913 33570</option>
         <option value="">+91 99913 33570</option>
       </select>

     </div>
     <div className="col-md-3" style={{ fontSize: "12px", marginTop: "10px" }}>
       <label className="labels" style={{ fontSize: "12px",visibility:"hidden" }}>Select Your Mobile No.</label>
       <button className="form-control form-control-sm">Get Qr Code</button>
     </div>
     </div>
    </div>
  )
}

export default Whatsapplogin

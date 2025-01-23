import React from 'react'
import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import { useLocation } from 'react-router-dom';

function Leadsingleview() {

    const location=useLocation()
    const lead=location.state || {}
    console.log(lead);

    const formattedDate = new Date(lead.lastcommunication).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      

      
      
     
      
    
  return (
    <div>

      <Header1/>
      <Sidebar1/>

      <div style={{marginTop:"60px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px"}}>
        <div className="lead" style={{width:"200px",padding:"10px",borderRadius:"10px",}} >
          <h6>INCOMING</h6>
          <p></p>
        </div>
        <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
          <h6>PROSPECT</h6>
          <p></p>
        </div>
        <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}} >
          <h6>OPPORTUNITY</h6>
          <p></p>
        </div>
        <div className="lead" style={{width:"200px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
          <h6>NEGOTIATION</h6>
          <p></p>
        </div>
     
        <div className="lead" style={{borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent",border:"none",fontWeight:"bold",marginTop:"-10px"}}>
            CLOSED
        </button>
            <ul class="dropdown-menu">
              <li className="form-control">Won <span style={{fontSize:"30px",color:"green",fontWeight:"bolder"}}><sup></sup></span></li>
              <li className="form-control">Lost <span style={{fontSize:"30px",color:"red",fontWeight:"bolder"}}><sup></sup></span></li>
              <li className="form-control">Unqualified  <span style={{fontSize:"30px",color:"red",fontWeight:"bolder"}}><sup></sup></span></li>
            </ul>
         
        </div>  
        
      </div>
      

      <div className='row' style={{display:"flex",height:"100%",marginLeft:"60px",width:"100%",gap:"10px",marginTop:"10px",paddingBottom:"50px"}}>
        <div className='col-md-4' style={{border:"1px solid black",padding:"10px"}}>
            <div style={{display:"flex",}}>
                <h6>{lead.title} {lead.first_name} {lead.last_name}
                    <p style={{fontSize:"12px",fontWeight:"normal"}}>{lead.email}</p>
                </h6>
                <h6 style={{marginLeft:"40%"}}>Site Visit</h6>
                <h6 style={{marginLeft:"20px"}}>Task</h6>
            </div>
            <hr style={{ border: "none", borderTop: "2px solid gray",marginTop:"-10px" }} />
            <div className='row'>
                <div className='col-md-3'></div>
                <div className='col-md-3'><label>Status</label>
                <select className="form-control form-control-sm" style={{color:"red"}}>
                    <option >{lead?.lead_type || '---Select---'}</option>
                        {/* <option>Hot</option>
                        <option>Warm</option>
                        <option>Cold</option> */}
                </select>
                </div>
                <div className='col-md-6'></div>

                <div className='col-md-3'><label style={{visibility:"hidden"}}>mobile no</label>
                    <input type='text' className="form-control form-control-sm" value={lead.mobile_no}></input>
                </div>
                <div className='col-md-3' style={{marginTop:"25px"}}><label>Tags</label><p style={{lineHeight:"0px"}}>{lead.tags}</p></div>
                <div className='col-md-6'></div>

            

                <div className='col-md-5' style={{marginTop:"50px"}}><label>Owner Sales/Manager</label>
                    <p style={{marginTop:"-10px"}}>{lead.owner}</p>
                </div>
                <div className='col-md-3' style={{marginTop:"50px"}}><label>Team</label><p style={{marginTop:"-10px"}}>{lead.team} Team</p></div>
                <div className='col-md-4' style={{marginTop:"50px"}}><label>Time Zone</label><p style={{marginTop:"-10px"}}>Asia/Kolkata</p></div>


                <div className='col-md-4' style={{marginTop:"50px"}}><label>Recived On</label>
                    <p style={{marginTop:"-10px"}}>{lead.owner}</p>
                </div>
                <div className='col-md-4' style={{marginTop:"50px"}}><label>Source</label><p style={{marginTop:"-10px"}}>{lead.campegin} {lead.source}</p></div>
                <div className='col-md-4' style={{marginTop:"50px"}}><label>Last Conduct At</label><p style={{ wordWrap: "break-word", whiteSpace: "normal",marginTop:"-10px"}}>{formattedDate}</p></div>
                <div className='col-md-12'><hr></hr></div>

                <div className='row' style={{border:"1px solid black",margin:"10px",width:"100%"}}> 
                    <div className='col-md-12'>Requirment To Buy/Rent</div>
                    <div className='col-md-12'><hr></hr></div>
                    <div className='col-md-12'><p>Location-{lead.location} {lead.city}</p></div>

                    <div className='col-md-4' ><label style={{color:"blue"}}>Property Type</label>
                    <p style={{marginTop:"-10px",wordWrap: "break-word", whiteSpace: "normal"}}>{lead.property_type}</p>
                </div>
                <div className='col-md-4'><label>Sub Type</label><p style={{marginTop:"-10px"}}>{lead.sub_type}</p></div>
                <div className='col-md-4' ><label>Unit Type</label><p style={{marginTop:"-10px"}}>{lead.unit_type}</p></div>

                <div className='col-md-4' ><label>Budget</label>
                    <p style={{marginTop:"-10px"}}>{lead.budget_min} to {lead.budget_max}</p>
                </div>
                <div className='col-md-4'><label>Area/Size</label><p style={{marginTop:"-10px"}}>{lead.minimum_area}{lead.area_metric} to {lead.maximum_area}{lead.area_metric}</p></div>
                <div className='col-md-4' ><label>Furnishing</label><p style={{marginTop:"-10px"}}>{lead.furnishing}</p></div>

                <div className='col-md-4' ><label>Facing</label>
                    <p style={{marginTop:"-10px"}}>{lead.facing}</p>
                </div>
                <div className='col-md-4'><label>Transaction Type</label><p style={{marginTop:"-10px"}}>{lead.transaction_type}{lead.area_metric} to {lead.maximum_area}{lead.area_metric}</p></div>
                <div className='col-md-4' ><label>Timeline</label><p style={{marginTop:"-10px"}}>{lead.timeline}</p></div>

                <div className='col-md-8' ><label>Specific Requirment</label>
                    <p style={{marginTop:"-10px"}}></p>
                </div>
                
                
                <div className='col-md-4' ><label>Road</label><p style={{marginTop:"-10px"}}>{lead.road}</p></div>

                </div>

                <div className='row' style={{border:"1px solid black",margin:"10px",width:"100%"}}> 
                    <div className='col-md-12'>Personal Details</div>
                    <div className='col-md-12'><hr></hr></div>
                    <div className='col-md-12'><p>Father/Husband Name-{lead.father_husband_name} {lead.city}</p></div>

                    <div className='col-md-3' ><label style={{color:"blue"}}>Address</label>
                    <p style={{marginTop:"-10px",wordWrap: "break-word", whiteSpace: "normal"}}>{lead.h_no}</p>
                </div>
                <div className='col-md-3'><label>Area/Location</label><p style={{marginTop:"-10px"}}>{lead.area1}</p></div>
                <div className='col-md-2' ><label>City</label><p style={{marginTop:"-10px"}}>{lead.city1}</p></div>
                <div className='col-md-2'><label>State</label><p style={{marginTop:"-10px"}}>{lead.state1}</p></div>
                <div className='col-md-2' ><label>Zip</label><p style={{marginTop:"-10px"}}>{lead.pincode1}</p></div>

                <div className='col-md-4' ><label>Job Title</label>
                    <p style={{marginTop:"-10px"}}>{lead.designation}</p>
                </div>
                <div className='col-md-4'><label>Company/Organisation</label><p style={{marginTop:"-10px"}}>{lead.company_name}</p></div>
             


                </div>



            </div>
        </div>
        <div className='col-md-4' style={{border:"1px solid black"}}>hello welcome</div>
        <div className='col-md-3' style={{border:"1px solid black"}}>hello welcome</div>

      </div>
      
      

    </div>
  )
}

export default Leadsingleview

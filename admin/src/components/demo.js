import axios from "axios";
import React, { useEffect, useState } from "react";
import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
function Fetchdata() {
 
  React.useEffect(()=>{fetchdata()},[])
  const[data,setdata]=useState([]);
  const fetchdata=async(event)=>
  {
    
    try {
      const resp=await axios.get('http://localhost:5000/leadinfo')
      setdata(resp.data.lead)
    } catch (error) {
      console.log(error);
    }
  
  }
 

  const[leadtype,setleadtype]=useState('')

  const fetchdata1=async()=>
    {
      
      try {
        const resp=await axios.get(`http://localhost:5000/viewbyleadtype/${leadtype}`);
        console.log(resp);
        setdata(Array.isArray(resp.data.lead) ? resp.data.lead : [resp.data.lead]);
      } catch (error) {
        console.log(error);
      }
    }
    
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        fetchdata1();
      }
    };
  return ( 
    <div>
      <Header1/>
      <Sidebar1/>
      <div style={{marginTop:"80px",paddingLeft:"80px",backgroundColor:"white",display:"flex",paddingTop:"10px",paddingBottom:"10px"}}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLBAZLujfUSZGF-RIGxwm-s8day7ATTRPrrQ&s" style={{height:"30px"}}/>
        <h3 style={{marginLeft:"10px"}}>Leads</h3>
        <button className="form-control" style={{width:"200px",marginLeft:"10px"}}>Select Team</button>
        <button className="form-control" style={{width:"300px",marginLeft:"10px"}}>Select Sales Manager</button>
      </div>
      <div style={{marginTop:"10px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px"}}>
        <div style={{width:"250px",padding:"10px",borderRadius:"0 25px 25px 0",}}>
          <h6>INCOMING</h6>
          <p>100</p>
        </div>
        <div style={{width:"250px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
          <h6>PROSPECT</h6>
          <p>1</p>
        </div>
        <div style={{width:"250px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
          <h6>OPPORTUNITY</h6>
          <p>50</p>
        </div>
        <div style={{width:"250px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
          <h6>NEGOTIATION</h6>
          <p>15</p>
        </div>
        <div style={{width:"250px",borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            CLOSED
        </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
        </div>  
      </div>
      <div style={{marginTop:"10px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px",paddingTop:"10px"}}>
          <input type="checkbox" style={{width:"20px"}}></input>
          <input type="text" className="form-control" style={{width:"300px"}}placeholder="Type to filter by deal name" onChange={(e)=>setleadtype(e.target.value)} onKeyDown={handleKeyPress} ></input>
          <img src="https://static.vecteezy.com/system/resources/previews/026/640/053/original/search-icon-isolated-on-white-background-creative-modern-logo-vector.jpg" style={{marginLeft:"-80px",height:"40px",marginTop:"4px"}}/>
          </div>

      <div style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white"}}>
    <table style={{textAlign:"center"}}>
      <thead style={{textAlign:"center",fontWeight:"bold"}}>
        <tr >
          <td style={{border:"1px solid black",width:"30px"}}>#</td>
          <td style={{border:"1px solid black",width:"200px"}}>Personal Details</td>
          <td style={{border:"1px solid black",width:"100px"}}>Source</td>
          <td style={{border:"1px solid black",width:"150px"}}>Channel Partner</td>
          <td style={{border:"1px solid black",width:"150px"}}>Team</td>
          <td style={{border:"1px solid black",width:"150px"}}>Owner</td>
          <td style={{border:"1px solid black",width:"150px"}}>Stage</td>
          <td style={{border:"1px solid black",width:"150px"}}>Lead-Type</td>
          <td style={{border:"1px solid black",width:"150px"}}>campaign</td>
        </tr>
      </thead>
      <tbody>
        
          {
            data.map((item,index)=>
            (
              <tr>
              <td style={{border:"1px solid black",width:"30px"}}>{index+1}</td>
              <td style={{border:"1px solid black",width:"200px"}}><span style={{color:"blue"}}>{item.title}{item.first_name}{item.last_name}</span><br></br>
              <span style={{color:"green"}}>Mobile:{item.mobile_no}<br></br></span>
              <span style={{color:"orange"}}>Email:{item.email}</span>
              </td>
              <td style={{border:"1px solid black",width:"100px"}}>{item.source}</td>
          <td style={{border:"1px solid black",width:"150px"}}>{item.channel_partner}</td>
          <td style={{border:"1px solid black",width:"150px"}}>{item.team}</td>
          <td style={{border:"1px solid black",width:"150px"}}>{item.owner}</td>
          <td style={{border:"1px solid black",width:"150px"}}>{item.stage}</td>
          <td style={{border:"1px solid black",width:"150px"}}>{item.lead_type}</td>
          <td style={{border:"1px solid black",width:"150px"}}>{item.campaign}</td>
              </tr>
            )
            )
          }
        
      </tbody>
    </table>

      </div>

   </div>
    
   );
}

export default Fetchdata;
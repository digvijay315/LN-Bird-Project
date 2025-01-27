import React, { useEffect } from 'react'
import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import { useLocation } from 'react-router-dom';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import api from "../api";

function Leadsingleview() {


  

    const location=useLocation()
    const lead=location.state || {}

    const[documents,setdouments]=useState([])

    useEffect(() => {
      if (lead && lead.document_name && lead.document_no && lead.document_pic) {
        // Merging the arrays together
        const mergedDocuments = lead.document_name.map((name, index) => ({
          name,
          number: lead.document_no[index],
          pic: lead.document_pic[index]
        }));
        setdouments(mergedDocuments);
      }
    }, [lead]);
  
    const[deal,setdeal]=useState([])
    const viewdeal=async()=>
    {
      const resp=await api.get('viewdeal')
      setdeal(resp.data.deal)
      try {
        
      } catch (error) {
        console.log(error);
        
      }
    }
    useEffect(()=>
    {
      viewdeal()
    },[])

    const[filterdeal,setfilterdeal]=useState([])
    

  React.useEffect(() => {
    if (deal.length > 0) {
     
        const price1 = lead.budget_min;
        const price2 = lead.budget_max;
        const requirment = lead.requirment === 'Buy' ? 'Sale' : lead.requirment;
  
        // Filter leads based on the current deal's criteria
        const filterdeals = deal.filter(
          (item) =>
            item.available_for === requirment &&
            item.expected_price >= parseFloat(price1) &&
            item.expected_price <= parseFloat(price2)
        );
      
        
       setfilterdeal(filterdeals)
   
      
    }
  }, [deal]);

 
  

    const formattedDate = new Date(lead.lastcommunication).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      

      const allColumns = [
        { id: 'sno', name: '#' },
        { id: 'house_details', name: 'House Details' },
        { id: 'contact', name: 'Contact' },
        { id: 'available_from', name: 'Available From' },
      ];
      const allColumnsdocuments = [
        { id: 'sno', name: '#' },
        { id: 'document_name', name: 'Document Name' },
        { id: 'document_no', name: 'Document No.' },
        { id: 'document_pic', name: 'View' },
      ];
  
      const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
          lineHeight:"15px"
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
      
     
      const [isTableVisible, setIsTableVisible] = useState(false);

      // Function to toggle the visibility of the table
      const toggleTableVisibility = () => {
        setIsTableVisible(prevState => !prevState);
      };

      const [isTableVisible1, setIsTableVisible1] = useState(false);

      // Function to toggle the visibility of the table
      const toggleTableVisibility1 = () => {
        setIsTableVisible1(prevState => !prevState);
      };

      
      const [isTableVisible2, setIsTableVisible2] = useState(false);

      // Function to toggle the visibility of the table
      const toggleTableVisibility2 = () => {
        setIsTableVisible2(prevState => !prevState);
      };

      
      const [isTableVisible3, setIsTableVisible3] = useState(false);

      // Function to toggle the visibility of the table
      const toggleTableVisibility3 = () => {
        setIsTableVisible3(prevState => !prevState);
      };


      const[sitevisitdata,setsitevisitdata]=useState([])
      const sitevisit=async()=>
      {
        try {
            const resp=await api.get('viewsitevisit')
            setsitevisitdata(resp.data.sitevisit)
            
        } catch (error) {
            console.log(error);
            
        }
      }

      const[meetingdata,setmeetingdata]=useState([])
      const meeting=async()=>
      {
        try {
            const resp=await api.get('viewmeetingtask')
            setmeetingdata(resp.data.meetingtask)
            
        } catch (error) {
            console.log(error);
            
        }
      }

      const[maildata,setmaildata]=useState([])
      const mail=async()=>
      {
        try {
            const resp=await api.get('viewmailtask')
            setmaildata(resp.data.mail_task)
            
        } catch (error) {
            console.log(error);
            
        }
      }

      const[calldata,setcalldata]=useState([])
      const call=async()=>
      {
        try {
            const resp=await api.get('viewcalltask')
            setcalldata(resp.data.call_task)
            
        } catch (error) {
            console.log(error);
            
        }
      }
      useEffect(()=>
    {
        sitevisit()
        meeting()
        mail()
        call()
    },[])


    const[matchsitevisitdata,setmatchsitevisitdata]=useState([])
    const matchLeadData = (site) => {
        const [title, firstName, lastName] = site.lead.split(" "); // Split full name into title, first name, last name
      
        if (
          lead.title === title &&
          lead.first_name === firstName &&
          lead.last_name === lastName
        ) {
            setmatchsitevisitdata((prevData) => [...prevData, site]);
        }
      };




    useEffect(() => {
        if (sitevisitdata.length > 0) {
          sitevisitdata.forEach((site) => {
            if (site.lead) {
              // Now only need to match directly with site.lead
              matchLeadData(site);  // Assuming site contains lead.title, lead.first_name, lead.last_name
            }
          });
        }
      }, [sitevisitdata]);

      const[matchmeetingdata,setmatchmeetingdata]=useState([])
      const matchleaddatawithmeeting = (meeting) => {
          const [title, firstName, lastName] = meeting.lead.split(" "); // Split full name into title, first name, last name
        
          if (
            lead.title === title &&
            lead.first_name === firstName &&
            lead.last_name === lastName
          ) {
            setmatchmeetingdata((prevData) => [...prevData, meeting]);
          }
        };
  
  
  
  
      useEffect(() => {
          if (meetingdata.length > 0) {
            meetingdata.forEach((meeting) => {
              if (meeting.lead) {
                // Now only need to match directly with site.lead
                matchleaddatawithmeeting(meeting);  // Assuming site contains lead.title, lead.first_name, lead.last_name
              }
            });
          }
        }, [meetingdata]);

        const[matchmaildata,setmatchmaildata]=useState([])
        const matchmaildatawithlead = (mail) => {
            // const [title, firstName, lastName] = meeting.lead.split(" "); // Split full name into title, first name, last name
          
            if (
              lead.title === mail.title2 &&
              lead.first_name === mail.first_name &&
              lead.last_name === mail.last_name
            ) {
                setmatchmaildata((prevData) => [...prevData, mail]);
            }
          };
    
    
    
    
        useEffect(() => {
            if (maildata.length > 0) {
              maildata.forEach((mail) => {
               
                  // Now only need to match directly with site.lead
                  matchmaildatawithlead(mail);  // Assuming site contains lead.title, lead.first_name, lead.last_name
                
              });
            }
          }, [maildata]);
    

          const[matchcalldata,setmatchcalldata]=useState([])
          const matchcalldatawithlead = (call) => {
               const [title, firstName, lastName] = call.lead.split(" "); // Split full name into title, first name, last name
            
              if (
                lead.title === title &&
                lead.first_name === firstName &&
                lead.last_name === lastName
              ) {
                setmatchcalldata((prevData) => [...prevData, call]);
              }
            };
      
      
      
      
          useEffect(() => {
              if (calldata.length > 0) {
                calldata.forEach((call) => {
                 
                    // Now only need to match directly with site.lead
                    matchcalldatawithlead(call);  // Assuming site contains lead.title, lead.first_name, lead.last_name
                  
                });
              }
            }, [maildata]);

          


            const [imagePreview, setImagePreview] = useState(null);
            const [openPreview, setOpenPreview] = useState(false);
          
            const handlePreviewClick = (imageUrl) => {
              setImagePreview(imageUrl);
              setOpenPreview(true); // Open the preview modal
            };
          
            const handleClosePreview = () => {
              setOpenPreview(false);
              setImagePreview(null); // Close the modal
            };


            // Add some basic styles for modal
const styles = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    position: 'relative',
  },
  imagePreview: {
    maxWidth: '100%',
    maxHeight: '80vh',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'red',
    color: '#fff',
    border: 'none',
    padding: '5px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
};



      
    
  return (
    <div>

      <Header1/>
      <Sidebar1/>

      {/* <div style={{marginTop:"60px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px"}}>
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
        
      </div> */}
      

      <div className='row' style={{display:"flex",height:"100%",marginLeft:"60px",width:"100%",gap:"10px",marginTop:"60px",paddingBottom:"50px"}}>
        <div className='col-md-3' style={{padding:"20px",fontSize:"14px",fontFamily:"arial"}}>
            <div style={{display:"flex",}}>
                <h6 style={{fontFamily:"times-new-roman"}}>{lead.title} {lead.first_name} {lead.last_name}
                    <p style={{fontSize:"12px",fontWeight:"normal"}}>{lead.email}</p>
                </h6>
                <h6 style={{marginLeft:"35%"}}>Site Visit</h6>
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

                <div className='col-md-4'><label style={{visibility:"hidden"}}>mobile no</label>
                    <input type='text' className="form-control form-control-sm" style={{fontSize:"11.5px"}} value={lead.mobile_no}></input>
                </div>
                <div className='col-md-3' style={{marginTop:"25px"}}><label>Tags</label><p style={{lineHeight:"0px",fontWeight:"bold"}}>{lead.tags}</p></div>
                <div className='col-md-5'></div>

            

                <div className='col-md-5' style={{marginTop:"50px"}}><label>Owner Sales/Manager</label>
                    <p style={{marginTop:"-10px",fontWeight:"bold"}}>{lead.owner}</p>
                </div>
                <div className='col-md-3' style={{marginTop:"50px"}}><label>Team</label><p style={{marginTop:"-10px",fontWeight:"bold"}}>{lead.team} Team</p></div>
                <div className='col-md-4' style={{marginTop:"50px"}}><label>Time Zone</label><p style={{marginTop:"-10px",fontWeight:"bold"}}>Asia/Kolkata</p></div>


                <div className='col-md-4' style={{marginTop:"0px"}}><label>Recived On</label>
                    <p style={{marginTop:"-10px",fontWeight:"bold"}}>{lead.owner}</p>
                </div>
                <div className='col-md-4' style={{marginTop:"0px"}}><label>Source</label><p style={{marginTop:"-10px",fontWeight:"bold"}}>{lead.campegin} {lead.source}</p></div>
                <div className='col-md-4' style={{marginTop:"0px"}}><label>Last Conduct At</label><p style={{ wordWrap: "break-word", whiteSpace: "normal",marginTop:"-10px",fontWeight:"bold"}}>{formattedDate}</p></div>
                <div className='col-md-12'><hr></hr></div>

                <div className='row' style={{border:"1px solid gray",margin:"10px",width:"100%",borderRadius:"5px",padding:"10px"}}> 
                    <div className='col-md-12' style={{color:"blue",fontWeight:"bold"}}>Requirment To Buy/Rent</div>
                    <div className='col-md-12'><hr></hr></div>
                    <div className='col-md-12'><p style={{fontWeight:"bold"}}>Location-{lead.location} {lead.city}</p></div>

                    <div className='col-md-4' ><label>Property Type</label>
                    <p style={{marginTop:"-10px",wordWrap: "break-word", whiteSpace: "normal",fontWeight:"bold"}}>{lead.property_type}</p>
                </div>
                <div className='col-md-4'><label>Sub Type</label><p style={{marginTop:"-10px",fontWeight:"bold"}}>{lead.sub_type}</p></div>
                <div className='col-md-4' ><label>Unit Type</label><p style={{marginTop:"-10px",fontWeight:"bold",wordWrap: "break-word", whiteSpace: "normal"}}>{lead.unit_type}</p></div>

                <div className='col-md-4' ><label>Budget</label>
                    <p style={{marginTop:"-10px",fontWeight:"bold"}}>{lead.budget_min} to {lead.budget_max}</p>
                </div>
                <div className='col-md-4'><label>Area/Size</label><p style={{marginTop:"-10px",fontWeight:"bold"}}>{lead.minimum_area}{lead.area_metric} to {lead.maximum_area}{lead.area_metric}</p></div>
                <div className='col-md-4' ><label>Furnishing</label><p style={{marginTop:"-10px",fontWeight:"bold"}}>{lead.furnishing}</p></div>

                <div className='col-md-4' ><label>Facing</label>
                    <p style={{marginTop:"-10px",fontWeight:"bold",wordWrap: "break-word", whiteSpace: "normal"}}>{lead.facing}</p>
                </div>
                <div className='col-md-4'><label>Transaction Type</label><p style={{marginTop:"-10px",fontWeight:"bold"}}>{lead.transaction_type}</p></div>
                <div className='col-md-4' ><label>Timeline</label><p style={{marginTop:"-10px",fontWeight:"bold"}}>{lead.timeline}</p></div>

                <div className='col-md-8' ><label>Specific Requirment</label>
                    <p style={{marginTop:"-10px",fontWeight:"bold"}}></p>
                </div>
                
                
                <div className='col-md-4' ><label>Road</label><p style={{marginTop:"-10px",fontWeight:"bold"}}>{lead.road}</p></div>

                </div>

                <div className='row' style={{border:"1px solid gray",borderRadius:"5px",padding:"10px",margin:"10px",width:"100%"}}> 
                    <div className='col-md-12' style={{color:"blue",fontWeight:"bold"}}>Personal Details</div>
                    <div className='col-md-12'><hr></hr></div>
                    <div className='col-md-12'><p style={{fontWeight:"bold"}}>Father/Husband Name-{lead.father_husband_name} {lead.city}</p></div>

                    <div className='col-md-3' ><label>Address</label>
                    <p style={{marginTop:"-10px",wordWrap: "break-word", whiteSpace: "normal",fontWeight:"bold"}}>{lead.h_no}</p>
                </div>
                <div className='col-md-3'><label>Area/Location</label><p style={{marginTop:"-10px",fontWeight:"bold"}}>{lead.area1}</p></div>
                <div className='col-md-2' ><label>City</label><p style={{marginTop:"-10px",fontWeight:"bold"}}>{lead.city1}</p></div>
                <div className='col-md-2'><label>State</label><p style={{marginTop:"-10px",fontWeight:"bold"}}>{lead.state1}</p></div>
                <div className='col-md-2' ><label>Zip</label><p style={{marginTop:"-10px",fontWeight:"bold"}}>{lead.pincode1}</p></div>

                <div className='col-md-4' ><label>Job Title</label>
                    <p style={{marginTop:"-10px",fontWeight:"bold"}}>{lead.designation}</p>
                </div>
                <div className='col-md-4'><label>Company/Organisation</label><p style={{marginTop:"-10px",fontWeight:"bold"}}>{lead.company_name}</p></div>
             


                </div>



            </div>
        </div>
        <div className='col-md-5' style={{padding:"10px"}}>
            <div className='row'>

            <div className="col-md-12"><select className='form-control form-control-sm' style={{border:"none",backgroundColor:" #ffe6e6",backgroundImage: "url('https://p7.hiclipart.com/preview/218/63/773/writing-computer-icons-website-content-writer-reading-download-png-writing-icon.jpg')", backgroundSize: "30px 30px",backgroundRepeat: "no-repeat",backgroundPosition: "left center",paddingLeft: "40px", appearance: 'none',paddingRight: "30px"}}>
                <option>Internal Notes</option>
                <option>External Notes</option>
                </select>
                <div style={{
    position: 'absolute',
    right: '65%',
    top: '15%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none'
  }}>
    <span style={{
      fontSize: '16px', 
      color: '#333', 
      fontWeight: 'bold'
    }}>▼</span> {/* You can replace this with an image or icon */}
  </div>

                <textarea  className='form-control form-control-sm' style={{ position: "relative",height:"100px",backgroundColor:" #ffe6e6",border:"none"}}/></div>
            
            <div className='col-md-7'></div>
            <div className='col-md-3' style={{position: 'absolute', top: '100px',marginLeft:"60%",transition: 'background-color 0.3s ease'}} onMouseOver={(e) => e.target.style.backgroundColor = '#2196F3'} // On hover, change color to blue
                 onMouseOut={(e) => e.target.style.backgroundColor = ' #ffe6e6'}><button className='form-control form-control-sm' style={{backgroundColor:" #ffe6e6",border:"none"}}>Cancel</button></div>
            <div className='col-md-2' style={{position: 'absolute', top: '100px',marginLeft:"80%",transition: 'background-color 0.3s ease'}}    onMouseOver={(e) => e.target.style.backgroundColor = '#2196F3'} // On hover, change color to blue
                 onMouseOut={(e) => e.target.style.backgroundColor = ' #ffe6e6'}><button className='form-control form-control-sm' style={{backgroundColor:" #ffe6e6",border:"none"}}>Add</button></div>

            <div className='col-md-12' style={{marginTop:"20px"}}><input type='checkbox'></input><span>show on primary contact</span></div>

            <div style={{ display: "flex",fontSize:"14px",marginTop:"10px" }}>


    <p style={{marginLeft: "10px" }}>Displaying</p>
    <select
      className="form-control form-control-sm"
      style={{
        border: "none",
        backgroundColor: "transparent",
        fontSize: "12px",
      fontWeight:"bold",
      marginTop:"-8px"
      }}
    >
      <option>all activity</option>
      <option>contact activity</option>
      <option>lead activity</option>
    </select>


 
    <p style={{marginBottom: "0" }}>By</p>
    <select
      className="form-control form-control-sm"
      style={{
        border: "none",
        backgroundColor: "transparent",
        fontSize: "12px",
        fontWeight:"bold",
         marginTop:"-8px"
      
      }}
    >
      <option>everyone</option>
      <option>contact activity</option>
      <option>lead activity</option>
    </select>
  


    <p style={{marginBottom: "0", whiteSpace: "nowrap" }}>Related to</p>
    <select
      className="form-control form-control-sm"
      style={{
        border: "none",
        backgroundColor: "transparent",
        fontSize: "12px",
    fontWeight:"bold",
     marginTop:"-8px",
      width:"80px"
      }}
    >
      <option>all</option>
      <option>contact activity</option>
      <option>lead activity</option>
    </select>


 
    <p style={{marginBottom: "0" }}>Tagged</p>
    <select
      className="form-control form-control-sm"
      style={{
        border: "none",
        backgroundColor: "transparent",
        fontSize: "12px",
       fontWeight:"bold",
        marginTop:"-8px",
        marginRight:"20px",
        width:"80px"
      }}
    >
      <option>any</option>
      <option>contact activity</option>
      <option>lead activity</option>
    </select>
 
</div>



{
    matchsitevisitdata && matchsitevisitdata.length>0 && (
        <div className='col-md-10' style={{border:"1px solid black",borderRadius:"5px",width:"100%",marginLeft:"20px",padding:"10px"}}>
        <p style={{fontWeight:"bold"}}><img src='https://cdn-icons-png.freepik.com/256/4315/4315445.png?semt=ais_hybrid' style={{height:"20px",marginRight:"10px"}}></img>Site Visit:</p>
        <ul style={{marginLeft:"10px"}}>
            {matchsitevisitdata.map((item, index) => (
            <li key={index} style={{ listStyleType: "disc", paddingLeft: "10px",fontSize:"14px",fontFamily:"times-new-roman" }}>
                {item.title}
            </li>
            ))}
        </ul>

    </div>
    )
}
            
                <div className='col-md-2'></div>

                {
                matchmeetingdata && matchmeetingdata.length>0 && (
                    <div className='col-md-10' style={{border:"1px solid black",borderRadius:"5px",width:"100%",marginLeft:"20px",padding:"10px",marginTop:"10px"}}>
                    <p style={{fontWeight:"bold"}}><img src='https://cdn-icons-png.freepik.com/256/4315/4315445.png?semt=ais_hybrid' style={{height:"20px",marginRight:"10px"}}></img>Meeting Task:</p>
                    <ul style={{marginLeft:"10px"}}>
                        {matchmeetingdata.map((item, index) => (
                        <li key={index} style={{ listStyleType: "disc", paddingLeft: "10px",fontSize:"14px",fontFamily:"times-new-roman" }}>
                            {item.title}
                        </li>
                        ))}
                    </ul>

                    </div>
                    )
                }
                <div className='col-md-2'></div>

                {
                matchmaildata && matchmaildata.length>0 && (
                    <div className='col-md-10' style={{border:"1px solid black",borderRadius:"5px",width:"100%",marginLeft:"20px",padding:"10px",marginTop:"10px"}}>
                    <p style={{fontWeight:"bold"}}><img src='https://cdn-icons-png.freepik.com/256/4315/4315445.png?semt=ais_hybrid' style={{height:"20px",marginRight:"10px"}}></img>Mail Task:</p>
                    <ul style={{marginLeft:"10px"}}>
                        {matchmaildata.map((item, index) => (
                        <li key={index} style={{ listStyleType: "disc", paddingLeft: "10px",fontSize:"14px",fontFamily:"times-new-roman" }}>
                            {item.title}
                        </li>
                        ))}
                    </ul>

                    </div>
                    )
                }
                <div className='col-md-2'></div>

                {
                matchcalldata && matchcalldata.length>0 && (
                    <div className='col-md-10' style={{border:"1px solid black",borderRadius:"5px",width:"100%",marginLeft:"20px",padding:"10px",marginTop:"10px"}}>
                    <p style={{fontWeight:"bold"}}><img src='https://cdn-icons-png.freepik.com/256/4315/4315445.png?semt=ais_hybrid' style={{height:"20px",marginRight:"10px"}}></img>Call Task:</p>
                    <ul style={{marginLeft:"10px"}}>
                        {matchcalldata.map((item, index) => (
                        <li key={index} style={{ listStyleType: "disc", paddingLeft: "10px",fontSize:"14px",fontFamily:"times-new-roman" }}>
                            {item.title}
                        </li>
                        ))}
                    </ul>

                    </div>
                    )
                }
                <div className='col-md-2'></div>

                <div className='col-md-10' style={{border:"1px solid black",borderRadius:"5px",height:"100px",width:"100%",marginLeft:"20px",marginTop:"20px",backgroundColor:" #ffe6e6"}}></div>
                <div className='col-md-2'></div>

                <div className='col-md-12' style={{marginTop:"10px"}}>
                    <p>Manually Created - Lead Created</p>
                </div>

            </div>

        </div>
        <div className='col-md-3' style={{padding:"10px"}}>

        <div className='row'>

        <div className='col-md-12' style={{fontWeight:"bold",fontFamily:"times-new-roman"}}> Deal Match
        <span 
          onClick={toggleTableVisibility} 
          style={{ 
            position:"absolute",
            cursor: "pointer", 
            right: "50px", 
            fontSize: "20px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            transform: isTableVisible ? 'rotate(180deg)' : 'rotate(0deg)', // Rotate the arrow based on state
            marginTop: "0px", // Align the arrow properly
           
          }}
        >
          ▼
        </span>
        <span 
         
          style={{ 
            position:"absolute",
            cursor: "pointer", 
            right: "20px", 
            fontSize: "30px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            marginTop: "-7px", // Align the arrow properly
            fontWeight:"lighter"
    
          }}
        >
          +
        </span>
        </div>

        <div style={{backgroundColor:"white",marginTop:"10px",position:"sticky",zIndex:10,marginLeft:"20px",height: isTableVisible ? "400px" : "0",overflow: "hidden",transition: "height 0.3s ease",overflowY:"scroll",overflowX:"scroll"}}>
      <TableContainer component={Paper} style={{ maxHeight: '700px', overflow: 'auto' }}>
    <Table sx={{}} aria-label="customized table">
      <TableHead style={{ position: "sticky", top: 0, zIndex: 10,backgroundColor:"white" }}>
        <TableRow >
          {allColumns.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{ fontFamily: "times new roman", cursor: 'pointer' }}
            >
              {col.name}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
       <tbody>
        {
         
        filterdeal.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
              {index + 1}
            </StyledTableCell>
            <StyledTableCell>
              {item.unit_number}
            </StyledTableCell>
            <StyledTableCell>
  {item.owner_details ? (
    item.owner_details.map((owner, index) => (
      <div key={index}>
        {owner.mobile_no.map((mobile, mobileIndex) => (
          <div key={mobileIndex}>{mobile}</div> 
        ))}
        <div>{owner.title} {owner.first_name} {owner.last_name}</div> 
      </div>
    ))
  ) : (
    'No Details Available' // Fallback if no owner details exist
  )}
</StyledTableCell>

          </StyledTableRow>
        ))}
      </tbody> 
    </Table>
  </TableContainer>

  </div>

  <div className='col-md-12' style={{fontWeight:"bold",fontFamily:"times-new-roman"}}> Inventories
        <span 
          onClick={toggleTableVisibility1} 
          style={{ 
            position:"absolute",
            cursor: "pointer", 
            right: "50px", 
            fontSize: "20px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            transform: isTableVisible1 ? 'rotate(180deg)' : 'rotate(0deg)', // Rotate the arrow based on state
            marginTop: "0px", // Align the arrow properly
          }}
        >
          ▼
        </span>
        <span 
         
          style={{ 
            position:"absolute",
            cursor: "pointer", 
            right: "20px", 
            fontSize: "30px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            marginTop: "-7px", // Align the arrow properly
      fontWeight:"lighter"
          }}
        >
          +
        </span>
        </div>

        <div style={{backgroundColor:"white",marginTop:"10px",position:"sticky",zIndex:10,marginLeft:"20px",height: isTableVisible1 ? "200px" : "0",overflow: "hidden",transition: "height 0.3s ease"}}>
         
        <TableContainer component={Paper} style={{ maxHeight: '700px', overflow: 'auto' }}>
    <Table sx={{}} aria-label="customized table">
      <TableHead style={{ position: "sticky", top: 0, zIndex: 10,backgroundColor:"white" }}>
        <TableRow >
          {allColumns.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{ fontFamily: "times new roman", cursor: 'pointer' }}
            >
              {col.name}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      {/* <tbody>
        {
         
        currentItems.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
              <input 
                type="checkbox"
                checked={selectedItems.includes(item._id)}
                onChange={() => handleRowSelect(item._id)}
              />
              {index + 1}
            </StyledTableCell>

            <StyledTableCell style={{ fontFamily: "times new roman" }}>
              
            </StyledTableCell>
            <StyledTableCell 
              style={{ padding: "10px", cursor: "pointer", fontFamily: "times new roman" }} 
              onClick={() => leadsingleview(item)}
            >
              {item.title} {item.first_name} {item.last_name}
              <br />
              <SvgIcon component={PhoneIphoneIcon} />
              <span>{item.mobile_no}</span>
              <br />
              <SvgIcon component={EmailIcon} />
              <span>{item.email}</span>
            </StyledTableCell>
            {visibleColumns
              .filter((col) => col.id !== 'personaldetails' && col.id !== 'sno' && col.id !== 'score')
              .map((col) => (
                <StyledTableCell 
                  key={col.id} 
                  style={{ padding: "10px", fontFamily: "times new roman" }}
                >
                   {col.id === 'budget' 
                    ?(
                      <>
                       ₹{item.budget_min} <br></br>  ₹{item.budget_max} 
                       </>
                    )
                    :col.id === 'requirment' 
                    ?(
                      <>
                     
                       {item.requirment}  {item.property_type}  <br></br>  
                       {item.sub_type}  <br></br>  {item.unit_type}
                       </>
                    ): col.id === 'location' 
                    ?(
                      <>
                      {item.area2}  <br></br> 
                      {item.block} <br></br> 
                       {item.city2}  {item.location2}  <br></br> 
                       {item.state2} {item.country2}  {item.pincode2} 
                        
                       </>
                    ): col.id === 'stage' 
                    ?(
                      <>
                      {item.stage} <br />
                      <span 
                        style={{
                          color: item.lead_type === 'Hot' ? 'red' :
                                 item.lead_type === 'Warm' ? 'blue' : 
                                 item.lead_type === 'Cold' ? 'green' : 'black'
                        }}
                      >
                        {item.lead_type}
                      </span>
                    </>
                    ):  col.id === "owner" ? (
                      <>
                        {item.owner.map((owner, index) => (
                          <span key={index}>
                            {owner} ({item.team || ""})
                            <br />
                          </span>
                        ))}
                      </>
                    ) : col.id === "lastcommunication" ? (
                      item[col.id] ? formatRelativeDate(item[col.id]) : "No communication yet" // Format last communication
                    ) :col.id === "createdAt" ? (
                      formatDate(item[col.id]) // Format createdAt date
                    ):  item[col.id]}
                </StyledTableCell>
              ))}
          </StyledTableRow>
        ))}
      </tbody> */}
    </Table>
  </TableContainer>
        </div>


        <div className='col-md-12' style={{fontWeight:"bold",fontFamily:"times-new-roman"}}> Tasks
        <span 
          onClick={toggleTableVisibility2} 
          style={{ 
            position:"absolute",
            cursor: "pointer", 
            right: "50px", 
            fontSize: "20px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            transform: isTableVisible2 ? 'rotate(180deg)' : 'rotate(0deg)', // Rotate the arrow based on state
            marginTop: "0px", // Align the arrow properly
          }}
        >
          ▼
        </span>
        <span 
         
          style={{ 
            position:"absolute",
            cursor: "pointer", 
            right: "20px", 
            fontSize: "30px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            marginTop: "-7px", // Align the arrow properly
      fontWeight:"lighter"
          }}
        >
          +
        </span>
        </div>

        <div style={{backgroundColor:"white",marginTop:"10px",position:"sticky",zIndex:10,marginLeft:"20px",height: isTableVisible2 ? "200px" : "0",overflow: "hidden",transition: "height 0.3s ease"}}>
         
        <TableContainer component={Paper} style={{ maxHeight: '700px', overflow: 'auto' }}>
    <Table sx={{}} aria-label="customized table">
      <TableHead style={{ position: "sticky", top: 0, zIndex: 10,backgroundColor:"white" }}>
        <TableRow >
          {allColumns.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{ fontFamily: "times new roman", cursor: 'pointer' }}
            >
              {col.name}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      {/* <tbody>
        {
         
        currentItems.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
              <input 
                type="checkbox"
                checked={selectedItems.includes(item._id)}
                onChange={() => handleRowSelect(item._id)}
              />
              {index + 1}
            </StyledTableCell>

            <StyledTableCell style={{ fontFamily: "times new roman" }}>
              
            </StyledTableCell>
            <StyledTableCell 
              style={{ padding: "10px", cursor: "pointer", fontFamily: "times new roman" }} 
              onClick={() => leadsingleview(item)}
            >
              {item.title} {item.first_name} {item.last_name}
              <br />
              <SvgIcon component={PhoneIphoneIcon} />
              <span>{item.mobile_no}</span>
              <br />
              <SvgIcon component={EmailIcon} />
              <span>{item.email}</span>
            </StyledTableCell>
            {visibleColumns
              .filter((col) => col.id !== 'personaldetails' && col.id !== 'sno' && col.id !== 'score')
              .map((col) => (
                <StyledTableCell 
                  key={col.id} 
                  style={{ padding: "10px", fontFamily: "times new roman" }}
                >
                   {col.id === 'budget' 
                    ?(
                      <>
                       ₹{item.budget_min} <br></br>  ₹{item.budget_max} 
                       </>
                    )
                    :col.id === 'requirment' 
                    ?(
                      <>
                     
                       {item.requirment}  {item.property_type}  <br></br>  
                       {item.sub_type}  <br></br>  {item.unit_type}
                       </>
                    ): col.id === 'location' 
                    ?(
                      <>
                      {item.area2}  <br></br> 
                      {item.block} <br></br> 
                       {item.city2}  {item.location2}  <br></br> 
                       {item.state2} {item.country2}  {item.pincode2} 
                        
                       </>
                    ): col.id === 'stage' 
                    ?(
                      <>
                      {item.stage} <br />
                      <span 
                        style={{
                          color: item.lead_type === 'Hot' ? 'red' :
                                 item.lead_type === 'Warm' ? 'blue' : 
                                 item.lead_type === 'Cold' ? 'green' : 'black'
                        }}
                      >
                        {item.lead_type}
                      </span>
                    </>
                    ):  col.id === "owner" ? (
                      <>
                        {item.owner.map((owner, index) => (
                          <span key={index}>
                            {owner} ({item.team || ""})
                            <br />
                          </span>
                        ))}
                      </>
                    ) : col.id === "lastcommunication" ? (
                      item[col.id] ? formatRelativeDate(item[col.id]) : "No communication yet" // Format last communication
                    ) :col.id === "createdAt" ? (
                      formatDate(item[col.id]) // Format createdAt date
                    ):  item[col.id]}
                </StyledTableCell>
              ))}
          </StyledTableRow>
        ))}
      </tbody> */}
    </Table>
  </TableContainer>
        </div>

        <div className='col-md-12' style={{fontWeight:"bold",fontFamily:"times-new-roman"}}> Documents
        <span 
          onClick={toggleTableVisibility3} 
          style={{ 
            position:"absolute",
            cursor: "pointer", 
            right:  "50px", 
            fontSize: "20px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            transform: isTableVisible3 ? 'rotate(180deg)' : 'rotate(0deg)', // Rotate the arrow based on state
            marginTop: "0px", // Align the arrow properly
          }}
        >
          ▼
        </span>
        <span 
         
          style={{ 
            cursor: "pointer", 
            position:"absolute",
            right: "20px", 
            fontSize: "30px", 
            display: "inline-block", 
            transition: "transform 0.3s ease", // Smooth transition for rotation
            marginTop: "-7px", // Align the arrow properly
      fontWeight:"lighter"
          }}
        >
          +
        </span>
        </div>

        <div style={{backgroundColor:"white",marginTop:"10px",position:"sticky",zIndex:10,marginLeft:"20px",height: isTableVisible3 ? "200px" : "0",overflow: "hidden",transition: "height 0.3s ease"}}>
         
        <TableContainer component={Paper} style={{ maxHeight: '700px', overflow: 'auto' }}>
    <Table sx={{}} aria-label="customized table">
      <TableHead style={{ position: "sticky", top: 0, zIndex: 10,backgroundColor:"white" }}>
        <TableRow >
          {allColumnsdocuments.map((col) => (
            <StyledTableCell
              key={col.id}
              style={{ fontFamily: "times new roman", cursor: 'pointer' }}
            >
              {col.name}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <tbody>
        {
        
        documents.map ((item, index) => (
          <StyledTableRow key={index}>
            <StyledTableCell style={{ fontFamily: "times new roman" }}>
              {index + 1}
            </StyledTableCell>
        <StyledTableCell>
          {item.name}
        </StyledTableCell>
        <StyledTableCell>
          {item.number}
        </StyledTableCell>
        <StyledTableCell>
              {/* Eye button to trigger image preview */}
              <button onClick={() => handlePreviewClick(item.pic)}>
                👁️ {/* You can replace this with an icon */}
              </button>
        </StyledTableCell>
          
          </StyledTableRow>
        ))}
      </tbody>

       {/* Modal or Image Preview */}
       {openPreview && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <img src={imagePreview} alt="Preview" style={styles.imagePreview} />
            <button onClick={handleClosePreview} style={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}


    </Table>
  </TableContainer>
        </div>



        </div>

        </div>

      </div>
      
      

    </div>
  )
}

export default Leadsingleview

import axios from "axios";
import React, { useEffect, useState } from "react";
import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import { toast, ToastContainer } from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from "react-router-dom";
import { utils, writeFile } from "xlsx";

function Leadfetch() {
  const countrycode=["Afghanistan +93","Aland Islands +358","Albania +355","Algeria +213","American Samoa +1684","Andorra +376",
    "Angola +244","Anguilla +1264","Antarctica +672","Antigua and Barbuda +1268","Argentina +54","Armenia +374",
    "Aruba +297","Australia +61","Austria +43","Azerbaijan +994","Bahamas +1242","Bahrain +973","Bangladesh +880",
    "Barbados +1246","Belarus +375","Belgium +32","Belize +501","Benin +229","Bermuda +1441","Bhutan +975",
    "Bolivia +591","Bonaire, Sint Eustatius and Saba +599","Bosnia and Herzegovina +387","Botswana +267",
    "Bouvet Island +55","Brazil +55","British Indian Ocean Territory +246","Brunei Darussalam +673","Bulgaria +359",
    "Burkina Faso +226","Burundi +257","Cambodia +855","Cameroon +237","Canada +1","Cape Verde +238","Cayman Islands +1345",
    "Central African Republic +236","Chad +235","Chile +56","China +86","Christmas Island +61","Cocos (Keeling) Islands +672",
    "Colombia +57","Comoros +269","Congo +242","Congo, Democratic Republic of the Congo +242","Cook Islands +682",
    "Costa Rica +506","Cote D'Ivoire +225","Croatia +385","Cuba +53","Curacao +599","Cyprus +357","Czech Republic +420",
    "Denmark +45","Djibouti +253","Dominica +1767","Dominican Republic +1809","Ecuador +593","Egypt +20",
    "El Salvador +503","Equatorial Guinea +240","Eritrea +291","Estonia +372","Ethiopia +251","Falkland Islands (Malvinas) +500",
    "Faroe Islands +298","Fiji +679","Finland +358","France +33","French Guiana +594","French Polynesia +689",
    "French Southern Territories +262","Gabon +241","Gambia +220","Georgia +995","Germany +49","Ghana +233","Gibraltar +350",
    "Greece +30","Greenland +299","Grenada +1473","Guadeloupe +590","Guam +1671","Guatemala +502","Guernsey +44",
    "Guinea +224","Guinea-Bissau +245","Guyana +592","Haiti +509","Holy See (Vatican City State) +39","Honduras +504",
    "Hong Kong +852","Hungary +36","Iceland +354","India +91","Indonesia +62","Iran, Islamic Republic of +98","Iraq +964",
    "Ireland +353","Isle of Man +44","Israel +972","Italy +39","Jamaica +1876","Japan +81","Jersey +44","Jordan +962",
    "Kazakhstan +7","Kenya +254","Kiribati +686","Korea Democratic People's Republic of +850","Korea Republic of +82","Kosovo +383",
    "Kuwait +965","Kyrgyzstan +996","Lao People's Democratic Republic +856","Latvia +371","Lebanon +961","Lesotho +266",
    "Liberia +231","Libyan Arab Jamahiriya +218","Liechtenstein +423","Lithuania +370","Luxembourg +352","Macao +853",
    "Macedonia, the Former Yugoslav Republic of +389","Madagascar +261","Malawi +265","Malaysia +60","Maldives +960",
    "Mali +223","Malta +356","Marshall Islands +692","Martinique +596","Mauritania +222","Mauritius +230","Mayotte +262",
    "Mexico +52","Micronesia, Federated States of +691","Moldova, Republic of +373","Monaco +377","Mongolia +976",
    "Montenegro +382","Montserrat +1664","Morocco +212","Mozambique +258","Myanmar +95","Namibia +264","Nauru +674",
    "Nepal +977","Netherlands +31","Netherlands Antilles +599","New Caledonia +687","New Zealand +64","Nicaragua +505",
    "Niger +227","Nigeria +234","Niue +683","Norfolk Island +672","Northern Mariana Islands +1670","Norway +47",
    "Oman +968","Pakistan +92","Palau +680","Palestinian Territory, Occupied +970","Panama +507","Papua New Guinea +675",
    "Paraguay +595","Peru +51","Philippines +63","Pitcairn +64","Poland +48","Portugal +351","Puerto Rico +1787",
    "Qatar +974","Reunion +262","Romania +40","Russian Federation +7","Rwanda +250","Saint Barthelemy +590",
    "Saint Helena +290","Saint Kitts and Nevis +1869","Saint Lucia +1758","Saint Martin +590","Saint Pierre and Miquelon +508",
    "Saint Vincent and the Grenadines +1784","Samoa +684","San Marino +378","Sao Tome and Principe +239","Saudi Arabia +966",
    "Senegal +221","Serbia +381","Serbia and Montenegro +381","Seychelles +248","Sierra Leone +232","Singapore +65",
    "Sint Maarten +721","Slovakia +421","Slovenia +386","Solomon Islands +677","Somalia +252","South Africa +27",
    "South Georgia and the South Sandwich Islands +500","South Sudan +211","Spain +34","Sri Lanka +94","Sudan +249",
    "Suriname +597","Svalbard and Jan Mayen +47","Swaziland +268","Sweden +46","Switzerland +41","Syrian Arab Republic +963",
    "Taiwan, Province of China +886","Tajikistan +992","Tanzania, United Republic of +255","Thailand +66","Timor-Leste +670",
    "Togo +228","Tokelau +690","Tonga +676","Trinidad and Tobago +1868","Tunisia +216","Turkey +90","Turkmenistan +7370",
    "Turks and Caicos Islands +1649","Tuvalu +688","Uganda +256","Ukraine +380","United Arab Emirates +971",
    "United Kingdom +44","United States +1","United States Minor Outlying Islands +1","Uruguay +598","Uzbekistan +998",
    "Vanuatu +678","Venezuela +58","Viet Nam +84","Virgin Islands, British +1284","Virgin Islands, U.s. +1340",
    "Wallis and Futuna +681","Western Sahara +212","Yemen +967","Zambia +260","Zimbabwe +263"]

      const navigate=useNavigate();


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

    const deletelead=(item)=>
    {
      try {
        const id=item._id
        const resp=axios.delete(`http://localhost:5000/removelead/${id}`)
        toast.success("lead deleted successfully")
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    }
  {/*-------------------pagination code---------------------------pagination code------------------------------------pagination code*/}
  // const items=document.getElementById("viewitems").value;
  // if(!items)
  // {
    
  // }
  const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState('5');
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    const renderPageNumbers = () => {
      return Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
        <button key={number} onClick={() => paginate(number)} style={{width:"30px",borderRadius:"5px"}}>
          {number}
        </button>
      ));
    };
    {/*-------------------pagination code end---------------------------pagination code end------------------------------------pagination code end*/}
    
    
    {/*-------------------model and update lead code---------------------------model and update lead code------------------------------------model and update lead code*/}
    const [show1, setshow1] = useState(false);

    const handleClose1 = () => setshow1(false);
    const[data1,setdata1]=useState([])
    const handleShow1=(item)=>
    {
      setshow1(true);
      setdata1(item)
    }
   
    const[updatedata,setupdatedata]=useState({title:data1.title,first_name:data1.first_name,last_name:data1.last_name,country_code:data1.country_code,mobile_no:data1.mobile_no,mobile_type:data1.mobile_type,
      email:data1.email,email_type:data1.email_type,title_company:data1.title_company,designation:data1.designation,company_name:data1.company_name,tags:data1.tags,
      lead_type:data1.lead_type,descriptions:data1.descriptions,team:data1.team,owner:data1.owner,campaign:data1.campaign,source:data1.source,sub_source:data1.sub_source,
      stage:data1.stage,channel_partner:data1.channel_partner,intrested_project:data1.intrested_project})
    const updatelead=async()=>
    {
      try {
        const id=data1._id
        const resp=await axios.put(`http://localhost:5000/updatelead/${id}`,updatedata)
        toast.success("data updated")
        setTimeout(() => {
          navigate('/lead')
        }, 2000);
        setTimeout(() => {
          handleClose1()
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    }
    {/*-------------------model and update lead code end---------------------------model and update lead code end------------------------------------model and update lead code end*/}
    const exportToExcel = () => {
      const filteredData = data.map(({ first_name, last_name,mobile_no,email,source,channel_partner,team,owner,stage,lead_type,campaign }) => ({ first_name, last_name,mobile_no,email,source,channel_partner,team,owner,stage,lead_type,campaign}));
      // Create a new workbook
      const workbook = utils.book_new();
  
      // Convert data to a worksheet
      const worksheet = utils.json_to_sheet(filteredData);
  
      // Append the worksheet to the workbook
      utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
      // Export the workbook to an Excel file
      writeFile(workbook, "table_data.xlsx");
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
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent",marginLeft:"40%"}}>
            Add Leads
        </button>
            <ul class="dropdown-menu">
              <li><Link to={'/leadinfo'} class="dropdown-item">Add Lead</Link></li>
              <li><Link to={'/leadinfo-personal'}class="dropdown-item">Add Lead(Personal Info)</Link></li>
              <li><Link to={'/leadinfo-requirment'}class="dropdown-item">Add Lead(Requirment)</Link></li>
            </ul>
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
        <div style={{borderTopRightRadius:"10px",borderBottomRightRadius:"10px",padding:"10px"}}>
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{color:"black",backgroundColor:"transparent"}}>
            CLOSED
        </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{marginLeft:"20px",color:"black",backgroundColor:"transparent",width:"150px"}}>
            Filter
        </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">By Email</a></li>
              <li><a class="dropdown-item" href="#">By Mobile No.</a></li>
            </ul>
        </div>  
        
      </div>
      <div style={{marginTop:"10px",backgroundColor:"white",height:"60px",paddingLeft:"80px",display:"flex",gap:"20px",paddingTop:"10px"}}>
          <input type="checkbox" style={{width:"20px"}}></input>
          <input type="text" className="form-control" style={{width:"300px"}}placeholder="Type to filter by deal name" onChange={(e)=>setleadtype(e.target.value)} onKeyDown={handleKeyPress} ></input>
          <img src="https://static.vecteezy.com/system/resources/previews/026/640/053/original/search-icon-isolated-on-white-background-creative-modern-logo-vector.jpg" style={{marginLeft:"-80px",height:"40px",marginTop:"4px"}}/>
          <button className="form-control" onClick={exportToExcel} style={{width:"150px",marginLeft:"800px"}}>Export Data</button>
          </div>

      <div style={{marginLeft:"80px",marginTop:"10px",backgroundColor:"white"}}>
    <table style={{textAlign:"center"}}>
      <thead style={{textAlign:"center",fontWeight:"bold",fontFamily:"sans-serif"}}>
        <tr >
          <td style={{border:"1px solid black",width:"30px"}}>#</td>
          <td style={{border:"1px solid black",width:"200px"}}>Personal Details</td>
          <td style={{border:"1px solid black",width:"100px"}}>Source</td>
          <td style={{border:"1px solid black",width:"150px"}}>Channel Partner</td>
          <td style={{border:"1px solid black",width:"150px"}}>Team</td>
          <td style={{border:"1px solid black",width:"150px"}}>Owner</td>
          <td style={{border:"1px solid black",width:"150px"}}>Stage</td>
          <td style={{border:"1px solid black",width:"150px"}}>Lead-Type</td>
          <td style={{border:"1px solid black",width:"150px"}}>Campaign</td>
          <td style={{border:"1px solid black",width:"150px"}}>Operations</td>
        </tr>
      </thead>
      <tbody>
        
          {
            currentItems.map((item,index)=>
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
          <td style={{border:"1px solid black",width:"150px"}}>
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:"transparent",color:"black"}}>
            Actions
        </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" onClick={()=>handleShow1(item)} style={{cursor:"pointer"}}>Edit</a></li>
              <li><a class="dropdown-item" onClick={()=>deletelead(item)} style={{cursor:"pointer"}}>Delete</a></li>
            </ul>
            </td>
              </tr>
            )
            )
          }
        
      </tbody>
    </table>
    
    <div style={{display:"flex",fontSize:"20px",gap:"10px",justifyContent:"right",paddingRight:"60px", marginTop:"10px"}}>
      {renderPageNumbers()}</div>
      </div>
          <ToastContainer/>
          <Modal show={show1} onHide={handleClose1} size='lg'>
            <Modal.Header>
              <Modal.Title>Update Lead</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div>
            <div>
            <div  style={{width:"100%",marginTop:"-50px"}}>
            <div className="row" >
        <div className="col-12">
            <div className="p-3 py-5">
              
                <div className="d-flex justify-content-between align-items-center experience"><span>Lead Info</span></div><hr></hr>
                <div className="row mt-2">
                    
                    <div className="col-md-3"><label className="labels">Title</label><select className="form-control" required="true" onChange={(e)=>setupdatedata({...updatedata,title:e.target.value})}>
                    <option>{data1.title}</option>
                        <option>Mr.</option>
                        <option>Mrs.</option>
                        <option>Smt.</option>
                        <option>Dr.</option>
                        <option>Er.</option>
                        <option>Sh.</option>
                        <option>col</option>
                        </select>
                        </div>
                    <div className="col-md-4"><label className="labels">Name</label><input type="text" placeholder={data1.first_name} required="true" className="form-control" onChange={(e)=>setupdatedata({...updatedata,first_name:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Surname</label><input type="text" placeholder={data1.last_name} className="form-control" onChange={(e)=>setupdatedata({...updatedata,last_name:e.target.value})}/></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-4"><label className="labels">Country</label><select required="true" className="form-control" onChange={(e)=>setupdatedata({...updatedata,country_code:e.target.value})}>
                    <option value="">{data1.country_code}</option>
                   {
                    countrycode.map(item=>
                    (
                        <option>{item}</option>
                    )
                    )
                   }
                    </select></div>
                    <div className="col-md-5"><label className="labels">Mobile Number</label><input type="text" placeholder={data1.mobile_no} required="true" className="form-control" onChange={(e)=>setupdatedata({...updatedata,mobile_no:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Type</label><select className="form-control" onChange={(e)=>setupdatedata({...updatedata,mobile_type:e.target.value})}>
                    <option>{data1.mobile_type}</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                    <div className="col-md-9"><label className="labels">Email-Address</label><input type="text" placeholder={data1.email} className="form-control"onChange={(e)=>setupdatedata({...updatedata,email:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Type</label><select className="form-control" onChange={(e)=>setupdatedata({...updatedata,email_type:e.target.value})}>
                    <option>{data1.email_type}</option>
                        <option>Personal</option>
                        <option>Office</option>
                        <option>Business</option>
                        </select></div>
                    
                    <div className="col-md-4"><label className="labels">Title & Company</label><input type="text" placeholder={data1.title_company} className="form-control" onChange={(e)=>setupdatedata({...updatedata,title_company:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Designation</label><input type="text" placeholder={data1.designation} className="form-control" onChange={(e)=>setupdatedata({...updatedata,designation:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Company Name</label><input type="text" placeholder={data1.company_name} className="form-control" onChange={(e)=>setupdatedata({...updatedata,company_name:e.target.value})}/></div>
                    
                    <div className="col-md-8"><label className="labels">Tags</label><input type="text" placeholder={data1.tags} className="form-control" onChange={(e)=>setupdatedata({...updatedata,tags:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Lead Type</label>
                    <select className="form-control" onChange={(e)=>setupdatedata({...updatedata,lead_type:e.target.value})}>
                    <option>{data1.lead_type}</option>
                        <option>Hot</option>
                        <option>Warm</option>
                        <option>Cold</option>
                        </select>
                    </div>
                    <div className="col-md-10"><label className="labels">Descriptions</label><textarea className='form-control' placeholder={data1.descriptions} onChange={(e)=>setupdatedata({...updatedata,descriptions:e.target.value})}/></div>

                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                    <div className="col-md-6"><label className="labels">Team</label><select className="form-control" onChange={(e)=>setupdatedata({...updatedata,team:e.target.value})} >
                    <option>{data1.team}</option>
                        <option>Suresh Kumar</option>
                        <option>Rajesh Kumar</option>
                        <option>Rakesh Kumar</option>
                        <option>Yogesh Kumar</option>
                        </select>
                    </div>
                   
                    <div className="col-md-6"><label className="labels">Owner</label><select className="form-control" onChange={(e)=>setupdatedata({...updatedata,owner:e.target.value})}>
                    <option>{data1.owner}</option>
                        <option>Suresh Kumar</option>
                        <option>Rajesh kumar</option>
                        <option>Rakesh kumar</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Campaign</label><select className="form-control"onChange={(e)=>setupdatedata({...updatedata,campaign:e.target.value})}>
                    <option>{data1.campaign}</option>
                        <option>Online Campaign</option>
                        <option>Organic</option>
                        <option>Walk-in</option>
                        <option>Channel Partners</option>
                        </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Source</label><select className="form-control"onChange={(e)=>setupdatedata({...updatedata,source:e.target.value})}>
                    <option>{data1.source}</option>
                        <option>Facebook</option>
                        <option>Instagram</option>
                        <option>99acres</option>
                        <option>Magicbricks</option>
                        <option>Hordings</option>
                        <option>Whatsapp</option>
                        <option>Walk-in</option>
                        <option>Cold Call</option>
                        <option>Refrencer</option>
                        </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Sub-Source</label><select className="form-control"onChange={(e)=>setupdatedata({...updatedata,sub_source:e.target.value})}>
                    <option>{data1.sub_source}</option>
                        <option>Call</option>
                        <option>Sms</option>
                        <option>Email</option>
                        <option>Whatsapp</option>
                        <option>Channel Partner</option>
                        <option>Refrencer</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Stage</label><select className="form-control"onChange={(e)=>setupdatedata({...updatedata,stage:e.target.value})}>
                    <option>{data1.stage}</option>
                        <option>Incoming</option>
                        <option>Prospect</option>
                        <option>Negotiation</option>
                        <option>Booked</option>
                        <option>Won</option>
                        <option>Lost</option>
                        <option>Closed</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Channel Partner/Refrencer(Add Contact/Channel Partner)</label><select className="form-control"onChange={(e)=>setupdatedata({...updatedata,channel_partner:e.target.value})}>
                    <option>{data1.channel_partner}</option>
                        <option>Suresh Kumar</option>
                        <option>Rakesh Kumar</option>
                        <option>Admin</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Intersted Project</label><select className="form-control"onChange={(e)=>setupdatedata({...updatedata,intrested_project:e.target.value})}>
                    <option>{data1.intrested_project}</option>
                        <option>Suresh Kumar</option>
                        <option>Rakesh Kumar</option>
                        <option>Admin</option>
                        </select>
                    </div>
                    </div>
                    </div>
                    </div>
        </div>
        </div>
        </div>
        </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={updatelead}>
                Update
              </Button>
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
            </Modal.Footer>
            
          </Modal>
   </div>
   
    
   );
}

export default Leadfetch;
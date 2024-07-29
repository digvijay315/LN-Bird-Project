import { useState } from 'react';
import'../css/addcontact.css';
import Header1 from './header1';
import Sidebar1 from './sidebar1';
import axios from 'axios';
import { ToastContainer, toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';



function Addcontact() {
  
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
    const [contact,setcontact]=useState({title:"",first_name:"",last_name:"",country_code:"",mobile_no:"",mobile_type:"",
        email:"",email_type:"",title_company:"",designation:"",company_name:"",tags:"",
        father_husband_name:"",h_no:"",street_address:"",location:"",city:"",pincode:"",
        state:"",country:"",source:"",category:"",owner:"",team:"",gender:"",visible_to:"",maritial_status:"",
        birth_date:"",anniversary_date:"",education:[],degree:[],school_college:[],loan:"",bank:"",amount:"",
        social_media:"",url:"",income:"",amount1:"",website:"",industry:"",descriptions:""});
    
        const config = {
            headers: {
              'Content-Type': 'application/json' // Set the Content-Type here
            }
        }
      
    const addcontact=async(e)=>
    {
        e.preventDefault();
        try {
            const resp= await axios.post('http://localhost:5000/addcontact',contact,config)
        if(resp.status===200)
            {
                toast.success(resp.data.message)
                setTimeout(() => {
                  navigate('/contactdetails')
                }, 2000);
            }
            
      
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }



function addFn() {
     
        setcontact({
          ...contact,
          education: [...contact.education, ''],
          degree: [...contact.degree, ''],
          school_college: [...contact.school_college, '']
        });
      };
    
      const handleeducationChange = (index, event) => {
        const neweducation = [...contact.education];
        neweducation[index] = event.target.value;
        setcontact({
          ...contact,
          education: neweducation
        });
      };
      const handledegreeChange = (index, event) => {
        const newdegree = [...contact.degree];
        newdegree[index] = event.target.value;
        setcontact({
          ...contact,
          degree: newdegree
        });
      };

      const handleschool_collegeChange = (index, event) => {
        const newschool = [...contact.school_college];
        newschool[index] = event.target.value;
        setcontact({
          ...contact,
          school_college: newschool
        });
      };


      const handleDeleteeducation = (index) => {
        const neweducation = contact.education.filter((_, i) => i !== index);
        setcontact({
          ...contact,
          education: neweducation
        });
      };
      const handleDeletedegree = (index) => {
        const newdegree = contact.degree.filter((_, i) => i !== index);
        setcontact({
          ...contact,
          degree: newdegree
        });
      };
      const handleDeleteschool = (index) => {
        const newschool = contact.school_college.filter((_, i) => i !== index);
        setcontact({
          ...contact,
          school_college: newschool
        });
      };

        const mousehover=()=>
            {
               document.getElementById("r").style.marginLeft="15%"
               
            }
            const mouseout=()=>
                {
                    document.getElementById("r").style.marginLeft="0%"
                }
    return ( 
        <div>
            <div id='h'><Header1/></div>
            <div onMouseOver={mousehover} onMouseOut={mouseout}><Sidebar1/></div>
           
           <div style={{padding:"50px"}}>
            <div className="container rounded bg-white mt-5 mb-5" style={{width:"90%",marginLeft:"90px"}}>
    <div className="row" id='r' style={{transition:"0.5s"}}>
        <div className="col-md-6 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Add Contact</h4><input type='checkbox'  style={{marginLeft:"30%"}}/><label style={{paddingTop:"5px"}}>only show required field</label>
                </div><hr></hr>
                <div className="d-flex justify-content-between align-items-center mb-3">
                <div class="form-group mb-0" style={{width:"220px"}}>
						<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyi_CVTmoL1ITHFxQkfLwvj93hcsgA1Olkhg&s" alt='' style={{height:"25px",position:"absolute",marginLeft:"30%",marginTop:"2%"}}/>
						<input type="text" class="form-control search-input" placeholder="Search Here"/>
					</div>
                    <div class="form-group mb-0" style={{width:"220px"}}>
						
						<input type="time" class="form-control" placeholder="Select time zone"/>
					</div>
                
                
                </div><hr></hr>
                <div className="d-flex justify-content-between align-items-center experience"><span>Basic Details</span></div><hr></hr>
                <div className="row mt-2">
                    
                    <div className="col-md-4"><label className="labels">Title</label><select className="form-control" required="true" onChange={(e)=>setcontact({...contact,title:e.target.value})}>
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
                    <div className="col-md-4"><label className="labels">Name</label><input type="text" required="true" className="form-control" placeholder="first name" onChange={(e)=>setcontact({...contact,first_name:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Surname</label><input type="text" className="form-control"  placeholder="surname" onChange={(e)=>setcontact({...contact,last_name:e.target.value})}/></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-4"><label className="labels">Country</label><select required="true" className="form-control" onChange={(e)=>setcontact({...contact,country_code:e.target.value})}>
                    <option value="">phone</option>
                    {
                      countrycode.map((item)=>
                      (
                        <option>{item}</option>
                      ))
                    }
                    </select></div>
                    <div className="col-md-5"><label className="labels">Mobile Number</label><input type="text" required="true" className="form-control" placeholder="enter phone number" onChange={(e)=>setcontact({...contact,mobile_no:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Type</label><select className="form-control" onChange={(e)=>setcontact({...contact,mobile_type:e.target.value})}>
                    <option>Select Type</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                    <div className="col-md-9"><label className="labels">Email-Address</label><input type="text" className="form-control" placeholder="enter email-id" onChange={(e)=>setcontact({...contact,email:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Type</label><select className="form-control" onChange={(e)=>setcontact({...contact,email_type:e.target.value})}>
                    <option>Select Type</option>
                        <option>Personal</option>
                        <option>Office</option>
                        <option>Business</option>
                        </select></div>
                    
                    <div className="col-md-4"><label className="labels">Title & Company</label><input type="text" className="form-control" onChange={(e)=>setcontact({...contact,title_company:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Designation</label><input type="text" className="form-control" onChange={(e)=>setcontact({...contact,designation:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Company Name</label><input type="text" className="form-control" onChange={(e)=>setcontact({...contact,company_name:e.target.value})}/></div>
                    
                    <div className="col-md-12"><label className="labels">Tags</label><input type="text" className="form-control" onChange={(e)=>setcontact({...contact,tags:e.target.value})}/></div>
                    
                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Address Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                    <div className="col-md-12"><label className="labels">Father/Husband name</label><input type="text" className="form-control"onChange={(e)=>setcontact({...contact,father_husband_name:e.target.value})}/></div>

                    <div className="col-md-3"><label className="labels">H.No</label><input type="text" className="form-control" onChange={(e)=>setcontact({...contact,h_no:e.target.value})}/></div>
                    <div className="col-md-9"><label className="labels">Area</label><input type="text" className="form-control" onChange={(e)=>setcontact({...contact,street_address:e.target.value})}/></div>

                    <div className="col-md-4"><label className="labels">Location</label><input type="text" className="form-control" onChange={(e)=>setcontact({...contact,location:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">City</label><input type="text" className="form-control" onChange={(e)=>setcontact({...contact,city:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Pin Code</label><input type="text" className="form-control" onChange={(e)=>setcontact({...contact,pincode:e.target.value})}/></div>

                    <div className="col-md-6"><label className="labels">State</label><input type="text" className="form-control" onChange={(e)=>setcontact({...contact,state:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control"  onChange={(e)=>setcontact({...contact,country:e.target.value})}/></div>

                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                    <div className="col-md-6"><label className="labels">Source</label><select className="form-control" onChange={(e)=>setcontact({...contact,source:e.target.value})}>
                    <option>Select</option>
                        <option>Walkin</option>
                        <option>99acre</option>
                        <option>Refrence</option>
                        <option>Old Client</option>
                        </select></div>
                    <div className="col-md-6"><label className="labels">Category</label><select className="form-control" onChange={(e)=>setcontact({...contact,category:e.target.value})}>
                    <option>Select</option>
                        <option>Investor</option>
                        <option>Banker</option>
                        <option>Broker</option>
                        <option>Builder</option>
                        <option>Company Employee</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Owner</label><select className="form-control" onChange={(e)=>setcontact({...contact,owner:e.target.value})}>
                    <option>Select</option>
                        <option>Suresh Kumar</option>
                        <option>Rajesh kumar</option>
                        <option>Rakesh kumar</option>
                        </select></div>
                    <div className="col-md-6"><label className="labels">Team</label><select className="form-control">
                    <option>Select</option>
                        <option>Suresh Kumar</option>
                        <option>Rajesh Kumar</option>
                        <option>Rakesh Kumar</option>
                        <option>Yogesh Kumar</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Visible to</label><select className="form-control" onChange={(e)=>setcontact({...contact,visible_to:e.target.value})}>
                    <option>Select</option>
                        <option>All User</option>
                        <option>My Team</option>
                        <option>Admin</option>
                        </select>
                    </div>
                    </div>
                    <div className="row mt-4">
                    <div className="col-md-3"><button className="form-control">Cancel</button></div>
                    <div className="col-md-6"><button className="form-control">Save & View Contact</button></div>
                    <div className="col-md-3"><button className="form-control" onClick={addcontact}>Save</button></div>
                    </div>
                    </div>
        </div>
        <div className="col-md-6">
            <div className="p-3 py-5"><br></br><br></br><br></br>
                <div className="d-flex justify-content-between align-items-center experience"><span>Other Details</span></div><hr></hr>
                <div className="row mt-2">
                    <div className="col-md-5"><label className="labels">Gender</label><select className="form-control" onChange={(e)=>setcontact({...contact,gender:e.target.value})}>
                    <option>Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Others</option>
                        </select>
                    </div>
                    <div className="col-md-7"><label className="labels">Maritial Status</label>< select className="form-control" onChange={(e)=>setcontact({...contact,maritial_status:e.target.value})}>
                    <option>Select</option>
                        <option>Married</option>
                        <option>Unmarried</option>
                    </select>
                    </div>

                    <div className="col-md-5"><label className="labels">Birth Date</label><input type="text" className="form-control" onChange={(e)=>setcontact({...contact,birth_date:e.target.value})}/></div>
                    <div className="col-md-7"><label className="labels">Anniversary Date</label><input type="text" className="form-control" onChange={(e)=>setcontact({...contact,anniversary_date:e.target.value})}/></div>

                    <div className="col-md-3"> <label className="labels">Education</label>
                        
                             {contact.education.map((name, index) => (
                                <div key={index}>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(event) => handleeducationChange(index, event)}
                                  />
                                  <div><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>handleDeleteeducation(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                </div>
                              ))}
                        </div>
                    <div className="col-md-3"><label className="labels">Degree</label>
                    {contact.degree.map((name, index) => (
                                <div key={index}>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(event) => handledegreeChange(index, event)}
                                  />
                                  <div><img className='deletebtn' src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>handleDeletedegree(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                </div>
                              ))}
                    </div>
                    <div className="col-md-5"><label className="labels">School/College/University</label>
                    {contact.school_college.map((name, index) => (
                                <div key={index}>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(event) => handleschool_collegeChange(index, event)}
                                  />
                                  <div><img className='deletebtn' src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>handleDeleteschool(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                </div>
                              ))}                    
                    </div>
                     <div className="col-md-1" ><label className="labels">add</label><button className="form-control" onClick={addFn}>+</button></div>
                
                    <div className="col-md-4"><label className="labels">Loan</label><input type="text" className="form-control" onChange={(e)=>setcontact({...contact,loan:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Bank</label><input type="text" className="form-control"onChange={(e)=>setcontact({...contact,bank:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Amount</label><input type="text" className="form-control" onChange={(e)=>setcontact({...contact,amount:e.target.value})}/></div>

                    <div className="col-md-4"><label className="labels">Social Media</label><input type="text" className="form-control" onChange={(e)=>setcontact({...contact,social_media:e.target.value})}/></div>
                    <div className="col-md-8"><label className="labels">Url</label><input type="text" className="form-control" onChange={(e)=>setcontact({...contact,url:e.target.value})}/></div>

                    <div className="col-md-4"><label className="labels">Income</label><input type="text" className="form-control" onChange={(e)=>setcontact({...contact,income:e.target.value})}/></div>
                    <div className="col-md-8"><label className="labels">Amount</label><input type="text" className="form-control" onChange={(e)=>setcontact({...contact,amount1:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">Website</label><input type="text" className="form-control" onChange={(e)=>setcontact({...contact,website:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">Industry</label><input type="text" className="form-control" onChange={(e)=>setcontact({...contact,industry:e.target.value})}/></div>

                    <div className="col-md-10"><label className="labels">Descriptions</label><textarea className='form-control' onChange={(e)=>setcontact({...contact,descriptions:e.target.value})}/></div>
                    <ToastContainer/>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>

);
}
export default Addcontact;

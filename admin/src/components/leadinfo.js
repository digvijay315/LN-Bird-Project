import { useState } from "react";
import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Leadinfo() {
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


                        const requirment=["Buy","Rent","Lease"];
                        const property_type=["Residential","Commercial","Agricultural","Industrial","Institutional"];
                        const facing=["East","West","South","North","North East","South East","North West","South West"];
                        const road=["9 mtr road","18 mtr road","24 mtr road"];
                        const transaction_type=["Full White","Collecter Rate","50% White","75% White"];
                        const furnishing=["Furnished","Unfurnished","Semi Furnished"];
                        const funding=["Home Loan","Self Funding","Loan Against Property","Personal Loan","Business Loan"]
                        const timeline=["Urgent","More then 1 month","Not Confirmed","Within 15 days"]

    const [leadinfo,setleadinfo]=useState({title:"",first_name:"",last_name:"",country_code:"",mobile_no:"",mobile_type:"",
        email:"",email_type:"",title_company:"",designation:"",company_name:"",tags:"",
        lead_type:"",descriptions:"",team:"",owner:"",campaign:"",source:"",sub_source:"",
        stage:"",channel_partner:"",intrested_project:"",gender:"",maritial_status:"",birth_date:"",anniversary_date:"",father_husband_name:"",h_no:"",
        street_address:"",location:"",city:"",pincode:"",state:"",country:"",website:"",industry:"",education:"",
        degree:"",college:"",loan:"",bank:"",amount:"",social_media:"",url:"",income:"",amount1:"",document:"",number:"",file:"",requirment:"",property_type:"",purpose:"",nri:"no",sub_type:"",unit_type:"",
        budget_min:"",budget_max:"",minimum_area:"",maximum_area:"",area_metric:"",search_location:"",street_address1:"",city1:"",area:"",
        country1:"",pin_code:"",block:"",state1:"",lattitude:"",longitude:"",specific_unit:"",measurement:"",funding:"",timeline:"",
        facing:"",road:"",transaction_type:"",furnishing:""})
        
        const navigate=useNavigate()
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data' // Set the Content-Type here
            }
        }
        const leadinfodetails=async(e)=>
        {
            e.preventDefault();
            try {
                const resp=await api.post('leadinfo',leadinfo,config)
                if(resp.status===200)
                {
                    toast.success(resp.data.message)
                    setTimeout(() => {
                        navigate('/leaddetails')
                    }, 2000);
                }
            } catch (error) {
                
                toast.error(error.response.data)
            }
        }

        const leadinfomain=()=>
        {
            document.getElementById("leadinfo1").style.display="flex";
            document.getElementById("leadinfo2").style.display="flex";
            document.getElementById("span1").style.color="green";

            document.getElementById("leadinfopersonal1").style.display="none";
            document.getElementById("leadinfopersonal2").style.display="none";
            document.getElementById("span2").style.color="black";

            document.getElementById("leadinforequirment1").style.display="none";
            document.getElementById("leadinforequirment2").style.display="none";
            document.getElementById("span3").style.color="black";
         
        }
        const Leadinfopersonal=()=>
            {
                document.getElementById("leadinfo1").style.display="none";
                document.getElementById("leadinfo2").style.display="none";
                document.getElementById("span1").style.color="black";
    
                document.getElementById("leadinfopersonal1").style.display="flex";
                document.getElementById("leadinfopersonal2").style.display="flex";
                document.getElementById("span2").style.color="green";
    
                document.getElementById("leadinforequirment1").style.display="none";
                document.getElementById("leadinforequirment2").style.display="none";
                document.getElementById("span3").style.color="black";
             
            }
            const leadinforequirment=()=>
                {
                    document.getElementById("leadinfo1").style.display="none";
                    document.getElementById("leadinfo2").style.display="none";
                    document.getElementById("span1").style.color="black";
        
                    document.getElementById("leadinfopersonal1").style.display="none";
                    document.getElementById("leadinfopersonal2").style.display="none";
                    document.getElementById("span2").style.color="black";
        
                    document.getElementById("leadinforequirment1").style.display="flex";
                    document.getElementById("leadinforequirment2").style.display="flex";
                    document.getElementById("span3").style.color="green";
                 
                }

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
                <div className="d-flex justify-content-between align-items-center experience" style={{fontFamily:"times new roman",fontWeight:"bold"}}>
                <span onClick={leadinfomain} id="span1" style={{cursor:"pointer"}}>Lead Info</span>
                <span onClick={Leadinfopersonal} id="span2" style={{cursor:"pointer"}}>Lead Info(Personal)</span>
                <span onClick={leadinforequirment} id="span3" style={{cursor:"pointer"}}> Lead Info(Requirment)</span>
                </div>
                <hr></hr>
                <div className="row mt-2" id="leadinfo1">
                    
                    <div className="col-md-3"><label className="labels">Title</label><select className="form-control" required="true" onChange={(e)=>setleadinfo({...leadinfo,title:e.target.value})}>
                    <option>Select title</option>
                        <option>Mr.</option>
                        <option>Mrs.</option>
                        <option>Smt.</option>
                        <option>Dr.</option>
                        <option>Er.</option>
                        <option>Sh.</option>
                        <option>col</option>
                        </select>
                        </div>
                    <div className="col-md-4"><label className="labels">Name</label><input type="text" required="true" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,first_name:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Surname</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,last_name:e.target.value})}/></div>
                </div>
                <div className="row mt-3" id="leadinfo2">
                    <div className="col-md-4"><label className="labels">Country</label><select required="true" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,country_code:e.target.value})}>
                    <option value="">select</option>
                   {
                    countrycode.map(item=>
                    (
                        <option>{item}</option>
                    )
                    )
                   }
                    </select></div>
                    <div className="col-md-5"><label className="labels">Mobile Number</label><input type="text" required="true" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,mobile_no:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Type</label><select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,mobile_type:e.target.value})}>
                    <option>Select Type</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                    <div className="col-md-9"><label className="labels">Email-Address</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,email:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Type</label><select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,email_type:e.target.value})}>
                    <option>Select Type</option>
                        <option>Personal</option>
                        <option>Office</option>
                        <option>Business</option>
                        </select></div>
                    
                    <div className="col-md-4"><label className="labels">Title & Company</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,title_company:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Designation</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,designation:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Company Name</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,company_name:e.target.value})}/></div>
                    
                    <div className="col-md-8"><label className="labels">Tags</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,tags:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Lead Type</label>
                    <select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,lead_type:e.target.value})}>
                    <option>Select</option>
                        <option>Hot</option>
                        <option>Warm</option>
                        <option>Cold</option>
                        </select>
                    </div>
                    <div className="col-md-10"><label className="labels">Descriptions</label><textarea className='form-control' onChange={(e)=>setleadinfo({...leadinfo,descriptions:e.target.value})}/></div>

                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                    <div className="col-md-6"><label className="labels">Team</label><select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,team:e.target.value})}>
                    <option>Select</option>
                        <option>Suresh Kumar</option>
                        <option>Rajesh Kumar</option>
                        <option>Rakesh Kumar</option>
                        <option>Yogesh Kumar</option>
                        </select>
                    </div>
                   
                    <div className="col-md-6"><label className="labels">Owner</label><select className="form-control"onChange={(e)=>setleadinfo({...leadinfo,owner:e.target.value})}>
                    <option>Select</option>
                        <option>Suresh Kumar</option>
                        <option>Rajesh kumar</option>
                        <option>Rakesh kumar</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Campaign</label><select className="form-control"onChange={(e)=>setleadinfo({...leadinfo,campaign:e.target.value})}>
                    <option>Select</option>
                        <option>Online Campaign</option>
                        <option>Organic</option>
                        <option>Walk-in</option>
                        <option>Channel Partners</option>
                        </select>
                    </div>
                    <div className="col-md-4"><label className="labels">Source</label><select className="form-control"onChange={(e)=>setleadinfo({...leadinfo,source:e.target.value})}>
                    <option>Select</option>
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
                    <div className="col-md-4"><label className="labels">Sub-Source</label><select className="form-control"onChange={(e)=>setleadinfo({...leadinfo,sub_source:e.target.value})}>
                    <option>Select</option>
                        <option>Call</option>
                        <option>Sms</option>
                        <option>Email</option>
                        <option>Whatsapp</option>
                        <option>Channel Partner</option>
                        <option>Refrencer</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Stage</label><select className="form-control"onChange={(e)=>setleadinfo({...leadinfo,stage:e.target.value})}>
                    <option>Select</option>
                        <option>Incoming</option>
                        <option>Prospect</option>
                        <option>Negotiation</option>
                        <option>Booked</option>
                        <option>Won</option>
                        <option>Lost</option>
                        <option>Closed</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Channel Partner/Refrencer(Add Contact/Channel Partner)</label><select className="form-control"onChange={(e)=>setleadinfo({...leadinfo,channel_partner:e.target.value})}>
                    <option>Select</option>
                        <option>Suresh Kumar</option>
                        <option>Rakesh Kumar</option>
                        <option>Admin</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Intersted Project</label><select className="form-control"onChange={(e)=>setleadinfo({...leadinfo,intrested_project:e.target.value})}>
                    <option>Select</option>
                        <option>Suresh Kumar</option>
                        <option>Rakesh Kumar</option>
                        <option>Admin</option>
                        </select>
                    </div>
                    </div>
                    <div className="row mt-2" id="leadinfopersonal1" style={{display:"none"}}>
                    
                    <div className="col-md-3"><label className="labels">Gender</label><select className="form-control" required="true" onChange={(e)=>setleadinfo({...leadinfo,gender:e.target.value})} >
                    <option>Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Others</option>
                        </select>
                        </div>
                        <div className="col-md-3" style={{marginLeft:"25%"}}><label className="labels">Maritial Status</label><select className="form-control" required="true" onChange={(e)=>setleadinfo({...leadinfo,maritial_status:e.target.value})}>
                    <option>Select</option>
                        <option>Married</option>
                        <option>Unmarried</option>
                        </select>
                        </div>
                </div>
                <div className="row mt-3" id="leadinfopersonal2" style={{display:"none"}}>
                    <div className="col-md-5"><label className="labels">Birth Date</label><input type="text" required="true" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,birth_date:e.target.value})} /></div>
                    <div className="col-md-5"><label className="labels">Anniversary Date</label><input type="text" required="true" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,anniversary_date:e.target.value})} /></div>

                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Address Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                    
                    <div className="col-md-6"><label className="labels">Father/husband name</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,father_husband_name:e.target.value})} /></div>
                    <div className="col-md-6"></div>
                    
                    <div className="col-md-3"><label className="labels">H.No.</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,h_no:e.target.value})} /></div>
                    <div className="col-md-6"><label className="labels">Street Address</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,street_address:e.target.value})}/></div>
                    <div className="col-md-3"></div>
                    
                    <div className="col-md-4"><label className="labels">Location</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,location:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">City</label><input type="text" className="form-control"  onChange={(e)=>setleadinfo({...leadinfo,city:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Pincode</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,pin_code:e.target.value})} /></div>
                   
                    <div className="col-md-4"><label className="labels">State</label><input type="text" className="form-control"  onChange={(e)=>setleadinfo({...leadinfo,state:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Country</label><input type="text" className="form-control"  onChange={(e)=>setleadinfo({...leadinfo,country:e.target.value})}/></div>
                    <div className="col-md-4"></div>

                    <div className="col-md-6"><label className="labels">Website</label><input type="text" className="form-control"  onChange={(e)=>setleadinfo({...leadinfo,website:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">Industry</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,industry:e.target.value})} /></div>

                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}></label><hr style={{marginTop:"-5px"}}></hr></div>

                    <div className="col-md-4"><label className="labels">Education</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,education:e.target.value})} /></div>
                    <div className="col-md-4"><label className="labels">Degree</label><input type="text" className="form-control"  onChange={(e)=>setleadinfo({...leadinfo,degree:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">College</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,college:e.target.value})} /></div>

                    <div className="col-md-4"><label className="labels">Loan</label><input type="text" className="form-control"  onChange={(e)=>setleadinfo({...leadinfo,loan:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Bank</label><input type="text" className="form-control"  onChange={(e)=>setleadinfo({...leadinfo,bank:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Amount</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,amount:e.target.value})} /></div>

                    <div className="col-md-4"><label className="labels">Social Media</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,social_media:e.target.value})} /></div>
                    <div className="col-md-8"><label className="labels">URL</label><input type="text" className="form-control"  onChange={(e)=>setleadinfo({...leadinfo,url:e.target.value})}/></div>
                    
                    <div className="col-md-4"><label className="labels">Income</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,income:e.target.value})} /></div>
                    <div className="col-md-8"><label className="labels">Amount</label><input type="text" className="form-control"  onChange={(e)=>setleadinfo({...leadinfo,amount:e.target.value})}/></div>

                    <div className="col-md-4"><label className="labels">Document</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,document:e.target.value})} /></div>
                    <div className="col-md-6"><label className="labels">Number</label><input type="text" className="form-control"  onChange={(e)=>setleadinfo({...leadinfo,number:e.target.value})}/></div>
                    <div className="col-md-2"><label className="labels" style={{visibility:"none"}}>.</label><input type="file" id="file-upload" className="form-control" name="file" style={{display:"none"}} onChange={(e)=>setleadinfo({...leadinfo,file:e.target.files[0]})}/>
                    <label for="file-upload" className="form-control" style={{backgroundColor:"lightblue",cursor:"pointer",textAlign:"center"}}> 
                     Upload
                    </label>
                    </div>
                   </div> 
                   <div className="row mt-2" id="leadinforequirment1" style={{display:"none"}}>
                    
                    <div className="col-md-5"><label className="labels">Requirment</label><select className="form-control" required="true" onChange={(e)=>setleadinfo({...leadinfo,requirment:e.target.value})}>
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
                        <div className="col-md-5"><label className="labels">Property Type</label><select className="form-control" required="true"onChange={(e)=>setleadinfo({...leadinfo,property_type:e.target.value})}>
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
                        <div className="col-md-2"></div>
                        <div className="col-md-6"><label className="labels" style={{display:"inline-block"}}>Purpose</label><br></br>
                        <input type="radio" name="purpose" value={"End use"} style={{marginRight:"10px"}} onChange={(e)=>setleadinfo({...leadinfo,purpose:e.target.value})}/>End use<input type="radio" name="purpose" value={"Investor"} style={{marginLeft:"20px",marginRight:"10px"}} onChange={(e)=>setleadinfo({...leadinfo,purpose:e.target.value})}/>Investor
                        </div>
                        <div className="col-md-2"><label className="labels" >NRI</label><br></br>
                        <input type="checkbox" value={"Yes"} style={{marginRight:"10px"}} onChange={(e)=>setleadinfo({...leadinfo,nri:e.target.value})}/>Yes
                        </div>
                        
                        
                </div>
                <div className="row mt-3" id="leadinforequirment2" style={{display:"none"}}>
                    <div className="col-md-6"><label className="labels">Sub Type</label><select required="true" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,sub_type:e.target.value})}>
                    <option value="">select</option>
                    <option value="93">Afghanistan +93</option>
                    <option value="358">Aland Islands +358</option>
                    <option value="355">Albania +355</option>
                    </select>
                    </div>
                    
                    <div className="col-md-6"><label className="labels">Unit Type</label><select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,unit_type:e.target.value})}>
                    <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                    
                        <div className="col-md-6"><label className="labels">Budget Min</label><select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,budget_min:e.target.value})}>
                        <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>

                        <div className="col-md-6"><label className="labels">Budget Max</label><select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,budget_max:e.target.value})}>
                        <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>

                        <div className="col-md-4"><label className="labels">Minimum Area</label><select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,minimum_area:e.target.value})}>
                        <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Maximum Area</label><select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,maximum_area:e.target.value})}>
                        <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Area Metric</label><select className="form-control"onChange={(e)=>setleadinfo({...leadinfo,area_metric:e.target.value})} >
                        <option>Select Type</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                    <div className="col-md-6"><label className="labels">Search Location</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,search_location:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">Street  Address</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,street_address1:e.target.value})}/></div>

                    <div className="col-md-3"><label className="labels">City</label><select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,city1:e.target.value})}>
                    <option>Select</option>
                        <option>Personal</option>
                        <option>Office</option>
                        <option>Business</option>
                        </select></div>
                        <div className="col-md-3"><label className="labels">Area</label><select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,area:e.target.value})}>
                    <option>Select</option>
                        <option>Personal</option>
                        <option>Office</option>
                        <option>Business</option>
                        </select></div>
                        <div className="col-md-3"><label className="labels">Country</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,country1:e.target.value})}/></div>
                        <div className="col-md-3"><label className="labels">Pincode</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,pin_code:e.target.value})}/></div>

                        <div className="col-md-3"><label className="labels">Block</label><select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,block:e.target.value})}>
                    <option>Select</option>
                        <option>Personal</option>
                        <option>Office</option>
                        <option>Business</option>
                        </select></div>
                        <div className="col-md-3"><label className="labels">State</label><select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,state1:e.target.value})}>
                    <option>Select</option>
                        <option>Personal</option>
                        <option>Office</option>
                        <option>Business</option>
                        </select></div>
                        <div className="col-md-3"><label className="labels">Lattitude</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,lattitude:e.target.value})}/></div>
                        <div className="col-md-3"><label className="labels">Longitude</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,longitude:e.target.value})}/></div>
                       
                         <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}></label><hr style={{marginTop:"10px"}}></hr></div>
                          <div className="col-md-12"><label className="labels" style={{fontSize:"16px"}}>Other Requirment</label></div>

                    
                    <div className="col-md-2"><label className="labels">Specific Unit</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,specific_unit:e.target.value})}/></div>
                    <div className="col-md-2"><label className="labels" style={{visibility:"hidden"}}>system</label><input type="text" className="form-control" /></div>
                    <div className="col-md-3" style={{marginLeft:"16%"}}><label className="labels">Funding</label>
                    <select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,funding:e.target.value})}>
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
                    <select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,timeline:e.target.value})}>
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
                    <select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,facing:e.target.value})}>
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
                    <select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,road:e.target.value})}>
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
                    <select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,transaction_type:e.target.value})}>
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
                    <select className="form-control" onChange={(e)=>setleadinfo({...leadinfo,furnishing:e.target.value})}>
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
                    <div className="row mt-4">
                    <div className="col-md-4"><button className="form-control" >Shedule Follow-up</button></div>
                    <div className="col-md-2"><button className="form-control" onClick={leadinfodetails}>Save</button></div>
                    <div className="col-md-2"><button className="form-control">Cancel</button></div>
                    <div className="col-md-4"><button className="form-control">Save & View Contact</button></div>
                    </div>
                    </div>
                    </div>
                    <ToastContainer/>
        </div>
        </div>
        </div>
        </div>
     );
}

export default Leadinfo;
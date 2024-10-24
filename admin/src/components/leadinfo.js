import { useState } from "react";
import Header1 from "./header1";
import Sidebar1 from "./sidebar1";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import '../css/common.css';
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
        email:"",email_type:"",tags:"",descriptions:"",stage:"",lead_type:"",owner:"",team:"",visible_to:"",campegin:"",source:"",
        sub_source:"",refrencer_no:"",intrested_project:"",
        requirment:"",property_type:"",purpose:"",nri:"",sub_type:"",unit_type:"",budget_min:"",budget_max:"",minimum_area:"",
        maximum_area:"",area_metric:"",search_location:"",street_address:"",city2:"",area2:"",block:"",pincode2:"",country2:"",state2:"",
        lattitude:"",longitude:"",specific_unit:"",specific_unitdetails:"",funding:"",timeline:"",facing:"",road:"",transaction_type:"",
        furnishing:"",
        profession_category:"",profession_subcategory:"",designation:"",company_name:"",country_code1:"",company_phone:"",
        company_email:"",area:"",location:"",city:"",pincode:"",state:"",country:"",industry:"",company_social_media:[''],company_url:[''],action3:[],

        father_husband_name:"",h_no:"",area1:"",location1:"",city1:"",pincode1:"",state1:"",country1:"",gender:"",maritial_status:"",
        birth_date:"",anniversary_date:"",education:[''],degree:[''],school_college:[''],action4:[],loan:[''],bank:[''],amount:[''],action5:[],
        social_media:[''],url:[''],action6:[],income:[''],amount1:[''],action7:[],document_no:[''],document_name:[''],document_pic:[''],action8:[]
       })
        
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

//===================================------------- lead tab view=================================---------------------------------------- 
        const leadinfobasic=()=>
        {
            document.getElementById("leadinfobasic1").style.display="flex";
            document.getElementById("leadinfobasic2").style.display="flex";
            document.getElementById("span1").style.color="green";

            document.getElementById("leadinforequirment").style.display="none";
            document.getElementById("span2").style.color="black";

            document.getElementById("leadinfoprofessional").style.display="none";
            document.getElementById("span3").style.color="black";

            document.getElementById("leadinfopersonal").style.display="none";
            document.getElementById("span3").style.color="black";
         
        }
        const leadinforequirment=()=>
            {
                document.getElementById("leadinfobasic1").style.display="none";
                document.getElementById("leadinfobasic2").style.display="none";
                document.getElementById("span1").style.color="black";
    
                document.getElementById("leadinforequirment").style.display="flex";
                document.getElementById("span2").style.color="green";
    
                document.getElementById("leadinfoprofessional").style.display="none";
                document.getElementById("span3").style.color="black";
    
                document.getElementById("leadinfopersonal").style.display="none";
                document.getElementById("span3").style.color="black";
             
            }
            const leadinfoprofessionaldetails=()=>
                {
                    document.getElementById("leadinfobasic1").style.display="none";
                    document.getElementById("leadinfobasic2").style.display="none";
                    document.getElementById("span1").style.color="black";
        
                    document.getElementById("leadinforequirment").style.display="none";
                    document.getElementById("span2").style.color="black";

                    document.getElementById("leadinfoprofessional").style.display="flex";
                    document.getElementById("span3").style.color="green";

                    document.getElementById("leadinfopersonal").style.display="none";
                    document.getElementById("span4").style.color="black";
                 
                }  
              const leadinfopersonaldetails=()=>
                    {
                        document.getElementById("leadinfobasic1").style.display="none";
                        document.getElementById("leadinfobasic2").style.display="none";
                        document.getElementById("span1").style.color="black";
            
                        document.getElementById("leadinforequirment").style.display="none";
                        document.getElementById("span2").style.color="black";
            
                        document.getElementById("leadinfoprofessional").style.display="none";
                        document.getElementById("span3").style.color="black";
            
                        document.getElementById("leadinfopersonal").style.display="flex";
                        document.getElementById("span4").style.color="green";
                     
                    }

  //======================------------------------------------- lead tab view end---------------------------===================================
               
  
  //===================-------------------all array addFn3,delete and handle change event--------------------==========================
  
                  function addFn3() {
     
                        setleadinfo({
                          ...leadinfo,
                          company_social_media: [...leadinfo.company_social_media, ''],
                          company_url: [...leadinfo.company_url, ''],
                          action3: [...leadinfo.action3, '']
                        });
                      };
                      const deleteall3=(index)=>
                        {
                         
                          const newcomapnysocialmedia = leadinfo.company_social_media.filter((_, i) => i !== index);
                          const newcompanyurl = leadinfo.company_url.filter((_, i) => i !== index);
                          const newaction3=leadinfo.action3.filter((_,i) => i !== index);
                          
                          setleadinfo({
                            ...leadinfo,
                            company_social_media: newcomapnysocialmedia,
                            company_url: newcompanyurl,
                            action3:newaction3
                          });
                        }
                        const handlecompanysocialmediachange = (index, event) => {
                          const newcomapnysocialmedia = [...leadinfo.company_social_media];
                          newcomapnysocialmedia[index] = event.target.value;
                          setleadinfo({
                            ...leadinfo,
                            company_social_media: newcomapnysocialmedia
                          });
                        };
                        const handlecompanyurlchange = (index, event) => {
                          const newcompanyurl = [...leadinfo.company_url];
                          newcompanyurl[index] = event.target.value;
                          setleadinfo({
                            ...leadinfo,
                            company_url: newcompanyurl
                          });
                        };
                        function addFn4() {
     
                            setleadinfo({
                              ...leadinfo,
                              education: [...leadinfo.education, ''],
                              degree: [...leadinfo.degree, ''],
                              school_college: [...leadinfo.school_college, ''],
                              action4: [...leadinfo.action4, '']
                            });
                          };
                          const deleteall4=(index)=>
                            {
                             
                              const neweducation = leadinfo.education.filter((_, i) => i !== index);
                              const newdegree = leadinfo.degree.filter((_, i) => i !== index);
                              const newschool_college = leadinfo.school_college.filter((_, i) => i !== index);
                              const newaction4=leadinfo.action4.filter((_,i) => i !== index);
                              
                              setleadinfo({
                                ...leadinfo,
                                education: neweducation,
                                degree: newdegree,
                                school_college: newschool_college,
                                action4:newaction4
                              });
                            }
                            const handleeducationChange = (index, event) => {
                              const neweducation = [...leadinfo.education];
                              neweducation[index] = event.target.value;
                              setleadinfo({
                                ...leadinfo,
                                education: neweducation
                              });
                            };
                            const handledegreeChange = (index, event) => {
                              const newdegree = [...leadinfo.degree];
                              newdegree[index] = event.target.value;
                              setleadinfo({
                                ...leadinfo,
                                degree: newdegree
                              });
                            };
                      
                            const handleschool_collegeChange = (index, event) => {
                              const newschool = [...leadinfo.school_college];
                              newschool[index] = event.target.value;
                              setleadinfo({
                                ...leadinfo,
                                school_college: newschool
                              });
                            };
          
                          function addFn5() {
                  
                            setleadinfo({
                              ...leadinfo,
                              loan: [...leadinfo.loan, ''],
                              bank: [...leadinfo.bank, ''],
                              amount: [...leadinfo.amount, ''],
                              action5: [...leadinfo.action5, '']
                            });
                          };
                          const deleteall5=(index)=>
                            {
                             
                              const newloan = leadinfo.loan.filter((_, i) => i !== index);
                              const newbank = leadinfo.bank.filter((_, i) => i !== index);
                              const newamount = leadinfo.amount.filter((_, i) => i !== index);
                              const newaction5=leadinfo.action5.filter((_,i) => i !== index);
                              
                              setleadinfo({
                                ...leadinfo,
                                loan: newloan,
                                bank: newbank,
                                amount: newamount,
                                action5:newaction5
                              });
                            }
                            const handleloanchange = (index, event) => {
                              const newloan = [...leadinfo.loan];
                              newloan[index] = event.target.value;
                              setleadinfo({
                                ...leadinfo,
                                loan: newloan
                              });
                            };
                            const handlebankchange = (index, event) => {
                              const newbank = [...leadinfo.bank];
                              newbank[index] = event.target.value;
                              setleadinfo({
                                ...leadinfo,
                                bank: newbank
                              });
                            };
                            const handleamountchange = (index, event) => {
                              const newamount = [...leadinfo.amount];
                              newamount[index] = event.target.value;
                              setleadinfo({
                                ...leadinfo,
                                amount: newamount
                              });
                            };
          
                            function addFn6() {
                  
                              setleadinfo({
                                ...leadinfo,
                                social_media: [...leadinfo.social_media, ''],
                                url: [...leadinfo.url, ''],
                                action6: [...leadinfo.action6, '']
                              });
                            };
                            const deleteall6=(index)=>
                              {
                               
                                const newsocial_media = leadinfo.social_media.filter((_, i) => i !== index);
                                const newurl = leadinfo.url.filter((_, i) => i !== index);
                                const newaction6=leadinfo.action6.filter((_,i) => i !== index);
                                
                                setleadinfo({
                                  ...leadinfo,
                                  social_media: newsocial_media,
                                  url: newurl,
                                  action6:newaction6
                                });
                              }
                              const handlesocial_mediachange = (index, event) => {
                                const newsocial_media = [...leadinfo.social_media];
                                newsocial_media[index] = event.target.value;
                                setleadinfo({
                                  ...leadinfo,
                                  social_media: newsocial_media
                                });
                              };
                              const handleurlChange = (index, event) => {
                                const newurl = [...leadinfo.url];
                                newurl[index] = event.target.value;
                                setleadinfo({
                                  ...leadinfo,
                                  url: newurl
                                });
                              };
          
                              function addFn7() {
                  
                                setleadinfo({
                                  ...leadinfo,
                                  income: [...leadinfo.income, ''],
                                  amount1: [...leadinfo.amount1, ''],
                                  action7: [...leadinfo.action7, '']
                                });
                              };
                              const deleteall7=(index)=>
                                {
                                 
                                  const newincome = leadinfo.income.filter((_, i) => i !== index);
                                  const newamount1 = leadinfo.amount1.filter((_, i) => i !== index);
                                  const newaction7=leadinfo.action7.filter((_,i) => i !== index);
                                  
                                  setleadinfo({
                                    ...leadinfo,
                                    income: newincome,
                                    amount1: newamount1,
                                    action7:newaction7
                                  });
                                }
                                const handleincomechange = (index, event) => {
                                  const newincome = [...leadinfo.income];
                                  newincome[index] = event.target.value;
                                  setleadinfo({
                                    ...leadinfo,
                                    income: newincome
                                  });
                                };
                                const handleamount1change = (index, event) => {
                                  const newamount1 = [...leadinfo.amount1];
                                  newamount1[index] = event.target.value;
                                  setleadinfo({
                                    ...leadinfo,
                                    amount1: newamount1
                                  });
                                };
          
                                function addFn8() {
                  
                                  setleadinfo({
                                    ...leadinfo,
                                    document_no: [...leadinfo.document_no, ''],
                                    document_name: [...leadinfo.document_name, ''],
                                    document_pic: [...leadinfo.document_pic, ''],
                                    action8: [...leadinfo.action8, '']
                                  });
                                };
                                const deleteall8=(index)=>
                                  {
                                   
                                    const newdocumentno = leadinfo.document_no.filter((_, i) => i !== index);
                                    const newdocumentname = leadinfo.document_name.filter((_, i) => i !== index);
                                    const newdocumentpic = leadinfo.document_pic.filter((_, i) => i !== index);
                                    const newaction8=leadinfo.action8.filter((_,i) => i !== index);
                                    
                                    setleadinfo({
                                      ...leadinfo,
                                      document_no: newdocumentno,
                                      document_name: newdocumentname,
                                      document_pic: newdocumentpic,
                                      action8:newaction8
                                    });
                                  }
                                  const handledocumentnochange = (index, event) => {
                                    const newdocumentno = [...leadinfo.document_no];
                                    newdocumentno[index] = event.target.value;
                                    setleadinfo({
                                      ...leadinfo,
                                      document_no: newdocumentno
                                    });
                                  };
                                  const handledocumentnamechange = (index, event) => {
                                    const newdocumentname = [...leadinfo.document_name];
                                    newdocumentname[index] = event.target.value;
                                    setleadinfo({
                                      ...leadinfo,
                                      document_name: newdocumentname
                                    });
                                  };
                                  const handledocumentpicchange = (index, event) => {
                                    const newdocumentpic = [...leadinfo.document_pic];
                                    const files = Array.from(event.target.files);
                                    newdocumentpic[index] = {files:files}
                                    setleadinfo({
                                      ...leadinfo,
                                      document_pic: newdocumentpic
                                    });
                                  };


//======================----------------------------------all array addFn3,delete and handle change event--------------======================
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
                    <h4 className="text-right" style={{cursor:"pointer"}} onClick={()=>window.location.reload()}>Add Lead</h4>
                </div><hr></hr>
                <div className="d-flex justify-content-between align-items-center experience" style={{fontFamily:"times new roman",fontWeight:"bold"}}>
                <span onClick={leadinfobasic} id="span1" style={{cursor:"pointer"}}>Basic Details</span>
                <span onClick={leadinforequirment} id="span2" style={{cursor:"pointer"}}>Requirment</span>
                <span onClick={leadinfoprofessionaldetails} id="span3" style={{cursor:"pointer"}}> Professional Details</span>
                <span onClick={leadinfopersonaldetails} id="span4" style={{cursor:"pointer"}}> Personal Details</span>
                </div>
                <hr></hr>
{/*----------------------------------------leadinfo basic details start------------------------------------------------------------------- */}
               
               
                <div className="row mt-2" id="leadinfobasic1">
                    
                    <div className="col-md-3"><label className="labels">Title</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setleadinfo({...leadinfo,title:e.target.value})}>
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
                    <div className="col-md-4"><label className="labels">Name</label><input type="text" required="true" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,first_name:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Surname</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,last_name:e.target.value})}/></div>
                </div>
                <div className="row mt-3" id="leadinfobasic2">
                    <div className="col-md-4"><label className="labels">Country</label><select required="true" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,country_code:e.target.value})}>
                    <option value="">select</option>
                   {
                    countrycode.map(item=>
                    (
                        <option>{item}</option>
                    )
                    )
                   }
                    </select></div>
                    <div className="col-md-5"><label className="labels">Mobile Number</label><input type="text" required="true" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,mobile_no:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Type</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,mobile_type:e.target.value})}>
                    <option>Select Type</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                    <div className="col-md-9"><label className="labels">Email-Address</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,email:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Type</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,email_type:e.target.value})}>
                    <option>Select Type</option>
                        <option>Personal</option>
                        <option>Office</option>
                        <option>Business</option>
                        </select></div>
                     <div className="col-md-8"><label className="labels">Tags</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,tags:e.target.value})}/></div>
                    <div className="col-md-10"><label className="labels">Descriptions</label><textarea className='form-control form-control-sm' onChange={(e)=>setleadinfo({...leadinfo,descriptions:e.target.value})}/></div>
                    
                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                    <div className="col-md-6"><label className="labels">Stage</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,stage:e.target.value})}>
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
                    <div className="col-md-6"><label className="labels">Lead Type</label>
                    <select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,lead_type:e.target.value})}>
                    <option>Select</option>
                        <option>Hot</option>
                        <option>Warm</option>
                        <option>Cold</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Owner</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,owner:e.target.value})}>
                    <option>Select</option>
                        <option>Suresh Kumar</option>
                        <option>Rajesh kumar</option>
                        <option>Rakesh kumar</option>
                        </select></div>
                    <div className="col-md-6"><label className="labels">Team</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,team:e.target.value})}>
                    <option>Select</option>
                        <option>Suresh Kumar</option>
                        <option>Rajesh Kumar</option>
                        <option>Rakesh Kumar</option>
                        <option>Yogesh Kumar</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Visible to</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,visible_to:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    <div className="col-md-6"></div>
                   
                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Campegin Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                   
                        <div className="col-md-6"><label className="labels">Campaign</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,campaign:e.target.value})}>
                    <option>Select</option>
                        <option>Online Campaign</option>
                        <option>Organic</option>
                        <option>Walk-in</option>
                        <option>Channel Partners</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Source</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,source:e.target.value})}>
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
                    <div className="col-md-6"><label className="labels">Sub-Source</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,sub_source:e.target.value})}>
                    <option>Select</option>
                        <option>Call</option>
                        <option>Sms</option>
                        <option>Email</option>
                        <option>Whatsapp</option>
                        <option>Channel Partner</option>
                        <option>Refrencer</option>
                        </select>
                    </div>
                    
                    <div className="col-md-6"><label className="labels">Refrencer Name</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,channel_partner:e.target.value})}>
                    <option>Select</option>
                        <option>Suresh Kumar</option>
                        <option>Rakesh Kumar</option>
                        <option>Admin</option>
                        </select>
                    </div>
                    <div className="col-md-12"><hr></hr></div>
                    <div className="col-md-6"><label className="labels">Intersted Project</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,intrested_project:e.target.value})}>
                    <option>Select</option>
                        <option>Suresh Kumar</option>
                        <option>Rakesh Kumar</option>
                        <option>Admin</option>
                        </select>
                    </div>
                    </div>
{/* ---------------------------------------leadinfo basic details end ------------------------------------------------------------------------*/}
            

{/*---------------------------------------- leadinfo requirment details start--------------------------------------------------------------- */}
              
              
                <div className="row mt-2" id="leadinforequirment" style={{display:"none"}}>
                <div className="col-md-3"><label className="labels">Requirment</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setleadinfo({...leadinfo,requirment:e.target.value})}>
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
                        <div className="col-md-3"><label className="labels">Property Type</label><select className="form-control form-control-sm" required="true"onChange={(e)=>setleadinfo({...leadinfo,property_type:e.target.value})}>
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
                        <input type="radio" name="purpose" value={"End use"} style={{marginRight:"10px"}} onChange={(e)=>setleadinfo({...leadinfo,purpose:e.target.value})}/>End use<input type="radio" name="purpose" value={"Investor"} style={{marginLeft:"20px",marginRight:"10px"}} onChange={(e)=>setleadinfo({...leadinfo,purpose:e.target.value})}/>Investor
                        </div>
                        <div className="col-md-2"><label className="labels" >NRI</label><br></br>
                        <input type="checkbox" value={"Yes"} style={{marginRight:"10px"}} onChange={(e)=>setleadinfo({...leadinfo,nri:e.target.value})}/>Yes
                        </div>
                        <div className="col-md-6"><label className="labels">Sub Type</label><select required="true" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,sub_type:e.target.value})}>
                    <option value="">select</option>
                    <option value="93">Afghanistan +93</option>
                    <option value="358">Aland Islands +358</option>
                    <option value="355">Albania +355</option>
                    </select>
                    </div>
                    
                    <div className="col-md-6"><label className="labels">Unit Type</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,unit_type:e.target.value})}>
                    <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                        <div className="col-md-6"><label className="labels">Budget Min</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,budget_min:e.target.value})}>
                        <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>

                        <div className="col-md-6"><label className="labels">Budget Max</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,budget_max:e.target.value})}>
                        <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Minimum Area</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,minimum_area:e.target.value})}>
                        <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Maximum Area</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,maximum_area:e.target.value})}>
                        <option>Select</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div>
                        <div className="col-md-4"><label className="labels">Area Metric</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,area_metric:e.target.value})} >
                        <option>Select Type</option>
                        <option>Home</option>
                        <option>Office</option>
                        <option>Mobile</option>
                        </select></div> 
                        <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Location Details</label></div>
                        <div className="row" style={{border:"1px solid black",margin:"5px",padding:"10px"}}>
                        <div className="col-md-8"><label className="labels">Search Location</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,search_location:e.target.value})}/></div>
                        <div className="col-md-4"></div>
                        <div className="col-md-8"><label className="labels">Street Address</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,street_address:e.target.value})}/></div>
                        <div className="col-md-4"></div>
                    <div className="col-md-3"><label className="labels">City</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,city2:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Area</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,area2:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Block</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,block:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Pin Code</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,pincode2:e.target.value})}/></div>
                    
                    <div className="col-md-3"><label className="labels">Country</label><input type="text" className="form-control form-control-sm"  onChange={(e)=>setleadinfo({...leadinfo,country2:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">State</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,state2:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Lattitude</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,lattitude:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels">Longitude</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,longitude:e.target.value})}/></div>
                    {/* <div className="col-md-4"><label className="labels">Location</label><input type="text" className="form-control form-control-sm" /></div> */}
                    </div>
                    
                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Other Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                    
                    <div className="col-md-3"><label className="labels">Specific Unit</label><input type="text" className="form-control" onChange={(e)=>setleadinfo({...leadinfo,specific_unit:e.target.value})}/></div>
                    <div className="col-md-3"><label className="labels" style={{visibility:"hidden"}}>Specific Unit Details</label><input type="text" className="form-control" /></div>
                    <div className="col-md-3"><label className="labels">Funding</label>
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
                     <div className="col-md-3"><label className="labels">Facing</label>
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
                    <div className="col-md-3"><label className="labels">Road</label>
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
                     <div className="col-md-3"><label className="labels">Transaction Type</label>
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
 {/*==========--------------------------============-----------================= leadinfo professional details start=============-------------==============-------------=======------ */}
         
         
         <div className="row mt-2" id="leadinfoprofessional" style={{display:"none"}}>
                     <div className="col-md-5"><label className="labels">Profession Category</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,profession_category:e.target.value})}>
                                  <option>Select</option>    
                                  <option>Self Employed </option>
                                  <option>Govt. Employee  </option>
                                  <option>House Wife</option>
                                  <option>Business Man</option>
                                  <option>Retired</option>
                                  <option>Student</option>
                        </select>
                    </div>
                    <div className="col-md-7"><label className="labels">Profession Sub-Category</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,profession_subcategory:e.target.value})} >
                                <option>Select</option>
                                <option>Banker</option><option>Broker</option><option>Builder</option><option>Clerk</option>
                                <option>Doctor</option><option>Contractor</option><option>Exporter</option><option>Accountant</option>
                                <option>Advocate</option> <option>Archietect</option> <option>Artist</option> <option>Farmer</option>
                                <option>Chef</option> <option>Teacher</option> <option>Scientist</option> <option>Software Developer</option>
                                <option>Designer</option> <option>Author</option> <option>Nurse</option> <option>Baker</option>
                                <option>Engineer</option> <option>Carpenter</option> <option>Construction</option> <option>Worker</option>
                                <option>Sales Person</option> <option>Pilot</option> <option>Professor</option> <option>Author</option>
                                <option>Clerk</option> <option>Peon</option> <option>Commision</option> <option>Agent(AAdati)</option>
                                <option>Shop Keepar</option>
                        </select>
                    </div>
                    <div className="col-md-5"><label className="labels">Designation</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,designation:e.target.value})}>
                    <option>Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Others</option>
                        </select>
                    </div>
                    <div className="col-md-7"><label className="labels">Company/Organisation/Department Name</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,company_name:e.target.value})}>
                    <option>Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Others</option>
                        </select>
                    </div>
                    <div className="col-md-4" > <label className="labels">Country Code</label>
                    
                        <select  required="true" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,country_code1:e.target.value})}>
                        <option>phone</option>
                        {
                          countrycode.map((item)=>
                          (
                            <option>{item}</option>
                          ))
                        }
                        </select> 
                    </div>
                    <div className="col-md-6" > <label className="labels">Company Phone</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setleadinfo({...leadinfo,company_phone:e.target.value})}/></div>
                    <div className="col-md-8" > <label className="labels">Company Email</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setleadinfo({...leadinfo,company_email:e.target.value})}/></div>
                    <div className="col-md-4" ></div>

                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Company Address</label></div>
                    <div className="row" style={{border:"1px solid black",margin:"5px",padding:"10px"}}>
                    <div className="col-md-8"><label className="labels">Area</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,area:e.target.value})}/></div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4"><label className="labels">Location</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,location:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">City</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,city:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Pin Code</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,pincode:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">State</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,state:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,country:e.target.value})}/></div>
                    </div>
                    <div className="col-md-7"><label className="labels">Industry</label><select className="form-control form-control-sm"onChange={(e)=>setleadinfo({...leadinfo,industry:e.target.value})} >
                    <option>choose</option>
                          <optgroup label='Agriculture'>
                                <option>Farming</option><option>horticulture</option><option>forestry</option>
                                <option>fishing</option><option>Others</option>
                          </optgroup>
                          <optgroup label='Mining'>
                                <option>Extraction of minerals</option><option>oil</option><option>gas</option>
                                <option>other natural resources.</option>
                          </optgroup>
                          <optgroup label='Fishing and Hunting'>
                                <option>Commercial fishing</option><option>aquaculture</option><option>others</option>
                          </optgroup>
                          <optgroup label='Forestry'>
                                <option>Logging</option><option>timber production</option><option>others</option>
                          </optgroup>
                          <optgroup label='Manufacturing'>
                                <option>Production of goods from raw materials (e.g., automotive, 
                                  electronics, textiles, food processing)</option>
                          </optgroup>
                          <optgroup label='Construction'>
                                <option>Building infrastructure</option><option>residential and commercial properties</option><option>roads</option>
                                <option>bridges</option><option>others</option>
                          </optgroup>
                          <optgroup label='Utilities'>
                                <option>Production and distribution of electricity</option><option>water</option><option>gas</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Refining'>
                                <option>Processing raw materials like oil</option><option>metals</option><option>into usable products</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Retail'>
                                <option>Selling goods directly to consumers</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Hospitality'>
                                <option>Hotels</option><option>restaurants</option><option>tourism</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Healthcare'>
                                <option>Hospitals</option><option>clinics</option><option>medical services</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Education'>
                                <option>Schools</option><option>colleges</option><option>universities</option>
                                <option>training centers</option><option>others</option>
                          </optgroup>
                          <optgroup label='Finance and Insurance'>
                                <option>Banks</option><option>investment firms</option><option>insurance companies</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Transportation'>
                                <option>Airlines</option><option>railways</option><option>shipping</option>
                                <option>logistics</option><option>others</option>
                          </optgroup>
                          <optgroup label='Telecommunications'>
                                <option>Internet services</option><option>phone companies</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Entertainment'>
                                <option>Film</option><option>television</option><option>music</option>
                                <option>gaming</option><option>sports</option><option>others</option>
                          </optgroup>
                          <optgroup label='Real Estate'>
                                <option>Property sales</option><option>rentals</option><option>management</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Information Technology'>
                                <option>Software development</option><option>data processing</option><option>IT services</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Research and Development'>
                                <option>Innovation</option><option>scientific research</option><option>product development</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Consultancy'>
                                <option>Professional advice in management</option><option>law</option><option>finance</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Media and Communication'>
                                <option>Publishing</option><option>broadcasting</option><option>online media</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Government'>
                                <option>Public administration</option><option>defense</option><option>public services</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Non-Profit Organizations'>
                                <option>NGOs</option><option>charities</option><option>foundations</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Education (Executive)'>
                                <option>High-level educational services</option><option>executive education</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='High-Level Decision-Making'>
                                <option>Top management roles in large organizations</option><option>think tanks</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Green Industry'>
                                <option>Renewable energy</option><option>environmental services</option><option>sustainability</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Biotechnology'>
                                <option>Genetic engineering</option><option>pharmaceuticals</option><option>life sciences</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Creative Industries'>
                                <option>Advertising</option><option>design</option><option>fashion</option><option>arts</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='E-commerce'>
                                <option>Online</option><option>retail</option><option>digital marketplaces</option>
                                <option>others</option>
                          </optgroup>
                          <optgroup label='Aerospace'>
                                <option>Aircraft manufacturing</option><option>space exploration</option><option>satellite services</option>
                                <option>others</option>
                          </optgroup>
                        </select>
                    </div>
                    <div className='col-md-5'></div>
                    <div className="col-md-4"><label className="labels">Company Social-Media Page</label>
                    {
                      leadinfo.company_social_media.map((item,index)=>
                      (
                        <select
                         className='form-control form-control-sm'
                          style={{marginTop:"10px"}}
                          onChange={(event)=>handlecompanysocialmediachange(index,event)}>
                        
                        <option>select</option>
                        <option>Facebook</option><option>Twitter</option><option>Instagram</option><option>Linkdin</option>
                        </select>

                      ))
                    }
                    </div>
                    <div className="col-md-6"><label className="labels">Url</label>
                    {
                      leadinfo.company_url.map((item,index)=>
                      (
                        <input type="text" className="form-control form-control-sm" style={{marginTop:"10px"}} 
                        onChange={(event)=>handlecompanyurlchange(index,event)}/>
                      ))
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      leadinfo.action3.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall3(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      ))
                    }
                    </div>
                    <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn3}>+</button></div>
                    <div className='col-md-12'><hr></hr></div> 

                     </div>

 {/*-------------+++++++++++++++++++++++++--------------========= leadinfo professional end================---------------------===============-------- */}


{/*=====================--------------------- leadinfo personal start-------------------------------------------============================= */}
     <div className="row mt-2" id="leadinfopersonal" style={{display:"none"}}>
                     <div className="col-md-12"><label className="labels">Father/Husband name</label><input type="text" className="form-control form-control-sm"/></div>

                            <div className="col-md-3"><label className="labels">H.No</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,h_no:e.target.value})}/></div>
                            <div className="col-md-9"><label className="labels">Area</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,area1:e.target.value})}/></div>

                            <div className="col-md-4"><label className="labels">Location</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,location1:e.target.value})}/></div>
                            <div className="col-md-4"><label className="labels">City</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,city1:e.target.value})}/></div>
                            <div className="col-md-4"><label className="labels">Pin Code</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,pincode1:e.target.value})}/></div>

                            <div className="col-md-6"><label className="labels">State</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,state1:e.target.value})}/></div>
                            <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,country1:e.target.value})}/></div>

                            <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Other Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                            <div className="col-md-5"><label className="labels">Gender</label><select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,gender:e.target.value})}>
                                        <option>Select</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Others</option>
                                </select>
                            </div>
                            <div className="col-md-7"><label className="labels">Maritial Status</label>< select className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,maritial_status:e.target.value})}>
                                    <option>Select</option>
                                    <option>Married</option>
                                    <option>Unmarried</option>
                                    <option>Single</option>
                                </select>
                            </div>

                            <div className="col-md-5"><label className="labels">Birth Date</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,birth_date:e.target.value})}/></div>
                            <div className="col-md-7"><label className="labels">Anniversary Date</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setleadinfo({...leadinfo,anniversary_date:e.target.value})}/></div>

                            <div className="col-md-3"> <label className="labels">Education</label>
                                
                                    {leadinfo.education.map((name, index) => (
                                        <div key={index} style={{marginTop:"10px"}}>
                                        <select className="form-control form-control-sm"
                                            onChange={(event) => handleeducationChange(index, event)}
                                        >
                                            <option>choose</option>
                                            <option>Kindergaren</option><option>School</option><option>Primery Education</option><option> Secondary Education</option><option>Master</option><option>Commerce</option>
                                            <option>Vocational Education</option>
                                        </select>
                                        
                                        </div>
                                    ))}
                                </div>
                            <div className="col-md-3"><label className="labels">Degree</label>
                            {leadinfo.degree.map((name, index) => (
                                        <div key={index} style={{marginTop:"10px"}}>
                                        <select
                                            className="form-control form-control-sm"
                                            onChange={(event) => handledegreeChange(index, event)}
                                        >
                                            <option>choose</option>
                                            <optgroup label='Bachelor’s '>
                                                <option>Bachelor of Arts (BA) </option><option>Bachelor of Science (BS or BSc) </option><option>Bachelor of Fine Arts (BFA)</option><option> Bachelor of Education (BEd) </option>
                                                <option> Bachelor of Business Administration (BBA) </option><option>Bachelor of Engineering (BE or BEng) </option><option>Bachelor of Science in Nursing (BSN)</option>
                                                <option>B.Bachelor of Laws (LLB) </option><option>B.Bachelor of Architecture (BArch)</option><option>Bachelor of Social Work (BSW) </option><option> Bachelor of Music (BM) </option>
                                                <option>Bachelor of Pharmacy (BPharm)</option><option>Bachelor of Technology (BTech) </option>
                                            </optgroup>
                                            <optgroup label='Master’s '>
                                                <option>Master of Arts (MA)</option><option>Master of Science (MS or MSc)</option><option>Master of Business Administration (MBA)</option><option>Master of Fine Arts (MFA)</option>
                                                <option>Master of Engineering (ME or MEng)</option><option>Master of Education (MEd or EdM)</option><option>Master of Public Health (MPH) </option>
                                                <option>Master of Social Work (MSW)</option><option> Master of Laws (LLM)</option><option>Master of Public Administration (MPA)</option><option>Master of Architecture (MArch)</option>
                                                <option>Master of Library Science (MLS or MLIS)</option><option> Master of Music (MM or MMus)</option><option>Master of Philosophy (MPhil)</option>
                                                <option>Master of Arts in Teaching (MAT)</option><option>Master of Theology (MTh or ThM)</option>
                                            </optgroup>
                                            <optgroup label='Doctoral '>
                                                <option>Doctor of Philosophy (PhD)</option><option>Doctor of Medicine (MD)</option><option>Doctor of Education (EdD)</option><option>Doctor of Business Administration (DBA) </option>
                                                <option>Juris Doctor (JD) </option><option>Doctor of Nursing Practice (DNP) </option><option>Doctor of Public Health (DrPH)</option><option>Doctor of Psychology (PsyD)</option>
                                                <option>Doctor of Engineering (EngD or DEng) </option><option> Doctor of Pharmacy (PharmD)</option><option> Doctor of Social Work (DSW) </option><option>Doctor of Theology (ThD) </option>
                                                <option>Doctor of Veterinary Medicine (DVM) </option><option>Doctor of Musical Arts (DMA)</option><option>Doctor of Dental Surgery (DDS) or Doctor of Dental Medicine (DMD) </option>
                                                <option>Doctor of Public Administration (DPA)</option><option>Doctor of Health Administration (DHA) </option>
                                            </optgroup>
                                
                                        </select>
                                        
                                        </div>
                                    ))}
                            </div>
                            <div className="col-md-4"><label className="labels">School/College/University</label>
                            {leadinfo.school_college.map((name, index) => (
                                        <div key={index} style={{marginTop:"10px"}}>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            value={name}
                                            onChange={(event) => handleschool_collegeChange(index, event)}
                                        />
                                        
                                        </div>
                                    ))}                    
                            </div>
                            <div className="col-md-1" style={{marginTop:"90px"}}>
                            {
                            leadinfo.action4.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall4(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                            ))
                            }
                            </div>
                            <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn4}>+</button></div>

                            <div className="col-md-4"><label className="labels">Loan</label>
                            {
                            leadinfo.loan.map((item,index)=>
                            (
                                <select type="text"
                                style={{marginTop:"10px"}}
                                className="form-control form-control-sm" 
                                onChange={(event)=>handleloanchange(index,event)}
                                >
                                <option>Select</option><option>Home Loan </option><option>Auto Loan</option><option>Personal Loan </option>
                                <option>Education Loan</option> <option>Agriculture Loan </option> <option>Credit Card Loan</option>
                                </select>
                            ))
                            }
                            </div>
                            <div className="col-md-3"><label className="labels">Bank</label>
                            {
                            leadinfo.bank.map((item,index)=>
                            (
                                <select type="text" 
                                style={{marginTop:"10px"}}
                                className="form-control form-control-sm"
                                onChange={(event)=>handlebankchange(index,event)}
                                >
                                <option>Select</option>
                                    <option>State Bank of India (SBI) </option><option>Punjab National Bank (PNB)</option><option>Bank of Baroda</option><option>Canara Bank</option>
                                    <option>Union Bank of India</option><option>Bank of India (BOI)</option><option>Indian Bank </option><option>Central Bank of India</option>
                                    <option>Indian Overseas Bank (IOB)</option><option>UCO Bank</option><option>Bank of Maharashtra</option><option></option>
                                    <option>HDFC Bank </option><option>ICICI Bank</option><option>Axis Bank</option><option>Kotak Mahindra Bank </option>
                                    <option>IndusInd Bank </option><option>Yes Bank </option><option>IDFC FIRST Bank</option><option>Federal Bank </option>
                                    <option>RBL Bank </option><option>South Indian Bank</option><option>Karur Vysya Bank </option><option>Tamilnad Mercantile Bank </option>
                                    <option>Bandhan Bank</option><option>Jammu & Kashmir Bank </option><option>DCB Bank </option><option>Citibank </option><option></option>
                                    <option>HSBC</option><option>Standard Chartered Bank </option><option>Deutsche Bank </option><option>Barclays Bank</option>
                                    <option>Royal Bank of Scotland (RBS) </option><option>Bank of America</option><option>American Express Bank </option><option>UBS</option>
                                    <option>Nabard Financial Services Ltd. (NABARD)</option><option></option>
                                    <option>The Saraswat Cooperative Bank</option><option>The Mumbai District Central Cooperative Bank</option><option>The Delhi State Cooperative Bank</option>
                                    <option>The Karnataka Vikas Grameen Bank</option><option>The Maharashtra State Cooperative Bank </option><option>The Uttar Bihar Gramin Bank</option>
                                    <option>The Punjab State Cooperative Bank</option><option>Gramin Bank of Aryavart </option><option></option>
                                    <option>Haryana Gramin Bank</option><option>Bangiya Gramin Vikash Bank </option><option>Kaveri Grameena Bank</option>
                                    <option>Prathama Bank </option><option>Small Industries Development Bank of India (SIDBI) </option><option></option>
                                    <option>Export-Import Bank of India (EXIM Bank) </option><option>National Bank for Agriculture and Rural Development (NABARD) </option><option></option>
                                </select>
                            ))

                            }
                            </div>
                            <div className="col-md-3"><label className="labels">Amount</label>
                            {
                            leadinfo.amount.map((item,index)=>
                            (
                                <input type="text" 
                                style={{marginTop:"10px"}}
                                className="form-control form-control-sm"
                                onCanPlay={(event)=>handleamountchange(index,event)} />
                            ))
                            }
                            </div>
                            <div className="col-md-1" style={{marginTop:"90px"}}>
                            {
                            leadinfo.action5.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall5(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                            ))
                            }
                            </div>
                            <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn5}>+</button></div>


                            <div className="col-md-4"><label className="labels">Social Media</label>
                            {
                            leadinfo.social_media.map((item,index)=>
                            (
                                <select
                                className='form-control form-control-sm'
                                style={{marginTop:"10px"}}
                                onChange={(event)=>handlesocial_mediachange(index,event)}>
                                
                                <option>select</option>
                                <option>Facebook</option><option>Twitter</option><option>Instagram</option><option>Linkdin</option><option>Google</option>
                                </select>

                            ))
                            }
                            </div>
                            <div className="col-md-6"><label className="labels">Url</label>
                            {
                            leadinfo.url.map((item,index)=>
                            (
                                <input type="text" className="form-control form-control-sm" style={{marginTop:"10px"}} 
                                onChange={(event)=>handleurlChange(index,event)}/>
                            ))
                            }
                            </div>
                            <div className="col-md-1" style={{marginTop:"90px"}}>
                            {
                            leadinfo.action6.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall6(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                            ))
                            }
                            </div>
                            <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn6}>+</button></div>

                            <div className="col-md-4"><label className="labels">Income</label>
                            {
                            leadinfo.income.map((item,index)=>
                            (
                                <select
                                className='form-control form-control-sm'
                                style={{marginTop:"10px"}}
                                onChange={(event)=>handleincomechange(index,event)}>
                            
                            <option>select</option>
                            <option>Personal Income</option><option>Business Income</option>
                            </select>
                            ))
                            }
                            </div>
                            <div className="col-md-6"><label className="labels">Amount</label>
                            {
                            leadinfo.amount1.map((item,index)=>
                            (
                                <input type="text" 
                                style={{marginTop:"10px"}}
                                className="form-control form-control-sm" 
                                onChange={(event)=>handleamount1change(index,event)}
                                />
                            ))
                            }
                            </div>
                            <div className="col-md-1" style={{marginTop:"90px"}}>
                            {
                            leadinfo.action7.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall7(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                            ))
                            }
                            </div>
                            <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn7}>+</button></div>

                            <div className="col-md-3"><label className="labels">Document No.</label>
                            {
                            leadinfo.document_no.map((item,index)=>
                            (
                                <input type="text" 
                                style={{marginTop:"10px"}}
                                className="form-control form-control-sm" 
                                onChange={(event)=>handledocumentnochange(index,event)}
                                />
                            ))
                            }
                            </div>
                            <div className="col-md-3"><label className="labels">Document Name</label>
                            {
                            leadinfo.document_name.map((item,index)=>
                            (
                                <select
                                className='form-control form-control-sm'
                                style={{marginTop:"10px"}}
                                onChange={(event)=>handledocumentnamechange(index,event)}>
                            
                            <option>select</option>
                            <option>Adhar Card </option><option>Pan Card </option><option>Driviing Licence</option><option>Voter Card</option>
                            <option>Ration Card</option><option>Family Id </option><option>Passoport</option><option>Employee Id Card</option>
                            </select>
                            ))
                            }
                            </div>
                            <div className="col-md-4"><label className="labels">Document Picture</label>
                            {
                            leadinfo.document_pic.map((item,index)=>
                            (
                                <input type="file" 
                                style={{marginTop:"10px"}}
                                className="form-control form-control-sm" 
                                onChange={(event)=>handledocumentpicchange(index,event)}
                                />
                            ))
                            }
                            </div>
                            <div className="col-md-1" style={{marginTop:"90px"}}>
                            {
                            leadinfo.action8.map((item,index)=>
                            (
                                <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall8(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                            ))
                            }
                            </div>
                            <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn8}>+</button></div>

                     </div>
 {/*==================================================== leadinfo personal end======================================================= */}
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
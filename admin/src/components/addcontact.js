import { useState } from 'react';
import'../css/addcontact.css';
import Header1 from './header1';
import Sidebar1 from './sidebar1';
import { ToastContainer, toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from "../api";
import { event } from 'jquery'; 



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
    const [contact,setcontact]=useState({title:"",first_name:"",last_name:"",country_code:[''],mobile_no:[''],mobile_type:[''],action1:[],
        email:[''],email_type:[''],action2:[],tags:"",descriptions:"",source:"",team:"",owner:"",visible_to:"",

        profession_category:"",profession_subcategory:"",designation:"",company_name:"",country_code1:"",company_phone:"",
        company_email:"",area:"",location:"",city:"",pincode:"",state:"",country:"",industry:"",company_social_media:[''],company_url:[''],action3:[],

        father_husband_name:"",h_no:"",area1:"",location1:"",city1:"",pincode1:"",state1:"",country1:"",gender:"",maritial_status:"",
        birth_date:"",anniversary_date:"",education:[''],degree:[''],school_college:[''],action4:[],loan:[''],bank:[''],amount:[''],action5:[],
        social_media:[''],url:[''],action6:[],income:[''],amount1:[''],action7:[],document_no:[''],document_name:[''],document_pic:[''],action8:[] });
    
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data' // Set the Content-Type here
            }
        }
      
    const addcontact=async(e)=>
    {
        e.preventDefault();
        try {
            const resp= await api.post('addcontact',contact,config)
        if(resp.status===200)
            {
                toast.success(resp.data.message,{ autoClose: 2000 })
                setTimeout(() => {
                  navigate('/contactdetails')
                }, 2000);
            }
            
      
        } catch (error) {
            toast.error(error.response.data.message,{ autoClose: 2000 })
        }
    }

    const time=new Date()
    
    
     

        const mousehover=()=>
            {
               document.getElementById("r").style.marginLeft="15%"
               
            }
            const mouseout=()=>
                {
                    document.getElementById("r").style.marginLeft="0%"
                }

       
        const basicdetails=()=>
          {
            document.getElementById("basicdetails1").style.display="flex"
            document.getElementById("basicdetails2").style.display="flex"
            document.getElementById("basic").style.color="green"
            document.getElementById("other").style.color="black"
             document.getElementById("professional").style.color="black"
            document.getElementById("otherdetails").style.display="none"
            document.getElementById("profession").style.display="none"
          }
          const professionaldetails=()=>
            {
              document.getElementById("basicdetails1").style.display="none"
              document.getElementById("basicdetails2").style.display="none"
              document.getElementById("otherdetails").style.display="none"
              document.getElementById("profession").style.display="flex"
               document.getElementById("basic").style.color="black"
               document.getElementById("other").style.color="black"
                 document.getElementById("professional").style.color="green"
               
            }
          const otherdetails=()=>
            {
              document.getElementById("basicdetails1").style.display="none"
              document.getElementById("basicdetails2").style.display="none"
               document.getElementById("profession").style.display="none"
                 document.getElementById("otherdetails").style.display="flex"
               document.getElementById("basic").style.color="black"
                document.getElementById("professional").style.color="black"
               document.getElementById("other").style.color="green"
            }
          
          function addFn1() {
        
            setcontact({
              ...contact,
              country_code: [...contact.country_code, ''],
              mobile_no: [...contact.mobile_no, ''],
              mobile_type: [...contact.mobile_type, ''],
              action1: [...contact.action1, '']
            });
          };

          const deleteall1=(index)=>
            {
             
              const newcountry_code = contact.country_code.filter((_, i) => i !== index);
              const newmobile_no = contact.mobile_no.filter((_, i) => i !== index);
              const newmobile_type = contact.mobile_type.filter((_, i) => i !== index);
              const newaction1 = contact.action1.filter((_, i) => i !== index);
              
              setcontact({
                ...contact,
                country_code: newcountry_code,
                mobile_no: newmobile_no,
                mobile_type: newmobile_type,
                action1: newaction1
              });
            }
            const handlecountry_codechange = (index, event) => {
              const newcountry_code = [...contact.country_code];
              newcountry_code[index] = event.target.value;
              setcontact({
                ...contact,
                country_code: newcountry_code
              });
            };
            const handlemobile_nochange = (index, event) => {
              const newmobile_no = [...contact.mobile_no];
              newmobile_no[index] = event.target.value;
              setcontact({
                ...contact,
                mobile_no: newmobile_no
              });
            };
            const handlemobile_typechange = (index, event) => {
              const newmobile_type = [...contact.mobile_type];
              newmobile_type[index] = event.target.value;
              setcontact({
                ...contact,
                mobile_type: newmobile_type
              });
            };

            function addFn2() {
        
              setcontact({
                ...contact,
                email: [...contact.email, ''],
                email_type: [...contact.email_type, ''],
                action2: [...contact.action2, '']
              });
            };
  
            const deleteall2=(index)=>
              {
               
                const newemail = contact.email.filter((_, i) => i !== index);
                const newemail_type = contact.email_type.filter((_, i) => i !== index);
                const newaction2 = contact.action2.filter((_, i) => i !== index);
                
                setcontact({
                  ...contact,
                  email: newemail,
                  email_type: newemail_type,
                  action2: newaction2
                });
              }
              const handleemailchange = (index, event) => {
                const newemail = [...contact.email];
                newemail[index] = event.target.value;
                setcontact({
                  ...contact,
                  email: newemail
                });
              };
              const handleemail_typechange = (index, event) => {
                const newemail_type = [...contact.email_type];
                newemail_type[index] = event.target.value;
                setcontact({
                  ...contact,
                  email_type: newemail_type
                });
              };

              function addFn3() {
     
                setcontact({
                  ...contact,
                  company_social_media: [...contact.company_social_media, ''],
                  company_url: [...contact.company_url, ''],
                  action3: [...contact.action3, '']
                });
              };
              const deleteall3=(index)=>
                {
                 
                  const newcomapnysocialmedia = contact.company_social_media.filter((_, i) => i !== index);
                  const newcompanyurl = contact.company_url.filter((_, i) => i !== index);
                  const newaction3=contact.action3.filter((_,i) => i !== index);
                  
                  setcontact({
                    ...contact,
                    company_social_media: newcomapnysocialmedia,
                    company_url: newcompanyurl,
                    action3:newaction3
                  });
                }
                const handlecompanysocialmediachange = (index, event) => {
                  const newcomapnysocialmedia = [...contact.company_social_media];
                  newcomapnysocialmedia[index] = event.target.value;
                  setcontact({
                    ...contact,
                    company_social_media: newcomapnysocialmedia
                  });
                };
                const handlecompanyurlchange = (index, event) => {
                  const newcompanyurl = [...contact.company_url];
                  newcompanyurl[index] = event.target.value;
                  setcontact({
                    ...contact,
                    company_url: newcompanyurl
                  });
                };
          
              
                function addFn4() {
     
                  setcontact({
                    ...contact,
                    education: [...contact.education, ''],
                    degree: [...contact.degree, ''],
                    school_college: [...contact.school_college, ''],
                    action4: [...contact.action4, '']
                  });
                };
                const deleteall4=(index)=>
                  {
                   
                    const neweducation = contact.education.filter((_, i) => i !== index);
                    const newdegree = contact.degree.filter((_, i) => i !== index);
                    const newschool_college = contact.school_college.filter((_, i) => i !== index);
                    const newaction4=contact.action4.filter((_,i) => i !== index);
                    
                    setcontact({
                      ...contact,
                      education: neweducation,
                      degree: newdegree,
                      school_college: newschool_college,
                      action4:newaction4
                    });
                  }
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

                function addFn5() {
        
                  setcontact({
                    ...contact,
                    loan: [...contact.loan, ''],
                    bank: [...contact.bank, ''],
                    amount: [...contact.amount, ''],
                    action5: [...contact.action5, '']
                  });
                };
                const deleteall5=(index)=>
                  {
                   
                    const newloan = contact.loan.filter((_, i) => i !== index);
                    const newbank = contact.bank.filter((_, i) => i !== index);
                    const newamount = contact.amount.filter((_, i) => i !== index);
                    const newaction5=contact.action5.filter((_,i) => i !== index);
                    
                    setcontact({
                      ...contact,
                      loan: newloan,
                      bank: newbank,
                      amount: newamount,
                      action5:newaction5
                    });
                  }
                  const handleloanchange = (index, event) => {
                    const newloan = [...contact.loan];
                    newloan[index] = event.target.value;
                    setcontact({
                      ...contact,
                      loan: newloan
                    });
                  };
                  const handlebankchange = (index, event) => {
                    const newbank = [...contact.bank];
                    newbank[index] = event.target.value;
                    setcontact({
                      ...contact,
                      bank: newbank
                    });
                  };
                  const handleamountchange = (index, event) => {
                    const newamount = [...contact.amount];
                    newamount[index] = event.target.value;
                    setcontact({
                      ...contact,
                      amount: newamount
                    });
                  };

                  function addFn6() {
        
                    setcontact({
                      ...contact,
                      social_media: [...contact.social_media, ''],
                      url: [...contact.url, ''],
                      action6: [...contact.action6, '']
                    });
                  };
                  const deleteall6=(index)=>
                    {
                     
                      const newsocial_media = contact.social_media.filter((_, i) => i !== index);
                      const newurl = contact.url.filter((_, i) => i !== index);
                      const newaction6=contact.action6.filter((_,i) => i !== index);
                      
                      setcontact({
                        ...contact,
                        social_media: newsocial_media,
                        url: newurl,
                        action6:newaction6
                      });
                    }
                    const handlesocial_mediachange = (index, event) => {
                      const newsocial_media = [...contact.social_media];
                      newsocial_media[index] = event.target.value;
                      setcontact({
                        ...contact,
                        social_media: newsocial_media
                      });
                    };
                    const handleurlChange = (index, event) => {
                      const newurl = [...contact.url];
                      newurl[index] = event.target.value;
                      setcontact({
                        ...contact,
                        url: newurl
                      });
                    };

                    function addFn7() {
        
                      setcontact({
                        ...contact,
                        income: [...contact.income, ''],
                        amount1: [...contact.amount1, ''],
                        action7: [...contact.action7, '']
                      });
                    };
                    const deleteall7=(index)=>
                      {
                       
                        const newincome = contact.income.filter((_, i) => i !== index);
                        const newamount1 = contact.amount1.filter((_, i) => i !== index);
                        const newaction7=contact.action7.filter((_,i) => i !== index);
                        
                        setcontact({
                          ...contact,
                          income: newincome,
                          amount1: newamount1,
                          action7:newaction7
                        });
                      }
                      const handleincomechange = (index, event) => {
                        const newincome = [...contact.income];
                        newincome[index] = event.target.value;
                        setcontact({
                          ...contact,
                          income: newincome
                        });
                      };
                      const handleamount1change = (index, event) => {
                        const newamount1 = [...contact.amount1];
                        newamount1[index] = event.target.value;
                        setcontact({
                          ...contact,
                          amount1: newamount1
                        });
                      };

                      function addFn8() {
        
                        setcontact({
                          ...contact,
                          document_no: [...contact.document_no, ''],
                          document_name: [...contact.document_name, ''],
                          document_pic: [...contact.document_pic, ''],
                          action8: [...contact.action8, '']
                        });
                      };
                      const deleteall8=(index)=>
                        {
                         
                          const newdocumentno = contact.document_no.filter((_, i) => i !== index);
                          const newdocumentname = contact.document_name.filter((_, i) => i !== index);
                          const newdocumentpic = contact.document_pic.filter((_, i) => i !== index);
                          const newaction8=contact.action8.filter((_,i) => i !== index);
                          
                          setcontact({
                            ...contact,
                            document_no: newdocumentno,
                            document_name: newdocumentname,
                            document_pic: newdocumentpic,
                            action8:newaction8
                          });
                        }
                        const handledocumentnochange = (index, event) => {
                          const newdocumentno = [...contact.document_no];
                          newdocumentno[index] = event.target.value;
                          setcontact({
                            ...contact,
                            document_no: newdocumentno
                          });
                        };
                        const handledocumentnamechange = (index, event) => {
                          const newdocumentname = [...contact.document_name];
                          newdocumentname[index] = event.target.value;
                          setcontact({
                            ...contact,
                            document_name: newdocumentname
                          });
                        };
                        const handledocumentpicchange = (index, event) => {
                          const newdocumentpic = [...contact.document_pic];
                          const files = Array.from(event.target.files);
                          newdocumentpic[index] = {files:files}
                          setcontact({
                            ...contact,
                            document_pic: newdocumentpic
                          });
                        };
                  
                    

    return ( 
        <div>
            <div id='h'><Header1/></div>
            <div onMouseOver={mousehover} onMouseOut={mouseout}><Sidebar1/></div>
           
           <div style={{padding:"50px"}}>
            <div className="container rounded bg-white mt-5 mb-5" style={{width:"80%",marginLeft:"150px"}}>
    <div className="row" id='r' style={{transition:"0.5s"}}>
        <div className="col-md-12 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right" style={{cursor:"pointer"}} onClick={()=>window.location.reload()}>Add Contact</h4><input type='checkbox'  style={{marginLeft:"60%",height:"20px",width:"20px"}} /><label style={{paddingTop:"5px"}}>only show required field</label>
                </div><hr></hr>
               
         
             <div style={{display:"flex"}}>
               <div style={{display:"flex",gap:"50px"}}>
               <div  id='basic' onClick={basicdetails} style={{cursor:'pointer',fontWeight:"bold"}}><span >Basic Details   |</span></div>
                <div  id='professional' onClick={professionaldetails} style={{cursor:'pointer',fontWeight:"bold"}}><span >Professional Details |</span></div>
                <div  id='other' onClick={otherdetails} style={{cursor:'pointer',fontWeight:"bold"}}><span >Personal Details |</span></div> 
               </div>
						    <div style={{marginLeft:"200px",width:"31%"}}><input type="text" class="form-control form-control-sm" placeholder={time} value={time} style={{border:"none"}}/></div>
					</div>
                
                
            
 {/*------------------------------------------ basic details start------------------------------------------------------------------------ */}
               
                <div className="row" id='basicdetails1' style={{marginTop:"40px"}}>
                <div className=" col-md-12 d-flex justify-content-between align-items-center experience"><span>Basic Details</span></div>
                <div className='col-md-12'><hr></hr></div>
                    <div className="col-md-2"><label className="labels">Title</label><select className="form-control form-control-sm" required="true" onChange={(e)=>setcontact({...contact,title:e.target.value})}>
                              <option>Select</option>
                              <option>Mr.</option>
                              <option>Mrs.</option>
                              <option>Sh.</option>
                              <option>Smt.</option>
                              <option>Dr.</option>
                              <option>Er.</option>
                              <option>Col.</option>
                              <option>Maj.</option>
                        </select>
                        </div>
                    <div className="col-md-5"><label className="labels">Name</label><input type="text" required="true" className="form-control form-control-sm" placeholder="first name" onChange={(e)=>setcontact({...contact,first_name:e.target.value})}/></div>
                    <div className="col-md-5"><label className="labels">Surname</label><input type="text" className="form-control form-control-sm"  placeholder="surname" onChange={(e)=>setcontact({...contact,last_name:e.target.value})}/></div>
                </div>
                <div className="row mt-3" id='basicdetails2'>
                <div className="col-md-4" > <label className="labels">Country</label>
                    {
                      contact.country_code.map((item,index)=>
                      (
                        <select style={{marginTop:"10px"}} required="true" className="form-control form-control-sm" onChange={(event)=>handlecountry_codechange(index,event)}>
                        <option value={item} >phone</option>
                        {
                          countrycode.map((item)=>
                          (
                            <option>{item}</option>
                          ))
                        }
                        </select> 
                      ))
                    }
                    </div>
                    <div className="col-md-4"><label className="labels">Mobile Number</label>
                    {
                       contact.mobile_no.map((item,index)=>
                        (
                          <input type="text" required="true" style={{marginTop:"10px"}} 
                          className="form-control form-control-sm" 
                          placeholder="enter phone number" 
                          onChange={(event)=>handlemobile_nochange(index,event)}/>
                          
                        ))
                    }
                    </div>
                    <div className="col-md-2"><label className="labels">Type</label>
                    {
                       contact.mobile_type.map((item,index)=>
                        (
                         <select className="form-control form-control-sm" style={{marginTop:"10px"}} 
                         onChange={(event)=>handlemobile_typechange(index,event)}>
                                  <option>Select Type</option>
                                  <option>Personal</option>
                                  <option>Official</option>
                                  <option>Home</option>
                                  <option>Phone</option>
                        </select>
                          
                        ))
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                       contact.action1.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall1(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                  
                          
                        ))
                    }
                    </div>
                  <div className="col-md-1"><label className="labels" >add</label><button className='form-control form-control-sm' onClick={addFn1}>+</button></div>
                    
                  <div className="col-md-8"><label className="labels">Email-Address</label>
                    {
                        contact.email.map((item,index)=>
                        (
                          <input type="text" style={{marginTop:"10px"}}
                          className="form-control form-control-sm" 
                          placeholder="enter email-id"
                          onChange={(event)=>handleemailchange(index,event)}/>
                        ))
                    }
                    </div>
                    
                    <div className="col-md-2"><label className="labels">Type</label>
                    {
                       contact.email_type.map((item,index)=>
                        (
                          <select className="form-control form-control-sm" style={{marginTop:"10px"}} 
                          onChange={(event)=>handleemail_typechange(index,event)}>
                                <option>Select Type</option>
                                <option>Personal</option>
                                <option>Official</option>
                                <option>Business</option>
                        </select>
                        ))
                    }
                   </div>
                  
                   <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                       contact.action2.map((item,index)=>
                        (
                          <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall2(index)} style={{height:"40px",cursor:"pointer"}}/></div>
                                  
                          
                        ))
                    }
                    </div>
                  <div className="col-md-1"><label className="labels" >add</label><button className='form-control form-control-sm' onClick={addFn2}>+</button></div>
                    
                    <div className="col-md-12"><label className="labels">Tags</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,tags:e.target.value})}/></div>
                    
                    <div className="col-md-10"><label className="labels">Descriptions</label><textarea className='form-control form-control-sm' onChange={(e)=>setcontact({...contact,descriptions:e.target.value})}/></div>
                    <div className="col-md-2"></div>

                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>System Details</label><hr style={{marginTop:"-5px"}}></hr></div>
                    
                    <div className="col-md-6"><label className="labels">Source</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,source:e.target.value})}>
                                    <option>Select</option> <option>Friends</option> <option>Relative</option> <option>Website</option>
                                    <option>Walkin</option><option>Magicbricks</option><option>Common Floor </option><option>Housing</option>
                                    <option>99acre</option><option>Olx</option><option>Square Yard </option><option>Real Estate India </option>
                                    <option>Refrence</option><option>Facebook</option><option>Instagram</option><option>Linkdin</option>
                                    <option>Old Client</option><option>Google</option><option>Whatsapp</option>
                             </select>
                        </div>
                        <div className="col-md-6"><label className="labels">Team</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,team:e.target.value})}>
                              <option>Select</option> 
                              <option>Sales</option>
                              <option>Marketing</option>
                              <option> Post Sales</option>
                              <option> Pre Sales</option>
                        </select>
                    </div>
                    <div className="col-md-6"><label className="labels">Owner</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,owner:e.target.value})}>
                    <option>Select</option>
                              <option>Suraj</option> 
                              <option>Suresh Kumar</option>
                              <option>Ramesh Singh</option>
                              <option>Maanav Sharma</option>
                              <option>Sukram</option>
                        </select></div>
                        <div className="col-md-6"><label className="labels">Visible to</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,visible_to:e.target.value})}>
                                <option>Select</option>
                                <option>My Team</option>
                                <option>My Self</option>
                                <option>All Users</option>
                                </select>
                    </div>
                    </div>
              </div>    
        </div> 

   {/*------------------------------------------------------------ basic details end---------------------------------------------------- */}
                  
  {/* -----------------------------------------professional Details start------------------------------------------------------------------- */}

        <div className="col-md-12" id='profession' style={{display:"none",marginTop:"-80px",lineHeight:"30px"}}>
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center experience"><span>Profession Details</span></div><hr></hr>
                <div className="row " >
                    <div className="col-md-5"><label className="labels">Profession Category</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,profession_category:e.target.value})}>
                                  <option>Select</option>    
                                  <option>Self Employed </option>
                                  <option>Govt. Employee  </option>
                                  <option>House Wife</option>
                                  <option>Business Man</option>
                                  <option>Retired</option>
                                  <option>Student</option>
                        </select>
                    </div>
                    <div className="col-md-7"><label className="labels">Profession Sub-Category</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,profession_subcategory:e.target.value})}>
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
                    <div className="col-md-5"><label className="labels">Designation</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,designation:e.target.value})}>
                    <option>Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Others</option>
                        </select>
                    </div>
                    <div className="col-md-7"><label className="labels">Company/Organisation/Department Name</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,company_name:e.target.value})}>
                    <option>Select</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Others</option>
                        </select>
                    </div>
                    <div className="col-md-4" > <label className="labels">Country Code</label>
                    
                        <select  required="true" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,country_code1:e.target.value})}>
                        <option>phone</option>
                        {
                          countrycode.map((item)=>
                          (
                            <option>{item}</option>
                          ))
                        }
                        </select> 
                    </div>
                    <div className="col-md-6" > <label className="labels">Company Phone</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setcontact({...contact,company_phone:e.target.value})}/></div>
                    <div className="col-md-8" > <label className="labels">Company Email</label><input type='text' className='form-control form-control-sm' onChange={(e)=>setcontact({...contact,company_email:e.target.value})}/></div>
                    <div className="col-md-4" ></div>

                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Company Address</label></div>
                    <div className="row" style={{border:"1px solid black",margin:"5px",padding:"10px"}}>
                    <div className="col-md-8"><label className="labels">Area</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,area:e.target.value})}/></div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4"><label className="labels">Location</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,location:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">City</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,city:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Pin Code</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,pincode:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">State</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,state:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,country:e.target.value})}/></div>
                    </div>
                    <div className="col-md-7"><label className="labels">Industry</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,industry:e.target.value})}>
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
                      contact.company_social_media.map((item,index)=>
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
                      contact.company_url.map((item,index)=>
                      (
                        <input type="text" className="form-control form-control-sm" style={{marginTop:"10px"}} 
                        onChange={(event)=>handlecompanyurlchange(index,event)}/>
                      ))
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      contact.action3.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall3(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      ))
                    }
                    </div>
                    <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn3}>+</button></div>
                    <div className='col-md-12'><hr></hr></div> 
              </div>
              {/* <div className='row' style={{marginLeft:"50%"}}>
                    <div className="col-md-4" style={{marginTop:"20px"}}><button className="form-control form-control-sm">Cancel</button></div>
                    <div className="col-md-5" style={{marginTop:"20px"}}><button className="form-control form-control-sm">Save & View Contact</button></div>
                    <div className="col-md-3" style={{marginTop:"20px"}}><button className="form-control form-control-sm" onClick={addcontact}>Save</button></div>
                    </div> */}
             </div>
           </div>
 {/* ------------------------------------------------------professional Details end--------------------------------------------------------------  */}

 {/*-------------------------------------------------- personal details start--------------------------------------------------------- */
 
 }
        <div className="col-md-12" id='otherdetails' style={{display:"none",marginTop:"-80px"}}>
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center experience"><span>Personal Details</span></div><hr></hr>
                <div className="row " >

                <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Address Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                    <div className="col-md-12"><label className="labels">Father/Husband name</label><input type="text" className="form-control form-control-sm"onChange={(e)=>setcontact({...contact,father_husband_name:e.target.value})}/></div>

                    <div className="col-md-3"><label className="labels">H.No</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,h_no:e.target.value})}/></div>
                    <div className="col-md-9"><label className="labels">Area</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,area1:e.target.value})}/></div>

                    <div className="col-md-4"><label className="labels">Location</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,location1:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">City</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,city1:e.target.value})}/></div>
                    <div className="col-md-4"><label className="labels">Pin Code</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,pincode1:e.target.value})}/></div>

                    <div className="col-md-6"><label className="labels">State</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,state1:e.target.value})}/></div>
                    <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control form-control-sm"  onChange={(e)=>setcontact({...contact,country1:e.target.value})}/></div>

                    <div className="col-md-12"><label className="labels" style={{fontSize:"16px",marginTop:"10px"}}>Other Details</label><hr style={{marginTop:"-5px"}}></hr></div>

                    <div className="col-md-5"><label className="labels">Gender</label><select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,gender:e.target.value})}>
                                <option>Select</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Others</option>
                        </select>
                    </div>
                    <div className="col-md-7"><label className="labels">Maritial Status</label>< select className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,maritial_status:e.target.value})}>
                            <option>Select</option>
                            <option>Married</option>
                            <option>Unmarried</option>
                            <option>Single</option>
                        </select>
                    </div>

                    <div className="col-md-5"><label className="labels">Birth Date</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,birth_date:e.target.value})}/></div>
                    <div className="col-md-7"><label className="labels">Anniversary Date</label><input type="text" className="form-control form-control-sm" onChange={(e)=>setcontact({...contact,anniversary_date:e.target.value})}/></div>

                    <div className="col-md-3"> <label className="labels">Education</label>
                        
                             {contact.education.map((name, index) => (
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
                    {contact.degree.map((name, index) => (
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
                    {contact.school_college.map((name, index) => (
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
                      contact.action4.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall4(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      ))
                    }
                    </div>
                     <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn4}>+</button></div>
                
                    <div className="col-md-4"><label className="labels">Loan</label>
                    {
                      contact.loan.map((item,index)=>
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
                      contact.bank.map((item,index)=>
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
                      contact.amount.map((item,index)=>
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
                      contact.action5.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall5(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      ))
                    }
                    </div>
                    <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn5}>+</button></div>

                    
                    <div className="col-md-4"><label className="labels">Social Media</label>
                    {
                      contact.social_media.map((item,index)=>
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
                      contact.url.map((item,index)=>
                      (
                        <input type="text" className="form-control form-control-sm" style={{marginTop:"10px"}} 
                        onChange={(event)=>handleurlChange(index,event)}/>
                      ))
                    }
                    </div>
                    <div className="col-md-1" style={{marginTop:"90px"}}>
                    {
                      contact.action6.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall6(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      ))
                    }
                    </div>
                    <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn6}>+</button></div>

                    <div className="col-md-4"><label className="labels">Income</label>
                    {
                      contact.income.map((item,index)=>
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
                      contact.amount1.map((item,index)=>
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
                      contact.action7.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall7(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      ))
                    }
                    </div>
                    <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn7}>+</button></div>
                   
                    <div className="col-md-3"><label className="labels">Document No.</label>
                    {
                      contact.document_no.map((item,index)=>
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
                      contact.document_name.map((item,index)=>
                      (
                        // <input type="text" 
                        // style={{marginTop:"10px"}}
                        // className="form-control form-control-sm" 
                        // onChange={(event)=>handledocumentnamechange(index,event)}
                        // />
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
                      contact.document_pic.map((item,index)=>
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
                      contact.action8.map((item,index)=>
                      (
                        <div style={{marginTop:"10px"}}><img  src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" alt="delete button" onClick={()=>deleteall8(index)}  style={{height:"40px",cursor:"pointer"}}/></div>
                      ))
                    }
                    </div>
                    <div className="col-md-1" ><label className="labels">add</label><button className="form-control form-control-sm" onClick={addFn8}>+</button></div>
                 <div className='col-md-12'><hr></hr></div> 
                    <ToastContainer/>
                </div>
                <div className='row' style={{marginLeft:"50%"}}>
                    <div className="col-md-4" style={{marginTop:"20px"}}><button className="form-control form-control-sm">Cancel</button></div>
                    <div className="col-md-5" style={{marginTop:"20px"}}><button className="form-control form-control-sm">Save & View Contact</button></div>
                    <div className="col-md-3" style={{marginTop:"20px"}}><button className="form-control form-control-sm" onClick={addcontact}>Save</button></div>
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

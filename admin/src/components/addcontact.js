import { useState } from 'react';
import'../css/addcontact.css';
import Header1 from './header1';
import Sidebar1 from './sidebar1';
import axios from 'axios';
import { ToastContainer, toast} from 'react-toastify';



function Addcontact() {

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
						<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyi_CVTmoL1ITHFxQkfLwvj93hcsgA1Olkhg&s" alt='' style={{height:"25px",position:"absolute",marginLeft:"33%",marginTop:"2%"}}/>
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
                    <option value="93">Afghanistan +93</option>
                    <option value="358">Aland Islands +358</option>
                    <option value="355">Albania +355</option>
                    <option value="213">Algeria +213</option>
                    <option value="1684">American Samoa +1684</option>
                    <option value="376">Andorra +376</option>
                    <option value="244">Angola +244</option>
                    <option value="1264">Anguilla +1264</option>
                    <option value="672">Antarctica +672</option>
                    <option value="1268">Antigua and Barbuda +1268</option>
                    <option value="54">Argentina +54</option>
                    <option value="374">Armenia +374</option>
                    <option value="297">Aruba +297</option>
                    <option value="61">Australia +61</option>
                    <option value="43">Austria +43</option>
                    <option value="994">Azerbaijan +994</option>
                    <option value="1242">Bahamas +1242</option>
                    <option value="973">Bahrain +973</option>
                    <option value="880">Bangladesh +880</option>
                    <option value="1246">Barbados +1246</option>
                    <option value="375">Belarus +375</option>
                    <option value="32">Belgium +32</option>
                    <option value="501">Belize +501</option>
                    <option value="229">Benin +229</option>
                    <option value="1441">Bermuda +1441</option>
                    <option value="975">Bhutan +975</option>
                    <option value="591">Bolivia +591</option>
                    <option value="599">Bonaire, Sint Eustatius and Saba +599</option>
                    <option value="387">Bosnia and Herzegovina +387</option>
                    <option value="267">Botswana +267</option>
                    <option value="55">Bouvet Island +55</option>
                    <option value="55">Brazil +55</option>
                    <option value="246">British Indian Ocean Territory +246</option>
                    <option value="673">Brunei Darussalam +673</option>
                    <option value="359">Bulgaria +359</option>
                    <option value="226">Burkina Faso +226</option>
                    <option value="257">Burundi +257</option>
                    <option value="855">Cambodia +855</option>
                    <option value="237">Cameroon +237</option>
                    <option value="1">Canada +1</option>
                    <option value="238">Cape Verde +238</option>
                    <option value="1345">Cayman Islands +1345</option>
                    <option value="236">Central African Republic +236</option>
                    <option value="235">Chad +235</option>
                    <option value="56">Chile +56</option>
                    <option value="86">China +86</option>
                    <option value="61">Christmas Island +61</option>
                    <option value="672">Cocos (Keeling) Islands +672</option>
                    <option value="57">Colombia +57</option>
                    <option value="269">Comoros +269</option>
                    <option value="242">Congo +242</option>
                    <option value="242">Congo, Democratic Republic of the Congo +242</option>
                    <option value="682">Cook Islands +682</option>
                    <option value="506">Costa Rica +506</option>
                    <option value="225">Cote D'Ivoire +225</option>
                    <option value="385">Croatia +385</option>
                    <option value="53">Cuba +53</option>
                    <option value="599">Curacao +599</option>
                    <option value="357">Cyprus +357</option>
                    <option value="420">Czech Republic +420</option>
                    <option value="45">Denmark +45</option>
                    <option value="253">Djibouti +253</option>
                    <option value="1767">Dominica +1767</option>
                    <option value="1809">Dominican Republic +1809</option>
                    <option value="593">Ecuador +593</option>
                    <option value="20">Egypt +20</option>
                    <option value="503">El Salvador +503</option>
                    <option value="240">Equatorial Guinea +240</option>
                    <option value="291">Eritrea +291</option>
                    <option value="372">Estonia +372</option>
                    <option value="251">Ethiopia +251</option>
                    <option value="500">Falkland Islands (Malvinas) +500</option>
                    <option value="298">Faroe Islands +298</option>
                    <option value="679">Fiji +679</option>
                    <option value="358">Finland +358</option>
                    <option value="33">France +33</option>
                    <option value="594">French Guiana +594</option>
                    <option value="689">French Polynesia +689</option>
                    <option value="262">French Southern Territories +262</option>
                    <option value="241">Gabon +241</option>
                    <option value="220">Gambia +220</option>
                    <option value="995">Georgia +995</option>
                    <option value="49">Germany +49</option>
                    <option value="233">Ghana +233</option>
                    <option value="350">Gibraltar +350</option>
                    <option value="30">Greece +30</option>
                    <option value="299">Greenland +299</option>
                    <option value="1473">Grenada +1473</option>
                    <option value="590">Guadeloupe +590</option>
                    <option value="1671">Guam +1671</option>
                    <option value="502">Guatemala +502</option>
                    <option value="44">Guernsey +44</option>
                    <option value="224">Guinea +224</option>
                    <option value="245">Guinea-Bissau +245</option>
                    <option value="592">Guyana +592</option>
                    <option value="509">Haiti +509</option>
                    <option value="39">Holy See (Vatican City State) +39</option>
                    <option value="504">Honduras +504</option>
                    <option value="852">Hong Kong +852</option>
                    <option value="36">Hungary +36</option>
                    <option value="354">Iceland +354</option>
                    <option value="91">India +91</option>
                    <option value="62">Indonesia +62</option>
                    <option value="98">Iran, Islamic Republic of +98</option>
                    <option value="964">Iraq +964</option>
                    <option value="353">Ireland +353</option>
                    <option value="44">Isle of Man +44</option>
                    <option value="972">Israel +972</option>
                    <option value="39">Italy +39</option>
                    <option value="1876">Jamaica +1876</option>
                    <option value="81">Japan +81</option>
                    <option value="44">Jersey +44</option>
                    <option value="962">Jordan +962</option>
                    <option value="7">Kazakhstan +7</option>
                    <option value="254">Kenya +254</option>
                    <option value="686">Kiribati +686</option>
                    <option value="850">Korea, Democratic People's Republic of +850</option>
                    <option value="82">Korea, Republic of +82</option>
                    <option value="381">Kosovo +383</option>
                    <option value="965">Kuwait +965</option>
                    <option value="996">Kyrgyzstan +996</option>
                    <option value="856">Lao People's Democratic Republic +856</option>
                    <option value="371">Latvia +371</option>
                    <option value="961">Lebanon +961</option>
                    <option value="266">Lesotho +266</option>
                    <option value="231">Liberia +231</option>
                    <option value="218">Libyan Arab Jamahiriya +218</option>
                    <option value="423">Liechtenstein +423</option>
                    <option value="370">Lithuania +370</option>
                    <option value="352">Luxembourg +352</option>
                    <option value="853">Macao +853</option>
                    <option value="389">Macedonia, the Former Yugoslav Republic of +389</option>
                    <option value="261">Madagascar +261</option>
                    <option value="265">Malawi +265</option>
                    <option value="60">Malaysia +60</option>
                    <option value="960">Maldives +960</option>
                    <option value="223">Mali +223</option>
                    <option value="356">Malta +356</option>
                    <option value="692">Marshall Islands +692</option>
                    <option value="596">Martinique +596</option>
                    <option value="222">Mauritania +222</option>
                    <option value="230">Mauritius +230</option>
                    <option value="262">Mayotte +262</option>
                    <option value="52">Mexico +52</option>
                    <option value="691">Micronesia, Federated States of +691</option>
                    <option value="373">Moldova, Republic of +373</option>
                    <option value="377">Monaco +377</option>
                    <option value="976">Mongolia +976</option>
                    <option value="382">Montenegro +382</option>
                    <option value="1664">Montserrat +1664</option>
                    <option value="212">Morocco +212</option>
                    <option value="258">Mozambique +258</option>
                    <option value="95">Myanmar +95</option>
                    <option value="264">Namibia +264</option>
                    <option value="674">Nauru +674</option>
                    <option value="977">Nepal +977</option>
                    <option value="31">Netherlands +31</option>
                    <option value="599">Netherlands Antilles +599</option>
                    <option value="687">New Caledonia +687</option>
                    <option value="64">New Zealand +64</option>
                    <option value="505">Nicaragua +505</option>
                    <option value="227">Niger +227</option>
                    <option value="234">Nigeria +234</option>
                    <option value="683">Niue +683</option>
                    <option value="672">Norfolk Island +672</option>
                    <option value="1670">Northern Mariana Islands +1670</option>
                    <option value="47">Norway +47</option>
                    <option value="968">Oman +968</option>
                    <option value="92">Pakistan +92</option>
                    <option value="680">Palau +680</option>
                    <option value="970">Palestinian Territory, Occupied +970</option>
                    <option value="507">Panama +507</option>
                    <option value="675">Papua New Guinea +675</option>
                    <option value="595">Paraguay +595</option>
                    <option value="51">Peru +51</option>
                    <option value="63">Philippines +63</option>
                    <option value="64">Pitcairn +64</option>
                    <option value="48">Poland +48</option>
                    <option value="351">Portugal +351</option>
                    <option value="1787">Puerto Rico +1787</option>
                    <option value="974">Qatar +974</option>
                    <option value="262">Reunion +262</option>
                    <option value="40">Romania +40</option>
                    <option value="7">Russian Federation +7</option>
                    <option value="250">Rwanda +250</option>
                    <option value="590">Saint Barthelemy +590</option>
                    <option value="290">Saint Helena +290</option>
                    <option value="1869">Saint Kitts and Nevis +1869</option>
                    <option value="1758">Saint Lucia +1758</option>
                    <option value="590">Saint Martin +590</option>
                    <option value="508">Saint Pierre and Miquelon +508</option>
                    <option value="1784">Saint Vincent and the Grenadines +1784</option>
                    <option value="684">Samoa +684</option>
                    <option value="378">San Marino +378</option>
                    <option value="239">Sao Tome and Principe +239</option>
                    <option value="966">Saudi Arabia +966</option>
                    <option value="221">Senegal +221</option>
                    <option value="381">Serbia +381</option>
                    <option value="381">Serbia and Montenegro +381</option>
                    <option value="248">Seychelles +248</option>
                    <option value="232">Sierra Leone +232</option>
                    <option value="65">Singapore +65</option>
                    <option value="721">Sint Maarten +721</option>
                    <option value="421">Slovakia +421</option>
                    <option value="386">Slovenia +386</option>
                    <option value="677">Solomon Islands +677</option>
                    <option value="252">Somalia +252</option>
                    <option value="27">South Africa +27</option>
                    <option value="500">South Georgia and the South Sandwich Islands +500</option>
                    <option value="211">South Sudan +211</option>
                    <option value="34">Spain +34</option>
                    <option value="94">Sri Lanka +94</option>
                    <option value="249">Sudan +249</option>
                    <option value="597">Suriname +597</option>
                    <option value="47">Svalbard and Jan Mayen +47</option>
                    <option value="268">Swaziland +268</option>
                    <option value="46">Sweden +46</option>
                    <option value="41">Switzerland +41</option>
                    <option value="963">Syrian Arab Republic +963</option>
                    <option value="886">Taiwan, Province of China +886</option>
                    <option value="992">Tajikistan +992</option>
                    <option value="255">Tanzania, United Republic of +255</option>
                    <option value="66">Thailand +66</option>
                    <option value="670">Timor-Leste +670</option>
                    <option value="228">Togo +228</option>
                    <option value="690">Tokelau +690</option>
                    <option value="676">Tonga +676</option>
                    <option value="1868">Trinidad and Tobago +1868</option>
                    <option value="216">Tunisia +216</option>
                    <option value="90">Turkey +90</option>
                    <option value="7370">Turkmenistan +7370</option>
                    <option value="1649">Turks and Caicos Islands +1649</option>
                    <option value="688">Tuvalu +688</option>
                    <option value="256">Uganda +256</option>
                    <option value="380">Ukraine +380</option>
                    <option value="971">United Arab Emirates +971</option>
                    <option value="44">United Kingdom +44</option>
                    <option value="1">United States +1</option>
                    <option value="1">United States Minor Outlying Islands +1</option>
                    <option value="598">Uruguay +598</option>
                    <option value="998">Uzbekistan +998</option>
                    <option value="678">Vanuatu +678</option>
                    <option value="58">Venezuela +58</option>
                    <option value="84">Viet Nam +84</option>
                    <option value="1284">Virgin Islands, British +1284</option>
                    <option value="1340">Virgin Islands, U.s. +1340</option>
                    <option value="681">Wallis and Futuna +681</option>
                    <option value="212">Western Sahara +212</option>
                    <option value="967">Yemen +967</option>
                    <option value="260">Zambia +260</option>
                    <option value="263">Zimbabwe +263</option>
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

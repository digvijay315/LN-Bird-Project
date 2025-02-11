import {React,useState} from 'react'
import { Select, MenuItem, Checkbox, ListItemText  } from '@mui/material';
import { Button } from 'react-bootstrap';
import '../css/login1.css'


function Dietform() {


  const[dietplan,setdietplan]=useState({Gender:"",Weight:"",Height_feet:"",Height_inches:"",Age:"",Activity_Level:"",Dietary_Preference:"",
    Dietary_Restrictions:[],Digestive_Issues:[],Food_Allergies:[]})


  const dietary_restrictionslist = [
    'Gluten-free diet',
    'Dairy-free diet',
    'Lactose intolerance',
    'Low-sodiam diet',
    'Low-fat diet',
    'Low-crab diet',
    'Sugar-free diet',
    'Paleo diet',
    'FODMAP diet',
    'No red meat'
];
  const [diet_restrictions, setdiet_restrictions] = useState([]);

  const handledietrestrictionschange = (event) => {
    const {
        target: { value },
    } = event;

    const selectedOwners = typeof value === 'string' ? value.split(',') : value;

    setdiet_restrictions(selectedOwners);
    setdietplan({ ...dietplan, dietary_restrictions: selectedOwners });
};

const digestiveissues = [
  'None',
  'Occasional bloating',
  'Acid reflux',
  'IBS',
  'Constipation',
  'Diarrhea',
  'Stomach pain',
  'Nausea',
  'Excessive gas'
];
const [digestive_issues, setdigestive_issues] = useState([]);

const handledigestiveissueschange = (event) => {
  const {
      target: { value },
  } = event;

  const selectedOwners = typeof value === 'string' ? value.split(',') : value;

  setdigestive_issues(selectedOwners);
  setdietplan({ ...dietplan, digestive_issues: selectedOwners });
};

const foodallergies = [
  'None',
  'Peanuts',
  'Tree nuts',
  'Shellfish',
  'Fish',
  'Eggs',
  'Milk',
  'Soy',
  'Wheat',
  'Sesame',
  'Corn',
  'Legumes'
];
const [food_allergies, setfood_allergies] = useState([]);

const handlefoodallergieschange = (event) => {
  const {
      target: { value },
  } = event;

  const selectedOwners = typeof value === 'string' ? value.split(',') : value;

  setfood_allergies(selectedOwners);
  setdietplan({ ...dietplan, food_allergies: selectedOwners });
};



  return (
    <div style={{backgroundColor:"#783894"}}>
      <div style={{width:"50%",marginLeft:"30%",marginTop:"10%",border:"1px solid black",backgroundColor:"white",borderRadius:"10px",padding:"30px"}}>
      <h2 style={{fontWeight:"bold"}}>Hello, I am Friska</h2>
      <p>Your Personalized Nutrition Assistant</p>
      <div style={{border:"1px solid black",padding:"20px",borderRadius:"10px",}}>
      <div className='row' style={{lineHeight:"40px"}}>
        <h4 style={{fontWeight:"bold"}}>Your Profile</h4>
        <div className='col-md-5'><label className='labels'>Gender</label>
         <select className='form-control'>
          <option>Male</option>
          <option>Female</option>
         </select>
        </div>
        <div className='col-md-5'><label className='labels'>Activity Level</label>
         <select className='form-control'>
          <option>Male</option>
          <option>Female</option>
         </select>
        </div>
        <div className='col-md-2'></div>

        <div className='col-md-5'><label className='labels'>Weight (kg)</label>
        <input className='form-control' type='number'/>
        </div>
        <div className='col-md-5'><label className='labels'>Dietary Preference</label>
         <select className='form-control '>
          <option>None</option>
          <option>Halal</option>
          <option>Kosher</option>
          <option>Vegetarian</option>
          <option>Vegan</option>
          <option>Non Vegetarian</option>
          <option>Pescatarian</option>
          <option>No Pork</option>
          <option>No Beef</option>
          <option>Alcohol free diet</option>
         </select>
        </div>
        <div className='col-md-2'></div>

        <div className='col-md-5'><label className='labels'>Height (feet)</label>
        <input className='form-control' type='number'/>
        </div>
        <div className='col-md-5'><label className='labels'>Dietary Restrictions</label>
        <Select className="form-control " style={{border:"none",height:"38px"}}
                    multiple
                    value={diet_restrictions}
                     onChange={handledietrestrictionschange}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {dietary_restrictionslist.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={diet_restrictions.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
        </div>
        <div className='col-md-2'></div>

        <div className='col-md-5'><label className='labels'>Height (inches)</label>
        <input className='form-control' type='number'/>
        </div>
        <div className='col-md-5'><label className='labels'>Digestive Issues</label>
        <Select className="form-control " style={{border:"none",height:"38px"}}
                    multiple
                    value={digestive_issues}
                     onChange={handledigestiveissueschange}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {digestiveissues.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={digestive_issues.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
        </div>
        <div className='col-md-2'></div>

        <div className='col-md-5'><label className='labels'>Age</label>
        <input className='form-control' type='number'/>
        </div>
        <div className='col-md-5'><label className='labels'>Food Allergies</label>
        <Select className="form-control " style={{border:"none",height:"38px"}}
                    multiple
                    value={food_allergies}
                     onChange={handlefoodallergieschange}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {foodallergies.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={food_allergies.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
        </div>
        <div className='col-md-2'></div>

        <div className='col-md-4' style={{marginTop:"20px"}}><Button className='buttons' style={{backgroundColor:"#783894",color:"white"}}>Generate Meal Plan</Button></div>

      </div>
      </div>
      </div>
    </div>
  )
}

export default Dietform

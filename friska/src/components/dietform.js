import {React,useEffect,useState} from 'react'
import { Select, MenuItem, Checkbox, ListItemText  } from '@mui/material';
import { Button } from 'react-bootstrap';
import '../css/login1.css'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Dietform() {

  const navigate=useNavigate()

  const id2=localStorage.getItem('id')
  const username2=localStorage.getItem('username')

 

  const[dietplan,setdietplan]=useState({UserID:"",username:"",BMI:0,TDEE:0,Gender:"Male",Weight:0,Height_feet:0,Height_inches:0,Age:0,Activity_Level:"Sedentary",Dietary_Preference:"None",
    Dietary_Restrictions:"",Digestive_Issues:"",Food_Allergies:"",Aggrevating_Foods:""})

    useState(()=>
      {
        setdietplan({...dietplan,UserID:id2,username:username2})
    
      },[])

      console.log(dietplan);
      
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
    setdietplan({ ...dietplan, Dietary_Restrictions: selectedOwners.join(',') });
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
  setdietplan({ ...dietplan, Digestive_Issues: selectedOwners.join(',') });
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
  setdietplan({ ...dietplan, Food_Allergies: selectedOwners.join(',') });
};

const foodsaggravatingdigestiveissues = [
  'Dairy products',
  'Gluten-containing foods',
  'Fried or greasy foods',
  'Spicy foods',
  'Caffeinated beverages',
  'Carbonated drinks',
  'Alcohol',
  'High-fat foods',
  'High-fiber foods',
  'Raw vegetables',
  'Fruits high in acid',
  'Chocolate',
  'Garlic and onions',
  'Processed or packaged foods'
];
const [foodsaggravating, setfoodsaggravating] = useState([]);

const handlefoodsaggravatingdigestiveissueschange = (event) => {
  const {
      target: { value },
  } = event;

  const selectedOwners = typeof value === 'string' ? value.split(',') : value;

  setfoodsaggravating(selectedOwners);
  setdietplan({ ...dietplan, Aggrevating_Foods: selectedOwners.join(',') });
};


  // BMI calculation
  const calculateBmi = (weight, height_feet, height_inches) => {
    const heightInCm = (height_feet * 30.48) + (height_inches * 2.54); // Convert feet and inches to cm
    const heightInM = heightInCm / 100; // Convert cm to meters
    return weight / (heightInM ** 2); // BMI formula
  };

// TDEE calculation
const calculateTdee = (gender, weight, height, age, activity_level) => {
  let bmr;
  if (gender.toLowerCase() === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const activity_factors = {
    sedentary: 1.2,
    "lightly active": 1.375,
    "moderately active": 1.55,
    "very active": 1.725,
    "extra active": 1.9
  };

  // Multiply BMR by the activity factor to calculate TDEE
  const tdee = bmr * activity_factors[activity_level.toLowerCase()];

  // Round the TDEE to the nearest integer
  return Math.round(tdee); // Ensure no decimals in the TDEE
};


  // UseEffect to automatically calculate BMI and TDEE whenever relevant state changes
  useEffect(() => {
    // Only calculate if all required fields are provided
    if (dietplan.Weight && dietplan.Height_feet && dietplan.Height_inches && dietplan.Age && dietplan.Gender && dietplan.Activity_Level) {
      // Convert height into cm (feet to inches to cm)
      const heightCm = (dietplan.Height_feet * 30.48) + (dietplan.Height_inches * 2.54);

      // Calculate BMI
      const bmi = calculateBmi(dietplan.Weight, dietplan.Height_feet, dietplan.Height_inches);
      
      // Calculate TDEE
      const tdee = calculateTdee(dietplan.Gender, dietplan.Weight, heightCm, dietplan.Age, dietplan.Activity_Level);

      // Update state with the calculated BMI and TDEE
      setdietplan((prevDietplan) => ({
        ...prevDietplan,
        BMI: bmi,
        TDEE: parseFloat(tdee)
      }));
    }
  }, [dietplan.Weight, dietplan.Height_feet, dietplan.Height_inches, dietplan.Age, dietplan.Gender, dietplan.Activity_Level]);


  const question = `Please create a personalized meal plan based on the following profile:
- Gender: ${dietplan.Gender}
- Age: ${dietplan.Age} years
- Weight: ${dietplan.Weight} kg
- Height: ${dietplan.Height_feet} feet ${dietplan.Height_inches} inches
- BMI: ${dietplan.BMI}
- TDEE: ${dietplan.TDEE} calories/day
- Activity Level: ${dietplan.Activity_Level}
- Dietary Preference: ${dietplan.Dietary_Preference}
- Dietary Restrictions: ${dietplan.Dietary_Restrictions}
- Digestive Issues: ${dietplan.Digestive_Issues}
- Aggravating Foods: ${dietplan.Aggrevating_Foods}
- Food Allergies: ${dietplan.Food_Allergies}

Please provide a detailed one-day meal plan with specific portions, timing, and a nutritional breakdown.
The meal plan should avoid all dietary restrictions, aggravating foods, and allergens while ensuring balanced nutrition based on the user's TDEE.`;

// Define food_database
const food_database = "Generate Food Menu";

// Construct the full object to send in the POST request
const requestData = {
  chat_history: [],  // Empty array for now, or you can add previous messages if needed
  question: question,
  food_database: food_database
};

const [loading, setLoading] = useState(false);

const[answer,setanswer]=useState([])
const getdietplan = async () => {
  setLoading(true); // Start loading indicator when function is triggered

  if (dietplan.Age < 40 || dietplan.Age > 80) {
    setLoading(false); // Stop loading if validation fails
    Swal.fire({
      title: 'Age Restriction',
      text: 'Age should be between 40 to 80!',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
    return;
  }
  if (dietplan.Weight < 20 || dietplan.Weight > 1400) {
    setLoading(false); // Stop loading if validation fails
    Swal.fire({
      title: 'Weight Restriction',
      text: 'Weight should be between 20lbs to 1400lbs!',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
    return;
  }

  try {
    const resp = await axios.post('https://friskaaiapi.azurewebsites.net/dietinfoupdate', dietplan);
    const resp1 = await axios.post('https://friskaaiapi.azurewebsites.net/aiprompt', requestData);
    console.log(resp1);

    if (resp1.status === 200) {
      const updatedRequestData = {
        ...requestData,
        food_database: resp1.data.answer, // Change food_database to the value from resp1.result
      };

      const resp2 = await axios.post('https://friskaaiapi.azurewebsites.net/aiprompt', updatedRequestData);
      setanswer(resp2.data.answer)

      Swal.fire({
        title: 'Success',
        text: resp.data.message,
        icon: 'success',
        confirmButtonText: 'Ok',
      });

      setTimeout(() => {
        navigate('/chatai', { state: { answer: resp2.data.answer,foodData:resp1.data.answer } });
      }, 2000);
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Failed to get the expected response from the AI prompt API!',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: 'Error',
      text: 'An error occurred while processing the request!',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  } finally {
    setLoading(false); // Stop loading once everything is done
  }
};

// ===================================================submit code================================================================

  const savediet=async()=>
  {
    try {
      if (dietplan.Age < 40 || dietplan.Age > 80) {
        setLoading(false); // Stop loading if validation fails
        Swal.fire({
          title: 'Age Restriction',
          text: 'Age should be between 40 to 80!',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        return;
      }
      if (dietplan.Weight < 20 || dietplan.Weight > 1400) {
        setLoading(false); // Stop loading if validation fails
        Swal.fire({
          title: 'Weight Restriction',
          text: 'Weight should be between 20lbs to 1400lbs!',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        return;
      }
      const resp=await axios.post('https://friskaaiapi.azurewebsites.net/dietinfocreate',dietplan)
      Swal.fire({
        icon:"success",
        title:"Submit",
        text:"Diet plan saved"
      })
      setTimeout(() => {
        navigate('/chatai')
      }, 2000);
      
    } catch (error) {
      console.log(error);
      
    }
  }


  return (
    <div style={{backgroundColor:"#783894"}}>
      <div style={{width:"50%",marginLeft:"30%",border:"1px solid black",backgroundColor:"white",borderRadius:"10px",padding:"30px"}}>
      <h2 style={{fontWeight:"bold"}}>Hello, I am Friska NutriAi</h2>
      <p>Your Personal Nutrition Assistant</p>
      <div style={{border:"1px solid black",padding:"20px",borderRadius:"10px",}}>
      <div className='row' style={{lineHeight:"40px"}}>
        <h4 style={{fontWeight:"bold"}}>Your Profile</h4>
        <div className='col-md-5'><label className='labels'>Gender</label>
         <select className='form-control' onChange={(e)=>setdietplan({...dietplan,Gender:e.target.value})}>
          <option>Male</option>
          <option>Female</option>
         </select>
        </div>
        <div className='col-md-5'><label className='labels'>Activity Level</label>
         <select className='form-control' onChange={(e)=>setdietplan({...dietplan,Activity_Level:e.target.value})}>
          <option>Sedentary</option>
          <option>Lightly active</option>
          <option>Moderately active</option>
          <option>Very active</option>
          <option>Extra active</option>
         </select>
        </div>
        <div className='col-md-2'></div>

        <div className='col-md-5'><label className='labels'>Weight (lbs)</label>
        <input className='form-control' type='number' onChange={(e)=>setdietplan({...dietplan,Weight:parseFloat(e.target.value)})}/>
        </div>
        <div className='col-md-5'><label className='labels'>Dietary Preference</label>
         <select className='form-control' onChange={(e)=>setdietplan({...dietplan,Dietary_Preference:e.target.value})}>
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
        <input className='form-control' type='number' onChange={(e)=>setdietplan({...dietplan,Height_feet:parseFloat(e.target.value)})}/>
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
        <input className='form-control' type='number' onChange={(e)=>setdietplan({...dietplan,Height_inches:parseFloat(e.target.value)})}/>
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
        <input className='form-control' type='number'    min='40' max='80' onChange={(e)=>setdietplan({...dietplan,Age:parseFloat(e.target.value)})}/>
        </div>
        <div className='col-md-5'><label className='labels'>Foods aggravating Digestive Issues</label>
        <Select className="form-control " style={{border:"none",height:"38px"}}
                    multiple
                    value={foodsaggravating}
                     onChange={handlefoodsaggravatingdigestiveissueschange}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {foodsaggravatingdigestiveissues.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={foodsaggravating.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
        </div>
        <div className='col-md-2'></div>

        <div className="col-md-5"></div>
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

        {/* <div className='col-md-4' style={{marginTop:"20px"}}><Button className='buttons' onClick={getdietplan}  style={{backgroundColor:"#783894",color:"white",borderRadius:"20px"}}> 
        {loading ? (
          <span>Loading...</span> 
        ) : (
          'Generate Meal Plan'
        )}
          </Button>
          
      {loading && (
          <div className="spinner-container">
          <div className="spinner"></div> {/* Circle spinner 
        </div>
      )}

           </div> */}
          <div className='col-md-4' style={{marginTop:"20px"}}><Button className='buttons' onClick={savediet}  style={{backgroundColor:"#783894",color:"white",borderRadius:"20px"}}>
        Submit
          </Button>
          </div>

      </div>
      </div>
      </div>
 
    </div>
  )
}

export default Dietform

import React, { useState, useEffect } from "react";
import '../css/chaiai.css'
import { useLocation } from "react-router-dom";
import axios from "axios";

const Chatai = () => {
  

  const location=useLocation()
  const rawData = location.state.answer;
  const fooddata=location.state.foodData

  
  // const food_database=fooddata
  // const answer=rawData
 
  const [input,setinput]=useState("")





  const [chat_history, setchat_history] = useState([{
    inputs: {
      question: input,
      food_database: fooddata
    },
    outputs: {
      answer: rawData
    }
  }]);

 



  const [chatHistory, setChatHistory] = useState([]); 
 const fetchMealPlan = async () => {
  try {
    // Pass the chat history, user input, and food database as query parameters
    const response = await axios.post('https://friskaaiapi.azurewebsites.net/aiprompt', {
      chat_history: chat_history, // Pass chat history as a stringified JSON
      question: input,
      food_database:fooddata // Pass food database as a stringified JSON
    });
    console.log(response.data.question);
console.log(response.data.answer);
setChatHistory([...chatHistory,response.data]);

    return response.data.answer; // Assuming the API returns the answer in `response.data.answer`
  } catch (error) {
    console.error('Error fetching meal plan:', error);
    throw new Error('Failed to fetch meal plan');
  }
};

console.log(chatHistory);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Fetch the meal plan from API using Axios and update chat history
  //     const mealPlanResponse = await fetchMealPlan(chatHistory, userInput, foodDatabase);

  //     // Update chat history with the new question and meal plan response
  //     const newChatHistory = [
  //       ...chatHistory,
  //       {
  //         inputs: {
  //           question: userInput,
  //           // food_database: foodDatabase,
  //         },
  //         outputs: {
  //           answer: mealPlanResponse.answer,
  //         },
  //       },
  //     ];
  //     setChatHistory(newChatHistory);
  //     setMealPlan(mealPlanResponse);
  //   } catch (error) {
  //     console.error("Error fetching meal plan:", error);
  //   }
  // };




  const mealSections = [
    {
      title: "Breakfast",
      content: rawData.split('#### Breakfast:')[1].split('#### Morning Snack:')[0].trim()
    },
    {
      title: "Morning Snack",
      content: rawData.split('#### Morning Snack:')[1].split('#### Lunch:')[0].trim()
    },
    {
      title: "Lunch",
      content: rawData.split('#### Lunch:')[1].split('#### Afternoon Snack:')[0].trim()
    },
    {
      title: "Afternoon Snack",
      content: rawData.split('#### Afternoon Snack:')[1].split('#### Dinner:')[0].trim()
    },
    {
      title: "Dinner",
      content: rawData.split('#### Dinner:')[1].split('### Total Daily Calories:')[0].trim()
    },
    {
      title: "Total Daily Calories",
      content: rawData.split('### Total Daily Calories:')[1].trim()
    },
  ];

   // Function to add numbering to the meal items
   const addNumbering = (content) => {

    const cleanedContent = content.replace(/\*\*/g, ''); 
    // Split the content by line breaks, then add numbering
    const lines = cleanedContent.split('\n').map((line, index) => {
      // Only process non-empty lines and wrap them in <li> tags
      if (line.trim()) {
        return `<li>${line.trim()}</li>`;
      }
      return '';
    }).join('');

    return `<ul>${lines}</ul>`; // Wrap the items in an ordered list
  };
  

  const [isHovered, setIsHovered] = useState(false);

  return (
<div className="row" style={{backgroundColor:"white"}}>
<div className="col-md-2" style={{marginTop:"5%",borderRight:"1px solid black",position:"fixed",height:"75vh",overflowY:"scroll"}}>
      <header style={styles.header}>
        <h5 style={{fontWeight:"bold"}}><u>Meal Plan History</u></h5>
      </header>
      <main style={{height:"60vh"}}>

     <ul>
    {/* Check if chatHistory is an array, and then map */}
    {Array.isArray(chatHistory) ? (
      chatHistory.map((chat, index) => (
        <li key={index}>
          <p><strong>Question:</strong> {chat.question}</p>
          <p><strong>Answer:</strong> {chat.answer}</p>
        </li>
      ))
    ) : (
      <p>No chat history available</p>
    )}
  </ul>
      </main>

      <footer style={styles.footer}>
        {/* <button style={styles.messageButton}>Save Chat Log</button> */}
        <button style={styles.messageButton}>Generate new meal plan</button>
      </footer>
     
</div>
    <div className="col-md-10" style={styles.container}>
      <header style={styles.header}>
        <h1 style={{fontWeight:"bold"}}>Friska NutriAI</h1>
        <p>Your personal nutrition assistant 😊</p>

        <p style={{textAlign:"left"}}>Hello! I'm glad to assist you in creating a personalized meal plan that aligns with your dietary preferences and restrictions.
 Based on your profile, here’s a one-day meal plan designed specifically for you.</p>
      </header>


      <main style={styles.main}>
      {mealSections.map((section, index) => (
        <div key={index} style={{ marginTop: '20px' }}>
          <h2 style={{ fontWeight: 'bold' }}>{section.title}</h2>
          <div 
            dangerouslySetInnerHTML={{ __html: addNumbering(section.content) }} 
          />
        </div>
      ))}

    

        <p>This meal plan exceeds your TDEE of 1961 calories/day, providing a total of 2827 calories. 
            If you would like to adjust or modify any part of the plan to better suit your needs, please let me know!</p><hr></hr>
            <p>You can now chat with the nutrition assistant about your meal plan or ask any nutrition-related questions!</p>
      </main>

 
        <div style={{display:"flex",marginBottom:"20px",gap:"10px",}}>
      <input style={{marginTop:"20px",borderRadius:"25px"}} placeholder="Your Message" type="text" className="form-control" onChange={(e)=>setinput(e.target.value)}></input>
      <button className="form-control" style={{height:"40px",width:"60px",marginTop:"20px",borderRadius:"10px"}} onClick={fetchMealPlan}>Send</button>
      </div>
    </div>
  
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    marginTop:"5%",
    
   
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop:"50px"
  },
  section: {
    borderBottom: "1px solid #ccc",
    paddingBottom: "10px",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  dietPlan: {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    borderRadius: "5px",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
  },
  footer: {
    textAlign: "left",
    marginTop: "20px",
  },
  messageButton: {
    backgroundColor:"#783894",
    color: "white",
    border: "1px solid black",
    padding: "10px 15px",
    cursor: "pointer",
    position:"fixed",
    marginTop:"70px",
    borderRadius:"20px",
    marginLeft:"20px",
  },

  messageButton2: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "5px",
    marginLeft:"50%"
   
  },
};

export default Chatai;
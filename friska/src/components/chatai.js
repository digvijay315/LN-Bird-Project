import React, { useState, useEffect } from "react";
import '../css/chaiai.css'
import { useLocation } from "react-router-dom";
import axios from "axios";
import {marked} from 'marked';
import ReactMarkdown from 'react-markdown';
import { Login } from "@mui/icons-material";
import { height, maxHeight, minHeight } from "@mui/system";
import send from '../images/send.png'

const Chatai = () => {
  

  useEffect(()=>
  {
    getchatdata()
  },[])

  const location=useLocation()
  const rawData = location.state.answer;
  const fooddata=location.state.foodData

  const [loading, setLoading] = useState(false);

  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Convert raw Markdown to HTML
    const convertedHtml = marked(rawData);
    setHtmlContent(convertedHtml);
  }, []);
  

 
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

 
  const[chat,setchat]=useState({User_Id:"",Chat_Id:"",Chat_Log:""})

  const id=localStorage.getItem('id')

const setCurrentChatId = () => {
  const currentDate = new Date();
  const formattedDateTime = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;

  setchat((prevChat) => ({
    ...prevChat,
    Chat_Id: formattedDateTime,  // Set current date-time as Chat_Id
  }));
};

useState(()=>
  {
    setchat({...chat,User_Id:id})
    setCurrentChatId()
  },[id])






  const [chatHistory, setChatHistory] = useState([]); 
 const fetchMealPlan = async () => {
  setLoading(true);
  document.getElementById("myInput").value = "";
  try {
    // Pass the chat history, user input, and food database as query parameters
    const response = await axios.post('https://friskaaiapi.azurewebsites.net/aiprompt', {
      chat_history: chat_history, // Pass chat history as a stringified JSON
      question: input,
      food_database:fooddata // Pass food database as a stringified JSON
    });

    setChatHistory([...chatHistory,response.data]);
    const updatedChat = { ...chat, Chat_Log: response.data.answer };


    const response2=await axios.post('https://friskaaiapi.azurewebsites.net/create-chat-log/',updatedChat)
    console.log(response2);
    return response.data.answer; // Assuming the API returns the answer in `response.data.answer`
  } catch (error) {
    console.error('Error fetching meal plan:', error);
    throw new Error('Failed to fetch meal plan');
  }finally {
    setLoading(false); // Stop loading once everything is done
  }
};


const [selectedChatLog, setSelectedChatLog] = useState(""); 
const handleButtonClick = (chatLog) => {
  setSelectedChatLog(chatLog); // Set the selected chat log
};
const[allchat,setallchat]=useState([])
  const getchatdata=async()=>
  {
    try {
        const resp=await axios.get(`https://friskaaiapi.azurewebsites.net/get-chat-logs/${id}`)
        setallchat(resp.data.data)
    } catch (error) {
      console.log(error);
      
    }
  }

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); 
      // document.getElementById("myInput").value = "";
      fetchMealPlan(); // Call your function
    }
  };



 

  return (
<div className="row" style={{backgroundColor:"white",position: "relative"}}>
<div className="col-md-2" style={{marginTop:"4%",borderRight:"1px solid black",position:"fixed",height:"75vh",overflowY:"auto"}}>
<style>
    {/* Hide scrollbar for Webkit browsers */}
    {`
      .col-md-2::-webkit-scrollbar {
        width: 0px;
        height: 0px;
      }
      .col-md-2::-webkit-scrollbar-track {
        background: transparent;
      }
      .col-md-2::-webkit-scrollbar-thumb {
        background: transparent;
      }
    `}
  </style>
      <header style={styles.header}>
        <h5 style={{fontWeight:"bold"}}><u>Meal Plan History</u></h5>
      </header>
      <main style={{height:"60vh",}}>
      {
         allchat?.slice().reverse().map((item)=>(
          <div style={{paddingLeft:"10px"}}>
          <button onClick={()=>handleButtonClick(item.Chat_Log)} style={{border:"1px solid black",marginTop:"10px"}} className="form-control">{item.Chat_Id}</button>
          </div>
         ))
      }
    
      </main>

      <footer style={styles.footer}>
        {/* <button style={styles.messageButton}>Save Chat Log</button> */}
        <button style={styles.messageButton}>Generate new meal plan</button>
      </footer>
     
</div>
    <div className="col-md-10" style={styles.container}>
      <div className="maindiv" style={{maxHeight:"80vh",overflowY:"auto"}}>
      <style>
    {/* Hide scrollbar for Webkit browsers */}
    {`
      .maindiv::-webkit-scrollbar {
        width: 1px;
        height: 1px;
      }
      .maindiv::-webkit-scrollbar-track {
        background: transparent;
      }
      .maindiv::-webkit-scrollbar-thumb {
        background: transparent;
      }
    `}
  </style>
      <header style={styles.header}>
        <h1 style={{fontWeight:"bold"}}>Friska NutriAI</h1>
        <p>Your personal nutrition assistant 😊</p>

        {/* <p style={{textAlign:"left",}}>Hello! I'm glad to assist you in creating a personalized meal plan that aligns with your dietary preferences and restrictions.
 Based on your profile, here’s a one-day meal plan designed specifically for you.</p> */}
      </header>


      
    <div>
      
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <hr></hr>
    </div>
      
      <div >
          
          {selectedChatLog && (
            <div style={{ marginTop: "40px", display: selectedChatLog ? 'block' : 'none' }}>
              {/* <h4>Selected Chat Log</h4> */}
              <ReactMarkdown>{selectedChatLog}</ReactMarkdown>
              <hr />
            </div>
          )}
          </div>

     <div  >
    {/* Check if chatHistory is an array, and then map */}
    {Array.isArray(chatHistory) ? (
      chatHistory.map((chat, index) => (
        
       <div style={{marginTop:"10px"}}>
          
          <p><strong>Question:</strong> {chat.question} </p>
          <p><strong>Answer:</strong></p>
          <div >
              {/* Render chat.answer in Markdown format */}
              <ReactMarkdown>{chat.answer}</ReactMarkdown>
            </div>
            <hr></hr>
          </div>
      ))
    ) : ""
      
    }
  </div>

    </div>
    </div>

    <div style={{ display: "flex",
      marginTop: "auto", // Ensure it's pushed to the bottom
      gap: "10px",
      position: "fixed", // Fixed position at bottom
      bottom: "20px", // 20px from the bottom
      left: "23%",
      transform: "translateX(-0%)",
      width: "50%",  // Adjust width as per your design
      zIndex: 1000 }}>
      <input id="myInput" style={{marginTop:"20px",borderRadius:"25px",border:"1px solid black"}}  onKeyDown={handleEnterPress} placeholder="Your Message" type="text"  className="form-control" onChange={(e)=>setinput(e.target.value)}></input>
      {/* <button className="form-control" style={{height:"40px",width:"60px",marginTop:"20px",}} > */}
        <img src={send} style={{height:"20px",marginLeft:"-50px",marginTop:"30px",cursor:"pointer"}} onClick={fetchMealPlan}></img>
      {loading && (
          <div className="triple-dots-container" style={{ marginTop: "20px",marginLeft:"20px" }}>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      )}

      {/* </button> */}
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
    marginTop:"1%",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  main: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop:"0px",
   
    
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

  '@media (max-width: 992px)': {
    container: {
      maxWidth: "90%",
      padding: "15px",
    },
    header: {
      fontSize: "1.5rem",
    },
    main: {
      marginTop: "30px",
    },
    messageButton: {
      position: "absolute",
      bottom: "20px",
      left: "20px",
    },
    messageButton2: {
      marginLeft: "0",
      marginTop: "20px",
    },
    colMd2: {
      display: "none", // Hide the fixed sidebar on smaller screens
    },
    colMd10: {
      width: "100%",
    },
    input: {
      width: "100%",
      marginBottom: "15px",
    },
    button: {
      width: "100%",
      marginTop: "10px",
    },
  },

  '@media (max-width: 768px)': {
    container: {
      padding: "10px",
    },
    header: {
      fontSize: "1.3rem",
    },
    messageButton: {
      position: "relative",
      bottom: "0",
    },
  },

  '@media (max-width: 576px)': {
    container: {
      padding: "10px",
    },
    header: {
      fontSize: "1.2rem",
    },
    messageButton: {
      position: "relative",
      bottom: "0",
      marginLeft: "10px",
    },
  },

};

export default Chatai;
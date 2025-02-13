import React, { useState } from 'react';
import axios from 'axios';

// Function to simulate the API call using axios.get
const fetchMealPlan = async (chatHistory, userInput, foodDatabase) => {
  try {
    // Pass the chat history, user input, and food database as query parameters
    const response = await axios.post('https://friskaaiapi.azurewebsites.net/aiprompt', {
      body: {
        chat_history:(chatHistory), // Pass chat history as a stringified JSON
        question: userInput,
        food_database:foodDatabase// Pass food database as a stringified JSON
      },
    });

    return response.data.answer; // Assuming the API returns the answer in `response.data.answer`
  } catch (error) {
    console.error('Error fetching meal plan:', error);
    throw new Error('Failed to fetch meal plan');
  }
};

const MealPlanChat = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [mealPlan, setMealPlan] = useState('');
  const foodDatabase=foodDatabase
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch the meal plan from API using Axios and update chat history
      const mealPlanResponse = await fetchMealPlan(chatHistory, userInput, foodDatabase);

      // Update chat history with the new question and meal plan response
      const newChatHistory = [
        ...chatHistory,
        {
          inputs: {
            question: userInput,
            // food_database: foodDatabase,
          },
          outputs: {
            answer: mealPlanResponse.answer,
          },
        },
      ];
      setChatHistory(newChatHistory);
      setMealPlan(mealPlanResponse);
    } catch (error) {
      console.error("Error fetching meal plan:", error);
    }
  };

  return (
    <div>
      <h1>Meal Plan Chat</h1>
      <div>
        <h2>Chat History</h2>
        <ul>
          {chatHistory.map((chat, index) => (
            <li key={index}>
              <p><strong>Question:</strong> {chat.inputs.question}</p>
              <p><strong>Answer:</strong> {chat.outputs.answer}</p>
            </li>
          ))}
        </ul>
      </div>
      

        <div>
          <label htmlFor="userInput">Ask a question:</label>
          <input
            type="text"
            id="userInput"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>Submit</button>
    

      {mealPlan && (
        <div>
          <h3>Meal Plan:</h3>
          <p>{mealPlan}</p>
        </div>
      )}
    </div>
  );
};

export default MealPlanChat;

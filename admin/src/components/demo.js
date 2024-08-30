import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/demo.css';

const SuggestionBox = () => {
  const [input, setInput] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allSuggestions, setAllSuggestions] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/viewcontact');
        const data = response.data.contact;
        
        // Extract the first_name field from the fetched data
        const names = data.map(item => item.first_name);
        setAllSuggestions(data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchSuggestions();
  }, []);

  // Filter suggestions based on user input
  useEffect(() => {
    if (input) {
      const results = allSuggestions.filter(contact =>
        contact.first_name?.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredSuggestions(results);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [input, allSuggestions]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSuggestionClick = (contact) => {
    setInput(contact.first_name);
    setShowSuggestions(false);
    setSelectedContact(contact); // Store the selected contact's data
  };

  return (
    <div className="suggestion-box">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Start typing your name..."
      />
      {showSuggestions && input && filteredSuggestions.length > 0 && (
        <ul className="suggestion-list">
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.first_name}
            </li>
          ))}
        </ul>
      )}
      
      {selectedContact && (
        <div className="contact-details">
          <h3>Contact Details</h3>
          <p><strong>First Name:</strong> {selectedContact.first_name}</p>
          <p><strong>Last Name:</strong> {selectedContact.last_name}</p>
          <p><strong>Email:</strong> {selectedContact.email}</p>
          <p><strong>Phone:</strong> {selectedContact.phone}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
};

export default SuggestionBox;

import React, { useState } from 'react';

const DynamicDetails = () => {
  const [details, setDetails] = useState({
    gender: '',
    names: ['']
  });

  // Function to handle adding a new input field
  const handleAddName = () => {
    setDetails({
      ...details,
      names: [...details.names, '']
    });
  };

  // Function to handle changes in the input fields
  const handleNameChange = (index, event) => {
    const newNames = [...details.names];
    newNames[index] = event.target.value;
    setDetails({
      ...details,
      names: newNames
    });
  };

  // Function to handle changes in the gender input field
  const handleGenderChange = (event) => {
    setDetails({
      ...details,
      gender: event.target.value
    });
  };

  // Function to handle deleting an input field
  const handleDeleteName = (index) => {
    const newNames = details.names.filter((_, i) => i !== index);
    setDetails({
      ...details,
      names: newNames
    });
  };

  // Function to save the entered details
  const handleSave = () => {
    console.log('Saved details:', details);
    // Here you can implement saving logic, e.g., sending data to a server or updating a database
  };

  return (
    <div>
      <div>
        <label>
          Gender:
          <input
            type="text"
            value={details.gender}
            onChange={handleGenderChange}
            placeholder="Gender"
          />
        </label>
      </div>
      {details.names.map((name, index) => (
        <div key={index}>
          <input
            type="text"
            value={name}
            onChange={(event) => handleNameChange(index, event)}
            placeholder={`Name ${index + 1}`}
          />
          <button onClick={() => handleDeleteName(index)}>Delete</button>
        </div>
      ))}
      <button onClick={handleAddName}>+</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default DynamicDetails;

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import api from "../api";
import '../css/addcontact.css';

const AddContactForm = () => {
  const [contact, setContact] = useState({
    title: "",
    first_name: "",
    last_name: "",
    mobile_no: "",
    email: "",
    document_pic: [] // Will hold the file objects
  });

  // Handles file input change
//   const handledocumentpicchange = (event) => {
//     const newFiles = Array.from(event.target.files[0]);
  
//     // Prevent adding files already in the state
//     const uniqueFiles = newFiles.filter((newFile) => {
//       return !contact.document_pic.some((existingFile) => {
//         return existingFile.name === newFile.name && existingFile.size === newFile.size;
//       });
//     });
  
//     // Update the state with unique files
//     setContact((prevState) => ({
//       ...prevState,
//       document_pic: [...prevState.document_pic, ...uniqueFiles],
//     }));
  
//     // Reset the file input to allow re-uploading the same file (if needed)
//     event.target.value = '';
//   };
  
const handledocumentpicchange = (event) => {
    const newFile = event.target.files[0];  // Get the first file selected
  
    // If there's already a file in the state, don't add a new one unless it's a different file
    if (newFile) {
      // Check if the selected file is already in the state (based on file name and size)
      const isDuplicate = contact.document_pic.some(
        (existingFile) =>
          existingFile.name === newFile.name && existingFile.size === newFile.size
      );
  
      if (!isDuplicate) {
        // If it's not a duplicate, replace the existing file with the new one
        setContact((prevState) => ({
          ...prevState,
          document_pic: [newFile], // Only store one file at a time
        }));
      }
    }
  
    // Reset the file input to allow re-uploading the same file (if needed)
    event.target.value = '';
  };
  
  // Handles form submission
  const addcontact = async (e) => {
   
  
    try {
      const formData = new FormData();
  
      // Manually append all contact data (excluding files)
      for (let key in contact) {
        if (Array.isArray(contact[key])) {
          contact[key].forEach((value) => {
            formData.append(key, value);
          });
        } else if (contact[key]) {
          formData.append(key, contact[key]);
        }
      }
  
      // Deduplicate files before adding to FormData
      const fileSet = new Set();
      const uniqueFiles = [];
  
      contact.document_pic.forEach((file) => {
        const fileKey = `${file.name}-${file.size}`;
        if (!fileSet.has(fileKey)) {
          uniqueFiles.push(file);
          fileSet.add(fileKey); // Mark file as added
        }
      });
  
      // Append unique files to FormData
      uniqueFiles.forEach((file) => {
        formData.append('document_pic', file);
      });
  
      // Debug: Log the FormData contents
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
  
      // Submit the FormData
      const resp = await api.post('addcontact', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (resp.status === 200) {
        toast.success(resp.data.message, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving contact', { autoClose: 2000 });
    }
  };
  

  return (
    <div style={{ marginLeft: "100px" }}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={contact.title}
          onChange={(e) => setContact({ ...contact, title: e.target.value })}
          required
        />
      </div>

      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="first_name"
          value={contact.first_name}
          onChange={(e) => setContact({ ...contact, first_name: e.target.value })}
          required
        />
      </div>

      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="last_name"
          value={contact.last_name}
          onChange={(e) => setContact({ ...contact, last_name: e.target.value })}
          required
        />
      </div>

      <div>
        <label>Mobile Number:</label>
        <input
          type="text"
          name="mobile_no"
          value={contact.mobile_no}
          onChange={(e) => setContact({ ...contact, mobile_no: e.target.value })}
          required
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={contact.email}
          onChange={(e) => setContact({ ...contact, email: e.target.value })}
          required
        />
      </div>

      {/* Document Upload */}
      {/* <div>
        <label>Document:</label>
        <input
          type="file"
          name="document_pic"
          onChange={handledocumentpicchange}
          multiple // Allow multiple file selection if needed
          required
        />
      </div> */}
      <input type='file' name='document_pic' onChange={handledocumentpicchange}/>

      <button type="button" onClick={addcontact}>Submit</button>
    </div>
  );
};

export default AddContactForm;

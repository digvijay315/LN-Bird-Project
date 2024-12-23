// import React, { useState } from 'react';
// import Form from 'react-bootstrap/Form';
// import { FaUpload } from 'react-icons/fa';
// import axios from 'axios';
// import { base_url } from "./Utils/base_url";

// const QuestionForm = ({ index, questionData, onChange, onDelete }) => {
//   const {
//     question,
//     subtitle,
//     options,
//     totalOptions,
//     points,
//     mathToggle,
//     multipleAnswers,
//     required,
//     mainCategory,
//     subCategory,
//   } = questionData;

//   const handleInputChange = (field, value) => {
//     onChange(index, { ...questionData, [field]: value });
//   };

//   const handleOptionChange = (idx, value) => {
//     const newOptions = [...options];
//     newOptions[idx].text = value;
//     handleInputChange('options', newOptions);
//   };

//   const toggleCorrect = (idx) => {
//     const newOptions = [...options];
//     newOptions[idx].correct = !newOptions[idx].correct;
//     handleInputChange('options', newOptions);
//   };

//   const addOption = () => {
//     handleInputChange('options', [...options, { text: '', correct: false }]);
//   };

//   const removeOption = (idx) => {
//     const newOptions = options.filter((_, i) => i !== idx);
//     handleInputChange('options', newOptions);
//   };

//   return (
//     <div className='main-container-div'>
//       <div className="question-form" style={{ position: 'relative' }}>

//       <style>
//         {       
//         `
//         .question-form {
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//           max-width: 100%;
//           margin: 1rem auto;
//           padding: 2rem;
//           border: 2px solid rgba(0,0,0,0.2);
//           border-radius: 8px;
//           background-color: #ffffff;
//           position: relative;
//         }
//         .question-input, .subtitle-input {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//         }
//           .footer-controls{
//           display: flex;
//           justify-content: space-between;
//           padding-top: 1rem;
//           border-top: 1px solid rgba(0,0,0,0.1);
//           }
//           .controls{
//           width: 30%;
//           margin: 1rem 0px;
//           }
//         .options-list {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//         }
//         .option-item {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }
//         .upload-icon {
//           margin-left: 8px;
//           cursor: pointer;
//           color: #007bff;
//         }
//         .control-item {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//         }
//           input{
//           height: 2.5rem;
//           padding-left: 10px;
//           }
//           .desc-del-btn{
//             background-color: transparent;
//             color: red;
//             box-shadow: none;
//             width: fit-content;
//             border-radius: 50%;
//             }
//             .desc-del-btn:hover{
//             background-color: red;
//             color: #ffffff
//             }
//             .add-option-btn{
//             background-color: #ffffff;
//             color: #7A1CAC;
//             border: 1px solid #7A1CAC;
//             width: 18%;
//             font-weight: 500;
//             }
//             .add-option-btn:hover{
//             background-color: #7A1CAC;
//             color: #ffffff;
//             }
//             .btn-div button{
//             background-color: #7A1CAC;
//             }
//             .btn-div button:hover{
//             background-color: #2E073F;
//             }
//             .dropdowns {
//             display: flex;
//             gap: 16px;
//             margin-top: 16px;
//           }
//             .dropdowns select {
//             border-color: rgba(0,0,0,0.5);
//             }
//         `
        
//         }
//       </style>
//         {/* Delete Button */}
//         <button
//           style={{
//             position: 'absolute',
//             top: '10px',
//             right: '10px',
//             backgroundColor: 'transparent',
//             color: '#000',
//             borderRadius: '50%',
//             cursor: 'pointer',
//             fontSize: '16px',
//             width: '24px',
//             height: '24px',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             opacity: '0.7',
//           }}
//           onClick={() => onDelete(index)}
//         >
//           <i className="fa-solid fa-trash-can"></i>
//         </button>

//         <h5>Question No. {index + 1}</h5>

//         <div className="question-input">
//           <input
//             type="text"
//             value={question}
//             onChange={(e) => handleInputChange('question', e.target.value)}
//             placeholder="Enter your question"
//             style={{ width: '100%' }}
//           />
//         </div>

//         <div className="subtitle-input">
//           <input
//             type="text"
//             value={subtitle}
//             onChange={(e) => handleInputChange('subtitle', e.target.value)}
//             placeholder="Enter a subtitle (optional)"
//           />
//         </div>

//         <div className="options-list">
//           {options.map((option, idx) => (
//             <div className="option-item" key={idx}>
//               <input
//                 type="checkbox"
//                 checked={option.correct}
//                 onChange={() => toggleCorrect(idx)}
//               />
//               <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <input
//                   type="text"
//                   value={option.text}
//                   onChange={(e) => handleOptionChange(idx, e.target.value)}
//                   placeholder={`Option ${idx + 1}`}
//                 />
//                 <FaUpload className="upload-icon" title="Upload Image" />
//               </div>
//               <button className="desc-del-btn" onClick={() => removeOption(idx)}>
//                 <i className="fa-regular fa-trash-can"></i>
//               </button>
//             </div>
//           ))}
//           <button className="add-option-btn" onClick={addOption}>
//             <i className="fa-solid fa-plus"></i> Add Option
//           </button>
//         </div>

//         <div className="dropdowns">
//           <div>
//             <label>Main Category:</label>
//             <select
//               value={mainCategory}
//               onChange={(e) => handleInputChange('mainCategory', e.target.value)}
//             >
//               <option value="">Select Main Category</option>
//               <option value="Category 1">Category 1</option>
//               <option value="Category 2">Category 2</option>
//             </select>
//           </div>
//           <div>
//             <label>Sub Category:</label>
//             <select
//               value={subCategory}
//               onChange={(e) => handleInputChange('subCategory', e.target.value)}
//             >
//               <option value="">Select Sub Category</option>
//               <option value="Sub Category 1">Sub Category 1</option>
//               <option value="Sub Category 2">Sub Category 2</option>
//             </select>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AddQuestionContainer = () => {
//   const [questions, setQuestions] = useState([]);

//   const addNewQuestion = () => {
//     setQuestions([
//       ...questions,
//       {
//         question: '',
//         subtitle: '',
//         options: [{ text: '', correct: false }],
//         totalOptions: 2,
//         points: 0,
//         mathToggle: false,
//         multipleAnswers: true,
//         required: false,
//         mainCategory: '',
//         subCategory: '',
//       },
//     ]);
//   };

//   const deleteQuestion = (index) => {
//     const newQuestions = questions.filter((_, i) => i !== index);
//     setQuestions(newQuestions);
//   };

//   const handleQuestionChange = (index, newQuestionData) => {
//     const newQuestions = [...questions];
//     newQuestions[index] = newQuestionData;
//     setQuestions(newQuestions);
//   };

//   const handleSaveAllQuestions = async () => {
//     try {
//       const response = await axios.post(`${base_url}/add_questions`, { questions });
//       if (response.status === 200) {
//         alert('Questions saved successfully!');
//         setQuestions([]); // Clear questions after saving
//       } else {
//         alert('Failed to save the questions. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error saving questions:', error);
//       alert('Failed to save the questions. Please check your network connection.');
//     }
//   };

//   return (
//     <div>
//       {questions.map((questionData, index) => (
//         <QuestionForm
//           key={index}
//           index={index}
//           questionData={questionData}
//           onChange={handleQuestionChange}
//           onDelete={deleteQuestion}
//         />
//       ))}

//       <div className="info-div-item btn-div">
//         <button id="add-newQues-btn" onClick={addNewQuestion}>
//           <i className="fa-solid fa-plus"></i> Add new question
//         </button>
//       </div>

//       <div className="info-div-item btn-div" style={{ marginTop: '1rem' }}>
//         <button onClick={handleSaveAllQuestions} style={{ backgroundColor: '#7A1CAC' }}>
//           Save All Questions
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddQuestionContainer;


import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';

const QuestionForm = ({ index, onDelete,onSaveQuestion }) => {
  const [question, setQuestion] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [options, setOptions] = useState([{ text: '', correct: false }]);
  const [points, setPoints] = useState(0);
  const [mathToggle, setMathToggle] = useState(false);
  const [multipleAnswers, setMultipleAnswers] = useState(false);
  const [required, setRequired] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleOptionChange = (idx, value) => {
    const newOptions = [...options];
    newOptions[idx].text = value;
    setOptions(newOptions);
  };

  const toggleCorrect = (idx) => {
    const newOptions = [...options];
    newOptions[idx].correct = !newOptions[idx].correct;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { text: '', correct: false }]);
  };

  const removeOption = (idx) => {
    const newOptions = options.filter((_, i) => i !== idx);
    setOptions(newOptions);
  };

  // const handleSaveQuestion = async () => {

  //   try {
  //     console.log({       
  //       question,
  //       subtitle,
  //       options,
  //       points,
  //   })
  //     onSaveQuestion({       
  //       question,
  //       subtitle,
  //       options,
  //       points,
  //   });      console.log({       
  //       question,
  //       subtitle,
  //       options,
  //       points,
  //   })
  //   } catch (error) {
  //     console.error('Error saving question:', error);
  //   }
  // };

  return (
    <div className='main-container-div'>
      <div className="question-form" style={{ position: 'relative' }}>
        
        <style>
          {`
          .question-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
            max-width: 100%;
            margin: 1rem auto;
            padding: 2rem;
            border: 2px solid rgba(0,0,0,0.2);
            border-radius: 8px;
            background-color: #ffffff;
          }
          .question-input, .subtitle-input {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .footer-controls{
            display: flex;
            justify-content: space-between;
            padding-top: 1rem;
            border-top: 1px solid rgba(0,0,0,0.1);
          }
          .options-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .option-item {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .upload-icon {
            margin-left: 8px;
            cursor: pointer;
            color: #007bff;
          }
          .desc-del-btn {
            background-color: transparent;
            color: red;
            box-shadow: none;
            width: fit-content;
            border-radius: 50%;
          }
          .desc-del-btn:hover {
            background-color: red;
            color: #ffffff;
          }
          .add-option-btn {
            background-color: #ffffff;
            color: #7A1CAC;
            border: 1px solid #7A1CAC;
            width: 18%;
            font-weight: 500;
          }
          .add-option-btn:hover {
            background-color: #7A1CAC;
            color: #ffffff;
          }
          .btn-div button {
            background-color: #7A1CAC;
          }
          .btn-div button:hover {
            background-color: #2E073F;
          }
          input {
            height: 2.5rem;
            padding-left: 10px;
          }
          `}
        </style>

        <button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'transparent',
            color: '#000',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '16px',
            width: '24px',
            height: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: '0.7',
          }}
          onClick={() => onDelete(index)}
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>

        <h5>Question No. {index + 1}</h5>

        <div className="question-input">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question"
            style={{ width: '100%' }}
          />
        </div>

        <div className="subtitle-input">
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Enter a subtitle (optional)"
          />
        </div>

        <div className="options-list">
          {options.map((option, idx) => (
            <div className="option-item" key={idx}>
              <input
                type="checkbox"
                checked={option.correct}
                onChange={() => toggleCorrect(idx)}
              />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  placeholder={`Option ${idx + 1}`}
                />
                <FaUpload className="upload-icon" title="Upload Image" />
              </div>
              <button className="desc-del-btn" onClick={() => removeOption(idx)}>
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </div>
          ))}
          <button className="add-option-btn" onClick={addOption}>
            <i className="fa-solid fa-plus"></i> Add Option
          </button>
        </div>

        <div className="footer-controls">
          <div className="control-item">
            <label>Points:</label>
            <input
              type="number"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
            />
          </div>

          <div className="control-item">
            <Form>
              <Form.Check
                type="switch"
                id="math-switch"
                label="Math:"
                checked={mathToggle}
                onChange={(e) => setMathToggle(e.target.checked)}
              />
            </Form>
          </div>

          <div className="control-item">
            <Form>
              <Form.Check
                type="switch"
                id="multiple-switch"
                label="Multiple answers:"
                checked={multipleAnswers}
                onChange={(e) => setMultipleAnswers(e.target.checked)}
              />
            </Form>
          </div>

          <div className="control-item">
            <Form>
              <Form.Check
                type="switch"
                id="required-switch"
                label="Required:"
                checked={required}
                onChange={(e) => setRequired(e.target.checked)}
              />
            </Form>
          </div>
        </div>
{/* 
        <div className="info-div-item btn-div" style={{ marginTop: '1rem' }}>
          <button onClick={handleSaveQuestion}>
            Save Question
          </button>
        </div>

        {submissionStatus && <p>{submissionStatus}</p>} */}
      </div>
    </div>
  );
};

const AddQuestionContainer = ({onSaveQuestion}) => {
  const [questions, setQuestions] = useState([]);
  const addQuestion = (newQuestion) => {
    onSaveQuestion(newQuestion);
  };
  const addNewQuestion = () => {
    setQuestions([...questions, {}]);
  };

  const deleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  return (
    <div>
      <style>
              {`
              .btn-div button{
              background-color: #7A1CAC;
              }
              .btn-div button:hover{
              background-color: #2E073F;
              }
              `}
          </style>
      {questions.map((_, index) => (
        <QuestionForm key={index} index={index} onDelete={deleteQuestion} onSaveQuestion={addQuestion} />
      ))}

      <div className="info-div-item btn-div">
        <button id="add-newQues-btn" onClick={addNewQuestion}>
          <i className="fa-solid fa-plus"></i> Add new question
        </button>
      </div>
    </div>
  );
};

export default AddQuestionContainer;


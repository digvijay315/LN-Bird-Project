// import React from 'react'
import axios from 'axios';
import HRHeader from './HRHeader'
import HRSidebar from './HRSidebar'

// function RecruitmentPlan() {
//   return (
//     <div>

//       <style>
//         {`
//         body {
//           background-color: rgba(46, 7, 63, 0.1);
//           padding: 20px;
//         }
//         .assigned-project-container {
//             background-color: #ffffff;
//             border-radius: 10px;
//             padding: 30px;
//           }
//         .assign-interviewer {
//         border: 1px solid rgba(0, 0, 0, 0.1);
//         border-radius: 10px;
//         padding: 1rem;
//         }
//         `}
//       </style>

//       <div>
//         <HRSidebar/>
//         <section className="main-content-section">
//           <HRHeader/>

//           <div className="assigned-project-container">
//             <h4 className="section-title">Recruitment Plan</h4>

//             <div className='assign-interviewer'>
//               <h5>Assign Interviewer</h5>

//               <div className='input-groups'>
//               <div className='input-group'>
//                 <label>Employee ID</label>
//                 <input type='text' placeholder='Enter employee Id' />
//                 <button>Add</button>

//                 <div className='added-employees'>
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>Employee Id</th>
//                         <th>Name</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>EMP-001</td>
//                         <td>John Doe</td>
//                       </tr>
//                       <tr>
//                         <td>EMP-002</td>
//                         <td>Jane Doe</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               <div className='input-group'>
//                 <label>Assign manpower company</label>
//                 <select>
//                   <option>-- Assign manpower company --</option>
//                   <option>Company - 1</option>
//                   <option>Company - 2</option>
//                   <option>Company - 3</option>
//                   <option>Company - 4</option>
//                 </select>

//                 <label>Duration</label>
//                 <input type='date' name='date-duration' />
//                 <button>Add</button>

//                 <div className='added-companies'>
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>Company</th>
//                         <th>Duration</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>Microsoft</td>
//                         <td>01-12-2025 to 01-12-2026</td>
//                       </tr>
//                       <tr>
//                         <td>Meta</td>
//                         <td>01-12-2025 to 01-12-2026</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//               </div>
//             </div>

//             <div className='assigned-matrix'>
              

//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   )
// }

// export default RecruitmentPlan




import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { base_url } from '../Utils/base_url';
import { toast, ToastContainer } from 'react-toastify';

// function RecruitmentPlan() {
//   // State for employee form
//   const [employeeId, setEmployeeId] = useState(null);
//   const [employees, setEmployees] = useState([]);
//   const [allEmployees, setAllEmployees] = useState([]);

//   const [catData, setCATData] = useState([]);

//   // State for company form
//   const [company, setCompany] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [companies, setCompanies] = useState([
//     { name: 'Microsoft', duration: '01-12-2025 to 01-12-2026' },
//     { name: 'Meta', duration: '01-12-2025 to 01-12-2026' }
//   ]);

//   const [tableData, setTableData] = useState({
//       headers: ['Basic', 'Level 1', 'Level 2', 'Level 3', 'Level 4'],
//       subHeaders: ['Service man', 'Technician II', 'Technician I', 'Technician IV', 'Sr Technician'],
//       rows: [
//         { function: 'HVAC', values: ['', '', '', '', ''] },
//         { function: 'ELEC', values: ['', '', '', '', ''] },
//         { function: 'MECH', values: ['', '', '', '', ''] },
//         { function: 'PLUMB', values: ['', '', '', '', ''] }
//       ]
//     });

//     const handleHeaderChange = (index, value, type) => {
//       const newData = { ...tableData };
//       if (type === 'header') {
//         newData.headers[index] = value;
//       } else if (type === 'subHeader') {
//         newData.subHeaders[index] = value;
//       }
//       setTableData(newData);
//     };
  
//     const handleFunctionChange = (index, value) => {
//       const newRows = [...tableData.rows];
//       newRows[index].function = value;
//       setTableData({ ...tableData, rows: newRows });
//     };

//     const handleTableInputChange = (rowIndex, colIndex, value) => {
//       const newRows = [...tableData.rows];
//       newRows[rowIndex].values[colIndex] = value;
//       setTableData({ ...tableData, rows: newRows });
//     };


//     const addColumn = () => {
//       const newHeaders = [...tableData.headers, `Level ${tableData.headers.length}`];
//       const newSubHeaders = [...tableData.subHeaders, `Technician ${tableData.subHeaders.length}`];
//       const newRows = tableData.rows.map(row => ({
//         ...row,
//         values: [...row.values, '']
//       }));
//       setTableData({ headers: newHeaders, subHeaders: newSubHeaders, rows: newRows });
//     };
  
//     const addRow = () => {
//       const newRow = {
//         function: `Function ${tableData.rows.length + 1}`,
//         values: Array(tableData.headers.length).fill('')
//       };
//       setTableData({
//         ...tableData,
//         rows: [...tableData.rows, newRow]
//       });
//     };

//   // Fetch employees from API
//   useEffect(() => {
//     fetchEmployees();
//     fetchCATData();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get(`${base_url}/employee_details_get`);
//       console.log(response);
//       setAllEmployees(response.data.employee);
//       setEmployeeId(response.data.employee);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchCATData = async () => {
//     try {
//       const response = await axios.get(`${base_url}/get_all_cat`);
//       console.log(response);
//       setCATData(response.data.data);
      
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   // Format employee data for react-select
//   const employeeOptions = allEmployees.map(emp => ({
//     value: emp.id || emp.employee_id,
//     label: `${emp.id || emp.employee_id} - ${emp.name || emp.employee_name}`
//   }));

//   // Handle adding an employee
//   const addEmployee = () => {
//     if (!employeeId) return;
    
//     // Check if employee already added
//     if (!employees.some(emp => emp.id === employeeId.value)) {
//       setEmployees([...employees, { 
//         id: employeeId.value, 
//         name: employeeId.label.split(' - ')[1] 
//       }]);
//       setEmployeeId(null);
//     } else {
//       alert('Employee already added');
//     }
//   };

//   // Handle adding a company
//   const addCompany = () => {
//     if (!company || company === '-- Assign manpower company --' || !startDate) return;
    
//     // Create duration string
//     const durationText = endDate 
//       ? `${formatDate(startDate)} to ${formatDate(endDate)}`
//       : `From ${formatDate(startDate)}`;
    
//     setCompanies([...companies, { name: company, duration: durationText }]);
//     setCompany('-- Assign manpower company --');
//     setStartDate('');
//     setEndDate('');
//   };

//   // Format date from yyyy-mm-dd to dd-mm-yyyy
//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     const [year, month, day] = dateString.split('-');
//     return `${day}-${month}-${year}`;
//   };

//   // Custom styles for react-select
//   const selectStyles = {
//     control: (provided) => ({
//       ...provided,
//       borderColor: '#ddd',
//       borderRadius: '6px',
//       boxShadow: 'none',
//       '&:hover': {
//         borderColor: '#2e073f',
//       },
//       marginBottom: '16px'
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       backgroundColor: state.isSelected ? '#2e073f' : state.isFocused ? 'rgba(46, 7, 63, 0.1)' : null,
//       color: state.isSelected ? 'white' : '#333',
//     }),
//   };

//   return (
//     <div>
//       <style>
//         {`
//         body {
//           background-color: rgba(46, 7, 63, 0.1);
//           font-family: 'Inter', sans-serif;
//           color: #333;
//           padding: 20px;
//         }
//         .assigned-project-container {
//           background-color: #ffffff;
//           border-radius: 10px;
//           padding: 30px;
//           // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
//           // max-width: 1200px;
//           margin: 0 auto;
//         }
//         .section-title {
//           color: #2e073f;
//           font-size: 24px;
//           margin-bottom: 20px;
//           border-bottom: 2px solid #f0f0f0;
//           padding-bottom: 10px;
//         }
//         .assign-interviewer {
//           border: 1px solid rgba(0, 0, 0, 0.1);
//           border-radius: 10px;
//           padding: 1.5rem;
//           margin-bottom: 30px;
//           background-color: #fafafa;
//         }
//         .assign-interviewer h5 {
//           margin-top: 0;
//           font-size: 18px;
//           color: #2e073f;
//           margin-bottom: 20px;
//         }
//         .input-groups {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 24px;
//         }
//         .input-group {
//           display: flex;
//           flex-direction: column;
//         }
//         label {
//           margin-bottom: 8px;
//           font-weight: 500;
//           color: #555;
//         }
//         input, select {
//           padding: 10px 12px;
//           border: 1px solid #ddd;
//           border-radius: 6px;
//           margin-bottom: 16px;
//           font-size: 14px;
//         }
//         input:focus, select:focus {
//           outline: none;
//           border-color: #2e073f;
//           box-shadow: 0 0 0 2px rgba(46, 7, 63, 0.1);
//         }
//         button {
//           background-color: #2e073f;
//           color: white;
//           border: none;
//           border-radius: 6px;
//           padding: 10px 16px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.2s ease;
//           margin-bottom: 16px;
//           max-width: 120px;
//         }
//         button:hover {
//           background-color: #3f0a57;
//         }
//         .added-employees, .added-companies {
//           margin-top: 16px;
//           background-color: white;
//           border-radius: 8px;
//           overflow: hidden;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
//         }
//         table {
//           width: 100%;
//           border-collapse: collapse;
//         }
//         th {
//           background-color: #f5f0f7;
//           padding: 12px 16px;
//           text-align: left;
//           font-weight: 600;
//           color: #2e073f;
//           font-size: 14px;
//         }
//         td {
//           padding: 12px 16px;
//           border-top: 1px solid #f0f0f0;
//           font-size: 14px;
//         }
//         tr:hover td {
//           background-color: #f9f5fc;
//         }
//         .empty-table {
//           padding: 20px;
//           text-align: center;
//           color: #888;
//           font-style: italic;
//         }
//         .select-add-container {
//           display: flex;
//           gap: 8px;
//           align-items: flex-start;
//         }
//         .select-container {
//           flex: 1;
//         }
//         @media (max-width: 768px) {
//           .input-groups {
//             grid-template-columns: 1fr;
//           }
//           .select-add-container {
//             flex-direction: column;
//           }
//           button {
//             width: 100%;
//             max-width: none;
//           }
//         }

//         .matrix-header {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             margin-bottom: 20px;
//           }
          
//           .matrix-title {
//             font-size: 20px;
//             color: #333;
//             font-weight: 600;
//           }
//           .button-group {
//             display: flex;
//             gap: 12px;
//           }
//           .button {
//             padding: 8px 16px;
//             border: none;
//             border-radius: 6px;
//             cursor: pointer;
//             font-weight: 500;
//             transition: background-color 0.3s;
//           }
//            .button:hover {
//             opacity: 0.9;
//           }

//         .matrix-table {
//           // min-width: 800px;
//           white-space: nowrap;
//         }
          
//           .matrix-table th,
//           .matrix-table td {
//             border: 1px solid #ddd;
//             padding: 12px;
//             text-align: left;
//           }
          
//           .matrix-table th {
//             background-color: #f8f9fa;
//             font-weight: 600;
//             color: #333;
//           }
          
//           .matrix-input {
//             width: 100%;
//             padding: 8px;
//             border: 1px solid #ddd;
//             border-radius: 4px;
//             font-size: 14px;
//           }
//         `}
//       </style>

//       <div>
//         <HRSidebar />
//         <section className="main-content-section">
//           <HRHeader />

//           <div className="assigned-project-container">
//             <h4 className="section-title">Recruitment Plan</h4>

//             <div className='assign-interviewer'>
//               <h5>Assign Interviewer</h5>

//               <div className='input-groups'>
//                 <div className='input-group'>
//                   <label>Employee ID</label>
//                   <div className="select-add-container">
//                     <div className="select-container">
//                       <Select
//                         value={employeeId}
//                         onChange={setEmployeeId}
//                         options={employeeOptions}
//                         placeholder="Search employee..."
//                         isClearable
//                         styles={selectStyles}
//                       />
//                     </div>
//                     <button onClick={addEmployee}>Add</button>
//                   </div>

//                   <div className='added-employees'>
//                     <table>
//                       <thead>
//                         <tr>
//                           <th>Employee ID</th>
//                           <th>Name</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {employees.length > 0 ? (
//                           employees.map((emp, index) => (
//                             <tr key={index}>
//                               <td>{emp.id}</td>
//                               <td>{emp.name}</td>
//                             </tr>
//                           ))
//                         ) : (
//                           <tr>
//                             <td colSpan="2" className="empty-table">No employees added yet</td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>

//                 <div className='input-group'>
//                   <label>Assign manpower company</label>
//                   <select 
//                     value={company}
//                     onChange={(e) => setCompany(e.target.value)}
//                   >
//                     <option>-- Assign manpower company --</option>
//                     <option>Company - 1</option>
//                     <option>Company - 2</option>
//                     <option>Company - 3</option>
//                     <option>Company - 4</option>
//                   </select>

//                   <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
//                     <div style={{ flex: 1 }}>
//                       <label>Start Date</label>
//                       <input 
//                         type='date' 
//                         value={startDate}
//                         onChange={(e) => setStartDate(e.target.value)}
//                       />
//                     </div>
//                     <div style={{ flex: 1 }}>
//                       <label>End Date (optional)</label>
//                       <input 
//                         type='date' 
//                         value={endDate}
//                         onChange={(e) => setEndDate(e.target.value)}
//                       />
//                     </div>
//                     <button onClick={addCompany} style={{ marginBottom: '0' }}>Add</button>
//                   </div>

//                   <div className='added-companies'>
//                     <table>
//                       <thead>
//                         <tr>
//                           <th>Company</th>
//                           <th>Duration</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {companies.length > 0 ? (
//                           companies.map((comp, index) => (
//                             <tr key={index}>
//                               <td>{comp.name}</td>
//                               <td>{comp.duration}</td>
//                             </tr>
//                           ))
//                         ) : (
//                           <tr>
//                             <td colSpan="2" className="empty-table">No companies assigned yet</td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className='assigned-matrix'>
//               <div className="matrix-section">
//                             <div className="matrix-header">
//                             <h5 className="matrix-title">Assign CAT to the Manpower requirement matrix</h5>
//                             <div className="button-group">
//                                 <button type="button" className="button button-secondary" onClick={addColumn}>
//                                 Add Level
//                                 </button>
//                                 <button type="button" className="button button-secondary" onClick={addRow}>
//                                 Add Function
//                                 </button>
//                             </div>
//                             </div>

//                             <div className="table-container">
//                             <table className="matrix-table">
//                                 <thead>
//                                 <tr>
//                                     <th>Skill Level</th>
//                                     {tableData.headers.map((header, i) => (
//                                     <th key={i}>
//                                         <input
//                                         type="text"
//                                         className="header-input"
//                                         value={header}
//                                         onChange={(e) => handleHeaderChange(i, e.target.value, 'header')}
//                                         />
//                                     </th>
//                                     ))}
//                                 </tr>
//                                 <tr>
//                                     <th>Job title</th>
//                                     {tableData.subHeaders.map((header, i) => (
//                                     <th key={i}>
//                                       <input
//                                         type="text"
//                                         className="header-input"
//                                         value={header}
//                                         onChange={(e) => handleHeaderChange(i, e.target.value, 'subHeader')}
//                                       />
//                                     </th>
//                                     ))}
//                                 </tr>
//                                 </thead>
//                                 <tbody>
//                                 {tableData.rows.map((row, rowIndex) => (
//                                     <tr key={rowIndex}>
//                                     <td>
//                                       <input
//                                         type="text"
//                                         className="function-input"
//                                         value={row.function}
//                                         onChange={(e) => handleFunctionChange(rowIndex, e.target.value)}
//                                       />
//                                     </td>
//                                     {row.values.map((value, colIndex) => (
//                                       <td key={colIndex}>
//                                         <input
//                                             type="text"
//                                             className="matrix-input"
//                                             value={value}
//                                             onChange={(e) => handleTableInputChange(rowIndex, colIndex, e.target.value)}
//                                         />
//                                       </td>
//                                     ))}
//                                     </tr>
//                                 ))}
//                                 </tbody>
//                             </table>
//                             </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default RecruitmentPlan;


function RecruitmentPlan() {
  // State for employee form
  const [employeeId, setEmployeeId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);

  // State for company form
  const [company, setCompany] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [companies, setCompanies] = useState([]);

  // State for CAT matrix
  const [catData, setCATData] = useState([]);
  const [tableData, setTableData] = useState({
      headers: ['Basic', 'Level 1', 'Level 2', 'Level 3', 'Level 4'],
      subHeaders: ['Service man', 'Technician II', 'Technician I', 'Technician IV', 'Sr Technician'],
      rows: [
        { function: 'HVAC', values: ['', '', '', '', ''] },
        { function: 'ELEC', values: ['', '', '', '', ''] },
        { function: 'MECH', values: ['', '', '', '', ''] },
        { function: 'PLUMB', values: ['', '', '', '', ''] }
      ]
    });
  
  // Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    fetchEmployees();
    fetchCATData();
  }, []);

  // Fetch employees from API
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${base_url}/employee_details_get`);
      setAllEmployees(response.data.employee);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch CAT data
  const fetchCATData = async () => {
    try {
      const response = await axios.get(`${base_url}/get_all_cat`);
      setCATData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Format employee data for react-select
  const employeeOptions = allEmployees.map(emp => ({
    value: emp.id || emp.employee_id,
    label: `${emp.id || emp.employee_id} - ${emp.name || emp.employee_name}`
  }));

  // Format CAT data for react-select
  const catOptions = catData.map(cat => ({
    value: cat._id,
    label: `${cat.code} - ${cat.title}`,
    data: cat
  }));

  // Handle adding an employee
  const addEmployee = () => {
    if (!employeeId) return;
    
    // Check if employee already added
    if (!employees.some(emp => emp.id === employeeId.value)) {
      setEmployees([...employees, { 
        id: employeeId.value, 
        name: employeeId.label.split(' - ')[1] 
      }]);
      setEmployeeId(null);
    } else {
      alert('Employee already added');
    }
  };

  // Handle adding a company
  const addCompany = () => {
    if (!company || company === '-- Assign manpower company --' || !startDate) return;
    
    // Create duration string
    const durationText = endDate 
      ? `${formatDate(startDate)} to ${formatDate(endDate)}`
      : `From ${formatDate(startDate)}`;
    
    setCompanies([...companies, { name: company, duration: durationText }]);
    setCompany('-- Assign manpower company --');
    setStartDate('');
    setEndDate('');
  };

  // Handle header change in matrix
  const handleHeaderChange = (index, value, type) => {
    const newTableData = { ...tableData };
    if (type === 'header') {
      newTableData.headers[index] = value;
    } else if (type === 'subHeader') {
      newTableData.subHeaders[index] = value;
    }
    setTableData(newTableData);
  };

  // Handle function name change in matrix
  const handleFunctionChange = (rowIndex, value) => {
    const newTableData = { ...tableData };
    newTableData.rows[rowIndex].function = value;
    setTableData(newTableData);
  };

  // Handle cell value change in matrix (now uses Select for CAT)
  const handleTableInputChange = (rowIndex, colIndex, selectedOption) => {
    const newTableData = { ...tableData };
    newTableData.rows[rowIndex].values[colIndex] = selectedOption;
    setTableData(newTableData);
  };

  // Add a new column to the matrix
  const addColumn = () => {
    const newTableData = { ...tableData };
    newTableData.headers.push(`Level ${newTableData.headers.length + 1}`);
    newTableData.subHeaders.push(`Position ${newTableData.subHeaders.length + 1}`);
    newTableData.rows.forEach(row => {
      row.values.push('');
    });
    setTableData(newTableData);
  };

  // Add a new row to the matrix
  const addRow = () => {
    const newTableData = { ...tableData };
    const newValues = Array(newTableData.headers.length).fill('');
    newTableData.rows.push({ function: `Function ${newTableData.rows.length + 1}`, values: newValues });
    setTableData(newTableData);
  };

  // Format date from yyyy-mm-dd to dd-mm-yyyy
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  // Custom styles for react-select
  const selectStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: '#ddd',
      borderRadius: '6px',
      boxShadow: 'none',
      // minHeight: '36px',
      // height: '36px',
      '&:hover': {
        borderColor: '#2e073f',
      }
    }),
    valueContainer: (provided) => ({
      ...provided,
      // height: '36px',
      padding: '0 8px'
    }),
    input: (provided) => ({
      ...provided,
      margin: '0',
      padding: '0'
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      // height: '36px'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#2e073f' : state.isFocused ? 'rgba(46, 7, 63, 0.1)' : null,
      color: state.isSelected ? 'white' : '#333',
    }),
  };

  // Matrix table cell render with CAT select
  const renderMatrixCell = (rowIndex, colIndex, value) => {
    return (
      <Select
        value={value && typeof value === 'object' ? value : null}
        onChange={(selected) => handleTableInputChange(rowIndex, colIndex, selected)}
        options={catOptions}
        placeholder="Search CAT..."
        isClearable
        styles={selectStyles}
        className="cat-select"
      />
    );
  };

  // Submit recruitment plan to database
  const submitRecruitmentPlan = async () => {
    // Validate if we have minimum required data
    if (employees.length === 0) {
      alert("Please add at least one interviewer");
      return;
    }
    if (companies.length === 0) {
      alert("Please add at least one manpower company");
      return;
    }

    // Format matrix data for submission
    const matrixData = tableData.rows.map(row => {
      return {
        function: row.function,
        levels: tableData.headers.map((header, idx) => ({
          level: header,
          position: tableData.subHeaders[idx],
          cat: row.values[idx] ? {
            id: row.values[idx].value,
            code: row.values[idx].data.code,
            title: row.values[idx].data.title
          } : null
        }))
      };
    });

    const planData = {
      interviewers: employees.map(emp => ({ id: emp.id, name: emp.name })),
      companies: companies.map(comp => ({ 
        name: comp.name, 
        duration: comp.duration 
      })),
      matrix: matrixData
    };

    try {
      setIsSubmitting(true);
      const response = await axios.post(`${base_url}/save_recruitment_plan`, planData);
      console.log("Recruitment plan saved:", response.data);
      toast.success('Recruitment plan saved', {autoClose: 2000});
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving recruitment plan:", error);
      alert("Failed to save recruitment plan. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <style>
        {`
        body {
          background-color: rgba(46, 7, 63, 0.1);
          font-family: 'Inter', sans-serif;
          color: #333;
          padding: 20px;
        }
        .assigned-project-container {
          background-color: #ffffff;
          border-radius: 10px;
          padding: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .section-title {
          color: #2e073f;
          font-size: 24px;
          margin-bottom: 20px;
          border-bottom: 2px solid #f0f0f0;
          padding-bottom: 10px;
        }
        .assign-interviewer {
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          padding: 1.5rem;
          margin-bottom: 30px;
          background-color: #fafafa;
        }
        .assign-interviewer h5 {
          margin-top: 0;
          font-size: 18px;
          color: #2e073f;
          margin-bottom: 20px;
        }
        .input-groups {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .input-group {
          display: flex;
          flex-direction: column;
        }
        label {
          margin-bottom: 8px;
          font-weight: 500;
          color: #555;
        }
        input, select {
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          margin-bottom: 16px;
          font-size: 14px;
        }
        input:focus, select:focus {
          outline: none;
          border-color: #2e073f;
          box-shadow: 0 0 0 2px rgba(46, 7, 63, 0.1);
        }
        button {
          background-color: #2e073f;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-bottom: 16px;
          max-width: 120px;
        }
        button:hover {
          background-color: #3f0a57;
        }
        button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
        .submit-button {
          max-width: 200px;
          margin-top: 20px;
          font-size: 16px;
        }
        .added-employees, .added-companies {
          margin-top: 16px;
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th {
          background-color: #f5f0f7;
          padding: 12px 16px;
          text-align: left;
          font-weight: 600;
          color: #2e073f;
          font-size: 14px;
        }
        td {
          padding: 12px 16px;
          border-top: 1px solid #f0f0f0;
          font-size: 14px;
        }
        tr:hover td {
          background-color: #f9f5fc;
        }
        .empty-table {
          padding: 20px;
          text-align: center;
          color: #888;
          font-style: italic;
        }
        .select-add-container {
          display: flex;
          gap: 8px;
          align-items: flex-start;
        }
        .select-container {
          flex: 1;
        }
        /* Matrix styles */
        .matrix-section {
          margin-top: 30px;
          background-color: #fafafa;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          padding: 1.5rem;
        }
        .matrix-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .matrix-title {
          margin: 0;
          font-size: 18px;
          color: #2e073f;
        }
        .button-group {
          display: flex;
          gap: 10px;
        }
        .button-secondary {
          background-color: white;
          color: #2e073f;
          border: 1px solid #2e073f;
        }
        .button-secondary:hover {
          background-color: #f5f0f7;
        }
        .table-container {
          overflow-x: auto;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        .matrix-table {
          min-width: 100%;
        }
        .matrix-table th, .matrix-table td {
          min-width: 150px;
          border: 1px solid #eee;
        }
        .matrix-table th:first-child, .matrix-table td:first-child {
          position: sticky;
          left: 0;
          background-color: #f5f0f7;
          z-index: 1;
        }
        .header-input, .function-input {
          width: 100%;
          border: none;
          background-color: transparent;
          padding: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #2e073f;
        }
        .header-input:focus, .function-input:focus {
          outline: 2px solid #2e073f;
          border-radius: 4px;
        }
        .matrix-input {
          width: 100%;
          border: none;
          background-color: transparent;
          padding: 8px;
        }
        .cat-select {
          min-width: 150px;
        }
        .success-message {
          background-color: #4caf50;
          color: white;
          padding: 10px 16px;
          border-radius: 6px;
          margin-bottom: 20px;
          text-align: center;
        }
        @media (max-width: 768px) {
          .input-groups {
            grid-template-columns: 1fr;
          }
          .select-add-container {
            flex-direction: column;
          }
          button {
            width: 100%;
            max-width: none;
          }
          .matrix-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .button-group {
            width: 100%;
          }
          .button-group button {
            flex: 1;
          }
        }
        `}
      </style>

      <div>
        <HRSidebar />
        <section className="main-content-section">
          <HRHeader />

          <div className="assigned-project-container">
            <h4 className="section-title">Recruitment Plan</h4>

            {submitSuccess && (
              <div className="success-message">
                Recruitment plan successfully saved!
              </div>
            )}

            <div className='assign-interviewer'>
              <h5>Assign Interviewer</h5>

              <div className='input-groups'>
                <div className='input-group'>
                  <label>Employee ID</label>
                  <div className="select-add-container">
                    <div className="select-container">
                      <Select
                        value={employeeId}
                        onChange={setEmployeeId}
                        options={employeeOptions}
                        placeholder="Search employee..."
                        isClearable
                        styles={selectStyles}
                      />
                    </div>
                    <button onClick={addEmployee}>Add</button>
                  </div>

                  <div className='added-employees'>
                    <table>
                      <thead>
                        <tr>
                          <th>Employee ID</th>
                          <th>Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.length > 0 ? (
                          employees.map((emp, index) => (
                            <tr key={index}>
                              <td>{emp.id}</td>
                              <td>{emp.name}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="2" className="empty-table">No employees added yet</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className='input-group'>
                  <label>Assign manpower company</label>
                  <select 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  >
                    <option>-- Assign manpower company --</option>
                    <option>Company - 1</option>
                    <option>Company - 2</option>
                    <option>Company - 3</option>
                    <option>Company - 4</option>
                  </select>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
                    <div style={{ flex: 1 }}>
                      <label>Start Date</label>
                      <input 
                        type='date' 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label>End Date (optional)</label>
                      <input 
                        type='date' 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                    <button onClick={addCompany} style={{ marginBottom: '0' }}>Add</button>
                  </div>

                  <div className='added-companies'>
                    <table>
                      <thead>
                        <tr>
                          <th>Company</th>
                          <th>Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {companies.length > 0 ? (
                          companies.map((comp, index) => (
                            <tr key={index}>
                              <td>{comp.name}</td>
                              <td>{comp.duration}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="2" className="empty-table">No companies assigned yet</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className='assigned-matrix'>
              <div className="matrix-section">
                <div className="matrix-header">
                  <h5 className="matrix-title">Assign CAT to the Manpower requirement matrix</h5>
                  <div className="button-group">
                    <button type="button" className="button button-secondary" onClick={addColumn}>
                      Add Level
                    </button>
                    <button type="button" className="button button-secondary" onClick={addRow}>
                      Add Function
                    </button>
                  </div>
                </div>

                <div className="table-container">
                  <table className="matrix-table">
                    <thead>
                      <tr>
                        <th>Skill Level</th>
                        {tableData.headers.map((header, i) => (
                          <th key={i}>
                            <input
                              type="text"
                              className="header-input"
                              value={header}
                              onChange={(e) => handleHeaderChange(i, e.target.value, 'header')}
                            />
                          </th>
                        ))}
                      </tr>
                      <tr>
                        <th>Job title</th>
                        {tableData.subHeaders.map((header, i) => (
                          <th key={i}>
                            <input
                              type="text"
                              className="header-input"
                              value={header}
                              onChange={(e) => handleHeaderChange(i, e.target.value, 'subHeader')}
                            />
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          <td>
                            <input
                              type="text"
                              className="function-input"
                              value={row.function}
                              onChange={(e) => handleFunctionChange(rowIndex, e.target.value)}
                            />
                          </td>
                          {row.values.map((value, colIndex) => (
                            <td key={colIndex}>
                              {renderMatrixCell(rowIndex, colIndex, value)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="form-actions" style={{ textAlign: 'right', marginTop: '30px' }}>
              <button 
                className="submit-button" 
                onClick={submitRecruitmentPlan}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Recruitment Plan'}
              </button>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default RecruitmentPlan;

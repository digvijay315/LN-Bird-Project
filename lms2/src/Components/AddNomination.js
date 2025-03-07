import React, {useEffect, useState} from 'react'
import $ from 'jquery'; // Import jQuery
import 'datatables.net'; // Import DataTables
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import { base_url } from "./Utils/base_url";
import Select from "react-select";
import { sendNominationEmails, getNominationStatus } from './Services/api';

function AddNomination({selectedTraining}) {

  useEffect(() => {
    get_details();
  }, []);
  
  const [details, setdetails] = useState([]);

  const get_details = async () => {
    try {
      const resp = await axios.get(`${base_url}/event_details_get`);
      setdetails(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

    // Helper function to calculate date range
    const calculateDateRange = (from, to) => {
      const startDate = new Date(from);
      const endDate = new Date(to);
      const dates = [];
  
      while (startDate <= endDate) {
        dates.push(new Date(startDate).toLocaleDateString()); // Format date
        startDate.setDate(startDate.getDate() + 1);
      }
      return dates;
    };

  const [employee, setemployee] = useState([]);
  function EmployeeList(event) {
    const selectedEmployee = JSON.parse(event.target.value);
    setemployee([...employee,selectedEmployee]);
    console.log(selectedEmployee); // Logs the full object
  }

  function DeleteEmployee(item) {
    const updatedEmployees = employee.filter((item1) => item1._id !== item._id);
    setemployee(updatedEmployees); // Update the state with the new array
  }

  const delete_employee = async (employee) => {
    try {
      
      const id = employee._id;
      const resp = await axios.delete(`${base_url}/employee_deletes/${id}`);
      toast.success("Employee data deleted", {autoClose: "2000"});
      setOptions(resp.data.employee);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOptions();
    delete_employee();
  }, []); // Fetch options on mount

  const [show, setshow] = useState(false);
  
  const handleClose = () => setshow(false);
  const handleshow = () => setshow(true);

  // Initialize DataTable when modal opens
  useEffect(() => {
    if (show) {
      const table = $('#employeeTable').DataTable({
        dom: '<"dt-buttons"Bf><"clear">lirtp',
        paging: true,
        autoWidth: true,
        buttons: [
          'colvis',
          'copyHtml5',
          'csvHtml5',
          'excelHtml5',
          'pdfHtml5',
          'print',
        ],
        initComplete: function () {
          const footer = $('#employeeTable tfoot tr');
          $('#employeeTable thead').append(footer);
        },
      });

      $('#employeeTable thead').on('keyup', 'input', function () {
        table.column($(this).parent().index()).search(this.value).draw();
      });

      return () => {
        table.destroy(true); // Clean up
      };
    }
  }, [show]); // Re-run the effect when the modal is shown



  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState({});
  const [emailLink, setEmailLink] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Add function to get token
  const getAuthToken = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    return token;
  };

  // Create axios instance with interceptors
  const axiosInstance = axios.create();

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle token expiration
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        // Redirect to login page
        window.location.href = '/login';
        return Promise.reject(new Error('Session expired. Please login again.'));
      }
      return Promise.reject(error);
    }
  );

   // Handle select all checkbox
   const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setSelectedRows(selectedEmployees.map(emp => emp.value));
    } else {
      setSelectedRows([]);
    }
  };

    // Handle individual row selection
    const handleRowSelect = (employeeId) => {
      setSelectedRows(prev => {
        if (prev.includes(employeeId)) {
          return prev.filter(id => id !== employeeId);
        } else {
          return [...prev, employeeId];
        }
      });
    };

  // const sendEmails = async (employeeIds, trainingDetails) => {
  //   setLoading(true);
  //   try {
  //     const result = await sendNominationEmails(employeeIds, trainingDetails);
      
  //     const newStatus = { ...emailStatus };
  //     result.results.success.forEach(({ employee_id }) => {
  //       newStatus[employee_id] = true;
  //     });
  //     setEmailStatus(newStatus);
      
  //     toast.success(`Successfully sent ${result.results.success.length} nomination emails`);
      
  //     if (result.results.failed.length > 0) {
  //       toast.error(`Failed to send ${result.results.failed.length} emails`);
  //     }
      
  //     return result;
  //   } catch (error) {
  //     toast.error('Failed to send nomination emails');
  //     throw error;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const sendEmails = async () => {
    if (selectedRows.length === 0) {
      toast.warning('Please select at least one employee');
      return;
    }

    setLoading(true);
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication token not found. Please login again.');
        return;
      }

      // Log the payload for debugging
      const payload = {
        employeeIds: selectedRows,
        trainingDetails: {
          _id: selectedTraining._id,
          training_name: selectedTraining.training_name,
          from_date: selectedTraining.from_date,
          to_date: selectedTraining.to_date,
          from_time: selectedTraining.from_time,
          to_time: selectedTraining.to_time
        }
      };
      
      console.log('Sending payload:', payload);

      // Send request with token
      const response = await axios.post(
        `${base_url}/send-nomination-emails`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Response:', response.data);

      if (response.data.results) {
        // Update email status for sent emails
        const newEmailStatus = { ...emailStatus };
        response.data.results.success.forEach(({ employee_id }) => {
          newEmailStatus[employee_id] = true;
        });
        setEmailStatus(newEmailStatus);

        toast.success(`Successfully sent ${response.data.results.success.length} nomination emails`);

        if (response.data.results.failed.length > 0) {
          toast.error(`Failed to send ${response.data.results.failed.length} emails`);
        }

        // Clear selections after successful sending
        setSelectedRows([]);
        setSelectAll(false);
      }

    } catch (error) {
      console.error('Full error:', error);
      
      if (error.response) {
        console.log('Error response:', error.response.data);
        
        if (error.response.status === 401) {
          toast.error('Session expired. Please login again.');
          // Optional: Redirect to login
          // window.location.href = '/login';
        } else {
          toast.error(error.response.data.message || 'Failed to send emails');
        }
      } else if (error.request) {
        toast.error('Network error. Please check your connection.');
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

    // Function to get selected employee details
    const getSelectedEmployeeDetails = () => {
      return selectedRows.map(employeeId => {
        const employee = selectedEmployees.find(emp => emp.value === employeeId);
        return {
          employee_id: employee.value,
          employee_name: employee.details.employee_name,
          employee_email: employee.details.employee_email
        };
      });
    };

      // Function to check if email can be sent
  const canSendEmail = () => {
    return selectedRows.length > 0 && !loading;
  };

  // Add a function to handle confirmation links
  const handleConfirmation = async (trainingId, employeeId) => {
    try {
      const response = await axios.get(
        `${base_url}/confirm-training/${trainingId}/${employeeId}`
      );
      
      // Update the UI to show confirmation
      const updatedEmployees = selectedEmployees.map(emp => {
        if (emp.value === employeeId) {
          return { ...emp, attendance_confirmed: true };
        }
        return emp;
      });
      setSelectedEmployees(updatedEmployees);
      
      toast.success('Training attendance confirmed');
    } catch (error) {
      console.error('Error confirming attendance:', error);
      toast.error('Failed to confirm attendance');
    }
  };

  // Add email status styles to the component
  const emailStatusStyles = `
    .email-status {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }
    .email-status.sent {
      background-color: #d4edda;
      color: #155724;
    }
    .email-status.not-sent {
      background-color: #f8d7da;
      color: #721c24;
    }
  `;

  // Add the styles to the document head
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.innerText = emailStatusStyles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const checkStatus = async (employeeId, trainingId) => {
    try {
      const status = await getNominationStatus(employeeId, trainingId);
      setEmailStatus(prev => ({
        ...prev,
        [employeeId]: status.email_sent
      }));
      return status;
    } catch (error) {
      console.error('Error checking nomination status:', error);
    }
  };

    // Fetch options from the backend
    const fetchOptions = async () => {
      try {
        const response = await axios.get(`${base_url}/employee_details_get`);
        const formattedOptions = response.data.employee.map((emp) => ({
          value: emp.employee_id,
          label: `${emp.employee_id} - ${emp.employee_name}`,
          details: emp, // Add full details to use later
        }));
        setOptions(formattedOptions);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
  
    useEffect(() => {
      fetchOptions();
    }, []);

          // Add selected employee to the list
          const handleAddEmployee = () => {
            if (selectedOption) {
              const employeeExists = selectedEmployees.some(
                (emp) => emp.value === selectedOption.value
              );
              if (!employeeExists) {
                setSelectedEmployees([...selectedEmployees, selectedOption]);
                setEmailStatus(prev => ({
                  ...prev,
                  [selectedOption.value]: false
                }));
                toast.success("Employee added successfully");
              } else {
                toast.warning("Employee already added");
              }
            }
          };
    
          // Remove employee from the list
          const handleRemoveEmployee = (id) => {
            setSelectedEmployees(selectedEmployees.filter((emp) => emp.value !== id));
            setEmailStatus(prev => {
              const newStatus = { ...prev };
              delete newStatus[id];
              return newStatus;
            });
            toast.info("Employee removed");
          };

          const handleSendEmail = async () => {
            if (!emailLink) {
              toast.error("Please enter a link to send");
              return;
            }
        
            if (selectedRows.length === 0) {
              toast.error("Please select at least one employee");
              return;
            }
        
            try {
              setLoading(true);
              const response = await axios.post(`${base_url}/send-nomination-emails`, {
                employeeIds: selectedRows,
                trainingDetails: selectedTraining,
                emailLink: emailLink
              });
        
              // Update email status for sent emails
              const newEmailStatus = { ...emailStatus };
              selectedRows.forEach(id => {
                newEmailStatus[id] = true;
              });
              setEmailStatus(newEmailStatus);
        
              toast.success(`Successfully sent emails to ${selectedRows.length} employees`);
              setEmailLink(''); // Clear the link input
              setSelectedRows([]); // Clear selections
              setSelectAll(false);
            } catch (error) {
              console.error("Error sending emails:", error);
              toast.error("Failed to send nomination emails");
            } finally {
              setLoading(false);
            }
          };
        

          const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            });
          };

  return (
    <div>

      <button className='add_nominee'
        style={{
          backgroundColor: "#7A1CAC",
          height: "2.5rem",
          width:"10rem",
          border: "none",
          color: "#ffffff",
          fontWeight: "500",
          borderRadius: "5px",
          transition: "all 0.3s ease",
          marginBottom: "1.3rem"
        }}
        onClick={handleshow}
      >
        Add Nomination
      </button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title> <h5>Add Nomination for {selectedTraining?.training_name}</h5> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-employee">
            <h5>Training User Addition Details</h5>
            <table style={{width:"100%"}}>
              <thead>
                <tr>
                  <th>Employee ID / Employee Name</th>
                  <th>Training Name</th>
                  <th>Training Schedule Date</th>
                  <th>Training Schedule Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                  <div className="info-div-item" style={{display:"flex", justifyContent: "space-between", gap: "10px"}}>
                    <Select
                      options={options}
                      value={selectedOption}
                      onChange={(selected) => setSelectedOption(selected)}
                      placeholder="Search Employee"
                      isSearchable
                      styles={{
                        container: (base) => ({
                          ...base,
                          flex: 1,
                        }),
                      }}
                    />
                    <button onClick={handleAddEmployee} style={{ backgroundColor: '#7A1CAC', color: '#fff', border: 'none' }}>
                      Add
                    </button>
                  </div>
                  </td>
                  <td>{selectedTraining?.training_name}</td>
                  {/* <td>{new Date(selectedTraining?.from_date).toLocaleString()} - {new Date(selectedTraining?.to_date).toLocaleString()}</td> */}
                  <td>{formatDate(selectedTraining?.from_date)} - {formatDate(selectedTraining?.to_date)}</td>
                  <td>{selectedTraining?.from_time} - {selectedTraining?.to_time}</td>
                </tr>
              </tbody>
            </table>
            <div className='button-div'>
                  <button style={{width:"5rem"}}>Back</button>
                  <button style={{width:"10rem"}} onClick={handleAddEmployee} >Add Employee</button>
                </div>
          </div>

          <div className='nominee-data'>
              <h5 style={{marginBottom:"2rem"}}>Student's and Employee's data</h5>

              <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                <table
                  id="employeeTable"
                  className="table table-striped table-bordered"
                  style={{ fontSize: '14px', width: '100%' }}
                >
                  <thead>
                    <tr>
                      <th>
                      <div className="checkbox-wrapper">
                        <input 
                          type="checkbox" 
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                        <span>Select All</span>
                      </div>
                      </th>
                      <th>Employee ID</th>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Email</th>
                      <th>Attendance</th>
                      <th>Email Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedEmployees.map((emp, index) => (
                      <tr key={emp.value}>
                        <td>
                        <input 
                          type="checkbox" 
                          checked={selectedRows.includes(emp.value)}
                          onChange={() => handleRowSelect(emp.value)}
                        />
                          {index + 1}
                        </td>
                        <td>{emp.details.employee_id}</td>
                        <td>{emp.details.employee_name}</td>
                        <td>{emp.details.designation}</td>
                        <td>{emp.details.employee_email}</td>
                        <td>
                          {calculateDateRange(selectedTraining?.from_date, selectedTraining?.to_date).map((date, i) => (
                          <div key={i}>
                            <input type="checkbox" /> {date}
                          </div>
                          ))}
                        </td>
                        <td>
                          <span className={`email-status ${emailStatus[emp.value] ? 'sent' : 'not-sent'}`}>
                            {emailStatus[emp.value] ? 'Sent' : 'Not Sent'}
                          </span>
                        </td>
                        <td>
                          <button
                            // style={{ backgroundColor: '#7A1CAC', color: '#fff', border: 'none' }}
                            onClick={() => handleRemoveEmployee(emp.value)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>


              <div className='send-mail-div'>
                <div className='emailLink_box'>
                  <input 
                    type='text' 
                    placeholder='Enter link to send'
                    value={emailLink}
                    onChange={(e) => setEmailLink(e.target.value)}
                  />
                </div>               
                <div>
                  <button style={{width:"5rem"}} onClick={handleClose} disabled={loading}>Close</button>
                  <button style={{width:"10rem"}} onClick={sendEmails}  disabled={!canSendEmail()}> {loading ? 'Sending...' : 'Send Email'} </button>
                </div>
              </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer/>
    </div>
  );
}

export default AddNomination;


<style>{`
  .calendar-view{
    border-radius: 10px
  }
  .add-employee{
    background-color: #ffffff;
    margin-bottom: 1.5rem;
    padding: 2rem 1.5rem;
    border-radius: 10px;
    // box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0,0,0,0.2);
  }
  .button-div button,
  .send-mail-div button{
    background-color: #7A1CAC;
    // height: 2.5rem;
    border: none;
    margin: 0 8px;
    color: #ffffff;
    font-weight: 500;
    border-radius: 5px;
    transition: all 0.3s ease;
  }
th {
background-color: #f8f9fa;
opacity: 0.9;
font-weight: 600;
font-size: 0.95rem;
padding: 1rem !important;
}
    td{
    font-size: 14px;
    // padding: 0rem 2rem !important;
    text-align: center;
    }
  thead input {
    width: 100%;
    padding: 3px;
    box-sizing: border-box;
  }
  .nominee-data{
    background-color: #ffffff;
    padding: 2rem 1.5rem;
    border-radius: 10px;
    margin-top: 1.5rem;
    margin-bottom: 10px;
    border: 1px solid rgba(0,0,0,0.2);
  }
  .send-mail-div{
    display: flex;
    justify-content: space-between;
    margin-top: 2rem; 
  }
    .send-mail-div input{
    border: 2px solid #7A1CAC;
    border-radius: 5px;
    padding-left: 10px;
    width: 32%;
    }
    #dt-length-0{
    width: 8%;
    }
    .dt-paging-button{
    background-color: #ffffff;
    box-shadow: inset 0 5px 10px rgba(0,0,0,.1), 0 2px 5px rgba(0,0,0,.5);
    color: #000;
    margin: 0 5px;
    width: 2.5rem;
    transition: 0.3s all ease;
    }
    .dt-paging-button:hover{
    background-color: #7A1CAC;
    color: #ffffff;
    }
    .dt-search{
    float: right;
    margin-bottom: 14px;
    }
    .dt-search #dt-search-0{
    height: 2.5rem;
    border-radius: 5px;
    border: none;
    border: 2px solid #7A1CAC;
    padding-left: 10px;
    }
    .dt-search #dt-search-0:focus{
    outline: none;
    }
    .button-div{
    margin-top: 1rem;
    width: 100%;
    padding-left: 74%;
    }
     .email-status {
padding: 4px 8px;
border-radius: 4px;
font-size: 12px;
font-weight: 500;
}
.email-status.sent {
background-color: #d1fae5;
color: #065f46;
}
.email-status.not-sent {
background-color: #fee2e2;
color: #991b1b;
}
    .checkbox-wrapper {
display: flex;
align-items: center;
gap: 8px;
}
.checkbox-wrapper input[type="checkbox"] {
width: 16px;
height: 16px;
cursor: pointer;
}
`}</style>

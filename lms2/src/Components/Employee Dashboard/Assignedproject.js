import React, { useState, useEffect } from 'react'
import {base_url} from '../Utils/base_url'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import EmployeeSidebar from './EmployeeSidebar'
import EmployeeHeader from './EmployeeHeader'

function Assignedproject() {

    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [matrixValues, setMatrixValues] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [validationStatus, setValidationStatus] = useState('');
    const [comments, setComments] = useState('');
    const [employeeData, setEmployeeData] = useState(null);

    useEffect(() => {
        fetchAssignedProjects();
         // Get employee data from localStorage
         const employeeDataString = localStorage.getItem('employeeData');
         if (employeeDataString) {
             setEmployeeData(JSON.parse(employeeDataString));
         }
      }, []);

      const fetchAssignedProjects = async () => {
        try {
            setIsLoading(true);
            
            // Get employee data from localStorage
            const employeeDataString = localStorage.getItem('employeeData');
            if (!employeeDataString) {
                throw new Error('Employee data not found. Please login again.');
            }

            const employeeData = JSON.parse(employeeDataString);
            const employeeId = employeeData.employee_id; // Use employee_id from stored data

            if (!employeeId) {
                throw new Error('Employee ID not found in stored data');
            }

            // Get token from localStorage
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication token not found. Please login again.');
            }

            const response = await axios.get(`${base_url}/employee-projects/${employeeId}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include auth token in request
                }
            });
            
            if (response.data.projects && response.data.projects.length > 0) {
                console.log('Fetched projects:', response.data.projects);
                setProjects(response.data.projects);
                setSelectedProject(response.data.projects[0]);
                initializeMatrixValues(response.data.projects[0]);
            } else {
                console.log('No projects found for employee:', employeeId);
                setProjects([]);
                setSelectedProject(null);
            }
        } catch (error) {
            console.error('Error fetching assigned projects:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch assigned projects';
            setError(errorMessage);
            toast.error(errorMessage);
            
            // If token is invalid or expired, redirect to login
            if (error.response?.status === 401) {
                localStorage.clear(); // Clear all stored data
                window.location.href = '/'; // Redirect to login page
            }
        } finally {
            setIsLoading(false);
        }
    };

      const initializeMatrixValues = (project) => {
        const values = {};
        project.matrix.rows.forEach((row, rowIndex) => {
            row.values.forEach((value, colIndex) => {
                const key = `${rowIndex}-${colIndex}`;
                values[key] = value;
            });
        });
        setMatrixValues(values);
    };

      const handleMatrixInputChange = (rowIndex, colIndex, value) => {
        const key = `${rowIndex}-${colIndex}`;
        setMatrixValues(prev => ({
          ...prev,
          [key]: value
        }));
      };
    
      const handleProjectSelect = (project) => {
        setSelectedProject(project);
        setMatrixValues({});
        initializeMatrixValues(project);
      };

    //   const handleSaveMatrix = async () => {
    //     try {
    //         setIsLoading(true);
    //         const token = localStorage.getItem('token');
            
    //         if (!token) {
    //             throw new Error('Authentication token not found. Please login again.');
    //         }

    //         const response = await axios.put(
    //             `${base_url}/update_project_matrix`,
    //             {
    //                 projectId: selectedProject._id,
    //                 matrixValues: matrixValues
    //             },
    //             {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                     'Content-Type': 'application/json'
    //                 }
    //             }
    //         );

    //         const updatedProject = response.data;
    //         setProjects(prev => 
    //             prev.map(p => p._id === updatedProject._id ? updatedProject : p)
    //         );
    //         setSelectedProject(updatedProject);
            
    //         toast.success('Matrix updated successfully');
    //     } catch (error) {
    //         console.error('Error saving matrix:', error);
    //         const errorMessage = error.response?.data?.message || 'Failed to save matrix';
    //         setError(errorMessage);
    //         toast.error(errorMessage);

    //         if (error.response?.status === 401) {
    //             localStorage.clear();
    //             window.location.href = '/';
    //         }
    //     } finally {
    //         setIsLoading(false);
    //     }
    //   };

    const handleSaveMatrix = async () => {
        try {
            // Validate that a response type is selected
            if (!validationStatus) {
                toast.error('Please select either Accept or Reject');
                return;
            }

            // Validate that comments are provided
            if (!comments) {
                toast.error('Please provide comments for your response');
                return;
            }

            setIsLoading(true);
            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error('Authentication token not found. Please login again.');
            }

            // Determine which endpoint to use based on employee department
            const endpoint = employeeData?.department === 'TENDER' 
                ? `${base_url}/submit-tender-response`
                : `${base_url}/submit-contract-response`;

            // Prepare the payload
            const payload = {
                projectId: selectedProject._id,
                status: validationStatus,
                comments: comments
            };

            // Only include matrix values if tender department is approving
            if (employeeData?.department === 'TENDER' && validationStatus === 'APPROVED') {
                payload.matrixValues = matrixValues;
            }

            const response = await axios.put(
                `${base_url}${endpoint}`,
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Update local state with response data
            const updatedProject = response.data;
            setProjects(prev => 
                prev.map(p => p._id === updatedProject._id ? updatedProject : p)
            );
            setSelectedProject(updatedProject);
            
            // Clear validation fields
            setValidationStatus('');
            setComments('');
            
            toast.success('Project response submitted successfully');
        } catch (error) {
            console.error('Error saving response:', error);
            const errorMessage = error.response?.data?.message || 'Failed to save response';
            setError(errorMessage);
            toast.error(errorMessage);

            if (error.response?.status === 401) {
                localStorage.clear();
                window.location.href = '/';
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading && projects.length === 0) {
      return (
          <div>
              <EmployeeSidebar />
              <section className="main-content-section">
                  <EmployeeHeader />
                  <div className="assigned-project-container">
                      <h4 className="section-title">Assigned Project</h4>
                      <div className="loading">Loading assigned projects...</div>
                  </div>
              </section>
          </div>
      );
  }

  return (
    <div>

<style>
{`
  body {
    background-color: rgba(46, 7, 63, 0.1);
    padding: 20px;
  }
  
  .assigned-project-container {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 30px;
    // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .project-selector {
    margin-bottom: 20px;
  }
  
  .project-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-bottom: 30px;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
  }
  
  .detail-item {
    display: flex;
    gap: 10px;
  }
  
  .detail-label {
    font-weight: 600;
    color: #495057;
  }
  
  .matrix-container {
    margin-top: 20px;
    overflow-x: auto;
  }
  
  .matrix-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
  }
  
  .matrix-table th,
  .matrix-table td {
    border: 1px solid #dee2e6;
    padding: 12px;
    text-align: center;
  }
  
  .matrix-table th {
    background-color: #f8f9fa;
    font-weight: 600;
  }
  
  .matrix-table input {
    width: 60px;
    padding: 6px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    text-align: center;
  }
  
  .matrix-table input:focus {
    outline: none;
    border-color: #86b7fe;
    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
  }
  
  .section-title {
    color: #2c3e50;
    margin-bottom: 20px;
    font-size: 1.5rem;
  }
  
  .matrix-header {
    margin-bottom: 15px;
  }
  
  .matrix-header h5 {
    color: #2c3e50;
    margin-bottom: 8px;
  }
  
  .matrix-header p {
    color: #6c757d;
    font-size: 0.9rem;
  }
`}
</style>

        <div>
            <EmployeeSidebar/>
            <section className="main-content-section">
              <EmployeeHeader/>

                  <div className="assigned-project-container">
                    <h4 className="section-title">Assigned Project</h4>

                    {isLoading ? (
                        <div className="loading-spinner">Loading projects...</div>
                    ) : error ? (
                        <div className="error-message">
                            {error}
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="no-projects">
                            <p>No projects have been assigned to you yet.</p>
                        </div>
                    ) : (
                        <>
                            <div className="project-selector">
                                <select 
                                    className="form-select"
                                    onChange={(e) => handleProjectSelect(projects[e.target.value])}
                                >
                                    {projects.map((project, index) => (
                                        <option key={project._id} value={index}>
                                            {project.name} ({project.code})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedProject && (
                                <>
                                    <div className="project-details">
                                        <div className="detail-item">
                                            <span className="detail-label">Name:</span>
                                            <span>{selectedProject.name}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Code:</span>
                                            <span>{selectedProject.code}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Region:</span>
                                            <span>{selectedProject.region}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Category:</span>
                                            <span>{selectedProject.category}</span>
                                        </div>
                                    </div>

                                    <div className="matrix-container">
                                        <div className="matrix-header">
                                            <h5>Manpower Requirement Matrix</h5>
                                            <p>Please enter the manpower requirement for each task</p>
                                        </div>

                                        <table className="matrix-table">
                                            <thead>
                                                <tr>
                                                    <th>Skill Level</th>
                                                    {selectedProject.matrix.headers.map((header, index) => (
                                                        <th key={index}>{header}</th>
                                                    ))}
                                                </tr>
                                                <tr>
                                                    <th>Job title</th>
                                                    {selectedProject.matrix.subHeaders.map((subHeader, index) => (
                                                        <th key={index}>{subHeader}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedProject.matrix.rows.map((row, rowIndex) => (
                                                    <tr key={rowIndex}>
                                                        <td>{row.function}</td>
                                                        {row.values.map((_, colIndex) => (
                                                            <td key={colIndex}>
                                                                <input
                                                                    type="number"
                                                                    style={{width:"60%"}}
                                                                    min="0"
                                                                    value={matrixValues[`${rowIndex}-${colIndex}`] || ''}
                                                                    onChange={(e) => handleMatrixInputChange(rowIndex, colIndex, e.target.value)}
                                                                />
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <div className='validate-container'>
                                          <h5>Validatation</h5>

                                          <div className='accept-validate'>
                <input 
                    type='radio' 
                    name='validation' 
                    value='APPROVED'
                    onChange={(e) => setValidationStatus(e.target.value)}
                    checked={validationStatus === 'APPROVED'}
                />
                <label>Accept</label>
                <textarea 
                    placeholder='Accept with comments'
                    value={validationStatus === 'APPROVED' ? comments : ''}
                    onChange={(e) => {
                        setValidationStatus('APPROVED');
                        setComments(e.target.value);
                    }}
                    disabled={validationStatus !== 'APPROVED'}
                />
            </div>

            <div className='reject-validate'>
                <input 
                    type='radio' 
                    name='validation' 
                    value='REJECTED'
                    onChange={(e) => setValidationStatus(e.target.value)}
                    checked={validationStatus === 'REJECTED'}
                />
                <label>Reject</label>
                <textarea 
                    placeholder='Reject with comments'
                    value={validationStatus === 'REJECTED' ? comments : ''}
                    onChange={(e) => {
                        setValidationStatus('REJECTED');
                        setComments(e.target.value);
                    }}
                    disabled={validationStatus !== 'REJECTED'}
                />
            </div>
                                        </div>

                                        <div className="mt-4">
                                            <button 
                                                className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                                                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                                onClick={handleSaveMatrix}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? 'Forwarding...' : 'Forward Matrix'}
                                            </button>
                                            {error && (
                                                <p className="text-red-500 mt-2">{error}</p>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
      <ToastContainer/>
    </div>
  )
}

export default Assignedproject


 
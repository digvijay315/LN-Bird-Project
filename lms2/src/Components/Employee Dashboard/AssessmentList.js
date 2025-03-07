import React, { useEffect, useState } from 'react'
import EmployeeSidebar from './EmployeeSidebar'
import EmployeeHeader from './EmployeeHeader'
import { base_url } from '../Utils/base_url'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

function AssessmentList() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [assessment, setAssessment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [employeeData, setEmployeeData] = useState(null);
    const [assessmentStatus, setAssessmentStatus] = useState({});
    const location = useLocation(); // Add this to detect navigation changes
    const [assignments, setAssignments] = useState([]);
  
    const handleTakeAssessment = (assessmentId) => {
      const employeeData = JSON.parse(localStorage.getItem('employeeData'));
      if (!employeeData) {
        toast.error('Please login again');
        navigate('/');
        return;
      }
      navigate(`/takeAssessmentView/${assessmentId}`);
    };
  
    const fetchAssessmentStatus = async (employeeId, assessmentId) => {
      try {
        const response = await axios.get(`${base_url}/assessment_status/${assessmentId}/${employeeId}`);
        if (response.data.success) {
          setAssessmentStatus(prev => ({
            ...prev,
            [assessmentId]: response.data.status
          }));
        }
      } catch (error) {
        console.error("Error fetching assessment status:", error);
      }
    };
  
    const fetchAssignedAssessments = async () => {
      try {
        setLoading(true);
        const employeeData = JSON.parse(localStorage.getItem('employeeData'));
        
        if (!employeeData || !employeeData._id) {
          toast.error('Please login again');
          navigate('/');
          return;
        }
  
        if (id !== employeeData._id) {
          toast.error('Unauthorized access');
          navigate('/');
          return;
        }
  
        const response = await axios.get(`${base_url}/get_assigned_assessments/${id}`);
        
        if (response.data.success && Array.isArray(response.data.data)) {
          setAssessment(response.data.data);
          // Fetch status for each assessment
          response.data.data.forEach(item => {
            fetchAssessmentStatus(employeeData.employee_id, item._id);
          });
        } else {
          console.log('Invalid response format:', response.data);
          setAssessment([]);
        }
      } catch (error) {
        console.error('Error fetching Assessment data:', error);
        toast.error(error.response?.data?.message || "Error fetching assigned Assessments");
        setAssessment([]);
      } finally {
        setLoading(false);
      }
    };

    // Add effect to handle employee data
    useEffect(() => {
      const storedData = localStorage.getItem('employeeData');
      if (storedData) {
        setEmployeeData(JSON.parse(storedData));
      }
    }, []);
  
    // Modified useEffect to handle navigation and initial load
    useEffect(() => {
      fetchAssignedAssessments();
    }, [id, location.key]); // Add location.key to refresh on navigation

      const fetchAssignments = async () => {
        try {
          const employee_id = localStorage.getItem('employee_id'); // Or however you store the logged-in user's ID
          const response = await axios.get(`${base_url}/employee_assignments/${employee_id}`);
          console.log(response);
          
          setAssignments(response.data);
        } catch (error) {
          console.error("Error fetching assignments:", error);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchAssignments();
      }, [])
  
    return (
      <div>
        <style>
        {`
            body {
            background-color: #e9ecef;
            padding: 20px;
            }
            .training-list {
            background-color: #fff;
            width: 100%;
            border-radius: 10px;
            padding: 1.5rem;
            }
            .training-list-header {
            background-color: #2E073F;
            width: 100%;
            height: 80px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            display: flex;
            justify-content: left;
            align-items: center;
            padding-left: 2rem;
            }
            .training-list-body {
            margin-top: 1rem;
            }
            .assessment-data {
            padding: 2rem;
            }
            .assessment-header {
            display: flex;
            justify-content: space-between;
            padding: 8px 2rem;
            border-radius: 1.5rem;
            border: 1px solid #2E073F;
            margin-bottom: 2rem;
            }
            .assessment-items {
            border-bottom: 1px solid rgba(0,0,0,0.4);
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 1rem;
            padding: 5px 1rem;
            }
            .status-badge {
                    padding: 6px 12px;
                    border-radius: 4px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    display: inline-block;
                    }
                    .status-badge.pending {
                    background-color: #FEF3C7;
                    color: #92400E;
                    }
                    .status-badge.completed {
                    background-color: #D1FAE5;
                    color: #065F46;
                    }
                    .take-assessment-btn {
                    padding: 6px 12px;
                    border-radius: 4px;
                    background-color: #2E073F;
                    color: white;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    }
                    .take-assessment-btn:hover {
                    opacity: 0.9;
                    }
                    .take-assessment-btn.disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    background-color: #666;
                    }
        `}
        </style>

        <EmployeeSidebar />
  
        <section className="main-content-section">
          <EmployeeHeader />
  
          <div className="header-div header-two">
            <div className='title-name'>
              <h5>Assessment List</h5>
              <p>
                <a onClick={fetchAssignedAssessments} style={{cursor:"pointer", color:"#099ded"}}>
                  Home
                </a> 
                <i className="fa-solid fa-caret-right"></i> Assessment List
              </p>
            </div>
          </div>
  
          <div className="training-list">
            <div className="training-list-header">
              <h4 style={{color: "#fff"}}>All Available Assessments</h4>
            </div>
  
            <div className="training-list-body">
              <div className='assessment-data'>
                <div className='assessment-header'>
                  <h5>Assessment name</h5>
                  <h5>Actions</h5>
                </div>
                
                {loading ? (
                  <div style={{margin:"1rem 2rem"}}>
                    <h5>Loading...</h5>
                  </div>
                ) : assessment && assessment.length > 0 ? (
                  assessment.map((item, index) => (
                    <div className='assessment-items' key={item._id}>
                      <div className='assessment-titles'>
                        <h6 style={{marginBottom:"0px"}}>
                          {index + 1}. {item.assessment_title}
                        </h6>
                      </div>
                      <div className={`status-badge ${assessmentStatus[item._id] || 'pending'}`}>
                        {assessmentStatus[item._id] || 'pending'}
                      </div>
                      <div className='assessment-actions' 
                           style={{display:"flex", alignItems:"center", gap:"20px"}}>
                        <p style={{marginBottom:"0px"}}>
                          <i className="fa-regular fa-clock"></i> {item.assessment_timer}
                        </p>
                        <button
                          onClick={() => handleTakeAssessment(item._id)}
                          disabled={assessmentStatus[item._id] === 'completed'}
                          className={`take-assessment-btn ${
                            assessmentStatus[item._id] === 'completed' ? 'disabled' : ''
                          }`}
                        >
                          {assessmentStatus[item._id] === 'completed' 
                            ? 'Completed'
                            : 'Take Assessment'}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{margin:"1rem 2rem"}}>
                    <h5>No Assessments available.</h5>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='assessmnet-for-attendies'>
            <div className="training-list-header">
              <h4 style={{color: "#fff"}}>Assessments for attendance</h4>
            </div>
            
            <div className="assigned-assessments">
              <h3>My Assessments</h3>
              <div className="assessment-grid">
                {assignments.map((assignment, index) => (
                  <div key={index} className="assessment-card">
                    <h4>{assignment.assessment.assessment_title}</h4>
                    <div className="assessment-details">
                      <p>Status: <span className={`status-${assignment.status}`}>{assignment.status}</span></p>
                      <p>Attempts: {assignment.attempt_limit}/{assignment.attempt_limit}</p>
                      <p>Passing Score: {assignment.passing_score}%</p>
                      <p>Deadline: {new Date(assignment.completion_deadline).toLocaleDateString()}</p>
                      {assignment.score > 0 && <p>Your Score: {assignment.score}%</p>}
                    </div>
                    {assignment.status === 'pending' && (
                      <button 
                        className="start-assessment"
                        onClick={() => {/* Add logic to start assessment */}}
                      >
                        Start Assessment
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <style jsx>{`
                .assessment-grid {
                  display: grid;
                  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                  gap: 20px;
                  padding: 20px;
                }
                .assessment-card {
                  border: 1px solid #e2e8f0;
                  border-radius: 8px;
                  padding: 16px;
                  background: white;
                }
                .status-pending { color: orange; }
                .status-completed { color: green; }
                .status-failed { color: red; }
                .start-assessment {
                  width: 100%;
                  padding: 8px;
                  background: #7A1CAC;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  margin-top: 12px;
                  cursor: pointer;
                }
              `}</style>
            </div>
          </div>
        </section>
      </div>
    );
}

export default AssessmentList;


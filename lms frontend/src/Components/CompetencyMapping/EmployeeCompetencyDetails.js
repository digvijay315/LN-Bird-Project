// This is a new component to view employee competency items
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { base_url } from '../Utils/base_url';

// const base_url = process.env.REACT_APP_API_URL;

export default function EmployeeCompetencyDetails() {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [competencyItems, setCompetencyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployeeCompetencyData();
  }, [employeeId]);

  const fetchEmployeeCompetencyData = async () => {
    try {
      setLoading(true);
      
      // Fetch employee data
      const employeeResponse = await axios.get(`${base_url}/employees`);
      console.log(employeeResponse);
      
      setEmployee(employeeResponse.data);
      
      // Fetch employee's competency mappings
      const mappingsResponse = await axios.get(`${base_url}/employee_competency_mappings/${employeeId}`);
      console.log(mappingsResponse);
      
      
      if (mappingsResponse.data && mappingsResponse.data.competencyItems) {
        setCompetencyItems(mappingsResponse.data.competencyItems);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employee competency data:", error);
      setError("Failed to load employee data. Please try again.");
      setLoading(false);
      toast.error("Failed to load employee data");
    }
  };

  const handleStatusChange = async (itemId, newStatus) => {
    try {
      await axios.patch(`${base_url}/competency_item_status`, {
        employeeId,
        itemId,
        status: newStatus
      });
      
      // Update local state
      const updatedItems = competencyItems.map(item => {
        if (item._id === itemId) {
          return { ...item, status: newStatus };
        }
        return item;
      });
      
      setCompetencyItems(updatedItems);
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating competency item status:", error);
      toast.error("Failed to update status");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!employee) return <div className="error">Employee not found</div>;

  return (
    <div className="employee-competency-details">
      <div className="header">
        <h1>Competency Details for {employee.employee_name}</h1>
        <Link to="/competency-mapping" className="btn btn-primary">Back to Mapping</Link>
      </div>
      
      <div className="employee-info">
        <div className="info-item">
          <strong>Employee ID:</strong> {employee.employee_id}
        </div>
        <div className="info-item">
          <strong>Function:</strong> {employee.function_title}
        </div>
        <div className="info-item">
          <strong>Job Title:</strong> {employee.job_title}
        </div>
      </div>
      
      <h2>Competency Items</h2>
      
      {competencyItems.length === 0 ? (
        <div className="no-items">No competency items assigned to this employee yet.</div>
      ) : (
        <div className="competency-items">
          <table className="items-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Sub Category</th>
                <th>Skill Level</th>
                <th>Training</th>
                <th>OJT</th>
                <th>Assessment</th>
                <th>OJA</th>
                <th>INA</th>
                <th>Validity</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {competencyItems.map((item) => (
                <tr key={item._id} className={`status-${item.status}`}>
                  <td>{item.mainCategory}</td>
                  <td>{item.subCategory}</td>
                  <td>{item.skillLevel}</td>
                  <td>{item.trainingCode === 'NA' ? 'N/A' : item.trainingCode}</td>
                  <td>{item.ojtCode === 'NA' ? 'N/A' : item.ojtCode}</td>
                  <td>{item.lmsAssessmentCode === 'NA' ? 'N/A' : item.lmsAssessmentCode}</td>
                  <td>{item.ojaCode === 'NA' ? 'N/A' : item.ojaCode}</td>
                  <td>{item.inaCode === 'NA' ? 'N/A' : item.inaCode}</td>
                  <td>{item.validity}</td>
                  <td>{new Date(item.deadLine).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${item.status}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="status-actions">
                      {item.status !== 'completed' && (
                        <button 
                          onClick={() => handleStatusChange(item._id, 'completed')} 
                          className="btn btn-success btn-sm"
                        >
                          Mark Complete
                        </button>
                      )}
                      {item.status !== 'expired' && (
                        <button 
                          onClick={() => handleStatusChange(item._id, 'expired')} 
                          className="btn btn-danger btn-sm"
                        >
                          Mark Expired
                        </button>
                      )}
                      {(item.status === 'completed' || item.status === 'expired') && (
                        <button 
                          onClick={() => handleStatusChange(item._id, 'active')} 
                          className="btn btn-primary btn-sm"
                        >
                          Reactivate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <ToastContainer />
    </div>
  );
}
import React, {useState, useEffect} from 'react'
import HRSidebar from './HRSidebar'
import HRHeader from './HRHeader'
import axios from 'axios';
import { base_url } from '../Utils/base_url';

function ApprovalsList() {

    const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [approvalData, setApprovalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      fetchApprovalData(selectedProject._id);
    }
  }, [selectedProject]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${base_url}/projects`);
      setProjects(response.data);
      if (response.data.length > 0) {
        setSelectedProject(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchApprovalData = async (projectId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${base_url}/project-approvals/${projectId}`);
      setApprovalData(response.data);
    } catch (error) {
      console.error('Error fetching approval data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>

        <style>
            {
                `
                    body {
                        background-color: rgba(46, 7, 63, 0.1);
                        padding: 20px;
                    }
                    .approvals-container {
                        background-color: #fff;
                        padding: 30px;
                        border-radius: 10px;
                    }
                        .approvals-container {
            background-color: #fff;
            padding: 30px;
            border-radius: 10px;
          }
          .status-approved { color: green; }
          .status-rejected { color: red; }
          .status-pending { color: orange; }
                `
            }
        </style>

        <div>
            <HRSidebar/>
            <section className="main-content-section">
               <HRHeader/> 

               <div className='approvals-container'>
                <div className='approvals-div'>
                <div className='approvals-projects'>
                <label>Select Project</label>
                <select 
                  onChange={(e) => setSelectedProject(projects[e.target.value])}
                >
                  {projects.map((project, index) => (
                    <option key={project._id} value={index}>
                      {project.name} ({project.code})
                    </option>
                  ))}
                </select>
              </div>

                    {/* <div className='approvals-list'>
                        <h5>Approvals List</h5>
                        <table>
                            <tr>
                                <th>Employee ID</th>
                                <th>Employee Name</th>
                                <th>Designation</th>
                                <th>Status</th>
                                <th>Comments</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>John Doe</td>
                                <td>Tender Department</td>
                                <td>Approve</td>
                                <td>Approved with comments</td>
                            </tr>
                        </table>
                    </div> */}

            {isLoading ? (
                <div>Loading approval data...</div>
              ) : approvalData ? (
                <div className='approvals-list'>
                  <h5>Approvals List</h5>
                  <table>
                    <thead>
                      <tr>
                        <th>Department</th>
                        <th>Employee ID</th>
                        <th>Status</th>
                        <th>Comments</th>
                        <th>Response Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Tender Department</td>
                        <td>{approvalData.tenderDeptResponse.employeeId}</td>
                        <td className={`status-${approvalData.tenderDeptResponse.status.toLowerCase()}`}>
                          {approvalData.tenderDeptResponse.status}
                        </td>
                        <td>{approvalData.tenderDeptResponse.comments}</td>
                        <td>
                          {approvalData.tenderDeptResponse.respondedAt 
                            ? new Date(approvalData.tenderDeptResponse.respondedAt).toLocaleDateString()
                            : 'Pending'}
                        </td>
                      </tr>
                      {approvalData.tenderDeptResponse.status === 'APPROVED' && (
                        <tr>
                          <td>Contract Manager</td>
                          <td>{approvalData.contractManagerResponse.employeeId}</td>
                          <td className={`status-${approvalData.contractManagerResponse.status.toLowerCase()}`}>
                            {approvalData.contractManagerResponse.status}
                          </td>
                          <td>{approvalData.contractManagerResponse.comments}</td>
                          <td>
                            {approvalData.contractManagerResponse.respondedAt 
                              ? new Date(approvalData.contractManagerResponse.respondedAt).toLocaleDateString()
                              : 'Pending'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div>No approval data found for this project.</div>
              )}
                </div>
                
               </div>
            </section>
        </div>
    </div>
  )
}

export default ApprovalsList
// import React from 'react'

// function SeeResult() {
//   return (
//     <div>
//       <h4>CAT Title Name</h4>

//       <table>
//         <thead>
//           <tr>
//             <th>Employee Id</th>
//             <th>Employee Name</th>
//             <th>Job title</th>
//             <th>Skill Level</th>
//             <th>CAT Code</th>
//             <th>Main Skill name</th>

//             {/* For MCQ type overall score% */}
//             <th>Sub skill 1</th>
//             <th>Sub skill 1 score%</th>
//             <th>Sub skill 2</th>
//             <th>Sub skill 2 score%</th>
//             <th>Sub skill 3</th>
//             <th>Sub skill 3 score%</th>
//             <th>Sub skill 4</th>
//             <th>Sub skill 4 score%</th>
//             <th>Sub skill 5</th>
//             <th>Sub skill 5 score%</th>
//             <th>Overall final score of all five sub skills</th>

//             {/* For Text Overall score% */}
//             <th>Overall score of Text type</th>

//             {/* For Interview type overall score% */}
//             <th>Sub skill 1</th>
//             <th>Sub skill 1 score%</th>
//             <th>Sub skill 2</th>
//             <th>Sub skill 2 score%</th>
//             <th>Sub skill 3</th>
//             <th>Sub skill 3 score%</th>
//             <th>Sub skill 4</th>
//             <th>Sub skill 4 score%</th>
//             <th>Sub skill 5</th>
//             <th>Sub skill 5 score%</th>
//             <th>Overall final score% of all five sub skills</th>

//             {/* For score of overall CAT (MCQ+Text+Interview) */}
//             <th>Overall final CAT score%</th>
//           </tr>
//         </thead>
//       </table>
//     </div>
//   )
// }

// export default SeeResult



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { base_url } from '../Utils/base_url';

// function SeeResult() {
//     const { catId } = useParams();
//     const [results, setResults] = useState([]);
//     const [catTitle, setCatTitle] = useState('');

//     useEffect(() => {
//         const fetchResults = async () => {
//             try {
//                 const response = await axios.get(`${base_url}/get_cat_results/${catId}`);
//                 setResults(response.data.data);
//                 setCatTitle(response.data.data[0]?.catTitle || 'CAT Results');
//             } catch (error) {
//                 console.error('Error fetching results:', error);
//             }
//         };

//         fetchResults();
//     }, [catId]);

//     return (
//         <div className="results-container">
//             <h4>{catTitle}</h4>
            
//             <div className="table-responsive">
//                 <table className="results-table">
//                     <thead>
//                         <tr>
//                             <th rowSpan="2">Employee ID</th>
//                             <th rowSpan="2">Employee Name</th>
//                             <th rowSpan="2">Job Title</th>
//                             <th rowSpan="2">CAT Code</th>
//                             <th rowSpan="2">Main Skill</th>
                            
//                             {/* MCQ Section */}
//                             <th colSpan="6" className="section-header">MCQ Assessment</th>
                            
//                             {/* Text Section */}
//                             <th rowSpan="2">Text Assessment Score %</th>
                            
//                             {/* Interview Section */}
//                             <th colSpan="6" className="section-header">Interview Assessment</th>
                            
//                             {/* Overall Score */}
//                             <th rowSpan="2">Overall CAT Score %</th>
//                             <th rowSpan="2">Status</th>
//                         </tr>
//                         <tr>
//                             {/* MCQ Sub-headers */}
//                             <th>Sub Skill 1 %</th>
//                             <th>Sub Skill 2 %</th>
//                             <th>Sub Skill 3 %</th>
//                             <th>Sub Skill 4 %</th>
//                             <th>Sub Skill 5 %</th>
//                             <th>Overall MCQ %</th>
                            
//                             {/* Interview Sub-headers */}
//                             <th>Sub Skill 1 %</th>
//                             <th>Sub Skill 2 %</th>
//                             <th>Sub Skill 3 %</th>
//                             <th>Sub Skill 4 %</th>
//                             <th>Sub Skill 5 %</th>
//                             <th>Overall Interview %</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {results.map((result, index) => (
//                             <tr key={index}>
//                                 <td>{result.employee_id}</td>
//                                 <td>{result.employee_name}</td>
//                                 <td>{result.job_title}</td>
//                                 <td>{result.catCode}</td>
//                                 <td>{result.mainSkill}</td>
                                
//                                 {/* MCQ Scores */}
//                                 {Array.from({ length: 5 }).map((_, i) => (
//                                     <td key={`mcq-${i}`}>
//                                         {Object.values(result.mcqSubSkillScores)[i]?.scorePercentage || 'N/A'}
//                                     </td>
//                                 ))}
//                                 <td>{result.overallMcqScore}</td>
                                
//                                 {/* Text Score */}
//                                 <td>{result.textScore || 'N/A'}</td>
                                
//                                 {/* Interview Scores */}
//                                 {Array.from({ length: 5 }).map((_, i) => (
//                                     <td key={`interview-${i}`}>
//                                         {Object.values(result.interviewScores)[i] || 'N/A'}
//                                     </td>
//                                 ))}
//                                 <td>
//                                     {Object.values(result.interviewScores).length > 0
//                                         ? (Object.values(result.interviewScores).reduce((a, b) => a + b, 0) / 
//                                            Object.values(result.interviewScores).length).toFixed(2)
//                                         : 'N/A'
//                                     }
//                                 </td>
                                
//                                 {/* Overall Score */}
//                                 <td>{result.overallAverage}</td>
//                                 <td>{result.passed ? 'Passed' : 'Failed'}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// export default SeeResult;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { base_url } from '../Utils/base_url';

function SeeResult() {
    const { catId } = useParams();
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [catTitle, setCatTitle] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [viewMode, setViewMode] = useState('summary');
    const [searchTerm, setSearchTerm] = useState('');
    const [scoreFilter, setScoreFilter] = useState({
        minScore: '',
        maxScore: '',
        scoreType: 'overall' // default to overall score
    });

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`${base_url}/get_cat_results/${catId}`);
                setResults(response.data.data);
                setFilteredResults(response.data.data);
                setCatTitle(response.data.data[0]?.catTitle || 'CAT Results');
            } catch (error) {
                console.error('Error fetching results:', error);
            }
        };

        fetchResults();
    }, [catId]);

    // Advanced Search functionality
    useEffect(() => {
        let filtered = results;

        // Text search filter
        if (searchTerm) {
            const searchTermLower = searchTerm.toLowerCase();
            filtered = filtered.filter(result => 
                result.employee_id.toLowerCase().includes(searchTermLower) ||
                result.employee_name.toLowerCase().includes(searchTermLower) ||
                result.job_title.toLowerCase().includes(searchTermLower) ||
                result.mainSkill.toLowerCase().includes(searchTermLower)
            );
        }

        // Score range filter
        if (scoreFilter.minScore !== '' || scoreFilter.maxScore !== '') {
            const min = parseFloat(scoreFilter.minScore) || 0;
            const max = parseFloat(scoreFilter.maxScore) || 100;
            
            filtered = filtered.filter(result => {
                let score;
                switch(scoreFilter.scoreType) {
                    case 'mcq':
                        score = result.scores.mcq;
                        break;
                    case 'text':
                        score = result.scores.text;
                        break;
                    case 'interview':
                        score = result.scores.interview;
                        break;
                    default:
                        score = result.scores.overall;
                }
                return score >= min && score <= max;
            });
        }

        setFilteredResults(filtered);
    }, [searchTerm, scoreFilter, results]);

    const handleScoreFilterChange = (e) => {
        const { name, value } = e.target;
        setScoreFilter(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getScoreColor = (score) => {
        if (score >= 80) return '#28a745';
        if (score >= 60) return '#ffc107';
        return '#dc3545';
    };

    const InterviewSection = ({ interviewDetails }) => {

        const styles = {
            section: {
              padding: '20px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              marginBottom: '20px'
            },
            subSkillContainer: {
              marginBottom: '24px',
              border: '1px solid #e1e4e8',
              borderRadius: '6px',
              padding: '16px'
            },
            subSkillHeader: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px',
              borderBottom: '1px solid #e1e4e8',
              paddingBottom: '12px'
            },
            subSkillTitle: {
              margin: 0,
              color: '#2c3e50',
              fontSize: '18px',
              fontWeight: '600'
            },
            subSkillScore: {
              fontSize: '16px',
              fontWeight: '500'
            },
            questionsContainer: {
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '16px'
            },
            questionCard: {
              padding: '16px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              border: '1px solid #e1e4e8'
            },
            questionTitle: {
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '8px'
            },
            questionText: {
              marginBottom: '12px',
              color: '#4a5568'
            },
            scoreContainer: {
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            },
            scoreLabel: {
              fontWeight: '500',
              color: '#4a5568'
            },
            overallInterviewScore: {
              marginTop: '24px',
              padding: '16px',
              backgroundColor: '#2c3e50',
              borderRadius: '6px',
              color: 'white',
              textAlign: 'center'
            },
            overallTitle: {
              margin: '0 0 8px 0',
              fontSize: '18px'
            },
            overallScoreValue: {
              fontSize: '24px',
              fontWeight: '600'
            }
          };
          
        const { subSkillScores } = interviewDetails;
      
        return (
          <div style={styles.section}>
            <h5 style={styles.sectionTitle}>Interview Assessment</h5>
            
            {/* Display each subskill and its questions */}
            {Object.entries(subSkillScores).map(([name, data]) => (
              <div key={name} style={styles.subSkillContainer}>
                {/* Subskill Header */}
                <div style={styles.subSkillHeader}>
                  <h4 style={styles.subSkillTitle}>{name}</h4>
                  <div style={styles.subSkillScore}>
                    Overall Score: 
                    <span style={{ 
                      color: getScoreColor(data.averageScore),
                      marginLeft: '8px',
                      fontWeight: '600'
                    }}>
                      {data.averageScore}%
                    </span>
                  </div>
                </div>
      
                {/* Questions for this subskill */}
                <div style={styles.questionsContainer}>
                  {data.questions.map((question, index) => (
                    <div key={index} style={styles.questionCard}>
                      <div style={styles.questionTitle}>
                        Question {index + 1}
                      </div>
                      <div style={styles.questionText}>
                        {question.question}
                      </div>
                      <div style={styles.scoreContainer}>
                        <span style={styles.scoreLabel}>Score:</span>
                        <span style={{
                          color: getScoreColor((question.score / question.maxScore) * 100),
                          fontWeight: '600'
                        }}>
                          {question.score}/{question.maxScore}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
      
            {/* Overall Interview Score */}
            <div style={styles.overallInterviewScore}>
              <h5 style={styles.overallTitle}>Overall Interview Score</h5>
              <div style={styles.overallScoreValue}>
                {calculateOverallInterviewScore(subSkillScores)}%
              </div>
            </div>
          </div>
        );
    };

    const calculateOverallInterviewScore = (subSkillScores) => {
        const scores = Object.values(subSkillScores);
        const total = scores.reduce((sum, data) => sum + data.averageScore, 0);
        return (total / scores.length).toFixed(2);
    };

    const renderSubSkillScores = (subSkillScores) => {
        return Object.entries(subSkillScores).map(([name, data]) => (
            <div key={name} style={styles.subSkillScore}>
                <h5 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{name}</h5>
                <div style={styles.scoreLabel}>Score: 
                    <span style={{ ...styles.scoreValue, color: getScoreColor(data.scorePercentage) }}>
                        {data.scorePercentage}%
                    </span>
                </div>
                <div style={styles.scoreLabel}>Correct: {data.correctCount}/{data.totalQuestions}</div>
                <div style={styles.scoreLabel}>Points: {data.totalPoints}/{data.maxPossiblePoints}</div>
            </div>
        ));
    };

    const renderDetailedView = (employee) => {
        if (!employee) return null;

        return (
            <div style={styles.detailedView}>
                <button 
                    style={styles.backButton}
                    onClick={() => {
                        setSelectedEmployee(null);
                        setViewMode('summary');
                    }}
                >
                    ← Back to Summary
                </button>

                <h4 style={{ ...styles.sectionTitle, fontSize: '24px' }}>
                    Results for {employee.employee_name}
                </h4>

                {/* MCQ Section */}
                <div style={styles.section}>
                    <h5 style={styles.sectionTitle}>MCQ Assessment</h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
                        {renderSubSkillScores(employee.mcqDetails.subSkillScores)}
                    </div>
                    <div style={{ marginTop: '15px', fontWeight: '600' }}>
                        Overall MCQ Score: 
                        <span style={{ color: getScoreColor(employee.scores.mcq) }}>
                            {employee.scores.mcq}%
                        </span>
                    </div>
                </div>

                {/* Text Assessment Section */}
                {employee.textDetails && (
                    <div style={styles.section}>
                        <h5 style={styles.sectionTitle}>Text Assessment</h5>
                        <div style={{ marginBottom: '15px', fontWeight: '600' }}>
                            Average Score: 
                            <span style={{ color: getScoreColor(employee.textDetails.average) }}>
                                {employee.textDetails.average}%
                            </span>
                        </div>
                        <div>
                            {employee.textDetails.responses.map((response, index) => (
                                <div key={index} style={styles.response}>
                                    <h6 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
                                        Question {index + 1}
                                    </h6>
                                    <div style={styles.scoreLabel}>Answer: {response.answer}</div>
                                    <div style={styles.scoreLabel}>
                                        Score: 
                                        <span style={{ color: getScoreColor((response.score/5)*100) }}>
                                            {response.score}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Interview Section */}
                {/* In your renderDetailedView function, replace the interview section with: */}
                {Object.keys(employee.interviewDetails.subSkillScores).length > 0 && (
                    <InterviewSection interviewDetails={employee.interviewDetails} />
                )}

                <div style={{ ...styles.section, backgroundColor: '#2c3e50', color: 'white' }}>
                    <h5 style={{ ...styles.sectionTitle, color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>
                        Overall Results
                    </h5>
                    <div style={{ fontSize: '18px', marginBottom: '10px' }}>
                        Final Score: 
                        <span style={{ 
                            color: getScoreColor(employee.scores.overall),
                            marginLeft: '10px',
                            fontWeight: '600'
                        }}>
                            {employee.scores.overall}%
                        </span>
                    </div>
                    <div style={{ 
                        ...styles.statusBadge,
                        backgroundColor: employee.passed ? '#28a745' : '#dc3545'
                    }}>
                        {employee.passed ? 'PASSED' : 'FAILED'}
                    </div>
                </div>
            </div>
        );
    };

    const renderMcqSubSkills = (result) => {
        const subSkills = result.mcqDetails?.subSkillScores || {};
        const entries = Object.entries(subSkills);
        const filledEntries = Array(5).fill(null).map((_, i) => entries[i] || [null, null]);
        
        return filledEntries.flatMap(([name, data]) => [
            <td style={styles.td}>{name || ''}</td>,
            <td style={{...styles.td, color: getScoreColor(data?.scorePercentage || 0)}}>
                {data?.scorePercentage ? `${data.scorePercentage}%` : ''}
            </td>
        ]);
    };

    const renderInterviewSubSkills = (result) => {
        const subSkills = result.interviewDetails?.subSkillScores || {};
        const entries = Object.entries(subSkills);
        const filledEntries = Array(5).fill(null).map((_, i) => entries[i] || [null, null]);
        
        return filledEntries.flatMap(([name, data]) => [
            <td style={styles.td}>{name || ''}</td>,
            <td style={{...styles.td, color: getScoreColor(data?.averageScore || 0)}}>
                {data?.averageScore ? `${data.averageScore}%` : ''}
            </td>
        ]);
    };


    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h4 style={styles.title}>{catTitle}</h4>
                <input 
                    type="text" 
                    placeholder="Search by employee, skill, or ID..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        marginLeft: '10px',
                        padding: '8px',
                        width: '250px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                />
                {/* Score Filter Inputs */}
                <select 
                    name="scoreType" 
                    value={scoreFilter.scoreType}
                    onChange={handleScoreFilterChange}
                    style={{
                        marginLeft: '10px',
                        padding: '8px',
                        borderRadius: '4px',
                        width: '300px',
                        border: '1px solid #ccc'
                    }}
                >
                    <option value="overall">Overall Score</option>
                    <option value="mcq">MCQ Score</option>
                    <option value="text">Text Score</option>
                    <option value="interview">Interview Score</option>
                </select>

                <input 
                    type="number" 
                    name="minScore"
                    placeholder="Min Score (%)"
                    value={scoreFilter.minScore}
                    onChange={handleScoreFilterChange}
                    min="0"
                    max="100"
                    style={{
                        marginLeft: '10px',
                        padding: '8px',
                        width: '150px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                />

                <input 
                    type="number" 
                    name="maxScore"
                    placeholder="Max Score (%)"
                    value={scoreFilter.maxScore}
                    onChange={handleScoreFilterChange}
                    min="0"
                    max="100"
                    style={{
                        marginLeft: '10px',
                        padding: '8px',
                        width: '150px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                    }}
                />

                {viewMode === 'summary' && (
                    <div style={{ color: '#6c757d', fontSize: '14px', marginLeft: '10px' }}>
                        Total Candidates: {results.length}
                    </div>
                )}
            </div>

            {viewMode === 'summary' ? (
                <div style={{ overflowX: 'auto' }}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={{...styles.th, minWidth: '100px'}} colSpan={5}>Employee Details</th>
                                <th style={{...styles.th, minWidth: '150px'}}>Skills Category</th>
                                <th style={{...styles.th, minWidth: '120px'}} colSpan={10}>MCQ Type</th>
                                <th style={{...styles.th, minWidth: '120px'}}>MCQ overall score</th>
                                <th style={{...styles.th, minWidth: '100px'}}>Text Type</th>
                                <th style={{...styles.th, minWidth: '120px'}} colSpan={10}>Interview Type</th>
                                <th style={{...styles.th, minWidth: '140px'}}>Interview overall score</th>
                                <th style={{...styles.th, minWidth: '120px'}}>CAT Overall final</th>
                                <th style={{...styles.th, minWidth: '100px'}} colSpan={2}>Others</th>
                            </tr>
                            <tr>
                                {/* Employee Details */}
                                <th style={{...styles.th, minWidth: '120px'}}>Employee ID</th>
                                <th style={{...styles.th, minWidth: '150px'}}>Employee Name</th>
                                <th style={{...styles.th, minWidth: '150px'}}>Job Title</th>
                                <th style={{...styles.th, minWidth: '120px'}}>Skill Level</th>
                                <th style={{...styles.th, minWidth: '120px'}}>CAT Code</th>

                                {/* Skills Category */}
                                <th style={{...styles.th, minWidth: '150px'}}>Main Category title</th>

                                {/* MCQ Type */}
                                <th style={{...styles.th, minWidth: '150px'}}>Sub Category 1</th>
                                <th style={{...styles.th, minWidth: '120px'}}>Score%</th>
                                <th style={{...styles.th, minWidth: '150px'}}>Sub Category 2</th>
                                <th style={{...styles.th, minWidth: '120px'}}>Score%</th>
                                <th style={{...styles.th, minWidth: '150px'}}>Sub Category 3</th>
                                <th style={{...styles.th, minWidth: '120px'}}>Score%</th>
                                <th style={{...styles.th, minWidth: '150px'}}>Sub Category 4</th>
                                <th style={{...styles.th, minWidth: '120px'}}>Score%</th>
                                <th style={{...styles.th, minWidth: '150px'}}>Sub Category 5</th>
                                <th style={{...styles.th, minWidth: '120px'}}>Score%</th>

                                {/* MCQ overall score */}
                                <th style={{...styles.th, minWidth: '120px'}}>MCQ Score</th>

                                {/* Text Type Score */}
                                <th style={{...styles.th, minWidth: '100px'}}>Text Score</th>

                                {/* Interview Type */}
                                <th style={{...styles.th, minWidth: '150px'}}>Sub Category 1</th>
                                <th style={{...styles.th, minWidth: '120px'}}>Score%</th>
                                <th style={{...styles.th, minWidth: '150px'}}>Sub Category 2</th>
                                <th style={{...styles.th, minWidth: '120px'}}>Score%</th>
                                <th style={{...styles.th, minWidth: '150px'}}>Sub Category 3</th>
                                <th style={{...styles.th, minWidth: '120px'}}>Score%</th>
                                <th style={{...styles.th, minWidth: '150px'}}>Sub Category 4</th>
                                <th style={{...styles.th, minWidth: '120px'}}>Score%</th>
                                <th style={{...styles.th, minWidth: '150px'}}>Sub Category 5</th>
                                <th style={{...styles.th, minWidth: '120px'}}>Score%</th>

                                {/* Interview overall score */}
                                <th style={{...styles.th, minWidth: '140px'}}>Interview Score</th>

                                {/* CAT Overall final */}
                                <th style={{...styles.th, minWidth: '120px'}}>Overall Score</th>

                                {/* Others */}
                                <th style={{...styles.th, minWidth: '100px'}}>Status</th>
                                <th style={{...styles.th, minWidth: '100px'}}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredResults.map((result, index) => (
                                <tr key={index}>
                                    <td style={styles.td}>{result.employee_id}</td>
                                    <td style={styles.td}>{result.employee_name}</td>
                                    <td style={styles.td}>{result.job_title}</td>
                                    <td style={styles.td}>{result.tag}</td>
                                    <td style={styles.td}>{result.catCode}</td>
                                    <td style={styles.td}>{result.mainSkill}</td>

                                    {/* MCQ Sub Skills */}
                                    {renderMcqSubSkills(result)}

                                    {/* MCQ Overall Score */}
                                    <td style={{...styles.td, color: getScoreColor(result.scores.mcq)}}>
                                        {result.scores.mcq}%
                                    </td>

                                    {/* Text Score */}
                                    <td style={{...styles.td, color: getScoreColor(result.scores.text || 0)}}>
                                        {result.scores.text || 'N/A'}%
                                    </td>

                                    {/* Interview Sub Skills */}
                                    {renderInterviewSubSkills(result)}

                                    {/* Interview Overall Score */}
                                    <td style={{...styles.td, color: getScoreColor(result.scores.interview || 0)}}>
                                        {result.scores.interview || 'N/A'}%
                                    </td>

                                    {/* Overall Score */}
                                    <td style={{...styles.td, color: getScoreColor(result.scores.overall)}}>
                                        {result.scores.overall}%
                                    </td>

                                    {/* Status and Actions */}
                                    <td style={styles.td}>
                                        <span style={{
                                            ...styles.statusBadge,
                                            backgroundColor: result.passed ? '#28a745' : '#dc3545',
                                            color: 'white'
                                        }}>
                                            {result.passed ? 'PASSED' : 'FAILED'}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        <button 
                                            style={styles.detailsBtn}
                                            onClick={() => {
                                                setSelectedEmployee(result);
                                                setViewMode('detailed');
                                            }}
                                        >
                                            View Details
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                renderDetailedView(selectedEmployee)
            )}
        </div>
    );
}

export default SeeResult;   


const styles = {
    container: {
        padding: '20px',
        maxWidth: '100%',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif'
    },
    header: {
        backgroundColor: '#f8f9fa',
        padding: '15px 20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        color: '#2c3e50',
        margin: '0',
        fontSize: '24px'
    },
    tableContainer: {
        overflowX: 'auto',
        whiteSpace: 'nowrap',
    },
    viewToggleBtn: {
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        fontSize: '14px'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
        minWidth: '2000px',
    },
    th: {
        padding: '12px 15px',
        backgroundColor: '#f8f9fa',
        borderBottom: '2px solid #dee2e6',
        color: '#2c3e50',
        fontWeight: '600',
        textAlign: 'left',
        whiteSpace: 'nowrap', // Prevent text wrapping
        position: 'sticky', // Keep header visible during scroll
        top: 0,
        zIndex: 1,
        minWidth: '120px', // Minimum width for each column
    },
    td: {
        padding: '12px 15px',
        borderBottom: '1px solid #dee2e6',
        color: '#2c3e50',
        whiteSpace: 'nowrap', // Prevent text wrapping
    },
    detailsBtn: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        width: '130px'
    },
    detailedView: {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    section: {
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px'
    },
    sectionTitle: {
        color: '#2c3e50',
        borderBottom: '2px solid #dee2e6',
        paddingBottom: '10px',
        marginBottom: '15px'
    },
    subSkillScore: {
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '6px',
        marginBottom: '10px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    },
    scoreLabel: {
        color: '#6c757d',
        fontSize: '14px',
        marginBottom: '5px'
    },
    scoreValue: {
        color: '#2c3e50',
        fontSize: '16px',
        fontWeight: '600'
    },
    statusBadge: {
        padding: '6px 12px',
        borderRadius: '20px',
        fontWeight: '500',
        fontSize: '14px',
        display: 'inline-block'
    },
    backButton: {
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '20px'
    },
    response: {
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '6px',
        marginBottom: '10px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    }
};
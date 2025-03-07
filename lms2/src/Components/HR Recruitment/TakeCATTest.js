import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import './TakeCATTest.css';
import { base_url } from '../Utils/base_url';

const TakeCATTest = () => {
  const { catId, candidateId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testData, setTestData] = useState(null);
  const [candidateData, setCandidateData] = useState(null);
  const [responseId, setResponseId] = useState(null);
  const [currentStep, setCurrentStep] = useState('intro'); // intro, details, mcq, text, review, submitted
  const [timeLeft, setTimeLeft] = useState(null);
  const timerRef = useRef(null);
  
  // State for candidate responses
  const [mcqResponses, setMcqResponses] = useState([]);
  const [textResponses, setTextResponses] = useState([]);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [currentSubSkillIndex, setCurrentSubSkillIndex] = useState(0);
  
  // Load test and candidate data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch the CAT data
        const catResponse = await axios.get(`${base_url}/get_cat_byID_randomlyFive/${catId}`);
        console.log(catResponse);
        
        setTestData(catResponse.data.data);
        
        // Fetch candidate data
        const candidateResponse = await axios.get(`${base_url}/get_candidate/${candidateId}`);
        console.log(candidateResponse);
        
        setCandidateData(candidateResponse.data.data);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load test data. Please try again.');
        setLoading(false);
        console.error('Error loading test:', err);
      }
    };
    
    fetchData();
  }, [catId, candidateId]);
  
  // Start the test
  const startTest = async () => {
    try {
      const response = await axios.post(`${base_url}/candidate_test_start`, {
        candidateId,
        catId
      });
      
      setResponseId(response.data.data.responseId);
      
      // Initialize response structures
      initializeResponses();
      
      // Set up timer if there's a time limit
      if (testData.timeLimit) {
        const [hours, minutes] = testData.timeLimit.split(':').map(Number);
        const totalMinutes = (hours * 60) + minutes;
        setTimeLeft(totalMinutes * 60); // Convert to seconds
      }
      
      setCurrentStep('details');
    } catch (err) {
      setError('Failed to start the test. Please try again.');
      console.error('Error starting test:', err);
    }
  };
  
  // Initialize response structures based on test data
  const initializeResponses = () => {
    // Initialize MCQ responses
    const mcqResps = [];
    
    testData.mainSkills.forEach(mainSkill => {
      mainSkill.subSkills.forEach(subSkill => {
        if (subSkill.mcqQuestions && subSkill.mcqQuestions.length > 0) {
          subSkill.mcqQuestions.forEach(question => {
            mcqResps.push({
              questionId: question._id,
              question: question.question,
              selectedOptions: [],
              correctOptions: question.options,
              maxPoints: question.points || 1,
              skillName: mainSkill.name,
              subSkillName: subSkill.name
            });
          });
        }
      });
    });
    
    setMcqResponses(mcqResps);
    
    // Initialize text responses
    const textResps = [];
    
    if (testData.textQuestions && testData.textQuestions.length > 0) {
      testData.textQuestions.forEach(question => {
        textResps.push({
          questionId: question._id,
          question: question.question,
          subtitle: question.subtitle || '',
          answerType: question.answerType || 'short',
          answer: '',
          maxPoints: question.points || 5
        });
      });
    }
    
    setTextResponses(textResps);
  };
  
  // Timer effect
  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0 && currentStep !== 'submitted') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            // Auto-submit when time runs out
            submitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, currentStep]);
  
  // Format time left
  const formatTimeLeft = () => {
    if (timeLeft === null) return '';
    
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Handle MCQ option selection
  const handleOptionSelect = (questionIndex, optionText) => {
    const updatedResponses = [...mcqResponses];
    const question = updatedResponses[questionIndex];
    
    // Handle single or multiple selection based on maxCorrectAnswers
    const maxCorrect = testData.mainSkills[currentSkillIndex]
      .subSkills[currentSubSkillIndex]
      .mcqQuestions.find(q => q._id === question.questionId)?.maxCorrectAnswers || 1;
    
    if (maxCorrect <= 1) {
      // Single selection
      question.selectedOptions = [optionText];
    } else {
      // Multiple selection
      if (question.selectedOptions.includes(optionText)) {
        question.selectedOptions = question.selectedOptions.filter(opt => opt !== optionText);
      } else {
        question.selectedOptions = [...question.selectedOptions, optionText];
      }
    }
    
    setMcqResponses(updatedResponses);
  };
  
  // Handle text answer input
  const handleTextInput = (questionIndex, value) => {
    const updatedResponses = [...textResponses];
    updatedResponses[questionIndex].answer = value;
    setTextResponses(updatedResponses);
  };
  
  // Navigate through skills and sub-skills
  const navigateSkill = (direction) => {
    if (!testData || !testData.mainSkills) return;
    
    if (direction === 'next') {
      // Check if we have more sub-skills in the current skill
      if (currentSubSkillIndex < testData.mainSkills[currentSkillIndex].subSkills.length - 1) {
        setCurrentSubSkillIndex(currentSubSkillIndex + 1);
      } else {
        // Move to the next skill
        if (currentSkillIndex < testData.mainSkills.length - 1) {
          setCurrentSkillIndex(currentSkillIndex + 1);
          setCurrentSubSkillIndex(0);
        } else {
          // Move to text questions
          setCurrentStep('text');
        }
      }
    } else if (direction === 'prev') {
      // Check if we can go back to previous sub-skill
      if (currentSubSkillIndex > 0) {
        setCurrentSubSkillIndex(currentSubSkillIndex - 1);
      } else {
        // Go back to previous skill
        if (currentSkillIndex > 0) {
          setCurrentSkillIndex(currentSkillIndex - 1);
          setCurrentSubSkillIndex(testData.mainSkills[currentSkillIndex - 1].subSkills.length - 1);
        } else {
          // Go back to details
          setCurrentStep('details');
        }
      }
    }
  };
  
  // Submit test
  const submitTest = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    try {
      setCurrentStep('submitting');
      
      // Prepare data for submission
      const submissionData = {
        mcqResponses,
        textResponses
      };
      
      // Submit the test
      await axios.post(`${base_url}/candidate_test_submit/${responseId}`, submissionData);
      
      setCurrentStep('submitted');
    } catch (err) {
      setError('Failed to submit test. Please try again.');
      console.error('Error submitting test:', err);
    }
  };
  
  // Current MCQ questions for the selected sub-skill
  const getCurrentMCQQuestions = () => {
    if (!testData || 
        !testData.mainSkills || 
        currentSkillIndex >= testData.mainSkills.length || 
        !testData.mainSkills[currentSkillIndex].subSkills ||
        currentSubSkillIndex >= testData.mainSkills[currentSkillIndex].subSkills.length) {
      return [];
    }
    
    return testData.mainSkills[currentSkillIndex].subSkills[currentSubSkillIndex].mcqQuestions || [];
  };
  
  // Get MCQ response indices for the current sub-skill
  const getCurrentMCQIndices = () => {
    if (!testData) return [];
    
    const currentSkill = testData.mainSkills[currentSkillIndex];
    const currentSubSkill = currentSkill.subSkills[currentSubSkillIndex];
    
    return mcqResponses
      .map((resp, index) => ({ index, resp }))
      .filter(item => 
        item.resp.skillName === currentSkill.name && 
        item.resp.subSkillName === currentSubSkill.name
      )
      .map(item => item.index);
  };
  
  // Render the introduction screen
  const renderIntro = () => (
    <div className="cat-intro-container">
      <h1>{testData.title}</h1>
      <div className="cat-intro-details">
        <p><strong>Test Code:</strong> {testData.code}</p>
        <p><strong>Description:</strong> {testData.description || 'No description provided.'}</p>
        {testData.timeLimit && (
          <p><strong>Time Limit:</strong> {testData.timeLimit}</p>
        )}
        {testData.passingScore && (
          <p><strong>Passing Score:</strong> {testData.passingScore}%</p>
        )}
      </div>
      
      <div className="cat-instructions">
        <h2>Instructions</h2>
        <ul>
          <li>This test consists of multiple-choice questions and text questions.</li>
          <li>Answer all questions to the best of your ability.</li>
          <li>You can navigate between sections using the navigation buttons.</li>
          {testData.timeLimit && (
            <li>You have {testData.timeLimit} to complete this test.</li>
          )}
          <li>Your results will be calculated immediately for multiple-choice questions.</li>
          <li>Text responses will be evaluated separately by an interviewer.</li>
        </ul>
      </div>
      
      <button 
        className="cat-start-button" 
        onClick={startTest}
      >
        Start Test
      </button>
    </div>
  );
  
  // Render candidate details screen
  const renderCandidateDetails = () => (
    <div className="cat-details-container">
      <h2>Candidate Information</h2>
      
      <div className="cat-candidate-details">
        <div className="candidate-detail-item">
          <span>Name:</span>
          <span>{candidateData.candidateName}</span>
        </div>
        
        <div className="candidate-detail-item">
          <span>Username:</span>
          <span>{candidateData.username}</span>
        </div>
        
        <div className="candidate-detail-item">
          <span>Email:</span>
          <span>{candidateData.email}</span>
        </div>
        
        <div className="candidate-detail-item">
          <span>Job Title:</span>
          <span>{candidateData.jobTitle}</span>
        </div>
        
        <div className="candidate-detail-item">
          <span>Function:</span>
          <span>{candidateData.jobFunction}</span>
        </div>
      </div>
      
      <div className="cat-test-details">
        <h3>Test Information</h3>
        <div className="test-detail-item">
          <span>Test:</span>
          <span>{testData.title}</span>
        </div>
        
        <div className="test-detail-item">
          <span>Code:</span>
          <span>{testData.code}</span>
        </div>
        
        <div className="test-detail-item">
          <span>Tag:</span>
          <span>{testData.tag}</span>
        </div>
        
        {testData.timeLimit && (
          <div className="test-detail-item">
            <span>Time Limit:</span>
            <span>{testData.timeLimit}</span>
          </div>
        )}
        
        {testData.passingScore && (
          <div className="test-detail-item">
            <span>Passing Score:</span>
            <span>{testData.passingScore}%</span>
          </div>
        )}
      </div>
      
      <div className="cat-navigation-buttons">
        <button 
          className="cat-button secondary" 
          onClick={() => setCurrentStep('intro')}
        >
          Back
        </button>
        <button 
          className="cat-button primary" 
          onClick={() => setCurrentStep('mcq')}
        >
          Begin MCQ Section
        </button>
      </div>
    </div>
  );
  
  // Render MCQ questions
  const renderMCQQuestions = () => {
    const currentQuestions = getCurrentMCQQuestions();
    const currentIndices = getCurrentMCQIndices();
    const currentSkill = testData.mainSkills[currentSkillIndex];
    const currentSubSkill = currentSkill.subSkills[currentSubSkillIndex];
    
    return (
      <div className="cat-mcq-container">
        <div className="cat-section-header">
          <h2>Multiple Choice Questions</h2>
          <div className="cat-skill-info">
            <span>{currentSkill.name} &gt; {currentSubSkill.name}</span>
          </div>
          {timeLeft !== null && (
            <div className="cat-timer">
              Time Remaining: {formatTimeLeft()}
            </div>
          )}
        </div>
        
        <div className="cat-mcq-questions">
          {currentQuestions.length === 0 ? (
            <p>No questions available for this skill.</p>
          ) : (
            currentQuestions.map((question, qIndex) => {
              const responseIndex = currentIndices[qIndex];
              const response = mcqResponses[responseIndex];
              
              return (
                <div key={question._id} className="cat-question-card">
                  <div className="cat-question-text">
                    <h3>Question {qIndex + 1}</h3>
                    <p>{question.question}</p>
                    {question.maxCorrectAnswers > 1 && (
                      <p className="cat-selection-hint">
                        (Select up to {question.maxCorrectAnswers} options)
                      </p>
                    )}
                  </div>
                  
                  <div className="cat-options">
                    {question.options.map((option, oIndex) => (
                      <div 
                        key={oIndex} 
                        className={`cat-option ${response.selectedOptions.includes(option.text) ? 'selected' : ''}`}
                        onClick={() => handleOptionSelect(responseIndex, option.text)}
                      >
                        <div className="cat-option-marker">
                          {question.maxCorrectAnswers > 1 ? (
                            <div className="cat-checkbox">
                              {response.selectedOptions.includes(option.text) && <span>✓</span>}
                            </div>
                          ) : (
                            <div className="cat-radio">
                              {response.selectedOptions.includes(option.text) && <span>•</span>}
                            </div>
                          )}
                        </div>
                        <div className="cat-option-text">{option.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        <div className="cat-navigation-buttons">
          <button 
            className="cat-button secondary" 
            onClick={() => navigateSkill('prev')}
          >
            Previous
          </button>
          
          <div className="cat-progress">
            {`${currentSkillIndex + 1}/${testData.mainSkills.length} - ${currentSubSkillIndex + 1}/${testData.mainSkills[currentSkillIndex].subSkills.length}`}
          </div>
          
          <button 
            className="cat-button primary" 
            onClick={() => navigateSkill('next')}
          >
            {isLastSkill() ? 'Go to Text Questions' : 'Next'}
          </button>
        </div>
      </div>
    );
  };
  
  // Check if this is the last skill and subskill
  const isLastSkill = () => {
    return (
      currentSkillIndex === testData.mainSkills.length - 1 && 
      currentSubSkillIndex === testData.mainSkills[currentSkillIndex].subSkills.length - 1
    );
  };
  
  // Render text questions
  const renderTextQuestions = () => (
    <div className="cat-text-container">
      <div className="cat-section-header">
        <h2>Text Questions</h2>
        {timeLeft !== null && (
          <div className="cat-timer">
            Time Remaining: {formatTimeLeft()}
          </div>
        )}
      </div>
      
      <div className="cat-text-questions">
        {textResponses.length === 0 ? (
          <p>No text questions available for this test.</p>
        ) : (
          textResponses.map((response, index) => (
            <div key={response.questionId} className="cat-question-card">
              <div className="cat-question-text">
                <h3>Question {index + 1}</h3>
                <p>{response.question}</p>
                {response.subtitle && (
                  <p className="cat-question-subtitle">{response.subtitle}</p>
                )}
              </div>
              
              <div className="cat-text-input">
                {response.answerType === 'short' ? (
                  <input 
                    type="text" 
                    value={response.answer} 
                    onChange={(e) => handleTextInput(index, e.target.value)}
                    placeholder="Your answer..."
                    className="cat-short-answer"
                  />
                ) : (
                  <textarea 
                    value={response.answer} 
                    onChange={(e) => handleTextInput(index, e.target.value)}
                    placeholder="Your answer..."
                    className="cat-long-answer"
                    rows={6}
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="cat-navigation-buttons">
        <button 
          className="cat-button secondary" 
          onClick={() => {
            setCurrentSkillIndex(testData.mainSkills.length - 1);
            setCurrentSubSkillIndex(testData.mainSkills[testData.mainSkills.length - 1].subSkills.length - 1);
            setCurrentStep('mcq');
          }}
        >
          Back to MCQ
        </button>
        
        <button 
          className="cat-button primary" 
          onClick={() => setCurrentStep('review')}
        >
          Review Answers
        </button>
      </div>
    </div>
  );
  
  // Render review screen
  const renderReview = () => (
    <div className="cat-review-container">
      <div className="cat-section-header">
        <h2>Review Your Answers</h2>
        {timeLeft !== null && (
          <div className="cat-timer">
            Time Remaining: {formatTimeLeft()}
          </div>
        )}
      </div>
      
      <div className="cat-review-summary">
        <div className="cat-review-stats">
          <div className="cat-review-stat">
            <span>MCQ Questions Answered:</span>
            <span>{mcqResponses.filter(r => r.selectedOptions.length > 0).length}/{mcqResponses.length}</span>
          </div>
          
          <div className="cat-review-stat">
            <span>Text Questions Answered:</span>
            <span>{textResponses.filter(r => r.answer.trim().length > 0).length}/{textResponses.length}</span>
          </div>
        </div>
        
        <div className="cat-warning">
          <p>
            <strong>Important:</strong> Once you submit your test, you cannot return to change your answers.
            Please review all your answers before submitting.
          </p>
        </div>
      </div>
      
      <div className="cat-review-sections">
        <div className="cat-review-section">
          <h3>MCQ Questions</h3>
          <div className="cat-review-skills">
            {testData.mainSkills.map((skill, skillIndex) => (
              <div key={skillIndex} className="cat-review-skill">
                <h4>{skill.name}</h4>
                {skill.subSkills.map((subSkill, subSkillIndex) => (
                  <div key={subSkillIndex} className="cat-review-subskill">
                    <h5>{subSkill.name}</h5>
                    <div className="cat-review-questions">
                      {mcqResponses
                        .filter(r => r.skillName === skill.name && r.subSkillName === subSkill.name)
                        .map((resp, index) => (
                          <div key={index} className="cat-review-question-status">
                            <span>Q{index + 1}:</span>
                            <span className={resp.selectedOptions.length > 0 ? 'answered' : 'unanswered'}>
                              {resp.selectedOptions.length > 0 ? 'Answered' : 'Unanswered'}
                            </span>
                          </div>
                        ))
                      }
                    </div>
                    <button 
                      className="cat-review-goto-btn"
                      onClick={() => {
                        setCurrentSkillIndex(skillIndex);
                        setCurrentSubSkillIndex(subSkillIndex);
                        setCurrentStep('mcq');
                      }}
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {textResponses.length > 0 && (
          <div className="cat-review-section">
            <h3>Text Questions</h3>
            <div className="cat-review-text-questions">
              {textResponses.map((resp, index) => (
                <div key={index} className="cat-review-question-status">
                  <span>Q{index + 1}:</span>
                  <span className={resp.answer.trim().length > 0 ? 'answered' : 'unanswered'}>
                    {resp.answer.trim().length > 0 ? 'Answered' : 'Unanswered'}
                  </span>
                </div>
              ))}
            </div>
            <button 
              className="cat-review-goto-btn"
              onClick={() => setCurrentStep('text')}
            >
              Edit
            </button>
          </div>
        )}
      </div>
      
      <div className="cat-navigation-buttons">
        <button 
          className="cat-button secondary" 
          onClick={() => setCurrentStep('text')}
        >
          Back
        </button>
        
        <button 
          className="cat-button primary submit" 
          onClick={submitTest}
        >
          Submit Test
        </button>
      </div>
    </div>
  );
  
  // Render submitted screen
  const renderSubmitted = () => (
    <div className="cat-submitted-container">
      <div className="cat-submitted-header">
        <h2>Test Submitted Successfully</h2>
        <div className="cat-success-icon">✓</div>
      </div>
      
      <div className="cat-submitted-message">
        <p>Thank you for completing the test!</p>
        <p>Your MCQ responses have been processed automatically.</p>
        <p>Your text responses will be reviewed by an interviewer.</p>
      </div>
      
      <button 
        className="cat-button primary"
        onClick={() => navigate('/candidateLogin')}
      >
        Return to Dashboard
      </button>
    </div>
  );
  
  // Render loading screen
  const renderLoading = () => (
    <div className="cat-loading-container">
      <div className="cat-loading-spinner"></div>
      <p>Loading test data...</p>
    </div>
  );
  
  // Render submitting screen
  const renderSubmitting = () => (
    <div className="cat-loading-container">
      <div className="cat-loading-spinner"></div>
      <p>Submitting your test...</p>
    </div>
  );
  
  // Render error screen
  const renderError = () => (
    <div className="cat-error-container">
      <div className="cat-error-icon">!</div>
      <h2>Error</h2>
      <p>{error}</p>
      <button 
        className="cat-button primary"
        onClick={() => navigate('/candidateLogin')}
      >
        Return to Dashboard
      </button>
    </div>
  );
  
  // Main render function
  if (loading) return renderLoading();
  // if (error) return renderError();
  // if (!testData || !candidateData) return renderError();
  
  return (
    <div className="cat-test-container">
      {currentStep === 'intro' && renderIntro()}
      {currentStep === 'details' && renderCandidateDetails()}
      {currentStep === 'mcq' && renderMCQQuestions()}
      {currentStep === 'text' && renderTextQuestions()}
      {currentStep === 'review' && renderReview()}
      {currentStep === 'submitting' && renderSubmitting()}
      {currentStep === 'submitted' && renderSubmitted()}
    </div>
  );
};

export default TakeCATTest;
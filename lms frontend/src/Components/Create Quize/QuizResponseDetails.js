import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { base_url } from '../Utils/base_url';

const QuizResponseDetails = () => {
  const { responseId } = useParams();
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResponseDetails = async () => {
      try {
        const response = await axios.get(`${base_url}/quiz-response/${responseId}`);
        console.log("Response data:", response.data); // Debug log
        
        // Check if response.data exists and has required properties
        if (response.data && response.data.data) {
          setResponseData(response.data.data);
        } else {
          setError('Invalid response format from server');
          toast.error('Invalid response format from server');
        }
      } catch (error) {
        console.error('Error fetching response details:', error);
        setError(error.message);
        toast.error('Error fetching response details');
      } finally {
        setLoading(false);
      }
    };

    fetchResponseDetails();
  }, [responseId]);

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error || !responseData) {
    return <div className="error-container">Error: {error || 'No data available'}</div>;
  }

  // Safely check if answers array exists
  const hasAnswers = responseData.answers && Array.isArray(responseData.answers);

  return (
    <div className="quiz-response-container">
      <style>
        {`
        .quiz-response-container {
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
            font-family: Arial, sans-serif;
        }

        .response-card {
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 2rem;
            margin-bottom: 2rem;
        }

        .card-title {
            color: #2E073F;
            // font-size: 1.8rem;
            margin-bottom: 1.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #2E073F;
        }

        .info-section {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 2rem;
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
        }

        .info-item {
            margin-bottom: 1rem;
        }

        .info-label {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 0.3rem;
        }

        .info-value {
            color: #2E073F;
            font-weight: 600;
            font-size: 1.1rem;
        }

        .results-summary {
            background: #EDE7F6;
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 2rem;
        }

        .answer-section {
            margin-top: 2rem;
        }

        .answer-item {
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            border: 1px solid #e0e0e0;
            transition: all 0.3s ease;
        }

        .answer-item:hover {
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .answer-correct {
            background: #E8F5E9;
            border-color: #81C784;
        }

        .answer-incorrect {
            background: #FFEBEE;
            border-color: #E57373;
        }

        .answer-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }

        .question-number {
            font-weight: 600;
            font-size: 1.1rem;
            color: #2E073F;
        }

        .status-badge {
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 500;
        }

        .status-correct {
            background: #C8E6C9;
            color: #2E7D32;
        }

        .status-incorrect {
            background: #FFCDD2;
            color: #C62828;
        }

        .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 400px;
            font-size: 1.2rem;
            color: #2E073F;
        }

        .error-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 400px;
            color: #C62828;
            font-size: 1.2rem;
        }
        `}
      </style>

      <div className="response-card">
        <h4 className="card-title">Survey Response Details</h4>

        {/* Employee Information */}
        <div className="info-section">
          <h5 style={{ marginBottom: '1rem', color: '#2E073F' }}>Employee Information</h5>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Employee ID</div>
              <div className="info-value">{responseData.employee_id || 'N/A'}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Name</div>
              <div className="info-value">{responseData.employee_name || 'N/A'}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Job Title</div>
              <div className="info-value">{responseData.job_title || 'N/A'}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Survey Title</div>
              <div className="info-value">{responseData.quizTitle || 'N/A'}</div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <h5 style={{ marginBottom: '1rem', color: '#2E073F' }}>Survey Results</h5>
          <div className="info-grid">
            {/* <div className="info-item">
              <div className="info-label">Score</div>
              <div className="info-value">{responseData.score || 0}%</div>
            </div> */}
            <div className="info-item">
              <div className="info-label">Completion Time</div>
              <div className="info-value">
                {responseData.completionTime ? 
                  `${Math.floor(responseData.completionTime / 60)} minutes ${responseData.completionTime % 60} seconds` 
                  : 'N/A'}
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">Submitted At</div>
              <div className="info-value">
                {responseData.submittedAt ? 
                  new Date(responseData.submittedAt).toLocaleString() 
                  : 'N/A'}
              </div>
            </div>
          </div>
        </div>

        {/* Answers Section */}
        <div className="answer-section">
          <h5 style={{ marginBottom: '1.5rem', color: '#2E073F' }}>Question Responses</h5>
          {hasAnswers ? (
            responseData.answers.map((answer, index) => (
              <div 
                key={index}
                className={`answer-item ${answer.isCorrect ? 'answer-correct' : 'answer-incorrect'}`}
              >
                <div className="answer-header">
                  <span className="question-number">Question {answer.questionId || index + 1}</span>
                  {answer.isCorrect !== null && (
                    <span className={`status-badge ${answer.isCorrect ? 'status-correct' : 'status-incorrect'}`}>
                      {answer.isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  )}
                </div>
                <div>
                  <div className="info-label">Answer</div>
                  <div className="info-value" style={{ marginTop: '0.5rem' }}>
                    {answer.answer ? (
                      typeof answer.answer === 'object' ?
                        JSON.stringify(answer.answer) :
                        answer.answer
                    ) : 'No answer provided'}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-answers-message">
              No answers available for this quiz response.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizResponseDetails;


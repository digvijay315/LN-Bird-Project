const QuizResponse = require('../Modal/quize_response');
const Quiz = require("../Modal/create_quize");
const register_modal = require('../Modal/employee_register');  // Adjust the path as needed

  // Create a new quiz response
  const createResponse = async (req, res) => {
    try {
      const { quizId, quizTitle, employee_id, answers, completionTime } = req.body;
    
      // Format the answers to match the schema
      const formattedAnswers = answers.map(ans => ({
        questionId: ans.questionId,
        sectionId: ans.sectionId,
        answer: ans.answer,
        isCorrect: null // Will be updated if it's a scored question
      }));

      // Validate required fields and employee/CAT existence
      const [employee, quiz] = await Promise.all([
        register_modal.findOne({ employee_id }),
        Quiz.findById(quizId)
      ]);

      if (!employee || !quiz) {
        return res.status(404).json({
            success: false,
            message: !employee ? 'Employee not found' : 'Quiz not found'
        });
    }

            // Check for existing response
            const existingResponse = await QuizResponse.findOne({ quizId, employee_id });
            if (existingResponse) {
                return res.status(400).json({
                    success: false,
                    message: 'You have already submitted this Quiz'
                });
            }
  
      // Create the response
      const response = new QuizResponse({
        quizId,
        quizTitle,
        employee_id,
        employee_name: employee.employee_name,
        job_title: employee.job_title,
        answers: formattedAnswers,
        completionTime,
        status: 'completed'
      });
  
      try {
        // Calculate score for questions with correct answers
        let score = 0;
        const quiz = await Quiz.findById(quizId);
        
        if (quiz) {
          formattedAnswers.forEach(answer => {
            const section = quiz.sections.find(s => s.id === answer.sectionId);
            const question = section?.questions.find(q => q.id === answer.questionId);
            
            if (question?.type === 'multiple-choice') {
              const correctOption = question.options.find(opt => opt.correct);
              if (correctOption && answer.answer === correctOption.text) {
                score += 1;
                answer.isCorrect = true;
              } else {
                answer.isCorrect = false;
              }
            }
          });
  
          response.score = score;
        }
      } catch (err) {
        console.log('Error calculating score:', err);
        // Continue without scoring if there's an error
      }
  
      await response.save();
  
      res.status(201).json({
        message: 'Quiz response submitted successfully',
        response,
        status: 'completed'
      });
    } catch (error) {
      console.error('Error submitting quiz response:', error);
      res.status(500).json({
        message: 'Error submitting quiz response',
        error: error.message
      });
    }
  };

  // Controller for getting all quiz responses
  const getQuizResponses = async (req, res) => {
    try {
      const { quizId } = req.params;
      
      // If quizId is provided, fetch responses for that specific quiz
      // Otherwise fetch all responses
      const query = quizId ? { quizId } : {};
      
      const responses = await QuizResponse.find(query)
        .sort('-submittedAt'); // Sort by newest first

      // Check if responses exist
      if (!responses || responses.length === 0) {
        return res.status(200).json({
          success: true,
          message: 'No quiz responses found',
          data: []
        });
      }

      res.status(200).json({
        success: true,
        message: 'Quiz responses fetched successfully',
        data: responses
      });

    } catch (error) {
      console.error('Error in getQuizResponses:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching quiz responses',
        error: error.message
      });
    }
  };

  // Controller for getting a specific quiz response
  const getResponse = async (req, res) => {
    try {
      const { responseId } = req.params;
      
      const response = await QuizResponse.findById(responseId);

      if (!response) {
        return res.status(404).json({
          success: false,
          message: 'Response not found'
        });
      }

      // Return data in a consistent format
      res.status(200).json({
        success: true,
        message: 'Quiz response fetched successfully',
        data: response
      });

    } catch (error) {
      console.error('Error in getResponse:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching quiz response',
        error: error.message
      });
    }
  };

  // Updated getQuizStatus controller
  const getQuizStatus = async (req, res) => {
    try {
        const { quizId, employeeId } = req.params;

        if (!quizId || !employeeId) {
            return res.status(400).json({
                success: false,
                message: 'Quiz ID and Employee ID are required'
            });
        }

        // Check if there's a completed response for this quiz and employee
        const existingResponse = await QuizResponse.findOne({
            quizId: quizId,
            employee_id: employeeId,
            status: 'completed'
        });

        res.json({
            success: true,
            status: existingResponse ? 'completed' : 'pending'
        });

    } catch (error) {
        console.error('Error checking quiz status:', error);
        res.status(500).json({
            success: false,
            message: 'Error checking quiz status'
        });
    }
  };

module.exports = {createResponse, getQuizResponses, getResponse, getQuizStatus};
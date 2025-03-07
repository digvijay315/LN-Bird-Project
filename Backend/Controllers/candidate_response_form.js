const CandidateResponse = require('../Modal/candidate_response');
const CAT = require('../Modal/create_cat');
const Candidate = require('../Modal/candidate_register');
const mongoose = require('mongoose');

// Start a new test for a candidate
const startCandidateTest = async (req, res) => {
  try {
    const { candidateId, catId } = req.body;

    // Validate inputs
    if (!candidateId || !catId) {
      return res.status(400).json({
        success: false,
        message: 'Candidate ID and CAT ID are required'
      });
    }

    // Check if candidate exists
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }

    // Check if CAT exists
    const cat = await CAT.findById(catId);
    if (!cat) {
      return res.status(404).json({
        success: false,
        message: 'CAT not found'
      });
    }

    // Check if candidate has already started this test
    const existingResponse = await CandidateResponse.findOne({
      candidateId,
      catId,
      status: { $in: ['incomplete', 'submitted'] }
    });

    if (existingResponse) {
      return res.status(400).json({
        success: false,
        message: 'Candidate has already started or completed this test',
        responseId: existingResponse._id
      });
    }

    // Create a new candidate response record
    const newResponse = new CandidateResponse({
      candidateId,
      candidateName: candidate.candidateName,
      candidateUsername: candidate.username,
      catId,
      catTitle: cat.title,
      catCode: cat.code,
      catTag: cat.tag,
      timeLimit: cat.timeLimit,
      passingScore: cat.passingScore,
      startTime: new Date(),
      status: 'incomplete'
    });

    await newResponse.save();

    res.status(201).json({
      success: true,
      message: 'Test started successfully',
      data: {
        responseId: newResponse._id,
        startTime: newResponse.startTime,
        catInfo: {
          title: cat.title,
          code: cat.code,
          tag: cat.tag,
          timeLimit: cat.timeLimit,
          passingScore: cat.passingScore
        }
      }
    });
  } catch (error) {
    console.error('Error starting test:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};

// Submit candidate test answers
const submitCandidateTest = async (req, res) => {
  try {
    const { responseId } = req.params;
    const { mcqResponses, textResponses } = req.body;

    // Find the existing response
    const candidateResponse = await CandidateResponse.findById(responseId);
    if (!candidateResponse) {
      return res.status(404).json({
        success: false,
        message: 'Test response not found'
      });
    }

    if (candidateResponse.status === 'submitted') {
      return res.status(400).json({
        success: false,
        message: 'Test has already been submitted'
      });
    }

    // Mark end time and calculate duration
    candidateResponse.endTime = new Date();
    candidateResponse.duration = Math.round(
      (candidateResponse.endTime - candidateResponse.startTime) / 60000
    ); // Duration in minutes

    // Process MCQ responses
    if (mcqResponses && mcqResponses.length > 0) {
      candidateResponse.mcqResponses = mcqResponses.map(response => {
        // Calculate if the answer is correct
        const allCorrectSelected = response.correctOptions
          .filter(opt => opt.correct)
          .every(correctOpt => 
            response.selectedOptions.includes(correctOpt.text)
          );
        
        const noIncorrectSelected = response.selectedOptions
          .every(selected => 
            response.correctOptions.some(opt => 
              opt.text === selected && opt.correct
            )
          );
        
        const isCorrect = allCorrectSelected && noIncorrectSelected;
        
        // Assign points if correct
        const points = isCorrect ? response.maxPoints : 0;
        
        return {
          ...response,
          isCorrect,
          points
        };
      });
    }

    // Process text responses
    if (textResponses && textResponses.length > 0) {
      candidateResponse.textResponses = textResponses;
    }

    // Update status
    candidateResponse.status = 'submitted';

    // Save changes
    await candidateResponse.save();

    res.status(200).json({
      success: true,
      message: 'Test submitted successfully',
      data: {
        responseId: candidateResponse._id,
        mcqScore: candidateResponse.mcqScore,
        mcqPercentage: candidateResponse.mcqPercentage,
        testStatus: candidateResponse.status
      }
    });
  } catch (error) {
    console.error('Error submitting test:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};

// Review and score text responses
const reviewTextResponses = async (req, res) => {
  try {
    const { responseId } = req.params;
    const { textRatings, reviewerId } = req.body;

    if (!textRatings || !Array.isArray(textRatings)) {
      return res.status(400).json({
        success: false,
        message: 'Text ratings are required'
      });
    }

    // Find the response
    const candidateResponse = await CandidateResponse.findById(responseId);
    if (!candidateResponse) {
      return res.status(404).json({
        success: false,
        message: 'Test response not found'
      });
    }

    if (candidateResponse.status !== 'submitted') {
      return res.status(400).json({
        success: false,
        message: 'Test must be in submitted status to be reviewed'
      });
    }

    // Update text responses with ratings
    textRatings.forEach(rating => {
      const responseIndex = candidateResponse.textResponses.findIndex(
        r => r.questionId.toString() === rating.questionId
      );
      
      if (responseIndex !== -1) {
        candidateResponse.textResponses[responseIndex].points = rating.points;
        candidateResponse.textResponses[responseIndex].reviewerRating = rating.rating;
        candidateResponse.textResponses[responseIndex].reviewerComments = rating.comments;
      }
    });

    // Update review information
    candidateResponse.status = 'reviewed';
    candidateResponse.reviewedBy = reviewerId;
    candidateResponse.reviewedAt = new Date();

    // Save the updated response
    await candidateResponse.save();

    res.status(200).json({
      success: true,
      message: 'Test responses reviewed successfully',
      data: {
        mcqScore: candidateResponse.mcqScore,
        mcqPercentage: candidateResponse.mcqPercentage,
        textScore: candidateResponse.textScore,
        textPercentage: candidateResponse.textPercentage,
        totalScore: candidateResponse.totalScore,
        totalPercentage: candidateResponse.totalPercentage
      }
    });
  } catch (error) {
    console.error('Error reviewing test:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};

// Get candidate response by ID
const getCandidateResponseById = async (req, res) => {
  try {
    const response = await CandidateResponse.findById(req.params.id);
    
    if (!response) {
      return res.status(404).json({
        success: false,
        message: 'Test response not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: response
    });
  } catch (error) {
    console.error('Error fetching response:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};

// Get all responses for a specific candidate
const getCandidateResponses = async (req, res) => {
  try {
    const { candidateId } = req.params;
    
    const responses = await CandidateResponse.find({ candidateId })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: responses.length,
      data: responses
    });
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};

// Get all responses for a specific CAT
const getCATResponsesCandidate = async (req, res) => {
  try {
    const { catId } = req.params;
    
    const responses = await CandidateResponse.find({ catId })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: responses.length,
      data: responses
    });
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
};

module.exports = {
  startCandidateTest,
  submitCandidateTest,
  reviewTextResponses,
  getCandidateResponseById,
  getCandidateResponses,
  getCATResponsesCandidate
};
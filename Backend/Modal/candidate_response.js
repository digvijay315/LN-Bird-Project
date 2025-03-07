const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for storing MCQ responses
const mcqResponseSchema = new Schema({
  questionId: { type: Schema.Types.ObjectId, required: true },
  question: { type: String, required: true },
  selectedOptions: [{ type: String, required: true }],
  correctOptions: [{ 
    text: { type: String, required: true },
    correct: { type: Boolean, required: true }
  }],
  isCorrect: { type: Boolean, default: false },
  points: { type: Number, default: 0 },
  maxPoints: { type: Number, default: 1 },
  skillName: { type: String, required: true },
  subSkillName: { type: String, required: true },
});

// Schema for storing text question responses
const textResponseSchema = new Schema({
  questionId: { type: Schema.Types.ObjectId, required: true },
  question: { type: String, required: true },
  subtitle: { type: String },
  answerType: { type: String, enum: ['short', 'long'], default: 'short' },
  answer: { type: String, required: true },
  points: { type: Number, default: 0 },
  maxPoints: { type: Number, default: 5 },
  reviewerRating: { type: Number, default: 0 },
  reviewerComments: { type: String },
});

// Main schema for candidate test responses
const candidateResponseSchema = new Schema({
  candidateId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Candidate',
    required: true 
  },
  candidateName: { type: String, required: true },
  candidateUsername: { type: String, required: true },
  catId: { 
    type: Schema.Types.ObjectId, 
    ref: 'CAT',
    required: true 
  },
  catTitle: { type: String, required: true },
  catCode: { type: String, required: true },
  catTag: { type: String, required: true },
  timeLimit: { type: String },
  passingScore: { type: Number },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  duration: { type: Number }, // in minutes
  mcqResponses: [mcqResponseSchema],
  textResponses: [textResponseSchema],
  mcqScore: { type: Number, default: 0 },
  mcqMaxScore: { type: Number, default: 0 },
  mcqPercentage: { type: Number, default: 0 },
  textScore: { type: Number, default: 0 },
  textMaxScore: { type: Number, default: 0 },
  textPercentage: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 },
  totalPercentage: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['incomplete', 'submitted', 'reviewed'], 
    default: 'incomplete' 
  },
  reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  reviewedAt: { type: Date },
}, { timestamps: true });

// Calculate total score when saved
candidateResponseSchema.pre('save', function(next) {
  // Calculate MCQ score and percentage
  if (this.mcqResponses && this.mcqResponses.length > 0) {
    this.mcqScore = this.mcqResponses.reduce((total, resp) => total + resp.points, 0);
    this.mcqMaxScore = this.mcqResponses.reduce((total, resp) => total + resp.maxPoints, 0);
    this.mcqPercentage = this.mcqMaxScore > 0 ? (this.mcqScore / this.mcqMaxScore) * 100 : 0;
  }

  // Calculate text score and percentage
  if (this.textResponses && this.textResponses.length > 0) {
    this.textScore = this.textResponses.reduce((total, resp) => total + resp.points, 0);
    this.textMaxScore = this.textResponses.reduce((total, resp) => total + resp.maxPoints, 0);
    this.textPercentage = this.textMaxScore > 0 ? (this.textScore / this.textMaxScore) * 100 : 0;
  }

  // Calculate total score based on weightage
  // For now, we're assuming equal weightage as it's not specified in the requirements
  this.totalScore = this.mcqScore + this.textScore;
  const totalMaxScore = this.mcqMaxScore + this.textMaxScore;
  this.totalPercentage = totalMaxScore > 0 ? (this.totalScore / totalMaxScore) * 100 : 0;

  next();
});

const CandidateResponse = mongoose.model('CandidateResponse', candidateResponseSchema);
module.exports = CandidateResponse;
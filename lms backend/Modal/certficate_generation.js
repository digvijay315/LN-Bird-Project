// // Certificate model for storing certificate information
// const mongoose = require('mongoose');

// const CertificateSchema = new mongoose.Schema({
//   employee_id: {
//     type: String,
//     required: true
//   },
//   employee_name: {
//     type: String,
//     required: true
//   },
//   assessmentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Assessment',
//     required: true
//   },
//   trainingId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'add-event-info',
//     required: true
//   },
//   trainingName: {
//     type: String,
//     required: true
//   },
//   scorePercentage: {
//     type: Number,
//     required: true
//   },
//   issuedDate: {
//     type: Date,
//     default: Date.now
//   },
//   certificateUrl: {
//     type: String
//   }
// });

// const Certificate = mongoose.model('Certificate', CertificateSchema);

// module.exports = Certificate;



const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CertificateSchema = new Schema({
  // Employee details
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: 'employee-info',
    required: true
  },
  employee_id: { 
    type: String, 
    required: true 
  },
  employee_name: { 
    type: String, 
    required: true 
  },
  
  // Training details
  training_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'add-event-info', 
    required: true 
  },
  training_name: { 
    type: String, 
    required: true 
  },
  from_date: {
    type: Date, 
    required: true 
  },
  to_date: {
    type: Date, 
    required: true 
  },
  
  // Assessment details
  assessment_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'Assessment'
  },
  assessment_response_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'AssessmentResponseAtten'
  },
  score_percentage: {
    type: Number
  },
  
  // Certificate details
  certificate_type: {
    type: String,
    default: 'Training Completion'
  },
  description: {
    type: String,
    default: 'For successfully completing the training program and passing the assessment'
  },
  signer_name: {
    type: String,
    default: 'Training Manager'
  },
  signer_title: {
    type: String,
    default: 'Human Resources'
  },
  
  // Certificate styling
  text_color: {
    type: String,
    default: '#1a2d54'
  },
  accent_color: {
    type: String,
    default: '#d4a14d'
  },
  bg_color: {
    type: String,
    default: '#f9f7f0'
  },
  
  // Meta data
  generated_at: {
    type: Date,
    default: Date.now
  },
  certificate_url: {
    type: String
  }
});

const Certificate = mongoose.model('Certificate', CertificateSchema);
module.exports = Certificate;
const mongoose = require('mongoose');

const nominationSchema = new mongoose.Schema({
  employee_id: {
    type: String,
    required: true
  },
  training_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Training'
  },
  email_sent: {
    type: Boolean,
    default: false
  },
  email_sent_date: Date,
  attendance_confirmed: {
    type: Boolean,
    default: false
  },
  confirmation_date: Date,
  attendance_dates: [{
    date: Date,
    present: Boolean
  }],
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Nomination = mongoose.model('Nomination', nominationSchema);
module.exports = Nomination;
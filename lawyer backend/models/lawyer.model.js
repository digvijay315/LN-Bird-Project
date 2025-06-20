const mongoose = require('mongoose'); // ✅ Import mongoose first

const lawyerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, default: '' },
  barRegistrationNumber: { type: String, required: true },
  yearsOfExperience: { type: Number, default: 0 },
  password: { type: String, required: true },
  practiceAreas: { type: [String], default: [] },
  workingHours: { type: Object, default: {} },
  onlineStatus: { type: Boolean, default: false },
  status: {type: String,enum: ['pending', 'verified', 'rejected'],default: 'pending'},
  profilepic:{type:Array},





  isVerified: { type: Boolean, default: false },
  verificationHistory: [
    {
      adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
      action: { type: String, enum: ['approved', 'rejected'] },
      reason: String,
      timestamp: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Lawyer', lawyerSchema);

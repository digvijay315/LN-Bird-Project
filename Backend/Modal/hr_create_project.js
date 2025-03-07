const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  region: { type: String, required: true },
  category: { type: String, required: true },
  tenderDept: { 
    employeeId: { type: String, required: true },
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'employee-info' }
  },
  contractManager: {
    employeeId: { type: String, required: true },
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'employee-info' }
  },
  matrix: {
    headers: [String],
    subHeaders: [String],
    rows: [{
      function: String,
      values: [String]
    }]
  }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;

// const mongoose = require('mongoose');

// const projectSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   code: { type: String, required: true },
//   region: { type: String, required: true },
//   category: { type: String, required: true },
//   tenderDept: { type: String, required: true },
//   contractManager: String,
//   matrix: {
//     skillLevels: [String],  // For Basic, Level 1, Level 2, etc.
//     jobTitles: [String],    // For Service man, Technician II, etc.
//     functions: [String],     // For HVAC, ELEC, etc.
//     values: [{
//       function: String,
//       skillLevel: String,
//       value: Number
//     }]
//   }
// }, { timestamps: true });

// const Project = mongoose.model('Project', projectSchema);
// module.exports = Project;
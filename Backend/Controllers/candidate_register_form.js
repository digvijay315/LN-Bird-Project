// const Candidate = require('../Modal/candidate_register');
// const multer = require('multer');
// const path = require('path');

// // Set up multer for file upload
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, 'uploads/cv');
//   },
//   filename: function(req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({ 
//   storage: storage,
//   fileFilter: function(req, file, cb) {
//     const filetypes = /pdf|doc|docx/;
//     const mimetype = filetypes.test(file.mimetype);
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb(new Error('Error: CV files must be PDF, DOC, or DOCX'));
//   }
// }).single('cv');

// // Controller methods
// const registerCandidate = async (req, res) => {
//   try {
//     upload(req, res, async function(err) {
//       if (err) {
//         return res.status(400).json({ success: false, message: err.message });
//       }
      
//       if (!req.file) {
//         return res.status(400).json({ success: false, message: 'Please upload your CV' });
//       }
      
//       const candidateData = {
//         ...req.body,
//         cv: req.file.path
//       };
      
//       // Parse JSON strings if they come as strings
//       if (typeof candidateData.experiences === 'string') {
//         candidateData.experiences = JSON.parse(candidateData.experiences);
//       }
      
//       if (typeof candidateData.certificates === 'string') {
//         candidateData.certificates = JSON.parse(candidateData.certificates);
//       }
      
//       const candidate = new Candidate(candidateData);
//       await candidate.save();
      
//       res.status(201).json({
//         success: true,
//         data: candidate
//       });
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message
//     });
//   }
// };

const Candidate = require('../Modal/candidate_register');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = 'uploads/cv';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    // Create a safer filename
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const safeFilename = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
    cb(null, `${uniquePrefix}-${safeFilename}`);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function(req, file, cb) {
    const filetypes = /pdf|doc|docx/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Error: CV files must be PDF, DOC, or DOCX'));
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB file size limit
  }
}).single('cv');

// Controller methods
const registerCandidate = async (req, res) => {
  try {
    upload(req, res, async function(err) {
      if (err) {
        console.error('Upload error:', err);
        return res.status(400).json({ success: false, message: err.message });
      }
      
      if (!req.file) {
        return res.status(400).json({ success: false, message: 'Please upload your CV' });
      }
      
      try {
        console.log('Processing candidate data...');

        // Generate username from candidate name and random number
        const nameParts = req.body.candidateName.split(' ');
        const firstInitial = nameParts[0][0].toLowerCase();
        const lastName = nameParts[nameParts.length - 1].toLowerCase();
        const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
        const username = `${firstInitial}${lastName}${randomNum}`;
        
        // Generate a temporary login code (6 characters alphanumeric)
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Omitting similar looking chars
        let tempLoginCode = '';
        for (let i = 0; i < 6; i++) {
          tempLoginCode += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        // Set expiry to 7 days from now
        const tempCodeExpiry = new Date();
        tempCodeExpiry.setDate(tempCodeExpiry.getDate() + 7);
        
        // Format and validate the data
        let candidateData = {
          candidateName: req.body.candidateName,
          username: username,
          tempLoginCode: tempLoginCode,
          tempCodeExpiry: tempCodeExpiry,
          qualification: req.body.qualification,
          nationality: req.body.nationality,
          currentJobTitle: req.body.currentJobTitle || '',
          email: req.body.email,
          cv: req.file.path,
          // jobAppliedFor: req.body.jobAppliedFor,
          jobTitle: req.body.jobTitle,
          jobFunction: req.body.jobFunction,
          totalYearsOfExperience: parseFloat(req.body.totalYearsOfExperience) || 0
        };
        
        // Parse experiences if present
        if (req.body.experiences) {
          try {
            candidateData.experiences = JSON.parse(req.body.experiences);
            
            // Validate date formats in experiences
            candidateData.experiences = candidateData.experiences.map(exp => ({
              ...exp,
              fromDate: new Date(exp.fromDate),
              toDate: exp.toDate ? new Date(exp.toDate) : undefined,
              jobResponsibilities: exp.jobResponsibilities || 'Not provided'
            }));
          } catch (parseError) {
            console.error('Error parsing experiences:', parseError);
            candidateData.experiences = [];
          }
        } else {
          candidateData.experiences = [];
        }
        
        // Parse certificates if present
        if (req.body.certificates) {
          try {
            candidateData.certificates = JSON.parse(req.body.certificates);
            
            // Validate date formats in certificates
            candidateData.certificates = candidateData.certificates.map(cert => ({
              ...cert,
              issueDate: new Date(cert.issueDate),
              validTill: cert.validTill ? new Date(cert.validTill) : undefined
            }));
          } catch (parseError) {
            console.error('Error parsing certificates:', parseError);
            candidateData.certificates = [];
          }
        } else {
          candidateData.certificates = [];
        }
        
        console.log('Creating new candidate with auto-generated credentials...');
        const candidate = new Candidate(candidateData);
        
        // Check for duplicate email before saving
        const existingCandidate = await Candidate.findOne({ 
          $or: [
            { email: candidateData.email },
            { username: candidateData.username }
          ]
        });

        if (existingCandidate) {
          // Remove uploaded file to prevent clutter
          fs.unlinkSync(req.file.path);
          const message = existingCandidate.email === candidateData.email 
            ? 'A candidate with this email already exists'
            : 'Username already exists. Please try again.';
          return res.status(400).json({ success: false, message });
        }
        
        // Save the candidate
        await candidate.save();
        
        console.log('Candidate saved successfully with credentials');
        res.status(201).json({
          success: true,
          data: {
            _id: candidate._id,
            candidateName: candidate.candidateName,
            email: candidate.email,
            username: candidate.username,
            tempLoginCode: candidate.tempLoginCode,
            codeExpiry: candidate.tempCodeExpiry
          },
          message: 'Registration successful. Please note your username and temporary login code.'
        });
      } catch (innerError) {
        console.error('Data processing or save error:', innerError);
        
        // Remove uploaded file if there was an error
        if (req.file && req.file.path) {
          try {
            fs.unlinkSync(req.file.path);
          } catch (unlinkError) {
            console.error('Error removing file:', unlinkError);
          }
        }
        
        res.status(400).json({
          success: false,
          message: innerError.message
        });
      }
    });
  } catch (error) {
    console.error('Outer controller error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json({
      success: true,
      count: candidates.length,
      data: candidates
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const getCandidateByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    
    const candidate = await Candidate.findOne({ username });
    
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: candidate
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: candidate
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const updateCandidate = async (req, res) => {
  try {
    let candidate = await Candidate.findById(req.params.id);
    
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }
    
    // Handle file upload if included
    if (req.files && req.files.cv) {
      upload(req, res, async function(err) {
        if (err) {
          return res.status(400).json({ success: false, message: err.message });
        }
        
        req.body.cv = req.file.path;
        
        candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
        });
        
        res.status(200).json({
          success: true,
          data: candidate
        });
      });
    } else {
      // No new CV upload
      candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
      
      res.status(200).json({
        success: true,
        data: candidate
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    
    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: 'Candidate not found'
      });
    }
    
    await candidate.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {registerCandidate, getAllCandidates, getCandidateByUsername, getCandidateById, updateCandidate, deleteCandidate};
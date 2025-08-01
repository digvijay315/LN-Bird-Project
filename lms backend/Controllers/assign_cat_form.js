const AssignedCAT = require('../Modal/assigned_cat');
const CATResponse = require('../Modal/cat_response');
const mongoose = require('mongoose');

// Assign CAT to multiple employees
const assignCAT = async (req, res) => {
  try {
    const { catId, employeeIds } = req.body;

    if (!catId || !employeeIds || !Array.isArray(employeeIds)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input data'
      });
    }

    // Create assignments for each employee
    const assignments = employeeIds.map(employeeId => ({
      catId,
      employeeId
    }));

    // Check for existing assignments
    const existingAssignments = await AssignedCAT.find({
      catId,
      employeeId: { $in: employeeIds }
    });

    if (existingAssignments.length > 0) {
      const assignedEmployees = existingAssignments.map(a => a.employeeId.toString());
      // Filter out already assigned employees
      const newAssignments = assignments.filter(
        a => !assignedEmployees.includes(a.employeeId.toString())
      );
      
      if (newAssignments.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'All selected employees are already assigned this CAT'
        });
      }
      
      await AssignedCAT.insertMany(newAssignments);
    } else {
      await AssignedCAT.insertMany(assignments);
    }

    return res.status(200).json({
      success: true,
      message: 'CAT assigned successfully'
    });
  } catch (error) {
    console.error('Error assigning CAT:', error);
    return res.status(500).json({
      success: false,
      message: 'Error assigning CAT',
      error: error.message
    });
  }
};

// Get assigned CATs for an employee
// const getAssignedCATs = async (req, res) => {
//     try {
//         const { userId } = req.params;

//         // Validate userId
//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Invalid user ID format'
//             });
//         }

//         // Find all assignments for this employee
//         const assignments = await AssignedCAT.find({ 
//             employeeId: userId,
//             status: 'pending' // Only get pending assignments
//         }).populate({
//             path: 'catId',
//             select: 'title code timeLimit validTill' // Select only needed fields
//         });

//         console.log('Found assignments:', assignments);

//         // Get completed CATs
//         const completedResponses = await CATResponse.find({ 
//             userId,
//             status: 'completed'
//         });
        
//         const completedCATIds = new Set(
//             completedResponses.map(r => r.catId.toString())
//         );

//         // Filter out completed CATs and transform data
//         const availableCATs = assignments
//             .filter(assignment => {
//               return assignment.catId && // Check if assessment exists
//               !completedCATIds.has(assignment.catId._id.toString()) &&
//               (!assignment.catId.validTill || // Check if validTill exists
//               new Date(assignment.catId.validTill) > new Date());
//             })
//             .map(assignment => ({
//                 _id: assignment.catId._id,
//                 title: assignment.catId.title,
//                 code: assignment.catId.code,
//                 timeLimit: assignment.catId.timeLimit,
//                 assignedDate: assignment.assignedDate
//             }));

//         console.log('Available CATs:', availableCATs);

//         return res.status(200).json({
//             success: true,
//             data: availableCATs
//         });
//     } catch (error) {
//         console.error('Error fetching assigned CATs:', error);
//         return res.status(500).json({
//             success: false,
//             message: 'Error fetching assigned CATs',
//             error: error.message
//         });
//     }
// };

// Get assigned CATs for an employee
const getAssignedCATs = async (req, res) => {
  try {
      const { employeeId } = req.params; // Changed from userId to employeeId to match route

      // Validate employeeId
      if (!mongoose.Types.ObjectId.isValid(employeeId)) {
          return res.status(400).json({
              success: false,
              message: 'Invalid employee ID format'
          });
      }

      console.log('Fetching CATs for employee:', employeeId);

      // Find all assignments for this employee
      const assignments = await AssignedCAT.find({ 
          employeeId: employeeId,
          status: 'pending' // Only get pending assignments
      }).populate({
          path: 'catId',
          select: 'title code timeLimit validTill' // Select only needed fields
      });

      console.log('Found assignments:', assignments);

      // Get completed CATs
      const completedResponses = await CATResponse.find({ 
          userId: employeeId, // Changed from userId to employeeId for consistency
          status: 'completed'
      });
      
      const completedCATIds = new Set(
          completedResponses.map(r => r.catId.toString())
      );

      // Filter out completed CATs and transform data
      const availableCATs = assignments
          .filter(assignment => {
              // Check if catId exists and is populated
              if (!assignment.catId) {
                  console.log('Skipping assignment with no catId:', assignment._id);
                  return false;
              }
              
              // Debug logging
              console.log(`Processing assignment for CAT: ${assignment.catId._id}`);
              console.log(`Is completed? ${completedCATIds.has(assignment.catId._id.toString())}`);
              
              // Check if the CAT has a validTill date
              let isStillValid = true;
              if (assignment.catId.validTill) {
                  const validTillDate = new Date(assignment.catId.validTill);
                  const currentDate = new Date();
                  isStillValid = validTillDate >= currentDate;
                  console.log(`ValidTill date: ${validTillDate}, Current date: ${currentDate}`);
              }
              console.log(`Is still valid? ${isStillValid}`);

              // For testing purposes - let's include it regardless of validity date
              // Comment this out in production when you want to enforce validity dates
              // return !completedCATIds.has(assignment.catId._id.toString());
              
              // Production code - enforce validity date
              return !completedCATIds.has(assignment.catId._id.toString()) && isStillValid;
          })
          .map(assignment => ({
              _id: assignment.catId._id,
              title: assignment.catId.title,
              code: assignment.catId.code,
              timeLimit: assignment.catId.timeLimit,
              assignedDate: assignment.assignedDate
          }));

      console.log('Available CATs:', availableCATs);

      return res.status(200).json({
          success: true,
          data: availableCATs
      });
  } catch (error) {
      console.error('Error fetching assigned CATs:', error);
      return res.status(500).json({
          success: false,
          message: 'Error fetching assigned CATs',
          error: error.message
      });
  }
};


// Alternative version that ignores the validity date check
// Use this temporarily if you need to test with expired CATs

const getAssignedCATsIgnoreValidity = async (req, res) => {
  try {
      const { employeeId } = req.params;

      // Validate employeeId
      if (!mongoose.Types.ObjectId.isValid(employeeId)) {
          return res.status(400).json({
              success: false,
              message: 'Invalid employee ID format'
          });
      }

      console.log('Fetching CATs for employee:', employeeId);

      // Find all assignments for this employee
      const assignments = await AssignedCAT.find({ 
          employeeId: employeeId,
          status: 'pending' // Only get pending assignments
      }).populate({
          path: 'catId',
          select: 'title code timeLimit validTill' // Select only needed fields
      });

      console.log('Found assignments:', assignments);

      // Get completed CATs
      const completedResponses = await CATResponse.find({ 
          userId: employeeId,
          status: 'completed'
      });
      
      const completedCATIds = new Set(
          completedResponses.map(r => r.catId.toString())
      );

      // Filter out only completed CATs, ignore validity date for testing
      const availableCATs = assignments
          .filter(assignment => {
              // Check if catId exists and is populated
              if (!assignment.catId) {
                  console.log('Skipping assignment with no catId:', assignment._id);
                  return false;
              }
              
              // Debug logging
              console.log(`Processing assignment for CAT: ${assignment.catId._id}`);
              console.log(`Is completed? ${completedCATIds.has(assignment.catId._id.toString())}`);
              
              // IMPORTANT: We're ignoring the validity date check here
              // Only check if the CAT has been completed
              return !completedCATIds.has(assignment.catId._id.toString());
          })
          .map(assignment => ({
              _id: assignment.catId._id,
              title: assignment.catId.title,
              code: assignment.catId.code,
              timeLimit: assignment.catId.timeLimit,
              assignedDate: assignment.assignedDate
          }));

      console.log('Available CATs:', availableCATs);

      return res.status(200).json({
          success: true,
          data: availableCATs
      });
  } catch (error) {
      console.error('Error fetching assigned CATs:', error);
      return res.status(500).json({
          success: false,
          message: 'Error fetching assigned CATs',
          error: error.message
      });
  }
};

module.exports = {
  assignCAT,
  getAssignedCATs,
  getAssignedCATsIgnoreValidity
};
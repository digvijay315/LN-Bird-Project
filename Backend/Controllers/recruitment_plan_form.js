const RecruitmentPlan = require('../Modal/recruitment_plan');

const saveRecruitmentPlan = async (req, res) => {
    try {
      const { interviewers, companies, matrix } = req.body;
      
      // Basic validation
      if (!interviewers || !companies || !matrix || 
          !interviewers.length || !companies.length || !matrix.length) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
      }
  
      // Create new recruitment plan
      const recruitmentPlan = new RecruitmentPlan({
        interviewers,
        companies,
        matrix,
        createdBy: req.user ? req.user.employee_id : 'system'
      });
  
      const savedPlan = await recruitmentPlan.save();
  
      res.status(201).json({
        success: true,
        message: 'Recruitment plan saved successfully',
        data: savedPlan
      });
    } catch (error) {
      console.error('Error saving recruitment plan:', error);
      res.status(500).json({
        success: false,
        message: 'Error saving recruitment plan',
        error: error.message
      });
    }
  };

  const getAllRecruitmentPlans = async (req, res) => {
    try {
      const recruitmentPlans = await RecruitmentPlan.find()
        .sort({ createdAt: -1 });
  
      res.status(200).json({
        success: true,
        count: recruitmentPlans.length,
        data: recruitmentPlans
      });
    } catch (error) {
      console.error('Error fetching recruitment plans:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching recruitment plans',
        error: error.message
      });
    }
  };

  const getRecruitmentPlanById = async (req, res) => {
    try {
      const recruitmentPlan = await RecruitmentPlan.findById(req.params.id);
      
      if (!recruitmentPlan) {
        return res.status(404).json({
          success: false,
          message: 'Recruitment plan not found'
        });
      }
  
      res.status(200).json({
        success: true,
        data: recruitmentPlan
      });
    } catch (error) {
      console.error('Error fetching recruitment plan:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching recruitment plan',
        error: error.message
      });
    }
  };
  
  const updateRecruitmentPlan = async (req, res) => {
    try {
      const { interviewers, companies, matrix } = req.body;
      
      // Basic validation
      if (!interviewers || !companies || !matrix || 
          !interviewers.length || !companies.length || !matrix.length) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
      }
  
      const updatedPlan = await RecruitmentPlan.findByIdAndUpdate(
        req.params.id,
        {
          interviewers,
          companies,
          matrix,
          updatedAt: Date.now()
        },
        { new: true, runValidators: true }
      );
      
      if (!updatedPlan) {
        return res.status(404).json({
          success: false,
          message: 'Recruitment plan not found'
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Recruitment plan updated successfully',
        data: updatedPlan
      });
    } catch (error) {
      console.error('Error updating recruitment plan:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating recruitment plan',
        error: error.message
      });
    }
  };

  const deleteRecruitmentPlan = async (req, res) => {
    try {
      const recruitmentPlan = await RecruitmentPlan.findByIdAndDelete(req.params.id);
      
      if (!recruitmentPlan) {
        return res.status(404).json({
          success: false,
          message: 'Recruitment plan not found'
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Recruitment plan deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting recruitment plan:', error);
      res.status(500).json({
        success: false,
        message: 'Error deleting recruitment plan',
        error: error.message
      });
    }
  };

  module.exports = { saveRecruitmentPlan, getAllRecruitmentPlans, getRecruitmentPlanById, updateRecruitmentPlan, deleteRecruitmentPlan };
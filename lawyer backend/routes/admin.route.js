const express = require('express');
const router = express.Router();

const {
  getPendingLawyers,
  getLawyerById,
  verifyLawyer
} = require('../controllers/adminLawyerController');

const { getAdminDashboard } = require('../controllers/adminController');

// Admin dashboard route
router.get('/dashboard', getAdminDashboard);

// Lawyer-related admin routes
router.get('/lawyers/pending', getPendingLawyers);
router.get('/lawyers/:id', getLawyerById);
router.post('/lawyers/:id/verify', verifyLawyer);

module.exports = router;

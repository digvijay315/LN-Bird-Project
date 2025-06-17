const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  resetPassword,
  sendResetEmail,
  setNewPassword,
  getUserDetails,
} = require('../controllers/user.controller');

// Register a new user
router.post('/', registerUser);

// Login
router.post('/login', loginUser);

// Forgot password: send email
router.post('/forgot-password', sendResetEmail);

// Set new password after reset link
router.post('/set-new-password', setNewPassword);

// Reset password (authenticated user) 
router.put('/password', resetPassword);

// Get user details by ID
router.get('/:id', getUserDetails);

module.exports = router;

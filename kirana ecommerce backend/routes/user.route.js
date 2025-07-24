const express = require('express');
const { registerUser, loginUser, resetPassword,sendResetEmail,setNewPassword } = require('../controllers/user.controller'); // replaced updatePassword with resetPassword
const router = express.Router();

// Register route
router.post('/registration', registerUser);

// Reset password route (forget password)
router.put('/password', resetPassword);

// Login route
router.post('/login', loginUser);




router.post('/forgot-password', sendResetEmail); // 👈 Add this route
router.post('/set-new-password', setNewPassword); // ✅ Add this route

module.exports = router;
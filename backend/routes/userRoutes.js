const express = require('express');
const signUp = require('../controllers/userControllers/signUp');
const login = require('../controllers/userControllers/login');
const updateProfile = require('../controllers/userControllers/updateProfile');
const changePassword = require('../controllers/userControllers/changePassword');
const userLogout = require('../controllers/userControllers/userLogout');
const sendVerificationEmail = require('../controllers/userControllers/sendVerificationEmail'); // Updated
const verifyEmailToken = require('../controllers/userControllers/verifyEmailToken'); // Updated
const forgotPassword = require('../controllers/userControllers/forgotPassword');
const resetPassword = require('../controllers/userControllers/resetPassword');
const authMiddleware = require('../middleware/authMiddleware');
const controllerWrapper = require('../utils/controllerWrapper');

const router = express.Router();

// Routes
router.post('/signup', controllerWrapper(signUp));
router.post('/login', controllerWrapper(login));
router.put('/profile', authMiddleware, controllerWrapper(updateProfile));
router.put('/password', authMiddleware, controllerWrapper(changePassword));
router.get('/verify-email/:token', controllerWrapper(verifyEmailToken)); // Handles token verification
router.post('/resend-verification', authMiddleware, controllerWrapper(sendVerificationEmail)); // Sends verification email
router.post('/forgot-password', controllerWrapper(forgotPassword));
router.post('/reset-password', controllerWrapper(resetPassword));
router.post('/logout', authMiddleware, controllerWrapper(userLogout));

module.exports = router;

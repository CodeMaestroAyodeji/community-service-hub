const express = require('express');
const signUp = require('../controllers/userControllers/signUp');
const login = require('../controllers/userControllers/login');
const updateProfile = require('../controllers/userControllers/updateProfile');
const changePassword = require('../controllers/userControllers/changePassword');
const userLogout = require('../controllers/userControllers/userLogout');
const userEmailVerification = require('../controllers/userControllers/userEmailVerification');
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
router.post('/reset-password', controllerWrapper(resetPassword));
router.post('/forgot-password', controllerWrapper(forgotPassword));
router.post('/verify-email', controllerWrapper(userEmailVerification));
router.post('/logout', authMiddleware, controllerWrapper(userLogout));

module.exports = router;

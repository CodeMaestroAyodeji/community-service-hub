const express = require('express');
const signUp = require('../controllers/userControllers/signUp');
const login = require('../controllers/userControllers/login');
const updateProfile = require('../controllers/userControllers/updateProfile');
const changePassword = require('../controllers/userControllers/changePassword');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.put('/profile', authMiddleware, updateProfile);
router.put('/password', authMiddleware, changePassword);

module.exports = router;

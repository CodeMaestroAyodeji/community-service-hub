const express = require('express');
const signUp = require('../controllers/userControllers/signUp');
// const login = require('../controllers/userControllers/login');

const router = express.Router();

router.post('/signup', signUp);
// router.post('/login', login);

module.exports = router;

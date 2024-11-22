const express = require('express');
const postOpportunity = require('../controllers/opportunityControllers/postOpportunity');

const router = express.Router();

router.post('/post', postOpportunity);

module.exports = router;

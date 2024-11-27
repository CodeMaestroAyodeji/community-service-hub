const express = require('express');
const { getMetrics } = require('../controllers/metricsControllers/metricsController');
const router = express.Router();

// Route to get application metrics
router.get('/', getMetrics);

module.exports = router;

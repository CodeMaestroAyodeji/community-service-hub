const express = require('express');
const getNotifications = require('../controllers/notificationControllers/getNotifications');
const markAsRead = require('../controllers/notificationControllers/markAsRead');
const controllerWrapper = require('../utils/controllerWrapper');

const router = express.Router();

// Routes
router.get('/:organization_id', controllerWrapper(getNotifications));
router.put('/:notification_id', controllerWrapper(markAsRead));

module.exports = router;

const express = require('express');
const getNotifications = require('../controllers/notificationControllers/getNotifications');
const markAsRead = require('../controllers/notificationControllers/markAsRead');

const router = express.Router();


router.get('/:organization_id', getNotifications);
router.put('/:notification_id', markAsRead);

module.exports = router;

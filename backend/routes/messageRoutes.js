const express = require('express');
const postMessage = require('../controllers/messageControllers/postMessage');
const editMessage = require('../controllers/messageControllers/editMessage');
const deleteMessage = require('../controllers/messageControllers/deleteMessage');
const searchMessage = require('../controllers/messageControllers/searchMessage');
const viewMessage = require('../controllers/messageControllers/viewMessage');
const listMessages = require('../controllers/messageControllers/listMessages');
const roleMiddleware = require('../middleware/roleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const controllerWrapper = require('../utils/controllerWrapper');

const router = express.Router();

// Routes
router.post('/send', authMiddleware, roleMiddleware(['volunteer']), controllerWrapper(postMessage));
router.put('/:message_id', authMiddleware, controllerWrapper(editMessage));
router.delete('/:message_id', authMiddleware, controllerWrapper(deleteMessage));
router.get('/search', controllerWrapper(searchMessage));
router.get('/:message_id', controllerWrapper(viewMessage));
router.get('/', controllerWrapper(listMessages));

module.exports = router;

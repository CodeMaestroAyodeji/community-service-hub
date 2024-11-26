const express = require('express');
const postMessage = require('../controllers/messageControllers/postMessage');
const editMessage = require('../controllers/messageControllers/editMessage');
const deleteMessage = require('../controllers/messageControllers/deleteMessage');
const searchMessage = require('../controllers/messageControllers/searchMessage');
const viewMessage = require('../controllers/messageControllers/viewMessage');
const listMessages = require('../controllers/messageControllers/listMessages');

const roleMiddleware = require('../middleware/roleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/send', authMiddleware, roleMiddleware(['volunteer']), postMessage);
router.put('/:message_id', editMessage);
router.delete('/:message_id', deleteMessage);
router.get('/search', searchMessage);
router.get('/:message_id', viewMessage);
router.get('/', listMessages);



module.exports = router;

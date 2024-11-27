const express = require('express');
const postOpportunity = require('../controllers/opportunityControllers/postOpportunity');
const editOpportunity = require('../controllers/opportunityControllers/editOpportunity');
const deleteOpportunity = require('../controllers/opportunityControllers/deleteOpportunity');
const viewOpportunity = require('../controllers/opportunityControllers/viewOpportunity');
const listOpportunities = require('../controllers/opportunityControllers/listOpportunities');
const searchOpportunity = require('../controllers/opportunityControllers/searchOpportunity');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const controllerWrapper = require('../utils/controllerWrapper');

const router = express.Router();

// Routes
router.post('/post', authMiddleware, roleMiddleware(['organization']), controllerWrapper(postOpportunity));
router.put('/:opportunity_id', authMiddleware, roleMiddleware(['organization']), controllerWrapper(editOpportunity));
router.delete('/:opportunity_id', authMiddleware, roleMiddleware(['organization']), controllerWrapper(deleteOpportunity));
router.get('/:opportunity_id', controllerWrapper(viewOpportunity));
router.get('/', controllerWrapper(listOpportunities));
router.get('/search', controllerWrapper(searchOpportunity));

module.exports = router;

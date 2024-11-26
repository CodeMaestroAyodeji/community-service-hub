const express = require('express');
const postOpportunity = require('../controllers/opportunityControllers/postOpportunity');
const editOpportunity = require('../controllers/opportunityControllers/editOpportunity');
const deleteOpportunity = require('../controllers/opportunityControllers/deleteOpportunity');
const viewOpportunity = require('../controllers/opportunityControllers/viewOpportunity');
const listOpportunities = require('../controllers/opportunityControllers/listOpportunities');
const searchOpportunity = require('../controllers/opportunityControllers/searchOpportunity');

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post('/post', authMiddleware, roleMiddleware(['organization']), postOpportunity);
router.put('/:opportunity_id', roleMiddleware(['organization']), editOpportunity);
router.delete('/:opportunity_id', roleMiddleware(['organization']), deleteOpportunity); 
router.get('/:opportunity_id', viewOpportunity);
router.get('/', listOpportunities);
router.get('/search', searchOpportunity);


module.exports = router;

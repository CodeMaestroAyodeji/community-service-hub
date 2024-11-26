const express = require('express');
const postOpportunity = require('../controllers/opportunityControllers/postOpportunity');
const editOpportunity = require('../controllers/opportunityControllers/editOpportunity');
const deleteOpportunity = require('../controllers/opportunityControllers/deleteOpportunity');
const viewOpportunity = require('../controllers/opportunityControllers/viewOpportunity');
const listOpportunities = require('../controllers/opportunityControllers/listOpportunities');
const searchOpportunity = require('../controllers/opportunityControllers/searchOpportunity');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/post', authMiddleware, postOpportunity);
router.put('/:opportunity_id', editOpportunity);
router.delete('/:opportunity_id', deleteOpportunity);
router.get('/:opportunity_id', viewOpportunity);
router.get('/', listOpportunities);
router.get('/search', searchOpportunity);


module.exports = router;

const db = require('../../config/db');
const logger = require('../../utils/logger');
const CustomError = require('../../utils/customError');

const viewOpportunity = async (req, res, next) => {
    const { opportunity_id } = req.params;

    try {
        logger('info', 'Fetching opportunity', { opportunityId: opportunity_id });

        const [opportunity] = await db.query('SELECT * FROM opportunities WHERE id = ?', [opportunity_id]);

        if (opportunity.length === 0) {
            throw new CustomError('Opportunity not found.', 404);
        }

        logger('info', 'Opportunity fetched successfully', { opportunityId: opportunity_id });
        res.status(200).json(opportunity[0]);
    } catch (err) {
        logger('error', 'Error fetching opportunity', { error: err.message, opportunityId: opportunity_id });
        next(err);
    }
};

module.exports = viewOpportunity;

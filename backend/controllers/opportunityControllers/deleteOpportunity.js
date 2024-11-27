const db = require('../../config/db');
const logger = require('../../utils/logger');
const CustomError = require('../../utils/customError');

const deleteOpportunity = async (req, res, next) => {
    const { opportunity_id } = req.params;

    try {
        logger('info', 'Deleting opportunity', { opportunityId: opportunity_id });

        const [existingOpportunity] = await db.query('SELECT id FROM opportunities WHERE id = ?', [opportunity_id]);

        if (existingOpportunity.length === 0) {
            throw new CustomError('Opportunity not found.', 404);
        }

        await db.query('DELETE FROM messages WHERE opportunity_id = ?', [opportunity_id]);
        await db.query('DELETE FROM opportunities WHERE id = ?', [opportunity_id]);

        logger('info', 'Opportunity and related messages deleted successfully', { opportunityId: opportunity_id });
        res.status(200).json({ message: 'Opportunity and related messages deleted successfully.' });
    } catch (err) {
        logger('error', 'Error deleting opportunity', { error: err.message, opportunityId: opportunity_id });
        next(err);
    }
};

module.exports = deleteOpportunity;

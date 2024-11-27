const db = require('../../config/db');
const logger = require('../../utils/logger');
const CustomError = require('../../utils/customError');

const editOpportunity = async (req, res, next) => {
    const { opportunity_id } = req.params;
    const { title, description, location, date, contact_info } = req.body;

    try {
        logger('info', 'Editing opportunity', { opportunityId: opportunity_id });

        const [existingOpportunity] = await db.query('SELECT id FROM opportunities WHERE id = ?', [opportunity_id]);

        if (existingOpportunity.length === 0) {
            throw new CustomError('Opportunity not found.', 404);
        }

        await db.query(
            'UPDATE opportunities SET title = ?, description = ?, location = ?, date = ?, contact_info = ? WHERE id = ?',
            [title, description, location, date, contact_info, opportunity_id]
        );

        logger('info', 'Opportunity updated successfully', { opportunityId: opportunity_id });
        res.status(200).json({ message: 'Opportunity updated successfully.' });
    } catch (err) {
        logger('error', 'Error editing opportunity', { error: err.message, opportunityId: opportunity_id });
        next(err);
    }
};

module.exports = editOpportunity;

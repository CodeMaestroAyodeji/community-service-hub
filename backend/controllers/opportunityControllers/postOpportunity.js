const db = require('../../config/db');
const logger = require('../../utils/logger');
const CustomError = require('../../utils/customError');

const postOpportunity = async (req, res, next) => {
    const { title, description, location, date, contact_info, organization_id } = req.body;

    try {
        logger('info', 'Posting new opportunity', { organizationId: organization_id });

        const [result] = await db.query(
            'INSERT INTO opportunities (title, description, location, date, contact_info, organization_id) VALUES (?, ?, ?, ?, ?, ?)',
            [title, description, location, date, contact_info, organization_id]
        );

        logger('info', 'Opportunity posted successfully', { opportunityId: result.insertId });
        res.status(201).json({ message: 'Opportunity created successfully.', opportunity_id: result.insertId });
    } catch (err) {
        logger('error', 'Error posting opportunity', { error: err.message, organizationId: organization_id });
        next(err);
    }
};

module.exports = postOpportunity;

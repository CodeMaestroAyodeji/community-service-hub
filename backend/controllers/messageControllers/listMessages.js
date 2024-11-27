const db = require('../../config/db');
const logger = require('../../utils/logger');
const CustomError = require('../../utils/customError');

const listMessages = async (req, res, next) => {
    const { page = 1, limit = 10, volunteer_id, opportunity_id } = req.query;
    const offset = (page - 1) * limit;

    try {
        logger('info', 'Listing messages', { page, limit, volunteerId: volunteer_id, opportunityId: opportunity_id });

        let query = 'SELECT * FROM messages';
        const params = [];

        if (volunteer_id) {
            query += ' WHERE volunteer_id = ?';
            params.push(volunteer_id);
        }
        if (opportunity_id) {
            query += volunteer_id ? ' AND opportunity_id = ?' : ' WHERE opportunity_id = ?';
            params.push(opportunity_id);
        }

        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));

        const [messages] = await db.query(query, params);

        const [countResult] = await db.query(
            'SELECT COUNT(*) as total FROM messages ' + query.split('WHERE')[1],
            params.slice(0, params.length - 2)
        );

        const total = countResult[0].total;

        if (offset >= total) {
            throw new CustomError('Requested page exceeds available data.', 404);
        }

        logger('info', 'Messages listed successfully', { page, limit, total });
        res.status(200).json({ total, page: parseInt(page), limit: parseInt(limit), messages });
    } catch (err) {
        logger('error', 'Error listing messages', { error: err.message });
        next(err);
    }
};

module.exports = listMessages;

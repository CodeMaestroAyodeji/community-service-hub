const db = require('../../config/db');
const logger = require('../../utils/logger');

const listOpportunities = async (req, res, next) => {
    const { page = 1, limit = 10, start_date, end_date } = req.query;
    const offset = (page - 1) * limit;

    try {
        logger('info', 'Listing opportunities', { page, limit, start_date, end_date });

        let query = 'SELECT * FROM opportunities';
        const params = [];

        if (start_date || end_date) {
            query += ' WHERE';
            if (start_date) {
                query += ' date >= ?';
                params.push(start_date);
            }
            if (end_date) {
                query += start_date ? ' AND date <= ?' : ' date <= ?';
                params.push(end_date);
            }
        }

        query += ' ORDER BY date ASC LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));

        const [opportunities] = await db.query(query, params);
        const [countResult] = await db.query('SELECT COUNT(*) as total FROM opportunities', params);

        logger('info', 'Opportunities listed successfully', { total: countResult[0].total });
        res.status(200).json({
            total: countResult[0].total,
            page: parseInt(page),
            limit: parseInt(limit),
            opportunities,
        });
    } catch (err) {
        logger('error', 'Error listing opportunities', { error: err.message });
        next(err);
    }
};

module.exports = listOpportunities;

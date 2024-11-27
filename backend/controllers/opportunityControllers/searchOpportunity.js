const db = require('../../config/db');
const logger = require('../../utils/logger');

const searchOpportunity = async (req, res, next) => {
    const { keyword } = req.query;

    try {
        logger('info', 'Searching opportunities', { keyword });

        const [opportunities] = await db.query(
            'SELECT * FROM opportunities WHERE title LIKE ? OR description LIKE ?',
            [`%${keyword}%`, `%${keyword}%`]
        );

        if (opportunities.length === 0) {
            throw new CustomError('No opportunities found.', 404);
        }

        logger('info', 'Opportunities fetched successfully', { keyword });
        res.status(200).json(opportunities);
    } catch (err) {
        logger('error', 'Error searching opportunities', { error: err.message, keyword });
        next(err);
    }
};

module.exports = searchOpportunity;

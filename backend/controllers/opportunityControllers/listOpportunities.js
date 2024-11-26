const db = require('../../config/db');

const listOpportunities = async (req, res) => {
    const { page = 1, limit = 10, start_date, end_date } = req.query; // Include date filters
    const offset = (page - 1) * limit;

    try {
        let query = 'SELECT * FROM opportunities';
        const params = [];

        // Add date filtering logic
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

        // Get total number of opportunities for pagination metadata
        let countQuery = 'SELECT COUNT(*) as total FROM opportunities';
        const countParams = [];

        if (start_date || end_date) {
            countQuery += ' WHERE';
            if (start_date) {
                countQuery += ' date >= ?';
                countParams.push(start_date);
            }
            if (end_date) {
                countQuery += start_date ? ' AND date <= ?' : ' date <= ?';
                countParams.push(end_date);
            }
        }

        const [countResult] = await db.query(countQuery, countParams);
        const total = countResult[0].total;

        res.status(200).json({
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            opportunities,
        });
    } catch (err) {
        console.error('Error listing opportunities:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = listOpportunities;

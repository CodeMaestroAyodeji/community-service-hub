const db = require('../../config/db');

const listMessages = async (req, res) => {
    const { page = 1, limit = 10, volunteer_id, opportunity_id } = req.query;
    const offset = (page - 1) * limit;

    try {
        let query = 'SELECT * FROM messages';
        const params = [];

        // Add filters for volunteer_id and opportunity_id if provided
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

        // Get total number of messages for pagination metadata
        let countQuery = 'SELECT COUNT(*) as total FROM messages';
        const countParams = [];

        if (volunteer_id) {
            countQuery += ' WHERE volunteer_id = ?';
            countParams.push(volunteer_id);
        }
        if (opportunity_id) {
            countQuery += volunteer_id ? ' AND opportunity_id = ?' : ' WHERE opportunity_id = ?';
            countParams.push(opportunity_id);
        }

        const [countResult] = await db.query(countQuery, countParams);
        const total = countResult[0].total;

        // Validate the requested page
        if (offset >= total) {
            return res.status(404).json({
                error: 'Requested page exceeds available data.',
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                messages: [],
            });
        }

        res.status(200).json({
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            messages,
        });
    } catch (err) {
        console.error('Error listing messages:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = listMessages;

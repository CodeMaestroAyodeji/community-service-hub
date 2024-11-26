const db = require('../../config/db');

const listMessages = async (req, res) => {
    const { volunteer_id, opportunity_id } = req.query;

    try {
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

        const [messages] = await db.query(query, params);
        res.status(200).json(messages);
    } catch (err) {
        console.error('Error listing messages:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = listMessages;

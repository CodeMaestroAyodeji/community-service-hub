const db = require('../../config/db');

const postMessage = async (req, res) => {
    const { volunteer_id, opportunity_id, message } = req.body;

    try {
        // Validate volunteer_id
        const [volunteer] = await db.query(
            'SELECT id FROM users WHERE id = ? AND role = "volunteer"',
            [volunteer_id]
        );
        if (volunteer.length === 0) {
            return res.status(404).json({ error: 'Volunteer not found.' });
        }

        // Validate opportunity_id
        const [opportunity] = await db.query(
            'SELECT id FROM opportunities WHERE id = ?',
            [opportunity_id]
        );
        if (opportunity.length === 0) {
            return res.status(404).json({ error: 'Opportunity not found.' });
        }

        // Insert message
        const [result] = await db.query(
            'INSERT INTO messages (volunteer_id, opportunity_id, message) VALUES (?, ?, ?)',
            [volunteer_id, opportunity_id, message]
        );
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (err) {
        console.error('Error sending message:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = postMessage;

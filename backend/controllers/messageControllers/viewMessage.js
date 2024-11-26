const db = require('../../config/db');

const viewMessage = async (req, res) => {
    const { message_id } = req.params;

    try {
        const [message] = await db.query(
            'SELECT * FROM messages WHERE id = ?',
            [message_id]
        );

        if (message.length === 0) {
            return res.status(404).json({ error: 'Message not found.' });
        }

        res.status(200).json(message[0]);
    } catch (err) {
        console.error('Error fetching message:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = viewMessage;

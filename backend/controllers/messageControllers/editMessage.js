const db = require('../../config/db');

const editMessage = async (req, res) => {
    const { message_id } = req.params;
    const { message } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE messages SET message = ? WHERE id = ?',
            [message, message_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Message not found.' });
        }

        res.status(200).json({ message: 'Message updated successfully' });
    } catch (err) {
        console.error('Error updating message:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = editMessage;

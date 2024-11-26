const db = require('../../config/db');

const deleteMessage = async (req, res) => {
    const { message_id } = req.params;

    try {
        const [result] = await db.query(
            'DELETE FROM messages WHERE id = ?',
            [message_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Message not found.' });
        }

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (err) {
        console.error('Error deleting message:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = deleteMessage;

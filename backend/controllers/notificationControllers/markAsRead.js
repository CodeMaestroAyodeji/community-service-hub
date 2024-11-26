const db = require('../../config/db');

const markAsRead = async (req, res) => {
    const { notification_id } = req.params;

    try {
        await db.query(
            'UPDATE notifications SET is_read = true WHERE id = ?',
            [notification_id]
        );

        res.status(200).json({ message: 'Notification marked as read' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = markAsRead;

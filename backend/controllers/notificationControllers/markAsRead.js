const db = require('../../config/db');
const logger = require('../../utils/logger');
const CustomError = require('../../utils/customError');

const markAsRead = async (req, res, next) => {
    const { notification_id } = req.params;

    try {
        logger('info', 'Marking notification as read', { notificationId: notification_id });

        const [result] = await db.query('UPDATE notifications SET is_read = true WHERE id = ?', [notification_id]);

        if (result.affectedRows === 0) {
            throw new CustomError('Notification not found.', 404);
        }

        logger('info', 'Notification marked as read', { notificationId: notification_id });
        res.status(200).json({ message: 'Notification marked as read.' });
    } catch (err) {
        logger('error', 'Error marking notification as read', { error: err.message, notificationId: notification_id });
        next(err);
    }
};

module.exports = markAsRead;

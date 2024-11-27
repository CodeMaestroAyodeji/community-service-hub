const db = require('../../config/db');
const logger = require('../../utils/logger');
const CustomError = require('../../utils/customError');

const deleteMessage = async (req, res, next) => {
    const { message_id } = req.params;

    try {
        logger('info', 'Deleting message', { messageId: message_id });

        const [result] = await db.query('DELETE FROM messages WHERE id = ?', [message_id]);

        if (result.affectedRows === 0) {
            throw new CustomError('Message not found.', 404);
        }

        logger('info', 'Message deleted successfully', { messageId: message_id });
        res.status(200).json({ message: 'Message deleted successfully.' });
    } catch (err) {
        logger('error', 'Error deleting message', { error: err.message, messageId: message_id });
        next(err);
    }
};

module.exports = deleteMessage;

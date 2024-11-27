const db = require('../../config/db');
const logger = require('../../utils/logger');
const CustomError = require('../../utils/customError');

const viewMessage = async (req, res, next) => {
    const { message_id } = req.params;

    try {
        logger('info', 'Fetching message', { messageId: message_id });

        const [message] = await db.query('SELECT * FROM messages WHERE id = ?', [message_id]);

        if (message.length === 0) {
            throw new CustomError('Message not found.', 404);
        }

        logger('info', 'Message fetched successfully', { messageId: message_id });
        res.status(200).json(message[0]);
    } catch (err) {
        logger('error', 'Error fetching message', { error: err.message, messageId: message_id });
        next(err);
    }
};

module.exports = viewMessage;

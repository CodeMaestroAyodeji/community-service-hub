const db = require('../../config/db');
const logger = require('../../utils/logger');
const CustomError = require('../../utils/customError');

const editMessage = async (req, res, next) => {
    const { message_id } = req.params;
    const { message } = req.body;

    try {
        logger('info', 'Editing message', { messageId: message_id });

        const [result] = await db.query(
            'UPDATE messages SET message = ? WHERE id = ?',
            [message, message_id]
        );

        if (result.affectedRows === 0) {
            throw new CustomError('Message not found.', 404);
        }

        logger('info', 'Message updated successfully', { messageId: message_id });
        res.status(200).json({ message: 'Message updated successfully.' });
    } catch (err) {
        logger('error', 'Error updating message', { error: err.message, messageId: message_id });
        next(err);
    }
};

module.exports = editMessage;

const db = require('../../config/db');
const logger = require('../../utils/logger');
const CustomError = require('../../utils/customError');

const searchMessage = async (req, res, next) => {
    const { keyword } = req.query;

    try {
        logger('info', 'Searching messages', { keyword });

        if (!keyword) {
            throw new CustomError('Keyword is required for searching messages.', 400);
        }

        const [messages] = await db.query('SELECT * FROM messages WHERE message LIKE ?', [`%${keyword}%`]);

        if (messages.length === 0) {
            throw new CustomError('No messages found matching the keyword.', 404);
        }

        logger('info', 'Messages fetched successfully', { keyword });
        res.status(200).json(messages);
    } catch (err) {
        logger('error', 'Error searching messages', { error: err.message, keyword });
        next(err);
    }
};

module.exports = searchMessage;

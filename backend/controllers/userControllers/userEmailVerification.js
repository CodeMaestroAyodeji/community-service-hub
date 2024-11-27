const db = require('../../config/db');
const jwt = require('jsonwebtoken');
const logger = require('../../utils/logger');
const CustomError = require('../../utils/customError');
require('dotenv').config();

const userEmailVerification = async (req, res, next) => {
    const { token } = req.body;

    try {
        logger('info', 'Email verification attempt', { token });

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = decoded;

        // Update user status to verified
        await db.query('UPDATE users SET is_verified = true WHERE id = ?', [id]);

        logger('info', 'Email verified successfully', { userId: id });
        res.status(200).json({ message: 'Email verified successfully.' });
    } catch (err) {
        logger('error', 'Error during email verification', { error: err.message });
        next(err);
    }
};

module.exports = userEmailVerification;

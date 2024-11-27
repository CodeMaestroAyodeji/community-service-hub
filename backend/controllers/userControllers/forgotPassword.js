const db = require('../../config/db');
const jwt = require('jsonwebtoken');
const logger = require('../../utils/logger');
const CustomError = require('../../utils/customError');
require('dotenv').config();

const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        logger('info', 'Forgot password attempt', { email });

        // Check if user exists
        const [users] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            throw new CustomError('User not found.', 404);
        }

        const userId = users[0].id;

        // Generate reset token
        const resetToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15m' });

        // Simulate email sending (replace with real email service)
        console.log(`Reset password token (send this via email): ${resetToken}`);

        logger('info', 'Password reset token generated', { userId });
        res.status(200).json({ message: 'Password reset token sent to your email.' });
    } catch (err) {
        logger('error', 'Error during forgot password', { error: err.message });
        next(err);
    }
};

module.exports = forgotPassword;

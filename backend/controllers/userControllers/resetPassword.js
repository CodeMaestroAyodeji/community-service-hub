const db = require('../../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../../utils/logger');
const CustomError = require('../../utils/customError');
require('dotenv').config();

const resetPassword = async (req, res, next) => {
    const { token, new_password } = req.body;

    try {
        logger('info', 'Password reset attempt', { token });

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = decoded;

        // Hash new password
        const hashedPassword = await bcrypt.hash(new_password, 10);

        // Update the password in the database
        await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id]);

        logger('info', 'Password reset successfully', { userId: id });
        res.status(200).json({ message: 'Password reset successfully.' });
    } catch (err) {
        logger('error', 'Error during password reset', { error: err.message });
        next(err);
    }
};

module.exports = resetPassword;

const db = require('../../config/db');
const bcrypt = require('bcryptjs');
const logger = require('../../utils/logger');
const CustomError = require('../../utils/customError');

const changePassword = async (req, res, next) => {
    const { id } = req.user; // Extract user ID from the token
    const { old_password, new_password } = req.body;

    try {
        logger('info', 'Password change attempt', { userId: id });

        // Fetch user from the database
        const [user] = await db.query('SELECT password FROM users WHERE id = ?', [id]);

        if (user.length === 0) {
            throw new CustomError('User not found.', 404);
        }

        // Verify current password
        const isMatch = await bcrypt.compare(old_password, user[0].password);
        if (!isMatch) {
            throw new CustomError('Incorrect current password.', 400);
        }

        // Hash and update the new password
        const hashedPassword = await bcrypt.hash(new_password, 10);
        await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id]);

        logger('info', 'Password updated successfully', { userId: id });
        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (err) {
        logger('error', 'Error changing password', { error: err.message, userId: id });
        next(err); // Pass to global error handler
    }
};

module.exports = changePassword;

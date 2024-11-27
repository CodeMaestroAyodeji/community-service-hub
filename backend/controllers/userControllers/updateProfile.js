const db = require('../../config/db');
const logger = require('../../utils/logger');
const CustomError = require('../../utils/customError');

const updateProfile = async (req, res, next) => {
    const { id } = req.user; // Extract user ID from the token
    const { name, email } = req.body;

    try {
        logger('info', 'Profile update attempt', { userId: id });

        // Check if the user exists
        const [existingUser] = await db.query('SELECT id FROM users WHERE id = ?', [id]);

        if (existingUser.length === 0) {
            throw new CustomError('User not found.', 404);
        }

        // Update the user's profile
        await db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);

        logger('info', 'Profile updated successfully', { userId: id });
        res.status(200).json({ message: 'Profile updated successfully.' });
    } catch (err) {
        logger('error', 'Error updating profile', { error: err.message, userId: id });
        next(err); // Pass to global error handler
    }
};

module.exports = updateProfile;

const jwt = require('jsonwebtoken');
const db = require('../../config/db');
const path = require('path');
const CustomError = require('../../utils/customError');

const verifyEmailToken = async (req, res, next) => {
    // Extract the token from the URL parameter
    const { token } = req.params;

    try {
        // Decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Update the user's email verification status in the database
        const [result] = await db.query(
            'UPDATE users SET is_verified = 1 WHERE id = ?',
            [decoded.id]
        );

        if (result.affectedRows === 0) {
            throw new CustomError('Invalid token or user not found.', 400);
        }

        // Serve the professional success page
        res.sendFile(path.join(__dirname, '../../../client/email-verified.html'));
    } catch (err) {
        console.error('Error during email verification:', err.message);

        if (err.message.includes('Unknown column')) {
            return res.status(500).json({
                error: 'Database schema is incorrect. Please contact support.',
            });
        }

        // Serve an error page if the token is invalid or expired
        res.status(400).sendFile(path.join(__dirname, '../../../client/email-verification-error.html'));
    }
};

module.exports = verifyEmailToken;

const logger = require('../../utils/logger');

const userLogout = async (req, res, next) => {
    try {
        logger('info', 'User logout attempt', { userId: req.user.id });

        // Invalidate token (handled client-side; server example below for token blacklisting)
        res.status(200).json({ message: 'Logout successful.' });

        logger('info', 'User logout successful', { userId: req.user.id });
    } catch (err) {
        logger('error', 'Error during logout', { error: err.message });
        next(err);
    }
};

module.exports = userLogout;

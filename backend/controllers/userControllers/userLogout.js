const userLogout = async (req, res, next) => {
    try {
        res.status(200).json({ message: 'Logout successful.' });
    } catch (err) {
        next(err); // Pass errors to the global error handler
    }
};

module.exports = userLogout;

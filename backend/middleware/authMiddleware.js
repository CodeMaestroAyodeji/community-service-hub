const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to req.user

        console.log('JWT token decoded', { userId: decoded.id });
        next();
    } catch (err) {
        console.error('JWT Verification error', { error: err.message });
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;

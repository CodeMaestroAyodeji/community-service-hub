const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ error: 'Access denied. No token provided.' });

    const token = authHeader.split(' ')[1]; // Extract token after 'Bearer'
    if (!token) return res.status(401).json({ error: 'Access denied. Token missing.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify using your secret
        req.user = decoded; // Attach decoded token to request
        next(); // Proceed to the next middleware or route
    } catch (err) {
        console.error('JWT Verification Error:', err.message);
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;

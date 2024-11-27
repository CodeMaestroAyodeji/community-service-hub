const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.user.role; // Extract user role from decoded JWT

        // Log the role check attempt
        console.log('Role check', { userId: req.user.id, userRole, allowedRoles });

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ error: 'Access denied. You do not have permission to perform this action.' });
        }

        next();
    };
};

module.exports = roleMiddleware;

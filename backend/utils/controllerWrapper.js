const logger = require('./logger');

const controllerWrapper = (controller) => {
    return async (req, res, next) => {
        try {
            logger('info', 'Controller executed', {
                method: req.method,
                url: req.originalUrl,
                body: req.body,
                user: req.user ? { id: req.user.id, role: req.user.role } : null,
            });
            await controller(req, res, next);
        } catch (err) {
            logger('error', 'Controller error', { error: err.message, stack: err.stack });
            next(err); // Pass errors to the global error handler
        }
    };
};

module.exports = controllerWrapper;

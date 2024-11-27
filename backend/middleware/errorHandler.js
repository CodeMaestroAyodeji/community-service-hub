const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    // Log the error to the console instead of using logger
    console.error('Unhandled error:', err.message);
    console.error('Stack trace:', err.stack);

    res.status(statusCode).json({
        error: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};

module.exports = errorHandler;

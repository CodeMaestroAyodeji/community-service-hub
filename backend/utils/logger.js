const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',  // Default log level (info)
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),  // Logs to console
        new winston.transports.File({ filename: 'logs/app.log' })  // Logs to file
    ]
});

module.exports = logger;  // Exporting the logger instance, not a function

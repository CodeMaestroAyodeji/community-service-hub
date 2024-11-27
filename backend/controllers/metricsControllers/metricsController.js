const db = require('../../config/db');
const logger = require('../../utils/logger');

const getMetrics = async (req, res, next) => {
    try {
        logger('info', 'Fetching application metrics');

        // Total opportunities posted
        const [opportunityCount] = await db.query('SELECT COUNT(*) as total FROM opportunities');
        
        // Messages sent per opportunity
        const [messagesCount] = await db.query('SELECT opportunity_id, COUNT(*) as message_count FROM messages GROUP BY opportunity_id');

        // Number of active volunteers
        const [activeVolunteers] = await db.query('SELECT COUNT(*) as total FROM users WHERE role = "volunteer" AND is_verified = TRUE');

        // Number of active organizations
        const [activeOrganizations] = await db.query('SELECT COUNT(*) as total FROM users WHERE role = "organization" AND is_verified = TRUE');

        // Prepare the response data
        const metrics = {
            totalOpportunities: opportunityCount[0].total,
            messagesSentPerOpportunity: messagesCount,
            activeVolunteers: activeVolunteers[0].total,
            activeOrganizations: activeOrganizations[0].total
        };

        logger('info', 'Metrics fetched successfully', { metrics });
        res.status(200).json(metrics);
    } catch (err) {
        logger('error', 'Error fetching metrics', { error: err.message });
        next(err);
    }
};

module.exports = { getMetrics };

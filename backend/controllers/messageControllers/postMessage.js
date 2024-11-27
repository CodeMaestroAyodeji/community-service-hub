const db = require('../../config/db');
const sendNotification = require('../notificationControllers/sendNotification');
const logger = require('../../utils/logger');
const CustomError = require('../../utils/customError');

const postMessage = async (req, res, next) => {
    const { volunteer_id, opportunity_id, message } = req.body;

    try {
        logger('info', 'Posting message', { volunteerId: volunteer_id, opportunityId: opportunity_id });

        // Insert the message into the messages table
        const [result] = await db.query(
            'INSERT INTO messages (volunteer_id, opportunity_id, message) VALUES (?, ?, ?)',
            [volunteer_id, opportunity_id, message]
        );

        // Get opportunity details, including organization_id
        const [opportunity] = await db.query(
            'SELECT id, organization_id FROM opportunities WHERE id = ?',
            [opportunity_id]
        );

        if (opportunity.length === 0 || !opportunity[0].organization_id) {
            throw new CustomError('Opportunity not found or not linked to an organization.', 404);
        }

        // Validate volunteer_id (check if user is a volunteer)
        const [volunteer] = await db.query(
            'SELECT id FROM users WHERE id = ? AND role = "volunteer"',
            [volunteer_id]
        );

        if (volunteer.length === 0) {
            throw new CustomError('Volunteer not found.', 404);
        }

        const organization_id = opportunity[0].organization_id;

        // Send notification to the organization
        await sendNotification(volunteer_id, organization_id, result.insertId);

        logger('info', 'Message posted and notification triggered', {
            volunteerId: volunteer_id,
            organizationId: organization_id,
            messageId: result.insertId,
        });

        res.status(201).json({ message: 'Message sent and notification triggered successfully.' });
    } catch (err) {
        logger('error', 'Error posting message', { error: err.message, volunteerId: volunteer_id });
        next(err);
    }
};

module.exports = postMessage;

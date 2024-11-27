const db = require('../../config/db');
const logger = require('../../utils/logger');

const sendNotification = async (volunteer_id, organization_id, message_id) => {
    const notificationText = `You have received a new message from a volunteer regarding your opportunity.`;

    try {
        const [result] = await db.query(
            'INSERT INTO notifications (volunteer_id, organization_id, message_id, notification_text) VALUES (?, ?, ?, ?)',
            [volunteer_id, organization_id, message_id, notificationText]
        );

        logger('info', 'Notification sent', { volunteerId: volunteer_id, organizationId: organization_id, messageId: message_id });
    } catch (err) {
        logger('error', 'Error sending notification', { error: err.message, volunteerId: volunteer_id, organizationId: organization_id });
        throw err; // Re-throw the error for potential handling by caller
    }
};

module.exports = sendNotification;

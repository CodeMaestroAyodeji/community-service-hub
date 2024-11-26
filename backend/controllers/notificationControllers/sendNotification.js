const db = require('../../config/db');

const sendNotification = async (volunteer_id, organization_id, message_id) => {
    const notificationText = `You have received a new message from a volunteer regarding your opportunity.`;

    try {
        const [result] = await db.query(
            'INSERT INTO notifications (volunteer_id, organization_id, message_id, notification_text) VALUES (?, ?, ?, ?)',
            [volunteer_id, organization_id, message_id, notificationText]
        );

        console.log('Notification sent to organization:', result);
    } catch (err) {
        console.error('Error sending notification:', err.message);
    }
};

module.exports = sendNotification;

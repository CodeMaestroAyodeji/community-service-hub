const db = require('../../config/db');
const sendNotification = require('../notificationControllers/sendNotification');

const postMessage = async (req, res) => {
    const { volunteer_id, opportunity_id, message } = req.body;
    
    try {
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

        // Debugging log to check opportunity and organization_id
        console.log('Opportunity data:', opportunity);

        // Validate volunteer_id (check if user is a volunteer)
        const [volunteer] = await db.query(
            'SELECT id FROM users WHERE id = ? AND role = "volunteer"',
            [volunteer_id]
        );
        if (volunteer.length === 0) {
            return res.status(404).json({ error: 'Volunteer not found.' });
        }

        // Check if the opportunity exists and has a valid organization_id
        if (opportunity.length > 0 && opportunity[0].organization_id) {
            const organization_id = opportunity[0].organization_id;

            // Send notification to the organization
            await sendNotification(volunteer_id, organization_id, result.insertId);

            res.status(201).json({ message: 'Message sent and notification triggered successfully.' });
        } else {
            return res.status(404).json({ error: 'Opportunity not found or not linked to an organization.' });
        }
    } catch (err) {
        console.error('Error sending message:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = postMessage;

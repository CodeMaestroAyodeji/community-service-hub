const db = require('../../config/db');

const editOpportunity = async (req, res) => {
    const { opportunity_id } = req.params;
    const { title, description, location, date, contact_info } = req.body;

    try {
        // Check if the opportunity exists
        const [existingOpportunity] = await db.query(
            'SELECT id FROM opportunities WHERE id = ?',
            [opportunity_id]
        );

        if (existingOpportunity.length === 0) {
            return res.status(404).json({ error: 'Opportunity not found.' });
        }

        // Update the opportunity
        const [result] = await db.query(
            'UPDATE opportunities SET title = ?, description = ?, location = ?, date = ?, contact_info = ? WHERE id = ?',
            [title, description, location, date, contact_info, opportunity_id]
        );

        res.status(200).json({ message: 'Opportunity updated successfully.' });
    } catch (err) {
        console.error('Error editing opportunity:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = editOpportunity;

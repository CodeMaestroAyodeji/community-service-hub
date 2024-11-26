const db = require('../../config/db');

const deleteOpportunity = async (req, res) => {
    const { opportunity_id } = req.params;

    try {
        // Check if the opportunity exists
        const [existingOpportunity] = await db.query(
            'SELECT id FROM opportunities WHERE id = ?',
            [opportunity_id]
        );

        if (existingOpportunity.length === 0) {
            return res.status(404).json({ error: 'Opportunity not found.' });
        }

        // Delete related messages
        await db.query(
            'DELETE FROM messages WHERE opportunity_id = ?',
            [opportunity_id]
        );

        // Delete the opportunity
        await db.query(
            'DELETE FROM opportunities WHERE id = ?',
            [opportunity_id]
        );

        res.status(200).json({ message: 'Opportunity and its related messages deleted successfully.' });
    } catch (err) {
        console.error('Error deleting opportunity:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = deleteOpportunity;

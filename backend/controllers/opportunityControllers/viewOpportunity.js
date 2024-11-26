const db = require('../../config/db');

const viewOpportunity = async (req, res) => {
    const { opportunity_id } = req.params;

    try {
        const [opportunity] = await db.query(
            'SELECT * FROM opportunities WHERE id = ?',
            [opportunity_id]
        );

        if (opportunity.length === 0) {
            return res.status(404).json({ error: 'Opportunity not found.' });
        }

        res.status(200).json(opportunity[0]);
    } catch (err) {
        console.error('Error fetching opportunity:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = viewOpportunity;

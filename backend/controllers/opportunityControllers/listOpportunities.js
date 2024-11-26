const db = require('../../config/db');

const listOpportunities = async (req, res) => {
    try {
        const [opportunities] = await db.query(
            'SELECT * FROM opportunities ORDER BY created_at DESC'
        );
        res.status(200).json(opportunities);
    } catch (err) {
        console.error('Error listing opportunities:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = listOpportunities;

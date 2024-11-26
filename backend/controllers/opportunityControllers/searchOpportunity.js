const db = require('../../config/db');

const searchOpportunity = async (req, res) => {
    const { keyword } = req.query;

    try {
        const [opportunities] = await db.query(
            'SELECT * FROM opportunities WHERE title LIKE ? OR description LIKE ?',
            [`%${keyword}%`, `%${keyword}%`]
        );
        res.status(200).json(opportunities);
    } catch (err) {
        console.error('Error searching opportunities:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = searchOpportunity;

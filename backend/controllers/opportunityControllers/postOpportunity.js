const db = require('../../config/db');

const postOpportunity = async (req, res) => {
    const { title, description, location, date, contact_info, organization_id } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO opportunities (title, description, location, date, contact_info, organization_id) VALUES (?, ?, ?, ?, ?, ?)',
            [title, description, location, date, contact_info, organization_id]
        );
        res.status(201).json({ message: 'Opportunity created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = postOpportunity;

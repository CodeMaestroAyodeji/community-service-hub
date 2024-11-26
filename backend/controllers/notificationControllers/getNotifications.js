const db = require('../../config/db');

const getNotifications = async (req, res) => {
    const { organization_id } = req.params;

    try {
        const [notifications] = await db.query(
            'SELECT * FROM notifications WHERE organization_id = ? AND is_read = false',
            [organization_id]
        );

        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = getNotifications;

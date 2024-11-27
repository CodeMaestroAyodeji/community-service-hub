const db = require('../../config/db');
const logger = require('../../utils/logger');
const CustomError = require('../../utils/customError');

const getNotifications = async (req, res, next) => {
    const { organization_id } = req.params;

    try {
        logger('info', 'Fetching notifications', { organizationId: organization_id });

        const [notifications] = await db.query(
            'SELECT * FROM notifications WHERE organization_id = ? AND is_read = false',
            [organization_id]
        );

        if (notifications.length === 0) {
            throw new CustomError('No unread notifications found.', 404);
        }

        logger('info', 'Notifications fetched successfully', { organizationId: organization_id });
        res.status(200).json(notifications);
    } catch (err) {
        logger('error', 'Error fetching notifications', { error: err.message, organizationId: organization_id });
        next(err);
    }
};

module.exports = getNotifications;

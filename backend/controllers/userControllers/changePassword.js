const db = require('../../config/db');
const bcrypt = require('bcryptjs');

const changePassword = async (req, res) => {
    const { id } = req.user; // Use `id` directly
    const { old_password, new_password } = req.body;

    try {
        console.log('Changing password for id:', id); // Debug log

        const [user] = await db.query(
            'SELECT password FROM users WHERE id = ?',
            [id]
        );

        if (user.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(old_password, user[0].password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect current password.' });
        }

        const hashedPassword = await bcrypt.hash(new_password, 10);
        await db.query(
            'UPDATE users SET password = ? WHERE id = ?',
            [hashedPassword, id]
        );

        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (err) {
        console.error('Error changing password:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = changePassword;


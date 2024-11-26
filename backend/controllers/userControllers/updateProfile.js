const db = require('../../config/db');
const bcrypt = require('bcryptjs');

const updateProfile = async (req, res) => {
    const { id } = req.user; // Use `id` directly
    const { name, email } = req.body;

    try {
        console.log('Updating profile for id:', id); // Debug log

        const [existingUser] = await db.query(
            'SELECT id FROM users WHERE id = ?',
            [id]
        );

        if (existingUser.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        await db.query(
            'UPDATE users SET name = ?, email = ? WHERE id = ?',
            [name, email, id]
        );

        res.status(200).json({ message: 'Profile updated successfully.' });
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = updateProfile;

const db = require('../../config/db');
const bcrypt = require('bcryptjs');

const signUp = async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role]
        );
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Signup Error:', err); // Log the error to console
        res.status(500).json({ error: err.message || 'An unknown error occurred' });
    }
};

module.exports = signUp;

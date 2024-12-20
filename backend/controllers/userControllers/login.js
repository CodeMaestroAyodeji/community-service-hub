const db = require('../../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CustomError = require('../../utils/customError');
require('dotenv').config();

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        console.log('Login attempt', { email });

        // Fetch user by email
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            throw new CustomError('User not found.', 404);
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new CustomError('Invalid credentials.', 401);
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '6h' }
        );

        console.log('Login successful', { userId: user.id });
        res.status(200).json({ message: 'Login successful', token, role: user.role }); // Include role
    } catch (err) {
        console.error('Error during login', { error: err.message, email });
        next(err); // Pass to global error handler
    }
};

module.exports = login;

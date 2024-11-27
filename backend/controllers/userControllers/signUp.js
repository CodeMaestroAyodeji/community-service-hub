const db = require('../../config/db');
const bcrypt = require('bcryptjs');
const logger = require('../../utils/logger');
const CustomError = require('../../utils/customError');

const signUp = async (req, res, next) => {
    const { name, email, password, role } = req.body;

    try {
        logger('info', 'Signup attempt', { email });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        await db.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role]
        );

        logger('info', 'User registered successfully', { email });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        logger('error', 'Error during signup', { error: err.message, email });
        next(err); // Pass to global error handler
    }
};

module.exports = signUp;

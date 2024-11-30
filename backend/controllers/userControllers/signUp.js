const db = require('../../config/db');
const bcrypt = require('bcryptjs');
const CustomError = require('../../utils/customError');
const emailVerification = require('./sendVerificationEmail');

const signUp = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        console.log('Signup attempt started', { email });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed successfully');

        // Insert user into the database
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role]
        );

        console.log('User inserted into database', { id: result.insertId });

        // Fetch the newly created user ID
        const user = { id: result.insertId, email };

        // Send verification email
        await emailVerification(user);

        console.log('Verification email sent successfully');
        res.status(201).json({ message: 'User registered successfully. Verification email sent.' });
    } catch (err) {
        console.error('Error during signup:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = signUp;


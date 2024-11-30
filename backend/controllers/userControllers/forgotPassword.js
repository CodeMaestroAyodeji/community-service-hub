const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');
const CustomError = require('../../utils/customError');

const sendResetPasswordEmail = async (user) => {
    const resetToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const resetLink = `http://localhost:5000/api/users/reset-password/${resetToken}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Password Reset Request',
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
    };

    await transporter.sendMail(mailOptions);
};

const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (user.length === 0) {
            throw new CustomError('User not found.', 404);
        }

        // Send reset password email
        await sendResetPasswordEmail(user[0]);

        res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (err) {
        next(err);
    }
};

module.exports = forgotPassword;

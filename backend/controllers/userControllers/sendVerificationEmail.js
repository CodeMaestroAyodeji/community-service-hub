const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const CustomError = require('../../utils/customError');

const sendVerificationEmail = async (user) => {
    console.log('Preparing to send verification email for user:', user.email);

    // Set token expiration to 6 hours
    const verificationToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '6h' }  // Changed from '1h' to '6h'
    );

    console.log('Verification token created:', verificationToken);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const verificationLink = `http://localhost:5000/api/users/verify-email/${verificationToken}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Please verify your email address',
        html: `<p>Click <a href="${verificationLink}">here</a> to verify your email address.</p>`
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', result);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new CustomError('Email sending failed. Please try again later.', 500);
    }
};

module.exports = sendVerificationEmail;

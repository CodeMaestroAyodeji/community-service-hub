const jwt = require('jsonwebtoken');
const db = require('../../config/db');
const CustomError = require('../../utils/customError');

const verifyEmailToken = async (req, res, next) => {  
    const { token } = req.params; // Extract the token from the URL parameter  

    try {  
        // Decode the token  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  

        // Update the user's email verification status in the database  
        const [result] = await db.query(  
            'UPDATE users SET is_verified = 1 WHERE id = ?',  
            [decoded.id]  
        );  

        if (result.affectedRows === 0) {  
            throw new CustomError('Invalid token or user not found.', 400);  
        }  

        res.status(200).json({ message: 'Email verified successfully.' });  
    } catch (err) {  
        console.error('Error during email verification:', err.message);  
        if (err.message.includes('Unknown column')) {  
            return res.status(500).json({ error: 'Database schema is incorrect. Please contact support.' });  
        }  
        res.status(400).json({ error: 'Invalid or expired token.' });  
    }  
};  

module.exports = verifyEmailToken;

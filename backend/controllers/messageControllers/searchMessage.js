const db = require('../../config/db');

const searchMessage = async (req, res) => {
    console.log('Inside searchMessage controller'); // Debug log
    const { keyword } = req.query;

    if (!keyword) {
        console.log('No keyword provided'); // Debug log
        return res.status(400).json({ error: 'Keyword is required for searching messages.' });
    }

    console.log('Received keyword:', keyword); // Debug log

    try {
        const [messages] = await db.query(
            'SELECT * FROM messages WHERE message LIKE ?',
            [`%${keyword}%`]
        );

        console.log('Search results:', messages); // Debug log

        if (messages.length === 0) {
            return res.status(404).json({ error: 'No messages found matching the keyword.' });
        }

        res.status(200).json(messages);
    } catch (err) {
        console.error('Error searching messages:', err);
        res.status(500).json({ error: err.message });
    }
};


module.exports = searchMessage;

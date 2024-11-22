const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db'); // Import the database configuration
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Sample route to test database connection
app.get('/', async (req, res) => {
    try {
        await db.query('SELECT 1'); // Test database connection
        res.send('Community Service Hub API is running and connected to the database!');
    } catch (err) {
        res.status(500).send('Database connection failed!');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

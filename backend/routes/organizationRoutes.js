router.post('/post-opportunity', async (req, res) => {
    const { title, description, location, date, contact_info, organization_id } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO opportunities (title, description, location, date, contact_info, organization_id) VALUES (?, ?, ?, ?, ?, ?)',
            [title, description, location, date, contact_info, organization_id]
        );
        res.status(201).json({ message: 'Opportunity created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/search', async (req, res) => {
    const { keyword } = req.query;

    try {
        const [opportunities] = await db.query(
            'SELECT * FROM opportunities WHERE title LIKE ? OR description LIKE ?',
            [`%${keyword}%`, `%${keyword}%`]
        );
        res.status(200).json(opportunities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

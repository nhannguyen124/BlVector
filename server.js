const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Chứa file HTML và JavaScript

// Route để thêm API key
app.post('/add-key', (req, res) => {
    const { key, hwid, date, time } = req.body;

    if (!key || !hwid || !date || !time) {
        return res.status(400).send('Missing data.');
    }

    const newEntry = { key, hwid, date, time };

    // Đọc file hiện tại
    fs.readFile('keys.json', 'utf8', (err, data) => {
        let keys = [];
        if (!err && data) {
            keys = JSON.parse(data); // Parse các key hiện tại
        }

        // Thêm key mới nếu chưa tồn tại
        const existing = keys.find(k => k.hwid === hwid);
        if (existing) {
            return res.status(400).send('HWID already exists.');
        }

        keys.push(newEntry);

        // Ghi lại file
        fs.writeFile('keys.json', JSON.stringify(keys, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).send('Failed to save key.');
            }
            res.send('Key saved successfully!');
        });
    });
});

// Route để xem tất cả API keys
app.get('/keys', (req, res) => {
    fs.readFile('keys.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Failed to read keys.');
        }
        res.send(JSON.parse(data));
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

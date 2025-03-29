const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/data.json', (req, res) => {
    fs.readFile('./data.json', 'utf8', (err, jsonString) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading file' });
        }
        res.json(JSON.parse(jsonString));
    });
});

module.exports = router;

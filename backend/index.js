const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'tickets.json');

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
}));


app.get('/tickets', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }
        res.json(JSON.parse(data || '[]'));
    });
});

app.post('/tickets', (req, res) => {
    const newTicket = req.body;
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }
        const tickets = JSON.parse(data || '[]');
        tickets.push(newTicket);
        fs.writeFile(DATA_FILE, JSON.stringify(tickets, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save data' });
            }
            res.status(201).json(newTicket);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 
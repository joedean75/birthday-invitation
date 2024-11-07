// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const RSVPS_FILE = process.env.NODE_ENV === 'production' 
    ? '/tmp/rsvps.json'
    : path.join(__dirname, 'rsvps.json');

// Initialize rsvps.json with empty array
try {
    const data = fs.readFileSync(RSVPS_FILE, 'utf8');
    if (!data) {
        fs.writeFileSync(RSVPS_FILE, '[]');
    }
} catch (err) {
    fs.writeFileSync(RSVPS_FILE, '[]');
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client'))); 

// Endpoint to handle RSVP submissions
app.post('/rsvp', (req, res) => {
    const { name, phone } = req.body;
    const rsvpData = { name, phone };
    
    try {
        const data = fs.readFileSync(RSVPS_FILE, 'utf8');
        const rsvps = JSON.parse(data || '[]');
        rsvps.push(rsvpData);
        fs.writeFileSync(RSVPS_FILE, JSON.stringify(rsvps, null, 2));
        res.status(200).send('RSVP saved successfully');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error saving RSVP data');
    }
});

// New endpoint to retrieve RSVP data
app.get('/rsvps', (req, res) => {
    try {
        const data = fs.readFileSync(RSVPS_FILE, 'utf8');
        const rsvps = JSON.parse(data || '[]');
        res.json(rsvps);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Error reading RSVP data');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
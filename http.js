// server.js
const express = require('express');
const path = require('path');
const apiRouter = require('./api'); // Import the router for serving JSON data
const app = express();

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Use the API router for handling `/data.json` route
app.use(apiRouter);

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle 404 for other routes
app.all('*', (req, res) => {
    res.status(404).send('Resource not found');
});

app.listen(7772, () => {
    console.log('Server is running on port 7777...');
});

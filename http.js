// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const { router } = require('./routers/api'); // Import the router for serving JSON data
const app = express();
const PORT = process.env.PORT || 1157;
app.use(express.json());
// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Use the API router for handling `/data.json` route
app.use(router);

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/config', (req, res) => {
  res.json({
    apiKey: process.env.API_KEY,
  });
});





// Handle 404 for other routes
app.all('*', (req, res) => {
  res.status(404).send('Resource not found');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use. Trying another port...`);
    app.listen(0, () => console.log(`New port assigned: ${server.address().port}`));
  } else {
    console.error(err);
  }
});

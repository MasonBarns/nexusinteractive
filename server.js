const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// API route
app.get('/api/server-info', async (req, res) => {
  try {
    const response = await axios.get('https://api.erlc.com/server', {
      headers: { Authorization: `Bearer ${process.env.ERLC_API_KEY}` }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch server info' });
  }
});
// Fallback route to serve index.html for SPA
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

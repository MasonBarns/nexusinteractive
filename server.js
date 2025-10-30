const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Store server status in memory
let serverStatus = {
  online: true,
  currentPlayers: 39
};

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// API to get current status
app.get('/api/server-info', (req, res) => {
  res.json(serverStatus);
});

// API to update status (admin panel)
app.post('/api/update-status', (req, res) => {
  const { online, currentPlayers } = req.body;
  if (typeof online === 'boolean' && typeof currentPlayers === 'number') {
    serverStatus = { online, currentPlayers };
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid input' });
  }
});

// Fallback route
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

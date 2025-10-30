const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

let serverStatus = {
  online: true,
  currentPlayers: 39,
  maintenance: false
};

const ADMIN_PASSWORD = '7736635722';

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/api/server-info', (req, res) => {
  res.json(serverStatus);
});

app.post('/api/update-status', (req, res) => {
  const { password, online, currentPlayers, maintenance } = req.body;
  if (password !== ADMIN_PASSWORD) return res.status(403).json({ error: 'Unauthorized' });

  if (
    typeof online === 'boolean' &&
    typeof currentPlayers === 'number' &&
    typeof maintenance === 'boolean'
  ) {
    serverStatus = { online, currentPlayers, maintenance };
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Invalid input' });
  }
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

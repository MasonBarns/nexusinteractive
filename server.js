const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const ADMIN_PASSWORD = '7736635722';

let serverStatus = {
  online: true,
  currentPlayers: 42,
  maintenance: false,
  title: "Miami City Roleplay",
  tagline: "Tropical RP Action in ER:LC",
  description: "Join a vibrant, community-driven RP server with active departments, realistic dispatch, and frequent events."
};

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/api/server-info', (req, res) => {
  res.json(serverStatus);
});

app.post('/api/update-status', (req, res) => {
  const { password, online, currentPlayers, maintenance, title, tagline, description } = req.body;

  if (password !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  serverStatus.online = online === 'true';
  serverStatus.currentPlayers = parseInt(currentPlayers) || 0;
  serverStatus.maintenance = maintenance === 'true';
  serverStatus.title = title || serverStatus.title;
  serverStatus.tagline = tagline || serverStatus.tagline;
  serverStatus.description = description || serverStatus.description;

  res.json({ success: true });
});

app.get('/', (req, res) => {
  res.send('Miami RP server is live!');
});

app.listen(PORT, () => {
  console.log(`✅ Miami RP backend running on port ${PORT}`);
});

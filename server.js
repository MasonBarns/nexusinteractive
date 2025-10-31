const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

const ADMIN_PASSWORD = '7736635722';

let serverStatus = {
  online: true,
  currentPlayers: 42,
  maintenance: false,
  title: "Miami City Roleplay",
  tagline: "Tropical RP Action in ER:LC",
  description: "Join a vibrant, community-driven ER:LC server with active departments, realistic dispatch, and frequent events.",
  logo: "/uploads/logo.png"
};

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, 'logo.png')
});
const upload = multer({ storage });

app.get('/api/server-info', (req, res) => {
  res.json(serverStatus);
});

app.post('/api/update-status', upload.single('logo'), (req, res) => {
  const { password, online, currentPlayers, maintenance, title, tagline, description } = req.body;
  if (password !== ADMIN_PASSWORD) return res.status(403).json({ error: 'Unauthorized' });

  serverStatus.online = online === 'true';
  serverStatus.currentPlayers = parseInt(currentPlayers);
  serverStatus.maintenance = maintenance === 'true';
  serverStatus.title = title || serverStatus.title;
  serverStatus.tagline = tagline || serverStatus.tagline;
  serverStatus.description = description || serverStatus.description;

  if (req.file) {
    serverStatus.logo = '/uploads/logo.png';
  }

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Miami RP server running on port ${PORT}`);
});

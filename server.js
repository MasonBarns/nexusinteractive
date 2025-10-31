const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3000;

const ADMIN_PASSWORD = '7736635722';

let serverStatus = {
  online: true,
  currentPlayers: 42,
  maintenance: false,
  title: "Miami City Roleplay",
  tagline: "Tropical RP Action in ER:LC",
  description: "Join a vibrant, community-driven RP server with active departments, realistic dispatch, and frequent events.",
  logo: "/uploads/logo.png"
};

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Logo upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, 'logo.png')
});
const upload = multer({ storage });

app.get('/api/server-info', (req, res) => {
  res.json(serverStatus);
});

app.post('/api/update-status', upload.single('logo'), (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) return res.status(403).json({ error: 'Unauthorized' });

  serverStatus.online = req.body.online === 'true';
  serverStatus.currentPlayers = parseInt(req.body.currentPlayers);
  serverStatus.maintenance = req.body.maintenance === 'true';
  serverStatus.title = req.body.title || serverStatus.title;
  serverStatus.tagline = req.body.tagline || serverStatus.tagline;
  serverStatus.description = req.body.description || serverStatus.description;
  if (req.file) serverStatus.logo = '/uploads/logo.png';

  res.json({ success: true });
});

app.get('/', (req, res) => {
  res.send('Miami RP server is live!');
});

app.listen(PORT, () => {
  console.log(`Miami RP server running on port ${PORT}`);
});

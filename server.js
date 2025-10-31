const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3000;

const ADMIN_PASSWORD = '7736635722';

// Initial server state
let serverStatus = {
  online: true,
  currentPlayers: 42,
  maintenance: false,
  title: "Miami City Roleplay",
  tagline: "Tropical RP Action in ER:LC",
  description: "Join a vibrant, community-driven RP server with active departments, realistic dispatch, and frequent events.",
  logo: "/uploads/logo.png"
};

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON for non-file routes
app.use(express.json());

// Set up multer for logo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, 'logo.png')
});
const upload = multer({ storage });

// API: Get current server info
app.get('/api/server-info', (req, res) => {
  res.json(serverStatus);
});

// API: Update server info and homepage content
app.post('/api/update-status', upload.single('logo'), (req, res) => {
  try {
    const {
      password,
      online,
      currentPlayers,
      maintenance,
      title,
      tagline,
      description
    } = req.body;

    // Auth check
    if (password !== ADMIN_PASSWORD) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Update values safely
    serverStatus.online = online === 'true';
    serverStatus.currentPlayers = parseInt(currentPlayers) || 0;
    serverStatus.maintenance = maintenance === 'true';
    serverStatus.title = title || serverStatus.title;
    serverStatus.tagline = tagline || serverStatus.tagline;
    serverStatus.description = description || serverStatus.description;

    // Handle logo upload
    if (req.file) {
      serverStatus.logo = '/uploads/logo.png';
    }

    return res.json({ success: true });
  } catch (err) {
    console.error('Update error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Root route for health check
app.get('/', (req, res) => {
  res.send('Miami RP server is live!');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Miami RP backend running on port ${PORT}`);
});

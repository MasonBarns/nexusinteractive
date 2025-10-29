const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

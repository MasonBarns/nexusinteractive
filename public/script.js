async function updatePlayerCount() {
  try {
    const res = await fetch('/api/server-info');
    const data = await res.json();
    document.getElementById('players').textContent = `${data.currentPlayers} Players`;

    const banner = document.getElementById('maintenance-banner');
    if (data.maintenance) {
      banner.style.display = 'block';
    } else {
      banner.style.display = 'none';
    }
  } catch (err) {
    document.getElementById('players').textContent = 'Error';
  }
}

setInterval(updatePlayerCount, 5000);
updatePlayerCount();

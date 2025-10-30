async function updatePlayerCount() {
  try {
    const res = await fetch('/api/server-info');
    const data = await res.json();
    document.getElementById('players').textContent = data.currentPlayers;
  } catch (err) {
    document.getElementById('players').textContent = 'Error';
  }
}

setInterval(updatePlayerCount, 5000);
updatePlayerCount();

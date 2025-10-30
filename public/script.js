async function updatePlayerCount() {
  const res = await fetch('/api/server-info');
  const data = await res.json();
  document.getElementById('players').textContent = data.currentPlayers;
}
setInterval(updatePlayerCount, 5000);
updatePlayerCount();

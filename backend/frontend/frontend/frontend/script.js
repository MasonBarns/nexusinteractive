async function fetchStats() {
  const res = await fetch('https://your-koyeb-app-url/api/server-info');
  const data = await res.json();
  document.getElementById('players').textContent = data.currentPlayers;
  document.getElementById('owner').textContent = data.ownerId;
  document.getElementById('coowners').textContent = data.coOwnerIds.join(', ');
}

setInterval(fetchStats, 5000);
fetchStats();

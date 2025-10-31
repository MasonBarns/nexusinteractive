const ADMIN_PASSWORD = '7736635722';

async function updatePlayerCount() {
  try {
    const res = await fetch('/api/server-info');
    const data = await res.json();

    document.getElementById('players').textContent = `${data.currentPlayers} Players`;
    document.getElementById('title').textContent = data.title;
    document.getElementById('tagline').textContent = data.tagline;
    document.getElementById('description').textContent = data.description;

    if (data.maintenance && !sessionStorage.getItem('unlocked')) {
      document.getElementById('maintenance-overlay').style.display = 'flex';
    } else {
      document.getElementById('maintenance-overlay').style.display = 'none';
    }
  } catch (err) {
    document.getElementById('players').textContent = 'Error';
  }
}

function unlockSite() {
  const input = document.getElementById('unlock-password').value;
  if (input === ADMIN_PASSWORD) {
    sessionStorage.setItem('unlocked', 'true');
    document.getElementById('maintenance-overlay').style.display = 'none';
  } else {
    document.getElementById('unlock-error').textContent = 'Incorrect password.';
  }
}

setInterval(updatePlayerCount, 5000);
updatePlayerCount();

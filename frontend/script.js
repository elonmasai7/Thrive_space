let token = null;

// Signup
async function signup() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    document.getElementById('auth-message').textContent = data.message || data.error;
}

// Login
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.token) {
        token = data.token;
        document.getElementById('auth').classList.add('hidden');
        document.getElementById('mood-tracker').classList.remove('hidden');
        document.getElementById('missions').classList.remove('hidden');
        document.getElementById('rewards').classList.remove('hidden');
    } else {
        document.getElementById('auth-message').textContent = data.error;
    }
}

// Mood Tracker
async function logMood(mood) {
    const response = await fetch('http://localhost:5000/api/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ mood }),
    });
    const data = await response.json();
    document.getElementById('mood-log').textContent = `You're feeling ${mood} today.`;
}

// Missions
async function completeMission(index) {
    const response = await fetch('http://localhost:5000/api/missions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ index }),
    });
    const data = await response.json();
    document.getElementById('points').textContent = data.points;
    if (data.points >= 30) {
        document.getElementById('reward-message').textContent = '🎉 You unlocked a new theme!';
    }
}

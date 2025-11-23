// Config
const API_URL = 'https://official-joke-api.appspot.com/random_joke';

// Elements
const nextBtn = document.getElementById('nextBtn');
const setupEl = document.getElementById('setup');
const punchlineEl = document.getElementById('punchline');
const loader = document.getElementById('loader');
const errorMsg = document.getElementById('errorMsg');

// Helper: show/hide loader and disable button (bonus)
function beginRequest() {
  nextBtn.disabled = true;
  loader.style.visibility = 'visible';
  errorMsg.hidden = true;
}
function endRequest() {
  nextBtn.disabled = false;
  loader.style.visibility = 'hidden';
}

// Render joke
function showJoke(joke) {
  setupEl.textContent = joke.setup || '—';
  punchlineEl.textContent = joke.punchline || '';
}

// Render error
function showError(msg) {
  errorMsg.hidden = false;
  errorMsg.textContent = msg;
  setupEl.textContent = 'Failed to load a joke.';
  punchlineEl.textContent = '';
}

// Fetch joke using .then() / .catch()
function fetchJoke() {
  beginRequest();

  fetch(API_URL, { cache: 'no-store' })
    .then(response => {
      if (!response.ok) throw new Error(`Network error (status ${response.status})`);
      return response.json();
    })
    .then(data => {
      // API should return an object with 'setup' and 'punchline'
      if (!data || !data.setup) throw new Error('Received unexpected data from API');
      showJoke(data);
    })
    .catch(err => {
      console.error('Error fetching joke:', err);
      showError('Could not fetch joke. Try again.');
    })
    .finally(() => {
      endRequest();
    });
}

// Wire UI
nextBtn.addEventListener('click', fetchJoke);

// allow pressing Enter when Next Joke is focused
nextBtn.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    fetchJoke();
  }
});

// Initial load
// (optional) load a joke on page open
fetchJoke();

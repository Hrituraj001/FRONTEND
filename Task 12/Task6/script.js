// Config
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Elements
const refreshBtn = document.getElementById('refreshBtn');
const spinner = document.getElementById('spinner');
const tableBody = document.getElementById('tableBody');
const emptyState = document.getElementById('emptyState');
const errorState = document.getElementById('errorState');

// Helper: show/hide spinner
function showSpinner() {
  spinner.style.visibility = 'visible';
  spinner.setAttribute('aria-hidden', 'false');
}
function hideSpinner() {
  spinner.style.visibility = 'hidden';
  spinner.setAttribute('aria-hidden', 'true');
}

// Render rows into table
function renderUsers(users) {
  tableBody.innerHTML = '';
  if (!Array.isArray(users) || users.length === 0) {
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;
  errorState.hidden = true;

  users.forEach((u, idx) => {
    const tr = document.createElement('tr');

    const tdIndex = document.createElement('td');
    tdIndex.textContent = String(idx + 1);

    const tdName = document.createElement('td');
    tdName.textContent = u.name || '-';

    const tdEmail = document.createElement('td');
    tdEmail.textContent = u.email || '-';

    const tdCity = document.createElement('td');
    tdCity.textContent = (u.address && u.address.city) ? u.address.city : '-';

    tr.append(tdIndex, tdName, tdEmail, tdCity);
    tableBody.appendChild(tr);
  });
}

// Fetch users with async/await and error handling
async function fetchAndRenderUsers() {
  showSpinner();
  errorState.hidden = true;
  try {
    const resp = await fetch(API_URL, { cache: 'no-store' });
    if (!resp.ok) throw new Error(`Network response not ok (status ${resp.status})`);
    const data = await resp.json();
    // Defensive: ensure array
    if (!Array.isArray(data)) throw new Error('Unexpected response format');
    renderUsers(data);
  } catch (err) {
    tableBody.innerHTML = '';
    emptyState.hidden = true;
    errorState.hidden = false;
    errorState.textContent = `Failed to load users: ${err.message}`;
    console.error(err);
  } finally {
    hideSpinner();
  }
}

// Wire refresh button
refreshBtn.addEventListener('click', () => {
  fetchAndRenderUsers();
});

// Initial load
// keep spinner hidden until first fetch starts
hideSpinner();
fetchAndRenderUsers();

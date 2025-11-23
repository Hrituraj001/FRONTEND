const loadBtn = document.getElementById('loadBtn');
const retryBtn = document.getElementById('retryBtn');
const statusEl = document.getElementById('status');
const postList = document.getElementById('postList');

// --- Simulated delayed Promise ---
function loadPosts() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const failChance = Math.random(); // simulate failure sometimes

      if (failChance < 0.25) {
        reject("Failed to load posts (simulated error).");
        return;
      }

      resolve([
        "How JavaScript Works Behind the Scenes",
        "The Rise of Web Frameworks",
        "Understanding Async Await",
        "How to Make Better UI Components",
        "Why DOM Manipulation Still Matters"
      ]);
    }, 2000); // 2 seconds delay
  });
}

// --- Render posts ---
function displayPosts(posts) {
  postList.innerHTML = "";
  posts.forEach(title => {
    const li = document.createElement('li');
    li.textContent = title;
    postList.appendChild(li);
  });
}

// --- Load handler with async/await ---
async function handleLoad() {
  statusEl.textContent = "Loading posts…";
  postList.innerHTML = "";
  loadBtn.disabled = true;
  retryBtn.hidden = true;

  try {
    const posts = await loadPosts(); // delayed promise
    statusEl.textContent = "Posts loaded successfully!";
    displayPosts(posts);
  } catch (err) {
    statusEl.textContent = err;
    retryBtn.hidden = false; // bonus: show retry button
  } finally {
    loadBtn.disabled = false;
  }
}

// --- Wire buttons ---
loadBtn.addEventListener('click', handleLoad);
retryBtn.addEventListener('click', handleLoad);

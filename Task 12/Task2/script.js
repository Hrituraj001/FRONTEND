// Configuration
const LIMIT = 100;
const WARNING_THRESHOLD = 0.5; // 50% -> orange below this
const DANGER_THRESHOLD = 0.2;  // 20% -> red at or below this

// Elements
const textarea = document.getElementById('message');
const countSpan = document.getElementById('count');
const charsLeftDiv = document.getElementById('charsLeft');
const hint = document.getElementById('hint');
const limitDisplay = document.getElementById('limitDisplay');

limitDisplay.textContent = LIMIT;

// Helper: update UI
function updateCounter() {
  const length = textarea.value.length;
  const remaining = LIMIT - length;
  countSpan.textContent = remaining >= 0 ? remaining : 0;

  // Remove all color classes
  countSpan.classList.remove('count-green', 'count-orange', 'count-red');

  const ratio = remaining / LIMIT;

  if (remaining <= LIMIT * DANGER_THRESHOLD) {
    countSpan.classList.add('count-red');
    hint.textContent = 'Almost there — limit reached soon.';
  } else if (remaining <= LIMIT * WARNING_THRESHOLD) {
    countSpan.classList.add('count-orange');
    hint.textContent = 'Getting close to the limit.';
  } else {
    countSpan.classList.add('count-green');
    hint.textContent = 'You have plenty of characters left.';
  }

  if (remaining <= 0) {
    hint.textContent = 'Character limit reached — cannot type more.';
  }
}

// Prevent extra typing when limit reached (handles typing)
function handleInput(e) {
  if (textarea.value.length > LIMIT) {
    // Trim any extra characters (covers paste and typing)
    textarea.value = textarea.value.substring(0, LIMIT);
  }
  updateCounter();
}

// Handle paste: ensure pasted content doesn't exceed LIMIT
function handlePaste(e) {
  const paste = (e.clipboardData || window.clipboardData).getData('text') || '';
  const available = LIMIT - textarea.value.length;
  if (paste.length > available) {
    // prevent default paste and insert truncated text
    e.preventDefault();
    const truncated = paste.substring(0, available);
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = textarea.value.slice(0, start);
    const after = textarea.value.slice(end);
    textarea.value = before + truncated + after;
    // set caret after inserted text
    const newPos = start + truncated.length;
    textarea.setSelectionRange(newPos, newPos);
    updateCounter();
  }
}

// Init
textarea.addEventListener('input', handleInput);
textarea.addEventListener('paste', handlePaste);

// set initial state
updateCounter();

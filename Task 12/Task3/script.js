// Configuration
const INTERVAL_MS = 3000;

// Image set (at least 5). Replace URLs if you want custom images.
const IMAGES = [
  { src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop', alt: 'Mountain lake at sunrise', caption: 'Mountain lake at sunrise' },
  { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop', alt: 'Forest path', caption: 'Quiet forest path' },
  { src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop', alt: 'Desert dunes', caption: 'Golden desert dunes' },
  { src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop', alt: 'City skyline', caption: 'City skyline at dusk' },
  { src: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1200&auto=format&fit=crop', alt: 'Beach waves', caption: 'Soothing beach waves' }
];

const imgEl = document.getElementById('carouselImg');
const captionEl = document.getElementById('caption');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');
const carousel = document.getElementById('carousel');

let current = 0;
let timer = null;

// Preload images
IMAGES.forEach(i => { const p = new Image(); p.src = i.src; });

// Build indicators
function buildIndicators() {
  indicatorsContainer.innerHTML = '';
  IMAGES.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.className = 'indicator';
    dot.setAttribute('aria-label', `Go to image ${idx + 1}`);
    dot.addEventListener('click', () => goTo(idx));
    indicatorsContainer.appendChild(dot);
  });
}

// Update display
function render() {
  const item = IMAGES[current];
  imgEl.src = item.src;
  imgEl.alt = item.alt || '';
  captionEl.textContent = item.caption || '';
  // indicators
  Array.from(indicatorsContainer.children).forEach((el, idx) => {
    el.classList.toggle('active', idx === current);
  });
}

// Navigation
function next() { current = (current + 1) % IMAGES.length; render(); }
function prev() { current = (current - 1 + IMAGES.length) % IMAGES.length; render(); }
function goTo(idx) { current = idx % IMAGES.length; render(); resetTimer(); }

// Auto-advance
function startTimer() {
  stopTimer();
  timer = setInterval(next, INTERVAL_MS);
}
function stopTimer() {
  if (timer) { clearInterval(timer); timer = null; }
}
function resetTimer() {
  stopTimer();
  startTimer();
}

// Pause on hover (bonus)
carousel.addEventListener('mouseenter', () => stopTimer());
carousel.addEventListener('mouseleave', () => startTimer());

// Wire buttons
nextBtn.addEventListener('click', () => { next(); resetTimer(); });
prevBtn.addEventListener('click', () => { prev(); resetTimer(); });

// Keyboard support (optional): left/right
carousel.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') { next(); resetTimer(); }
  if (e.key === 'ArrowLeft') { prev(); resetTimer(); }
});

// Init
buildIndicators();
render();
startTimer();

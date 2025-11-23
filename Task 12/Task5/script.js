// Product data (>=10 items)
const PRODUCTS = [
  { id: 1, name: 'Wireless Headphones', category: 'electronics', price: '₹2,499' },
  { id: 2, name: 'Smartphone X200', category: 'electronics', price: '₹18,999' },
  { id: 3, name: 'Bluetooth Speaker', category: 'electronics', price: '₹1,299' },
  { id: 4, name: 'Men\'s Denim Jacket', category: 'clothing', price: '₹1,599' },
  { id: 5, name: 'Women\'s Kurta', category: 'clothing', price: '₹899' },
  { id: 6, name: 'Running Shoes', category: 'clothing', price: '₹2,199' },
  { id: 7, name: 'Hardcover Notebook', category: 'books', price: '₹299' },
  { id: 8, name: 'Cooking Essentials', category: 'books', price: '₹349' },
  { id: 9, name: 'Smartwatch Series 3', category: 'electronics', price: '₹6,499' },
  { id: 10, name: 'Formal Shirt', category: 'clothing', price: '₹749' },
  { id: 11, name: 'Noise-Cancelling Earbuds', category: 'electronics', price: '₹3,199' },
  { id: 12, name: 'Yoga Pants', category: 'clothing', price: '₹999' }
];

const productList = document.getElementById('productList');
const noResults = document.getElementById('noResults');
const filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
const searchBox = document.getElementById('searchBox');

let currentCategory = 'all';
let currentQuery = '';

// Render products according to currentCategory and currentQuery
function renderProducts() {
  const q = currentQuery.trim().toLowerCase();
  const filtered = PRODUCTS.filter(p => {
    const matchCategory = currentCategory === 'all' ? true : p.category === currentCategory;
    const matchQuery = q === '' ? true : (p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    return matchCategory && matchQuery;
  });

  productList.innerHTML = '';

  if (filtered.length === 0) {
    noResults.hidden = false;
    return;
  }
  noResults.hidden = true;

  filtered.forEach(p => {
    const li = document.createElement('li');
    li.className = 'product';
    li.dataset.id = p.id;

    // highlight matched part in name (simple)
    const nameHtml = highlightMatch(p.name, q);

    li.innerHTML = `
      <div class="p-title">${nameHtml}</div>
      <div class="p-meta">${capitalize(p.category)} • ${p.price}</div>
    `;
    productList.appendChild(li);
  });
}

// Utilities
function capitalize(s){ return s.charAt(0).toUpperCase() + s.slice(1); }

function highlightMatch(text, q){
  if (!q) return escapeHtml(text);
  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return escapeHtml(text);
  const before = escapeHtml(text.slice(0, idx));
  const match = escapeHtml(text.slice(idx, idx + q.length));
  const after = escapeHtml(text.slice(idx + q.length));
  return `${before}<span class="highlight">${match}</span>${after}`;
}
function escapeHtml(str){ return str.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

// Wire filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.cat;
    renderProducts();
  });
});

// Live search
searchBox.addEventListener('input', (e) => {
  currentQuery = e.target.value;
  renderProducts();
});

// Init
renderProducts();

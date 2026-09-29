(() => {
  const filters = document.querySelector('.filters');
  const grid = document.querySelector('#product-grid');
  if (!filters || !grid) return;
  const products = [...grid.querySelectorAll('.product-card')];
  const requestedSearch = new URLSearchParams(window.location.search).get('q');
  if (requestedSearch) {
    const searchInput = document.querySelector('#search-input');
    searchInput.value = requestedSearch;
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
  }
  const topbar = document.querySelector('.topbar');
  if (topbar) topbar.textContent = 'VOLTIX · PREMIUM ELECTRONICS COLLECTION';
  document.querySelector('.newsletter')?.remove();
  document.querySelector('.analytics')?.closest('.section')?.remove();
  document.querySelector('.whatsapp')?.closest('.section')?.remove();
  document.querySelectorAll('a[href^="https://instagram.com"]').forEach(link => link.remove());
  const rangeLabel = document.createElement('label');
  rangeLabel.className = 'price-filter';
  rangeLabel.innerHTML = 'Maximum price <input type="range" min="1000" max="60000" step="1000" value="60000" aria-label="Maximum product price"><output>₹60,000</output>';
  filters.append(rangeLabel);
  const range = rangeLabel.querySelector('input');
  const output = rangeLabel.querySelector('output');
  const applyPrice = () => {
    const maximum = Number(range.value);
    output.textContent = `₹${new Intl.NumberFormat('en-IN').format(maximum)}`;
    products.forEach(card => {
      if (Number(card.dataset.price) > maximum) card.hidden = true;
    });
    const visible = products.filter(card => !card.hidden).length;
    document.querySelector('#result-count').textContent = `${visible} ${visible === 1 ? 'product' : 'products'}`;
  };
  range.addEventListener('input', () => {
    document.querySelector('#search-input').dispatchEvent(new Event('input', { bubbles: true }));
    applyPrice();
  });
  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => requestAnimationFrame(applyPrice)));
  document.querySelector('#search-input').addEventListener('input', () => requestAnimationFrame(applyPrice));
  document.querySelectorAll('[data-category-link]').forEach(link => link.addEventListener('click', () => requestAnimationFrame(applyPrice)));
  products.forEach(card => {
    const anchor = document.createElement('a');
    anchor.className = 'whatsapp-order';
    anchor.target = '_blank';
    anchor.rel = 'noopener';
    anchor.textContent = 'Order via WhatsApp ↗';
    anchor.href = `https://wa.me/919876543210?text=${encodeURIComponent(`Hi Voltix, I would like to order ${card.dataset.name}.`)}`;
    card.querySelector('.product-info').append(anchor);
  });
  const style = document.createElement('style');
  style.textContent = '.price-filter{display:flex;align-items:center;gap:8px;font-size:11px;color:var(--muted)}.price-filter input{width:130px;accent-color:var(--lime)}.price-filter output{color:var(--white);white-space:nowrap}.whatsapp-order{display:inline-block;margin-top:8px;color:var(--lime);font-size:10px}.product-card[hidden]{display:none!important}@media(max-width:620px){.price-filter{width:100%;justify-content:space-between}.price-filter input{flex:1}}';
  document.head.append(style);
})();
(() => {
  const rows = document.querySelectorAll('#inventory-list tr');
  rows.forEach(row => row.querySelector('[data-restock]').addEventListener('click', () => {
    const stock = Number(row.dataset.stock) + 5;
    row.dataset.stock = stock;
    row.querySelector('.stock').textContent = stock;
    row.querySelector('.stock-status').textContent = stock < 8 ? 'Low stock' : 'In stock';
    document.querySelector('#inventory-feedback').textContent = `${row.cells[0].textContent} stock updated to ${stock}. Change stored in this page only.`;
  }));
  const style = document.createElement('style');
  style.textContent = '.page-voltix .page-brand{border-color:#303739}.page-voltix .page-brand span,.page-voltix .page-eyebrow{color:#cdf264}.page-voltix .page-hero p,.page-voltix .page-card p{color:#9ca5a3}.page-voltix .page-section{border-color:#303739}.metric-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.page-voltix .metric-grid strong{display:block;font-size:32px;margin:8px 0}.sales-heading{display:flex;justify-content:space-between;align-items:end;gap:14px}.sales-heading h2{margin:8px 0}.sales-chart{height:280px;display:grid;grid-template-columns:repeat(6,1fr);align-items:end;gap:12px;padding:18px;background:#1b2022}.sales-chart div{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:end;gap:6px}.sales-chart i{height:var(--bar);width:min(52px,80%);background:#cdf264;display:block}.sales-chart span,.sales-chart small{font-size:12px;color:#c2cbc8}.inventory-table-wrap{overflow:auto}.inventory-table{width:100%;min-width:690px;border-collapse:collapse;background:#1b2022}.inventory-table th,.inventory-table td{padding:13px;text-align:left;border-bottom:1px solid #303739}.inventory-table th{color:#cdf264}.inventory-table button{background:#cdf264;border:0;padding:9px 10px;color:#111416;cursor:pointer}.inventory-feedback{min-height:1.5em;color:#cdf264}@media(max-width:760px){.metric-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.sales-chart{height:230px;gap:6px;padding:12px}}@media(max-width:420px){.metric-grid{grid-template-columns:1fr}}';
  document.head.append(style);
})();
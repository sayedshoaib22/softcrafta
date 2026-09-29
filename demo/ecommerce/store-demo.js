(() => {
  const productData = {
    'linen-shirt': { name: 'Sunday Linen Shirt', price: 1890, category: 'tops', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80' },
    'straight-jean': { name: 'Everyday Straight Jean', price: 2280, category: 'bottoms', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80' },
    'soft-structure-tee': { name: 'Soft Structure Tee', price: 990, category: 'tops', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80' },
    'weekend-utility-jacket': { name: 'Weekend Utility Jacket', price: 3490, category: 'layers', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80' },
    'easy-pleat-trouser': { name: 'Easy Pleat Trouser', price: 2390, category: 'bottoms', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80' },
    'carry-all-canvas-tote': { name: 'Carry-All Canvas Tote', price: 790, category: 'accessories', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80' },
    'sunday-stripe-knit': { name: 'Sunday Stripe Knit', price: 1790, category: 'tops', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80' },
    'everyday-overshirt': { name: 'The Everyday Overshirt', price: 2890, category: 'layers', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80' },
    'weekend-knit': { name: 'Weekend Cotton Knit', price: 1690, category: 'tops', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80' },
    'city-overshirt': { name: 'City Overshirt', price: 2890, category: 'layers', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80' },
    'everyday-tote': { name: 'Everyday Canvas Tote', price: 990, category: 'accessories', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80' },
    'relaxed-trouser': { name: 'Relaxed Pleat Trouser', price: 2290, category: 'bottoms', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80' }
  };
  const money = amount => `₹${new Intl.NumberFormat('en-IN').format(amount)}`;
  const read = key => {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
  };
  const write = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  };
  let cart = read('urbanthreadCart');
  if (!Array.isArray(cart)) cart = [];
  const saveCart = () => write('urbanthreadCart', cart);
  const addProduct = id => {
    const product = productData[id];
    if (!product) return;
    const item = cart.find(entry => entry.id === id);
    if (item) item.quantity += 1;
    else cart.push({ id, quantity: 1 });
    saveCart();
    const status = document.querySelector('#product-status');
    if (status) status.textContent = `${product.name} added to your demo bag.`;
    const cartCount = document.querySelector('#cart-count');
    if (cartCount) cartCount.textContent = cart.reduce((total, entry) => total + entry.quantity, 0);
  };
  const renderCatalogue = () => {
    const grid = document.querySelector('#catalogue-grid');
    if (!grid) return;
    const search = document.querySelector('#catalogue-search');
    const count = document.querySelector('#catalogue-count');
    let category = 'all';
    search.value = new URLSearchParams(window.location.search).get('q') || '';
    const update = () => {
      let shown = 0;
      grid.querySelectorAll('[data-id]').forEach(card => {
        const visible = (category === 'all' || card.dataset.category === category) && card.dataset.name.toLowerCase().includes(search.value.trim().toLowerCase());
        card.hidden = !visible;
        if (visible) shown += 1;
      });
      count.textContent = `${shown} ${shown === 1 ? 'piece' : 'pieces'}`;
    };
    search.addEventListener('input', update);
    document.querySelectorAll('.catalogue-filters [data-category]').forEach(button => button.addEventListener('click', () => {
      category = button.dataset.category;
      document.querySelectorAll('.catalogue-filters [data-category]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      update();
    }));
    grid.addEventListener('click', event => {
      const button = event.target.closest('[data-add-product]');
      if (button) addProduct(button.dataset.addProduct);
    });
    update();
  };
  const renderCart = () => {
    const lines = document.querySelector('#cart-lines');
    if (!lines) return;
    lines.replaceChildren();
    let total = 0;
    cart.forEach(item => {
      const product = productData[item.id];
      if (!product) return;
      total += product.price * item.quantity;
      const card = document.createElement('article');
      card.className = 'page-card cart-line';
      const image = document.createElement('img');
      image.src = product.image;
      image.alt = product.name;
      image.loading = 'lazy';
      const title = document.createElement('h2');
      title.textContent = product.name;
      const price = document.createElement('p');
      price.textContent = `${money(product.price)} each · Quantity ${item.quantity}`;
      const controls = document.createElement('div');
      controls.className = 'cart-controls';
      [['−', -1, 'Decrease quantity'], ['+', 1, 'Increase quantity']].forEach(([label, change, description]) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = label;
        button.setAttribute('aria-label', `${description} of ${product.name}`);
        button.addEventListener('click', () => {
          item.quantity += change;
          if (item.quantity < 1) cart = cart.filter(entry => entry.id !== item.id);
          saveCart();
          renderCart();
        });
        controls.append(button);
      });
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = 'Remove';
      remove.addEventListener('click', () => {
        cart = cart.filter(entry => entry.id !== item.id);
        saveCart();
        renderCart();
      });
      controls.append(remove);
      card.append(image, title, price, controls);
      lines.append(card);
    });
    document.querySelector('#cart-subtotal').textContent = money(total);
    document.querySelector('#cart-status').textContent = cart.length ? '' : 'Your bag is empty. Browse the catalogue to add a piece.';
  };
  const renderCheckout = () => {
    const summary = document.querySelector('#checkout-summary');
    if (!summary) return;
    summary.replaceChildren();
    let total = 0;
    cart.forEach(item => {
      const product = productData[item.id];
      if (!product) return;
      total += product.price * item.quantity;
      const line = document.createElement('p');
      line.textContent = `${product.name} × ${item.quantity} · ${money(product.price * item.quantity)}`;
      summary.append(line);
    });
    document.querySelector('#checkout-total').textContent = money(total);
    document.querySelector('#checkout-form').addEventListener('submit', event => {
      event.preventDefault();
      const status = document.querySelector('#checkout-status');
      if (!cart.length) {
        status.textContent = 'Your bag is empty. Add an item before placing a demo order.';
        return;
      }
      const details = new FormData(event.currentTarget);
      const order = {
        id: `UT-${Date.now().toString().slice(-7)}`,
        date: new Date().toLocaleDateString('en-IN'),
        items: cart.map(item => ({ ...item })),
        total,
        payment: details.get('payment'),
        status: 'Demo order received'
      };
      const orders = read('urbanthreadOrders');
      orders.unshift(order);
      write('urbanthreadOrders', orders);
      cart = [];
      saveCart();
      status.textContent = 'Demo order created. No payment was processed.';
      const confirmation = document.querySelector('#order-confirmation');
      confirmation.hidden = false;
      confirmation.textContent = `Order ${order.id} is recorded in this browser's demo order list.`;
      const link = document.createElement('a');
      link.className = 'page-button';
      link.href = 'orders.html';
      link.textContent = 'View order management';
      confirmation.append(link);
      event.currentTarget.reset();
    });
  };
  const renderAccount = () => {
    const form = document.querySelector('#account-form');
    if (!form) return;
    let customer = {};
    try { customer = JSON.parse(localStorage.getItem('urbanthreadCustomer') || '{}'); } catch {}
    form.elements.name.value = customer.name || '';
    form.elements.email.value = customer.email || '';
    form.addEventListener('submit', event => {
      event.preventDefault();
      write('urbanthreadCustomer', { name: form.elements.name.value, email: form.elements.email.value });
      document.querySelector('#account-status').textContent = 'Customer details saved in this browser only. No online account was created.';
    });
  };
  const renderOrders = () => {
    const list = document.querySelector('#orders-list');
    if (!list) return;
    const orders = read('urbanthreadOrders');
    document.querySelector('#orders-empty').hidden = orders.length > 0;
    orders.forEach(order => {
      const row = document.createElement('tr');
      const values = [order.id, order.date, order.items.map(item => `${productData[item.id]?.name || 'Clothing'} × ${item.quantity}`).join(', '), order.payment, money(order.total), order.status];
      values.forEach(value => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.append(cell);
      });
      list.append(row);
    });
  };
  const productId = new URLSearchParams(window.location.search).get('item');
  if (productId && productData[productId]) {
    const product = productData[productId];
    const title = document.querySelector('#product-title');
    if (title) title.textContent = product.name;
    const image = document.querySelector('#product-image');
    if (image) { image.src = product.image; image.alt = `${product.name}, ${product.category} clothing` ; }
    const price = document.querySelector('#product-price');
    if (price) price.textContent = money(product.price);
    const addButton = document.querySelector('#add-detail-product');
    if (addButton) addButton.dataset.addProduct = productId;
  }
  document.querySelector('#add-detail-product')?.addEventListener('click', event => addProduct(event.currentTarget.dataset.addProduct));
  renderCatalogue();
  renderCart();
  renderCheckout();
  renderAccount();
  renderOrders();

  if (window.location.pathname.endsWith('/ecommerce/index.html')) {
    const announcement = document.querySelector('.announcement');
    if (announcement) announcement.textContent = 'The UrbanThread collection · Mumbai';
    document.querySelector('.newsletter')?.remove();
    document.querySelectorAll('.heart').forEach(button => button.remove());
    document.querySelectorAll('a[href^="https://instagram.com"],a[href^="https://wa.me/"]').forEach(link => link.remove());
    document.querySelectorAll('.product-card').forEach(card => {
      const name = card.dataset.name;
      const product = Object.entries(productData).find(([, details]) => details.name === name);
      if (!product) return;
      const link = document.createElement('a');
      link.href = `product-details.html?item=${product[0]}`;
      link.textContent = 'View product details';
      card.querySelector('.product-info')?.prepend(link);
    });
    document.querySelectorAll('.add').forEach(button => button.addEventListener('click', () => {
      const card = button.closest('.product-card');
      const match = Object.entries(productData).find(([, details]) => details.name === card?.dataset.name);
      if (match) addProduct(match[0]);
    }));
    document.querySelector('.cart-button')?.addEventListener('click', () => { window.location.href = 'cart.html'; });
  }
  const style = document.createElement('style');
  style.textContent = '.catalogue-filters{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:18px 0}.catalogue-filters button,.cart-controls button{padding:9px 12px;border:1px solid #b8afa5;background:transparent;color:var(--ink);cursor:pointer}.catalogue-filters button[aria-pressed="true"]{background:var(--ink);color:var(--paper)}.page-store .page-card h2{font-size:22px}.page-store .page-card button[data-add-product]{display:block;margin-top:12px;padding:10px 14px;background:var(--ink);color:var(--paper);border:0;cursor:pointer}.cart-summary{margin-top:20px;max-width:460px}.cart-summary p{display:flex;justify-content:space-between;gap:20px}.cart-controls{display:flex;gap:8px;flex-wrap:wrap}.order-table-wrap{overflow-x:auto}.order-table{width:100%;border-collapse:collapse;min-width:680px;background:#fff}.order-table th,.order-table td{text-align:left;padding:13px;border-bottom:1px solid #ddd}.order-table th{background:var(--soft)}.page-store fieldset{display:grid;gap:9px;border:1px solid #b8afa5;padding:14px}.page-store fieldset label{display:flex;grid-template-columns:auto 1fr;align-items:center;gap:8px}@media(max-width:600px){.catalogue-filters{align-items:flex-start}.cart-line{grid-template-columns:1fr}}';
  document.head.append(style);
})();
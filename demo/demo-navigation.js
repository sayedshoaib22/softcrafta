(() => {
  const demoName = window.location.pathname.split('/').filter(Boolean).slice(-2, -1)[0];
  const pages = {
    'portfolio-website': [['Home', 'index.html'], ['About', 'about.html'], ['Work', 'work.html'], ['Contact', 'contact.html']],
    'business-website': [['Home', 'index.html'], ['About', 'about.html'], ['Services', 'services.html'], ['Team', 'team.html'], ['Menu', 'menu.html'], ['Contact', 'contact.html'], ['Location', 'location.html']],
    'professional-website': [['Home', 'index.html'], ['About', 'about.html'], ['Services', 'services.html'], ['Service details', 'service-details.html'], ['Portfolio', 'portfolio.html'], ['Case study', 'case-study.html'], ['Team', 'team.html'], ['Blog', 'blog.html'], ['Article', 'blog-post.html'], ['Contact', 'contact.html']],
    'premium-website': [['Home', 'index.html'], ['Residences', 'residences.html'], ['Property details', 'property-details.html']],
    ecommerce: [['Home', 'index.html'], ['Catalogue', 'catalogue.html'], ['Product', 'product-details.html'], ['Cart', 'cart.html'], ['Checkout', 'checkout.html'], ['Account', 'account.html'], ['Orders', 'orders.html']],
    'premium-ecommerce': [['Store', 'index.html'], ['Inventory & analytics', 'inventory.html']],
    'booking-website': [['Home', 'index.html#home'], ['Services', 'index.html#services'], ['Pricing', 'index.html#pricing'], ['Booking', 'index.html#booking'], ['Appointment management', 'index.html#appointment-management'], ['Contact', 'index.html#contact']]
  };
  const links = pages[demoName] || [];
  const nav = document.createElement('nav');
  nav.className = 'softcrafta-demo-nav';
  nav.setAttribute('aria-label', 'Demo pages');
  nav.innerHTML = `<a class="softcrafta-back" href="../../website-development.html">← Back to SoftCrafta</a><div class="softcrafta-pages">${links.map(([label, href]) => `<a href="${href}"${window.location.pathname.endsWith(`/${href}`) ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</div>`;
  const style = document.createElement('style');
  style.textContent = '.softcrafta-demo-nav{position:relative;z-index:20;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:10px max(22px,calc((100vw - 1280px)/2));background:#17201c;color:#f7f5ee;font:12px/1.4 Arial,sans-serif}.softcrafta-demo-nav a{color:inherit;text-decoration:none;white-space:nowrap}.softcrafta-demo-nav a:hover,.softcrafta-demo-nav a[aria-current="page"]{text-decoration:underline;text-underline-offset:4px}.softcrafta-back{font-weight:700}.softcrafta-pages{display:flex;gap:18px;overflow-x:auto;scrollbar-width:thin}.softcrafta-pages a{padding:4px 0}@media(max-width:700px){.softcrafta-demo-nav{align-items:flex-start;flex-direction:column;gap:8px;padding:10px 16px}.softcrafta-pages{width:100%;gap:16px}}';
  document.head.append(style);
  const pageStyle = document.createElement('style');
  pageStyle.textContent = '.page-map{min-height:280px;overflow:hidden;background:var(--soft)}.page-map iframe{display:block;width:100%;height:320px;border:0}.page-card[style*="grid-column:span 2"]{grid-column:span 2}body.page-site h1{font-size:42px}body.page-site h2{font-size:28px}@media(min-width:900px){body.page-site h1{font-size:64px}body.page-site h2{font-size:38px}}@media(max-width:760px){.page-card[style*="grid-column:span 2"]{grid-column:1/-1}}';
  document.head.append(pageStyle);
  document.body.prepend(nav);

  if (demoName === 'landing-page') {
    const enquiryCopy = document.querySelector('#contact .section-head p');
    const enquiryLink = document.querySelector('#contact .actions a[href^="https://wa.me/"]');
    if (enquiryCopy) enquiryCopy.textContent = 'Drop in for a walk-through or ask us about your complimentary first session. Andheri East, Mumbai.';
    if (enquiryLink) {
      enquiryLink.href = 'https://wa.me/919876543210?text=Hi%20Ironcore%20Fitness%2C%20I%27d%20like%20to%20ask%20about%20a%20first%20session.';
      enquiryLink.textContent = 'Ask about a first session ↗';
    }
  }

  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const name = new FormData(form).get('name') || 'there';
      const status = form.querySelector('[role="status"]');
      if (status) status.textContent = `Thanks, ${name}. This frontend demo does not send or store your enquiry.`;
      form.reset();
    });
  });
})();
(() => {
  let robots = document.querySelector('meta[name="robots"]');
  if (!robots) {
    robots = document.createElement('meta');
    robots.name = 'robots';
    document.head.append(robots);
  }
  robots.content = 'noindex,follow';
  import('./client-navbar.js?v=7');
  return;

  const demoName = window.location.pathname.split('/').filter(Boolean).slice(-2, -1)[0];
  const clientPages = {
    'portfolio-website': { label: 'Aarav Visuals navigation', links: [['Home', 'index.html'], ['About', 'about.html'], ['Selected Work', 'work.html'], ['Contact', 'contact.html']] },
    'business-website': { label: 'The Urban Plate navigation', links: [['Home', 'index.html'], ['Menu', 'menu.html'], ['About', 'about.html'], ['Services', 'services.html'], ['Team', 'team.html'], ['Contact', 'contact.html'], ['Location', 'location.html']] },
    'professional-website': { label: 'Nexa Digital Studio navigation', links: [['Home', 'index.html'], ['About', 'about.html'], ['Services', 'services.html'], ['Service details', 'service-details.html'], ['Work', 'portfolio.html'], ['Case study', 'case-study.html'], ['Team', 'team.html'], ['Journal', 'blog.html'], ['Article', 'blog-post.html'], ['Contact', 'contact.html']] },
    'premium-website': { label: 'Aurelia Estates navigation', links: [['Properties', 'residences.html'], ['Locations', 'index.html#neighbourhoods'], ['About', 'index.html#approach'], ['Contact', 'index.html#contact']] },
    ecommerce: { label: 'UrbanThread navigation', links: [['Shop', 'catalogue.html'], ['Categories', 'catalogue.html'], ['New arrivals', 'index.html#shop'], ['Product', 'product-details.html'], ['Cart', 'cart.html'], ['Checkout', 'checkout.html'], ['Account', 'account.html'], ['Orders', 'orders.html']] },
    'premium-ecommerce': { label: 'Voltix navigation', links: [['Store', 'index.html'], ['Inventory & analytics', 'inventory.html']] }
  };
  const toolbar = document.createElement('div');
  toolbar.className = 'softcrafta-demo-toolbar';
  toolbar.innerHTML = '<a href="../../website-development.html">← Back to SoftCrafta</a>';
  const style = document.createElement('style');
  style.textContent = '.softcrafta-demo-toolbar{position:relative;z-index:20;display:flex;align-items:center;min-height:30px;padding:5px max(16px,calc((100vw - 1280px)/2));background:#f1f2ef;border-bottom:1px solid #d9ddd8;font:11px/1.4 Arial,sans-serif}.softcrafta-demo-toolbar a{color:#46534b;text-decoration:none;white-space:nowrap}.softcrafta-demo-toolbar a:hover{text-decoration:underline;text-underline-offset:3px}.client-page-nav{display:flex;align-items:center;gap:22px;max-width:100%;padding:11px max(20px,calc((100vw - 1100px)/2));overflow-x:auto;border-bottom:1px solid color-mix(in srgb,var(--ink,#222) 18%,transparent);font:12px/1.4 Arial,sans-serif;scrollbar-width:thin}.client-page-nav a{color:var(--ink,#222);text-decoration:none;white-space:nowrap}.client-page-nav a:hover,.client-page-nav a[aria-current="page"]{text-decoration:underline;text-underline-offset:4px}@media(max-width:760px){.client-page-nav{flex-wrap:wrap;gap:9px 16px;padding:10px 16px;overflow:visible}}';
  document.head.append(style);
  const mobileNavRules = {
    'landing-page': '.nav{height:auto;min-height:78px;flex-wrap:wrap;gap:10px 14px;padding:12px 0}.navlinks{display:flex!important;order:3;flex:1 0 100%;width:100%;justify-content:center;flex-wrap:wrap;gap:8px 14px}.nav-cta{margin-left:auto}',
    'business-website': '.nav{height:auto;min-height:78px;flex-wrap:wrap;gap:10px 14px;padding:12px 0}.nav nav[aria-label="Main navigation"]{display:flex!important;order:3;flex:1 0 100%;width:100%;justify-content:center;flex-wrap:wrap;gap:8px 16px}.nav .book{margin-left:auto}',
    'professional-website': '.nav{height:auto;min-height:78px;flex-wrap:wrap;gap:10px 14px;padding:12px 0}.nav nav[aria-label="Main navigation"]{display:flex!important;order:3;flex:1 0 100%;width:100%;justify-content:center;flex-wrap:wrap;gap:8px 15px}.nav-cta{margin-left:auto}',
    'premium-website': '.nav{height:auto;min-height:78px;flex-wrap:wrap;gap:10px 14px;padding:14px 0}.nav nav[aria-label="Main navigation"]{display:flex!important;order:3;flex:1 0 100%;width:100%;justify-content:center;flex-wrap:wrap;gap:8px 15px}.nav-cta{margin-left:auto}',
    'booking-website': '.nav{height:auto;min-height:78px;flex-wrap:wrap;gap:10px 14px;padding:12px 0}.nav nav[aria-label="Main navigation"]{display:flex!important;order:3;flex:1 0 100%;width:100%;justify-content:center;flex-wrap:wrap;gap:8px 15px}.nav-cta{margin-left:auto}',
    ecommerce: '.nav{height:auto;min-height:78px;flex-wrap:wrap;gap:10px 12px;padding:12px 0}.nav .logo{order:1}.nav .cart-button{order:2;margin-left:auto}.nav .nav-links{display:flex!important;order:3;flex:1 0 100%;width:100%;justify-content:center;flex-wrap:wrap;gap:8px 14px}.nav .search{order:4;flex:1 0 100%}',
    'premium-ecommerce': '.nav{height:auto;min-height:76px;flex-wrap:wrap;gap:10px 12px;padding:12px 0}.nav .brand{order:1}.nav .icon-btn{order:2;margin-left:auto}.nav .nav-links{display:flex!important;order:3;flex:1 0 100%;width:100%;justify-content:center;flex-wrap:wrap;gap:8px 14px}.nav .search{order:4;flex:1 0 100%}'
  };
  if (mobileNavRules[demoName]) {
    const mobileNavStyle = document.createElement('style');
    mobileNavStyle.textContent = `@media(max-width:${demoName === 'ecommerce' || demoName === 'premium-ecommerce' ? '900px' : '760px'}){${mobileNavRules[demoName]}}`;
    document.head.append(mobileNavStyle);
  }
  const pageStyle = document.createElement('style');
  pageStyle.textContent = '.page-map{min-height:280px;overflow:hidden;background:var(--soft)}.page-map iframe{display:block;width:100%;height:320px;border:0}.page-card[style*="grid-column:span 2"]{grid-column:span 2}body.page-site h1{font-size:42px}body.page-site h2{font-size:28px}@media(min-width:900px){body.page-site h1{font-size:64px}body.page-site h2{font-size:38px}}@media(max-width:760px){.page-card[style*="grid-column:span 2"]{grid-column:1/-1}}';
  document.head.append(pageStyle);
  document.body.prepend(toolbar);
  document.querySelectorAll('footer a[href="../../website-development.html"]').forEach(link => link.remove());

  const pageConfig = clientPages[demoName];
  const pageBrand = document.querySelector('.page-brand');
  if (pageConfig && pageBrand) {
    const clientNav = document.createElement('nav');
    clientNav.className = 'client-page-nav';
    clientNav.setAttribute('aria-label', pageConfig.label);
    clientNav.innerHTML = pageConfig.links.map(([label, href]) => {
      const target = new URL(href, window.location.href);
      const current = target.pathname === window.location.pathname && (!target.hash || target.hash === window.location.hash);
      return `<a href="${href}"${current ? ' aria-current="page"' : ''}>${label}</a>`;
    }).join('');
    pageBrand.after(clientNav);
  }

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
(() => {
  const demoName = window.location.pathname.split('/').filter(Boolean).slice(-2, -1)[0];
  const sites = {
    'landing-page': { label: 'Ironcore Fitness navigation', links: [['Home', '#home'], ['About', '#about'], ['Programs', '#programs'], ['Trainers', '#trainers'], ['Membership', '#membership'], ['Contact', '#contact']], cta: ['JOIN THE CLUB', '#membership'], tone: ['#11120f', '#f1f0e9'] },
    'portfolio-website': { label: 'Aarav Visuals navigation', links: [['Home', 'index.html'], ['About', 'about.html'], ['Work', 'work.html'], ['Contact', 'contact.html']], cta: ['Enquire', 'contact.html'], tone: ['#f3f1ec', '#20201d'] },
    'business-website': { label: 'The Urban Plate navigation', links: [['Home', 'index.html'], ['About', 'about.html'], ['Services', 'services.html'], ['Menu', 'menu.html'], ['Team', 'team.html'], ['Location', 'location.html'], ['Contact', 'contact.html']], cta: ['Contact', 'contact.html'], tone: ['#f7f2e9', '#18362e'] },
    'professional-website': { label: 'Nexa Digital Studio navigation', links: [['Home', 'index.html'], ['About', 'about.html'], ['Services', 'services.html'], ['Portfolio', 'portfolio.html'], ['Case Studies', 'case-study.html'], ['Blog', 'blog.html'], ['Team', 'team.html'], ['Contact', 'contact.html']], cta: ['Contact', 'contact.html'], tone: ['#edf0e8', '#18231f'] },
    'premium-website': { label: 'Aurelia Estates navigation', links: [['Home', 'index.html#home'], ['Properties', 'residences.html'], ['Locations', 'index.html#neighbourhoods'], ['About', 'index.html#approach'], ['Contact', 'index.html#contact']], cta: ['View Properties', 'residences.html'], tone: ['#171b18', '#f4f1e8'] },
    'booking-website': { label: 'Lumière Beauty Studio navigation', links: [['Home', '#home'], ['Services', '#services'], ['Pricing', '#pricing'], ['Booking', '#booking'], ['About', '#stylists'], ['Contact', '#contact']], cta: ['Book Appointment', '#booking'], tone: ['#f8f4f0', '#302925'] },
    ecommerce: { label: 'UrbanThread navigation', links: [['Home', 'index.html#home'], ['Shop', 'catalogue.html'], ['Categories', 'catalogue.html'], ['New Arrivals', 'index.html#shop'], ['About', 'index.html#about']], cta: null, tone: ['#faf8f4', '#252521'] },
    'premium-ecommerce': { label: 'Voltix navigation', links: [['Home', 'index.html#home'], ['Shop', 'index.html#products'], ['Categories', 'index.html#products'], ['Deals', 'index.html#deals'], ['About', 'index.html#about']], cta: null, tone: ['#111416', '#f4f5f1'] }
  };
  const site = sites[demoName];
  if (!site) return;

  const body = document.body;
  const pageBrand = body.querySelector(':scope > header.page-brand');
  const isSubpage = !!pageBrand;
  const outerHeader = body.querySelector(':scope > header:not(.page-brand)');
  const navbar = isSubpage ? pageBrand : (outerHeader?.querySelector('.nav') || outerHeader);
  if (!navbar) return;

  const toolbar = body.querySelector('.demo-toolbar, .softcrafta-demo-toolbar') || document.createElement('div');
  toolbar.className = 'demo-toolbar';
  toolbar.innerHTML = '<div class="demo-toolbar-inner" style="gap:14px"><span style="font-weight:700;color:#7c2d12">DEMO PREVIEW</span><a class="back-to-softcrafta" href="../../website-development.html">← Back to SoftCrafta</a></div>';
  body.prepend(toolbar);
  body.querySelectorAll('footer a[href="../../website-development.html"]').forEach(link => link.remove());

  document.querySelectorAll('nav.client-page-nav, .softcrafta-pages').forEach(nav => nav.remove());
  const nav = isSubpage ? document.createElement('nav') : navbar.querySelector('nav[aria-label], .navlinks, .nav-links');
  if (!nav) return;
  nav.classList.add('client-nav-links');
  nav.setAttribute('aria-label', site.label);
  nav.id = `client-links-${demoName}`;
  nav.replaceChildren();
  const currentFile = window.location.pathname.split('/').pop();
  const parentFile = {
    'professional-website': { 'service-details.html': 'services.html', 'blog-post.html': 'blog.html' },
    'premium-website': { 'property-details.html': 'residences.html' },
    ecommerce: { 'product-details.html': 'catalogue.html' },
    'premium-ecommerce': { 'inventory.html': 'index.html' }
  }[demoName]?.[currentFile] || currentFile;
  const navItems = demoName === 'premium-ecommerce' && isSubpage
    ? [...site.links, ['Inventory & analytics', 'inventory.html']]
    : site.links;
  navItems.forEach(([label, href]) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    const target = new URL(href, window.location.href);
    const targetFile = target.pathname.split('/').pop();
    const samePage = targetFile === parentFile;
    const isCatalogue = demoName === 'ecommerce' && currentFile === 'catalogue.html';
    const preferredLabel = isCatalogue ? 'Categories' : (demoName === 'ecommerce' && currentFile === 'product-details.html' ? 'Shop' : null);
    const active = samePage && (!preferredLabel || label === preferredLabel) && (!target.hash || target.hash === window.location.hash || (!window.location.hash && target.hash === '#home'));
    if (active) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
    nav.append(link);
  });

  const clientHeader = isSubpage ? pageBrand : outerHeader;
  clientHeader.classList.add('client-header');
  navbar.classList.add('client-navbar');
  navbar.style.setProperty('--client-nav-bg', site.tone[0]);
  navbar.style.setProperty('--client-nav-fg', site.tone[1]);
  if (demoName === 'premium-website' && !isSubpage) clientHeader.classList.add('client-header--overlay');

  if (isSubpage) {
    pageBrand.querySelector(':scope > span')?.remove();
    pageBrand.querySelector('a')?.classList.add('client-logo');
    pageBrand.append(nav);
  }

  let cta = isSubpage ? null : navbar.querySelector('.nav-cta, .book');
  if (site.cta) {
    if (!cta) {
      cta = document.createElement('a');
      navbar.append(cta);
    }
    cta.classList.add('client-nav-cta');
    cta.href = site.cta[1];
    cta.textContent = site.cta[0];
    cta.removeAttribute('target');
    cta.removeAttribute('rel');
  }

  const search = isSubpage && (demoName === 'ecommerce' || demoName === 'premium-ecommerce') ? document.createElement('form') : navbar.querySelector('#search-form');
  if (search) {
    search.classList.add('client-search');
    if (isSubpage) {
      search.setAttribute('role', 'search');
      search.innerHTML = '<input type="search" name="q" aria-label="Search products" placeholder="Search products"><button type="submit" aria-label="Search">Search</button>';
      search.addEventListener('submit', event => {
        event.preventDefault();
        const query = encodeURIComponent(search.elements.q.value);
        window.location.href = demoName === 'ecommerce' ? `catalogue.html?q=${query}` : `index.html?q=${query}#products`;
      });
      navbar.append(search);
    }
  }

  const cart = navbar.querySelector('#open-cart, .cart-button');
  if (cart) cart.classList.add('client-cart');
  if (isSubpage && (demoName === 'ecommerce' || demoName === 'premium-ecommerce')) {
    const cartLink = document.createElement('a');
    cartLink.className = 'client-nav-cta client-cart';
    cartLink.href = demoName === 'ecommerce' ? 'cart.html' : 'index.html?openCart=1#cart-drawer';
    cartLink.textContent = 'Cart';
    navbar.append(cartLink);
    if (demoName === 'ecommerce' && ['cart.html', 'checkout.html', 'account.html', 'orders.html'].includes(currentFile)) {
      cartLink.classList.add('active');
      cartLink.setAttribute('aria-current', 'page');
    }
  }
  if (demoName === 'premium-ecommerce') {
    document.querySelector('.category-bar')?.remove();
    const wishlist = document.createElement('a');
    wishlist.className = 'client-wishlist';
    wishlist.href = isSubpage ? 'index.html#products' : '#products';
    wishlist.textContent = 'Wishlist';
    if (cart) cart.before(wishlist);
    else navbar.append(wishlist);
    document.querySelector('footer')?.setAttribute('id', 'about');
    if (!isSubpage) {
      let showingWishlist = false;
      const cards = [...document.querySelectorAll('.product-card')];
      const searchInput = document.querySelector('#search-input');
      const resultCount = document.querySelector('#result-count');
      const updateWishlist = () => {
        if (showingWishlist) {
          cards.forEach(card => { card.hidden = card.querySelector('.wishlist')?.getAttribute('aria-pressed') !== 'true'; });
          const saved = cards.filter(card => !card.hidden).length;
          if (resultCount) resultCount.textContent = `${saved} saved ${saved === 1 ? 'product' : 'products'}`;
        } else {
          searchInput?.dispatchEvent(new Event('input', { bubbles: true }));
        }
      };
      wishlist.addEventListener('click', event => {
        event.preventDefault();
        showingWishlist = !showingWishlist;
        wishlist.setAttribute('aria-pressed', String(showingWishlist));
        wishlist.textContent = showingWishlist ? 'All products' : 'Wishlist';
        if (showingWishlist) document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        updateWishlist();
      });
      document.querySelector('#product-grid')?.addEventListener('click', event => {
        if (event.target.closest('.wishlist') && showingWishlist) requestAnimationFrame(updateWishlist);
      });
      document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => requestAnimationFrame(updateWishlist)));
      searchInput?.addEventListener('input', () => { if (showingWishlist) requestAnimationFrame(updateWishlist); });
    }
  }
  if (demoName === 'ecommerce') document.querySelector('footer')?.setAttribute('id', 'about');
  if (demoName === 'ecommerce' || demoName === 'premium-ecommerce') {
    const query = new URLSearchParams(window.location.search).get('q');
    const searchSelector = demoName === 'ecommerce' && window.location.pathname.endsWith('/catalogue.html')
      ? '#catalogue-search'
      : (isSubpage ? '.client-search input' : '#search-input');
    const searchInput = document.querySelector(searchSelector);
    if (query && searchInput) {
      searchInput.value = query;
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
  if (demoName === 'landing-page') {
    const programs = document.querySelector('.feature-grid')?.closest('section');
    if (programs) programs.id = 'programs';
    const membership = document.querySelector('.section.plans');
    if (membership && !document.getElementById('membership')) {
      const anchor = document.createElement('span');
      anchor.id = 'membership';
      membership.prepend(anchor);
    }
    document.querySelectorAll('a[href="#plans"]').forEach(link => { link.href = '#membership'; });
    const enquiryCopy = document.querySelector('#contact .section-head p');
    const enquiryLink = document.querySelector('#contact .actions a[href^="https://wa.me/"]');
    if (enquiryCopy) enquiryCopy.textContent = 'Drop in for a walk-through or ask us about your complimentary first session. Andheri East, Mumbai.';
    if (enquiryLink) {
      enquiryLink.href = 'https://wa.me/919137958519?text=Hi%20Ironcore%20Fitness%2C%20I%27d%20like%20to%20ask%20about%20a%20first%20session.';
      enquiryLink.textContent = 'Ask about a first session ↗';
    }
  }
  if (demoName === 'booking-website') document.querySelector('#services .services')?.setAttribute('id', 'pricing');

  const toggle = document.createElement('button');
  toggle.className = 'mobile-menu-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Toggle navigation');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', nav.id);
  toggle.innerHTML = '<span></span><span></span><span></span>';
  navbar.querySelectorAll('.mobile-menu-toggle').forEach(button => button.remove());
  navbar.append(toggle);
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('click', event => {
    if (!navbar.contains(event.target)) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  const style = document.createElement('style');
  style.textContent = '.demo-toolbar{position:relative;z-index:2100;width:100%;min-height:30px;background:#f1f2ef;border-bottom:1px solid #d9ddd8;font:11px/1.4 Arial,sans-serif}.demo-toolbar-inner{width:min(1400px,calc(100% - 32px));min-height:30px;margin:0 auto;display:flex;align-items:center}.back-to-softcrafta{color:#46534b;text-decoration:none;white-space:nowrap}.back-to-softcrafta:hover{text-decoration:underline;text-underline-offset:3px}.client-header{z-index:1000;color:var(--client-nav-fg)}.client-navbar{position:relative;z-index:1000}.client-nav-links{display:flex!important;align-items:center;gap:clamp(12px,2vw,26px)}.client-nav-links a{display:inline-flex;align-items:center;text-decoration:none;white-space:nowrap;color:inherit}.client-nav-links a:hover,.client-nav-links a.active,.client-nav-cta.active{font-weight:700;text-decoration:underline;text-underline-offset:4px}.client-nav-cta{white-space:nowrap}.mobile-menu-toggle{display:none;align-items:center;justify-content:center;flex-direction:column;gap:5px;width:42px;height:42px;padding:8px;border:1px solid currentColor;background:transparent;color:inherit;cursor:pointer}.mobile-menu-toggle span{display:block;width:20px;height:2px;background:currentColor}.client-header--overlay{position:absolute!important;top:30px!important;left:0;right:0;z-index:1000!important}.client-page-header{gap:14px}.client-page-header>span{display:none}@media(min-width:769px){.client-nav-links{display:flex!important;position:static!important;visibility:visible!important;opacity:1!important;transform:none!important}.mobile-menu-toggle{display:none!important}}@media(max-width:768px){.client-header,.client-page-header{position:relative;z-index:1000}.client-header--overlay{position:absolute!important;top:30px!important}.client-navbar{height:auto!important;min-height:72px;flex-wrap:wrap;gap:10px 12px;padding:12px 16px}.client-navbar>.mobile-menu-toggle{display:flex;order:5;margin-left:0}.client-nav-links{display:none!important;position:absolute!important;top:100%;left:0;right:0;flex-direction:column;align-items:stretch;gap:0!important;padding:12px 18px!important;background:var(--client-nav-bg,#fff);color:var(--client-nav-fg,#222);z-index:2000;box-shadow:0 12px 22px rgba(0,0,0,.15)}.client-nav-links.is-open{display:flex!important}.client-nav-links a{min-height:42px;padding:10px 4px;border-bottom:1px solid color-mix(in srgb,var(--client-nav-fg,#222) 15%,transparent)}.client-nav-cta{order:3;margin-left:auto}.client-search{order:6;flex:1 0 100%;width:100%}.client-wishlist{order:2}.client-cart{order:4;margin-left:auto}.client-navbar .mobile-menu-toggle{order:5;margin-left:0}}';
  document.head.append(style);
  const pageLayoutStyle = document.createElement('style');
  pageLayoutStyle.textContent = '.page-map{min-height:280px;overflow:hidden;background:var(--soft)}.page-map iframe{display:block;width:100%;max-width:100%;height:320px;border:0}.page-card[style*="grid-column:span 2"]{grid-column:span 2}body.page-site h1{font-size:42px}body.page-site h2{font-size:28px}@media(min-width:900px){body.page-site h1{font-size:64px}body.page-site h2{font-size:38px}}@media(max-width:760px){.page-card[style*="grid-column:span 2"]{grid-column:1/-1}}@media(max-width:360px){body.page-site h1{font-size:34px}}';
  document.head.append(pageLayoutStyle);
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

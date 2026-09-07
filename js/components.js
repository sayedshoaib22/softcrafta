/* =============================================
   SOFTCRAFT AGENCY — SHARED COMPONENTS
   Header, Footer, WhatsApp Button
   ============================================= */

const WA_NUMBER = '919137958519';
const WA_DEFAULT_MSG = encodeURIComponent('Hi SoftCraft Agency, I would like to discuss a project. Please share more details.');

function waLink(msg) {
  const encoded = msg ? encodeURIComponent(msg) : WA_DEFAULT_MSG;
  return `https://wa.me/${WA_NUMBER}?text=${encoded}`;
}

const HEADER_HTML = `
<header class="site-header transparent" role="banner">
  <div class="container">
    <div class="header-inner">
      <a href="index.html" class="logo" aria-label="SoftCraft Agency Home">
        <img class="logo-image" src="images/logo-transparent.png" alt="SoftCraft Agency" />
      </a>

      <nav class="main-nav" role="navigation" aria-label="Main navigation">
        <a href="index.html" class="nav-link">Home</a>

        <div class="nav-dropdown">
          <a href="services.html" class="nav-link">Services ▾</a>
          <div class="nav-dropdown-menu" role="menu">
            <a href="website-development.html" class="dropdown-item" role="menuitem">
              <div class="dropdown-icon icon-blue">🌐</div>
              <div><div style="font-weight:600;color:var(--text-primary);font-size:.8125rem">Website Development</div><div style="font-size:.75rem">Responsive, SEO-ready websites</div></div>
            </a>
            <a href="software-development.html" class="dropdown-item" role="menuitem">
              <div class="dropdown-icon icon-cyan">💻</div>
              <div><div style="font-weight:600;color:var(--text-primary);font-size:.8125rem">Software Development</div><div style="font-size:.75rem">Custom CRM, ERP, web apps</div></div>
            </a>
            <a href="ai-solutions.html" class="dropdown-item" role="menuitem">
              <div class="dropdown-icon icon-purple">🤖</div>
              <div><div style="font-weight:600;color:var(--text-primary);font-size:.8125rem">AI Solutions</div><div style="font-size:.75rem">Chatbots, automation, agents</div></div>
            </a>
            <a href="seo-digital-growth.html" class="dropdown-item" role="menuitem">
              <div class="dropdown-icon icon-green">📈</div>
              <div><div style="font-weight:600;color:var(--text-primary);font-size:.8125rem">SEO & Digital Growth</div><div style="font-size:.75rem">Search visibility & strategy</div></div>
            </a>
          </div>
        </div>

        <a href="portfolio.html" class="nav-link">Portfolio</a>
        <a href="team.html" class="nav-link">Team</a>
        <a href="pricing.html" class="nav-link">Pricing</a>
        <a href="about.html" class="nav-link">About</a>
        <a href="blog.html" class="nav-link">Blog</a>
        <a href="contact.html" class="nav-link">Contact</a>
      </nav>

      <div class="header-actions">
        <a href="${waLink()}" class="btn btn-outline btn-sm" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
          <span>💬</span> WhatsApp
        </a>
        <a href="contact.html" class="btn btn-primary btn-sm">Get a Free Quote</a>
      </div>

      <button class="hamburger" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<div class="mobile-menu" id="mobile-menu" role="dialog" aria-label="Mobile navigation">
  <nav class="mobile-nav" aria-label="Mobile navigation">
    <a href="index.html" class="mobile-nav-link">🏠 Home</a>
    <a href="services.html" class="mobile-nav-link">🧩 Services</a>

    <div class="mobile-nav-section">
      <div class="mobile-nav-section-title">Our Solutions</div>
      <a href="website-development.html" class="mobile-nav-link">🌐 Website Development</a>
      <a href="software-development.html" class="mobile-nav-link">💻 Software Development</a>
      <a href="ai-solutions.html" class="mobile-nav-link">🤖 AI Solutions</a>
      <a href="seo-digital-growth.html" class="mobile-nav-link">📈 SEO & Digital Growth</a>
    </div>

    <div class="mobile-nav-section">
      <a href="portfolio.html" class="mobile-nav-link">🗂️ Portfolio</a>
      <a href="team.html" class="mobile-nav-link">👥 Team</a>
      <a href="pricing.html" class="mobile-nav-link">💰 Pricing</a>
      <a href="about.html" class="mobile-nav-link">ℹ️ About</a>
      <a href="blog.html" class="mobile-nav-link">📝 Blog</a>
      <a href="contact.html" class="mobile-nav-link">📞 Contact</a>
    </div>
  </nav>

  <div class="mobile-actions">
    <a href="${waLink()}" class="btn btn-whatsapp" target="_blank" rel="noopener">
      <span>💬</span> Chat on WhatsApp
    </a>
    <a href="contact.html" class="btn btn-primary">Get a Free Quote</a>
  </div>
</div>
`;

const FOOTER_HTML = `
<footer class="site-footer" role="contentinfo">
  <div class="footer-main">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="logo" aria-label="SoftCraft Agency">
            <img class="logo-image" src="images/logo-transparent.png" alt="SoftCraft Agency" />
          </a>
          <p class="footer-tagline">Website • Software • AI • SEO</p>
          <p style="font-size:.875rem;color:var(--text-muted);line-height:1.65;margin-top:.75rem">
            We help businesses build professional websites, custom software, AI-powered systems and stronger digital foundations.
          </p>
          <div class="footer-contact-quick" style="margin-top:1.25rem;display:flex;flex-direction:column;gap:.5rem">
            <a href="tel:+919137958519" class="footer-contact-link">📞 +91 91379 58519</a>
            <a href="tel:+918097866106" class="footer-contact-link">📞 +91 80978 66106</a>
            <a href="mailto:softcrafta@gmail.com" class="footer-contact-link">✉️ softcrafta@gmail.com</a>
          </div>
        </div>

        <div class="footer-nav-group">
          <h3 class="footer-nav-title">Company</h3>
          <ul class="footer-nav-list">
            <li><a href="index.html" class="footer-nav-link">Home</a></li>
            <li><a href="services.html" class="footer-nav-link">Services</a></li>
            <li><a href="portfolio.html" class="footer-nav-link">Portfolio</a></li>
            <li><a href="team.html" class="footer-nav-link">Team</a></li>
            <li><a href="pricing.html" class="footer-nav-link">Pricing</a></li>
            <li><a href="about.html" class="footer-nav-link">About</a></li>
            <li><a href="blog.html" class="footer-nav-link">Blog</a></li>
            <li><a href="contact.html" class="footer-nav-link">Contact</a></li>
          </ul>
        </div>

        <div class="footer-nav-group">
          <h3 class="footer-nav-title">Services</h3>
          <ul class="footer-nav-list">
            <li><a href="website-development.html" class="footer-nav-link">Website Development</a></li>
            <li><a href="software-development.html" class="footer-nav-link">Software Development</a></li>
            <li><a href="ai-solutions.html" class="footer-nav-link">AI Solutions</a></li>
            <li><a href="seo-digital-growth.html" class="footer-nav-link">SEO & Digital Growth</a></li>
            <li><a href="services.html#ecommerce" class="footer-nav-link">E-commerce Development</a></li>
            <li><a href="services.html#automation" class="footer-nav-link">Automation & Integrations</a></li>
            <li><a href="services.html#uiux" class="footer-nav-link">UI/UX & Branding</a></li>
            <li><a href="services.html#support" class="footer-nav-link">Maintenance & Support</a></li>
          </ul>
        </div>

        <div class="footer-nav-group">
          <h3 class="footer-nav-title">Get in Touch</h3>
          <a href="${waLink()}" class="btn btn-whatsapp btn-sm" target="_blank" rel="noopener" style="margin-bottom:1rem;display:inline-flex">
            <span>💬</span> Chat on WhatsApp
          </a>
          <a href="contact.html" class="btn btn-outline btn-sm" style="display:inline-flex">
            Request a Free Quote
          </a>
          <div style="margin-top:1.5rem">
            <h4 style="font-size:.8125rem;font-weight:600;color:var(--text-muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:.75rem">Legal</h4>
            <ul class="footer-nav-list">
              <li><a href="privacy-policy.html" class="footer-nav-link">Privacy Policy</a></li>
              <li><a href="terms.html" class="footer-nav-link">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="container">
      <div class="footer-bottom-inner">
        <p style="font-size:.8125rem;color:var(--text-muted)">
          © 2026 SoftCraft Agency. All rights reserved.
        </p>
        <p style="font-size:.8125rem;color:var(--text-muted)">
          Built with care for businesses that mean business.
        </p>
      </div>
    </div>
  </div>
</footer>
`;

const FLOATING_WA_HTML = `
<a href="${waLink()}"
   class="floating-wa"
   target="_blank"
   rel="noopener"
   aria-label="Chat on WhatsApp"
   title="Chat on WhatsApp">
  <span aria-hidden="true">💬</span>
  <span class="floating-wa-tooltip">Chat on WhatsApp</span>
</a>
`;

// Inject components
document.addEventListener('DOMContentLoaded', () => {
  const headerEl = document.getElementById('site-header');
  if (headerEl) headerEl.outerHTML = HEADER_HTML;

  const footerEl = document.getElementById('site-footer');
  if (footerEl) footerEl.outerHTML = FOOTER_HTML;

  const waEl = document.getElementById('floating-wa');
  if (waEl) waEl.outerHTML = FLOATING_WA_HTML;

  const aiScript = document.createElement('script');
  aiScript.src = 'js/softcraft-ai.js';
  aiScript.defer = true;
  document.head.appendChild(aiScript);
});

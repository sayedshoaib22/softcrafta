/* =============================================
   SOFTCRAFT AGENCY — MAIN JAVASCRIPT
   Navigation, Interactions, Routing
   ============================================= */

'use strict';

// ---- Sticky Header ----
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
      header.classList.remove('transparent');
    } else {
      header.classList.remove('scrolled');
      header.classList.add('transparent');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ---- Mobile Menu ----
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburger || !mobileMenu) return;

  const openMenu = () => {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) closeMenu();
    else openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
  });
}

// ---- FAQ Accordion ----
function initFAQ(container) {
  if (!container) container = document;
  container.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      const isOpen = q.classList.contains('active');

      // Close all in same parent
      const parent = q.closest('.faq-list');
      if (parent) {
        parent.querySelectorAll('.faq-question').forEach(other => {
          other.classList.remove('active');
          const otherAnswer = other.nextElementSibling;
          if (otherAnswer) otherAnswer.classList.remove('open');
        });
      }

      if (!isOpen) {
        q.classList.add('active');
        if (answer) answer.classList.add('open');
      }
    });
  });
}

// ---- Tabs ----
function initTabs(container) {
  if (!container) container = document;
  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabGroup = btn.dataset.tabGroup;
      const target = btn.dataset.tab;
      const parent = btn.closest('[data-tabs-parent]') || document;

      // Update buttons
      parent.querySelectorAll(`.tab-btn[data-tab-group="${tabGroup}"]`).forEach(b => {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      // Update content
      parent.querySelectorAll(`.tab-content[data-tab-group="${tabGroup}"]`).forEach(c => {
        c.classList.remove('active');
      });
      const content = parent.querySelector(`.tab-content[data-tab="${target}"][data-tab-group="${tabGroup}"]`);
      if (content) content.classList.add('active');
    });
  });
}

// ---- Contact Form ----
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const showState = (state) => {
    form.querySelectorAll('.form-state').forEach(el => el.classList.remove('active'));
    const el = form.querySelector(`.form-state-${state}`);
    if (el) el.classList.add('active');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic client-side validation
    let valid = true;
    form.querySelectorAll('[required]').forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = 'var(--error)';
        valid = false;
      } else {
        input.style.borderColor = '';
      }
    });

    const emailInput = form.querySelector('[type="email"]');
    if (emailInput && emailInput.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      emailInput.style.borderColor = 'var(--error)';
      valid = false;
    }

    if (!valid) return;

    // Show loading
    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    try {
      // TODO: Replace with actual backend endpoint
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(Object.fromEntries(new FormData(form)))
      // });

      // Simulate for demo
      await new Promise(r => setTimeout(r, 1200));

      // Show success
      showState('success');
      form.reset();
    } catch (err) {
      showState('error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

// ---- Scroll Reveal ----
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ---- Smooth Scroll ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerH = 68;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Active Nav Link ----
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === path || (path === 'index.html' && href === '/') ||
        (path !== 'index.html' && href.includes(path.replace('.html', '')))) {
      link.classList.add('active');
    }
  });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  setActiveNav();
  initFAQ();
  initTabs();
  initContactForm();
  initScrollReveal();
});

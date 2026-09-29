/* =============================================
  SOFTCRAFTA — MAIN JAVASCRIPT
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
  const mobileLinks = mobileMenu?.querySelectorAll('a') || [];

  if (!hamburger || !mobileMenu) return;

  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const openMenu = () => {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    mobileMenu.hidden = false;
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
    const main = document.getElementById('main-content');
    if (main) main.inert = true;
    mobileMenu.querySelector(focusableSelector)?.focus();
  };

  const closeMenu = (restoreFocus = true) => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    mobileMenu.hidden = true;
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
    const main = document.getElementById('main-content');
    if (main) main.inert = false;
    if (restoreFocus) hamburger.focus();
  };

  hamburger.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) closeMenu();
    else openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => link.addEventListener('click', () => closeMenu(false)));

  document.addEventListener('keydown', (e) => {
    if (!mobileMenu.classList.contains('open')) return;
    if (e.key === 'Escape') {
      closeMenu();
      return;
    }
    if (e.key !== 'Tab') return;
    const focusable = [...mobileMenu.querySelectorAll(focusableSelector)];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

// ---- FAQ Accordion ----
function initFAQ(container) {
  if (!container) container = document;
  container.querySelectorAll('.faq-item').forEach((item, index) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    const answerId = `faq-answer-${index + 1}`;
    question.setAttribute('aria-controls', answerId);
    answer.id = answerId;
    answer.hidden = !question.classList.contains('active');
    answer.setAttribute('aria-hidden', question.classList.contains('active') ? 'false' : 'true');
    question.setAttribute('aria-expanded', question.classList.contains('active') ? 'true' : 'false');

    question.addEventListener('click', () => {
      const isOpen = question.classList.contains('active');
      const parent = question.closest('.faq-list');

      if (parent) {
        parent.querySelectorAll('.faq-question').forEach(other => {
          other.classList.remove('active');
          other.setAttribute('aria-expanded', 'false');
        });
        parent.querySelectorAll('.faq-answer').forEach(other => {
          other.classList.remove('open');
          other.hidden = true;
          other.setAttribute('aria-hidden', 'true');
        });
      }

      const shouldOpen = !isOpen;
      question.classList.toggle('active', shouldOpen);
      answer.classList.toggle('open', shouldOpen);
      answer.hidden = !shouldOpen;
      answer.setAttribute('aria-hidden', shouldOpen ? 'false' : 'true');
      question.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    });
  });
}

// ---- Tabs ----
function initTabs(container) {
  if (!container) container = document;
  const groups = new Map();
  container.querySelectorAll('.tab-btn[data-tab-group]').forEach(button => {
    const group = button.dataset.tabGroup;
    if (!groups.has(group)) groups.set(group, []);
    groups.get(group).push(button);
  });

  groups.forEach((buttons, group) => {
    const scope = buttons[0].closest('[data-tabs-scope]') || document;
    const panels = [...scope.querySelectorAll(`.tab-content[data-tab-group="${group}"]`)];
    const cards = group === 'blog' ? [...scope.querySelectorAll('.blog-card[data-blog-category]')] : [];

    const activate = (button, updateHash = false) => {
      const target = button.dataset.tab;
      buttons.forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        if (group === 'blog') item.setAttribute('aria-pressed', String(active));
        else {
          item.setAttribute('aria-selected', String(active));
          item.tabIndex = active ? 0 : -1;
        }
      });

      if (group === 'blog') {
        let visibleCount = 0;
        cards.forEach(card => {
          const visible = target === 'all-posts' || card.dataset.blogCategory === target;
          card.hidden = !visible;
          if (visible) visibleCount += 1;
        });
        if (visibleCount === 0) cards.forEach(card => { card.hidden = false; });
        return;
      }

      panels.forEach(panel => {
        const active = panel.dataset.tab === target;
        panel.classList.toggle('active', active);
        panel.hidden = !active;
      });

      if (updateHash && group === 'pricing') {
        history.replaceState(null, '', `${location.pathname}${location.search}#${target}`);
      }
    };

    const initialTarget = group === 'pricing'
      ? location.hash.slice(1)
      : '';
    activate(buttons.find(button => button.dataset.tab === initialTarget) || buttons.find(button => button.classList.contains('active')) || buttons[0]);

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => activate(button, true));
      if (button.getAttribute('role') !== 'tab') return;
      button.addEventListener('keydown', event => {
        let nextIndex = index;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % buttons.length;
        else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + buttons.length) % buttons.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = buttons.length - 1;
        else return;
        event.preventDefault();
        buttons[nextIndex].focus();
        activate(buttons[nextIndex], true);
      });
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

  const serviceSelect = form.querySelector('#service');
  const requestedService = new URLSearchParams(window.location.search).get('service')?.trim().slice(0, 100);
  if (serviceSelect && requestedService) {
    const normalizedRequest = requestedService.toLowerCase().replace(/[^a-z0-9]+/g, '');
    const matchingOption = [...serviceSelect.options].find(option => {
      const normalizedValue = option.value.toLowerCase().replace(/[^a-z0-9]+/g, '');
      const normalizedLabel = option.textContent.toLowerCase().replace(/\s*\([^)]*\)\s*/g, '').replace(/[^a-z0-9]+/g, '');
      return normalizedRequest === normalizedValue || normalizedRequest === normalizedLabel;
    });
    if (matchingOption) {
      serviceSelect.value = matchingOption.value;
    } else {
      const displayLabel = requestedService.replace(/[-_]+/g, ' ').replace(/\b\w/g, character => character.toUpperCase());
      serviceSelect.add(new Option(displayLabel, requestedService));
      serviceSelect.value = requestedService;
    }
  }

  form.addEventListener('submit', (e) => {
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
    showState('notice');
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

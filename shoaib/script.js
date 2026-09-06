// ==============================
// CUSTOM CURSOR
// ==============================
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        ring.style.left = e.clientX + 'px';
        ring.style.top = e.clientY + 'px';
    });
}

// ==============================
// SMOOTH SCROLL
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu
            mobileMenu.classList.remove('open');
        }
    });
});

// ==============================
// HEADER SCROLL
// ==============================
const header = document.getElementById('header');
const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 60);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// ==============================
// HAMBURGER MENU
// ==============================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

document.querySelectorAll('.m-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open navigation menu');
    });
});

// ==============================
// SCROLL REVEAL
// ==============================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(
    '.skill-item, .project-card, .contact-card, .about-grid, .agency-inner'
).forEach(el => {
    if (!prefersReducedMotion) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        revealObserver.observe(el);
    }
});

// Stagger cards
document.querySelectorAll('.skill-item, .project-card, .contact-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.08}s`;
});

// ==============================
// MAKE PROJECT CARDS CLICKABLE
// ==============================
document.querySelectorAll('.project-card').forEach(card => {
    const primaryLink = card.querySelector('.project-link-btn.primary');
    if (primaryLink) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a')) {
                window.open(primaryLink.href, '_blank', 'noopener,noreferrer');
            }
        });
    }
});

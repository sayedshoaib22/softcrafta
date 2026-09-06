/* =============================================
   SOFTCRAFT AGENCY — TEAM PAGE JS
   Scroll reveal, micro-interactions
   ============================================= */

'use strict';

(function initTeamPage() {

  // ── Scroll Reveal for team cards + value pills ──
  function initTeamReveal() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all immediately
      document.querySelectorAll('.team-reveal').forEach(el => {
        el.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.team-reveal').forEach(el => {
      observer.observe(el);
    });
  }

  // ── Stagger delay for cards within grid ──
  function applyCardDelays() {
    const cards = document.querySelectorAll('.team-grid .team-reveal');
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.08}s`;
    });

    const values = document.querySelectorAll('.values-grid .team-reveal');
    values.forEach((pill, i) => {
      pill.style.transitionDelay = `${i * 0.07}s`;
    });
  }

  // ── Particle animation positioning ──
  function positionParticles() {
    const particles = document.querySelectorAll('.particle');
    const positions = [10, 22, 38, 56, 74, 89];
    const delays    = [0, 4, 8, 2, 11, 6];
    const durations = [18, 22, 15, 20, 25, 17];

    particles.forEach((p, i) => {
      p.style.left            = `${positions[i] || Math.random() * 90}%`;
      p.style.bottom          = '0';
      p.style.animationDelay  = `${delays[i] || 0}s`;
      p.style.animationDuration = `${durations[i] || 18}s`;
    });
  }

  // ── Tilt effect on desktop for cards ──
  function initCardTilt() {
    // Only on devices with fine pointer (mouse)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    document.querySelectorAll('.team-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect   = card.getBoundingClientRect();
        const x      = e.clientX - rect.left;
        const y      = e.clientY - rect.top;
        const cx     = rect.width  / 2;
        const cy     = rect.height / 2;
        const rotateX = ((y - cy) / cy) * -4;  // max ±4deg
        const rotateY = ((x - cx) / cx) *  4;

        card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        card.style.transformStyle = 'preserve-3d';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transformStyle = '';
      });
    });
  }

  // ── Init all ──
  document.addEventListener('DOMContentLoaded', () => {
    applyCardDelays();
    positionParticles();

    // Short delay to let components.js inject header/footer first
    setTimeout(() => {
      initTeamReveal();
      initCardTilt();
    }, 50);
  });

})();

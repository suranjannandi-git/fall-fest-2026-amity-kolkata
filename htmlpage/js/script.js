/**
 * Qiskit Fall Fest 2026 — Amity University Kolkata
 * script.js — Vanilla JS only · No external dependencies
 * Features: hamburger nav, active nav link, scroll-reveal
 */

(function () {
  'use strict';

  /* ── DOM references ── */
  const header    = document.querySelector('.site-header');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const allLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id], div[id]');
  const reveals   = document.querySelectorAll('.reveal');

  /* ── Hamburger menu ── */
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  /* Close menu on nav-link click */
  navLinks.addEventListener('click', (e) => {
    if (e.target.matches('.nav-link')) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  /* Close menu when clicking outside */
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ── Active nav link highlight ── */
  function updateActiveLink() {
    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 90;
      if (window.scrollY >= top) current = sec.id;
    });
    allLinks.forEach((link) => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + current);
    });
  }

  /* ── Scroll-reveal (IntersectionObserver) ── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          /* Stagger siblings that are also entering view */
          const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
          let delay = 0;
          siblings.forEach((el) => {
            if (el === entry.target || isInViewport(el)) {
              setTimeout(() => el.classList.add('visible'), delay);
              delay += 80;
            }
          });
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
  );

  reveals.forEach((el) => revealObserver.observe(el));

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  /* ── Scroll event (throttled via rAF) ── */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* Run once on load */
  updateActiveLink();

})();

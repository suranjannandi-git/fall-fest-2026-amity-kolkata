/**
 * Qiskit Fall Fest 2026 — script.js
 * Vanilla JS only · No external dependencies
 * Features: hamburger nav, active nav, smooth scroll, scroll-reveal, hero canvas
 */

(function () {
  'use strict';

  /* ── DOM references ── */
  const header    = document.querySelector('.site-header');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const allLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');
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

  /* ── Sticky header shadow ── */
  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }

  /* ── Active nav link ── */
  function updateActiveLink() {
    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 80;
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
          /* Stagger children in same parent when they share .reveal */
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
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => revealObserver.observe(el));

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  /* ── Scroll event (throttled) ── */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateHeader();
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* Run once on load */
  updateHeader();
  updateActiveLink();

  /* ── Hero Particle Canvas ── */
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles, animId;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  /* Particle class */
  function Particle() {
    this.reset();
  }
  Particle.prototype.reset = function () {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.r  = Math.random() * 1.8 + 0.4;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.alpha = Math.random() * 0.5 + 0.2;
    /* Alternate purple/cyan */
    this.hue = Math.random() > 0.5 ? '105,41,196' : '0,212,228';
  };
  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W) this.vx *= -1;
    if (this.y < 0 || this.y > H) this.vy *= -1;
  };
  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + this.hue + ',' + this.alpha + ')';
    ctx.fill();
  };

  const PARTICLE_COUNT = 90;
  const CONNECTION_DIST = 120;

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(105,41,196,' + alpha + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p) => { p.update(); p.draw(); });
    drawConnections();
    animId = requestAnimationFrame(animate);
  }

  /* Pause animation when tab not visible (performance) */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animId);
    } else {
      animate();
    }
  });

  window.addEventListener('resize', () => {
    resize();
    particles.forEach((p) => p.reset());
  });

  init();
  animate();

})();

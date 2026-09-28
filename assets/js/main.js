/**
 * main.js — Global script for Medhavat Website
 * Full-Page Binary Greyscale CursorWave & Interactive Features
 */
import { CursorWave } from './cursor-wave.js';
import { applySavedTheme, initThemeHud, THEME_CW_COLORS, THEME_CW_BG } from './theme-hud.js';
import { initCookieConsent } from './cookie-consent.js';
import { initAnalytics, trackEvent } from './analytics.js';

/** @type {CursorWave|null} */
let cursorWaveInstance = null;

// Schedule non-critical initialization to run during idle periods after first paint (0ms TBT)
function runIdle(fn, timeout = 250) {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(() => fn(), { timeout });
  } else {
    setTimeout(fn, 60);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Critical fast-path: set data-theme immediately to prevent theme/style flash (<0.1ms)
  applySavedTheme();

  // 2. Critical UI: immediate click responsiveness for navbar and mobile drawer (<1ms)
  initNavbar();
  initMobileMenu();

  // 3. Non-critical deferred: canvas animation, HUD DOM, GDPR modal, counters & observers
  runIdle(() => {
    initThemeHud();
    initCookieConsent();
    initAnalytics();
    initGlobalCursorWave();
    initScrollReveal();
    initCounters();
    initContactForm();
    initFilterTabs();
    initRoadmapAnimation();
  });

  // Listen for dynamic theme changes to update CursorWave
  window.addEventListener('themechange', (e) => {
    if (cursorWaveInstance && e.detail) {
      cursorWaveInstance.updateColors(
        e.detail.colors,
        e.detail.backgroundColor,
        e.detail.originX,
        e.detail.originY
      );
    }
  });
});

/* ── Full-Page Global Binary CursorWave ────────────────────── */
function initGlobalCursorWave() {
  let container = document.getElementById('cw-global-canvas-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'cw-global-canvas-container';
    document.body.prepend(container);
  }

  // Get current theme colors
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'night-grey';
  const cwColors = THEME_CW_COLORS[currentTheme] || THEME_CW_COLORS['night-grey'];
  const cwBg = THEME_CW_BG[currentTheme] || THEME_CW_BG['night-grey'];

  try {
    cursorWaveInstance = new CursorWave(container, {
      shapes: ['0', '1'],
      colors: cwColors,
      backgroundColor: cwBg,
      cellSize: window.innerWidth < 768 ? 36 : 42,
      idleScale: 0.16,
      influenceRadiusVmin: window.innerWidth < 768 ? 44 : 36
    });
  } catch (e) {
    console.warn('CursorWave init error:', e);
  }
}

/* ── Navbar Scrolled State ────────────────────────────────── */
function initNavbar() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Mobile Menu Drawer ───────────────────────────────────── */
function initMobileMenu() {
  const hamburger = document.querySelector('.nav__hamburger');
  const drawer = document.querySelector('.nav__drawer');
  if (!hamburger || !drawer) return;

  const toggle = () => {
    const isOpen = drawer.classList.toggle('open');
    hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggle);

  drawer.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* ── Scroll Reveal ────────────────────────────────────────── */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '80px 0px' }
  );

  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      el.classList.add('reveal--pending');
      observer.observe(el);
    } else {
      el.classList.add('visible');
    }
  });
}

/* ── Animated Stats Counter ───────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.counter, 10);
          const suffix = el.dataset.suffix || '';
          const duration = 1800;
          const startTime = performance.now();

          const update = now => {
            const progress = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
            const current = Math.floor(ease * target);
            el.textContent = current + suffix;

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              el.textContent = target + suffix;
            }
          };

          requestAnimationFrame(update);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(c => observer.observe(c));
}

/* ── Interactive Contact Form ─────────────────────────────── */
function initContactForm() {
  const form = document.querySelector('#contact-form');
  const successBox = document.querySelector('#contact-success');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
    }

    const formData = new FormData(form);
    // Add Web3Forms access key from Vite env
    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      
      if (data.success) {
        // Track GA4 lead generation event
        trackEvent('generate_lead', {
          event_category: 'Contact',
          event_label: 'Web3Forms Submit',
          method: 'contact_form'
        });

        form.style.display = 'none';
        if (successBox) {
          successBox.classList.add('visible');
        }
      } else {
        alert("Something went wrong. Please try again.");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }
    } catch (err) {
      alert("Network error. Please check your connection and try again.");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    }
  });
}

/* ── Filter Tabs (Insights Page) ──────────────────────────── */
function initFilterTabs() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('[data-category]');
  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          card.classList.add('visible');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ── Interactive 5-Phase Roadmap Pipeline Animation ───────── */
function initRoadmapAnimation() {
  const container = document.getElementById('ai-roadmap-pipeline');
  if (!container) return;

  const cards = container.querySelectorAll('.roadmap-card');
  const statusText = document.getElementById('roadmap-status-text');
  const btnPrev = document.getElementById('roadmap-prev');
  const btnNext = document.getElementById('roadmap-next');
  const btnToggle = document.getElementById('roadmap-toggle-play');

  if (!cards.length) return;

  let currentIndex = 0;
  let isPlaying = true;
  let timer = null;

  const titles = [
    'Phase 01 — Feasibility & Data Audit',
    'Phase 02 — Rapid Sandbox MVP',
    'Phase 03 — Deep System Integration',
    'Phase 04 — Guardrails & Red-Teaming',
    'Phase 05 — Production MLOps & Scaling'
  ];

  function setActive(index) {
    currentIndex = (index + cards.length) % cards.length;
    cards.forEach((card, idx) => {
      if (idx === currentIndex) {
        card.classList.add('is-active');
        card.setAttribute('aria-selected', 'true');
      } else {
        card.classList.remove('is-active');
        card.removeAttribute('aria-selected');
      }
    });

    if (statusText) {
      statusText.textContent = `Active Step: ${titles[currentIndex]}`;
    }
  }

  function startTimer() {
    stopTimer();
    if (!isPlaying) return;
    timer = setInterval(() => {
      setActive(currentIndex + 1);
    }, 3600);
  }

  function stopTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  // User interactions: hover / click / keyboard
  cards.forEach((card, idx) => {
    card.addEventListener('mouseenter', () => {
      stopTimer();
      setActive(idx);
    });

    card.addEventListener('click', () => {
      stopTimer();
      setActive(idx);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        stopTimer();
        setActive(idx);
      }
    });
  });

  container.addEventListener('mouseleave', () => {
    if (isPlaying) startTimer();
  });

  if (btnPrev) {
    btnPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      stopTimer();
      setActive(currentIndex - 1);
      if (isPlaying) startTimer();
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', (e) => {
      e.stopPropagation();
      stopTimer();
      setActive(currentIndex + 1);
      if (isPlaying) startTimer();
    });
  }

  if (btnToggle) {
    btnToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      isPlaying = !isPlaying;
      btnToggle.textContent = isPlaying ? '⏸' : '▶';
      btnToggle.setAttribute('aria-label', isPlaying ? 'Pause Auto Flow' : 'Play Auto Flow');
      if (isPlaying) {
        startTimer();
      } else {
        stopTimer();
      }
    });
  }

  // Intersection observer to only run animation when in viewport
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (isPlaying && !timer) startTimer();
        } else {
          stopTimer();
        }
      });
    }, { threshold: 0.15 });
    observer.observe(container);
  } else {
    startTimer();
  }
}


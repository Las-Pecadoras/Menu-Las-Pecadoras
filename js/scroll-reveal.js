/**
 * LAS PECADORAS — scroll-reveal.js  (Renovación 2025)
 * - Scroll reveal orquestado
 * - Nav sticky con punto "nuevo" en Cantarito
 * - Scroll suave al CTA del hero
 * - Modo oscuro permanente (sin toggle)
 */

(function () {
  'use strict';

  /* ─── 0. HAPTIC FEEDBACK ─────────────────────────────────────── */
  function haptic(pattern) {
    if (navigator.vibrate) navigator.vibrate(pattern);
  }

  /* ─── 1. SCROLL REVEAL ───────────────────────────────────────── */
  var revealObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -55px 0px', threshold: 0.07 });

  function initReveal() {
    document.querySelectorAll('.reveal').forEach(function (el) {
      var siblings = el.parentElement
        ? el.parentElement.querySelectorAll('.reveal')
        : [];
      var idx     = Array.prototype.indexOf.call(siblings, el);
      var delayMs = Math.min(idx * 75, 280);
      el.style.transitionDelay = delayMs + 'ms';
      revealObserver.observe(el);
    });
  }

  /* ─── 2. PRICE STAMP ─────────────────────────────────────────── */
  var priceObserver = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el    = entry.target;
        var delay = Math.floor(Math.random() * 130);
        setTimeout(function () {
          el.classList.add('price-visible');
          var wrap = el.closest('.price-wrap-anim');
          if (wrap) wrap.classList.add('price-visible');
        }, delay);
        obs.unobserve(el);
      }
    });
  }, { root: null, rootMargin: '0px 0px -20px 0px', threshold: 0.5 });

  function initPriceStamp() {
    document.querySelectorAll('.price').forEach(function (price) {
      var parent = price.parentElement;
      if (parent && !parent.classList.contains('price-wrap-anim')) {
        var wrapper = document.createElement('span');
        wrapper.className = 'price-wrap-anim';
        parent.insertBefore(wrapper, price);
        wrapper.appendChild(price);
      }
      priceObserver.observe(price);
    });
  }

  /* ─── 3. STICKY NAV ──────────────────────────────────────────── */
  function buildStickyNav() {
    var sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    var nav = document.getElementById('section-nav');
    if (!nav) return;

    var tabsContainer = nav.querySelector('.nav-tabs');
    if (!tabsContainer) return;

    nav.style.overflowX = 'visible';
    tabsContainer.style.overflowX            = 'auto';
    tabsContainer.style.webkitOverflowScrolling = 'touch';

    sections.forEach(function (sec) {
      var labelAttr = sec.dataset.navLabel;
      var labelEl   = sec.querySelector('.section-label');
      var text = labelAttr
        ? labelAttr
        : (labelEl ? labelEl.textContent.replace(/[⌖✦·]/g, '').trim() : sec.id);

      var btn = document.createElement('button');
      btn.className      = 'nav-tab';
      btn.dataset.target = sec.id;

      /* Si es el Cantarito, añadir punto "nuevo" dorado */
      if (sec.id === 'cantarito') {
        /* El emoji ya viene en labelAttr — solo agregar el dot */
        btn.textContent = text;
        var dot = document.createElement('span');
        dot.className   = 'new-dot';
        dot.setAttribute('aria-hidden', 'true');
        btn.appendChild(dot);
      } else {
        btn.textContent = text;
      }

      btn.addEventListener('click', function () {
        haptic(8);
        scrollToSection(sec);
      });

      tabsContainer.appendChild(btn);
    });

    function scrollToSection(section) {
      var navH = nav.getBoundingClientRect().height || 52;
      var top  = section.getBoundingClientRect().top + window.pageYOffset - navH - 4;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }

    /* Highlight tab activo */
    var navTabs = tabsContainer.querySelectorAll('.nav-tab');

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navTabs.forEach(function (tab) {
            var isActive = tab.dataset.target === id;
            tab.classList.toggle('active', isActive);
            if (isActive) {
              var tabLeft   = tab.offsetLeft;
              var tabWidth  = tab.offsetWidth;
              var contWidth = tabsContainer.offsetWidth;
              tabsContainer.scrollTo({
                left: tabLeft - (contWidth / 2) + (tabWidth / 2),
                behavior: 'smooth'
              });
            }
          });
        }
      });
    }, {
      root: null,
      rootMargin: '-' + ((nav.getBoundingClientRect().height || 52) + 2) + 'px 0px -45% 0px',
      threshold: 0
    });

    sections.forEach(function (sec) { sectionObserver.observe(sec); });
  }

  /* ─── 4. DARK MODE PERMANENTE ──────────────────────────────────── */
  function initDarkMode() {
    document.body.classList.add('dark-mode');
    localStorage.removeItem('pecadoras-theme');
  }

  /* ─── 5. HERO CTA — Scroll suave al Cantarito ────────────────── */
  function initHeroCTA() {
    var cta = document.querySelector('.hero-cta');
    if (!cta) return;
    cta.addEventListener('click', function (e) {
      e.preventDefault();
      haptic(12);
      var target = document.getElementById('cantarito');
      if (!target) return;
      var nav  = document.getElementById('section-nav');
      var navH = nav ? nav.getBoundingClientRect().height : 52;
      var top  = target.getBoundingClientRect().top + window.pageYOffset - navH - 4;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  }

  /* ─── INIT ───────────────────────────────────────────────────── */
  function init() {
    initReveal();
    initPriceStamp();
    buildStickyNav();
    initDarkMode();
    initHeroCTA();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
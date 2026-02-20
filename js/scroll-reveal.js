/**
 * LAS PECADORAS — scroll-reveal.js
 * FIXES:
 *  - Scroll sin trabas: el nav ya no intercepta eventos touch
 *  - Nav click navega correctamente con offset del nav sticky
 *  - Dark toggle separado del nav (ya no compite por espacio)
 *  - Sin carrito (eliminado)
 */

(function () {
  'use strict';

  /* ─── 0. HAPTIC FEEDBACK — vibración táctil en acciones clave ── */
  // navigator.vibrate está soportado en Android Chrome/Firefox.
  // En iOS Safari no funciona (restricción de Apple) pero no lanza errores.
  function haptic(pattern) {
    if (navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  }

  /* ─── 1. SCROLL REVEAL ───────────────────────────────────────── */
  var revealOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.08
  };

  function onReveal(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }

  var revealObserver = new IntersectionObserver(onReveal, revealOptions);

  function initReveal() {
    var elements = document.querySelectorAll('.reveal');
    elements.forEach(function (el) {
      var siblings = el.parentElement ? el.parentElement.querySelectorAll('.reveal') : [];
      var sibIndex = Array.prototype.indexOf.call(siblings, el);
      var delayMs  = Math.min(sibIndex * 80, 300);
      el.style.transitionDelay = delayMs + 'ms';
      revealObserver.observe(el);
    });
  }

  /* ─── 2. PRICE STAMP ─────────────────────────────────────────── */
  var priceOptions = {
    root: null,
    rootMargin: '0px 0px -20px 0px',
    threshold: 0.5
  };

  function onPriceReveal(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var delay = Math.floor(Math.random() * 150);
        setTimeout(function () {
          el.classList.add('price-visible');
          var wrap = el.closest('.price-wrap-anim');
          if (wrap) wrap.classList.add('price-visible');
        }, delay);
        observer.unobserve(el);
      }
    });
  }

  var priceObserver = new IntersectionObserver(onPriceReveal, priceOptions);

  function initPriceStamp() {
    var prices = document.querySelectorAll('.price');
    prices.forEach(function (price) {
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

  /* ─── 3. STICKY NAV — FIXES scroll y click ───────────────────── */
  function buildStickyNav() {
    var sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    var nav = document.getElementById('section-nav');
    if (!nav) return;

    var tabsContainer = nav.querySelector('.nav-tabs');
    if (!tabsContainer) return;

    /* FIX SCROLL: el nav NO debe tener overflow-x auto en el elemento
       raíz porque eso crea un nuevo stacking context que en iOS/Android
       intercepta los eventos touch del documento completo y traba el scroll.
       La solución: el overflow va SOLO en .nav-tabs, no en #section-nav. */
    nav.style.overflowX = 'visible';
    tabsContainer.style.overflowX = 'auto';
    tabsContainer.style.webkitOverflowScrolling = 'touch';

    // Crear tabs desde los data-nav-label de cada sección
    sections.forEach(function (sec) {
      var labelAttr = sec.dataset.navLabel;
      var labelEl   = sec.querySelector('.section-label');
      var text = labelAttr
        ? labelAttr
        : (labelEl ? labelEl.textContent.replace(/[⌖✦·]/g, '').trim() : sec.id);

      var btn = document.createElement('button');
      btn.className      = 'nav-tab';
      btn.textContent    = text;
      btn.dataset.target = sec.id;

      btn.addEventListener('click', function () {
        haptic(8); // tap corto — confirmación de navegación
        scrollToSection(sec);
      });

      tabsContainer.appendChild(btn);
    });

    /* FIX CLICK NAV: scrollIntoView con behavior:'smooth' no respeta
       scroll-padding-top en todos los navegadores móviles.
       Usamos window.scrollTo con el offset calculado manualmente. */
    function scrollToSection(section) {
      var navH   = nav.getBoundingClientRect().height || 48;
      var top    = section.getBoundingClientRect().top + window.pageYOffset - navH - 4;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }

    // Highlight del tab activo con IntersectionObserver
    var navTabs = tabsContainer.querySelectorAll('.nav-tab');

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navTabs.forEach(function (tab) {
            var isActive = tab.dataset.target === id;
            tab.classList.toggle('active', isActive);
            // Scroll horizontal del nav-tabs para mostrar tab activo
            if (isActive) {
              // Centramos el tab dentro del contenedor de tabs
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
      /* El rootMargin superior compensa la altura del nav sticky.
         Lo calculamos tarde para que el nav ya esté renderizado. */
      rootMargin: '-' + ((nav.getBoundingClientRect().height || 48) + 2) + 'px 0px -45% 0px',
      threshold: 0
    });

    sections.forEach(function (sec) { sectionObserver.observe(sec); });
  }

  /* ─── 4. DARK MODE TOGGLE ────────────────────────────────────── */
  function initDarkToggle() {
    var toggle = document.querySelector('.dark-toggle');
    if (!toggle) return;

    var body = document.body;

    // Aplicar preferencia guardada antes del primer render
    var savedMode = localStorage.getItem('pecadoras-theme');
    if (savedMode === 'dark') {
      body.classList.add('dark-mode');
      toggle.textContent = '☀️';
    } else {
      toggle.textContent = '🌙';
    }

    toggle.addEventListener('click', function () {
      haptic([10, 30, 10]); // doble pulse — cambio de modo
      toggle.classList.add('spinning');
      setTimeout(function () { toggle.classList.remove('spinning'); }, 400);

      if (body.classList.toggle('dark-mode')) {
        toggle.textContent = '☀️';
        localStorage.setItem('pecadoras-theme', 'dark');
      } else {
        toggle.textContent = '🌙';
        localStorage.setItem('pecadoras-theme', 'light');
      }
    });
  }

  /* ─── INIT ───────────────────────────────────────────────────── */
  function init() {
    initReveal();
    initPriceStamp();
    buildStickyNav();
    initDarkToggle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
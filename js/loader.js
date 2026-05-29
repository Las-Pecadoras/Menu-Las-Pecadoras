/**
 * LAS PECADORAS — loader.js  (Renovación 2025)
 * Preloader con barra de progreso animada + fade elegante de salida.
 */

(function () {
  'use strict';

  var preloader  = document.getElementById('preloader');
  var bar        = document.getElementById('preloader-bar');
  var hasHidden  = false;
  var progress   = 0;
  var barTimer   = null;

  /* ── Animar la barra de progreso hasta ~85% mientras carga ── */
  function startProgressBar() {
    if (!bar) return;
    var steps = [
      { target: 30,  delay: 100 },
      { target: 55,  delay: 400 },
      { target: 75,  delay: 800 },
      { target: 85,  delay: 1200 }
    ];
    steps.forEach(function (s) {
      setTimeout(function () {
        if (!hasHidden) {
          bar.style.width = s.target + '%';
        }
      }, s.delay);
    });
  }

  /* ── Completar barra y ocultar ── */
  function hideLoader() {
    if (hasHidden || !preloader) return;
    hasHidden = true;

    /* Completar la barra al 100% */
    if (bar) {
      bar.style.transition = 'width 0.25s ease';
      bar.style.width = '100%';
    }

    /* Fade out elegante después de completar la barra */
    setTimeout(function () {
      preloader.classList.add('hidden');
    }, 320);

    /* Limpieza del DOM */
    setTimeout(function () {
      if (preloader && preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
    }, 950);
  }

  startProgressBar();

  /* Ruta normal: esperar carga completa + mínimo visual */
  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 700);
  } else {
    window.addEventListener('load', function () {
      setTimeout(hideLoader, 900);
    });
  }

  /* Timeout de seguridad — si en 4s no cargó, oculta igual */
  setTimeout(hideLoader, 4000);

  /* Si otro script explota, el preloader igual desaparece */
  window.addEventListener('error', function () {
    setTimeout(hideLoader, 500);
  });

})();

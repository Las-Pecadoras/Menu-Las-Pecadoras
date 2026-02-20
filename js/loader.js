/**
 * LAS PECADORAS — loader.js
 * FIX #18: timeout de seguridad garantizado
 */

(function () {
  'use strict';

  var preloader   = document.getElementById('preloader');
  var blob        = preloader ? preloader.querySelector('.loader-blob') : null;
  var hasHidden   = false; // guardia para no ejecutar hideLoader dos veces

  function hideLoader() {
    if (hasHidden || !preloader) return;
    hasHidden = true;

    if (blob) {
      blob.classList.add('explode');
    }

    // Fade out del preloader tras la explosión del blob
    setTimeout(function () {
      preloader.classList.add('hidden');
    }, 680);

    // Limpieza del DOM
    setTimeout(function () {
      if (preloader && preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
    }, 1350);
  }

  // Ruta normal: esperar carga completa + mínimo visual de 900ms
  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 600);
  } else {
    window.addEventListener('load', function () {
      setTimeout(hideLoader, 900);
    });
  }

  // FIX #18: Timeout de seguridad — si en 4s no cargó, ocultamos igual.
  // Antes era 5s; lo bajamos a 4s para no frustrar al usuario.
  // La guardia hasHidden evita doble ejecución.
  setTimeout(hideLoader, 4000);

  // FIX #18: Si el JS de otros scripts explota, el preloader
  // igual desaparece gracias a este handler de error global.
  window.addEventListener('error', function () {
    setTimeout(hideLoader, 500);
  });

})();

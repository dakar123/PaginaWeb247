(function () {
  function getAssetPrefix() {
    var pathname = (window.location.pathname || '').replace(/\\/g, '/').toLowerCase();
    return pathname.indexOf('/servicios/') !== -1 ? '../' : '';
  }

  function includeNode(node) {
    var includePath = node.getAttribute('data-include');
    if (!includePath) {
      return Promise.resolve();
    }

    return fetch(includePath, { cache: 'no-cache' })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('No se pudo cargar: ' + includePath);
        }
        return response.text();
      })
      .then(function (markup) {
        node.outerHTML = markup;
      })
      .catch(function (error) {
        console.error(error);
        node.remove();
      });
  }

  function includeAll() {
    var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-include]'));
    if (!nodes.length) {
      return Promise.resolve();
    }

    return Promise.all(nodes.map(includeNode)).then(function () {
      var nested = document.querySelectorAll('[data-include]');
      if (nested.length) {
        return includeAll();
      }
    });
  }

  function loadMainScript() {
    if (window.__agencia247MainScriptPromise) {
      return window.__agencia247MainScriptPromise;
    }

    window.__agencia247MainScriptPromise = new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[data-agencia247-main="1"]');

      if (existing) {
        if (existing.getAttribute('data-loaded') === '1') {
          resolve();
          return;
        }
        existing.addEventListener('load', function () {
          existing.setAttribute('data-loaded', '1');
          resolve();
        }, { once: true });
        existing.addEventListener('error', reject, { once: true });
        return;
      }

      var script = document.createElement('script');
      script.src = getAssetPrefix() + 'js/main.js';
      script.setAttribute('data-agencia247-main', '1');
      script.addEventListener('load', function () {
        script.setAttribute('data-loaded', '1');
        resolve();
      }, { once: true });
      script.addEventListener('error', reject, { once: true });
      document.body.appendChild(script);
    });

    return window.__agencia247MainScriptPromise;
  }

  function initLayout() {
    includeAll()
      .then(function () {
        document.dispatchEvent(new CustomEvent('agencia247:layout-ready'));
        return loadMainScript();
      })
      .catch(function (error) {
        console.error(error);
        return loadMainScript();
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLayout);
  } else {
    initLayout();
  }
})();

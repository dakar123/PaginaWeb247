window.agencia247Theme = {
  brand: {
    logoUrl: 'logo247vector.svg',
    faviconUrl: 'logo247vector.svg'
  },
  map: {
    enabled: 1,
    lat: -15.840691174561973,
    lon: -70.02602661165675,
    zoom: 13.4,
    radar: 1,
    logoUrl: 'logo247vector.svg',
    maplibreCssUrl: 'https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.css',
    maplibreJsUrl: 'https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.js',
    maplibreJsFallbackUrl: 'https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js',
    tileAttribution: '&copy; OpenStreetMap contributors',
    tileUrls: [
      'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
      'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
      'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
    ]
  },
  ui: {
    brandIntro: 'drop',
    navDropdownDelay: 260
  }
};

(function () {
  function applyCurrentYear() {
    var currentYear = String(new Date().getFullYear());
    var yearNodes = document.querySelectorAll('[data-current-year]');
    yearNodes.forEach(function (node) {
      node.textContent = currentYear;
    });
  }

  function applyBrandAssets() {
    var theme = window.agencia247Theme || {};
    var brand = theme.brand || {};
    var map = theme.map || {};
    var logoUrl = brand.logoUrl || map.logoUrl || '';

    if (logoUrl) {
      var logoNodes = document.querySelectorAll('.js-brand-logo img');
      logoNodes.forEach(function (img) {
        img.src = logoUrl;
      });

      var mapNodes = document.querySelectorAll('.contact-map[data-logo-url]');
      mapNodes.forEach(function (node) {
        node.setAttribute('data-logo-url', logoUrl);
      });
    }

    var faviconUrl = brand.faviconUrl || logoUrl;
    if (!faviconUrl) {
      return;
    }

    var iconLinks = Array.prototype.slice.call(
      document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]')
    );

    if (iconLinks.length === 0) {
      var iconLink = document.createElement('link');
      iconLink.rel = 'icon';
      document.head.appendChild(iconLink);
      iconLinks.push(iconLink);
    }

    iconLinks.forEach(function (link) {
      link.href = faviconUrl;
      if ((link.getAttribute('rel') || '').toLowerCase() === 'icon') {
        link.type = 'image/svg+xml';
      }
    });
  }

  window.agencia247ApplyCurrentYear = applyCurrentYear;
  window.agencia247ApplyBrandAssets = applyBrandAssets;

  function applySharedUi() {
    applyCurrentYear();
    applyBrandAssets();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySharedUi);
  } else {
    applySharedUi();
  }

  document.addEventListener('agencia247:layout-ready', applySharedUi);
})();

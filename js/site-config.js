window.agencia247Theme = {
  map: {
    enabled: 1,
    lat: -15.840691174561973,
    lon: -70.02602661165675,
    zoom: 13.4,
    radar: 1,
    logoUrl: 'images/image.png',
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

document.addEventListener('DOMContentLoaded', function () {
  var currentYear = String(new Date().getFullYear());
  var yearNodes = document.querySelectorAll('[data-current-year]');
  yearNodes.forEach(function (node) {
    node.textContent = currentYear;
  });
});


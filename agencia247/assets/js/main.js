// Main JS for Agencia247 theme.
document.addEventListener('DOMContentLoaded', function() {
	var themeConfig = window.agencia247Theme || {};
	var uiConfig = themeConfig.ui || {};
	var nav = document.querySelector('.site-nav');
	var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav .primary-menu a'));
	var sections = ['#hero', '#servicios', '#proyectos', '#contacto'];
	var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var navDropdownDelay = parseInt(uiConfig.navDropdownDelay, 10);
	var mapLibraryLoader = {
		loading: false,
		callbacks: []
	};

	if (!Number.isFinite(navDropdownDelay) || navDropdownDelay < 80) {
		navDropdownDelay = 260;
	}

	document.body.classList.add('js-ready');

	function linkHash(link) {
		try {
			return new URL(link.getAttribute('href'), window.location.origin).hash;
		} catch (error) {
			return '';
		}
	}

	function isSamePage(link) {
		try {
			var linkUrl = new URL(link.getAttribute('href'), window.location.origin);
			return linkUrl.pathname.replace(/\/$/, '') === window.location.pathname.replace(/\/$/, '');
		} catch (error) {
			return false;
		}
	}

	function setActiveLink() {
		var current = '';
		sections.forEach(function(id) {
			var section = document.querySelector(id);
			if (section && window.scrollY >= section.offsetTop - 110) {
				current = id;
			}
		});

		navLinks.forEach(function(link) {
			var hash = linkHash(link);
			if (hash && hash === current) {
				link.classList.add('active');
			} else {
				link.classList.remove('active');
			}
		});
	}

	function updateNavState() {
		if (!nav) {
			return;
		}
		if (window.scrollY > 12) {
			nav.classList.add('is-scrolled');
		} else {
			nav.classList.remove('is-scrolled');
		}
	}

	function initMenuHoverIntent() {
		var parentItems = document.querySelectorAll('.site-nav .primary-menu > li.menu-item-has-children');

		parentItems.forEach(function(item) {
			var closeTimeout = null;

			function openMenu() {
				if (closeTimeout) {
					window.clearTimeout(closeTimeout);
					closeTimeout = null;
				}
				item.classList.add('submenu-open');
			}

			function closeMenu() {
				if (closeTimeout) {
					window.clearTimeout(closeTimeout);
				}
				closeTimeout = window.setTimeout(function() {
					item.classList.remove('submenu-open');
				}, navDropdownDelay);
			}

			item.addEventListener('mouseenter', openMenu);
			item.addEventListener('mouseleave', closeMenu);
			item.addEventListener('focusin', openMenu);
			item.addEventListener('focusout', function(event) {
				if (!item.contains(event.relatedTarget)) {
					closeMenu();
				}
			});
		});
	}

	function initNavSmoothScroll() {
		navLinks.forEach(function(link) {
			link.addEventListener('click', function(event) {
				var hash = linkHash(link);
				if (!hash || !isSamePage(link)) {
					return;
				}

				var target = document.querySelector(hash);
				if (!target) {
					return;
				}

				event.preventDefault();
				target.scrollIntoView({ behavior: 'smooth', block: 'start' });
				if (history.pushState) {
					history.pushState(null, '', hash);
				}
			});
		});
	}

	function initBrandLogo() {
		var logo = document.querySelector('.js-brand-logo');
		if (!logo) {
			return;
		}

		var brandIntro = uiConfig.brandIntro || (nav ? nav.getAttribute('data-brand-intro') : '') || 'drop';
		var textEl = logo.querySelector('.logo-text');
		var iconEl = logo.querySelector('img') || logo.querySelector('.logo-fallback');

		logo.classList.add('logo-ready');
		logo.classList.add('brand-intro-' + brandIntro);

		if (!reducedMotion && brandIntro !== 'none') {
			window.requestAnimationFrame(function() {
				logo.classList.add('brand-animate-in');
			});
		}

		if (reducedMotion) {
			return;
		}

		logo.addEventListener('mousemove', function(event) {
			var rect = logo.getBoundingClientRect();
			var x = (event.clientX - rect.left) / rect.width;
			var y = (event.clientY - rect.top) / rect.height;
			var tx = (x - 0.5) * 8;
			var ty = (y - 0.5) * 6;

			if (iconEl) {
				iconEl.style.transform = 'translate(' + (tx * 0.55).toFixed(2) + 'px,' + (ty * 0.55).toFixed(2) + 'px) scale(1.03)';
			}
			if (textEl) {
				textEl.style.transform = 'translate(' + (tx * -0.35).toFixed(2) + 'px,' + (ty * -0.35).toFixed(2) + 'px)';
			}
		});

		logo.addEventListener('mouseleave', function() {
			if (iconEl) {
				iconEl.style.transform = '';
			}
			if (textEl) {
				textEl.style.transform = '';
			}
		});
	}

	function initDynamicText() {
		var nodes = document.querySelectorAll('.js-dynamic-text');
		nodes.forEach(function(node) {
			var wordsAttr = node.getAttribute('data-words') || '';
			var words = wordsAttr.split('|').map(function(word) {
				return word.trim();
			}).filter(Boolean);
			var currentWord = 0;
			var currentChar = 0;
			var deleting = false;
			var minDelay = 65;

			if (words.length === 0) {
				return;
			}

			if (reducedMotion || words.length === 1) {
				node.textContent = words[0];
				return;
			}

			node.textContent = '';

			function tick() {
				var fullWord = words[currentWord];
				currentChar += deleting ? -1 : 1;
				node.textContent = fullWord.slice(0, Math.max(0, currentChar));

				var timeout = minDelay + Math.floor(Math.random() * 40);

				if (!deleting && currentChar >= fullWord.length) {
					timeout = 1300;
					deleting = true;
				} else if (deleting && currentChar <= 0) {
					deleting = false;
					currentWord = (currentWord + 1) % words.length;
					timeout = 260;
				}

				window.setTimeout(tick, timeout);
			}

			window.setTimeout(tick, 500);
		});
	}

	function initRevealAnimations() {
		var revealTargets = document.querySelectorAll('#site-content > section, .service-card, .project-item, .contact-map-card');
		if (!revealTargets.length || !('IntersectionObserver' in window) || reducedMotion) {
			return;
		}

		revealTargets.forEach(function(element) {
			element.setAttribute('data-reveal', '');
		});

		var observer = new IntersectionObserver(function(entries, obs) {
			entries.forEach(function(entry) {
				if (!entry.isIntersecting) {
					return;
				}
				entry.target.classList.add('is-visible');
				obs.unobserve(entry.target);
			});
		}, {
			rootMargin: '0px 0px -10% 0px',
			threshold: 0.12
		});

		revealTargets.forEach(function(element) {
			observer.observe(element);
		});
	}

	function getMapConfig() {
		return themeConfig.map || {};
	}

	function getMapText(mapElement, key, fallback) {
		var value = mapElement.getAttribute(key);
		return value && value.trim() !== '' ? value : fallback;
	}

	function isMapEnabled(mapElement) {
		var localizedMap = getMapConfig();
		var rawValue = mapElement.getAttribute('data-enabled');
		if (!rawValue && typeof localizedMap.enabled !== 'undefined') {
			rawValue = String(localizedMap.enabled);
		}
		if (rawValue === '' || rawValue === null) {
			return true;
		}
		return parseInt(rawValue, 10) === 1;
	}

	function setMapStatus(mapElement, state, text) {
		var statusElement = mapElement.querySelector('[data-map-status]');
		var statusText = mapElement.querySelector('.contact-map-status-text');

		mapElement.setAttribute('data-map-state', state);
		if (statusText && typeof text === 'string' && text !== '') {
			statusText.textContent = text;
		}

		if (!statusElement) {
			return;
		}

		if (state === 'ready') {
			statusElement.setAttribute('hidden', 'hidden');
		} else {
			statusElement.removeAttribute('hidden');
		}
	}

	function appendMapLibraryCss(mapConfig) {
		var existingCss = document.querySelector('link[data-agencia247-maplibre="1"], link[href*="maplibre-gl.css"]');
		if (existingCss) {
			return;
		}

		var cssHref = typeof mapConfig.maplibreCssUrl === 'string' && mapConfig.maplibreCssUrl !== ''
			? mapConfig.maplibreCssUrl
			: 'https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.css';
		var cssLink = document.createElement('link');
		cssLink.rel = 'stylesheet';
		cssLink.href = cssHref;
		cssLink.setAttribute('data-agencia247-maplibre', '1');
		document.head.appendChild(cssLink);
	}

	function loadMapLibrary(done) {
		if (typeof done !== 'function') {
			return;
		}

		if (typeof window.maplibregl !== 'undefined') {
			done(true);
			return;
		}

		mapLibraryLoader.callbacks.push(done);
		if (mapLibraryLoader.loading) {
			return;
		}
		mapLibraryLoader.loading = true;

		var mapConfig = getMapConfig();
		appendMapLibraryCss(mapConfig);

		var sourceCandidates = [];
		if (typeof mapConfig.maplibreJsUrl === 'string' && mapConfig.maplibreJsUrl !== '') {
			sourceCandidates.push(mapConfig.maplibreJsUrl);
		}
		if (sourceCandidates.length === 0) {
			sourceCandidates.push('https://cdn.jsdelivr.net/npm/maplibre-gl@4.7.1/dist/maplibre-gl.js');
		}
		if (typeof mapConfig.maplibreJsFallbackUrl === 'string' && mapConfig.maplibreJsFallbackUrl !== '') {
			sourceCandidates.push(mapConfig.maplibreJsFallbackUrl);
		} else {
			sourceCandidates.push('https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js');
		}
		sourceCandidates = sourceCandidates.filter(function(url, index, list) {
			return list.indexOf(url) === index;
		});

		function finish(success) {
			var queue = mapLibraryLoader.callbacks.slice();
			mapLibraryLoader.callbacks = [];
			mapLibraryLoader.loading = false;
			queue.forEach(function(callback) {
				callback(success);
			});
		}

		function tryNextSource(index) {
			if (typeof window.maplibregl !== 'undefined') {
				finish(true);
				return;
			}

			if (index >= sourceCandidates.length) {
				finish(false);
				return;
			}

			var source = sourceCandidates[index];
			var existingSourceScript = document.querySelector('script[src="' + source + '"]');
			if (existingSourceScript) {
				waitForLibrary(index + 1);
				return;
			}

			var script = document.createElement('script');
			script.src = source;
			script.async = true;
			script.setAttribute('data-agencia247-maplibre', '1');
			script.addEventListener('load', function() {
				if (typeof window.maplibregl !== 'undefined') {
					script.setAttribute('data-agencia247-maplibre-loaded', '1');
					finish(true);
					return;
				}
				tryNextSource(index + 1);
			}, { once: true });
			script.addEventListener('error', function() {
				tryNextSource(index + 1);
			}, { once: true });
			document.body.appendChild(script);
		}

		function waitForLibrary(nextIndex) {
			var checks = 0;
			var checkTimer = window.setInterval(function() {
				checks++;
				if (typeof window.maplibregl !== 'undefined') {
					window.clearInterval(checkTimer);
					finish(true);
					return;
				}
				if (checks >= 20) {
					window.clearInterval(checkTimer);
					tryNextSource(nextIndex);
				}
			}, 150);
		}

		var existingScript = document.querySelector('script[data-agencia247-maplibre="1"], script[src*="maplibre-gl.js"]');
		if (existingScript) {
			waitForLibrary(0);
			return;
		}

		tryNextSource(0);
	}

	function buildMapStyle(mapConfig) {
		var tileUrls = Array.isArray(mapConfig.tileUrls) && mapConfig.tileUrls.length > 0
			? mapConfig.tileUrls
			: [
				'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
				'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
				'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
			];
		return {
			version: 8,
			sources: {
				'osm-raster': {
					type: 'raster',
					tiles: tileUrls,
					tileSize: 256,
					attribution: mapConfig.tileAttribution || '&copy; OpenStreetMap contributors'
				}
			},
			layers: [
				{
					id: 'osm-raster-layer',
					type: 'raster',
					source: 'osm-raster'
				}
			]
		};
	}

	function createMapMarker(logoUrl, radarEnabled) {
		var markerElement = document.createElement('div');
		markerElement.className = 'contact-map-marker';

		if (radarEnabled) {
			var radarElement = document.createElement('div');
			radarElement.className = 'contact-map-marker-radar';
			radarElement.setAttribute('aria-hidden', 'true');
			radarElement.innerHTML = [
				'<span class="map-radar-ring map-radar-ring-1"></span>',
				'<span class="map-radar-ring map-radar-ring-2"></span>',
				'<span class="map-radar-ring map-radar-ring-3"></span>',
				'<span class="map-radar-sweep"></span>'
			].join('');
			markerElement.appendChild(radarElement);
		}

		var badgeElement = document.createElement('div');
		badgeElement.className = 'contact-map-marker-badge';

		if (logoUrl) {
			var logoElement = document.createElement('img');
			logoElement.className = 'contact-map-marker-logo';
			logoElement.src = logoUrl;
			logoElement.alt = '';
			logoElement.loading = 'lazy';
			logoElement.decoding = 'async';
			logoElement.addEventListener('error', function() {
				logoElement.remove();
				var dotFallback = document.createElement('span');
				dotFallback.className = 'contact-map-marker-dot';
				badgeElement.appendChild(dotFallback);
			}, { once: true });
			badgeElement.appendChild(logoElement);
		} else {
			var markerDot = document.createElement('span');
			markerDot.className = 'contact-map-marker-dot';
			badgeElement.appendChild(markerDot);
		}

		markerElement.appendChild(badgeElement);
		return markerElement;
	}

	function renderContactMap(mapElement) {
		if (!mapElement || mapElement.getAttribute('data-map-ready') === '1' || mapElement.getAttribute('data-map-initializing') === '1' || typeof window.maplibregl === 'undefined') {
			return false;
		}

		var datasetLat = parseFloat(mapElement.getAttribute('data-lat') || '');
		var datasetLon = parseFloat(mapElement.getAttribute('data-lon') || '');
		var datasetZoom = parseFloat(mapElement.getAttribute('data-zoom') || '');
		var localizedMap = getMapConfig();
		var lat = Number.isFinite(datasetLat) ? datasetLat : parseFloat(localizedMap.lat || '');
		var lon = Number.isFinite(datasetLon) ? datasetLon : parseFloat(localizedMap.lon || '');
		var zoom = Number.isFinite(datasetZoom) ? datasetZoom : parseFloat(localizedMap.zoom || '13.4');
		var logoUrl = mapElement.getAttribute('data-logo-url') || localizedMap.logoUrl || '';
		var radarEnabled = mapElement.getAttribute('data-radar') === '1' || parseInt(localizedMap.radar, 10) === 1;

		if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
			setMapStatus(mapElement, 'error', getMapText(mapElement, 'data-error-text', 'No se pudo cargar el mapa en este momento.'));
			return false;
		}

		mapElement.setAttribute('data-map-initializing', '1');

		try {
			var map = new window.maplibregl.Map({
				container: mapElement,
				style: buildMapStyle(localizedMap),
				center: [lon, lat],
				zoom: Number.isFinite(zoom) ? zoom : 13.4,
				attributionControl: true
			});

			if (map.dragRotate && typeof map.dragRotate.disable === 'function') {
				map.dragRotate.disable();
			}
			if (map.touchZoomRotate && typeof map.touchZoomRotate.disableRotation === 'function') {
				map.touchZoomRotate.disableRotation();
			}
			if (map.touchPitch && typeof map.touchPitch.disable === 'function') {
				map.touchPitch.disable();
			}

			new window.maplibregl.Marker({
				element: createMapMarker(logoUrl, radarEnabled),
				anchor: 'center'
			}).setLngLat([lon, lat]).addTo(map);

			map.on('load', function() {
				mapElement.setAttribute('data-map-ready', '1');
				mapElement.removeAttribute('data-map-initializing');
				setMapStatus(mapElement, 'ready');
				map.resize();
				if (!reducedMotion) {
					map.easeTo({
						center: [lon, lat],
						zoom: Math.max((Number.isFinite(zoom) ? zoom : 13.4), 14.8),
						duration: 900
					});
				}
			});

			map.on('error', function() {
				if (mapElement.getAttribute('data-map-ready') !== '1') {
					mapElement.removeAttribute('data-map-initializing');
					setMapStatus(mapElement, 'error', getMapText(mapElement, 'data-error-text', 'No se pudo cargar el mapa en este momento.'));
				}
			});

			if (typeof ResizeObserver !== 'undefined') {
				var resizeObserver = new ResizeObserver(function() {
					map.resize();
				});
				resizeObserver.observe(mapElement);
			}

			mapElement._agencia247Map = map;
			return true;
		} catch (error) {
			mapElement.removeAttribute('data-map-initializing');
			setMapStatus(mapElement, 'error', getMapText(mapElement, 'data-error-text', 'No se pudo cargar el mapa en este momento.'));
			return false;
		}
	}

	function initContactMap() {
		var mapElement = document.getElementById('agencia247-contact-map');
		if (!mapElement) {
			return;
		}

		if (!isMapEnabled(mapElement)) {
			setMapStatus(mapElement, 'disabled', getMapText(mapElement, 'data-disabled-text', 'Mapa desactivado desde el personalizador.'));
			return;
		}

		setMapStatus(mapElement, 'loading', getMapText(mapElement, 'data-loading-text', 'Cargando mapa...'));

		function bootMap() {
			loadMapLibrary(function(loaded) {
				if (!loaded) {
					setMapStatus(mapElement, 'error', getMapText(mapElement, 'data-error-text', 'No se pudo cargar el mapa en este momento.'));
					return;
				}
				if (!renderContactMap(mapElement) && mapElement.getAttribute('data-map-ready') !== '1') {
					setMapStatus(mapElement, 'error', getMapText(mapElement, 'data-error-text', 'No se pudo cargar el mapa en este momento.'));
				}
			});
		}

		var started = false;
		function startWhenReady() {
			if (started) {
				return;
			}
			started = true;
			bootMap();
			window.setTimeout(bootMap, 1100);
		}

		if ('IntersectionObserver' in window) {
			var mapObserver = new IntersectionObserver(function(entries, observer) {
				entries.forEach(function(entry) {
					if (!entry.isIntersecting) {
						return;
					}
					observer.unobserve(entry.target);
					startWhenReady();
				});
			}, {
				rootMargin: '0px 0px 180px 0px',
				threshold: 0.01
			});
			mapObserver.observe(mapElement);
			window.setTimeout(startWhenReady, 2400);
			return;
		}

		startWhenReady();
	}

	function initFloatingWhatsApp() {
		var waButton = document.querySelector('.wa-floating-btn');
		var footer = document.querySelector('footer');
		if (!waButton || !footer || !('IntersectionObserver' in window)) {
			return;
		}

		var observer = new IntersectionObserver(function(entries) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					waButton.classList.add('wa-floating-btn--lifted');
				} else {
					waButton.classList.remove('wa-floating-btn--lifted');
				}
			});
		}, {
			rootMargin: '0px 0px -12% 0px',
			threshold: 0.01
		});

		observer.observe(footer);
	}

	function handleScroll() {
		updateNavState();
		setActiveLink();
	}

	initMenuHoverIntent();
	initNavSmoothScroll();
	initBrandLogo();
	initDynamicText();
	initRevealAnimations();
	initContactMap();
	initFloatingWhatsApp();
	handleScroll();
	window.addEventListener('scroll', handleScroll, { passive: true });
});

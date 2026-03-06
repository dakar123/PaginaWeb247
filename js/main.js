// Main JS for Agencia247 theme.
function agencia247MainInit() {
	if (window.__agencia247MainInitialized) {
		return;
	}
	window.__agencia247MainInitialized = true;

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
	var relativePrefix = ((window.location.pathname || '').replace(/\\/g, '/').toLowerCase().indexOf('/servicios/') !== -1) ? '../' : '';
	var lastScrollY = window.pageYOffset || 0;
	var upwardScrollDistance = 0;

	if (!Number.isFinite(navDropdownDelay) || navDropdownDelay < 80) {
		navDropdownDelay = 260;
	}

	document.body.classList.add('js-ready');

	function resolveSitePath(path) {
		if (!path) {
			return '';
		}
		if (/^(?:[a-z]+:)?\/\//i.test(path) || path.indexOf('mailto:') === 0 || path.indexOf('tel:') === 0 || path.charAt(0) === '#') {
			return path;
		}
		return relativePrefix + path.replace(/^\.\//, '');
	}

	function resolveSharedRoutes() {
		var routeNodes = document.querySelectorAll('[data-route]');
		var assetNodes = document.querySelectorAll('[data-asset]');

		routeNodes.forEach(function(node) {
			var route = node.getAttribute('data-route');
			if (!route) {
				return;
			}
			node.setAttribute('href', resolveSitePath(route));
		});

		assetNodes.forEach(function(node) {
			var assetPath = node.getAttribute('data-asset');
			if (!assetPath) {
				return;
			}
			node.setAttribute('src', resolveSitePath(assetPath));
		});
	}

	resolveSharedRoutes();

	function linkHash(link) {
		try {
			return new URL(link.getAttribute('href'), window.location.origin).hash;
		} catch (error) {
			return '';
		}
	}

	function normalizePathname(pathname) {
		var clean = (pathname || '').replace(/\/+$/, '');
		if (clean === '') {
			return '/';
		}
		if (/\/index\.html$/i.test(clean)) {
			clean = clean.replace(/\/index\.html$/i, '');
		}
		return clean === '' ? '/' : clean;
	}

	function isSamePage(link) {
		try {
			var linkUrl = new URL(link.getAttribute('href'), window.location.origin);
			return normalizePathname(linkUrl.pathname) === normalizePathname(window.location.pathname);
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
			document.body.classList.remove('has-top-nav-space');
			return;
		}
		var currentScrollY = window.scrollY || window.pageYOffset || 0;
		var delta = currentScrollY - lastScrollY;
		var topZoneThreshold = 24;

		document.body.classList.toggle('has-top-nav-space', currentScrollY <= topZoneThreshold);

		if (currentScrollY > 14) {
			nav.classList.add('is-scrolled');
		} else {
			nav.classList.remove('is-scrolled');
		}

		if (currentScrollY <= topZoneThreshold) {
			nav.classList.remove('is-hidden');
			upwardScrollDistance = 0;
			lastScrollY = currentScrollY;
			return;
		}

		if (document.activeElement && nav.contains(document.activeElement)) {
			nav.classList.remove('is-hidden');
			upwardScrollDistance = 0;
			lastScrollY = currentScrollY;
			return;
		}

		if (delta > 2) {
			upwardScrollDistance = 0;
			nav.classList.add('is-hidden');
		} else if (delta < -2) {
			upwardScrollDistance += Math.abs(delta);
			if (upwardScrollDistance > 18) {
				nav.classList.remove('is-hidden');
			}
		}

		lastScrollY = currentScrollY;
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
				var navHeight = nav ? nav.getBoundingClientRect().height : 64;
				var targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
				window.scrollTo({ top: targetTop, behavior: 'smooth' });
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

	
	function initThemedCursor() {
		if (reducedMotion || !window.matchMedia || window.matchMedia('(pointer: coarse)').matches) {
			return;
		}
		if (document.getElementById('cursor') || document.getElementById('cur') || document.querySelector('.theme-cursor')) {
			return;
		}

		var body = document.body;
		var navTheme = (body.getAttribute('data-nav-theme') || '').toLowerCase();
		var cursorTheme = (body.getAttribute('data-cursor-theme') || '').toLowerCase();
		var isHome = body.classList.contains('page-home');

		if (!cursorTheme) {
			if (isHome) {
				cursorTheme = 'inicio';
			} else if (navTheme === 'contenido-digital') {
				cursorTheme = 'contenido';
			} else if (navTheme === 'diseno-grafico') {
				cursorTheme = 'diseno';
			} else if (navTheme === 'filmacion-eventos') {
				cursorTheme = 'filmacion';
			}
		}

		if (!cursorTheme) { return; }
		if (navTheme === 'publicidad-offline') { return; }
		if (navTheme === 'produccion-audiovisual' && !isHome) { return; }

		/* ── SVG mira (cruz de mira) ──────────────────────────────── */
		var svgNormal = [
			'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">',
			'<circle cx="14" cy="14" r="4.5" stroke="#5bc8f5" stroke-width="1.5"/>',
			'<line x1="14" y1="2"  x2="14" y2="8"  stroke="#5bc8f5" stroke-width="1.5" stroke-linecap="round"/>',
			'<line x1="14" y1="20" x2="14" y2="26" stroke="#5bc8f5" stroke-width="1.5" stroke-linecap="round"/>',
			'<line x1="2"  y1="14" x2="8"  y2="14" stroke="#5bc8f5" stroke-width="1.5" stroke-linecap="round"/>',
			'<line x1="20" y1="14" x2="26" y2="14" stroke="#5bc8f5" stroke-width="1.5" stroke-linecap="round"/>',
			'</svg>'
		].join('');

		/* En hover: círculo exterior más visible */
		var svgHover = [
			'<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">',
			'<circle cx="14" cy="14" r="9"   stroke="#5bc8f5" stroke-width="1"   opacity="0.45"/>',
			'<circle cx="14" cy="14" r="4.5" stroke="#5bc8f5" stroke-width="1.5"/>',
			'<line x1="14" y1="2"  x2="14" y2="8"  stroke="#5bc8f5" stroke-width="1.5" stroke-linecap="round"/>',
			'<line x1="14" y1="20" x2="14" y2="26" stroke="#5bc8f5" stroke-width="1.5" stroke-linecap="round"/>',
			'<line x1="2"  y1="14" x2="8"  y2="14" stroke="#5bc8f5" stroke-width="1.5" stroke-linecap="round"/>',
			'<line x1="20" y1="14" x2="26" y2="14" stroke="#5bc8f5" stroke-width="1.5" stroke-linecap="round"/>',
			'</svg>'
		].join('');

		var curNormal = 'url("data:image/svg+xml,' + encodeURIComponent(svgNormal) + '") 14 14, crosshair';
		var curHover  = 'url("data:image/svg+xml,' + encodeURIComponent(svgHover)  + '") 14 14, crosshair';

		/* ── Aplicar cursor a todo el body ─────────────────────────── */
		if (!document.getElementById('agencia247-themed-cursor-style')) {
			var cursorStyle = document.createElement('style');
			cursorStyle.id = 'agencia247-themed-cursor-style';
			cursorStyle.textContent =
				'body.has-themed-cursor,'
				+ 'body.has-themed-cursor a,'
				+ 'body.has-themed-cursor button,'
				+ 'body.has-themed-cursor [role="button"],'
				+ 'body.has-themed-cursor input,'
				+ 'body.has-themed-cursor textarea,'
				+ 'body.has-themed-cursor select{'
				+ '  cursor: url("data:image/svg+xml,' + encodeURIComponent(svgNormal) + '") 14 14, crosshair !important;'
				+ '}'
				+ '@media (max-width: 980px){'
				+ '  body.has-themed-cursor, body.has-themed-cursor *{ cursor: auto !important; }'
				+ '}';
			document.head.appendChild(cursorStyle);
		}

		/* ── Reaplicar cursor al hacer resize ──────────────────────── */
		function applyCursor() {
			if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 980) {
				document.body.style.cursor = '';
				document.body.classList.remove('has-themed-cursor');
				return;
			}
			document.body.classList.add('has-themed-cursor');
			document.body.style.cursor = curNormal;
		}

		applyCursor();
		window.addEventListener('resize', applyCursor, { passive: true });

		/* ── Hover: cambiar al SVG con anillo exterior ─────────────── */
		var hoverTargets = document.querySelectorAll(
			'a, button, [role="button"], .service-card, .project-item, .gal-item, .fev-gal-item, .prod-card, .prod-item, .svc-card, .cd-post__img'
		);
		hoverTargets.forEach(function (node) {
			node.addEventListener('mouseenter', function () {
				document.body.style.cursor = curHover;
			});
			node.addEventListener('mouseleave', function () {
				document.body.style.cursor = curNormal;
			});
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
			var minDelay = 72;

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
					timeout = 1600;
					deleting = true;
				} else if (deleting && currentChar <= 0) {
					deleting = false;
					currentWord = (currentWord + 1) % words.length;
					timeout = 320;
				}

				window.setTimeout(tick, timeout);
			}

			window.setTimeout(tick, 500);
		});
	}

	function initRevealAnimations() {
		var revealTargets = document.querySelectorAll(
			'#site-content > section, .service-card, .project-item, .contact-map-card, .img-card, .hero-badge'
		);
		if (!revealTargets.length || !('IntersectionObserver' in window) || reducedMotion) {
			return;
		}

		revealTargets.forEach(function(element) {
			element.setAttribute('data-reveal', '');
		});

		// Group siblings for stagger — sibling index drives delay
		var observer = new IntersectionObserver(function(entries, obs) {
			// Batch entries that become visible together
			var visible = entries.filter(function(e) { return e.isIntersecting; });
			visible.forEach(function(entry, batchIndex) {
				var el = entry.target;
				// Calculate sibling index for natural stagger
				var siblings = el.parentElement ? Array.prototype.slice.call(el.parentElement.children) : [];
				var sibIdx = siblings.indexOf(el);
				var delay = (sibIdx >= 0 ? sibIdx : batchIndex) * 80;
				// Cap stagger at 400ms
				delay = Math.min(delay, 400);
				window.setTimeout(function() {
					el.classList.add('is-visible');
				}, delay);
				obs.unobserve(el);
			});
		}, {
			rootMargin: '0px 0px -8% 0px',
			threshold: 0.10
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

	function getMapFallbackElement(mapElement) {
		return mapElement.querySelector('[data-map-fallback]');
	}

	function hideMapFallback(mapElement) {
		var fallbackElement = getMapFallbackElement(mapElement);
		if (!fallbackElement) {
			return;
		}
		fallbackElement.setAttribute('hidden', 'hidden');
	}

	function showMapFallback(mapElement) {
		var fallbackElement = getMapFallbackElement(mapElement);
		if (!fallbackElement) {
			return;
		}
		fallbackElement.removeAttribute('hidden');
	}

	function activateMapFallback(mapElement) {
		showMapFallback(mapElement);
		setMapStatus(
			mapElement,
			'fallback',
			getMapText(mapElement, 'data-fallback-text', 'Mostrando mapa alternativo.')
		);
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

	function createMapMarker(logoUrl, radarEnabled, address, mapTitle) {
		var markerElement = document.createElement('div');
		markerElement.className = 'contact-map-marker';
		var markerLabel = address || mapTitle || 'Ubicacion de referencia';
		markerElement.setAttribute('role', 'button');
		markerElement.setAttribute('tabindex', '0');
		markerElement.setAttribute('title', markerLabel);
		markerElement.setAttribute('aria-label', 'Ver ubicacion: ' + markerLabel);

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

	function createMapPopupContent(mapTitle, address, popupText) {
		var popupContainer = document.createElement('div');
		popupContainer.className = 'contact-map-popup-content';

		if (mapTitle) {
			var popupTitle = document.createElement('p');
			popupTitle.className = 'contact-map-popup-title';
			popupTitle.textContent = mapTitle;
			popupContainer.appendChild(popupTitle);
		}

		if (address) {
			var popupAddress = document.createElement('p');
			popupAddress.className = 'contact-map-popup-address';
			popupAddress.textContent = address;
			popupContainer.appendChild(popupAddress);
		}

		if (popupText) {
			var popupBody = document.createElement('p');
			popupBody.className = 'contact-map-popup-body';
			popupBody.textContent = popupText;
			popupContainer.appendChild(popupBody);
		}

		return popupContainer;
	}

	function renderContactMap(mapElement) {
		if (!mapElement) {
			return false;
		}

		if (mapElement.getAttribute('data-map-ready') === '1' || mapElement.getAttribute('data-map-initializing') === '1') {
			return true;
		}

		if (typeof window.maplibregl === 'undefined') {
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
		var mapTitle = mapElement.getAttribute('data-map-title') || 'Ubicacion de referencia';
		var mapAddress = mapElement.getAttribute('data-address') || '';
		var mapPopupText = mapElement.getAttribute('data-popup-text') || '';

		if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
			activateMapFallback(mapElement);
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

			var markerElement = createMapMarker(logoUrl, radarEnabled, mapAddress, mapTitle);
			new window.maplibregl.Marker({
				element: markerElement,
				anchor: 'center'
			}).setLngLat([lon, lat]).addTo(map);

			var markerPopup = new window.maplibregl.Popup({
				offset: 26,
				closeButton: true,
				closeOnClick: true,
				className: 'contact-map-popup'
			}).setLngLat([lon, lat]).setDOMContent(createMapPopupContent(mapTitle, mapAddress, mapPopupText));

			function focusMarkerLocation(openPopup) {
				var baseZoom = Number.isFinite(zoom) ? zoom : 13.4;
				var focusZoom = Math.min(Math.max(baseZoom + 2.2, 16.4), 18.6);

				if (reducedMotion) {
					map.jumpTo({
						center: [lon, lat],
						zoom: focusZoom
					});
				} else {
					map.easeTo({
						center: [lon, lat],
						zoom: focusZoom,
						duration: 900,
						essential: true
					});
				}

				if (openPopup) {
					markerPopup.addTo(map);
				}
			}

			markerElement.addEventListener('click', function(event) {
				event.preventDefault();
				event.stopPropagation();
				focusMarkerLocation(true);
			});

			markerElement.addEventListener('keydown', function(event) {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					focusMarkerLocation(true);
				}
			});

			map.on('load', function() {
				mapElement.setAttribute('data-map-ready', '1');
				mapElement.removeAttribute('data-map-initializing');
				setMapStatus(mapElement, 'ready');
				hideMapFallback(mapElement);
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
					activateMapFallback(mapElement);
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
			activateMapFallback(mapElement);
			return false;
		}
	}

	function initContactMap() {
		var mapElement = document.getElementById('agencia247-contact-map');
		if (!mapElement) {
			return;
		}

		if (!isMapEnabled(mapElement)) {
			activateMapFallback(mapElement);
			return;
		}

		setMapStatus(mapElement, 'loading', getMapText(mapElement, 'data-loading-text', 'Cargando mapa...'));

		function bootMap() {
			loadMapLibrary(function(loaded) {
				if (!loaded) {
					activateMapFallback(mapElement);
					return;
				}
				if (!renderContactMap(mapElement) && mapElement.getAttribute('data-map-ready') !== '1') {
					activateMapFallback(mapElement);
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
		if (!waButton) {
			return;
		}

		var pathname = normalizePathname(window.location.pathname).toLowerCase();
		var waContext = (document.body.getAttribute('data-wa-context') || '').toLowerCase();
		var defaultMessage = waButton.getAttribute('data-wa-default') || 'Hola, quiero informacion sobre sus servicios.';
		var messages = {
			inicio: 'Hola, estoy interesado en agendar una cita para potenciar mi marca.',
			servicios: 'Hola, quiero informacion sobre todos sus servicios.',
			proyectos: 'Hola, estoy revisando sus proyectos y quiero una propuesta para mi marca.',
			contacto: 'Hola, quiero comunicarme con Agencia 24/7 para recibir una cotizacion.',
			contenido_digital: 'Hola, me interesa el servicio de creacion de contenido y campanas digitales.',
			diseno_grafico: 'Hola, me interesa el servicio de diseno grafico corporativo y publicitario.',
			produccion_audiovisual: 'Hola, me interesa el servicio de produccion audiovisual.',
			publicidad_offline: 'Hola, me interesa el servicio de publicidad offline.',
			filmacion_eventos: 'Hola, me interesa el servicio de filmacion profesional de eventos.'
		};

		if (!waContext) {
			if (pathname === '/' || /\/index(?:\.html)?$/i.test(pathname)) {
				waContext = 'inicio';
			} else if (/\/servicios(?:\.html)?$/i.test(pathname)) {
				waContext = 'servicios';
			} else if (pathname.indexOf('/servicios/contenidodigital') !== -1) {
				waContext = 'contenido_digital';
			} else if (pathname.indexOf('/servicios/disenografico') !== -1) {
				waContext = 'diseno_grafico';
			} else if (pathname.indexOf('/servicios/produccionaudiovisual') !== -1) {
				waContext = 'produccion_audiovisual';
			} else if (pathname.indexOf('/servicios/publicidadoffline') !== -1) {
				waContext = 'publicidad_offline';
			} else if (pathname.indexOf('/servicios/filmacioneventos') !== -1) {
				waContext = 'filmacion_eventos';
			} else if (/\/proyectos(?:\.html)?$/i.test(pathname)) {
				waContext = 'proyectos';
			} else if (/\/contacto(?:\.html)?$/i.test(pathname)) {
				waContext = 'contacto';
			}
		}

		var waMessage = messages[waContext] || defaultMessage;
		var waNumber = waButton.getAttribute('data-wa-number') || '';
		if (!waNumber) {
			var hrefMatch = (waButton.getAttribute('href') || '').match(/wa\.me\/(\d+)/i);
			if (hrefMatch && hrefMatch[1]) {
				waNumber = hrefMatch[1];
			}
		}
		if (!waNumber) {
			waNumber = '51987654321';
		}

		waButton.setAttribute('href', 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(waMessage));
		waButton.setAttribute('aria-label', 'WhatsApp: ' + waMessage);

		if (!footer || !('IntersectionObserver' in window)) {
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

	function normalizeFormFieldAccessibility() {
		var autoIndex = 0;
		var fields = document.querySelectorAll('input, select, textarea');
		fields.forEach(function(field) {
			var tagName = field.tagName ? field.tagName.toLowerCase() : '';
			var type = (field.getAttribute('type') || '').toLowerCase();
			if (tagName === 'input' && (type === 'hidden' || type === 'submit' || type === 'button' || type === 'reset')) {
				return;
			}

			if (!field.id) {
				autoIndex += 1;
				field.id = 'agencia247-field-' + autoIndex;
			}

			if (!field.name) {
				field.name = field.id;
			}
		});

		var labels = document.querySelectorAll('label[for]');
		labels.forEach(function(label) {
			var targetId = label.getAttribute('for');
			if (targetId && document.getElementById(targetId)) {
				return;
			}

			var parent = label.parentElement;
			if (!parent) {
				return;
			}

			var relatedField = parent.querySelector('input, select, textarea');
			if (!relatedField) {
				return;
			}

			if (!relatedField.id) {
				autoIndex += 1;
				relatedField.id = 'agencia247-field-' + autoIndex;
			}

			if (!relatedField.name) {
				relatedField.name = relatedField.id;
			}

			label.setAttribute('for', relatedField.id);
		});
	}

	function handleScroll() {
		updateNavState();
		setActiveLink();
	}

	initMenuHoverIntent();
	initNavSmoothScroll();
	initBrandLogo();
	initThemedCursor();
	initDynamicText();
	initRevealAnimations();
	initContactMap();
	initFloatingWhatsApp();
	normalizeFormFieldAccessibility();
	handleScroll();
	window.addEventListener('scroll', handleScroll, { passive: true });
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', agencia247MainInit);
} else {
	agencia247MainInit();
}

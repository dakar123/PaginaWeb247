// Main JS for Agencia247 theme.
document.addEventListener('DOMContentLoaded', function() {
	var themeConfig = window.agencia247Theme || {};
	var uiConfig = themeConfig.ui || {};
	var nav = document.querySelector('.site-nav');
	var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav .primary-menu a'));
	var sections = ['#hero', '#servicios', '#proyectos', '#contacto'];
	var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var navDropdownDelay = parseInt(uiConfig.navDropdownDelay, 10);
	var openLayersLoader = {
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

	function appendOpenLayersCss(assetBase) {
		var existingCss = document.querySelector('link[data-agencia247-ol="1"], link[href*="/openlayers/ol.css"], link[href*="cdn.jsdelivr.net/npm/ol@"], link[href*="unpkg.com/ol@"]');
		if (existingCss) {
			return;
		}

		var cssHref = assetBase ? assetBase + 'ol.css' : 'https://cdn.jsdelivr.net/npm/ol@10.6.1/ol.css';
		var cssLink = document.createElement('link');
		cssLink.rel = 'stylesheet';
		cssLink.href = cssHref;
		cssLink.setAttribute('data-agencia247-ol', '1');
		document.head.appendChild(cssLink);
	}

	function loadOpenLayersAssets(done) {
		if (typeof done !== 'function') {
			return;
		}

		if (typeof window.ol !== 'undefined') {
			done(true);
			return;
		}

		openLayersLoader.callbacks.push(done);
		if (openLayersLoader.loading) {
			return;
		}
		openLayersLoader.loading = true;

		var localizedMap = getMapConfig();
		var assetBase = typeof localizedMap.assetBase === 'string' ? localizedMap.assetBase : '';
		if (assetBase !== '' && assetBase.charAt(assetBase.length - 1) !== '/') {
			assetBase += '/';
		}
		appendOpenLayersCss(assetBase);

		var sourceCandidates = [];
		if (assetBase !== '') {
			sourceCandidates.push(assetBase + 'ol.js');
		}
		sourceCandidates.push('https://cdn.jsdelivr.net/npm/ol@10.6.1/dist/ol.js');
		sourceCandidates.push('https://unpkg.com/ol@10.6.1/dist/ol.js');

		function finish(success) {
			var queue = openLayersLoader.callbacks.slice();
			openLayersLoader.callbacks = [];
			openLayersLoader.loading = false;
			queue.forEach(function(callback) {
				callback(success);
			});
		}

		function tryNextSource(index) {
			if (typeof window.ol !== 'undefined') {
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
			script.setAttribute('data-agencia247-ol', '1');
			script.addEventListener('load', function() {
				if (typeof window.ol !== 'undefined') {
					script.setAttribute('data-agencia247-ol-loaded', '1');
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
				if (typeof window.ol !== 'undefined') {
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

		var existingScript = document.querySelector('script[data-agencia247-ol="1"], script[src*="/openlayers/ol.js"], script[src*="cdn.jsdelivr.net/npm/ol@"], script[src*="unpkg.com/ol@"]');
		if (existingScript) {
			waitForLibrary(0);
			return;
		}

		tryNextSource(0);
	}

	function renderContactMap(mapElement) {
		if (!mapElement || mapElement.getAttribute('data-map-ready') === '1' || typeof window.ol === 'undefined') {
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

		if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
			setMapStatus(mapElement, 'error', getMapText(mapElement, 'data-error-text', 'No se pudo cargar el mapa en este momento.'));
			return false;
		}

		var center = ol.proj.fromLonLat([lon, lat]);
		var marker = new ol.Feature({
			geometry: new ol.geom.Point(center)
		});
		var halo = new ol.Feature({
			geometry: new ol.geom.Point(center)
		});
		halo.setStyle(new ol.style.Style({
			image: new ol.style.Circle({
				radius: 20,
				fill: new ol.style.Fill({ color: 'rgba(35,81,245,0.16)' }),
				stroke: new ol.style.Stroke({ color: 'rgba(35,81,245,0.48)', width: 2 })
			})
		}));

		var markerStyle;
		if (logoUrl) {
			markerStyle = [
				new ol.style.Style({
					image: new ol.style.Circle({
						radius: 16,
						fill: new ol.style.Fill({ color: '#ffffff' }),
						stroke: new ol.style.Stroke({ color: 'rgba(35,81,245,0.35)', width: 3 })
					})
				}),
				new ol.style.Style({
					image: new ol.style.Icon({
						src: logoUrl,
						scale: 0.19,
						anchor: [0.5, 0.5],
						anchorXUnits: 'fraction',
						anchorYUnits: 'fraction',
						crossOrigin: 'anonymous'
					})
				})
			];
		} else {
			markerStyle = new ol.style.Style({
				image: new ol.style.Circle({
					radius: 9,
					fill: new ol.style.Fill({ color: '#2351f5' }),
					stroke: new ol.style.Stroke({ color: '#ffffff', width: 3 })
				})
			});
		}
		marker.setStyle(markerStyle);

		var markerLayer = new ol.layer.Vector({
			source: new ol.source.Vector({
				features: [halo, marker]
			})
		});

		var controlsFactory = null;
		if (ol.control && ol.control.defaults) {
			if (typeof ol.control.defaults === 'function') {
				controlsFactory = ol.control.defaults;
			} else if (typeof ol.control.defaults.defaults === 'function') {
				controlsFactory = ol.control.defaults.defaults;
			}
		}

		var mapOptions = {
			target: mapElement,
			layers: [
				new ol.layer.Tile({
					source: new ol.source.OSM()
				}),
				markerLayer
			],
			view: new ol.View({
				center: center,
				zoom: Number.isFinite(zoom) ? zoom : 13.4
			})
		};

		if (controlsFactory) {
			mapOptions.controls = controlsFactory({
				zoom: false,
				rotate: false,
				attribution: true
			});
		}

		var map = new ol.Map(mapOptions);
		mapElement.setAttribute('data-map-ready', '1');
		setMapStatus(mapElement, 'ready');

		if (!reducedMotion) {
			map.getView().animate({
				center: center,
				zoom: Math.max((Number.isFinite(zoom) ? zoom : 13.4), 14.8),
				duration: 900
			});
		}

		if (typeof ResizeObserver !== 'undefined') {
			var resizeObserver = new ResizeObserver(function() {
				map.updateSize();
			});
			resizeObserver.observe(mapElement);
		}

		return true;
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
			loadOpenLayersAssets(function(loaded) {
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

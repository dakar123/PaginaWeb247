// Main JS for Agencia247 theme.
document.addEventListener('DOMContentLoaded', function() {
	var themeConfig = window.agencia247Theme || {};
	var uiConfig = themeConfig.ui || {};
	var nav = document.querySelector('.site-nav');
	var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav .primary-menu a'));
	var sections = ['#hero', '#servicios', '#proyectos', '#contacto'];
	var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var navDropdownDelay = parseInt(uiConfig.navDropdownDelay, 10);

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

	function loadOpenLayersAssets(done) {
		if (typeof window.ol !== 'undefined') {
			done();
			return;
		}

		var existingScript = document.querySelector('script[data-agencia247-ol="1"], script[src*="cdn.jsdelivr.net/npm/ol@"], script[src*="unpkg.com/ol@"], script[src*="/ol.js"]');
		if (existingScript) {
			if (existingScript.getAttribute('data-agencia247-ol-loaded') === '1') {
				done();
				return;
			}

			var settled = false;
			var waitForOl = window.setInterval(function() {
				if (typeof window.ol !== 'undefined') {
					window.clearInterval(waitForOl);
					settled = true;
					done();
				}
			}, 120);

			existingScript.addEventListener('load', function() {
				existingScript.setAttribute('data-agencia247-ol-loaded', '1');
				if (!settled) {
					window.clearInterval(waitForOl);
					done();
				}
			}, { once: true });

			existingScript.addEventListener('error', function() {
				window.clearInterval(waitForOl);
				injectOpenLayersScript(done, true);
			}, { once: true });
			return;
		}

		if (!document.querySelector('link[data-agencia247-ol="1"], link[href*="cdn.jsdelivr.net/npm/ol@"], link[href*="unpkg.com/ol@"]')) {
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = 'https://cdn.jsdelivr.net/npm/ol@10.6.1/ol.css';
			link.setAttribute('data-agencia247-ol', '1');
			document.head.appendChild(link);
		}

		injectOpenLayersScript(done, false);
	}

	function injectOpenLayersScript(done, useFallbackCdn) {
		var script = document.createElement('script');
		script.src = useFallbackCdn
			? 'https://unpkg.com/ol@10.6.1/dist/ol.js'
			: 'https://cdn.jsdelivr.net/npm/ol@10.6.1/dist/ol.js';
		script.async = true;
		script.setAttribute('data-agencia247-ol', '1');
		script.addEventListener('load', function() {
			script.setAttribute('data-agencia247-ol-loaded', '1');
			done();
		}, { once: true });
		script.addEventListener('error', function() {
			if (!useFallbackCdn) {
				injectOpenLayersScript(done, true);
			}
		}, { once: true });
		document.body.appendChild(script);
	}

	function renderContactMap() {
		var mapElement = document.getElementById('agencia247-contact-map');
		if (!mapElement || mapElement.getAttribute('data-map-ready') === '1' || typeof window.ol === 'undefined') {
			return;
		}

		var datasetLat = parseFloat(mapElement.getAttribute('data-lat') || '');
		var datasetLon = parseFloat(mapElement.getAttribute('data-lon') || '');
		var datasetZoom = parseFloat(mapElement.getAttribute('data-zoom') || '');
		var localizedMap = themeConfig.map || {};
		var lat = Number.isFinite(datasetLat) ? datasetLat : parseFloat(localizedMap.lat || '');
		var lon = Number.isFinite(datasetLon) ? datasetLon : parseFloat(localizedMap.lon || '');
		var zoom = Number.isFinite(datasetZoom) ? datasetZoom : parseFloat(localizedMap.zoom || '13.4');
		var logoUrl = mapElement.getAttribute('data-logo-url') || localizedMap.logoUrl || '';

		if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
			return;
		}

		var center = ol.proj.fromLonLat([lon, lat]);
		var marker = new ol.Feature({
			geometry: new ol.geom.Point(center)
		});

		var markerStyle;
		if (logoUrl) {
			markerStyle = new ol.style.Style({
				image: new ol.style.Icon({
					src: logoUrl,
					scale: 0.2,
					anchor: [0.5, 0.5],
					anchorXUnits: 'fraction',
					anchorYUnits: 'fraction'
				})
			});
		} else {
			markerStyle = new ol.style.Style({
				image: new ol.style.Circle({
					radius: 8,
					fill: new ol.style.Fill({ color: '#2351f5' }),
					stroke: new ol.style.Stroke({ color: '#ffffff', width: 3 })
				})
			});
		}

		marker.setStyle(markerStyle);

		var markerLayer = new ol.layer.Vector({
			source: new ol.source.Vector({
				features: [marker]
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

		if (!reducedMotion) {
			map.getView().animate({ center: center, zoom: Math.max((Number.isFinite(zoom) ? zoom : 13.4), 14.8), duration: 900 });
		}

		if (typeof ResizeObserver !== 'undefined') {
			var resizeObserver = new ResizeObserver(function() {
				map.updateSize();
			});
			resizeObserver.observe(mapElement);
		}

		mapElement.setAttribute('data-map-ready', '1');
	}

	function initContactMap() {
		var mapElement = document.getElementById('agencia247-contact-map');
		if (!mapElement) {
			return;
		}

		function bootMap() {
			loadOpenLayersAssets(function() {
				renderContactMap();
			});
		}

		bootMap();
		window.setTimeout(bootMap, 900);
		window.setTimeout(bootMap, 2200);
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

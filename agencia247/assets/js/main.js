// Main JS for Agencia247 theme.
document.addEventListener('DOMContentLoaded', function() {
	var nav = document.querySelector('.site-nav');
	var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav .primary-menu a'));
	var sections = ['#hero', '#servicios', '#proyectos', '#contacto'];
	var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
				}, 220);
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

	function initContactMap() {
		var mapElement = document.getElementById('agencia247-contact-map');
		if (!mapElement || typeof window.ol === 'undefined') {
			return;
		}

		var datasetLat = parseFloat(mapElement.getAttribute('data-lat') || '');
		var datasetLon = parseFloat(mapElement.getAttribute('data-lon') || '');
		var localizedMap = (window.agencia247Theme && window.agencia247Theme.map) ? window.agencia247Theme.map : {};
		var lat = Number.isFinite(datasetLat) ? datasetLat : parseFloat(localizedMap.lat || '');
		var lon = Number.isFinite(datasetLon) ? datasetLon : parseFloat(localizedMap.lon || '');
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

		var map = new ol.Map({
			target: mapElement,
			layers: [
				new ol.layer.Tile({
					source: new ol.source.OSM()
				}),
				markerLayer
			],
			view: new ol.View({
				center: center,
				zoom: 13.4
			}),
			controls: ol.control.defaults({
				zoom: false,
				rotate: false,
				attribution: true
			})
		});

		if (!reducedMotion) {
			map.getView().animate({ center: center, zoom: 15, duration: 900 });
		}

		if (typeof ResizeObserver !== 'undefined') {
			var resizeObserver = new ResizeObserver(function() {
				map.updateSize();
			});
			resizeObserver.observe(mapElement);
		}
	}

	function handleScroll() {
		updateNavState();
		setActiveLink();
	}

	initMenuHoverIntent();
	initNavSmoothScroll();
	initDynamicText();
	initRevealAnimations();
	initContactMap();
	handleScroll();
	window.addEventListener('scroll', handleScroll, { passive: true });
});

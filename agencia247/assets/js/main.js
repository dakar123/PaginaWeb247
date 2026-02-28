// Main JS for Agencia247 theme.
document.addEventListener('DOMContentLoaded', function() {
	var navLinks = Array.prototype.slice.call(document.querySelectorAll('nav ul a'));
	var sections = ['#hero', '#servicios', '#proyectos', '#contacto'];

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
			if (section && window.scrollY >= section.offsetTop - 90) {
				current = id;
			}
		});

		navLinks.forEach(function(link) {
			if (linkHash(link) === current) {
				link.classList.add('active');
			} else {
				link.classList.remove('active');
			}
		});
	}

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
			target.scrollIntoView({ behavior: 'smooth' });
			if (history.pushState) {
				history.pushState(null, '', hash);
			}
		});
	});

	window.addEventListener('scroll', setActiveLink);
	setActiveLink();
});
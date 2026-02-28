// Main JS for Agencia 24·7 theme. Adds smooth scroll, nav highlight, and simple animations.
document.addEventListener('DOMContentLoaded', function() {
	// Smooth scroll for anchor links
	document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
		anchor.addEventListener('click', function(e) {
			var target = document.querySelector(this.getAttribute('href'));
			if(target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth' });
			}
		});
	});
	// Nav highlight on scroll
	const sections = ['#hero','#servicios','#proyectos','#contacto'];
	const navLinks = document.querySelectorAll('nav ul a');
	window.addEventListener('scroll', function() {
		let current = '';
		sections.forEach(id => {
			const section = document.querySelector(id);
			if(section && window.scrollY >= section.offsetTop - 80) {
				current = id;
			}
		});
		navLinks.forEach(link => {
			link.classList.remove('active');
			if(link.getAttribute('href') === current) {
				link.classList.add('active');
			}
		});
	});
	// Simple fade-in animation
	document.querySelectorAll('.fadeUp').forEach(function(el) {
		el.classList.add('animated');
	});
});
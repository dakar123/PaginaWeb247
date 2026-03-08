/* ================================================================
   AGENCIA 247 — publicidadOffline.js
   Animaciones: partículas, cursor, contador, scroll reveal,
   parallax hero, drag gallery, tilt cards
================================================================ */

document.addEventListener('DOMContentLoaded', () => {

 


  /* ─────────────────────────────────────
     2. BARRA DE PROGRESO
  ───────────────────────────────────── */
  const progressBar = document.getElementById('progress-bar');
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (progressBar) progressBar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });


  /* ─────────────────────────────────────
     3. SCROLL REVEAL — IntersectionObserver
  ───────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        revObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revObs.observe(el));


  /* ─────────────────────────────────────
     4. CANVAS DE PARTÍCULAS — hero
     Puntos pequeños flotando, conectados por líneas
  ───────────────────────────────────── */
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    const COUNT = 60;
    const MAX_DIST = 130;
    const COLOR_DOT  = 'rgba(91,200,245,';
    const COLOR_LINE = 'rgba(35,83,232,';

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = canvas.closest('section')?.offsetHeight || window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function createParticle() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.5 + 0.2,
      };
    }
    for (let i = 0; i < COUNT; i++) particles.push(createParticle());

    function drawParticles() {
      ctx.clearRect(0, 0, W, H);

      // Líneas de conexión
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            ctx.beginPath();
            ctx.strokeStyle = COLOR_LINE + (0.12 * (1 - dist / MAX_DIST)) + ')';
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      // Puntos
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = COLOR_DOT + p.alpha + ')';
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });

      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }


  /* ─────────────────────────────────────
     5. PARALLAX — hero bg en scroll
  ───────────────────────────────────── */
  const heroBgImg = document.querySelector('.s-hero__bg img');
  if (heroBgImg) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight * 1.2) {
        heroBgImg.style.transform = `scale(1.06) translateY(${window.scrollY * 0.22}px)`;
      }
    }, { passive: true });
  }


  /* ─────────────────────────────────────
     6. CONTADOR ANIMADO — stats section
  ───────────────────────────────────── */
  function animateCount(el, target, suffix, duration = 1600) {
    let start = null;
    const run = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }

  const featureSection = document.querySelector('.s-feature');
  if (featureSection) {
    const counterObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.s-feature__stat-num[data-target]').forEach(el => {
          animateCount(el, parseInt(el.dataset.target), el.dataset.suffix || '');
        });
        counterObs.disconnect();
      }
    }, { threshold: 0.4 });
    counterObs.observe(featureSection);
  }


  /* ─────────────────────────────────────
     7. DRAG SCROLL — galería horizontal
  ───────────────────────────────────── */
  const strip = document.getElementById('gallery-strip');
  if (strip) {
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let velocity = 0;
    let lastX = 0;
    let rafId = null;

    strip.addEventListener('mousedown', e => {
      isDragging = true;
      startX = e.pageX - strip.offsetLeft;
      scrollLeft = strip.scrollLeft;
      lastX = e.pageX;
      velocity = 0;
      strip.classList.add('gallery-strip--dragging');
      cancelAnimationFrame(rafId);
    });
    window.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      strip.classList.remove('gallery-strip--dragging');
      // Inercia
      function inertia() {
        if (Math.abs(velocity) < 0.5) return;
        strip.scrollLeft += velocity;
        velocity *= 0.92;
        rafId = requestAnimationFrame(inertia);
      }
      inertia();
    });
    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - strip.offsetLeft;
      strip.scrollLeft = scrollLeft - (x - startX);
      velocity = e.pageX - lastX;
      lastX = e.pageX;
    });

    // Touch
    let touchStartX = 0, touchScrollLeft = 0;
    strip.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].pageX;
      touchScrollLeft = strip.scrollLeft;
    }, { passive: true });
    strip.addEventListener('touchmove', e => {
      const dx = e.touches[0].pageX - touchStartX;
      strip.scrollLeft = touchScrollLeft - dx;
    }, { passive: true });
  }


  /* ─────────────────────────────────────
     8. TILT 3D — prod-items
  ───────────────────────────────────── */
  document.querySelectorAll('.prod-item').forEach(item => {
    item.addEventListener('mousemove', e => {
      const r = item.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - 0.5) * 7;
      const y = ((e.clientY - r.top)  / r.height - 0.5) * 7;
      item.style.transform = `translateY(-6px) rotateY(${x}deg) rotateX(${-y}deg)`;
      item.style.transition = 'transform 0.06s linear';
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
      item.style.transition = 'transform 0.55s cubic-bezier(0.16,1,0.3,1)';
    });
  });


 


  /* ─────────────────────────────────────
     10. TEXTO HERO — animación de split
     Cada letra del título aparece con stagger
  ───────────────────────────────────── */
  function splitTextAnimate(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    const lines = el.innerHTML.split('<br>');
    el.innerHTML = lines.map((line, li) =>
      `<span style="display:block;overflow:hidden"><span style="display:block;animation:lineReveal 0.8s cubic-bezier(0.16,1,0.3,1) both ${0.3 + li * 0.15}s">${line}</span></span>`
    ).join('');

    const style = document.createElement('style');
    style.textContent = `
      @keyframes lineReveal {
        from { transform: translateY(105%); opacity: 0; }
        to   { transform: translateY(0);   opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
  splitTextAnimate('.s-hero__title');


  /* ─────────────────────────────────────
     11. PARALLAX SUTIL — secciones internas
  ───────────────────────────────────── */
  const parallaxImgs = document.querySelectorAll(
    '.s-statement__img img, .s-feature__bg img, .s-quote__bg img, .s-cta__bg img'
  );
  if (parallaxImgs.length && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      parallaxImgs.forEach(img => {
        const sect = img.closest('section') || img.parentElement.parentElement;
        const rect = sect.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const pct = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        img.style.transform = `translateY(${(pct - 0.5) * 60}px)`;
      });
    }, { passive: true });
  }

});

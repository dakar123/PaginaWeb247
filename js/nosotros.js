/* ================================================================
   AGENCIA 247 — nosotros.js
   Progreso · hero reveal · scroll reveal · contador · parallax
================================================================ */

(function () {
  'use strict';

  /* ─── Activar modo JS: oculta elementos animados ────────────── */
  // Sin esto, [data-reveal] y el hero text se quedan en opacity:0
  document.documentElement.classList.add('js-ready');
  // Alias: algunos selectores usan body.js-ready
  document.body.classList.add('js-ready');


  /* ─── 1. BARRA DE PROGRESO ──────────────────────────────────── */
  const bar = document.getElementById('ns-progress');
  if (bar) {
    window.addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? Math.min(window.scrollY / max * 100, 100) : 0) + '%';
    }, { passive: true });
  }


  /* ─── 2. HERO — LINE REVEAL ─────────────────────────────────── */
  // Envuelve cada .ns-hero__line en un span.ns-hero__line-inner
  document.querySelectorAll('.ns-hero__line').forEach(line => {
    const inner = document.createElement('span');
    inner.className = 'ns-hero__line-inner';
    inner.innerHTML = line.innerHTML;
    line.innerHTML  = '';
    line.appendChild(inner);
  });

  const eyebrow   = document.querySelector('.ns-eyebrow');
  const heroSub   = document.querySelector('.ns-hero__sub');
  const lineInners = document.querySelectorAll('.ns-hero__line-inner');

  // Forzar reflow antes de animar para que la transición CSS funcione
  document.body.offsetHeight;

  setTimeout(() => eyebrow?.classList.add('is-in'), 200);
  lineInners.forEach((el, i) =>
    setTimeout(() => el.classList.add('is-in'), 360 + i * 150)
  );
  setTimeout(() => heroSub?.classList.add('is-in'),
    360 + lineInners.length * 150 + 100
  );


  /* ─── 3. SCROLL REVEAL ──────────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.dataset.delay) el.style.transitionDelay = el.dataset.delay;
        el.classList.add('is-in');
        obs.unobserve(el);
      });
    }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
  } else {
    // Fallback: mostrar todo de inmediato si no hay IntersectionObserver
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-in'));
  }


  /* ─── 4. CONTADOR DE STATS ──────────────────────────────────── */
  const statsSection = document.querySelector('.ns-stats');
  if (statsSection && 'IntersectionObserver' in window) {
    let done = false;
    const countObs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || done) return;
      done = true;

      document.querySelectorAll('.ns-stat__num[data-target]').forEach(el => {
        const target   = parseInt(el.dataset.target, 10);
        const suffix   = el.dataset.suffix || '';
        const duration = 1400;
        let startTime  = null;

        const tick = (ts) => {
          if (!startTime) startTime = ts;
          const p     = Math.min((ts - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });

      countObs.disconnect();
    }, { threshold: 0.40 });

    countObs.observe(statsSection);
  }


  /* ─── 5. PARALLAX — imagen separadora ──────────────────────── */
  const fullImg  = document.getElementById('ns-fullimg-parallax');
  const fullSect = fullImg?.closest('.ns-fullimg__inner');

  if (fullImg && fullSect && window.innerWidth > 768) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = fullSect.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          const pct    = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
          fullImg.style.transform = `translateY(${(pct - 0.5) * 70}px)`;
        }
        ticking = false;
      });
    }, { passive: true });
  }

})();

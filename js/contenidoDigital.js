/* ================================================================
   AGENCIA 247 — contenidoDigital.js
================================================================ */
(function () {
  'use strict';

  /* ── SCROLL REVEAL ────────────────────────────────────────── */
  const revEls = document.querySelectorAll('.reveal');
  if (revEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, { threshold: 0.10, rootMargin: '0px 0px -36px 0px' });
    revEls.forEach(el => io.observe(el));
  }

  /* ── COUNT-UP ─────────────────────────────────────────────── */
  function countUp(el, target, duration = 1500) {
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      el.childNodes[0].textContent = Math.floor(e * target);
      if (p < 1) requestAnimationFrame(step);
      else el.childNodes[0].textContent = target;
    }
    requestAnimationFrame(step);
  }
  const statEls = document.querySelectorAll('.cd-hero__bar-val[data-target]');
  if (statEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { countUp(e.target, +e.target.dataset.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    statEls.forEach(el => io.observe(el));
  }

  /* ── ENGAGE BUTTONS — like / comment / share ─────────────── */
  document.querySelectorAll('.engage__btn').forEach(btn => {
    btn.addEventListener('click', function () {
      if (this.dataset.action === 'like') {
        this.classList.toggle('liked');
      }
      this.style.transform = 'scale(1.35)';
      setTimeout(() => { this.style.transform = ''; }, 160);
    });
  });

  /* ── PROGRESS BARS — animate on scroll ───────────────────── */
  const bars = document.querySelectorAll('.cd-bar-item__fill');
  if (bars.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('animated'); io.unobserve(e.target); }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => io.observe(b));
  }

  /* ── LIGHTBOX ─────────────────────────────────────────────── */
  const lb = document.getElementById('cdLightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCounter = document.getElementById('lbCounter');
  let images = [], idx = 0;

  function buildImages() {
    images = [];
    document.querySelectorAll('.cd-post__img, .cd-exp-item img, .cd-post-img').forEach(img => {
      images.push({ src: img.src, alt: img.alt });
    });
  }
  
  function openLb(i) {
    if (!lb || !images.length) return;
    idx = ((i % images.length) + images.length) % images.length;
    lbImg.src = images[idx].src; lbImg.alt = images[idx].alt;
    lbCounter.textContent = (idx + 1) + ' / ' + images.length;
    lb.classList.add('cd-lb--open'); document.body.style.overflow = 'hidden';
  }
  function closeLb() { lb.classList.remove('cd-lb--open'); document.body.style.overflow = ''; }

  document.getElementById('lbClose')?.addEventListener('click', closeLb);
  document.getElementById('lbPrev')?.addEventListener('click',  () => openLb(idx - 1));
  document.getElementById('lbNext')?.addEventListener('click',  () => openLb(idx + 1));
  lb?.addEventListener('click', e => { if (e.target === lb) closeLb(); });

  buildImages();
  document.querySelectorAll('.cd-post__img, .cd-exp-item img, .cd-post-img').forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => { buildImages(); openLb(i); });
  });

  document.addEventListener('keydown', e => {
    if (!lb?.classList.contains('cd-lb--open')) return;
    if (e.key === 'ArrowLeft')  openLb(idx - 1);
    if (e.key === 'ArrowRight') openLb(idx + 1);
    if (e.key === 'Escape')     closeLb();
  });

  /* ── SMOOTH SCROLL ────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 28, behavior: 'smooth' }); }
    });
  });

})();

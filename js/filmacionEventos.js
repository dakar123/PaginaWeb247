/* ================================================================
   AGENCIA 247 — filmacionEventos.js
   Módulos: Navbar · Timecode HUD · CountUp · ScrollReveal ·
            Gallery Filter · Video Modal · Lightbox · Parallax
================================================================ */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────
     1. NAVBAR — scroll effect
  ─────────────────────────────────────────────── */
  const nav = document.getElementById('fevNav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ──────────────────────────────────────────────
     2. HUD TIMECODE — reloj en tiempo real
  ─────────────────────────────────────────────── */
  const hudTc = document.getElementById('hudTimecode');
  if (hudTc) {
    const start = Date.now();
    function updateTC() {
      const elapsed     = Date.now() - start;
      const totalFrames = Math.floor(elapsed / (1000 / 60));
      const frames  = totalFrames % 60;
      const totalSec = Math.floor(elapsed / 1000);
      const sec  = totalSec % 60;
      const min  = Math.floor(totalSec / 60) % 60;
      const hr   = Math.floor(totalSec / 3600) % 24;
      hudTc.textContent =
        String(hr).padStart(2,'0')  + ':' +
        String(min).padStart(2,'0') + ':' +
        String(sec).padStart(2,'0') + ':' +
        String(frames).padStart(2,'0');
      requestAnimationFrame(updateTC);
    }
    updateTC();
  }

  /* ──────────────────────────────────────────────
     3. SCROLL REVEAL
  ─────────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  /* ──────────────────────────────────────────────
     4. COUNT-UP — estadísticas del hero
  ─────────────────────────────────────────────── */
  function countUp(el, target, duration = 1800) {
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.childNodes[0].textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.childNodes[0].textContent = target;
    }
    requestAnimationFrame(step);
  }

  const statNums = document.querySelectorAll('.fev-hero__stat-num[data-target]');
  if (statNums.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp(entry.target, parseInt(entry.target.dataset.target, 10));
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => io.observe(el));
  }

  /* ──────────────────────────────────────────────
     5. GALLERY FILTER
  ─────────────────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.fev-gallery__filter');
  const galItems   = document.querySelectorAll('.fev-gal-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galItems.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.transition = 'opacity 0.35s, transform 0.35s';
        item.style.opacity       = show ? '1'     : '0.15';
        item.style.transform     = show ? 'scale(1)' : 'scale(0.97)';
        item.style.pointerEvents = show ? ''      : 'none';
      });
    });
  });

  /* ──────────────────────────────────────────────
     6. VIDEO MODAL
  ─────────────────────────────────────────────── */
  const videoModal  = document.getElementById('fevVideoModal');
  const vmClose     = document.getElementById('vmClose');
  const heroPlayBtn = document.getElementById('heroPlayBtn');

  function openVideoModal() {
    if (!videoModal) return;
    videoModal.classList.add('fev-vm--open');
    document.body.style.overflow = 'hidden';
  }
  function closeVideoModal() {
    if (!videoModal) return;
    videoModal.classList.remove('fev-vm--open');
    document.body.style.overflow = '';
  }

  heroPlayBtn?.addEventListener('click', openVideoModal);
  vmClose?.addEventListener('click', closeVideoModal);
  document.querySelectorAll('.fev-vid-card[data-video="true"]').forEach(card => {
    card.addEventListener('click', openVideoModal);
  });
  videoModal?.addEventListener('click', e => { if (e.target === videoModal) closeVideoModal(); });

  /* ──────────────────────────────────────────────
     7. LIGHTBOX
  ─────────────────────────────────────────────── */
  const lb        = document.getElementById('fevLightbox');
  const lbImg     = document.getElementById('lbImg');
  const lbClose   = document.getElementById('lbClose');
  const lbPrev    = document.getElementById('lbPrev');
  const lbNext    = document.getElementById('lbNext');
  const lbCounter = document.getElementById('lbCounter');

  let lbImages = [];
  let lbIndex  = 0;

  function buildLbImages() {
    lbImages = [];
    document.querySelectorAll('.fev-gal-item').forEach(item => {
      const img = item.querySelector('.fev-gal-item__img');
      const cap = item.querySelector('.fev-gal-item__caption')?.textContent || '';
      if (img) lbImages.push({ src: img.src, alt: img.alt, caption: cap });
    });
  }

  function openLb(index) {
    if (!lb || !lbImages.length) return;
    lbIndex = ((index % lbImages.length) + lbImages.length) % lbImages.length;
    lbImg.src = lbImages[lbIndex].src;
    lbImg.alt = lbImages[lbIndex].alt;
    lbCounter.textContent = `${lbIndex + 1} / ${lbImages.length}`;
    lb.classList.add('fev-lb--open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    lb?.classList.remove('fev-lb--open');
    document.body.style.overflow = '';
  }

  lbClose?.addEventListener('click', closeLb);
  lbPrev?.addEventListener('click',  () => openLb(lbIndex - 1));
  lbNext?.addEventListener('click',  () => openLb(lbIndex + 1));
  lb?.addEventListener('click', e => { if (e.target === lb) closeLb(); });

  buildLbImages();
  document.querySelectorAll('.fev-gal-item').forEach((item, i) => {
    item.addEventListener('click', () => { buildLbImages(); openLb(i); });
  });

  /* ──────────────────────────────────────────────
     8. TECLADO
  ─────────────────────────────────────────────── */
  document.addEventListener('keydown', e => {
    if (lb?.classList.contains('fev-lb--open')) {
      if (e.key === 'ArrowLeft')  openLb(lbIndex - 1);
      if (e.key === 'ArrowRight') openLb(lbIndex + 1);
      if (e.key === 'Escape')     closeLb();
    }
    if (videoModal?.classList.contains('fev-vm--open') && e.key === 'Escape') closeVideoModal();
  });

  /* ──────────────────────────────────────────────
     9. SMOOTH SCROLL
  ─────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 30, behavior: 'smooth' });
      }
    });
  });

  /* ──────────────────────────────────────────────
     10. PARALLAX sutil en hero
  ─────────────────────────────────────────────── */
  const heroBg = document.querySelector('.fev-hero__bg-img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
      }
    }, { passive: true });
  }

})();
/* ================================================================
   AGENCIA 247 — disenoGrafico.js
================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────
     1. SCROLL REVEAL
  ───────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => obs.observe(el));
  }


  /* ─────────────────────────────────────
     2. CONTADOR DE STATS ANIMADO
  ───────────────────────────────────── */
  function animateCount(el, target, suffix, duration = 1500) {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  const badgeSection = document.querySelector('.s-hero__badge');
  if (badgeSection) {
    const statsObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.s-hero__badge-num[data-target]').forEach(el => {
          animateCount(el, parseInt(el.dataset.target, 10), el.dataset.suffix || '');
        });
        statsObs.disconnect();
      }
    }, { threshold: 0.5 });
    statsObs.observe(badgeSection);
  }


  /* ─────────────────────────────────────
     3. FILTROS DE GALERÍA
  ───────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.gf-btn');
  const galItems   = document.querySelectorAll('.gal-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('gf-btn--active'));
      btn.classList.add('gf-btn--active');
      const filter = btn.dataset.filter;
      galItems.forEach(item => {
        const match = filter === 'all' || item.dataset.cat === filter;
        item.style.transition = 'opacity 0.35s, transform 0.35s';
        item.style.opacity        = match ? '1' : '0.15';
        item.style.transform      = match ? 'scale(1)' : 'scale(0.97)';
        item.style.pointerEvents  = match ? '' : 'none';
      });
    });
  });


  /* ─────────────────────────────────────
     4. LIGHTBOX
  ───────────────────────────────────── */
  const lb        = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lb-img');
  const lbCounter = document.querySelector('.lb-counter');
  const lbClose   = document.querySelector('.lb-close');
  const lbPrev    = document.querySelector('.lb-nav--prev');
  const lbNext    = document.querySelector('.lb-nav--next');
  let lbImages = [], lbIndex = 0;

  function buildImgs() {
    lbImages = [...document.querySelectorAll('.gal-item img')].map(img => ({ src: img.src, alt: img.alt }));
  }
  function openLb(i) {
    buildImgs(); lbIndex = i; showImg();
    lb.classList.add('lb-overlay--open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    lb.classList.remove('lb-overlay--open');
    document.body.style.overflow = '';
  }
  function showImg() {
    if (!lbImages.length) return;
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = lbImages[lbIndex].src;
      lbImg.alt = lbImages[lbIndex].alt;
      lbImg.style.opacity = '1';
    }, 140);
    if (lbCounter) lbCounter.textContent = `${lbIndex + 1} / ${lbImages.length}`;
  }
  document.querySelectorAll('.gal-item').forEach((item, idx) => {
    item.addEventListener('click', () => openLb(idx));
  });
  if (lbClose) lbClose.addEventListener('click', closeLb);
  if (lb) lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  if (lbPrev) lbPrev.addEventListener('click', e => {
    e.stopPropagation();
    lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; showImg();
  });
  if (lbNext) lbNext.addEventListener('click', e => {
    e.stopPropagation();
    lbIndex = (lbIndex + 1) % lbImages.length; showImg();
  });
  document.addEventListener('keydown', e => {
    if (!lb || !lb.classList.contains('lb-overlay--open')) return;
    if (e.key === 'Escape')     closeLb();
    if (e.key === 'ArrowLeft')  { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; showImg(); }
    if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % lbImages.length; showImg(); }
  });


  /* ─────────────────────────────────────
     5. PARALLAX SUTIL — collage hero
  ───────────────────────────────────── */
  const collageImgs = document.querySelectorAll('.s-hero__collage-item img');
  if (collageImgs.length) {
    window.addEventListener('scroll', () => {
      const sy = window.scrollY;
      if (sy < window.innerHeight) {
        collageImgs.forEach((img, i) => {
          const factor = 0.10 + i * 0.05;
          img.style.transform = `translateY(${sy * factor}px)`;
        });
      }
    }, { passive: true });
  }


  /* ─────────────────────────────────────
     6. TILT 3D — prod-cards
  ───────────────────────────────────── */
  document.querySelectorAll('.prod-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `translateY(-7px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
      card.style.transition = 'transform 0.08s linear';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = '';
    });
  });


  /* ─────────────────────────────────────
     7. CURSOR MAGNÉTICO — botones primarios
  ───────────────────────────────────── */
  document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width  / 2;
      const y = e.clientY - r.top  - r.height / 2;
      btn.style.transform = `translateY(-3px) translate(${x * 0.16}px, ${y * 0.16}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });


  /* ─────────────────────────────────────
     8. BARRA DE PROGRESO TOP
  ───────────────────────────────────── */
  const bar = document.createElement('div');
  bar.style.cssText = `
    position:fixed;top:0;left:0;z-index:9998;height:2px;width:0%;
    background:linear-gradient(90deg,#2353e8,#5bc8f5);
    transition:width 0.12s linear;pointer-events:none;
  `;
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });


  /* ─────────────────────────────────────
     9. STAGGER svc-cards
  ───────────────────────────────────── */
  document.querySelectorAll('.svc-card').forEach((c, i) => {
    c.style.transitionDelay = `${i * 0.055}s`;
  });

});
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Agencia 24·7 — Marketing & Producción Integral</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #f5f7ff;
    --bg2: #eef0fb;
    --white: #ffffff;
    --dark: #0d1024;
    --mid: #3a3f5c;
    --muted: #7b80a0;
    --blue: #2351f5;
    --blue-soft: rgba(35,81,245,0.08);
    --blue-mid: rgba(35,81,245,0.18);
    --blue-light: #e8edff;
    --accent: #00c9a7;
    --border: rgba(35,81,245,0.1);
    --shadow: 0 8px 40px rgba(35,81,245,0.1);
  }

  html { scroll-behavior: smooth; }
  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--dark);
    overflow-x: hidden;
  }

  /* HERO BG IMAGE */
  #hero {
    position: relative;
  }
  #hero .hero-bg-img {
    position: absolute; inset: 0;
    background: url('imagen1.png') center/cover no-repeat;
    z-index: 0;
  }
  #hero .hero-bg-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(100deg, rgba(245,247,255,0.96) 45%, rgba(245,247,255,0.55) 75%, rgba(245,247,255,0.15) 100%);
    z-index: 1;
  }
  #hero > *:not(.hero-bg-img):not(.hero-bg-overlay) { position: relative; z-index: 2; }

  /* NAV */
  nav {
    position: fixed; top: 0; width: 100%; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 6%;
    background: rgba(245,247,255,0.88);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
  }

  .logo {
    display: flex; align-items: center; gap: .6rem;
    text-decoration: none;
  }
  .logo img {
    height: 44px; width: auto; object-fit: contain;
  }
  .logo-fallback {
    height: 44px; width: 44px; border-radius: 50%;
    border: 2px solid var(--blue);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif; font-weight: 800; font-size: .75rem;
    color: var(--blue); background: var(--blue-soft);
  }
  .logo-text {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: 1rem; color: var(--dark); letter-spacing: .03em;
  }

  nav ul { list-style: none; display: flex; gap: 2.5rem; }
  nav ul a {
    font-size: .85rem; font-weight: 500; color: var(--muted);
    text-decoration: none; letter-spacing: .05em; text-transform: uppercase;
    transition: color .2s;
  }
  nav ul a:hover { color: var(--dark); }

  .nav-cta {
    padding: .55rem 1.5rem; background: var(--blue); color: #fff;
    border-radius: 2rem; font-size: .8rem; font-weight: 600;
    text-decoration: none; letter-spacing: .04em; text-transform: uppercase;
    transition: opacity .2s, transform .2s;
  }
  .nav-cta:hover { opacity: .85; transform: translateY(-1px); }

  /* HERO */
  #hero {
    min-height: 100vh;
    display: grid; grid-template-columns: 1fr 1fr; align-items: center;
    padding: 7rem 6% 4rem; gap: 4rem;
    position: relative; overflow: hidden;
    background: var(--white);
  }

  #hero::before {
    content: '';
    position: absolute; top: -100px; right: -60px;
    width: 550px; height: 550px; border-radius: 50%;
    background: radial-gradient(circle, rgba(35,81,245,0.1) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero-content { position: relative; z-index: 1; }

  .hero-tag {
    display: inline-flex; align-items: center; gap: .5rem;
    background: var(--blue-light); border: 1px solid var(--blue-mid);
    padding: .4rem 1rem; border-radius: 2rem;
    font-size: .72rem; font-weight: 700; letter-spacing: .1em;
    text-transform: uppercase; color: var(--blue); margin-bottom: 2rem;
    animation: fadeUp .6s ease both;
  }
  .hero-tag span { width: 6px; height: 6px; border-radius: 50%; background: var(--blue); }

  h1 {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: clamp(3rem, 5.5vw, 5rem); line-height: 1.02;
    letter-spacing: -.025em;
    animation: fadeUp .6s .1s ease both;
  }
  h1 em { font-style: normal; color: var(--blue); }

  .hero-sub {
    margin-top: 1.5rem; font-size: 1rem; font-weight: 400;
    color: var(--muted); line-height: 1.75; max-width: 460px;
    animation: fadeUp .6s .2s ease both;
  }

  .hero-actions {
    margin-top: 2.5rem; display: flex; gap: 1rem;
    animation: fadeUp .6s .3s ease both;
  }

  .btn-primary {
    padding: .9rem 2.2rem; background: var(--blue); color: #fff;
    border-radius: 2rem; font-weight: 600; font-size: .9rem;
    text-decoration: none; transition: opacity .2s, transform .2s;
    box-shadow: 0 4px 20px rgba(35,81,245,0.3);
  }
  .btn-primary:hover { opacity: .88; transform: translateY(-2px); }

  .btn-ghost {
    padding: .9rem 2.2rem; border: 1.5px solid var(--border); color: var(--mid);
    border-radius: 2rem; font-weight: 500; font-size: .9rem;
    text-decoration: none; transition: border-color .2s, color .2s;
  }
  .btn-ghost:hover { border-color: var(--blue); color: var(--blue); }

  .hero-visual {
    position: relative; z-index: 1;
    animation: fadeUp .6s .2s ease both;
  }
  .hero-main-img {
    width: 100%; height: 480px; border-radius: 20px; overflow: hidden;
    box-shadow: var(--shadow);
  }
  .hero-main-img img { width: 100%; height: 100%; object-fit: cover; }

  .hero-badge {
    position: absolute; bottom: -1.5rem; left: -1.5rem;
    background: var(--white); border-radius: 14px; padding: 1rem 1.5rem;
    box-shadow: var(--shadow); display: flex; align-items: center; gap: .8rem;
    border: 1px solid var(--border);
  }
  .hero-badge-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--accent); flex-shrink: 0; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(0,201,167,.5);} 50%{box-shadow:0 0 0 6px rgba(0,201,167,0);} }
  .hero-badge-text { font-size: .78rem; font-weight: 600; color: var(--dark); }
  .hero-badge-sub { font-size: .7rem; color: var(--muted); }

  /* TICKER */
  .ticker-section {
    padding: 3rem 0;
    background: var(--white);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    overflow: hidden;
  }
  .ticker-label {
    text-align: center; font-size: .72rem; font-weight: 700;
    letter-spacing: .14em; text-transform: uppercase; color: var(--muted);
    margin-bottom: 1.5rem;
  }
  .ticker-wrapper { overflow: hidden; }
  .ticker-track {
    display: flex; gap: 1.2rem;
    width: max-content;
    animation: tickerLeft 30s linear infinite;
  }
  .ticker-track:hover { animation-play-state: paused; }
  @keyframes tickerLeft {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .ticker-item {
    width: 280px; height: 190px;
    border-radius: 14px; overflow: hidden; flex-shrink: 0;
    position: relative; cursor: pointer;
    transition: transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s;
    box-shadow: 0 4px 20px rgba(35,81,245,0.08);
  }
  .ticker-item:hover {
    transform: scale(1.1) translateY(-8px);
    box-shadow: 0 20px 60px rgba(35,81,245,0.2);
    z-index: 20;
    animation-play-state: paused;
  }
  .ticker-item img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform .4s;
  }
  .ticker-item:hover img { transform: scale(1.05); }
  .ticker-placeholder {
    width: 100%; height: 100%;
    background: linear-gradient(135deg, var(--bg2), var(--blue-light));
    display: flex; align-items: center; justify-content: center;
    font-size: .78rem; color: var(--muted); letter-spacing: .06em;
    text-transform: uppercase;
  }

  /* SECTION BASE */
  section { padding: 7rem 6%; }
  .section-label {
    font-size: .72rem; font-weight: 700; letter-spacing: .14em;
    text-transform: uppercase; color: var(--blue); margin-bottom: .8rem;
  }
  .section-title {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: clamp(1.9rem, 3.5vw, 2.8rem); line-height: 1.1;
    letter-spacing: -.02em; color: var(--dark);
  }
  .divider { width: 36px; height: 3px; background: var(--blue); margin: 1rem 0 1.8rem; border-radius: 2px; }

  /* ABOUT */
  #about {
    background: var(--bg2);
    display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center;
  }
  .about-images { position: relative; height: 420px; }
  .img-card {
    position: absolute; border-radius: 16px; overflow: hidden;
    box-shadow: var(--shadow);
  }
  .img-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .about-text p { color: var(--muted); line-height: 1.8; font-size: .95rem; margin-bottom: 1rem; }

  /* SERVICES */
  #servicios { background: var(--white); }
  .services-intro { max-width: 520px; margin-bottom: 3.5rem; }
  .services-intro p { color: var(--muted); margin-top: .6rem; font-size: .95rem; line-height: 1.7; }

  .services-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 1.4rem;
  }

  .service-card {
    border-radius: 18px; overflow: hidden;
    height: 320px; position: relative; cursor: default;
    box-shadow: 0 4px 24px rgba(35,81,245,0.08);
    transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s;
  }
  .service-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 24px 60px rgba(35,81,245,0.16);
  }
  .service-bg {
    position: absolute; inset: 0;
    background-size: cover; background-position: center;
    transition: transform .5s ease;
  }
  .service-card:hover .service-bg { transform: scale(1.07); }
  .service-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(13,16,36,0.88) 0%, rgba(13,16,36,0.3) 55%, transparent 100%);
  }
  .service-card:hover .service-overlay {
    background: linear-gradient(to top, rgba(13,16,36,0.95) 0%, rgba(35,81,245,0.15) 100%);
  }
  .service-content {
    position: absolute; inset: 0; padding: 1.8rem;
    display: flex; flex-direction: column; justify-content: flex-end;
  }
  .service-num {
    font-size: .68rem; font-weight: 700; letter-spacing: .12em;
    text-transform: uppercase; color: rgba(255,255,255,0.45); margin-bottom: .4rem;
  }
  .service-content h3 {
    font-family: 'Syne', sans-serif; font-weight: 700;
    font-size: 1.1rem; color: #fff; line-height: 1.3; margin-bottom: .5rem;
  }
  .service-desc {
    font-size: .8rem; color: rgba(255,255,255,0.65); line-height: 1.6;
    max-height: 0; overflow: hidden;
    transition: max-height .4s ease, opacity .3s; opacity: 0;
  }
  .service-card:hover .service-desc { max-height: 80px; opacity: 1; }
  .service-tags { display: flex; flex-wrap: wrap; gap: .4rem; margin-top: .8rem; }
  .stag {
    font-size: .65rem; padding: .2rem .65rem; border-radius: 2rem;
    background: rgba(35,81,245,0.45); color: #fff;
    border: 1px solid rgba(35,81,245,0.5); font-weight: 600; letter-spacing: .04em;
  }

  /* PROJECTS */
  #proyectos {
    padding: 5rem 0; background: var(--bg); overflow: hidden;
  }
  .proyectos-header { padding: 0 6%; margin-bottom: 2.5rem; }

  .ticker-track-rev {
    display: flex; gap: 1.2rem;
    width: max-content;
    animation: tickerRight 26s linear infinite;
  }
  .ticker-track-rev:hover { animation-play-state: paused; }
  @keyframes tickerRight {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }

  /* CONTACT */
  #contacto { background: var(--bg2); }
  .contact-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start;
    margin-top: 3rem;
  }
  .contact-name {
    font-family: 'Syne', sans-serif; font-weight: 800;
    font-size: clamp(2.2rem, 4vw, 3.5rem); letter-spacing: -.02em;
    line-height: 1; color: var(--dark);
  }
  .contact-sub { color: var(--blue); font-size: .85rem; margin-top: .5rem; letter-spacing: .06em; font-weight: 600; }
  .contact-info p { color: var(--muted); font-size: .95rem; line-height: 1.8; margin: 1.5rem 0 2rem; }
  .socials { display: flex; gap: .75rem; flex-wrap: wrap; }
  .social-btn {
    display: flex; align-items: center; gap: .55rem;
    padding: .6rem 1.2rem; border-radius: 2rem;
    border: 1.5px solid var(--border); color: var(--mid);
    text-decoration: none; font-size: .82rem; font-weight: 500;
    transition: border-color .2s, color .2s, background .2s, transform .2s;
  }
  .social-btn svg { width: 15px; height: 15px; }
  .social-btn:hover {
    border-color: var(--blue); color: var(--blue);
    background: var(--blue-soft); transform: translateY(-2px);
  }
  .contact-form { display: flex; flex-direction: column; gap: 1rem; }
  .contact-form input, .contact-form textarea {
    background: var(--white); border: 1.5px solid var(--border);
    padding: 1rem 1.2rem; border-radius: 12px;
    color: var(--dark); font-family: 'DM Sans', sans-serif; font-size: .9rem;
    outline: none; transition: border-color .2s, box-shadow .2s;
  }
  .contact-form input:focus, .contact-form textarea:focus {
    border-color: var(--blue); box-shadow: 0 0 0 4px rgba(35,81,245,0.08);
  }
  .contact-form input::placeholder, .contact-form textarea::placeholder { color: var(--muted); }
  .contact-form textarea { resize: vertical; }

  /* FOOTER */
  footer {
    background: var(--dark); padding: 2rem 6%;
    display: flex; align-items: center; justify-content: space-between;
    font-size: .78rem; color: rgba(255,255,255,0.4);
  }
  footer .accent { color: var(--blue); }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    #hero { grid-template-columns: 1fr; padding-top: 6rem; }
    .hero-visual { display: none; }
    #about { grid-template-columns: 1fr; gap: 3rem; }
    .about-images { height: 280px; }
    .services-grid { grid-template-columns: 1fr 1fr; }
    .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
  }
  @media (max-width: 600px) {
    nav ul { display: none; }
    .services-grid { grid-template-columns: 1fr; }
  }
</style>
</head>
<body>

<!-- NAV -->
<nav>
  <a href="#" class="logo">
    <img src="logo.png" alt="Logo 24·7"
      onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
    <div class="logo-fallback" style="display:none;">24·7</div>
    <span class="logo-text">Agencia 24·7</span>
  </a>
  <ul>
    <li><a href="#servicios">Servicios</a></li>
    <li><a href="#proyectos">Proyectos</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ul>
  <a href="#contacto" class="nav-cta">Hablemos</a>
</nav>

<!-- HERO -->
<section id="hero">
  <div class="hero-bg-img"></div>
  <div class="hero-bg-overlay"></div>
  <div class="hero-content">
    <div class="hero-tag"><span></span> Marketing & Producción Integral</div>
    <h1>Tu marca<br>al siguiente<br><em>nivel.</em></h1>
    <p class="hero-sub">Soluciones completas para empresas, emprendimientos y eventos. Estrategia digital, producción audiovisual y publicidad offline.</p>
    <div class="hero-actions">
      <a href="#servicios" class="btn-primary">Ver servicios</a>
      <a href="#contacto" class="btn-ghost">Contáctanos</a>
    </div>
  </div>

  <div class="hero-visual">
    <div class="hero-main-img">
      <img src="fondo.jpg" alt="Agencia 24·7">
    </div>
    <div class="hero-badge">
      <div class="hero-badge-dot"></div>
      <div>
        <div class="hero-badge-text">Disponibles 24·7</div>
        <div class="hero-badge-sub">Siempre para ti</div>
      </div>
    </div>
  </div>
</section>

<!-- TICKER STRIP 1 -->
<div class="ticker-section">
  <p class="ticker-label">Nuestro trabajo</p>
  <div class="ticker-wrapper">
    <div class="ticker-track">
      <div class="ticker-item"><img src="imagen1.png" alt="Proyecto" onerror="this.parentElement.innerHTML='<div class=ticker-placeholder>Proyecto</div>'"></div>
      <div class="ticker-item"><img src="imagen2.png" alt="Proyecto" onerror="this.parentElement.innerHTML='<div class=ticker-placeholder>Proyecto</div>'"></div>
      <div class="ticker-item"><img src="imagen3.png" alt="Proyecto" onerror="this.parentElement.innerHTML='<div class=ticker-placeholder>Proyecto</div>'"></div>
      <div class="ticker-item"><img src="imagen4.png" alt="Proyecto" onerror="this.parentElement.innerHTML='<div class=ticker-placeholder>Proyecto</div>'"></div>
      <div class="ticker-item"><img src="imagen1.png" alt="Proyecto" onerror="this.parentElement.innerHTML='<div class=ticker-placeholder>Proyecto</div>'"></div>
      <div class="ticker-item"><img src="imagen2.png" alt="Proyecto" onerror="this.parentElement.innerHTML='<div class=ticker-placeholder>Proyecto</div>'"></div>
      <!-- duplicate for seamless loop -->
      <div class="ticker-item"><img src="imagen3.png" alt="Proyecto" onerror="this.parentElement.innerHTML='<div class=ticker-placeholder>Proyecto</div>'"></div>
      <div class="ticker-item"><img src="imagen4.png" alt="Proyecto" onerror="this.parentElement.innerHTML='<div class=ticker-placeholder>Proyecto</div>'"></div>
      <div class="ticker-item"><img src="imagen1.png" alt="Proyecto" onerror="this.parentElement.innerHTML='<div class=ticker-placeholder>Proyecto</div>'"></div>
      <div class="ticker-item"><img src="imagen2.png" alt="Proyecto" onerror="this.parentElement.innerHTML='<div class=ticker-placeholder>Proyecto</div>'"></div>
      <div class="ticker-item"><img src="imagen3.png" alt="Proyecto" onerror="this.parentElement.innerHTML='<div class=ticker-placeholder>Proyecto</div>'"></div>
      <div class="ticker-item"><img src="imagen4.png" alt="Proyecto" onerror="this.parentElement.innerHTML='<div class=ticker-placeholder>Proyecto</div>'"></div>
    </div>
  </div>
</div>

<!-- ABOUT -->
<section id="about">
  <div class="about-images">
    <div class="img-card" style="width:56%;height:270px;top:0;left:0;">
      <img src="01.jpg" alt="Proyecto">
    </div>
    <div class="img-card" style="width:44%;height:310px;top:30px;right:0;border:3px solid var(--blue);">
      <img src="imagen3.png" alt="Proyecto">
    </div>
    <div class="img-card" style="width:48%;height:200px;bottom:0;left:8%;">
      <img src="imagen4.png" alt="Proyecto">
    </div>
  </div>
  <div class="about-text">
    <p class="section-label">Quiénes somos</p>
    <h2 class="section-title">Creatividad con enfoque en resultados</h2>
    <div class="divider"></div>
    <p>Trabajamos con profesionalismo, creatividad y enfoque en resultados, asegurando que cada proyecto refleje excelencia, innovación y alto impacto en el mercado.</p>
    <p>Brindamos un servicio integral que abarca desde la estrategia digital hasta la producción audiovisual y publicidad offline para empresas, emprendimientos y eventos.</p>
    <a href="#contacto" class="btn-primary" style="display:inline-block;margin-top:1.5rem;">Trabajemos juntos</a>
  </div>
</section>

<!-- SERVICES -->
<section id="servicios">
  <div class="services-intro">
    <p class="section-label">Lo que hacemos</p>
    <h2 class="section-title">Nuestros servicios</h2>
    <div class="divider"></div>
    <p>Tú decides cómo quieres crecer. Nosotros ponemos la estrategia, el diseño y la producción.</p>
  </div>

  <div class="services-grid">
    <div class="service-card">
      <div class="service-bg" style="background-image:url('imagen3.png');background-color:#1a2a6c;"></div>
      <div class="service-overlay"></div>
      <div class="service-content">
        <div class="service-num">01</div>
        <h3>Campañas Digitales</h3>
        <p class="service-desc">Facebook Ads, TikTok Ads, Instagram y YouTube con segmentación avanzada y reportes de resultados.</p>
        <div class="service-tags"><span class="stag">Facebook Ads</span><span class="stag">TikTok Ads</span></div>
      </div>
    </div>

    <div class="service-card">
      <div class="service-bg" style="background-image:url('imagen1.png');background-color:#0f3460;"></div>
      <div class="service-overlay"></div>
      <div class="service-content">
        <div class="service-num">02</div>
        <h3>Diseño Gráfico Corporativo</h3>
        <p class="service-desc">Logotipos, flyers, brochures e identidad visual que diferencia tu marca en el mercado.</p>
        <div class="service-tags"><span class="stag">Logotipo</span><span class="stag">Brochure</span></div>
      </div>
    </div>

    <div class="service-card">
      <div class="service-bg" style="background-image:url('imagen2.png');background-color:#16213e;"></div>
      <div class="service-overlay"></div>
      <div class="service-content">
        <div class="service-num">03</div>
        <h3>Producción Audiovisual</h3>
        <p class="service-desc">Fotografía profesional, videos corporativos, edición y postproducción de alto impacto.</p>
        <div class="service-tags"><span class="stag">Video</span><span class="stag">Fotografía</span></div>
      </div>
    </div>

    <div class="service-card">
      <div class="service-bg" style="background-image:url('imagen4.png');background-color:#1a1a2e;"></div>
      <div class="service-overlay"></div>
      <div class="service-content">
        <div class="service-num">04</div>
        <h3>Publicidad Offline</h3>
        <p class="service-desc">Volantes, gigantografías, tarjetas, folders y merchandising corporativo integral.</p>
        <div class="service-tags"><span class="stag">Impresión</span><span class="stag">Merchandising</span></div>
      </div>
    </div>

    <div class="service-card">
      <div class="service-bg" style="background-image:url('imagen1.png');background-color:#0d2137;background-position:60% center;"></div>
      <div class="service-overlay"></div>
      <div class="service-content">
        <div class="service-num">05</div>
        <h3>Filmación de Eventos</h3>
        <p class="service-desc">Cobertura con drone y grúa profesional para matrimonios, eventos corporativos y más.</p>
        <div class="service-tags"><span class="stag">Drone</span><span class="stag">Eventos</span></div>
      </div>
    </div>

    <div class="service-card">
      <div class="service-bg" style="background-image:url('imagen3.png');background-color:#102b3f;background-position:right center;"></div>
      <div class="service-overlay" style="background:linear-gradient(to top,rgba(13,16,36,.9) 0%,rgba(35,81,245,.3) 100%);"></div>
      <div class="service-content">
        <div class="service-num">06</div>
        <h3>Páginas Web</h3>
        <p class="service-desc">Diseño y desarrollo de páginas web corporativas con foco en conversión y posicionamiento.</p>
        <div class="service-tags"><span class="stag">Diseño web</span><span class="stag">SEO</span></div>
      </div>
    </div>
  </div>
</section>

<!-- PROJECTS ALBUM -->
<section id="proyectos" style="padding:6rem 6%;background:var(--bg);">
  <div class="proyectos-header" style="padding:0;margin-bottom:2.5rem;">
    <p class="section-label">Portfolio</p>
    <h2 class="section-title">Proyectos</h2>
    <div class="divider"></div>
  </div>
  <div style="
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 320px 320px;
    gap:1rem;
  ">
    <!-- big left -->
    <div style="grid-column:1/2;grid-row:1/3;border-radius:18px;overflow:hidden;box-shadow:var(--shadow);transition:transform .35s,box-shadow .35s;" onmouseover="this.style.transform='scale(1.02)';this.style.boxShadow='0 24px 60px rgba(35,81,245,0.18)'" onmouseout="this.style.transform='';this.style.boxShadow='var(--shadow)'">
      <img src="imagen1.png" alt="Proyecto" style="width:100%;height:100%;object-fit:cover;display:block;">
    </div>
    <!-- top center -->
    <div style="grid-column:2/3;grid-row:1/2;border-radius:18px;overflow:hidden;box-shadow:var(--shadow);transition:transform .35s,box-shadow .35s;" onmouseover="this.style.transform='scale(1.03)';this.style.boxShadow='0 24px 60px rgba(35,81,245,0.18)'" onmouseout="this.style.transform='';this.style.boxShadow='var(--shadow)'">
      <img src="imagen2.png" alt="Proyecto" style="width:100%;height:100%;object-fit:cover;display:block;">
    </div>
    <!-- top right -->
    <div style="grid-column:3/4;grid-row:1/2;border-radius:18px;overflow:hidden;box-shadow:var(--shadow);transition:transform .35s,box-shadow .35s;" onmouseover="this.style.transform='scale(1.03)';this.style.boxShadow='0 24px 60px rgba(35,81,245,0.18)'" onmouseout="this.style.transform='';this.style.boxShadow='var(--shadow)'">
      <img src="imagen3.png" alt="Proyecto" style="width:100%;height:100%;object-fit:cover;display:block;">
    </div>
    <!-- bottom center+right wide -->
    <div style="grid-column:2/4;grid-row:2/3;border-radius:18px;overflow:hidden;box-shadow:var(--shadow);transition:transform .35s,box-shadow .35s;" onmouseover="this.style.transform='scale(1.02)';this.style.boxShadow='0 24px 60px rgba(35,81,245,0.18)'" onmouseout="this.style.transform='';this.style.boxShadow='var(--shadow)'">
      <img src="imagen4.png" alt="Proyecto" style="width:100%;height:100%;object-fit:cover;display:block;">
    </div>
  </div>
</section>

<!-- CONTACT -->
<section id="contacto">
  <p class="section-label">Hablemos</p>
  <div style="margin-top:2rem;max-width:600px;">
    <h2 class="contact-name">Jessica<br>Kowalski</h2>
    <p class="contact-sub">Disponibles siempre para ti</p>
    <p style="color:var(--muted);font-size:.95rem;line-height:1.8;margin:1.5rem 0 2rem;">Listo para llevar tu marca al siguiente nivel. Contáctanos por cualquier canal — respondemos las 24 horas, los 7 días de la semana.</p>
    <div class="socials">
      <a href="#" class="social-btn">
        <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
        Twitter
      </a>
      <a href="#" class="social-btn">
        <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        Facebook
      </a>
      <a href="#" class="social-btn">
        <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
        Instagram
      </a>
      <a href="#" class="social-btn">
        <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
        WhatsApp
      </a>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <span>© 2025 Agencia 24·7 — Todos los derechos reservados</span>
  <span class="accent">Disponibles 24 horas, 7 días</span>
</footer>

</body>
</html>
<?php
/**
 * Hero section.
 */

$hero_bg_url = agencia247_theme_image_url('imagen1.png');
$hero_main_url = agencia247_theme_image_url('fondo.jpg');
?>
<section id="hero">
	<div class="hero-bg-img" style="background-image:url('<?php echo esc_url($hero_bg_url); ?>');"></div>
	<div class="hero-bg-overlay"></div>
	<div class="hero-content">
		<div class="hero-tag"><span></span> Marketing &amp; Produccion Integral</div>
		<h1>Tu marca<br>al siguiente<br><em>nivel.</em></h1>
		<p class="hero-sub">Soluciones completas para empresas, emprendimientos y eventos. Estrategia digital, produccion audiovisual y publicidad offline.</p>
		<div class="hero-actions">
			<a href="#servicios" class="btn-primary">Ver servicios</a>
			<a href="#contacto" class="btn-ghost">Contactanos</a>
		</div>
	</div>

	<div class="hero-visual">
		<div class="hero-main-img">
			<img src="<?php echo esc_url($hero_main_url); ?>" alt="Agencia 24&middot;7">
		</div>
		<div class="hero-badge">
			<div class="hero-badge-dot"></div>
			<div>
				<div class="hero-badge-text">Disponibles 24&middot;7</div>
				<div class="hero-badge-sub">Siempre para ti</div>
			</div>
		</div>
	</div>
</section>
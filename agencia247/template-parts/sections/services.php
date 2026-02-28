<?php
/**
 * Services section.
 */

$img1 = agencia247_theme_image_url('imagen1.png');
$img2 = agencia247_theme_image_url('imagen2.png');
$img3 = agencia247_theme_image_url('imagen3.png');
$img4 = agencia247_theme_image_url('imagen4.png');
?>
<section id="servicios">
	<div class="services-intro">
		<p class="section-label">Lo que hacemos</p>
		<h2 class="section-title">Nuestros servicios</h2>
		<div class="divider"></div>
		<p>Tu decides como quieres crecer. Nosotros ponemos la estrategia, el diseno y la produccion.</p>
	</div>

	<div class="services-grid">
		<div class="service-card">
			<div class="service-bg" style="background-image:url('<?php echo esc_url($img3); ?>');background-color:#1a2a6c;"></div>
			<div class="service-overlay"></div>
			<div class="service-content">
				<div class="service-num">01</div>
				<h3>Campanas Digitales</h3>
				<p class="service-desc">Facebook Ads, TikTok Ads, Instagram y YouTube con segmentacion avanzada y reportes de resultados.</p>
				<div class="service-tags"><span class="stag">Facebook Ads</span><span class="stag">TikTok Ads</span></div>
			</div>
		</div>

		<div class="service-card">
			<div class="service-bg" style="background-image:url('<?php echo esc_url($img1); ?>');background-color:#0f3460;"></div>
			<div class="service-overlay"></div>
			<div class="service-content">
				<div class="service-num">02</div>
				<h3>Diseno Grafico Corporativo</h3>
				<p class="service-desc">Logotipos, flyers, brochures e identidad visual que diferencia tu marca en el mercado.</p>
				<div class="service-tags"><span class="stag">Logotipo</span><span class="stag">Brochure</span></div>
			</div>
		</div>

		<div class="service-card">
			<div class="service-bg" style="background-image:url('<?php echo esc_url($img2); ?>');background-color:#16213e;"></div>
			<div class="service-overlay"></div>
			<div class="service-content">
				<div class="service-num">03</div>
				<h3>Produccion Audiovisual</h3>
				<p class="service-desc">Fotografia profesional, videos corporativos, edicion y postproduccion de alto impacto.</p>
				<div class="service-tags"><span class="stag">Video</span><span class="stag">Fotografia</span></div>
			</div>
		</div>

		<div class="service-card">
			<div class="service-bg" style="background-image:url('<?php echo esc_url($img4); ?>');background-color:#1a1a2e;"></div>
			<div class="service-overlay"></div>
			<div class="service-content">
				<div class="service-num">04</div>
				<h3>Publicidad Offline</h3>
				<p class="service-desc">Volantes, gigantografias, tarjetas, folders y merchandising corporativo integral.</p>
				<div class="service-tags"><span class="stag">Impresion</span><span class="stag">Merchandising</span></div>
			</div>
		</div>

		<div class="service-card">
			<div class="service-bg" style="background-image:url('<?php echo esc_url($img1); ?>');background-color:#0d2137;background-position:60% center;"></div>
			<div class="service-overlay"></div>
			<div class="service-content">
				<div class="service-num">05</div>
				<h3>Filmacion de Eventos</h3>
				<p class="service-desc">Cobertura con drone y grua profesional para matrimonios, eventos corporativos y mas.</p>
				<div class="service-tags"><span class="stag">Drone</span><span class="stag">Eventos</span></div>
			</div>
		</div>

		<div class="service-card">
			<div class="service-bg" style="background-image:url('<?php echo esc_url($img3); ?>');background-color:#102b3f;background-position:right center;"></div>
			<div class="service-overlay" style="background:linear-gradient(to top,rgba(13,16,36,.9) 0%,rgba(35,81,245,.3) 100%);"></div>
			<div class="service-content">
				<div class="service-num">06</div>
				<h3>Paginas Web</h3>
				<p class="service-desc">Diseno y desarrollo de paginas web corporativas con foco en conversion y posicionamiento.</p>
				<div class="service-tags"><span class="stag">Diseno web</span><span class="stag">SEO</span></div>
			</div>
		</div>
	</div>
</section>
<?php
/**
 * About section.
 */

$img01 = agencia247_theme_image_url('01.jpg');
$img3 = agencia247_theme_image_url('imagen3.png');
$img4 = agencia247_theme_image_url('imagen4.png');
?>
<section id="about">
	<div class="about-images">
		<div class="img-card" style="width:56%;height:270px;top:0;left:0;">
			<img src="<?php echo esc_url($img01); ?>" alt="Proyecto">
		</div>
		<div class="img-card" style="width:44%;height:310px;top:30px;right:0;border:3px solid var(--blue);">
			<img src="<?php echo esc_url($img3); ?>" alt="Proyecto">
		</div>
		<div class="img-card" style="width:48%;height:200px;bottom:0;left:8%;">
			<img src="<?php echo esc_url($img4); ?>" alt="Proyecto">
		</div>
	</div>
	<div class="about-text">
		<p class="section-label">Quienes somos</p>
		<h2 class="section-title">Creatividad con enfoque en resultados</h2>
		<div class="divider"></div>
		<p>Trabajamos con profesionalismo, creatividad y enfoque en resultados, asegurando que cada proyecto refleje excelencia, innovacion y alto impacto en el mercado.</p>
		<p>Brindamos un servicio integral que abarca desde la estrategia digital hasta la produccion audiovisual y publicidad offline para empresas, emprendimientos y eventos.</p>
		<a href="#contacto" class="btn-primary" style="display:inline-block;margin-top:1.5rem;">Trabajemos juntos</a>
	</div>
</section>
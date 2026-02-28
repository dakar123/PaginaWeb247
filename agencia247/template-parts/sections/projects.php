<?php
/**
 * Projects section.
 */

$img1 = agencia247_theme_image_url('imagen1.png');
$img2 = agencia247_theme_image_url('imagen2.png');
$img3 = agencia247_theme_image_url('imagen3.png');
$img4 = agencia247_theme_image_url('imagen4.png');
?>
<section id="proyectos" style="padding:6rem 6%;background:var(--bg);">
	<div class="proyectos-header" style="padding:0;margin-bottom:2.5rem;">
		<p class="section-label">Portfolio</p>
		<h2 class="section-title">Proyectos</h2>
		<div class="divider"></div>
	</div>
	<div style="display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:320px 320px;gap:1rem;">
		<div style="grid-column:1/2;grid-row:1/3;border-radius:18px;overflow:hidden;box-shadow:var(--shadow);transition:transform .35s,box-shadow .35s;" onmouseover="this.style.transform='scale(1.02)';this.style.boxShadow='0 24px 60px rgba(35,81,245,0.18)'" onmouseout="this.style.transform='';this.style.boxShadow='var(--shadow)'">
			<img src="<?php echo esc_url($img1); ?>" alt="Proyecto" style="width:100%;height:100%;object-fit:cover;display:block;">
		</div>
		<div style="grid-column:2/3;grid-row:1/2;border-radius:18px;overflow:hidden;box-shadow:var(--shadow);transition:transform .35s,box-shadow .35s;" onmouseover="this.style.transform='scale(1.03)';this.style.boxShadow='0 24px 60px rgba(35,81,245,0.18)'" onmouseout="this.style.transform='';this.style.boxShadow='var(--shadow)'">
			<img src="<?php echo esc_url($img2); ?>" alt="Proyecto" style="width:100%;height:100%;object-fit:cover;display:block;">
		</div>
		<div style="grid-column:3/4;grid-row:1/2;border-radius:18px;overflow:hidden;box-shadow:var(--shadow);transition:transform .35s,box-shadow .35s;" onmouseover="this.style.transform='scale(1.03)';this.style.boxShadow='0 24px 60px rgba(35,81,245,0.18)'" onmouseout="this.style.transform='';this.style.boxShadow='var(--shadow)'">
			<img src="<?php echo esc_url($img3); ?>" alt="Proyecto" style="width:100%;height:100%;object-fit:cover;display:block;">
		</div>
		<div style="grid-column:2/4;grid-row:2/3;border-radius:18px;overflow:hidden;box-shadow:var(--shadow);transition:transform .35s,box-shadow .35s;" onmouseover="this.style.transform='scale(1.02)';this.style.boxShadow='0 24px 60px rgba(35,81,245,0.18)'" onmouseout="this.style.transform='';this.style.boxShadow='var(--shadow)'">
			<img src="<?php echo esc_url($img4); ?>" alt="Proyecto" style="width:100%;height:100%;object-fit:cover;display:block;">
		</div>
	</div>
</section>
<?php
/**
 * Theme document header and navigation.
 */

$logo_url = agencia247_theme_image_url('logo.png');
if (has_custom_logo()) {
	$logo_id = (int) get_theme_mod('custom_logo');
	$custom_logo_data = wp_get_attachment_image_src($logo_id, 'full');
	if (!empty($custom_logo_data[0])) {
		$logo_url = $custom_logo_data[0];
	}
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<nav>
	<a href="<?php echo esc_url(home_url('/')); ?>" class="logo">
		<img src="<?php echo esc_url($logo_url); ?>" alt="<?php echo esc_attr(get_bloginfo('name')); ?>" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
		<div class="logo-fallback" style="display:none;">24&middot;7</div>
		<span class="logo-text">Agencia 24&middot;7</span>
	</a>
	<ul>
		<li><a href="<?php echo esc_url(home_url('/#servicios')); ?>">Servicios</a></li>
		<li><a href="<?php echo esc_url(home_url('/#proyectos')); ?>">Proyectos</a></li>
		<li><a href="<?php echo esc_url(home_url('/#contacto')); ?>">Contacto</a></li>
	</ul>
	<a href="<?php echo esc_url(home_url('/#contacto')); ?>" class="nav-cta">Hablemos</a>
</nav>
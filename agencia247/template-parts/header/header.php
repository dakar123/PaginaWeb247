<?php
// WordPress theme header for Agencia 24·7
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?php wp_title('|', true, 'right'); ?><?php bloginfo('name'); ?></title>
<link rel="stylesheet" href="<?php echo get_stylesheet_uri(); ?>">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<nav>
	<a href="<?php echo home_url(); ?>" class="logo">
		<img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo.png" alt="Logo 24·7" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
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
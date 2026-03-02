<?php
/**
 * Theme document header and navigation.
 */

$logo_url = function_exists('agencia247_get_site_logo_url')
	? agencia247_get_site_logo_url()
	: (function_exists('agencia247_theme_image_url') ? agencia247_theme_image_url('logo.png') : get_template_directory_uri() . '/images/image.png');

$nav_cta_text = trim((string) agencia247_get_option('nav_cta_text'));
$nav_cta_url  = agencia247_resolve_link((string) agencia247_get_option('nav_cta_url'));
$brand_text   = trim((string) agencia247_get_option('brand_text'));
$brand_intro  = function_exists('agencia247_sanitize_brand_intro_animation')
	? agencia247_sanitize_brand_intro_animation((string) agencia247_get_option('brand_intro_animation'))
	: 'drop';

if ($brand_text === '') {
	$brand_text = 'Agencia24•7';
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
<nav class="site-nav" id="site-nav" data-brand-intro="<?php echo esc_attr($brand_intro); ?>">
	<a href="<?php echo esc_url(home_url('/')); ?>" class="logo js-brand-logo">
		<img src="<?php echo esc_url($logo_url); ?>" alt="<?php echo esc_attr(get_bloginfo('name')); ?>" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
		<div class="logo-fallback" style="display:none;">24•7</div>
		<span class="logo-text"><?php echo esc_html($brand_text); ?></span>
	</a>

	<?php
	wp_nav_menu(
		array(
			'theme_location' => 'primary',
			'container'      => false,
			'menu_class'     => 'primary-menu',
			'fallback_cb'    => 'agencia247_primary_menu_fallback',
			'depth'          => 2,
		)
	);
	?>

	<?php if ($nav_cta_text !== '') : ?>
		<a href="<?php echo esc_url($nav_cta_url); ?>" class="nav-cta"><?php echo esc_html($nav_cta_text); ?></a>
	<?php endif; ?>
</nav>

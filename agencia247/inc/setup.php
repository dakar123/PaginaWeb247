<?php
/**
 * Theme setup and asset loading.
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * Convert HEX color to rgba().
 *
 * @param string $hex Hex color.
 * @param float  $alpha Alpha value.
 * @return string
 */
function agencia247_hex_to_rgba($hex, $alpha) {
	$hex = ltrim((string) $hex, '#');
	if (strlen($hex) === 3) {
		$hex = $hex[0] . $hex[0] . $hex[1] . $hex[1] . $hex[2] . $hex[2];
	}
	if (strlen($hex) !== 6) {
		return 'rgba(35,81,245,' . (float) $alpha . ')';
	}

	$red   = hexdec(substr($hex, 0, 2));
	$green = hexdec(substr($hex, 2, 2));
	$blue  = hexdec(substr($hex, 4, 2));

	return 'rgba(' . $red . ',' . $green . ',' . $blue . ',' . (float) $alpha . ')';
}

/**
 * Register supports and menus.
 */
function agencia247_setup() {
	add_theme_support('title-tag');
	add_theme_support('post-thumbnails');
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'script',
			'style',
		)
	);
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 120,
			'width'       => 120,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);
	add_theme_support('custom-background');

	register_nav_menus(
		array(
			'primary' => __('Primary Menu', 'agencia247'),
			'footer'  => __('Footer Menu', 'agencia247'),
		)
	);
}
add_action('after_setup_theme', 'agencia247_setup');

/**
 * Build dynamic Google Fonts URL.
 *
 * @return string
 */
function agencia247_fonts_url() {
	$fonts   = array_filter(
		array(
			agencia247_get_option('body_font'),
			agencia247_get_option('heading_font'),
		)
	);
	$fonts   = array_unique($fonts);
	if (empty($fonts)) {
		$fonts = array('DM Sans', 'Syne');
	}

	$family_params = array();
	foreach ($fonts as $font_name) {
		if ($font_name === 'Syne') {
			$family_params[] = 'family=Syne:wght@400;600;700;800';
			continue;
		}
		if ($font_name === 'DM Sans') {
			$family_params[] = 'family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300';
			continue;
		}
		if ($font_name === 'Poppins') {
			$family_params[] = 'family=Poppins:wght@300;400;500;600;700;800';
			continue;
		}
		if ($font_name === 'Montserrat') {
			$family_params[] = 'family=Montserrat:wght@300;400;500;600;700;800';
			continue;
		}
		if ($font_name === 'Nunito Sans') {
			$family_params[] = 'family=Nunito+Sans:wght@300;400;600;700;800';
		}
	}

	if (empty($family_params)) {
		$family_params[] = 'family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300';
		$family_params[] = 'family=Syne:wght@400;600;700;800';
	}

	return 'https://fonts.googleapis.com/css2?' . implode('&', $family_params) . '&display=swap';
}

/**
 * Enqueue styles and scripts.
 */
function agencia247_enqueue_assets() {
	$version = wp_get_theme()->get('Version');

	wp_enqueue_style('agencia247-fonts', agencia247_fonts_url(), array(), null);
	wp_enqueue_style('agencia247-style', get_stylesheet_uri(), array(), $version);
	wp_enqueue_style(
		'agencia247-main',
		get_template_directory_uri() . '/assets/css/main.css',
		array('agencia247-fonts', 'agencia247-style'),
		$version
	);

	wp_enqueue_script(
		'agencia247-main',
		get_template_directory_uri() . '/assets/js/main.js',
		array(),
		$version,
		true
	);
}
add_action('wp_enqueue_scripts', 'agencia247_enqueue_assets');

/**
 * Output customizer-driven CSS variables.
 */
function agencia247_print_customizer_css() {
	$body_font     = agencia247_sanitize_font_choice((string) agencia247_get_option('body_font'));
	$heading_font  = agencia247_sanitize_font_choice((string) agencia247_get_option('heading_font'));

	$color_bg      = sanitize_hex_color((string) agencia247_get_option('color_bg')) ?: '#f5f7ff';
	$color_bg2     = sanitize_hex_color((string) agencia247_get_option('color_bg2')) ?: '#eef0fb';
	$color_white   = sanitize_hex_color((string) agencia247_get_option('color_white')) ?: '#ffffff';
	$color_dark    = sanitize_hex_color((string) agencia247_get_option('color_dark')) ?: '#0d1024';
	$color_mid     = sanitize_hex_color((string) agencia247_get_option('color_mid')) ?: '#3a3f5c';
	$color_muted   = sanitize_hex_color((string) agencia247_get_option('color_muted')) ?: '#7b80a0';
	$color_blue    = sanitize_hex_color((string) agencia247_get_option('color_blue')) ?: '#2351f5';
	$color_accent  = sanitize_hex_color((string) agencia247_get_option('color_accent')) ?: '#00c9a7';
	$global_bg_img = trim((string) agencia247_get_option('global_background_image'));
	$blue_soft     = agencia247_hex_to_rgba($color_blue, 0.08);
	$blue_mid      = agencia247_hex_to_rgba($color_blue, 0.18);
	$border_color  = agencia247_hex_to_rgba($color_blue, 0.10);
	$shadow_color  = agencia247_hex_to_rgba($color_blue, 0.10);

	$font_choices  = agencia247_font_choices();
	$body_stack    = isset($font_choices[ $body_font ]) ? "'{$body_font}', sans-serif" : "'DM Sans', sans-serif";
	$heading_stack = isset($font_choices[ $heading_font ]) ? "'{$heading_font}', sans-serif" : "'Syne', sans-serif";

	$extra_bg = '';
	if ($global_bg_img !== '') {
		$extra_bg = "body{background-image:url('" . esc_url_raw($global_bg_img) . "');background-size:cover;background-attachment:fixed;background-position:center;}";
	}

	echo '<style id="agencia247-customizer-vars">';
	echo ':root{' .
		'--bg:' . esc_html($color_bg) . ';' .
		'--bg2:' . esc_html($color_bg2) . ';' .
		'--white:' . esc_html($color_white) . ';' .
		'--dark:' . esc_html($color_dark) . ';' .
		'--mid:' . esc_html($color_mid) . ';' .
		'--muted:' . esc_html($color_muted) . ';' .
		'--blue:' . esc_html($color_blue) . ';' .
		'--accent:' . esc_html($color_accent) . ';' .
		'--blue-soft:' . esc_html($blue_soft) . ';' .
		'--blue-mid:' . esc_html($blue_mid) . ';' .
		'--blue-light: #e8edff;' .
		'--border:' . esc_html($border_color) . ';' .
		'--shadow: 0 8px 40px ' . esc_html($shadow_color) . ';' .
		'--font-body:' . $body_stack . ';' .
		'--font-heading:' . $heading_stack . ';' .
	'}';
	echo 'body{font-family:var(--font-body);}';
	echo '.logo-text,h1,.section-title,.contact-name,.service-content h3{font-family:var(--font-heading);}';
	echo $extra_bg; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	echo '</style>';
}
add_action('wp_head', 'agencia247_print_customizer_css', 120);

<?php
/**
 * Theme functions for Agencia247.
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * Resolve image URL inside theme with file fallback.
 *
 * @param string $relative Relative image path inside assets/images.
 * @return string
 */
function agencia247_theme_image_url($relative = '') {
	$relative = ltrim((string) $relative, '/\\');
	$relative = str_replace('..', '', $relative);

	$asset_path = get_template_directory() . '/assets/images/' . $relative;
	if ($relative && file_exists($asset_path)) {
		return get_template_directory_uri() . '/assets/images/' . $relative;
	}

	return get_template_directory_uri() . '/images/image.png';
}

/**
 * Register theme supports.
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
}
add_action('after_setup_theme', 'agencia247_setup');

/**
 * Enqueue theme assets.
 */
function agencia247_enqueue_assets() {
	$version = wp_get_theme()->get('Version');

	wp_enqueue_style('agencia247-style', get_stylesheet_uri(), array(), $version);
	wp_enqueue_style(
		'agencia247-main',
		get_template_directory_uri() . '/assets/css/main.css',
		array('agencia247-style'),
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
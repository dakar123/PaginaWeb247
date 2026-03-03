<?php
/**
 * Theme setup and asset loading.
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * Compatibility shims to avoid fatals if helpers.php is outdated in production.
 */
if (!function_exists('agencia247_sanitize_whatsapp_number')) {
	function agencia247_sanitize_whatsapp_number($value) {
		$value = preg_replace('/[^0-9]/', '', (string) $value);
		return substr((string) $value, 0, 20);
	}
}

if (!function_exists('agencia247_sanitize_brand_intro_animation')) {
	function agencia247_sanitize_brand_intro_animation($value) {
		$allowed = array('none', 'fade', 'slide', 'drop');
		return in_array((string) $value, $allowed, true) ? (string) $value : 'drop';
	}
}

if (!function_exists('agencia247_sanitize_dropdown_delay')) {
	function agencia247_sanitize_dropdown_delay($value) {
		$delay = absint($value);
		if ($delay < 80) {
			return 80;
		}
		if ($delay > 800) {
			return 800;
		}
		return $delay;
	}
}

if (!function_exists('agencia247_sanitize_latitude')) {
	function agencia247_sanitize_latitude($value) {
		$lat = is_numeric($value) ? (float) $value : -15.840691174561973;
		$lat = max(-90, min(90, $lat));
		return (string) $lat;
	}
}

if (!function_exists('agencia247_sanitize_longitude')) {
	function agencia247_sanitize_longitude($value) {
		$lon = is_numeric($value) ? (float) $value : -70.02602661165675;
		$lon = max(-180, min(180, $lon));
		return (string) $lon;
	}
}

if (!function_exists('agencia247_sanitize_map_zoom')) {
	function agencia247_sanitize_map_zoom($value) {
		$zoom = is_numeric($value) ? (float) $value : 13.4;
		$zoom = max(2, min(20, $zoom));
		return (string) $zoom;
	}
}

if (!function_exists('agencia247_get_url_context_path')) {
	function agencia247_get_url_context_path($url) {
		$path = (string) wp_parse_url((string) $url, PHP_URL_PATH);
		$path = trim($path, '/');
		return ($path === '') ? 'inicio' : $path;
	}
}

if (!function_exists('agencia247_get_current_request_context_path')) {
	function agencia247_get_current_request_context_path() {
		$request = '';
		global $wp;

		if (isset($wp) && isset($wp->request)) {
			$request = trim((string) $wp->request, '/');
		}

		if ($request === '') {
			$uri      = isset($_SERVER['REQUEST_URI']) ? (string) wp_unslash($_SERVER['REQUEST_URI']) : '';
			$uri_path = (string) wp_parse_url($uri, PHP_URL_PATH);
			$home_path = trim((string) wp_parse_url(home_url('/'), PHP_URL_PATH), '/');

			$uri_path = trim($uri_path, '/');
			if ($home_path !== '' && strpos($uri_path, $home_path) === 0) {
				$uri_path = trim(substr($uri_path, strlen($home_path)), '/');
			}

			$request = $uri_path;
		}

		return ($request === '') ? 'inicio' : $request;
	}
}

if (!function_exists('agencia247_get_site_logo_url')) {
	function agencia247_get_site_logo_url() {
		$logo_url = function_exists('agencia247_theme_image_url')
			? agencia247_theme_image_url('logo.png')
			: get_template_directory_uri() . '/images/image.png';

		if (has_custom_logo()) {
			$logo_id          = (int) get_theme_mod('custom_logo');
			$custom_logo_data = wp_get_attachment_image_src($logo_id, 'full');
			if (!empty($custom_logo_data[0])) {
				$logo_url = $custom_logo_data[0];
			}
		}

		return $logo_url;
	}
}

if (!function_exists('agencia247_get_whatsapp_number')) {
	function agencia247_get_whatsapp_number() {
		$number = '';
		if (function_exists('agencia247_get_option')) {
			$number = (string) agencia247_get_option('whatsapp_number');
		} else {
			$number = (string) get_theme_mod('whatsapp_number', '');
		}
		$number = agencia247_sanitize_whatsapp_number($number);
		if ($number !== '') {
			return $number;
		}

		$legacy_url = function_exists('agencia247_get_option')
			? (string) agencia247_get_option('contact_whatsapp_url')
			: (string) get_theme_mod('contact_whatsapp_url', '');

		$legacy_path = (string) wp_parse_url($legacy_url, PHP_URL_PATH);
		$legacy_query = (string) wp_parse_url($legacy_url, PHP_URL_QUERY);
		$candidate = '';

		if (strpos($legacy_url, 'wa.me/') !== false && $legacy_path !== '') {
			$candidate = trim($legacy_path, '/');
		}
		if ($candidate === '' && strpos($legacy_url, 'api.whatsapp.com') !== false && $legacy_query !== '') {
			parse_str($legacy_query, $query_args);
			$candidate = isset($query_args['phone']) ? (string) $query_args['phone'] : '';
		}

		return agencia247_sanitize_whatsapp_number($candidate);
	}
}

if (!function_exists('agencia247_build_whatsapp_message')) {
	function agencia247_build_whatsapp_message($context = '', $title = '') {
		$base_message = function_exists('agencia247_get_option')
			? trim((string) agencia247_get_option('whatsapp_base_message'))
			: trim((string) get_theme_mod('whatsapp_base_message', ''));
		if ($base_message === '') {
			$base_message = 'Hola, quiero informacion sobre sus servicios.';
		}

		$parts = array($base_message);
		$title = trim((string) $title);
		if ($title !== '') {
			$parts[] = 'Me interesa: ' . $title . '.';
		}
		$parts[] = 'Quisiera una cotizacion y detalles, por favor.';

		return implode(' ', $parts);
	}
}

if (!function_exists('agencia247_get_whatsapp_url')) {
	function agencia247_get_whatsapp_url($message = '') {
		$number = agencia247_get_whatsapp_number();
		if ($number === '') {
			return '';
		}
		$url = 'https://wa.me/' . $number;
		$message = trim((string) $message);
		if ($message !== '') {
			$url .= '?text=' . rawurlencode($message);
		}
		return $url;
	}
}

if (!function_exists('agencia247_get_current_whatsapp_url')) {
	function agencia247_get_current_whatsapp_url() {
		$context = agencia247_get_current_request_context_path();
		$title = wp_get_document_title();

		if (is_singular()) {
			$post = get_queried_object();
			if ($post instanceof WP_Post) {
				$context = agencia247_get_url_context_path(get_permalink($post));
				$title = get_the_title($post);
			}
		}

		return agencia247_get_whatsapp_url(agencia247_build_whatsapp_message($context, $title));
	}
}

if (!function_exists('agencia247_get_whatsapp_url_for_post')) {
	function agencia247_get_whatsapp_url_for_post($post_id = 0, $custom_context = '') {
		$post_id = (int) $post_id;
		$title   = '';
		$context = trim((string) $custom_context);

		if ($post_id > 0) {
			$title = get_the_title($post_id);
			if ($context === '') {
				$context = agencia247_get_url_context_path(get_permalink($post_id));
			}
		}

		if ($context === '') {
			$context = 'inicio';
		}

		return agencia247_get_whatsapp_url(agencia247_build_whatsapp_message($context, $title));
	}
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
	$map_enabled_raw = agencia247_get_option('contact_map_enabled');
	$map_enabled = ($map_enabled_raw === '' || $map_enabled_raw === null) ? true : (bool) $map_enabled_raw;
	$map_lat = (float) agencia247_sanitize_latitude(agencia247_get_option('contact_map_lat'));
	$map_lon = (float) agencia247_sanitize_longitude(agencia247_get_option('contact_map_lon'));
	$map_zoom = (float) agencia247_sanitize_map_zoom(agencia247_get_option('contact_map_zoom'));
	$dropdown_delay = agencia247_sanitize_dropdown_delay(agencia247_get_option('nav_dropdown_delay'));
	$main_script_deps = array();

	wp_enqueue_style('agencia247-fonts', agencia247_fonts_url(), array(), null);
	wp_enqueue_style('agencia247-style', get_stylesheet_uri(), array(), $version);
	wp_enqueue_style(
		'agencia247-main',
		get_template_directory_uri() . '/assets/css/main.css',
		array('agencia247-fonts', 'agencia247-style'),
		$version
	);

	if ($map_enabled) {
		$openlayers_base = trailingslashit(get_template_directory_uri() . '/assets/vendor/openlayers');
		wp_enqueue_style('agencia247-openlayers', $openlayers_base . 'ol.css', array(), '10.6.1');
		wp_enqueue_script('agencia247-openlayers', $openlayers_base . 'ol.js', array(), '10.6.1', true);
		$main_script_deps[] = 'agencia247-openlayers';
	}

	wp_enqueue_script(
		'agencia247-main',
		get_template_directory_uri() . '/assets/js/main.js',
		$main_script_deps,
		$version,
		true
	);

	wp_localize_script(
		'agencia247-main',
		'agencia247Theme',
		array(
			'map' => array(
				'enabled'   => $map_enabled ? 1 : 0,
				'lat'       => $map_lat,
				'lon'       => $map_lon,
				'zoom'      => $map_zoom,
				'radar'     => (bool) agencia247_get_option('contact_map_radar') ? 1 : 0,
				'logoUrl'   => agencia247_get_site_logo_url(),
				'assetBase' => trailingslashit(get_template_directory_uri() . '/assets/vendor/openlayers'),
			),
			'wa'  => array(
				'number'      => agencia247_get_whatsapp_number(),
				'currentUrl'  => agencia247_get_current_whatsapp_url(),
				'currentText' => agencia247_build_whatsapp_message(agencia247_get_current_request_context_path(), wp_get_document_title()),
			),
			'ui' => array(
				'brandIntro'        => agencia247_sanitize_brand_intro_animation((string) agencia247_get_option('brand_intro_animation')),
				'navDropdownDelay'  => $dropdown_delay,
			),
		)
	);
}
add_action('wp_enqueue_scripts', 'agencia247_enqueue_assets');

/**
 * Render floating WhatsApp button in all pages.
 */
function agencia247_render_whatsapp_button() {
	$wa_url = agencia247_get_current_whatsapp_url();
	if ($wa_url === '') {
		return;
	}

	$label = trim((string) agencia247_get_option('whatsapp_button_label'));
	if ($label === '') {
		$label = 'WhatsApp';
	}
	?>
	<a
		class="wa-floating-btn"
		href="<?php echo esc_url($wa_url); ?>"
		target="_blank"
		rel="noopener noreferrer"
		aria-label="<?php echo esc_attr($label); ?>"
	>
		<span class="wa-floating-icon" aria-hidden="true">
			<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/></svg>
		</span>
		<span class="wa-floating-label"><?php echo esc_html($label); ?></span>
	</a>
	<?php
}
add_action('wp_footer', 'agencia247_render_whatsapp_button', 40);

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

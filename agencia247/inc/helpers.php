<?php
/**
 * Helper functions for Agencia247 theme.
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * Theme defaults.
 *
 * @return array<string, mixed>
 */
function agencia247_get_defaults() {
	return array(
		'show_hero'                 => 1,
		'show_ticker'               => 1,
		'show_about'                => 1,
		'show_services'             => 1,
		'show_projects'             => 1,
		'show_contact'              => 1,

		'body_font'                 => 'DM Sans',
		'heading_font'              => 'Syne',
		'color_bg'                  => '#f5f7ff',
		'color_bg2'                 => '#eef0fb',
		'color_white'               => '#ffffff',
		'color_dark'                => '#0d1024',
		'color_mid'                 => '#3a3f5c',
		'color_muted'               => '#7b80a0',
		'color_blue'                => '#2351f5',
		'color_accent'              => '#00c9a7',
		'global_background_image'   => '',

		'nav_cta_text'              => 'Hablemos',
		'nav_cta_url'               => '/#contacto',

		'hero_tag'                  => 'Marketing & Produccion Integral',
		'hero_title'                => "Tu marca\nal siguiente\nnivel.",
		'hero_sub'                  => 'Soluciones completas para empresas, emprendimientos y eventos. Estrategia digital, produccion audiovisual y publicidad offline.',
		'hero_btn_primary_text'     => 'Ver servicios',
		'hero_btn_primary_url'      => '/#servicios',
		'hero_btn_secondary_text'   => 'Contactanos',
		'hero_btn_secondary_url'    => '/#contacto',
		'hero_badge_text'           => 'Disponibles 24/7',
		'hero_badge_sub'            => 'Siempre para ti',
		'hero_bg_image'             => '',
		'hero_main_image'           => '',

		'work_label'                => 'Nuestro trabajo',
		'work_count'                => 12,

		'about_label'               => 'Quienes somos',
		'about_title'               => 'Creatividad con enfoque en resultados',
		'about_text_1'              => 'Trabajamos con profesionalismo, creatividad y enfoque en resultados, asegurando que cada proyecto refleje excelencia, innovacion y alto impacto en el mercado.',
		'about_text_2'              => 'Brindamos un servicio integral que abarca desde la estrategia digital hasta la produccion audiovisual y publicidad offline para empresas, emprendimientos y eventos.',
		'about_button_text'         => 'Trabajemos juntos',
		'about_button_url'          => '/#contacto',
		'about_image_1'             => '',
		'about_image_2'             => '',
		'about_image_3'             => '',

		'services_label'            => 'Lo que hacemos',
		'services_title'            => 'Nuestros servicios',
		'services_intro'            => 'Tu decides como quieres crecer. Nosotros ponemos la estrategia, el diseno y la produccion.',
		'services_count'            => 6,

		'projects_label'            => 'Portfolio',
		'projects_title'            => 'Proyectos',
		'projects_count'            => 4,

		'contact_label'             => 'Hablemos',
		'contact_name'              => "Jessica\nKowalski",
		'contact_sub'               => 'Disponibles siempre para ti',
		'contact_text'              => 'Listo para llevar tu marca al siguiente nivel. Contactanos por cualquier canal - respondemos las 24 horas, los 7 dias de la semana.',
		'contact_twitter_label'     => 'Twitter',
		'contact_twitter_url'       => '#',
		'contact_facebook_label'    => 'Facebook',
		'contact_facebook_url'      => '#',
		'contact_instagram_label'   => 'Instagram',
		'contact_instagram_url'     => '#',
		'contact_whatsapp_label'    => 'WhatsApp',
		'contact_whatsapp_url'      => '#',

		'footer_text'               => 'Agencia 24/7 - Todos los derechos reservados',
		'footer_accent'             => 'Disponibles 24 horas, 7 dias',
	);
}

/**
 * Get option from Customizer with defaults.
 *
 * @param string $key Option key.
 * @return mixed
 */
function agencia247_get_option($key) {
	$defaults = agencia247_get_defaults();
	$default  = array_key_exists($key, $defaults) ? $defaults[ $key ] : '';

	return get_theme_mod($key, $default);
}

/**
 * Return image URL from assets folder with fallback.
 *
 * @param string $relative Relative file path in assets/images.
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
 * Resolve customizer image URL with fallback.
 *
 * @param string $setting_key Customizer setting key.
 * @param string $fallback_relative Relative fallback image path.
 * @return string
 */
function agencia247_get_image_setting_url($setting_key, $fallback_relative = '') {
	$image_url = trim((string) agencia247_get_option($setting_key));
	if ($image_url !== '') {
		return esc_url_raw($image_url);
	}

	return agencia247_theme_image_url($fallback_relative);
}

/**
 * Check whether a home section is enabled.
 *
 * @param string $section_key Section key without prefix.
 * @return bool
 */
function agencia247_is_section_enabled($section_key) {
	return (bool) agencia247_get_option('show_' . $section_key);
}

/**
 * URL sanitizer for relative anchor links.
 *
 * @param string $url Raw URL.
 * @return string
 */
function agencia247_resolve_link($url) {
	$url = trim((string) $url);
	if ($url === '') {
		return home_url('/');
	}

	if (strpos($url, '#') === 0) {
		return home_url('/' . $url);
	}

	if (strpos($url, '/#') === 0) {
		return home_url($url);
	}

	if (strpos($url, '/') === 0) {
		return home_url($url);
	}

	return $url;
}

/**
 * Body/heading font choices.
 *
 * @return array<string, string>
 */
function agencia247_font_choices() {
	return array(
		'DM Sans'      => 'DM Sans',
		'Syne'         => 'Syne',
		'Poppins'      => 'Poppins',
		'Montserrat'   => 'Montserrat',
		'Nunito Sans'  => 'Nunito Sans',
	);
}

/**
 * Sanitize checkbox.
 *
 * @param mixed $value Value.
 * @return int
 */
function agencia247_sanitize_checkbox($value) {
	return (!empty($value) && (int) $value === 1) ? 1 : 0;
}

/**
 * Sanitize integer.
 *
 * @param mixed $value Value.
 * @return int
 */
function agencia247_sanitize_int($value) {
	return max(0, absint($value));
}

/**
 * Sanitize font choice.
 *
 * @param string $value Value.
 * @return string
 */
function agencia247_sanitize_font_choice($value) {
	$choices = agencia247_font_choices();
	return isset($choices[ $value ]) ? $value : 'DM Sans';
}

/**
 * Get service card tags.
 *
 * @param int $post_id Service post ID.
 * @return string[]
 */
function agencia247_get_service_tags($post_id) {
	$terms = get_the_terms($post_id, 'agencia_service_tag');
	if (!is_wp_error($terms) && !empty($terms)) {
		return array_map(
			static function($term) {
				return $term->name;
			},
			$terms
		);
	}

	$meta_tags = (string) get_post_meta($post_id, '_agencia_service_tags', true);
	if ($meta_tags === '') {
		return array();
	}

	$parts = array_map('trim', explode(',', $meta_tags));
	$parts = array_filter($parts);

	return array_values($parts);
}

/**
 * Get work URL.
 *
 * @param int $post_id Work post ID.
 * @return string
 */
function agencia247_get_work_url($post_id) {
	$url = trim((string) get_post_meta($post_id, '_agencia_work_url', true));
	if ($url !== '') {
		return $url;
	}

	return get_permalink($post_id);
}

/**
 * Get service URL.
 *
 * @param int $post_id Service post ID.
 * @return string
 */
function agencia247_get_service_url($post_id) {
	$url = trim((string) get_post_meta($post_id, '_agencia_service_url', true));
	if ($url !== '') {
		return $url;
	}

	return get_permalink($post_id);
}

/**
 * Fallback primary menu.
 */
function agencia247_primary_menu_fallback() {
	$menu = array();

	if (agencia247_is_section_enabled('services')) {
		$services_submenu = array();
		$services_query   = new WP_Query(
			array(
				'post_type'      => 'agencia_service',
				'post_status'    => 'publish',
				'posts_per_page' => 8,
				'orderby'        => array('menu_order' => 'ASC', 'date' => 'DESC'),
			)
		);
		if ($services_query->have_posts()) {
			while ($services_query->have_posts()) {
				$services_query->the_post();
				$services_submenu[] = array(
					'label' => get_the_title(),
					'url'   => agencia247_get_service_url(get_the_ID()),
				);
			}
			wp_reset_postdata();
		}

		$menu[] = array(
			'label'   => 'Servicios',
			'url'     => home_url('/#servicios'),
			'children'=> $services_submenu,
		);
	}

	if (agencia247_is_section_enabled('projects')) {
		$menu[] = array(
			'label' => 'Proyectos',
			'url'   => home_url('/#proyectos'),
		);
	}

	if (agencia247_is_section_enabled('contact')) {
		$menu[] = array(
			'label' => 'Contacto',
			'url'   => home_url('/#contacto'),
		);
	}

	echo '<ul class="primary-menu">';
	foreach ($menu as $item) {
		$has_children = !empty($item['children']);
		echo '<li class="menu-item' . ($has_children ? ' menu-item-has-children' : '') . '">';
		echo '<a href="' . esc_url($item['url']) . '">' . esc_html($item['label']) . '</a>';
		if ($has_children) {
			echo '<ul class="sub-menu">';
			foreach ($item['children'] as $child) {
				echo '<li class="menu-item"><a href="' . esc_url($child['url']) . '">' . esc_html($child['label']) . '</a></li>';
			}
			echo '</ul>';
		}
		echo '</li>';
	}
	echo '</ul>';
}

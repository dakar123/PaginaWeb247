<?php
/**
 * Custom post types and meta boxes.
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * Register services and works content types.
 */
function agencia247_register_content_types() {
	register_post_type(
		'agencia_service',
		array(
			'labels' => array(
				'name'               => __('Servicios', 'agencia247'),
				'singular_name'      => __('Servicio', 'agencia247'),
				'add_new_item'       => __('Agregar servicio', 'agencia247'),
				'edit_item'          => __('Editar servicio', 'agencia247'),
				'new_item'           => __('Nuevo servicio', 'agencia247'),
				'view_item'          => __('Ver servicio', 'agencia247'),
				'search_items'       => __('Buscar servicios', 'agencia247'),
				'not_found'          => __('No hay servicios', 'agencia247'),
				'not_found_in_trash' => __('No hay servicios en papelera', 'agencia247'),
			),
			'public'             => true,
			'show_in_rest'       => true,
			'has_archive'        => true,
			'rewrite'            => array('slug' => 'servicios'),
			'menu_icon'          => 'dashicons-screenoptions',
			'supports'           => array('title', 'editor', 'excerpt', 'thumbnail', 'page-attributes'),
		)
	);

	register_post_type(
		'agencia_work',
		array(
			'labels' => array(
				'name'               => __('Trabajos', 'agencia247'),
				'singular_name'      => __('Trabajo', 'agencia247'),
				'add_new_item'       => __('Agregar trabajo', 'agencia247'),
				'edit_item'          => __('Editar trabajo', 'agencia247'),
				'new_item'           => __('Nuevo trabajo', 'agencia247'),
				'view_item'          => __('Ver trabajo', 'agencia247'),
				'search_items'       => __('Buscar trabajos', 'agencia247'),
				'not_found'          => __('No hay trabajos', 'agencia247'),
				'not_found_in_trash' => __('No hay trabajos en papelera', 'agencia247'),
			),
			'public'             => true,
			'show_in_rest'       => true,
			'has_archive'        => true,
			'rewrite'            => array('slug' => 'trabajos'),
			'menu_icon'          => 'dashicons-format-gallery',
			'supports'           => array('title', 'editor', 'excerpt', 'thumbnail', 'page-attributes'),
		)
	);

	register_taxonomy(
		'agencia_service_tag',
		'agencia_service',
		array(
			'labels'       => array(
				'name'          => __('Etiquetas de servicio', 'agencia247'),
				'singular_name' => __('Etiqueta de servicio', 'agencia247'),
			),
			'public'       => true,
			'show_in_rest' => true,
			'hierarchical' => false,
		)
	);
}
add_action('init', 'agencia247_register_content_types');

/**
 * Flush rewrite rules on theme activation.
 */
function agencia247_flush_rewrite_on_switch() {
	agencia247_register_content_types();
	flush_rewrite_rules();
}
add_action('after_switch_theme', 'agencia247_flush_rewrite_on_switch');

/**
 * Register meta boxes.
 */
function agencia247_register_metaboxes() {
	add_meta_box(
		'agencia247_work_meta',
		__('Enlace del trabajo', 'agencia247'),
		'agencia247_render_work_meta',
		'agencia_work',
		'normal',
		'default'
	);

	add_meta_box(
		'agencia247_service_meta',
		__('Opciones del servicio', 'agencia247'),
		'agencia247_render_service_meta',
		'agencia_service',
		'normal',
		'default'
	);
}
add_action('add_meta_boxes', 'agencia247_register_metaboxes');

/**
 * Render work metabox.
 *
 * @param WP_Post $post Post object.
 */
function agencia247_render_work_meta($post) {
	wp_nonce_field('agencia247_save_meta', 'agencia247_meta_nonce');
	$url = (string) get_post_meta($post->ID, '_agencia_work_url', true);
	?>
	<p>
		<label for="agencia247_work_url"><strong><?php esc_html_e('URL destino del trabajo', 'agencia247'); ?></strong></label>
		<input type="url" name="agencia247_work_url" id="agencia247_work_url" value="<?php echo esc_attr($url); ?>" class="widefat" placeholder="https://example.com/proyecto">
	</p>
	<p><?php esc_html_e('Si lo dejas vacio, se usara la pagina individual del trabajo.', 'agencia247'); ?></p>
	<?php
}

/**
 * Render service metabox.
 *
 * @param WP_Post $post Post object.
 */
function agencia247_render_service_meta($post) {
	wp_nonce_field('agencia247_save_meta', 'agencia247_meta_nonce');
	$url  = (string) get_post_meta($post->ID, '_agencia_service_url', true);
	$tags = (string) get_post_meta($post->ID, '_agencia_service_tags', true);
	?>
	<p>
		<label for="agencia247_service_url"><strong><?php esc_html_e('URL destino del servicio', 'agencia247'); ?></strong></label>
		<input type="url" name="agencia247_service_url" id="agencia247_service_url" value="<?php echo esc_attr($url); ?>" class="widefat" placeholder="https://example.com/servicio">
	</p>
	<p>
		<label for="agencia247_service_tags"><strong><?php esc_html_e('Etiquetas (separadas por coma)', 'agencia247'); ?></strong></label>
		<input type="text" name="agencia247_service_tags" id="agencia247_service_tags" value="<?php echo esc_attr($tags); ?>" class="widefat" placeholder="SEO, Publicidad, Branding">
	</p>
	<?php
}

/**
 * Save meta boxes.
 *
 * @param int $post_id Post ID.
 */
function agencia247_save_meta($post_id) {
	if (!isset($_POST['agencia247_meta_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['agencia247_meta_nonce'])), 'agencia247_save_meta')) {
		return;
	}

	if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
		return;
	}

	if (!current_user_can('edit_post', $post_id)) {
		return;
	}

	$post_type = get_post_type($post_id);
	if ($post_type === 'agencia_work') {
		$url = isset($_POST['agencia247_work_url']) ? esc_url_raw(wp_unslash($_POST['agencia247_work_url'])) : '';
		if ($url !== '') {
			update_post_meta($post_id, '_agencia_work_url', $url);
		} else {
			delete_post_meta($post_id, '_agencia_work_url');
		}
	}

	if ($post_type === 'agencia_service') {
		$url = isset($_POST['agencia247_service_url']) ? esc_url_raw(wp_unslash($_POST['agencia247_service_url'])) : '';
		if ($url !== '') {
			update_post_meta($post_id, '_agencia_service_url', $url);
		} else {
			delete_post_meta($post_id, '_agencia_service_url');
		}

		$tags = isset($_POST['agencia247_service_tags']) ? sanitize_text_field(wp_unslash($_POST['agencia247_service_tags'])) : '';
		if ($tags !== '') {
			update_post_meta($post_id, '_agencia_service_tags', $tags);
		} else {
			delete_post_meta($post_id, '_agencia_service_tags');
		}
	}
}
add_action('save_post', 'agencia247_save_meta');

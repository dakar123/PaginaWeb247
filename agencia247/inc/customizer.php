<?php
/**
 * Customizer registration.
 */

if (!defined('ABSPATH')) {
	exit;
}

/**
 * Register Customizer settings.
 *
 * @param WP_Customize_Manager $wp_customize Customizer manager.
 */
function agencia247_customize_register($wp_customize) {
	$defaults = agencia247_get_defaults();

	$wp_customize->add_panel(
		'agencia247_panel',
		array(
			'title'       => __('Agencia247 Theme Options', 'agencia247'),
			'priority'    => 30,
			'description' => __('Customize every section while keeping the original design.', 'agencia247'),
		)
	);

	$wp_customize->add_section(
		'agencia247_section_visibility',
		array(
			'title'    => __('Section Visibility', 'agencia247'),
			'panel'    => 'agencia247_panel',
			'priority' => 5,
		)
	);

	$visibility_controls = array(
		'show_hero'     => __('Show Hero', 'agencia247'),
		'show_ticker'   => __('Show Nuestro Trabajo', 'agencia247'),
		'show_about'    => __('Show Quienes Somos', 'agencia247'),
		'show_services' => __('Show Servicios', 'agencia247'),
		'show_projects' => __('Show Proyectos', 'agencia247'),
		'show_contact'  => __('Show Contacto', 'agencia247'),
	);

	foreach ($visibility_controls as $key => $label) {
		$wp_customize->add_setting(
			$key,
			array(
				'default'           => $defaults[ $key ],
				'sanitize_callback' => 'agencia247_sanitize_checkbox',
			)
		);
		$wp_customize->add_control(
			$key,
			array(
				'label'   => $label,
				'section' => 'agencia247_section_visibility',
				'type'    => 'checkbox',
			)
		);
	}

	$wp_customize->add_section(
		'agencia247_section_style',
		array(
			'title'    => __('Style, Fonts and Background', 'agencia247'),
			'panel'    => 'agencia247_panel',
			'priority' => 10,
		)
	);

	$wp_customize->add_setting(
		'body_font',
		array(
			'default'           => $defaults['body_font'],
			'sanitize_callback' => 'agencia247_sanitize_font_choice',
		)
	);
	$wp_customize->add_control(
		'body_font',
		array(
			'label'   => __('Body Font', 'agencia247'),
			'section' => 'agencia247_section_style',
			'type'    => 'select',
			'choices' => agencia247_font_choices(),
		)
	);

	$wp_customize->add_setting(
		'heading_font',
		array(
			'default'           => $defaults['heading_font'],
			'sanitize_callback' => 'agencia247_sanitize_font_choice',
		)
	);
	$wp_customize->add_control(
		'heading_font',
		array(
			'label'   => __('Heading Font', 'agencia247'),
			'section' => 'agencia247_section_style',
			'type'    => 'select',
			'choices' => agencia247_font_choices(),
		)
	);

	$color_fields = array(
		'color_bg'     => __('Background Color 1', 'agencia247'),
		'color_bg2'    => __('Background Color 2', 'agencia247'),
		'color_white'  => __('White Color', 'agencia247'),
		'color_dark'   => __('Dark Color', 'agencia247'),
		'color_mid'    => __('Mid Color', 'agencia247'),
		'color_muted'  => __('Muted Color', 'agencia247'),
		'color_blue'   => __('Primary Color', 'agencia247'),
		'color_accent' => __('Accent Color', 'agencia247'),
	);

	foreach ($color_fields as $key => $label) {
		$wp_customize->add_setting(
			$key,
			array(
				'default'           => $defaults[ $key ],
				'sanitize_callback' => 'sanitize_hex_color',
			)
		);

		$wp_customize->add_control(
			new WP_Customize_Color_Control(
				$wp_customize,
				$key,
				array(
					'label'   => $label,
					'section' => 'agencia247_section_style',
				)
			)
		);
	}

	$wp_customize->add_setting(
		'global_background_image',
		array(
			'default'           => $defaults['global_background_image'],
			'sanitize_callback' => 'esc_url_raw',
		)
	);
	$wp_customize->add_control(
		new WP_Customize_Image_Control(
			$wp_customize,
			'global_background_image',
			array(
				'label'   => __('Global Background Image (optional)', 'agencia247'),
				'section' => 'agencia247_section_style',
			)
		)
	);

	$wp_customize->add_section(
		'agencia247_section_header',
		array(
			'title'    => __('Header', 'agencia247'),
			'panel'    => 'agencia247_panel',
			'priority' => 15,
		)
	);

	$wp_customize->add_setting(
		'nav_cta_text',
		array(
			'default'           => $defaults['nav_cta_text'],
			'sanitize_callback' => 'sanitize_text_field',
		)
	);
	$wp_customize->add_control(
		'nav_cta_text',
		array(
			'label'   => __('Header CTA Text', 'agencia247'),
			'section' => 'agencia247_section_header',
			'type'    => 'text',
		)
	);

	$wp_customize->add_setting(
		'nav_cta_url',
		array(
			'default'           => $defaults['nav_cta_url'],
			'sanitize_callback' => 'sanitize_text_field',
		)
	);
	$wp_customize->add_control(
		'nav_cta_url',
		array(
			'label'       => __('Header CTA URL', 'agencia247'),
			'section'     => 'agencia247_section_header',
			'type'        => 'text',
			'description' => __('Supports full URLs and section anchors such as /#contacto', 'agencia247'),
		)
	);

	$wp_customize->add_section(
		'agencia247_section_hero',
		array(
			'title'    => __('Hero Section', 'agencia247'),
			'panel'    => 'agencia247_panel',
			'priority' => 20,
		)
	);

	$hero_text_fields = array(
		'hero_tag'                => __('Hero Tagline', 'agencia247'),
		'hero_title'              => __('Hero Title (use line breaks)', 'agencia247'),
		'hero_sub'                => __('Hero Description', 'agencia247'),
		'hero_btn_primary_text'   => __('Primary Button Text', 'agencia247'),
		'hero_btn_primary_url'    => __('Primary Button URL', 'agencia247'),
		'hero_btn_secondary_text' => __('Secondary Button Text', 'agencia247'),
		'hero_btn_secondary_url'  => __('Secondary Button URL', 'agencia247'),
		'hero_badge_text'         => __('Badge Title', 'agencia247'),
		'hero_badge_sub'          => __('Badge Subtitle', 'agencia247'),
	);

	foreach ($hero_text_fields as $key => $label) {
		$sanitize = (strpos($key, '_url') !== false) ? 'esc_url_raw' : 'sanitize_textarea_field';
		$type     = (strpos($key, '_url') !== false) ? 'url' : 'textarea';
		if (in_array($key, array('hero_tag', 'hero_btn_primary_text', 'hero_btn_secondary_text', 'hero_badge_text', 'hero_badge_sub'), true)) {
			$sanitize = 'sanitize_text_field';
			$type     = 'text';
		}
		if (in_array($key, array('hero_btn_primary_url', 'hero_btn_secondary_url'), true)) {
			$sanitize = 'sanitize_text_field';
			$type     = 'text';
		}

		$wp_customize->add_setting(
			$key,
			array(
				'default'           => $defaults[ $key ],
				'sanitize_callback' => $sanitize,
			)
		);
		$wp_customize->add_control(
			$key,
			array(
				'label'   => $label,
				'section' => 'agencia247_section_hero',
				'type'    => $type,
			)
		);
	}

	$hero_image_fields = array(
		'hero_bg_image'   => __('Hero Background Image', 'agencia247'),
		'hero_main_image' => __('Hero Main Image', 'agencia247'),
	);

	foreach ($hero_image_fields as $key => $label) {
		$wp_customize->add_setting(
			$key,
			array(
				'default'           => $defaults[ $key ],
				'sanitize_callback' => 'esc_url_raw',
			)
		);
		$wp_customize->add_control(
			new WP_Customize_Image_Control(
				$wp_customize,
				$key,
				array(
					'label'   => $label,
					'section' => 'agencia247_section_hero',
				)
			)
		);
	}

	$wp_customize->add_section(
		'agencia247_section_work',
		array(
			'title'    => __('Nuestro Trabajo', 'agencia247'),
			'panel'    => 'agencia247_panel',
			'priority' => 25,
		)
	);

	$wp_customize->add_setting(
		'work_label',
		array(
			'default'           => $defaults['work_label'],
			'sanitize_callback' => 'sanitize_text_field',
		)
	);
	$wp_customize->add_control(
		'work_label',
		array(
			'label'   => __('Section Label', 'agencia247'),
			'section' => 'agencia247_section_work',
			'type'    => 'text',
		)
	);

	$wp_customize->add_setting(
		'work_count',
		array(
			'default'           => $defaults['work_count'],
			'sanitize_callback' => 'agencia247_sanitize_int',
		)
	);
	$wp_customize->add_control(
		'work_count',
		array(
			'label'       => __('How many trabajos to show', 'agencia247'),
			'section'     => 'agencia247_section_work',
			'type'        => 'number',
			'input_attrs' => array(
				'min' => 1,
				'max' => 30,
			),
		)
	);

	$wp_customize->add_section(
		'agencia247_section_about',
		array(
			'title'    => __('Quienes Somos', 'agencia247'),
			'panel'    => 'agencia247_panel',
			'priority' => 30,
		)
	);

	$about_text_fields = array(
		'about_label'       => __('Section Label', 'agencia247'),
		'about_title'       => __('Section Title', 'agencia247'),
		'about_text_1'      => __('Paragraph 1', 'agencia247'),
		'about_text_2'      => __('Paragraph 2', 'agencia247'),
		'about_button_text' => __('Button Text', 'agencia247'),
		'about_button_url'  => __('Button URL', 'agencia247'),
	);

	foreach ($about_text_fields as $key => $label) {
		$sanitize = ($key === 'about_button_url') ? 'esc_url_raw' : 'sanitize_textarea_field';
		$type     = ($key === 'about_button_url') ? 'url' : 'textarea';
		if (in_array($key, array('about_label', 'about_title', 'about_button_text'), true)) {
			$sanitize = 'sanitize_text_field';
			$type     = 'text';
		}
		if ($key === 'about_button_url') {
			$sanitize = 'sanitize_text_field';
			$type     = 'text';
		}

		$wp_customize->add_setting(
			$key,
			array(
				'default'           => $defaults[ $key ],
				'sanitize_callback' => $sanitize,
			)
		);
		$wp_customize->add_control(
			$key,
			array(
				'label'   => $label,
				'section' => 'agencia247_section_about',
				'type'    => $type,
			)
		);
	}

	for ($i = 1; $i <= 3; $i++) {
		$key = 'about_image_' . $i;
		$wp_customize->add_setting(
			$key,
			array(
				'default'           => $defaults[ $key ],
				'sanitize_callback' => 'esc_url_raw',
			)
		);
		$wp_customize->add_control(
			new WP_Customize_Image_Control(
				$wp_customize,
				$key,
				array(
					'label'   => sprintf(__('About Image %d', 'agencia247'), $i),
					'section' => 'agencia247_section_about',
				)
			)
		);
	}

	$wp_customize->add_section(
		'agencia247_section_services',
		array(
			'title'    => __('Servicios', 'agencia247'),
			'panel'    => 'agencia247_panel',
			'priority' => 35,
		)
	);

	$services_text_fields = array(
		'services_label' => __('Section Label', 'agencia247'),
		'services_title' => __('Section Title', 'agencia247'),
		'services_intro' => __('Section Description', 'agencia247'),
	);

	foreach ($services_text_fields as $key => $label) {
		$sanitize = ($key === 'services_intro') ? 'sanitize_textarea_field' : 'sanitize_text_field';
		$type     = ($key === 'services_intro') ? 'textarea' : 'text';

		$wp_customize->add_setting(
			$key,
			array(
				'default'           => $defaults[ $key ],
				'sanitize_callback' => $sanitize,
			)
		);
		$wp_customize->add_control(
			$key,
			array(
				'label'   => $label,
				'section' => 'agencia247_section_services',
				'type'    => $type,
			)
		);
	}

	$wp_customize->add_setting(
		'services_count',
		array(
			'default'           => $defaults['services_count'],
			'sanitize_callback' => 'agencia247_sanitize_int',
		)
	);
	$wp_customize->add_control(
		'services_count',
		array(
			'label'       => __('How many servicios to show', 'agencia247'),
			'section'     => 'agencia247_section_services',
			'type'        => 'number',
			'input_attrs' => array(
				'min' => 1,
				'max' => 20,
			),
		)
	);

	$wp_customize->add_section(
		'agencia247_section_projects',
		array(
			'title'    => __('Proyectos', 'agencia247'),
			'panel'    => 'agencia247_panel',
			'priority' => 40,
		)
	);

	$wp_customize->add_setting(
		'projects_label',
		array(
			'default'           => $defaults['projects_label'],
			'sanitize_callback' => 'sanitize_text_field',
		)
	);
	$wp_customize->add_control(
		'projects_label',
		array(
			'label'   => __('Section Label', 'agencia247'),
			'section' => 'agencia247_section_projects',
			'type'    => 'text',
		)
	);

	$wp_customize->add_setting(
		'projects_title',
		array(
			'default'           => $defaults['projects_title'],
			'sanitize_callback' => 'sanitize_text_field',
		)
	);
	$wp_customize->add_control(
		'projects_title',
		array(
			'label'   => __('Section Title', 'agencia247'),
			'section' => 'agencia247_section_projects',
			'type'    => 'text',
		)
	);

	$wp_customize->add_setting(
		'projects_count',
		array(
			'default'           => $defaults['projects_count'],
			'sanitize_callback' => 'agencia247_sanitize_int',
		)
	);
	$wp_customize->add_control(
		'projects_count',
		array(
			'label'       => __('How many proyectos to show', 'agencia247'),
			'section'     => 'agencia247_section_projects',
			'type'        => 'number',
			'input_attrs' => array(
				'min' => 1,
				'max' => 20,
			),
		)
	);

	$wp_customize->add_section(
		'agencia247_section_contact',
		array(
			'title'    => __('Contacto', 'agencia247'),
			'panel'    => 'agencia247_panel',
			'priority' => 45,
		)
	);

	$contact_text_fields = array(
		'contact_label' => __('Section Label', 'agencia247'),
		'contact_name'  => __('Name / Title (use line breaks)', 'agencia247'),
		'contact_sub'   => __('Subtitle', 'agencia247'),
		'contact_text'  => __('Description', 'agencia247'),
	);

	foreach ($contact_text_fields as $key => $label) {
		$sanitize = in_array($key, array('contact_label', 'contact_sub'), true) ? 'sanitize_text_field' : 'sanitize_textarea_field';
		$type     = in_array($key, array('contact_label', 'contact_sub'), true) ? 'text' : 'textarea';

		$wp_customize->add_setting(
			$key,
			array(
				'default'           => $defaults[ $key ],
				'sanitize_callback' => $sanitize,
			)
		);
		$wp_customize->add_control(
			$key,
			array(
				'label'   => $label,
				'section' => 'agencia247_section_contact',
				'type'    => $type,
			)
		);
	}

	$social_fields = array(
		'twitter'   => __('Twitter', 'agencia247'),
		'facebook'  => __('Facebook', 'agencia247'),
		'instagram' => __('Instagram', 'agencia247'),
		'whatsapp'  => __('WhatsApp', 'agencia247'),
	);

	foreach ($social_fields as $slug => $label) {
		$label_key = 'contact_' . $slug . '_label';
		$url_key   = 'contact_' . $slug . '_url';

		$wp_customize->add_setting(
			$label_key,
			array(
				'default'           => $defaults[ $label_key ],
				'sanitize_callback' => 'sanitize_text_field',
			)
		);
		$wp_customize->add_control(
			$label_key,
			array(
				'label'   => sprintf(__('%s Label', 'agencia247'), $label),
				'section' => 'agencia247_section_contact',
				'type'    => 'text',
			)
		);

		$wp_customize->add_setting(
			$url_key,
			array(
				'default'           => $defaults[ $url_key ],
				'sanitize_callback' => 'esc_url_raw',
			)
		);
		$wp_customize->add_control(
			$url_key,
			array(
				'label'   => sprintf(__('%s URL', 'agencia247'), $label),
				'section' => 'agencia247_section_contact',
				'type'    => 'url',
			)
		);
	}

	$wp_customize->add_section(
		'agencia247_section_footer',
		array(
			'title'    => __('Footer', 'agencia247'),
			'panel'    => 'agencia247_panel',
			'priority' => 50,
		)
	);

	$wp_customize->add_setting(
		'footer_text',
		array(
			'default'           => $defaults['footer_text'],
			'sanitize_callback' => 'sanitize_text_field',
		)
	);
	$wp_customize->add_control(
		'footer_text',
		array(
			'label'       => __('Footer Main Text', 'agencia247'),
			'section'     => 'agencia247_section_footer',
			'type'        => 'text',
			'description' => __('Current year is added automatically at the beginning.', 'agencia247'),
		)
	);

	$wp_customize->add_setting(
		'footer_accent',
		array(
			'default'           => $defaults['footer_accent'],
			'sanitize_callback' => 'sanitize_text_field',
		)
	);
	$wp_customize->add_control(
		'footer_accent',
		array(
			'label'   => __('Footer Accent Text', 'agencia247'),
			'section' => 'agencia247_section_footer',
			'type'    => 'text',
		)
	);
}
add_action('customize_register', 'agencia247_customize_register');

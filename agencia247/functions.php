<?php
// Theme functions for Agencia 24·7
function agencia247_enqueue_scripts() {
  wp_enqueue_style('agencia247-style', get_stylesheet_uri());
  wp_enqueue_script('agencia247-main', get_template_directory_uri() . '/assets/js/main.js', array(), null, true);
}
add_action('wp_enqueue_scripts', 'agencia247_enqueue_scripts');

// Soporte para imágenes destacadas y título
add_theme_support('post-thumbnails');
add_theme_support('title-tag');

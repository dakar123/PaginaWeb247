<?php
/**
 * Main theme bootstrap.
 */

if (!defined('ABSPATH')) {
	exit;
}

$agencia247_includes = array(
	'/inc/helpers.php',
	'/inc/setup.php',
	'/inc/customizer.php',
	'/inc/content-types.php',
);

foreach ($agencia247_includes as $agencia247_file) {
	$agencia247_path = get_template_directory() . $agencia247_file;
	if (file_exists($agencia247_path)) {
		require_once $agencia247_path;
	}
}

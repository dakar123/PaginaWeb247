<?php
// Main index file for Agencia 24·7 WordPress theme
get_header();
if (is_front_page()) {
	get_template_part('content/content-page');
}
get_footer();
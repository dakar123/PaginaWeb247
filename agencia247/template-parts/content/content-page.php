<?php
/**
 * Home page sections.
 */

$sections = array('hero', 'ticker', 'about', 'services', 'projects', 'contact');
?>
<main id="site-content">
	<?php foreach ($sections as $section) : ?>
		<?php if (agencia247_is_section_enabled($section)) : ?>
			<?php get_template_part('template-parts/sections/' . $section); ?>
		<?php endif; ?>
	<?php endforeach; ?>
</main>

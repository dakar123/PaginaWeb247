<?php
/**
 * Single template for servicio.
 */

get_header();
?>
<main class="content-fallback agencia-page" id="primary">
	<?php while (have_posts()) : the_post(); ?>
		<article id="post-<?php the_ID(); ?>" <?php post_class('agencia-page-article'); ?>>
			<header class="agencia-page-header">
				<p class="section-label"><?php esc_html_e('Servicio', 'agencia247'); ?></p>
				<h1 class="entry-title"><?php the_title(); ?></h1>
				<div class="divider"></div>
				<?php if (has_post_thumbnail()) : ?>
					<div class="agencia-page-cover"><?php the_post_thumbnail('large'); ?></div>
				<?php endif; ?>
			</header>
			<div class="entry-content"><?php the_content(); ?></div>
		</article>
	<?php endwhile; ?>
</main>
<?php
get_footer();

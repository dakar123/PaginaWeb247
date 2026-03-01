<?php
/**
 * Template Name: Agencia247 Flexible Page
 * Template Post Type: page
 */

get_header();
?>
<main class="content-fallback agencia-page agencia-page--flex" id="primary">
	<?php while (have_posts()) : the_post(); ?>
		<article id="post-<?php the_ID(); ?>" <?php post_class('agencia-page-article'); ?>>
			<header class="agencia-page-header agencia-page-header--center">
				<p class="section-label"><?php esc_html_e('Pagina personalizada', 'agencia247'); ?></p>
				<h1 class="entry-title"><?php the_title(); ?></h1>
				<div class="divider"></div>
				<?php if (has_excerpt()) : ?>
					<p class="hero-sub"><?php echo esc_html(get_the_excerpt()); ?></p>
				<?php endif; ?>
			</header>

			<div class="entry-content agencia-flex-content">
				<?php the_content(); ?>
				<?php wp_link_pages(); ?>
			</div>
		</article>
	<?php endwhile; ?>
</main>
<?php
get_footer();

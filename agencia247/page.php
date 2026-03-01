<?php
/**
 * Default page template.
 */

get_header();
?>
<main class="content-fallback agencia-page" id="primary">
	<?php while (have_posts()) : the_post(); ?>
		<?php $post_type_obj = get_post_type_object(get_post_type()); ?>
		<article id="post-<?php the_ID(); ?>" <?php post_class('agencia-page-article'); ?>>
			<header class="agencia-page-header">
				<p class="section-label"><?php echo esc_html($post_type_obj ? $post_type_obj->labels->singular_name : __('Pagina', 'agencia247')); ?></p>
				<h1 class="entry-title"><?php the_title(); ?></h1>
				<div class="divider"></div>
				<?php if (has_post_thumbnail()) : ?>
					<div class="agencia-page-cover"><?php the_post_thumbnail('large'); ?></div>
				<?php endif; ?>
			</header>

			<div class="entry-content">
				<?php the_content(); ?>
				<?php wp_link_pages(); ?>
			</div>
		</article>
	<?php endwhile; ?>
</main>
<?php
get_footer();

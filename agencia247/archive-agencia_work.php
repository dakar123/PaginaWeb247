<?php
/**
 * Archive template for trabajos.
 */

get_header();
?>
<main class="content-fallback agencia-archive" id="primary">
	<header class="agencia-page-header">
		<p class="section-label"><?php esc_html_e('Portafolio', 'agencia247'); ?></p>
		<h1 class="entry-title"><?php post_type_archive_title(); ?></h1>
		<div class="divider"></div>
	</header>

	<div class="projects-grid projects-grid--archive">
		<?php if (have_posts()) : ?>
			<?php $index = 0; ?>
			<?php while (have_posts()) : the_post(); ?>
				<?php
				$image_url = get_the_post_thumbnail_url(get_the_ID(), 'large') ?: agencia247_theme_image_url('imagen1.png');
				$class = ($index === 0) ? 'project-item project-item--featured' : 'project-item';
				?>
				<a class="<?php echo esc_attr($class); ?>" href="<?php the_permalink(); ?>">
					<img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr(get_the_title()); ?>">
				</a>
				<?php $index++; ?>
			<?php endwhile; ?>
		<?php else : ?>
			<p><?php esc_html_e('Aun no hay trabajos publicados.', 'agencia247'); ?></p>
		<?php endif; ?>
	</div>

	<?php the_posts_pagination(); ?>
</main>
<?php
get_footer();

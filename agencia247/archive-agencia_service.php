<?php
/**
 * Archive template for servicios.
 */

get_header();
?>
<main class="content-fallback agencia-archive" id="primary">
	<header class="agencia-page-header">
		<p class="section-label"><?php esc_html_e('Catalogo', 'agencia247'); ?></p>
		<h1 class="entry-title"><?php post_type_archive_title(); ?></h1>
		<div class="divider"></div>
	</header>

	<div class="services-grid">
		<?php if (have_posts()) : ?>
			<?php $service_index = 1; ?>
			<?php while (have_posts()) : the_post(); ?>
				<?php
				$post_id      = get_the_ID();
				$image_url    = get_the_post_thumbnail_url($post_id, 'large') ?: agencia247_theme_image_url('imagen1.png');
				$service_tags = agencia247_get_service_tags($post_id);
				?>
				<article class="service-card">
					<div class="service-bg" style="background-image:url('<?php echo esc_url($image_url); ?>');"></div>
					<div class="service-overlay"></div>
					<div class="service-content">
						<div class="service-num"><?php echo esc_html(str_pad((string) $service_index, 2, '0', STR_PAD_LEFT)); ?></div>
						<h3><?php the_title(); ?></h3>
						<p class="service-desc"><?php echo esc_html(wp_trim_words(get_the_excerpt(), 22)); ?></p>
						<?php if (!empty($service_tags)) : ?>
							<div class="service-tags">
								<?php foreach (array_slice($service_tags, 0, 3) as $tag) : ?>
									<span class="stag"><?php echo esc_html($tag); ?></span>
								<?php endforeach; ?>
							</div>
						<?php endif; ?>
					</div>
					<a class="service-card-link" href="<?php the_permalink(); ?>" aria-label="<?php echo esc_attr(get_the_title()); ?>"></a>
				</article>
				<?php $service_index++; ?>
			<?php endwhile; ?>
		<?php else : ?>
			<p><?php esc_html_e('Aun no hay servicios publicados.', 'agencia247'); ?></p>
		<?php endif; ?>
	</div>

	<?php the_posts_pagination(); ?>
</main>
<?php
get_footer();

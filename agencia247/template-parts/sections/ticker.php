<?php
/**
 * Ticker section (Trabajos).
 */

$label = trim((string) agencia247_get_option('work_label'));
$count = max(1, (int) agencia247_get_option('work_count'));

$works_query = new WP_Query(
	array(
		'post_type'      => 'agencia_work',
		'post_status'    => 'publish',
		'posts_per_page' => $count,
		'orderby'        => array('menu_order' => 'ASC', 'date' => 'DESC'),
	)
);
?>
<div class="ticker-section" id="trabajos">
	<?php if ($label !== '') : ?>
		<p class="ticker-label"><?php echo esc_html($label); ?></p>
	<?php endif; ?>

	<div class="ticker-wrapper">
		<div class="ticker-track">
			<?php if ($works_query->have_posts()) : ?>
				<?php while ($works_query->have_posts()) : $works_query->the_post(); ?>
					<?php
					$post_id = get_the_ID();
					$url     = agencia247_get_work_url($post_id);
					$img_url = get_the_post_thumbnail_url($post_id, 'large');
					if (!$img_url) {
						$img_url = agencia247_theme_image_url('image.png');
					}
					?>
					<a class="ticker-item" href="<?php echo esc_url($url); ?>">
						<img src="<?php echo esc_url($img_url); ?>" alt="<?php echo esc_attr(get_the_title()); ?>">
					</a>
				<?php endwhile; ?>
				<?php wp_reset_postdata(); ?>
			<?php else : ?>
				<?php $fallback_images = array('imagen1.png', 'imagen2.png', 'imagen3.png', 'imagen4.png'); ?>
				<?php foreach ($fallback_images as $fallback_image) : ?>
					<div class="ticker-item">
						<img src="<?php echo esc_url(agencia247_theme_image_url($fallback_image)); ?>" alt="Proyecto">
					</div>
				<?php endforeach; ?>
			<?php endif; ?>
		</div>
	</div>
</div>

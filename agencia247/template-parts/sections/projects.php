<?php
/**
 * Projects section.
 */

$projects_label = trim((string) agencia247_get_option('projects_label'));
$projects_title = trim((string) agencia247_get_option('projects_title'));
$projects_count = max(1, (int) agencia247_get_option('projects_count'));

$projects_query = new WP_Query(
	array(
		'post_type'      => 'agencia_work',
		'post_status'    => 'publish',
		'posts_per_page' => $projects_count,
		'orderby'        => array('menu_order' => 'ASC', 'date' => 'DESC'),
	)
);
?>
<section id="proyectos">
	<div class="proyectos-header">
		<?php if ($projects_label !== '') : ?>
			<p class="section-label"><?php echo esc_html($projects_label); ?></p>
		<?php endif; ?>
		<?php if ($projects_title !== '') : ?>
			<h2 class="section-title"><?php echo esc_html($projects_title); ?></h2>
		<?php endif; ?>
		<div class="divider"></div>
	</div>

	<div class="projects-grid">
		<?php if ($projects_query->have_posts()) : ?>
			<?php $index = 0; ?>
			<?php while ($projects_query->have_posts()) : $projects_query->the_post(); ?>
				<?php
				$post_id   = get_the_ID();
				$image_url = get_the_post_thumbnail_url($post_id, 'large');
				if (!$image_url) {
					$image_url = agencia247_theme_image_url('imagen1.png');
				}
				$url = agencia247_get_work_url($post_id);
				$item_class = 'project-item';
				if ($index === 0) {
					$item_class .= ' project-item--featured';
				}
				?>
				<a class="<?php echo esc_attr($item_class); ?>" href="<?php echo esc_url($url); ?>">
					<img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr(get_the_title()); ?>">
				</a>
				<?php $index++; ?>
			<?php endwhile; ?>
			<?php wp_reset_postdata(); ?>
		<?php else : ?>
			<?php $fallback_images = array('imagen1.png', 'imagen2.png', 'imagen3.png', 'imagen4.png'); ?>
			<?php foreach ($fallback_images as $index => $fallback_image) : ?>
				<?php $item_class = ($index === 0) ? 'project-item project-item--featured' : 'project-item'; ?>
				<div class="<?php echo esc_attr($item_class); ?>">
					<img src="<?php echo esc_url(agencia247_theme_image_url($fallback_image)); ?>" alt="Proyecto">
				</div>
			<?php endforeach; ?>
		<?php endif; ?>
	</div>
</section>

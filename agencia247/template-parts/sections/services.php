<?php
/**
 * Services section.
 */

$services_label = trim((string) agencia247_get_option('services_label'));
$services_title = trim((string) agencia247_get_option('services_title'));
$services_intro = trim((string) agencia247_get_option('services_intro'));
$services_count = max(1, (int) agencia247_get_option('services_count'));

$services_query = new WP_Query(
	array(
		'post_type'      => 'agencia_service',
		'post_status'    => 'publish',
		'posts_per_page' => $services_count,
		'orderby'        => array('menu_order' => 'ASC', 'date' => 'DESC'),
	)
);

$fallback_cards = array(
	array(
		'title' => 'Campanas Digitales',
		'desc'  => 'Facebook Ads, TikTok Ads, Instagram y YouTube con segmentacion avanzada y reportes de resultados.',
		'tags'  => array('Facebook Ads', 'TikTok Ads'),
		'img'   => agencia247_theme_image_url('imagen3.png'),
	),
	array(
		'title' => 'Diseno Grafico Corporativo',
		'desc'  => 'Logotipos, flyers, brochures e identidad visual que diferencia tu marca en el mercado.',
		'tags'  => array('Logotipo', 'Brochure'),
		'img'   => agencia247_theme_image_url('imagen1.png'),
	),
	array(
		'title' => 'Produccion Audiovisual',
		'desc'  => 'Fotografia profesional, videos corporativos, edicion y postproduccion de alto impacto.',
		'tags'  => array('Video', 'Fotografia'),
		'img'   => agencia247_theme_image_url('imagen2.png'),
	),
);
?>
<section id="servicios">
	<div class="services-intro">
		<?php if ($services_label !== '') : ?>
			<p class="section-label"><?php echo esc_html($services_label); ?></p>
		<?php endif; ?>
		<?php if ($services_title !== '') : ?>
			<h2 class="section-title"><?php echo esc_html($services_title); ?></h2>
		<?php endif; ?>
		<div class="divider"></div>
		<?php if ($services_intro !== '') : ?>
			<p><?php echo esc_html($services_intro); ?></p>
		<?php endif; ?>
	</div>

	<div class="services-grid">
		<?php if ($services_query->have_posts()) : ?>
			<?php $service_index = 1; ?>
			<?php while ($services_query->have_posts()) : $services_query->the_post(); ?>
				<?php
				$post_id      = get_the_ID();
				$service_url  = agencia247_get_service_url($post_id);
				$service_tags = agencia247_get_service_tags($post_id);
				$service_desc = get_the_excerpt();
				$service_wa   = agencia247_get_whatsapp_url_for_post($post_id);
				if ($service_desc === '') {
					$service_desc = wp_trim_words(wp_strip_all_tags(get_the_content()), 24);
				}
				$image_url = get_the_post_thumbnail_url($post_id, 'large');
				if (!$image_url) {
					$image_url = agencia247_theme_image_url('imagen1.png');
				}
				?>
				<article class="service-card">
					<div class="service-bg" style="background-image:url('<?php echo esc_url($image_url); ?>');"></div>
					<div class="service-overlay"></div>
					<div class="service-content">
						<div class="service-num"><?php echo esc_html(str_pad((string) $service_index, 2, '0', STR_PAD_LEFT)); ?></div>
						<h3><?php the_title(); ?></h3>
						<p class="service-desc"><?php echo esc_html($service_desc); ?></p>
						<?php if (!empty($service_tags)) : ?>
							<div class="service-tags">
								<?php foreach (array_slice($service_tags, 0, 3) as $tag) : ?>
									<span class="stag"><?php echo esc_html($tag); ?></span>
								<?php endforeach; ?>
							</div>
						<?php endif; ?>
						<div class="service-actions">
							<a class="service-cta-btn" href="<?php echo esc_url($service_url); ?>"><?php esc_html_e('Ver detalle', 'agencia247'); ?></a>
							<?php if ($service_wa !== '') : ?>
								<a class="service-cta-btn service-cta-btn--wa" href="<?php echo esc_url($service_wa); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e('Solicitar servicio', 'agencia247'); ?></a>
							<?php endif; ?>
						</div>
					</div>
					<a class="service-card-link" href="<?php echo esc_url($service_url); ?>" aria-label="<?php echo esc_attr(get_the_title()); ?>"></a>
				</article>
				<?php $service_index++; ?>
			<?php endwhile; ?>
			<?php wp_reset_postdata(); ?>
		<?php else : ?>
			<?php foreach ($fallback_cards as $index => $card) : ?>
				<article class="service-card">
					<div class="service-bg" style="background-image:url('<?php echo esc_url($card['img']); ?>');"></div>
					<div class="service-overlay"></div>
					<div class="service-content">
						<div class="service-num"><?php echo esc_html(str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT)); ?></div>
						<h3><?php echo esc_html($card['title']); ?></h3>
						<p class="service-desc"><?php echo esc_html($card['desc']); ?></p>
						<div class="service-tags">
							<?php foreach ($card['tags'] as $tag) : ?>
								<span class="stag"><?php echo esc_html($tag); ?></span>
							<?php endforeach; ?>
						</div>
						<?php $fallback_wa = agencia247_get_whatsapp_url(agencia247_build_whatsapp_message('servicios', $card['title'])); ?>
						<?php if ($fallback_wa !== '') : ?>
							<div class="service-actions">
								<a class="service-cta-btn service-cta-btn--wa" href="<?php echo esc_url($fallback_wa); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e('Solicitar servicio', 'agencia247'); ?></a>
							</div>
						<?php endif; ?>
					</div>
				</article>
			<?php endforeach; ?>
		<?php endif; ?>
	</div>
</section>

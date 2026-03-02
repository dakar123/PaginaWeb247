<?php
/**
 * Hero section.
 */

$hero_bg_url   = agencia247_get_image_setting_url('hero_bg_image', 'imagen1.png');
$hero_main_url = agencia247_get_image_setting_url('hero_main_image', 'fondo.jpg');

$hero_tag                = trim((string) agencia247_get_option('hero_tag'));
$hero_title              = trim((string) agencia247_get_option('hero_title'));
$hero_sub                = trim((string) agencia247_get_option('hero_sub'));
$hero_btn_primary_text   = trim((string) agencia247_get_option('hero_btn_primary_text'));
$hero_btn_primary_url    = agencia247_resolve_link((string) agencia247_get_option('hero_btn_primary_url'));
$hero_btn_secondary_text = trim((string) agencia247_get_option('hero_btn_secondary_text'));
$hero_btn_secondary_url  = agencia247_resolve_link((string) agencia247_get_option('hero_btn_secondary_url'));
$hero_badge_text         = trim((string) agencia247_get_option('hero_badge_text'));
$hero_badge_sub          = trim((string) agencia247_get_option('hero_badge_sub'));
$hero_wa_url             = agencia247_get_whatsapp_url_for_post(0, 'inicio');

$dynamic_words = array('Campanas digitales', 'Diseno grafico', 'Produccion audiovisual');
$dynamic_query = get_posts(
	array(
		'post_type'      => 'agencia_service',
		'post_status'    => 'publish',
		'posts_per_page' => 4,
		'orderby'        => array('menu_order' => 'ASC', 'date' => 'DESC'),
		'fields'         => 'ids',
	)
);

if (!empty($dynamic_query)) {
	$dynamic_words = array();
	foreach ($dynamic_query as $service_id) {
		$dynamic_words[] = get_the_title($service_id);
	}
}
?>
<section id="hero">
	<div class="hero-bg-img" style="background-image:url('<?php echo esc_url($hero_bg_url); ?>');"></div>
	<div class="hero-bg-overlay"></div>
	<div class="hero-content">
		<?php if ($hero_tag !== '') : ?>
			<div class="hero-tag"><span></span> <?php echo esc_html($hero_tag); ?></div>
		<?php endif; ?>

		<?php if ($hero_title !== '') : ?>
			<h1><?php echo wp_kses_post(nl2br(esc_html($hero_title))); ?></h1>
		<?php endif; ?>

		<?php if ($hero_sub !== '') : ?>
			<p class="hero-sub"><?php echo esc_html($hero_sub); ?></p>
		<?php endif; ?>
		<div class="hero-dynamic-wrap" aria-live="polite">
			<span class="hero-dynamic-label"><?php esc_html_e('Especialistas en', 'agencia247'); ?></span>
			<span class="hero-dynamic js-dynamic-text" data-words="<?php echo esc_attr(implode('|', array_map('sanitize_text_field', $dynamic_words))); ?>">
				<?php echo esc_html($dynamic_words[0]); ?>
			</span>
		</div>

		<div class="hero-actions">
			<?php if ($hero_btn_primary_text !== '') : ?>
				<a href="<?php echo esc_url($hero_btn_primary_url); ?>" class="btn-primary"><?php echo esc_html($hero_btn_primary_text); ?></a>
			<?php endif; ?>
			<?php if ($hero_btn_secondary_text !== '') : ?>
				<a href="<?php echo esc_url($hero_btn_secondary_url); ?>" class="btn-ghost"><?php echo esc_html($hero_btn_secondary_text); ?></a>
			<?php endif; ?>
			<?php if ($hero_wa_url !== '') : ?>
				<a href="<?php echo esc_url($hero_wa_url); ?>" class="btn-primary btn-primary--wa" target="_blank" rel="noopener noreferrer"><?php esc_html_e('Solicitar servicio', 'agencia247'); ?></a>
			<?php endif; ?>
		</div>
	</div>

	<div class="hero-visual">
		<div class="hero-main-img">
			<img src="<?php echo esc_url($hero_main_url); ?>" alt="<?php echo esc_attr(get_bloginfo('name')); ?>">
		</div>
		<div class="hero-badge">
			<div class="hero-badge-dot"></div>
			<div>
				<?php if ($hero_badge_text !== '') : ?>
					<div class="hero-badge-text"><?php echo esc_html($hero_badge_text); ?></div>
				<?php endif; ?>
				<?php if ($hero_badge_sub !== '') : ?>
					<div class="hero-badge-sub"><?php echo esc_html($hero_badge_sub); ?></div>
				<?php endif; ?>
			</div>
		</div>
	</div>
</section>

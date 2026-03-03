<?php
/**
 * Contact section.
 */

$contact_label = trim((string) agencia247_get_option('contact_label'));
$contact_name  = trim((string) agencia247_get_option('contact_name'));
$contact_sub   = trim((string) agencia247_get_option('contact_sub'));
$contact_text  = trim((string) agencia247_get_option('contact_text'));
$contact_wa    = agencia247_get_whatsapp_url(agencia247_build_whatsapp_message('contacto', $contact_name));
$map_logo_url  = agencia247_get_site_logo_url();
$map_lat       = function_exists('agencia247_sanitize_latitude') ? agencia247_sanitize_latitude(agencia247_get_option('contact_map_lat')) : '-15.840691174561973';
$map_lon       = function_exists('agencia247_sanitize_longitude') ? agencia247_sanitize_longitude(agencia247_get_option('contact_map_lon')) : '-70.02602661165675';
$map_zoom      = function_exists('agencia247_sanitize_map_zoom') ? agencia247_sanitize_map_zoom(agencia247_get_option('contact_map_zoom')) : '13.4';
$map_title     = trim((string) agencia247_get_option('contact_map_title'));
$map_note      = trim((string) agencia247_get_option('contact_map_note'));
$map_radar     = (bool) agencia247_get_option('contact_map_radar');

if ($map_title === '') {
	$map_title = __('Ubicacion de referencia', 'agencia247');
}
if ($map_note === '') {
	$map_note = __('Explora el mapa y acercate para ver mejor la zona.', 'agencia247');
}

$social_items = array(
	array(
		'key'   => 'twitter',
		'label' => trim((string) agencia247_get_option('contact_twitter_label')),
		'url'   => trim((string) agencia247_get_option('contact_twitter_url')),
		'icon'  => '<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>',
	),
	array(
		'key'   => 'facebook',
		'label' => trim((string) agencia247_get_option('contact_facebook_label')),
		'url'   => trim((string) agencia247_get_option('contact_facebook_url')),
		'icon'  => '<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
	),
	array(
		'key'   => 'instagram',
		'label' => trim((string) agencia247_get_option('contact_instagram_label')),
		'url'   => trim((string) agencia247_get_option('contact_instagram_url')),
		'icon'  => '<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>',
	),
	array(
		'key'   => 'whatsapp',
		'label' => trim((string) agencia247_get_option('contact_whatsapp_label')),
		'url'   => trim((string) agencia247_get_option('contact_whatsapp_url')),
		'icon'  => '<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>',
	),
);
?>
<section id="contacto">
	<?php if ($contact_label !== '') : ?>
		<p class="section-label"><?php echo esc_html($contact_label); ?></p>
	<?php endif; ?>

	<div class="contact-layout">
		<div class="contact-copy">
			<?php if ($contact_name !== '') : ?>
				<h2 class="contact-name"><?php echo wp_kses_post(nl2br(esc_html($contact_name))); ?></h2>
			<?php endif; ?>
			<?php if ($contact_sub !== '') : ?>
				<p class="contact-sub"><?php echo esc_html($contact_sub); ?></p>
			<?php endif; ?>
			<?php if ($contact_text !== '') : ?>
				<p class="contact-text"><?php echo esc_html($contact_text); ?></p>
			<?php endif; ?>
			<?php if ($contact_wa !== '') : ?>
				<a class="btn-primary btn-primary--wa contact-wa-btn" href="<?php echo esc_url($contact_wa); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e('Solicitar servicio por WhatsApp', 'agencia247'); ?></a>
			<?php endif; ?>

			<div class="socials">
				<?php foreach ($social_items as $social) : ?>
					<?php
					$label = trim((string) $social['label']);
					$url   = trim((string) $social['url']);
					$key   = isset($social['key']) ? (string) $social['key'] : '';
					if ($key === 'whatsapp' && $url === '' && $contact_wa !== '') {
						$url = $contact_wa;
					}
					if ($label === '' || $url === '') {
						continue;
					}
					?>
					<a href="<?php echo esc_url($url); ?>" class="social-btn" aria-label="<?php echo esc_attr($label); ?>" target="_blank" rel="noopener noreferrer">
						<?php echo $social['icon']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<?php echo esc_html($label); ?>
					</a>
				<?php endforeach; ?>
			</div>
		</div>

		<aside class="contact-map-wrap">
			<div class="contact-map-card">
				<p class="contact-map-label"><?php echo esc_html($map_title); ?></p>
				<div
					id="agencia247-contact-map"
					class="contact-map"
					data-lat="<?php echo esc_attr($map_lat); ?>"
					data-lon="<?php echo esc_attr($map_lon); ?>"
					data-zoom="<?php echo esc_attr($map_zoom); ?>"
					data-radar="<?php echo $map_radar ? '1' : '0'; ?>"
					data-logo-url="<?php echo esc_url($map_logo_url); ?>"
				>
					<?php if ($map_radar) : ?>
						<div class="contact-map-radar" aria-hidden="true">
							<span class="radar-ring radar-ring-1"></span>
							<span class="radar-ring radar-ring-2"></span>
							<span class="radar-ring radar-ring-3"></span>
							<span class="radar-sweep"></span>
						</div>
					<?php endif; ?>
				</div>
				<p class="contact-map-note"><?php echo esc_html($map_note); ?></p>
			</div>
		</aside>
	</div>
</section>

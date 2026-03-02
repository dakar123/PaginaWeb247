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
				<?php $service_wa_url = agencia247_get_whatsapp_url_for_post(get_the_ID()); ?>
				<p class="section-label"><?php esc_html_e('Servicio', 'agencia247'); ?></p>
				<h1 class="entry-title"><?php the_title(); ?></h1>
				<div class="divider"></div>
				<?php if ($service_wa_url !== '') : ?>
					<p><a class="btn-primary btn-primary--wa" href="<?php echo esc_url($service_wa_url); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e('Solicitar servicio por WhatsApp', 'agencia247'); ?></a></p>
				<?php endif; ?>
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

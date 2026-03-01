<?php
/**
 * About section.
 */

$img_1 = agencia247_get_image_setting_url('about_image_1', '01.jpg');
$img_2 = agencia247_get_image_setting_url('about_image_2', 'imagen3.png');
$img_3 = agencia247_get_image_setting_url('about_image_3', 'imagen4.png');

$about_label       = trim((string) agencia247_get_option('about_label'));
$about_title       = trim((string) agencia247_get_option('about_title'));
$about_text_1      = trim((string) agencia247_get_option('about_text_1'));
$about_text_2      = trim((string) agencia247_get_option('about_text_2'));
$about_button_text = trim((string) agencia247_get_option('about_button_text'));
$about_button_url  = agencia247_resolve_link((string) agencia247_get_option('about_button_url'));
?>
<section id="about">
	<div class="about-images">
		<div class="img-card" style="width:56%;height:270px;top:0;left:0;">
			<img src="<?php echo esc_url($img_1); ?>" alt="Proyecto 1">
		</div>
		<div class="img-card" style="width:44%;height:310px;top:30px;right:0;border:3px solid var(--blue);">
			<img src="<?php echo esc_url($img_2); ?>" alt="Proyecto 2">
		</div>
		<div class="img-card" style="width:48%;height:200px;bottom:0;left:8%;">
			<img src="<?php echo esc_url($img_3); ?>" alt="Proyecto 3">
		</div>
	</div>
	<div class="about-text">
		<?php if ($about_label !== '') : ?>
			<p class="section-label"><?php echo esc_html($about_label); ?></p>
		<?php endif; ?>
		<?php if ($about_title !== '') : ?>
			<h2 class="section-title"><?php echo esc_html($about_title); ?></h2>
		<?php endif; ?>
		<div class="divider"></div>
		<?php if ($about_text_1 !== '') : ?>
			<p><?php echo esc_html($about_text_1); ?></p>
		<?php endif; ?>
		<?php if ($about_text_2 !== '') : ?>
			<p><?php echo esc_html($about_text_2); ?></p>
		<?php endif; ?>
		<?php if ($about_button_text !== '') : ?>
			<a href="<?php echo esc_url($about_button_url); ?>" class="btn-primary" style="display:inline-block;margin-top:1.5rem;"><?php echo esc_html($about_button_text); ?></a>
		<?php endif; ?>
	</div>
</section>

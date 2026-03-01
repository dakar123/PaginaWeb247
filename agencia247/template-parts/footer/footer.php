<?php
/**
 * Theme footer markup.
 */

$footer_text   = trim((string) agencia247_get_option('footer_text'));
$footer_accent = trim((string) agencia247_get_option('footer_accent'));
?>
<footer>
	<span>&copy; <?php echo esc_html(date_i18n('Y')); ?> <?php echo esc_html($footer_text); ?></span>
	<span class="accent"><?php echo esc_html($footer_accent); ?></span>
</footer>
<?php wp_footer(); ?>
</body>
</html>

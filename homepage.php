<?php
/*
	Template Name: Strona Główna
*/

get_header();
?>
<div id="primary" class="content-area">
	<main id="main" class="site-main">
        <?php include 'inc/section-about.php'; ?>
        <?php include 'inc/section-albums.php'; ?>
        <?php include 'inc/section-contact.php'; ?>
	</main><!-- #main -->
</div><!-- #primary -->

<?php
get_footer();

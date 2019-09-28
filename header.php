<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Ruskitokot
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<!-- Hello there my Friend. Welcome to my playground. Make yourself comfortable. Have a nice day! =) -->
	<title><?php echo getPageTitle(); ?></title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<meta name="description" content="Pobierz lub odsłuchaj najnowsze utwory Ruskiego. Masz pytanie? Napisz! - Ruski to kot">
	<meta name="keywords" content="ruski, ruski to kot">
	<meta name="theme-color" content="#000000">
	<link rel="shortcut icon" href="<?php echo getTemplateUri()->img; ?>/ruski_logo.png" />
	<!-- GOOGLE FONTS -->
	<link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap&subset=latin-ext" rel="stylesheet">
	<!-- STYLES -->
	<link rel="stylesheet" href="<?php echo getTemplateUri()->dist; ?>/style.bundle.css">
	<!-- FONTAWESOME -->
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
		 crossorigin="anonymous">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site overlay">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Przejdź do głównej treści strony', 'ruski' ); ?></a>

	<!-- site-navigation -->
	<nav id="site-navigation" class="navbar navbar-expand-md navbar-light bg-light">
		<div class="container">
			<a class="navbar-brand" href="<?php echo get_home_url(); ?>" title="<?php bloginfo('title'); ?>">
				<img src="<?php echo getTemplateUri()->img; ?>/ruski_logo.png" alt="Ruskitokot" title="Ruski logotyp">
			</a>
			<button class="navbarToggler" type="button" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<div class="hamburger">
					<span class="line"></span>
					<span class="line"></span>
					<span class="line"></span>
				</div>
			</button>
			<div id="navbarNav" class="navbarNav">
				<?php
					wp_nav_menu( array(
						'theme_location' => 'menu-1',
						'container'		 => false,
						'menu_class' => 'navbar-nav',
						'menu_id'        => 'primary-menu'
					) );
				?>
			</div>
		</div>
	</nav>
	<!-- #site-navigation -->
	<!-- header -->
	<header class="page-header">
		<div class="container">
			<div class="row">
				<div class="col-12">
					<div class="page-header__wrapper">
						<strong id="typed" class="page-header__title"></strong>
						<p class="page-header__subtitle">Chcesz kupić CD? Napisz!</p>
						<a class="btn btn-outline-primary" href="#section-contact" title="Kup płytę">Kontakt</a>
					</div>
				</div>
			</div>
		</div>
	</header>
	<!-- #header -->
	<!-- #Content -->
	<div id="content" class="site-content">

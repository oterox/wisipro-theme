<?php
/**
 * wisipro functions and definitions
 *
 * When using a child theme (see http://codex.wordpress.org/Theme_Development and
 * http://codex.wordpress.org/Child_Themes), you can override certain functions
 * (those wrapped in a function_exists() call) by defining them first in your child theme's
 * functions.php file. The child theme's functions.php file is included before the parent
 * theme's file, so the child theme functions would be used.
 *
 * @package wisipro
 * @since 0.1.0
 */
 
 // Useful global constants
define( 'OX_VERSION', '0.1.0' );
 
 /**
  * Set up theme defaults and register supported WordPress features.
  *
  * @uses load_theme_textdomain() For translation/localization support.
  *
  * @since 0.1.0
  */
 function ox_setup() {
	/**
	 * Makes wisipro available for translation.
	 *
	 * Translations can be added to the /lang directory.
	 * If you're building a theme based on wisipro, use a find and replace
	 * to change 'ox' to the name of your theme in all template files.
	 */
	load_theme_textdomain( 'ox', get_template_directory() . '/languages' );
 }
 add_action( 'after_setup_theme', 'ox_setup' );
 
 /**
  * Enqueue scripts and styles for front-end.
  *
  * @since 0.1.0
  */
 function ox_scripts_styles() {
	$postfix = ( defined( 'SCRIPT_DEBUG' ) && true === SCRIPT_DEBUG ) ? '' : '.min';

	wp_enqueue_script( 'ox', get_template_directory_uri() . "/assets/js/wisipro{$postfix}.js", array(), OX_VERSION, true );
		
	wp_enqueue_style( 'ox', get_template_directory_uri() . "/assets/css/wisipro{$postfix}.css", array(), OX_VERSION );
 }
 add_action( 'wp_enqueue_scripts', 'ox_scripts_styles' );
 
 /**
  * Add humans.txt to the <head> element.
  */
 function ox_header_meta() {
	$humans = '<link type="text/plain" rel="author" href="' . get_template_directory_uri() . '/humans.txt" />';
	
	echo apply_filters( 'ox_humans', $humans );
 }
 add_action( 'wp_head', 'ox_header_meta' );
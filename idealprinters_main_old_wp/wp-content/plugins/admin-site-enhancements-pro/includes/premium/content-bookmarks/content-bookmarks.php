<?php
/**
 * This module is a fork of the Admin Bookmarks plugin v2.0.0 by Brad Vincent <bradvin@gmail.com> | https://wordpress.org/plugins/my-admin-bookmarks/
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'CONTENT_BOOKMARKS_SLUG', 'content-bookmarks' );
define( 'CONTENT_BOOKMARKS_FILE', __FILE__ );
define( 'CONTENT_BOOKMARKS_VERSION', ASENHA_VERSION );

require_once( 'includes/functions.php' );
require_once( 'includes/class-content-bookmarks.php' );

function content_bookmarks_init() {
	if ( is_admin() ) {
		// Always run the main class in admin.
		new Content_Bookmarks_Main();

	    $options = get_option( ASENHA_SLUG_U, array() );
	    $content_bookmarks_disable_dashboard_widget = isset( $options['content_bookmarks_disable_dashboard_widget'] ) ? $options['content_bookmarks_disable_dashboard_widget'] : false;
	    $content_bookmarks_disable_admin_bar_menu = isset( $options['content_bookmarks_disable_admin_bar_menu'] ) ? $options['content_bookmarks_disable_admin_bar_menu'] : false;
	    $content_bookmarks_disable_custom_bookmark_title = isset( $options['content_bookmarks_disable_custom_bookmark_title'] ) ? $options['content_bookmarks_disable_custom_bookmark_title'] : false;

		if ( ! $content_bookmarks_disable_dashboard_widget ) {
			require_once( 'includes/class-content-bookmarks-dashboard-widget.php' );
			new Content_Bookmarks_Dashboard_Widget();
		}

		if ( ! $content_bookmarks_disable_custom_bookmark_title ) {
			require_once( 'includes/class-content-bookmarks-quick-edit.php' );
			new Content_Bookmarks_Quick_Edit();
		}

		// Add a 'Bookmarks' status and the ability to view only bookmarked posts in the post listing page
		require_once( 'includes/class-content-bookmarks-view.php' );
		new Content_Bookmarks_View();
	}

	// Run the admin bar class only if the user is logged in.
	if ( is_user_logged_in() && ! $content_bookmarks_disable_admin_bar_menu ) {
		require_once( 'includes/class-content-bookmarks-admin-bar.php' );
		new Content_Bookmarks_Admin_Bar();
	}
}
add_action( 'plugins_loaded', 'content_bookmarks_init' );


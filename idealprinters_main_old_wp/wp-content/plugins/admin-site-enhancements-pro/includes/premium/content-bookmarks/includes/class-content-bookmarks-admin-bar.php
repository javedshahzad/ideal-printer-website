<?php
/**
 * Admin bar integration for Content Bookmarks.
 */

class Content_Bookmarks_Admin_Bar {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'admin_bar_menu', array( $this, 'add_bookmarks_to_admin_bar' ), 80 );
	}

	/**
	 * Add bookmarked posts to the WordPress admin bar.
	 *
	 * @param WP_Admin_Bar $wp_admin_bar Admin bar instance.
	 *
	 * @return void
	 */
	public function add_bookmarks_to_admin_bar( $wp_admin_bar ) {
		if ( ! is_user_logged_in() || ! $wp_admin_bar instanceof WP_Admin_Bar ) {
			return;
		}

		$groups = content_bookmarks_get_bookmark_groups();

		if ( empty( $groups ) ) {
			return;
		}

		$wp_admin_bar->add_node(
			array(
				'id'    => 'content-bookmarks',
				'title' => esc_html__( 'Bookmarks', 'admin-site-enhancements' ),
				'href'  => false,
				'meta'  => array( 'class' => 'content-bookmarks-adminbar' ),
			)
		);

		foreach ( $groups as $post_type => $group ) {
			if ( empty( $group['posts'] ) ) {
				continue;
			}

			$parent_id = 'content-bookmarks-' . sanitize_key( $post_type );

			$wp_admin_bar->add_node(
				array(
					'id'     => $parent_id,
					'parent' => 'content-bookmarks',
					'title'  => esc_html( $group['label'] ),
					'href'   => admin_url( $group['href'] ),
				)
			);

			foreach ( $group['posts'] as $post ) {
				if ( ! $post instanceof WP_Post ) {
					continue;
				}

				if ( ! current_user_can( 'edit_post', $post->ID ) ) {
					continue;
				}

				$wp_admin_bar->add_node(
					array(
						'id'     => $parent_id . '-' . $post->ID,
						'parent' => $parent_id,
						'title'  => esc_html( content_bookmarks_get_bookmark_title_text( $post ) ),
						'href'   => content_bookmarks_get_edit_post_url( $post ),
					)
				);
			}
		}
	}
}

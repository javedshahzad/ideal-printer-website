<?php
/**
 * Quick edit enhancements for Content Bookmarks.
 */

class Content_Bookmarks_Quick_Edit {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'quick_edit_custom_box', array( $this, 'render_quick_edit_bookmark_field' ), 10, 2 );
		add_action( 'save_post', array( $this, 'save_bookmark_title' ), 10, 2 );
	}

	/**
	 * Output the bookmark title field for supported post types in Quick Edit.
	 *
	 * @param string $column_name Column being rendered.
	 * @param string $post_type   Post type for the current list table.
	 *
	 * @return void
	 */
	public function render_quick_edit_bookmark_field( $column_name, $post_type ) {
		if ( 'bookmark' !== $column_name ) {
			return;
		}

		$supported = content_bookmarks_get_supported_post_types( 'names' );
		if ( empty( $supported ) || ! in_array( $post_type, $supported, true ) ) {
			return;
		}

		static $printed = array();
		if ( isset( $printed[ $post_type ] ) ) {
			return;
		}
		$printed[ $post_type ] = true;

		wp_nonce_field( 'content_bookmarks_quick_edit', 'content_bookmarks_quick_edit_nonce' );
		?>
		<fieldset class="inline-edit-col-right inline-edit-content-bookmarks">
			<div class="inline-edit-col">
				<label class="inline-edit-group">
					<span class="title"><?php esc_html_e( 'Bookmark Title', 'admin-site-enhancements' ); ?></span>
					<span class="input-text-wrap">
						<input type="text" name="content_bookmark_title" value="" />
					</span>
				</label>
			</div>
		</fieldset>
		<?php
	}

	/**
	 * Save the bookmark title provided via Quick Edit.
	 *
	 * @param int     $post_id Post ID being saved.
	 * @param WP_Post $post    Post object.
	 *
	 * @return void
	 */
	public function save_bookmark_title( $post_id, $post ) {
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		if ( wp_is_post_revision( $post_id ) ) {
			return;
		}

		if ( ! isset( $_POST['content_bookmarks_quick_edit_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['content_bookmarks_quick_edit_nonce'] ) ), 'content_bookmarks_quick_edit' ) ) {
			return;
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		$supported = content_bookmarks_get_supported_post_types( 'names' );
		if ( empty( $supported ) || ! in_array( $post->post_type, $supported, true ) ) {
			return;
		}

		if ( ! isset( $_POST['content_bookmark_title'] ) ) {
			return;
		}

		$bookmark_title = sanitize_text_field( wp_unslash( $_POST['content_bookmark_title'] ) );

		if ( '' === $bookmark_title ) {
			delete_post_meta( $post_id, '_bookmark_title' );
		} else {
			update_post_meta( $post_id, '_bookmark_title', $bookmark_title );
		}

		content_bookmarks_reset_bookmark_groups();
	}
}

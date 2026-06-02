<?php

/**
 * Get default WordPress avatar URL by user email
 *
 * @link https://plugins.trac.wordpress.org/browser/simple-user-avatar/tags/4.3/admin/class-sua-admin.php
 * @since  6.2.0
 */
function get_default_avatar_url_by_email__premium_only( $user_email = '', $size = 96 ) {
	// Check the email provided
	if ( empty( $user_email ) || ! filter_var( $user_email, FILTER_VALIDATE_EMAIL ) ) {
		return null;
	}

	// Sanitize email and get md5
	$user_email     = sanitize_email( $user_email );
	$md5_user_email = md5( $user_email );

	// SSL Gravatar URL
	$url = 'https://secure.gravatar.com/avatar/' . $md5_user_email;

	// Add query args
	$url = add_query_arg( 's', $size, $url );
	$url = add_query_arg( 'd', 'mm', $url );
	$url = add_query_arg( 'r', 'g', $url );

	return esc_url( $url );
}

/**
 * Get kses ruleset extended to allow svg
 * 
 * @since 6.9.5
 */
function get_kses_with_svg_ruleset() {
	$kses_defaults = wp_kses_allowed_html( 'post' );

	$svg_args = array(
	    'svg'   => array(
	        'class'				=> true,
	        'aria-hidden'		=> true,
	        'aria-labelledby'	=> true,
	        'role'				=> true,
	        'xmlns'				=> true,
	        'width'				=> true,
	        'height'			=> true,
	        'viewbox'			=> true,
	        'viewBox'			=> true,
	    ),
	    'g'     => array( 
	    	'fill' 				=> true,
	    	'fill-rule' 		=> true,
	        'stroke'			=> true,
	        'stroke-linejoin'	=> true,
	        'stroke-width'		=> true,
	        'stroke-linecap'	=> true,
	    ),
	    'title' => array( 'title' => true ),
	    'path'  => array( 
	        'd'					=> true,
	        'fill'				=> true,
	        'stroke'			=> true,
	        'stroke-linejoin'	=> true,
	        'stroke-width'		=> true,
	        'stroke-linecap'	=> true,
	    ),
	    'rect'	=> array(
	    	'width'				=> true,
	    	'height'			=> true,
	    	'x'					=> true,
	    	'y'					=> true,
	    	'rx'				=> true,
	    	'ry'				=> true,
	    ),
	    'circle' => array(
	    	'cx'				=> true,
	    	'cy'				=> true,
	    	'r'				=> true,
	    ),
	);

	return array_merge( $kses_defaults, $svg_args );
	// Example usage: wp_kses( $the_svg_icon, get_kses_with_svg_ruleset() );	
}

/**
 * Get kses ruleset extended to allow style and script tags
 * 
 * @since 6.9.5
 */
function get_kses_with_style_src_ruleset() {
    $kses_defaults = wp_kses_allowed_html( 'post' );

    $style_script_args = array(
    	'link'		=> array(
    		'rel'			=> true,
    		'href'			=> true,
    		'sizes'			=> true,
    		'crossorigin'	=> true,
    	),
    	'style'		=> true,
    	'script'	=> array(
    		'src'	=> true,
    	),
    );
    
    return array_merge( $kses_defaults, $style_script_args );
	// Example usage: wp_kses( $the_html, get_kses_with_style_src_ruleset() );	
}

/**
 * Get kses ruleset extended to allow style and script tags
 * 
 * @since 6.9.5
 */
function get_kses_with_style_src_svg_ruleset() {
    $kses_defaults = wp_kses_allowed_html( 'post' );

    $style_script_svg_args = array(
    	'input'	=> array(
    		'type'	=> true,
    		'id'	=> true,
    		'class'	=> true,
    		'name'	=> true,
    		'value'	=> true,
    		'style'	=> true,
    	),
    	'style'		=> true,
    	'script'	=> array(
    		'src'	=> true,
    	),
    	'iframe' => array(
    		'title'				=> true,
    		'name'				=> true,
    		'wdith'				=> true,
    		'height'			=> true,
    		'src'				=> true,
    		'srcdoc'			=> true,
    		'align'				=> true, // deprecated
    		'frameborder'		=> true, // deprecated
    		'scrolling'			=> true, // deprecated
    		'allow'				=> true,
    		'referrerpolicy'	=> true,
    		'allowfullscreen'	=> true,
    		'loading'			=> true,
    		'sandbox'			=> true,
    	),
	    'svg'   => array(
	        'class'				=> true,
	        'aria-hidden'		=> true,
	        'aria-labelledby'	=> true,
	        'role'				=> true,
	        'xmlns'				=> true,
	        'width'				=> true,
	        'height'			=> true,
	        'viewbox'			=> true,
	        'viewBox'			=> true,
	    ),
	    'g'     => array( 
	    	'fill' 				=> true,
	    	'fill-rule' 		=> true,
	        'stroke'			=> true,
	        'stroke-linejoin'	=> true,
	        'stroke-width'		=> true,
	        'stroke-linecap'	=> true,
	    ),
	    'title' => array( 'title' => true ),
	    'path'  => array( 
	        'd'					=> true,
	        'fill'				=> true,
	        'stroke'			=> true,
	        'stroke-linejoin'	=> true,
	        'stroke-width'		=> true,
	        'stroke-linecap'	=> true,
	    ),
	    'rect'	=> array(
	    	'width'				=> true,
	    	'height'			=> true,
	    	'x'					=> true,
	    	'y'					=> true,
	    	'rx'				=> true,
	    	'ry'				=> true,
	    ),
	    'circle' => array(
	    	'cx'				=> true,
	    	'cy'				=> true,
	    	'r'				=> true,
	    ),
    );
    
    return array_merge( $kses_defaults, $style_script_svg_args );
	// Example usage: wp_kses( $the_html, get_kses_with_style_src_svg_ruleset() );	
}

/**
 * Get kses ruleset extended to allow input tags
 * 
 * @since 6.9.5
 */
function get_kses_with_custom_html_ruleset() {
    $kses_defaults = wp_kses_allowed_html( 'post' );

    $custom_html_args = array(
    	'input'	=> array(
    		'type'	=> true,
    		'id'	=> true,
    		'class'	=> true,
    		'name'	=> true,
    		'value'	=> true,
    		'style'	=> true,
    	)
    );
    
    return array_merge( $kses_defaults, $custom_html_args );
	// Example usage: wp_kses( $the_html, get_kses_with_custom_html_ruleset() );	
}

/**
 * Check whether the current user can use Media Categories features.
 *
 * Administrators (and multisite super admins) are always allowed.
 * For other users, access is disabled only for selected roles (roles must have `upload_files`),
 * defaulting to roles that do not have `manage_categories`.
 *
 * @since 9.0.0
 *
 * @return bool
 */
function asenha_media_categories_current_user_has_access__premium_only() {

	// Avoid fatals if called too early (before pluggable functions are loaded).
	// Access is enforced later on the actual hooks/screens.
	if ( ! function_exists( 'wp_get_current_user' ) ) {
		return true;
	}

	// Administrators can always use Media Categories.
	if ( current_user_can( 'manage_options' ) ) {
		return true;
	}

	// Multisite super admins can always use Media Categories.
	if ( is_multisite() && is_super_admin() ) {
		return true;
	}

	if ( ! is_user_logged_in() ) {
		return false;
	}

	// Only apply when the user can upload files (i.e., they are a relevant role for media).
	if ( ! current_user_can( 'upload_files' ) ) {
		return false;
	}

	$options = get_option( ASENHA_SLUG_U, array() );

	$disabled_roles = array();
	if ( isset( $options['media_categories_disabled_for_roles'] ) ) {
		$disabled_roles = (array) $options['media_categories_disabled_for_roles'];
	}

	$disabled_roles = array_filter( array_map( 'sanitize_key', $disabled_roles ) );

	// Default: disable Media Categories for non-admin roles that can upload files and do not have manage_categories.
	// Note: empty array is a valid explicit value (disable for nobody) when the option key exists.
	if ( ! array_key_exists( 'media_categories_disabled_for_roles', $options ) ) {
		$wp_roles = wp_roles();
		if ( empty( $wp_roles ) || empty( $wp_roles->roles ) || ! is_array( $wp_roles->roles ) ) {
			// Fallback to per-user capability: disable when user cannot manage categories.
			return current_user_can( 'manage_categories' );
		}

		foreach ( $wp_roles->roles as $role_slug => $role_data ) {
			if ( 'administrator' === $role_slug ) {
				continue;
			}

			$role_object = get_role( $role_slug );
			if ( empty( $role_object ) ) {
				continue;
			}

			if ( ! $role_object->has_cap( 'upload_files' ) ) {
				continue;
			}

			if ( $role_object->has_cap( 'manage_categories' ) ) {
				continue;
			}

			$disabled_roles[] = $role_slug;
		}
	}

	$current_user = wp_get_current_user();
	$user_roles   = is_object( $current_user ) ? (array) $current_user->roles : array();

	// Disallow if the user has any disabled role.
	return empty( array_intersect( $user_roles, $disabled_roles ) );
}

/**
 * Export ASE's settings
 * 
 */
function asenha_settings_export__premium_only() {

	if ( empty( $_POST['asenha_export_action'] ) || 'export_settings' != $_POST['asenha_export_action'] ) {
		return;
	}

	if ( ! wp_verify_nonce( $_POST['asenha_export_nonce'], 'asenha_export_nonce' ) ) {
		wp_die( 'Invalid nonce. Please try again.', 'Error', array( 'response' => 403 ) );
	}

	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( __( 'Permission denied. Please contact your site administrator to run the export process.', 'admin-site-enhancements' ), __( 'Error', 'admin-site-enhancements' ), array( 'response' => 403 ) );
	}
	
	$asenha_settings = get_option( ASENHA_SLUG_U, array() );
	$asenha_settings_extra = get_option( ASENHA_SLUG_U . '_extra', array() );
	$admin_menu_settings = isset( $asenha_settings_extra['admin_menu'] ) ? $asenha_settings_extra['admin_menu'] : array();
	
	// Prevent auto-check of "Discourage search engine" when the new site is a live site with a different URL
	$asenha_settings['live_site_url'] = '';
	$asenha_settings['admin_menu'] = $admin_menu_settings;
	
	ignore_user_abort( true );
	
	nocache_headers();
	header( 'Content-Type: application/json; charset=utf-8' );
	header( 'Content-Disposition: attachment; filename=admin-site-enhancements-ase-settings-' . date('Y-m-d-Hi') . '.json' );
	header( 'expires: 0' );
	
	echo json_encode( $asenha_settings );
	exit;
	
}

/**
 * Import ASE's settings
 * 
 */
function asenha_settings_import__premium_only() {
	if ( isset( $_FILES['imported-settings'] ) ) {
		$imported_settings = asenha_get_import_content__premium_only( 'imported-settings' );
		
		if ( $imported_settings ) {
			// Quick check to see if JSON file does indeed contain ASE settings
			if ( array_key_exists( 'enable_duplication', $imported_settings ) ) {
				// We make sure rewrite rules are flushed on the new site
				$imported_settings['custom_content_types_flush_rewrite_rules_needed'] = true;
				$imported_settings['code_snippets_manager_flush_rewrite_rules_needed'] = true;
				// Create new, random secret key for CAPTCHA Protection >> ALTCHA
				$imported_settings['altcha_secret_key'] = bin2hex( random_bytes( 12 ) );

				// Admin Menu Organizer
				if ( isset( $imported_settings['admin_menu'] ) ) {
					$imported_admin_menu_settings = $imported_settings['admin_menu'];
					unset( $imported_settings['admin_menu'] );
				} else {
					$imported_admin_menu_settings = array();
				}

				$options_extra = get_option( ASENHA_SLUG_U . '_extra', array() );
				$options_extra['admin_menu'] = $imported_admin_menu_settings;

				$import_success = update_option( ASENHA_SLUG_U, $imported_settings, true );
				$import_extra_success = update_option( ASENHA_SLUG_U . '_extra', $options_extra, true );
				
				if ( $import_success && $import_extra_success ) {
					// Reload the ASE settings page via JS after import success
					wp_safe_redirect( admin_url( 'tools.php?page=admin-site-enhancements&import=success' ) );
					exit;
				}

			}
		}		
	}
}

/**
 * Export code snippets created with Code Snippets Manager
 * 
 * @since 7.8.8
 */
function asenha_snippets_export__premium_only() {

	if ( empty( $_POST['asenha_export_action'] ) || 'export_snippets' != $_POST['asenha_export_action'] ) {
		return;
	}

	if ( ! wp_verify_nonce( $_POST['asenha_export_nonce'], 'asenha_export_nonce' ) ) {
		wp_die( 'Invalid nonce. Please try again.', 'Error', array( 'response' => 403 ) );
	}

	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( __( 'Permission denied. Please contact your site administrator to run the export process.', 'admin-site-enhancements' ), __( 'Error', 'admin-site-enhancements' ), array( 'response' => 403 ) );
	}
	
	$export = array();
	
	$options_extra = get_option( ASENHA_SLUG_U . '_extra', array() );

	// Get export type and filters
	$export_type = isset( $_POST['asenha_snippets_export_type'] ) ? sanitize_text_field( $_POST['asenha_snippets_export_type'] ) : 'all';
	$selected_snippet_ids = isset( $_POST['asenha_selected_snippet_ids'] ) ? sanitize_text_field( $_POST['asenha_selected_snippet_ids'] ) : '';
	$selected_category_ids = isset( $_POST['asenha_selected_category_ids'] ) ? sanitize_text_field( $_POST['asenha_selected_category_ids'] ) : '';
	$selected_snippet_types = isset( $_POST['asenha_selected_snippet_types'] ) ? sanitize_text_field( $_POST['asenha_selected_snippet_types'] ) : '';
	
	// Build query args based on export type
	$query_args = array(
		'post_type'		=> 'asenha_code_snippet',
		'numberposts'	=> -1,
		'nopaging'		=> true,
		'post_status'	=> array( 'publish', 'draft' ),
	);
	
	// Filter by manual selection
	if ( $export_type === 'manual' && ! empty( $selected_snippet_ids ) ) {
		$snippet_ids = array_map( 'intval', explode( ',', $selected_snippet_ids ) );
		$query_args['post__in'] = $snippet_ids;
	}
	
	// Filter by categories
	if ( $export_type === 'by_categories' && ! empty( $selected_category_ids ) ) {
		$category_ids = array_map( 'intval', explode( ',', $selected_category_ids ) );
		$query_args['tax_query'] = array(
			array(
				'taxonomy'	=> 'asenha_code_snippet_category',
				'field'		=> 'term_id',
				'terms'		=> $category_ids,
				'operator'	=> 'IN',
			),
		);
	}
	
	$snippets = get_posts( $query_args );
	
	// Filter active snippets if needed
	if ( $export_type === 'active' ) {
		$snippets = array_filter( $snippets, function( $snippet ) {
			return get_post_meta( $snippet->ID, '_active', true ) !== 'no';
		});
	}
	
	// Filter by snippet types if needed
	if ( $export_type === 'by_types' && ! empty( $selected_snippet_types ) ) {
		$snippet_types = array_map( 'sanitize_text_field', explode( ',', $selected_snippet_types ) );
		$snippets = array_filter( $snippets, function( $snippet ) use ( $snippet_types ) {
			$options = get_post_meta( $snippet->ID, 'options', true );
			if ( ! empty( $options ) && isset( $options['language'] ) ) {
				return in_array( $options['language'], $snippet_types, true );
			}
			return false;
		});
	}
	
	// Extract exported snippet IDs
	$exported_snippet_ids = array();
	foreach ( $snippets as $snippet ) {
		$exported_snippet_ids[] = $snippet->ID;
	}
	
	// Filter and export snippets tree - only include exported snippets
	$full_snippets_tree = isset( $options_extra['code_snippets'] ) ? $options_extra['code_snippets'] : array();
	$filtered_snippets_tree = array();
	
	if ( ! empty( $full_snippets_tree ) && ! empty( $exported_snippet_ids ) ) {
		foreach ( $full_snippets_tree as $type => $code_snippets ) {
			// jQuery is a boolean flag, not an array of snippets
			if ( 'jquery' === $type ) {
				$filtered_snippets_tree[$type] = $code_snippets;
			} else {
				// Filter snippets by exported IDs
				if ( is_array( $code_snippets ) ) {
					foreach ( $code_snippets as $snippet_id => $snippet_data ) {
						if ( in_array( $snippet_id, $exported_snippet_ids, true ) ) {
							$filtered_snippets_tree[$type][$snippet_id] = $snippet_data;
						}
					}
				}
			}
		}
	}
	
	$export['snippets_tree'] = $filtered_snippets_tree;

	// Export ID of last edited PHP snippet
	$export['last_edited_csm_php_snippet'] = isset( $options_extra['last_edited_csm_php_snippet'] ) ? $options_extra['last_edited_csm_php_snippet'] : '';

	// Collect all category term IDs used by exported snippets
	$used_category_ids = array();
	foreach ( $snippets as $snippet ) {
		$snippet_terms = get_the_terms( $snippet->ID, 'asenha_code_snippet_category' );
		if ( ! is_wp_error( $snippet_terms ) && ! empty( $snippet_terms ) ) {
			foreach ( $snippet_terms as $term ) {
				$used_category_ids[] = $term->term_id;
				// Also include parent categories to maintain hierarchy
				if ( $term->parent > 0 ) {
					$parent_id = $term->parent;
					while ( $parent_id > 0 ) {
						$used_category_ids[] = $parent_id;
						$parent_term = get_term( $parent_id, 'asenha_code_snippet_category' );
						if ( ! is_wp_error( $parent_term ) && $parent_term ) {
							$parent_id = $parent_term->parent;
						} else {
							break;
						}
					}
				}
			}
		}
	}
	
	// Remove duplicates
	$used_category_ids = array_unique( $used_category_ids );
	
	// Get all snippet categories but only export used ones
	$tax_query_args = array(
		'taxonomy'		=> 'asenha_code_snippet_category',
		'hide_empty'	=> false,
	);
	$raw_snippet_categories = get_terms( $tax_query_args );
	
	$snippet_categories = array();
	if ( ! empty( $raw_snippet_categories ) && ! empty( $used_category_ids ) ) {
		foreach ( $raw_snippet_categories as $raw_snippet_category ) {
			// Only include categories that are used by exported snippets
			if ( in_array( $raw_snippet_category->term_id, $used_category_ids, true ) ) {
				if ( $raw_snippet_category->parent > 0 ) {
					$parent_category = get_term( $raw_snippet_category->parent, 'asenha_code_snippet_category' );
					$parent_slug = $parent_category->slug;
				} else {
					$parent_slug = '';
				}
				
				$snippet_categories[$raw_snippet_category->slug] = array(
					'term_id'		=> $raw_snippet_category->term_id,
					'slug'			=> $raw_snippet_category->slug,
					'name'			=> $raw_snippet_category->name,
					'description'	=> $raw_snippet_category->description,
					'parent_id'		=> $raw_snippet_category->parent, // integer
					'parent_slug'	=> $parent_slug,
				);
			}
		}		
	}
	$export['snippet_categories'] = $snippet_categories;	

	foreach ( $snippets as $snippet ) {
		$export['snippets'][$snippet->ID]['post_id'] = $snippet->ID;
		$export['snippets'][$snippet->ID]['post_title'] = $snippet->post_title;
		$export['snippets'][$snippet->ID]['post_content'] = $snippet->post_content;
		$export['snippets'][$snippet->ID]['post_status'] = $snippet->post_status;
		$export['snippets'][$snippet->ID]['post_author'] = $snippet->post_author;
		$export['snippets'][$snippet->ID]['post_type'] = $snippet->post_type;
		$export['snippets'][$snippet->ID]['menu_order'] = $snippet->menu_order;
		$export['snippets'][$snippet->ID]['code_snippet_description'] = get_post_meta( $snippet->ID, 'code_snippet_description', true );
		$export['snippets'][$snippet->ID]['options'] = get_post_meta( $snippet->ID, 'options', true );
		if ( get_post_meta( $snippet->ID, '_active', true ) ) {
			$export['snippets'][$snippet->ID]['_active'] = get_post_meta( $snippet->ID, '_active', true );
		} else {
			$export['snippets'][$snippet->ID]['_active'] = 'yes';
		}
		
		$raw_snippet_categories = get_the_terms( $snippet->ID, 'asenha_code_snippet_category' );
		$snippet_categories = array();
		if ( ! is_wp_error( $raw_snippet_categories ) && ! empty( $raw_snippet_categories ) ) {
			foreach ( $raw_snippet_categories as $raw_snippet_category ) {
				if ( $raw_snippet_category->parent > 0 ) {
					$parent_category = get_term( $raw_snippet_category->parent, 'asenha_code_snippet_category' );
					$parent_slug = $parent_category->slug;
				} else {
					$parent_slug = '';
				}

				$snippet_categories[$raw_snippet_category->slug] = array(
					'term_id'		=> $raw_snippet_category->term_id,
					'slug'			=> $raw_snippet_category->slug,
					'name'			=> $raw_snippet_category->name,
					'description'	=> $raw_snippet_category->description,
					'parent_id'		=> $raw_snippet_category->parent, // integer
					'parent_slug'	=> $parent_slug,
				);
			}
		}
		$export['snippets'][$snippet->ID]['snippet_categories'] = $snippet_categories;
	}
	
	ignore_user_abort( true );
	
	nocache_headers();
	header( 'Content-Type: application/json; charset=utf-8' );
	header( 'Content-Disposition: attachment; filename=admin-site-enhancements-ase-code-snippets-' . date('Y-m-d-Hi') . '.json' );
	header( 'expires: 0' );
	
	echo json_encode( $export );
	exit;
	
}

/**
 * Get snippet categories for export via AJAX
 * 
 * @since 7.9.0
 */
function asenha_get_snippet_categories_for_export__premium_only() {
	
	// Verify nonce
	if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( sanitize_text_field( $_POST['nonce'] ), 'asenha_snippets_export_ajax_nonce_' . get_current_user_id() ) ) {
		wp_send_json_error( array( 'message' => __( 'Invalid nonce.', 'admin-site-enhancements' ) ) );
		return;
	}
	
	// Check user capabilities
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_send_json_error( array( 'message' => __( 'Permission denied.', 'admin-site-enhancements' ) ) );
		return;
	}
	
	// Get all snippet categories
	$tax_query_args = array(
		'taxonomy'		=> 'asenha_code_snippet_category',
		'hide_empty'	=> false,
		'orderby'		=> 'name',
		'order'			=> 'ASC',
	);
	$raw_categories = get_terms( $tax_query_args );
	
	if ( is_wp_error( $raw_categories ) ) {
		wp_send_json_error( array( 'message' => __( 'Error fetching categories.', 'admin-site-enhancements' ) ) );
		return;
	}
	
	// Build hierarchical categories structure
	$categories = array();
	$category_hierarchy = array();
	
	// First pass: create a map of all categories
	foreach ( $raw_categories as $category ) {
		$category_hierarchy[ $category->term_id ] = array(
			'term_id'	=> $category->term_id,
			'name'		=> $category->name,
			'slug'		=> $category->slug,
			'parent_id'	=> $category->parent,
			'count'		=> $category->count,
			'level'		=> 0,
		);
	}
	
	// Second pass: build hierarchy with proper levels
	foreach ( $category_hierarchy as $term_id => $category ) {
		$level = 0;
		$parent_id = $category['parent_id'];
		
		// Calculate level based on parent chain
		while ( $parent_id > 0 && isset( $category_hierarchy[ $parent_id ] ) ) {
			$level++;
			$parent_id = $category_hierarchy[ $parent_id ]['parent_id'];
		}
		
		$category_hierarchy[ $term_id ]['level'] = $level;
		$categories[] = $category_hierarchy[ $term_id ];
	}
	
	// Sort to show top-level first, then children
	usort( $categories, function( $a, $b ) {
		if ( $a['level'] !== $b['level'] ) {
			return $a['level'] - $b['level'];
		}
		return strcmp( $a['name'], $b['name'] );
	});
	
	wp_send_json_success( $categories );
}

/**
 * Get snippets for export via AJAX
 * 
 * @since 7.9.0
 */
function asenha_get_snippets_for_export__premium_only() {
	
	// Verify nonce
	if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( sanitize_text_field( $_POST['nonce'] ), 'asenha_snippets_export_ajax_nonce_' . get_current_user_id() ) ) {
		wp_send_json_error( array( 'message' => __( 'Invalid nonce.', 'admin-site-enhancements' ) ) );
		return;
	}
	
	// Check user capabilities
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_send_json_error( array( 'message' => __( 'Permission denied.', 'admin-site-enhancements' ) ) );
		return;
	}
	
	// Get all snippets
	$query_args = array(
		'post_type'		=> 'asenha_code_snippet',
		'numberposts'	=> -1,
		'nopaging'		=> true,
		'orderby'		=> 'title',
		'order'			=> 'ASC',
		'post_status'	=> array( 'publish', 'draft' ),
	);
	$raw_snippets = get_posts( $query_args );
	
	$snippets = array();
	
	foreach ( $raw_snippets as $snippet ) {
		$is_active = get_post_meta( $snippet->ID, '_active', true ) !== 'no';
		$options = get_post_meta( $snippet->ID, 'options', true );
		$language = isset( $options['language'] ) ? $options['language'] : 'php';
		
		$snippets[] = array(
			'id'		=> $snippet->ID,
			'title'		=> $snippet->post_title,
			'is_active'	=> $is_active,
			'type'		=> $language,
		);
	}
	
	wp_send_json_success( $snippets );
}

/**
 * Import code snippets
 * 
 * @since 7.8.8
 */
function asenha_snippets_import__premium_only() {
	if ( isset( $_FILES['imported-code-snippets'] ) && current_user_can( 'manage_options' ) ) {
		$imported_code_snippets = asenha_get_import_content__premium_only( 'imported-code-snippets' );
		
		if ( $imported_code_snippets ) {
			// Quick check to see if JSON file does indeed contain code snippets data
			if ( array_key_exists( 'snippets_tree', $imported_code_snippets ) ) {
				// Import snippet categories
				$snippet_categories = $imported_code_snippets['snippet_categories'];

				// Import the snippet parent categories first
				foreach ( $snippet_categories as $snippet_category ) {
					if ( $snippet_category['parent_id'] === 0 ) {
						wp_insert_term(
							$snippet_category['name'],
							'asenha_code_snippet_category',
							array(
								'description'	=> $snippet_category['description'],
								'slug'			=> $snippet_category['slug'],
							)
						);
					}
				}

				// Import the snippet child categories
				foreach ( $snippet_categories as $snippet_category ) {
					if ( $snippet_category['parent_id'] > 0 ) {
						$parent_category = get_term_by( 'slug', $snippet_category['parent_slug'], 'asenha_code_snippet_category' );
						wp_insert_term(
							$snippet_category['name'],
							'asenha_code_snippet_category',
							array(
								'description'	=> $snippet_category['description'],
								'slug'			=> $snippet_category['slug'],
								'parent'		=> $parent_category->term_id,
							)
						);
					}
				}

				// Import the snippets
				if ( ! empty( $imported_code_snippets['snippets'] ) ) {
					$snippets_tree = $imported_code_snippets['snippets_tree'];
					$new_snippets_tree = array();
					
					foreach ( $imported_code_snippets['snippets'] as $snippet_id => $snippet ) {
						$postarr = array(
							'post_title'		=> $snippet['post_title'],
							// We prevent backslashes (\) removal from the code in post_content by adding slashes here
							// This is because wp_insert_post applies wp_unslash() to post_content
							'post_content'		=> wp_slash( $snippet['post_content'] ),
							'post_status'		=> $snippet['post_status'],
							'post_author'		=> $snippet['post_author'],
							'post_type'			=> $snippet['post_type'],
							'menu_order'		=> $snippet['menu_order'],
							'import_id'			=> $snippet['post_id'],
							'comment_status'	=> 'closed',
							'ping_status'		=> 'closed',
						);
						
						$post_id = wp_insert_post( $postarr );
						
						if ( $post_id ) {
							// Let's replace the original snippet/post ID with the new one in $snippets_tree
							foreach ( $snippets_tree as $type => $code_snippets ) {
								if ( 'jquery' != $type ) {
									foreach ( $code_snippets as $code_snippet_id => $code_snippet ) {
										if ( $snippet_id == $code_snippet_id ) {
											$code_snippet['id'] = $post_id;
											$code_snippet['filename'] = str_replace( $code_snippet_id, $post_id, $code_snippet['filename'] );
											$new_snippets_tree[$type][$post_id]	= $code_snippet; 
										}
									}									
								}
							}
							
							update_post_meta( $post_id, 'code_snippet_description', $snippet['code_snippet_description'] );
							update_post_meta( $post_id, 'options', $snippet['options'] );
							update_post_meta( $post_id, '_active', $snippet['_active'] );
							update_post_meta( $post_id, 'is_imported_snippet', 'yes' );
							update_post_meta( $post_id, 'original_snippet_id', $snippet['post_id'] );

							// Let's assign the snippet categories
							$snippet_categories = $snippet['snippet_categories'];
							$snippet_category_slugs = array();
							if ( ! empty( $snippet_categories ) ) {
								foreach ( $snippet_categories as $snippet_category ) {
									$snippet_category_slugs[] = $snippet_category['slug'];
								}
							}
							
							if ( ! empty( $snippet_category_slugs ) ) {
								wp_set_object_terms( $post_id, $snippet_category_slugs, 'asenha_code_snippet_category' );
							}

							asenha_save_snippet_to_file__premium_only( $post_id, $snippet );
						}
					}
				}

				// Import the snippets tree and last edited PHP snippet ID
				$options_extra = get_option( ASENHA_SLUG_U . '_extra', array() );
				$options_extra['snippets_tree'] = $new_snippets_tree; // Use the new snippet tree with new post IDs
				$options_extra['last_edited_csm_php_snippet'] = $imported_code_snippets['last_edited_csm_php_snippet'];
				$import_extra_success = update_option( ASENHA_SLUG_U . '_extra', $options_extra, true );

				$csm_admin = new Code_Snippets_Manager_Admin;
				$csm_admin->rebuild_snippets_data();

				if ( $import_extra_success ) {
					// Reload the ASE settings page via JS after import success
					wp_safe_redirect( admin_url( 'tools.php?page=admin-site-enhancements&import=success' ) );
					exit;
				}
			}
		}		
	}
}

/**
 * Get default Form Builder styles payload.
 *
 * @since next-version
 */
function asenha_get_formbuilder_form_styles_defaults__premium_only() {
	return array(
		'form_style'          => 'default-style',
		'form_style_template' => '',
		'style_template_key'  => '',
		'style_template_hash' => '',
	);
}

/**
 * Parse and sanitize Form Builder form style settings.
 *
 * @since next-version
 *
 * @param array $styles Raw styles array.
 * @return array
 */
function asenha_parse_formbuilder_form_styles__premium_only( $styles ) {
	$styles = is_array( $styles ) ? $styles : array();
	$styles = Form_Builder_Helper::recursive_parse_args( $styles, asenha_get_formbuilder_form_styles_defaults__premium_only() );
	$styles = Form_Builder_Helper::sanitize_array( $styles, Form_Builder_Helper::get_form_styles_sanitize_rules() );

	$styles['style_template_key']  = asenha_sanitize_formbuilder_style_template_key__premium_only( isset( $styles['style_template_key'] ) ? $styles['style_template_key'] : '' );
	$styles['style_template_hash'] = asenha_sanitize_formbuilder_style_template_hash__premium_only( isset( $styles['style_template_hash'] ) ? $styles['style_template_hash'] : '' );

	return $styles;
}

/**
 * Get style template key post-meta name.
 *
 * @since next-version
 *
 * @return string
 */
function asenha_get_formbuilder_style_template_key_meta_name__premium_only() {
	return 'asenha_formbuilder_style_template_key';
}

/**
 * Get style template hash post-meta name.
 *
 * @since next-version
 *
 * @return string
 */
function asenha_get_formbuilder_style_template_hash_meta_name__premium_only() {
	return 'asenha_formbuilder_style_template_hash';
}

/**
 * Sanitize style template key.
 *
 * @since next-version
 *
 * @param string $style_template_key Raw style template key.
 * @return string
 */
function asenha_sanitize_formbuilder_style_template_key__premium_only( $style_template_key ) {
	$style_template_key = sanitize_key( sanitize_text_field( (string) $style_template_key ) );
	return $style_template_key;
}

/**
 * Sanitize style template hash.
 *
 * @since next-version
 *
 * @param string $style_template_hash Raw style template hash.
 * @return string
 */
function asenha_sanitize_formbuilder_style_template_hash__premium_only( $style_template_hash ) {
	$style_template_hash = strtolower( sanitize_text_field( (string) $style_template_hash ) );
	$style_template_hash = preg_replace( '/[^a-f0-9]/', '', $style_template_hash );

	if ( 64 !== strlen( $style_template_hash ) ) {
		return '';
	}

	return $style_template_hash;
}

/**
 * Normalize style template settings payload.
 *
 * @since next-version
 *
 * @param array $style_settings Raw style settings array.
 * @return array
 */
function asenha_normalize_formbuilder_style_settings__premium_only( $style_settings ) {
	$style_settings = is_array( $style_settings ) ? $style_settings : array();
	$style_settings = Form_Builder_Helper::recursive_parse_args( $style_settings, Form_Builder_Styles::default_styles() );
	$style_settings = Form_Builder_Helper::sanitize_array( $style_settings, Form_Builder_Styles::get_styles_sanitize_array() );

	return $style_settings;
}

/**
 * Check whether a payload looks like Form Builder style settings.
 *
 * @since next-version
 *
 * @param mixed $maybe_style_settings Maybe style settings payload.
 * @return bool
 */
function asenha_is_formbuilder_style_settings_array__premium_only( $maybe_style_settings ) {
	if ( ! is_array( $maybe_style_settings ) || empty( $maybe_style_settings ) ) {
		return false;
	}

	$default_styles = Form_Builder_Styles::default_styles();
	$default_keys   = array_keys( $default_styles );
	$input_keys     = array_keys( $maybe_style_settings );
	$matching_keys  = array_intersect( $default_keys, $input_keys );

	return ! empty( $matching_keys );
}

/**
 * Generate style template content hash.
 *
 * @since next-version
 *
 * @param array $style_settings Style settings array.
 * @return string
 */
function asenha_generate_formbuilder_style_template_hash__premium_only( $style_settings ) {
	$style_settings = asenha_normalize_formbuilder_style_settings__premium_only( $style_settings );
	return hash( 'sha256', wp_json_encode( $style_settings ) );
}

/**
 * Check whether style template post exists and usable.
 *
 * @since next-version
 *
 * @param int $style_template_id Style template post ID.
 * @return bool
 */
function asenha_is_valid_formbuilder_style_template_id__premium_only( $style_template_id ) {
	$style_template_id = absint( $style_template_id );
	if ( $style_template_id <= 0 ) {
		return false;
	}

	$style_template = get_post( $style_template_id );
	if ( ! $style_template ) {
		return false;
	}

	return ( 'formbuilder-styles' === $style_template->post_type && 'trash' !== $style_template->post_status );
}

/**
 * Ensure style template identity metadata exists.
 *
 * @since next-version
 *
 * @param int    $style_template_id  Style template post ID.
 * @param array  $style_settings     Optional style settings to hash.
 * @param string $incoming_key       Optional incoming style template key.
 * @return array
 */
function asenha_ensure_formbuilder_style_template_identity__premium_only( $style_template_id, $style_settings = array(), $incoming_key = '' ) {
	$style_template_id = absint( $style_template_id );
	if ( ! asenha_is_valid_formbuilder_style_template_id__premium_only( $style_template_id ) ) {
		return array(
			'style_template_key'  => '',
			'style_template_hash' => '',
		);
	}

	$key_meta_name  = asenha_get_formbuilder_style_template_key_meta_name__premium_only();
	$hash_meta_name = asenha_get_formbuilder_style_template_hash_meta_name__premium_only();

	$style_template_key = asenha_sanitize_formbuilder_style_template_key__premium_only( get_post_meta( $style_template_id, $key_meta_name, true ) );
	$incoming_key       = asenha_sanitize_formbuilder_style_template_key__premium_only( $incoming_key );

	if ( '' === $style_template_key ) {
		if ( '' !== $incoming_key ) {
			$style_template_key = $incoming_key;
		} else {
			$style_template_key = 'fbst_' . strtolower( wp_generate_password( 16, false, false ) );
		}

		update_post_meta( $style_template_id, $key_meta_name, $style_template_key );
	}

	if ( empty( $style_settings ) ) {
		$style_settings = get_post_meta( $style_template_id, 'formbuilder_styles', true );
	}
	$style_settings = asenha_normalize_formbuilder_style_settings__premium_only( $style_settings );

	$style_template_hash = asenha_generate_formbuilder_style_template_hash__premium_only( $style_settings );
	update_post_meta( $style_template_id, $hash_meta_name, $style_template_hash );

	return array(
		'style_template_key'  => $style_template_key,
		'style_template_hash' => $style_template_hash,
	);
}

/**
 * Resolve style template by identity metadata.
 *
 * @since next-version
 *
 * @param string $style_template_key Style template key.
 * @param string $style_template_hash Style template hash.
 * @return int
 */
function asenha_resolve_formbuilder_style_template_id__premium_only( $style_template_key = '', $style_template_hash = '' ) {
	$style_template_key  = asenha_sanitize_formbuilder_style_template_key__premium_only( $style_template_key );
	$style_template_hash = asenha_sanitize_formbuilder_style_template_hash__premium_only( $style_template_hash );

	if ( '' !== $style_template_key ) {
		$style_templates = get_posts(
			array(
				'post_type'      => 'formbuilder-styles',
				'post_status'    => 'publish',
				'posts_per_page' => 1,
				'orderby'        => 'ID',
				'order'          => 'DESC',
				'fields'         => 'ids',
				'meta_key'       => asenha_get_formbuilder_style_template_key_meta_name__premium_only(),
				'meta_value'     => $style_template_key,
			)
		);

		if ( ! empty( $style_templates ) ) {
			return absint( $style_templates[0] );
		}
	}

	if ( '' !== $style_template_hash ) {
		$style_templates = get_posts(
			array(
				'post_type'      => 'formbuilder-styles',
				'post_status'    => 'publish',
				'posts_per_page' => 1,
				'orderby'        => 'ID',
				'order'          => 'DESC',
				'fields'         => 'ids',
				'meta_key'       => asenha_get_formbuilder_style_template_hash_meta_name__premium_only(),
				'meta_value'     => $style_template_hash,
			)
		);

		if ( ! empty( $style_templates ) ) {
			return absint( $style_templates[0] );
		}
	}

	return 0;
}

/**
 * Create a Form Builder style template from settings array.
 *
 * @since next-version
 *
 * @param array  $style_settings Style settings array.
 * @param string $style_template_title Optional style template title.
 * @param string $style_template_key Optional style template key.
 * @return array
 */
function asenha_create_formbuilder_style_template_from_settings__premium_only( $style_settings, $style_template_title = '', $style_template_key = '' ) {
	$style_settings = asenha_normalize_formbuilder_style_settings__premium_only( $style_settings );

	$style_template_title = sanitize_text_field( $style_template_title );
	if ( '' === $style_template_title ) {
		$style_template_title = __( 'Imported Style Template', 'admin-site-enhancements' );
	}

	$new_post = array(
		'post_type'   => 'formbuilder-styles',
		'post_title'  => $style_template_title,
		'post_status' => 'publish',
	);
	$style_template_id = wp_insert_post( $new_post );

	if ( is_wp_error( $style_template_id ) || $style_template_id <= 0 ) {
		return array(
			'style_template_id'   => 0,
			'style_template_key'  => '',
			'style_template_hash' => '',
		);
	}

	update_post_meta( $style_template_id, 'formbuilder_styles', $style_settings );

	$style_template_identity = asenha_ensure_formbuilder_style_template_identity__premium_only( $style_template_id, $style_settings, $style_template_key );

	return array(
		'style_template_id'   => absint( $style_template_id ),
		'style_template_key'  => $style_template_identity['style_template_key'],
		'style_template_hash' => $style_template_identity['style_template_hash'],
	);
}

/**
 * Associate unresolved forms to a style template by key/hash.
 *
 * @since next-version
 *
 * @param int    $style_template_id Style template ID.
 * @param string $style_template_key Style template key.
 * @param string $style_template_hash Style template hash.
 * @return int
 */
function asenha_reconcile_formbuilder_forms_style_template__premium_only( $style_template_id, $style_template_key = '', $style_template_hash = '' ) {
	$style_template_id = absint( $style_template_id );
	if ( ! asenha_is_valid_formbuilder_style_template_id__premium_only( $style_template_id ) ) {
		return 0;
	}

	$style_template_key  = asenha_sanitize_formbuilder_style_template_key__premium_only( $style_template_key );
	$style_template_hash = asenha_sanitize_formbuilder_style_template_hash__premium_only( $style_template_hash );

	if ( '' === $style_template_key && '' === $style_template_hash ) {
		return 0;
	}

	global $wpdb;
	$forms_table = $wpdb->prefix . 'asenha_formbuilder_forms';
	// phpcs:ignore WordPress.DB.PreparedSQL.InterpolatedNotPrepared
	$raw_forms = $wpdb->get_results( "SELECT id, styles FROM {$forms_table}" );

	$updated_forms_count = 0;

	foreach ( $raw_forms as $raw_form ) {
		$form_styles = maybe_unserialize( $raw_form->styles );
		$form_styles = asenha_parse_formbuilder_form_styles__premium_only( $form_styles );

		$form_style_type = isset( $form_styles['form_style'] ) ? $form_styles['form_style'] : 'default-style';
		if ( 'custom-style' !== $form_style_type ) {
			continue;
		}

		$current_style_template_id = absint( isset( $form_styles['form_style_template'] ) ? $form_styles['form_style_template'] : 0 );
		if ( asenha_is_valid_formbuilder_style_template_id__premium_only( $current_style_template_id ) ) {
			continue;
		}

		$form_style_template_key  = asenha_sanitize_formbuilder_style_template_key__premium_only( isset( $form_styles['style_template_key'] ) ? $form_styles['style_template_key'] : '' );
		$form_style_template_hash = asenha_sanitize_formbuilder_style_template_hash__premium_only( isset( $form_styles['style_template_hash'] ) ? $form_styles['style_template_hash'] : '' );

		$matches_key  = ( '' !== $style_template_key && '' !== $form_style_template_key && $style_template_key === $form_style_template_key );
		$matches_hash = ( '' !== $style_template_hash && '' !== $form_style_template_hash && $style_template_hash === $form_style_template_hash );

		if ( ! $matches_key && ! $matches_hash ) {
			continue;
		}

		$form_styles['form_style_template'] = $style_template_id;

		if ( '' !== $style_template_key ) {
			$form_styles['style_template_key'] = $style_template_key;
		}
		if ( '' !== $style_template_hash ) {
			$form_styles['style_template_hash'] = $style_template_hash;
		}

		$form_styles = asenha_parse_formbuilder_form_styles__premium_only( $form_styles );

		$wpdb->update(
			$forms_table,
			array(
				'styles' => serialize( $form_styles ),
			),
			array(
				'id' => absint( $raw_form->id ),
			)
		);

		$updated_forms_count++;
	}

	return $updated_forms_count;
}

/**
 * Export forms created with Form Builder.
 */
function asenha_forms_export__premium_only() {
	if ( empty( $_POST['asenha_export_action'] ) || 'export_forms' !== $_POST['asenha_export_action'] ) {
		return;
	}

	if ( ! isset( $_POST['asenha_export_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['asenha_export_nonce'] ) ), 'asenha_export_nonce' ) ) {
		wp_die( 'Invalid nonce. Please try again.', 'Error', array( 'response' => 403 ) );
	}

	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( __( 'Permission denied. Please contact your site administrator to run the export process.', 'admin-site-enhancements' ), __( 'Error', 'admin-site-enhancements' ), array( 'response' => 403 ) );
	}

	global $wpdb;
	$forms_table = $wpdb->prefix . 'asenha_formbuilder_forms';

	$export_type       = isset( $_POST['asenha_forms_export_type'] ) ? sanitize_text_field( wp_unslash( $_POST['asenha_forms_export_type'] ) ) : 'all';
	$selected_form_ids = isset( $_POST['asenha_selected_form_ids'] ) ? sanitize_text_field( wp_unslash( $_POST['asenha_selected_form_ids'] ) ) : '';
	$form_ids          = array();

	if ( ! empty( $selected_form_ids ) ) {
		$form_ids = array_filter( array_unique( array_map( 'absint', explode( ',', $selected_form_ids ) ) ) );
	}

	$query = '';

	if ( 'manual' === $export_type ) {
		if ( empty( $form_ids ) ) {
			wp_die( __( 'Please select at least one form to export.', 'admin-site-enhancements' ), __( 'Error', 'admin-site-enhancements' ), array( 'response' => 400 ) );
		}

		$placeholders = implode( ',', array_fill( 0, count( $form_ids ), '%d' ) );
		$query_params = array_merge( array( 'published' ), $form_ids );
		$query        = $wpdb->prepare(
			"SELECT id, form_key, name, description, status, options, settings, styles, created_at FROM {$forms_table} WHERE status = %s AND id IN ({$placeholders}) ORDER BY name ASC",
			$query_params
		);
	} else {
		$query = $wpdb->prepare(
			"SELECT id, form_key, name, description, status, options, settings, styles, created_at FROM {$forms_table} WHERE status = %s ORDER BY name ASC",
			'published'
		);
	}

	$raw_forms = $wpdb->get_results( $query );

	$export = array(
		'module'      => 'form_builder',
		'exported_at' => current_time( 'mysql' ),
		'forms'       => array(),
	);

	if ( ! empty( $raw_forms ) ) {
		foreach ( $raw_forms as $raw_form ) {
			$form_styles = maybe_unserialize( $raw_form->styles );
			$form_styles = is_array( $form_styles ) ? $form_styles : array();

			$form_export = array(
				'original_id'  => absint( $raw_form->id ),
				'name'         => $raw_form->name,
				'description'  => $raw_form->description,
				'form_key'     => $raw_form->form_key,
				'status'       => $raw_form->status ? $raw_form->status : 'published',
				'options'      => maybe_unserialize( $raw_form->options ),
				'settings'     => maybe_unserialize( $raw_form->settings ),
				'styles'       => $form_styles,
				'created_at'   => $raw_form->created_at,
				'field'        => array(),
				'style_template_title' => '',
				'style_template_key'   => '',
				'style_template_hash'  => '',
			);

			$fields = Form_Builder_Fields::get_form_fields( $raw_form->id );
			foreach ( $fields as $field ) {
				$form_export['field'][] = array(
					'name'          => $field->name,
					'description'   => $field->description,
					'type'          => $field->type,
					'default_value' => $field->default_value,
					'options'       => $field->options,
					'field_order'   => absint( $field->field_order ),
					'required'      => absint( $field->required ),
					'field_options' => $field->field_options,
				);
			}

			$form_style = isset( $form_styles['form_style'] ) ? $form_styles['form_style'] : 'default-style';
			if ( 'custom-style' === $form_style && ! empty( $form_styles['form_style_template'] ) ) {
				$form_style_id   = absint( $form_styles['form_style_template'] );
				$formbuilder_css = get_post_meta( $form_style_id, 'formbuilder_styles', true );
				$formbuilder_css = asenha_normalize_formbuilder_style_settings__premium_only( $formbuilder_css );
				$style_identity  = asenha_ensure_formbuilder_style_template_identity__premium_only( $form_style_id, $formbuilder_css );

				$form_export['style_template_title'] = get_the_title( $form_style_id );
				$form_export['style_template_key']   = $style_identity['style_template_key'];
				$form_export['style_template_hash']  = $style_identity['style_template_hash'];

				if ( ! empty( $style_identity['style_template_key'] ) ) {
					$form_export['styles']['style_template_key'] = $style_identity['style_template_key'];
				}
				if ( ! empty( $style_identity['style_template_hash'] ) ) {
					$form_export['styles']['style_template_hash'] = $style_identity['style_template_hash'];
				}

				if ( ! empty( $formbuilder_css ) ) {
					$form_export['style'] = $formbuilder_css;
				}
			}

			if ( empty( $form_export['style_template_key'] ) && ! empty( $form_styles['style_template_key'] ) ) {
				$form_export['style_template_key'] = asenha_sanitize_formbuilder_style_template_key__premium_only( $form_styles['style_template_key'] );
			}

			if ( empty( $form_export['style_template_hash'] ) && ! empty( $form_styles['style_template_hash'] ) ) {
				$form_export['style_template_hash'] = asenha_sanitize_formbuilder_style_template_hash__premium_only( $form_styles['style_template_hash'] );
			}

			if ( ! empty( $form_export['style_template_key'] ) ) {
				$form_export['styles']['style_template_key'] = $form_export['style_template_key'];
			}

			if ( ! empty( $form_export['style_template_hash'] ) ) {
				$form_export['styles']['style_template_hash'] = $form_export['style_template_hash'];
			}

			$export['forms'][] = $form_export;
		}
	}

	ignore_user_abort( true );

	nocache_headers();
	header( 'Content-Type: application/json; charset=utf-8' );
	header( 'Content-Disposition: attachment; filename=admin-site-enhancements-form-builder-forms-' . date( 'Y-m-d-Hi' ) . '.json' );
	header( 'expires: 0' );

	echo wp_json_encode( $export );
	exit;
}

/**
 * Get forms for export via AJAX.
 */
function asenha_get_forms_for_export__premium_only() {
	if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'asenha_forms_export_ajax_nonce_' . get_current_user_id() ) ) {
		wp_send_json_error( array( 'message' => __( 'Invalid nonce.', 'admin-site-enhancements' ) ) );
		return;
	}

	if ( ! current_user_can( 'manage_options' ) ) {
		wp_send_json_error( array( 'message' => __( 'Permission denied.', 'admin-site-enhancements' ) ) );
		return;
	}

	global $wpdb;
	$forms_table = $wpdb->prefix . 'asenha_formbuilder_forms';
	$query       = $wpdb->prepare(
		"SELECT id, name, created_at FROM {$forms_table} WHERE status = %s ORDER BY name ASC",
		'published'
	);
	$raw_forms   = $wpdb->get_results( $query );

	$forms = array();
	foreach ( $raw_forms as $raw_form ) {
		$form_title = $raw_form->name ? $raw_form->name : __( '(Untitled form)', 'admin-site-enhancements' );

		$forms[] = array(
			'id'         => absint( $raw_form->id ),
			'title'      => $form_title,
			'created_at' => $raw_form->created_at,
		);
	}

	wp_send_json_success( $forms );
}

/**
 * Get additional info options for Form Builder entries export.
 *
 * @since next-version
 */
function asenha_get_form_builder_entries_export_additional_info_options__premium_only() {
	return array(
		'form_id'           => __( 'Form ID', 'admin-site-enhancements' ),
		'form_title'        => __( 'Form Title', 'admin-site-enhancements' ),
		'entry_id'          => __( 'Entry ID', 'admin-site-enhancements' ),
		'status'            => __( 'Status', 'admin-site-enhancements' ),
		'submitted_at'      => __( 'Submitted Date & Time', 'admin-site-enhancements' ),
		'user_id'           => __( 'User ID', 'admin-site-enhancements' ),
		'user_display_name' => __( 'User Display Name', 'admin-site-enhancements' ),
		'user_email'        => __( 'User Email', 'admin-site-enhancements' ),
	);
}

/**
 * Parse a date string from entries export filters.
 *
 * @since next-version
 */
function asenha_parse_entries_export_date__premium_only( $raw_date ) {
	$raw_date = trim( (string) $raw_date );
	if ( '' === $raw_date ) {
		return false;
	}

	$timezone = wp_timezone();
	$formats  = array_unique(
		array(
			get_option( 'date_format', 'F j, Y' ),
			'Y-m-d',
			'm/d/Y',
			'd/m/Y',
		)
	);

	foreach ( $formats as $format ) {
		$date_obj = DateTimeImmutable::createFromFormat( '!' . $format, $raw_date, $timezone );
		$errors   = DateTimeImmutable::getLastErrors();

		if ( false !== $date_obj && ( false === $errors || ( 0 === $errors['warning_count'] && 0 === $errors['error_count'] ) ) ) {
			return $date_obj;
		}
	}

	return false;
}

/**
 * Convert export value into plain text output.
 *
 * @since next-version
 */
function asenha_normalize_entries_export_value__premium_only( $value ) {
	if ( is_array( $value ) || is_object( $value ) ) {
		$value = wp_json_encode( $value );
	}

	$value = (string) $value;
	$value = str_ireplace( array( '<br>', '<br/>', '<br />' ), "\n", $value );
	$value = preg_replace( '/<\/p>\s*<p>/i', "\n\n", $value );
	$value = str_ireplace( array( '<p>', '</p>' ), '', $value );
	$value = wp_strip_all_tags( $value );
	$value = html_entity_decode( $value, ENT_QUOTES, get_bloginfo( 'charset' ) );

	return trim( $value );
}

/**
 * Format submitted datetime based on WordPress date and time format.
 *
 * @since next-version
 */
function asenha_format_entries_export_datetime__premium_only( $datetime_string ) {
	$datetime_string = trim( (string) $datetime_string );
	if ( '' === $datetime_string ) {
		return '';
	}

	$timezone = wp_timezone();
	$format   = get_option( 'date_format', 'F j, Y' ) . ' ' . get_option( 'time_format', 'H:i' );
	$date_obj = DateTimeImmutable::createFromFormat( 'Y-m-d H:i:s', $datetime_string, $timezone );

	if ( false === $date_obj ) {
		$timestamp = strtotime( $datetime_string );
		if ( false === $timestamp ) {
			return $datetime_string;
		}

		return wp_date( $format, $timestamp, $timezone );
	}

	return $date_obj->format( $format );
}

/**
 * Get entries export additional info value.
 *
 * @since next-version
 */
function asenha_get_entries_export_additional_info_value__premium_only( $info_key, $entry, $form_title ) {
	$value = '';

	switch ( $info_key ) {
		case 'entry_id':
			$value = absint( $entry->id );
			break;

		case 'submitted_at':
			$value = asenha_format_entries_export_datetime__premium_only( $entry->created_at );
			break;

		case 'status':
			$value = ( isset( $entry->delivery_status ) && $entry->delivery_status ) ? __( 'Success', 'admin-site-enhancements' ) : __( 'Failed', 'admin-site-enhancements' );
			break;

		case 'form_id':
			$value = absint( $entry->form_id );
			break;

		case 'form_title':
			$value = $form_title;
			break;

		case 'user_id':
			$value = absint( $entry->user_id );
			break;

		case 'user_display_name':
			$user  = ! empty( $entry->user_id ) ? get_userdata( absint( $entry->user_id ) ) : false;
			$value = ( $user && isset( $user->display_name ) ) ? $user->display_name : '';
			break;

		case 'user_email':
			$user  = ! empty( $entry->user_id ) ? get_userdata( absint( $entry->user_id ) ) : false;
			$value = ( $user && isset( $user->user_email ) ) ? $user->user_email : '';
			break;

	}

	return (string) $value;
}

/**
 * Convert zero-based column index into spreadsheet column name.
 *
 * @since next-version
 */
function asenha_entries_export_xlsx_column_name__premium_only( $index ) {
	$index = absint( $index );
	$name  = '';

	do {
		$remainder = $index % 26;
		$name      = chr( 65 + $remainder ) . $name;
		$index     = (int) floor( $index / 26 ) - 1;
	} while ( $index >= 0 );

	return $name;
}

/**
 * Escape values for XML in XLSX exports.
 *
 * @since next-version
 */
function asenha_entries_export_xlsx_escape_value__premium_only( $value ) {
	$value = wp_check_invalid_utf8( (string) $value );
	$value = preg_replace( '/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value );

	return htmlspecialchars( $value, ENT_QUOTES | ENT_XML1, 'UTF-8' );
}

/**
 * Build worksheet XML for XLSX export.
 *
 * @since next-version
 */
function asenha_entries_export_build_sheet_xml__premium_only( $headers, $rows ) {
	$all_rows = array_merge( array( $headers ), $rows );
	$max_cols = max( count( $headers ), 1 );
	$last_col = asenha_entries_export_xlsx_column_name__premium_only( $max_cols - 1 );
	$last_row = max( count( $all_rows ), 1 );

	$sheet_xml  = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
	$sheet_xml .= '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">';
	$sheet_xml .= '<dimension ref="A1:' . $last_col . $last_row . '"/>';
	$sheet_xml .= '<sheetData>';

	foreach ( $all_rows as $row_index => $row_values ) {
		$row_number = $row_index + 1;
		$sheet_xml .= '<row r="' . $row_number . '">';

		for ( $col_index = 0; $col_index < $max_cols; $col_index++ ) {
			$cell_ref   = asenha_entries_export_xlsx_column_name__premium_only( $col_index ) . $row_number;
			$cell_value = isset( $row_values[ $col_index ] ) ? asenha_entries_export_xlsx_escape_value__premium_only( $row_values[ $col_index ] ) : '';

			$sheet_xml .= '<c r="' . $cell_ref . '" t="inlineStr"><is><t xml:space="preserve">' . $cell_value . '</t></is></c>';
		}

		$sheet_xml .= '</row>';
	}

	$sheet_xml .= '</sheetData></worksheet>';

	return $sheet_xml;
}

/**
 * Send CSV download response.
 *
 * @since next-version
 */
function asenha_entries_export_send_csv__premium_only( $filename, $headers, $rows ) {
	ignore_user_abort( true );
	nocache_headers();

	header( 'Content-Type: text/csv; charset=UTF-8' );
	header( 'Content-Disposition: attachment; filename=' . $filename . '.csv' );
	header( 'expires: 0' );

	$output = fopen( 'php://output', 'w' );
	if ( false === $output ) {
		wp_die( __( 'Could not create export output stream.', 'admin-site-enhancements' ), __( 'Error', 'admin-site-enhancements' ), array( 'response' => 500 ) );
	}

	fprintf( $output, chr( 0xEF ) . chr( 0xBB ) . chr( 0xBF ) );
	fputcsv( $output, $headers );

	foreach ( $rows as $row ) {
		fputcsv( $output, $row );
	}

	fclose( $output );
	exit;
}

/**
 * Send JSON download response.
 *
 * @since next-version
 */
function asenha_entries_export_send_json__premium_only( $filename, $payload ) {
	ignore_user_abort( true );
	nocache_headers();

	header( 'Content-Type: application/json; charset=utf-8' );
	header( 'Content-Disposition: attachment; filename=' . $filename . '.json' );
	header( 'expires: 0' );

	echo wp_json_encode( $payload );
	exit;
}

/**
 * Send XLSX download response.
 *
 * @since next-version
 */
function asenha_entries_export_send_xlsx__premium_only( $filename, $headers, $rows ) {
	if ( ! class_exists( 'ZipArchive' ) ) {
		wp_die( __( 'Excel export requires ZipArchive to be enabled on this server.', 'admin-site-enhancements' ), __( 'Error', 'admin-site-enhancements' ), array( 'response' => 500 ) );
	}

	$sheet_xml = asenha_entries_export_build_sheet_xml__premium_only( $headers, $rows );
	$created   = gmdate( 'Y-m-d\TH:i:s\Z' );
	$tmp_file  = wp_tempnam( 'asenha-form-builder-entries-export' );
	$zip       = new ZipArchive();
	$zip_open  = $zip->open( $tmp_file, ZipArchive::CREATE | ZipArchive::OVERWRITE );

	if ( true !== $zip_open ) {
		wp_die( __( 'Could not create Excel export file.', 'admin-site-enhancements' ), __( 'Error', 'admin-site-enhancements' ), array( 'response' => 500 ) );
	}

	$zip->addFromString(
		'[Content_Types].xml',
		'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' .
		'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' .
		'<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' .
		'<Default Extension="xml" ContentType="application/xml"/>' .
		'<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' .
		'<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' .
		'<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>' .
		'<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>' .
		'</Types>'
	);

	$zip->addFromString(
		'_rels/.rels',
		'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' .
		'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' .
		'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>' .
		'<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>' .
		'<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>' .
		'</Relationships>'
	);

	$zip->addFromString(
		'xl/workbook.xml',
		'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' .
		'<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' .
		'<sheets><sheet name="Entries" sheetId="1" r:id="rId1"/></sheets>' .
		'</workbook>'
	);

	$zip->addFromString(
		'xl/_rels/workbook.xml.rels',
		'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' .
		'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' .
		'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>' .
		'</Relationships>'
	);

	$zip->addFromString( 'xl/worksheets/sheet1.xml', $sheet_xml );

	$zip->addFromString(
		'docProps/core.xml',
		'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' .
		'<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' .
		'<dc:creator>Admin and Site Enhancements</dc:creator>' .
		'<cp:lastModifiedBy>Admin and Site Enhancements</cp:lastModifiedBy>' .
		'<dcterms:created xsi:type="dcterms:W3CDTF">' . $created . '</dcterms:created>' .
		'<dcterms:modified xsi:type="dcterms:W3CDTF">' . $created . '</dcterms:modified>' .
		'</cp:coreProperties>'
	);

	$zip->addFromString(
		'docProps/app.xml',
		'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' .
		'<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">' .
		'<Application>Admin and Site Enhancements</Application>' .
		'</Properties>'
	);

	$zip->close();

	ignore_user_abort( true );
	nocache_headers();

	header( 'Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' );
	header( 'Content-Disposition: attachment; filename=' . $filename . '.xlsx' );
	header( 'Content-Length: ' . filesize( $tmp_file ) );
	header( 'expires: 0' );

	readfile( $tmp_file );
	wp_delete_file( $tmp_file );
	exit;
}

/**
 * Export Form Builder entries.
 *
 * @since next-version
 */
function asenha_entries_export__premium_only() {
	if ( empty( $_POST['asenha_export_action'] ) || 'export_entries' !== $_POST['asenha_export_action'] ) {
		return;
	}

	if ( ! isset( $_POST['asenha_export_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['asenha_export_nonce'] ) ), 'asenha_export_nonce' ) ) {
		wp_die( __( 'Invalid nonce. Please try again.', 'admin-site-enhancements' ), __( 'Error', 'admin-site-enhancements' ), array( 'response' => 403 ) );
	}

	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( __( 'Permission denied. Please contact your site administrator to run the export process.', 'admin-site-enhancements' ), __( 'Error', 'admin-site-enhancements' ), array( 'response' => 403 ) );
	}

	$form_id = isset( $_POST['asenha_entries_export_form_id'] ) ? absint( wp_unslash( $_POST['asenha_entries_export_form_id'] ) ) : 0;
	if ( 0 === $form_id ) {
		wp_die( __( 'Please select a form to export entries from.', 'admin-site-enhancements' ), __( 'Error', 'admin-site-enhancements' ), array( 'response' => 400 ) );
	}

	$selected_field_ids_raw = isset( $_POST['asenha_selected_entry_field_ids'] ) ? sanitize_text_field( wp_unslash( $_POST['asenha_selected_entry_field_ids'] ) ) : '';
	$selected_field_ids     = array_filter( array_unique( array_map( 'absint', explode( ',', $selected_field_ids_raw ) ) ) );

	if ( empty( $selected_field_ids ) ) {
		wp_die( __( 'Please select at least one field to export.', 'admin-site-enhancements' ), __( 'Error', 'admin-site-enhancements' ), array( 'response' => 400 ) );
	}

	$selected_additional_info_raw = isset( $_POST['asenha_selected_entry_additional_info'] ) ? sanitize_text_field( wp_unslash( $_POST['asenha_selected_entry_additional_info'] ) ) : '';
	$selected_additional_info     = array_filter( array_unique( array_map( 'sanitize_key', explode( ',', $selected_additional_info_raw ) ) ) );
	$additional_info_options      = asenha_get_form_builder_entries_export_additional_info_options__premium_only();
	$additional_info_keys         = array_keys( $additional_info_options );

	if ( ! empty( $selected_additional_info ) ) {
		$selected_additional_info = array_values( array_intersect( $additional_info_keys, $selected_additional_info ) );
	}

	if ( empty( $selected_additional_info ) ) {
		$selected_additional_info = $additional_info_keys;
	}

	$export_format = isset( $_POST['asenha_entries_export_format'] ) ? sanitize_key( wp_unslash( $_POST['asenha_entries_export_format'] ) ) : 'csv';
	if ( ! in_array( $export_format, array( 'csv', 'xlsx', 'json' ), true ) ) {
		$export_format = 'csv';
	}

	$date_from_raw = isset( $_POST['asenha_entries_export_date_from'] ) ? sanitize_text_field( wp_unslash( $_POST['asenha_entries_export_date_from'] ) ) : '';
	$date_to_raw   = isset( $_POST['asenha_entries_export_date_to'] ) ? sanitize_text_field( wp_unslash( $_POST['asenha_entries_export_date_to'] ) ) : '';

	$date_from = asenha_parse_entries_export_date__premium_only( $date_from_raw );
	$date_to   = asenha_parse_entries_export_date__premium_only( $date_to_raw );

	if ( '' !== $date_from_raw && false === $date_from ) {
		wp_die( __( 'Invalid start date. Please use the date format configured in Settings > General.', 'admin-site-enhancements' ), __( 'Error', 'admin-site-enhancements' ), array( 'response' => 400 ) );
	}

	if ( '' !== $date_to_raw && false === $date_to ) {
		wp_die( __( 'Invalid end date. Please use the date format configured in Settings > General.', 'admin-site-enhancements' ), __( 'Error', 'admin-site-enhancements' ), array( 'response' => 400 ) );
	}

	if ( false !== $date_from && false !== $date_to && $date_from->getTimestamp() > $date_to->getTimestamp() ) {
		wp_die( __( 'Start date cannot be later than end date.', 'admin-site-enhancements' ), __( 'Error', 'admin-site-enhancements' ), array( 'response' => 400 ) );
	}

	$form = Form_Builder_Builder::get_form_vars( $form_id );
	if ( ! $form ) {
		wp_die( __( 'Selected form does not exist.', 'admin-site-enhancements' ), __( 'Error', 'admin-site-enhancements' ), array( 'response' => 404 ) );
	}

	global $wpdb;

	$fields_table = $wpdb->prefix . 'asenha_formbuilder_fields';
	$entries_table = $wpdb->prefix . 'asenha_formbuilder_entries';

	$field_placeholders = implode( ',', array_fill( 0, count( $selected_field_ids ), '%d' ) );
	$field_query_params = array_merge( array( $form_id ), $selected_field_ids );
	$field_query        = $wpdb->prepare(
		"SELECT id, name, type, field_order FROM {$fields_table} WHERE form_id = %d AND id IN ({$field_placeholders}) ORDER BY field_order ASC, id ASC",
		$field_query_params
	);
	$selected_fields    = $wpdb->get_results( $field_query );

	if ( empty( $selected_fields ) ) {
		wp_die( __( 'No valid fields found for the selected form.', 'admin-site-enhancements' ), __( 'Error', 'admin-site-enhancements' ), array( 'response' => 400 ) );
	}

	$entries_where  = array( 'form_id = %d', 'status = %s' );
	$entries_params = array( $form_id, 'published' );

	if ( false !== $date_from ) {
		$entries_where[]  = 'created_at >= %s';
		$entries_params[] = $date_from->format( 'Y-m-d 00:00:00' );
	}

	if ( false !== $date_to ) {
		$entries_where[]  = 'created_at <= %s';
		$entries_params[] = $date_to->format( 'Y-m-d 23:59:59' );
	}

	$entries_query = $wpdb->prepare(
		"SELECT id, form_id, user_id, created_at, delivery_status FROM {$entries_table} WHERE " . implode( ' AND ', $entries_where ) . ' ORDER BY id ASC',
		$entries_params
	);
	$entries      = $wpdb->get_results( $entries_query );

	$form_title = ( isset( $form->name ) && '' !== $form->name ) ? $form->name : __( '(Untitled form)', 'admin-site-enhancements' );

	$column_keys   = array();
	$column_labels = array();

	foreach ( $selected_additional_info as $additional_info_key ) {
		$column_keys[]   = $additional_info_key;
		$column_labels[] = $additional_info_options[ $additional_info_key ];
	}

	foreach ( $selected_fields as $selected_field ) {
		$field_column_key = 'field_' . absint( $selected_field->id );
		$field_label      = $selected_field->name ? $selected_field->name : sprintf(
			/* translators: %d: field ID */
			__( 'Field #%d', 'admin-site-enhancements' ),
			absint( $selected_field->id )
		);

		$column_keys[]   = $field_column_key;
		$column_labels[] = $field_label;
	}

	$email_formatter = new Form_Builder_Email( (object) array( 'settings' => array() ), 0, '' );
	$rows_assoc      = array();
	$rows_numeric    = array();

	foreach ( $entries as $entry ) {
		$entry_data = Form_Builder_Entry::get_entry_vars( $entry->id );
		$entry_metas = ( isset( $entry_data->metas ) && is_array( $entry_data->metas ) ) ? $entry_data->metas : array();

		$row_assoc = array();

		foreach ( $selected_additional_info as $additional_info_key ) {
			$row_assoc[ $additional_info_key ] = asenha_get_entries_export_additional_info_value__premium_only( $additional_info_key, $entry, $form_title );
		}

		foreach ( $selected_fields as $selected_field ) {
			$field_tag   = '#field_id_' . absint( $selected_field->id );
			$field_value = $email_formatter->get_field_tag_value( $field_tag, $entry_metas, 'content' );

			$row_assoc[ 'field_' . absint( $selected_field->id ) ] = asenha_normalize_entries_export_value__premium_only( $field_value );
		}

		$rows_assoc[] = $row_assoc;

		$row_numeric = array();
		foreach ( $column_keys as $column_key ) {
			$row_numeric[] = isset( $row_assoc[ $column_key ] ) ? $row_assoc[ $column_key ] : '';
		}
		$rows_numeric[] = $row_numeric;
	}

	$filename = 'admin-site-enhancements-form-builder-entries-' . sanitize_title( $form_title ) . '-' . gmdate( 'Y-m-d-Hi' );

	if ( 'json' === $export_format ) {
		$json_payload = array(
			'module'      => 'form_builder_entries',
			'exported_at' => current_time( 'mysql' ),
			'form'        => array(
				'id'    => absint( $form_id ),
				'title' => $form_title,
			),
			'date_range'  => array(
				'from' => '' !== $date_from_raw ? $date_from_raw : '',
				'to'   => '' !== $date_to_raw ? $date_to_raw : '',
			),
			'columns'     => array_combine( $column_keys, $column_labels ),
			'rows'        => $rows_assoc,
		);

		asenha_entries_export_send_json__premium_only( $filename, $json_payload );
	}

	if ( 'xlsx' === $export_format ) {
		asenha_entries_export_send_xlsx__premium_only( $filename, $column_labels, $rows_numeric );
	}

	asenha_entries_export_send_csv__premium_only( $filename, $column_labels, $rows_numeric );
}

/**
 * Get form fields for entries export via AJAX.
 *
 * @since next-version
 */
function asenha_get_form_fields_for_entry_export__premium_only() {
	if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'asenha_entries_export_fields_ajax_nonce_' . get_current_user_id() ) ) {
		wp_send_json_error( array( 'message' => __( 'Invalid nonce.', 'admin-site-enhancements' ) ) );
		return;
	}

	if ( ! current_user_can( 'manage_options' ) ) {
		wp_send_json_error( array( 'message' => __( 'Permission denied.', 'admin-site-enhancements' ) ) );
		return;
	}

	$form_id = isset( $_POST['form_id'] ) ? absint( wp_unslash( $_POST['form_id'] ) ) : 0;
	if ( 0 === $form_id ) {
		wp_send_json_error( array( 'message' => __( 'Invalid form ID.', 'admin-site-enhancements' ) ) );
		return;
	}

	$form_fields = Form_Builder_Fields::get_form_fields( $form_id );
	$excluded_field_types = array( 'heading', 'paragraph', 'separator', 'spacer', 'image', 'altcha', 'captcha', 'turnstile' );
	$fields_for_export = array();

	foreach ( $form_fields as $form_field ) {
		$field_type = isset( $form_field->type ) ? $form_field->type : '';

		if ( in_array( $field_type, $excluded_field_types, true ) ) {
			continue;
		}

		$field_title = isset( $form_field->name ) && '' !== $form_field->name ? $form_field->name : sprintf(
			/* translators: %d: field ID */
			__( 'Field #%d', 'admin-site-enhancements' ),
			absint( $form_field->id )
		);

		$fields_for_export[] = array(
			'id'    => absint( $form_field->id ),
			'title' => $field_title,
			'type'  => $field_type,
		);
	}

	global $wpdb;
	$entries_table = $wpdb->prefix . 'asenha_formbuilder_entries';
	$date_bounds_query = $wpdb->prepare(
		"SELECT MIN(created_at) AS min_created_at, MAX(created_at) AS max_created_at FROM {$entries_table} WHERE form_id = %d AND status = %s",
		$form_id,
		'published'
	);
	$date_bounds_row = $wpdb->get_row( $date_bounds_query );

	$date_from = '';
	$date_to   = '';

	if ( $date_bounds_row ) {
		$date_from = ! empty( $date_bounds_row->min_created_at ) ? substr( (string) $date_bounds_row->min_created_at, 0, 10 ) : '';
		$date_to   = ! empty( $date_bounds_row->max_created_at ) ? substr( (string) $date_bounds_row->max_created_at, 0, 10 ) : '';
	}

	wp_send_json_success(
		array(
			'fields'      => $fields_for_export,
			'date_bounds' => array(
				'from' => $date_from,
				'to'   => $date_to,
			),
		)
	);
}

/**
 * Import forms created with Form Builder.
 */
function asenha_forms_import__premium_only() {
	if ( ! isset( $_FILES['imported-forms'] ) ) {
		return;
	}

	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	if ( ! isset( $_POST['_wpnonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['_wpnonce'] ) ), 'asenha-import-forms-nonce' ) ) {
		wp_die( __( 'Invalid nonce. Please try again.', 'admin-site-enhancements' ), __( 'Error', 'admin-site-enhancements' ), array( 'response' => 403 ) );
	}

	$imported_forms = asenha_get_import_content__premium_only( 'imported-forms' );
	if ( ! is_array( $imported_forms ) || ! isset( $imported_forms['forms'] ) || ! is_array( $imported_forms['forms'] ) ) {
		return;
	}

	$imported_count = 0;

	foreach ( $imported_forms['forms'] as $index => $imported_form ) {
		if ( ! is_array( $imported_form ) ) {
			continue;
		}

		$options = ( isset( $imported_form['options'] ) && is_array( $imported_form['options'] ) ) ? $imported_form['options'] : array();
		$options = Form_Builder_Helper::recursive_parse_args( $options, Form_Builder_Helper::get_form_options_default() );
		$options = Form_Builder_Helper::sanitize_array( $options, Form_Builder_Helper::get_form_options_sanitize_rules() );

		$settings = ( isset( $imported_form['settings'] ) && is_array( $imported_form['settings'] ) ) ? $imported_form['settings'] : array();
		$settings = Form_Builder_Helper::recursive_parse_args( $settings, Form_Builder_Helper::get_form_settings_default() );
		$settings = Form_Builder_Helper::sanitize_array( $settings, Form_Builder_Helper::get_form_settings_sanitize_rules() );

		$form_name = isset( $imported_form['name'] ) ? sanitize_text_field( $imported_form['name'] ) : '';
		if ( '' === $form_name ) {
			/* translators: %d: form number */
			$form_name = sprintf( __( 'Imported Form %d', 'admin-site-enhancements' ), ( $index + 1 ) );
		}

		$styles = ( isset( $imported_form['styles'] ) && is_array( $imported_form['styles'] ) ) ? $imported_form['styles'] : array();
		$styles = asenha_parse_formbuilder_form_styles__premium_only( $styles );

		$style_template_title = isset( $imported_form['style_template_title'] ) ? sanitize_text_field( $imported_form['style_template_title'] ) : '';
		$style_template_key   = '';
		$style_template_hash  = '';

		if ( isset( $imported_form['style_template_key'] ) ) {
			$style_template_key = asenha_sanitize_formbuilder_style_template_key__premium_only( $imported_form['style_template_key'] );
		} elseif ( isset( $styles['style_template_key'] ) ) {
			$style_template_key = asenha_sanitize_formbuilder_style_template_key__premium_only( $styles['style_template_key'] );
		}

		if ( isset( $imported_form['style_template_hash'] ) ) {
			$style_template_hash = asenha_sanitize_formbuilder_style_template_hash__premium_only( $imported_form['style_template_hash'] );
		} elseif ( isset( $styles['style_template_hash'] ) ) {
			$style_template_hash = asenha_sanitize_formbuilder_style_template_hash__premium_only( $styles['style_template_hash'] );
		}

		$form_style_type = isset( $styles['form_style'] ) ? $styles['form_style'] : 'default-style';
		if ( 'custom-style' === $form_style_type ) {
			$style_template_id = asenha_resolve_formbuilder_style_template_id__premium_only( $style_template_key, $style_template_hash );

			if ( ! $style_template_id ) {
				$incoming_style_template_id = absint( isset( $styles['form_style_template'] ) ? $styles['form_style_template'] : 0 );
				if ( asenha_is_valid_formbuilder_style_template_id__premium_only( $incoming_style_template_id ) ) {
					$style_template_id = $incoming_style_template_id;
				}
			}

			if ( ! $style_template_id && isset( $imported_form['style'] ) && is_array( $imported_form['style'] ) ) {
				$style_template_import_data = asenha_normalize_formbuilder_style_settings__premium_only( $imported_form['style'] );

				if ( '' === $style_template_hash ) {
					$style_template_hash = asenha_generate_formbuilder_style_template_hash__premium_only( $style_template_import_data );
				}

				if ( '' === $style_template_title ) {
					/* translators: %d: style template number */
					$style_template_title = sprintf( __( 'Imported Style Template %d', 'admin-site-enhancements' ), ( $index + 1 ) );
				}

				$created_style_template = asenha_create_formbuilder_style_template_from_settings__premium_only( $style_template_import_data, $style_template_title, $style_template_key );

				if ( ! empty( $created_style_template['style_template_id'] ) ) {
					$style_template_id   = absint( $created_style_template['style_template_id'] );
					$style_template_key  = $created_style_template['style_template_key'];
					$style_template_hash = $created_style_template['style_template_hash'];
				}
			}

			if ( $style_template_id ) {
				$style_template_identity = asenha_ensure_formbuilder_style_template_identity__premium_only( $style_template_id, array(), $style_template_key );

				$styles['form_style_template'] = $style_template_id;
				$style_template_key            = $style_template_identity['style_template_key'];
				$style_template_hash           = $style_template_identity['style_template_hash'];
			}

			if ( '' !== $style_template_key ) {
				$styles['style_template_key'] = $style_template_key;
			}
			if ( '' !== $style_template_hash ) {
				$styles['style_template_hash'] = $style_template_hash;
			}
		}

		$form_status = isset( $imported_form['status'] ) ? sanitize_text_field( $imported_form['status'] ) : 'published';
		if ( ! in_array( $form_status, array( 'published', 'trash' ), true ) ) {
			$form_status = 'published';
		}

		$new_form_values = array(
			'name'        => $form_name,
			'description' => isset( $imported_form['description'] ) ? sanitize_text_field( $imported_form['description'] ) : '',
			'status'      => $form_status,
			'created_at'  => current_time( 'mysql' ),
			'options'     => $options,
			'settings'    => $settings,
			'styles'      => $styles,
		);

		$new_form_id = Form_Builder_Builder::create( $new_form_values );
		if ( ! $new_form_id ) {
			continue;
		}

		$imported_count++;

		if ( isset( $imported_form['field'] ) && is_array( $imported_form['field'] ) ) {
			foreach ( $imported_form['field'] as $field ) {
				if ( ! is_array( $field ) ) {
					continue;
				}

				Form_Builder_Fields::create_row(
					array(
						'name'          => isset( $field['name'] ) ? $field['name'] : '',
						'description'   => isset( $field['description'] ) ? $field['description'] : '',
						'type'          => isset( $field['type'] ) ? $field['type'] : 'text',
						'default_value' => isset( $field['default_value'] ) ? $field['default_value'] : '',
						'options'       => isset( $field['options'] ) ? $field['options'] : '',
						'field_order'   => isset( $field['field_order'] ) ? $field['field_order'] : '',
						'form_id'       => absint( $new_form_id ),
						'required'      => isset( $field['required'] ) ? $field['required'] : false,
						'field_options' => isset( $field['field_options'] ) ? $field['field_options'] : array(),
					)
				);
			}
		}
	}

	if ( $imported_count > 0 ) {
		wp_safe_redirect( admin_url( 'tools.php?page=admin-site-enhancements&import=success&asenha_open_export_import=1&asenha_scroll_to=form_builder#utilities' ) );
		exit;
	}
}

/**
 * Export Form Builder style templates.
 *
 * @since next-version
 */
function asenha_style_templates_export__premium_only() {
	if ( empty( $_POST['asenha_export_action'] ) || 'export_style_templates' !== $_POST['asenha_export_action'] ) {
		return;
	}

	if ( ! isset( $_POST['asenha_export_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['asenha_export_nonce'] ) ), 'asenha_export_nonce' ) ) {
		wp_die( 'Invalid nonce. Please try again.', 'Error', array( 'response' => 403 ) );
	}

	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( __( 'Permission denied. Please contact your site administrator to run the export process.', 'admin-site-enhancements' ), __( 'Error', 'admin-site-enhancements' ), array( 'response' => 403 ) );
	}

	$export_type                  = isset( $_POST['asenha_style_templates_export_type'] ) ? sanitize_text_field( wp_unslash( $_POST['asenha_style_templates_export_type'] ) ) : 'all';
	$selected_style_template_ids  = isset( $_POST['asenha_selected_style_template_ids'] ) ? sanitize_text_field( wp_unslash( $_POST['asenha_selected_style_template_ids'] ) ) : '';
	$style_template_ids           = array();

	if ( ! empty( $selected_style_template_ids ) ) {
		$style_template_ids = array_filter( array_unique( array_map( 'absint', explode( ',', $selected_style_template_ids ) ) ) );
	}

	if ( 'manual' === $export_type && empty( $style_template_ids ) ) {
		wp_die( __( 'Please select at least one style template to export.', 'admin-site-enhancements' ), __( 'Error', 'admin-site-enhancements' ), array( 'response' => 400 ) );
	}

	$style_template_query_args = array(
		'post_type'      => 'formbuilder-styles',
		'post_status'    => 'publish',
		'posts_per_page' => -1,
		'orderby'        => 'title',
		'order'          => 'ASC',
	);

	if ( 'manual' === $export_type ) {
		$style_template_query_args['post__in'] = $style_template_ids;
	}

	$raw_style_templates = get_posts( $style_template_query_args );

	$export = array(
		'module'          => 'form_builder_style_templates',
		'exported_at'     => current_time( 'mysql' ),
		'style_templates' => array(),
	);

	foreach ( $raw_style_templates as $style_template_post ) {
		$style_template_id = absint( $style_template_post->ID );
		$style_settings    = get_post_meta( $style_template_id, 'formbuilder_styles', true );
		$style_settings    = asenha_normalize_formbuilder_style_settings__premium_only( $style_settings );
		$style_identity    = asenha_ensure_formbuilder_style_template_identity__premium_only( $style_template_id, $style_settings );

		$style_template_title = $style_template_post->post_title ? $style_template_post->post_title : __( '(Untitled style template)', 'admin-site-enhancements' );

		$export['style_templates'][] = array(
			'original_id'         => $style_template_id,
			'title'               => $style_template_title,
			'status'              => $style_template_post->post_status,
			'created_at'          => $style_template_post->post_date,
			'style'               => $style_settings,
			'style_template_key'  => $style_identity['style_template_key'],
			'style_template_hash' => $style_identity['style_template_hash'],
		);
	}

	ignore_user_abort( true );

	nocache_headers();
	header( 'Content-Type: application/json; charset=utf-8' );
	header( 'Content-Disposition: attachment; filename=admin-site-enhancements-form-builder-style-templates-' . date( 'Y-m-d-Hi' ) . '.json' );
	header( 'expires: 0' );

	echo wp_json_encode( $export );
	exit;
}

/**
 * Get style templates for export via AJAX.
 *
 * @since next-version
 */
function asenha_get_style_templates_for_export__premium_only() {
	if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'asenha_style_templates_export_ajax_nonce_' . get_current_user_id() ) ) {
		wp_send_json_error( array( 'message' => __( 'Invalid nonce.', 'admin-site-enhancements' ) ) );
		return;
	}

	if ( ! current_user_can( 'manage_options' ) ) {
		wp_send_json_error( array( 'message' => __( 'Permission denied.', 'admin-site-enhancements' ) ) );
		return;
	}

	$raw_style_templates = get_posts(
		array(
			'post_type'      => 'formbuilder-styles',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'orderby'        => 'title',
			'order'          => 'ASC',
		)
	);

	$style_templates = array();
	foreach ( $raw_style_templates as $raw_style_template ) {
		$style_template_title = $raw_style_template->post_title ? $raw_style_template->post_title : __( '(Untitled style template)', 'admin-site-enhancements' );

		$style_templates[] = array(
			'id'         => absint( $raw_style_template->ID ),
			'title'      => $style_template_title,
			'created_at' => $raw_style_template->post_date,
		);
	}

	wp_send_json_success( $style_templates );
}

/**
 * Import Form Builder style templates.
 *
 * @since next-version
 */
function asenha_style_templates_import__premium_only() {
	if ( ! isset( $_FILES['imported-style-templates'] ) ) {
		return;
	}

	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	if ( ! isset( $_POST['_wpnonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['_wpnonce'] ) ), 'asenha-import-style-templates-nonce' ) ) {
		wp_die( __( 'Invalid nonce. Please try again.', 'admin-site-enhancements' ), __( 'Error', 'admin-site-enhancements' ), array( 'response' => 403 ) );
	}

	$imported_style_templates = asenha_get_import_content__premium_only( 'imported-style-templates' );
	if ( ! is_array( $imported_style_templates ) ) {
		return;
	}

	$style_template_items = array();

	if ( isset( $imported_style_templates['style_templates'] ) && is_array( $imported_style_templates['style_templates'] ) ) {
		$style_template_items = $imported_style_templates['style_templates'];
	} elseif ( isset( $imported_style_templates['style'] ) && is_array( $imported_style_templates['style'] ) ) {
		$style_template_items = array( $imported_style_templates );
	} elseif ( asenha_is_formbuilder_style_settings_array__premium_only( $imported_style_templates ) ) {
		$style_template_items = array(
			array(
				'style' => $imported_style_templates,
			),
		);
	}

	if ( empty( $style_template_items ) ) {
		return;
	}

	$imported_count = 0;

	foreach ( $style_template_items as $index => $style_template_item ) {
		if ( ! is_array( $style_template_item ) ) {
			continue;
		}

		$style_settings = array();

		if ( isset( $style_template_item['style'] ) && is_array( $style_template_item['style'] ) ) {
			$style_settings = $style_template_item['style'];
		} elseif ( asenha_is_formbuilder_style_settings_array__premium_only( $style_template_item ) ) {
			$style_settings = $style_template_item;
		}

		if ( ! asenha_is_formbuilder_style_settings_array__premium_only( $style_settings ) ) {
			continue;
		}

		$style_settings = asenha_normalize_formbuilder_style_settings__premium_only( $style_settings );

		$style_template_key = '';
		if ( isset( $style_template_item['style_template_key'] ) ) {
			$style_template_key = asenha_sanitize_formbuilder_style_template_key__premium_only( $style_template_item['style_template_key'] );
		}

		$style_template_title = isset( $style_template_item['title'] ) ? sanitize_text_field( $style_template_item['title'] ) : '';
		if ( '' === $style_template_title ) {
			/* translators: %d: style template number */
			$style_template_title = sprintf( __( 'Imported Style Template %d', 'admin-site-enhancements' ), ( $index + 1 ) );
		}

		$created_style_template = asenha_create_formbuilder_style_template_from_settings__premium_only( $style_settings, $style_template_title, $style_template_key );

		if ( empty( $created_style_template['style_template_id'] ) ) {
			continue;
		}

		$imported_count++;

		asenha_reconcile_formbuilder_forms_style_template__premium_only(
			$created_style_template['style_template_id'],
			$created_style_template['style_template_key'],
			$created_style_template['style_template_hash']
		);
	}

	if ( $imported_count > 0 ) {
		wp_safe_redirect( admin_url( 'tools.php?page=admin-site-enhancements&import=success&asenha_open_export_import=1&asenha_scroll_to=style_templates#utilities' ) );
		exit;
	}
}

/**
 * Save code snippet to a corresponding file on disk during import
 * 
 * @since 7.8.8
 */
function asenha_save_snippet_to_file__premium_only( $post_id, $snippet ) {
	// Save the Code Snippet in a file in `wp-content/uploads/code-snippets`
	// This is taken and slightly modified from /includes/premium/code-snippets-manager/includes/admin-screens.php 
	// around line 2044 (v7.8.8)
	$before = '';
	$after  = '';

	if ( $snippet['options']['linking'] == 'internal' ) {
		if ( $snippet['options']['language'] == 'css' ) {
			$before .= '<style type="text/css">' . PHP_EOL;
			$after   = '</style>' . PHP_EOL . $after;
		}

		if ( $snippet['options']['language'] == 'js' ) {
			if ( ! preg_match( '/<script\b[^>]*>([\s\S]*?)<\/script>/im', $snippet['post_content'] ) ) {
				$before .= '<script type="text/javascript">' . PHP_EOL;
				$after   = '</script>' . PHP_EOL . $after;
			} else {
				// the content has a <script> tag, then remove the comments so they don't show up on the frontend
				$snippet['post_content'] = preg_replace( '@/\*[\s\S]*?\*/@', '', $snippet['post_content'] );
			}
		}
	}

	if ( $snippet['options']['linking'] == 'external' ) {
		$before = '/******* Do not edit this file *******' . PHP_EOL .
		'Code Snippets Manager' . PHP_EOL .
		'Saved: ' . date( 'M d Y | H:i:s' ) . ' */' . PHP_EOL;
		$after  = '';
	}
	
	if ( $snippet['options']['language'] == 'php' ) {
		$before = '';
		$after = '';
	}
	
	// Check if code-snippets directory exists. Create if non-existent.
	if ( ! is_dir( CSM_UPLOAD_DIR ) ) {
		wp_mkdir_p( CSM_UPLOAD_DIR );
	}

	// Check if code-snippets directory is writable.
	if ( wp_is_writable( CSM_UPLOAD_DIR ) ) {
		$file_name = $post_id . '.' . $snippet['options']['language'];

		// We do not apply stripslashes() to $snippet['post_content'] as it will remove single backslashes (/) from the code
		if ( $snippet['options']['language'] == 'css' ) {
			$compile_scss = isset( $snippet['options']['compile_scss'] ) ? $snippet['options']['compile_scss'] : 'yes';
			if ( 'yes' == $compile_scss ) {
				// Try to compile SCSS if it's part of the CSS code
				try {
					$csm_admin = new Code_Snippets_Manager_Admin;
					$code_snippet = $csm_admin->scss_compiler( $snippet['post_content'] );
				} catch ( Exception $e ) {
					$code_snippet = $snippet['post_content'];
				}
			} else {
				$code_snippet = $snippet['post_content'];
			}
		} else {
			$code_snippet = $snippet['post_content'];
		}
					
		$file_content = $before . $code_snippet . $after;
		@file_put_contents( CSM_UPLOAD_DIR . '/' . $file_name, $file_content );
	}
}

/**
 * Return an array (json_decode-d) of imported file
 * 
 * @since 7.8.8
 */
function asenha_get_import_content__premium_only( $name ) {
	$file_extension = pathinfo( $_FILES[$name]['name'], PATHINFO_EXTENSION );
	$file_size = $_FILES[$name]['size'];
	
	// Only process JSON file that do not exceed max upload size
	if ( $file_extension === 'json' && $file_size < wp_max_upload_size() ) {
		$file_name = sanitize_file_name($_FILES[$name]['name']);
		$temp_file_path = $_FILES[$name]['tmp_name'];
		
		if ( is_uploaded_file( $temp_file_path ) ) {
			$file_contents = file_get_contents( $temp_file_path );
			$imported_settings = json_decode( $file_contents, true );
			// vi( $imported_settings );
		
			return $imported_settings;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

/**
 * Custom wp_die handler for when Code Snippets Manager is activated
 * Modified from _default_wp_die_handler() in WP v6.3.1
 * 
 * @since 5.8.0
 */
function _custom_wp_die_handler__premium_only( $message, $title = '', $args = [] ) {
	
	if ( is_object( $message ) && property_exists( $message, 'error_data' ) ) {
		
		if ( isset( $message->error_data['internal_server_error'] ) ) {
			$filepath_with_error = $message->error_data['internal_server_error']['error']['file'];
		} else {
			$filepath_with_error = '';
		}

		$is_error_from_csm_snippet = ( false !== strpos( $filepath_with_error, '/premium/code-snippets-manager/' ) ) ? true : false;
		
		if ( $is_error_from_csm_snippet 
			&& is_user_logged_in() 
			&& current_user_can( 'manage_options' ) 
			) {

			$options_extra = get_option( ASENHA_SLUG_U . '_extra', array() );
			$php_snippet_post_id = isset( $options_extra['last_edited_csm_php_snippet'] ) ? absint( $options_extra['last_edited_csm_php_snippet'] ) : '';

			$snippet_info = isset( $options_extra['code_snippets']['php'][$php_snippet_post_id] ) ? $options_extra['code_snippets']['php'][$php_snippet_post_id] : array();
			
			$execution_method = ( isset( $snippet_info['execution_method'] ) ) ? $snippet_info['execution_method'] : 'on_page_load';
			$execution_location_type = ( isset( $snippet_info['execution_location_type'] ) ) ? $snippet_info['execution_location_type'] : 'hook';

			$active_php_snippets = isset( $options_extra['code_snippets']['php'] ) ? array_keys( $options_extra['code_snippets']['php'] ) : array();
		    $snippet_edit_url = get_edit_post_link( $php_snippet_post_id );
		    
		    // Get error data
	        // Error type and codes. 
	        // Ref: https://www.php.net/manual/en/errorfunc.constants.php#109430
	        // Ref: https://logtivity.io/fatal-errors-wordpress/
	        // E_ERROR - 1
	        // E_WARNING - 2
	        // E_PARSE - 4
	        // E_NOTICE - 8
	        // E_CORE_ERROR - 16
	        // E_CORE_WARNING - 32
	        // E_COMPILE_ERROR - 64
	        // E_COMPILE_WARNING - 128
	        // E_USER_ERROR - 256
	        // E_USER_WARNING - 512
	        // E_USER_NOTICE - 1024
	        // E_STRICT - 2048
	        // E_RECOVERABLE_ERROR - 4096
	        // E_DEPRECATED - 8192
	        // E_USER_DEPRECATED - 16384 

		    if ( is_numeric( $php_snippet_post_id ) 
				&& in_array( $php_snippet_post_id, $active_php_snippets )
			) {
			    $code = $message->error_data['internal_server_error']['error']['type']; 
			    $fatal_error_codes = array( 1, 16, 256 );
			    if ( in_array( intval( $code ), $fatal_error_codes ) ) {
			    	$type = 'fatal';
			    } else {
			    	$type = 'non-fatal';
			    }
			    
			    $file 			= $message->error_data['internal_server_error']['error']['file'];
			    $line 			= $message->error_data['internal_server_error']['error']['line'];
			    $message_full 	= $message->error_data['internal_server_error']['error']['message']; // includes stack trace
			    $message_parts 	= explode( ' in /', $message_full );
			    $message 		= $message_parts[0];
				$error_message 	= $message . ' on line ' . $line;

			    $message_parts 	= explode( 'Stack trace:', $message_full );
			    $stack_trace = $message_parts[1];

			    // Record error info in PHP snippet post meta
				update_post_meta( $php_snippet_post_id, 'php_snippet_has_error', true );
				update_post_meta( $php_snippet_post_id, 'php_snippet_error_type', $type );
				update_post_meta( $php_snippet_post_id, 'php_snippet_error_code', $code );
				update_post_meta( $php_snippet_post_id, 'php_snippet_error_message', '<span class="error-message">' . $error_message . '</span><span class="stack-trace">Stack trace:</span>' . ltrim( nl2br( str_replace( ABSPATH, '/', $stack_trace ) ), '<br />' ) );
				update_post_meta( $php_snippet_post_id, 'php_snippet_error_via', 'wp_die_handler' );
				update_post_meta( $php_snippet_post_id, 'safe_mode_activation_via', 'wp_die_handler' );

			    // Deactivate PHP snippet
			    update_post_meta( $php_snippet_post_id, '_active', 'no' );		    	

			    // We have a fatal error making the site inaccessible, let's enable safe mode, halt PHP snippets execution, and make the site accessible again. This is only for snippets that are executed on_page_load via a hook.
		        if ( 'on_page_load' == $execution_method 
		    		&& 'hook' == $execution_location_type
		    	) {

				    // Enable Safe Mode to stop PHP snippets execution
					$wp_config = new ASENHA\Classes\WP_Config_Transformer;
					$wp_config_options = array(
						'add'       => true, // Add the config if missing.
						'raw'       => true, // Display value in raw format without quotes.
						'normalize' => false, // Normalize config output using WP Coding Standards.
					);
					$is_safe_mode_enabled = $wp_config->update( 'constant', 'CSM_SAFE_MODE', 'true', $wp_config_options );
		        	
		    	}

		    }

		    $redirect_delay_in_seconds = 30;
								
			$message = '<div class="wp-die-message">
							<p>A fatal error has just occurred due to the last edit you performed on the <strong>' . get_the_title( $php_snippet_post_id ) . '</strong> PHP snippet.</p>
							<p>Don\'t worry. Your site should remain accessible and functional. Safe Mode has been enabled and all PHP snippets execution has been stopped to prevent further errors.</p>
							<p>You will be automatically redirected to the edit screen of the offending PHP snippet with some info on the error to help you fix the code.</p>
							<p class="redirection-counter">Redirecting in <span id="countdown">' . $redirect_delay_in_seconds . '</span> seconds.</p>
						</div>
						<div class="admin-only">This message is only shown to site administrators.</div>';

		    // JS redirect script
		    $delayed_js_redirect_script = '<script type="text/javascript">

		    // Redirection countdown script: https://codepen.io/a55555a4444a333/pen/VVzKMO
		    // Total seconds
		    var seconds = ' . $redirect_delay_in_seconds . ';
		    
		    function countdown() {
		        seconds = seconds - 1;
		        if (seconds < 0) {
		            // Redirect link here
		            window.location = "' . $snippet_edit_url .'";
		        } else {
		            // Update remaining seconds
		            document.getElementById("countdown").innerHTML = seconds;
		            // Countdown with JS
		            window.setTimeout("countdown()", 1000);
		        }
		    }
		    
		    // Run countdown function
		    countdown();
			</script>';
			
		} else {

			list( $message, $title, $parsed_args ) = _wp_die_process_input( $message, $title, $args );

			if ( is_string( $message ) ) {
				if ( ! empty( $parsed_args['additional_errors'] ) ) {
					$message = array_merge(
						array( $message ),
						wp_list_pluck( $parsed_args['additional_errors'], 'message' )
					);
					$message = "<ul>\n\t\t<li>" . implode( "</li>\n\t\t<li>", $message ) . "</li>\n\t</ul>";
				}

				$message = sprintf(
					'<div class="wp-die-message">%s</div>',
					$message
				);
			}
			
		}

		$have_gettext = function_exists( '__' );

		if ( ! empty( $parsed_args['link_url'] ) && ! empty( $parsed_args['link_text'] ) ) {
			$link_url = $parsed_args['link_url'];
			if ( function_exists( 'esc_url' ) ) {
				$link_url = esc_url( $link_url );
			}
			$link_text = $parsed_args['link_text'];
			$message  .= "\n<p><a href='{$link_url}'>{$link_text}</a></p>";
		}

		if ( isset( $parsed_args['back_link'] ) && $parsed_args['back_link'] ) {
			$back_text = $have_gettext ? __( '&laquo; Back' ) : '&laquo; Back';
			$message  .= "\n<p><a href='javascript:history.back()'>$back_text</a></p>";
		}

	if ( ! did_action( 'admin_head' ) ) :
		if ( ! headers_sent() ) {
			header( "Content-Type: text/html; charset={$parsed_args['charset']}" );
			status_header( $parsed_args['response'] );
			nocache_headers();
		}

		$text_direction = $parsed_args['text_direction'];
		$dir_attr       = "dir='$text_direction'";

		/*
		 * If `text_direction` was not explicitly passed,
		 * use get_language_attributes() if available.
		 */
		if ( empty( $args['text_direction'] )
			&& function_exists( 'language_attributes' ) && function_exists( 'is_rtl' )
		) {
			$dir_attr = get_language_attributes();
		}
		?>
<!DOCTYPE html>
<html <?php echo esc_attr( $dir_attr ); ?>>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=<?php echo esc_attr( $parsed_args['charset'] ); ?>" />
	<meta name="viewport" content="width=device-width">
		<?php
		if ( function_exists( 'wp_robots' ) && function_exists( 'wp_robots_no_robots' ) && function_exists( 'add_filter' ) ) {
			add_filter( 'wp_robots', 'wp_robots_no_robots' );
			wp_robots();
		}
		?>
	<title><?php echo esc_html( $title ); ?></title>
	<style type="text/css">
		html {
			background: #f1f1f1;
		}
		body {
			position: relative;
			background: #fff;
			border: 1px solid #ccd0d4;
			color: #444;
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
			margin: 2em auto;
			padding: 1em 2em;
			max-width: 700px;
			-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .04);
			box-shadow: 0 1px 1px rgba(0, 0, 0, .04);
		}
		h1 {
			border-bottom: 1px solid #dadada;
			clear: both;
			color: #666;
			font-size: 24px;
			margin: 30px 0 0 0;
			padding: 0;
			padding-bottom: 7px;
		}
		#error-page {
			margin-top: 50px;
		}
		#error-page p,
		#error-page .wp-die-message {
			font-size: 14px;
			line-height: 1.5;
			margin: 25px 0 20px;
		}
		#error-page code {
			font-family: Consolas, Monaco, monospace;
		}
		<?php
		if ( $is_error_from_csm_snippet 
			&& is_user_logged_in() 
			&& current_user_can( 'manage_options' )
			) {
		?>
		#error-page p.redirection-counter {
			font-size: 1.25em;
			text-align: center;
			font-weight: bold;
		}
		#countdown {
			color: #fa7e1e;
		}
		.admin-only {
			border-top: 1px solid #ccc;
			padding-top: 8px;
			display: block;
			width: 100%;
			font-size: 13px;
			color: #999;
			text-align: center;
		}
		<?php
		}
		?>
		ul li {
			margin-bottom: 10px;
			font-size: 14px ;
		}
		a {
			color: #0073aa;
		}
		a:hover,
		a:active {
			color: #006799;
		}
		a:focus {
			color: #124964;
			-webkit-box-shadow:
				0 0 0 1px #5b9dd9,
				0 0 2px 1px rgba(30, 140, 190, 0.8);
			box-shadow:
				0 0 0 1px #5b9dd9,
				0 0 2px 1px rgba(30, 140, 190, 0.8);
			outline: none;
		}
		.button {
			background: #f3f5f6;
			border: 1px solid #016087;
			color: #016087;
			display: inline-block;
			text-decoration: none;
			font-size: 13px;
			line-height: 2;
			height: 28px;
			margin: 0;
			padding: 0 10px 1px;
			cursor: pointer;
			-webkit-border-radius: 3px;
			-webkit-appearance: none;
			border-radius: 3px;
			white-space: nowrap;
			-webkit-box-sizing: border-box;
			-moz-box-sizing:    border-box;
			box-sizing:         border-box;

			vertical-align: top;
		}

		.button.button-large {
			line-height: 2.30769231;
			min-height: 32px;
			padding: 0 12px;
		}

		.button:hover,
		.button:focus {
			background: #f1f1f1;
		}

		.button:focus {
			background: #f3f5f6;
			border-color: #007cba;
			-webkit-box-shadow: 0 0 0 1px #007cba;
			box-shadow: 0 0 0 1px #007cba;
			color: #016087;
			outline: 2px solid transparent;
			outline-offset: 0;
		}

		.button:active {
			background: #f3f5f6;
			border-color: #7e8993;
			-webkit-box-shadow: none;
			box-shadow: none;
		}

		<?php
		if ( 'rtl' === $text_direction ) {
			echo 'body { font-family: Tahoma, Arial; }';
		}
		?>
	</style>
</head>
<body id="error-page">
<?php endif; // ! did_action( 'admin_head' ) ?>
	<?php echo wp_kses_post( $message ); ?>
	<?php
	if ( $is_error_from_csm_snippet 
		&& is_user_logged_in() 
		&& current_user_can( 'manage_options' )
		) {
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo $delayed_js_redirect_script;
	}
	?>
</body>
</html>	
	<?php
	if ( $parsed_args['exit'] ) {
		die();
	}

	} else {
	// =========================================================================================================
	// ========= If the error is not triggered by Code Snippets Manager, and $message is not an object =========
	// ========= Copy from _default_wp_die_handler() in /wp-includes/functions.php =============================
	// =========================================================================================================
	list( $message, $title, $parsed_args ) = _wp_die_process_input( $message, $title, $args );

	if ( is_string( $message ) ) {
		if ( ! empty( $parsed_args['additional_errors'] ) ) {
			$message = array_merge(
				array( $message ),
				wp_list_pluck( $parsed_args['additional_errors'], 'message' )
			);
			$message = "<ul>\n\t\t<li>" . implode( "</li>\n\t\t<li>", $message ) . "</li>\n\t</ul>";
		}

		$message = sprintf(
			'<div class="wp-die-message">%s</div>',
			$message
		);
	}

	$have_gettext = function_exists( '__' );

	if ( ! empty( $parsed_args['link_url'] ) && ! empty( $parsed_args['link_text'] ) ) {
		$link_url = $parsed_args['link_url'];
		if ( function_exists( 'esc_url' ) ) {
			$link_url = esc_url( $link_url );
		}
		$link_text = $parsed_args['link_text'];
		$message  .= "\n<p><a href='{$link_url}'>{$link_text}</a></p>";
	}

	if ( isset( $parsed_args['back_link'] ) && $parsed_args['back_link'] ) {
		$back_text = $have_gettext ? __( '&laquo; Back' ) : '&laquo; Back';
		$message  .= "\n<p><a href='javascript:history.back()'>$back_text</a></p>";
	}

	if ( ! did_action( 'admin_head' ) ) :
		if ( ! headers_sent() ) {
			header( "Content-Type: text/html; charset={$parsed_args['charset']}" );
			status_header( $parsed_args['response'] );
			nocache_headers();
		}

		$text_direction = $parsed_args['text_direction'];
		$dir_attr       = "dir='$text_direction'";

		/*
		 * If `text_direction` was not explicitly passed,
		 * use get_language_attributes() if available.
		 */
		if ( empty( $args['text_direction'] )
			&& function_exists( 'language_attributes' ) && function_exists( 'is_rtl' )
		) {
			$dir_attr = get_language_attributes();
		}
		?>
<!DOCTYPE html>
<html <?php echo $dir_attr; ?>>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=<?php echo $parsed_args['charset']; ?>" />
	<meta name="viewport" content="width=device-width">
		<?php
		if ( function_exists( 'wp_robots' ) && function_exists( 'wp_robots_no_robots' ) && function_exists( 'add_filter' ) ) {
			add_filter( 'wp_robots', 'wp_robots_no_robots' );
			wp_robots();
		}
		?>
	<title><?php echo $title; ?></title>
	<style type="text/css">
		html {
			background: #f1f1f1;
		}
		body {
			background: #fff;
			border: 1px solid #ccd0d4;
			color: #444;
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
			margin: 2em auto;
			padding: 1em 2em;
			max-width: 700px;
			-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .04);
			box-shadow: 0 1px 1px rgba(0, 0, 0, .04);
		}
		h1 {
			border-bottom: 1px solid #dadada;
			clear: both;
			color: #666;
			font-size: 24px;
			margin: 30px 0 0 0;
			padding: 0;
			padding-bottom: 7px;
		}
		#error-page {
			margin-top: 50px;
		}
		#error-page p,
		#error-page .wp-die-message {
			font-size: 14px;
			line-height: 1.5;
			margin: 25px 0 20px;
		}
		#error-page code {
			font-family: Consolas, Monaco, monospace;
		}
		ul li {
			margin-bottom: 10px;
			font-size: 14px ;
		}
		a {
			color: #2271b1;
		}
		a:hover,
		a:active {
			color: #135e96;
		}
		a:focus {
			color: #043959;
			box-shadow: 0 0 0 2px #2271b1;
			outline: 2px solid transparent;
		}
		.button {
			background: #f3f5f6;
			border: 1px solid #016087;
			color: #016087;
			display: inline-block;
			text-decoration: none;
			font-size: 13px;
			line-height: 2;
			height: 28px;
			margin: 0;
			padding: 0 10px 1px;
			cursor: pointer;
			-webkit-border-radius: 3px;
			-webkit-appearance: none;
			border-radius: 3px;
			white-space: nowrap;
			-webkit-box-sizing: border-box;
			-moz-box-sizing:    border-box;
			box-sizing:         border-box;

			vertical-align: top;
		}

		.button.button-large {
			line-height: 2.30769231;
			min-height: 32px;
			padding: 0 12px;
		}

		.button:hover,
		.button:focus {
			background: #f1f1f1;
		}

		.button:focus {
			background: #f3f5f6;
			border-color: #007cba;
			-webkit-box-shadow: 0 0 0 1px #007cba;
			box-shadow: 0 0 0 1px #007cba;
			color: #016087;
			outline: 2px solid transparent;
			outline-offset: 0;
		}

		.button:active {
			background: #f3f5f6;
			border-color: #7e8993;
			-webkit-box-shadow: none;
			box-shadow: none;
		}

		<?php
		if ( 'rtl' === $text_direction ) {
			echo 'body { font-family: Tahoma, Arial; }';
		}
		?>
	</style>
</head>
<body id="error-page">
<?php endif; // ! did_action( 'admin_head' ) ?>
	<?php echo $message; ?>
</body>
</html>
	<?php
	if ( $parsed_args['exit'] ) {
		die();
	}
			
	}
}

/**
 * Enqueue ALTCHA scripts and styles on login, registration and password reset forms/pages
 * 
 * @since 7.7.0
 */
function asenha_login_altcha_scripts__premium_only() {
	$options = get_option( 'admin_site_enhancements', array() );
	$captcha_wp_locations = ( array_key_exists( 'captcha_wp_locations', $options ) ) ? $options['captcha_wp_locations'] : array();

    if ( in_array( 'wp_login_form', $captcha_wp_locations ) 
		|| in_array( 'wp_password_reset_form', $captcha_wp_locations ) 
		|| in_array( 'wp_registration_form', $captcha_wp_locations ) 
	) {
		asenha_register_altcha_assets__premium_only();
		asenha_enqueue_altcha_assets__premium_only();
    }
}

/**
 * Enqueue ALTCHA scripts and styles on the frontend, e.g. on posts with commenting enabled
 * 
 * @since 7.7.0
 */
function asenha_frontend_altcha_scripts__premium_only() {
	global $post;
	$disable_comments = new ASENHA\Classes\Disable_Comments;

	$options = get_option( 'admin_site_enhancements', array() );
	$captcha_wp_locations = ( array_key_exists( 'captcha_wp_locations', $options ) ) ? $options['captcha_wp_locations'] : array();

	if ( is_object( $post ) && property_exists( $post, 'comment_status' ) ) {

		if ( property_exists( $post, 'post_type' ) ) {
			$is_commenting_disabled_for_post_type = $disable_comments->is_commenting_disabled_for_post_type( $post->post_type );
		} else {
			$is_commenting_disabled_for_post_type = false;	
		}

		// Enqueue on posts with commenting enabled
		if ( 'open' == $post->comment_status 
			&& ! $is_commenting_disabled_for_post_type
			&&  in_array( 'wp_comment_form', $captcha_wp_locations )
		) {
			asenha_register_altcha_assets__premium_only();
			asenha_enqueue_altcha_assets__premium_only();
		}
	}
	
    // When WooCommerce is active
	if ( in_array( 'woocommerce/woocommerce.php', get_option( 'active_plugins', array() ) ) ) {
		$captcha_woo_locations = ( array_key_exists( 'captcha_woo_locations', $options ) ) ? $options['captcha_woo_locations'] : array();

		// When in Account page, including when logged-out, showing login / registration / lost password forms.
		if ( is_account_page() ) {
		    if ( in_array( 'woo_login_form', $captcha_woo_locations ) 
				|| in_array( 'woo_password_reset_form', $captcha_woo_locations ) 
				|| in_array( 'woo_registration_form', $captcha_woo_locations ) 
			) {
				asenha_register_altcha_assets__premium_only();
				asenha_enqueue_altcha_assets__premium_only();
			}
		}

		// When in checkout page
		if ( is_checkout() ) {
		    if ( in_array( 'woo_login_form', $captcha_woo_locations ) ) {
				asenha_register_altcha_assets__premium_only();
				asenha_enqueue_altcha_assets__premium_only();
			}
		}
	}
}

/**
 * Register ALTCHA scripts and styles
 * 
 * @since 7.7.0
 */
function asenha_register_altcha_assets__premium_only() {
	wp_register_style( 'asenha-altcha-main', ASENHA_URL . 'assets/premium/css/captcha/altcha/altcha.css', array(), ASENHA_VERSION );
	// wp_enqueue_script( 'asenha-altcha-main', ASENHA_URL . 'assets/premium/js/captcha/altcha/altcha.js', array(), ASENHA_VERSION, false  );
	wp_register_script( 'asenha-altcha-main', ASENHA_URL . 'assets/premium/js/captcha/altcha/altcha.min.js', array(), ASENHA_VERSION, true  );
	wp_register_script( 'asenha-altcha-scripts', ASENHA_URL . 'assets/premium/js/captcha/altcha/script.js', array(), ASENHA_VERSION, false  );
}

/**
 * Enqueue ALTCHA scripts and styles
 * 
 * @since 7.7.0
 */
function asenha_enqueue_altcha_assets__premium_only() {
	wp_enqueue_style( 'asenha-altcha-main' );
	// wp_enqueue_script( 'asenha-altcha-main' );
	wp_enqueue_script( 'asenha-altcha-main' );
	wp_enqueue_script( 'asenha-altcha-scripts' );
}

/**
 * Enqueue Google reCAPTCHA scripts and styles on login, registration and password reset forms/pages
 * 
 * @since 7.7.0
 */
function asenha_login_recaptcha_scripts__premium_only() {
	$options = get_option( 'admin_site_enhancements', array() );
	$captcha_wp_locations = ( array_key_exists( 'captcha_wp_locations', $options ) ) ? $options['captcha_wp_locations'] : array();
    $recaptcha_type = isset( $options['recaptcha_types'] ) ? $options['recaptcha_types'] : 'v2_checkbox';

    if ( in_array( 'wp_login_form', $captcha_wp_locations ) 
		|| in_array( 'wp_password_reset_form', $captcha_wp_locations ) 
		|| in_array( 'wp_registration_form', $captcha_wp_locations ) 
	) {
		// Enqueue scripts and styles for reCAPTCHA v2 "I'm not a robot" checbox
		// v3 scripts/styles is inserted inline via CAPTCHA_Protection_reCAPTCHA->get_recaptcha_html()
		if ( in_array( $recaptcha_type, array( 'v2_checkbox' ) ) ) {
			asenha_register_recaptcha_assets__premium_only();
			asenha_enqueue_recaptcha_assets__premium_only();		
		}
    }
}

/**
 * Enqueue Google reCAPTCHA scripts and styles on the frontend, e.g. on posts with commenting enabled
 * 
 * @since 7.7.0
 */
function asenha_frontend_recaptcha_scripts__premium_only() {
	global $post;
	$disable_comments = new ASENHA\Classes\Disable_Comments;

	$options = get_option( 'admin_site_enhancements', array() );
	$captcha_wp_locations = ( array_key_exists( 'captcha_wp_locations', $options ) ) ? $options['captcha_wp_locations'] : array();
    $recaptcha_type = isset( $options['recaptcha_types'] ) ? $options['recaptcha_types'] : 'v2_checkbox';

	if ( is_object( $post ) && property_exists( $post, 'comment_status' ) ) {
		if ( property_exists( $post, 'post_type' ) ) {
			$is_commenting_disabled_for_post_type = $disable_comments->is_commenting_disabled_for_post_type( $post->post_type );
		} else {
			$is_commenting_disabled_for_post_type = false;	
		}

		// Enqueue on posts with commenting enabled
		if ( 'open' == $post->comment_status 
			&& ! $is_commenting_disabled_for_post_type
			&&  in_array( 'wp_comment_form', $captcha_wp_locations )
		) {
			// Enqueue scripts and styles for reCAPTCHA v2 "I'm not a robot" checbox
			// v3 scripts/styles is inserted inline via CAPTCHA_Protection_reCAPTCHA->get_recaptcha_html()
			if ( in_array( $recaptcha_type, array( 'v2_checkbox' ) ) ) {
				asenha_register_recaptcha_assets__premium_only();
				asenha_enqueue_recaptcha_assets__premium_only();		
			}
		}		
	}

    // When WooCommerce is active
	if ( in_array( 'woocommerce/woocommerce.php', get_option( 'active_plugins', array() ) ) ) {
		$captcha_woo_locations = ( array_key_exists( 'captcha_woo_locations', $options ) ) ? $options['captcha_woo_locations'] : array();

		// When in Account page, including when logged-out, showing login / registration / lost password forms.
		if ( is_account_page()) {
		    if ( in_array( 'woo_login_form', $captcha_woo_locations ) 
				|| in_array( 'woo_password_reset_form', $captcha_woo_locations ) 
				|| in_array( 'woo_registration_form', $captcha_woo_locations ) 
			) {
				asenha_register_recaptcha_assets__premium_only();
				asenha_enqueue_recaptcha_assets__premium_only();
			}
		}

		// When in checkout page
		if ( is_checkout() ) {
		    if ( in_array( 'woo_login_form', $captcha_woo_locations ) ) {
				asenha_register_recaptcha_assets__premium_only();
				asenha_enqueue_recaptcha_assets__premium_only();
			}
		}
	}
}

/**
 * Register Google reCAPTCHA scripts and styles
 * 
 * @since 7.7.0
 */
function asenha_register_recaptcha_assets__premium_only() {
	$src = 'https://www.google.com/recaptcha/api.js';
    wp_enqueue_script( 'asenha-recaptcha', $src, array(), ASENHA_VERSION, true );
	// wp_enqueue_script( 'asenha-recaptcha-helper', ASENHA_URL . 'assets/premium/js/captcha/recaptcha/helper.js', array(), ASENHA_VERSION, false );
    wp_enqueue_style( 'asenha-recaptcha', ASENHA_URL . 'assets/premium/css/captcha/recaptcha/recaptcha.css', array(), ASENHA_VERSION );
}

/**
 * Enqueue Google reCAPTCHA scripts and styles
 * 
 * @since 7.7.0
 */
function asenha_enqueue_recaptcha_assets__premium_only() {
	$src = 'https://www.google.com/recaptcha/api.js';
    wp_enqueue_script( 'asenha-recaptcha' );
	// wp_enqueue_script( 'asenha-recaptcha-helper' );
    wp_enqueue_style( 'asenha-recaptcha' );
}
/**
 * Enqueue Cloudflare Turnstile scripts and styles on login, registration and password reset forms/pages
 * 
 * @since 7.7.0
 */
function asenha_login_turnstile_scripts__premium_only() {
	$options = get_option( 'admin_site_enhancements', array() );
	$captcha_wp_locations = ( array_key_exists( 'captcha_wp_locations', $options ) ) ? $options['captcha_wp_locations'] : array();
    $recaptcha_type = isset( $options['recaptcha_types'] ) ? $options['recaptcha_types'] : 'v2_checkbox';

    if ( in_array( 'wp_login_form', $captcha_wp_locations ) 
		|| in_array( 'wp_password_reset_form', $captcha_wp_locations ) 
		|| in_array( 'wp_registration_form', $captcha_wp_locations ) 
	) {
		asenha_register_turnstile_assets__premium_only();
		asenha_enqueue_turnstile_assets__premium_only();		
    }	
}

/**
 * Enqueue Cloudflare Turnstile scripts and styles on the frontend, e.g. on posts with commenting enabled
 * 
 * @since 7.7.0
 */
function asenha_frontend_turnstile_scripts__premium_only() {
	global $post;
	$disable_comments = new ASENHA\Classes\Disable_Comments;

	$options = get_option( 'admin_site_enhancements', array() );
	$captcha_wp_locations = ( array_key_exists( 'captcha_wp_locations', $options ) ) ? $options['captcha_wp_locations'] : array();
    $recaptcha_type = isset( $options['recaptcha_types'] ) ? $options['recaptcha_types'] : 'v2_checkbox';

	if ( is_object( $post ) && property_exists( $post, 'comment_status' ) ) {
		if ( property_exists( $post, 'post_type' ) ) {
			$is_commenting_disabled_for_post_type = $disable_comments->is_commenting_disabled_for_post_type( $post->post_type );
		} else {
			$is_commenting_disabled_for_post_type = false;	
		}

		// Enqueue on posts with commenting enabled
		if ( 'open' == $post->comment_status 
			&& ! $is_commenting_disabled_for_post_type
			&&  in_array( 'wp_comment_form', $captcha_wp_locations )
		) {
			asenha_register_turnstile_assets__premium_only();
			asenha_enqueue_turnstile_assets__premium_only();		
		}		
	}

    // When WooCommerce is active
	if ( in_array( 'woocommerce/woocommerce.php', get_option( 'active_plugins', array() ) ) ) {
		$captcha_woo_locations = ( array_key_exists( 'captcha_woo_locations', $options ) ) ? $options['captcha_woo_locations'] : array();

		// When in Account page, including when logged-out, showing login / registration / lost password forms.
		if ( is_account_page() ) {
		    if ( in_array( 'woo_login_form', $captcha_woo_locations ) 
				|| in_array( 'woo_password_reset_form', $captcha_woo_locations ) 
				|| in_array( 'woo_registration_form', $captcha_woo_locations ) 
			) {
				asenha_register_turnstile_assets__premium_only();
				asenha_enqueue_turnstile_assets__premium_only();
			}
		}

		// When in checkout page
		if ( is_checkout() ) {
		    if ( in_array( 'woo_login_form', $captcha_woo_locations ) ) {
		    	asenha_register_turnstile_assets__premium_only();
				asenha_enqueue_turnstile_assets__premium_only();
			}
		}
	}
}

/**
 * Register Cloudflare Turnstile scripts and styles
 * 
 * @since 7.7.0
 */
function asenha_register_turnstile_assets__premium_only() {
	wp_enqueue_style( 'asenha-turnstile-main', ASENHA_URL . 'assets/premium/css/captcha/turnstile/turnstile.css', array(), ASENHA_VERSION );
	$defer = array( 'strategy' => 'defer' );
	wp_enqueue_script( 'asenha-turnstile', 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit', array(), null, $defer );
	/* Disable Submit Button */
	wp_enqueue_script( 'asenha-turnstile-disable-submit', ASENHA_URL . 'assets/premium/js/captcha/turnstile/disable-submit.js', '', ASENHA_VERSION, $defer);
}

/**
 * Enqueue Cloudflare Turnstile scripts and styles
 * 
 * @since 7.7.0
 */
function asenha_enqueue_turnstile_assets__premium_only() {
	wp_enqueue_style( 'asenha-turnstile-main' );
	wp_enqueue_script( 'asenha-turnstile' );
	/* Disable Submit Button */
	wp_enqueue_script( 'asenha-turnstile-disable-submit' );
}
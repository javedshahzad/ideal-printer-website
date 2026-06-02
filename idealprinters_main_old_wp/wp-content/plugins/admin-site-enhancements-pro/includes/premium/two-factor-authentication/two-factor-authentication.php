<?php
/**
 * Two-Factor Authentication (2FA) module (ASE Pro).
 *
 * Forked from the Two-Factor plugin v0.14.2 and embedded into ASE Pro.
 * Only Email, TOTP and Recovery Codes providers are included.
 *
 * @since 8.2.4
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Detect if the standalone Two-Factor plugin is active (single site or network) or already loaded.
 *
 * @since 8.2.4
 *
 * @return bool
 */
function asenha_is_standalone_two_factor_active__premium_only() {
	// If the class is already loaded, we must not load our fork to avoid fatal redeclarations.
	if ( class_exists( 'Two_Factor_Core', false ) || defined( 'TWO_FACTOR_VERSION' ) ) {
		return true;
	}

	$plugin_basename = 'two-factor/two-factor.php';

	$active_plugins = (array) get_option( 'active_plugins', array() );
	if ( in_array( $plugin_basename, $active_plugins, true ) ) {
		return true;
	}

	$network_active_plugins = (array) get_site_option( 'active_sitewide_plugins', array() );
	if ( isset( $network_active_plugins[ $plugin_basename ] ) ) {
		return true;
	}

	return false;
}

/**
 * Admin notice shown when a conflict is detected with the standalone Two-Factor plugin.
 *
 * @since 8.2.4
 *
 * @return void
 */
function asenha_two_factor_conflict_notice__premium_only() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$message = __(
		'ASE Pro: Two-Factor Authentication (2FA) is not loaded because the standalone “Two-Factor” plugin is active. Please deactivate the standalone plugin to avoid conflicts.',
		'admin-site-enhancements'
	);

	echo '<div class="notice notice-warning"><p>' . esc_html( $message ) . '</p></div>';
}

/**
 * Filter Two-Factor providers to only the methods selected in ASE settings.
 *
 * @since 8.2.4
 *
 * @param array $providers A key-value array where the key is the class name, and the value is the path.
 * @return array
 */
function asenha_two_factor_filter_providers__premium_only( $providers ) {
	$providers = is_array( $providers ) ? $providers : array();

	$options = get_option( ASENHA_SLUG_U, array() );
	$selected = isset( $options['two_factor_available_providers'] ) && is_array( $options['two_factor_available_providers'] )
		? $options['two_factor_available_providers']
		: array( 'totp', 'recovery_codes', 'email' );

	$map = array(
		'totp'         		=> 'Two_Factor_Totp',
		'recovery_codes' 	=> 'Two_Factor_Backup_Codes',
		'email'        		=> 'Two_Factor_Email',
	);

	$filtered = array();

	foreach ( $selected as $key ) {
		// Back-compat: accept legacy provider key.
		if ( 'backup_codes' === $key ) {
			$key = 'recovery_codes';
		}

		if ( isset( $map[ $key ] ) && isset( $providers[ $map[ $key ] ] ) ) {
			$filtered[ $map[ $key ] ] = $providers[ $map[ $key ] ];
		}
	}

	// Always keep at least one provider available to avoid locking users out.
	if ( empty( $filtered ) && isset( $providers['Two_Factor_Email'] ) ) {
		$filtered['Two_Factor_Email'] = $providers['Two_Factor_Email'];
	}

	return $filtered;
}

/**
 * Filter email token TTL used by the Email provider.
 *
 * @since 8.2.4
 *
 * @param int $ttl     TTL in seconds.
 * @param int $user_id User ID.
 * @return int
 */
function asenha_two_factor_email_token_ttl__premium_only( $ttl, $user_id ) {
	$options = get_option( ASENHA_SLUG_U, array() );
	$ttl     = isset( $options['two_factor_email_token_ttl'] ) ? absint( $options['two_factor_email_token_ttl'] ) : 60;

	$allowed = array( 30, 60, 90, 180, 300, 600 );
	if ( ! in_array( $ttl, $allowed, true ) ) {
		$ttl = 60;
	}

	return $ttl;
}

/**
 * Check whether the current user is required to enable 2FA.
 *
 * @since 8.2.4
 *
 * @return bool
 */
function asenha_two_factor_is_required_for_current_user__premium_only() {
	$user_id = get_current_user_id();
	if ( ! $user_id ) {
		return false;
	}

	$user = get_user_by( 'id', $user_id );
	if ( ! $user instanceof WP_User ) {
		return false;
	}

	return asenha_two_factor_is_required_for_user__premium_only( $user );
}

/**
 * Check whether a specific user is required to enable 2FA.
 *
 * @since 8.2.4
 *
 * @param WP_User|int $user User object or user ID.
 * @return bool
 */
function asenha_two_factor_is_required_for_user__premium_only( $user ) {
	if ( is_numeric( $user ) ) {
		$user = get_user_by( 'id', absint( $user ) );
	}

	if ( ! $user instanceof WP_User ) {
		return false;
	}

	$options = get_option( ASENHA_SLUG_U, array() );
	$roles_map = isset( $options['two_factor_enforce_for'] ) && is_array( $options['two_factor_enforce_for'] ) ? $options['two_factor_enforce_for'] : array();

	foreach ( (array) $user->roles as $role_slug ) {
		if ( ! empty( $roles_map[ $role_slug ] ) ) {
			return true;
		}
	}

	return false;
}

/**
 * Determine whether to show Two-Factor options UI for a user.
 *
 * @since 8.2.4
 *
 * @param bool    $show Whether the UI should be shown.
 * @param WP_User $user The user being edited.
 * @return bool
 */
function asenha_two_factor_show_user_options__premium_only( $show, $user ) {
	return asenha_two_factor_is_required_for_user__premium_only( $user );
}

/**
 * Get the grace-period duration in seconds.
 *
 * @since 8.2.4
 *
 * @return int
 */
function asenha_two_factor_get_grace_period_seconds__premium_only() {
	$options = get_option( ASENHA_SLUG_U, array() );
	$days    = isset( $options['two_factor_enforce_grace_days'] ) ? absint( $options['two_factor_enforce_grace_days'] ) : 14;

	$allowed = array( 0, 1, 3, 7, 14, 30, 60, 90 );
	if ( ! in_array( $days, $allowed, true ) ) {
		$days = 14;
	}

	return $days * DAY_IN_SECONDS;
}

/**
 * Enforce 2FA in wp-admin after grace period by redirecting to Profile.
 *
 * @since 8.2.4
 *
 * @return void
 */
function asenha_two_factor_enforce_in_admin__premium_only() {
	if ( ! is_admin() || wp_doing_ajax() ) {
		return;
	}

	$user_id = get_current_user_id();
	if ( ! $user_id ) {
		return;
	}

	if ( ! asenha_two_factor_is_required_for_current_user__premium_only() ) {
		delete_user_meta( $user_id, 'asenha_2fa_grace_started_at' );
		return;
	}

	// If the user already has 2FA enabled/configured, clear grace tracking and allow.
	if ( class_exists( 'Two_Factor_Core' ) && Two_Factor_Core::is_user_using_two_factor( $user_id ) ) {
		delete_user_meta( $user_id, 'asenha_2fa_grace_started_at' );
		return;
	}

	$grace_seconds = asenha_two_factor_get_grace_period_seconds__premium_only();

	$started_at = (int) get_user_meta( $user_id, 'asenha_2fa_grace_started_at', true );
	if ( ! $started_at ) {
		$started_at = time();
		update_user_meta( $user_id, 'asenha_2fa_grace_started_at', $started_at );
	}

	$expired = ( 0 === $grace_seconds ) ? true : ( time() > ( $started_at + $grace_seconds ) );

	// Allow access to profile + logout (and self user-edit) so the user can configure 2FA.
	global $pagenow;
	$allowed = array( 'profile.php', 'wp-login.php' );

	if ( in_array( $pagenow, $allowed, true ) ) {
		return;
	}

	if ( 'user-edit.php' === $pagenow ) {
		$editing_user_id = isset( $_GET['user_id'] ) ? absint( $_GET['user_id'] ) : 0; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ( $editing_user_id === $user_id ) {
			return;
		}
	}

	if ( ! $expired ) {
		return;
	}

	wp_safe_redirect( self_admin_url( 'profile.php#two-factor-options' ) );
	exit;
}

/**
 * Show a notice during grace period prompting the user to set up 2FA.
 *
 * @since 8.2.4
 *
 * @return void
 */
function asenha_two_factor_grace_notice__premium_only() {
	if ( ! is_admin() || wp_doing_ajax() ) {
		return;
	}

	$user_id = get_current_user_id();
	if ( ! $user_id ) {
		return;
	}

	if ( ! asenha_two_factor_is_required_for_current_user__premium_only() ) {
		return;
	}

	if ( class_exists( 'Two_Factor_Core' ) && Two_Factor_Core::is_user_using_two_factor( $user_id ) ) {
		return;
	}

	$grace_seconds = asenha_two_factor_get_grace_period_seconds__premium_only();
	if ( 0 === $grace_seconds ) {
		// No grace period: enforcement will redirect on next admin_init.
		return;
	}

	$started_at = (int) get_user_meta( $user_id, 'asenha_2fa_grace_started_at', true );
	if ( ! $started_at ) {
		return;
	}

	$expires_at = $started_at + $grace_seconds;
	if ( time() > $expires_at ) {
		return;
	}

	$days_left = (int) ceil( max( 1, ( $expires_at - time() ) / DAY_IN_SECONDS ) );

	$message = sprintf(
		/* translators: %d: number of days remaining */
		__( 'Two-Factor Authentication (2FA) is required for your role. Please set up 2FA within %d day(s) to keep access to wp-admin enabled.', 'admin-site-enhancements' ),
		$days_left
	);

	$link = self_admin_url( 'profile.php#two-factor-options' );

	echo '<div class="notice notice-warning"><p>' . esc_html( $message ) . ' <a href="' . esc_url( $link ) . '" class="button">' . esc_html__( 'Set Up Now', 'admin-site-enhancements' ) . '</a></p></div>';
}

/**
 * Initialize the embedded Two-Factor fork and ASE glue code.
 *
 * @since 8.2.4
 *
 * @return void
 */
function asenha_two_factor_authentication_init__premium_only() {
	if ( asenha_is_standalone_two_factor_active__premium_only() ) {
		add_action( 'admin_notices', 'asenha_two_factor_conflict_notice__premium_only' );
		add_action( 'network_admin_notices', 'asenha_two_factor_conflict_notice__premium_only' );
		return;
	}

	// Load the embedded Two-Factor plugin code (forked).
	require_once ASENHA_PATH . 'includes/premium/two-factor-authentication/two-factor/two-factor.php';

	// Enforce provider availability (Email/TOTP/Backup Codes only).
	add_filter( 'two_factor_providers', 'asenha_two_factor_filter_providers__premium_only', 999 );

	// Email token TTL.
	add_filter( 'two_factor_email_token_ttl', 'asenha_two_factor_email_token_ttl__premium_only', 10, 2 );

	// REST/XML-RPC application passwords restriction: optional.
	$options = get_option( ASENHA_SLUG_U, array() );
	$restrict_api = isset( $options['two_factor_restrict_api_login_to_app_passwords'] ) ? (bool) $options['two_factor_restrict_api_login_to_app_passwords'] : true;
	if ( ! $restrict_api ) {
		add_filter( 'two_factor_user_api_login_enable', '__return_true', 999, 2 );
	}

	// Enforcement in wp-admin.
	add_action( 'admin_init', 'asenha_two_factor_enforce_in_admin__premium_only', 0 );
	add_action( 'admin_notices', 'asenha_two_factor_grace_notice__premium_only' );

	// Only show 2FA options UI for required roles.
	add_filter( 'asenha_two_factor_show_user_options', 'asenha_two_factor_show_user_options__premium_only', 10, 2 );
}

// Initialize after all plugins are loaded so we can reliably detect conflicts.
add_action( 'plugins_loaded', 'asenha_two_factor_authentication_init__premium_only', 20 );


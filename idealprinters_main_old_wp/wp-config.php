<?php
define( 'WP_CACHE', true );

 // By SiteGround Optimizer


// BEGIN A2 CONFIG
// END A2 CONFIG
 // Added by WP Rocket

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'idealprinters_wp_taqex' );

/** MySQL database username */
define( 'DB_USER', 'idealprinters_wp_r6mzd' );

/** MySQL database password */
define( 'DB_PASSWORD', '!LMP3JLt3qM9%iGc' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost:3306' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', '64|7qH[[wRn!8R/Z)-XwkhsSAPQD@I13i~#G#%@SJ/:_6r)W(D77B356vN0oH(:P');
define('SECURE_AUTH_KEY', 'TD1H1QPGq)N+01g*q!O36|6OaN76Zfffli[&vQzspSo38z(yWtY8W@H!COS|5_1N');
define('LOGGED_IN_KEY', 'UOI~9X(ji83W#66_Yo87nfOp:k;u)~_IG7Hhk%@@%IY8iB-Do0886&meP*ZKqT18');
define('NONCE_KEY', '4uak6q:UWEKgewd85B#)3&44m&3ZYA8ejJ52j3CatSi24*392)*@#*L)[GFF_f!U');
define('AUTH_SALT', 't|zax~)u725o[7I7pDgNay]f&h;+4O0Jd@_oZWCgfH~;9A_DH*&5b!g;]7Y_/r4W');
define('SECURE_AUTH_SALT', 'rONw~[F|s56-@Zz0)Km;8i0NuS[KPq#yI9qrv&2BY11_j1V48|5;*7W9~1ek7ut]');
define('LOGGED_IN_SALT', 'Qhg7Ihb-dz#jO~YA7:Ek4E6*:Lj/25~0@l%4u(Y1hXWLm7@1i+kiZIzg/51/|C9n');
define('NONCE_SALT', '&4f]PLD0*j8JHXYue2*T9mr-;O+96pT:)d23@27;;&k8/hs(jF)8@w[u#6Nw_0&0');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'XghVEHQ_';


define('WP_ALLOW_MULTISITE', true);
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

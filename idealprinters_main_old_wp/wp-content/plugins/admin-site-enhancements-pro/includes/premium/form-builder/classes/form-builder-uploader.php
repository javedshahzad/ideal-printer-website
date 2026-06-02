<?php

/**
 * Handle file uploads via XMLHttpRequest
 */
class Form_Builder_Uploaded_File_Xhr {

    /**
     * Save the file to the specified path
     * @return boolean TRUE on success
     */
    function save( $path ) {
        $input = fopen("php://input", "r");

        if ( function_exists( 'tmpfile' ) ) {
            $temp = tmpfile();
            $realSize = stream_copy_to_stream( $input, $temp );
            fclose( $input );

            if ( $realSize != $this->getSize() ) {
                return false;
            }

            $target = fopen( $path, "w");
            fseek( $temp, 0, SEEK_SET);
            stream_copy_to_stream( $temp, $target );
            fclose( $target );
            return true;            
        } else {
            return false;
        }
    }

    function getName() {
        return Form_Builder_Helper::get_var( 'qqfile' );
    }

    function getSize() {
        if ( isset( $_SERVER["CONTENT_LENGTH"] ) ) {
            return (int ) $_SERVER["CONTENT_LENGTH"];
        } else {
            throw new Exception(esc_html__( 'Getting content length is not supported.', 'admin-site-enhancements' ) );
        }
    }

}

class Form_Builder_File_Uploader {

    private $allowedExtensions = array();
    private $sizeLimit = 10485760;
    private $file;

    function __construct( array $allowedExtensions = array(), $sizeLimit = 10485760 ) {
        $allowedExtensions = array_map( 'strtolower', $allowedExtensions );
        //$unallowed_extensions = array( 'php', 'exe', 'ini', 'perl' );
        $exts = array_keys(get_allowed_mime_types() );

        $available_exts = array();
        foreach ( $exts as $ext ) {
            $array = explode( '|', $ext );
            foreach ( $array as $a ) {
                $available_exts[] = $a;
            }
        }

        $count = 0;
        foreach ( $allowedExtensions as $ext ) {
            if ( ! in_array( $ext, $available_exts ) ) {
                unset( $allowedExtensions[$count] );
            }
            $count++;
        }

        $this->allowedExtensions = $allowedExtensions;
        $this->sizeLimit = $sizeLimit;
        $this->checkServerSettings();

        if ( Form_Builder_Helper::get_var( 'qqfile' ) ) {
            $this->file = new Form_Builder_Uploaded_File_Xhr();
        } else {
            $this->file = false;
        }
    }

    private function checkServerSettings() {
        $postSize = $this->toBytes(ini_get( 'post_max_size' ) );
        $uploadSize = $this->toBytes(ini_get( 'upload_max_filesize' ) );

        if ( $postSize < $this->sizeLimit || $uploadSize < $this->sizeLimit ) {
            $size = max( 1, $this->sizeLimit / 1024 / 1024 ) . 'M';
            die("{'error':'increase post_max_size and upload_max_filesize to $size'}");
        }
    }

    private function toBytes( $str ) {
        $val = trim( $str );
        $last = strtolower( $str[strlen( $str ) - 1] );
        $val = floatval( $val );
        switch ( $last ) {
            case 'g':
                $val *= 1024 * 1024 * 1024;
            case 'm':
                $val *= 1024 * 1024;
            case 'k':
                $val *= 1024;
        }

        return $val;
    }

    function handleUpload( $uploadDirectory, $replaceOldFile = false, $upload_url = '' ) {
        $this->ensureUploadDirectory( $uploadDirectory );
        $uploadDirectory = trailingslashit( $uploadDirectory . '/temp' );
        $upload_url = $upload_url . '/temp';
        $unallowed_extensions = array( 'php', 'php3', 'php4', 'php5', 'php7', 'php8', 'phtml', 'phar', 'inc', 'cgi', 'asp', 'aspx', 'jsp', 'exe', 'ini', 'perl', 'pl', 'py', 'sh' );

        if ( ! is_writable( $uploadDirectory ) ) {
            return array( 'error' => esc_html__( 'Server error. Upload directory isn\'t writable.', 'admin-site-enhancements' ) );
        }

        if ( ! $this->file ) {
            return array( 'error' => esc_html__( 'No files were uploaded.', 'admin-site-enhancements' ) );
        }

        $size = $this->file->getSize();

        if ( $size == 0 ) {
            return array( 'error' => esc_html__( 'File is empty', 'admin-site-enhancements' ) );
        }

        if ( $size > $this->sizeLimit ) {
            return array( 'error' => esc_html__( 'File is too large', 'admin-site-enhancements' ) );
        }

        $file_name = wp_basename( $this->file->getName() );
        $file_name = sanitize_file_name( $file_name );
        $pathinfo = pathinfo( $file_name );
        $filename = isset( $pathinfo['filename'] ) ? $pathinfo['filename'] : '';
        $ext = isset( $pathinfo['extension'] ) ? strtolower( $pathinfo['extension'] ) : '';

        if ( empty( $filename ) || empty( $ext ) ) {
            return array( 'error' => esc_html__( 'Invalid file name.', 'admin-site-enhancements' ) );
        }

        if ( in_array(strtolower( $ext ), $unallowed_extensions ) ) {
            return array( 'error' => esc_html__( 'This type of file is not allowed.', 'admin-site-enhancements' ) );
        }

        if ( $this->allowedExtensions && ! in_array(strtolower( $ext ), $this->allowedExtensions ) ) {
            $these = implode( ', ', $this->allowedExtensions );
            return array( 'error' => esc_html__( 'File has an invalid extension, it should be one of', 'admin-site-enhancements' ) . ' ' . $these . '.' );
        }

        if ( ! $replaceOldFile ) {
            /// don't overwrite previous files that were uploaded
            while ( file_exists( $uploadDirectory . $filename . '.' . $ext ) ) {
                $filename .= '-' . rand( 10, 99 );
            }
        }
        
        if ( ! function_exists( 'tmpfile' ) ) {
            return array( 'error' => esc_html__( 'Upload failed because the tmpfile() PHP function is disabled / not available. Please enable it first.', 'admin-site-enhancements' ) );            
        }

        $target_file = $uploadDirectory . $filename . '.' . $ext;

        if ( $this->file->save( $target_file ) ) {
            if ( ! $this->has_valid_file_type( $target_file, $ext ) ) {
                @unlink( $target_file );
                return array(
                    'error' => esc_html__( 'This file content does not match the expected file type.', 'admin-site-enhancements' )
                );
            }

            return array(
                'success' => true,
                'url' => $upload_url . '/' . $filename . '.' . $ext,
                'path' => Form_Builder_Helper::encrypt( $filename . '.' . $ext )
            );
        } else {
            return array(
                'error' => esc_html__( 'Could not save uploaded file. The upload was cancelled, or server error encountered.', 'admin-site-enhancements' )
            );
        }
    }

    private function has_valid_file_type( $file_path, $expected_ext ) {
        $file_name = wp_basename( $file_path );
        $filetype = wp_check_filetype_and_ext( $file_path, $file_name, get_allowed_mime_types() );

        if ( empty( $filetype['ext'] ) || empty( $filetype['type'] ) ) {
            return false;
        }

        $resolved_name = ! empty( $filetype['proper_filename'] ) ? $filetype['proper_filename'] : $file_name;
        $resolved_ext = strtolower( pathinfo( $resolved_name, PATHINFO_EXTENSION ) );

        if ( empty( $resolved_ext ) || $resolved_ext !== strtolower( $expected_ext ) ) {
            return false;
        }

        return true;
    }

    protected function ensureUploadDirectory( $path ) {
        if ( ! is_dir( $path ) ) {
            mkdir( $path, 0755 );
        }

        if ( ! is_dir( $path . '/temp' ) ) {
            mkdir( $path . '/temp', 0755 );
        }

        if ( ! file_exists( $path . '/.htaccess' ) ) {
            file_put_contents( $path . '/.htaccess', file_get_contents( FORMBUILDER_PATH . 'includes/stubs/htaccess.stub' ) );
        }

        if ( ! file_exists( $path . '/temp/.htaccess' ) ) {
            file_put_contents( $path . '/temp/.htaccess', file_get_contents( FORMBUILDER_PATH . 'includes/stubs/htaccess.stub' ) );
        }

        if ( file_exists( FORMBUILDER_PATH . 'includes/stubs/web.config.stub' ) && ! file_exists( $path . '/web.config' ) ) {
            file_put_contents( $path . '/web.config', file_get_contents( FORMBUILDER_PATH . 'includes/stubs/web.config.stub' ) );
        }

        if ( file_exists( FORMBUILDER_PATH . 'includes/stubs/web.config.stub' ) && ! file_exists( $path . '/temp/web.config' ) ) {
            file_put_contents( $path . '/temp/web.config', file_get_contents( FORMBUILDER_PATH . 'includes/stubs/web.config.stub' ) );
        }

        if ( ! file_exists( $path . '/index.php' ) ) {
            file_put_contents( $path . '/index.php', file_get_contents( FORMBUILDER_PATH . 'includes/stubs/index.stub' ) );
        }

        if ( ! file_exists( $path . '/temp/index.php' ) ) {
            file_put_contents( $path . '/temp/index.php', file_get_contents( FORMBUILDER_PATH . 'includes/stubs/index.stub' ) );
        }
    }

}

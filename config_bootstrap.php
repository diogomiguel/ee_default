<?php
/**
* Custom configuration bootsrtap file for ExpressionEngine
*
* Place config.php in your site root
* Add require(realpath(dirname(__FILE__) . '/../../config_bootstrap.php')); to the bottom of system/expressionengine/config/config.php
* Add require(realpath(dirname(__FILE__) . '/../../config_bootstrap.php')); to the bottom of system/expressionengine/config/database.php
* If you have moved your site root you'll need to update the require_once path
*
* Also includes custom DB configuration file based on your environment
*
* Posiible DB configuration options
*
* $env_db_config['hostname'] = "";
* $env_db_config['username'] = "";
* $env_db_config['password'] = "";
* $env_db_config['database'] = "";
* 
* @author Leevi Graham <http://leevigraham.com>
* @link http://expressionengine.com/index.php?affiliate=leevigraham&page=wiki/EE_2_Config_Overrides/
* @link http://eeinsider.com/blog/eeci-2010-how-erskine-rolls-with-ee/ - Hat tip to: Erskine from EECI2010 Preso
* @version 1.10
*
* == Changelog ==
*
* Version 1.1
*     - Changed 'gv_' to 'global:'
*     - Added {global:cm_subscriber_list_slug} for campaignmonitor.com integration
*     - Added {global:google_analytics_key} for Google Analytics integration
*     - Make $_POST array available as global vars with 'post:' prefix
*     - Make $_GET array available as global vars with 'get:' prefix
*     - Added more inline commenting
*     - Swapped order of system config and global vars
*
* Version 1.2
*     - Removed $_GET and $_POST parsing. You should use Mo Variables instead. https://github.com/rsanchez/mo_variables
*
* Version 1.3
*     - Added encryption key
*
* Version 1.4
*     - Updated NSM .htaccess path. v1.1.0 of the addon requires the config setting to be an array
*
* Version 1.5
*     - Added global:404_entry_id
*
* Version 1.6
*     - Added SSL support for site url
*
* Version 1.7
*     - Added placeholder config for upload directories
*
* Version 1.8
*     - Added $_GET['debug'] param to help with support
*
* Version 1.9
*     - Added $config['third_party'] param to ease updating
*     - Added $config['base_url']
*     - Moved webmaster_email config into dev environment
*
* Version 1.10
*     - Added changed $config['third_party'] to $config['third_party_path']
*     - Added $config['path_third_themes']
*     - Added $config['url_third_themes']
*/

/**
 * config_bootstrap.php is included multiple times during the request
 * PHP Only allows constants to be defined once so we check first
 */
if(!defined('NSM_ENV')) {

    // Set your system folder
    define('NSM_SYSTEM_FOLDER', 'EE-default');

    // Define the server name, basepath and site_url
    // These can all be defined using the server request and filepath
    define('NSM_SERVER_NAME', $_SERVER['SERVER_NAME']);
    define('NSM_BASEPATH', dirname(__FILE__));
    define('NSM_SITE_URL', "//".NSM_SERVER_NAME);

    /**
     * Based on the requested server we can determine the environment
     * The following conditionals check the server name for specific strings
     * We use NSM_ENV to define variables latter on in the bootstrap process
     * 
     * Examples:
     * http://local.my-site.com defines NSM_ENV as local
     * http://dev.my-site.com defines NSM_ENV as development
     *
     * strstr() — Find the first occurrence of a string
     * @see http://php.net/manual/en/function.strstr.php
     */
    if ( strstr( NSM_SERVER_NAME, '.loc' ) ) define('NSM_ENV', 'local');
    elseif( strstr( NSM_SERVER_NAME, '24sq.com' ) ) define('NSM_ENV', 'development');
    elseif( strstr( NSM_SERVER_NAME, '24sq.com' ) ) define('NSM_ENV', 'staging');
    elseif( strstr( NSM_SERVER_NAME, 'mobi.' ) ) define('NSM_ENV', 'mobile');
    // Fallback to production settings
    else define('NSM_ENV', 'production');

    // Not sure what environment the request is? 
    // Add ?debug_config_bootstrap to the end of the URL
    if(isset($_GET['debug_config_bootstrap'])) {
        die('The current environment is: '.NSM_ENV);
    }
}
/*
 * Create placeholder arrays for environment settings
 * Environment settings override the global settings (also defined in config_bootstrap.php) and 
 * the standard config.php settings
 */
$env_config = array();
$env_db_config = array();
$env_global_vars = array();

// Comparing NSM_ENV which environment specific configuration will we load?
// Local configuration:
if ('local' === NSM_ENV) { 

    // Environment DB configuration
    $env_db_config = array(
        'hostname' => 'localhost',
        'username' => 'root',
        'password' => '{dsilva}',
        'database' => 'ee_default',
    );

    // Environment config variables
    // Overrides anything in $env_config
    $env_config = array();

    // Environment global vars
    // These will be available in youre templates
    // 'global:' is not required, it's just a naming convention we use @Newism
    // Example: 'global:cm_subscriber_list_slug' will be available in templates as {global:cm_subscriber_list_slug}
    // Overrides anything in $default_global_vars
    $env_global_vars = array(
        'global:cm_subscriber_list_slug' => ''
    );

}
elseif('development' === NSM_ENV) { 
    $env_db_config = array(
        'hostname' => '',
        'username' => '',
        'password' => '',
        'database' => '',
    );
    $env_config = array();
    $env_global_vars = array();
}
elseif('staging' === NSM_ENV) { 
    $env_db_config = array(
        'hostname' => '',
        'username' => '',
        'password' => '',
        'database' => '',
    );
    $env_config = array();
    $env_global_vars = array();
}
/*
elseif('mobile' === NSM_ENV) { 
        $env_db_config = array(
        'hostname' => '',
        'username' => '',
        'password' => '',
        'database' => '',
    );
    $env_config = array(
        // Custom mobile templates?
        'tmpl_file_basepath' => NSM_BASEPATH . '/templates_mobile/'
    );
    $env_global_vars = array();
}
*/
elseif('production' === NSM_ENV) { 
    $env_db_config = array(
        'hostname' => '',
        'username' => '',
        'password' => '',
        'database' => '',
    );
    $env_config = array();
    $env_global_vars = array();
}

// Config bootsrap... GO!
if(isset($config)) {

    /**
    * Custom global variables
    *
    * This is a bit sucky as they are pulled straight from the $assign_to_config array.
    * See EE_Config.php around line 90 or search for: 'global $assign_to_config;'
    * Output the global vars in your template with: 
    * <?php $EE = get_instance(); print('<pre><code>'.print_r($EE->config->_global_vars, TRUE) . '</code></pre>');  ?>
    */
    $default_global_vars = array(
        // General - Set the production environment so we can test / show / hide components
        'global:env'                    => NSM_ENV,

        // Tag parameters - Short hand tag params
        'global:param_disable_default'  => 'disable="categories|pagination|member_data"',
        'global:param_disable_all'      => 'disable="categories|custom_fields|member_data|pagination"',
        'global:param_cache_param'      => 'cache="yes" refresh="10"',
        '-global:param_cache_param'     => '-cache="yes" refresh="10"', // disable by adding a '-' to the front of the global

        // Date and time - Short hand date and time
        'global:date_time'          => '%g:%i %a',
        'global:date_short'         => '%F %d, %Y',
        'global:date_full'          => '%F %d %Y, %g:%i %a',

        /**
         * Theme - URL to theme assets
         * Example: <script src="{global:theme_url}/js/libs/modernizr-1.6.min.js"></script>
         */
        'global:theme_url'          => NSM_SITE_URL . '/themes/site_themes/default',
        
        /**
         * CampaignMonitor - Slug for CM signup forms
         * Example: <form action="http://newism.createsend.com/t/y/s/{global:cm_subscriber_list_slug}/" method="post">...</form>
         */
        'global:cm_subscriber_list_slug' => false,

        /**
         * Google Analytics Key
         * Example: 
         *      <script type="text/javascript"> 
         *          var _gaq = _gaq || []; 
         *          _gaq.push(['_setAccount', 'UA-{global:google_analytics_key}']);  
         *          _gaq.push(['_trackPageview']);
         *      </script>
         */
        'global:google_analytics_key' => false,

        // Store the entry_id for the 404 page
        'global:404_entry_id' => '2',
    );

    // Make this global so we can add some of the config variables here
    global $assign_to_config;

    if(!isset($assign_to_config['global_vars'])) {
        $assign_to_config['global_vars'] = array();        
    }

    $assign_to_config['global_vars'] = array_merge($assign_to_config['global_vars'], $default_global_vars, $env_global_vars);
        
    /**
     * Config. This shouldn't have to be changed if you're using the Newism EE2 template.
     * 
     * All the values below override the default config.php configuration.
     * Setting a value below will also restrict users from changing it in the CP
     * If a user does save a configuration value in the CP:
     *   - it will be written to config.php
     *   - the user will see the value below in the CP
     */
    $default_config = array(

        // General preferences
        'is_system_on' => 'y',
        'license_number' => '',
        'site_index' => '',
        'admin_session_type' => 'cs',
        'new_version_check' => 'y',
        'doc_url' => 'http://expressionengine.com/user_guide/',

        'site_url' => NSM_SITE_URL,
        'base_url' => NSM_SITE_URL,
        'cp_url' => NSM_SITE_URL.'/index.php',

        // Set this so we can use query strings
        // 'uri_protocol' => 'PATH_INFO',



        // Datbase preferences
        'db_debug' => 'n',
        'pconnect' => 'n',
        'enable_db_caching' => 'n',

        // Site preferences
        // Some of these preferences might actually need to be set in the index.php files.
        // Not sure which ones yet, I'll figure that out when I have my first MSM site.
        'is_site_on' => 'y',
        'site_404' => 'site/four04',

        // Localization preferences
        'server_timezone' => 'UP10',
        'server_offset' => FALSE,
        'time_format' => 'eu',
        'daylight_savings' => 'n',
        'honor_entry_dst' => 'y',

        // Channel preferences
        'use_category_name' => 'y',
        'word_separator' => 'dash',
        'reserved_category_word' => 'category',

        // Template preferences
        'strict_urls' => 'y',
        'save_tmpl_files' => 'y',
        'save_tmpl_revisions' => 'y',
        'tmpl_file_basepath' => APPPATH . 'templates/',

        // Theme preferences
        'theme_folder_path' => NSM_BASEPATH . '/public_html/themes/',
        'theme_folder_url' => NSM_SITE_URL . '/themes/',

        // Tracking preferences
        'enable_online_user_tracking' => 'n',
        'dynamic_tracking_disabling' => '500',
        'enable_hit_tracking' => 'n',
        'enable_entry_view_tracking' => 'n',
        'log_referrers' => 'n',

        // Messaging preferences
        'prv_msg_upload_path' => NSM_BASEPATH . '/public_html/images/pm_attachments',
        'enable_emoticons' => 'n',

        // Member preferences
        'allow_registration' => 'n',
        // Create a random string for the member profile trigger
        'profile_trigger' => '--sdjhkj2lffgrerfvmdkndkfisolmfmsd' . time(),

        // Member avatar confiuration
        'enable_avatars' => 'n',
        'avatar_path' => NSM_BASEPATH . '/public_html/images/avatars/',
        'avatar_url' => NSM_SITE_URL . '/images/avatars/',
        'avatar_max_height' => 100,
        'avatar_max_width' => 100,
        'avatar_max_kb' => 100,

        // Member photo configuration
        'enable_photos' => 'n',
        'photo_path' => NSM_BASEPATH . '/public_html/images/member_photos/',
        'photo_url' => NSM_SITE_URL . '/images/member_photos/',
        'photo_max_height' => 200,
        'photo_max_width' => 200,
        'photo_max_kb' => 200,

        // Member signature confiuration
        'sig_allow_img_upload' => 'n',
        'sig_img_path' => NSM_BASEPATH . '/public_html/images/signature_attachments/',
        'sig_img_url' => NSM_SITE_URL . '/images/signature_attachments/',
        'sig_img_max_height' => 80,
        'sig_img_max_width' => 480,
        'sig_img_max_kb' => 30,
        'sig_maxlength' => 500,

        // Captcha settings
        'captcha_font' => 'y',
        'captcha_rand' => 'y',
        'captcha_require_members' => 'n',
        'captcha_path' => NSM_BASEPATH .'/public_html/images/captchas/',
        'captcha_url' => NSM_SITE_URL. '/images/captchas/',

        // Encryption / Session key
        'encryption_key' => '',

				// Stash
				'stash_file_basepath' => APPPATH . 'stash_templates/',
				'stash_file_sync' => (NSM_ENV === 'production' ? FALSE : TRUE),
				'stash_file_extensions' => array('html', 'md', 'css', 'js', 'rss', 'xml'),
				'stash_static_basepath' => NSM_BASEPATH . '/public_html/stash_cache/',
				'stash_static_url' => NSM_SITE_URL . '/stash_cache/',
				'stash_static_cache_enabled' => TRUE, // set to TRUE to enable static caching
				'stash_cookie' => 'stashid', // the stash cookie name
				'stash_cookie_expire' => 0, // seconds - 0 means expire at end of session
				'stash_default_scope' => 'local', // default variable scope if not specified
				'stash_limit_bots' => TRUE, // stop database writes by bots to reduce load on busy sites
				'stash_bots' => array('bot', 'crawl', 'spider', 'archive', 'search', 'java', 'yahoo', 'teoma'),
				
				

        // File Upload config. 
        // @see: http://expressionengine.com/user_guide/general/hidden_configuration_variables.html#upload-preferences
        'upload_preferences' => array(
             1 => array(                                                            // ID of upload destination
                 'name'        => 'Main',                          // Display name in control panel
                 'server_path' => NSM_BASEPATH . '/public_html/images/uploads/', // Server path to upload directory
                 'url'         => NSM_SITE_URL . '/images/uploads/'      // URL of upload directory
             )
         )

        // NSM htaccess Generator Configuration
        // @see: http://ee-garage.com/nsm-htaccess-generator
        // 'nsm_htaccess_generator_path' => array(NSM_BASEPATH . "/content/.htaccess"),

        // NSM Gravatar Configuration
        // @see: https://github.com/newism/nsm.gravatar.ee_addon
        // 'nsm_htaccess_generator_path' => array(
        //     'size' => '200',
        //     'default' => NSM_SITE_URL . '/uploads/member/avatars/default.png',
        //     'force_default' => 'n',
        //     'rating' => 'pg',
        //     'secure' => 'n'
        // )
    );

    // Build the new config object
    $config = array_merge($config, $default_config, $env_config);
}

// DB bootsrap... GO!
if(isset($db['expressionengine']))
{
    $default_db_config = array("cachedir" => APPPATH . "cache/db_cache/");
    $db['expressionengine'] = array_merge($db['expressionengine'], $default_db_config, $env_db_config);
}
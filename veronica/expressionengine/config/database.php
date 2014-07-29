<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$active_group = 'expressionengine';
$active_record = TRUE;

<<<<<<< HEAD
$db['expressionengine']['hostname'] = '';
$db['expressionengine']['username'] = '';
$db['expressionengine']['password'] = '';
$db['expressionengine']['database'] = '';
=======
$db['expressionengine']['hostname'] = 'localhost';
$db['expressionengine']['username'] = 'root';
$db['expressionengine']['password'] = '{dsilva}';
$db['expressionengine']['database'] = 'ee_default';
>>>>>>> d8ab70ea15c98dd8e4ba746ec2fd6eecbb49b052
$db['expressionengine']['dbdriver'] = 'mysql';
$db['expressionengine']['pconnect'] = FALSE;
$db['expressionengine']['dbprefix'] = 'ee_';
$db['expressionengine']['swap_pre'] = 'exp_';
$db['expressionengine']['db_debug'] = TRUE;
$db['expressionengine']['cache_on'] = FALSE;
$db['expressionengine']['autoinit'] = FALSE;
$db['expressionengine']['char_set'] = 'utf8';
$db['expressionengine']['dbcollat'] = 'utf8_general_ci';
$db['expressionengine']['cachedir'] = '/Users/diogomiguelsilva/Sites/EE-default/tina/installer/cache/db_cache/';

/* End of file database.php */
/* Location: ./system/expressionengine/config/database.php */
/* End of file config.php */
/* Location: ./system/expressionengine/config/config.php */
require(realpath(dirname(__FILE__) . '/../../../config_bootstrap.php'));
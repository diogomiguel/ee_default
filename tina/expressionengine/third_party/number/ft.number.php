<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Number_ft extends EE_Fieldtype {

    var $info = array(
        'name'      => 'Number',
        'version'   => '0.1'
    );
		
		var $default_settings = array(
			'min_value' => '',
			'max_value' => '',
			'decimals' => ''
		);
		
		private static $_int_column_sizes = array(
			'tinyint'   => 128,
			'smallint'  => 32768,
			'mediumint' => 8388608,
			'int'       => 2147483648,
			'bigint'    => 9223372036854775808
		);

    // --------------------------------------------------------------------
		
		/**
		 * Constructor
		 */
		function __construct()
		{
			$this->EE =& get_instance();

			// -------------------------------------------
			//  Prepare Cache
			// -------------------------------------------

			if (! isset($this->EE->session->cache['celltypes']['number']))
			{
				$this->EE->session->cache['celltypes']['number'] = array();
			}
			$this->cache =& $this->EE->session->cache['celltypes']['number'];
		}
		
		/**
		 * Prep Settings
		 */
		private function _prep_settings(&$settings)
		{
			$settings = array_merge($this->default_settings, $settings);
			$settings['min_value'] = is_numeric($settings['min_value']) ? $settings['min_value'] : -self::$_int_column_sizes['int'];
			$settings['max_value'] = is_numeric($settings['max_value']) ? $settings['max_value'] : self::$_int_column_sizes['int'] - 1;
			$settings['decimals'] = is_numeric($settings['decimals']) && $settings['decimals'] > 0 ? intval($settings['decimals']) : 0;
		}
		
		/**
		 * Display Settings
		 */
		
		function display_settings($data)
		{
			$data = array_merge(array(
				'min_value' => '',
				'max_value' => '',
				'decimals' => '0'
			), $data);

			$settings =  array(
				array(str_replace(' ', '&nbsp;', 'Min Value'), form_input(array('name'  => 'min_value', 'value' =>$data['min_value']))),
				array(str_replace(' ', '&nbsp;', 'Max Value'), form_input(array('name'  =>'max_value', 'value' =>$data['max_value']))),
				array(str_replace(' ', '&nbsp;', 'Decimals'), form_input(array('name'  =>'decimals',  'value' =>$data['decimals']))),
			);
			
			

	    foreach ($settings AS $row)
	    {
	      $this->EE->table->add_row('<strong>'. $row[0] .'</strong>', $row[1]);
	    }
		}
		
    function display_field($data)
    {
        $this->_prep_settings($this->settings);


				$r = '<input type="text" name="'.$this->field_name.'" rows="1" value="'.$data.'" />';

				return $r;
    }
		
		
		function validate($data)
		{
			$this->EE->lang->loadfile('number');

			if (!strlen($data))
			{
				// is this a required column?
				if ($this->settings['col_required'] == 'y')
				{
					return lang('col_required');
				}
				else
				{
					return TRUE;
				}
			}

			if (!is_numeric(($data)))
			{
				return lang('value_not_numeric');
			}

			if (is_numeric($this->settings['min_value']) && $data < $this->settings['min_value'])
			{
				return str_replace('{min}', $this->settings['min_value'], lang('value_too_small'));
			}

			if (is_numeric($this->settings['max_value']) && $data > $this->settings['max_value'])
			{
				return str_replace('{max}', $this->settings['max_value'], lang('value_too_big'));
			}

			if ($this->settings['decimals'] == 0 && (float) $data != (int) $data)
			{
				return lang('decimals_not_allowed');
			}

			return TRUE;
		}

		/**
		 * Parse tag for number type.
		 * 
		 * @param $data
		 * @param $params
		 * @param $field_tagdata
		 * @return string
		 */
		function replace_tag($data, $params, $field_tagdata)
		{
			if (!empty($params['thousands_sep']))
			{
				if (empty($params['dec_point']))
				{
					$params['dec_point'] = '.';
				}
				$data = number_format($data, $this->settings['decimals'], $params['dec_point'], $params['thousands_sep']);
			}
			return $data;
		}
		
		/**
	   * Save field settings
	   *
	   * @access  public
	   * @param array   $field_settings   The field settings.
	   * @return  array
	   */
	  public function save_settings(Array $field_settings = array())
	  {
	    return $this->_get_posted_settings();
	  }
	
		/**
	   * Returns posted settings in an array, fallback to default
	   *
	   * @access  private
	   * @return  array
	   */
	  private function _get_posted_settings()
	  {
	    $settings = array();

	    foreach ($this->default_settings AS $setting => $value)
	    {
	      if (($settings[$setting] = $this->EE->input->post($setting)) === FALSE)
	      {
	        $settings[$setting] = $value;
	      }
	    }

	    return $settings;
	  }
}
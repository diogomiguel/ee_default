<?php if(!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Matrix Category Column Class for EE2
 * 
 * @package   Matrix Category Column
 * @author    Justin Koivisto <justin.koivisto@gmail.com>
 */
class Matrix_cat_col_ft extends EE_Fieldtype {

	var $info = array(
		'name' 		=> 'Matrix Category Column',
		'version' 	=> '1.0'
	);

	var $default_settings = array(
		'cat_group'	=> '',
		'dir' 		=> 'ltr'
	);

	var $max_length = 75;

	function __construct()
	{
		$this->EE =& get_instance();

		// get cache set up
		if(!isset($this->EE->session->cache['matrix_cat_col']['celltypes']['text'])){
			$this->EE->session->cache['matrix_cat_col']['celltypes']['text'] = array();
		}
		$this->cache =& $this->EE->session->cache['matrix_cat_col']['celltypes']['text'];
	}

	private function _prep_settings(&$settings)
	{
		$settings = array_merge($this->default_settings, $settings);
	}

	private function _theme_url()
	{
		if(!isset($this->cache['theme_url'])){
			if(defined('URL_THIRD_THEMES')){
				$theme_folder_url = URL_THIRD_THEMES;
			}else{
				$theme_folder_url = $this->EE->config->slash_item('theme_folder_url').'third_party/';
			}
			$this->cache['theme_url'] = $theme_folder_url.'matrix_cat_col/';
		}
		return $this->cache['theme_url'];
	}

	private function _include_theme_css($file)
	{
		$this->EE->cp->add_to_foot('<link rel="stylesheet" type="text/css" href="'.$this->_theme_url().$file.'" />');
	}

	function settings_modify_matrix_column($data)
	{
	 	// exp_matrix_data col settings
		return array(
			'col_id_'.$data['col_id'] => array(
				'type' 			=> 'varchar',
				'constraint' 	=> $this->max_length
			)
		);
	}

	function save_cell($data){
		if(empty($data)) return '';

		// now, add the cat ids for this entry from the matrix column
		$cats = array();
		$this->EE->db->select('cat_id');
		$this->EE->db->where('entry_id', $this->settings['entry_id']);
		$q = $this->EE->db->get('category_posts');
		foreach($q->result() as $res){
			$cats[] = $res->cat_id;
		}
		foreach($data as $cat_id){
			// make sure this isn't in there already!
			if(!in_array($cat_id, $cats)){
				$this->EE->db->insert('category_posts', array(
					'entry_id' => $this->settings['entry_id'],
					'cat_id' => $cat_id
				));
				$cats[] = $cat_id;
			}
		}
		
		// lastly, save the data as a pipe-separated list of cat ids for the column
		return implode('|', $data);
	}

	function display_cell_settings($data)
	{
		$this->_prep_settings($data);

		// load lang file
		$this->EE->lang->loadfile('matrix_cat_col');

		$cat_groups = array();
		$this->EE->db->select('group_id, group_name');
		$q = $this->EE->db->get('category_groups');
		foreach($q->result() as $res){
			$cat_groups[$res->group_id] = $res->group_name;
		}

		if(!is_array($data['cat_group'])){
			$data['cat_group'] = array($data['cat_group']);
		}
		
		return array(
			array(
				lang('cat_group'),
				form_dropdown(
					'cat_group',
					$cat_groups,
					$data['cat_group']
				)
			)
		);
	}

	function display_cell($data)
	{
		$this->_prep_settings($this->settings);
		if(!isset($this->cache['displayed'])){
			// include theme css, but only once
			$this->_include_theme_css('matrix_cat_col.css');
			$this->cache['displayed'] = TRUE;
		}

		// set up saved data for use		
        if(!is_array($data)){
            $data = explode('|', $data);
        }

		$output = '';
		$this->EE->db->select('cat_id, cat_name');
		$this->EE->db->where('group_id', intval($this->settings['cat_group']));
		$q = $this->EE->db->get('categories');
		$res = $q->result();
		if(count($res)){
			// display categories in this group in 2 colums
			$cats = array();
			$rows = $q->num_rows;
			$output = '<div class="matrix-cat-col">';
			$half = floor($q->num_rows/2);
			for($i=0;$i<$q->num_rows;$i++){
				$output .= '<input type="checkbox" value="'.$res[$i]->cat_id.'" name="'.$this->cell_name.'[]"';
				if(in_array($res[$i]->cat_id, $data)){
					$output .= ' checked="checked"';
				}
				$output .= ' /> '.$res[$i]->cat_name.'<br/>';
				if($half == $i){
					$output .='</div><div class="matrix-cat-col">';
				}
			}
			$output .= '</div>';
		}
		
		return array(
			'class' => 'matrix-cat-col',
			'data' => $output
		);
	}
	
	public function display_field($data)
	{
	  return $this->display_cell($data);
	}
	
}
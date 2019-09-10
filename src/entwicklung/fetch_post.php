<?php
/**
* ################## ;o) #################
* # @author netwurm
* # @copyright MIT 
* # @version 1.0 
* ################## ;o) #################
* 
*
* 
*/
if (!defined('INCLUDE'))
{
	define('INCLUDE', 'netwurm');
}
require_once($_SERVER["DOCUMENT_ROOT"].'/log/error_log.php');


$temp = print_rr($_POST,true);



function print_rr($content, $return=false)
{
	$output = '<div style="font-size:0.8em;border: 1px solid; height: 300px; resize: both; overflow: auto;"><pre>'
	. print_r($content, true) . '</pre></div>';

	if ($return) {
		return $output;
	} else {
		echo $output;
	}
}




exit(json_encode($temp, JSON_UNESCAPED_SLASHES));

?>
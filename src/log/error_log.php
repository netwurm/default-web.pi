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
error_reporting(E_ALL);
ini_set("display_errors", 1);


if (!defined('INCLUDE') )
{
	die("Noo!");
}

if (!defined('ERROR_LOG_FILE_ICH'))
{
	define('ERROR_LOG_FILE_ICH', str_replace('//','/', $_SERVER['DOCUMENT_ROOT']."/log/.log"));
}

function HANDLER_ERROR_LOG_FILE_ICH($code, $msg, $file, $line)
{
	$logData = date("d-M-Y h:i:s", time()) . ", $code, $msg, $line, $file\n";
	if(@file_exists(ERROR_LOG_FILE_ICH)==true)
	@file_put_contents(ERROR_LOG_FILE_ICH, $logData, FILE_APPEND);
}

//$last_handler = set_error_handler("HANDLER_ERROR_LOG_FILE_ICH");

/* test ERROR */
# echo das_macht_einen_errorlog_eintrag 

?>
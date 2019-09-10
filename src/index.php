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

$BROWSERSYNC = 'on'; // weiterleitung ausschalten


if ($BROWSERSYNC == 'on')
{
	$isSecure = false;
	if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on') {
		$isSecure = true;
	}
	elseif (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https' || !empty($_SERVER['HTTP_X_FORWARDED_SSL']) && $_SERVER['HTTP_X_FORWARDED_SSL'] == 'on') {
		$isSecure = true;
	}


	$domain_local_http_host  = $isSecure ? 'https://'.$_SERVER['HTTP_HOST'] : 'http://'.$_SERVER['HTTP_HOST'];
	$domain_local_browser_sync_port = '8888';
	$domain_local_browser_sync_js = '/browser-sync/browser-sync-client.js?v=2.26.7';
	$domain_local_bs_script ='';
	$domain_local_test_url = $domain_local_http_host.':'.$domain_local_browser_sync_port.$domain_local_browser_sync_js;
	$ctx = stream_context_create(array('http'=>
		array(
		'timeout' => 1,  //2 sekunden
		)
	));

	if (@file_get_contents($domain_local_test_url, false, $ctx) AND strpos($http_response_header[0], "200"))
	{
		/* UMLEITUNG auf Port 80*/
		if(!empty($_SERVER['HTTP_X_BROWSERSYNC']))
		{
			$http_s  = $isSecure ? 'https://' : 'http://';
			$domain_local_bs_script ="
			<script>
			/*alert('".$http_s."'+window.location.hostname+':80'+window.location.pathname+window.location.search);*/
			window.location = '".$http_s."'+window.location.hostname+':80'+window.location.pathname+window.location.search;
			</script>
			";
		}
		else
		{
			$domain_local_bs_script ='
			<script id="__bs_script__">//<![CDATA[
			document.write("<script async src=\''.$domain_local_test_url.'\'><\/script>".replace("HOST", location.hostname));
			//]]>
			</script>
			';
		}
	}
	else
	{
		$BROWSERSYNC = 'off';
	}
}

$bluma = 'Bulma PHP Template';

$template =<<<content_
<!DOCTYPE html>
<html>
    <head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Hello Bulma!</title>
	<link rel="stylesheet" href="css/app.css">
	<script>var exports = {"__esModule": true};</script>
	{$domain_local_bs_script}
	<script src="js/app.js"></script>
	<script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
    </head>
    <body>
	<section class="section">
	    <div class="container">
		<h1 class="title">
		    Hello World ! 
		</h1>
		<p class="subtitle">
		    My first website with <strong>{$bluma} :: BROWSERSYNC:: $BROWSERSYNC </strong>!
		</p>
		<input class="input" type="text" placeholder="Test AJAX  -> debounce 500 -> entwicklung/fetch_post.php " id="autocomplete">
		<hr>
		<div id="response_php"></div>
	    </div>
	</section>
    </body>
    <script>
    /* Beispiel für JS-fetch (POST) */
	    var fakeApi = "entwicklung/fetch_post.php";

	    var auto = document.getElementById('autocomplete');


	    u(auto).on('keydown', debounce(function (e) {
		console.log(auto.value);

		postForm(fakeApi, auto.value)
		    .then(data => {

			console.log(data);
			document.getElementById("response_php").innerHTML = data;

		    })
		    .catch(error => console.error(error))

	    }, 500));


	    function postForm(url, val) {
		const data = new FormData();
		data.append('input', val);

		return fetch(url, {
			method: 'POST',
			body: data
		    })
		    .then(response => response.json())
	    }


	    function debounce(func, wait, immediate) {
		var timeout;
		return function () {
		    var context = this,
			args = arguments;
		    var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		    };
		    var callNow = immediate && !timeout;
		    clearTimeout(timeout);
		    timeout = setTimeout(later, wait);
		    if (callNow) func.apply(context, args);
		};
	    };

    </script>
</html>
content_;
exit($template);
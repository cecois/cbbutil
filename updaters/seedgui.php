<?php

$incoming="/Users/ccmiller/Desktop/cbb/updaters/cbb-live-json.json";

$bitsraw=array();

try {

	$fullfile = json_decode(file_get_contents($incoming));


	foreach ($fullfile as $key => $value) {

		$bits[]=$value->bit;
	}
	
} catch (Exception $e) {

	var_dump($e);die();
	
}

$uniq = array_count_values($bits);


?>
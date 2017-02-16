<?php

function array_pluck($key, $array)
{
    if (is_array($key) || !is_array($array)) return array();
    $funct = create_function('$e', 'return is_array($e) && array_key_exists("'.$key.'",$e) ? $e["'. $key .'"] : null;');
    return array_map($funct, $array);
}
	
$mongoitemsraw=json_decode(file_get_contents("mongolab-bits.json"));
$earwolfitemsraw=json_decode(file_get_contents("cbbrss.json"));
		
$earwolfitems=array();
$mongoitems=array();


foreach ($earwolfitemsraw->responseData->feed->entries as $entry) {
	
$first = explode(" ", $entry->title);
$earwolfitems[]=$first[0];
}

foreach ($mongoitemsraw as $entry) {
	$mongoitems[]=$entry->episode;
}

$diff = array_diff(array_unique($mongoitems), $earwolfitems);

// echo json_encode($earwolfitems);
// echo "--------";
// echo json_encode(array_pluck("episode",$mongoitems));

foreach ($diff as $key => $value) {
	echo $value."\n";
}


?>
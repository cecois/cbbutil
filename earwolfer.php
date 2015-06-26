<?php


function csv_to_array($filename='', $delimiter=',')
{
    if(!file_exists($filename) || !is_readable($filename))
        return FALSE;

    $header = NULL;
    $data = array();
    if (($handle = fopen($filename, 'r')) !== FALSE)
    {
        while (($row = fgetcsv($handle, 1000, $delimiter)) !== FALSE)
        {
            if(!$header)
                $header = $row;
            else
                $data[] = array_combine($header, $row);
        }
        fclose($handle);
    }
    return $data;
}

// $csv = array_map('str_getcsv', file());
$csv = csv_to_array('cbbbits.bits.csv');

$uniq = array();

foreach ($csv as $ep) {
	
	$uniq[$ep['episode']]=array("episode"=>$ep['episode'],"slug_earwolf"=>$ep['slug_earwolf']);
}

// $uniq=array_unique($uniq);

// echo json_encode($csv);
foreach ($uniq as $un) {
	// print_r($un);
	$url = "http://www.earwolf.com/episode/".$un['slug_earwolf'];
	file_put_contents("ears/".$un['episode'].".".$un['slug_earwolf'].".html", file_get_contents($url));
	// echo $url."\r\n";
}

?>
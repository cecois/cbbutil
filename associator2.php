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
				// $data[] = array_combine($header, $row);
				$data[] = $row;
		}
		fclose($handle);
	}
	return $data;
}


$bitsin = csv_to_array('~bitscsv.csv');
$soclos = csv_to_array('soundcloud-slugs.csv');


$bitsout=array();

foreach ($bitsin as $bit) {
	$ep=$bit[0];

	$bit['epno']=$bit[0];
	unset($bit[0]);
	$bit['time']=$bit[1];
	unset($bit[1]);
	$bit['instance']=$bit[2];
	unset($bit[2]);
	$bit['bit']=$bit[3];
	unset($bit[3]);
	$bit['tagarray']=$bit[4];
	unset($bit[4]);

	// $sc = array_search($ep, $soclos);
	// echo "ep".$ep."\r\n";
	// $fo = array_walk($soclos, 'matcher',$out);
	// echo "fo:".$fo;

foreach ($soclos as $soclo) {
	if($ep==$soclo[0]){
		$bit['soundcloud']=$soclo[1];
		// print_r($soclo);
	}

}

$bitsout[]=$bit;

}

// $file = fopen("bits.soundclouded.csv","w");

// header('Content-Type: application/excel');
// header('Content-Disposition: attachment; filename="bits.soundclouded.csv"');
$data = $bitsout;

$fp = fopen('bits.soundclouded.csv', 'w');
foreach ( $data as $line ) {
    // $val = explode(",", $line);
    $val = $line;
    fputcsv($fp, $val);
}
fclose($fp);

?>
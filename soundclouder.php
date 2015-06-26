<?php

$xml = file_get_contents("soundcloud.xml");

$xmlp=simplexml_load_string($xml) or die("Error: Cannot create object");

foreach ($xmlp->channel->item as $itemi) {

	$ti = explode(" ", $itemi->title)[0];
	$urarr = explode("/", $itemi->link);
	$ur=array_pop($urarr);

	echo $ti.",".$ur."\r\n";

	// echo $itemi->title."<br/>";
}

// echo json_encode($xmlp->channel);

?>
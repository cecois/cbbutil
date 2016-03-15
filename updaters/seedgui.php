<?php

// could parse this out but fuggit
$hardep = "407";
$incoming = "/Users/ch23936/git/cbbutil/updaters/cbb-live-json.json";

$bitsraw = array();

try {

	$fullfile = json_decode(file_get_contents($incoming));

	foreach ($fullfile as $key => $value) {

		$bits[] = $value->bit;
	}

} catch (Exception $e) {

	var_dump($e);die();

}

$uniq = array_count_values($bits);

foreach ($uniq as $bit => $count) {

	// $total = count(json_decode(file_get_contents("http://solr-lbones.rhcloud.com/cbb_bits/select?fl=bit&wt=json&q=bit:".$bit)));
	$total = "999";

	$li = "<li>" . $count . " new <em><a href='#query/episode:" . $hardep . " AND bit:" . urlencode('"' . $bit . '"') . "'>" . $bit . "</a></em> (" . $total . " total)</li>";

	// <a href="#query/episode:33 AND bit:%22I%27d%20Love%20to%20Hear%20It%22"><em>I'd Love to Hear It</em></a> (<a href="#query/bit:%22I%27d%20Love%20to%20Hear%20It%22">22 total</a>)</li>

	echo $li;

}

?>
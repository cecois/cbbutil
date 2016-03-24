<?php

$which = "live";
$which = $argv[1];


// $hardep = "408";
// $incoming = "/Users/ccmiller/Desktop/cbb/updaters/cbb-live-json.json";
$incoming = "/Users/ccmiller/Desktop/cbb/updaters/cbb-".$which."-json.json";

$bitsraw = array();

try {

	$fullfile = json_decode(file_get_contents($incoming));

	foreach ($fullfile as $key => $value) {

		$bits[] = array($value->bit);

	}

} catch (Exception $e) {

	var_dump($e);die();

}


$uniq = array_count_values($bits->bits);

var_dump($uniq);die();

foreach ($uniq as $bit => $count) {

	$totals = json_decode(file_get_contents("http://solr-lbones.rhcloud.com/cbb_bits/select?fl=bit&rows=0&wt=json&q=bit:%22".urlencode($bit)."%22"));
	// $total = count($totals->response->docs);
	$total = $totals->response->numFound;
	// $total = "999";

	// var_dump($total);die();
	$li = "<li>" . $count . " new <em><a href='#query/episode:" . $hardep . " AND bit:" . urlencode('"' . $bit . '"') . "'>" . $bit . "</a></em> (<a href='#query/bit:" . urlencode('"' . $bit . '"') . "'>" . $total . " total</a>)</li>";

	// <a href="#query/episode:33 AND bit:%22I%27d%20Love%20to%20Hear%20It%22"><em>I'd Love to Hear It</em></a> (<a href="#query/bit:%22I%27d%20Love%20to%20Hear%20It%22">22 total</a>)</li>

	echo $li;

}

?>
<?php

if (isset($argv[1])) {
	$which = $argv[1];

} else {
	$which = "news";}

// $hardep = "408";
// $incoming = "/Users/ccmiller/Desktop/cbb/updaters/cbb-live-json.json";
// $incoming = "/Users/ccmiller/Desktop/cbb/updaters/cbb-" . $which . "-json.json";
$incoming = "/Users/ch23936/git/cbbutil/updaters/cbb-" . $which . "-json.json";

$bitsraw = array();

try {

	$fullfile = json_decode(file_get_contents($incoming));

	foreach ($fullfile as $key => $value) {

		$bits[] = $value->bit;
		$eps[] = $value->episode;

	}

} catch (Exception $e) {

	var_dump($e);die();

}

// array array_filter ( array $array [, callable $callback [, int $flag = 0 ]] )

$uniqbits = array_count_values($bits);
$uniqeps = array_count_values($eps);
// var_dump($uniqeps);die();
// var_dump($uniqbits);die();

$keyz = 40;
$ar = array_filter($fullfile, function ($elem) use ($keyz) {
	// var_dump($elem);
	return $elem->episode == $keyz;
	// return "key";
});

// var_dump($ar);die();
$EPS = array();
foreach ($uniqeps as $key => $value) {
	// echo "key: " . $key;
	// echo "value: " . $value;
	// global $key;
	$EPS[$key]['bits'] = array_filter($fullfile, function ($elem) use ($key) {
		// var_dump($elem);
		return $elem->episode == $key;
		// return "key";
	});

	// $uniqeps[$key]["bits"] = array_filter($fullfile, function ($b) {

	// 	var_dump($key);
	// 	return $b->episode == $key;
	// });
}
// echo json_encode($EPS);
// die();
$BITS = array();
foreach ($uniqbits as $k => $bit) {

	// $totals = json_decode(file_get_contents("http://solr-lbones.rhcloud.com/cbb_bits/select?fl=bit&rows=0&wt=json&q=bit:%22" . urlencode($bit) . "%22"));
	// $total = $totals->response->numFound;
	echo $bit;
	$total = 9999;
	$BITS[$bit]['count'] = $total;

}

var_dump($BITS);die();

foreach ($EPS as $EP) {

	$totals = json_decode(file_get_contents("http://solr-lbones.rhcloud.com/cbb_bits/select?fl=bit&rows=0&wt=json&q=bit:%22" . urlencode($bit) . "%22"));
	// $total = count($totals->response->docs);
	$total = $totals->response->numFound;
	// $total = "999";

	// var_dump($total);die();
	$li = "<li>" . $count . " new <em><a href='#query/episode:" . $hardep . " AND bit:" . urlencode('"' . $bit . '"') . "'>" . $bit . "</a></em> (<a href='#query/bit:" . urlencode('"' . $bit . '"') . "'>" . $total . " total</a>)</li>";

	// <a href="#query/episode:33 AND bit:%22I%27d%20Love%20to%20Hear%20It%22"><em>I'd Love to Hear It</em></a> (<a href="#query/bit:%22I%27d%20Love%20to%20Hear%20It%22">22 total</a>)</li>

	echo $li;

}

// foreach ($uniqbits as $bit => $count) {

// 	$totals = json_decode(file_get_contents("http://solr-lbones.rhcloud.com/cbb_bits/select?fl=bit&rows=0&wt=json&q=bit:%22" . urlencode($bit) . "%22"));
// 	// $total = count($totals->response->docs);
// 	$total = $totals->response->numFound;
// 	// $total = "999";

// 	// var_dump($total);die();
// 	$li = "<li>" . $count . " new <em><a href='#query/episode:" . $hardep . " AND bit:" . urlencode('"' . $bit . '"') . "'>" . $bit . "</a></em> (<a href='#query/bit:" . urlencode('"' . $bit . '"') . "'>" . $total . " total</a>)</li>";

// 	// <a href="#query/episode:33 AND bit:%22I%27d%20Love%20to%20Hear%20It%22"><em>I'd Love to Hear It</em></a> (<a href="#query/bit:%22I%27d%20Love%20to%20Hear%20It%22">22 total</a>)</li>

// 	echo $li;

// }

?>
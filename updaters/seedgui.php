<?php

if (isset($argv[1])) {
	$which = $argv[1];

} else {
	// $which = "test-live";
	$which = "live";
}

// $hardep = "408";
// $incoming = "/Users/ccmiller/Desktop/cbb/updaters/cbb-live-json.json";
$incoming = "/Users/ccmiller/Desktop/cbb/updaters/cbb-" . $which . "-json.json";
// $incoming = "/Users/ch23936/git/cbbutil/updaters/cbb-" . $which . "-json.json";

// $BITS = array();
// $EPS = array();
$BITEPS = array();
$allowed = ['bit', 'episode'];

try {

	$fullfile = json_decode(file_get_contents($incoming), true);

	// $j = 2;
	foreach ($fullfile as $key => $value) {

		$BITEPS[$value['episode']]['bits'][] = $value['bit'];
		$BITS[] = $value['bit'];
		$EPS[] = $value['episode'];

	}

} catch (Exception $e) {

	var_dump($e);die();

}

// first let's get master unique bits so we can get full count
$uniqbits = array_count_values($BITS);

// var_dump($uniqbits);die();

$BITTOTZ = array();

foreach ($uniqbits as $k => $v) {

	$totals = json_decode(file_get_contents("http://solr-lbones.rhcloud.com/cbb_bits/select?fl=bit&rows=0&wt=json&q=bit:%22" . urlencode($k) . "%22"));
	$total = $totals->response->numFound;

	$BITTOTZ[] = array("bit" => $k, "total" => $total);

}

// var_dump($BITTOTZ);die();
// function get_bit_count($bit,$BITTOTZ){
// 	$tbit = array_filter($BITTOTZ,function($b){
// 		return $b["bit"]==$bit;
// 	});
// 	return $tbit["count"];
// }

$uniqeps = array_count_values($EPS);

$BITEPZ = array();
$bitstot = 0;

foreach ($BITEPS as $key => $value) {

// key is ep no
	$BITEPZ['episodes'][] = array('episode' => $key, 'bits' => array_count_values($value['bits']));
	$bitstot = $bitstot + count($value['bits']);
	// $BITEPZ['bitz'] = ;

}

// var_dump($BITEPZ);die();
// var_dump($uniqeps);die();
// $epstot = count($BITEPZ['episodes']);
if (count($uniqeps) > 1) {
	$UE = " episodes " . implode(", ", array_flip($uniqeps));
} else {
	$UE = " episode " . array_keys($uniqeps)[0];
}

$dump = "<p>" .
$bitstot .
" from "
. $UE . ":</p><ul>";

foreach ($BITEPZ['episodes'] as $ep) {
	foreach ($ep['bits'] as $k => $v) {
		// $BITTOT=get_bit_count($k);

		$tbit = array_values(array_filter($BITTOTZ, function ($b) use ($k) {
			return $b['bit'] == $k;
		}));

		// echo "K:" . $k . "\r\n";
		// echo "tbit:" . $tbit['bit'] . "\r\n";
		// var_dump($tbit);
		// echo "------------------------>" . "\r\n";
		// var_dump($tbit[0]);die();
		// echo json_encode($tbit[0]['total']);
		// die();
		$BITTOT = $tbit[0]['total'];

		$dump .= "<li>" . $v . " <em><a href='#query/episode:" . $ep['episode'] . " AND bit:%22" . urlencode($k) . "%22'>" . $k . "</a></em>  from ep." . $ep['episode'] . " (<a href='#query/bit:%22" . urlencode($k) . "%22'>" . $BITTOT . " total</a>)</li>";
		// <li>1 new <em><a href='#query/episode:408 AND bit:%22Bottom+of+a+Deep+Pool%22'>Bottom of a Deep Pool</a></em> (<a href='#query/bit:%22Bottom+of+a+Deep+Pool%22'>7 total</a>)</li>
	}
}

$dump .= "</ul>";
echo $dump;
die();
// $BEU = array_unique($BITEPS, SORT_REGULAR);
// var_dump($BITEPS);die();

// $fullfilex = array_intersect_key($fullfile, array_flip($allowed));

// echo __LINE__;
// var_dump(array_filter($fullfile, function($k,$v) {
// 	echo "V:\r\n".var_dump($v);
// 	return isset($k);
// 	// return $v->bit;
// }, ARRAY_FILTER_USE_BOTH));
// die();

// $fullfilex = array_filter(
// 	$fullfile,
// 	function ($key) use ($allowed) {
// 		// return in_array($key, $allowed);
// 		return $v->bit=="bit";
// 	},
// 	ARRAY_FILTER_USE_KEY
// 	);

// echo __LINE__;
// var_dump($fullfilex);
// die();
// array array_filter ( array $array [, callable $callback [, int $flag = 0 ]] )

// $uniqbits = array_count_values($bits);
// $uniqeps = array_count_values($eps);
// var_dump($uniqeps);die();
// var_dump($uniqbits);die();

// $keyz = 40;
// $ar = array_filter($fullfile, function ($elem) use ($keyz) {
// var_dump($elem);
// return $elem->episode == $keyz;
// return "key";
// });

// var_dump($ar);die();
// $EPS = array();
// foreach ($uniqeps as $key => $value) {
// // echo "key: " . $key;
// // echo "value: " . $value;
// // global $key;
// 	$EPS[$key]['bits'] = array_filter($fullfilex, function ($elem) use ($key) {
// 	// var_dump($elem);
// 		return $elem->episode == $key;
// 	// if($elem->episode == $key){
// 	// 	return $elem->bit;
// 	// }
// 	// return "key";
// 	});

// // $uniqeps[$key]["bits"] = array_filter($fullfile, function ($b) {

// // 	var_dump($key);
// // 	return $b->episode == $key;
// // });
// }
// echo json_encode($EPS);
// die();
// $BITS = array();
// foreach ($uniqbits as $bit => $count) {

// // $totals = json_decode(file_get_contents("http://solr-lbones.rhcloud.com/cbb_bits/select?fl=bit&rows=0&wt=json&q=bit:%22" . urlencode($bit) . "%22"));
// // $total = $totals->response->numFound;
// 	$total = 9999;
// 	$BITS[$bit]['count'] = $total;

// }

// echo "BITS:";
// var_dump($BITS);
// echo "EPS:";
// var_dump($EPS);
// die();

// foreach ($EPS as $EP) {

// 	$totals = json_decode(file_get_contents("http://solr-lbones.rhcloud.com/cbb_bits/select?fl=bit&rows=0&wt=json&q=bit:%22" . urlencode($bit) . "%22"));
// // $total = count($totals->response->docs);
// 	$total = $totals->response->numFound;
// // $total = "999";

// // var_dump($total);die();
// 	$li = "<li>" . $count . " new <em><a href='#query/episode:" . $hardep . " AND bit:" . urlencode('"' . $bit . '"') . "'>" . $bit . "</a></em> (<a href='#query/bit:" . urlencode('"' . $bit . '"') . "'>" . $total . " total</a>)</li>";

// // <a href="#query/episode:33 AND bit:%22I%27d%20Love%20to%20Hear%20It%22"><em>I'd Love to Hear It</em></a> (<a href="#query/bit:%22I%27d%20Love%20to%20Hear%20It%22">22 total</a>)</li>

// 	echo $li;

// }

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
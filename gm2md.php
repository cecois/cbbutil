<?php

$gmails = glob('agmail-cbb*');

foreach ($gmails as $gmail) {

	$newname = convert_name($gmail);

$lines = file($gmail,FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$mdified = array();

foreach ($lines as $line) {
	$nl = "* ".$line;
	$mdified[]=$nl;
}

file_put_contents($newname, implode("\r\n", $mdified));
shell_exec('tag --add Gray '.$newname);
shell_exec('mv '.$gmail.' ~/.Trash');

}

function convert_name($old){
	// agmail-cbb.268.txt
	$new = str_replace('.txt','.md',str_replace('agmail-cbb.', '', $old));
	return $new;
}

?>
<?php


$xml = file_get_contents("soundcloud.xml");
// $csvfile = "bitscsv.csv";
$csvfile = "bitscsv-test.csv";

function matcher(&$item1, $key, $prefix)
{
    // $item1 = "$prefix: $item1";
    // $item1[0]['prefix']=$prefix;
    if($item1[0][0]=='350'){
    $item1[0]['prefix']=$prefix;
}
}

if (($handle = fopen($csvfile, "r")) !== FALSE) {
        # Set the parent multidimensional array key to 0.
        $nn = 0;
        while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
            # Count the total keys in the row.
            $c = count($data);
            # Populate the multidimensional array.
            for ($x=0;$x<$c;$x++)
            {
                $csvarray[$nn][$x] = $data[$x];
            }
            $nn++;
        }
        # Close the File.
        fclose($handle);
    }
    # Print the contents of the multidimensional array.

$xmlp=simplexml_load_string($xml) or die("Error: Cannot create object");

// print_r($xmlp->channel->item);
    // print_r($csvarray);
// die();

foreach ($xmlp->channel->item as $itemi) {

	$ti = explode(" ", $itemi->title)[0];
	$urarr = explode("/", $itemi->link);
	$ur=array_pop($urarr);

array_walk($csvarray, 'matcher', $ti);

print_r($csvarray);

	// if(arr){
	
	// 	echo "http://soundcloud.com/comedybangbang/".$ur;} 

}


?>
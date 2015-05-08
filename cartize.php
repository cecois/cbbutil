<?php


$vars=json_decode(file_get_contents('/tmp/vars.json'));

// $nom=addslashes($vars->nom);
// $anno=addslashes($vars->anno);
// $scnotes=addslashes($vars->sco);
// $conf=$vars->confidence;


$nom=str_ireplace("'", "''", $vars->nom);
$anno=str_ireplace("'", "''", $vars->anno);
$scnotes=str_ireplace("'", "''", $vars->sco);
$conf=htmlspecialchars($vars->confidence);

//CartoDB user name
$cartodb_username = "pugo";

//API Key (https://examples.cartodb.com/your_apps/api_key)
$api_key= "8ab0537993e0b06772cf3a74018105672e92daad";

$jsone=json_decode(file_get_contents('/tmp/json.json'));

if(!isset($jsone->table)){
switch ($jsone->type) {
	case 'Polygon':
		$table = "cbb_poly";
		break;
			case 'MultiPolygon':
		$table = "cbb_poly";
		break;
		case 'LineString':
		$table = "cbb_line";
		break;
			case 'MultiLineString':
		$table = "cbb_line";
		break;
			case 'Point':
		$table = "cbb_point";
		break;
	
	default:
		throw new Exception("No table", 1);
		die();
		
		break;
}
} else {
	$table=$jsone->table;
}

//Example query. This inserts a point into a table: Longitude -120.23, Latitude: 10.66
$sql = "INSERT INTO ".$table."(the_geom,name,anno,scnotes,confidence) VALUES(ST_SetSRID(ST_GeomFromGeoJSON('".json_encode($jsone)."'),4326),'".$nom."','".$anno."','".$scnotes."','".$conf."')";

//---------------
// Initializing curl 
$ch = curl_init( "https://".$cartodb_username.".cartodb.com/api/v2/sql" );
$query = http_build_query(array('q'=>$sql,'api_key'=>$api_key));
// Configuring curl options
curl_setopt($ch, CURLOPT_POST, TRUE);
curl_setopt($ch, CURLOPT_POSTFIELDS, $query);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
$result_not_parsed = curl_exec($ch);
//----------------

$result = json_decode($result_not_parsed);

echo(print_r($result));

$sqltwo = "SELECT cartodb_id,name from ".$table." order by cartodb_id desc limit 1;";
$ch = curl_init( "https://".$cartodb_username.".cartodb.com/api/v2/sql" );
$query = http_build_query(array('q'=>$sqltwo,'api_key'=>$api_key));
curl_setopt($ch, CURLOPT_POST, TRUE);
curl_setopt($ch, CURLOPT_POSTFIELDS, $query);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
$lastrec = curl_exec($ch);

echo(print_r($lastrec));

?>
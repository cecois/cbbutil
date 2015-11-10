#!/bin/sh

# curl "https://pugo.cartodb.com/api/v1/sql?q=select%20cartodb_id,name,anno,ST_X%28the_geom%29::text%20as%20lng_coordinate,ST_Y%28the_geom%29::text%20as%20lat_coordinate,created_at,updated_at%20from%20cbb_point" -o /tmp/pcdbraw.json;
# curl "https://pugo.cartodb.com/api/v1/sql?q=select%20cartodb_id,name,anno,created_at,updated_at,concat%28ST_Y%28the_geom%29||','||ST_X%28loc%29%29%20as%20the_geom%20from%20cbb_point" -o /tmp/pcdbraw.json;

#	WINNER-----!!!!
 # curl "https://pugo.cartodb.com/api/v1/sql?q=select%20cartodb_id,name,anno,created_at,updated_at,concat%28ST_Y%28the_geom%29||%27,%27||ST_X%28the_geom%29%29%20as%20loc%20from%20cbb_point" -o /tmp/pcdbraw.json;
 # curl "https://pugo.cartodb.com/api/v1/sql?q=select%20cartodb_id,name,anno,created_at,updated_at,concat%28ST_Y%28the_geom%29||%27,%27||ST_X%28the_geom%29%29%20as%20loc%20from%20cbb_point" -o /tmp/pcdbraw.json;
 
 
#	TABLES UNION WITH INVALID GEOJSON -----!!!!
 curl "https://pugo.cartodb.com/api/v1/sql?q=select%20cartodb_id%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsText(the_geom)%20as%20the_geom,'point'%20as%20geom_type%20from%20cbb_point%20UNION%20ALL%20select%20cartodb_id*9999%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsText(the_geom)%20as%20the_geom,'line'%20as%20geom_type%20from%20cbb_line" -o /tmp/pcdbraw.json;

# just lines
 # curl "https://pugo.cartodb.com/api/v1/sql?q=select%20cartodb_id*9999%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsText(the_geom)%20as%20the_geom,'line'%20as%20geom_type%20from%20cbb_line" -o /tmp/pcdbraw.json;
 
 # curl "https://pugo.cartodb.com/api/v1/sql?format=GeoJSON&q=select%20cartodb_id%20as%20cartodb_id,name,anno,created_at,updated_at,the_geom_webmercator%20as%20the_geom,the_geom_webmercator%20as%20la_geom%20from%20cbb_point%20UNION%20ALL%20select%20cartodb_id*9999%20as%20cartodb_id,name,anno,created_at,updated_at,the_geom_webmercator%20as%20the_geom,the_geom_webmercator%20as%20la_geom%20from%20cbb_line" -o /tmp/pcdbraw.json;
 

 # curl "https://pugo.cartodb.com/api/v1/sql?format=GeoJSON&q=SELECT%20row_to_json(fc)%20FROM%20(SELECT%20'FeatureCollection'%20As%20type,%20array_to_json(array_agg(f))%20As%20features%20FROM%20(SELECT%20'Feature'%20As%20type,%20ST_AsGeoJSON(lg.the_geom_webmercator)::json%20As%20geometry,%20(select%20row_to_json(t)%20from%20(select%20cartodb_id,%20the_geom_webmercator,%20name,anno)%20t%20)%20As%20properties%20FROM%20cbb_point%20As%20lg)%20As%20f)%20As%20fc;" -o /tmp/pcdbraw.json;

#	WINNER-----!!!!
 jq .rows /tmp/pcdbraw.json > /tmp/pcdb.json
 # jq .row_to_json /tmp/pcdbrows.json > /tmp/pcdb.json

#	WINNER (LOCAL)-----!!!!
 # curl 'http://localhost:8983/solr/cbb_carto/update/json?commit=true' --data-binary @/tmp/pcdb.json -H 'Content-type:application/json'

#	WINNER (OPENSHIFT)-----!!!!
curl 'http://solr-lbones.rhcloud.com/#/cbb_carto/update/json?commit=true' --data-binary @/tmp/pcdb.json -H 'Content-type:application/json'

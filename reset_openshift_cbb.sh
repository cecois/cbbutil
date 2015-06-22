#!/bin/sh


echo "killing cbb_bits..."
curl http://solr-lbones.rhcloud.com/cbb_bits/update --data '<delete><query>*:*</query></delete>' -H 'Content-type:text/xml; charset=utf-8' && curl http://solr-lbones.rhcloud.com/cbb_bits/update --data '<commit/>' -H 'Content-type:text/xml; charset=utf-8'

echo "killing cbb_carto..."
curl http://solr-lbones.rhcloud.com/cbb_carto/update --data '<delete><query>*:*</query></delete>' -H 'Content-type:text/xml; charset=utf-8' && curl http://solr-lbones.rhcloud.com/cbb_carto/update --data '<commit/>' -H 'Content-type:text/xml; charset=utf-8'



# ------------------ CARTO

#	TABLES UNION WITH INVALID GEOJSON -----!!!!
echo "refilling cbb_carto..."
curl "https://pugo.cartodb.com/api/v1/sql?q=select%20cartodb_id%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsGeoJSON(the_geom)%20as%20the_geom,'point'%20as%20geom_type%20from%20cbb_point%20UNION%20ALL%20select%20cartodb_id*999%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsGeoJSON(the_geom)%20as%20the_geom,'line'%20as%20geom_type%20from%20cbb_line%20UNION%20ALL%20select%20cartodb_id*9999%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsGeoJSON(the_geom)%20as%20the_geom,'poly'%20as%20geom_type%20from%20cbb_poly" -o /tmp/pcdbraw.json;
#	WINNER-----!!!!
 jq .rows /tmp/pcdbraw.json > /tmp/pcdb.json
#	WINNER (LOCAL)-----!!!!
 curl 'http://solr-lbones.rhcloud.com/cbb_carto/update/json?commit=true' --data-binary @/tmp/pcdb.json -H 'Content-type:application/json'

 # ------------------ BITS
 # 
echo "refilling cbb_bits..."
 # #	WINNER-----!!!!
mongoexport -h ds033599.mongolab.com:33599 --db cbbbits --collection bits -u cecmcgee -p 5NWpI1 --fields '_id,show,episode,slug_earwolf,id_wikia,url_soundcloud,name,desc,elucidation,tags,tstart,tend,location_type,location_id' --jsonArray --out /tmp/bits_incoming.json
#	WINNER-----!!!!
jq --compact-output '[.[]|{_id:._id."$oid",show:.show,episode:.episode,slug_earwolf:.slug_earwolf,id_wikia:.id_wikia,url_soundcloud:.url_soundcloud,name:.name,desc:.desc,elucidation:.elucidation,tags:.tags,tstart:.tstart,tend:.tend,location_type:.location_type,location_id:.location_id}]' < /tmp/bits_incoming.json > /tmp/bits_jqd.json

#	WINNER (LOCAL)-----!!!!
curl 'http://solr-lbones.rhcloud.com/cbb_bits/update/json?commit=true' --data-binary @/tmp/bits_jqd.json -H 'Content-type:application/json'
#
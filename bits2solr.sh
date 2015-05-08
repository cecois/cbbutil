#!/bin/sh

# curl "https://pugo.cartodb.com/api/v1/sql?q=select%20cartodb_id,name,anno,ST_X%28the_geom%29::text%20as%20lng_coordinate,ST_Y%28the_geom%29::text%20as%20lat_coordinate,created_at,updated_at%20from%20cbb_point" -o /tmp/pcdbraw.json;
# curl "https://pugo.cartodb.com/api/v1/sql?q=select%20cartodb_id,name,anno,created_at,updated_at,concat%28ST_Y%28the_geom%29||','||ST_X%28loc%29%29%20as%20the_geom%20from%20cbb_point" -o /tmp/pcdbraw.json;

# curl "https://pugo.cartodb.com/api/v1/sql?q=select%20cartodb_id,name,anno,created_at,updated_at,concat%28ST_Y%28the_geom%29||%27,%27||ST_X%28the_geom%29%29%20as%20loc%20from%20cbb_point" -o /tmp/pcdbraw.json;
# mongoexport -h ds033599.mongolab.com:33599 -d cbbbits -c bits -u cecmcgee -p 5NWpI1 -o /tmp/bits.json
# mongoexport --db test --collection traffic --out traffic.json

#	WINNER-----!!!!
mongoexport -h ds033599.mongolab.com:33599 --db cbbbits --collection bits -u cecmcgee -p 5NWpI1 --fields '_id,show,episode,slug_earwolf,id_wikia,url_soundcloud,name,desc,elucidation,tags,tstart,tend,location_type,location_id' --jsonArray --out /tmp/bits_incoming.json

# from shell
# mongo ds033599.mongolab.com:33599/cbbbits -u cecmcgee -p 5NWpI1

# echo "[">/tmp/bits_jqd.json
# WORKS BUT DOESN'T PRODUCE THE ARRAY, JUST LINES
# jq '.[]|{id:._id."$oid",show:.show,episode:.episode,slug_earwolf:.slug_earwolf}' < /tmp/bits_incoming.json >> /tmp/bits_jqd.json
# echo "]">>/tmp/bits_jqd.json

#	WINNER-----!!!!
jq --compact-output '[.[]|{_id:._id."$oid",show:.show,episode:.episode,slug_earwolf:.slug_earwolf,id_wikia:.id_wikia,url_soundcloud:.url_soundcloud,name:.name,desc:.desc,elucidation:.elucidation,tags:.tags,tstart:.tstart,tend:.tend,location_type:.location_type,location_id:.location_id}]' < /tmp/bits_incoming.json > /tmp/bits_jqd.json


#	WINNER (LOCAL)-----!!!!
curl 'http://localhost:8983/solr/cbb_bits/update/json?commit=true' --data-binary @/tmp/bits_jqd.json -H 'Content-type:application/json'
# 
#	WINNER (OPENSHIFT)-----!!!!
# curl 'http://solr-lbones.rhcloud.com/cbb/update/json?commit=true' --data-binary @/tmp/pcdb.json -H 'Content-type:application/json'
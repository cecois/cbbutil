#!/bin/sh

# mongoexport -h ds033599.mongolab.com:33599 -d cbbbits -c bits -u cecmcgee -p 5NWpI1 -o "/tmp/bits-mongolab".csv --type=csv -f _id,episode,show,time,tstart,tend,instance,bit,elucidation,created_at,updated_at,url_soundcloud,tagarray,tags,tagarray_og,tagarray,tagarray,tagarray,tagarray,tagarray,tagarray,tagarray,tagarray,tagarray,tagarray,slug_soundcloud,location_type,location_id,slug_earwolf,id_wikia,holding,episode_title,episode_guests

WHICH="live"

echo "importing to mlab..."
mongoimport -h ds033599.mongolab.com:33599 -d cbbbits -c bits -u cecmcgee -p 5NWpI1 --file ~/Desktop/cbb/updaters/cbb-$WHICH.json

echo "importing to localhost..."
mongoimport -h localhost -d cbbbits -c bits --file ~/Desktop/cbb/updaters/cbb-$WHICH.json

echo "dumping out of mlab..."
mongoexport -h ds033599.mongolab.com:33599 -d cbbbits -c bits -u cecmcgee -p 5NWpI1 --jsonArray --out /tmp/mongolocal2solr.json

echo "jqing temp..."
jq --compact-output '[.[]|{_id:._id."$oid",show:.show,episode:.episode,episode_title:.episode_title,guests:.episode_guests,slug_earwolf:.slug_earwolf,id_wikia:.id_wikia,slug_soundcloud:.url_soundcloud,bit:.bit,instance:.instance,created_at:.created_at,updated_at:.updated_at,elucidation:.elucidation,tags:.tags,tstart:.tstart,tend:.tend,created_at:.created_at,updated_at:.updated_at,location_type:.location_type,location_id:.location_id,holding:.holding}]' < /tmp/mongolocal2solr.json > /tmp/mongolocal2solrJQ.json


echo "solr stuff on rhcloud..."
curl http://solr-lbones.rhcloud.com/cbb_bits/update?commit=true --data '<delete><query>*:*</query></delete>' -H 'Content-type:text/xml; charset=utf-8'
curl http://solr-lbones.rhcloud.com/cbb_bits/update/json?commit=true --data-binary @/tmp/mongolocal2solrJQ.json -H 'Content-type:application/json'

echo "solr stuff on localhost..."
curl --noproxy localhost http://localhost:8983/solr/cbb_bits/update/json?commit=true --data-binary @/tmp/mongolocal2solrJQ.json -H 'Content-type:application/json'

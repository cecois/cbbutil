#!/bin/sh

###################################################################################################### MONGO

# we'll do these backups either way
FILEDATE=$(date +'%Y%m%d')
MONGOFIELDS="_id,episode,show,time,tstart,tend,instance,bit,elucidation,created_at,updated_at,url_soundcloud,tagarray,tags,tagarray_og,slug_soundcloud,location_type,location_id,slug_earwolf,id_wikia,holding,episode_title,episode_guests"
MONGORAW="/tmp/mongolocal2solr.json"
MONGOJQ="/tmp/mongolocal2solrJQ.json"

MONGOBUFILE="/home/ccmiller/Documents/bu/mongo/mongolab/bits-"$FILEDATE

#echo "backing up MongoLab Mongo bits..."
#mongoexport -h ds033599.mongolab.com:33599 -d cbbbits -c bits -u cecmcgee -p 5NWpI1 -o $MONGOBUFILE.csv --type=csv -f $MONGOFIELDS
#echo "tarballing same..."
#tar -cvzf $MONGOBUFILE.tgz $MONGOBUFILE.csv
# rm $MONGOBUFILE.csv


echo "exporting from MongoLab for solr..."
  mongoexport -h ds033599.mongolab.com:33599 -u cecmcgee -p 5NWpI1 --db cbbbits --collection bits --fields $MONGOFIELDS --jsonArray --out $MONGORAW

echo "tarballing same..."
tar -cvzf $MONGOBUFILE.tgz $MONGORAW
rm $MONGORAW

echo "now the new stuff goes in..."
mongoimport -h ds033599.mongolab.com:33599 -d cbbbits -c bits -u cecmcgee -p 5NWpI1 --file /home/ccmiller/git/cbbutil/updaters/cbb-live.json

echo "...and comes right back out"
mongoexport -h ds033599.mongolab.com:33599 -u cecmcgee -p 5NWpI1 --db cbbbits --collection bits --fields $MONGOFIELDS --jsonArray --out $MONGORAW


echo "JQing rows from "$MONGORAW" to "$MONGOJQ"..."
  jq --compact-output '[.[]|{_id:._id."$oid",show:.show,episode:.episode,episode_title:.episode_title,guests:.episode_guests,slug_earwolf:.slug_earwolf,id_wikia:.id_wikia,slug_soundcloud:.url_soundcloud,bit:.bit,instance:.instance,created_at:.created_at,updated_at:.updated_at,elucidation:.elucidation,tags:.tags,tstart:.tstart,tend:.tend,created_at:.created_at,updated_at:.updated_at,location_type:.location_type,location_id:.location_id,holding:.holding}]' < $MONGORAW > $MONGOJQ


SOLRHOME="http://localhost:8983/solr/"
  echo "killing Solr cbb_bits on localhost..."
curl --noproxy localhost ${SOLRHOME}cbb_bits/update?commit=true --data '<delete><query>*:*</query></delete>' -H 'Content-type:text/xml; charset=utf-8'

echo "refilling Solr cbb_bits on localhost..."
curl --noproxy localhost ${SOLRHOME}cbb_bits/update/json?commit=true --data-binary @$MONGOJQ -H 'Content-type:application/json'

echo "setting SOLRHOME to rhcloud"
SOLRHOME="http://solr-lbones.rhcloud.com/"

echo "killing Solr cbb_bits on OpenShift..."
curl ${SOLRHOME}cbb_bits/update?commit=true --data '<delete><query>*:*</query></delete>' -H 'Content-type:text/xml; charset=utf-8'

echo "refilling Solr cbb_bits on OpenShift..."
curl ${SOLRHOME}cbb_bits/update/json?commit=true --data-binary @$MONGOJQ -H 'Content-type:application/json'

#!/bin/sh


echo "This script will perform the following automatically:"
echo "    A) backup/tarball both local and MongoLab cbb dbs"
echo "    B) drop local bits"
echo "    C) import to local fresh bits from a Refine export"
echo "    D) export those bits outta Mongo"
echo "    E) push those bits into local Solr"
echo "Then, pending approval:"
echo "    F) drop MongoLab bits"
echo "    G) push those same local bits into production (OpenShift) Solr"

usage(){
	echo "it's your script, read it :-/"
}

read -p "Es coo? Press [Enter]"

while getopts “f:” OPTION
do
     case $OPTION in
         f)
             FILEIN=$OPTARG
             ;;
         ?)
             usage
             exit
             ;;
     esac
done

###################################################################################################### MONGO

# we'll do these backups either way
FILEDATE=$(date +'%Y%m%d')
MONGOFIELDS="_id,episode,show,time,tstart,tend,instance,bit,elucidation,created_at,updated_at,url_soundcloud,tagarray,tags,tagarray_og,tagarray,tagarray,tagarray,tagarray,tagarray,tagarray,tagarray,tagarray,tagarray,tagarray,slug_soundcloud,location_type,location_id,slug_earwolf,id_wikia,holding"
MONGORAW="/tmp/mongolocal2solr.json"
MONGOJQ="/tmp/mongolocal2solrJQ.json"

MONGOBUFILE="/Users/ccmiller/Documents/bu/mongo/localhost/bits-"$FILEDATE
echo "backing up localhost Mongo bits..."
mongoexport -d cbbbits -c bits -o $MONGOBUFILE.csv --type=csv -f $MONGOFIELDS
echo "tarballing same..."
tar -cvzf $MONGOBUFILE.tgz $MONGOBUFILE.csv
echo "removing the csv copy..."
rm $MONGOBUFILE.csv


# read -p "You wanna check that quick, cowboy? [Enter]"

MONGOBUFILE="/Users/ccmiller/Documents/bu/mongo/mongolab/bits-"$FILEDATE
echo "backing up MongoLab Mongo bits..."
mongoexport -h ds033599.mongolab.com:33599 -d cbbbits -c bits -u cecmcgee -p 5NWpI1 -o $MONGOBUFILE.csv --type=csv -f $MONGOFIELDS
echo "tarballing same..."
tar -cvzf $MONGOBUFILE.tgz $MONGOBUFILE.csv
echo "removing the csv copy..."
rm $MONGOBUFILE.csv

# read -p "You wanna check that quick, cowboy? [Enter]"

if [[ -z $FILEIN ]]
then
      echo "No FILEIN specified, we'll quit with just a backup done."
     exit 1
 else
 	echo "using FILEIN:"$FILEIN"...hope that's fresh!"
 	echo "first we drop extant on localhost:"

mongo cbbbits --eval "db.dropDatabase();"
mongoimport -d cbbbits -c bits --type csv --file $FILEIN --headerline

#  	echo "Now we kill some MongoLab stuff..."
mongo ds033599.mongolab.com:33599/cbbbits -u cecmcgee -p 5NWpI1 --eval "db.dropDatabase();"

# read -p "You wanna check that quick, cowboy? [Enter]"

#  	echo "And fill it back up with same data we just pushed local..."
mongoimport -h ds033599.mongolab.com:33599 -u cecmcgee -p 5NWpI1 -d cbbbits -c bits --type csv --file $FILEIN --headerline

# read -p "You wanna check that quick, cowboy? [Enter]"

###################################################################################################### MONGO2SOLR

echo "now taking it right back out of local for solr..."
	mongoexport --db cbbbits --collection bits --fields $MONGOFIELDS --jsonArray --out $MONGORAW


echo "JQing rows from "$MONGORAW" to "$MONGOJQ"..."
	jq --compact-output '[.[]|{_id:._id."$oid",show:.show,episode:.episode,slug_earwolf:.slug_earwolf,id_wikia:.id_wikia,slug_soundcloud:.url_soundcloud,bit:.bit,instance:.instance,created_at:.created_at,updated_at:.updated_at,elucidation:.elucidation,tags:.tags,tstart:.tstart,tend:.tend,created_at:.created_at,updated_at:.updated_at,location_type:.location_type,location_id:.location_id,holding:.holding}]' < $MONGORAW > $MONGOJQ


SOLRHOME="http://localhost:8983/solr/"
  echo "killing Solr cbb_bits on localhost..."
curl --noproxy localhost ${SOLRHOME}cbb_bits/update?commit=true --data '<delete><query>*:*</query></delete>' -H 'Content-type:text/xml; charset=utf-8'

# read -p "You wanna check that quick, cowboy? [Enter]"

echo "refilling Solr cbb_bits on localhost..."
curl --noproxy localhost ${SOLRHOME}cbb_bits/update/json?commit=true --data-binary @$MONGOJQ -H 'Content-type:application/json'

# read -p "You wanna check that quick, cowboy? [Enter]"

SOLRHOME="http://solr-lbones.rhcloud.com/"
  echo "killing Solr cbb_bits on OpenShift..."
curl ${SOLRHOME}cbb_bits/update?commit=true --data '<delete><query>*:*</query></delete>' -H 'Content-type:text/xml; charset=utf-8'

# read -p "You wanna check that quick, cowboy? [Enter]"

echo "refilling Solr cbb_bits on OpenShift..."
curl ${SOLRHOME}cbb_bits/update/json?commit=true --data-binary @$MONGOJQ -H 'Content-type:application/json'


fi # -z FILEIN
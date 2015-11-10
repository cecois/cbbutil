#!/bin/bash
# Argument = -t test -m machine -v

cartoize_test()
{

  echo "first I would pull down fresh cartodb to tmp like this:"
  # echo "curl \"https://pugo.cartodb.com/api/v1/sql?q=select%20cartodb_id%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsGeoJSON(the_geom)%20as%20the_geom,'point'%20as%20geom_type%20from%20cbb_point%20UNION%20ALL%20select%20cartodb_id*999%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsGeoJSON(the_geom)%20as%20the_geom,'line'%20as%20geom_type%20from%20cbb_line%20UNION%20ALL%20select%20cartodb_id*9999%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsGeoJSON(the_geom)%20as%20the_geom,'poly'%20as%20geom_type%20from%20cbb_poly\" -o /tmp/pcdbraw.json;"

  # echo "then i would jq it like this:"
  # echo "jq .rows /tmp/pcdbraw.json > /tmp/pcdb.json"

  # echo "then i would push it into solr like this"
  # echo "curl $SOLRHOME'/solr/cbb_carto/update/json?commit=true' --data-binary @/tmp/pcdb.json -H 'Content-type:application/json'"

}

cartoize()
{

read -p "We're really going to push cartodb data to "${MACHINE}" if you press [Enter]"

  echo "for real sending cartodb to "$MACHINE"..."

  # curl "https://pugo.cartodb.com/api/v1/sql?q=select%20cartodb_id%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsGeoJSON(the_geom)%20as%20the_geom,'point'%20as%20geom_type%20from%20cbb_point%20UNION%20ALL%20select%20cartodb_id*999%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsGeoJSON(the_geom)%20as%20the_geom,'line'%20as%20geom_type%20from%20cbb_line%20UNION%20ALL%20select%20cartodb_id*9999%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsGeoJSON(the_geom)%20as%20the_geom,'poly'%20as%20geom_type%20from%20cbb_poly" -o /tmp/pcdbraw.json;

  echo "really JQing"
  # jq .rows /tmp/pcdbraw.json > /tmp/pcdb.json

  echo "actually pushing into "${MACHINE}" solr..."
  # curl $SOLRHOME'/solr/cbb_carto/update/json?commit=true' --data-binary @/tmp/pcdb.json -H 'Content-type:application/json'

}

mongoize_test()
{
  echo "first we WOULD HAVe backEDup the extant mongodb db on "${MACHINE}" to localhost with MONGOCMD_BU"
  # echo "then quickly tarballed that to save a little space with TARCMD"
  # echo "then dropped the db on machine "${MACHINE}
  # echo "then imported to mongo cbbbits:bits on "${MACHINE}" using MONGOCMD_IM"

}

mongoize()
{
read -p "We're really going to move some Mongo stuff on "${MACHINE}" if you press [Enter]"

	echo "Backing up MongoDB on "$MACHINE
  $MONGOCMD_BU
  echo "Compressing MongoDB backup..."
  $TARCMD
  echo "Dropping Mongo db..."
  $MONGOCMD_DROP
  echo "Importing fresh csv from "$FILEIN
  $MONGOCMD_IM

}

carto2solr()
{


echo "pulling UNIONized dump from CartoDB into "$CARTORAW"..."

	curl "https://pugo.cartodb.com/api/v1/sql?q=select%20cartodb_id%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsGeoJSON(the_geom)%20as%20the_geom,'point'%20as%20geom_type%20from%20cbb_point%20UNION%20ALL%20select%20cartodb_id*999%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsGeoJSON(the_geom)%20as%20the_geom,'line'%20as%20geom_type%20from%20cbb_line%20UNION%20ALL%20select%20cartodb_id*9999%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsGeoJSON(the_geom)%20as%20the_geom,'poly'%20as%20geom_type%20from%20cbb_poly" -o $CARTORAW;

echo "JQing rows from "$CARTORAW" to "$CARTOJQ"..."
	jq .rows $CARTORAW > $CARTOJQ

echo "killing Solr cbb_carto on "$MACHINE"..."
curl --noproxy localhost ${SOLRHOME}cbb_carto/update?commit=true --data '<delete><query>*:*</query></delete>' -H 'Content-type:text/xml; charset=utf-8'

echo "refilling Solr cbb_carto on "$MACHINE"..."
curl --noproxy localhost ${SOLRHOME}cbb_carto/update/json?commit=true --data-binary @${CARTOJQ} -H 'Content-type:application/json'

}

mongo2solr()
{


echo "pulling fresh LOCALHOST (always) Mongo from MongoDB into "$MONGORAW"..."

	mongoexport --db cbbbits --collection bits --fields '_id,show,episode,slug_earwolf,id_wikia,url_soundcloud,name,instance,elucidation,tags,tstart,tend,created_at,updated_at,location_type,location_id,holding' --jsonArray --out $MONGORAW

echo "JQing rows from "$MONGORAW" to "$MONGOJQ"..."
	jq --compact-output '[.[]|{_id:._id."$oid",show:.show,episode:.episode,slug_earwolf:.slug_earwolf,id_wikia:.id_wikia,url_soundcloud:.url_soundcloud,name:.name,instance:.instance,created_at:.created_at,updated_at:.updated_at,elucidation:.elucidation,tags:.tags,tstart:.tstart,tend:.tend,created_at:.created_at,updated_at:.updated_at,location_type:.location_type,location_id:.location_id,holding:.holding}]' < $MONGORAW > $MONGOJQ

echo "killing Solr cbb_bits on "$MACHINE"..."
curl --noproxy localhost ${SOLRHOME}cbb_bits/update?commit=true --data '<delete><query>*:*</query></delete>' -H 'Content-type:text/xml; charset=utf-8'

echo "refilling Solr cbb_bits on "$MACHINE"..."
curl --noproxy localhost ${SOLRHOME}cbb_bits/update/json?commit=true --data-binary @$MONGOJQ -H 'Content-type:application/json'

}

test()
{


# read -p "Do you need to export from Refine? Do that first into ~/Desktop [Enter] key to start backup..."

read -p "IF THIS WERE REAL...you would have exported from Refine first, ja?"

# cartoize_test
# mongoize_test

# carto2solr_test
# mongo2solr_test


  exit 1
}

usage()
{
cat << EOF
usage: $0 options

Use this to refresh all or some of the cbb data (bits and/or carto) on the host of your choice.

OPTIONS:
   -h      show this message
   -t      run without actually touching data
   -m      target machine
   -v      verbose
EOF
}

TESTING=
MACHINE=
VERBOSE=
HELP=
FILEDATE=$(date +'%Y%m%d')
MONGOXFILE="/tmp/bits2solr.csv"
CARTORAW="/tmp/pcdbraw.json"
CARTOJQ="/tmp/pcdb.json"

MONGORAW="/tmp/bits_incoming.json"
MONGOJQ="/tmp/bits_jqd.json"

while getopts “hvm:f:t” OPTION
do
     case $OPTION in
         h)
             usage
             exit 1
             ;;
         f)
             FILEIN=$OPTARG
             exit 1
             ;;
         m)
             MACHINE=$OPTARG
             if [[ $MACHINE == 'dev' ]]; then
               SOLRHOME="http://localhost:8983/solr/"
               BUFILE="/Users/ccmiller/Documents/bu/mongo/localhost/bits-"$FILEDATE
               MONGOCMD_BU="mongoexport -d cbbbits -c bits -o $BUFILE.csv --csv -f _id,episode,show,time,tstart,tend,instance,bit,elucidation,created_at,updated_at,url_soundcloud,tagarray,tags,tagarray_og,tagarray,tagarray,tagarray,tagarray,tagarray,tagarray,tagarray,tagarray,tagarray,tagarray,slug_soundcloud,location_type,location_id,slug_earwolf,id_wikia,holding"
               MONGOCMD_DROP="mongo --eval \"db.dropDatabase();\""
              MONGOCMD_IM="mongoimport -d cbbbits -c bits --type csv --file $FILEIN --headerline"
              MONGOCMD_EX="mongoexport -h localhost --db cbbbits --collection bits --fields '_id,show,episode,slug_earwolf,id_wikia,slug_soundcloud,bit,instance,elucidation,tags,tstart,tend,location_type,location_id,holding,created_at,updated_at' --jsonArray --out "$MONGOXFILE

               TARCMD="tar -cvzf $BUFILE.tgz $BUFILE.csv"



               elif [[ $MACHINE == 'production' ]]; then
               SOLRHOME="http://solr-lbones.rhcloud.com/"
               BUFILE="/Users/ccmiller/Documents/bu/mongo/mongolab/bits-"$FILEDATE


             else
             	echo "Nothin?"
             	exit 0
             fi
             ;;
         v)
             VERBOSE=1
             ;;
         t)
             test
             exit 1
             ;;
         ?)
             usage
             exit
             ;;
     esac
done

if [[ -z $MACHINE ]]
then
    echo "No machine specified or no FILEIN value, don't wanna guess"
     usage
     exit 1
fi

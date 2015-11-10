#!/bin/bash
# Argument = -t test -m machine -v

cartoize_test()
{

  echo "first I would pull down fresh cartodb to tmp like this:"
  echo "curl \"https://pugo.cartodb.com/api/v1/sql?q=select%20cartodb_id%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsGeoJSON(the_geom)%20as%20the_geom,'point'%20as%20geom_type%20from%20cbb_point%20UNION%20ALL%20select%20cartodb_id*999%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsGeoJSON(the_geom)%20as%20the_geom,'line'%20as%20geom_type%20from%20cbb_line%20UNION%20ALL%20select%20cartodb_id*9999%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsGeoJSON(the_geom)%20as%20the_geom,'poly'%20as%20geom_type%20from%20cbb_poly\" -o /tmp/pcdbraw.json;"

  echo "then i would jq it like this:"
  echo "jq .rows /tmp/pcdbraw.json > /tmp/pcdb.json"

  echo "then i would push it into solr like this"
  echo "curl $SOLRHOME'/solr/cbb_carto/update/json?commit=true' --data-binary @/tmp/pcdb.json -H 'Content-type:application/json'"

}

cartoize()
{

read -p "We're really going to push cartodb data to "${MACHINE}" if you press [Enter]"

  echo "for real sending cartodb to "$MACHINE"..."

  curl "https://pugo.cartodb.com/api/v1/sql?q=select%20cartodb_id%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsGeoJSON(the_geom)%20as%20the_geom,'point'%20as%20geom_type%20from%20cbb_point%20UNION%20ALL%20select%20cartodb_id*999%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsGeoJSON(the_geom)%20as%20the_geom,'line'%20as%20geom_type%20from%20cbb_line%20UNION%20ALL%20select%20cartodb_id*9999%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsGeoJSON(the_geom)%20as%20the_geom,'poly'%20as%20geom_type%20from%20cbb_poly" -o /tmp/pcdbraw.json;

  echo "really JQing"
  jq .rows /tmp/pcdbraw.json > /tmp/pcdb.json

  echo "actually pushing into "${MACHINE}" solr..."
  curl $SOLRHOME'/solr/cbb_carto/update/json?commit=true' --data-binary @/tmp/pcdb.json -H 'Content-type:application/json'

}

mongoize_test()
{
  echo "first we WOULD HAVe backEDup the extant mongodb db on "${MACHINE}" to localhost with MONGOCMD_BU"
  echo "then quickly tarballed that to save a little space with TARCMD"
  echo "then dropped the db on machine "${MACHINE}
  echo "then imported to mongo cbbbits:bits on "${MACHINE}" using MONGOCMD_IM"

}

mongoize()
{
  $MONGOCMD_BU
  $TARCMD
  $MONGOCMD_DROP
  $MONGOCMD_IM

}

test()
{


# read -p "Do you need to export from Refine? Do that first into ~/Desktop [Enter] key to start backup..."

read -p "IF THIS WERE REAL...you would have exported from Refine first, ja?"

cartoize_test
mongoize_test

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
               MONGOCMD_BU="mongoexport -h ds033599.mongolab.com:33599 -d cbbbits -c bits -u cecmcgee -p 5NWpI1 -o $BUFILE.csv --csv -f _id,episode,show,time,tstart,tend,instance,bit,elucidation,created_at,updated_at,url_soundcloud,tagarray,tags,tagarray_og,tagarray,tagarray,tagarray,tagarray,tagarray,tagarray,tagarray,tagarray,tagarray,tagarray,slug_soundcloud,location_type,location_id,slug_earwolf,id_wikia,holding"
               MONGOCMD_DROP="mongo -h ds033599.mongolab.com:33599 --eval \"db.dropDatabase();\""
              MONGOCMD_IM="mongoimport -h ds033599.mongolab.com:33599 -d cbbbits -u cecmcgee -p 5NWpI1 -c bits --type csv --file $FILEIN --headerline"
              MONGOCMD_EX="mongoexport -h ds033599.mongolab.com:33599 --db cbbbits --collection bits -u cecmcgee -p 5NWpI1 --fields '_id,show,episode,slug_earwolf,id_wikia,slug_soundcloud,bit,instance,elucidation,tags,tstart,tend,location_type,location_id' --jsonArray --out "$MONGOXFILE
              TARCMD="tar -cvzf $BUFILE.tgz $BUFILE.csv"

             else
               SOLRHOME="http://DUMMYSOLRHOST:PORT/solr/"
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

if [[ -z $MACHINE || -z $FILEIN ]]
then
    echo "No machine specified or no FIEIN value, don't wanna guess"
     usage
     exit 1
fi

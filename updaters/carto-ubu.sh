#!/bin/sh

CARTORAW="/tmp/pcdbraw.json"
CARTOJQ="/tmp/pcdb.json"

SOLRHOMEDEV="http://localhost:8983/solr/"
SOLRHOMEPROD="http://solr-lbones.rhcloud.com/"

current=$(curl http://localhost:8983/solr/cbb_carto/select\?q\=\*%3A\*\&rows\=0\&wt\=json\&indent\=true | grep numFound | tr ":" "\ " | awk '{print $3}'| tr "," "\ " | awk '{print $1}')

echo "current carto count on localhost solr is ${current}"

echo "pulling UNIONized dump from CartoDB into "$CARTORAW"..."
curl "https://pugo.cartodb.com/api/v1/sql?q=select%20cartodb_id%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsGeoJSON(the_geom)%20as%20the_geom,'point'%20as%20geom_type%20from%20cbb_point%20UNION%20ALL%20select%20cartodb_id*999%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsGeoJSON(the_geom)%20as%20the_geom,'line'%20as%20geom_type%20from%20cbb_line%20UNION%20ALL%20select%20cartodb_id*9999%20as%20cartodb_id,name,confidence,anno,created_at,updated_at,ST_AsGeoJSON(the_geom)%20as%20the_geom,'poly'%20as%20geom_type%20from%20cbb_poly" -o $CARTORAW;

echo "JQing rows from "$CARTORAW" to "$CARTOJQ"..."
jq .rows $CARTORAW > $CARTOJQ

echo "killing Solr cbb_carto on localhost"
curl --noproxy localhost ${SOLRHOMEDEV}cbb_carto/update?commit=true --data '<delete><query>*:*</query></delete>' -H 'Content-type:text/xml; charset=utf-8'

echo "refilling Solr cbb_carto on localhost"
curl --noproxy localhost ${SOLRHOMEDEV}cbb_carto/update/json?commit=true --data-binary @${CARTOJQ} -H 'Content-type:application/json'

current=$(curl http://localhost:8983/solr/cbb_carto/select\?q\=\*%3A\*\&rows\=0\&wt\=json\&indent\=true | grep numFound | tr ":" "\ " | awk '{print $3}'| tr "," "\ " | awk '{print $1}')

echo "now current carto count on localhost solr is ${current}"

echo "killing Solr cbb_carto on OpenShift"
curl ${SOLRHOMEPROD}cbb_carto/update?commit=true --data '<delete><query>*:*</query></delete>' -H 'Content-type:text/xml; charset=utf-8'

echo "refilling Solr cbb_carto on OpenShift"
curl ${SOLRHOMEPROD}cbb_carto/update/json?commit=true --data-binary @${CARTOJQ} -H 'Content-type:application/json'

echo "manually test here if you like: ${SOLRHOMEPROD}cbb_carto/select?q=*%3A*&wt=json&indent=true"
exit 1
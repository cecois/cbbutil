#!/bin/sh

###################################################################################################### MONGO


echo "setting SOLRHOME to rhcloud"
SOLRHOME="http://solr-lbones.rhcloud.com/"
MONGOJQ="/tmp/mongolocal2solrJQ.json"


echo "refilling Solr cbb_bits on OpenShift..."
curl ${SOLRHOME}cbb_bits/update/json?commit=true --data-binary @$MONGOJQ -H 'Content-type:application/json'

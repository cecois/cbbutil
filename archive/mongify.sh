#!/bin/sh

json=$(pbpaste)
file="/tmp/mongo.json"

echo $json > $file

mongoimport -h ds033599.mongolab.com:33599 -d cbbbits -c bits -u cecmcgee -p 5NWpI1 --file $file
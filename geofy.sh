#!/bin/sh



echo -n "Enter origin and press [ENTER]: "
read origin

echo -n "Enter display name and press [ENTER]: "
read name

echo -n "Enter actual filename and press [ENTER]: "
read fnom

echo -n "Enter confidence and press [ENTER]: "
read conf

echo -n "Enter annotation and press [ENTER]: "
read anno


# MSG=${MSG//\'/\\\'}
nomnom=${name// /\+}
anoano=${anno// /\+}
# echo $nomnom

# subl $nomnom

if [[ "$origin" != "nom" ]]; then
  echo -n "Enter scope note and press [ENTER]: "
read sco

table="cbb_point"
  file="/tmp/${fnom}.geojson"
# json=$(cat ${file} | jq '.[0].geojson')
json=$(cat ${file})
else
  sco="-- nominatim"
  file="/tmp/${fnom}.geojson"
curl "http://nominatim.openstreetmap.org/search?q=${nomnom}&format=json&polygon_geojson=1&limit=1" -o $file
json=$(cat ${file} | jq '.[0].geojson')
fi

scosco=${sco// /\+}

# json=$(cat /tmp/mount+rushmore.geojson | jq '.[0].geojson')

# gtype=$(cat $file | jq '.[0].geojson.type')

# table=$(
#   case "$gtype" in
#     ("\"Point\"") echo "cbb_point" ;;
#     ("\"LineString\"") echo "cbb_line" ;;
#     ("\"MultiLineString\"") echo "cbb_line" ;;
#     ("\"Polygon\"") echo "cbb_poly" ;;
#     ("\"MultiPolygon\"") echo "cbb_poly" ;;
#     (*) echo "" ;;
#   esac)

# if [[ $table == "" ]]; then
# 	echo "no table, gotta die"
# 	exit;
# fi


# echo "table will be: "$table
echo "name will be: "$nomnom
echo "anno will be: "$anoano
echo "source will be: "$scosco
echo "confidence will be: "$conf

subl $file

echo -n "Zat ok? press [ENTER] to proceed"
read n

jsone=$(printf '%s' ${json})
# echo "jsone is..."
# echo $jsone

echo "writing vars..."
echo "{ \"nom\": \"$name\",\"anno\":\"${anno}\",\"sco\":\"${sco}\",\"confidence\":\"${conf}\",\"table\":\"${table}\"}" > /tmp/vars.json
# echo '{ "nom": "$name","anno":"${anno}","sco":"${sco}"}' > /tmp/vars.json

echo "submitting..."
# curl -g "https://pugo.cartodb.com/api/v2/sql?api_key=8ab0537993e0b06772cf3a74018105672e92daad&q=insert%20into%20dummy%20(name,anno,scnotes,the_geom)%20values('${nomnom}','${anoano}','${scosco}',ST_SetSRID(ST_GeomFromGeoJSON('${jsone}'),4326))"
echo $json > /tmp/json.json
#php /Users/ccmiller/Desktop/cbb/cartize.php
php cartize.php

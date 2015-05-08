#!/bin/bash
set -o nounset
set -o errexit

echo "Enter filename and press [ENTER]: "
read fnom

#
url=$(pbpaste)

coordshalf=${url#*@}

IFS=',' read -a coords <<< "$coordshalf"

lat=${coords[0]}
lng=${coords[1]}

# json='"geojson": {{"type":"Point","coordinates":['$lng','$lat']}}'
json='{"type":"Point","coordinates":['$lng','$lat']}'

# echo $json|pbcopy
# echo $name|pbcopy
echo $json
echo $json > /tmp/${fnom}.geojson
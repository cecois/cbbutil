#!/bin/sh

for i in $(ls *.gpx)
do
	echo "converting "$i"..."
	ogr2ogr -f "ESRI Shapefile" "/tmp/merge/"$i".shp" $i 'routes'
	# ogr2ogr -f "ESRI Shapefile" /tmp/1.shp v2staples-1.gpx 'routes'
done

mkdir /tmp/merge
file="/tmp/merge.shp"

for i in $(ls /tmp/merge/*.shp)
do

      if [ -f "$file" ]
      then
           echo "creating final merge.shp" 
           ogr2ogr -f 'ESRI Shapefile' -update -append $file $i -nln merge
      else
           echo "merging……"
      ogr2ogr -f 'ESRI Shapefile' $file $i
fi
done

echo "now a geojson version..."
ogr2ogr -f GeoJSON /tmp/merged.geojson $file

rm /tmp/merge.*
rm /tmp/merge/*.*
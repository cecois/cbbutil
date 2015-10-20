The international waters data (from [here](http://www.nauticalcharts.noaa.gov/csdl/mbound.htm)) consistently converted to FeatureCollection GeoJSON (despite multiple -nlt ogr2ogr flags). Finally decided to resort to some heavier QGIS processing to flatten this out.

The problem, in fact, is that the download from NOAA contains the following layers:

* Territorial Sea
* Contiguous Zone
* International Boundary
* Int'l Maritime Boundary
* Int'l Maritime Boundary and EEZ
* U.S. EEZ
* Eastern Special Area

Eventually merged each into a shapefile using `ogr2ogr -f "ESRI Shapefile" -update -append merge.shp intl-waters-us-abstraction_4.json -nln merge` then sent that out to GeoJSON, but had to *manually* add the geom to an export from CartoDB (pasting into the CartoDB table editor failed consistently).
(function() {


	window.map = new L.Map('map',
		{
			zoomControl:true,
			center: [51.505, -0.09],
    // zoom: 13,
    attributionControl:false
});

L.control.zoom({position:'bottomright'}).addTo(map)

	/* ----------
BASELAYERS
------------ */

	bmapquest = {
		subdomains: ["otile1", "otile2", "otile3", "otile4"],
		maxZoom: 18,
		url: 'http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
		noWrap:true
	};

	bcloudmade = {
		maxZoom: 18,
		subdomains: ["a", "b", "c"],
		noWrap:true,
		url: 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/22677/256/{z}/{x}/{y}.png'
	};


	window.appBaseMap = new BaseMap();
	appBaseMap.set(bcloudmade);
	window.appBaseMapView = new BaseMapView({
		model: appBaseMap
	});



	// first we have to bind to map events
	map.on('moveend', function(e) {

// setAppSearchBoundsFromMap();

});

	map.on('layerremove',function(e){
		// some layers will report info to console, here's a universal reset for those
			appConsoleView.reset();
	});

// a little hacky, this #returnto -- map load event wasn't firing and
// we needed to update search model bbox even if nothing has happened on the map yet
	// baseLayer.on('load', function(e) {
// setAppSearchBoundsFromMap();
// });

function setAppSearchBoundsFromMap(){

		var boundsArr = map.getBounds();
		var sw = boundsArr.getSouthWest();
		var ne = boundsArr.getNorthEast();
		var w = capLongitude(sw.lng);
		var s = capLatitude(sw.lat);
		var e = capLongitude(ne.lng);
		var n = capLatitude(ne.lat);

		appSearch.set({bbox_west:w,bbox_south:s,bbox_east:e,bbox_north:n});

}

function capLatitude(lat){
	if(lat > 90){
		lat = 90;
	} else if(lat< -90){lat=-90;}
	return lat;
}

function capLongitude(lng){
	if(lng > 180){
		lng = 180;
	} else if(lng < -180){lng=-180;}
	return lng;
}


})();

//function for swapping out baselayers using json-config vars
//example: setBaseMap(bcloudemade);


function setBaseMap(newlayer) {
	basemap.set({
		subdomains: newlayer.subdomains
	}, {
		silent: true
	});
	basemap.set({
		url: newlayer.url
	});
}
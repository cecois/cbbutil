var Locations = Backbone.Collection.extend({
	model:Bit
	,initialize:function(options){
		options||(options={})
	}
	,url:function(){

		var u =null;

		switch(CONFIG.mode) {
			case 'T':
			u = 'http://localhost:3030/geoms/offline?q='+appState.get("locations");
			break;
			case '33':
			u = 'http://milleria.org:3030/geoms/cbb?q='+appState.get("locations");
			break;
			default:
			u = 'http://milleria.org:3030/geoms/cbb?q='+appState.get("locations");
		}

		return u

	}
	,sync: function(method, collection, options) {
		options.dataType = "jsonp";
		options.jsonpCallback = 'cwmccallback';
		return Backbone.sync(method, collection, options)
	}
})//extend

var Updates = Backbone.Collection.extend({
	model:Update
	,url:"offline/update.json"
	,initialize:function(options){
		options||(options={})

		return this
	}
	,sync: function(method, collection, options) {



		options.dataType = "json";
		options.async = true;
		options.url = this.url;
		options.method = "GET";

		return Backbone.sync(method, collection, options)
	}
	,parse: function(data) {

		return data

	}
})//extend

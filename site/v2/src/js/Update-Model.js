var Update = Backbone.Model.extend({
	url:null
	,defaults: {}
	,initialize: function(options) {
		options || (options = {});

		return this
	}
	,sync: function(method, model, options) {



		options.dataType = "json";
		options.async = true;
		options.url = this.url;
		options.method = "GET";

		return Backbone.sync(method, model, options)
	}
	,parse: function(data) {
		return data
	}
});
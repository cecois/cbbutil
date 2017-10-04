var BaseLayersCollection = Backbone.Collection.extend({
	model:BaseLayer
	,url:null
	,initialize:function(options){
		options||(options={})
		this.listenTo(appState,'change:baselayer',this.switch)
	}
	,switch: function(nn){
		// var nl = (nn)?nn:appState.get("baselayer")
		this.invoke('set',{"active":false},{silent:true})
		return this
		.activate(nn)
	}
	,activate: function(nn){
		console.log("switching to ",nn)
		var nl = (nn)?nn:appState.get("baselayer")

		var nm = this.findWhere({name:nl})
		nm.set({active:true})
		return this

	}//activate

})//extend
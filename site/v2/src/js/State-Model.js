var State = Backbone.Model.extend({
    defaults: {
        locations:null
    }
    ,initialize: function(options) {
        options || (options = {});

        // this.listenTo(this,'change:facets',this.proxy)
        this.listenTo(this,'change:locations',this.proxy_locations)

        return this
    }
        ,proxy_locations: function(){

        if(typeof this.get("locations")!=='undefined' && this.get("locations")!==null){
            // some! - we fetch here due to a 'too much recursion' issue with the listenTo
            appLocations.fetch()
        }
            return this

    }
    ,slugify: function(ss){

// map through this.slugs, setting active:"is-active" where it matches s
var ogs = this.get("slugs")
,ns = _.map(ogs,function(s){
    if(s.slug==ss){return {name:s.name,slug:s.slug,active:"is-active"}}
        else {
         return {name:s.name,slug:s.slug,active:null}
     }
})//map
this.set({slugs:ns})
return this
}
});//state

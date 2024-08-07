var BitsView = Backbone.View.extend({
  el: "#search-bits",
    template: CBB['templates']['bitsView'],
    template_solo_bolo: CBB['templates']['bitsViewSolo'],
    events: {
      "click i.fa-map-marker": "zoomto",
      "click .cbb-trigger": "trigger",
      "click .cbb-facet-remove": function(e){e.preventDefault();appQueryFacets.reset();},
      "click .cbb-bit-meta-bt": "meta"
    },
    initialize: function() {
      this.collection.bind("sync", this.render, this);
      return this
      .proxyfetch()
    }
    ,meta: function(e){

      e.preventDefault()

      var metel = $(e.currentTarget).parents('.bit-data').find('.bit-data-meta')

      $(e.currentTarget).toggleClass('active')
      metel.toggleClass('active')

      return this
    }
    ,trigger: function(e){
      e.preventDefault()
var q = $(e.currentTarget).attr("data-type")+':"'+$(e.currentTarget).attr("data-target")+'"'


appQuery.set({"raw":q})

return this


}
,zoomto: function(e){

  e.preventDefault()
  var keys = $(e.currentTarget).attr("data-id")
  var key=keys.split(":")
if(typeof BitGroup !== 'undefined'){
  var a = _.find(BitGroup.getLayers(),function(l){return (l.options.location_id==key[1] && l.options.location_type.indexOf(key[0])>=0)});

  if(typeof a !== 'undefined'){
  
  a.openPopup()
    map.fitBounds(a.getBounds());
  }

}

  return this
}
,proxyfetch: function(){

  this.collection.fetch()
  return this
}
,render: function(){

if(this.collection.length<1){

  var qu = (appQuery.get("raw")==null || appQuery.get("raw")=='')?"null query":appQuery.get("raw")+appQuery.query_facetadd();

  $(this.el).html(
    "no bits for "+qu + " (maybe <a href='#' class='cbb-facet-remove'>remove the facet</a>?)"
    );
} else if(this.collection.length==1){
  $(this.el).html(this.template_solo_bolo({rows:this.collection.toJSON()}));
}
else {
  $(this.el).html(this.template({rows:this.collection.toJSON()}));}

        appActivityView.stfu();
        return this
      }
    });

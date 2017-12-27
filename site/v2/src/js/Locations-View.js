var LocationsView = Backbone.View.extend({
  el: null,
  events: {
  },
  initialize: function() {
    // var BitGroup = new L.featureGroup().addTo(map);
      // this.listenTo(this.collection,"change","render")
      this.collection.bind("sync", this.render, this);
      return this
    }
    ,render: function(){

      BitGroup.clearLayers();

      this.collection.each(function(geom, i) {

        var geomTemplate = CBB['templates']['bitMarkerViewTpl']
        var pu = geomTemplate(geom.get("properties"));
        var geomtype = geom.get("geometry").type
        var stile = this.get_style();
        var acdive = this.get_style('active');
        var ceen = this.get_style('seen');

        var bitm = geom.attributes
        if (geomtype.toLowerCase() == "point") {
          var foot = L.geoJson(bitm, {
            seen: false,
            location_id: geom.get("properties").cartodb_id,
            location_type: geom.get("geometry").type.toLowerCase(),
            pointToLayer: function(feature, latlng) {
              return L.circleMarker(latlng, stile);
            }
          })
          foot.bindPopup(pu).addTo(BitGroup).on("click", function(m) {

                        m.target.setStyle(acdive);

                      }).addOneTimeEventListener("popupopen", function(p) {

                      })
                    //on popup
                  } else {

                    var foot = L.geoJson(bitm, {
                      seen: false,
                      location_id: geom.get("properties").cartodb_id,
                      location_type: geom.get("geometry").type.toLowerCase(),
                      style: stile
                    })
                    foot.bindPopup(pu).addTo(BitGroup).on("click", function(m) {
                      m.target.setStyle(acdive);
                      var stale = _.find(BitGroup._layers, function(i) {
                        return i.options.seen == true
                      });
                    }).addOneTimeEventListener("popupopen", function(p) {

                    }) //on popup
                  }
                  foot.on("popupclose", function(p) {

                    p.target.setStyle(ceen)
                }) //.on
                  if (typeof bitm.options == 'undefined') {
                    bitm.options = {
                      cartodb_id: null
                    }
                  }
                  bitm.options.cartodb_id = geom.get("properties").cartodb_id.toString()
                },this)

if(this.collection.length > 0){
  map.fitBounds(BitGroup.getBounds());
}

appActivityView.stfu()

return this
}
,get_style: function(s){

  switch (s) {
    case 'active':
    return {
      radius: 18,
      fillColor: "#fecd0b",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 1,
    };
    break;
    case 'seen':
    return {
      radius: 6,
      fillColor: "#ffffff",
      color: "#1288b9",
      weight: 1,
      opacity: .6,
      fillOpacity: 1,
    };
    break;
    case 'linenew':
    return {
      fillColor: "rgba(126, 223, 216, 100)",
      color: "rgba(126, 223, 216, 100)",
      weight: 6,
      opacity: 1,
    };
    break;
    case 'lineactive':
    return {
      fillColor: "#fecd0b",
      color: "#fecd0b",
      weight: 8,
      opacity: 1,
    };
    break;
    case 'lineseen':
    return {
      fillColor: "#ffffff",
      color: "#ffffff",
      weight: 6,
      opacity: 1,
    };
    default:
    return {
      radius: 6,
      // fillColor: "rgba(6, 6, 6, 50)",
      fillColor: "rgb(255, 128, 0)",
      fillOpacity: .8,
      color: "#000",
      weight: 1,
      opacity: 1,
    };
    break;
}//switch

}
});

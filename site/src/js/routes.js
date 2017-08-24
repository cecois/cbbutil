var Route = Backbone.Router.extend({
    routes: {
        // "": "default",
        // ":hash": "default",
        // docs/:section(/:subsection)
        // ":hash(/:q)(/:bbox)": "default",
        "(:hash)(/:q)(/:bbox)(/:basemap)(/:activecouple)(/:facetsin)(/)": "default"
            // ":hash": "routepractice"
            // "home": "home",
            // "about": "about",
            // "search/lll:hash": "searchWithHashed",
            // "search/p:page/:querystring": "search"
    },
    initialize: function() {},
    update: function(el) {
        var url = urlFactory(el)
    },
    default: function(h, q, bbox, basemap, activecouple, facetsin) {
            /*
            Tried to not do this, but it does kinda make sense to make the active mod a global. Otherwise we have to pass it to BitCollection first, and then *further* on to CartoCollx since Carto gets filled *after* the custom parse of bits.
             */
            window.activecouple = activecouple
            if (typeof basemap !== 'undefined' && basemap !== null) {
                var inbl = appBaseLayers.findWhere({
                    "name": basemap
                })
                if(typeof inbl !== 'undefined'){
                                inbl.set({
                                    active: true
                                })}
            }
            if (typeof h == 'undefined' || h == null) {
                // h = "query";
                h = "huh";
            }
            // now we are sure there's an h there's this universal, what *panelizer*? anyway we can position lotsa window elements at once
            // appStatesView.prebaked(h)
            var hmod = "#" + h;
            _.each($("#main > .mainpanel"), function(p) {
                if (p.id == h) {
                    $(p).removeClass("hidden")
                } else {
                    $(p).addClass("hidden")
                }
            });
            _.each($("nav.site-nav > ul > li > a"), function(m) {
                if ($(m).attr("href") == hmod) {
                    $(m).addClass("active")
                } else {
                    $(m).removeClass("active")
                }
            }, this)
            if (typeof bbox !== 'undefined' && bbox !== null && bbox !== "null") {
                // #returnto to clean this up
                var asarr = bbox.split(",");
                var bbwest = asarr[0];
                var bbsouth = asarr[1];
                var bbeast = asarr[2];
                var bbnorth = asarr[3];
                var southwest = []
                southwest.push(Number(bbsouth))
                southwest.push(Number(bbwest))
                var northeast = []
                northeast.push(Number(bbnorth))
                northeast.push(Number(bbeast))
                var bboxarr = []
                bboxarr.push(southwest)
                bboxarr.push(northeast)
                map.fitBounds(bboxarr);
            }
            //                 
            // if (h == 'query') {
                // this.update("#query")
                // appCartoQueryView.fire(false)
                // appActivity.set({
                //     message: "querying bits..."
                // })
                // console.log("appbits.fetch@routes 86")
                // appBits.fetch({
                //     reset: true,
                //     success: function() {
                //                         appActivity.set({message: "pulling out locations..."})
                //         appCBB.fetch({
                //             reset: true,
                //             success: function(collx) {
                //                 if (typeof activecouple !== 'undefined' && activecouple !== null) {
                //                     collx.activate();
                //                     appCBBListView.pulleps()
                //                 }
                //                 appActivityView.stfu()
                //             }
                //         })
                //     }, //success fetch
                //     error: function() {
                //         appConsole.set({
                //                 message: "query errored out"
                //             })
                //         $("#querylist-locations").append("<li style='margin-top:50px;font-size:2em;'>QUERY ERRORED OUT, SRY</li>")
                //         $("#querylist-bits").append("<li style='margin-top:50px;font-size:2em;'>QUERY ERRORED OUT, SRY</li>")
                //     }
                // })
            // } //h is query for fetch
            // ok, well here's a funny thing - yes, we're manually calling the little badge thing here cuzzi i simply didn't wanna rearrange and diagnose a bunch of inter-model/view calls and I didn't wanna create a view just for this. What!? Ok, #returnto
            appCBBCountView.throbtab()
            if (facetsin !== null && typeof facetsin !== 'undefined') {
                facetsinscrubbed = facetsin.split(",")
            } else {
                facetsinscrubbed = []
            }
            if (typeof q !== 'undefined' && q !== null ) {
                // if(q!=="null"){
                if (verbose == true) {
                    console.log("q existed, setting appcartoquery to q, which is");
                    console.log(q);
                }
                // appCartoQuery.set({
                //     rawstring: q
                // })
                // facetsin.split(",")
                // facetsinscrubbed=['tags:"Golly"','tags:"Chip Gardner"']
                appCartoQuery.set({
                    facetarray: facetsinscrubbed,
                    rawstring: q
                });
                // }
            } else if(appCartoQuery.get("rawstring") !== queryinit && appCartoQuery.get("rawstring") !== "") {
                if(verbose==true){
                    console.log("a fresh rawstring has been set, routing should leave it alone");
                }
            } else {
                appCartoQuery.set({rawstring:queryinit})
            }
            // else {
            //      appCartoQuery.set({facetarray:facetsinscrubbed,rawstring:'huell'});
            // }
            // #returnto - this shouldn't be necessary but seems to be
            // appCartoQueryView.fire(false)
            return this
        } // end home
});
var appRoute = new Route();
Backbone.history.start();
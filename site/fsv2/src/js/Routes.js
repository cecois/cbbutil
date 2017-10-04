var Route = Backbone.Router.extend({
    routes: {
        "(:hash)(/:q)(/:panestate)(/:basemap)(/:bbox)(/:activecouple)(/)": "default"
        },
        initialize: function() {
            
        }
        ,default: function(h, q, p, b,x, a) {

var slug = (typeof appState.get("slug")!=='undefined')?h:null 
,quer = (typeof appState.get("query")!=='undefined')?q:null
,pane = (typeof appState.get("panestate")!=='undefined')?p:null  
,base = (typeof appState.get("basemap")!=='undefined')?b:null 
,slug = (typeof appState.get("slug")!=='undefined')?h:null 
,bbox = (typeof appState.get("bbox")!=='undefined')?x:null
,acti = (typeof appState.get("active")!=='undefined')?a:null; 

appState.set({
    slug:h
    ,query:q
    ,panestate:p
    ,bbox:x
    ,basemap:b
    ,active:a
})

            // now we are sure there's an h there's this universal, what *panelizer*? anyway we can position lotsa window elements at once
            // appStatesView.prebaked(h)
//            var hmod = "#" + h;
//            _.each($("#main > .mainpanel"), function(p) {
//                if (p.id == h) {
//                    $(p).removeClass("hidden")
//                } else {
//                    $(p).addClass("hidden")
//                }
//            });
//            _.each($("nav.site-nav > ul > li > a"), function(m) {
//                if ($(m).attr("href") == hmod) {
//                    $(m).addClass("active")
//                } else {
//                    $(m).removeClass("active")
//                }
//            }, this)
            /*
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
                console.log("bboxarr",bboxarr);
                map.fitBounds(bboxarr);
            }
            */
            //                 
            // appCBBCountView.throbtab()
           /*
            if (facetsin !== null && typeof facetsin !== 'undefined') {
                facetsinscrubbed = facetsin.split(",")
            } else {
                facetsinscrubbed = []
            }
            */
            /*
            if (typeof q !== 'undefined' && q !== null ) {
                // if(q!=="null"){
                    if (CONFIG.verbose == true) {
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
                if(CONFIG.verbose==true){
                    console.log("a fresh rawstring has been set, routing should leave it alone");
                }
            } else {
                appCartoQuery.set({rawstring:queryinit})
            }
            */
            // else {
            //      appCartoQuery.set({facetarray:facetsinscrubbed,rawstring:'huell'});
            // }
            // #returnto - this shouldn't be necessary but seems to be
            // appCartoQueryView.fire(false)
            return this
        } // default
    });
var appRoute = new Route();
Backbone.history.start();
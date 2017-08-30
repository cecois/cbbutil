var StateView = Backbone.View.extend({
    el: $("#btn-statie"),
    template: CBB['templates']['statesViewTpl'],
    initialize: function() {
        if (CONFIG.verbose == true) {
            console.info("------> StatesVIew --> initialize")
        }
        this.rewire()
        this.universal = false;
        // this.render();
        // this.collection.bind("change:posish", this.render, this);
        // this.collection.bind("reset", this.render, this);
    },
    events: {
        "click": "swap"
    },
    render: function(){

// $(this.el).find(".bt-facet").tooltip('destroy')

$("#main").toggleClass("statie-collapsed")
$("#banner-bang").toggleClass("statie-collapsed")

var plusm=$("#main").hasClass("statie-collapsed")
switch (plusm) {
    case true:
                // $("#btn-statie").html('<div class="triangle-trigger-true" title="click or press ctrl key to re-show" data-toggle="tooltip"><span class="glyphicon glyphicon-plus hider-copy"></span></div>')
                $("#btn-statie").html('<div class="circle-trigger-true icom-bang" title="click or press ctrl key to re-show" data-toggle="tooltip"><span class="pull-right hider-copy">toggle the map</span></div>')
                break;
                case false:
                // $("#btn-statie").html('<div class="triangle-trigger-false" title="click or press ctrl key to see more of the map" data-toggle="tooltip"><span class="glyphicon glyphicon-minus hider-copy"></span></div>')
                $("#btn-statie").html('<div class="circle-trigger-false icom-bang" title="click or press ctrl key to see more of the map" data-toggle="tooltip"><span class="pull-right hider-copy">toggle the map</span></div>')
                break;
                default:
            }



            return this
            .rewire()
// .buttonize()

},
    // renderOG1: function() {
    //     if (CONFIG.verbose == true) {
    //         console.info("------> StatesVIew --> render")
    //     }
    //     // kill stragglers
    //     $(this.el).find('[data-toggle="tooltip"]').tooltip('destroy');
    //     // assume for now the btn-statie is in default state (showing a '-', upright vs showing a '+' and turned)
    //     var plus = false;
    //     // options are: hidden,momap,collapsed
    //     _.each(this.collection.models, function(mo, index) {
    //         var elstr = "#" + mo.get("name")
    //         var elpos = mo.get("posish")
    //         var elviz = mo.get("visible")
    //         $el = $(elstr);
    //         switch (elviz) {   
    //             case true:
    //                 $el.removeClass("hidden");
    //                 break;
    //             case false:
    //                 $el.addClass("hidden");
    //                 // plus = true
    //                 break;
    //             default:
    //                 $el.removeClass("hidden");
    //         }
    //         // clear all first
    //         $el.removeClass(function(index, css) {
    //             return (css.match(/(^|\s)statie-\S+/g) || []).join(' ');
    //         });
    //         switch (elpos) {   
    //             case "momap":
    //                 $el.addClass("statie-momap");
    //                 // plus = true
    //                 break;
    //             case "collapsed":
    //                 $el.addClass("statie-collapsed");
    //                 // plus = true
    //                 break;
    //             case "full":
    //                 // main only
    //                 if (elstr == "#main") {
    //                     $el.addClass("statie-full");
    //                 }
    //                 break;
    //             default:
    //         }
    //     });
    //     return this.buttonize(plus)
    // },
    buttonize: function(plus) {
        if (CONFIG.verbose == true) {
            console.info("------> StatesVIew --> buttonize, with plus:"+plus)
        }
        var co = _.countBy(appStates.models, function(s) {
            return (s.get("posish") == "hidden" || s.get("posish") == "collapsed")
        });
        if (co.true > 0) {
            var plusm = true
        } else {
            plusm = false
        }
        switch (plusm) {
            case true:
                // $("#btn-statie").html('<div class="triangle-trigger-true" title="click or press ctrl key to re-show" data-toggle="tooltip"><span class="glyphicon glyphicon-plus hider-copy"></span></div>')
                $("#btn-statie").html('<div class="circle-trigger-true icom-bang" title="click or press ctrl key to re-show" data-toggle="tooltip"><span class="pull-right hider-copy">toggle the ma8</span></div>')
                break;
                case false:
                // $("#btn-statie").html('<div class="triangle-trigger-false" title="click or press ctrl key to see more of the map" data-toggle="tooltip"><span class="glyphicon glyphicon-minus hider-copy"></span></div>')
                $("#btn-statie").html('<div class="circle-trigger-false icom-bang" title="click or press ctrl key to see more of the map" data-toggle="tooltip"><span class="pull-right hider-copy">toggle the ma9</span></div>')
                break;
                default:
            }
            return this.rewire()
        },
        swap: function(){
            $(this.el).find('[data-toggle="tooltip"]').tooltip('destroy')
            return this.render()
        },
    // swapOG: function() {
    //     // this.universal = true;
    //     if (CONFIG.verbose == true) {
    //         console.info("------> StatesVIew --> swap")
    //     }
    //     if (this.universal == true) {
    //         // unfortunately this is going to have to be router-savvy
    //         appStates.set({
    //             "name": "main",
    //             "posish": "open"
    //         }, {
    //             "name": "episodes",
    //             "posish": "open"
    //         }, {
    //             "name": "banner-bang",
    //             "posish": "open"
    //         })
    //         this.collection.invoke('set', {
    //             "posish": "open"
    //         });
    //         //
    //         // just set it back to the default for this route
    //         this.prebaked(Backbone.history.getHash())
    //         this.universal = false;
    //     } else if (this.universal == false) {
    //         if (appEpisodes.length == 0) {
    //             if (CONFIG.verbose == true) {
    //                 "appEpisodes.length:" + appEpisodes.length;
    //             }
    //             this.collection.invoke('set', {
    //                 "posish": "collapsed"
    //             });
    //         } else {
    //             // k there are episodes showing, which means we need to be a little pickier
    //             _.each(this.collection.models, function(mo) {
    //                 if (mo.get("name") == "episodes") {
    //                     mo.set({
    //                         posish: "momap"
    //                     })
    //                 } else {
    //                     mo.set({
    //                         posish: "collapsed"
    //                     })
    //                 }
    //             });
    //         }
    //         appStates.set({
    //                 "name": "main",
    //                 "posish": "collapsed"
    //             }, {
    //                 "name": "episodes",
    //                 "posish": "collapsed"
    //             }, {
    //                 "name": "banner-bang",
    //                 "posish": "collapsed"
    //             })
    //             // this.universal = true;
    //     }
    //     return this
    // },
    prebaked: function(set) {
        if (CONFIG.verbose == true) {
            console.info("------> StatesVIew --> prebakedOG")
        }
        if (CONFIG.verbose == true) {
            console.log("prebaked set:");
            console.log(set);
        }
        console.log("set:");
        console.log(set);
        if (set.indexOf("query") >= 0) {
            if (CONFIG.verbose == true) {
                console.log("indexof query >= 0")
            }
            if (appEpisodes.length == 0) {
                appStates.set([{
                    "name": "main",
                    "posish": "open"
                }, {
                    "name": "episodes",
                    "visible": false,
                    "posish": "open"
                }, {
                    "name": "banner-bang",
                    "posish": "open"
                }])
            } else {
                if (CONFIG.verbose == true) {
                    console.log("indexof query musta been 0")
                }
                appStates.set([{
                    "name": "main",
                    "posish": "open"
                }, {
                    "name": "episodes",
                    "visible": false,
                    // "posish": "momap"
                    "posish": "open"
                }, {
                    "name": "banner-bang",
                    "posish": "open"
                }])
            } //episodes.length test
        } else if (set == "") {
            if (CONFIG.verbose == true) {
                console.log("set == 0")
            }
            appStates.set([{
                "name": "main",
                "posish": "open"
            }, {
                "name": "episodes",
                "visible": false,
                "posish": "open"
            }, {
                "name": "banner-bang",
                "posish": "open"
            }])
        } else {
            appStates.set([{
                "name": "main",
                "posish": "full"
            }, {
                "name": "episodes",
                "visible": false
            }, {
                "name": "banner-bang",
                "posish": "open"
            }])
        }
        // break;
        // }
        return this.render()
    },
    setpos: function(newforwhom, collaps) {
        if (CONFIG.verbose == true) {
            console.info("------> StatesVIew --> setpos")
        }
        if (typeof newforwhom == 'undefined' || newforwhom == null) {
            var newforwhom = "main"
        }
        if (typeof collaps == 'undefined' || collaps == null) {
            // nothing explicit came in -- let's swap whatever current state is
            if (this.model.get("collapsed") == "true") {
                var collaps = "false"
            } else {
                var collaps = "true"
            }
        }
        switch (collaps) {
            case "true":
            var op = "plus"
            var instro = "expand main pane"
            break;
            case "false":
            var op = "minus"
            var instro = "collapse/hide main pane"
        }
        // if(this.model.get("collapsed")=="false"){
        // this.model.set({
        //     collapsed: collaps,
        //     forwhom: newforwhom,
        //     operation: op,
        //     instructions: instro
        // });
        // } else {
        //         this.model.set({collapsed:"false",operation:"minus",instructions:"collapse/hide main pane"})
        //     }
        return this
    },
    // renderOG0: function() {
    //     if (CONFIG.verbose == true) {
    //         console.info("------> StatesVIew --> renderOG")
    //     }
    //     var forwhom = this.model.get("forwhom")
    //     $(this.el).html(this.template(this.model.toJSON()))
    //     if (this.model.get("collapsed") == "true") {
    //         switch (forwhom) {   
    //             case "main":
    //                 forclass = "hiddenish"
    //                 break;   
    //             case "episodes-pu":
    //                 forclass = "hiddenish-episodes-pu";
    //                 break;
    //             default:
    //                 forclass = "hiddenish"
    //         }
    //         // first we clear out any current state
    //         // $("#main").attr("class","")
    //         if (CONFIG.verbose == true) {
    //             console.log("forclass right b4 apply:");
    //             console.log(forclass);
    //         }
    //         $("#main").addClass(forclass, 100);
    //         $("#episodes").addClass(forclass, 50);
    //         $("#episodes-list").addClass(forclass);
    //         $("#mnuBaseMap").addClass(forclass);
    //         $("#banner-bang").addClass(forclass, 100);
    //         appConsoleView.$el.addClass("hidden")
    //         appConsole.set({
    //             "message": "the 'control' key also toggles the visibility of the main pane"
    //         })
    //     } else {
    //         $("#mnuBaseMap").removeClass('hiddenish');
    //         appConsoleView.$el.removeClass("hidden")
    //         $("#main").removeClass('hiddenish hiddenish-episodes-pu');
    //         $("#episodes").removeClass('hiddenish hiddenish-episodes-pu');
    //         $("#episodes-list").removeClass("hiddenish-episodes-pu hiddenish");
    //         $("#banner-bang").removeClass('hiddenish');
    //     }
    //     if (typeof this.model.get("distance") !== 'undefined' || this.model.get("distance") !== null) {
    //         $("#main").css('right', this.model.get("distance"));
    //     }
    //     return this.rewire()
    // },
    rewire: function() {
        if (CONFIG.verbose == true) {
            console.info("------> StatesVIew --> rewire")
        }
        $(this.el).find('[data-toggle="tooltip"]').tooltip('destroy')
        $(this.el).find('[data-toggle="tooltip"]').tooltip({
            position: "right",
            container: 'body'
        })
        return this
    },
    reset: function() {
        if (CONFIG.verbose == true) {
            console.info("------> StatesVIew --> reset")
        }
        return this.render()
    }
});
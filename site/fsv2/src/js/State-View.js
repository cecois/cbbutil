var StateView = Backbone.View.extend({
    el: $("#btn-statie"),
    template: CBB['templates']['statesViewTpl'],
    events: {
       // "click": "swap"
    }
    ,render: function(){
return this
},
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

        return this
    },
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
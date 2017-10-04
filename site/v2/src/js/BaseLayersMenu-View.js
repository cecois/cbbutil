var BaseLayersMenuView = Backbone.View.extend({
    tagName: "ul",
    el: "#basemap-menu",
    template: CBB['templates']['baseLayerMnu'],
    events: {
        "click .mnuThumbnail":"switch",
    },
    initialize: function() {
        this.collection.bind('change:active', this.render, this);
        this.render()
    }
    ,render: function(){

        $(this.el).html(this.template(
            {menuitems:this.collection.toJSON()}
            ));

        return this
    }
    ,rewire: function() {
        $(".mnuThumbnail").tooltip()

        return this
    },
    switch: function(e) {
        var n = $(e.currentTarget).attr("data-id")
        this.collection.switch(n)
        return this
        } //switch
    });
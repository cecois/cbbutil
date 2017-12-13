var UpdatesView = Backbone.View.extend({
    el: $("#pane-update")
    ,template: CBB['templates']['updateViewTpl']
    ,events: {
    }
    ,initialize: function() {
        this.collection.bind("sync", this.render, this);
        return this
        .collection.fetch()
    },
    render: function(){

// we wanna remap the structure here and not use a Handlebars helper to do it cuz why not i guess?
var reports = []
, size = 4
, a=this.collection.models[0].get("report")
;

var meta =
{date:this.collection.models[0].get("date")
,episodes:this.collection.models[0].get("episodes")
,anno:this.collection.models[0].get("anno")}

while (a.length > 0)
    reports.push(a.splice(0, size));
$(this.el).html(this.template(
{
    meta:meta
    ,report:reports
}
)
);


return this
}
});
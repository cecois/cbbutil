var QueryView = Backbone.View.extend({
	el: $("#query-form")
	,template: CBB['templates']['queryViewTpl']
	,events: {
        "click #cbb-bt-search": 'set'
        ,"click #cbb-bt-random": 'rando'
    }
    ,bindings: {
    	'input': 'raw'
    }
    ,initialize: function() {
    	return this
    	.render()
    },
    rando: function(){

        var c = String.fromCharCode(Math.floor(Math.random() * 26) + 97)+'*'
        var d = String.fromCharCode(Math.floor(Math.random() * 26) + 97)+'*'

        appQuery.set({raw:c+d})

        return this
    }
    ,set: function(e){

var v = $("#query-form input").val()


        this.model.set({raw:v})

        return this

    },
    render: function(){

    	$(this.el).html(this.template(this.model.toJSON()))

    	return this
        .stickit();
    }
});
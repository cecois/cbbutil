import Vue from "vue";
import Router from "vue-router";
import CBB from "@/components/CBB";
Vue.use(Router);
export default new Router({
	routes: [{
		path: "/:pane?/:query?/:basemap?/:updatekey?"
		, name: "CBB"
		, component: CBB
	}]
});
import Vue from "vue";
import Router from "vue-router";
import CBB from "@/components/CBB";
Vue.use(Router);
export default new Router({
	routes: [{
		path: "/"
		, name: "CBB"
		, component: CBB
	}]
});
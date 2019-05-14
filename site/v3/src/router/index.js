import Vue from "vue";
import Router from "vue-router";
import LGOD from "@/components/LGOD";
Vue.use(Router);
export default new Router({
	routes: [{
		path: "/"
		, name: "LGOD"
		, component: LGOD
	}]
});
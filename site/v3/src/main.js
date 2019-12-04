// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import CONFIGD from "./Config.json";
import moment from 'moment';
import underscore from "vue-underscore";
import vueHeadful from 'vue-headful';
// import AWS from 'aws-sdk';
// import es from 'es';
// import awsHttpClient from 'http-aws-es';
// import es from 'elasticsearch';
// import AWS from 'aws-sdk';
// var client = new es.Client({
//   host: "https://your-aws-es-domain",
//   connectionClass: require('es-aws-iam-http-connector'),
//   aws: {
//     region: 'us-east-1',
//     credentials: new AWS.EnvironmentCredentials('AWS')
//   }
// });

let CONFIG=CONFIGD.mode=='prod'?CONFIGD.prod:CONFIGD.dev

// const AWS = require('aws-sdk')
// const awsHttpClient = require('http-aws-es')


let es = require('elasticsearch').Client({
  host: CONFIG.elastic_bits
  ,log: 'trace',
  apiVersion: '7.4'
  // ,connectionClass: require('http-aws-es')
});

// AWS.config.update({
//   credentials: new AWS.Credentials(CONFIG.awsAccessKeyId, CONFIG.awsSecretAccessKey),
//   region: 'us-east-1'
// });

// es.search({
//     index: 'cbb',
//     type: '_doc',
//     body: {
//         query: {
//             match: {
//                 bit: 'Donk*'
//             }
//         }
//     }
// })
// .then(res => console.log(res));

Vue.component('vue-headful', vueHeadful)
Vue.use(underscore);

Vue.config.productionTip = false;
Object.defineProperty(Vue.prototype, '$MOMENT', { value: moment })
Object.defineProperty(Vue.prototype, '$ES', { value: es })
/* eslint-disable no-new */
new Vue({
	el: "#app"
	, router
	, template: "<App/>"
	, components: {
		App
	}
});


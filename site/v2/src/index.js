import _ from 'underscore';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
;

require("backbone");
require("handlebars");

var req = require.context("./js", true, /^(.*\.(js$))[^.]*$/im);
req.keys().forEach((key)=>{
	req(key);
});
// or just: req.keys().forEach(req)

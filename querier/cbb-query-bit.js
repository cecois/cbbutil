var request = require('request');
var clipboard = require('child_process').spawn('pbcopy')
var sys = require('util')
var exec = require('child_process').exec;

var qs = process.argv[2]
var qss = qs.replace(" ","+")

// var q = 'http://solr-lbones.rhcloud.com/cbb_bits/select?fl=bit%2Celucidation%2Ctags&wt=json&rows=1&q='+qss;
var q = 'http://localhost:9200/cbb/_search?pretty&from=0&size=1&q='+qss+"*";

request(q, function (error, response, body) {
	if (!error && response.statusCode == 200) {

		var js = JSON.parse(body)

		var bit = js.hits.hits[0]._source.bit;
		var elucidation = js.hits.hits[0]._source.elucidation;
		var d = '"bit":"'+bit+'","elucidation":"'+elucidation+'",'
		clipboard.stdin.write(d);
		clipboard.stdin.end();
		exec("noti -t CBB -m back from Solr");
	}
})

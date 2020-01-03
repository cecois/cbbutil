const AXIOS = require('axios')
,CLIPBOARD = require('child_process').spawn('pbcopy')
,EXEC = require('child_process').exec;



const main = async () =>{
var qs = process.argv[2]
// var qss = qs.replace(" ","+")

// var q = 'http://solr-lbones.rhcloud.com/cbb_bits/select?fl=bit%2Celucidation%2Ctags&wt=json&rows=1&q='+qss;
var q = encodeURI(qs)
var uri = 'http://milleria.org:9200/cbb/_search?q='+q

let R = await AXIOS(uri)

		console.log("R.data.hits.hits[0]", R.data.hits.hits[0]);

		let bit = R.data.hits.hits[0]._source.bit;
		let elucidation = R.data.hits.hits[0]._source.elucidation;
		let d = '"bit":"'+bit+'","elucidation":"'+elucidation+'",'
// console.log(d);
		CLIPBOARD.stdin.write(d);
		CLIPBOARD.stdin.end();
		EXEC("noti -t CBB -m "+bit);

}

main();


// request(q, function (error, response, body) {
// 	if (!error && response.statusCode == 200) {

// 		var js = JSON.parse(body)

// 		var bit = js.hits.hits[0]._source.bit;
// 		var elucidation = js.hits.hits[0]._source.elucidation;
// 		var d = '"bit":"'+bit+'","elucidation":"'+elucidation+'",'
// console.log(d);
// 		CLIPBOARD.stdin.write(d);
// 		CLIPBOARD.stdin.end();
// 		exec("noti -t CBB -m back from Solr");
// 	}
// })

var __ = require ('underscore')
,FS = require('fs')
,HANDLEBARS = require('handlebars')
;

var audit = async (inc) =>{
	return new Promise(function(resolve, reject) {
		var dupes = []

//find most recent *.json in bu dir
// fs.readfile and compare (mapped) contents to mapped inc
var fakeext = ['The Paul Hardcastle of SuicidesSounds loud, right?Black Sabbath (musical combination),Heaven and Hell (song)']

// __.map(inc,(b)=>{return b.bit+b.instance+b.tags})
__.each(inc,(c)=>{

var finder = c.bit+c.instance+c.tags
if(__.contains(fakeext,finder)){
	dupes.push(finder)
}

})

var flag=(dupes.length>0)?'stop':null
		var r = {flag:flag,msg:"of "+inc.length+" incoming bits, "+dupes.length+" were sketchy",candidates:dupes.join(",")}
		resolve(r)
	});
}

var clean = async () =>{
	return new Promise(function(resolve, reject) {
		var r = []
		var jsons = ["mongo.bu1.json","mongo.bu2.json"]
		// tarball each
		r.push("tarballed/removed "+jsons.length)
		resolve(r)
	});
}


var prepapp = async (inc) =>{
	return new Promise(function(resolve, reject) {
		var r = []
		// set default query for "episode:44 OR episode:45" etc
		var eps = __.uniq(__.pluck(inc,'episode'))
		var q = eps.join(" OR ")
		r.push("query set to "+q)
		resolve(r)
	});
}

var report = async (inc) =>{
	return new Promise(function(resolve, reject) {
		// var tpl = 'foo'
		FS.readFile('Update.hbs',(err, template)=>{
		  if (!err) {

var groupd = __.groupBy(inc,'bit');

// console.log(groupd);

var sum = __.map(groupd,(G,i,L)=>{

	var len = G.length
	,bit = i
,instances = __.pluck(G,'instance')
	;

// console.log("bit",bit);
var o = {bit:bit,count:len,instances:instances}
// console.log(o);
return o
}) //map

var sumo = {bits:sum,length:sum.length}
console.log(sumo);
// process.exit();

		    // make the buffer into a string
		    // var source = data.toString();
		    // call the render function
		    // renderToString(source, fooJson);
				var tpl = HANDLEBARS.compile(template.toString());
 var result = tpl(sumo);
 FS.writeFile('/tmp/cbb-update.html',result,(err,suc)=>{
	 if(!err){
		var r={flag:null,rendering:"report generated using Update.hbs, written to /tmp/cbb-update.html"}
		resolve(r)
	} else {
		var r={flag:'stop',rendering:"report gen failed, check /tmp/cbb-update.html"}
		reject()
	}
 })

		  } else {
		    // handle file read error
				reject(err)
		  }
		});

	});
}

var esify = async () =>{
	return new Promise(function(resolve, reject) {
		var r = []
		r.push("result of bulk ES")
		resolve(r)
	});
}

var send = async () =>{
	return new Promise(function(resolve, reject) {
		var r = []
		r.push("result of mongo send")
		resolve(r)
	});
}

var incoming = async (ln) =>{
	return new Promise(function(resolve, reject) {
		var r = []

		FS.readFile('../cbb-'+ln+'-json.json',async (e,d)=>{
			if(e){reject(e)}
				else
				{
					var DJ = JSON.parse(d)
		resolve(DJ)
				}

		})//readfile

	});
}

var bu = async () =>{

return new Promise((resolve, reject)=>{

var r = []
	r.push("Mongo export of N documents completed without error")
	resolve(r)
});

}

var main = async () =>{
	try {
		var ln = process.argv[2]

		if(__.contains(['news','live'],ln)!==true){
			throw("typo prolly");
			process.exit();
		} else {

var inc = await incoming(ln);

R=
{
	// "backup":await bu(),
	"incoming": inc.length,//just length count and audit result
	"audit":await audit(inc),
	// "send":await send(),
	// "export":await bu(),
	// "index":await esify(),
	"report":await report(inc),
	"prepapp":await prepapp(inc),
	// "clean":await clean(),
}

console.log(R);

if(R.audit.flag == 'stop'){
	console.log("stopping due to audit flag, check "+JSON.stringify(R.audit));
} else {
	console.log("preflight complete, send to ES and finish");
}


		}

	} catch(error) {
		console.error(error);
	}
}

main();

var __ = require ('underscore')
,FS = require('fs')
,HANDLEBARS = require('handlebars')
,CONFIG = require("./Config.json")
,FSTREAM = require("fstream")
,TAR = require("tar-fs")
,PATH = require('path')
,ZLIB = require('zlib')
,DB = require('mongodb').Db
,RP = require('request-promise')
,MLAB = require('mongolab-data-api')(CONFIG.mongokey)
// ,MONGOCLIENT = require('mongodb').MongoClient
// ,DOOKIE = require('dookie')
// ,Server = require('mongodb').Server
// ,ReplSetServers = require('mongodb').ReplSetServers
// ,ObjectID = require('mongodb').ObjectID
// ,Binary = require('mongodb').Binary
// ,GridStore = require('mongodb').GridStore
// ,Grid = require('mongodb').Grid
// ,Code = require('mongodb').Code
// ,BSON = require('mongodb-core').BSON
// ,assert = require('assert')
,MOMENT = require('moment')
;

var audit = async (inc,ext) =>{
	return new Promise(function(resolve, reject) {

		var flag=null;
		

// map some values together as a kinda informal key
var inc_finder = __.map(inc,(b)=>{return b.episode+"---->"+b.bit+"---->"+b.instance+"---->"+b.tags})
var ext_finder = __.map(ext,(b)=>{return b.episode+"---->"+b.bit+"---->"+b.instance+"---->"+b.tags})

// see if any match
var candidates = __.intersection(inc_finder,ext_finder);

// if there's even 1 we need to halt and investigate
var flag=(candidates.length>0)?'stop':null

var r = {flag:flag,msg:"of "+inc.length+" incoming bits, "+candidates.length+" were sketchy",candidates:candidates.join(",")}
resolve(r)
});//Promise
}//audit

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
		var r = {}

		// var ln = ln+'-fake'

		FS.readFile('../cbb-'+ln+'-json.json',async (e,d)=>{
			if(e){console.log("readfile err");
			r.flag='stop'
			r.msg='read of *.json failed'
			reject(e)
		}
		else
		{
			var DJ = JSON.parse(d)
			r.flag=null
			r.msg = "incoming "+ln+" with "+DJ.length
			r.payload = DJ
			resolve(r)
		}

		})//readfile

	});
}

var most_recent = async () =>{

	return new Promise((resolve,reject)=>{

console.log("sniffing most recent...");
		var files = FS.readdirSync(CONFIG.budir);
    // use underscore for max()
    var max = __.max(files, function (f) {
    	var fullpath = PATH.join(CONFIG.budir, f);

        // ctime = creation time is used
        // replace with mtime for modification time
        return FS.statSync(fullpath).ctime;
    });
    console.log(max);
    resolve(max);

	})//promise
}

var extant_parse = async (F) =>{

	return new Promise((resolve,reject)=>{

var r = {}

console.log("reading bits from most recent *.json...");
				FS.readFile(CONFIG.budir+"/"+F,async (e,d)=>{
			if(e){console.log("readfile err");
			r.flag='stop'
			r.msg='read of *.json failed'
			reject(e)
		}
		else
		{
			var DJ = JSON.parse(d)
			r.flag=null
			r.msg = "extant length:"+DJ.length
			r.payload = DJ
			resolve(r)
		}

		})//readfile

	})//promise
}

var extant = async () =>{

	return new Promise((resolve,reject)=>{

		var options = {
			database: CONFIG.mongodb,
			collectionName: CONFIG.mongocollx,
			query: null,
			limit:999999999
		};

		MLAB.listDocuments(options, function (err, data) {
			if(err){reject(err)}else {
				
				console.log("into mlab, writing out...");
				var runid = MOMENT().format('YYYY_MMMM_dddd_hh_mm_ss');
				var buf = CONFIG.budir+"/bu."+runid+".json";

				FS.writeFile(buf,JSON.stringify(data),(err,res)=>{

					if(err){reject(err)} else {

						resolve({flag:null,msg:"raw backup written to "+buf})

}//fs.writefile.if.err.else

})//writefile

			}
});

})//promise
}//extant

var bu = async () =>{

	return new Promise((resolve, reject)=>{

		var url = 'mongodb://'+CONFIG.mongouser+':'+CONFIG.mongopsswd+'@'+CONFIG.mongohost+':'+CONFIG.mongoport+'/'+CONFIG.mongodb;
		var runid = MOMENT().format('YYYY_MMMM_dddd_hh_mm_ss');
		var bud = CONFIG.budir+"/"+runid;
		var buf = "bu."+runid+".json";
		var but = bud+".tar";
		var r = []

		var D = db.collection('bits').find({},(err,cursor)=>{
			if(err){r.flag=err;reject(r);} else {

				cursor.toArray((err,docs)=>{
					if(err){console.log("conversion of cursor to array bombed out w/ ",err)} else {

						FS.mkdir(bud, null, function(err) {
							if(err) {
								return console.log(err);
							} else {
								console.log("madedir "+bud+" - time to fill it with "+set.length+" bits");



								FS.writeFile(bud+"/"+buf, JSON.stringify(set), function(err) {
									if(err) {
										return console.log(err);
									} else {
										console.log("set backed up as "+buf+", tarballing now...");

										var output = FS.createWriteStream(bud+"/"+buf+".tgz");
										var compress = ZLIB.createGzip();
										/* The following line will pipe everything written into compress to the file stream */
										compress.pipe(output);
			// send some stuff to the compress object
			compress.write(JSON.stringify(set));
			compress.end();
			db.close();
			resolve();

		}
	});

							}
						});

					}


}) //toarray
			}

		});


		r.push("Mongo export of N documents completed without error")
		resolve(r)
	});

}

var main = async () =>{
	var R = {}
	R.audit = {flag:null}

	try {
		var ln = process.argv[2]

		if(__.contains(['news','live'],ln)!==true){
			throw("typo prolly");
			process.exit();
		} else {

// read in incoming bits from $ln file
// msg notes length, payload is actual bits
			var inc = await incoming(ln);
			R.incoming=inc.msg
			var inca = inc.payload
			
// pull everything out of MLAB into a local file
			// var bu = await extant();

// check backup dir for the MOST RECENT *.json bu
// this allows us to pull/not pull a backup every time
			var ext_source = await most_recent();

// parse that file
						var extant_parsed = await extant_parse(ext_source);
						R.extant=extant_parsed.msg

			var exta = extant_parsed.payload

// do some comparing to make sure we're not resending already sent
			var audited = await audit(inca,exta);
			R.audit = audited.msg

// if audit found anything sketchy we stop
			if(R.audit.flag=='stop'){
	throw Error ('audit.flag wz stop due to ',audited.msg);
	process.exit()
}

// no? ok, we're sending
				
			// R=
			// {
				// "backup":await bu(),
	// "incoming": inca.length,//just length count and audit result
	// "extant": exta.length,//just length count and audit result
	// "audit":await audit(inca,exta),
	// "send":await send(),
	// "export":await bu(),
	// "index":await esify(),
	// "report":await report(inc),
	// "prepapp":await prepapp(inc),
	// "clean":await clean(),
// }

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

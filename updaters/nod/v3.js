var __ = require('underscore')
,FS = require('fs')
,CONFIG = require("./Config.json")
,FSTREAM = require("fstream")
,TAR = require("tar-fs")
,PATH = require('path')
,ZLIB = require('zlib')
,DB = require('mongodb').Db
// ,MLAB = require('mongolab-data-api')(CONFIG.mongokey)
,ELASTIC = require('elasticsearch')
,MOMENT = require('moment')
,CLOUDINARY = require('cloudinary').v2
;

const do_image = async (earurl) =>{

return new Promise((resolve,reject)=>{

let ear_img_url=null
// first check earwolf for the image
// if none resolve empty
// if img send it to cloud
CLOUDINARY.uploader.upload(ear_img_url, (error, result) { 
	if(error){reject(error)}
		resolve(result.url)
});
// result of earwolf-image-cloudify workflow

// resolve('http://path/to/'+earurl.split("episode")[1]+'.jpg')

})//promise
}

const reports_test = async (rarr,bits) =>{

return new Promise((resolve,reject)=>{
let R=[];

	__.each(rarr,async (e,i,l)=>{

				var epno = e.split(":::")[0]
				var epslug = e.split(":::")[1]
				var img = await do_image("http://www.earwolf.com/episode/"+epslug);

			var O = {
				episode:epno,
				image:img,
				slug:epslug,ep_url:"http://www.earwolf.com/episode/"+epslug}

			var eps_bits = __.pluck(__.filter(bits,(b)=>{
				return b.episode==epno}),'bit');
			
			var beets = __.map(__.uniq(eps_bits),(m)=>{
				var o = {
					bit:m
					,count:__.filter(eps_bits,(li)=>{return li==m;}).length
				}; //o
				return o;
			});//map.beets
			O.bits_sum=beets;
			R.push(O)
			if(i==l.length-1){resolve(R)}
		})//map




})//promise
}


var audit = async (inc,ext) =>{
	return new Promise(function(resolve, reject) {

console.log("audit flag null to start")
		var flag=null;


// map some values together as a kinda informal key
var inc_finder = __.map(inc,(b)=>{return b.episode+"---->"+b.bit+"---->"+b.instance})
var ext_finder = __.map(ext,(b)=>{return b.episode+"---->"+b.bit+"---->"+b.instance})


console.log("intersecting "+inc_finder.length+" incomings against "+ext_finder.length+" extants...")
// see if any match
var candidates = __.intersection(inc_finder,ext_finder);

console.log("candidates.length",candidates.length)
console.log("CANDIDATES!!!",candidates)
// if there's even 1 we need to halt and investigate so we set the flag we check at the end to stop
var flag=(candidates.length>0)?'stop':'go'

var r = {flag:flag,msg:"of "+inc.length+" incoming bits, "+candidates.length+" were sketchy - see console"}
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

var sendNON= async (bits) =>{
	return new Promise(function(resolve, reject) {
		var r = []
		r.push("result of mongo send should be "+bits.length+" additional documents")
		resolve(r)
	});
}

var send = async (bits) =>{
	return new Promise(function(resolve, reject) {

		var options = {
			database: CONFIG.mongodb,
			collectionName: CONFIG.mongocollx,
			documents:bits
		};
		MLAB.insertDocuments(options, function (err, d) {
			if(err){reject(err)}else {

				resolve({documents:d});
}//err.else
		});//MONGO.connecdt


	});//Promise
}


var incoming = async (ln) =>{
	return new Promise(function(resolve, reject) {
		var r = {}

		var F = '../cbb-'+ln+'.json';
		console.log("reading in from "+F)

		FS.readFile(F,async (e,d)=>{
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
			console.log("read successful: "+r.msg)
			r.payload = DJ
			resolve(r)
		}

		})//readfile

	});
}

var imagify = async (U)=>{


	return new Promise((resolve,reject)=>{

		var imdgz = [];
		__.each(U.report,async (r,i,l)=>{

			var o =r;
			o.image=await figure_figure(r)
			if(typeof o.image!=='undefined'){imdgz.push(o)}

				console.log("currently at "+(i+1)+" of "+l.length)

			if(imdgz.length == l.length){
				console.log(imdgz.length+" equals "+l.length+" so we resolve")
				resolve(imdgz)
			}
		})

})//promise

}//imagify

const _reports = async (epadhocids,inca) => {
return new Promise((resolve,reject)=>{

resolve(__.map(epadhocids,async (e,i,l)=>{
			var epno = e.split(":::")[0]
			var epslug = e.split(":::")[1]

			var O = {episode:epno,image:'null',slug:epslug,ep_url:"http://www.earwolf.com/episode/"+epslug}

			var eps_bits = __.pluck(__.filter(inca,(b)=>{
				return b.episode==epno}),'bit');
			
			var beets = __.map(__.uniq(eps_bits),(m)=>{
				var o = {
					bit:m
					,count:__.filter(eps_bits,(li)=>{return li==m;}).length
				}; //o
				console.log("o:",o);
				return o;
			});//map.beets
			O.bits_sum=beets;
			console.log('returning O:',O)
			return O;
		})//map
)//resolve
})//promise
}//_reports

var summarize_incoming = async (bits) =>{

	return new Promise(async(resolve, reject)=>{

		let episodes_updated = __.uniq(__.map(bits,(E)=>{var o = E.episode+":::"+E.slug_earwolf;return o; }));
		let plur = episodes_updated.length>1?'s':''

let R = {
			date:MOMENT().format('YYYY.MMM.DD')
			,episodes_summary:bits.length+" bits from "+episodes_updated.length+" episode"+plur+" (ep"+plur+" "+__.map(episodes_updated,(E)=>{return E.split(":::")[0]}).join(", ")+")"
			,query:"("+__.map(episodes_updated,(e)=>{return "episode:"+e.split(":::")[0]}).join(" OR ")+")"
			,eps:episodes_updated
			,reports:await reports_test(episodes_updated,bits)
		// 	__.map(episodes_updated,async (e,i,l)=>{

		// 		var epno = e.split(":::")[0]
		// 		var epslug = e.split(":::")[1]
		// 		var img = await do_image("http://www.earwolf.com/episode/"+epslug);

		// 	var O = {
		// 		episode:epno,
		// 		image:img,
		// 		slug:epslug,ep_url:"http://www.earwolf.com/episode/"+epslug}

		// 	var eps_bits = __.pluck(__.filter(bits,(b)=>{
		// 		return b.episode==epno}),'bit');
			
		// 	var beets = __.map(__.uniq(eps_bits),(m)=>{
		// 		var o = {
		// 			bit:m
		// 			,count:__.filter(eps_bits,(li)=>{return li==m;}).length
		// 		}; //o
		// 		return o;
		// 	});//map.beets
		// 	O.bits_sum=beets;
		// 	return O;
		// })//map

		}

resolve(R)


		// resolve(R);

	});//Promise
}//summarize

var write = async(UP)=>{

	return new Promise((resolve,reject)=>{

		var npath = "./bu/updates-"+MOMENT().format('YYYY.MMM.DD_HH_mm_ss')+".json"

		FS.writeFile(npath,JSON.stringify(UP),(err,suc)=>{

			if(err){reject(err);} else {

				// FS.writeFile('../../site/v2/src/offline/update.json',JSON.stringify(UP),(err,suc)=>{

				// 	if(err){reject(err);} else
				// 	{				resolve(npath)}
				// })

			}

		})//fs.write

})//promise

}

var most_recent = async () =>{

	return new Promise((resolve,reject)=>{

		console.log("sniffing most recent...");
		var files = FS.readdirSync(CONFIG.budir);
		console.log("found these:"+files)
    // use underscore for max()

    var max = __.max(__.reject(files,(f)=>{return (f==".DS_Store" || f.indexOf("updates")>=0)}), (f)=>{
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
			console.log("flag null, "+r.msg)
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
				var runid = MOMENT().format('YYYY_MMMM_DD_dddd_hh_mm_ss');
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
		var runid = MOMENT().format('YYYY_MMMM_DD_dddd_hh_mm_ss');
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

var elastify = async (J)=>{

	return new Promise((resolve,reject)=>{


		var client = new ELASTIC.Client({
			host: 'milleria.org:9200',
			log: 'trace'
		});

var elastic_array =[];



FS.readFile(CONFIG.budir+"/"+J,(err,dat)=>{
	if(err){console.log(err);process.exit();}


	var datm = __.map(JSON.parse(dat),(D)=>{


		var ob = {
			_id:D._id.$oid
			// ,body:{
				,episode:D.episode.toString()
				,tstart:D.tstart
				,tend:D.tend
				,instance:D.instance
				,bit:D.bit
				,elucidation:D.elucidation
				,tags:D.tags
				,location_type:D.location_type
				,location_id:D.location_id
				,updated_at:D.updated_at
				,created_at:D.created_at
				,slug_earwolf:D.slug_earwolf
				,episode_title:D.episode_title
				,episode_guests:D.episode_guests
				,holding:D.holding
			// }
		}

		return ob

	})

	__.each(datm,(D)=>{
		elastic_array.push({
			index: {
				_index: 'cbb',
				_type: 'bit',
				_id: D._id
			}
		});
		delete D._id
		elastic_array.push(D);
	})

// console.log(JSON.stringify(elastic_array));
// 	console.log("expect:",elastic_array.length)
// resolve()

	client.bulk({
		timeout: '5m',
		body: elastic_array
	}).then(function (success) {
		// console.log(JSON.stringify(success));
		resolve(success);
	}, function (err) {
		console.log(JSON.stringify(err));
		reject(err);
	});


})//fs.readfile


})//promise

}

var main = async () =>{
	var R = {}
	R.audit = {flag:null}

	try {
		var ln = process.argv[2]

		if(!__.contains(['news','live','fake','fantastic','adds','reset','test'],ln)){
			throw("typo prolly");
			process.exit();
		} else {

console.log("processing bits from "+ln+"...")
/* -----------------------------------------------
// read in incoming bits from $ln file
// msg notes length, payload is actual bits
*/
var inc = await incoming(ln);
R.incoming=inc.msg
var inca = inc.payload
console.log("inca.length",inca.length)

/* -----------------------------------------------
// pull everything out of MLAB into a local file in budir - e.g. bu.2017_November_Sunday_02_06_35.json
console.log("awaiting extant...")
			var bu = await extant();
*/

/* -----------------------------------------------
// check budir for the MOST RECENT *.json bu
// this allows us to pull/not pull a backup every time
console.log("awaiting most recent...")
var ext_source = await most_recent();
console.log("found to be:",ext_source)
*/

/* -----------------------------------------------
// parse that file
var extant_parsed = await extant_parse(ext_source);
R.extant=extant_parsed.msg
var exta = extant_parsed.payload
console.log("exta.length",exta.length)
			// exta is now our live copy of everything that's come before
*/

/* -----------------------------------------------
// we send the fresh stuff and the archive for audit
// audit maps inca and exta into comparable arrays (concatenating several presumably distinct fields [episode+bit+instance+tags] into one nonsensical but probably-unique string) - N.B. this is not foolproof
console.log("awaiting audit...")
			var audited = await audit(inca,exta);
			R.audit = audited

console.log("audit.flag:",R.audit.flag)
// if audit found anything sketchy we stop
			if(R.audit.flag=='stop'){
	throw Error ('audit.flag wz stop due to ',R.audit.msg);
	process.exit()
}
*/

/* -----------------------------------------------
// audit wz clean so we're sending
*/
console.log("--------------------> NORMLY WE SEND "+inca.length+" DOCUMENTS TO MLAB...");
// console.log("--------------------> sending "+inca.length+" documents to MLAB...");
// sent = await send(inca);


// console.log("SENT",sent)

// if(sent.documents.n !== inca.length){
// 	console.log("ERROR: mismatching in sent ("+sent.documents.n+') and incoming raw ('+inca.length+'),  exiting...');
// 	process.exit();
// }

/* -----------------------------------------------
console.log("--------------------> sending "+inca.length+" documents to MLAB...");
sent = await send(inca);
console.log("SENT",sent)
if(sent.documents.n !== inca.length){
	console.log("ERROR: mismatching in sent ("+sent.documents.n+') and incoming raw ('+inca.length+'),  exiting...');
	process.exit();
}
*/

/* -----------------------------------------------
*/



/* -----------------------------------------------
// Now we repeat bu and most_recent cuzzits gonna have sent.documents.length more
var bu2 = await extant();
console.log("getting most recent bu again (should be newer than before");
var ext_source2 = await most_recent();
console.log("it's:",ext_source2);
console.log("ELASTIFYING!");
var E = await elastify(ext_source2);
*/

console.log("let's summarize the new stuff...")

var summary = await summarize_incoming(inca);

        console.log(JSON.stringify(summary))
        // write(summary);

}

} catch(error) {
	console.error(error);
}
// console.log("WANNA BACK UP DEM GEOMS, CHUMP? ./Users/ccmiller/Documents/cbb-bu-geoms.sh ")
} //main

main();

var __ = require('underscore')
,FS = require('fs')
,CONFIG = require("./Config.json")
,FSTREAM = require("fstream")
,TAR = require("tar-fs")
,PATH = require('path')
,ZLIB = require('zlib')
,MONGO = require('mongodb').MongoClient
,MOMENT = require('moment')
;

// var geobud = async () =>{

// 	return new Promise((resolve, reject)=>{

		var runid = MOMENT().format('YYYY_MMMM_DD_dddd_hh_mm_ss');
		var bud = CONFIG.budir+"/"+runid;
		var buf = "bu-geo."+runid+".json";
		var but = bud+".tar";
		
// Use connect method to connect to the Server
	const uri = "mongodb://cecois:r0mjwrD61vaRhWKn@cbbcluster0-shard-00-00-wdqp7.gcp.mongodb.net:27017,cbbcluster0-shard-00-01-wdqp7.gcp.mongodb.net:27017,cbbcluster0-shard-00-02-wdqp7.gcp.mongodb.net:27017/test?ssl=true&replicaSet=cbbcluster0-shard-0&authSource=admin&retryWrites=true";
	const client = new MONGO(uri, {
		useNewUrlParser: true
	});
	client.connect(err => {
		if (err) console.log(err);
		const col = client.db("cbb").collection("missings");
		// perform actions on the collection object
		col.find().limit(999999).toArray((err, docs) => {
			// if (err) {
				
				client.close();
				FS.writeFile(buf,JSON.stringify(docs),(err,res)=>{

					if(err){console.log(err)}

})//writefile
// 			} else {
// 				client.close();
// 				reject();
// 				// res.jsonp(docs);
// 				// db.close();
// 			}
		}); //.find.toarray
	});
		

		// resolve()
	// });

// }


// var main = async () =>{
// 	try {

// 		let geobu = geobud();
// 		console.log(geobu);

// } catch(error) {
// 	console.error(error);
// }
// }

// main();

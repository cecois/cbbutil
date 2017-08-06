var Db = require('mongodb').Db,
MongoClient = require('mongodb').MongoClient,
Server = require('mongodb').Server,
ReplSetServers = require('mongodb').ReplSetServers,
ObjectID = require('mongodb').ObjectID,
Binary = require('mongodb').Binary,
GridStore = require('mongodb').GridStore,
Grid = require('mongodb').Grid,
Code = require('mongodb').Code,
FS = require('fs'),
BSON = require('mongodb-core').BSON
Db = require('mongodb').Db,
FS = require('fs')
,assert = require('assert')
,__ = require('underscore')
,MOMENT = require('moment')
,CONFIG = require("./Config.json")
,FSTREAM = require("fstream")
,TAR = require("tar-fs")
,ZLIB = require('zlib')
;



var url = 'mongodb://'+CONFIG.mongouser+':'+CONFIG.mongopsswd+'@'+CONFIG.mongohost+':'+CONFIG.mongoport+'/'+CONFIG.mongodb;

var infile = null;


var get_bit = async (db, q)=>{
	return await db.collection('bits').findOne(q).count()
};

var test_incoming = async(f)=>{
	var problems = [];

	__.each(f,async (d)=>{

		var q = {"instance":d.instance}

		var is = await get_bit(q);

		console.log("is",is);

})//each

	return problems;
};
var count_incoming = async(f)=>{
	return f.length;
};

var get_incoming = async()=>{
	return new Promise(function (resolve, reject) {
		FS.readFile('../cbb-live-json.json', (e,d)=>{
			if (e) {
				reject(e);
			} else {
				resolve(JSON.parse(d));
			}
		});
	});
}


// var set_incoming = async () =>{
// 	console.log("running set_incoming...");
// 	try {

// 		await FS.readFile('../cbb-live.json', (e,d)=>{
// 			if (e) throw e;
// 			infile=JSON.parse(d)
// 		});

// 	} catch(error) {
// 		console.error(error);
// 	}
// }

var run = async ()=>{
	
	var a = await get_incoming();
	var b = await test_incoming(a);
	console.log("test_incoming result",b);

}

// FS.readFile('/Users/ccmiller/git/cbbutil/updaters/cbb-live-json.json', (e,d)=>{console.log(JSON.parse(d))});
run();
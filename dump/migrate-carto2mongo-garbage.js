var __ = require ('underscore')
,HANDLEBARS = require('handlebars')
,CONFIG = require("./Config.json")
,FSTREAM = require("fstream")
,TAR = require("tar-fs")
,PATH = require('path')
,ZLIB = require('zlib')
,DB = require('mongodb').Db
,RP = require('request-promise')
,MONGO = require('mongodb').MongoClient
,MID = require('mongodb').ObjectID
// ,DOOKIE = require('dookie')
// ,Server = require('mongodb').Server
// ,ReplSetServers = require('mongodb').ReplSetServers
// ,ObjectID = require('mongodb').ObjectID
// ,Binary = require('mongodb').Binary
// ,GridStore = require('mongodb').GridStore
// ,Grid = require('mongodb').Grid
// ,Code = require('mongodb').Code
// ,BSON = require('mongodb-core').BSON
,FS = require('fs')
// ,assert = require('assert')
,MOMENT = require('moment')
;

var incoming = async (ln) =>{
	return new Promise(function(resolve, reject) {
		var r = {}

		// var ln = '/Users/ccmiller/Downloads/cbb_poly_curl.json'

		FS.readFile(ln,async (e,d)=>{
			if(e){console.log("readfile err");
			r.flag='stop'
			r.msg='read of json failed'
			reject(e)
		}
		else
		{
			var DJ = JSON.parse(d)

			r.flag=null
			r.msg = "incoming "+ln+" with "+DJ.features.length
			r.payload = DJ.features
			resolve(r)
		}

		})//readfile

	});
}

var near = async (cartos) =>{
	return new Promise(function(resolve, reject) {


		// const url = 'mongodb://localhost:27017/cbb';
		const url = "mongodb://app:7GT8Cdl*fq4Z@cl00-shard-00-00-uacod.mongodb.net:27017,cl00-shard-00-01-uacod.mongodb.net:27017,cl00-shard-00-02-uacod.mongodb.net:27017/garbage?ssl=true&replicaSet=CL00-shard-0&authSource=admin";

		
		{
 var Q = {$nearSphere: {
      $geometry: {
         type : "Point",
         coordinates : [ -71.13398562,42.35308229 ]
      },
      $minDistance: 0,
      $maxDistance: 500
   }
 }}

 var Q2 = { geometry: { $geoNear: { $geometry: { type: "Point", coordinates: [ -71.042822,42.345330 ] } } } }


		// console.log(IA);process.exit();

		MONGO.connect(url,(err, db)=>{
			if(err) resolve(err);
			var col = db.collection('guesses');
			col.find(Q2).limit( 1 ).toArray(function(err, docs) {
				if(err){reject(err)}
    console.log("Found the following records");
    console.dir(__.first(docs));
    resolve(docs)
  });

		});


	});
}

var send = async (cartos) =>{
	return new Promise(function(resolve, reject) {


		// const url = 'mongodb://localhost:27017/cbb';
		const url = "mongodb://app:7GT8Cdl*fq4Z@cl00-shard-00-00-uacod.mongodb.net:27017,cl00-shard-00-01-uacod.mongodb.net:27017,cl00-shard-00-02-uacod.mongodb.net:27017/garbage?ssl=true&replicaSet=CL00-shard-0&authSource=admin";

		var IA = []

		__.each(cartos,(c)=>{
			// console.log(c)
			IA.push(c)})


		// console.log(IA);process.exit();

		MONGO.connect(url,(err, db)=>{
			if(err) resolve(err);
			var col = db.collection('guesses');
			col.insertMany(IA).then((r)=>{
				db.close();
				resolve({msg:r});
			});

		});


	});
}



var main = async () =>{
	var R = {}
	try {

		// var incomingz = [
		// '/Users/ccmiller/Downloads/garbagebot.geojson'
		// // ,'/Users/ccmiller/Downloads/cbb_line.geojson'
		// ]

		// __.each(incomingz,async (ln)=>{

		// 	var inca = await incoming(ln);
		// 	console.log(ln+":"+inca.payload.length)
		// 	var sent = await send(inca.payload)
		// 	console.log(sent.msg)

		// })
await near();
		// var incapoly = await incoming_curl_poly();
		// console.log(incapoly.msg)
		// var sent = await send(incapoly.payload)
		// console.log(sent.msg)


} catch(error) {
	console.error(error);
}
}

main();

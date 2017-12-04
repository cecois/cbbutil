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

var incoming_curl_poly = async () =>{
	return new Promise(function(resolve, reject) {
		var r = {}

// e.g. from ...
// curl "https://pugo.cartodb.com/api/v1/sql?q=select%20cartodb_id,name,confidence,anno,created_at,scnotes,updated_at,ST_AsGeoJSON(the_geom)%20as%20the_geom%20from%20cbb_poly%20ORDER%20BY%20cartodb_id%20desc%20LIMIT%201;" -o ~/Downloads/cbb-poly-curl-sql.json;

		var ln = '/Users/ccmiller/Downloads/cbb-poly-curl-sql.json'

		FS.readFile(ln,async (e,d)=>{
			if(e){console.log("readfile err");
			r.flag='stop'
			r.msg='read of json failed'
			reject(e)
		}
		else
		{
			var DJ = JSON.parse(d)

			var msg = "incoming rows length:"+DJ.rows.length

			var asgj = {
				"type": "FeatureCollection",
				"features": []
			}
			var fea = __.map(DJ.rows,(h)=>{
				
				//     {
    //   "type": "Feature",
    //   "geometry": {
    //     "type": "Point",
    //     "coordinates": [
    //       -119.043217,
    //       34.161676
    //     ]
    //   },
    //   "properties": {
    //     "name": "California State University Channel Islands",
    //     "anno": "home of: metriculating Chili Pepps",
    //     "confidence": "high",
    //     "cartodb_id": 295,
    //     "created_at": "2015-04-03T10:51:29Z",
    //     "updated_at": "2015-04-03T10:52:05Z",
    //     "scnotes": null
    //   }
    // }
    var g = {
    	"type":"Feature",
    	"geometry": JSON.parse(h.the_geom),
    	properties: {
    		"name": h.name,
    		"anno": h.anno,
    		"confidence": h.confidence,
    		"cartodb_id": h.cartodb_id,
    		"created_at": h.created_at,
    		"updated_at": h.updated_at,
    		"scnotes": h.scnotes
    	}
				}; //g

				return g
			})
			msg+="...after map, fea.length"+fea.length
			asgj.features=fea;
			r.flag=null
			r.msg = msg
			r.payload = asgj.features
			resolve(r)
		}

		})//readfile

	});
}

var send = async (cartos) =>{
	return new Promise(function(resolve, reject) {


		// const url = 'mongodb://localhost:27017/cbb';
		const url = "mongodb://app:7GT8Cdl*fq4Z@cl00-shard-00-00-uacod.mongodb.net:27017,cl00-shard-00-01-uacod.mongodb.net:27017,cl00-shard-00-02-uacod.mongodb.net:27017/cbb?ssl=true&replicaSet=CL00-shard-0&authSource=admin";

		var IA = []

		__.each(cartos,(c)=>{
			// console.log(c)
			IA.push(c)})


		// console.log(IA);process.exit();

		MONGO.connect(url,(err, db)=>{
			if(err) resolve(err);
			var col = db.collection('geo');
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

		var incomingz = [
		'/Users/ccmiller/Downloads/cbb_point.geojson',
		'/Users/ccmiller/Downloads/cbb_line.geojson'
		]

		// __.each(incomingz,async (ln)=>{

		// 	var inca = await incoming(ln);
		// 	console.log(ln+":"+inca.payload.length)
		// 	var sent = await send(inca.payload)
		// 	console.log(sent.msg)

		// })

		var incapoly = await incoming_curl_poly();
		console.log(incapoly.msg)
		var sent = await send(incapoly.payload)
		console.log(sent.msg)


} catch(error) {
	console.error(error);
}
}

main();

var __ = require ('underscore')
,CONFIG = require("./Config.json")
,FSTREAM = require("fstream")
,MONGO = require('mongodb').MongoClient
,MID = require('mongodb').ObjectID
,FS = require('fs')
// ,assert = require('assert')
,MOMENT = require('moment')
;

var test = () =>{
	return new Promise(function(resolve, reject) {

		var uriTestDb = "mongodb://app:7GT8Cdl*fq4Z@cl00-shard-00-00-uacod.mongodb.net:27017,cl00-shard-00-01-uacod.mongodb.net:27017,cl00-shard-00-02-uacod.mongodb.net:27017/cbb?ssl=true&replicaSet=CL00-shard-0&authSource=admin";
		MONGO.connect(uriTestDb, function(err, db) {
			console.log(db);
			db.close();
		});

	});
}



var main = async () =>{
	var R = {}
	try {

		var testc = await test();

	} catch(error) {
		console.error(error);
	}
}

main();

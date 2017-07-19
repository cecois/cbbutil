var MONGOCLIENT = require('mongodb').MongoClient,
Db = require('mongodb').Db,
// Server = require('mongodb').Server,
// ReplSetServers = require('mongodb').ReplSetServers,
FS = require('fs')
// BSON = require('mongodb-core').BSON
,assert = require('assert')
,__ = require('underscore')
// ,J2CSV = require('json2csv')
,Config = require("./Config.json")
;

var url = 'mongodb://'+Config.mongouser+':'+Config.mongopsswd+'@'+Config.mongohost+':'+Config.mongoport+'/'+Config.mongodb;

var get_bit = function(db, CEEBEE){
	db.collection('bits').findOne()
	.then(function(doc) {
		if(!doc)
			throw new Error('No record found.');
      console.log(doc);//else case
      CEEBEE();
  });

}//get_bitz

var get_live = function(CEEBEE){

	console.log("running getlive...")

	FS.readFile('../cbb-live.json', function read(err, data) {
		if (err) {
			throw err;
		}
		content = JSON.parse(data);

    console.log("content:",content);   // Put all of the code here (not the best solution)
}); //readfile
	} //get_live


	get_live()
var Db = require('mongodb').Db,
MONGOCLIENT = require('mongodb').MongoClient,
Server = require('mongodb').Server,
ReplSetServers = require('mongodb').ReplSetServers,
// ObjectID = require('mongodb').ObjectID,
// Binary = require('mongodb').Binary,
// GridStore = require('mongodb').GridStore,
// Grid = require('mongodb').Grid,
// Code = require('mongodb').Code,
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

// MONGOCLIENT.connect(url, function(err, db) {
	// assert.equal(null, err);

	// if(err){console.log("error connecting to "+Config.mongohost+"...");} else {console.log("connected to "+Config.mongohost+", fetching bits...");}

	// get_bit(db, function() {
	// 	db.close();
	// });
// });

get_live()
var Db = require('mongodb').Db,
MongoClient = require('mongodb').MongoClient,
Server = require('mongodb').Server,
ReplSetServers = require('mongodb').ReplSetServers,
ObjectID = require('mongodb').ObjectID,
Binary = require('mongodb').Binary,
GridStore = require('mongodb').GridStore,
Grid = require('mongodb').Grid,
Code = require('mongodb').Code,
// FS = require('fs'),
BSON = require('mongodb-core').BSON
,assert = require('assert')
,__ = require('underscore')
// ,J2CSV = require('json2csv')
,Config = require("./Config.json")
;




var url = 'mongodb://'+Config.mongouser+':'+Config.mongopsswd+'@'+Config.mongohost+':'+Config.mongoport+'/'+Config.mongodb;

var get_bitz = function(db, CEEBEE) {


var BZ =db.collection('bits').findOne();


console.log(typeof BZ);

CEEBEE();



}//get_bitz

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);

if(err){console.log("error connecting to "+Config.mongohost+"...");} else {console.log("connected to "+Config.mongohost+", fetching bits...");}

  get_bitz(db, function() {
    db.close();
  });
});

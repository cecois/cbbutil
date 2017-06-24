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
,assert = require('assert')
,__ = require('underscore')
,MOMENT = require('moment')
// ,J2CSV = require('json2csv')
,CONFIG = require("./Config.json")
,FSTREAM = require("fstream")
,TAR = require("tar-fs")
,ZLIB = require('zlib')
;


var url = 'mongodb://'+CONFIG.mongouser+':'+CONFIG.mongopsswd+'@'+CONFIG.mongohost+':'+CONFIG.mongoport+'/'+CONFIG.mongodb;
var runid = MOMENT().format('YYYY_MMMM_dddd_hh_mm_ss');
var bud = CONFIG.budir+"/"+runid;
var buf = "bu."+runid+".json";
var but = bud+".tar";

var bu = function(set,runid){

console.log("backing up runid:"+runid+"...");


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

    }
});

    }
}); 



 



}


// collection.find({'_id':o_id}, function(err, cursor){
//     cursor.toArray(callback);
//     db.close();
// });

var get_bitz = function(db, CEEBEE) {

var D = db.collection('bits').find(
	// {"episode":281}
	{}
	// { episode : {$ne : null} }
	,function(err,cursor){
if(err){console.log(err);process.exit(1);} else {

console.log("successful query, processing cursor...");

cursor.toArray(function(err,docs){
if(err){console.log("conversion of cursor to array bombed out w/ ",err)} else {
bu(docs,runid)

db.close();
CEEBEE();
}


}) //toarray
}

  });

}

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);

if(err){console.log("error connecting to "+CONFIG.mongohost+"...");} else {console.log("connected to "+CONFIG.mongohost+", fetching bits...");}


  get_bitz(db, function() {
    
  });
});
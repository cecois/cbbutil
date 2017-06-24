var Db = require('mongodb').Db,
MongoClient = require('mongodb').MongoClient,
Server = require('mongodb').Server,
ReplSetServers = require('mongodb').ReplSetServers,
ObjectID = require('mongodb').ObjectID,
Binary = require('mongodb').Binary,
GridStore = require('mongodb').GridStore,
Grid = require('mongodb').Grid,
Code = require('mongodb').Code,
FS = require('fs')
,ZLIB = require('zlib')
;


var output = FS.createWriteStream('/tmp/test.gz');
var compress = ZLIB.createGzip();
/* The following line will pipe everything written into compress to the file stream */
compress.pipe(output);
/* Since we're piped through the file stream, the following line will do: 
   'Hello World!'->gzip compression->file which is the desired effect */
compress.write('Hello, World!');
compress.end();
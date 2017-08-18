<<<<<<< HEAD
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
=======
var MONGO = require('mongodb')
__ = require('underscore')
,FS = require('fs')
,RP = require('request-promise')
,CONFIG = require('./Config.json')
;


var test = async(i,e)=>{
  return new Promise((resolve, reject) => {

    var missingz = __.filter(i,async (d)=>{

      return (__.pluck(e,'finder'),d.finder!==true)

    })
    resolve(missingz)
  });//promise
}


var get_incoming = async()=>{
  return new Promise((resolve, reject) => {
    FS.readFile('../cbb-news-json.json',async (e,d)=>{
      if(e){reject(e)}
        else
        {
          var inc = __.map(JSON.parse(d),(b)=>{

            return {
              "episode":b.episode,
              "show":b.show,
              "tstart":b.tstart,
              "tend":b.tend,
              "instance":b.instance,
              "bit":b.bit,
              "elucidation":b.elucidation,
              "tags":b.tags,
              "location_type":b.location_type,
              "location_id":b.location_id,
              "updated_at":b.updated_at,
              "url_soundcloud":b.url_soundcloud,
              "created_at":b.created_at,
              "slug_soundcloud":b.slug_soundcloud,
              "slug_earwolf":b.slug_earwolf,
              "episode_title":b.episode_title,
              "episode_guests":b.episode_guests,
              "id_wikia":b.id_wikia,
              "holding":b.holding
              ,"finder":b.instance+b.bit+b.tags
            }

          });
          resolve(inc);
        }

  })//readfile
  });//promise
}

var get_extant = async (inc)=>{

  var eps = __.map(__.unique(__.pluck(inc,'episode')),(e)=>{

    return {episode:e}

  })//map

  // console.log("eps,",JSON.stringify(eps));

  // process.exit()

  var options = {
    uri: 'https://api.mlab.com/api/1/databases/cbbbits/collections/bits',
    qs: {
      apiKey:CONFIG.mongokey
        // ,q: '{ $or: [ { "episode": 498 }, { "episode": 498 } ] }' // -> uri + '?access_token=xxxxx%20xxxxx'
        ,q: '{ $or: '+JSON.stringify(eps)+' }' // -> uri + '?access_token=xxxxx%20xxxxx'
      },
      headers: {
        'User-Agent': 'Request-Promise'
      },
    json: true // Automatically parses the JSON string in the response
  }

  try {
    const response = await RP(options);
    var inc = __.map(response,(b)=>{
      return {episode:b.episode,finder:b.instance+b.bit+b.tags}
    });
    return Promise.resolve(inc);
  }
  catch (error) {
    return Promise.reject(error);
  }
}



var run = async()=>{

  // get the stuff on file (reduced to {episode:ep,finder:f})
  var inc = await get_incoming()

  // get bits in mongo
  var ext = await get_extant(inc)

  // var R ={}

  var d = await test(inc,ext);

  // R.length=d.length
  console.log(JSON.stringify(d))
}


// send inc and ext to a tester that  will find potential dups
// await test(inc,ext)
// }

run();
>>>>>>> c9865e7ab3aa8a85bd2f4eadb3f1b923625e7330

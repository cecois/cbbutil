var __ = require('underscore')
,FS = require('fs')
,CONFIG = require("./Config.json")
,FSTREAM = require("fstream")
,TAR = require("tar-fs")
,PATH = require('path')
,ZLIB = require('zlib')
,DB = require('mongodb').Db
,MLAB = require('mongolab-data-api')(CONFIG.mongokey)
, MONGO = require('mongodb').MongoClient
,ELASTIC = require('elasticsearch')
,MOMENT = require('moment')
,CHEERIO = require('cheerio')
,AXIOS = require('axios')
,CLOUDINARY = require('cloudinary').v2
;


const _INCOMING_GEOM_BITS = async () =>{

				console.log("fetching location bits...");
	return new Promise((resolve,reject)=>{
		var options = {
			database: CONFIG.mongodb,
			collectionName: CONFIG.mongocollx,
			query: '{"bit":"Location"}',
			limit:999999999,
			setOfFields: '{show:0,elucidation:0,url_soundcloud:0,tagarray:0,tagarray_og:0,created_at:0,slug_soundcloud:0,id_wikia:0,time:0,holding:0}'
		};
		MLAB.listDocuments(options, function (err, data) {
			if(err){reject(err);console.log(err);}else {
				console.log("resolving "+data.length);
				resolve(data)
			}
		});
})//promise
}//extant

const _TEST_BITS_OG1 = async (bits) =>{

const MAX_REQUESTS_COUNT = 5
const INTERVAL_MS = 10000
let PENDING_REQUESTS = 0
// create new axios instance
const api = AXIOS.create({})
/**
 * Axios Request Interceptor
 */
api.interceptors.request.use(function (config) {
  return new Promise((resolve, reject) => {
    let interval = setInterval(() => {
      if (PENDING_REQUESTS < MAX_REQUESTS_COUNT) {
        PENDING_REQUESTS++
        console.log('PENDING_REQUESTS:',PENDING_REQUESTS)
        
        console.log("clearing interval")
        clearInterval(interval)
        resolve(config)
      } 
    }, INTERVAL_MS)
  })
})
/**
 * Axios Response Interceptor
 */
api.interceptors.response.use(function (response) {
  PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
  return Promise.resolve(response)
}, function (error) {
  PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
  return Promise.reject(error)
})

return new Promise((resolve,reject)=>{
let R=[]

__.each(__.first(bits,55),async(chunk,i,l)=>{
	__.each(chunk,async (p,i,l)=>{
		console.log("testing "+p)
		let test = await api.get('http://localhost:8080/geoms/cbb?q='+p)
		if(!test.data[0]){console.log(p+" FAILED");R.push(p)}
		if(i+1==l.length){resolve(R);}
	})//each.chunk
})//each.bits

})//promise
}//test

const _TEST_BITS_OG0 = async (bits) =>{

	return new Promise((resolve,reject)=>{
		let R=[]
__.each(__.map(bits,(b)=>{return b.location_type+':'+b.location_id}),async (gid,i,l)=>{
	console.log("testing "+'http://milleria.org:3030/geoms/cbb?q='+gid+'...')
	let test = await AXIOS.get('http://milleria.org:3030/geoms/cbb?q='+gid)
	if(!test.data[0].properties.name){console.log("FAILED:::",gid);R.push(gid)}
	if(i+1==l.length){resolve(R);}
});

})//promise
}//test_bits

const _INCOMING_GEOMS = async (locs) =>{

// let Q = {
// 		"$or":
// 		__.map(__.first(locs,5),(l)=>{
// 			let tq = 

// 			return {"$and":[{"location_type":l.split(":")[0]},{"properties.cartodb_id":l.split(":")[1]}]}
// 		})
// 	}

var clauses = __.map(locs, (p) => {
				var pa = p.split(":")
					, pat = '';
				switch (pa[0]) {
					case 'point':
						pat = 'Point'
						break;
					case 'poly':
						pat = 'Polygon'
						break;
					case 'line':
						pat = 'Line'
						break;
					default:
						// statements_def
						break;
				}
				var qt = {
					"geometry.type": {
						"$regex": ".*" + pat + ".*"
					}
				}
				var qv = {
					$or:[{"properties.cartodb_id": parseInt(pa[1])},{"properties.cartodb_id": pa[1]}]
				}
				return {
					$and: [qt, qv]
				}
			}); //map
			var Q = {
				$or: clauses
			}

let FL = {
	"geometry.type":1,
	"properties.cartodb_id":1,
	"properties.name":1
}

	return new Promise((resolve,reject)=>{
var url = 'mongodb://cecois:r0mjwrD61vaRhWKn@cbbcluster0-shard-00-00-wdqp7.gcp.mongodb.net:27017,cbbcluster0-shard-00-01-wdqp7.gcp.mongodb.net:27017,cbbcluster0-shard-00-02-wdqp7.gcp.mongodb.net:27017/test?ssl=true&replicaSet=cbbcluster0-shard-0&authSource=admin&retryWrites=true';
			// Use connect method to connect to the Server
			MONGO.connect(url, (err, client) => {
				console.log("Connected correctly to server");
				const db = client.db('cbb');
				var col = db.collection('geo');
				col.find(Q,FL).limit(999999).toArray((err, docs) => {
					if (err) {
						console.log("ATLAS ERROR:",err)
						reject(err)
						db.close();
					} else {
						// res.send(JSON.stringify(docs));
						resolve(docs);
						db.close();
					}
				}); //.find.toarray
			}); //.connect

		
})//promise
}//test_bits

const _TEST_BITS = async (bits,locs) =>{
console.log("testing _.difference...")
console.log('bits.length:',bits.length);
console.log('locs.length:',locs.length);
return new Promise((resolve,reject)=>{

let bmap = __.map(locs,(l)=>{
return l.geometry.type.toLowerCase().replace('multi','').replace('gon','').replace('string','')+':'+l.properties.cartodb_id
})

console.log(__.difference(bits,bmap).length+" mismatches, resolving...")
	resolve(__.difference(bits,bmap))

})//promise
	}//test

const _AUDIT = async () =>{
	
const gbits = await _INCOMING_GEOM_BITS();
console.log(gbits.length+" incoming location bits")
let mbits = __.map(gbits,(b)=>{return b.location_type+':'+b.location_id});
let ubits = __.uniq(mbits);
console.log(ubits.length+" *uniq* incoming mapped bits (likely less)")
let locs = await _INCOMING_GEOMS(ubits)
const tests = await _TEST_BITS(ubits,locs);
console.log(tests)
}

_AUDIT();
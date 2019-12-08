var __ = require('underscore')
,FS = require('fs')
,CONFIG = require("./Config.json")
,FSTREAM = require("fstream")
,ZLIB = require('zlib')
,PATH = require('path')
,ZLIB = require('zlib')
,MONGO = require('mongodb').MongoClient
,MOMENT = require('moment')
;

const _WRITEGEOMS = async(G)=>{

		let runid = MOMENT().format('YYYY_MMMM_DD_dddd_hh_mm_ss');
		let bujson = "bu-geo."+runid+".json";

let FI = CONFIG.budir+'/'+bujson
let FIG = CONFIG.budir+'/'+bujson+'.gz'

	return new Promise((resolve, reject)=>{

		FS.writeFile(FI, JSON.stringify(G), 'utf8', (err)=>{
    if (err) {
        reject(err)
    }

const fileContents = FS.createReadStream(FI);
    const writeStream = FS.createWriteStream(FIG);
    const zip = ZLIB.createGzip();
    fileContents.pipe(zip).pipe(writeStream).on('finish', (err) => {
      if (err) {reject(err)} else {

FS.unlink(FI, (err)=>{
if(err)reject(err)
	resolve()
})//unlink

      }//finish.err.else
      // resolve();
    })

})//writefile
    
})//promise

}//writegeoms

const _GETGEOMS = async () =>{

	return new Promise((resolve, reject)=>{
		
	const uri = "mongodb://cecois:r0mjwrD61vaRhWKn@cbbcluster0-shard-00-00-wdqp7.gcp.mongodb.net:27017,cbbcluster0-shard-00-01-wdqp7.gcp.mongodb.net:27017,cbbcluster0-shard-00-02-wdqp7.gcp.mongodb.net:27017/test?ssl=true&replicaSet=cbbcluster0-shard-0&authSource=admin&retryWrites=true";

			MONGO.connect(uri, (err, client) => {
				const db = client.db('cbb');
				var col = db.collection('geo');
				col.find().toArray((e, r) => {
					if(e){client.close();reject(e)}
					client.close();
					resolve(r)
				});
			});
	});//promise

}//GETGEOMS


const _MAIN = async () =>{

console.log("awaiting GETGEOMS...")
		const geoms = await _GETGEOMS();

console.log("...got "+geoms.length+"...");
console.log("writing out...")

const tarball = await _WRITEGEOMS(geoms);

process.exit()


}//main

_MAIN();
const Nominatim = require('node-nominatim2')
,MOMENT = require('moment')
,FS = require('fs')
,PROMPT = require('prompt')
,DB = require('mongodb').Db
,MONGO = require('mongodb').MongoClient
,MID = require('mongodb').ObjectID
;



var sendfake = async (F,mid,anno)=>{

	return new Promise((resolve, reject)=>{

		// const url = 'mongodb://localhost:27017/cbb';
		const url = "mongodb://app:7GT8Cdl*fq4Z@cl00-shard-00-00-uacod.mongodb.net:27017,cl00-shard-00-01-uacod.mongodb.net:27017,cl00-shard-00-02-uacod.mongodb.net:27017/cbb?ssl=true&replicaSet=CL00-shard-0&authSource=admin";


FS.readFile(F,(err,data)=>{

	var J = JSON.parse(data);



var O = {
	geometry:J[0].geojson
	,properties:{name:J[0].display_name.split(",")[0]
		,anno:anno
		,confidence:null
		,cartodb_id:parseInt(mid)
		,created_at:MOMENT().format('YYYY-MM-DDTHH:mm:ss')+'Z'
		,updated_at:MOMENT().format('YYYY-MM-DDTHH:mm:ss')+'Z'
		,scnotes:"temporary nominatimizor"}
};



		MONGO.connect(url,(err, db)=>{
			if(err) reject(err);
			var col = db.collection('geo');
			col.insert(O).then((r)=>{
				db.close();
				resolve({msg:r});
			});

		});//mongo.connect
})//fs.readfile

		});//promise

}//sendfake

var send = async (G,mid,anno)=>{

	return new Promise((resolve, reject)=>{

		// const url = 'mongodb://localhost:27017/cbb';
		const url = "mongodb://app:7GT8Cdl*fq4Z@cl00-shard-00-00-uacod.mongodb.net:27017,cl00-shard-00-01-uacod.mongodb.net:27017,cl00-shard-00-02-uacod.mongodb.net:27017/cbb?ssl=true&replicaSet=CL00-shard-0&authSource=admin";

var O = {
	type:"Feature",
	geometry:G[0].geojson
	,properties:{name:G[0].display_name.split(",")[0]
		,anno:anno
		,confidence:null
		,cartodb_id:parseInt(mid)
		,created_at:MOMENT().format('YYYY-MM-DDTHH:mm:ss')+'Z'
		,updated_at:MOMENT().format('YYYY-MM-DDTHH:mm:ss')+'Z'
		,scnotes:"temporary nominatimizor"}
};


		MONGO.connect(url,(err, db)=>{
			if(err) reject(err);
			var col = db.collection('geo');
			col.insert(O).then((r)=>{
				db.close();
				resolve({msg:r});
			});

		});//mongo.connect
		});//promise

}//send

var get = async ()=>{


const options = {
  useragent: 'test',
  referer: 'https://github.com/xbgmsharp/node-nominatim2',
  timeout: 1000
},

NOM = new Nominatim(options);

return new Promise((resolve,reject)=>{


var Q = {
  q: "Westchester County Airport",
  addressdetails: 0,
  format: 'json',
  limit: 1,
  polygon_geojson:1,
  'accept-language': 'en'
};

NOM.search(Q, (err, res, N)=>{
  if (err) throw err;

var npath = "/tmp/nom-"+N[0].place_id+"-"+MOMENT().format('YYYY.MMM.DD_HH_mm_ss')+".geojson"
		FS.writeFile(npath,JSON.stringify(N),(err,suc)=>{

			if(err){reject(err);}
			else {
				resolve(N)
			}

});//fs.write
	})//nom.search
})//promise
	}//get




var main = async () =>{

var N = await get();

PROMPT.start();
PROMPT.get(['yesno'
	,'id'
	,'anno'
	], async (err, result)=>{
    //
    // Log the results.
    //
    // console.log('  yesno: ',result.yesno);
    // console.log('  id: ',result.id);
    // console.log('  anno: ',result.anno);

    if(result.yesno=='yes'){
    var sent = await send(N,result.id,result.anno);
    // var F = "/tmp/line.geojson"
    // var sent = await sendfake(F,result.id,result.anno);
    console.log("sent",sent);
}//yesno
  });//prompt.get

}//main

main()
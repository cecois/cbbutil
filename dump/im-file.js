const Nominatim = require('node-nominatim2')
,MOMENT = require('moment')
,FS = require('fs')
,PROMPT = require('prompt')
,DB = require('mongodb').Db
,MONGO = require('mongodb').MongoClient
,MID = require('mongodb').ObjectID
,COLORS = require('colors')
;

var send = async (G)=>{

	return new Promise((resolve, reject)=>{

		// const url = 'mongodb://localhost:27017/cbb';
		const url = "mongodb://app:7GT8Cdl*fq4Z@cl00-shard-00-00-uacod.mongodb.net:27017,cl00-shard-00-01-uacod.mongodb.net:27017,cl00-shard-00-02-uacod.mongodb.net:27017/cbb?ssl=true&replicaSet=CL00-shard-0&authSource=admin";

		MONGO.connect(url,(err, db)=>{
			if(err) reject(err);
			var col = db.collection('geo');
			col.insert(G).then((r)=>{
				db.close();
				resolve({msg:r});
			});

		});//mongo.connect
		});//promise

}//send

var process = async (F)=>{

return new Promise((resolve,reject)=>{

console.log("reading ",F);
FS.readFile(F.posix,(e,d)=>{
	if(e)reject(e);

	var J = JSON.parse(d);

	var geometry = J.features[0].geometry
	var properties = J.features[0].properties

	delete properties.osm_id;
delete properties.osm_id;
        delete properties.osm_way_id;
        delete properties.type;
        delete properties.aeroway;
        delete properties.amenity;
        delete properties.admin_level;
        delete properties.barrier;
        delete properties.boundary;
        delete properties.building;
        delete properties.craft;
        delete properties.geological;
        delete properties.historic;
        delete properties.land_area;
        delete properties.landuse;
        delete properties.leisure;
        delete properties.man_made;
        delete properties.military;
        delete properties.natural;
        delete properties.office;
        delete properties.place;
        delete properties.shop;
        delete properties.sport;
        delete properties.tourism;
        delete properties.other_tags;

var tat = MOMENT().format('YYYY-MM-DDTHH:mm:ss')+'Z';

properties.anno=F.anno;
properties.cartodb_id=F.cartodb_id;
properties.scnotes=F.scnotes;
properties.confidence=null;
properties.created_at=tat;
properties.updated_at=tat;


var O ={
	geometry:geometry,
	properties:properties,

}

resolve(O);

})//fs.read


})//promise
	}//get


var main = async () =>{

return new Promise((resolve,reject)=>{


PROMPT.message = COLORS.rainbow("Question!");
  PROMPT.delimiter = COLORS.green("<<<<");

  PROMPT.start();

  PROMPT.get({
    properties: {
      name: {
        description: COLORS.magenta("Did you set ./im-param.json?")
      }
    }
  },(err, result)=>{
    if(err) reject(err);

FS.readFile('./im-param.json',async (e,d)=>{

if(e) reject(e);

var j = JSON.parse(d);

var N = await process(j);

var sent = await send(N);
    resolve(sent)

})

  });
})//promise


// PROMPT.get([
// 	,'yesno'
// 	// ,'anno'
// 	], async (err, result)=>{

		


//     	console.log("here's N...");
//     	console.log(JSON.stringify(N));
//     // var sent = await send(N,result.id,result.anno);
//     // var F = "/tmp/line.geojson"
//     // var sent = await sendfake(F,result.id,result.anno);
//     // console.log("sent",sent);
//   });//prompt.get

}//main

main()
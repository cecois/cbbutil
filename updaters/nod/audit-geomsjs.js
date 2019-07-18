var __ = require('underscore')
,FS = require('fs')
,CONFIG = require("./Config.json")
,FSTREAM = require("fstream")
,TAR = require("tar-fs")
,PATH = require('path')
,ZLIB = require('zlib')
,DB = require('mongodb').Db
// ,MLAB = require('mongolab-data-api')(CONFIG.mongokey)
,ELASTIC = require('elasticsearch')
,MOMENT = require('moment')
,CHEERIO = require('cheerio')
,AXIOS = require('axios')
,CLOUDINARY = require('cloudinary').v2
;


const _INCOMING_GEOM_BITS = async () =>{

	return new Promise((resolve,reject)=>{
		var options = {
			database: CONFIG.mongodb,
			collectionName: CONFIG.mongocollx,
			query: {bit:"Location"},
			limit:999999999
		};
		MLAB.listDocuments(options, function (err, data) {
			if(err){reject(err)}else {
				resolve(data)
			}
		});
})//promise
}//extant

const _AUDIT = async () =>{
	
const gbits = await _INCOMING_GEOM_BITS();


}

_AUDIT();
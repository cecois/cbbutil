var __ = require('underscore')
,FS = require('fs')
,HANDLEBARS = require('handlebars')
,CONFIG = require("./Config.json")
,FSTREAM = require("fstream")
,TAR = require("tar-fs")
,REQUEST = require('request')
,CHEERIO = require('cheerio')
,PATH = require('path')
,ZLIB = require('zlib')
,RP = require('request-promise')
,MOMENT = require('moment')
,JIMP = require('jimp')
// ,DOWNLOAD = require('image-downloader')
;


var write = async = async (UF)=>{

	return new Promise((resolve,reject)=>{



		var npath = "./bu/updates-"+MOMENT().format('YYYY.MMM.DD_HH_mm_ss')+".json"
		FS.writeFile(npath,JSON.stringify(UF),(err,suc)=>{

			if(err){reject(err);} else {

				FS.writeFile('../../site/v2/src/offline/update.json',JSON.stringify(R),(err,suc)=>{

					if(err){reject(err);} else
					{				resolve(suc)}
				})

			}

		})

})//promise
}//write



var figure_figure=async(o)=>{

	return new Promise((resolve,reject)=>{

		var fake = false;
		var uri = (fake==true)?"http://localhost:8000":"http://www.earwolf.com/episode/"+o.slug

console.log("figuring figure from here:",uri);

		REQUEST({'url':uri,'proxy':CONFIG.proxy}, (err, response, body)=>{

			if (err && response.statusCode !== 200) {
				reject(err);
			} else {
				var $ = CHEERIO.load(body);

// here we grab all the <meta elements from the earwolf html
var pimgz = __.filter($('meta[property="og:image"]'),(I)=>{
					// we only return those with IMG_
					// N.B. very fragile1! when they get a new camera it will break
					return ($(I).attr('content').indexOf("IMG_")>0)

})//filter.imgz

// console.log("meta objects of type og:image:",pimgz.length);

// console.log("sampling one for the url base");

var sample = $(__.first(pimgz)).attr('content').split("/")

var qimg = __.first(__.map(pimgz,(I)=>{
	var splitted = $(I).attr('content').split("/")
	return __.first(sample,sample.length-1).join("/")+"/"+splitted[(splitted.length-1)]
						})//map
			)//first

// console.log("source will be:",qimg);

var outn = "cbb.ep."+o.episode+".jpg"
var outf = "/tmp/"+outn
// console.log("outfile will be:",outf);


// var source = await __.first(sample,sample.length-1).join("/")+"/"+qimg

// Download to a directory and save with an another filename
var I={source:qimg,outfile:outf}
// console.log("I.source",I.source);
// console.log("I",I);


options = {
	url: I.source,
	dest: I.outfile
}


/* ------------------------------------- JIMP DIRECT
*/
JIMP.read(I.source).then((lenna)=>{
    lenna.resize(333, 222)            // resize 
         .quality(60)                 // set JPEG quality 
         // .greyscale()                 // set greyscale 
         .write(I.outfile); // save 
}).catch(function (err) {
    console.error(err);
});


/* ------------------------------------- DOWNLOAD IMG
DOWNLOAD.image(options)
		.then(({ out, image }) => {
	console.log('File saved to', options.dest)
	I.image_file_local=options.dest
    resolve(I) // => /path/to/dest/image.jpg it
}).catch((err) => {
	throw err
})
*/


        } //subrequest.statuscode
}) //subrequest

})//promise

}


// var download_img = async (options)=>{

// return new Promise((resolve,reject)=>{

// 		const { filename, image } = DOWNLOAD.image(options)
// 		.then(({ filename, image }) => {
// 	console.log('File saved to', filename)
//     resolve(filename) // => /path/to/dest/image.jpg
// }).catch((err) => {
// 	throw err
// })

// })//promise

// }

var imagify = async (U)=>{


	return new Promise((resolve,reject)=>{

		var imdgz = [];
		__.each(U.report,async (r,i,l)=>{

			var o =r;
			o.image=await figure_figure(r)
			if(typeof o.image!=='undefined'){imdgz.push(o)}

				if((i+1) == l.length){
					console.log((i+1)+" equals "+l.length+" so we resolve imdgz of len:"+imdgz.length)
					resolve(imdgz)
				}
			})

})//promise

}//imagify

var summarize = async (bits) =>{

	return new Promise((resolve, reject)=>{

		// var episodes_updated = __.uniq(__.pluck(bits,'episode'));

		var episodes_updated = __.uniq(__.map(bits,(E)=>{var o = E.episode+"."+E.slug_earwolf;return o; }));

		var reports = () => __.map(episodes_updated,(e,i,l)=>{
			var epno = parseInt(e.split(".")[0])
			var epslug = e.split(".")[1]
			var O = {episode:epno,slug:epslug,ep_url:"http://www.earwolf.com/episode/"+epslug}
			var eps_bits = __.pluck(__.filter(bits,{episode:epno}),'bit');

			O.raw_bits = eps_bits;
			var beets = __.map(__.uniq(eps_bits),(m)=>{
				var o = {
					bit:m
					,count:__.filter(eps_bits,(li)=>{return li==m;}).length
				}; //o
				return o;
			});//map.beets
			O.bits_sum=beets;
			return O;
		})//map

		var R = {
			date:MOMENT().format('YYYY.MMM.DD'),
			episodes:bits.length+" bits from "+episodes_updated.length+" episodes (eps "+__.map(episodes_updated,(E)=>{return E.split(".")[0]}).join(", ")+")",
			report:reports()
		}

		resolve(R);

	});//Promise
}//summarize




var incoming = async (ln) =>{
	return new Promise(function(resolve, reject) {
		var r = {}

		var F = '../cbb-'+ln+'.json';
		// console.log("reading in from "+F)

		FS.readFile(F,async (e,d)=>{
			if(e){console.log("readfile err");
			r.flag='stop'
			r.msg='read of *.json failed'
			reject(e)
		}
		else
		{
			var DJ = JSON.parse(d)
			r.flag=null
			r.msg = "incoming "+ln+" with "+DJ.length
			// console.log("read successful: "+r.msg)
			r.payload = DJ
			resolve(r)
		}

		})//readfile

	});
}


var main = async () =>{
	var R = {}
	R.audit = {flag:null}

	try {
		var ln = process.argv[2]

		if(__.contains(['news','live','fake','fantastic'],ln)!==true){
			throw("typo prolly");
			process.exit();
		} else {

/* -----------------------------------------------
// read in incoming bits from $ln file
// msg notes length, payload is actual bits
*/
var inc = await incoming(ln);
R.incoming=inc.msg
var inca = inc.payload

// console.log("inca.length",inca.length)


/* -----------------------------------------------
// GEN update summary
*/
// console.log("we'll prep an update...")
var summary = await summarize(inca);

var update  = await imagify(summary);
// console.log("UPDATE:")
console.log(update)
// console.log("let's end this :-?")

}

} catch(error) {
	console.error(error);
}
}

main();

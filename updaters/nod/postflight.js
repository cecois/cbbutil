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
,DELAY = require('delay')
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

		var fake = true;
		var uri = (fake==true)?"http://localhost:8000":"http://www.earwolf.com/episode/"+o.slug
		var uri = "http://www.earwolf.com/episode/"+o.slug

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

if(typeof pimgz == 'undefined' || pimgz.length==0){
	console.log("uri "+uri+" had no meta tags")
	console.log("heres raw cheerio title",$('title').text())

} else {


	var sample = $(__.first(pimgz)).attr('content').split("/")

	var qimg = __.first(__.map(pimgz,(I)=>{
		var splitted = $(I).attr('content').split("/")
		return __.first(sample,sample.length-1).join("/")+"/"+splitted[(splitted.length-1)]
						})//map
			)//first

	var outn = o.slug+".jpg"
	var outf = "/tmp/"+outn
	var I={source:qimg,outfile:outf}


	options = {
		url: I.source,
		dest: I.outfile
	}


/* ------------------------------------- JIMP DIRECT
*/
JIMP.read(I.source).then((lenna)=>{
    lenna.resize(444, JIMP.AUTO)            // resize
         .quality(70)                 // set JPEG quality
         // .greyscale()                 // set greyscale
         .write(I.outfile,(i)=>{resolve(i)}) // save

       }).catch(function (err) {
       	console.error(err);
       });


        } //subrequest.statuscode

        }//else.meta.tags

}) //subrequest

})//promise

}

var imagify = async (U)=>{


	return new Promise((resolve,reject)=>{

		var imdgz = [];
		__.each(U.report,async (r,i,l)=>{

			var o =r;
			o.image=await figure_figure(r)
			if(typeof o.image!=='undefined'){imdgz.push(o)}

				console.log("currently at "+(i+1)+" of "+l.length)

			if(imdgz.length == l.length){
				console.log(imdgz.length+" equals "+l.length+" so we resolve")
				resolve(imdgz)
			}
		})

})//promise

}//imagify

var summarize = async (bits) =>{

	return new Promise((resolve, reject)=>{

		// var episodes_updated = __.uniq(__.pluck(bits,'episode'));

		var episodes_updated = __.uniq(__.map(bits,(E)=>{var o = E.episode+":::"+E.slug_earwolf;return o; }));

		var reports = () => __.map(episodes_updated,(e,i,l)=>{
			// var epno = parseInt(e.split(":::")[0])
			var epno = e.split(":::")[0]
			var epslug = e.split(":::")[1]
			var O = {episode:epno,image:'null',slug:epslug,ep_url:"http://www.earwolf.com/episode/"+epslug}
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
			date:MOMENT().format('YYYY.MMM.DD')
			,query:"("+__.map(episodes_updated,(e)=>{return "episode:"+e.split(":::")[0]}).join(" OR ")+")"
			,episodes:bits.length+" bits from "+episodes_updated.length+" episodes (eps "+__.map(episodes_updated,(E)=>{return E.split(":::")[0]}).join(", ")+")",
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

var write = async(UP)=>{

	return new Promise((resolve,reject)=>{

		// console.log("UPJ in write:",UPJ)
		// var UP = JSON.parse(UPJ);

		// console.log("UP in write:",UP)

		// var episodes_updated = __.uniq(__.pluck(UP,'episode'));

		// console.log("episodes_updated in write:",episodes_updated)

		// var reports = () => __.map(episodes_updated,(e,i,l)=>{
		// 	var O = {episode:e}
		// 	var eps_bits = __.pluck(__.filter(UP,{episode:e}),'bit');
		// 	console.log("eps_bits in write:",eps_bits)
		// 	var ep_image = __.pluck(__.filter(UP,{episode:e}),'image');
		// 	O.image=ep_image[0];
		// 	O.raw_bits = eps_bits;
		// 	var beets = __.map(__.uniq(eps_bits),(m)=>{
		// 		var o = {
		// 			bit:m
		// 			,count:__.filter(eps_bits,(li)=>{return li==m;}).length
		// 		}; //o
		// 		return o;
		// 	});//map.beets
		// 	O.bits_sum=beets;
		// 	return O;
		// })//map

		// var R = {
		// 	date:MOMENT().format('YYYY.MMM.DD'),
		// 	episodes:UP.length+" bits from "+episodes_updated.length+" episodes ("+episodes_updated.join(", ")+")",
		// 	report:reports()
		// }

		var npath = "./bu/updates-"+MOMENT().format('YYYY.MMM.DD_HH_mm_ss')+".json"

		// resolve(npath)
		FS.writeFile(npath,JSON.stringify(UP),(err,suc)=>{

			if(err){reject(err);} else {

				FS.writeFile('../../site/v2/src/offline/update.json',JSON.stringify(UP),(err,suc)=>{

					if(err){reject(err);} else
					{				resolve(npath)}
				})

			}

		})//fs.write

})//promise

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

console.log("inca.length",inca.length)


/* -----------------------------------------------
// GEN update summary
*/
var summary = await summarize(inca);


        imagify(summary)
        write(summary);
        console.log("/tmp")


}

} catch(error) {
	console.error(error);
}
}

main();

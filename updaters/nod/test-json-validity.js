var __ = require('underscore')
,FS = require('fs')
;

var incoming = async (ln) =>{
	return new Promise(function(resolve, reject) {
		var r = {}

		FS.readFile('../cbb-news.json',async (e,d)=>{
			if(e){console.log("readfile err");reject(e);

		}
		else
		{
			var DJ = JSON.parse(d)
			console.log(DJ.length+" bits")
			resolve(r)
		}

		})//readfile

	});
}


var main = async () =>{
	var R = {}

	try {
		var inc = await incoming();


	} catch(error) {
		console.error(error);
	}
}

main();

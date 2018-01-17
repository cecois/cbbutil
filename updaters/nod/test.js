var __ = require('underscore')
,FS = require('fs')
;

var incoming = async (ln) =>{
	return new Promise(function(resolve, reject) {
		var r = {}

		FS.readFile('../'+ln+'.json',async (e,d)=>{
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

		var ln = process.argv[2]

		if(__.contains(['news','live','fake','fantastic'],ln)!==true){
			throw("typo prolly");
			process.exit();
} else {
		var inc = await incoming('cbb-'+ln);
	
}

	} catch(error) {
		console.error(error);
	}
}

main();

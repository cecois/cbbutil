var FS = require('fs')
,REQUEST = require('request')
;


function getQuote() {
	return new Promise(function(resolve, reject) {
		REQUEST("http://localhost:8787/dev/nasa", function(error, response, body) {
			if (error) return reject(error);
			resolve(body);
		});
	});
}

function getOther() {
	return new Promise(function(resolve, reject) {
		REQUEST("http://localhost/stall/", function(error, response, body) {
			if (error) return reject(error);
			resolve(body);
		});
	});
}

async function main() {
	try {
		var quote = await getQuote();
		var other = await getOther();
		var arr = [quote,other]
		console.log(arr);
	} catch(error) {
		console.error(error);
	}
}

main();
console.log('nasa y nist sez,');
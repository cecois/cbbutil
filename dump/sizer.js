const __ = require('underscore')
,FS=require('fs');

var max = {place:null,length:10000}

let G = JSON.parse(FS.readFileSync('/Users/ccmiller/Documents/bu/cbb/bu-geo.2019_December_06_Friday_08_32_04.json'));

__.each(G,(g)=>{
	console.log("testing ", g.properties.name);
	let l = __.flatten(g.geometry.coordinates).length
	max=(l>max.length)?{length:l,place:g.properties.name}:max
})

console.log("biggest is ",max);
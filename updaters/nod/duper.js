const FS=require('fs')
,__=require('underscore')

const bits = JSON.parse(FS.readFileSync('../cbb-smc.json'));

let un=__.map(bits,(b)=>{return b.episode+':::::::::'+b.bit+':::::::::'+b.tags+':::::::::'+b.instance;});

// console.log(un.join('\r\n'))

__.each(bits,(b)=>{
	if(!__.contains(un,b.episode+':::::::::'+b.bit+':::::::::'+b.tags+':::::::::'+b.instance)){
		console.log(b.episode+':::::::::'+b.bit+':::::::::'+b.tags+':::::::::'+b.instance)
	}
})


var ELASTIC = require('elasticsearch')
,FS = require('fs')
,__ = require('underscore')
;


var client = new ELASTIC.Client({
	host: 'milleria.org:9200',
	log: 'trace'
});


var elastic_array =[];



FS.readFile('bu/bu.2017_December_05_Tuesday_10_49_20.json',(err,dat)=>{
	if(err){console.log(err);process.exit();}


	var datm = __.map(JSON.parse(dat),(D)=>{


		var ob = {
			_id:D._id.$oid
			// ,body:{
				,episode:D.episode.toString()
				,tstart:D.tstart
				,tend:D.tend
				,instance:D.instance
				,bit:D.bit
				,elucidation:D.elucidation
				,tags:D.tags
				,location_type:D.location_type
				,location_id:D.location_id
				,updated_at:D.updated_at
				,created_at:D.created_at
				,slug_earwolf:D.slug_earwolf
				,episode_title:D.episode_title
				,episode_guests:D.episode_guests
				,holding:D.holding
			// }
		}

		return ob

	})

	__.each(datm,(D)=>{
		elastic_array.push({
			index: {
				_index: 'cbb',
				_type: 'bit',
				_id: D._id
			}
		});
		delete D._id
		elastic_array.push(D);
	})

	console.log("expect:",elastic_array.length)
	client.bulk({
		timeout: '5m',
		body: elastic_array
	}).then(function (success) {
		// console.log(JSON.stringify(success));
	}, function (err) {
		console.log(JSON.stringify(err));
	});

	// __.each(datm,(D)=>{

		// client.index({
		// 	index: 'cbb',
		// 	type: 'bit',
		// 	id:D._id,
		// 	body: D.body
		// }, (err,res)=>{

		// 	if(err){console.log(err);}

		// });

	// })

})

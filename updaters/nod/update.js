

var main = async () =>{
	try {
		var ln = process.argv[2]

		if(ln!=='live' || ln !== 'news'){
			throw("typo prolly");
			process.exit();
		}
		// get a batch of 311s
		// var guess = await guess();
		// get extant carto records - this could eventually get unwieldy #returnto
		// var cartoz = await get_cartoz();

		// var s311j=JSON.parse(s311z)

		// clean list of carto tid values
		// var extantz = __.pluck(JSON.parse(cartoz).rows,'tid')
		console.log(arg1)

		// var tweet_data = await associate_garbage(keepz)
		// var sent_tweets = await tweetem(tweet_data)
		

	} catch(error) {
		console.error(error);
	}
}

main();
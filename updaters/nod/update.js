

var main = async () =>{
	try {
		var ln = process.argv[2]

		if(ln!=='live' || ln !== 'news'){
			throw("typo prolly");
			process.exit();
		}
		// SERIES:
		// read bits from file
		// determine the episodes in question
		// fetch from mongo those episodes (instances only prolly)
		// for each incoming bit, throw its episode+instance couple against same from mongo
		// any matches alert, exit

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
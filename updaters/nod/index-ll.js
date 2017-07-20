var MONGO = require('mongodb')
__ = require('underscore')
,FS = require('fs')
,Config = require('./Config.json')
;



/* ------------------------------------------------------------------------------------------ begin func ---- */

var set = async (ln) =>{
  return ln
  console.log("setter, ln",ln)
  try {
      // var ln = process.argv[2]

      if(ln!=='live' || ln !== 'news'){
        throw("typo prolly");
        return null
      } else {

        return "lnJ:"+ln
      }
    // SERIES:
    // read bits from file
    // determine the episodes in question
    // fetch from mongo those episodes (instances only prolly)
    // for each incoming bit, throw its episode+instance couple against same from mongo
    // any matches alert, exit

    // clean list of carto tid values
    // var extantz = __.pluck(JSON.parse(cartoz).rows,'tid')

    // var tweet_data = await associate_garbage(keepz)
    // var sent_tweets = await tweetem(tweet_data)


  } catch(error) {
    console.error(error);
  }
}

var main = async(ln)=>{

  console.log("awaiting main, ln",ln)
  var which = await set(ln);
  console.log("which from setter:",which)
}

main(process.argv[2]);

  // logfinder('apache');
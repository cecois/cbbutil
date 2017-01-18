var request = require('request');
var clipboard = require('child_process').spawn('pbcopy')
var $ = require('cheerio')
var moment = require('moment')
var fs = require('fs')

var url = process.argv[2]

// request(q, function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//    var js = JSON.parse(body)
//     // console.log(js.response.docs) // Show the HTML for the Google homepage.
//     var bit = js.response.docs[0].bit;
//     var elucidation = js.response.docs[0].elucidation;
//     // var d = "bit:'"+bit+"',elucidation:'"+elucidation+"',"
//     var d = '"bit":"'+bit+'","elucidation":"'+elucidation+'",'
//     clipboard.stdin.write(d);
//     clipboard.stdin.end();
//   }
// })

// var domain = 'http://www.earwolf.com/episode/'+slug
// var HTML = request(url)


function SCRAPE(err, resp, html) {
  if (err) return console.error(err)
var parsedHTML = $.load(html)

var fs = require('fs');
fs.writeFile("/tmp/cbb-frm-node.html", parsedHTML, function(err) {
    if(err) {
        return console.log(err);
    }

});
// var htmlString = fs.readFileSync('/tmp/cbb.html').toString()
// var parsedHTML = $.load(htmlString)

D=[]
D.show="cbb"
D.tstart="yy:yy"
D.tend="xx:xx"

D.instance="xx"
D.bit="xx"
D.location_type="xx"
D.location_id="xx"
D.tags=""
D.id_wikia=null
D.holding='false'

var dnow = moment().format('YYYY-MM-DDTHH:mm:ss')+'Z'
D.updated_at=dnow
D.created_at=dnow

// http://www.earwolf.com/episode/prepare-the-quake/
D.slug_earwolf=url.split('/')[4]

parsedHTML('.showtitle').map(function(i, foo) {
  var s = $(foo)
  D.episode_title=s.text();
})

parsedHTML('.title__h2').map(function(i, foo) {
  // var u = $(foo).attr('href')
  var u = "href"
  D.url_soundcloud=u+"/#t=yy:yy";
  // D.url_soundcloud="/#t=yy:yy";
})

parsedHTML('html head title').map(function(i, foo) {
  var str0 = $(foo)
  var str1 = str0.text().split("#");
  var str2 = str1[1].split(" ");
  D.episode=parseInt(str2[0], 10);
})

    // var d = '"episode_title":"'+title+'","episode":'+num+','
    console.log(D);
    process.exit();
    // clipboard.stdin.write(d);
    // clipboard.stdin.end();
//SCRAPE
}

    request(url, SCRAPE)
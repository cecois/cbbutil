var request = require('request');
var clipboard = require('child_process').spawn('pbcopy')
var sys = require('util')
var moment = require('moment')
var exec = require('child_process').exec;

var qs = process.argv[2]
var qss = qs.replace(" ","+")

// var q = 'http://solr-lbones.rhcloud.com/cbb_bits/select?wt=json&rows=1&q=episode:'+qss;
var q = 'http://localhost:9200/cbb/_search?pretty&from=0&size=1&q=episode:'+qss;

request(q, function (error, response, body) {
  if (!error && response.statusCode == 200) {
  	var js = JSON.parse(body)

    var now = moment()

    var episode = parseInt(js.hits.hits[0]._source.episode);
    var show = "cbb";
    var tstart = js.hits.hits[0]._source.tstart;
    var tend = js.hits.hits[0]._source.tend;
    var instance = "";
    var bit = "";
    var elucidation = "";
    var location_type = js.hits.hits[0]._source.location_type;
    var location_id = js.hits.hits[0]._source.location_id;
    var updated_at = now.format('YYYY-MM-DDTHH:mm:ss')+'Z'
    // var url_soundcloud = js.hits.hits[0]._source.slug_soundcloud;
    var url_soundcloud = null;
    var tags = js.hits.hits[0]._source.tags;
    var created_at = now.format('YYYY-MM-DDTHH:mm:ss')+'Z'
    // var slug_soundcloud = js.hits.hits[0]._source.slug_soundcloud.split("comedybangbang/")[1].split("/#t")[0]
    var slug_soundcloud = null;
    var slug_earwolf = js.hits.hits[0]._source.slug_earwolf;
    var episode_title = js.hits.hits[0]._source.episode_title;
    var episode_guests = js.hits.hits[0]._source.episode_guests;
    var id_wikia = parseInt(js.hits.hits[0]._source.id_wikia);
    var holding = js.hits.hits[0]._source.holding;

    var b = {"episode":episode
    ,"show":show
    ,"tstart":tstart
    ,"tend":tend
    ,"instance":instance
    ,"bit":bit
    ,"elucidation":elucidation
    ,"tags":tags
    ,"location_type":location_type
    ,"location_id":location_id
    ,"updated_at":updated_at
    ,"url_soundcloud":url_soundcloud
    ,"created_at":created_at
    ,"slug_soundcloud":slug_soundcloud
    ,"slug_earwolf":slug_earwolf
    ,"episode_title":episode_title
    ,"episode_guests":episode_guests
    ,"id_wikia":id_wikia
    ,"holding":holding
}

    // var d = "bit:'"+bit+"',elucidation:'"+elucidation+"',"
    // var d = '"bit":"'+bit+'","elucidation":"'+elucidation+'",'
    clipboard.stdin.write(JSON.stringify(b));
    clipboard.stdin.end();
    exec("noti -t CBB -m back from Solr");
}
})

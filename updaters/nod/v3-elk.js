const __ = require('underscore'),
    FS = require('fs'),
    FSND = require('fs-ndjson'),
    CONFIG = require("./Config.json"),
    FSTREAM = require("fstream"),
    TAR = require("tar-fs"),
    PATH = require('path'),
    ZLIB = require('zlib'),
    ELASTIC = require('elasticsearch'),
    MOMENT = require('moment'),
    CHEERIO = require('cheerio'),
    AXIOS = require('axios'),
    CLOUDINARY = require('cloudinary').v2,
    CBBUTIL = require('./util');

CLOUDINARY.config({
    cloud_name: CONFIG.cloudinary.cloud_name,
    api_key: CONFIG.cloudinary.api_key,
    api_secret: CONFIG.cloudinary.api_secret
});

const _LAUNDERTAGS = (T) => {
        let maptags = __.map(T, (t) => {
                switch (t.trim()) {
                    case "Scott's Nephew Todd":
                        return t;
                        break;
                    case "Scott's nephew Todd":
                        return "Scott's Nephew Todd";
                        break;
                    case "Todd's Nephew Todd":
                        return "Scott's Nephew Todd";
                        break;
                    case "Beth":
                        return "Power Wheels Beth";
                        break;
                    default:
                        return t.trim()
                } //switch
            }) //map

        if (
            __.contains(maptags, "Hey Nineteen (song)")
        ) {
            maptags.push("Steely Dan (musical combination)")
        }

        return __.uniq(maptags);
    } //laundertags

const _LAUNDERELUCIDATION = (E) => {
        switch (E) {
            case "somebody (tiny, often) reviews music":
                return "somebody reviews music";
                break;
            case "(in progress) - scott's questions":
                return "scott's questions";
                break;
            default:
                return E
        } //switch
    } //_LAUNDERELUCIDATION

const _DO_IMAGE = async(earurl) => {

    return new Promise((resolve, reject) => {

            AXIOS.get(earurl)
                .then(function(response) {

                    // first check earwolf for the image
                    $ = CHEERIO.load(response.data)
                    let firstimgbxmigurl = $(".epimgbox").first().find("a > img").attr('src')

                    if (firstimgbxmigurl) {
                        let ear_img_url = firstimgbxmigurl
                            // if img send it to clou
                        CLOUDINARY.uploader.unsigned_upload(ear_img_url, 'brqz4ggs', null, (e, d) => {
                            resolve(d.url);
                        });
                    } else {
                        // if none resolve w/ generic
                        resolve('https://res.cloudinary.com/cecois/image/upload/v1566654886/EAR_COVER_ComedyBangBang_2018Refresh_3000x3000_Final-300x300.jpg')
                    }

                })
                .catch((error) => {
                    // Error 😨
                    if (error.response) {
                        /*
                         * The request was made and the server responded with a
                         * status code that falls out of the range of 2xx
                         */
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        resolve('https://res.cloudinary.com/cecois/image/upload/v1566654886/EAR_COVER_ComedyBangBang_2018Refresh_3000x3000_Final-300x300.jpg')
                    } else if (error.request) {
                        /*
                         * The request was made but no response was received, `error.request`
                         * is an instance of XMLHttpRequest in the browser and an instance
                         * of http.ClientRequest in Node.js
                         */
                        console.log(error.request);
                        resolve('https://res.cloudinary.com/cecois/image/upload/v1566654886/EAR_COVER_ComedyBangBang_2018Refresh_3000x3000_Final-300x300.jpg')
                    } else {
                        // Something happened in setting up the request and triggered an Error
                        console.log('Error', error.message);
                        resolve('https://res.cloudinary.com/cecois/image/upload/v1566654886/EAR_COVER_ComedyBangBang_2018Refresh_3000x3000_Final-300x300.jpg')
                    }
                });

        }) //promise
}

const _REPORTS = async(rarr, bits) => {

    return new Promise((resolve, reject) => {
            let R = [];

            __.each(rarr, async(e, i, l) => {

                    var epno = e.split(":::")[0]
                    var epslug = e.split(":::")[1]

                    let img = 'https://res.cloudinary.com/cecois/image/upload/v1566654886/EAR_COVER_ComedyBangBang_2018Refresh_3000x3000_Final-300x300.jpg'
                    if (epslug.indexOf('http') >= 0) {
                        img = 'https://res.cloudinary.com/cecois/image/upload/v1566654886/EAR_COVER_ComedyBangBang_2018Refresh_3000x3000_Final-300x300.jpg'
                    } else {
                        img = await _DO_IMAGE("http://www.earwolf.com/episode/" + epslug);
                    }

                    var O = {
                        episode: epno,
                        image: img,
                        slug: epslug,
                        ep_url: epno.indexOf('http') >= 0 ? epno : "http://www.earwolf.com/episode/" + epslug
                    }

                    var eps_bits = __.pluck(__.filter(bits, (b) => {
                        return b.episode == epno
                    }), 'bit');

                    var beets = __.map(__.uniq(eps_bits), (m) => {
                        var o = {
                            bit: m,
                            count: __.filter(eps_bits, (li) => {
                                return li == m;
                            }).length
                        }; //o
                        return o;
                    }); //map.beets
                    O.bits_sum = beets;
                    R.push(O)
                    if (i == l.length - 1) {
                        resolve(R)
                    }
                }) //map

        }) //promise
}

var _AUDIT = async(inc, ext) => {
        return new Promise(function(resolve, reject) {

            console.log("audit flag null to start")
            var flag = null;

            // map some values together as a kinda informal key
            var inc_finder = __.map(inc, (b) => {
                return b.episode + "---->" + b.bit + "---->" + b.instance
            })
            var ext_finder = __.map(ext, (b) => {
                return b.episode + "---->" + b.bit + "---->" + b.instance
            })

            console.log("intersecting " + inc_finder.length + " incomings against " + ext_finder.length + " extants...")
                // see if any match
            var candidates = __.intersection(inc_finder, ext_finder);

            console.log("candidates.length (zero is good)", candidates.length)
            if (candidates.length > 0) {
                console.log("CANDIDATES::", candidates)
            }
            // if there's even 1 we need to halt and investigate so we set the flag we check at the end to stop
            flag = (candidates.length > 0) ? 'stop' : 'go';
            flag = CBBUTIL.auditGeoms(inc_finder);
            console.log("flag", flag);

            var r = {
                flag: flag,
                msg: "of " + inc.length + " incoming bits, " + candidates.length + " were sketchy - see console"
            }
            resolve(r)
        }); //Promise
    } //audit

/*const _SEND = async(bits) => {
    return new Promise(function(resolve, reject) {

        var options = {
            database: CONFIG.mongodb,
            collectionName: CONFIG.mongocollx,
            documents: bits
        };
        MLAB.insertDocuments(options, function(err, d) {
            if (err) {
                reject(err)
            } else {

                resolve({
                    documents: d
                });
            } //err.else
        }); //MONGO.connecdt

    }); //Promise
}*/

const _SENDSUMMARY = async(update) => {
    console.log("   in sendsummary...")
    return new Promise(function(resolve, reject) {

        var options = {
            database: CONFIG.mongodb,
            collectionName: 'updates',
            documents: update
        };
        console.log("   ...options:", options)
        MLAB.insertDocuments(options, function(err, d) {
            if (err) {
                console.log(err);
                reject(err)
            } else {

                resolve({
                    update_response: d
                });
            } //err.else
        }); //MONGO.connecdt

    }); //Promise
}

var _INCOMING = async(ln) => {
    return new Promise(function(resolve, reject) {
        var r = {}

        var F = '../cbb-' + ln + '.json';
        console.log("reading in from " + F)

        FS.readFile(F, async(e, d) => {
                if (e) {
                    console.log("readfile err");
                    r.flag = 'stop'
                    r.msg = 'read of *.json failed'
                    reject(e)
                } else {
                    var DJ = JSON.parse(d)
                    r.flag = null
                    r.msg = "incoming " + ln + " with " + DJ.length
                    console.log("read successful: " + r.msg)
                    r.payload = DJ
                    resolve(r)
                }

            }) //readfile

    });
}

// const _reports = async (epadhocids,inca) => {
// return new Promise((resolve,reject)=>{

// resolve(__.map(epadhocids,async (e,i,l)=>{
// 			var epno = e.split(":::")[0]
// 			var epslug = e.split(":::")[1]

// 			var O = {episode:epno,image:'null',slug:epslug,ep_url:"http://www.earwolf.com/episode/"+epslug}

// 			var eps_bits = __.pluck(__.filter(inca,(b)=>{
// 				return b.episode==epno}),'bit');

// 			var beets = __.map(__.uniq(eps_bits),(m)=>{
// 				var o = {
// 					bit:m
// 					,count:__.filter(eps_bits,(li)=>{return li==m;}).length
// 				}; //o
// 				console.log("o:",o);
// 				return o;
// 			});//map.beets
// 			O.bits_sum=beets;
// 			console.log('returning O:',O)
// 			return O;
// 		})//map
// )//resolve
// })//promise
// }//_reports

const _SUMMARIZE = async(bits) => {

        return new Promise(async(resolve, reject) => {

            let episodes_updated = __.uniq(__.map(bits, (E) => {
                var o = E.episode + ":::" + E.slug_earwolf;
                return o;
            }));
            let plur = episodes_updated.length > 1 ? 's' : ''

            // "2019-04-01T09:37:04Z"
            // MOMENT().format('YYYY-MM-DDTHH:hh:mm:ssZ');
            let R = {
                date: MOMENT().format('YYYY-MM-DDTHH:hh:mm:ss\\Z'),
                episodes_summary: bits.length + " bits from " + episodes_updated.length + " episode" + plur + " (ep" + plur + " " + __.map(episodes_updated, (E) => {
                    return E.split(":::")[0]
                }).join(", ") + ")",
                query: "(" + __.map(episodes_updated, (e) => {
                    return "episode:\"" + e.split(":::")[0] + '"'
                }).join(" OR ") + ")",
                eps: episodes_updated,
                reports: await _REPORTS(episodes_updated, bits)
            }

            resolve(R)

            // resolve(R);

        }); //Promise
    } //summarize

var write = async(UP) => {

    return new Promise((resolve, reject) => {

            var npath = "./bu/updates-" + MOMENT().format('YYYY.MMM.DD_HH_mm_ss') + ".json"

            FS.writeFile(npath, JSON.stringify(UP), (err, suc) => {

                    if (err) {
                        reject(err);
                    } else {

                        // FS.writeFile('../../site/v2/src/offline/update.json',JSON.stringify(UP),(err,suc)=>{

                        // 	if(err){reject(err);} else
                        // 	{				resolve(npath)}
                        // })

                    }

                }) //fs.write

        }) //promise

}

var _MOST_RECENT = async() => {

    return new Promise((resolve, reject) => {

            console.log("sniffing most recent...");
            var files = FS.readdirSync(CONFIG.budirBits);

            // use underscore for max()

            var max = __.max(__.reject(files, (f) => {
                return ((f.indexOf('.') == 0) || f.indexOf("updates") >= 0)
            }), (f) => {
                var fullpath = PATH.join(CONFIG.budirBits, f);

                // ctime = creation time is used
                // replace with mtime for modification time
                return FS.statSync(fullpath).ctime;
            });
            console.log(max);
            resolve(max);

        }) //promise
}

const _EXTANT_PARSE = async(F) => {

    return new Promise((resolve, reject) => {

            var r = {}

            console.log("reading bits from most recent *.json...");
            FS.readFile(CONFIG.budirBits + "/" + F, async(e, d) => {
                    if (e) {
                        console.log("readfile err");
                        r.flag = 'stop'
                        r.msg = 'read of *.json failed'
                        reject(e)
                    } else {
                        var DJ = JSON.parse(d)
                        r.flag = null
                        r.msg = "extant length:" + DJ.length
                        console.log("flag null, " + r.msg)
                        r.payload = DJ
                        resolve(r)
                    }

                }) //readfile

        }) //promise
}

const _EXTANT = async() => {

        return new Promise((resolve, reject) => {

                var options = {
                    database: CONFIG.mongodb,
                    collectionName: CONFIG.mongocollx,
                    query: null,
                    limit: 999999999
                };

                MLAB.listDocuments(options, function(err, data) {
                    if (err) {
                        reject(err)
                    } else {

                        console.log("into mlab, writing out...");
                        var runid = MOMENT().format('YYYY_MMMM_DD_dddd_hh_mm_ss');
                        var buf = CONFIG.budirBits + "/bu." + runid + ".json";

                        FS.writeFile(buf, JSON.stringify(data), (err, res) => {

                                if (err) {
                                    reject(err)
                                } else {

                                    resolve({
                                        flag: null,
                                        msg: "raw backup written to " + buf
                                    })

                                } //fs.writefile.if.err.else

                            }) //writefile

                    }
                });

            }) //promise
    } //extant

const _CLEAN = async(buj) => {

        console.log("here soon we will tar and remove " + buj)
    } //extant

const bu = async() => {

    return new Promise((resolve, reject) => {

        var url = 'mongodb://' + CONFIG.mongouser + ':' + CONFIG.mongopsswd + '@' + CONFIG.mongohost + ':' + CONFIG.mongoport + '/' + CONFIG.mongodb;
        var runid = MOMENT().format('YYYY_MMMM_DD_dddd_hh_mm_ss');
        var bud = CONFIG.budirBits + "/" + runid;
        var buf = "bu." + runid + ".json";
        var but = bud + ".tar";
        var r = []

        var D = db.collection('bits').find({}, (err, cursor) => {
            if (err) {
                r.flag = err;
                reject(r);
            } else {

                cursor.toArray((err, docs) => {
                        if (err) {
                            console.log("conversion of cursor to array bombed out w/ ", err)
                        } else {

                            FS.mkdir(bud, null, function(err) {
                                if (err) {
                                    return console.log(err);
                                } else {
                                    console.log("madedir " + bud + " - time to fill it with " + set.length + " bits");

                                    FS.writeFile(bud + "/" + buf, JSON.stringify(set), function(err) {
                                        if (err) {
                                            return console.log(err);
                                        } else {
                                            console.log("set backed up as " + buf + ", tarballing now...");

                                            var output = FS.createWriteStream(bud + "/" + buf + ".tgz");
                                            var compress = ZLIB.createGzip();
                                            /* The following line will pipe everything written into compress to the file stream */
                                            compress.pipe(output);
                                            // send some stuff to the compress object
                                            compress.write(JSON.stringify(set));
                                            compress.end();
                                            db.close();
                                            resolve();

                                        }
                                    });

                                }
                            });

                        }

                    }) //toarray
            }

        });

        r.push("Mongo export of N documents completed without error")
        resolve(r)
    });

}

const _MAPBITS = (bits) => {

        let mapd = __.map(bits, (b) => {

                switch (true) {
                    case !b.hasOwnProperty("episode"):
                        console.log("MISSING FIELD: EPISODE ••••>", b);
                        process.exit();
                        break;
                    case !b.hasOwnProperty("tstart"):
                        console.log("MISSING FIELD: TSTART ••••>", b);
                        process.exit();
                        break;
                    case !b.hasOwnProperty("tend"):
                        console.log("MISSING FIELD: TEND ••••>", b);
                        process.exit();
                        break;
                    case !b.hasOwnProperty("instance"):
                        console.log("MISSING FIELD: INSTANCE ••••>", b);
                        process.exit();
                        break;
                    case !b.hasOwnProperty("bit"):
                        console.log("MISSING FIELD: BIT ••••>", b);
                        process.exit();
                        break;
                    case !b.hasOwnProperty("elucidation"):
                        console.log("MISSING FIELD: ELUCIDATION ••••>", b);
                        process.exit();
                        break;
                    case !b.hasOwnProperty("location_type"):
                        console.log("MISSING FIELD: LOCATION_TYPE ••••>", b);
                        process.exit();
                        break;
                    case !b.hasOwnProperty("location_id"):
                        console.log("MISSING FIELD: LOCATION_ID ••••>", b);
                        process.exit();
                        break;
                    case !b.hasOwnProperty("slug_earwolf"):
                        console.log("MISSING FIELD: SLUG_EARWOLF ••••>", b);
                        process.exit();
                        break;
                    case !b.hasOwnProperty("episode_title"):
                        console.log("MISSING FIELD: EPISODE_TITLE ••••>", b);
                        process.exit();
                        break;
                    case !b.hasOwnProperty("episode_guests"):
                        console.log("MISSING FIELD: EPISODE_GUESTS ••••>", b);
                        process.exit();
                        break;
                    case !b.hasOwnProperty("tags"):
                        console.log("MISSING FIELD: TAGS ••••>", b);
                        process.exit();
                        break;
                } //switch

                let no = [{
                    "index": {}
                }, {
                    episode: b.episode.toString(),
                    tstart: b.tstart,
                    tend: b.tend,
                    instance: b.instance,
                    bit: b.bit,
                    elucidation: _LAUNDERELUCIDATION(b.elucidation),
                    location_type: b.location_type,
                    location_id: parseInt(b.location_id),
                    hero: b.hero ? b.hero : null,
                    updated_at: !b.hasOwnProperty("updated_at") ? b.created_at : b.updated_at,
                    created_at: !b.hasOwnProperty("created_at") ? b.updated_at : b.created_at,
                    slug_earwolf: b.slug_earwolf,
                    episode_title: b.episode_title,
                    episode_guests: __.isArray(b.episode_guests) ? b.episode_guests : b.episode_guests.split(","),
                    tags: __.isArray(b.tags) ? __.compact(_LAUNDERTAGS(b.tags)) : __.compact(_LAUNDERTAGS(b.tags.split(",")))
                }]

                return no;

            }) //map
        return mapd;
    } //mapbits

const _MAPUPDATES = (bits) => {

        let mapd = __.map(bits, (b) => {

                let no = [{
                    "index": {}
                }, {
                    date: b.date,
                    episodes_summary: b.episodes_summary,
                    query: b.query,
                    eps: b.eps,
                    reports: b.reports
                }]

                return no;

            }) //map
        return mapd;
    } //mapbits

const _ELASTIFY = async() => {

        return new Promise((resolve, reject) => {

                var client = new ELASTIC.Client({
                    host: 'milleria.org:9200',
                    requestTimeout: Infinity
                });

                let dat = require(`./${CONFIG.masterFile}`)
                    // JSON.parse(FS.readFileSync(CONFIG.budirBits + "/" + J))
                if (!dat) {
                    console.log(err);
                    process.exit();
                }

                let mapd = _MAPBITS(dat);
                let prefixes = [];

                for (var i = mapd.length - 1; i >= 0; i--) {
                    prefixes.push({
                        "index": {}
                    })
                }

                let mapz = __.zip(__.map(prefixes, (p) => {
                    return p[0]
                }), mapd)

                FSND.writeFileSync('/tmp/cbb.fndjson', __.compact(__.flatten(mapz)));

                client.bulk({
                        index: 'cbb',
                        type: '_doc',
                        body: __.compact(__.flatten(mapz))
                    }, {
                        ignore: [404],
                        maxRetries: 3
                    }, (err, result) => {
                        if (err) console.log(err)
                    })
                    .then(res => resolve(res));

            }) //promise

    } //_elastify

const _ELASTIFYUPDATES = async() => {

        return new Promise((resolve, reject) => {

                var client = new ELASTIC.Client({
                    host: 'milleria.org:9200',
                    requestTimeout: Infinity
                });

                let dat = require(`./${CONFIG.masterUpdates}`)
                if (!dat) {
                    console.log(err);
                    process.exit();
                }

                let mapd = _MAPUPDATES(dat);
                let prefixes = [];

                for (var i = mapd.length - 1; i >= 0; i--) {
                    prefixes.push({
                        "index": {}
                    })
                }

                let mapz = __.zip(__.map(prefixes, (p) => {
                    return p[0]
                }), mapd)

                FSND.writeFileSync('/tmp/cbb-updates.fndjson', __.compact(__.flatten(mapz)));

                client.bulk({
                        index: 'cbb_updates',
                        type: '_doc',
                        body: __.compact(__.flatten(mapz))
                    }, {
                        ignore: [404],
                        maxRetries: 3
                    }, (err, result) => {
                        if (err) console.log(err)
                    })
                    .then(res => resolve(res));

            }) //promise

    } //_elastify

const main = async() => {
        var R = {}
        R.audit = {
            flag: null
        }

        /*
        1. backup previous master w/ timestamp
        2. get incoming
        3. audit incoming
        4. merge previous master with incoming
        5. elastify
        6. summarize
        7. set new master
        */

        let OPS = {
            backup: false,
            incoming: false,
            audit: false,
            merge: false,
            elastify: true,
            summarize: false,
            sendupdates: false
        }

        try {
            var ln = process.argv[2]

            if (!__.contains(['geo-holding', 'news', 'live', 'live-supplement', 'fake', 'fantastic', 'adds', 'adds-supplement', 'reset', 'test', 'icona', 'literally', 'smc'], ln)) {
                throw ("typo prolly");
                process.exit();
            } else {

                if (OPS.backup) {

                    let currentMaster = require(`./${CONFIG.masterFile}`);

                    let d = `cbb.master-${MOMENT().format('YYYY-MM-DDTHH')}.json`
                    console.log(`backing up ${currentMaster.length} bits from ${CONFIG.masterFile} as ${d}...`)

                    FS.writeFileSync(`${CONFIG.budirBits}/${d}`, JSON.stringify(currentMaster))

                }

                if (OPS.incoming) {
                    console.log("processing bits from " + ln + "...")
                        /* ----------------------------------------------- parse incoming file
                        // read in incoming bits from $ln file
                        // msg notes length, payload is actual bits
                        */
                    const inc = await _INCOMING(ln);
                    R.incoming = inc.msg
                    var inca = inc.payload
                    console.log("inca.length", inca.length)
                    let eps = __.uniq(__.pluck(inca, 'episode'));
                    let maxEpisode = CBBUTIL.maxEpisode(eps);
                    console.log("maxEpisode", maxEpisode);
                }

                if (OPS.audit) {
                    /* ----------------------------------------------- audit
                    // we send the fresh stuff and the archive for audit
                    // audit maps inca and exta into comparable arrays (concatenating several presumably distinct fields [episode+bit+instance+tags] into one nonsensical but probably-unique string) - N.B. this is not foolproof
                    // as of 2022.June audit will also check for Location bits with missing keys
                    */

                    console.log("awaiting most recent...")
                    const ext_source = await _MOST_RECENT();
                    console.log("found to be:", ext_source)

                    const extant_parsed = await _EXTANT_PARSE(ext_source);
                    R.extant = extant_parsed.msg
                    var exta = extant_parsed.payload

                    console.log("awaiting audit...")
                    var audited = await _AUDIT(inca, exta);
                    R.audit = audited

                    // console.log("audit.flag:", R.audit.flag)
                    // if audit found anything sketchy we stop
                    if (R.audit.flag == 'stop') {
                        throw Error('audit.flag wz stop due to ', R.audit.msg);
                        process.exit()
                    }
                } //if.audit

                if (OPS.merge) {
                    /* ----------------------------------------------- audit
                    // we tAKE iNCoMinG and aDD to cURrEnT mAsTeR
                    */

                    console.log("awaiting master...")
                    const exta = require(`./${CONFIG.masterFile}`);

                    const inc = await _INCOMING(ln);
                    R.incoming = inc.msg
                    var inca = inc.payload

                    let newMaster = __.flatten([inca, exta])

                    FS.writeFileSync(`./${CONFIG.masterFile}`, JSON.stringify(newMaster))

                } //if.audit

                /*                if (OPS.pushMlab) {

                                    console.log("--------------------> sending " + inca.length + " documents to MLAB...");
                                    sent = await _SEND(inca);

                                    if (sent.documents.n !== inca.length) {
                                        console.log("ERROR: mismatching in sent (" + sent.documents.n + ') and incoming raw (' + inca.length + '),  exiting...');
                                        process.exit();
                                    }
                                }

                                if (OPS.pullMlab2) {
                                    const bu2 = await _EXTANT();
                                    console.log("getting most recent bu again (should be newer than before");
                                    var ext_source2 = await _MOST_RECENT();
                                    console.log("it's:", ext_source2);
                                }*/

                if (OPS.elastify) {
                    var clientTemp = new ELASTIC.Client({
                        host: 'milleria.org:9200',
                        requestTimeout: Infinity
                            // ,log: 'trace'
                    });

                    await clientTemp.deleteByQuery({
                        index: 'cbb',
                        q: '*:*'
                    });

                    console.log("ELASTIFYING!");
                    let E = await _ELASTIFY();
                }

                if (OPS.summarize) {
                    console.log("summarize " + inca.length + " new from " + ln + "...")
                    let summary = await _SUMMARIZE(inca);
                    let summaries = require(`./${CONFIG.masterUpdates}`)

                    let d = `cbb.updates-${MOMENT().format('YYYY-MM-DDTHH')}.json`
                    console.log(`backing up ${summaries.length} updates from ${CONFIG.masterUpdates} as ${d}...`)

                    FS.writeFileSync(`${CONFIG.budirUpdates}/${d}`, JSON.stringify(summaries))

                    console.log(`there are ${summaries.length} prior updates, to which we always only add 1`)

                    summaries.push(summary);

                    console.log(`... so now there are ${summaries.length} OF COURSE`)
                    console.log(`... ... which we write back out to master==./${CONFIG.masterUpdates}`)

                    FS.writeFileSync(`./${CONFIG.masterUpdates}`, JSON.stringify(summaries))
                        // let update = await _SENDSUMMARY(summary);
                }

                if (OPS.sendupdates) {
                    console.log(`elastifiying updates...`)
                    let clientTemp = new ELASTIC.Client({
                        host: 'milleria.org:9200',
                        requestTimeout: Infinity
                            // ,log: 'trace'
                    });

                    await clientTemp.deleteByQuery({
                        index: 'cbb_updates',
                        q: '*:*'
                    });

                    let E = await _ELASTIFYUPDATES();
                    console.log(`${E.items.length} updates sent w/ errors==${JSON.stringify(E)}`);
                }

            }

        } catch (error) {
            console.error(error);
        }
        console.log("WANNA BACK UP DEM GEOMS, CHUMP? USED TO BE ./geobu.js BUT NOW U USIN FILZ");
        console.log(`http://milleria.org:9200/cbb/_search?size=1&q=episode:754`)
    } //main

main();
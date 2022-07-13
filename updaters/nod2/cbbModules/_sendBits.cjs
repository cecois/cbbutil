module.exports = {
        default: (_cfg, _runid,_claxon) => {

const FS=require('fs'),
ELASTIC = require('elasticsearch'),__=require('underscore'),FSND = require('fs-ndjson');

            // rETurn oB
            let r = {
                    messages: [],
                    errors: [],
                    payload: null,
                    kill: {
                        killed: false,
                        killer: null
                    }
                },
                msg = null;
                
                
/*
                                                                                                                     _______        _______ _______ _______ _____ _______ __   __
                                                                                                                     |______ |      |_____| |______    |      |   |______   \_/
                                                                                                                     |______ |_____ |     | ______|    |    __|__ |          |
*/
const client = new ELASTIC.Client({
                    host: 'milleria.org:9200',
                    requestTimeout: Infinity
                });

                // Get currEnT deFiNitiVE - uSuaLlY "pAth/To/cBb-dEfINITiVE.JSon"
                const currentDefini = require(`${_cfg.definitiveFile}`);
                msg = `current definitive in sendBits ${_cfg.definitiveFile} presents ${currentDefini.length} bits`;
                r.messages.push(_claxon.info(msg));
                if (!currentDefini) {
                    msg = `couldn't get new definitive`;
                r.messages.push(_claxon.info(msg));
                    process.exit();
                }

                let mapd = __.map(currentDefini, (b) => {

                let no = [{
                    "index": {}
                }, {
                    episode: b.episode.toString(),
                    tstart: b.tstart,
                    tend: b.tend,
                    instance: b.instance,
                    bit: b.bit,
                    elucidation: b.elucidation,
                    location_type: b.location_type,
                    location_id: parseInt(b.location_id),
                    hero: b.hero ? b.hero : null,
                    updated_at: !b.hasOwnProperty("updated_at") ? b.created_at : b.updated_at,
                    created_at: !b.hasOwnProperty("created_at") ? b.updated_at : b.created_at,
                    slug_earwolf: b.slug_earwolf,
                    episode_title: b.episode_title,
                    episode_guests: __.isArray(b.episode_guests) ? b.episode_guests : b.episode_guests.split(","),
                    tags: __.isArray(b.tags) ? __.compact(b.tags) : __.compact(b.tags.split(","))
                }]

                return no;

            }) //map

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

                return client.bulk({
                        index: 'cbb',
                        type: '_doc',
                        body: __.compact(__.flatten(mapz))
                    }, {
                        ignore: [404],
                        maxRetries: 3
                    }, (err, result) => {
                        if (err) console.log(err)
                    })
                    // .then(res => resolve(res));

        }//default
    } //exports
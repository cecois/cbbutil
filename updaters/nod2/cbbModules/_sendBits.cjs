module.exports = {
    default: (_cfg, _claxon) => {
        const FS = require("fs"),
            ELASTIC = require("elasticsearch"),
            __ = require("underscore"),
            FSND = require("fs-ndjson");

        const LUXON = require("luxon").DateTime;

        /*
                                                                                                                     _______        _______ _______ _______ _____ _______ __   __
                                                                                                                     |______ |      |_____| |______    |      |   |______   \_/
                                                                                                                     |______ |_____ |     | ______|    |    __|__ |          |
*/
        const client = new ELASTIC.Client({
            host: _cfg.elastic.host,
            requestTimeout: Infinity,
        });

        return new Promise(async (RES, REJ) => {
            // GeT cuRreNT dEFIniTIVE sEt via coNfIG
            const currentDefini = require(`../${_cfg.definitivesFile}`);
            _claxon.info(
                `current definitive in sendBits ${_cfg.definitivesFile} presents ${currentDefini.length} bits`
            );

            // clear current index
            let del = await client.deleteByQuery({
                index: _cfg.elastic.indexBits,
                q: "*:*",
            });
            _claxon.info(
                `result of the ${_cfg.elastic.indexBits} clear: ${del.deleted} deleted`
            );

            // DIe If WE CAN'T geT it
            !currentDefini &&
                REJ(`could not access definitives at ${_cfg.definitivesFile}`);

            // mAP ThE sEt tO fNDjsoN
            let mapd = __.map(currentDefini, (b) => {
                let updatedTimeRaw = !b.hasOwnProperty("updated_at")
                        ? b.created_at
                        : b.updated_at,
                    createdTimeRaw = !b.hasOwnProperty("created_at")
                        ? b.updated_at
                        : b.created_at;

                let updatedTime = LUXON.fromISO(updatedTimeRaw),
                    createdTime = LUXON.fromISO(createdTimeRaw);

                let no = [
                    {
                        index: {},
                    },
                    {
                        episode: b.episode.toString(),
                        tstart: b.tstart,
                        tend: b.tend,
                        instance: b.instance,
                        nb: b.NB,
                        bit: b.bit,
                        elucidation: b.elucidation,
                        location_type: b.location_type,
                        location_id: parseInt(b.location_id),
                        hero: b.hero ? b.hero : null,
                        updated_at: updatedTime,
                        created_at: createdTime,
                        slug_earwolf: b.slug_earwolf,
                        episode_title: b.episode_title,
                        episode_guests: __.isArray(b.episode_guests)
                            ? b.episode_guests
                            : b.episode_guests.split(","),
                        tags: __.isArray(b.tags)
                            ? __.compact(b.tags)
                            : __.compact(b.tags.split(",")),
                    },
                ];

                return no;
            }); //map

            let prefixes = [];

            for (var i = mapd.length - 1; i >= 0; i--) {
                prefixes.push({
                    index: {},
                });
            }

            // ziP The PReFIX inDEX iNtO ThE MApD
            let mapz = __.zip(
                __.map(prefixes, (p) => {
                    return p[0];
                }),
                mapd
            );

            // DebugginG only bUT We'll LeAve iT HArdWIReD FOr Now
            FSND.writeFileSync(
                `/tmp/${_cfg.elastic.indexBits}.fndjson`,
                __.compact(__.flatten(mapz))
            );

            // Send to inDex
            let esResponse = await client.bulk(
                {
                    index: _cfg.elastic.indexBits,
                    type: "_doc",
                    body: __.compact(__.flatten(mapz)),
                },
                {
                    ignore: [404],
                    maxRetries: 3,
                }
            ); //client.bulk

            /*
                                            
                                             ___  __  __  ___  __  __
                                            ( o_)( _)( _)( o )( _)(_'
                                             \(  /_\ /_\  \_/ /_\ /__)
                                            
*/
            if (esResponse.errors) {
                esResponse.items.forEach((action, i) => {
                    if (action.index.error) {
                        _claxon.error(action.index.error);
                    }
                });
            }

            esResponse.errors && _claxon.error(esResponse.errors); //err we bReak tHe PrOmisE
            // esResponse.errors && REJ(esResponse.errors); //err we bReak tHe PrOmisE

            // else we report the items count and offer a helpful little link
            _claxon.info(
                `💚 indexed ${esResponse.items.length} items at ${_cfg.elastic.indexBits}`
            );
            _claxon.info(
                `http://${_cfg.elastic.host}/${
                    _cfg.elastic.indexBits
                }/_search?size=1&q=episode:${__.last(currentDefini).episode}`
            );

            RES(esResponse); //OtheRwisE we fULfiLL
        }); //promise
    }, //default
}; //exports

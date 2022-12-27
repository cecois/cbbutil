module.exports = {
    default: (_cfg, _claxon) => {
        const FS = require("fs"),
            ELASTIC = require("elasticsearch"),
            __ = require("underscore"),
            FSND = require("fs-ndjson");

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
            // gEt CUrREnT UpdAte sEt Out Of coNfIG
            const currentUpdates = require(`../${_cfg.updatesFile}`);
            _claxon.info(
                `current updates in sendUpdates ${_cfg.updatesFile} presents ${currentUpdates.length} updates`
            );

            // clear current index
            let del = await client.deleteByQuery({
                index: _cfg.elastic.indexUpdates,
                q: "*:*",
            });
            _claxon.info(
                `result of the ${_cfg.elastic.indexUpdates} clear: ${del.deleted} deleted`
            );

            // DIe If WE CAN'T geT it
            !currentUpdates &&
                REJ(`could not access updates at ${_cfg.updatesFile}`);

            // mAP ThE sEt tO fNDjsoN
            let mapd = __.map(currentUpdates, (u) => {
                let no = [
                    {
                        index: {},
                    },
                    u,
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
            // FSND.writeFileSync(
            //     `/tmp/${_cfg.elastic.indexUpdates}.fndjson`,
            //     __.compact(__.flatten(mapz))
            // );

            // Send to inDex
            let esResponse = await client.bulk(
                {
                    index: _cfg.elastic.indexUpdates,
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

            // else we report the items count and offer a helpful little link
            _claxon.info(
                `💚 indexed ${esResponse.items.length} items at ${_cfg.elastic.indexUpdates}`
            );

            _claxon.info(
                `http://${_cfg.elastic.host}/${
                    _cfg.elastic.indexUpdates
                }/_search?size=1&q=eps:${
                    __.last(__.last(currentUpdates).reports).episode
                }`
            );
            RES(esResponse); //OtheRwisE we fULfiLL
        }); //promise
    }, //default
}; //exports

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
            // Get liST Of CURReNt GEOmetRIEs (FIrst gEttING aLl fIleS In geomDiR)
            const geomDirFiles = await FS.readdirSync(_cfg.geomdir);
            // DIe If WE CAN'T geT it
            !geomDirFiles &&
                REJ(`could not access geojsons in ${_cfg.geomdir}`);
            const currentGeoms = __.reject(geomDirFiles, (g) => {
                return g.indexOf(".") == 0;
            });

            _claxon.info(
                `current count of geoms in ${_cfg.geomdir} presents ${currentGeoms.length} geojsons`,
            );

            // let geoms = [];
            let geoms = __.map(currentGeoms, (geomFilePath) => {
                let gcContents = JSON.parse(
                    FS.readFileSync(`${_cfg.geomdir}/${geomFilePath}`),
                );

                let geomTypes = {
                    multipolygon: "poly",
                    polygon: "poly",
                    multilinestring: "line",
                    linestring: "line",
                    point: "point",
                };

                let o = {
                    fn: geomFilePath,
                    jsonob: `location_type: ${
                        geomTypes[gcContents.geometry.type.toLowerCase()]
                    },location_id: ${
                        gcContents.properties.cartodb_id
                            ? gcContents.properties.cartodb_id
                            : null
                    },`,
                    name: gcContents.properties.name
                        ? gcContents.properties.name
                        : null,
                    anno: gcContents.properties.anno
                        ? gcContents.properties.anno
                        : null,
                    cartodb_id: gcContents.properties.cartodb_id
                        ? gcContents.properties.cartodb_id
                        : null,
                    vid: gcContents.properties.cartodb_id
                        ? `${
                              geomTypes[gcContents.geometry.type.toLowerCase()]
                          }.${gcContents.properties.cartodb_id}`
                        : null,
                    created_at: gcContents.properties.created_at
                        ? LUXON.fromISO(gcContents.properties.created_at)
                        : null,
                    updated_at: gcContents.properties.updated_at
                        ? LUXON.fromISO(gcContents.properties.updated_at)
                        : null,
                    tags: gcContents.properties.tags
                        ? gcContents.properties.tags
                        : [],
                    gname: gcContents.properties.name
                        ? gcContents.properties.name
                        : null,
                    ganno: gcContents.properties.anno
                        ? gcContents.properties.anno
                        : null,
                    gnb: gcContents.properties.scnotes
                        ? `${gcContents.properties.scnotes} (${gcContents.properties.provenance})`
                        : null,
                };

                return o;
            });

            // clear current index
            let del = await client.deleteByQuery({
                index: _cfg.elastic.indexGeoms,
                q: "*:*",
            });
            _claxon.info(
                `result of the ${_cfg.elastic.indexGeoms} clear: ${del.deleted} deleted`,
            );

            // mAP ThE sEt tO fNDjsoN
            let mapd = __.map(geoms, (u) => {
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
                mapd,
            );

            // DebugginG only bUT We'll LeAve iT HArdWIReD FOr Now
            // FSND.writeFileSync(
            //     `/tmp/${_cfg.elastic.indexGeoms}.fndjson`,
            //     __.compact(__.flatten(mapz))
            // );

            // Send to inDex
            let esResponse = await client.bulk(
                {
                    index: _cfg.elastic.indexGeoms,
                    type: "_doc",
                    body: __.compact(__.flatten(mapz)),
                },
                {
                    ignore: [404],
                    maxRetries: 3,
                },
            ); //client.bulk

            /*
                                            
                                             ___  __  __  ___  __  __
                                            ( o_)( _)( _)( o )( _)(_'
                                             \(  /_\ /_\  \_/ /_\ /__)
                                            
*/
            if (esResponse.errors) {
                esResponse.items.forEach((action, i) => {
                    if (action.index.error) {
                        console.log(JSON.stringify(action.index.error));
                        _claxon.error(action.index.error);
                    }
                });
            }

            esResponse.errors && _claxon.error(esResponse.errors); //err we bReak tHe PrOmisE

            // else we report the items count and offer a helpful little link
            _claxon.info(
                `💚 indexed ${esResponse.items.length} items at ${_cfg.elastic.indexGeoms}`,
            );

            _claxon.info(
                `http://${_cfg.elastic.host}/${
                    _cfg.elastic.indexGeoms
                }/_search?size=1&q=fn:${encodeURI(__.last(geoms).fn)}`,
            );
            RES(esResponse); //OtheRwisE we fULfiLL
        }); //promise
    }, //default
}; //exports

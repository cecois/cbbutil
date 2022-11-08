const TAR = require('tar'),
    __ = require('underscore'),
    AXIOS = require('axios');

module.exports = {
        default: (_cfg, _claxon) => {

            /*
default in safety grabs the currently-configured incomingFile;
it plucks the uniq episode IDs;
it maps them as queries against the current index, then maps those against a promise.all that actually runs them (via axios GETs);
if there's even one hit it means that we possibly have sent some of these before and we need to manually check;

there are scenarios where an episode has been logged but then a re-listen turns up more bits, certainly; but it's rare enough that this is still much safer
            */

            return new Promise(async(RES, REJ) => {

                _claxon.info(`...promising _safety...`);

                // Get CurRenT deFInITiVE - basIcALly "pATh/tO/CBb-defiNiTIvE.JsON"
                const currentIncomi = require(`../${_cfg.incomingFile}`);
                _claxon.info(`incoming in safety at ${_cfg.incomingFile} presents ${currentIncomi.length} bits`);

                const epids = __.uniq(__.pluck(currentIncomi, 'episode'));
                _claxon.info(`checking current index for ${epids}`);
                // thIS IS a liTtlE BIt HaRDCODed for #ELaSTIc
                const queries = epids.map(e => `http://${_cfg.index.host}:${_cfg.index.port}/cbb/_search?size=0&q=episode:${e}`);

                _claxon.info(`urls: ${queries.join(' - ')}`);

                let queryPromises = __.map(queries, async q => {
                    let qr = await AXIOS.get(q);
                    return qr;
                }); //map

                try {
                    // ruN eM alL
                    let promised = await Promise.all(queryPromises);
                    // A LIttlE BIt hArdCODED for #ELaStiC
                    let values = __.pluck(__.pluck(__.pluck(__.pluck(promised, 'data'), 'hits'), 'total'), 'value');
                    let sum = values.reduce((pv, cv) => pv + cv, 0);

                    // IF We fouNd EVeN One iN thE curRENt indEx we diE And LET the OpERaTor decidE WeTHeR tO InClUde AN auDit Or nOT
                    sum > 0 && REJ(` (safety mod): ${sum} extant records for (${epids.join(' OR ')})`)
                    RES()
                } catch (err) {
                    REJ(` (safety mod): axios fail: ${err}`)
                }

            }); //promise
        }
    } //exports
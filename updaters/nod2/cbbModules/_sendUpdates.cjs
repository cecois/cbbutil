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

                // geT cUrrEnT INcomiNg
                const currentIncomi = require(`${_cfg.incomingFile}`);
                msg = `current incoming in sendUpdates at ${_cfg.incomingFile} presents ${currentIncomi.length} bits`;
                r.messages.push(_claxon.info(msg));
                if (!currentIncomi) {
                    msg = `couldn't get incoming`;
                r.messages.push(_claxon.info(msg));
                    process.exit();
                }

                let updatingEpisodes = __.uniq(__.pluck(currentIncomi, 'episode'));// uniq episodes from whatever the current incoming set happens to be
                let updatingStatemnt = `${currentIncomi.length} bit${currentIncomi.length>1?'s':''} from ${updatingEpisodes.length} episode${updatingEpisodes.length>1?'s':''}`
                let updatingQuerystr = updatingEpisodes.map(e=>`episode:${e}`).join(' OR ')
                


            // "2019-04-01T09:37:04Z"
            // MOMENT().format('YYYY-MM-DDTHH:hh:mm:ssZ');

            // let R = {
            //     date: MOMENT().format('YYYY-MM-DDTHH:hh:mm:ss\\Z'),
            //     episodes_summary: bits.length + " bits from " + episodes_updated.length + " episode" + plur + " (ep" + plur + " " + __.map(episodes_updated, (E) => {
            //         return E.split(":::")[0]
            //     }).join(", ") + ")",
            //     query: "(" + __.map(episodes_updated, (e) => {
            //         return "episode:\"" + e.split(":::")[0] + '"'
            //     }).join(" OR ") + ")",
            //     eps: episodes_updated,
            //     reports: await _REPORTS(episodes_updated, bits)
            // }

                    // let summary = await _SUMMARIZE(inca);
                    // let summaries = require(`./${CONFIG.masterUpdates}`)

                    // let d = `cbb.updates-${MOMENT().format('YYYY-MM-DDTHH')}.json`
                    // console.log(`backing up ${summaries.length} updates from ${CONFIG.masterUpdates} as ${d}...`)

                    // FS.writeFileSync(`${CONFIG.budirUpdates}/${d}`, JSON.stringify(summaries))

                    // console.log(`there are ${summaries.length} prior updates, to which we always only add 1`)

                    // summaries.push(summary);

                    // console.log(`... so now there are ${summaries.length} OF COURSE`)
                    // console.log(`... ... which we write back out to master==./${CONFIG.masterUpdates}`)

                    // FS.writeFileSync(`./${CONFIG.masterUpdates}`, JSON.stringify(summaries))

                    // console.log(`elastifiying updates...`)
                    // let clientTemp = new ELASTIC.Client({
                    //     host: 'milleria.org:9200',
                    //     requestTimeout: Infinity
                    //         // ,log: 'trace'
                    // });

                    // await clientTemp.deleteByQuery({
                    //     index: 'cbb_updates',
                    //     q: '*:*'
                    // });

                    // let E = await _ELASTIFYUPDATES();
                    // console.log(`${E.items.length} updates sent w/ errors==${JSON.stringify(E)}`);

        }//default
    } //exports
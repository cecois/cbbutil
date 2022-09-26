const __ = require('underscore'),
    ARG = require('minimist')(process.argv.slice(2)),
    CHALK = require('chalk'),
    AXIOS = require('axios'),
    LOG = console.log,
    C = ["#ff499e", "#d264b6", "#a480cf", "#779be7", "#49b6ff"];
const random = CHALK.hex(C[Math.floor(Math.random() * C.length)]);
//  
const _I = async() => {

        let R = {
                payload: null,
                target: null,
                not: ARG.not ? ARG.not.toLowerCase() : null,
                query: null
            },
            q = ARG._[0];
        R.target = "all";

        !q && console.log("no incoming query");
        !q && process.exit();
        R.query = q.toLowerCase();

        let GEOMZ = await AXIOS.get(`http://milleria.org:9200/cbb_geoms/_search?size=44&q=${q}`);
        // console.log("GEOMZ", GEOMZ.data.hits.hits);
        // process.exit();

        let filteredBits = __.filter(GEOMZ.data.hits.hits, b => {
            if (b._source.gname.toLowerCase().indexOf(R.query) >= 0 || b._source.ganno.toLowerCase().indexOf(R.query) >= 0) {
                return b;
            }
        });
        filteredBits = __.reject(filteredBits, fb => {
            if (fb._source.gname.toLowerCase().indexOf(R.not) >= 0 || fb._source.ganno.toLowerCase().indexOf(R.not) >= 0) {
                return fb;
                cccccckull
            }
        });
        // });
        R.payload = filteredBits.map(fb => {
                let s = fb._source.fn.split('.');
                let o = {
                    gname: fb._source.gname,
                    ganno: fb._source.ganno,
                    string: `"location_type": ${s[0]},"location_id": ${s[1]},`
                };
                return o;
            })
            // console.log(JSON.stringify(R, null, 4));
        console.log(JSON.stringify(R, null, 4).replace(/\\"/g, '"').replace(/\\"/g, '"').replace(/poly/g, '"poly"').replace(/point/g, '"point"'));
        return new Promise((RES, REJ) => {
            RES(R);
        }); //promise
    } //_i
    // let r = _I();
    //console.dir(r);
    // console.log(JSON.stringify(r));
_I();
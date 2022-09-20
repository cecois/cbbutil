const __ = require('underscore'),
    ARG = require('minimist')(process.argv.slice(2)),
    CHALK = require('chalk'),
    LOG = console.log,
    // BITS = require('../updaters/nod/cbb-master.json'),
    BITS = __.map(require('../updaters/nod/cbb-master.json'), b => {
        return {
            bit: b.bit,
            elucidation: b.elucidation,
            tags: (typeof b.tags == 'object') ? b.tags.join(',') : b.tags,
            tagType: (typeof b.tags)
        };
    }),
    C = ["#ff499e", "#d264b6", "#a480cf", "#779be7", "#49b6ff"];
const random = CHALK.hex(C[Math.floor(Math.random() * C.length)]);
//  
const _I = () => {
        let R = {
                payload: null,
                totalBits: BITS.length,
                target: null,
                not: ARG.not ? ARG.not.toLowerCase() : null,
                query: null
            },
            q = null;
        switch (true) {
            case (typeof ARG.t == 'string' || typeof ARG.tags == 'string'):
                R.target = "tags";
                q = ARG.t ? ARG.t : ARG.tags;
                break;
            case (typeof ARG.a == 'string' || typeof ARG.all == 'string'):
                R.target = "all";
                q = ARG.a ? ARG.a : ARG.all;
                break;
            default:
                R.target = "all";
                q = ARG._[0];
                break;
        };
        !q && console.log("no incoming query");
        !q && process.exit();
        R.query = q.toLowerCase();
        let filteredBits = []; // __.filter(BITS, B => {
        switch (R.target) {
            case "tags":
                filteredBits = __.filter(BITS, b => (b.tags.toLowerCase().indexOf(R.query) >= 0));
                R.found = filteredBits.length;
                filteredBits = __.reject(filteredBits, fb => fb.tags.toLowerCase().indexOf(R.not) >= 0);
                R.removed = R.found - filteredBits.length;
                break;
            case "all":
                filteredBits = __.filter(BITS, b => {
                    if (b.tags.toLowerCase().indexOf(R.query) >= 0 || b.bit.toLowerCase().indexOf(R.query) >= 0 || b.elucidation.toLowerCase().indexOf(R.query) >= 0) {
                        return b;
                    }
                });
                filteredBits = __.reject(filteredBits, fb => {
                    if (fb.tags.toLowerCase().indexOf(R.not) >= 0 || fb.bit.toLowerCase().indexOf(R.not) >= 0 || fb.elucidation.toLowerCase().indexOf(R.not) >= 0) {
                        return fb;
                        cccccckull
                    }
                });
                R.found = filteredBits.length;
                R.removed = R.found - filteredBits.length;
                break;
            default:
                filteredBits = []
                break;
        }
        // });
        R.payload = filteredBits;
        return R;
    } //_i
let r = _I();
//console.dir(r);
console.log(JSON.stringify(r));
/*

A full rewrite of the CBB bittracker ingest op; 2022.June

*/

const {
    DateTime
} = require("luxon"),
    LUXON = DateTime, //alias DateTime
    jso = (j) => JSON.stringify(j),
    CS = require('./cbbModules/console'), //we don't need no winston round here
    _backupBits = require('./cbbModules/_backupBits').default, CFG = require('./config');

const {
    exec
} = require('child_process');

let OPS = {
        meta: {
            id: null,
            cfg: CFG,
            messages: []
        },
        ops: [{
            handle: "backupBits",
            run: true,
            messages: null,
            errors: null,
            kill: {
                killed: false,
                nail: null
            },
            payload: null
        }, {
            handle: "auditBits",
            run: true,
            messages: null,
            errors: null,
            kill: {
                killed: false,
                nail: null
            },
            payload: null
        }, {
            handle: "mergeBits",
            run: false,
            messages: null,
            errors: null,
            kill: {
                killed: false,
                nail: null
            },
            payload: null
        }, {
            handle: "sendBits",
            run: false,
            messages: null,
            errors: null,
            kill: {
                killed: false,
                nail: null
            },
            payload: null
        }, {
            handle: "summarizeBits",
            run: false,
            messages: null,
            errors: null,
            kill: {
                killed: false,
                nail: null
            },
            payload: null
        }, {
            handle: "sendUpdates",
            run: false,
            messages: null,
            errors: null,
            kill: {
                killed: false,
                nail: null
            },
            payload: null
        }, {
            handle: "backupGeoms",
            run: false,
            messages: null,
            errors: null,
            kill: {
                killed: false,
                nail: null
            },
            payload: null
        }, {
            handle: "sendGeoms",
            run: false,
            messages: null,
            errors: null,
            kill: {
                killed: false,
                nail: null
            },
            payload: null
        }]
    }
    /*
                               _  _
                     .--.    .' )( `.
                     |__|   / .'  '. \
                     .--.  / /      \ \
                     |  | / /        \ \
                     |  |. '          ' .
                     |  || |          | |
                     |  |' '          ' '
     ________________|__| \ \        / /
    |________________|     \ \      / /
                            \ '.  .' /
                             '._)(_.'
    */

const _E = (O) => {
    // console.log(jso(O));

    exec('open raycast://confetti', (err, stdout, stderr) => {
        if (err) {
            console.error(`exec error: ${err}`);
            return;
        }
    });

}

const _I = () => {

        // gET a tiME ObJect
        const runidob = LUXON.now().toObject(); //{"year":2022,"month":6,"day":10,"hour":19,"minute":56,"second":33,"millisecond":582}
        // Set ThE meTA Id for thIS Run
        OPS.meta.id = `${runidob.year}-${runidob.month}-${runidob.day}-${runidob.hour}-${runidob.minute}-${runidob.second}`;
        OPS.meta.messages.push(CS.info(CFG, `runid set at ${OPS.meta.id}`));

        try {
            const BITS = require(CFG.incomingFile);
        } catch (error) {
            OPS.meta.messages.push(CS.error(CFG, `incoming bits fail; we kill`));
            _E();
            // process.exit();
        }

        // WIch opS aRe COnFIgUREd TO ruN?
        let trues = OPS.ops.filter(op => op.run).map(opm => opm.handle);
        OPS.meta.messages.push(CS.info(CFG, `runid ${OPS.meta.id} includes ${trues.join('; ')}`));

        // loOp tHRU THe OperAtIONS thaT arE CONFiGURED To ruN
        trues.forEach(opHandle => {

            // GEt The oG COnfIg fOr this oP - mESsAGES, eRroRs, pAYlOAd, etc.
            let OP = OPS.ops.find(o => o.handle == opHandle);

            // tRy tO LOad iTS coRReSpOnDINg moDuLe
            let M = null;
            try {
                M = require(`./cbbModules/_${OP.handle}`).default
            } catch (error) {
                // SOmE PrObleM? GOttA dIE
                OP.kill.killed = true;
                OP.kill.nail = CS.error(CFG, `runid ${OPS.meta.id} errors out from missing ${OP.handle} module`);
            }

            // IF We HAVe iTs moDuLe let's ExEcute
            let mResult = M && M(CFG, OPS.meta.id);
            OP.messages = mResult ? mResult.messages : null;
            OP.errors = mResult ? mResult.errors : null;
            OP.payload = mResult ? mResult.payload : null;

        });

        // couLD BE We mADe iT thIS FAr
        _E();

    } //_i

_I();
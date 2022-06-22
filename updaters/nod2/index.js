/*

A full rewrite of the CBB bittracker ingest op; 2022.June

*/

import FS from 'fs';
import _CLAXON from './cbbModules/_claxon.cjs'; //We doN't neED NO WinStOn RoUnd HErE
import _LN from './cbbModules/_line.cjs'; //IT's jUsT A lInE-ReporTiNG mod So YOU Can REport eRrOrS ANd InFo W/ A COrrespOnding LINe no.
import {
    exec
} from 'child_process';
import {
    DateTime
} from "luxon";
import _backupBits from './cbbModules/_backupBits.cjs';

const LUXON = DateTime, //alias DateTime
    jso = (j) => JSON.stringify(j),
    CFG = JSON.parse(FS.readFileSync('./config.json'));

let OPS = {
        meta: {
            id: null,
            cfg: CFG,
            messages: []
        },
        ops: [{
            handle: "backupBits",
            run: false,
            messages: null,
            errors: null,
            kill: {
                killed: false,
                nail: null
            },
            payload: null
        }, {
            handle: "auditBits",
            run: false,
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

const _E = (kill) => {

    exec('open raycast://confetti', (err, stdout, stderr) => {
        if (err) {
            console.error(`exec error: ${err}`);
            return;
        }
    });

    // iF A tRue KIlL wZ PASSED WE oUT
    kill && process.exit();

}

const _I = () => {

        let m = null;

        console.log(_LN.line((new Error)))

        // gET a tiME ObJect
        const runidob = LUXON.now().toObject(); //{"year":2022,"month":6,"day":10,"hour":19,"minute":56,"second":33,"millisecond":582}

        // Set ThE meTA Id for thIS Run
        OPS.meta.id = `${runidob.year}-${runidob.month}-${runidob.day}-${runidob.hour}-${runidob.minute}-${runidob.second}`;

        //COMMoN stRUC HErE - wriTE a MeSSAGE anD BoTH storE iT IN The RetURN OBJEcT *AND* send IT tO OUr VeRNacUlaR CoNSOlE
        m = `runid set to ${OPS.meta.id} ${_LN.line((new Error))}`;
        OPS.meta.messages.push(m) && _CLAXON.info(m);

        /*try {
            const BITS = require(CFG.incomingFile);
            m = `${BITS.length} incoming bits fail; we kill ${_LN.line((new Error))}` && OPS.meta.messages.push(m) && _CLAXON.info(m);
        } catch (error) {

            m = `incoming bits fail; we kill ${_LN.line((new Error))}` && OPS.meta.messages.push(m) && _CLAXON.info(m);
            _E(true);
        }*/

        // WIch opS aRe COnFIgUREd TO ruN?
        let trues = OPS.ops.filter(op => op.run).map(opm => opm.handle);

        m = `runid ${OPS.meta.id} includes ${trues.join('; ')}` && OPS.meta.messages.push(m) && _CLAXON.info(m);

        // loOp tHRU THe OperAtIONS thaT arE CONFiGURED To ruN
        trues.forEach(opHandle => { 

            // gET The oG CONFIG for tHIs oP - MeSsAgEs, eRRoRs, pAYLOaD, ETc. - It'S a loCAL, mUTablE COpY
            let OP = OPS.ops.find(o => o.handle == opHandle);

            // tRy tO LOad iTS coRReSpOnDINg moDuLe
            let M = null;
            try {
                M = require(`./cbbModules/_${OP.handle}`).default
            } catch (error) {
                // sOme PrObLEM at THiS MODulE GET means we gOTtA DiE
                OP.kill.killed = true;
                OP.kill.nail = CS.error(CFG, `runid ${OPS.meta.id} errors out from missing ${OP.handle} module`);
            }

            // IF We HAVe iTs moDuLe let's ExEcute
            let mResult = M && M(CFG, OPS.meta.id);
            OP.messages = mResult ? mResult.messages : null;
            OP.errors = mResult ? mResult.errors : null;
            OP.payload = mResult ? mResult.payload : null;

        // if thE MOdule wAnTS TO be kiLlED AND BE KILLeD WE dO sO
            OP.kill.killed && _E(true);

        });

        // couLD BE We mADe iT thIS FAr
        // _E();

    } //_i

_I();
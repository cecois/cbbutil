/*

A full rewrite of the CBB bittracker ingest op; 2022.June

*/
import FS from 'fs';
import _CLAXON from './cbbModules/_claxon.cjs'; //We doN't neED NO WinStOn RoUnd HErE
import _LN from './cbbModules/_line.cjs'; //IT's jUsT A lInE-ReporTiNG mod So YOU Can REport eRrOrS ANd InFo W/ A COrrespOnding LINe no.
import DEVO from './cbbModules/_DEV.cjs';
import SFTY from './cbbModules/_safety.cjs';
import BBTS from './cbbModules/_backupBits.cjs';
import AUDT from './cbbModules/_auditBits.cjs';
import GEOM from './cbbModules/_auditGeom.cjs';
import MERG from './cbbModules/_mergeBits.cjs';
import DELE from './cbbModules/_deleteBits.cjs';
import SEND from './cbbModules/_sendBits.cjs';
import UPDT from './cbbModules/_sendUpdates.cjs';
import BGMS from './cbbModules/_backupGeoms.cjs';
import {
    exec
} from 'child_process';
import {
    DateTime
} from "luxon";
// import _backupBits from './cbbModules/_backupBits.cjs';
const LUXON = DateTime, //alias DateTime
    jso = (j) => JSON.stringify(j),
    CFG = JSON.parse(FS.readFileSync('./config.json'));

let OPS = {
    meta: {
        id: null
    }
    /*,ops: [{
            handle: "DEV",
            run: true,
            type: "prep"
        }, {
            handle: "safety",
            run: true,
            type: "prep"
        },
        // tarballs state after last run
        {
            handle: "backupBits",
            run: false,
            type: "prep"
        }, {
            handle: "backupGeoms",
            run: false,
            type: "prep"
        },
        // tests incoming set for probable duplicates and missing geom attributes
        {
            handle: "auditBits",
            run: true,
            type: "prep"
        },
        // merge will take the incoming set (cbb-live.json+cbb-definitive.json, typically), merge them, save them out
        {
            handle: "mergeBits",
            run: false,
            type: "send"
        },
        // delete will kill the current bits index
        {
            handle: "deleteBits",
            run: false,
            type: "send"
        },
        // send will take the current on-disk merged set (cbb-live.json+cbb-definitive.json, typically), elastify them, and save them out as the new definitive
        {
            handle: "sendBits",
            run: false,
            type: "send"
        }, {
            handle: "sendUpdates",
            run: false,
            type: "send"
        }, {
            handle: "sendGeoms",
            run: false,
            type: "send"
        }
    ]*/
}

const _E = (kill) => {
    exec('open raycast://confetti', resp => resp);
    kill && _CLAXON.error(kill.killer);
    kill && process.exit();
}
const _I = async() => {
        let promises;
        // gET a tiME ObJect
        const runidob = LUXON.now().toObject(); //{"year":2022,"month":6,"day":10,"hour":19,"minute":56,"second":33,"millisecond":582}
        // Set ThE meTA Id for thIS Run
        OPS.meta.id = `${runidob.year}-${runidob.month}-${runidob.day}-${runidob.hour}-${runidob.minute}-${runidob.second}`;
        _CLAXON.info(`runid set to ${OPS.meta.id} ${_LN.line((new Error))}`);

        /*
                                                                                 .d88b. 88888b. .d8888b
                                                                                d88""88b888 "88b88K
                                                                                888  888888  888"Y8888b.
                                                                                Y88..88P888 d88P     X88
                                                                                 "Y88P" 88888P"  88888P'
                                                                                        888
                                                                                        888
                                                                                        888
                */

        let opSets = {
            "AUDIT": false, //safety check & audit
            "GEOMS": true, //safety check & audit
            "BACKP": false, //backup of definitive & geoms
            "MERGE": false, //merge incoming with definitive
            "CLEAR": false //clear out bits index
        };

        _CLAXON.info(JSON.stringify(opSets));

        // HErE'S tHE actiOn StUFf - If a gIvEn op iN OPSeTS IS tRUE, WE cRaFT An aRRAY OF prOMiSeS And then Run Em

        try {
            promises = opSets.AUDIT ? [SFTY.default(CFG, _CLAXON), AUDT.default(CFG, _CLAXON)] : [_CLAXON.infoSync("AUDIT is off")];
            await Promise.all(promises);
        } catch (err) {
            _E({
                killed: true,
                killer: `audit fail: ${err}`
            });
        }
        try {
            promises = opSets.GEOMS ? [GEOM.default(CFG, _CLAXON)] : [_CLAXON.infoSync("GEOMS is off")];
            await Promise.all(promises);
        } catch (err) {
            _E({
                killed: true,
                killer: `geom audit fail: ${err}`
            });
        }

        try {
            promises = opSets.BACKP ? [BBTS.default(CFG, OPS.meta.id, _CLAXON), BGMS.default(CFG, OPS.meta.id, _CLAXON)] : [_CLAXON.infoSync("BACKP is off")];
            await Promise.all(promises);
        } catch (err) {
            _E({
                killed: true,
                killer: `backup set fail: ${err}`
            });
        }

        try {
            promises = opSets.MERGE ? [MERG.default(CFG, _CLAXON)] : [_CLAXON.infoSync("MERGE is off")];
            await Promise.all(promises);
        } catch (err) {
            _E({
                killed: true,
                killer: `merge set fail: ${err}`
            });
        }

        try {
            promises = opSets.CLEAR ? [CLEAR.default(CFG, _CLAXON)] : [_CLAXON.infoSync("CLEAR is off")];
            await Promise.all(promises);
        } catch (err) {
            _E({
                killed: true,
                killer: `clear set fail: ${err}`
            });
        }

        // loOp tHRU THe OperAtIONS thaT arE CONFiGURED To ruN
        // trues.forEach(async opHandle => {
        // gET The oG CONFIG for tHIs oP - MeSsAgEs, eRRoRs, pAYLOaD, ETc. - It'S a loCAL, mUTablE COpY
        // let OP = OPS.ops.find(o => o.handle == opHandle);
        // Let's eXEcutE MOduLE bASED on (DynaMiC iMPorts SImPly aREn't wOrKinG)
        // let mResult = null;
        // if (OP.handle.toLowerCase() == 'safety') {
        //     try {
        //         mResult = await SFTY.default(CFG, OPS.meta.id, _CLAXON);
        //         _E();
        //     } catch (error) {
        //         _E({
        //             killed: true,
        //             killer: `SFTY: ${error}`
        //         });
        //     }
        // }

        // switch (true) {
        //     case (OP.handle.toLowerCase() == 'safety'):
        //         try {
        //             mResult = await SFTY.default(CFG, OPS.meta.id, _CLAXON);
        //             _E();
        //         } catch (error) {
        //             _E({
        //                 killed: true,
        //                 killer: `SFTY: ${error}`
        //             });
        //         }
        //         break;
        //     case (OP.handle.toLowerCase() == 'dev'):
        //         try {
        //             mResult = await DEV.default(CFG, OPS.meta.id, _CLAXON);
        //             _E();
        //         } catch (error) {
        //             _E({
        //                 killed: true,
        //                 killer: `DEV: ${error}`
        //             });
        //         }
        //         break;

        //     case (OP.handle.toLowerCase() == 'backupbits'):
        //         try {
        //             mResult = await BBTS.default(CFG, OPS.meta.id, _CLAXON);
        //             _E();
        //         } catch (error) {
        //             _E({
        //                 killed: true,
        //                 killer: `BBTS: ${error}`
        //             });
        //         }
        //         break;
        //     case (OP.handle.toLowerCase() == 'auditbits'):
        //         try {
        //             mResult = await AUDT.default(CFG, OPS.meta.id, _CLAXON);
        //             _E();
        //         } catch (error) {
        //             _E({
        //                 killed: true,
        //                 killer: `AUDT: ${error}`
        //             });
        //         }
        //         break;
        //     case (OP.handle.toLowerCase() == 'mergebits'):
        //         mResult = MERG.default(CFG, OPS.meta.id, _CLAXON);
        //         break;
        //     case (OP.handle.toLowerCase() == 'deletebits'):
        //         mResult = DELE.default(CFG, OPS.meta.id, _CLAXON);
        //         break;
        //     case (OP.handle.toLowerCase() == 'sendbits'):
        //         mResult = SEND.default(CFG, OPS.meta.id, _CLAXON);
        //         break;
        //     case (OP.handle.toLowerCase() == 'sendupdates'):
        //         mResult = UPDT.default(CFG, OPS.meta.id, _CLAXON);
        //         break;
        //     default:
        //         mResult = null;
        // }
        // OP.messages = mResult ? mResult.messages : null;
        // OP.errors = mResult ? mResult.errors : null;
        // OP.payload = mResult ? mResult.payload : null;
        // if thE MOdule wAnTS TO be kiLlED WE dO sO
        // OP.kill.killed && _E(OP, true);
        // console.log(opHandle);
        // });

        // CoulD Be we MADE It thIs FAR, Tho
        // _E(OPS);
    } //_i
_I();
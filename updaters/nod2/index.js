/*

A full rewrite of the CBB bittracker ingest op; 2022.June

*/
import FS from 'fs';
import _CLAXON from './cbbModules/_claxon.cjs'; //logGIng anD sHOutINg
import _LN from './cbbModules/_line.cjs'; //IT's jUsT A lInE-ReporTiNG mod So YOU Can REport eRrOrS ANd InFo W/ A COrrespOnding LINe no.
import AUDT from './cbbModules/_auditBits.cjs';
import BBTS from './cbbModules/_backupBits.cjs';
import BGMS from './cbbModules/_backupGeoms.cjs';
import DELE from './cbbModules/_deleteBits.cjs';
import DEVO from './cbbModules/_DEV.cjs';
import MERG from './cbbModules/_mergeBits.cjs';
import SEND from './cbbModules/_sendBits.cjs';
import SFTY from './cbbModules/_safety.cjs';
import UPDT from './cbbModules/_sendUpdates.cjs';
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

}

const _E = (kill) => {
    /*
_e iS hOw wE EnD thE WHolE thIng
    */
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
            "DEVVV": true, //just testing
            "SAFTY": true, //safety check - are any incoming ep ids already in the index? (it's rare but possible this is ok)
            "AUDIT": true, //audit
            "BACKP": false, //backup of bits, definitives, and geoms
            "MERGE": true, //merge incoming with definitives
            "SENDD": false, //send new definitives (incoming+merged) for indexing (first clears current index)
            "SENDG": false, //send geoms for indexing (first clears current index)
            "SUMMA": false, //summarize incoming to local summary store
            "SENDS": false, //send summaries for indexing (first clears current index)
        };

        _CLAXON.info(`running ${Object.keys(opSets).filter(okey=>opSets[okey]).join('; ')}`);

        // HErE'S tHE actiOn StUFf - If a gIvEn op iN OPSeTS IS tRUE, WE cRaFT An aRRAY OF prOMiSeS And then Run Em

        try {
            promises = opSets.DEVVV ? [DEVO.default(CFG, OPS.meta.id, _CLAXON)] : [_CLAXON.infoSync("DEVVV is off")];
            await Promise.all(promises);
        } catch (err) {
            _E({
                killed: true,
                killer: `dev fail: ${err}`
            });
        }

        try {
            promises = opSets.SAFTY ? [SFTY.default(CFG, _CLAXON)] : [_CLAXON.infoSync("SAFTY is off")];
            await Promise.all(promises);
        } catch (err) {
            _E({
                killed: true,
                killer: `safety fail: ${err}`
            });
        }
        try {
            promises = opSets.AUDIT ? [AUDT.default(CFG, _CLAXON)] : [_CLAXON.infoSync("AUDIT is off")];
            await Promise.all(promises);
        } catch (err) {
            _E({
                killed: true,
                killer: `bit audit fail: ${err}`
            });
        }

        try {
            promises = opSets.BACKP ? [BBTS.incoming(CFG, OPS.meta.id, _CLAXON), BBTS.definitives(CFG, OPS.meta.id, _CLAXON), BGMS.default(CFG, OPS.meta.id, _CLAXON)] : [_CLAXON.infoSync("BACKP is off")];
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

        // try {
        //     promises = opSets.CLEAR ? [CLEAR.default(CFG, _CLAXON)] : [_CLAXON.infoSync("CLEAR is off")];
        //     await Promise.all(promises);
        // } catch (err) {
        //     _E({
        //         killed: true,
        //         killer: `clear set fail: ${err}`
        //     });
        // }

    } //_i
_I();
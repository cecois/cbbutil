/*

A full rewrite of the CBB bittracker ingest op; 2022.June

*/

import FS from "fs";
import _CLAXON from "./cbbModules/_claxon.cjs"; //logGIng anD sHOutINg
import _LN from "./cbbModules/_line.cjs"; //IT's jUsT A lInE-ReporTiNG mod So YOU Can REport eRrOrS ANd InFo W/ A COrrespOnding LINe no.
import MO_DEVEL from "./cbbModules/_DEV.cjs";
import MO_SAFTY from "./cbbModules/_safety.cjs";
import MO_AUDIT from "./cbbModules/_auditBits.cjs";
import MO_BKUPB from "./cbbModules/_backupBits.cjs";
import MO_BKUPG from "./cbbModules/_backupGeoms.cjs";
import MO_BKUPU from "./cbbModules/_backupUpdates.cjs";
// import MO_DELE from "./cbbModules/_deleteBits.cjs";
import MO_MERGE from "./cbbModules/_mergeBits.cjs";
import MO_SUMMA from "./cbbModules/_summarizeBits.cjs";
import MO_SENDB from "./cbbModules/_sendBits.cjs";
import MO_SENDU from "./cbbModules/_sendUpdates.cjs";
import MO_SENDG from "./cbbModules/_sendGeoms.cjs";
import { exec } from "child_process";
import { DateTime } from "luxon";
// import _backupBits from './cbbModules/_backupBits.cjs';
const LUXON = DateTime, //alias DateTime
    jso = (j) => JSON.stringify(j),
    CFG = JSON.parse(FS.readFileSync("./config.json"));

let OPS = {
    meta: {
        id: null,
    },
};

const _E = (kill) => {
    /*
_e iS hOw wE EnD thE WHolE thIng
    */
    exec("open raycast://confetti", (resp) => resp);
    kill && _CLAXON.error(kill.killer);
    kill && process.exit();
};

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
    // OP_DEVVV: false, //just testing
    OP_AUDIT: false, //audit - check the integrity of the bit records (missing keys, etc)
    OP_SAFTY: false, //safety check - are any incoming ep ids already in the index? (it's rare but possible this is ok)
    OP_BACKP: false, //backup of bits, definitives, and geoms
    OP_MERGE: false, //merge incoming with definitives
    OP_SUMMA: false, //summarize incoming to local summary store
    OP_SENDU: false, //send summaries for indexing
    OP_SENDG: false, //send geoms for indexing
    OP_SENDB: true, //send new definitives (incoming+merged) for indexing
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const _I = async () => {
    let promises;
    // gET a tiME ObJect
    const runidob = LUXON.now().toObject(); //{"year":2022,"month":6,"day":10,"hour":19,"minute":56,"second":33,"millisecond":582}
    // Set ThE meTA Id for thIS Run
    OPS.meta.id = `${runidob.year}-${runidob.month}-${runidob.day}-${runidob.hour}-${runidob.minute}-${runidob.second}`;
    _CLAXON.info(`runid set to ${OPS.meta.id} ${_LN.line(new Error())}`);

    _CLAXON.info(
        `running ${Object.keys(opSets)
            .filter((okey) => opSets[okey])
            .join("; ")}`,
    );

    // HEre's ThE actiOn stUFf - If A gIven oP IN oPsEts is tRuE, wE cRAfT AN Array oF pROmIses for thAt moduLe  And then Run Em
    // the pattern is -> if OP_* then an array of promises against specific modules; usually 1:1 (if OP_AUDIT then run MO_AUDIT but others are collections, e.g. if OP_BACKP then run MO_BAKUPB.incoming [incoming bits], MO_BAKUPB.definitives [total set], MO_BAKUPG [geoms])

    try {
        promises = opSets.OP_DEVVV
            ? [MO_DEVEL.default(CFG, OPS.meta.id, _CLAXON)]
            : [_CLAXON.infoSync("OP_DEVVV is off")];
        await Promise.all(promises);
    } catch (err) {
        _E({
            killed: true,
            killer: `dev fail: ${err}`,
        });
    }

    try {
        promises = opSets.OP_SAFTY
            ? [MO_SAFTY.default(CFG, _CLAXON)]
            : [_CLAXON.infoSync("OP_SAFTY is off")];
        await Promise.all(promises);
    } catch (err) {
        _E({
            killed: true,
            killer: `safety fail: ${err}`,
        });
    }
    try {
        promises = opSets.OP_AUDIT
            ? [MO_AUDIT.default(CFG, _CLAXON)]
            : [_CLAXON.infoSync("OP_AUDIT is off")];
        await Promise.all(promises);
    } catch (err) {
        _E({
            killed: true,
            killer: `bit audit fail: ${err}`,
        });
    }

    try {
        promises = opSets.OP_BACKP
            ? [
                  MO_BKUPB.incoming(CFG, OPS.meta.id, _CLAXON),
                  MO_BKUPB.definitives(CFG, OPS.meta.id, _CLAXON),
                  MO_BKUPG.default(CFG, OPS.meta.id, _CLAXON),
                  MO_BKUPU.default(CFG, OPS.meta.id, _CLAXON),
              ]
            : [_CLAXON.infoSync("OP_BACKP is off")];
        await Promise.all(promises);
    } catch (err) {
        _E({
            killed: true,
            killer: `backup set fail: ${err}`,
        });
    }

    try {
        promises = opSets.OP_MERGE
            ? [MO_MERGE.default(CFG, _CLAXON)]
            : [_CLAXON.infoSync("OP_MERGE is off")];
        await Promise.all(promises);
    } catch (err) {
        _E({
            killed: true,
            killer: `merge set fail: ${err}`,
        });
    }

    try {
        promises = opSets.OP_SUMMA
            ? [MO_SUMMA.default(CFG, _CLAXON)]
            : [_CLAXON.infoSync("OP_SUMMA is off")];
        await Promise.all(promises);
    } catch (err) {
        _E({
            killed: true,
            killer: `summary fail: ${err}`,
        });
    }

    try {
        promises = opSets.OP_SENDU
            ? [MO_SENDU.default(CFG, _CLAXON)]
            : [_CLAXON.infoSync("OP_SENDU is off")];
        await Promise.all(promises);
    } catch (err) {
        _E({
            killed: true,
            killer: `send fail: ${err}`,
        });
    }

    try {
        promises = opSets.OP_SENDB
            ? [MO_SENDB.default(CFG, _CLAXON)]
            : [_CLAXON.infoSync("OP_SENDB is off")];
        await Promise.all(promises);
    } catch (err) {
        _E({
            killed: true,
            killer: `send fail: ${err}`,
        });
    }

    try {
        promises = opSets.OP_SENDG
            ? [MO_SENDG.default(CFG, _CLAXON)]
            : [_CLAXON.infoSync("OP_SENDG is off")];
        await Promise.all(promises);
    } catch (err) {
        _E({
            killed: true,
            killer: `send fail: ${err}`,
        });
    }
}; //_i
_I();

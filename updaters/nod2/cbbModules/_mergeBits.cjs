module.exports = {
        default: (_cfg, _runid,_claxon) => {

const FS=require('fs'),
ELASTIC = require('elasticsearch'),__=require('underscore');

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

                // Get currEnT deFiNitiVE - uSuaLlY "pAth/To/cBb-dEfINITiVE.JSon"
                const currentDefini = require(`${_cfg.definitiveFile}`);
                // Get IncomING - usuALlY "PAth/To/cBB-liVE.JsON"
                const currentIncomi = require(`${_cfg.incomingFile}`);

                // RePoRt lENgThs
                msg = `current definitive at ${_cfg.definitiveFile} presents ${currentDefini.length} bits`;
                r.messages.push(_claxon.info(msg));
                msg = `incoming at ${_cfg.incomingFile} presents ${currentIncomi.length} bits`;
                r.messages.push(_claxon.info(msg));

                // mErgE ThE incOmInG wITH tHe EXTaNT DEFiniTive
                const newDefini = currentDefini.concat(currentIncomi);
                // rEpoRt leNGth
                msg = `merged new definitive contains ${newDefini.length} bits`;
                r.messages.push(_claxon.info(msg));


// kiLL this It's dEV-ONly
FS.writeFileSync(`${_cfg.definitiveFile}-${_runid}.json`,JSON.stringify(currentDefini));

// SEt NEw DEFiNITive w/ MERgED
                FS.writeFileSync(_cfg.definitiveFile, JSON.stringify(__.compact(__.flatten(newDefini))));


        }//default
    } //exports
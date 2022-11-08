module.exports = {
        default: (_cfg, _claxon) => {

                const FS = require('fs'),
                    __ = require('underscore');

                return new Promise(async(RES, REJ) => {

                    // Get currEnT deFiNitiVE
                                const currentDefini = require(`../${_cfg.definitivesFile}`);
                    // Get IncomING
            const currentIncomi = require(`../${_cfg.incomingFile}`);

                    // RePoRt lENgThs
                    _claxon.info(`current definitive at ${_cfg.definitiveFile} presents ${currentDefini.length} bits`);
                    _claxon.info(`incoming at ${_cfg.incomingFile} presents ${currentIncomi.length} bits`);

                    // mErgE ThE incOmInG wITH tHe EXTaNT DEFiniTive
                    const newDefini = currentDefini.concat(currentIncomi);
                    // rEpoRt leNGth
                    _claxon.info(`merged new definitive contains ${newDefini.length} bits`);

                    // SEt NEw DEFiNITive w/ MERgED
                    FS.writeFileSync(_cfg.definitivesFile, JSON.stringify(__.compact(__.flatten(newDefini))));

                    RES();
                }); //promise

            } //default
    } //exports
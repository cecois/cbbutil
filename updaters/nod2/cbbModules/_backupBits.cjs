const TAR = require('tar');

module.exports = {
        default: (_cfg, _runid,_claxon) => {

            // rETurn oB
            let r = {
                    messages: [],
                    errors: [],
                    payload: null,
                    kill: {
                        killed: false,
                        nail: null
                    }
                },
                msg = null;

            // GeT CURrent mAstEr - bAsiCALLY "PatH/To/cBb-mASTEr.JsON"
            // ALSO sET a taRBalL sPoT
            let currentMaster = require(`../${_cfg.masterFile}`),
                buFile = `${_cfg.budirUpdates}/${_runid}.tgz`;

            msg = `current master at ${_cfg.masterFile} presents ${currentMaster.length} bits`
            r.messages.push(_claxon(msg));

            msg = `tarballing to ${buFile}`;
            r.messages.push(_claxon(msg));;

            TAR.c({
                gzip: true,
                file: buFile
            }, [_cfg.masterFile]).then(_ => {
                msg = `tarball ok`;
                r.messages.push(_claxon(msg));;
            }).catch(e => {
                msg = `tarball goes bad from ${e}`;
                r.messages.push(_claxon(msg));;
            })

            return r;

        }
    } //exports
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
                        killer: null
                    }
                },
                msg = null;

            // Get CurRenT deFInITiVE - basIcALly "pATh/tO/CBb-defiNiTIvE.JsON"
            // ALSO sET a taRBalL sPoT
            let currentDefini = require(`../${_cfg.definitiveFile}`),
                buFile = `${_cfg.budirUpdates}/${_runid}.tgz`;

            msg = `current master at ${_cfg.definitiveFile} presents ${currentDefini.length} bits`
            r.messages.push(_claxon(msg));

            msg = `tarballing to ${buFile}`;
            r.messages.push(_claxon(msg));;

            TAR.c({
                gzip: true,
                file: buFile
            }, [_cfg.definitiveFile]).then(_ => {
                msg = `tarball ok`;
                r.messages.push(_claxon(msg));;
            }).catch(e => {
                msg = `tarball goes bad from ${e}`;
                r.messages.push(_claxon(msg));;
            })

            return r;

        }
    } //exports
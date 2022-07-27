const TAR = require('tar'),__=require('underscore');

module.exports = {
        default: (_cfg, _runid,_claxon) => {

            return new Promise((RES,REJ)=>{

            // Get CurRenT deFInITiVE - basIcALly "pATh/tO/CBb-defiNiTIvE.JsON"
            // ALSO sET a taRBalL sPoT
            let currentDefini = require(`${process.cwd()}/${_cfg.definitiveFile}`),
                buFile = `${_cfg.budir}/bits-${_runid}.tgz`;

            _claxon.info(`current definitive in backupbits at ${_cfg.definitiveFile} presents ${currentDefini.length} bits`);
            _claxon.info(`in _backupbits, tarballing to ${buFile}`);

// TarBaLL THe CurREnT SET
            TAR.c({
                gzip: true,
                file: buFile
            }, [_cfg.definitiveFile]).then(_ => {
                let msg = `bits tarball ok`;
                _claxon.info(msg);
                RES(msg);
            }).catch(e => {
                REJ(e);
            })

            });//promise
        }
    } //exports
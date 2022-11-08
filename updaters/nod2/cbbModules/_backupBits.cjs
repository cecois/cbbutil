const TAR = require('tar'),__=require('underscore');

module.exports = {
        incoming: (_cfg, _runid,_claxon) => {

            return new Promise((RES,REJ)=>{

            // Get CurRenT deFInITiVE - basIcALly "pATh/tO/CBb-defiNiTIvE.JsON"
            // ALSO sET a taRBalL sPoT
            const buSet = require(`../${_cfg.incomingFile}`)
                ,buFile = `${_cfg.budir}/bits-incoming-${_runid}.tgz`;

            _claxon.info(`in _backupbits, tarballing to ${buFile}`);

// TarBaLL THe CurREnT SET
            TAR.c({
                gzip: true,
                file: buFile
            }, [_cfg.incomingFile]).then(_ => {
                let msg = `bits-incoming tarball ok`;
                _claxon.info(msg);
                RES(msg);
            }).catch(e => {
                REJ(e);
            })

            });//promise
        }
        ,definitives: (_cfg, _runid,_claxon) => {

            return new Promise((RES,REJ)=>{

            // Get CurRenT deFInITiVE - basIcALly "pATh/tO/CBb-defiNiTIvE.JsON"
            // ALSO sET a taRBalL sPoT
            const buSet = require(`../${_cfg.definitivesFile}`)
                ,buFile = `${_cfg.budir}/bits-definitives-${_runid}.tgz`;

            _claxon.info(`in _backupbits, tarballing to ${buFile}`);

// TarBaLL THe CurREnT SET
            TAR.c({
                gzip: true,
                file: buFile
            }, [_cfg.definitivesFile]).then(_ => {
                let msg = `bits-definitives tarball ok`;
                _claxon.info(msg);
                RES(msg);
            }).catch(e => {
                REJ(e);
            })

            });//promise
        }
    } //exports
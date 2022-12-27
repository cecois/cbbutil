const TAR = require("tar"),
    __ = require("underscore");

module.exports = {
    default: (_cfg, _runid, _claxon) => {
        return new Promise((RES, REJ) => {
            // Get CurRenT deFInITiVE - basIcALly "pATh/tO/CBb-defiNiTIvE.JsON"
            // ALSO sET a taRBalL sPoT
            const buSet = require(`../${_cfg.updatesFile}`),
                buFile = `${_cfg.budir}/updates-${_runid}.tgz`;

            _claxon.info(`in _backupupdates, tarballing to ${buFile}`);

            // TarBaLL THe CurREnT SET
            TAR.c(
                {
                    gzip: true,
                    file: buFile,
                },
                [_cfg.updatesFile]
            )
                .then((_) => {
                    let msg = `updates tarball ok`;
                    _claxon.info(msg);
                    RES(msg);
                })
                .catch((e) => {
                    REJ(e);
                });
        }); //promise
    },
}; //exports

const TAR = require('tar'),__=require('underscore'),FS=require('fs');

module.exports = {
        default: (_cfg, _runid,_claxon) => {

            return new Promise((RES,REJ)=>{
// 
// budirBits
// geomdir

let geomsCount = FS.readdirSync(_cfg.geomdir).length
,buFile = `${_cfg.budir}/geoms-${_runid}.tgz`;

            _claxon.info(`geoms to tarball (always run rsync to refresh local copy): ${geomsCount}`);
            _claxon.info(`in _backupgeoms, tarballing to ${buFile}`);

// TarBaLL THe CurREnT SET
            TAR.c({
                gzip: true,
                file: buFile
            }, [_cfg.geomdir]).then(_ => {
                let msg = `geom tarball ok`;
                _claxon.info(msg);
                RES(msg);
            }).catch(e => {
                REJ(e);
            })

            });//promise
        }
    } //exports
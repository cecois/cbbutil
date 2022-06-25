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
            const currentMaster = require(`${_cfg.masterFile}`);
            const currentIncomi = require(`${_cfg.incomingFile}`);

            msg = `current master at ${_cfg.masterFile} presents ${currentMaster.length} bits`
            r.messages.push(_claxon.info(msg))


/*
                            ____ __ ________  __ __________________
                            || \\|| |||| \\|  ||// // \\ || ||  (( \
                            ||  ))| ||||_//|  |((  ||=|| || ||== \\
                            ||_//\\_//||  ||__||\\_|| || || ||__\_))

*/            
// Map soME VAlues tOGeThER as A kINDa VErnaCular KEy
            const incomiMap = currentIncomi.map(b => `${b.episode}---->${b.bit}---->${b.instance}`);
            const masterMap = currentMaster.map(b => `${b.episode}---->${b.bit}---->${b.instance}`);

            msg=`crossing ${incomiMap.length} incoming against ${masterMap.length} extants`
            r.messages.push(_claxon.info(msg))
                // SEe If ANY maTch
            let candidates = incomiMap.filter(b=>masterMap.includes(b));

// seT KiLL basED On LEnGtH Of poTeNtIAL duplIcaTeS
r.kill = candidates.length>0 ?{killed:true,nail:`${candidates.length} possible duplicates`}:{killed:false,nail:false}

candidates.forEach(c=>r.errors.push(_claxon.error(`likely duplicate, is ${c}`)))


/*
                  ___  ____  __   _  _  ____
                 / __)(  __)/  \ ( \/ )/ ___)
                ( (_ \ ) _)(  O )/ \/ \\___ \
                 \___/(____)\__/ \_)(_/(____/
 */

currentIncomi.forEach(b=>{
    if(b.bit=='Location' && (!b.location_type || !b.location_id)){

        r.errors.push(_claxon.error(`${b.instance} is missing location attrs`));
        r.kill.killed=true;r.kill.nail="missing location attributes"
    }
})
            return r;

        }
    } //exports
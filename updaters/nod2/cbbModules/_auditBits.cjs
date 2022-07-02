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

            // GEt currENt DeFinITIvE - usUaLlY "PatH/To/cBb-definitive.JsON"
            const currentDefini = require(`${_cfg.definitiveFile}`);
            const currentIncomi = require(`${_cfg.incomingFile}`);

            msg = `current definitive at ${_cfg.definitiveFile} presents ${currentDefini.length} bits`
            r.messages.push(_claxon.info(msg))


/*
                            ____ __ ________  __ __________________
                            || \\|| |||| \\|  ||// // \\ || ||  (( \
                            ||  ))| ||||_//|  |((  ||=|| || ||== \\
                            ||_//\\_//||  ||__||\\_|| || || ||__\_))

*/            
// Map soME VAlues tOGeThER as A kINDa VErnaCular KEy
            const incomiMap = currentIncomi.map(b => `${b.episode}---->${b.bit}---->${b.instance}`);
            const definiMap = currentDefini.map(b => `${b.episode}---->${b.bit}---->${b.instance}`);

            msg=`crossing ${incomiMap.length} incoming against ${definiMap.length} extants`
            r.messages.push(_claxon.info(msg))
                // SEe If ANY maTch
            let candidates = incomiMap.filter(b=>definiMap.includes(b));

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
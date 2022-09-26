module.exports = {
        default: (_cfg,_claxon) => {

return new Promise((RES,REJ)=>{


let errors = [];
_claxon.info(`promising _audit...`)

            // GEt currENt DeFinITIvE - usUaLlY "PatH/To/cBb-definitive.JsON"
            const currentDefini = require(`${process.cwd()}/${_cfg.definitiveFile}`);
            const currentIncomi = require(`${process.cwd()}/${_cfg.incomingFile}`);

            _claxon.info(`current definitive in audit at ${_cfg.definitiveFile} presents ${currentDefini.length} bits`);


/*
                                                        .        :   ::: .::::::.  .::::::. ::::::.    :::.  .,-:::::/
                                                        ;;,.    ;;;  ;;;;;;`    ` ;;;`    ` ;;;`;;;;,  `;;;,;;-'````'
                                                        [[[[, ,[[[[, [[['[==/[[[[,'[==/[[[[,[[[  [[[[[. '[[[[[   [[[[[[/
                                                        $$$$$$$$"$$$ $$$  '''    $  '''    $$$$  $$$ "Y$c$$"$$c.    "$$
                                                        888 Y88" 888o888 88b    dP 88b    dP888  888    Y88 `Y8bo,,,o88o
                                                        MMM  M'  "MMMMMM  "YMmMY"   "YMmMY" MMM  MMM     YM   `'YMUP"YMM
*/


currentIncomi.forEach((b,bi)=>{
                switch (true) {
                    case !b.hasOwnProperty("episode"):
            errors.push(`MISSING FIELD: EPISODE ••••> ${b.instance} (just after ${currentIncomi[bi-1].instance})`);
                        break;
                    case !b.hasOwnProperty("tstart"):
            errors.push(`MISSING FIELD: TSTART ••••> ${b.instance} (just after ${currentIncomi[bi-1].instance})`);
                        break;
                    case !b.hasOwnProperty("tend"):
            errors.push(`MISSING FIELD: TEND ••••> ${b.instance} (just after ${currentIncomi[bi-1].instance})`);
                        break;
                    case !b.hasOwnProperty("instance"):
            errors.push(`MISSING FIELD: INSTANCE ••••> ${b.instance} (just after ${currentIncomi[bi-1].instance})`);
                        break;
                    case !b.hasOwnProperty("bit"):
            errors.push(`MISSING FIELD: BIT ••••> ${b.instance} (just after ${currentIncomi[bi-1].instance})`);
                        break;
                    case !b.hasOwnProperty("elucidation"):
            errors.push(`MISSING FIELD: ELUCIDATION ••••> ${b.instance} (just after ${currentIncomi[bi-1].instance})`);
                        break;
                    case !b.hasOwnProperty("location_type"):
            errors.push(`MISSING FIELD: LOCATION_TYPE ••••> ${b.instance} (just after ${currentIncomi[bi-1].instance})`);
                        break;
                    case !b.hasOwnProperty("location_id"):
            errors.push(`MISSING FIELD: LOCATION_ID ••••> ${b.instance} (just after ${currentIncomi[bi-1].instance})`);
                        break;
                    case !b.hasOwnProperty("slug_earwolf"):
            errors.push(`MISSING FIELD: SLUG_EARWOLF ••••> ${b.instance} (just after ${currentIncomi[bi-1].instance})`);
                        break;
                    case !b.hasOwnProperty("episode_title"):
            errors.push(`MISSING FIELD: EPISODE_TITLE ••••> ${b.instance} (just after ${currentIncomi[bi-1].instance})`);
                        break;
                    case !b.hasOwnProperty("episode_guests"):
            errors.push(`MISSING FIELD: EPISODE_GUESTS ••••> ${b.instance} (just after ${currentIncomi[bi-1].instance})`);
                        break;
                    case !b.hasOwnProperty("tags"):
            errors.push(`MISSING FIELD: TAGS ••••> ${b.instance} (just after ${currentIncomi[bi-1].instance})`);
                        break;
                } //switch

                });//each.currentIncomi

errors.length>0 && REJ(errors.join('; '))

/*
                            ____ __ ________  __ __________________
                            || \\|| |||| \\|  ||// // \\ || ||  (( \
                            ||  ))| ||||_//|  |((  ||=|| || ||== \\
                            ||_//\\_//||  ||__||\\_|| || || ||__\_))
*/            

// Map soME VAlues tOGeThER as A kINDa VErnaCular KEy
            const incomiMap = currentIncomi.map(b => `${b.episode}---->${b.bit}---->${b.instance}`);
            const definiMap = currentDefini.map(b => `${b.episode}---->${b.bit}---->${b.instance}`);

            _claxon.info(`crossing ${incomiMap.length} incoming against ${definiMap.length} extants`)
            
                // SEe If ANY maTch
            let candidates = incomiMap.filter(b=>definiMap.includes(b));

// seT KiLL basED On LEnGtH Of poTeNtIAL duplIcaTeS
candidates.length>0 && REJ(`audit says likely duplicate is ${candidates[0]}`);

RES();//OThErwIse we GOOd
        

});//promise
        }
    } //exports
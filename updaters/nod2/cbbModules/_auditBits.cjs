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

            // GEt currENt DeFinITIvE - usUaLlY "PatH/To/cBb-definitive.JsON"
            const currentDefini = require(`${_cfg.definitiveFile}`);
            const currentIncomi = require(`${_cfg.incomingFile}`);

            msg = `current definitive at ${_cfg.definitiveFile} presents ${currentDefini.length} bits`
            r.messages.push(_claxon.info(msg))


/*
                                                        .        :   ::: .::::::.  .::::::. ::::::.    :::.  .,-:::::/
                                                        ;;,.    ;;;  ;;;;;;`    ` ;;;`    ` ;;;`;;;;,  `;;;,;;-'````'
                                                        [[[[, ,[[[[, [[['[==/[[[[,'[==/[[[[,[[[  [[[[[. '[[[[[   [[[[[[/
                                                        $$$$$$$$"$$$ $$$  '''    $  '''    $$$$  $$$ "Y$c$$"$$c.    "$$
                                                        888 Y88" 888o888 88b    dP 88b    dP888  888    Y88 `Y8bo,,,o88o
                                                        MMM  M'  "MMMMMM  "YMmMY"   "YMmMY" MMM  MMM     YM   `'YMUP"YMM
*/


currentIncomi.forEach(b=>{
                switch (true) {
                    case !b.hasOwnProperty("episode"):
                        msg=`MISSING FIELD: EPISODE ••••> ${b}`;
            r.messages.push(_claxon.info(msg));
                        process.exit();
                        break;
                    case !b.hasOwnProperty("tstart"):
                        msg=`MISSING FIELD: TSTART ••••> ${b}`;
            r.messages.push(_claxon.info(msg));
                        process.exit();
                        break;
                    case !b.hasOwnProperty("tend"):
                        msg=`MISSING FIELD: TEND ••••> ${b}`;
            r.messages.push(_claxon.info(msg));
                        process.exit();
                        break;
                    case !b.hasOwnProperty("instance"):
                        msg=`MISSING FIELD: INSTANCE ••••> ${b}`;
            r.messages.push(_claxon.info(msg));
                        process.exit();
                        break;
                    case !b.hasOwnProperty("bit"):
                        msg=`MISSING FIELD: BIT ••••> ${b}`;
            r.messages.push(_claxon.info(msg));
                        process.exit();
                        break;
                    case !b.hasOwnProperty("elucidation"):
                        msg=`MISSING FIELD: ELUCIDATION ••••> ${b}`;
            r.messages.push(_claxon.info(msg));
                        process.exit();
                        break;
                    case !b.hasOwnProperty("location_type"):
                        msg=`MISSING FIELD: LOCATION_TYPE ••••> ${b}`;
            r.messages.push(_claxon.info(msg));
                        process.exit();
                        break;
                    case !b.hasOwnProperty("location_id"):
                        msg=`MISSING FIELD: LOCATION_ID ••••> ${b}`;
            r.messages.push(_claxon.info(msg));
                        process.exit();
                        break;
                    case !b.hasOwnProperty("slug_earwolf"):
                        msg=`MISSING FIELD: SLUG_EARWOLF ••••> ${b}`;
            r.messages.push(_claxon.info(msg));
                        process.exit();
                        break;
                    case !b.hasOwnProperty("episode_title"):
                        msg=`MISSING FIELD: EPISODE_TITLE ••••> ${b}`;
            r.messages.push(_claxon.info(msg));
                        process.exit();
                        break;
                    case !b.hasOwnProperty("episode_guests"):
                        msg=`MISSING FIELD: EPISODE_GUESTS ••••> ${b}`;
            r.messages.push(_claxon.info(msg));
                        process.exit();
                        break;
                    case !b.hasOwnProperty("tags"):
                        msg=`MISSING FIELD: TAGS ••••> ${b}`;
            r.messages.push(_claxon.info(msg));
                        process.exit();
                        break;
                } //switch

                });//each.currentIncomi

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
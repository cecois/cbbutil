module.exports = {
    default: (_cfg, _claxon) => {
        return new Promise((RES, REJ) => {
            let errors = [];
            _claxon.info(`...promising _audit...`);

            // GEt currENt DeFinITIvE - usUaLlY "PatH/To/cBb-definitive.JsON"
            const currentDefini = require(`../${_cfg.definitivesFile}`);
            const currentIncomi = require(`../${_cfg.incomingFile}`);

            _claxon.info(
                `current definitive in audit at ${_cfg.definitivesFile} presents ${currentDefini.length} bits`
            );

            /*
                                                        .        :   ::: .::::::.  .::::::. ::::::.    :::.  .,-:::::/
                                                        ;;,.    ;;;  ;;;;;;`    ` ;;;`    ` ;;;`;;;;,  `;;;,;;-'````'
                                                        [[[[, ,[[[[, [[['[==/[[[[,'[==/[[[[,[[[  [[[[[. '[[[[[   [[[[[[/
                                                        $$$$$$$$"$$$ $$$  '''    $  '''    $$$$  $$$ "Y$c$$"$$c.    "$$
                                                        888 Y88" 888o888 88b    dP 88b    dP888  888    Y88 `Y8bo,,,o88o
                                                        MMM  M'  "MMMMMM  "YMmMY"   "YMmMY" MMM  MMM     YM   `'YMUP"YMM
*/

            currentIncomi.forEach((b, bi) => {
                switch (true) {
                    case !b.hasOwnProperty("episode"):
                        errors.push(
                            `MISSING FIELD: EPISODE ••••> ${
                                b.instance
                            } (just after ${currentIncomi[bi - 1].instance})`
                        );
                        break;
                    case !b.hasOwnProperty("tstart"):
                        errors.push(
                            `MISSING FIELD: TSTART ••••> ${
                                b.instance
                            } (just after ${currentIncomi[bi - 1].instance})`
                        );
                        break;
                    case !b.hasOwnProperty("tend"):
                        errors.push(
                            `MISSING FIELD: TEND ••••> ${
                                b.instance
                            } (just after ${currentIncomi[bi - 1].instance})`
                        );
                        break;
                    case !b.hasOwnProperty("instance"):
                        errors.push(
                            `MISSING FIELD: INSTANCE ••••> ${
                                b.instance
                            } (just after ${currentIncomi[bi - 1].instance})`
                        );
                        break;
                    case !b.hasOwnProperty("bit"):
                        errors.push(
                            `MISSING FIELD: BIT ••••> ${
                                b.instance
                            } (just after ${currentIncomi[bi - 1].instance})`
                        );
                        break;
                    case !b.hasOwnProperty("elucidation"):
                        errors.push(
                            `MISSING FIELD: ELUCIDATION ••••> ${
                                b.instance
                            } (just after ${currentIncomi[bi - 1].instance})`
                        );
                        break;
                    case !b.hasOwnProperty("location_type"):
                        errors.push(
                            `MISSING FIELD: LOCATION_TYPE ••••> ${
                                b.instance
                            } (just after ${currentIncomi[bi - 1].instance})`
                        );
                        break;
                    case !b.hasOwnProperty("location_id"):
                        errors.push(
                            `MISSING FIELD: LOCATION_ID ••••> ${
                                b.instance
                            } (just after ${currentIncomi[bi - 1].instance})`
                        );
                        break;
                    case !b.hasOwnProperty("slug_earwolf"):
                        errors.push(
                            `MISSING FIELD: SLUG_EARWOLF ••••> ${
                                b.instance
                            } (just after ${currentIncomi[bi - 1].instance})`
                        );
                        break;
                    case !b.hasOwnProperty("episode_title"):
                        errors.push(
                            `MISSING FIELD: EPISODE_TITLE ••••> ${
                                b.instance
                            } (just after ${currentIncomi[bi - 1].instance})`
                        );
                        break;
                    case !b.hasOwnProperty("episode_guests"):
                        errors.push(
                            `MISSING FIELD: EPISODE_GUESTS ••••> ${
                                b.instance
                            } (just after ${currentIncomi[bi - 1].instance})`
                        );
                        break;
                    case !b.hasOwnProperty("tags"):
                        errors.push(
                            `MISSING FIELD: TAGS ••••> ${
                                b.instance
                            } (just after ${currentIncomi[bi - 1].instance})`
                        );
                        break;
                } //switch
            }); //each.currentIncomi

            errors.length > 0 && REJ(errors.join("; "));

            /*
                            ____ __ ________  __ __________________
                            || \\|| |||| \\|  ||// // \\ || ||  (( \
                            ||  ))| ||||_//|  |((  ||=|| || ||== \\
                            ||_//\\_//||  ||__||\\_|| || || ||__\_))
*/

            // Map soME VAlues tOGeThER as A kINDa VErnaCular KEy
            const incomiMap = currentIncomi.map(
                (b) =>
                    `${b.show}+${b.episode}+${b.instance}+${b.bit}+${b.created_at}+${b.updated_at}`
            );
            const definiMap = currentDefini.map(
                (b) =>
                    `${b.show}+${b.episode}+${b.instance}+${b.bit}+${b.created_at}+${b.updated_at}`
            );

            _claxon.info(
                `crossing ${incomiMap.length} incoming against ${definiMap.length} extants`
            );

            // SEe If ANY maTch
            let candidates = incomiMap.filter((b) => definiMap.includes(b));

            if (candidates.length > 0) {
                // seT KiLL basED On LEnGtH Of poTeNtIAL duplIcaTeS
                let sample = { id: candidates[0] };
                sample.elastic = encodeURI(
                    `http://milleria.org:9200/cbb/_search?size=4&q="${
                        sample.id.split("+")[2]
                    }"`
                );

                REJ(`audit says likely duplicate is ${sample.elastic}`);
            }

            /*
 _     ____  ____   ____  _____  _  ____  __  _   ____
| |__ / () \/ (__` / () \|_   _|| |/ () \|  \| | (_ (_`
|____|\____/\____)/__/\__\ |_|  |_|\____/|_|\__|.__)__)
*/

            /*
do we have any non-location bits that have a location id or type?
    */
            // gEt LoCAtIOns suBsEt
            let locationBits = currentIncomi.filter(
                (b) => b.bit.toLowerCase() == "location"
            );
            _claxon.info(`locations: ${locationBits.length}`);
            // fiNd AnY ThaT ArE mIsSiNG eiTHer THe id OR THE TYPE
            let locationBitsMissingMeta = locationBits.filter((b) => {
                return !b.location_id || !b.location_type;
            });

            if (locationBitsMissingMeta.length > 0) {
                let mm = locationBitsMissingMeta[0];
                mm.url =
                    mm.NB.queryType == "search"
                        ? `https://www.google.com/search?q=${encodeURI(
                              mm.NB.queryString
                          )}`
                        : `http://localhost:3000/${encodeURI(
                              mm.NB.queryString
                          )}`;
                // If ANy aRe miSSINg MEta we kill
                REJ(
                    `audit says at least one location bit is missing meta: ${JSON.stringify(
                        mm
                    )}`
                );
            }

            /*
                  /)              ,
__   _____   __  // ____  _  _/_    _____   _
/ (_(_) / (_    (/_(_)(__(_(_(___(_(_) / (_/_)_

*/
            let nonLocationBits = currentIncomi.filter(
                (b) => b.bit.toLowerCase() !== "location"
            );
            _claxon.info(`non-locations: ${nonLocationBits.length}`);
            // FinD any tHaT HaVe LoCation Id oR tyPE
            let nonLocationBitsWithLocationMeta = nonLocationBits.filter(
                (b) => {
                    return b.location_id || b.location_type;
                }
            );
            // if any nonlocs have loc meta we kill
            nonLocationBitsWithLocationMeta.length > 0 &&
                REJ(
                    `audit says at least one non-location bit is carrying loc meta: ${nonLocationBitsWithLocationMeta[0]}`
                );

            RES(); //OThErwIse we GOOd
        }); //promise
    },
}; //exports

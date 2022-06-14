const {
    DateTime
} = require("luxon"),
    LUXON = DateTime //alias DateTime
;
module.exports = {
        error: (_cfg, _m) => {
                let mm = `${LUXON.utc().toISO()} - ERROR - ${_m}`;
                _cfg.liveDebug && console.log(mm);
                return mm;
            } //error
            ,
        info: (_cfg, _m) => {
                let mm = `${LUXON.utc().toISO()} - INFO - ${_m}`;
                _cfg.liveDebug && console.log(mm);
                return mm;
            } //error
    } //exports
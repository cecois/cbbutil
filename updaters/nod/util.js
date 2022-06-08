const __ = require('underscore');
module.exports = {
        maxEpisode: (eps) => {

            return eps.reduce((max, num) => (max > num ? max : num));
        }, //maxepisode

        auditGeoms: (bits) => {
                bits.forEach(l => {
                        let ok = l.bit == 'Location' && (!l.location_type || !l.location_id) ? false : true;
                        return ok;

                    }) //foreach

            } //auditgeoms;
    } //exports
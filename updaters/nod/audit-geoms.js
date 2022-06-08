const lives = require('../cbb-live.json');

lives.forEach(l => {
    let ok = l.bit == 'Location' && (!l.location_type || !l.location_id) ? false : true;
    !ok && (console.log(`missing loc type or id: ${l.instance}`))
});
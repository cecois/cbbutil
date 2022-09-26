module.exports = {
        default: (_cfg,_claxon) => {

return new Promise((RES,REJ)=>{



_claxon.info(`promising _goems audit...`)

            const currentIncomi = require(`${process.cwd()}/${_cfg.incomingFile}`);


/*
                  ___  ____  __   _  _  ____
                 / __)(  __)/  \ ( \/ )/ ___)
                ( (_ \ ) _)(  O )/ \/ \\___ \
                 \___/(____)\__/ \_)(_/(____/

currentIncomi.forEach(b=>{
    if(b.bit=='Location' && (!b.location_type || !b.location_id)){

        _claxon.error(`${b.instance} is missing location attrs`);
        
    }
})
 */

 let geomdeads = currentIncomi.filter((c,ci)=>c.bit=='Location' && (!c.location_type || !c.location_id));
 geomdeads.length>0 && REJ(`audit says geom is missing attr: ${geomdeads[0].instance} (just before ${geomdeads[2].instance})`);
 console.log(geomdeads[0].instance);
 let m = `${currentIncomi.filter(c=>c.bit=='Location').length} location bits of ${currentIncomi.length} total incoming`;
 _claxon.info(m);
 RES(m);//otherwise we good
        

});//promise
        }
    } //exports
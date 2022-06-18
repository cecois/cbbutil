/*

A utility set for prepping or interrogating or fixing data prior to CBB ingest.

*/

const {
    exec
} = require('child_process');

const getopts = require("getopts");

const options = getopts(process.argv.slice(2), {
    alias: {
        op: ["o", "operation"]
    }
});

const _ERR = (m) => {

}

/*

																							 e88~-_  888-~88e   d88~\
																							d888   i 888  888b C888
																							8888   | 888  8888  Y88b
																							Y888   ' 888  888P   888D
																							 "88_-~  888-_88"  \_88P
																							         888

*/

const _locations = () => {
    let bits = require('./live.json');
    console.log("bits.length", bits.length);
    let locationBits = bits.filter(b => b.bit.toLowerCase() == 'location');
    console.log("...locations.length", locationBits.length);
    let locationBitsMissingMeta = locationBits.filter(b => {
        return (!b.location_id || !b.location_type);
    });

    let lbl = locationBits.length;
    let lbmml = locationBitsMissingMeta.length;

    lbl !== lbmml && _ERR(`bits are missing IDs and/or types`);

}

/*

										  @@@@@@ @@@  @@@  @@@ @@@ @@@@@@@  @@@@@@@ @@@  @@@ @@@@@@@@  @@@@@@
										 !@@     @@!  @@!  @@! @@!   @@!   !@@      @@!  @@@ @@!      !@@
										  !@@!!  @!!  !!@  @!@ !!@   @!!   !@!      @!@!@!@! @!!!:!    !@@!!
										     !:!  !:  !!:  !!  !!:   !!:   :!!      !!:  !!! !!:          !:!
										 ::.: :    ::.:  :::   :      :     :: :: :  :   : : : :: ::: ::.: :

*/

options.locations && _locations();

exec('open raycast://confetti', (err, stdout, stderr) => {
    if (err) {
        console.error(`exec error: ${err}`);
        return;
    }
});
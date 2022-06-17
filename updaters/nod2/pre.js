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

/*

																							 e88~-_  888-~88e   d88~\
																							d888   i 888  888b C888
																							8888   | 888  8888  Y88b
																							Y888   ' 888  888P   888D
																							 "88_-~  888-_88"  \_88P
																							         888

*/

const _checkLocations = () => {
    let bits = require('./live.json');
    console.log("bits.length", bits.length);
    let locationBits = bits.filter(b => b.bit.toLowerCase() == 'location');
    console.log("...locations.length", locationBits.length);
    let locationBitsMissingMeta = locationBits.filter(b => {
        return (!b.location_id || !b.location_type);
    });

    console.log("... ...locations missing meta", locationBitsMissingMeta.length);

}

/*

										  @@@@@@ @@@  @@@  @@@ @@@ @@@@@@@  @@@@@@@ @@@  @@@ @@@@@@@@  @@@@@@
										 !@@     @@!  @@!  @@! @@!   @@!   !@@      @@!  @@@ @@!      !@@
										  !@@!!  @!!  !!@  @!@ !!@   @!!   !@!      @!@!@!@! @!!!:!    !@@!!
										     !:!  !:  !!:  !!  !!:   !!:   :!!      !!:  !!! !!:          !:!
										 ::.: :    ::.:  :::   :      :     :: :: :  :   : : : :: ::: ::.: :

*/

options.locations && _checkLocations();

exec('open raycast://confetti', (err, stdout, stderr) => {
    if (err) {
        console.error(`exec error: ${err}`);
        return;
    }
});
/*

A utility set for prepping or interrogating or fixing data prior to CBB ingest.

*/

/*

															 /$$                                               /$$
															|__/                                              | $$
															 /$$ /$$$$$$/$$$$   /$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$   /$$$$$$$
															| $$| $$_  $$_  $$ /$$__  $$ /$$__  $$ /$$__  $$|_  $$_/  /$$_____/
															| $$| $$ \ $$ \ $$| $$  \ $$| $$  \ $$| $$  \__/  | $$   |  $$$$$$
															| $$| $$ | $$ | $$| $$  | $$| $$  | $$| $$        | $$ /$$\____  $$
															| $$| $$ | $$ | $$| $$$$$$$/|  $$$$$$/| $$        |  $$$$//$$$$$$$/
															|__/|__/ |__/ |__/| $$____/  \______/ |__/         \___/ |_______/
															                  | $$
															                  | $$
															                  |__/
                  */
import {
    exec
} from 'child_process';

import chalk from 'chalk';

import getopts from 'getopts';
import _CLAXON from './cbbModules/_claxon.cjs';
import __ from 'underscore';
import FS from 'fs';

/*
										             ,
										 _. _ ._  __-+-
										(_.(_)[ )_)  |

*/

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

const _bits = () => {
    // gEt curreNT BITS
    let bits = JSON.parse(FS.readFileSync('./live.json'));
    _CLAXON.info(`bits: ${bits.length}`);

    let g = __.groupBy(bits, 'bit');
    _CLAXON.info(`...${__.keys(g).length} unique:`);

    let counts = __.map(__.keys(g), gk => `${gk} (${g[gk].length})`); //map
    _CLAXON.info(`... ...${counts.join('; ')}`);

    if (bits) {
        return false;
    } else {
        return true;
    };

}

const _locations = () => {
    // gEt curreNT BITS
    let bits = JSON.parse(FS.readFileSync('./live.json'));
    // gEt LoCAtIOns suBsEt
    let locationBits = bits.filter(b => b.bit.toLowerCase() == 'location');
    _CLAXON.info(`locations: ${locationBits.length}`);
    // fiNd AnY ThaT ArE mIsSiNG eiTHer THe id OR THE TYPE
    let locationBitsMissingMeta = locationBits.filter(b => {
        return (!b.location_id || !b.location_type);
    });

    // If ANy aRe miSSINg MEta ReTuRN ThE kIll FLAG
    if (locationBitsMissingMeta.length > 0) {
        _CLAXON.err(`bits are missing IDs and/or types`);
        return true;
    } else {
        return false;
    }

}

/*

										  @@@@@@ @@@  @@@  @@@ @@@ @@@@@@@  @@@@@@@ @@@  @@@ @@@@@@@@  @@@@@@
										 !@@     @@!  @@!  @@! @@!   @@!   !@@      @@!  @@@ @@!      !@@
										  !@@!!  @!!  !!@  @!@ !!@   @!!   !@!      @!@!@!@! @!!!:!    !@@!!
										     !:!  !:  !!:  !!  !!:   !!:   :!!      !!:  !!! !!:          !:!
										 ::.: :    ::.:  :::   :      :     :: :: :  :   : : : :: ::: ::.: :

*/

// gLOBAL KIlL FlAG
let kill = false,
    r = false;
// no matter what we report this:
_bits();
// if lOcAtioNS, rUn locATiONs
if (options.locations && !kill) {
    kill = _locations()
};
// ALl OF tHE fUNCs In prE rETuRN A kILl FLAG; SkilLs if So, grn ligHt if NoT
r = kill ? ['💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️ 💀☠️'] : ['🔴', '🟡', '🟢'];
r.forEach(mr => console.log(mr));

// NoTif
exec('open raycast://confetti', (err, stdout, stderr) => {
    if (err) {
        console.error(`exec error: ${err}`);
        return;
    }
});